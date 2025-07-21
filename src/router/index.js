// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Vote from '../components/homework/Vote.vue';  // 替换为实际组件路径
import Apply from '../components/homework/Apply.vue';  // 替换为实际组件路径

const routes = [
    {
        path: '/',
        redirect: '/vote'  // 默认跳转到投票页
    },
    {
        path: '/vote',
        name: 'vote',
        component: Vote
    },
    {
        path: '/apply',
        name: 'apply',
        component: Apply
    }
];

const router = createRouter({
    history: createWebHashHistory(),  // 使用hash模式（带#号）
    routes
});

export default router;