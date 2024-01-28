<script setup lang="ts">
import {useRoute} from "vue-router";
import {getTopicDetails} from "@/api";
import MediaCard from "@/components/MediaCard.vue";
import {ref} from "vue";
import {MediaInfo} from "@/api/types.ts";

let curPage = 1
const route = useRoute()

const mediaList = ref<MediaInfo[]>([])
const loading = ref(true)

function haveMore() {
  loading.value = true
  getTopicDetails(Number(route.params.id), curPage++).then(res => {
    mediaList.value.push(...res.mediaList)
    loading.value = false
  })
}

haveMore()
</script>

<template>
  <div v-scroll="haveMore" class="wrapper" v-loading="loading">
    <MediaCard v-for="item in mediaList" :media-info="item"></MediaCard>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 47rem);
  justify-content: space-between;
  align-items: flex-start;
}
</style>