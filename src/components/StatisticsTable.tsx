interface Statistics {
  Mean: number;
  Median: number;
  Mode: number;
}

interface ClassStatistics {
  [key: string]: Statistics;
}

interface Props {
  title: string;
  statistics: ClassStatistics;
}
const StatisticsTable: React.FC<Props> = ({ title, statistics }) => (
  <div className="statistics-container">
    <h2>{title}</h2>
    <table className="statistics-table">
      <thead>
        <tr>
          <th>Measure</th>
          {Object.keys(statistics).map((alcoholClass) => (
            <th key={alcoholClass}>{alcoholClass}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {["Mean", "Median", "Mode"].map((measure) => (
          <tr key={measure}>
            <td>{measure}</td>
            {Object.keys(statistics).map((alcoholClass) => (
              <td key={`${alcoholClass}-${measure}`}>
                {statistics[alcoholClass][measure as keyof Statistics].toFixed(
                  3
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StatisticsTable;
