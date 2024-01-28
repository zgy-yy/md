<script setup lang="ts">
import {getImgdata, getMediaPlay} from "@/api/home.ts";
import {MediaInfo} from "@/api/types";
import {useVidURlStore} from "@/store";
import {computed, onMounted, ref} from "vue";
import {time2String} from "../utils";
import {addMediaCollect} from "@/api";


type  IProps = {
  mediaInfo: MediaInfo
}
const props = defineProps<IProps>()
const {id, title, videoUrl, tags, playTime, isCollet, watchTimes} = props.mediaInfo
let isCollect = ref(isCollet)

const {changeVidURL} = useVidURlStore()

let initRectHeight = 0
const wrapperRef = ref<HTMLDivElement>()
onMounted(() => {
  let wrapper = wrapperRef.value
  if (wrapper) {
    const boundingRect = wrapper.getBoundingClientRect()
    initRectHeight = boundingRect.height
  }
})

function onClick() {
  changeVidURL(videoUrl, title)
}

const rowSpan = ref("span 1")

function onLoad(e: Event) {
  let img = e.currentTarget as HTMLImageElement
  const wrapper = img.parentElement as HTMLDivElement
  const boundingRect = wrapper.getBoundingClientRect()
  rowSpan.value = "span " + Math.floor(boundingRect.height / (initRectHeight - 10))
}

const collectImg = computed(() => {
  let url = isCollect.value ? '/like.png' : '/unlike.png'
  return "url(" + url + ")"
})

function addCollect() {
  if (isCollect.value) {
    addMediaCollect(id, false).then(res => {
      if (res.code == 200) {
        isCollect.value = false
      }
    })
  } else {
    addMediaCollect(id).then(res => {
      if (res.code == 200 || res.code == 6096) {
        isCollect.value = true
      }
    })
  }

}

function log() {
  console.log(props.mediaInfo)

  getMediaPlay(id).then(res => {
    console.log(res)
  })
}
</script>

<template>
  <div class="wrapper" ref="wrapperRef">
    <div class="media-wrapper">
      <div class="play-info">
        <span>{{ (watchTimes / 10000).toFixed(2) }}w</span>
        <span @click="addCollect">{{ time2String(playTime) }}</span>
      </div>
      <img @click="onClick" content="center" class="cover-img" src="/defaultImg.png" @load="onLoad"
           v-lazy="()=>getImgdata(props.mediaInfo.coverImg)" :alt="title"/>
      <span @click="addCollect" class="like"></span>
    </div>

    <p class="ellipsis title">{{ title }}</p>
    <div @click="log" class="tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.wrapper {
  grid-row-start: v-bind(rowSpan);
  width: 47rem;
  padding-top: 1rem;
  margin-bottom: 2rem;
  font-size: 3.2rem;
  overflow: hidden;

  .title {
    height: 8rem;
    line-height: 4rem;
    padding: 0 .6rem;
  }

  .media-wrapper {
    position: relative;

    .like {
      position: absolute;
      top: 0;
      right: 0;

      background: v-bind(collectImg) no-repeat center;
      background-size: 6rem;

      width: 8rem;
      height: 8rem;
    }

    .cover-img {
      break-inside: avoid-column;
      width: 100%;
      min-height: 26.4rem;
      object-fit: contain
    }

    .play-info {
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .9));
      color: white;

      span {
        margin: .8rem 1.6rem;
      }
    }
  }


}

.tags {
  text-align: start;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 8rem;

  span {
    display: inline-block;
    height: fit-content;
    flex-shrink: 0;
    padding: .3rem .8rem;
    margin: 1rem;
    border-radius: 0.8rem;
    background: #d951b1;
    color: white;
  }
}

</style>