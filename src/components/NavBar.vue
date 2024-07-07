<script setup lang='ts'>
defineProps({
  title: String,
})
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}
</script>

<template>
  <VanNavBar
    v-show="title"
    :title="title"
    :fixed="true"
    clickable left-arrow
    @click-left="onBack"
  />
</template>

<style scoped>

</style>
