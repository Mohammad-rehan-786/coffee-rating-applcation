import React, { useState, useEffect } from 'react';
import { Coffee, Award, Heart, BarChart3, Compass, Menu, X, RotateCcw } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ userVotesCount, onResetData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    onResetData();
    setShowResetConfirm(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <a href="#hero" className="nav-logo" onClick={closeMobileMenu}>
            <div className="logo-icon-wrap">
              <Coffee className="logo-icon" size={24} />
            </div>
            <div className="logo-text-group">
              <span className="logo-brand">Brew<span className="logo-accent">Rate</span></span>
              <span className="logo-tagline">Specialty Index</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="nav-links desktop-only">
            <a href="#hero" className="nav-link">
              Home
            </a>
            <a href="#explore" className="nav-link">
              <Compass size={16} />
              Explore Coffee
            </a>
            <a href="#leaderboard" className="nav-link">
              <Award size={16} />
              Leaderboard
            </a>
            <a href="#my-votes" className="nav-link nav-link-highlight">
              <Heart size={16} />
              My Votes
              {userVotesCount > 0 && (
                <span className="nav-badge">{userVotesCount}</span>
              )}
            </a>
            <a href="#statistics" className="nav-link">
              <BarChart3 size={16} />
              Statistics
            </a>
          </div>

          {/* Desktop Right Actions */}
          <div className="nav-actions desktop-only">
            <button
              className="btn-reset-data"
              onClick={handleResetClick}
              title="Reset application to default baseline data"
            >
              <RotateCcw size={14} />
              <span>Reset Data</span>
            </button>
            <a href="#explore" className="btn btn-primary btn-sm">
              Cast a Vote
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-links">
            <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="#explore" className="mobile-nav-link" onClick={closeMobileMenu}>
              <Compass size={18} />
              Explore Coffee
            </a>
            <a href="#leaderboard" className="mobile-nav-link" onClick={closeMobileMenu}>
              <Award size={18} />
              Leaderboard
            </a>
            <a href="#my-votes" className="mobile-nav-link" onClick={closeMobileMenu}>
              <Heart size={18} />
              My Votes
              {userVotesCount > 0 && (
                <span className="nav-badge mobile-badge">{userVotesCount}</span>
              )}
            </a>
            <a href="#statistics" className="mobile-nav-link" onClick={closeMobileMenu}>
              <BarChart3 size={18} />
              Statistics
            </a>
          </div>

          <div className="mobile-drawer-footer">
            <button
              className="btn-reset-data mobile-reset-btn"
              onClick={handleResetClick}
            >
              <RotateCcw size={15} />
              <span>Reset to Defaults</span>
            </button>
            <a
              href="#explore"
              className="btn btn-accent btn-block"
              onClick={closeMobileMenu}
            >
              Start Voting
            </a>
          </div>
        </div>
      </nav>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <RotateCcw size={28} />
            </div>
            <h3>Reset Application Data?</h3>
            <p>
              This will reset all coffee vote tallies back to baseline and clear your personal voting history in this browser's localStorage.
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmReset}>
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
