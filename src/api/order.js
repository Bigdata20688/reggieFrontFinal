import {caxios} from "@/js/request";
// 张俊胜
const getOrderDetailPage = (params) => {
  return caxios({
    url: '/order/page',
    method: 'get',
    params
  })
}

// 查看接口
const queryOrderDetailById = (id) => {
  return caxios({
    url: `/orderDetail/${id}`,
    method: 'get'
  })
}

// 取消，派送，完成接口
const editOrderDetail = (params) => {
  return caxios({
    url: '/order',
    method: 'put',
    data: { ...params }
  })
}
export {getOrderDetailPage,queryOrderDetailById,editOrderDetail}
