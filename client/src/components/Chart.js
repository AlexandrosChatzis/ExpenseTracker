import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: props.chartData
    };
  }
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{ maintainAspectRatio: false }}
          width={200}
          height={200}
          redraw={true}
        />
      </div>
    );
  }
}
export default Chart;
