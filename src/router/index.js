import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Catalog from '@/views/Catalog.vue'
import Favourites from "@/views/Favourites";
import Login from '@/components/auth/Login'

Vue.use(VueRouter)

const ifNotAuth = (to, from, next) => {
    if (to.name !== 'Login' && !store.getters['auth/isAuth']) next({name: 'Login'})
    else next();
};

const ifAuth = (to, from, next) => {
    if (to.name === 'Login' && store.getters['auth/isAuth']) next({name: 'Catalog'})
    else next()
};

const routes = [
    {
        path: '/',
        redirect: '/catalog',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifAuth,
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalog,
        beforeEnter: ifNotAuth,
    },
    {
        path: '/favourites',
        name: 'Favourites',
        component: Favourites,
        beforeEnter: ifNotAuth,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
