import * as express from 'express';
import utils from '../../util';
import db from '../../db';
const im = express.Router();
const data = [];

im.post('/im/login', (req: any, res) => {
  const username = req.body.username;

  const sqlSave = `
  INSERT INTO im
        (
          im.id,
          im.user,
          im.login_time
        )
        VALUES
          (
            '${utils.randomCode(100)}',
            '${username}',
            '${utils.formatData(new Date())}'
          )
  `;
  db.mysql_db(sqlSave, data).then((result: any) => {
    res.send({
      code: 0,
      msg: 'ok',
      data: null,
    });
  });
});

im.post('/im/save', (req: any, res) => {
  const username = req.body.username;
  const message = req.body.message;

  const sqlSave = `
  INSERT INTO im
        (
          im.id,
          im.user,
          im.message,
          im.msg_create_time
        )
        VALUES
          (
            '${utils.randomCode(100)}',
            '${username}',
            '${message}',
            '${utils.formatData(new Date())}'
          )
  `;
  db.mysql_db(sqlSave, data).then((result: any) => {
    res.send({
      code: 0,
      msg: 'ok',
      data: null,
    });
  });
});

export default im;
