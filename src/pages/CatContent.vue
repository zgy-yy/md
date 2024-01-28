<script setup lang="ts">
import {getMediaHome} from "@/api";
import TopicList from "@/components/TopicList.vue";
import {ref} from "vue";
import {MediaInfo, TopicInfo} from "@/api/types.ts";
import MediaCard from "@/components/MediaCard.vue";

const props = defineProps<{ id: string }>()
const id = Number(props.id)

const topicList = ref<TopicInfo[]>([])
const mediaList = ref<MediaInfo[]>([])
let pageNum = 1
const loading = ref(false)

function haveData() {
  loading.value = true
  getMediaHome(id, pageNum++).then(data => {
    if (data.topicList)
      topicList.value.push(...data.topicList)
    if (data.mediaList) {
      mediaList.value.push(...data.mediaList)
    }
    loading.value = false
  })
}

haveData()


</script>

<template>
  <div class="main-view" v-scroll="haveData" v-loading="loading">
    <div class="topic-view">
      <TopicList v-if="topicList.length>0" v-for="item in topicList" :topic-info="item" :key="item.id"></TopicList>
    </div>


    <div class="medias-wrapper">
      <MediaCard v-for="item in mediaList" :media-info="item"></MediaCard>
    </div>

  </div>

</template>

<style scoped lang="scss">
.main-view {
  font-size: 10rem;
}

.topic-view {
  display: grid;
  grid-template-columns:repeat(auto-fill, minmax(48rem, 96rem));
  justify-items: stretch;
  justify-content: center;
  grid-column-gap: 5rem;

}

.medias-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 48rem);
  justify-content: space-between;
  align-items: flex-start;
}
</style>