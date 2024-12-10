<template>
  <footer class="s-bg-fade absolute bottom-0 left-0 right-0 flex flex-row border-t s-border-fade px-8 py-2">
    <div class="flex-1 grid grid-rows-2 grid-flow-col ">
      <span class="flex flex-row items-center gap-1 text-lg s-color-fade" v-for="(value, key, index) in filteredProps" :key="index">
        <template v-if="mergedProps.prefixes">
          <component class="s-icon-lg" :is="mergedProps?.prefixes[key]?.icon" />
          {{mergedProps?.prefixes[key]?.prefix}}:
        </template>
        <span>{{value}}</span>
      </span>
    </div>
    <img class="object-contain w-80 p-2" :src="mergedProps?.school?.badge" alt="school_badge"/>
  </footer>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {defaultCquptConfig} from "../const";
import type {CIconItem, CString} from "../const";
import {filterNone} from "../utils";

interface WaistProps {
  school?: string;

  meeting?: string;
  date?: string;
  presenters?: CString;
  instructors?: CString;
  prefixes?: Record<CIconItem, any>;
}

const props = withDefaults(defineProps<WaistProps>(), {
  date: `${new Date().toLocaleDateString()}`
})
const mergedProps = computed(() => {
  const keys = ["school", "meeting", "date", "presenters", "instructors", "prefixes"];
  const defaultProps = Object.fromEntries(
      Object.entries(defaultCquptConfig).filter(([key]) => keys.includes(key))
  )

  return {
    ...defaultProps,
    ...filterNone(props),
  }
})

const filteredProps = computed(() => filterNone({
  ...mergedProps.value,
  school: void 0,
  prefixes: void 0,
}))
</script>