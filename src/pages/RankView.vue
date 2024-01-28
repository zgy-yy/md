<script setup lang="ts">
import {getRackCat, getRankMedia} from "@/api";
import {ref} from "vue";
import {Category, MediaInfo} from "@/api/types.ts";
import MediaCard from "@/components/MediaCard.vue";

const curCatId = ref(0)
const rankCats = ref<Category[]>([])
let pageNum = 1
const mediaList = ref<MediaInfo[]>([])
const loading = ref(false)
// 获取分类
getRackCat().then(res => {
  curCatId.value = res[0].id
  haveRankMedia(res[0].id, pageNum++)
  rankCats.value = res
})

function haveRankMedia(id: number, pageNum: number) {
  loading.value = true
  getRankMedia(id, pageNum).then(res => {
    mediaList.value.push(...res)
    loading.value = false
  })
}

function changeRankCat(id: number) {
  curCatId.value = id
  pageNum = 1;
  mediaList.value = []
  haveRankMedia(id, pageNum)
}

function haveMore() {
  haveRankMedia(curCatId.value, pageNum++)
}

</script>

<template>
  <div v-scroll="haveMore">
    <div class="scroll-bar switch-bar">
      <li v-for="item in rankCats" @click="changeRankCat(item.id)"
          :class="curCatId==item.id?'active-cat':'normal-cat' ">
        {{ item.name }}
      </li>
    </div>
    <!---->
    <div class="media-list" v-loading="loading">
      <MediaCard v-for="item in mediaList" :media-info="item" :key="item.id"></MediaCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch-bar {
  font-size: 5rem;
  display: flex;
  height: 12rem;

  li {
    flex-shrink: 0;
    font-size: 4rem;
    padding: 1rem 2rem;
    margin: 2rem 3rem 2rem 0;
    border-radius: 1.6rem;
    text-align: start;
    line-height: 5rem;
    height: 5rem;
  }
}

.media-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 48rem);
  justify-content: stretch;
  justify-items: center;
}

.normal-cat {
  color: #e31e1e;
  background: #fff0f0;

}

.active-cat {
  background: #e31e1e;
  color: white;
}
</style>