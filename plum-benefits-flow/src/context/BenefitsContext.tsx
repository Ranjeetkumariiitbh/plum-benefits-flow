import React, { createContext, useContext, useState } from 'react';
import type { ActionPlanStep, Benefit, BenefitCategory } from '../types';
import { BENEFITS } from '../mockBenefits';
import { classifyNeed, generateActionPlan } from '../services/aiService';
import type { ClassificationResult } from '../services/aiService';


type Screen = 'INPUT' | 'LIST' | 'DETAILS' | 'FAVORITES';

interface BenefitsState {
  userInput: string;
  category: ClassificationResult | null;
  benefits: Benefit[];
  selectedBenefit: Benefit | null;
  actionSteps: ActionPlanStep[];
  favorites: Benefit[];
  loading: boolean;
  error: string | null;
  currentScreen: Screen;
}

interface BenefitsContextValue extends BenefitsState {
  setUserInput: (value: string) => void;
  submitNeed: () => Promise<void>;
  goToScreen: (screen: Screen) => void;
  selectBenefit: (benefit: Benefit) => Promise<void>;
  toggleFavorite: (benefit: Benefit) => void;
  regenerateActionPlan: () => Promise<void>;
  resetFlow: () => void;
}

const BenefitsContext = createContext<BenefitsContextValue | undefined>(undefined);

export const BenefitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BenefitsState>({
    userInput: '',
    category: null,
    benefits: [],
    selectedBenefit: null,
    actionSteps: [],
    favorites: [],
    loading: false,
    error: null,
    currentScreen: 'INPUT'
  });

  const setUserInput = (value: string) => {
    setState(prev => ({ ...prev, userInput: value, error: null }));
  };

  const submitNeed = async () => {
    if (!state.userInput.trim()) {
      setState(prev => ({ ...prev, error: 'Please describe your health need.' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const category = await classifyNeed(state.userInput);
      if (category === 'Unknown') {
        setState(prev => ({
          ...prev,
          category,
          benefits: [],
          loading: false,
          error:
            "Sorry, I couldn't understand that. Try rephrasing or be a bit more specific (e.g. 'I have tooth pain')."
        }));
        return;
      }

      const benefits = BENEFITS.filter(b => b.category === (category as BenefitCategory));
      setState(prev => ({
        ...prev,
        category,
        benefits,
        loading: false,
        error: null,
        currentScreen: 'LIST'
      }));
    } catch {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Something went wrong while talking to AI. Please try again.'
      }));
    }
  };

  const goToScreen = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen, error: null }));
  };

  const selectBenefit = async (benefit: Benefit) => {
    try {
      setState(prev => ({
        ...prev,
        selectedBenefit: benefit,
        loading: true,
        error: null
      }));
      const steps = await generateActionPlan(state.userInput, benefit);
      setState(prev => ({
        ...prev,
        actionSteps: steps,
        loading: false,
        currentScreen: 'DETAILS'
      }));
    } catch {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to generate action plan. Please try regenerating.'
      }));
    }
  };

  const regenerateActionPlan = async () => {
    if (!state.selectedBenefit) return;
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const steps = await generateActionPlan(state.userInput, state.selectedBenefit);
      setState(prev => ({
        ...prev,
        actionSteps: steps,
        loading: false
      }));
    } catch {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to regenerate steps. Please try again.'
      }));
    }
  };

  const toggleFavorite = (benefit: Benefit) => {
    setState(prev => {
      const exists = prev.favorites.some(b => b.id === benefit.id);
      if (exists) {
        return {
          ...prev,
          favorites: prev.favorites.filter(b => b.id !== benefit.id)
        };
      }
      return { ...prev, favorites: [...prev.favorites, benefit] };
    });
  };

  const resetFlow = () => {
    setState(prev => ({
      ...prev,
      userInput: '',
      category: null,
      benefits: [],
      selectedBenefit: null,
      actionSteps: [],
      currentScreen: 'INPUT',
      error: null
    }));
  };

  const value: BenefitsContextValue = {
    ...state,
    setUserInput,
    submitNeed,
    goToScreen,
    selectBenefit,
    toggleFavorite,
    regenerateActionPlan,
    resetFlow
  };

  return <BenefitsContext.Provider value={value}>{children}</BenefitsContext.Provider>;
};

export const useBenefits = () => {
  const ctx = useContext(BenefitsContext);
  if (!ctx) {
    throw new Error('useBenefits must be used inside BenefitsProvider');
  }
  return ctx;
};
