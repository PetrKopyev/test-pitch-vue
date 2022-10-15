import api from '@/api';

export default {
    namespaced: true,

    state: () => ({
        products: [],
        total: 0
    }),

    mutations: {
        SET_PRODUCTS(state, payload) {
            state.products = payload;
        },
        SET_PRODUCTS_COUNT(state, payload) {
            state.total = payload
        }
    },

    actions: {
        async fetchProducts({ commit }, { limit = 50, offset } = {}) {
            try {
                const { data } = await api.products.getProducts({ limit, offset });

                const products = data.data.products;

                commit('SET_PRODUCTS', products);

                return Promise.resolve();
            } catch (e) {
                console.error(e);

                return Promise.reject();
            }
        },
        async fetchProductsCount({ commit } ) {
            try {
                const { data } = await api.products.getProductsCount();
                let total = data.data.products.count

                commit('SET_PRODUCTS_COUNT', total);

                return Promise.resolve();
            } catch (e) {
                console.error(e);

                return Promise.reject();
            }
        },
    },
};
