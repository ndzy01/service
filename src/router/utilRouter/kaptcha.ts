/*
 * @Author: ndzy
 * @Date: 2020-02-14 19:15:28
 * @LastEditTime: 2020-02-17 17:48:56
 * @LastEditors: ndzy
 */
import * as express from 'express'
import * as svgCaptcha from 'svg-captcha'

const kaptcha = express.Router()
kaptcha.get('/kaptcha', (req: any, res) => {
  const captcha = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 80,
    // 高度
    height: 30,
  })
  res.send({
    code: 0,
    msg: '图形验证码',
    data: {
      kaptcha: captcha.text.toLowerCase(), // 产生的验证码 忽略大小写
      kaptchaHtml: String(captcha.data),
    },
  })

})

export default kaptcha
