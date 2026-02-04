
import React from 'react';
import { 
  Building2, 
  Hotel, 
  Briefcase, 
  Home, 
  GraduationCap,
  ShieldCheck,
  Zap,
  Flame,
  Wand2,
  Layout,
  FileText
} from 'lucide-react';
import { ProjectSector, ApplicationZone } from './types';

export const SECTORS: { label: ProjectSector; icon: React.ReactNode }[] = [
  { label: 'Healthcare', icon: <ShieldCheck className="w-6 h-6" /> },
  { label: 'Hospitality', icon: <Hotel className="w-6 h-6" /> },
  { label: 'Workplace', icon: <Briefcase className="w-6 h-6" /> },
  { label: 'Multifamily', icon: <Home className="w-6 h-6" /> },
  { label: 'Education', icon: <GraduationCap className="w-6 h-6" /> },
];

export const ZONES: { label: ApplicationZone; icon: React.ReactNode }[] = [
  { label: 'Lobby', icon: <Building2 className="w-6 h-6" /> },
  { label: 'Corridor', icon: <Layout className="w-6 h-6" /> },
  { label: 'Feature Wall', icon: <Wand2 className="w-6 h-6" /> },
  { label: 'Ceiling', icon: <Layout className="w-6 h-6 rotate-90" /> },
  { label: 'Facade', icon: <Building2 className="w-6 h-6" /> },
];

export const ACT_CONFIGS = [
  { id: 1, title: 'Project Context', icon: <Building2 size={18} /> },
  { id: 2, title: 'Performance Studio', icon: <Zap size={18} /> },
  { id: 3, title: 'Design Studio', icon: <Wand2 size={18} /> },
  { id: 4, title: 'Systems', icon: <Layout size={18} /> },
  { id: 5, title: 'Documentation', icon: <FileText size={18} /> },
  { id: 6, title: 'Assessment', icon: <ShieldCheck size={18} /> },
];
