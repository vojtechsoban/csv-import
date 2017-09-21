import express from 'express';
import chokidar from 'chokidar';

import multer from 'multer';
import cors from 'cors';

const appDir = `${__dirname}/app`;
const serverPort = 3001;

const watcher = chokidar.watch(appDir);

const upload = multer({ storage: multer.memoryStorage()});

watcher.on('ready', () => {
  // eslint-disable-next-line max-nested-callbacks
  watcher.on('all', () => {
    console.log(`Clearing ${appDir} module cache from server`);
    // eslint-disable-next-line max-nested-callbacks
    Object.keys(require.cache).forEach((id) => {
      if (String.prototype.startsWith.apply(id, [appDir])) {
        console.log(`Deleting ${id}`);
        delete require.cache[id];
      }
    });
  });
});

const app = express();
app.use(cors());

app.post('/csvimport', upload.single('file'), (res, req, next) => require('./app/index').default(res, req, next));


app.listen(serverPort, () => {
  console.log(`App listening on port ${serverPort}!`);
});
