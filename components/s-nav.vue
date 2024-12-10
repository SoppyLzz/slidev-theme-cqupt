<template>
  <header v-show="!isHidden" class="absolute top-5 left-0 right-0 flex flex-row border-t s-bg-fade s-border-fade shadow-md">
    <div class="border-b s-border-fade px-10">
      <img class="object-contain w-50 h-full" :src="frontMatter?.school?.badge" alt="school_badge"/>
    </div>
    <div class="flex-1 grid grid-rows-1 grid-flow-col auto-cols-fr pt-4">
      <div v-for="(item, index) in sections" :key="index" class="flex flex-col">
        <div class="flex-1 flex flex-row items-center">
          <div class="rounded-full w-10 h-10 flex items-center justify-center relative text-nowrap overflow-hidden"
               :class="computeIndexCls(item)">
            <template v-if="currentSection && item.no < currentSection.no">
              <si-check class="fill-[var(--s-light-8)] w-6 h-6"/>
            </template>
            <template v-else>
              <span :style="computeIndexStyle(arabic2Chinese(index+1))">{{arabic2Chinese(index+1)}}</span>
            </template>
          </div>
          <span class="flex-1 truncate mx-2"
                :class="computeTitleCls(item)">{{item.name}}</span>
        </div>
        <div class="grid grid-rows-1 grid-flow-col">
          <Link v-for="page in item.pages" :key="page.no" :to="page.no" class="h-4 border-b-1" :class="computeUnderlineCls(page)"></Link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type {CPage, CSection} from "../hooks";

import {useFrontMatter, useHidden, useSections} from "../hooks";
import {arabic2Chinese} from '../utils'

const {isHidden} = useHidden()
const {frontMatter} = useFrontMatter()
const {sections, currentSection} = useSections()

const computeIndexCls = (sec: CSection) => {
  return currentSection.value && sec.no < currentSection.value.no
      ? ['s-bg-theme'] // pre
      : currentSection.value && sec.no === currentSection.value.no
          ? ['border', 's-border-theme', 's-color-theme'] // current
          : ['border', 's-border-fade', 's-color-fade'] // after
}
const computeTitleCls = (sec: CSection) => {
  return currentSection.value && sec.no < currentSection.value.no
      ? ['s-color-base'] // pre
      : currentSection.value && sec.no === currentSection.value.no
          ? ['s-color-theme'] // current
          : ['s-color-fade'] // after
}
const computeUnderlineCls = (page: CPage) => {
  return frontMatter.value.no === page.no
      ? ["s-border-theme", "border-b-4"]  // active
      : ['s-border-fade'] // normal
}

const computeIndexStyle = (word: string) => ({ transform: `scale(${word.length > 2 ? 2/word.length : 1})` })
</script>