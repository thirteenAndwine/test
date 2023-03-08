import Login from "../view/user/login"
import Index from "@/components/homeIndex"
import userList from "@/view/useList/userList"
import userType from "@/view/useList/userType"
import lineList from "@/view/lineList/index"
import orderList from "@/view/orderList/index"
import frequencyList from "@/view/frequencyList/index"
import receiveLink from "@/view/receiveLink/index"
export default [
    {
        path: "/login",
        component: Login
    },{
        path: '/',
        redirect: '/login'
    }, {
        path: "/index",
        component: Index,
        redirect:'/index/userlist',
        children: [
            {
                path: "/index/userlist",
                component: userList,
            },
            {
                path:"/index/userType",
                component: userType
            },{
                path:"/index/lineList",
                component:lineList
            },{
                path:"/index/orderList",
                component:orderList
            },{
                path:"/index/frequencyList",
                component:frequencyList
            },{
                path:"/index/receiveLink",
                component:receiveLink
            }

        ]
    }
]

