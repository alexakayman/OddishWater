import React from 'react';
import AppLayout from './components/layout/AppLayout';
import { OddishWaterProvider } from './context/OddishWaterContext';

function App() {
  return (
    <OddishWaterProvider>
      <AppLayout />
    </OddishWaterProvider>
  );
}

export default App;