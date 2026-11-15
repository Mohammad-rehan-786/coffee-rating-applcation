import React from 'react';
import { BarChart3, Coffee, Users, Flame, PieChart, Sparkles } from 'lucide-react';
import './Statistics.css';

export const Statistics = ({ stats, coffees }) => {
  const topCoffeeName = stats.topCoffee ? stats.topCoffee.name : 'Cold Brew';
  const topCoffeeVotes = stats.topCoffee ? stats.topCoffee.votes : 0;
  const topCoffeeShare = stats.totalVotes > 0 && stats.topCoffee
    ? ((stats.topCoffee.votes / stats.totalVotes) * 100).toFixed(1)
    : '0';

  // Category votes distribution
  const categoryVotes = {};
  coffees.forEach((coffee) => {
    categoryVotes[coffee.category] = (categoryVotes[coffee.category] || 0) + (coffee.votes || 0);
  });

  const categoryList = Object.entries(categoryVotes).sort((a, b) => b[1] - a[1]);

  return (
    <section id="statistics" className="statistics-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <BarChart3 size={14} />
            <span>Live Analytics</span>
          </div>
          <h2 className="section-title">Community Statistics</h2>
          <p className="section-subtitle">
            Dynamic platform intelligence calculated straight from persistent local state. Track community preferences and voting velocity.
          </p>
        </div>

        {/* 4 Core Dynamic Metric Cards */}
        <div className="metrics-grid">
          {/* Metric 1: Total Coffees */}
          <div className="metric-card">
            <div className="metric-icon-wrap caramel">
              <Coffee size={24} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Total Varieties</span>
              <div className="metric-value">{stats.totalCoffees}</div>
              <span className="metric-meta">Across 4 distinct flavor categories</span>
            </div>
          </div>

          {/* Metric 2: Total Community Votes */}
          <div className="metric-card">
            <div className="metric-icon-wrap brown">
              <Users size={24} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Total Community Votes</span>
              <div className="metric-value">{stats.totalVotes.toLocaleString()}</div>
              <span className="metric-meta">Accumulated across all varieties</span>
            </div>
          </div>

          {/* Metric 3: Most Popular Coffee */}
          <div className="metric-card highlight-card">
            <div className="metric-icon-wrap gold">
              <Flame size={24} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Most Popular Brew</span>
              <div className="metric-value metric-value-title">{topCoffeeName}</div>
              <span className="metric-meta highlight-meta">
                {topCoffeeVotes} votes ({topCoffeeShare}% of total votes)
              </span>
            </div>
          </div>

          {/* Metric 4: Average Votes per Coffee */}
          <div className="metric-card">
            <div className="metric-icon-wrap cream">
              <PieChart size={24} />
            </div>
            <div className="metric-details">
              <span className="metric-label">Average Votes / Variety</span>
              <div className="metric-value">{stats.avgVotes}</div>
              <span className="metric-meta">Mean community vote density</span>
            </div>
          </div>
        </div>

        {/* Analytical Category Distribution Strip */}
        <div className="category-distribution-box">
          <div className="dist-header">
            <div className="dist-title-group">
              <Sparkles size={18} className="dist-sparkle" />
              <h3>Votes by Category Distribution</h3>
            </div>
            <span className="dist-total-tag">
              Total {stats.totalVotes} Votes
            </span>
          </div>

          <div className="dist-bars-container">
            {categoryList.map(([cat, votes]) => {
              const pct = stats.totalVotes > 0
                ? ((votes / stats.totalVotes) * 100).toFixed(1)
                : 0;
              return (
                <div key={cat} className="dist-bar-item">
                  <div className="dist-bar-meta">
                    <span className="dist-cat-name">{cat}</span>
                    <span className="dist-cat-nums">
                      <strong>{votes}</strong> votes ({pct}%)
                    </span>
                  </div>
                  <div className="dist-bar-track">
                    <div
                      className="dist-bar-fill"
                      style={{ width: `${pct}%` }}
                    ></div>
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
