# 🌍 Earthquake Data Explorer

A single-page React application that fetches live earthquake data from the USGS public CSV feed and displays it through an interactive chart and scrollable data table.

---

## ✨ Features

- 📡 Loads and parses real-time earthquake CSV data from USGS
- 📊 Interactive scatter plot powered by Recharts
- 📋 Scrollable data table with sticky headers
- 🔀 Axis selectors for any numeric chart variable
- 🔗 Table-to-chart highlighting
- 🔗 Chart-to-table highlighting and auto-scroll

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Project setup and dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Recharts](https://recharts.org/) | Chart visualization |
| [PapaParse](https://www.papaparse.com/) | CSV parsing |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| [TanStack Virtual](https://tanstack.com/virtual/latest) | Virtualized table rows |

---

## 🚀 Setup

```bash
npm install
npm run dev
npm run build
```

---

## 📡 Data Source

Live earthquake data is fetched from the **USGS Earthquake Hazards Program**:

```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv
```

This feed includes all earthquakes recorded globally over the past 30 days.

---

## 🗂 State Management

This project demonstrates three complementary state-sharing approaches:

### Props
`App.tsx` passes earthquake data, selected axis values, and axis update handlers directly into child components.

### React Context
A selected-earthquake context provider is mounted at the root level, making the current selection available anywhere in the tree without prop drilling.

### Zustand
A global store synchronizes the selected earthquake between the chart and the table, enabling bidirectional highlighting without tightly coupling the two components.

---

## ⚡ Performance Considerations

The USGS feed can return **thousands of records**. Two key optimizations keep the UI responsive:

- **Virtualized table rendering** — [TanStack Virtual](https://tanstack.com/virtual/latest) renders only the rows currently visible in the viewport, keeping DOM node count low regardless of dataset size.
- **Chart animations disabled** — Recharts animation is turned off to prevent frame drops when rendering large point clouds. The chart only display points with magnitude more than 2.5 to make it efficient and useful.

---

## 🔁 Chart ↔ Table Interaction

Selecting a point on the scatter chart highlights the corresponding row in the table **and scrolls it into view**. Likewise, clicking a table row highlights its point on the chart. This bidirectional linking makes the two views feel like a single cohesive tool rather than separate components.

---

## 🤖 AI Usage

AI tools were used to help:

- Plan the initial component structure
- Identify performance bottlenecks with large datasets
- Refactor deeply nested CSV parsing logic
- Improve inline documentation

All generated output was reviewed, adjusted, and manually tested before being included in the final implementation.
