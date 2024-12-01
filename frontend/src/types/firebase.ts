import { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: Date;
  userId: string;
  contactInfo: {
    whatsapp?: string;
    instagram?: string;
    email?: string;
  };
  status: 'active' | 'completed' | 'cancelled';
}
