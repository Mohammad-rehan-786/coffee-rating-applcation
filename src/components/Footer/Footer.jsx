import React from 'react';
import { Coffee, Heart, Globe, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="brewrate-footer">
      <div className="container footer-container">
        {/* Top Tier */}
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Coffee size={22} />
              </div>
              <span className="footer-brand-name">Brew<span className="brand-accent">Rate</span></span>
            </div>
            <p className="footer-mission">
              BrewRate is an independent specialty coffee discovery & rating index dedicated to celebrating coffee terroir, roasting mastery, and community preferences worldwide.
            </p>
            <div className="footer-social-links">
              <a href="#hero" className="social-pill" aria-label="BrewRate Global Community" title="Global Community">
                <Globe size={16} />
              </a>
              <a href="#explore" className="social-pill" aria-label="Share Brews" title="Share Brews">
                <Share2 size={16} />
              </a>
              <a href="#leaderboard" className="social-pill" aria-label="Top Coffee Picks" title="Top Coffee Picks">
                <Sparkles size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#explore">Explore Coffee</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
              <li><a href="#my-votes">My Votes</a></li>
              <li><a href="#statistics">Statistics</a></li>
            </ul>
          </div>

          {/* Coffee Categories */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Popular Categories</h4>
            <ul className="footer-links-list">
              <li><a href="#explore">Milk Based Classics</a></li>
              <li><a href="#explore">Espresso Concentrates</a></li>
              <li><a href="#explore">Cold Brew & Nitro</a></li>
              <li><a href="#explore">Specialty & Dessert</a></li>
              <li><a href="#explore">Heritage Brews</a></li>
            </ul>
          </div>

          {/* Transparency / Architecture Notice */}
          <div className="footer-notice-col">
            <div className="notice-card">
              <div className="notice-header">
                <ShieldCheck size={18} className="notice-icon" />
                <h5>Client-Side Architecture</h5>
              </div>
              <p>
                BrewRate operates 100% backend-free. Voting tallies and personal endorsement records persist safely in your browser's <code>localStorage</code> without external tracking or servers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} BrewRate Inc. Crafted with passion for specialty coffee lovers.
          </p>
          <div className="footer-bottom-links">
            <span className="built-with">
              Built with React &amp; Pure CSS <Heart size={13} className="heart-tiny" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
