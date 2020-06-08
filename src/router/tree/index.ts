import * as express from "express";
import utils from "../../util";
import db from "../../db";
const tree = express.Router();
const data = [];

tree.get("/tree/all", (req: any, res) => {
  const sqlAll = `
  SELECT
  t.*
  FROM
  tree AS t
  ORDER BY
  t.sid ASC
  `;
  db.mysql_db(sqlAll, data).then((result: any) => {
    if (result.length > 0) {
      res.send({
        code: 0,
        msg: "ok",
        data: result,
      });
    } else {
      res.send({
        code: 0,
        msg: "ok",
        data: null,
      });
    }
  });
});

tree.post("/tree/getArticleById", (req: any, res) => {
  const id = req.body.id;

  const sqlGetArticleById = `
  SELECT * FROM tree Where id = '${id}'
  `;
  db.mysql_db(sqlGetArticleById, data).then((result: any) => {
    if (result.length > 0) {
      res.send({
        code: 0,
        msg: "ok",
        data: result[0],
      });
    } else {
      res.send({
        code: 0,
        msg: "ok",
        data: null,
      });
    }
  });
});

tree.post("/tree/getTreesBySid", (req: any, res) => {
  const sid = req.body.sid;

  const sqlGetTreesBySid = `
  SELECT id,sid,pid,title FROM tree WHERE FIND_IN_SET(pid,getChild('${sid}'));
  `;
  db.mysql_db(sqlGetTreesBySid, data).then((result: any) => {
    if (result.length > 0) {
      res.send({
        code: 0,
        msg: "ok",
        data: result,
      });
    } else {
      res.send({
        code: 0,
        msg: "ok",
        data: null,
      });
    }
  });
});

tree.post("/tree/save", (req: any, res) => {
  const sid = req.body.sid;
  const key = req.body.key;
  const pid = req.body.pid;
  const title = req.body.title;
  const isLeaf = req.body.isLeaf;

  const sqlSave = `
  INSERT INTO tree
        (
          tree.id,
          tree.sid,
          tree.pid,
          tree.key,
          tree.title,
          tree.cTime,
          tree.mTime,
          tree.isLeaf
        )
        VALUES
          (
            '${utils.randomCode(100)}',
            '${sid}',
            '${pid}',
            '${key}',
            '${title}',
            '${utils.formatData(new Date())}',
            '${utils.formatData(new Date())}',
            '${isLeaf}'
          )
  `;
  db.mysql_db(sqlSave, data).then((result: any) => {
    res.send({
      code: 0,
      msg: "ok",
      data: null,
    });
  });
});

tree.post("/tree/edit", (req: any, res) => {
  const id = req.body.id;
  const content = req.body.content;
  const isLeaf = req.body.isLeaf;

  const sqlEdit = `
  UPDATE tree
SET tree.content = '${content}',tree.mTime = '${utils.formatData(
    new Date()
  )}', tree.isLeaf = ${isLeaf}
WHERE
tree.id = '${id}'
  `;
  db.mysql_db(sqlEdit, data).then((result: any) => {
    res.send({
      code: 0,
      msg: "ok",
      data: null,
    });
  });
});
tree.post("/tree/delete", function (req, res, next) {
  const sid = req.body.sid;
  const sql1 = `
  SELECT * FROM tree WHERE FIND_IN_SET(pid,getChild('${sid}'));
  `;

  db.mysql_db(sql1, data).then((result: any) => {
    if (result.length > 0) {
      res.send({
        code: 0,
        msg: "不可以删除！",
        data: null,
      });
    } else {
      const sql = `
  DELETE FROM tree WHERE sid= '${sid}'
  `;
      db.mysql_db(sql, data).then((result: any) => {
        res.send({
          code: 0,
          msg: "ok",
          data: null,
        });
      });
    }
  });
});
export default tree;
