import * as express from 'express';
import utils from '../../util';
import db from '../../db';

const layout = express.Router();
const data = [];

layout.get('/layout/logo', (req: any, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: {
      url: 'http://www.ndzy01.com:8888/uploads/2020-6-15-9-25-48-32x32.ico',
    },
  });
});

layout.get('/layout/menu', (req: any, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: [
      {
        id: 1,
        pId: 0,
        name: 'ts',
        url: '/',
        type: 0,
        menuIcon: 'icon-yun icon-yun_usericon_szy',
        children: [
          {
            id: 11,
            pId: 10,
            name: 'ahooks',
            url: '/ahooks',
            menuIcon: 'ahooks',
            children: [
              {
                id: 111,
                pId: 11,
                name: 'lifeCycle',
                url: '/ahooks/lifeCycle',
                menuIcon: '',
                children: [],
              },
              {
                id: 112,
                pId: 11,
                name: 'useRequest',
                url: '/ahooks/useRequest',
                menuIcon: '',
                children: [],
              },
            ],
          },
          {
            id: 12,
            pId: 10,
            name: '工作记录',
            url: '/worRecordk',
            menuIcon: 'worRecordk',
            children: [
              {
                id: 121,
                pId: 12,
                name: '添加记录',
                url: '/addworkRecord',
                menuIcon: '',
                children: [],
              },
              {
                id: 122,
                pId: 12,
                name: '展示与查询',
                url: '/workRecords',
                menuIcon: '',
                children: [],
              },
            ],
          },
          {
            id: 13,
            pId: 10,
            name: '小功能',
            url: '/clock',
            menuIcon: 'worRecordk',
            children: [
              {
                id: 131,
                pId: 13,
                name: '时钟',
                url: '/clock',
                menuIcon: '',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  });
});

export default layout;
