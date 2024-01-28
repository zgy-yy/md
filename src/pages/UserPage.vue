<script setup lang="ts">
import {getImgdata, getUserCollect, getUserInfo} from "@/api";
import {ref, watch} from "vue";
import {MediaInfo, User} from "@/api/types.ts";
import MediaCard from "@/components/MediaCard.vue";

let imgUrl = ref("")
const userInfo = ref<User>({})
getUserInfo().then(async res => {
  userInfo.value = res
  let imgData = await getImgdata(res.avatarUrl)
  imgUrl.value = imgData
})

const mediaList = ref<MediaInfo[]>([])
let pageNum = 1

function getCollect(id) {
  getUserCollect(id, pageNum++).then(res => {
    console.log(res)
    mediaList.value.push(...res.mediaList)
  })
}

watch(userInfo, (value) => {
  getCollect(value.id)
})

</script>

<template>
  <div class="user-wrapper">
    <img v-if="imgUrl !== ''" class="avatar-img" :src="imgUrl" alt="">
    <div class="options">
      <p>历史记录</p>
      <p>收藏</p>
    </div>
    <div class="list" v-scroll="()=>getCollect(userInfo.id)">
      <MediaCard v-for="item in mediaList" :media-info="item" :key="item.id"></MediaCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar-img {
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
}

.options {
  display: flex;
  width: 100%;
  justify-content: start;

  & > p {
    color: white;
    border-radius: 3rem;
    font-size: 4rem;
    background: #d951b1;
    padding: 3rem;
    margin: 2rem 3rem;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, min(48rem));
  justify-items: center;
  justify-content: flex-start;
}
</style>