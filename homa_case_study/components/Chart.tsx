import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type DataChartProps = {
  options: any;
};

export default function ChartComponent({ options }: DataChartProps) {
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
