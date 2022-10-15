<template>
  <div>
    <Navbar/>

    <div class="products container">
      <h1 class="products-title">Список товаров</h1>
      <div
          v-loading="isLoading"
      >

      </div>
      <div
          v-for="product in products"
          :key="product.id"
          class="products-list"
      >
        <span>{{ product.title }}</span>
        <el-button v-if="!product.isInFavourites" icon="el-icon-star-off" @click="toFavorite(product)"></el-button>
        <el-button v-else icon="el-icon-star-on" @click="notFavourite(product)"></el-button>
      </div>
      <div
          class="products-pagination"
      >
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :total="total"
            :page-size="productsPerPage"
            @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapActions, mapState} from 'vuex';
import api from '@/api'
import {setToken} from "@/api/httpClient";

export default {
  name: 'Catalog',
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      productsPerPage: 50,
    }
  },
  computed: {
    ...mapState('products', ['total', 'products']),
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'fetchProductsCount']),
    async getProducts(offset) {
      try {
        this.isLoading = true;
        await this.fetchProducts({offset});
      } finally {
        this.isLoading = false;
      }
    },
    onPageChange(page) {
      let offsetView
      if (page === 1) {
        offsetView = 0
      } else {
        offsetView = this.productsPerPage * (page - 1) + 1
      }

      this.getProducts(offsetView);
    },
    async toFavorite(product) {
      try {
        this.isLoading = true;
        product.isInFavourites = true
        setToken(localStorage.getItem('token'))
        await api.products.toFavoriteProduct({'product': product.id})
      } finally {
        this.isLoading = false;
      }
    },
    notFavourite(product) {
      try {
        this.isLoading = true;
        product.isInFavourites = false
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.getProducts()
    this.fetchProductsCount()
  }
}
</script>

<style lang="scss">
.products {
  margin-top: 20px;

  &-title {
    margin-bottom: 25px;
    text-align: center;
  }

  &-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
    padding: 5px 20px;
    border: 1px solid sandybrown;
    border-radius: 10px;

    & .el-button {
      font-size: 30px;
      padding: 1px;
      border-radius: 26px;
    }
  }

  &-pagination {
    margin: 30px 0 70px;
    display: flex;
    justify-content: center;
  }
}
</style>
