import { Chart } from 'react-google-charts';
export const data = [
  ['Task', 'Hours per Day'],
  ['Sleep', 50],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 20],
  ['Sleep', 7],
  ['Sleep', 70],
  ['Sleep', 4],
  ['Sleep', 40],
];
export const options = {
  title: 'Clients Contributions',
  // width: 900,
  // legend: { position: 'none' },
  chart: { title: 'Chess opening moves', subtitle: 'popularity by percentage' },
  bars: 'horizontal', // Required for Material Bar Charts.
  axes: {
    x: {
      0: { side: 'top', label: 'Percentage' }, // Top x-axis.
    },
  },
  bar: { groupWidth: '90%' },
};

const ClientRevenueChart = () => {
  return (
    <div className="bg-blue-800">
      {/* <h2 className="font-headingFont text-[28px]  mt-3 ml-3 bg-black">
        Clients Contributions
      </h2> */}
      <div className="">
        <Chart
          chartType="BarChart"
          data={data}
          options={options}
          width={'100%'}
          height={'400px'}
        />
      </div>
    </div>
  );
};

export default ClientRevenueChart;
