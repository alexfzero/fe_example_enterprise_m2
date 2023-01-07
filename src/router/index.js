import Vue from 'vue'
import Router from 'vue-router'

import HomePage from "@/modules/core/components/HomePage.vue";
import MainMenu from "@/modules/admin/menu/AdminMenu.vue";
import StorageMenu from "@/modules/admin/storage/StorageMenu.vue";
import OrderList from "@/modules/admin/order/OrderList.vue";

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/order',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/storage',
            name: 'Storage',
            component: StorageMenu
        },
        {
            path: '/admin/references',
            name: 'MainMenu',
            component: MainMenu
        }
    ]
})

export default router