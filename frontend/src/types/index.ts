export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  emailVerified: boolean;
  isEntrepreneur: boolean;
  points: number;
  tags: string[];
  causesCreated: number;
  causesSupported: number;
  productsCreated: number;
  createdAt: string;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  currentAmount: number;
  supporters: string[]; // IDs de usuarios que han apoyado
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  imageUrl?: string;
  price: number;
  category: string;
  tags: string[];
  status: 'available' | 'sold' | 'unavailable';
  createdAt: string;
  updatedAt: string;
}
