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
  const taskId = () => {
    if (req.body.taskId) {
      return true;
    } else {
      return false;
    }
  };
  const taskDescription = () => {
    if (req.body.taskDescription) {
      return true;
    } else {
      return false;
    }
  };
  const taskStatus = () => {
    if (req.body.taskStatus) {
      return true;
    } else {
      return false;
    }
  };
  const createTime = () => {
    if (req.body.createTime) {
      return true;
    } else {
      return false;
    }
  };
  if (
    !req.body.taskId &&
    !req.body.taskDescription &&
    !req.body.taskStatus &&
    !req.body.createTime
  ) {
    sqlSearch = `
  SELECT
    w.* 
  FROM
    workRecords AS w 
  ORDER BY
    w.createTime DESC 
    LIMIT ${(page - 1) * size},${size}
    `;
  } else {
    sqlSearch = `
  SELECT
    w.* 
  FROM
    workRecords AS w 
  WHERE
   ${req.body.taskId ? `w.taskId LIKE '%${req.body.taskId}%'` : ''}${
      taskId() && (taskStatus() || createTime() || taskDescription())
        ? ' AND '
        : ''
    }
   ${
     req.body.taskDescription
       ? `w.taskDescription LIKE '%${req.body.taskDescription}%'`
       : ''
   }${taskDescription() && (taskStatus() || createTime()) ? ' AND ' : ''}
   ${req.body.taskStatus ? `w.taskStatus = ${req.body.taskStatus}` : ''} ${
      taskStatus() && createTime() ? ' AND ' : ''
    }
   ${req.body.createTime ? `w.createTime LIKE '%${req.body.createTime}%'` : ''}
  ORDER BY
    w.createTime DESC 
    LIMIT ${(page - 1) * size},${size}
    `;
  }
  db.mysql_db(sqlSearch, data).then((result: any) => {
    res.send({
      code: 0,
      msg: 'ok',
      data: result,
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
// workRecords.post('/tree/delete', function (req, res, next) {
//   const sid = req.body.sid;
//   const sql1 = `
//   SELECT * FROM tree WHERE FIND_IN_SET(pid,getChild('${sid}'));
//   `;

//   db.mysql_db(sql1, data).then((result: any) => {
//     if (result.length > 0) {
//       res.send({
//         code: 0,
//         msg: '不可以删除！',
//         data: null,
//       });
//     } else {
//       const sql = `
//   DELETE FROM tree WHERE sid= '${sid}'
//   `;
//       db.mysql_db(sql, data).then((result: any) => {
//         res.send({
//           code: 0,
//           msg: 'ok',
//           data: null,
//         });
//       });
//     }
//   });
// });
export default workRecords;
