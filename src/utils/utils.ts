interface Statistics {
  Mean: number;
  Median: number;
  Mode: number;
}

interface ClassStatistics {
  [key: string]: Statistics;
}

export function calculateMean(values: number[]): number {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

export function calculateMedian(values: number[]): number {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
}

export function calculateMode(values: number[]): number {
  const frequencyMap = new Map<number, number>();
  values.forEach((val) => {
    frequencyMap.set(val, (frequencyMap.get(val) || 0) + 1);
  });

  let mode = NaN;
  let maxFrequency = 0;

  frequencyMap.forEach((frequency, val) => {
    if (frequency > maxFrequency) {
      mode = val;
      maxFrequency = frequency;
    }
  });

  return mode;
}

export function calculateStatistics(
  data: any[],
  calculateValuesFn: (entry: any) => number
): ClassStatistics {
  const classData: Record<string, number[]> = {};

  data.forEach((entry) => {
    const alcoholClass = `Class ${entry["Alcohol"]}`;
    if (!classData[alcoholClass]) {
      classData[alcoholClass] = [];
    }
    classData[alcoholClass].push(calculateValuesFn(entry));
  });

  const statistics: ClassStatistics = {};

  for (const alcoholClass in classData) {
    const valuesData = classData[alcoholClass];
    statistics[alcoholClass] = {
      Mean: calculateMean(valuesData),
      Median: calculateMedian(valuesData),
      Mode: calculateMode(valuesData),
    };
  }

  return statistics;
}
