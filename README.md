# 🧠 Student Performance and Well-being Optimizer (SPWO)

## Project Overview

The **Student Performance and Well-being Optimizer (SPWO)** is a desktop application designed to solve the chronic problem of burnout and poor time management among high-achieving students, particularly in demanding fields like Engineering.

It moves beyond standard to-do lists and calendars by framing the weekly schedule as a **Dynamic Optimization Problem**. The engine finds the globally optimal schedule that minimizes **Cognitive Cost** and enforces **Skill Consistency**, directly addressing the mental and academic pressures faced by students.

## ✨ Key Features

| Category | Feature | Technical Rationale |
| :--- | :--- | :--- |
| **Optimization Core** | **Dynamic Shortest Path Algorithm** | Implements an **$O(V+A)$ Dynamic Programming** approach on a **Directed Acyclic Graph (DAG)** for ultra-efficient schedule generation. 

[Image of a Directed Acyclic Graph with path]
 |
| **Smart Prioritization** | **Multi-Objective Cost Function** | A customizable function $w(E_i, E_j)$ balances four user priorities (P1-P4) against time gaps, travel, and task load. |
| **Behavioral Design** | **Future-Load Multiplier ($\lambda$)** | Replaces abstract penalties. Neglected high-priority tasks (e.g., DSA) visibly **increase in size** on future schedules, forcing adaptive correction to minimize future load. |
| **User Control** | **Deadline-Driven Scheduling** | Automatically assigns required hours to ensure tasks are completed *before* the deadline, leveraging the cost function's deadline bonus ($C_3$). |
| **UX & Reporting** | **Dynamic Gantt View & Reports** | A clean, light UI with dynamic **Gantt Chart** visualization and shareable **Weekly Reports** summarizing well-being and progress. |

## 📐 Architecture and Technologies

The application is built using a robust, two-process architecture for high performance on Windows 11 (64-bit).

### Architecture Map

The project adheres to a **Client-Centric Model** with a clear separation of concerns (Services, Data, and Presentation).

* **Main Process (Core Logic):** Houses the `OptimizerService` and `CostCalculator`.
* **Renderer Process (UI):** Handles the user interface, calendar rendering, and feedback.

### Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Application Framework** | **Electron** | Packaging the application into a native 64-bit Windows executable. |
| **Core Language** | **TypeScript** | Ensures **Type Safety** throughout the complex data models (ITask, ITracker) and optimization services, reducing runtime errors. |
| **Optimization Engine** | **Node.js + TypeScript** | Provides a performant environment for the CPU-intensive graph traversal and cost calculations. |
| **User Interface** | **React/Vue + TypeScript** | Modern, responsive frontend for the Light UI and dynamic visualizations. |
| **Persistence** | **SQLite** | Local, file-based database for persistence of tasks and history, secured with **data-at-rest encryption** (F11). |

## 🛠️ Installation and Setup

### Prerequisites

* Node.js (LTS version)
* npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/student-optimizer.git](https://github.com/YourUsername/student-optimizer.git)
    cd student-optimizer
    ```

2.  **Install dependencies (for both main and renderer processes):**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the application in development mode:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Build the application (for production 64-bit executable):**
    ```bash
    npm run dist
    # or
    yarn dist
    ```

## 📈 Data Structures & Algorithms Focus

The project is an excellent demonstration of applied data structures:

* **Directed Acyclic Graph (DAG):** Used to model the time-ordered sequence of potential tasks slots.
* **Consistency Tracker:** A key data structure used by the `CostCalculator` to manage the **Dynamic Task Weight ($\lambda$)** and ensure regular practice for critical skills like DSA.
* **Dynamic Programming:** The underlying algorithm used by the `OptimizerService` to find the minimum cognitive cost path $\mathcal{S}$ in $O(V+A)$ time.

## 🤝 Contribution

Contributions, issues, and feature requests are welcome! Feel free to check the [Issues Page](https://github.com/YourUsername/student-optimizer/issues).

---
**License:** [MIT License or appropriate license]

*Replace placeholders like `YourUsername` and update the links before finalizing.*
