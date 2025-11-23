import React from 'react';
import ProgressLineChart from './components/Charts/progresslinechart';
import TimeGanttChart from './components/Charts/ganttchart';
import { MOCK_SCHEDULE } from './models/ITask';

const App: React.FC = () => {
  // Mock data for ProgressLineChart
  const mockProgressData = [
    { date: new Date(2025, 10, 16), completionRate: 85, cognitiveLoad: 120 },
    { date: new Date(2025, 10, 17), completionRate: 90, cognitiveLoad: 140 },
    { date: new Date(2025, 10, 18), completionRate: 78, cognitiveLoad: 110 },
    { date: new Date(2025, 10, 19), completionRate: 88, cognitiveLoad: 130 },
    { date: new Date(2025, 10, 20), completionRate: 92, cognitiveLoad: 125 },
  ];

  const mockCurrentStats = {
    avgCompletion: '86.6%',
    totalCompleted: 43,
    avgLoad: 125,
    trend: '↑ +5%',
    insight: 'Great progress! You\'re maintaining consistency with a slight upward trend.',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Optimizer (Electron/TS)</h1>
      <div style={{ display: 'grid', gap: '30px' }}>
        <ProgressLineChart progressData={mockProgressData} currentStats={mockCurrentStats} />
        <TimeGanttChart schedule={MOCK_SCHEDULE} />
      </div>
    </div>
  );
};

export default App;

