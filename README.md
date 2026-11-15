# BrewRate — Premium Coffee Rating & Community Discovery Application

BrewRate is a modern, responsive, specialty-grade coffee rating web application built with **React**, **Vite**, **ES6+**, and clean **CSS3** (no Tailwind). It features a completely **backend-less** architecture that simulates a live database-backed voting platform using the browser's persistent `localStorage`.

---

## ☕ Key Features

1. **Artisanal Coffee Collection**
   - Curated catalog of **14 specialty coffee varieties** (Cappuccino, Espresso, Americano, Latte, Mocha, Flat White, Macchiato, Cold Brew, Caramel Macchiato, Irish Coffee, Affogato, Dalgona Coffee, Nitro Cold Brew, Turkish Coffee).
   - High-resolution coffee photography with intelligent fallback handling.
   - Comprehensive coffee meta: origin country, roast profiles, strength meters, prep times, and tasting flavor notes.

2. **Backend-less Voting Engine**
   - Instant single-click voting with immediate UI state synchronization.
   - Celebratory micro-interactions: particle confetti burst and celebratory pulse feedback.
   - Duplicate vote prevention per browser session with visual "Voted" lock.
   - Dynamic counter badge updating live across cards, leaderboard, and statistics.
   - Vote revocation capability (decrements tally, cleans local ledger, syncs immediately).

3. **Dynamic Standings & Podium Leaderboard**
   - Olympic-style top 3 podium: #1 Champion (Gold with Crown), #2 (Silver Medal), #3 (Bronze Medal).
   - Full ranked table with live popularity percentage bars and vote shares.
   - Auto-updating ranks in real-time as votes are cast or retracted.

4. **Real-Time Search & Category Filters**
   - Instant filter-as-you-type search across coffee names, origins, descriptions, and flavor notes.
   - Category filter pills: All, Milk Based, Espresso Based, Cold & Iced, Specialty & Sweet with dynamic count badges.
   - Sorting dropdown: Most Popular, Least Popular, Alphabetical (A-Z, Z-A), and Strength.

5. **Personal Voting Ledger ("My Votes")**
   - Dedicated passport section displaying all coffees backed by the current browser user.
   - One-click "Remove Vote" button with confirmation and undo feedback.
   - Empty state illustration with quick CTA to discover brews.

6. **Live Analytics & Statistics Strip**
   - Dynamic metric cards: Total Varieties, Total Community Votes, Most Popular Brew, and Average Votes per Variety.
   - Category vote distribution bar chart.
   - Hero section dynamic counters.

7. **Specialty Coffee Detail Modal**
   - Full tasting profile modal with extraction times, bean roast meters, and temperature indicators.
   - Direct voting from within the modal.

8. **Reset to Baseline Feature**
   - Quick "Reset Data" button with confirmation modal to reset storage to default baseline dataset during evaluation or demo testing.

---

## 🎨 Design Philosophy & Theme

- **Primary Background**: Warm Cream (`#F7F3EC`)
- **Secondary Background**: Coffee Brown (`#4B2E23`)
- **Accent**: Liquid Caramel (`#C58B52`) and Golden Foam (`#D4A373`)
- **Dark Text**: Espresso (`#241812`)
- **Cards**: White & Warm Beige with subtle borders and multi-layer soft shadows
- **Typography**: Editorial luxury serif headings (*Playfair Display*, *Cinzel*) combined with modern sans-serif body (*Plus Jakarta Sans*) and high-legibility numerals (*Outfit*).

---

## 📁 Project Architecture & Folder Structure

```
c:\Users\RIYAJUL HAQ\Desktop\Coffee rating application\
├── index.html                     # HTML5 entry with Google Fonts & meta tags
├── package.json                   # Dependencies & npm scripts
├── vite.config.js                 # Vite bundler configuration
├── src/
│   ├── main.jsx                   # React 18 root mounting
│   ├── index.css                  # Design tokens, variables & base styles
│   ├── App.jsx                    # Root layout & component coordination
│   ├── App.css                    # App layout container styles
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx         # Sticky header, logo, nav links & mobile drawer
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx           # Editorial hero, dynamic stats & floating cards
│   │   │   └── Hero.css
│   │   ├── CoffeeCard/
│   │   │   ├── CoffeeCard.jsx     # Card UI, vote buttons, tags & hover effects
│   │   │   └── CoffeeCard.css
│   │   ├── CoffeeCollection/
│   │   │   ├── CoffeeCollection.jsx # Search, category pills, sort dropdown & grid
│   │   │   └── CoffeeCollection.css
│   │   ├── Leaderboard/
│   │   │   ├── Leaderboard.jsx    # Top 3 podium, ranking badges & progress bars
│   │   │   └── Leaderboard.css
│   │   ├── MyVotes/
│   │   │   ├── MyVotes.jsx        # Personal voted coffees list & vote remover
│   │   │   └── MyVotes.css
│   │   ├── Statistics/
│   │   │   ├── Statistics.jsx     # 4 dynamic metric cards & category distribution
│   │   │   └── Statistics.css
│   │   ├── CoffeeModal/
│   │   │   ├── CoffeeModal.jsx    # Detailed tasting profile dialog
│   │   │   └── CoffeeModal.css
│   │   ├── Toast/
│   │   │   ├── Toast.jsx          # Notification alert bar
│   │   │   └── Toast.css
│   │   └── Footer/
│   │       ├── Footer.jsx         # Brand mission, links, disclaimer & copyright
│   │       └── Footer.css
│   │
│   ├── data/
│   │   └── coffees.js             # Initial 14 specialty coffees baseline dataset
│   │
│   ├── hooks/
│   │   └── useCoffeeVotes.js      # Custom React hook encapsulating state & logic
│   │
│   └── utils/
│       └── storage.js             # Pure localStorage service with validation & safety
```

