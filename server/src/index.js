import chokidar from 'chokidar'
import cors from 'cors'
import express from 'express'
import multer from 'multer'

const appDir = `${__dirname}/app`
const serverPort = 3001

const watcher = chokidar.watch(appDir)

const upload = multer({storage: multer.memoryStorage()})

watcher.on('ready', () => {
  // eslint-disable-next-line max-nested-callbacks
  watcher.on('all', () => {
    console.log(`Clearing ${appDir} module cache from server`)
    // eslint-disable-next-line max-nested-callbacks
    Object.keys(require.cache).forEach((id) => {
      if (String.prototype.startsWith.apply(id, [appDir])) {
        console.log(`Deleting ${id}`)
        delete require.cache[id]
      }
    })
  })
})

const app = express()
app.use(cors())

// const corsOptions = {
//   origin: "http://localhost:8080"
//   , credentials: true
// }

// app.options('/importItem/*', cors(corsOptions)) // enable pre-flight request for DELETE request
// app.delete('/importItem/*', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })


// ## CORS middleware
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
const allowCrossDomain = function(req, res, next) {
    console.log('headers', req.headers)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Auth-Token');
    // prod - staticky
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // dev - dynamicky
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    res.header('Access-Control-Allow-Credentials', 'true')

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      console.log('options middleware')
      res.sendStatus(200);
    } else {
      next();
    }
};

app.use(allowCrossDomain);

app.delete('/importItem/*', function (req, res) {
  console.log('delete')
  res.send('DELETE request to homepage')
})

app.post('/csvimport', upload.single('file'), (res, req, next) => require('./app/index').default(res, req, next));


app.listen(serverPort, () => {
  console.log(`App listening on port ${serverPort}!`);
});
