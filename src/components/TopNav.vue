<script setup lang="ts">
import {Category} from "@/api/types.ts";
import {ref} from "vue";

type IProps = {
  cats: Category[]
}
const props = defineProps<IProps>()
const {cats} = props

const curCatId = ref(10411)

const emit = defineEmits<{
  (e: 'onselect', id: number, showType: number, name: string): void
}>()

emit('onselect', 10411, 1, '精选')

function handoff(id: number, showType: number, name: string) {
  curCatId.value = id
  emit('onselect', id, showType, name)
}
</script>

<template>
  <div class="scroll-bar nav-bar-wrapper">
    <li v-for="item in cats" @click="handoff(item.id,item.showType,item.name)"
        :class="curCatId==item.id?'activeCat':'' ">
      {{ item.name }}
    </li>
  </div>
</template>

<style scoped lang="scss">
.nav-bar-wrapper {
  z-index: 2;
  position: sticky;
  top: 0;
  background: white;
  font-size: 5rem;
  display: flex;
  height: 12rem;

  li {
    text-align: start;
    flex-shrink: 0;
    width: 20rem;
    color: rgb(203, 111, 111);
  }
}

li.activeCat {
  font-weight: bold;
  color: rgb(227, 30, 30);
}
</style>