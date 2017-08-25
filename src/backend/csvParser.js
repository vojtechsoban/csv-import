import Papa from 'papaparse';

export const parse = file => {
  Papa.parse(file, {
    complete: function (results) {
      console.log("Finished:", results.data);
    }
  });
};
