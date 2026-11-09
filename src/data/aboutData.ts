import { Cog, Rocket, ShieldCheck, Target, type LucideIcon } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

/** The four process inks — each core value is "printed" in one of them. */
export type InkColor = 'blue' | 'red' | 'yellow' | 'ink';

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  ink: InkColor;
  /** C / M / Y / K plate letter shown as a watermark */
  plate: string;
}

export const coreValues: CoreValue[] = [
  {
    id: 'mission',
    title: 'Mission',
    description: 'Providing quality printing products and services to support businesses.',
    icon: Target,
    ink: 'blue',
    plate: 'C',
  },
  {
    id: 'quality',
    title: 'Quality Control',
    description: 'Maintaining the highest standards with timely delivery.',
    icon: Cog,
    ink: 'red',
    plate: 'M',
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'We deliver with honesty, ethics and accountability.',
    icon: ShieldCheck,
    ink: 'yellow',
    plate: 'Y',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We adapt and grow with new solutions that help our clients succeed.',
    icon: Rocket,
    ink: 'ink',
    plate: 'K',
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

/** The line that scrolls in word by word. Built from the site's existing copy — no new claims. */
export const aboutManifesto =
  'Fine-quality printing and packaging for the commerce and industry of Gujarat — designed, printed and finished under one roof, checked by hand at every step, and delivered on time.';

export interface StoryHighlight {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const storyHighlights: StoryHighlight[] = [
  {
    id: 'offset',
    label: 'Offset press',
    title: 'Fine-quality printing',
    body: 'A leading offset press in Ahmedabad, serving commerce and industry across Gujarat.',
  },
  {
    id: 'complex',
    label: 'Complex jobs',
    title: 'Delivered on time',
    body: 'We have successfully executed complex jobs for our clients — with timely delivery.',
  },
  {
    id: 'workflow',
    label: 'Workflow',
    title: 'Quality, start to finish',
    body: 'A reliable workflow system keeps the quality high at every stage of the job.',
  },
];

export interface AboutStat {
  id: string;
  label: string;
  ink: InkColor;
}

/** Numbers come from siteConfig / homeData (some are still to be confirmed with the client). */
export const aboutStatLabels: AboutStat[] = [
  { id: 'years', label: 'Years of experience', ink: 'blue' },
  { id: 'team', label: 'Team members', ink: 'red' },
  { id: 'products', label: 'Products delivered', ink: 'yellow' },
  { id: 'clients', label: 'Happy clients', ink: 'ink' },
];
