import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)
export function setupPinia(app: App) {
  app.use(store)
}

export * from './modules/user'
export { store }
