import React, { useEffect } from 'react';
import { X, Heart, MapPin, Flame, Clock, Thermometer, Check, RotateCcw } from 'lucide-react';
import './CoffeeModal.css';

export const CoffeeModal = ({
  coffee,
  hasVoted,
  onVote,
  onRemoveVote,
  onClose
}) => {
  if (!coffee) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="modal-hero-image">
          <img src={coffee.image} alt={coffee.name} />
          <div className="modal-badges-overlay">
            <span className="badge category-badge">{coffee.category}</span>
            <span className="badge origin-badge">
              <MapPin size={12} />
              {coffee.origin}
            </span>
          </div>
        </div>

        <div className="modal-body-content">
          <div className="modal-header-section">
            <div>
              <span className="modal-tagline">{coffee.tagline}</span>
              <h2 className="modal-title">{coffee.name}</h2>
            </div>
            <div className="modal-vote-stat">
              <Heart size={16} className={`modal-heart ${hasVoted ? 'filled' : ''}`} />
              <span className="modal-vote-num">{coffee.votes}</span>
              <span className="modal-vote-text">votes</span>
            </div>
          </div>

          <p className="modal-description">{coffee.description}</p>

          {/* Specialty Attributes Grid */}
          <div className="specialty-specs-grid">
            <div className="spec-card">
              <Flame size={18} className="spec-icon" />
              <div className="spec-info">
                <span className="spec-label">Roast Level</span>
                <strong className="spec-val">{coffee.roast || 'Medium Roast'}</strong>
              </div>
            </div>

            <div className="spec-card">
              <Thermometer size={18} className="spec-icon" />
              <div className="spec-info">
                <span className="spec-label">Served</span>
                <strong className="spec-val">{coffee.temperature || 'Hot'}</strong>
              </div>
            </div>

            <div className="spec-card">
              <Clock size={18} className="spec-icon" />
              <div className="spec-info">
                <span className="spec-label">Extraction Time</span>
                <strong className="spec-val">{coffee.prepTime || '3-4 mins'}</strong>
              </div>
            </div>

            <div className="spec-card">
              <span className="strength-dots-label">Strength</span>
              <div className="strength-dots-row">
                {[1, 2, 3, 4, 5].map((level) => (
                  <span
                    key={level}
                    className={`strength-dot ${level <= (coffee.strength || 3) ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Tasting Notes */}
          {coffee.flavorNotes && (
            <div className="modal-notes-section">
              <span className="notes-heading">Tasting & Aroma Notes:</span>
              <div className="modal-notes-pills">
                {coffee.flavorNotes.map((note, idx) => (
                  <span key={idx} className="flavor-pill modal-pill">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action Bar */}
          <div className="modal-footer-actions">
            {!hasVoted ? (
              <button
                className="btn btn-primary modal-action-btn"
                onClick={() => {
                  onVote(coffee.id);
                }}
              >
                <Heart size={18} />
                <span>Cast Vote for {coffee.name}</span>
              </button>
            ) : (
              <div className="modal-voted-row">
                <div className="modal-voted-badge">
                  <Check size={18} />
                  <span>You have voted for this coffee</span>
                </div>
                <button
                  className="btn btn-outline modal-revoke-btn"
                  onClick={() => {
                    onRemoveVote(coffee.id);
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Remove Vote</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
