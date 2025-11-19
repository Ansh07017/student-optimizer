import React from 'react';
import CalendarView from '../components/CalendarView/CalendarView';
import Feedback from '../components/Feedback/Feedback';

const Dashboard: React.FC = () => (
  <div>
    <h1>Dashboard</h1>
    <CalendarView />
    <Feedback />
  </div>
);

export default Dashboard;
