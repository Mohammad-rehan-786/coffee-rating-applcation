import React from 'react';
import { Compass, Award, Sparkles, TrendingUp, Coffee, Flame } from 'lucide-react';
import './Hero.css';

export const Hero = ({ stats }) => {
  const topCoffeeName = stats.topCoffee ? stats.topCoffee.name : 'Cold Brew';
  const topCoffeeVotes = stats.topCoffee ? stats.topCoffee.votes : 0;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>The Artisan Coffee Authority</span>
          </div>

          <h1 className="hero-title">
            Every Cup <br />
            <span className="hero-title-italic">Has a Story.</span>
          </h1>

          <p className="hero-subheading">
            Discover exceptional coffee, cast your vote, and help the community decide which brew deserves the crown.
          </p>

          <div className="hero-actions">
            <a href="#explore" className="btn btn-primary hero-btn">
              <Compass size={18} />
              <span>Explore Coffee</span>
            </a>
            <a href="#leaderboard" className="btn btn-outline hero-btn">
              <Award size={18} />
              <span>View Leaderboard</span>
            </a>
          </div>

          {/* Dynamic Hero Live Statistics Strip */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <div className="stat-number">{stats.totalCoffees}</div>
              <div className="stat-label">Total Coffee Varieties</div>
            </div>
            <div className="stat-divider"></div>

            <div className="hero-stat-item">
              <div className="stat-number">
                {stats.totalVotes.toLocaleString()}
              </div>
              <div className="stat-label">Total Community Votes</div>
            </div>
            <div className="stat-divider"></div>

            <div className="hero-stat-item">
              <div className="stat-number highlight-top">
                {topCoffeeName}
              </div>
              <div className="stat-label">Top Rated Coffee</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Floating Elements */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            {/* Background Glow */}
            <div className="hero-glow"></div>

            {/* Main Featured Visual */}
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85"
              alt="Artisanal pour over coffee in warm cafe lighting"
              className="hero-main-img"
            />

            {/* Floating Element 1: Current #1 Leader */}
            <div className="floating-card floating-card-top">
              <div className="floating-icon-wrap gold">
                <Flame size={20} />
              </div>
              <div className="floating-text">
                <span className="floating-tag">#1 Trending Brew</span>
                <strong className="floating-val">{topCoffeeName}</strong>
                <span className="floating-sub">{topCoffeeVotes} community votes</span>
              </div>
            </div>

            {/* Floating Element 2: 100% Organic & Specialty */}
            <div className="floating-card floating-card-bottom">
              <div className="floating-icon-wrap caramel">
                <Coffee size={20} />
              </div>
              <div className="floating-text">
                <span className="floating-tag">Curated Collection</span>
                <strong className="floating-val">100% Specialty Grade</strong>
                <span className="floating-sub">Espresso, Cold Brew & Milk Crafted</span>
              </div>
            </div>

            {/* Floating Element 3: Live Pulse */}
            <div className="floating-pill">
              <span className="pulse-dot"></span>
              <span>Live Local Votes Synced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
