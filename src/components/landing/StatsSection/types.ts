import { LucideIcon } from 'lucide-react';

export interface Stat {
  id: 'volume' | 'users' | 'openInterest' | 'revenue';
  icon: LucideIcon;
  value: string;
  label?: string;
  subtext?: string;
}