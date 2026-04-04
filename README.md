# 📊 Finance Dashboard

A **Modern Minimalist** personal finance dashboard designed for clarity, speed, and deep financial insights. This application provides a high-end interface for tracking transactions, analyzing spending patterns, and managing wealth with a focus on a seamless user experience across all devices.

#### Live Link:- 

---

## ✨ Key Features

* **Dynamic Dashboard:** Real-time visualization of balance trends and spending breakdowns using high-performance charts.
* **Adaptive Theming:** Native Dark and Light mode support with a clean, professional aesthetic.
* **Fully Responsive:** Optimized for everything from ultra-wide monitors to mobile devices with a slide-in sidebar and pruned data tables.
* **Role-Based Access:** Toggle between **Admin** (Edit/Add) and **Viewer** (Read-only) modes.
* **Data Export:** One-click functionality to export your filtered transaction data into **CSV** or **JSON** formats.
* **Financial Insights:** Dedicated insights page calculating savings rates, monthly totals, and highest spending categories.
* **Advanced Filtering:** Search and filter transactions by type, category, or merchant instantly.
* **Local Persistence:** All transaction updates, additions, and theme preferences are automatically saved to your browser's local storage, ensuring your data remains intact across sessions.

---

## 🏗 Overview & Approach

The project is built with a focus on performance, maintainability, and a "Mobile-First" philosophy.

### 1. Architecture
The application follows a **Modular Component-Based Architecture**. Logic is decoupled from the UI:
* **UI Layer:** Purely functional components using Tailwind CSS for styling.
* **Logic Layer:** Custom React hooks (like `useFinanceData`) handle data transformation, ensuring that the components remain "thin" and focused on rendering.

### 2. State Management
Utilizes **Zustand** for lightweight, centralized state management. This handles:
* Global theme state (Dark/Light).
* Sidebar visibility (Toggle/Drawer behavior).
* User permissions (Admin vs. Viewer roles).

### 3. Responsive Strategy
The dashboard uses a **Breakpoint-Driven Layout**:
* **Navigation:** Transitions from a sticky desktop sidebar to a mobile-fixed drawer with a backdrop blur.
* **Data Density:** The `TransactionTable` dynamically prunes non-essential columns (Date/Category) on smaller screens to prevent horizontal scrolling and maintain readability.
* **Grid Logic:** Stat cards and charts stack vertically on mobile while expanding to multi-column grids on desktop.

### 4. Data Portability
The export feature is implemented using **Client-Side Blob Generation**. This allows users to download their currently filtered view as CSV or JSON without requiring a backend processing service, ensuring privacy and speed.

---

## 💾 Data Handling & Persistence

To ensure a seamless user experience without a backend, the application implements a hybrid data strategy:

### 1. Mock Data Integration
Upon the first load, the application populates the dashboard with a robust set of **Mock Data** (`MOCK_TRANSACTIONS`). This allows users to immediately see the "Royal" aesthetics and chart visualizations without having to manually input data first.

### 2. Local Storage Persistence
All changes made within the dashboard—including adding new transactions or editing existing ones—are synchronized with the browser's `localStorage`.
* **Initial Load:** The app checks for existing data under the key `royal_transactions`.
* **Automatic Sync:** Every time the transaction state changes, an `useEffect` hook triggers a stringified update to `localStorage`.
* **Session Persistence:** Your financial data remains intact even after closing the tab or refreshing the browser, providing a "local-first" application feel.

---

## 🛠 Tech Stack

* **Core:** React 18 + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **Charts:** Recharts
* **Routing:** React Router DOM
* **State Management:** Zustand
* **Animations:** CSS Transitions & Transforms

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/daulat68/Finance-Dashboard.git
cd finance-dashboard

### 2. Install Dependency
```bash
npm i

### 3. Run the Project
npm run dev