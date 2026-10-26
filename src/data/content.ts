export type Dietary = "spicy" | "gf" | "veg";

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Small Bites" | "Mains" | "Pub Favorites" | "Coffee & Tea";
  tags: Dietary[];
  image: string;
  signature?: boolean;
}

export const CATEGORIES = ["Small Bites", "Mains", "Pub Favorites", "Coffee & Tea"] as const;

export const DISHES: Dish[] = [
  {
    id: "spring-rolls",
    name: "Spring Rolls (Veg)",
    price: 600,
    description: "Crispy rolls served with sweet chili dipping sauce.",
    category: "Small Bites",
    tags: ["veg"],
    image: "/images/dish-spring-rolls.jpg",
  },
  {
    id: "masala-chips",
    name: "Masala Chips",
    price: 450,
    description: "Golden fries tossed in our signature spicy masala blend.",
    category: "Small Bites",
    tags: ["veg", "spicy"],
    image: "/images/dish-masala-chips.jpg",
    signature: true,
  },
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    price: 850,
    description: "Six pieces, choice of BBQ or spicy peri-peri.",
    category: "Small Bites",
    tags: ["spicy"],
    image: "/images/dish-wings.jpg",
  },
  {
    id: "mapo-tofu",
    name: "Mapo Tofu",
    price: 1200,
    description: "Silken tofu, spicy bean paste, ground meat.",
    category: "Mains",
    tags: ["spicy"],
    image: "/images/dish-mapo-tofu.jpg",
    signature: true,
  },
  {
    id: "pork-belly",
    name: "Braised Pork Belly",
    price: 1500,
    description: "Slow-cooked, caramelized, served with steamed rice.",
    category: "Mains",
    tags: ["gf"],
    image: "/images/dish-pork-belly.jpg",
    signature: true,
  },
  {
    id: "kung-pao",
    name: "Kung Pao Chicken",
    price: 1300,
    description: "Stir-fried chicken, roasted peanuts, dried chili peppers.",
    category: "Mains",
    tags: ["spicy"],
    image: "/images/dish-kung-pao.jpg",
  },
  {
    id: "beef-burger",
    name: "Beef Burger",
    price: 1100,
    description: "200g beef patty, cheese, caramelized onions, served with chips.",
    category: "Pub Favorites",
    tags: [],
    image: "/images/dish-burger.jpg",
  },
  {
    id: "fish-chips",
    name: "Fish & Chips",
    price: 1250,
    description: "Beer-battered tilapia, tartar sauce, lemon wedge.",
    category: "Pub Favorites",
    tags: [],
    image: "/images/dish-fish-chips.jpg",
  },
  {
    id: "americano",
    name: "Americano",
    price: 300,
    description: "Double shot of our house espresso, hot water.",
    category: "Coffee & Tea",
    tags: ["veg"],
    image: "/images/dish-americano.jpg",
  },
  {
    id: "latte",
    name: "Latte",
    price: 380,
    description: "Espresso with steamed milk. Regular or large.",
    category: "Coffee & Tea",
    tags: ["veg"],
    image: "/images/dish-latte.jpg",
  },
  {
    id: "dawa-tea",
    name: "Dawa Tea",
    price: 250,
    description: "Traditional Kenyan ginger, lemon, and honey tea.",
    category: "Coffee & Tea",
    tags: ["veg"],
    image: "/images/dish-dawa.jpg",
    signature: true,
  },
  {
    id: "masala-tea",
    name: "Masala Tea",
    price: 250,
    description: "Spiced milk tea, brewed the classic way.",
    category: "Coffee & Tea",
    tags: ["veg"],
    image: "/images/dish-masala-tea.jpg",
  },
];

export interface GardenEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  day: string;
  month: string;
}

export const EVENTS: GardenEvent[] = [
  {
    id: "jazz-night",
    category: "Music",
    title: "Live Jazz & Afro-Fusion Night",
    description:
      "An evening of smooth jazz and Afro-fusion beats under the stars. Special cocktail menu available.",
    date: "Friday, Oct 27",
    time: "7:00 PM – Late",
    image: "/images/event-jazz.jpg",
    day: "27",
    month: "Oct",
  },
  {
    id: "garden-brunch",
    category: "Food & Drink",
    title: "Sunday Garden Brunch",
    description:
      "Bottomless mimosas, a special brunch menu, and acoustic guitar sets in the garden.",
    date: "Sunday, Oct 29",
    time: "10:00 AM – 3:00 PM",
    image: "/images/event-brunch.jpg",
    day: "29",
    month: "Oct",
  },
  {
    id: "pool-tournament",
    category: "Games",
    title: "Pool Tournament",
    description:
      "Grab a partner and compete for the grand prize. Free entry for players. Draft beer specials all night.",
    date: "Wednesday, Nov 1",
    time: "6:00 PM – 9:00 PM",
    image: "/images/event-pool.jpg",
    day: "01",
    month: "Nov",
  },
];

export const REVIEWS = [
  {
    quote:
      "The food at Mosaic Kitchen is simply amazing! Quality and flavor exceeded all my expectations. The vegetables, the pork and cabbage soup, the drinks — everything was beautifully presented and delicious.",
    when: "2 months ago",
  },
  {
    quote:
      "Superb service and excellent food. A fantastic place for events, birthday parties, and family dinners. Safe environment and very friendly staff.",
    when: "2 months ago",
  },
  {
    quote:
      "Beautiful environment, welcoming staff, clean and delicious food — especially the craft beer. I still miss it even after leaving. I'll definitely be back.",
    when: "7 months ago",
  },
  {
    quote:
      "A true sanctuary in the city. The perfect spot to escape the Nairobi hustle, grab a coffee, and stay until the stars come out.",
    when: "Garden regular",
  },
];

export const INFO = {
  name: "Mosaic Kitchen",
  tagline: "Nairobi's best kept garden secret.",
  address: ["George Padmore Road", "Kilimani, Nairobi, Kenya"],
  mapsUrl:
    "https://www.google.com/maps/place/Mosaic+Kitchen,+Kilimani/@-1.2960023,36.7944743,20.5z",
  phone: "0712 888 777",
  phoneHref: "tel:+254712888777",
  email: "hello@mosaickitchen.co.ke",
  emailHref: "mailto:hello@mosaickitchen.co.ke",
  hours: { open: 10, close: 22 }, // 10:00 – 22:00, kitchen closes 22:00
  rating: "4.7",
  reviewCount: "94",
};

export const ksh = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;
