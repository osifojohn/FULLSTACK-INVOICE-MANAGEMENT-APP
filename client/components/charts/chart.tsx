import { Chart, GoogleChartWrapperChartType } from 'react-google-charts';

interface ChartsProps {
  chartType: GoogleChartWrapperChartType | undefined;
  width: string;
  height: string;
  data: (string | number)[][];
  options: {
    title?: string;
    is3D?: boolean;
    curveType?: string;
    chart?: {
      title: string;
      subtitle: string;
    };
    bars?: string;
    axes?: {
      x: {
        0: { side: string; label: string };
      };
    };
    bar?: { groupWidth: string };
  };
}

const ChartComponent = ({
  data,
  options,
  chartType,
  width,
  height,
}: ChartsProps) => {
  return (
    <Chart
      chartType={chartType}
      data={data}
      options={options}
      width={width}
      height={height}
    />
  );
};

export default ChartComponent;
