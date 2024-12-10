<template>
  <header v-show="!isHidden" class="absolute top-5 h-16 left-0 right-0 flex flex-row justify-between
  border-y s-bg-fade shadow-md s-border-fade px-2">
    <div class="flex flex-row flex-nowrap">
      <Link class="flex flex-row text-nowrap"
            v-for="(item, index) in breadcrumbs" :key="index" :to="item.no">
        <span class="text-md self-center flex flex-row items-center s-color-base hover:s-color-theme">
          <si-home v-if="index === 0" class="s-icon-md self-center mr-2"/>{{item.title}}
        </span>
        <si-arrow class="h-full stroke-[var(--s-line-fade)]"/>
      </Link>
    </div>
    <div class="px-10">
      <img class="object-contain w-50 h-full" :src="frontMatter.school.badge" alt="school_badge"/>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {useBreadcrumbs, useFrontMatter, useHidden} from "../hooks";
import {SiHome} from "../icons";

const { breadcrumbs } = useBreadcrumbs()
const { frontMatter } = useFrontMatter()
const { isHidden } = useHidden()
</script>