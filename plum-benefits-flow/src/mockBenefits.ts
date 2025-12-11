import type { Benefit, BenefitCategory } from './types';


export const BENEFITS: Benefit[] = [
  // Dental
  {
    id: 'dental-1',
    category: 'Dental',
    title: 'Dental Checkup & Cleaning',
    coverage: 'Up to ₹2,000 per visit, 2 visits per year',
    description: 'Basic dental consultation, cleaning, and cavity check with network dentists.'
  },
  {
    id: 'dental-2',
    category: 'Dental',
    title: 'Root Canal Coverage',
    coverage: 'Covers 60% of procedure cost at network hospitals',
    description: 'Financial support for complex dental procedures like root canal treatment.'
  },

  // OPD
  {
    id: 'opd-1',
    category: 'OPD',
    title: 'Doctor Consultation (OPD)',
    coverage: 'Up to ₹800 per visit, 4 visits per year',
    description: 'Consult general physicians for common issues like fever, cold, body pain.'
  },
  {
    id: 'opd-2',
    category: 'OPD',
    title: 'Specialist Visit',
    coverage: 'Up to ₹1,500 per visit for specialists',
    description: 'Visit specialists like cardiologists, orthopedicians, dermatologists, etc.'
  },

  // Vision
  {
    id: 'vision-1',
    category: 'Vision',
    title: 'Eye Checkup',
    coverage: 'One free eye test every 12 months',
    description: 'Comprehensive eye examination at partner clinics and hospitals.'
  },
  {
    id: 'vision-2',
    category: 'Vision',
    title: 'Spectacles / Lenses Support',
    coverage: '₹1,500 allowance once every 2 years',
    description: 'Helps you buy prescription glasses or contact lenses from network stores.'
  },

  // Mental Health
  {
    id: 'mh-1',
    category: 'Mental Health',
    title: 'Therapy Session',
    coverage: '3 sessions fully covered per year',
    description: 'Confidential therapy sessions with licensed psychologists or counsellors.'
  },
  {
    id: 'mh-2',
    category: 'Mental Health',
    title: 'Online Counselling',
    coverage: 'Unlimited chat + 1 video call per month',
    description: 'Text or video counselling with mental health professionals.'
  }
];

export const CATEGORIES: BenefitCategory[] = ['Dental', 'OPD', 'Vision', 'Mental Health'];
