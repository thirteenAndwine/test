import Login from "../view/user/login"
import Index from "@/components/index.vue"
import userList from "@/view/useList/userList"
export default [
    {
        path: "/login",
        component: Login
    }, {
        path: '/',
        redirect: '/login'
    }, {
        path: "/index",
        component: Index,
        children: [
            {
                path: "/userlist",
                component: userList
            }
        ]
    }
]

