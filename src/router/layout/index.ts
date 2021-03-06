import * as express from 'express';
import utils from '../../util';
import db from '../../db';

const layout = express.Router();
const data = [];

layout.get('/layout/getLogo', (req: any, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: {
      url: 'http://www.ndzy01.com:8888/uploads/2020-6-15-9-25-48-32x32.ico',
    },
  });
});

export default layout;
