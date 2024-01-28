<script setup lang="ts">

import LabelPack from "@/components/LabelPack.vue";
import {getMediaCategory} from "@/api";
import {ref} from "vue";
import {MediaInfo} from "@/api/types.ts";
import MediaCard from "@/components/MediaCard.vue";

type tuples = [string, number, number, number]

const loading = ref(false)
let mediaList = ref<MediaInfo[]>([])
let pageNum = 1;

let requestData: tuples

function onChange(data: tuples) {
  loading.value = true
  requestData = data
  getMediaCategory(pageNum++, ...data).then(res => {
    pageNum = 1
    mediaList.value = []
    mediaList.value = res
    loading.value = false
  })
}

function haveMore() {
  loading.value = true
  getMediaCategory(pageNum++, ...requestData).then(res => {
    mediaList.value.push(...res)
    loading.value = false
  })
}

</script>

<template>
  <LabelPack @change="onChange"></LabelPack>
  <div class="media-list" v-scroll="haveMore" v-loading="loading">
    <MediaCard v-for="item in mediaList" :media-info="item" :key="item.id"></MediaCard>
  </div>
</template>

<style scoped lang="scss">
.media-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 48rem);
  justify-content: stretch;
  justify-items: center;
}
</style>