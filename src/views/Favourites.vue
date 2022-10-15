<template>
  <div>
    <Navbar/>

    <div
        v-loading="isLoading"
        class="favourites container"
    >
      <h1 class="favourites-title">Избранное</h1>
      <div
          v-for="favourite in favourites"
          :key="favourite.id"
          class="favourites-list"
      >
        <span class="favourites-item">{{ favourite.product.title }}</span>
        <el-popconfirm
            title="Вы уверены, что хотите удалить?"
            @confirm="onDeleteFavourite(favourite.product.id)"
        >
          <el-button
              slot="reference"
              type="outline-primary"
              icon="el-icon-star-on"
          >
          </el-button>
        </el-popconfirm>
      </div>

      <div class="favourites-pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :total="total"
            :page-size="favouritesPerPage"
            @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapActions, mapState} from 'vuex';


export default {
  name: 'Favourites',
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      favouritesPerPage: 50,
    }
  },
  computed: {
    ...mapState('favourites', ['total', 'favourites']),
  },
  methods: {
    ...mapActions('favourites', ['fetchFavourites', 'fetchFavouritesCount', 'deleteFavourite']),
    async getFavourites(offset) {
      try {
        this.isLoading = true;

        await this.fetchFavourites({offset});
      } finally {
        this.isLoading = false;
      }
    },
    onPageChange(page) {
      let offsetView
      if (page === 1) {
        offsetView = 0
      } else {
        offsetView = this.favouritesPerPage * (page - 1) + 1
      }

      this.getFavourites(offsetView);
    },

    async onDeleteFavourite(id) {
      try {
        this.isLoading = true;
        await this.deleteFavourite({id});
        await this.getFavourites()
        await this.fetchFavouritesCount()
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getFavourites()
    this.fetchFavouritesCount()

  }
}
</script>

<style lang="scss">
.favourites {
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
