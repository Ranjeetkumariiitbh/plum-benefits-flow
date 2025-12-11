import React from 'react';
import { useBenefits } from '../context/BenefitsContext';

const BenefitListScreen: React.FC = () => {
  const {
    category,
    benefits,
    selectBenefit,
    loading,
    error,
    goToScreen,
    resetFlow
  } = useBenefits();

  if (loading) {
    return (
      <div className="screen center">
        <div className="loader" />
        <p>Preparing recommended benefits for you…</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header-row">
        <h2 className="screen-title">Recommended benefits</h2>
        <button className="btn ghost small" onClick={resetFlow}>
          Start again
        </button>
      </div>

      {category && category !== 'Unknown' && (
        <p className="screen-subtitle">
          We classified your need as: <span className="pill">{category}</span>
        </p>
      )}

      {error && <p className="error-text">{error}</p>}

      {category === 'Unknown' && (
        <div className="empty-state">
          <p>We could not clearly map your request to a specific benefit category.</p>
          <p>Try rephrasing or mention whether it is about teeth, eyes, stress or general illness.</p>
          <button className="btn primary" onClick={() => goToScreen('INPUT')}>
            Go back & rephrase
          </button>
        </div>
      )}

      {benefits.length === 0 && category !== 'Unknown' && (
        <p className="empty-state">No mock benefits configured for this category.</p>
      )}

      <div className="card-grid">
        {benefits.map(benefit => (
          <div key={benefit.id} className="card" onClick={() => selectBenefit(benefit)}>
            <h3 className="card-title">{benefit.title}</h3>
            <p className="pill small">{benefit.category}</p>
            <p className="card-coverage">{benefit.coverage}</p>
            <p className="card-description">{benefit.description}</p>
            <button className="btn secondary full-width" type="button">
              View action plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitListScreen;
