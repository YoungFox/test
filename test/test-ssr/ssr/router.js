// 路由
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter(){
    return new Router({
        mode: 'history',
        routers: [
            {path: '/',component: () => import('./components/Home.vue')}
        ]
    });
}