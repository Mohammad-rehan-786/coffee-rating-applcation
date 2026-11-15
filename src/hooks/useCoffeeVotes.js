import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_COFFEES } from '../data/coffees';
import {
  getStoredCoffees,
  saveStoredCoffees,
  getStoredUserVotes,
  saveStoredUserVotes,
  resetToDefaults
} from '../utils/storage';

/**
 * Custom React Hook to manage coffee voting, filtering, sorting,
 * dynamic statistics, and synchronized localStorage persistence.
 */
export const useCoffeeVotes = () => {
  // State for coffees and user votes initialized from localStorage
  const [coffees, setCoffees] = useState(() => getStoredCoffees(INITIAL_COFFEES));
  const [userVotes, setUserVotes] = useState(() => getStoredUserVotes());

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('votes-desc');

  // Detail Modal state for exploring coffee profiles
  const [selectedCoffeeForModal, setSelectedCoffeeForModal] = useState(null);

  // Notification Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Dismiss toast automatically
  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.show]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  /**
   * Cast a vote for a coffee.
   * Prevents duplicate votes per coffee for the current browser user.
   * Immediately synchronizes to localStorage.
   */
  const voteCoffee = useCallback((coffeeId) => {
    if (userVotes.includes(coffeeId)) {
      showToast('You have already cast a vote for this coffee!', 'warning');
      return false;
    }

    const targetCoffee = coffees.find((c) => c.id === coffeeId);
    if (!targetCoffee) return false;

    const updatedCoffees = coffees.map((c) =>
      c.id === coffeeId ? { ...c, votes: c.votes + 1 } : c
    );
    const updatedUserVotes = [...userVotes, coffeeId];

    // Update state
    setCoffees(updatedCoffees);
    setUserVotes(updatedUserVotes);

    // Save to localStorage immediately
    saveStoredCoffees(updatedCoffees);
    saveStoredUserVotes(updatedUserVotes);

    showToast(`Voted for ${targetCoffee.name}! Thank you for your review.`, 'success');

    // Confetti celebration effect
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#C58B52', '#4B2E23', '#D4A373', '#F7F3EC']
      });
    } catch {
      // Ignore if confetti fails
    }

    return true;
  }, [coffees, userVotes, showToast]);

  /**
   * Remove an existing vote for a coffee.
   * Decrements the vote count and synchronizes to localStorage.
   */
  const removeVote = useCallback((coffeeId) => {
    if (!userVotes.includes(coffeeId)) {
      showToast('No active vote found to remove.', 'warning');
      return false;
    }

    const targetCoffee = coffees.find((c) => c.id === coffeeId);
    const updatedCoffees = coffees.map((c) =>
      c.id === coffeeId ? { ...c, votes: Math.max(0, c.votes - 1) } : c
    );
    const updatedUserVotes = userVotes.filter((id) => id !== coffeeId);

    // Update state
    setCoffees(updatedCoffees);
    setUserVotes(updatedUserVotes);

    // Save to localStorage immediately
    saveStoredCoffees(updatedCoffees);
    saveStoredUserVotes(updatedUserVotes);

    showToast(`Removed your vote for ${targetCoffee ? targetCoffee.name : 'coffee'}.`, 'info');
    return true;
  }, [coffees, userVotes, showToast]);

  /**
   * Checks whether the current user has voted for a specific coffee.
   */
  const hasUserVoted = useCallback((coffeeId) => {
    return userVotes.includes(coffeeId);
  }, [userVotes]);

  /**
   * Reset application data to initial predefined values.
   */
  const resetData = useCallback(() => {
    const fresh = resetToDefaults(INITIAL_COFFEES);
    setCoffees(fresh.coffees);
    setUserVotes(fresh.userVotes);
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('votes-desc');
    showToast('BrewRate data has been reset to defaults.', 'info');
  }, [showToast]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const totalCoffees = coffees.length;
    const totalVotes = coffees.reduce((acc, curr) => acc + (curr.votes || 0), 0);
    const userVotesCount = userVotes.length;

    let topCoffee = coffees.length > 0
      ? coffees.reduce((prev, current) => (prev.votes > current.votes) ? prev : current, coffees[0])
      : null;

    const avgVotes = totalCoffees > 0 ? (totalVotes / totalCoffees).toFixed(1) : '0';

    return {
      totalCoffees,
      totalVotes,
      userVotesCount,
      topCoffee,
      avgVotes
    };
  }, [coffees, userVotes]);

  // Leaderboard ranking (All coffees sorted by votes descending with rank and share percentage)
  const leaderboard = useMemo(() => {
    const sorted = [...coffees].sort((a, b) => b.votes - a.votes);
    const totalVotes = stats.totalVotes || 1;

    return sorted.map((coffee, index) => ({
      ...coffee,
      rank: index + 1,
      sharePercentage: ((coffee.votes / totalVotes) * 100).toFixed(1),
      isLeader: index === 0
    }));
  }, [coffees, stats.totalVotes]);

  // List of coffees the current user has voted for
  const votedCoffees = useMemo(() => {
    return coffees.filter((coffee) => userVotes.includes(coffee.id));
  }, [coffees, userVotes]);

  // Category counts for filter pills
  const categoryCounts = useMemo(() => {
    const counts = { All: coffees.length };
    coffees.forEach((coffee) => {
      counts[coffee.category] = (counts[coffee.category] || 0) + 1;
    });
    return counts;
  }, [coffees]);

  // Filtered & Sorted coffees for Explore section
  const filteredCoffees = useMemo(() => {
    let result = [...coffees];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((coffee) => coffee.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (coffee) =>
          coffee.name.toLowerCase().includes(q) ||
          coffee.description.toLowerCase().includes(q) ||
          coffee.origin.toLowerCase().includes(q) ||
          coffee.category.toLowerCase().includes(q) ||
          (coffee.flavorNotes && coffee.flavorNotes.some((note) => note.toLowerCase().includes(q)))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'votes-desc':
          return b.votes - a.votes;
        case 'votes-asc':
          return a.votes - b.votes;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'strength-desc':
          return (b.strength || 0) - (a.strength || 0);
        default:
          return b.votes - a.votes;
      }
    });

    return result;
  }, [coffees, selectedCategory, searchQuery, sortBy]);

  return {
    coffees,
    userVotes,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredCoffees,
    votedCoffees,
    leaderboard,
    stats,
    categoryCounts,
    voteCoffee,
    removeVote,
    hasUserVoted,
    resetData,
    selectedCoffeeForModal,
    setSelectedCoffeeForModal,
    toast,
    setToast
  };
};
