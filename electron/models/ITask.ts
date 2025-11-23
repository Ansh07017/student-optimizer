// Includes fields for Cognitive Load, Frequency, Duration, Load Multiplier (λ)
export interface ITask {
  id: string;
  name: string;
  cognitiveLoad: number;
  frequency: string;
  duration: number;
  loadMultiplier: number;
}

export interface ScheduledTask {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  taskName: string;
  type: 'Academic' | 'DSA' | 'Chore' | 'Rest' | string;
  startHour: number; 
  endHour: number;   
  lambdaMultiplier?: number; 
}

export const TYPE_COLORS: { [key: string]: string } = {
  Academic: '#DE5DD3', 
  DSA: '#65CDC9',       
  Chore: '#E8E652',     
  Rest: '#8DCE4F',      
};


export const MOCK_SCHEDULE: ScheduledTask[] = [
  { id: '1', day: 'Monday', taskName: 'Lecture: OS', type: 'Academic', startHour: 9.0, endHour: 10.5, lambdaMultiplier: 1.0 }, 
  { id: '2', day: 'Monday', taskName: 'DSA Practice', type: 'DSA', startHour: 11.0, endHour: 12.0, lambdaMultiplier: 1.5 }, // Example of high lambda
  { id: '3', day: 'Tuesday', taskName: 'Quick Rest', type: 'Rest', startHour: 14.0, endHour: 14.5, lambdaMultiplier: 1.0 }, 
  { id: '4', day: 'Wednesday', taskName: 'Project Work', type: 'Academic', startHour: 15.0, endHour: 17.0, lambdaMultiplier: 1.0 },
  { id: '5', day: 'Wednesday', taskName: 'Clean Room', type: 'Chore', startHour: 17.0, endHour: 18.0, lambdaMultiplier: 1.0 },
  { id: '6', day: 'Friday', taskName: 'Meal Break', type: 'Rest', startHour: 13.0, endHour: 14.0, lambdaMultiplier: 1.0 },
  { id: '7', day: 'Saturday', taskName: 'Deep Learning Study', type: 'Academic', startHour: 10.0, endHour: 12.0, lambdaMultiplier: 1.0 },
];
