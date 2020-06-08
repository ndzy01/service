/*
 * @Author: ndzy
 * @Date: 2020-03-08 10:07:04
 * @LastEditTime: 2020-04-05 09:41:27
 * @LastEditors: ndzy
 */
import { Schema, model, models, Model, Types } from 'mongoose'
import { INote } from '../../../../types/schema'

export const NoteInit = {
  // _id: new Types.ObjectId('5dc52b0aba304f6314a9229f'),
  noteId: '我是初始化的数据',
  title: '我是初始化的数据',
  content: '我是初始化的数据',
  createTime: '我是初始化的数据',
  modifyTime: '我是初始化的数据',
}
export class Note {
  private _model: Model<INote>

  constructor() {
    const schema = new Schema<INote>(
      {
        noteId: { type: String },
        title: { type: String },
        content: { type: String },
        createTime: { type: String },
        modifyTime: { type: String },
      },
      {
        // 设置查询时默认返回虚拟字段
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
    )
    // 初始化未分类
    schema.statics.initData = () => {
      this.model.exists({}).then((exist) => {
        if (!exist) {
          this.model.create(NoteInit)
        }
      })
    }
    // 只有当model不存在时才创建model
    if (models.note) {
      this._model = models.note
    } else {
      this._model = model<INote>('note', schema, 'note')
    }
  }

  public get model(): Model<INote> {
    return this._model
  }
}
