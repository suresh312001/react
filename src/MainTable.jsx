// MainTable.jsx

import React, { useState, useEffect } from 'react';
import './App.css';

function MainTable({ onRowClick }) {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'work_year', direction: 'ascending' });

  useEffect(() => {
    // Lazy load the data
    import('./salariesData.json').then((jsonData) => setData(jsonData.default));
  }, []);

  const handleSort = (key) => {
    // Sorting logic
  };

  const handleRowClick = (year) => {
    // Filter data for the selected year
    const filteredData = data.filter((job) => job.work_year === year);

    // Aggregate job titles and calculate counts
    const aggregatedData = filteredData.reduce((acc, curr) => {
      acc[curr.job_title] = (acc[curr.job_title] || 0) + 1;
      return acc;
    }, {});

    // Create an array of objects from the aggregated data
    const tableData = Object.entries(aggregatedData).map(([jobTitle, count]) => ({
      work_year: year,
      job_title: jobTitle,
      count,
    }));

    // Update parent component state with the selected year's data
    onRowClick(tableData);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  if (data.length === 0) return <p>Loading...</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          <th onClick={() => handleSort('work_year')}>
            Work Year {getSortIndicator('work_year')}
          </th>
          <th onClick={() => handleSort('job_title')}>
            Job Title {getSortIndicator('job_title')}
          </th>
          <th onClick={() => handleSort('salary')}>
            Salary {getSortIndicator('salary')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((job) => (
          <tr key={`${job.work_year}_${job.job_title}_${job.salary}`} onClick={() => handleRowClick(job.work_year)}>
            <td>{job.work_year}</td>
            <td>{job.job_title}</td>
            <td>{job.salary} {job.salary_currency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;
