/*
 * @Author: ndzy
 * @Date: 2020-03-02 20:16:03
 * @LastEditTime: 2020-03-05 08:45:34
 * @LastEditors: ndzy
 */
import * as express from 'express'
import * as nodemailer from 'nodemailer'
import config from '../../../config'
import randomCode from '../../util/randomCode'

const qqEmail = express.Router()

qqEmail.post('/sendEmail', function (req, res, next) {
  const email = req.body.email
  const number = randomCode(6)

  const transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
      user: '2326962137@qq.com',
      //这里密码不是qq密码，是你设置的smtp密码
      pass: config.pass,
    },
  })
  const mailOptions = {
    from: '2326962137@qq.com', // 发件地址
    to: email, // 收件列表
    subject: '邮箱信息验证', // 标题
    //text和html两者只支持一种
    text: '验证码是' + number, // 标题
  }
  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      res.send({ code: 400, msg: '验证码发送失败！' })
    } else {
      res.send({ code: 0, msg: '验证码已成功发送！', data: number })
    }
  })
})

export default qqEmail
