import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Keep track of the chart instance
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // Destroy previous chart instance if it exists
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.year),
          datasets: data[0].values.map((_, index) => ({
            label: data.map(item => item.job_title)[index],
            data: data.map(item => item.values[index]),
            borderColor: getRandomColor(),
            fill: false,
          })),
        },
        options: {
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const { datasetIndex, index } = elements[0];
              const year = data[index].year;
              const jobTitle = data[datasetIndex].job_title;
              const averageSalary = data[index].values[datasetIndex];
              setSelectedJob({ year, jobTitle, averageSalary });
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Average Salary (USD)',
              },
            },
          },
        },
      });
    }
  }, [data]);

  // Function to generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h2>Line Graph</h2>
      <canvas ref={chartRef} />
      {selectedJob && (
        <div>
          <h3>Job Details</h3>
          <p><strong>Year:</strong> {selectedJob.year}</p>
          <p><strong>Job Title:</strong> {selectedJob.jobTitle}</p>
          <p><strong>Average Salary:</strong> ${selectedJob.averageSalary}</p>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
