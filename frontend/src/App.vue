<template>
  <v-app id="app">
    <v-app-bar absolute elevate-on-scroll color="primary" dense dark>
      <v-toolbar-title>Vue 2 + Vuetify + Vite</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="page">
      <transition name="fade-custom" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </v-app>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { RouterView },
  methods: {
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('access_token_exp')

      this.$router.push({ name: 'login' })
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page {
  padding: 80px 0;
  text-align: left;
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
}

.v-toolbar__content {
  max-width: 1280px;
  margin: 0 auto;
}

.fade-custom-enter-active,
.fade-custom-leave-active {
  transition: opacity 0.5s;
}
.fade-custom-enter,
.fade-custom-leave-to {
  opacity: 0;
}
</style>
