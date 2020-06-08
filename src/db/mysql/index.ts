/*
 * @Author: ndzy
 * @Date: 2020-02-11 08:31:42
 * @LastEditTime: 2020-03-12 06:47:11
 * @LastEditors: ndzy
 */

import * as mysql from 'mysql'
import config from '../../../config'

const pool = mysql.createPool({
  host: config.mysql.host, // 数据库所在的服务器的域名或者IP地址
  user: config.mysql.user, // 登录数据库的账号
  password: config.mysql.password, // 登录数据库的密码
  database: config.mysql.database, // 数据库名称
  port: config.mysql.port,
})

const query = (sql: string, values) => {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection(function(err, connection) {
        if (err) reject(err)
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err)
          resolve(JSON.parse(JSON.stringify(rows)))
        })
        // 结束会话
        connection.release()
      })
    } catch (error) {
      console.log(error)
    }
  })
}

async function getData(sql: string, data) {
  return await query(sql, data)
}

export default getData
