<script setup lang="ts">
import {ref, watch} from "vue";
import {getNewTags} from "@/api";
import {Category} from "@/api/types.ts";

interface Lab<T = string> {
  head: string,
  content: T[]
}

const mediaType: Lab = {head: '类型', content: ['短视频', '长视频']}
const price: Lab = {head: '付费', content: ['会员', '金币', '免费']}
const sort: Lab = {head: '排序', content: ['最新', '最热', '推荐']}
const label = ref<Lab<Category>>(
    {head: '标签', content: []},
)
// label,type,sort,price
type tuples = [string, number, number, number]
const activeTag = ref<tuples>(["", 2, 0, -1])

getNewTags().then(res => {
  console.log(res)
  label.value.content = res
})

const emit = defineEmits<{
  (e: 'change', data: tuples): void
}>()
watch(activeTag, (value) => {
  emit('change', [...value])
}, {
  deep: true,
  immediate: true
})


</script>

<template>
  <div class="tags-view">
    <div>
      <li>{{ label.head }}</li>
      <div class="scroll-bar tags-bar">
        <li v-for="item in label.content" :class="activeTag[0]==item.name?'active-tag':''" :key="item"
            @click="activeTag[0]=item.name">{{
            item.name
          }}
        </li>
      </div>
    </div>
    <div>
      <li>{{ mediaType.head }}</li>
      <li v-for="(item,index) in mediaType.content" :class="activeTag[1]==index+1?'active-tag':''" :key="item"
          @click="activeTag[1]=index+1">{{ item }}
      </li>
    </div>
    <div>
      <li>{{ sort.head }}</li>
      <li v-for="(item,index) in sort.content" :class="activeTag[2]==index?'active-tag':''" :key="item"
          @click="activeTag[2]=index">{{ item }}
      </li>
    </div>
    <div>
      <li>{{ price.head }}</li>
      <li v-for="(item,index) in price.content" :class="activeTag[3]==index+1?'active-tag':''" :key="item"
          @click="activeTag[3]=index+1">{{ item }}
      </li>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags-view {
  font-size: 4rem;

  & > div {
    display: flex;
    align-items: center;
    justify-content: start;

    & > li:first-child {
      background: #16d2d6;
      color: white;
    }

    li {
      flex-shrink: 0;
      margin: 1rem 4rem 2rem 0;
      text-align: start;
      padding: 1rem 2rem;
      border-radius: 1rem;
      height: 6rem;
      line-height: 6rem;
    }
  }
}

.tags-bar {
  display: flex;
}

.active-tag {
  color: #16d2d6;
}
</style>