import httpClient from '@/api/httpClient';

const getFavourites = ({limit = 50, offset = 0} = {}) => httpClient.get('/commerce/products/favourites', {
    params: {
        ['filters[limit]']: limit,
        ['filters[offset]']: offset
    }
});

const getFavouritesCount = () => httpClient.get('/commerce/products/favourites', {params: {['filters[aggregate]']: ''}});

const deleteFavourite = (id) => httpClient.delete(`/commerce/products/${id}/favourites`)


export default {
    getFavourites,
    getFavouritesCount,
    deleteFavourite
};
