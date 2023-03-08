import Mock from "mockjs"

let Random = Mock.Random

// 用户列表
var userListlData = {
    "uid":/\d{10}/,
    "mobile":/^1[34578]\d{9}$/,
    "user_type|1":["普通会员","内侧官","连续包月会员","连续包年会员","月会员","年会员"],
    "used_uniform_count|1-100":70,
    "uniform_count":100,
    "used_ai_count|1-100":20,
    "ai_count":100,
    "create_time":Random.now(),
    "last_login_time":Random.now(),
    "nickname":"@last"
}
Mock.mock("/mock/userList",{code:200,'data|25':[userListlData]})


// 用户类型
var userTypeData = {
    "uid":/\d{10}/,
    "mobile":/^1[34578]\d{9}$/,
    "user_type|1":["普通会员","内侧官","连续包月会员","连续包年会员","月会员","年会员"],
    "money_time|1":["匀速提词","88.00"],
    "payment_time":Random.now()
}
Mock.mock("/mock/userType",{code:200,"data|25":[userTypeData]})


// 查看台本
var lineDetails = {
    "title":Random.ctitle(3, 5),
    "content":"@cparagraph(20,25)",
}
Mock.mock("/mock/lineDetails",{code:200,"data|25":[lineDetails]})


//  台词列表
var lineListData = {
    "key|+1":0,
    "lid":/\d{10}/,
    "content":"@cparagraph(20,25)",
    "mobile":/^1[34578]\d{9}$/,
    "created_time_without_tz":Random.now(),
    "updated_time_without_tz":Random.now(),
}
Mock.mock("/mock/lineList",{code:200,'data|25':[lineListData]})


// 订单列表
var orderListData = {
    "uid":/\d{10}/,
    "mobile":/^1[34578]\d{9}$/,
    "order_type|1":["连续包年会员","周会员","连续包月会员","月会员","年会员"],
    "amount|1-100.2":1,
    "payment_time":Random.now()
}
Mock.mock("/mock/orderList",{code:200,'data|25':[orderListData]})


// 次数包列表
var frequencyListData = {
    "link_id":/\d{10}/,
    "mobile":/^1[34578]\d{9}$/,
    "used_uniform_count|1-100":70,
    "uniform_count":100,
    "used_ai_count|1-100":20,
    "ai_count":100,
    "time_type|1":["匀速提词",'AI提词'],
    "send_num|1-100":1,
    "send_time":Random.now(),
    "link_status|1":["已领取","未领取","已失效"]

}
Mock.mock("/mock/frequencyList",{code:200,'data|25':[frequencyListData]})
