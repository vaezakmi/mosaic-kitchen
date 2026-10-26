import { useEffect, useRef } from "react";
import * as THREE from "three";

const IMG = "/images/hero-garden.jpg";

/**
 * Interactive night-garden hero: a cover-fit photograph behind a custom
 * ripple shader (cursor-driven) with drifting amber fireflies on top.
 * A static <img> poster sits underneath, so a WebGL failure never
 * leaves a black canvas.
 */
export function GardenCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // poster image remains visible
    }

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    wrap.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    camera.position.z = 2;

    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.55) },
      uStrength: { value: 0 },
      uAspect: { value: 1 },
      uImgAspect: { value: 16 / 9 },
      uCover: { value: 1 },
    };

    const planeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uStrength;
        uniform float uAspect;
        uniform float uImgAspect;
        uniform float uCover;
        varying vec2 vUv;

        vec2 coverUv(vec2 uv) {
          float sA = uAspect;
          float iA = uImgAspect;
          vec2 scaled = uv;
          if (sA > iA) {
            scaled.y = uv.y * (iA / sA) + (1.0 - iA / sA) * 0.5;
          } else {
            scaled.x = uv.x * (sA / iA) + (1.0 - sA / iA) * 0.5;
          }
          return scaled;
        }

        void main() {
          vec2 uv = coverUv(vUv);
          // slow cinematic drift
          uv += vec2(sin(uTime * 0.055) * 0.0045, cos(uTime * 0.042) * 0.004);
          // gentle breathing zoom
          uv = (uv - 0.5) * (1.0 - 0.02 * uCover * (0.5 + 0.5 * sin(uTime * 0.12))) + 0.5;

          // cursor ripple
          vec2 c = vUv - 0.5; c.x *= uAspect;
          vec2 m = uMouse - 0.5; m.x *= uAspect;
          float d = length(c - m);
          float wave = sin(d * 26.0 - uTime * 3.4) * exp(-d * 4.5) * uStrength;
          vec2 dir = normalize(c - m + vec2(1e-4));
          uv += dir * wave * 0.014;

          vec3 col = texture2D(uTex, clamp(uv, 0.001, 0.999)).rgb;

          // deepen shadows toward night, protect highlights
          col = pow(col, vec3(1.06));
          col += vec3(0.02, 0.012, 0.0) * (1.0 - col.g);

          // vignette
          float vig = smoothstep(1.25, 0.35, length(c));
          col *= mix(0.55, 1.0, vig);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), planeMat);
    scene.add(plane);

    // ── Fireflies ──────────────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 70 : 150;
    const seeds = new Float32Array(COUNT * 4); // x, y, phase, speed
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 4 + 0] = (Math.random() * 2 - 1) * 1.6;
      seeds[i * 4 + 1] = (Math.random() * 2 - 1) * 0.95;
      seeds[i * 4 + 2] = Math.random() * Math.PI * 2;
      seeds[i * 4 + 3] = 0.4 + Math.random() * 1.1;
    }
    const flyGeo = new THREE.BufferGeometry();
    flyGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    flyGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    const flyMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: uniforms.uTime, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute vec4 aSeed;
        uniform float uTime;
        uniform float uPx;
        varying float vTw;
        void main() {
          vec3 p = position;
          float t = uTime * aSeed.w;
          p.x = aSeed.x + sin(t * 0.5 + aSeed.z) * 0.14;
          p.y = aSeed.y + sin(t * 0.34 + aSeed.z * 2.1) * 0.1 + sin(t * 0.9) * 0.03;
          float tw = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(t * 2.2 + aSeed.z * 3.0), 2.0);
          vTw = tw;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (2.2 + 3.2 * tw) * uPx * (1.6 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vTw;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d);
          float a = smoothstep(0.5, 0.0, r);
          a *= a;
          vec3 col = mix(vec3(1.0, 0.72, 0.28), vec3(1.0, 0.85, 0.5), vTw);
          gl_FragColor = vec4(col, a * vTw * 0.9);
        }
      `,
    });
    const flies = new THREE.Points(flyGeo, flyMat);
    flies.position.z = 0.9;
    scene.add(flies);

    // ── Texture ────────────────────────────────────────────────
    let disposed = false;
    new THREE.TextureLoader().load(IMG, (tex) => {
      if (disposed) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      uniforms.uTex.value = tex;
      uniforms.uImgAspect.value = tex.image.width / tex.image.height;
    });

    // ── Sizing ─────────────────────────────────────────────────
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = w / h;
      (flyMat.uniforms.uPx as { value: number }).value = dpr;
      const dist = camera.position.z;
      const visH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      plane.scale.set(visH * camera.aspect * 1.02, visH * 1.02, 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── Pointer ────────────────────────────────────────────────
    const targetMouse = new THREE.Vector2(0.5, 0.55);
    let targetStrength = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetMouse.set((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height);
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };
    wrap.addEventListener("pointermove", onPointer);
    wrap.addEventListener("pointerleave", onLeave);

    // ── Loop with visibility gating ────────────────────────────
    let inView = true;
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0.02 });
    io.observe(wrap);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!inView || document.hidden) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(targetMouse, 0.07);
      uniforms.uStrength.value += (targetStrength * (isMobile ? 0.4 : 0.85) - uniforms.uStrength.value) * 0.06;
      targetStrength *= 0.985;
      renderer.render(scene, camera);
    };

    if (reduced) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
      flyGeo.dispose();
      flyMat.dispose();
      plane.geometry.dispose();
      planeMat.dispose();
      uniforms.uTex.value?.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* static poster — visible before the first GPU frame and on WebGL failure */}
      <img
        src={IMG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
