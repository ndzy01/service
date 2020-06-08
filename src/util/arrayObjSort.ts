/*
 * @Author: ndzy
 * @Date: 2020-02-05 09:21:53
 * @LastEditTime : 2020-02-11 13:21:00
 * @LastEditors  : ndzy
 */
/**
 * eg： 数组a a.sort(compare("id"))
 * @param {*} property
 */
const compare = (property: any) => {
  return function(obj1, obj2) {
    const v1 = obj1[property]
    const v2 = obj2[property]
    return v1 - v2
  }
}
export default compare
