import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { CoffeeCollection } from './components/CoffeeCollection/CoffeeCollection';
import { Leaderboard } from './components/Leaderboard/Leaderboard';
import { MyVotes } from './components/MyVotes/MyVotes';
import { Statistics } from './components/Statistics/Statistics';
import { Footer } from './components/Footer/Footer';
import { CoffeeModal } from './components/CoffeeModal/CoffeeModal';
import { Toast } from './components/Toast/Toast';
import { useCoffeeVotes } from './hooks/useCoffeeVotes';
import './App.css';

export const App = () => {
  const {
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
  } = useCoffeeVotes();

  return (
    <div className="app-layout">
      {/* Toast Notification System */}
      <Toast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Primary Navigation Bar */}
      <Navbar
        userVotesCount={stats.userVotesCount}
        onResetData={resetData}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero stats={stats} />

        {/* Coffee Collection Section (Search, Filter, Sort, Cards) */}
        <CoffeeCollection
          coffees={filteredCoffees}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryCounts={categoryCounts}
          hasUserVoted={hasUserVoted}
          onVote={voteCoffee}
          onRemoveVote={removeVote}
          onOpenDetails={setSelectedCoffeeForModal}
        />

        {/* Leaderboard Section (Top 3 Podium + Full Dynamic Standings) */}
        <Leaderboard
          leaderboard={leaderboard}
          hasUserVoted={hasUserVoted}
          onVote={voteCoffee}
          onRemoveVote={removeVote}
          onOpenDetails={setSelectedCoffeeForModal}
        />

        {/* My Votes Section (Personal Voting History & Vote Revocation) */}
        <MyVotes
          votedCoffees={votedCoffees}
          onRemoveVote={removeVote}
          onOpenDetails={setSelectedCoffeeForModal}
        />

        {/* Platform Analytics & Statistics Section */}
        <Statistics
          stats={stats}
          coffees={coffees}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Coffee Profile Detail Modal */}
      <CoffeeModal
        coffee={selectedCoffeeForModal}
        hasVoted={selectedCoffeeForModal ? hasUserVoted(selectedCoffeeForModal.id) : false}
        onVote={voteCoffee}
        onRemoveVote={removeVote}
        onClose={() => setSelectedCoffeeForModal(null)}
      />
    </div>
  );
};

export default App;
