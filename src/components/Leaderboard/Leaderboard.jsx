import React from 'react';
import { Trophy, Crown, Flame, Medal, Heart, Check, ArrowUpRight } from 'lucide-react';
import './Leaderboard.css';

export const Leaderboard = ({
  leaderboard,
  hasUserVoted,
  onVote,
  onRemoveVote,
  onOpenDetails
}) => {
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <section id="leaderboard" className="leaderboard-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Trophy size={14} />
            <span>Community Standings</span>
          </div>
          <h2 className="section-title">The BrewRate Leaderboard</h2>
          <p className="section-subtitle">
            Rankings update automatically in real-time with every vote cast. See which brew currently holds the crown.
          </p>
        </div>

        {/* Podium Display for Top 3 */}
        {topThree.length >= 3 && (
          <div className="podium-container">
            {/* Rank 2 (Silver) */}
            <div className="podium-card rank-2">
              <div className="podium-rank-badge rank-2-badge">
                <Medal size={16} />
                <span>#2</span>
              </div>
              <div
                className="podium-avatar-wrap"
                onClick={() => onOpenDetails(topThree[1])}
              >
                <img
                  src={topThree[1].image}
                  alt={topThree[1].name}
                  className="podium-img"
                />
              </div>
              <h4 className="podium-name" onClick={() => onOpenDetails(topThree[1])}>
                {topThree[1].name}
              </h4>
              <span className="podium-category">{topThree[1].category}</span>
              <div className="podium-votes">
                <Heart size={14} className="podium-heart" />
                <strong>{topThree[1].votes}</strong>
                <span>votes ({topThree[1].sharePercentage}%)</span>
              </div>
              <div className="podium-action">
                {!hasUserVoted(topThree[1].id) ? (
                  <button
                    className="btn-podium-vote"
                    onClick={() => onVote(topThree[1].id)}
                  >
                    Vote
                  </button>
                ) : (
                  <span className="podium-voted-pill">
                    <Check size={12} /> Backed
                  </span>
                )}
              </div>
              <div className="podium-pedestal pedestal-2">
                <span>2nd Place</span>
              </div>
            </div>

            {/* Rank 1 (Gold / Crown) */}
            <div className="podium-card rank-1">
              <div className="crown-ornament">
                <Crown size={32} />
              </div>
              <div className="podium-rank-badge rank-1-badge">
                <Crown size={16} />
                <span>#1 Champion</span>
              </div>
              <div
                className="podium-avatar-wrap podium-avatar-gold"
                onClick={() => onOpenDetails(topThree[0])}
              >
                <img
                  src={topThree[0].image}
                  alt={topThree[0].name}
                  className="podium-img"
                />
              </div>
              <h4 className="podium-name" onClick={() => onOpenDetails(topThree[0])}>
                {topThree[0].name}
              </h4>
              <span className="podium-category">{topThree[0].category}</span>
              <div className="podium-votes highlight-gold">
                <Flame size={16} />
                <strong>{topThree[0].votes}</strong>
                <span>votes ({topThree[0].sharePercentage}%)</span>
              </div>
              <div className="podium-action">
                {!hasUserVoted(topThree[0].id) ? (
                  <button
                    className="btn-podium-vote gold-btn"
                    onClick={() => onVote(topThree[0].id)}
                  >
                    Vote for #1
                  </button>
                ) : (
                  <span className="podium-voted-pill gold-voted">
                    <Check size={12} /> Crowned
                  </span>
                )}
              </div>
              <div className="podium-pedestal pedestal-1">
                <span>1st Place</span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="podium-card rank-3">
              <div className="podium-rank-badge rank-3-badge">
                <Medal size={16} />
                <span>#3</span>
              </div>
              <div
                className="podium-avatar-wrap"
                onClick={() => onOpenDetails(topThree[2])}
              >
                <img
                  src={topThree[2].image}
                  alt={topThree[2].name}
                  className="podium-img"
                />
              </div>
              <h4 className="podium-name" onClick={() => onOpenDetails(topThree[2])}>
                {topThree[2].name}
              </h4>
              <span className="podium-category">{topThree[2].category}</span>
              <div className="podium-votes">
                <Heart size={14} className="podium-heart" />
                <strong>{topThree[2].votes}</strong>
                <span>votes ({topThree[2].sharePercentage}%)</span>
              </div>
              <div className="podium-action">
                {!hasUserVoted(topThree[2].id) ? (
                  <button
                    className="btn-podium-vote"
                    onClick={() => onVote(topThree[2].id)}
                  >
                    Vote
                  </button>
                ) : (
                  <span className="podium-voted-pill">
                    <Check size={12} /> Backed
                  </span>
                )}
              </div>
              <div className="podium-pedestal pedestal-3">
                <span>3rd Place</span>
              </div>
            </div>
          </div>
        )}

        {/* Full Rankings Table List */}
        <div className="leaderboard-table-card">
          <div className="table-header-row">
            <span className="th-cell th-rank">Rank</span>
            <span className="th-cell th-coffee">Coffee & Profile</span>
            <span className="th-cell th-category">Category & Origin</span>
            <span className="th-cell th-share">Popularity Share</span>
            <span className="th-cell th-votes">Votes</span>
            <span className="th-cell th-action">Action</span>
          </div>

          <div className="table-body">
            {leaderboard.map((coffee) => {
              const voted = hasUserVoted(coffee.id);
              const isWinner = coffee.rank === 1;

              return (
                <div
                  key={coffee.id}
                  className={`table-row ${isWinner ? 'row-winner' : ''} ${voted ? 'row-user-voted' : ''}`}
                >
                  {/* Rank Column */}
                  <div className="td-cell td-rank">
                    <span className={`rank-indicator rank-num-${coffee.rank <= 3 ? coffee.rank : 'other'}`}>
                      {isWinner ? <Crown size={15} /> : `#${coffee.rank}`}
                    </span>
                  </div>

                  {/* Coffee Info */}
                  <div
                    className="td-cell td-coffee"
                    onClick={() => onOpenDetails(coffee)}
                  >
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="table-coffee-thumb"
                    />
                    <div className="table-coffee-meta">
                      <div className="table-coffee-name-group">
                        <strong className="table-coffee-name">{coffee.name}</strong>
                        {isWinner && (
                          <span className="winner-pill">
                            <Crown size={11} /> Winner
                          </span>
                        )}
                      </div>
                      <span className="table-coffee-tagline">{coffee.tagline}</span>
                    </div>
                  </div>

                  {/* Category & Origin */}
                  <div className="td-cell td-category">
                    <span className="table-category-tag">{coffee.category}</span>
                    <span className="table-origin-text">{coffee.origin}</span>
                  </div>

                  {/* Popularity Share & Progress Bar */}
                  <div className="td-cell td-share">
                    <div className="share-progress-container">
                      <div className="share-text-row">
                        <span className="share-pct">{coffee.sharePercentage}%</span>
                        <span className="share-sub">of all votes</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${Math.min(100, Math.max(5, parseFloat(coffee.sharePercentage) * 2))}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Votes Column */}
                  <div className="td-cell td-votes">
                    <span className="votes-tally-number">{coffee.votes}</span>
                    <span className="votes-label">votes</span>
                  </div>

                  {/* Action Column */}
                  <div className="td-cell td-action">
                    {!voted ? (
                      <button
                        className="btn-table-vote"
                        onClick={() => onVote(coffee.id)}
                        title={`Vote for ${coffee.name}`}
                      >
                        <Heart size={14} />
                        <span>Vote</span>
                      </button>
                    ) : (
                      <button
                        className="btn-table-voted"
                        onClick={() => onRemoveVote(coffee.id)}
                        title="Click to remove your vote"
                      >
                        <Check size={14} />
                        <span>Voted</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
