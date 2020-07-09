import * as express from 'express';
import utils from '../../../util';
import * as mockjs from 'mockjs';
interface Article {
  title?: string;
  thumbnailPicS?: string;
  authorName?: string;
  date?: string;
}
// 获取 mock.Random 对象
const Random = mockjs.Random;

const articles: Article[] = [];
for (let i = 0; i < 100; i++) {
  const newArticleObject: Article = {
    title: Random.csentence(5, 30), //  Random.csentence( min, max )
    // thumbnailPicS: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    // authorName: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    // date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
  };
  articles.push(newArticleObject);
}

const mockTest = express.Router();

mockTest.get('/mock/test/all', (req: any, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: articles,
  });
});
mockTest.post('/mock/test/ahooks/useRequest/getName', (req: any, res) => {
  res.send({
    code: 0,
    msg: 'ok',
    data: mockjs.mock('@name'),
  });
});

export default mockTest;
