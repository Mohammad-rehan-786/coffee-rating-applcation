import React from 'react';
import { Heart, Trash2, Compass, MapPin, Coffee, CheckCircle2 } from 'lucide-react';
import './MyVotes.css';

export const MyVotes = ({
  votedCoffees,
  onRemoveVote,
  onOpenDetails
}) => {
  const count = votedCoffees.length;

  return (
    <section id="my-votes" className="my-votes-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Heart size={14} />
            <span>Personal Ledger</span>
          </div>
          <h2 className="section-title">My Voting Activity</h2>
          <p className="section-subtitle">
            Keep track of the specialty coffees you have endorsed in this browser session. You can manage or revoke votes at any time.
          </p>
        </div>

        {/* Status Summary Banner */}
        <div className="my-votes-summary-card">
          <div className="summary-info">
            <div className="summary-icon-wrap">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="summary-title">
                {count > 0
                  ? `You have voted for ${count} ${count === 1 ? 'specialty coffee' : 'specialty coffees'}`
                  : 'Your voting passport is currently empty'}
              </h3>
              <p className="summary-desc">
                {count > 0
                  ? 'Your votes are saved locally in your browser and contribute to the community rankings.'
                  : 'Cast a vote on any coffee in our collection to see it recorded here.'}
              </p>
            </div>
          </div>

          <a href="#explore" className="btn btn-outline btn-sm">
            <Compass size={15} />
            <span>Browse More</span>
          </a>
        </div>

        {/* Voted Coffees List or Empty State */}
        {count > 0 ? (
          <div className="voted-grid">
            {votedCoffees.map((coffee) => (
              <div key={coffee.id} className="voted-card">
                <div
                  className="voted-card-media"
                  onClick={() => onOpenDetails(coffee)}
                >
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className="voted-card-img"
                  />
                  <span className="voted-category-pill">{coffee.category}</span>
                </div>

                <div className="voted-card-content">
                  <div className="voted-card-header">
                    <div>
                      <h4
                        className="voted-coffee-title"
                        onClick={() => onOpenDetails(coffee)}
                      >
                        {coffee.name}
                      </h4>
                      <span className="voted-origin">
                        <MapPin size={12} />
                        {coffee.origin}
                      </span>
                    </div>

                    <div className="voted-current-votes" title="Current Community Votes">
                      <Heart size={14} className="voted-heart-icon" />
                      <span>{coffee.votes}</span>
                    </div>
                  </div>

                  <p className="voted-tagline">{coffee.tagline}</p>

                  <div className="voted-status-strip">
                    <span className="vote-status-active">
                      <span className="active-dot"></span> Vote Active
                    </span>
                    <button
                      className="btn-revoke-vote"
                      onClick={() => onRemoveVote(coffee.id)}
                      title={`Remove vote for ${coffee.name}`}
                    >
                      <Trash2 size={14} />
                      <span>Remove Vote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-votes-box">
            <div className="empty-votes-icon">
              <Coffee size={40} />
            </div>
            <h3>No votes cast yet</h3>
            <p>
              Explore our selection of handcrafted espressos, cold brews, and milk-based varieties. Your first vote is just a click away!
            </p>
            <a href="#explore" className="btn btn-primary">
              <Compass size={16} />
              <span>Explore Coffees to Vote</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
