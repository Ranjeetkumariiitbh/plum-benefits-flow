// src/types.ts

// Benefit kis category ka hai (Dental, OPD, etc.)
export type BenefitCategory = 'Dental' | 'OPD' | 'Vision' | 'Mental Health';

// Har benefit ka shape
export interface Benefit {
  id: string;
  category: BenefitCategory;
  title: string;
  coverage: string;
  description: string;
}

// Action plan ke steps ka type
export interface ActionPlanStep {
  order: number;
  text: string;
}
