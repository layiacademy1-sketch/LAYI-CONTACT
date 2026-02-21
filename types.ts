
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
  displayName: string;
  presentation: string;
  category: string;
  city: string;
  country: string;
  gender: Gender;
  imageUrl: string;
  status: ProfileStatus;
  createdAt: number;
  discount?: string;
  gallery?: string[];
  isDoubtful?: boolean;
  socials?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  // Adding restaurantInfo to support DashboardView requirements
  restaurantInfo?: {
    address: string;
    openingHours: string[];
    menuPhotos: string[];
  };
}

export interface Introducer {
  id: string;
  name: string;
  gender: 'Homme' | 'Femme';
  city: string;
  totalGains: string;
  startDate: string;
  januaryGains: string;
  status: 'GOLD' | 'BRONZE';
  serviceGains: { service: string, amount: string }[];
}

// Fixed: Added missing Task interface used in AdminPanel
export interface Task {
  id: string;
  folderId?: string;
  clientId?: string;
  content: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

// Fixed: Added missing Client interface used in AdminPanel
export interface Client {
  id: string;
  folderId: string;
  name: string;
  phone: string;
  description: string;
  createdAt: number;
}

// Fixed: Added missing News interface used in NewsListView and NewsDetailView
export interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  city?: string;
  createdAt: number;
}

// Fixed: Added missing HistoryEntry interface used in IndividualAdminView
export interface HistoryEntry {
  id: string;
  type: 'received' | 'withdrawal';
  label: string;
  amount: number;
  date: number;
}

// Fixed: Added missing AdminIndividualData interface used in IndividualAdminView
export interface AdminIndividualData {
  tasks: Task[];
  amounts: {
    week: number;
    month: number;
    year: number;
  };
  monthlyBreakdown: Record<string, number>;
  history: HistoryEntry[];
  bonuses: { id: string; amount: number; label?: string }[];
}

export type View = 'home' | 'member_access' | 'member_space' | 'register_introducer' | 'admin' | 'admin_individual' | 'profile' | 'profiles_list' | 'formation_info' | 'presentation' | 'introducer_details' | 'training_lives' | 'membership_offer' | 'all_formations' | 'trust_us';
