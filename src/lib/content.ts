
export const images = {
  hero: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85",
  architecture: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
  pool: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85",
  dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
  wellness: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
  nature: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85",
};

export const stays = [
  {
    slug: "garden-suite",
    number: "01",
    name: "The Garden Suite",
    category: "A private sanctuary",
    description:
      "A gentle retreat framed by tropical greenery, textured stone and the soothing rhythm of nature.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1500&q=85",
    guests: "2 guests",
    size: "75 m²",
    features: ["King bed", "Garden terrace", "Outdoor bath", "Lounge area"],
  },
  {
    slug: "pool-residence",
    number: "02",
    name: "The Pool Residence",
    category: "A space of your own",
    description:
      "Open-air living, an intimate private pool and considered spaces that make every moment feel unhurried.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85",
    guests: "2–4 guests",
    size: "135 m²",
    features: ["Private pool", "King bedroom", "Outdoor lounge", "Dining space"],
  },
  {
    slug: "atelier-villa",
    number: "03",
    name: "The Atelier Villa",
    category: "Our signature hideaway",
    description:
      "A generous expression of tropical architecture, designed for connection, quiet and effortless comfort.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=85",
    guests: "4–6 guests",
    size: "240 m²",
    features: ["Two bedrooms", "Private pool", "Living pavilion", "Outdoor dining"],
  },
];

export const experiences = [
  {
    number: "01",
    title: "The Ritual of Rest",
    category: "Wellness",
    description:
      "Slow mornings, restorative rituals and simple moments dedicated to reconnecting with yourself.",
    image: images.wellness,
  },
  {
    number: "02",
    title: "The Shared Table",
    category: "Dining",
    description:
      "An imagined culinary experience celebrating thoughtful ingredients, conversation and connection.",
    image: images.dining,
  },
  {
    number: "03",
    title: "Beyond the Walls",
    category: "Discovery",
    description:
      "An invitation to explore the landscape, traditions and creative spirit of Bali.",
    image: images.nature,
  },
];

export const galleryImages = [
  images.hero,
  images.architecture,
  images.pool,
  stays[0].image,
  stays[1].image,
  images.wellness,
  images.dining,
  images.nature,
];
