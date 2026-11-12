import { productCatalog } from '@/data/productCatalog';

/** All editable copy and options for the contact page. */

export interface ChoiceOption {
  id: string;
  label: string;
  hint?: string;
}

export const productChoices: ChoiceOption[] = [
  ...productCatalog.map((product) => ({ id: product.slug, label: product.name })),
  { id: 'something-else', label: 'Something else' },
];

export const quantityChoices: ChoiceOption[] = [
  { id: '100', label: '100' },
  { id: '500', label: '500' },
  { id: '1000', label: '1,000' },
  { id: '5000', label: '5,000' },
  { id: '10000', label: '10,000+' },
  { id: 'unsure', label: 'Not sure yet' },
];

export const deadlineChoices: ChoiceOption[] = [
  { id: 'urgent', label: 'Urgent', hint: '24–48 hrs' },
  { id: 'week', label: 'Within a week' },
  { id: 'month', label: 'Within a month' },
  { id: 'flexible', label: 'Flexible' },
];

export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
}

export const quoteChecklist: ChecklistItem[] = [
  { id: 'product', title: 'Product & type', detail: 'Which of our 17 products, and the type you like.' },
  { id: 'quantity', title: 'Quantity', detail: 'A rough number is fine — bigger runs cost less per piece.' },
  { id: 'size', title: 'Size', detail: 'Standard or custom, with dimensions if you have them.' },
  { id: 'finish', title: 'Paper & finish', detail: 'Not sure? Tell us where it will be used and we will suggest.' },
  { id: 'artwork', title: 'Artwork', detail: 'Ready to print, a rough draft, or you need us to design it.' },
  { id: 'deadline', title: 'Deadline', detail: 'The date you need it in hand — we confirm what is possible.' },
];

export interface FindUsStep {
  id: string;
  title: string;
  detail: string;
}

/** Landmarks taken straight from the printed address in siteConfig. */
export const findUsSteps: FindUsStep[] = [
  { id: 'area', title: 'Find us in Ahmedabad', detail: 'Naroda, Ahmedabad — Gujarat 382330.' },
  { id: 'landmark', title: 'Find National Handloom', detail: 'Look for Modern Corner, opposite National Handloom.' },
  { id: 'press', title: 'Come up to our press', detail: 'Near J R Amin Petrol Pump & Jolly Auto — above Hira Auto.' },
];

export const contactChannelHints = {
  whatsapp: 'Fastest — send photos, files and details in one chat.',
  call: 'Talk to the team directly during working hours.',
  email: 'Best for artwork files and detailed briefs.',
  visit: 'See samples, paper and finishes in your hand.',
} as const;
