import Vue from 'vue'
import Router from 'vue-router'

import HomePage from "@/modules/core/components/HomePage.vue";
import AdminMenu from "@/modules/admin/menu/AdminMenu.vue";
import StorageMenu from "@/modules/admin/storage/StorageMenu.vue";
import OrderList from "@/modules/admin/order/OrderList.vue";
import ContractList from "@/modules/admin/contract/ContractList.vue";
import FundsList from "@/modules/admin/fund/FundsList.vue";
import OrgList from "@/modules/admin/organization/OrgList.vue";
import TypeList from "@/modules/admin/operation_type/TypeList.vue";
import StatusList from "@/modules/admin/contract_status/StatusList.vue";
import DepList from "@/modules/admin/departments/DepList.vue";
import PosList from "@/modules/admin/positions/PosList.vue";
import UserList from "@/modules/admin/users/UserList.vue";

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/orders',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/contracts',
            name: 'ContractList',
            component: ContractList
        },
        {
            path: '/funds',
            name: 'FundsList',
            component: FundsList
        },
        {
            path: '/storage',
            name: 'Storage',
            component: StorageMenu
        },
        {
            path: '/organizations',
            name: 'OrgList',
            component: OrgList
        },
        {
            path: '/admin/references',
            name: 'AdminMenu',
            component: AdminMenu
        },
        {
            path: '/admin/references/operations',
            name: 'OperationType',
            component: TypeList
        },
        {
            path: '/admin/references/contracts',
            name: 'ContractStatus',
            component: StatusList
        },
        {
            path: '/admin/references/users',
            name: 'Users',
            component: UserList
        },
        {
            path: '/admin/references/departments',
            name: 'Departments',
            component: DepList
        },
        {
            path: '/admin/references/positions',
            name: 'Positions',
            component: PosList
        }
    ]
})

export default router