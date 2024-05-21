import React, { useState } from 'react';
import './App.css';
import MainTable from './MainTable';
import LineGraph from './LineGraph';
import ChatApp from './ChatApp';

function App() {
  const [selectedYearData, setSelectedYearData] = useState([]);

  return (
    <div className="App">
      <h1>ML Engineer Salaries</h1>
      <MainTable onRowClick={setSelectedYearData} />
      <LineGraph data={selectedYearData} />
      <ChatApp kaggleData={selectedYearData} />
    </div>
  );
}

export default App;
