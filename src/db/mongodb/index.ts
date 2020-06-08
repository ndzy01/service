/*
 * @Author: ndzy
 * @Date: 2020-03-08 09:39:50
 * @LastEditTime: 2020-04-05 09:22:35
 * @LastEditors: ndzy
 */

import { connect, connection, Connection, Model } from 'mongoose'
import { INote } from '../../../types/schema'
import config from '../../../config'
import { Note } from './model/note'

interface IModels {
  Note: Model<INote>
}

export default class DB {
  private static instance: DB

  private _db: Connection
  private _models: IModels

  private constructor() {
    // 连接 MongoDB
    connect(
      config.mongoDbUrl,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => {
        //   // 设置默认数据
        ;(this._models.Note as any).initData()
      }
    )
    this._db = connection
    this._db.once('open', this.connected)
    this._db.on('error', this.error)

    this._models = {
      Note: new Note().model,
    }
  }

  public static get Models() {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance._models
  }

  private connected() {
    console.log('mongodb 数据库已连接')
  }

  private error(error) {
    console.error('mongodb 连接失败', error)
  }
}
