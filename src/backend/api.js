import superagent from 'superagent';

// curl -F 'file=@/path/to/local/file.csv' http://localhost:3001/csvimport
export const uploadCsv = file => {
  const promise = (resolve, reject) => {
    superagent.post('http://localhost:3001/csvimport')
              .attach('file', file)
              .end((err, res) => {
                console.log('uploadCsv error', err);
                console.log('uploadCsv response', res);
                // WIP just to simulate parsing large files
                setTimeout(() => {
                  if (err) {
                    reject(err);
                  } else if (res.statusCode !== 200) {
                    reject(`Response status code=${res.statusCode}`);
                  } else {
                    resolve(JSON.parse(res.text));
                  }
                }, 500);
              });
  };
  return new Promise(promise);
};
