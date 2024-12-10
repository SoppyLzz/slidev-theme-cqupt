<template>
  <div class="absolute top-0 left-0 w-full h-full s-bg-deep">
    <canvas ref="canvas" class="relative w-full h-full"></canvas>
    <div class="absolute top-0 left-0 w-full h-full z-auto backdrop-blur-3xl"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue'

interface GradientProps {
  colors: string[];
}

const props = withDefaults(defineProps<GradientProps>(), {
  colors: [] as string[]
})

const default_colors = ["#37ecba", "#009efd", "#f9f586"]
const merged_colors = computed(() => {
  return [...new Set(props.colors.length===0 ? default_colors : props.colors)]
})

const canvas = ref(null)
const circles = ref([])
const ctx = computed(() => {
  return canvas.value?.getContext('2d') || null
})

const randomWithRange = (min, max) => Math.random() * (max - min) + min

const initCircles = () => {
  if (!canvas?.value) return
  circles.value = []
  let circleCount = window.innerWidth /100
  for (let i = 1; i <= circleCount; i++) {
    let radius = circleCount * 15
    let x = randomWithRange(radius, canvas.value.width - radius)
    let y = randomWithRange(radius, canvas.value.height - radius)
    let dx = randomWithRange(window.innerWidth/-500, window.innerWidth /500)
    let dy = randomWithRange(window.innerHeight/-500, window.innerHeight /500)
    let color = merged_colors.value[Math.floor(Math.random() * merged_colors.value.length)]
    circles.value.push({x, y, dx, dy, radius, color})
  }
}

const drawCircles = (circle) => {
  ctx.value.beginPath()
  ctx.value.arc(circle.x, circle.y, circle.radius, 2 * Math.PI, false)
  ctx.value.fillStyle = circle.color
  ctx.value.fill()
  ctx.value.closePath()
}

const resizeCanvas = () => {
  if (canvas?.value) {
    canvas.value.height = window.innerHeight
    canvas.value.width = window.innerWidth
  }
}

const animate = () => {
  requestAnimationFrame(animate)

  if (canvas?.value && ctx?.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    // console.log(circles.value.length)
    circles.value.forEach((circle) => {
      if (circle.x + circle.dx > canvas.value.width || circle.x - circle.radius < 0) {
        circle.dx = -circle.dx
      }

      if (circle.y + circle.dy > canvas.value.height || circle.y - circle.radius < 0) {
        circle.dy = -circle.dy
      }

      circle.x += circle.dx
      circle.y += circle.dy

      drawCircles(circle)
    })
  }
}

watch(() => canvas.value, ()=> {
  resizeCanvas()
  initCircles()
})

onMounted(() => {
  initCircles()
  window.addEventListener('resize', ()=>{
    resizeCanvas()
  })
  animate()
})
</script>