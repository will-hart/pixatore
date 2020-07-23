import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Loading View',
    component: () =>
      import(/* webpackChunkName: "splash" */ '../views/LoadingView.vue'),
  },
  {
    path: '/browser',
    name: 'Server Browser',
    component: () =>
      import(/* webpackChunkName: "lobby" */ '../views/ServerBrowserView.vue'),
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: () =>
      import(/* webpackChunkName: "lobby" */ '../views/LobbyView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
