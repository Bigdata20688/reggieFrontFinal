import {caxios} from "@/js/request";
// 张俊胜
const getCategoryPage = (params) => {
  return caxios({
    url: '/category/page',
    method: 'get',
    params
  })
}

// 编辑页面反查详情接口
const queryCategoryById = (id) => {
  return caxios({
    url: `/category/${id}`,
    method: 'get'
  })
}

// 删除当前列的接口
const deleCategory = (id) => {
  return caxios({
    url: '/category',
    method: 'delete',
    params: { id }
  })
}

// 修改接口
const editCategory = (params) => {
  return caxios({
    url: '/category',
    method: 'put',
    data: { ...params }
  })
}

// 新增接口
const addCategory = (params) => {
  return caxios({
    url: '/category',
    method: 'post',
    data: { ...params }
  })
}

export {getCategoryPage,queryCategoryById,deleCategory,editCategory,addCategory}
