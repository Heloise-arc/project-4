import { BarChart2, Users, DollarSign, PieChart } from 'lucide-react';
import { Stat } from './types';

export const STATS: Stat[] = [
  {
    id: 'volume',
    icon: BarChart2,
    value: '$2.8B'
  },
  {
    id: 'users',
    icon: Users,
    value: '125K+'
  },
  {
    id: 'openInterest',
    icon: PieChart,
    value: '$450M'
  },
  {
    id: 'revenue',
    icon: DollarSign,
    value: '$12.5M'
  }
] as const;