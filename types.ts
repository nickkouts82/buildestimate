
export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  tag?: string;
}

export interface Metric {
  label: string;
  value: string;
  icon: string;
}

export interface ProPerformance {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  verified: boolean;
  score: number;
  about: string;
  metrics: Metric[];
  performance: ProPerformance[];
  services: Service[];
  availability: {
    day: string;
    date: number;
    slots: string[];
  }[];
}

export type View = 'LANDING' | 'PROFILE' | 'LEAD_FORM' | 'PRO_SIGNUP' | 'HOW_IT_WORKS';
