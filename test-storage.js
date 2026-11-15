// Headless validation of BrewRate Storage & Voting logic
import { INITIAL_COFFEES } from './src/data/coffees.js';

// Polyfill mock localStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, val) {
    this.store[key] = String(val);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.window = {
  localStorage: new MockLocalStorage()
};

const runTests = async () => {
  const {
    getStoredCoffees,
    saveStoredCoffees,
    getStoredUserVotes,
    saveStoredUserVotes,
    resetToDefaults
  } = await import('./src/utils/storage.js');

  console.log('--- Test 1: Initial load returns INITIAL_COFFEES and initializes storage ---');
  const initial = getStoredCoffees(INITIAL_COFFEES);
  console.assert(initial.length === 14, `Expected 14 coffees, got ${initial.length}`);
  console.assert(window.localStorage.getItem('brewRate_coffees') !== null, 'Storage should be initialized');
  console.log('Passed: Storage initialized with 14 coffees.');

  console.log('--- Test 2: User votes array initialized empty ---');
  let userVotes = getStoredUserVotes();
  console.assert(Array.isArray(userVotes) && userVotes.length === 0, 'User votes should start empty');
  console.log('Passed: User votes empty array.');

  console.log('--- Test 3: Cast vote for Cappuccino (ID 1) ---');
  const cappuccino = initial.find(c => c.id === 1);
  const initialVotes = cappuccino.votes;
  const updatedCoffees = initial.map(c => c.id === 1 ? { ...c, votes: c.votes + 1 } : c);
  userVotes = [1];
  saveStoredCoffees(updatedCoffees);
  saveStoredUserVotes(userVotes);

  const reloadedCoffees = getStoredCoffees(INITIAL_COFFEES);
  const reloadedVotes = getStoredUserVotes();
  console.assert(reloadedCoffees.find(c => c.id === 1).votes === initialVotes + 1, 'Vote count should increase by 1');
  console.assert(reloadedVotes.includes(1), 'User votes should include ID 1');
  console.log(`Passed: Cappuccino vote incremented from ${initialVotes} to ${initialVotes + 1}.`);

  console.log('--- Test 4: Remove vote for Cappuccino (ID 1) ---');
  const decrementedCoffees = reloadedCoffees.map(c => c.id === 1 ? { ...c, votes: c.votes - 1 } : c);
  const clearedVotes = reloadedVotes.filter(id => id !== 1);
  saveStoredCoffees(decrementedCoffees);
  saveStoredUserVotes(clearedVotes);

  const finalCoffees = getStoredCoffees(INITIAL_COFFEES);
  const finalVotes = getStoredUserVotes();
  console.assert(finalCoffees.find(c => c.id === 1).votes === initialVotes, 'Vote count should be restored');
  console.assert(!finalVotes.includes(1), 'User votes should no longer contain ID 1');
  console.log('Passed: Vote removed successfully.');

  console.log('--- Test 5: Reset to defaults ---');
  resetToDefaults(INITIAL_COFFEES);
  const resetCoffees = getStoredCoffees(INITIAL_COFFEES);
  const resetUserVotes = getStoredUserVotes();
  console.assert(resetCoffees.length === 14, 'Should have 14 coffees');
  console.assert(resetUserVotes.length === 0, 'User votes should be empty');
  console.log('Passed: Reset function verified.');

  console.log('\nALL STORAGE AND VOTING ENGINE TESTS PASSED! ☕✨');
};

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
