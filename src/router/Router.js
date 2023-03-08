import Vue from "vue";
import Router from "vue-router";
import routers from '@/router/routers'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: routers,
})

// 备份push
let originPush = Router.prototype.push;
// 备份replace
let originReplace = Router.prototype.replace;

// 二次封装push
Router.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

// 二次封装replace
Router.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}