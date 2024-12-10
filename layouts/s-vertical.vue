<template>
  <div class="slidev-layout vertical flex gap-8 mx-8" :class="fromToCls">
    <div class="h-full w-80 s-bg-fade flex flex-col border border-x s-border-fade shadow-md relative">
      <div class="h-50% absolute bottom-0 left-0 w-full" :style="viewStyle"/>
      <div class="h-50% absolute bottom-0 left-0 w-full s-bg-fade-to-transparent"/>
      <div class="w-full h-full p-6 absolute top-0 left-0 flex flex-col justify-center items-center" :class="sideCls"><div><slot name="side"/></div></div>
    </div>
    <div class="my-8 h-[calc(100%-4rem)] flex-1 flex overflow-hidden gap-4" :class="fromToCls">
      <div :class="colCls" v-if="$slots.default || $slots.col_1">
        <template v-if="$slots.default"><slot name="default"/></template>
        <template v-else-if="$slots.col_1"><slot name="col_1"/></template>
      </div>
      <div :class="colCls" v-if="$slots.col_2"><slot name="col_2"/></div>
      <div :class="colCls" v-if="$slots.col_3"><slot name="col_3"/></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useFrontMatter} from "../hooks";
import {computed} from "vue";

const {frontMatter} = useFrontMatter();

const colCls = computed(() => {
  const pubCls = ['flex-1', 's-scrollbar']
  const clses = {
    "hidden": ['overflow-hidden'],
    "scroll": ['overflow-scroll'],
    "auto": ['overflow-auto'],
  }
  return [
    ...pubCls,
    ...clses[frontMatter.value?.vertical?.overflow],
  ] || []
})
const fromToCls = computed(() => [`flex-row${frontMatter.value.vertical.fromTo == 'ltr'? '' : '-reverse'}`])
const sideCls = computed(() => ({'s-text-vertical': frontMatter.value.vertical.direction == 'vertical'}))

const viewStyle = computed(() => ({
  backgroundImage: `url("${frontMatter.value.vertical.view}")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}))
</script>