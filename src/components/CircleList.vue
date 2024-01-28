<script setup lang="ts">
import {CircleInfo} from "@/api/types.js";
import MediaCard from "@/components/MediaCard.vue";
import {useRouter} from "vue-router";

type IProps = {
  circleInfo: CircleInfo
}
const props = defineProps<IProps>()
const circle = props.circleInfo

const router = useRouter()

function toCircleDetailView() {
  router.push({name: 'circleDetail', params: {id: circle.id}})
}
</script>

<template>
  <div class="media-list">
    <h3 @click="toCircleDetailView" class="title">{{ circle.name }} <span class="more">More</span></h3>
    <div class="flex-lists">
      <MediaCard v-for="item in circle.mediaList" :media-info="item"></MediaCard>
    </div>

  </div>
</template>

<style scoped lang="scss">
.media-list {
  width: 96rem;
  margin-bottom: 5rem;
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
  align-items: flex-end;

  div:first-child {
    width: 100%;
  }

}
</style>