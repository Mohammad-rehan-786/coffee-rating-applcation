import React, { useState } from 'react';
import { Heart, Check, MapPin, Flame, Info, RotateCcw } from 'lucide-react';
import './CoffeeCard.css';

export const CoffeeCard = ({
  coffee,
  hasVoted,
  onVote,
  onRemoveVote,
  onOpenDetails
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVoteClick = (e) => {
    e.stopPropagation();
    if (hasVoted) {
      return;
    }
    setIsAnimating(true);
    onVote(coffee.id);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleRemoveVoteClick = (e) => {
    e.stopPropagation();
    onRemoveVote(coffee.id);
  };

  return (
    <div className={`coffee-card ${hasVoted ? 'coffee-card-voted' : ''}`}>
      {/* Image Container with Badges */}
      <div className="card-media" onClick={() => onOpenDetails(coffee)}>
        <img
          src={coffee.image}
          alt={coffee.name}
          className="coffee-img"
          loading="lazy"
          onError={(e) => {
            // High reliability fallback coffee image if network issue occurs
            e.target.src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="card-badges">
          <span className="badge category-badge">{coffee.category}</span>
          <span className="badge origin-badge">
            <MapPin size={12} />
            {coffee.origin}
          </span>
        </div>

        {/* Floating Quick View hint */}
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(coffee);
          }}
          title="View Coffee Details"
          aria-label="View Coffee Details"
        >
          <Info size={16} />
        </button>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-header">
          <h3 className="coffee-title" onClick={() => onOpenDetails(coffee)}>
            {coffee.name}
          </h3>
          <div className="vote-counter-badge" title="Total Community Votes">
            <Heart size={14} className={`heart-icon ${hasVoted ? 'heart-filled' : ''}`} />
            <span className="vote-count-number">{coffee.votes}</span>
          </div>
        </div>

        <p className="coffee-tagline">{coffee.tagline}</p>
        <p className="coffee-desc">{coffee.description}</p>

        {/* Flavor Notes */}
        {coffee.flavorNotes && (
          <div className="flavor-notes-row">
            {coffee.flavorNotes.slice(0, 3).map((note, idx) => (
              <span key={idx} className="flavor-pill">
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="card-actions">
          {!hasVoted ? (
            <button
              className={`btn btn-vote ${isAnimating ? 'voting-pulse' : ''}`}
              onClick={handleVoteClick}
              aria-label={`Vote for ${coffee.name}`}
            >
              <Heart size={18} className="btn-vote-icon" />
              <span>Vote for this Coffee</span>
            </button>
          ) : (
            <div className="voted-action-group">
              <button
                className="btn btn-voted"
                disabled
                aria-label={`Already voted for ${coffee.name}`}
              >
                <Check size={18} />
                <span>Voted</span>
              </button>
              <button
                className="btn-undo-vote"
                onClick={handleRemoveVoteClick}
                title="Undo your vote for this coffee"
                aria-label="Undo vote"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
