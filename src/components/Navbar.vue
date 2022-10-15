<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        @select="handleSelect"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <router-link to="/catalog">
        <el-menu-item index="1">Список товаров</el-menu-item>
      </router-link>
      <router-link to="/favourites">
        <el-menu-item index="2">Избранное</el-menu-item>
      </router-link>
      <div style="width:100%"></div>
      <!--      <el-menu-item>-->
      <!--&lt;!&ndash;        <el-button @click="onLogoutButtonClick">Logout</el-button>&ndash;&gt;-->
      <!--      </el-menu-item>-->
      <el-popconfirm
          title="Вы уверены, что хотите выйти?"
          @confirm="onLogoutButtonClick()"
          class="navbar-button"
      >
        <el-button
            slot="reference"
            type="outline-primary"
        >
          Logout
        </el-button>
      </el-popconfirm>

    </el-menu>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'IndexPage',
  data() {
    return {
      activeIndex: '1',
    };
  },
  created() {
    this.activeIndex = localStorage.getItem('index')
  },
  methods: {
    handleSelect(key) {
      localStorage.setItem('index', key)
      this.activeIndex = localStorage.getItem('index')
    },
    ...mapActions('auth', ['logout']),
    onLogoutButtonClick() {
      this.logout()
    }
  }
}
</script>

<style>
.el-menu.el-menu--horizontal {
  display: flex;
}

.navbar-button {
  display: flex;
  align-items: center;
  padding-right: 10px;
}
</style>
