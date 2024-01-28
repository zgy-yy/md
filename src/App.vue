<script setup lang="ts">
import {useVidURlStore} from "@/store";
import {ref} from "vue";
import ToolBar from "@/components/ToolBar.vue";

const vidRef = ref()
const urlStore = useVidURlStore()

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="HomePage">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <ToolBar class="tool-bar"></ToolBar>
  <video ref="vidRef" :src="urlStore.vidUrl" controls :title="urlStore.vidTitle"></video>
</template>

<style scoped>
video {
  display: none;
  width: 90%;
}

div {
  font-size: 4rem;
}

.tool-bar {
  margin: 0;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
