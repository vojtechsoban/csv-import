import Papa from 'papaparse';

export const parse = file => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        resolve(results.data);
      },
      encoding: 'CP1250'
    });
  });
};
