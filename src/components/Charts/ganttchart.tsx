import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ScheduledTask, TYPE_COLORS } from '../../models/ITask';

const START_OF_DAY = 6; // Day starts at 6:00 AM

const transformDataForNivo = (tasks: ScheduledTask[]) => {
  const days: { [key: string]: any } = {
    Monday: { day: 'Monday' },
    Tuesday: { day: 'Tuesday' },
    Wednesday: { day: 'Wednesday' },
    Thursday: { day: 'Thursday' },
    Friday: { day: 'Friday' },
    Saturday: { day: 'Saturday' },
  };
   

  tasks.sort((a, b) => a.startHour - b.startHour).forEach((task) => {
    const dayData = days[task.day];
    let currentCursor = dayData.lastEndHour || START_OF_DAY;

    const gapDuration = task.startHour - currentCursor;
    if (gapDuration > 0) {
      const gapKey = `gap_${currentCursor}`;
      dayData[gapKey] = gapDuration;
      dayData.keys = [...(dayData.keys || []), gapKey];
    }

    const taskDuration = task.endHour - task.startHour;
    const taskKey = `${task.type}_${task.id}`;
    dayData[taskKey] = taskDuration;
    dayData.keys = [...(dayData.keys || []), taskKey];
    
    dayData.tasks = [...(dayData.tasks || []), { ...task, key: taskKey }];

    dayData.lastEndHour = task.endHour;
  });

  return Object.values(days);
};

const TimeGanttChart: React.FC<{ schedule: ScheduledTask[] }> = ({ schedule }) => {
  const chartData = transformDataForNivo(schedule);
  const allKeys = chartData.flatMap(d => d.keys || []).filter((value, index, self) => self.indexOf(value) === index);
  const taskKeys = allKeys.filter(key => !key.startsWith('gap_'));
  const getColor = (bar: any) => {
    if (bar.id.startsWith('gap_')) {
      return 'transparent'; 
    }
    const taskType = bar.id.split('_')[0]; 
    return TYPE_COLORS[taskType] || '#CCCCCC';
  };

  return (
    <ResponsiveBar
      data={chartData}
      keys={allKeys} 
      indexBy="day"
      layout="horizontal"
      margin={{ top: 30, right: 30, bottom: 50, left: 80 }}
      padding={0.1}
      groupMode="stacked"
      valueScale={{ type: 'linear', min: 0, max: 14 }} 
      colors={getColor} 
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time of Day',
          legendPosition: 'middle',
          legendOffset: 32,
          tickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          format: (v) => `${v + START_OF_DAY}:00`, 
      }}
      
      axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: -60,
      }}
      enableLabel={false} 
      tooltip={({ id, value, color, data }) => {
        const taskData = data.tasks.find((t: any) => t.key === id);
        
        if (taskData) {
            return (
                <div style={{ backgroundColor: 'white', padding: '10px', borderLeft: `5px solid ${color}` }}>
                    <strong>{taskData.taskName}</strong>
                    <br />Type: {taskData.type}
                    <br />Time: {taskData.startHour}:00 - {taskData.endHour}:00
                    {taskData.lambdaMultiplier > 1 && (
                      <div style={{ color: 'red' }}>⚠️ **Grown Task (λx{taskData.lambdaMultiplier.toFixed(1)})**</div>
                    )}
                </div>
            );
        }
        return null;
      }}
    />
  );
};

export default TimeGanttChart;