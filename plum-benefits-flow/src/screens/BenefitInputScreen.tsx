import React, { FormEvent } from 'react';
import { useBenefits } from '../context/BenefitsContext';

const BenefitInputScreen: React.FC = () => {
  const { userInput, setUserInput, submitNeed, loading, error } = useBenefits();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitNeed();
  };

  return (
    <div className="screen">
      <h2 className="screen-title">Tell us what you need help with</h2>
      <p className="screen-subtitle">
        Type anything, like <strong>"I have tooth pain, what can I do?"</strong> or{' '}
        <strong>"I feel very stressed lately".</strong>
      </p>

      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="textarea"
          rows={4}
          placeholder="I have tooth pain, what can I do?"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          disabled={loading}
        />

        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? 'Finding the right benefits…' : 'Find my benefits'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {!error && !loading && !userInput && (
        <p className="hint-text">Tip: mention symptoms or problem in 1–2 lines.</p>
      )}
    </div>
  );
};

export default BenefitInputScreen;
