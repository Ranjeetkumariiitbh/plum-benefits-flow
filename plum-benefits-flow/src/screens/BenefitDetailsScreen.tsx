import React from 'react';
import { useBenefits } from '../context/BenefitsContext';

const BenefitDetailsScreen: React.FC = () => {
  const {
    selectedBenefit,
    actionSteps,
    loading,
    error,
    regenerateActionPlan,
    toggleFavorite,
    favorites,
    goToScreen
  } = useBenefits();

  if (!selectedBenefit) {
    return (
      <div className="screen">
        <p>No benefit selected.</p>
        <button className="btn primary" onClick={() => goToScreen('LIST')}>
          Back to benefits
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some(b => b.id === selectedBenefit.id);

  return (
    <div className="screen">
      <div className="screen-header-row">
        <button className="btn ghost small" onClick={() => goToScreen('LIST')}>
          ← All benefits
        </button>
        <button className="btn ghost small" onClick={() => goToScreen('FAVORITES')}>
          ★ Saved
        </button>
      </div>

      <h2 className="screen-title">{selectedBenefit.title}</h2>
      <p className="screen-subtitle">
        <span className="pill">{selectedBenefit.category}</span>
      </p>

      <div className="card">
        <h3 className="card-subtitle">Coverage</h3>
        <p className="card-coverage">{selectedBenefit.coverage}</p>
        <p className="card-description">{selectedBenefit.description}</p>
      </div>

      <div className="card">
        <div className="card-header-row">
          <h3 className="card-subtitle">How to use this benefit</h3>
          {loading && <span className="small-text">Regenerating…</span>}
        </div>

        {loading && (
          <div className="center">
            <div className="loader small" />
          </div>
        )}

        {!loading && (
          <ol className="steps-list">
            {actionSteps.map(step => (
              <li key={step.order}>{step.text}</li>
            ))}
          </ol>
        )}

        {error && <p className="error-text">{error}</p>}

        <div className="action-row">
          <button className="btn secondary" type="button" onClick={regenerateActionPlan} disabled={loading}>
            Regenerate steps
          </button>
          <button
            className={`btn ${isFavorite ? 'danger' : 'primary-outline'}`}
            type="button"
            onClick={() => toggleFavorite(selectedBenefit)}
          >
            {isFavorite ? 'Remove from saved' : 'Save to favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitDetailsScreen;
