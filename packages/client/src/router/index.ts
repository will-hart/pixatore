import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Splash Screen',
    component: () =>
      import(/* webpackChunkName: "splash" */ '../views/SplashScreen.vue'),
  },
  {
    path: '/menu',
    name: 'Main Menu',
    component: () =>
      import(/* webpackChunkName: "main_menu" */ '../views/MainMenu.vue'),
  },
  {
    path: '/serverbrowser',
    name: 'Server Browser',
    component: () =>
      import(/* webpackChunkName: "main_menu" */ '../views/ServerBrowser.vue'),
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: () =>
      import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue'),
  },
  // {
  //   path: '/game',
  //   name: 'Game',
  //   component: () =>
  //     import(/* webpackChunkName: "game" */ '../views/GameView.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
