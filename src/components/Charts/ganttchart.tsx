import React from 'react';
import { ScheduledTask, TYPE_COLORS } from '../../models/ITask';
import './ganttchart.css';

const START_OF_DAY = 8; // Timeline starts at 8:00 AM
const END_OF_DAY = 22; // Timeline ends at 22:00 (10:00 PM)
const TOTAL_HOURS = END_OF_DAY - START_OF_DAY;
const HOUR_WIDTH = 80; // pixels per hour

const TimeGanttChart: React.FC<{ schedule: ScheduledTask[] }> = ({ schedule }) => {
  // Group tasks by day
  const tasksByDay: { [key: string]: ScheduledTask[] } = {};
  
  schedule.forEach(task => {
    if (!tasksByDay[task.day]) {
      tasksByDay[task.day] = [];
    }
    tasksByDay[task.day].push(task);
  });

  // Sort tasks by start time within each day
  Object.keys(tasksByDay).forEach(day => {
    tasksByDay[day].sort((a, b) => a.startHour - b.startHour);
  });

  const calculateTaskPosition = (startHour: number) => {
    const offsetHours = Math.max(0, startHour - START_OF_DAY);
    return offsetHours * HOUR_WIDTH;
  };

  const calculateTaskWidth = (startHour: number, endHour: number) => {
    const duration = endHour - startHour;
    return Math.max(duration * HOUR_WIDTH, 100); // minimum width of 100px
  };

  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    return `${String(h).padStart(2, '0')}:${String(Math.round(m)).padStart(2, '0')}`;
  };

  return (
    <div className="gantt-container">
      <h2>Horizontal Gantt Chart - Weekly Timeline</h2>
      
      {/* Legend */}
      <div className="gantt-legend">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: color }}></div>
            <span>{type}</span>
          </div>
        ))}
      </div>

      {/* Timeline Container */}
      <div className="gantt-wrapper">
        {/* Time Header */}
        <div className="gantt-header">
          <div className="gantt-day-label">Day</div>
          <div className="gantt-timeline">
            {Array.from({ length: TOTAL_HOURS + 1 }).map((_, i) => {
              const hour = START_OF_DAY + i;
              return (
                <div key={`time-${hour}`} className="gantt-hour" style={{ width: `${HOUR_WIDTH}px` }}>
                  {hour.toString().padStart(2, '0')}:00
                </div>
              );
            })}
          </div>
        </div>

        {/* Days and Tasks */}
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <div key={day} className="gantt-row">
            <div className="gantt-day-label">{day}</div>
            <div 
              className="gantt-tasks-container" 
              style={{ width: `${TOTAL_HOURS * HOUR_WIDTH}px` }}
            >
              {tasksByDay[day]?.map((task, idx) => {
                const left = calculateTaskPosition(task.startHour);
                const width = calculateTaskWidth(task.startHour, task.endHour);
                const bgColor = TYPE_COLORS[task.type] || '#CCCCCC';

                return (
                  <div
                    key={`task-${task.id}-${idx}`}
                    className="gantt-task"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: bgColor,
                    }}
                    title={`${task.taskName} (${formatTime(task.startHour)} - ${formatTime(task.endHour)})`}
                  >
                    <span className="task-label">{task.taskName}</span>
                    <span className="task-badge">⭕</span>
                    
                    {/* Tooltip */}
                    <div className="gantt-tooltip">
                      <strong>{task.taskName}</strong>
                      <br />
                      <span>Type: {task.type}</span>
                      <br />
                      <span>Time: {formatTime(task.startHour)} - {formatTime(task.endHour)}</span>
                      <br />
                      <span>Duration: {(task.endHour - task.startHour).toFixed(1)}h</span>
                      {task.lambdaMultiplier && task.lambdaMultiplier > 1 && (
                        <>
                          <br />
                          <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                            ⚠️ Grown Task (λx{task.lambdaMultiplier.toFixed(1)})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGanttChart;