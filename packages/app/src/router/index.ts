import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Splash',
    component: () =>
      import(/* webpackChunkName: "splash" */ '../screens/SplashScreen.vue'),
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: () =>
      import(/* webpackChunkName: "lobby" */ '../screens/LobbyScreen.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
