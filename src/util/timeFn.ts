/*
 * @Author: ndzy
 * @Date: 2020-02-04 19:38:12
 * @LastEditTime : 2020-02-11 13:16:00
 * @LastEditors  : ndzy
 */
const timeFn = (date: any) => {
  //di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(date)
  var dateEnd = new Date() //获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime() //时间差的毫秒数
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  // console.log(
  //   ' 相差 ' +
  //     dayDiff +
  //     '天 ' +
  //     hours +
  //     '小时 ' +
  //     minutes +
  //     ' 分钟' +
  //     seconds +
  //     ' 秒'
  // )
  // console.log(
  //   dateDiff + '时间差的毫秒数',
  //   dayDiff + '计算出相差天数',
  //   leave1 + '计算天数后剩余的毫秒数',
  //   hours + '计算出小时数',
  //   minutes + '计算相差分钟数',
  //   seconds + '计算相差秒数'
  // )
  return dayDiff
}

export default timeFn
