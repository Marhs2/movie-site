<script setup>
const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <div v-show="props.loading">로딩중</div>
</template>
