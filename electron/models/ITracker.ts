// Manages F4: Dynamic Task Weight (λ) state for neglected tasks
export interface ITracker {
  taskId: string;
  lambda: number;
  lastCompleted: Date;
}
