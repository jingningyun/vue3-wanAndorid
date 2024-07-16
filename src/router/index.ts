import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.name === 'collect') {
    const userStore = useUserStore()
    if (!userStore.id) {
      next({ name: 'login', state: { to: to.path } })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
