<script setup>
import { onMounted, ref } from 'vue';
import IsLoading from '../ui/Loading.vue';
import { getMovieById } from '../script/script';

const movieDetail = ref(null)
const isLoading = ref(true)

const props = defineProps({
  id: String
})

onMounted(async () => {
  try {
    isLoading.value = true
    movieDetail.value = await getMovieById(props.id)
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false
  }
})
</script>

<template>

  <router-link to="/">돌아가기</router-link>


  <IsLoading :loading="isLoading" v-if="isLoading"></IsLoading>


  <div class="movie-Detail" v-else>



    <img :src="`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`" class="w-100 h-100">


    <div>제목: {{ movieDetail.title }}</div>
    <div class="genres d-flex justify-content-around">
      <div v-for="(item, index) in movieDetail.genres" :key="index"
        class="border border-white w-25 p-1 text-center fw-bold" style="--fa-border-color: #00ff00;"> {{
          item.name }}</div>
    </div>
    <div>소개: {{ movieDetail.overview }}</div>
    <div>발매일: {{ movieDetail.release_date }}</div>
    <div>별점: {{ movieDetail.vote_average.toFixed(1) }}</div>





    <div>
      <a :href="`${movieDetail.homepage}`" v-if="movieDetail.homepage" target="blank">영화</a>
      <a style="pointer-events: none;" v-else>영화 링크가 없습니다</a>
    </div>

  </div>
</template>