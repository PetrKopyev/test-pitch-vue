import api from '@/api';
import {deleteToken, setToken} from '@/api/httpClient';

export default {
    namespaced: true,

    state: () => ({
        token: localStorage.getItem('token') || '',
    }),

    mutations: {
        SET_USER_DATA(state, {token}) {
            state.token = token;

            localStorage.setItem('token', token);
        },

        CLEAR_USER_DATA(state) {
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('index');
        },
    },

    actions: {
        async auth({commit}, {username = null, password = null} = {}) {
            const {data} = await api.auth.auth(username, password);
            const token = data.data.Authorization;
            setToken(token);
            localStorage.setItem('index', 1)
            this.activeIndex = localStorage.getItem('index')

            commit('SET_USER_DATA', {token});

            await window.vm.$router.push('/');
        },

        async logout({commit}) {
            commit('CLEAR_USER_DATA');
            deleteToken();
            await api.auth.logout();
            await window.vm.$router.push('/login');
        },
    },

    getters: {
        isAuth(state) {
            return !!state.token;
        },
    },
};
