<script setup lang="ts">
import {reactive, ref} from "vue";
import {CircleInfo} from "@/api/types.ts";
import {getMediaHome} from "@/api";
import CircleList from "@/components/CircleList.vue";

const props = defineProps<{ id: string }>()
const id = Number(props.id)
let pageNum = 1;
const circles = reactive<{ circleList: CircleInfo[], hotCircle: CircleInfo[] }>({
  circleList: [],
  hotCircle: []
})
const loading = ref(false)

function havaMoreCircle() {
  loading.value = true
  getMediaHome(id, pageNum++).then(res => {
    console.log(res)
    circles.circleList.push(...res.circleList)
    circles.hotCircle.push(...res.hotCircle)
    loading.value = false
  })
}

havaMoreCircle()

</script>

<template>
  <div class="circle-view" v-loading="loading" v-scroll="havaMoreCircle">
    <CircleList v-for="item in circles.circleList" :circle-info="item"></CircleList>
  </div>
</template>

<style scoped lang="scss">
.circle-view {
  display: grid;
  grid-template-columns:repeat(auto-fill, min(96rem));
  justify-items: stretch;
  justify-content: center;
  grid-column-gap: 5rem;
  font-size: 10rem;
}
</style>