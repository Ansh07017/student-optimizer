// Includes fields for Cognitive Load, Frequency, Duration, Load Multiplier (λ)
export interface ITask {
  id: string;
  name: string;
  cognitiveLoad: number;
  frequency: string;
  duration: number;
  loadMultiplier: number;
}
