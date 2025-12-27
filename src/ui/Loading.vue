<script setup>



const props = defineProps({
  Loading: Boolean
})

console.log(props.Loading);

</script>

<template>
  <div v-show="props.Loading">로딩중</div>
</template>

