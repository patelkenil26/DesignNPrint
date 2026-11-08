import { Cog, Rocket, ShieldCheck, Target, type LucideIcon } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const coreValues: CoreValue[] = [
  {
    id: 'mission',
    title: 'Mission',
    description: 'Providing quality printing products and services to support businesses.',
    icon: Target,
  },
  {
    id: 'quality',
    title: 'Quality Control',
    description: 'Maintaining the highest standards with timely delivery.',
    icon: Cog,
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'We deliver with honesty, ethics and accountability.',
    icon: ShieldCheck,
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We adapt and grow with new solutions that help our clients succeed.',
    icon: Rocket,
  },
];

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'start',
    year: String(siteConfig.foundedYear),
    title: 'Design N Print begins',
    description: 'We start in Ahmedabad with a simple promise: fine-quality printing, delivered on time.',
  },
  {
    id: 'growth',
    year: 'Growth',
    title: 'A leading offset press',
    description: 'Complex jobs for commerce and industry across Gujarat — executed with timely delivery.',
  },
  {
    id: 'today',
    year: 'Today',
    title: 'Print, packaging and more',
    description: 'From visiting cards to rigid boxes, labels, files and display — all under one roof.',
  },
];
