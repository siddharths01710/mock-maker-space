export type UserRole = 'prospect_agent' | 'agent' | 'sales_manager' | 'upper_hierarchy';

export type ViewMode = 'detailed' | 'grid' | 'chat';

export type Language = 'EN' | 'HI' | 'BN' | 'MR' | 'TA' | 'TE';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  modules: Module[];
  restrictedTo?: UserRole[];
}

export interface Module {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  description?: string;
  hasAiSummary?: boolean;
}

export interface KPI {
  id: string;
  name: string;
  value: string | number;
  target?: string | number;
  status: 'good' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  source: string;
  income: string;
  education: string;
  disposition: 'Assigned' | 'Met' | 'Follow Up' | 'Converted';
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  policy: string;
  premium: number;
  segment: 'HNI' | 'Affluent' | 'Mass';
  vintage: string;
}

export interface PolicyEvent {
  id: string;
  customerName: string;
  productName: string;
  eventType: 'renewal' | 'maturity' | 'lapsing' | 'birthday' | 'anniversary';
  daysToEvent: number;
  amount?: number;
  mobile: string;
}
