<script setup lang="ts">
import {TopicInfo} from "@/api/types.js";
import MediaCard from "@/components/MediaCard.vue";
import {useRouter} from "vue-router";

type IProps = {
  topicInfo: TopicInfo
}
const props = defineProps<IProps>()
const topic = props.topicInfo

const router = useRouter()

function toTopicDetailView() {
  router.push({name: 'topicDetail', params: {id: topic.id}})
}
</script>

<template>
  <div class="media-list">
    <h3 @click="toTopicDetailView" class="title">{{ topic.name }} <span class="more">More</span></h3>
    <div class="flex-lists">
      <MediaCard v-for="item in topic.mediaList.slice(0,5)" :media-info="item"></MediaCard>
    </div>

  </div>
</template>

<style scoped lang="scss">
.media-list {
  margin: 0 auto 5rem auto;
  width: 96rem;
}

.title {
  position: relative;
  margin: .5rem 0 1rem 0;

  .more {
    position: absolute;
    right: 1rem;
  }
}

.flex-lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;

  div:first-child {
    width: 100%;
  }

}
</style>