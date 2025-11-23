import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WeeklyProgress, ProgressChartProps, COLORS } from '../../models/IProgress';


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        
        return (
            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p style={{ fontWeight: 600 }}>{`Week Ending: ${label}`}</p>
                {payload.map((item: any, index: number) => (
                    <p key={index} style={{ color: item.stroke }}>
                        {`${item.name}: ${item.name.includes('(%)') ? `${item.value}%` : item.value}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ProgressLineChart: React.FC<ProgressChartProps> = ({ progressData, currentStats }) => {
  
  const formattedData = progressData.map(item => ({
      ...item,
      date: item.date instanceof Date ? item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : item.date,
  }));
  const maxLoad = Math.max(...progressData.map(d => d.cognitiveLoad), 180);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      
      <h3 style={{ margin: '0 0 15px', fontSize: '1.2em' }}>Progress Over Time</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          
          {/* X Axis: Displays the actual date string */}
          <XAxis dataKey="date" padding={{ left: 15, right: 15 }} />
          
          {/* Left Y Axis: Completion Rate (0-100) */}
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke={COLORS.COMPLETION_RATE} 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`}
          />
          
          {/* Right Y Axis: Cognitive Load */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke={COLORS.COGNITIVE_LOAD} 
            domain={[0, maxLoad + 10]} 
          />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend align="center" verticalAlign="bottom" height={36} layout="horizontal" />

          {/* Completion Rate Line (Blue) */}
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="completionRate" 
            name="Completion Rate (%)"
            stroke={COLORS.COMPLETION_RATE} 
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ r: 4 }}
          />

          {/* Cognitive Load Line (Orange) */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="cognitiveLoad" 
            name="Cognitive Load"
            stroke={COLORS.COGNITIVE_LOAD} 
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* --- Summary Cards Section (Using currentStats) --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '20px' }}>
        <StatCard title="Avg Completion" value={currentStats.avgCompletion} color="#E6E6FA" />
        <StatCard title="Total Completed" value={String(currentStats.totalCompleted)} color="#D4EDDA" />
        <StatCard title="Avg Load" value={String(currentStats.avgLoad)} color="#FFF3CD" />
        <StatCard title="Trend" value={currentStats.trend} color="#E1D5E7" />
      </div>

      {/* --- Insights Box (Using currentStats) --- */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F0F8FF', borderLeft: `5px solid ${COLORS.COMPLETION_RATE}`, borderRadius: '4px' }}>
          <p style={{ fontWeight: 600, margin: '0 0 5px' }}>💡 Insights</p>
          <ul>
              <li style={{ fontSize: '0.9em' }}>{currentStats.insight}</li>
          </ul>
      </div>

    </div>
  );
};

// Simple reusable component for the stat cards (same as before)
const StatCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
    <div 
        style={{ 
            flex: 1, 
            padding: '10px 15px', 
            borderRadius: '6px', 
            backgroundColor: color, 
            textAlign: 'center' 
        }}
    >
        <p style={{ margin: 0, fontSize: '0.8em', color: '#555' }}>{title}</p>
        <h4 style={{ margin: '5px 0 0', fontSize: '1.5em', fontWeight: 700 }}>{value}</h4>
    </div>
);

export default ProgressLineChart;