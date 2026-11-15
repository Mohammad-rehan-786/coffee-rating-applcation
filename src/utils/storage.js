/**
 * BrewRate - LocalStorage Management Module
 * Pure storage utility isolated from React state and UI components.
 * 
 * Provides robust error handling, serialization/deserialization,
 * safe fallback defaults, and validation.
 */

export const STORAGE_KEYS = {
  COFFEES: 'brewRate_coffees',
  USER_VOTES: 'brewRate_user_votes',
  PREFERENCES: 'brewRate_preferences'
};

/**
 * Checks whether localStorage is supported and accessible in the current environment.
 * @returns {boolean}
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__brewRate_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('[BrewRate Storage] LocalStorage is unavailable or restricted:', error);
    return false;
  }
};

/**
 * Retrieves coffees from localStorage.
 * If no data exists, or if the stored data is invalid/corrupt,
 * initializes localStorage with the default coffee array and returns it.
 *
 * @param {Array} defaultCoffees - Fallback default coffee dataset
 * @returns {Array} Array of coffee objects
 */
export const getStoredCoffees = (defaultCoffees = []) => {
  if (!isStorageAvailable()) {
    return defaultCoffees;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.COFFEES);
    if (!stored) {
      // First visit: initialize storage with baseline coffees
      saveStoredCoffees(defaultCoffees);
      return defaultCoffees;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      console.warn('[BrewRate Storage] Stored coffees corrupted. Falling back to default data.');
      saveStoredCoffees(defaultCoffees);
      return defaultCoffees;
    }

    return parsed;
  } catch (error) {
    console.error('[BrewRate Storage] Error reading coffees from localStorage:', error);
    return defaultCoffees;
  }
};

/**
 * Persists the coffees array to localStorage.
 *
 * @param {Array} coffees - Coffee array with updated vote counts
 * @returns {boolean} True if saved successfully
 */
export const saveStoredCoffees = (coffees) => {
  if (!isStorageAvailable() || !Array.isArray(coffees)) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEYS.COFFEES, JSON.stringify(coffees));
    return true;
  } catch (error) {
    console.error('[BrewRate Storage] Failed to save coffees to localStorage:', error);
    return false;
  }
};

/**
 * Retrieves the array of coffee IDs that the current browser user has voted for.
 * 
 * @returns {Array<number|string>} Array of voted coffee IDs
 */
export const getStoredUserVotes = () => {
  if (!isStorageAvailable()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.USER_VOTES);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error('[BrewRate Storage] Error reading user votes from localStorage:', error);
    return [];
  }
};

/**
 * Persists the array of voted coffee IDs for the current browser user.
 *
 * @param {Array<number|string>} votes - Array of coffee IDs
 * @returns {boolean} True if saved successfully
 */
export const saveStoredUserVotes = (votes) => {
  if (!isStorageAvailable() || !Array.isArray(votes)) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEYS.USER_VOTES, JSON.stringify(votes));
    return true;
  } catch (error) {
    console.error('[BrewRate Storage] Failed to save user votes to localStorage:', error);
    return false;
  }
};

/**
 * Resets application data to initial defaults.
 * Useful for demo/evaluation purposes to retest fresh-install experience.
 *
 * @param {Array} defaultCoffees
 * @returns {{ coffees: Array, userVotes: Array }}
 */
export const resetToDefaults = (defaultCoffees = []) => {
  if (isStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.COFFEES, JSON.stringify(defaultCoffees));
      window.localStorage.setItem(STORAGE_KEYS.USER_VOTES, JSON.stringify([]));
    } catch (error) {
      console.error('[BrewRate Storage] Error during reset:', error);
    }
  }

  return {
    coffees: defaultCoffees,
    userVotes: []
  };
};
