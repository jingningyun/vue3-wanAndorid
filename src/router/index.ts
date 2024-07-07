import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'home' || to.name === 'tree' || to.name === 'search') {
    next()
  }
  else {
    // next({ name: 'login' })
    const userStore = useUserStore()
    if (!userStore.id) {
      next({ name: 'login', state: { to: to.name } })
    }
    else {
      next()
    }
  }
})

export default router
