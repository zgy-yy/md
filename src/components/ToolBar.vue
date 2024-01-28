<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

function toUserPage() {
  router.push("/user")
}

</script>

<template>
  <div class="wrapper-bar" @click="toUserPage">我的</div>
</template>

<style scoped lang="scss">
.wrapper-bar {
  line-height: 9rem;
  height: 9rem;
  width: 100%;
  background: #16d2d6;
}
</style>