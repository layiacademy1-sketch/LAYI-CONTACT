
export enum Gender {
  GIRL = 'girl',
  BOY = 'boy',
  BUSINESS = 'business'
}

export enum ProfileStatus {
  VALIDATED = 'validated',
  PENDING = 'pending'
}

export interface Profile {
  id: string;
  snapchatHandle: string;
  presentation: string;
  category: string;
  city: string;
  country: string;
  gender: Gender;
  imageUrl: string;
  status: ProfileStatus;
  createdAt: number;
  // Added optional properties to fix property access errors in UI components
  discount?: string;
  gallery?: string[];
  socials?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  restaurantInfo?: {
    address?: string;
    openingHours?: string[];
    menuPhotos?: string[];
  };
}

export interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: number;
}

export type View = 'home' | 'search' | 'register' | 'admin' | 'profile' | 'news-list' | 'news-detail';
