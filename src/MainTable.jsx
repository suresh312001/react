import React from 'react';
import salariesData from './salariesData.json';

const MainTable = ({ onRowClick }) => {
  // Transforming the data to calculate total jobs, average salary, and job titles for each year
  const yearStats = salariesData.reduce((acc, curr) => {
    if (!acc[curr.work_year]) {
      acc[curr.work_year] = { totalJobs: 0, totalSalary: 0, jobTitles: {} };
    }
    acc[curr.work_year].totalJobs++;
    acc[curr.work_year].totalSalary += curr.salary_in_usd;
    if (!acc[curr.work_year].jobTitles[curr.job_title]) {
      acc[curr.work_year].jobTitles[curr.job_title] = 0;
    }
    acc[curr.work_year].jobTitles[curr.job_title]++;
    return acc;
  }, {});

  // Calculating average salary and formatting data for each year
  const yearAverages = Object.keys(yearStats).map(year => {
    const { totalJobs, totalSalary, jobTitles } = yearStats[year];
    const averageSalary = totalSalary / totalJobs;
    const formattedJobTitles = Object.entries(jobTitles).map(([title, count]) => ({ title, count }));
    return {
      year: parseInt(year),
      totalJobs,
      averageSalary,
      jobTitles: formattedJobTitles,
    };
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Jobs</th>
          <th>Average Salary (USD)</th>
          <th>Job Titles</th>
        </tr>
      </thead>
      <tbody>
        {yearAverages.map(({ year, totalJobs, averageSalary, jobTitles }) => (
          <tr key={year} onClick={() => onRowClick([{ year, totalJobs, averageSalary, jobTitles }])}>
            <td>{year}</td>
            <td>{totalJobs}</td>
            <td>{averageSalary.toFixed(2)}</td>
            <td>
              <ul>
                {jobTitles.map(({ title, count }) => (
                  <li key={title}>{`${title}: ${count}`}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
