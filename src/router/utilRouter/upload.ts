/*
 * @Author: ndzy
 * @Date: 2020-03-12 06:50:49
 * @LastEditTime: 2020-03-12 07:26:22
 * @LastEditors: ndzy
 */
import * as express from 'express'
import * as multer from 'multer'
const upload = express.Router()

import config from '../../../config'

// #region multer 配置
const uploadHost = config.imgUrlOnLine //图片可访问地址
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.uploadFolder) // 保存的路径，备注：需要自己创建
  },
  filename: function(req, file, cb) {
    const now = new Date()
    const yy = now.getFullYear() // 年
    const mm = now.getMonth() + 1 // 月
    const dd = now.getDate() // 日
    const hh = now.getHours() // 时
    const ss = now.getMinutes()
    const aa = now.getSeconds()
    // 将保存文件名设置为 字段名 + 时间戳
    cb(null, `${yy}-${mm}-${dd}-${hh}-${ss}-${aa}-${file.originalname}`)
  },
})
// 通过 storage 选项来对 上传行为 进行定制化
let upload_multer = multer({ storage: storage })
// #endregion
//

// 单文件上传
upload.use('/upload', upload_multer.single('file'), function(
  req: any,
  res,
  next
) {
  let file = req.file || null //得到文件对象
  if (file) {
    res.send({
      code: 0,
      msg: '已成功上传',
      data: {
        name: file.originalname,
        size: file.size / 1024 + 'KB',
        type: file.mimetype.split('/')[0],
        url: `${uploadHost}${file.filename}`,
      },
    })
  } else {
    res.send({
      code: 0,
      msg: '上传出错了',
      data: null,
    })
  }
})

export default upload
