<script setup lang="ts">
import {getConfig, getUserInfo} from "@/api/index";
import {ref} from "vue";
import {Category} from "@/api/types";
import TopNav from "@/components/TopNav.vue";
import {useRouter} from "vue-router";

const cats = ref<Category[]>([])
getConfig().then(res => {
  cats.value.push(...res)
})

const router = useRouter()

// 选中 category
function onSelect(id: number, typeShow: number, name: string) {
  if (typeShow == 1 || typeShow == 3) {
    router.replace({
      name: 'catContent', params: {name, id}
    })
  } else if (typeShow == 4) {
    router.replace({
      name: 'rankView'
    })
  } else if (typeShow == 7) {
    router.replace({
      name: 'tagsView'
    })
  } else if (typeShow == 6) {
    router.replace({
      name: 'circleView', params: {id}
    })
  }
}
</script>

<template>
  <TopNav :cats="cats" @onselect="onSelect"></TopNav>
  <div class="wrapper">
    <router-view v-slot="{ Component,route}">
      <keep-alive include="CatContent">
        <component :is="Component" :key="route.path"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
</style>