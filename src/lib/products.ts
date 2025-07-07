export type Category = 'Electronics' | 'Clothing' | 'Books' | 'Home Goods';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: Category;
  image: string;
  dataAiHint: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Quantum-Core Laptop',
    description: 'A powerful laptop with a next-gen quantum processor for blazing fast performance.',
    price: 1299.99,
    rating: 4.8,
    reviewCount: 215,
    category: 'Electronics',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'laptop computer'
  },
  {
    id: 2,
    name: 'Echo-Weave Jacket',
    description: 'A stylish and comfortable jacket made from sustainable echo-weave fabric.',
    price: 89.99,
    rating: 4.5,
    reviewCount: 450,
    category: 'Clothing',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'jacket clothing'
  },
  {
    id: 3,
    name: 'The Galactic Odyssey',
    description: 'A thrilling science fiction novel about a journey to the edge of the universe.',
    price: 19.99,
    rating: 4.9,
    reviewCount: 1024,
    category: 'Books',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'book space'
  },
  {
    id: 4,
    name: 'AeroPress Coffee Maker',
    description: 'A revolutionary coffee press that brews smooth, rich coffee without bitterness.',
    price: 39.95,
    rating: 4.7,
    reviewCount: 890,
    category: 'Home Goods',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'coffee maker'
  },
  {
    id: 5,
    name: 'SonicGlow Headphones',
    description: 'Wireless noise-cancelling headphones with immersive 360-degree audio.',
    price: 249.0,
    rating: 4.6,
    reviewCount: 580,
    category: 'Electronics',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'headphones music'
  },
  {
    id: 6,
    name: 'Organic Cotton Tee',
    description: 'An ultra-soft t-shirt made from 100% organic cotton. Ethically sourced.',
    price: 24.99,
    rating: 4.3,
    reviewCount: 620,
    category: 'Clothing',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tshirt clothing'
  },
  {
    id: 7,
    name: 'Culinary Alchemy',
    description: 'A cookbook that explores the science behind modern cooking techniques.',
    price: 34.50,
    rating: 4.8,
    reviewCount: 310,
    category: 'Books',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cookbook food'
  },
  {
    id: 8,
    name: 'Smart LED Light Strip',
    description: 'App-controlled LED strip to customize your home lighting with millions of colors.',
    price: 45.0,
    rating: 4.4,
    reviewCount: 712,
    category: 'Home Goods',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'led lights'
  },
  {
    id: 9,
    name: '4K Ultra-Wide Monitor',
    description: 'A 34-inch curved monitor that provides an immersive viewing experience for work and play.',
    price: 799.0,
    rating: 4.9,
    reviewCount: 420,
    category: 'Electronics',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'monitor screen'
  },
  {
    id: 10,
    name: 'All-Weather Trail Runners',
    description: 'Durable and waterproof shoes designed for any terrain or weather condition.',
    price: 129.5,
    rating: 4.6,
    reviewCount: 888,
    category: 'Clothing',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'shoes running'
  },
  {
    id: 11,
    name: 'The Art of Minimalism',
    description: 'Learn how to declutter your life and find joy in simplicity with this guide.',
    price: 15.99,
    rating: 4.5,
    reviewCount: 950,
    category: 'Books',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'book lifestyle'
  },
  {
    id: 12,
    name: 'Weighted Comfort Blanket',
    description: 'A 15lb weighted blanket designed to reduce anxiety and improve sleep quality.',
    price: 110.0,
    rating: 4.7,
    reviewCount: 1300,
    category: 'Home Goods',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'blanket comfort'
  }
];
