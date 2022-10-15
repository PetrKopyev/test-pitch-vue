import httpClient from '@/api/httpClient';

const getProducts = ({limit = 50, offset = 0} = {}) => httpClient.get('/commerce/products', {
    params: {
        ['filters[limit]']: limit,
        ['filters[offset]']: offset
    }
});

const getProductsCount = () => httpClient.get('/commerce/products', {params: {['filters[aggregate]']: ''}});

const toFavoriteProduct = (product) => httpClient.post('/commerce/products/favourites', product)

export default {
    getProducts,
    getProductsCount,
    toFavoriteProduct
};