---

## 🧠 LocalStorage Voting System Explanation

This application stores state completely on the client side using the HTML5 Web Storage API:

1. **Storage Keys**:
   - `brewRate_coffees`: Stores the serialized JSON array of coffee objects along with their current cumulative vote counts.
   - `brewRate_user_votes`: Stores the serialized JSON array of coffee IDs that the current browser user has voted for (e.g., `[1, 4, 8]`).

2. **Initialization Flow (`storage.js`)**:
   - On first visit, `getStoredCoffees()` checks if `brewRate_coffees` exists in `localStorage`.
   - If absent or invalid, it initializes `brewRate_coffees` with `INITIAL_COFFEES` and returns the default dataset.
   - If valid data is already present, it is parsed and preserved. Existing votes are never overwritten on reload.

3. **Voting Flow (`voteCoffee(id)`)**:
   - Verifies whether the `coffeeId` is already present in `userVotes`.
   - If present, prevents duplicate voting and alerts the user.
   - If not present:
     - Increments the `votes` count of the target coffee in state.
     - Appends the `coffeeId` to `userVotes`.
     - Serializes and writes both immediately to `localStorage`.
     - Fires particle celebration effects and triggers a confirmation toast.

4. **Vote Revocation Flow (`removeVote(id)`)**:
   - Decrements the coffee's `votes` count in state (floor bounded at 0).
   - Removes the `coffeeId` from `userVotes`.
   - Writes updated data immediately to `localStorage`.
   - Updates the Leaderboard and Statistics instantaneously.

5. **Technical Limitation Notice**:
   - Votes are persisted within the current browser's storage sandbox.
   - They are not synchronized across distinct physical devices or separate browser profiles.
   - Clearing browser site data resets the votes back to default baselines.

---

## 🚀 Installation & Running the Application

### Prerequisites
- Node.js (v18.0 or newer)
- npm (v9.0 or newer)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### Step 3: Production Build & Preview
```bash
# Build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Testing & Verification Guide

1. **Verify Default Initialization**:
   - Load the page. Observe that the Hero section displays 14 total varieties and community votes calculated dynamically.
2. **Search & Filter**:
   - Type `"Cold"` in the search box: only "Cold Brew", "Nitro Cold Brew", and "Dalgona Coffee" appear.
   - Click `"Milk Based"` category pill: Cappuccino, Latte, and Flat White appear.
   - Change Sort to `"Least Popular (Votes Low to High)"` and observe instant reordering.
3. **Casting a Vote**:
   - Find "Flat White" and click **"Vote for this Coffee"**.
   - Note the confetti animation, toast message, and button changing to **"✓ Voted"**.
   - Attempting to vote again is disabled.
4. **Leaderboard Synchronization**:
   - Scroll down to the Leaderboard. Verify Flat White has incremented by 1 vote and its rank/percentage bar updated.
5. **My Votes Ledger**:
   - Scroll to "My Votes". Observe Flat White appears with an active status badge.
   - Click **"Remove Vote"**: the card is removed from My Votes, the global vote count decrements by 1, and the Explore card returns to "Vote for this Coffee".
6. **Data Persistence Check**:
   - Refresh the page (F5). All your votes and count updates remain intact from `localStorage`.
7. **Resetting Data**:
   - Click the "Reset Data" button in the navigation bar and confirm to restore baseline factory defaults.

---

## 🌐 GitHub Pages Deployment Instructions

To deploy BrewRate to GitHub Pages:

1. In `vite.config.js`, configure the base repository path:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/<repository-name>/', // Replace with your repository name
   });
   ```

2. Add `gh-pages` deployment script to `package.json`:
   ```bash
   npm install --save-dev gh-pages
   ```
   Add scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy with a single command:
   ```bash
   npm run deploy
   ```
   Your site will be live at `https://<your-username>.github.io/<repository-name>/`.
