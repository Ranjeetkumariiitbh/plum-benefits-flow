// src/services/aiService.ts
import type { ActionPlanStep, Benefit, BenefitCategory } from '../types';

// yeh TYPE export hai (sirf type-check ke liye, runtime value nahi)
export type ClassificationResult = BenefitCategory | 'Unknown';

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export async function classifyNeed(userInput: string): Promise<ClassificationResult> {
  const text = userInput.toLowerCase();
  await delay(800); // loader ke liye delay

  if (text.includes('tooth') || text.includes('teeth') || text.includes('gum') || text.includes('dent')) {
    return 'Dental';
  }

  if (text.includes('eye') || text.includes('vision') || text.includes('glasses') || text.includes('lens')) {
    return 'Vision';
  }

  if (
    text.includes('stress') ||
    text.includes('anxiety') ||
    text.includes('depress') ||
    text.includes('panic') ||
    text.includes('burnout') ||
    text.includes('sleep')
  ) {
    return 'Mental Health';
  }

  if (
    text.includes('fever') ||
    text.includes('cold') ||
    text.includes('cough') ||
    text.includes('pain') ||
    text.includes('headache') ||
    text.includes('checkup')
  ) {
    return 'OPD';
  }

  return 'Unknown';
}

export async function generateActionPlan(
  userInput: string,
  benefit: Benefit
): Promise<ActionPlanStep[]> {
  await delay(700); // loader ke liye delay

  const baseIntro = userInput.trim()
    ? `Based on your need: "${userInput}".`
    : 'Based on your health concern.';

  const steps: ActionPlanStep[] = [
    {
      order: 1,
      text: `${baseIntro} Open your benefits portal or HR app and confirm that "${benefit.title}" is active for you.`
    },
    {
      order: 2,
      text: 'Go to the list of network providers (clinics/hospitals/therapists) and book an appointment that suits your schedule.'
    },
    {
      order: 3,
      text: 'After the visit, upload the bill, prescription, and any required documents on the portal to claim coverage as per the benefit.'
    }
  ];

  switch (benefit.category) {
    case 'Dental':
      steps[2].text =
        'After your dental visit, keep the invoice and treatment details and submit them via the claims portal to get coverage as per your dental benefit.';
      break;
    case 'Vision':
      steps[1].text =
        'Visit a partner eye clinic or optical store, get your eye test done, and choose suitable glasses or lenses.';
      break;
    case 'Mental Health':
      steps[1].text =
        'Choose a mental health professional (therapist/counsellor) from the partner list and schedule an online or in-person session.';
      steps[2].text =
        'Keep your session confirmation or invoice handy and follow the simple claim steps mentioned in the mental health benefit to get coverage.';
      break;
    case 'OPD':
      steps[1].text =
        'Book an appointment with a general physician or relevant specialist for your symptoms through the network list.';
      break;
  }

  return steps;
}
