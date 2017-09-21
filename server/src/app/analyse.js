import Papa from 'papaparse';

export const analyse = stringData => {
  return new Promise((resolve, reject) => {
    Papa.parse(stringData, {
      complete: (results) => {
        resolve(results.data);
      },
      encoding: 'CP1250'
    });
  }).then(data => {
    return {
      analysis: analyseData(data),
      preview: data.slice(0, Math.min(5, data.length)),
      columns: [
        {name: 'amount', required: true},
        {name: 'date', required: true},
        {name: 'transaction', required: true},
        {name: 'payeee', required: false},
        {name: 'note', required: false},
      ]
    };
  });
};

const isDate = input => /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(input.trim());
const isNumberr = input => Number.isFinite(Number(input));

const analyseData = (data, hasHeader = true) => {
  let analysis = [];
  data.slice(hasHeader ? 1 : 0).forEach((row, index) => {
    const currRowAnalysis = analyseRow(row, index);
    analysis = mergeAnalysis(analysis, currRowAnalysis);
  });
  return analysis;
};

const analyseColumn = input => {
  if (input === null || input === undefined || input === '') {
    return undefined;
  } else if (isNumberr(input)) {
    return 'number';
  } else if (isDate(input)) {
    return 'date';
  } else {
    return 'text';
  }
};

const analyseRow = (row, rowIndex) => {
  return row.reduce((analysis, columnValue, colIndex) => {
      analysis[colIndex] = analyseColumn(columnValue);
      return analysis;
    },
    []
  );
};

const mergeColumn = (prevType, newType) => {
  if (!prevType) {
    return newType;
  } else if (prevType === newType || !newType) {
    return prevType;
  } else {
    return 'text';
  }
};

const mergeAnalysis = (prevAnalysis, newAnalysis) => {
  const max = Math.max(prevAnalysis.length, newAnalysis.length);
  
  const result = [];
  for (let i = 0; i < max; i++) {
    result[i] = mergeColumn(prevAnalysis[i], newAnalysis[i]);
  }
  return result;
};

