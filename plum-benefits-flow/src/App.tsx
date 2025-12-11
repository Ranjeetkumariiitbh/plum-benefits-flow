import React from 'react';

// context
import { BenefitsProvider, useBenefits } from './context/BenefitsContext';

// screens
import BenefitInputScreen from './screens/BenefitInputScreen';
import BenefitListScreen from './screens/BenefitListScreen';
import BenefitDetailsScreen from './screens/BenefitDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';

// Ye component decide karega kaunsi screen dikhani hai
const ScreenRouter: React.FC = () => {
  const { currentScreen } = useBenefits();

  if (currentScreen === 'INPUT') {
    return <BenefitInputScreen />;
  }

  if (currentScreen === 'LIST') {
    return <BenefitListScreen />;
  }

  if (currentScreen === 'DETAILS') {
    return <BenefitDetailsScreen />;
  }

  if (currentScreen === 'FAVORITES') {
    return <FavoritesScreen />;
  }

  // safety fallback
  return <BenefitInputScreen />;
};

// App ka main shell (header + footer + current screen)
const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Plum Benefits Helper</h1>
          <p className="app-subtitle">
            Describe your health need, we&apos;ll map it to the right benefit and guide you step by step.
          </p>
        </div>
      </header>

      <main className="app-main">
        <ScreenRouter />
      </main>

      <footer className="app-footer">
        <span>Assignment – AI-Powered Benefits Discovery Flow</span>
      </footer>
    </div>
  );
};

// Yahan Provider wrap ho raha hai (context available har screen me)
const App: React.FC = () => {
  return (
    <BenefitsProvider>
      <AppShell />
    </BenefitsProvider>
  );
};

export default App;
