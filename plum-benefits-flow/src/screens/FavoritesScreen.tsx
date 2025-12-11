import React from 'react';
import { useBenefits } from '../context/BenefitsContext';

const FavoritesScreen: React.FC = () => {
  const { favorites, selectBenefit, goToScreen } = useBenefits();

  return (
    <div className="screen">
      <div className="screen-header-row">
        <button className="btn ghost small" onClick={() => goToScreen('INPUT')}>
          ← New query
        </button>
      </div>

      <h2 className="screen-title">Saved benefits</h2>
      <p className="screen-subtitle">Quick access to benefits you liked.</p>

      {favorites.length === 0 && (
        <p className="empty-state">You haven&apos;t saved any benefits yet.</p>
      )}

      <div className="card-grid">
        {favorites.map(benefit => (
          <div
            key={benefit.id}
            className="card"
            onClick={() => selectBenefit(benefit)}
          >
            <h3 className="card-title">{benefit.title}</h3>
            <p className="pill small">{benefit.category}</p>
            <p className="card-coverage">{benefit.coverage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesScreen;
