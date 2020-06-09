/*
 * @Author: ndzy
 * @Date: 2020-02-11 08:13:06
 * @LastEditTime: 2020-04-05 09:37:05
 * @LastEditors: ndzy
 */
import * as path from 'path';
// import { dirExists } from "./src/util/mFile";

const uploadFolder = path.resolve(__dirname, './ndzy/upload');
const publicFolder = path.resolve(__dirname, './ndzy/public');
const testUpload = path.resolve(__dirname, './ndzy/testUpload');

export default {
  originUrl: '*', //允许所有访问
  port: 8888, //服务端口
  pass: 'zeeqbmwqrxmcdjcc',
  imgUrl: 'http://localhost:8888/uploads/',
  imgUrlOnLine: 'http://www.ndzy01.com:8888/uploads/',
  uploadFolder,
  publicFolder,
  testUpload,
  mysql: {
    host: '47.103.200.215', // 数据库所在的服务器的域名或者IP地址,线上运行要用服务器ip
    user: 'root', // 登录数据库的账号
    password: 'ndzy', // 登录数据库的密码
    database: 'ndzy', // 数据库名称
    port: 3306,
  },
  mongoDbUrl: 'mongodb://root:root@localhost:28888/note?authSource=admin', // mongodb数据库所在的服务器的域名或者IP地址,线上运行要用服务器ip
};
