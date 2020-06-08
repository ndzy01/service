/*
 * @Author: ndzy
 * @Date: 2020-04-05 09:32:53
 * @LastEditTime: 2020-04-05 09:40:46
 * @LastEditors: ndzy
 */
import DB from './index'
const { Note } = DB.Models

export async function getNotes() {
  const notes = await Note.find({}, {}).exec()
  
  return notes
}
console.log(getNotes().then(res => {
  console.log(res)
}))
