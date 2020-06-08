/*
 * @Author: ndzy
 * @Date: 2020-02-08 11:51:09
 * @LastEditTime: 2020-03-12 07:24:20
 * @LastEditors: ndzy
 */
import * as express from 'express'
import formatData from '../../util/formatData'

const routerUtils = express.Router()
routerUtils.use(function(req, res, next) {
  console.log(`${formatData(new Date())}-----${req.path}-------${req.method}`)
  next()
})

export default routerUtils
