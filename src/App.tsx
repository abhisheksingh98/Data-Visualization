import React from "react";

import "./App.css";
import { calculateStatistics } from "./utils/utils";
import wineData from "./data/wineData.json";
import StatisticsTable from "./components/StatisticsTable";

const App: React.FC = () => {
  const flavanoidsStatistics = calculateStatistics(
    wineData,
    (entry) => entry["Flavanoids"]
  );
  const gammaStatistics = calculateStatistics(
    wineData,
    (entry) =>
      (parseFloat(entry["Ash"]) * parseFloat(entry["Hue"])) /
      parseFloat(entry["Magnesium"])
  );

  return (
    <div className="app-container">
      <h1>Wine Data Statistics</h1>
      <StatisticsTable
        title="Flavanoids Statistics"
        statistics={flavanoidsStatistics}
      />
      <StatisticsTable title="Gamma Statistics" statistics={gammaStatistics} />
    </div>
  );
};

export default App;
