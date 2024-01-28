<script setup lang="ts">
const props = defineProps<{ name: string }>()

</script>

<template>
  <div class="loading">loading{{ props.name }}</div>
</template>

<style scoped lang="scss">
.loading {
  width: 32rem;
  height: 12rem;
  border-radius: 2rem;
  line-height: 12rem;
  color: white;
  background: rgba(17, 17, 17, 0.62);
  font-size: 5rem;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translateX(-50%);
}

</style>