import * as express from 'express';
import utils from '../../util';
import db from '../../db';
const workRecords = express.Router();
const data = [];

workRecords.post('/workRecord/getRecordByTaskId', (req: any, res) => {
  const taskId = req.body.taskId;
  
  const sqlGetRecordByTaskId = `
  SELECT id FROM workRecords WHERE workRecords.taskId='${taskId}';
  `;
  db.mysql_db(sqlGetRecordByTaskId, data).then((result: any) => {
    if (result.length > 0) {
      res.send({
        code: 1,
        msg: '任务已存在!',
        data: null,
      });
    } else {
      res.send({
        code: 0,
        msg: 'ok',
        data: null,
      });
    }
  });
});

workRecords.post('/workRecord/save', (req: any, res) => {
  const taskId = req.body.taskId;
  const taskDescription = req.body.taskDescription;
  const taskStatus = req.body.taskStatus;

  const sqlSave = `
  INSERT INTO workRecords
        (
          workRecords.id,
          workRecords.taskId,
          workRecords.taskDescription,
          workRecords.taskStatus,
          workRecords.createTime
        )
        VALUES
          (
            '${utils.randomCode(100)}',
            '${taskId}',
            '${taskDescription}',
            '${taskStatus}',
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

workRecords.post('/workRecord/search', (req: any, res) => {
  const page = req.body.page;
  const size = req.body.size;
  let sqlSearch;
  let arr = [
    { taskId: req.body.taskId },
    { taskDescription: req.body.taskDescription },
    { taskStatus: req.body.taskStatus },
    { createTime: req.body.createTime },
  ];
  sqlSearch = 'SELECT w.* FROM workRecords AS w Where 1=1';
  arr.map((item) => {
    if (item.taskId) {
      sqlSearch += ` AND w.taskId LIKE '%${req.body.taskId}%'`;
      return null;
    } else if (item.taskDescription) {
      sqlSearch += ` AND w.taskDescription LIKE '%${req.body.taskDescription}%'`;
      return null;
    } else if (item.taskStatus) {
      sqlSearch += ` AND w.taskStatus LIKE '%${req.body.taskStatus}%'`;
      return null;
    } else if (item.createTime) {
      sqlSearch += ` AND w.createTime LIKE '%${req.body.createTime}%'`;
      return null;
    }
  });
  const sqlSearch1 = sqlSearch + ' ORDER BY w.createTime DESC';
  sqlSearch += ` ORDER BY w.createTime DESC LIMIT ${(page - 1) * size},${size}`;
  db.mysql_db(sqlSearch1, data).then((result1: any) => {
    const totalRecords = result1.length;
    db.mysql_db(sqlSearch, data).then((result: any) => {
      res.send({
        code: 0,
        msg: 'ok',
        data: result,
        totalRecords,
      });
    });
  });
});

workRecords.post('/workRecord/change', function (req, res, next) {
  const id = req.body.id;
  const taskId = req.body.taskId;
  const changeDescription = req.body.changeDescription;
  const nowStatus = req.body.nowStatus;
  const changeToStatus = req.body.changeToStatus;

  const sql = `
  UPDATE workRecords
SET workRecords.taskStatus = '${changeToStatus}'
WHERE
workRecords.id = '${id}'
  `;
  const sqlSave = `
  INSERT INTO workRecordChange
        (
          workRecordChange.id,
          workRecordChange.taskId,
          workRecordChange.changeDescription,
          workRecordChange.nowStatus,
          workRecordChange.changeToStatus,
          workRecordChange.changeTime
        )
        VALUES
          (
            '${utils.randomCode(100)}',
            '${taskId}',
            '${changeDescription}',
            '${nowStatus}',
            '${changeToStatus}',
            '${utils.formatData(new Date())}'
          )
  `;
  db.mysql_db(sql, data).then(() => {
    db.mysql_db(sqlSave, data).then(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data: null,
      });
    });
  });
});
workRecords.post('/workRecord/show', function (req, res, next) {
  const id = req.body.id;

  const sql = `
  SELECT *
  FROM
   workRecords
 WHERE
  workRecords.id = '${id}'
  `;

  db.mysql_db(sql, data).then((res1) => {
    const taskId = res1[0].taskId;
    const sql1 = `
    SELECT *
    FROM
    workRecordChange
   WHERE
    workRecordChange.taskId = '${taskId}'
   ORDER BY
   workRecordChange.changeTime DESC 
    `;
    db.mysql_db(sql1, data).then((res2) => {
      res.send({
        code: 0,
        msg: 'ok',
        data: [res1, res2],
      });
    });
  });
});

export default workRecords;
