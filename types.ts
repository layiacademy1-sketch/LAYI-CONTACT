
export enum Gender {
  GIRL = 'girl',
  BOY = 'boy',
  BUSINESS = 'business'
}

export enum ProfileStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected'
}

export interface Profile {
  id: string;
  snapchatHandle: string;
  category: string;
  presentation: string;
  city: string;
  country: string;
  gender: Gender;
  discount: string;
  status: ProfileStatus;
  createdAt: number;
}

export type View = 'home' | 'search' | 'register' | 'admin' | 'profile';
