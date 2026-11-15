import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles, Coffee } from 'lucide-react';
import { CoffeeCard } from '../CoffeeCard/CoffeeCard';
import { CATEGORIES, SORT_OPTIONS } from '../../data/coffees';
import './CoffeeCollection.css';

export const CoffeeCollection = ({
  coffees,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categoryCounts,
  hasUserVoted,
  onVote,
  onRemoveVote,
  onOpenDetails
}) => {
  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('votes-desc');
  };

  return (
    <section id="explore" className="collection-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Community Curated</span>
          </div>
          <h2 className="section-title">Explore Coffee Collection</h2>
          <p className="section-subtitle">
            Browse our artisanal selection of worldwide coffee preparations. Cast your vote to support your daily ritual.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-controls-card">
          {/* Search Box */}
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by coffee name, origin, or flavor notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search coffee collection"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="sort-selector-wrapper">
            <SlidersHorizontal size={17} className="sort-icon" />
            <label htmlFor="coffee-sort" className="sort-label">Sort by:</label>
            <select
              id="coffee-sort"
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="category-pills-row">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="results-meta-bar">
          <span className="results-count">
            Showing <strong>{coffees.length}</strong> {coffees.length === 1 ? 'variety' : 'varieties'}
            {isFiltered && ` matching your selection`}
          </span>

          {isFiltered && (
            <button className="btn-clear-filters" onClick={handleResetFilters}>
              <X size={14} />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Coffee Grid or Empty State */}
        {coffees.length > 0 ? (
          <div className="coffee-grid">
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                hasVoted={hasUserVoted(coffee.id)}
                onVote={onVote}
                onRemoveVote={onRemoveVote}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="empty-collection-state">
            <div className="empty-icon-wrap">
              <Coffee size={42} />
            </div>
            <h3>No coffee found</h3>
            <p>
              We couldn't find any coffee matching "{searchQuery}". Try searching for another variety or clear your active category filters.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
