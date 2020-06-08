const a = [
  {
    id: 1,
    name: '11111111楼',
    title: '',
    icon: '',
    parentId: 0,
  },
  {
    id: 2,
    name: '2楼',
    title: '',
    icon: '',
    parentId: 0,
  },
  {
    id: 4,
    name: '1楼儿子2',
    title: '',
    icon: '',
    parentId: 1,
  },
  {
    id: 6,
    name: '你是谁啊',
    title: '',
    icon: '',
    parentId: 4,
  },
  {
    id: 12,
    name: '566666',
    title: '',
    icon: '',
    parentId: 2,
  },
  {
    id: 13,
    name: '33333楼',
    title: '',
    icon: '',
    parentId: 0,
  },
  {
    id: 14,
    name: '7567566765',
    title: '',
    icon: '',
    parentId: 13,
  },
  {
    id: 15,
    name: '1312',
    title: '',
    icon: '',
    parentId: 6,
  },
]
interface Parent {
  name: string
  title: string
  icon: string
  jump?: string
  list: any
}
const generateOptions = (params: any) => {
  //生成Cascader级联数据
  let result = []
  for (let param of params) {
    if (param.parentId == 0) {
      //判断是否为顶层节点
      if (param.jump === '0') {
        let parent: Parent = {
          //转换成el-Cascader可以识别的数据结构
          name: param.name || '',
          title: param.title,
          icon: param.icon || '',
          jump: param.jump || '',
          list: '',
        }
        parent.list = getChildS(param.id, params) //获取子节点
        result.push(parent)
      } else {
        let parent: Parent = {
          //转换成el-Cascader可以识别的数据结构
          name: param.name || '',
          title: param.title,
          icon: param.icon || '',
          list: '',
        }
        parent.list = getChildS(param.id, params) //获取子节点
        result.push(parent)
      }
    }
  }
  return result
}

const getChildS = (id, array) => {
  let list = new Array()
  for (let arr of array) {
    //循环获取子节点
    if (arr.parentId == id) {
      if (arr.jump === '0') {
        list.push({
          name: arr.name || '',
          title: arr.title,
          icon: arr.icon || '',
        })
      } else {
        list.push({
          name: arr.name || '',
          title: arr.title,
          icon: arr.icon || '',
          jump: arr.jump,
        })
      }
    }
  }

  for (let child of list) {
    //获取子节点的子节点
    let ChildScopy = getChildS(child.id, array) //递归获取子节点
    if (ChildScopy.length > 0) {
      child.ChildS = ChildScopy
    }
  }
  return list
}

export default generateOptions
