# Student Optimizer (Electron/TypeScript)

This project is a cross-platform desktop app for student performance and well-being optimization, built with Electron, React, and TypeScript.

## Architecture
- **Presentation Tier (src/):** React/TS UI, meme-based feedback, charts, forms
- **Core Logic Tier (electron/services/):** Optimization engine, cost logic, AI, reporting, authentication
- **Data Management Tier (electron/database/):** SQLite client, repositories, schema

## Quick Start
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run Electron app:
   ```powershell
   npm run electron
   ```

## Folder Structure
See code for full breakdown. Extend each service/component as needed for your features.
