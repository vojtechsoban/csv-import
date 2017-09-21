import {analyse} from './analyse';

export default async (req, res, next) => {
  try {
    const stringData = req.file.buffer.toString('utf-8');
    analyse(stringData)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  } catch (err) {
    console.log(`Caught error: ${err.message}`, err);
    res.sendStatus(500);
  }
  next();
};
