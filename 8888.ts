import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import config from './config';
import router from './src/router';
import utils from './src/util';
import mongodb from './src/db/mongodb';

const app = express();
app.set('port', process.env.PORT || config.port);
utils.dirExists(config.publicFolder);
utils.dirExists(config.uploadFolder);
utils.dirExists(config.testUpload);

app.use('/uploads', express.static(path.resolve(__dirname, './ndzy/upload')));
app.use('/', express.static(path.resolve(__dirname, './ndzy/public')));
app.use(
  '/testUpload',
  express.static(path.resolve(__dirname, './ndzy/testUpload'))
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(
  cors({
    origin: config.originUrl, //允许访问
    optionsSuccessStatus: 200,
  })
);

// routerUtils
app.use('/', router.routerUtils);
// qqEmail
app.use('/', router.qqEmail);
// kaptcha
app.use('/', router.kaptcha);
// upload
app.use('/', router.upload);

app.use('/', router.tree);
app.use('/', router.im);
app.use('/', router.workRecords);
app.use('/', router.layout);
//
app.use('/', router.mockTest);
app.listen(app.get('port'), () => {
  console.log(` app listening on port ${app.get('port')}!`);
});
