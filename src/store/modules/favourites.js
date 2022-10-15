import api from '@/api';
import httpClient, {setToken} from "@/api/httpClient";

export default {
    namespaced: true,

    state: () => ({
        favourites: [],
        total: 0
    }),

    mutations: {
        SET_FAVOURITES(state, payload) {
            state.favourites = payload;
        },
        SET_FAVOURITES_COUNT(state, payload) {
            state.total = payload
        }
    },

    actions: {
        async fetchFavourites({commit}, {limit = 50, offset} = {}) {
            try {
                setToken(localStorage.getItem('token'))

                const {data} = await api.favourites.getFavourites({limit, offset});

                const favourites = data.data.productsFavourites;

                commit('SET_FAVOURITES', favourites);

                return Promise.resolve();
            } catch (e) {
                console.error(e);

                return Promise.reject();
            }
        },
        async fetchFavouritesCount({commit},) {
            try {
                console.log(httpClient.defaults.headers)
                const {data} = await api.favourites.getFavouritesCount();
                let total = data.data.productsFavourites.count

                commit('SET_FAVOURITES_COUNT', total);

                return Promise.resolve();
            } catch (e) {
                console.error(e);

                return Promise.reject();
            }
        },

        async deleteFavourite({commit, state}, {id}) {
            try {
                await api.favourites.deleteFavourite(id);

                const newFavourites = state.favourites.filter((item) => item.id !== id);

                commit('SET_FAVOURITES', newFavourites);

                return Promise.resolve();
            } catch (e) {
                console.error(e);

                return Promise.reject();
            }
        },


    },
};
