import Papa from 'babyparse';

export default async (req, res, next) => {
  try {
    const stringData = req.file.buffer.toString('utf-8');
    Papa.parse(stringData, {
      complete: (results) => {
        res.send(results.data);
      },
      encoding: 'CP1250'
    });
  } catch (err) {
    console.log(`Caught error: ${err.message}`, err);
    res.sendStatus(500);
  }
  next();
};
