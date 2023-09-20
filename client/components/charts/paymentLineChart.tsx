import React from 'react';

import { Chart } from 'react-google-charts';
export const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
  ['Sleep', 20],
  ['Sleep', 5],
  ['Sleep', 50],
];
export const options = {
  title: 'Payments',
  is3D: true,
  curveType: 'function',
};

const paymentLineChart = () => {
  return (
    <div>
      <div>
        <Chart
          chartType="LineChart"
          data={data}
          options={options}
          width={'100%'}
          height={'400px'}
        />
      </div>
    </div>
  );
};

export default paymentLineChart;
