import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import HomePage from "../pages/HomePage.vue";
import TopicDetail from "../pages/TopicDetail.vue";
import CatContent from "@/pages/CatContent.vue";
import RankView from "@/pages/RankView.vue";
import TagsView from "@/pages/TagsView.vue";
import CircleView from "@/pages/CircleView.vue";
import CircleDetail from "@/pages/CircleDetail.vue";
import UserPage from "@/pages/UserPage.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: "homePage",
        component: HomePage,
        children: [
            {
                path: ':name/:id',
                name: 'catContent',
                component: CatContent,
                props: true //props 设为ture 将变成 组件的props
            },
            {
                path: 'rank',//榜单
                name: 'rankView',
                component: RankView,
            },
            {
                path: 'tags',//标签页
                name: 'tagsView',
                component: TagsView,
            },
            {
                path: 'circle/:id',//标签页
                name: 'circleView',
                component: CircleView,
                props: true //props 设为ture 将变成 组件的props
            }
        ]
    },
    {
        path: '/user',
        name: 'userPage',
        component: UserPage
    },
    {
        path: '/topicDetail/:id',
        name: "topicDetail",
        component: TopicDetail
    },
    {
        path: '/circleDetail/:id',
        name: "circleDetail",
        component: CircleDetail
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router