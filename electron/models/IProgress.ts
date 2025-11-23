// electron/models/IProgress.ts - Progress tracking and visualization models

export interface WeeklyProgress {
  date: Date | string; // Actual date object for the end of the tracked week
  cognitiveLoad: number; 
  completionRate: number; 
}

export interface ProgressChartProps {
  progressData: WeeklyProgress[];
  currentStats: {
      avgCompletion: string;
      totalCompleted: number;
      avgLoad: number;
      trend: string;
      insight: string;
  };
}

export const COLORS = {
  COGNITIVE_LOAD: '#FFA500', 
  COMPLETION_RATE: '#4169E1', 
};