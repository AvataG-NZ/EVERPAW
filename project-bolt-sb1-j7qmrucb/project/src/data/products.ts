export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
  description?: string;
}

export const products: Product[] = [
  {
    id: 999,
    name: 'Biometric Smart Collar',
    category: 'Technology',
    price: 149.99,
    image: '/Screenshot 2025-10-04 035827-gigapixel-redefine-realistic-6x.jpg',
    rating: 5.0,
    description: 'Advanced pet health monitoring with real-time vitals, GPS tracking, and AI-powered insights'
  },
  {
    id: 1,
    name: 'Luxury Pet Bed',
    category: 'Comfort',
    price: 189.00,
    image: '/2_beds.webp',
    rating: 4.9,
    description: 'Premium orthopedic pet bed with memory foam'
  },
  {
    id: 2,
    name: 'Designer Bowl Set',
    category: 'Dining',
    price: 79.00,
    image: '/TravertineCatDog_3.webp',
    rating: 4.8,
    description: 'Elevated ceramic feeding bowls with modern design'
  },
  {
    id: 3,
    name: 'Premium Grooming Kit',
    category: 'Wellness',
    price: 129.00,
    image: '/groomer-and-white-dog-969094132-2000-c6a957c9f7d04dceb4f16101a8997d92.jpg',
    rating: 5.0,
    description: 'Complete professional grooming set for home use'
  },
  {
    id: 4,
    name: 'Smart Grooming Vacuum',
    category: 'Grooming',
    price: 159.00,
    image: '/ONE-Dog-Grooming-Kit,-Pet-Grooming-Vacuum-&-Dog-Clippers-&-Dog-Brush-for-Shedding-with-5-Grooming-and-Cleaning-Tools.webp',
    rating: 4.7,
    description: 'Pet grooming vacuum with clippers and cleaning tools'
  }
];
