import mockRequest from "./mockRequest"
import requests from "./require"

// 登录获取token
export const reqUserLogin = (data) => requests({ url: `/api/v1/token`, data, method: "post" })

// 请求用户列表
export const reqGetUserList = ()=> requests({ url: `/api/v1/user`, method: "get" })

// 用户类型
export const reqGetUserType = (data) => requests({ url: `/api/v1/user`,data, method: "get" })

// 手机号模糊查询
export const reqPhoneSelect = (phoneNum) => requests({ url: `/api/v1/user?mobile__icontains=${phoneNum}`, method: "get" })

// // 根据user_id精确查询台本信息
export const reqGetLineDetails = (uids) => requests({ url: `/api/v1/line-script?user_uid=${uids}`, method: "get" })

// 台本列表
export const reqGetLineList = () => requests({ url: `/api/v1/line-script`, method: "get" })


// 点击查看获取用户详情
export const reqUserInfo = (user_id) => requests({ url: `/api/v1/user/${user_id}`, method: "get" })

// 订单列表
export const reqGetOrderList = () => mockRequest.get('/orderList')

// 次数包列表
export const reqGetfrequencyList = () => mockRequest.get("/frequencyList")