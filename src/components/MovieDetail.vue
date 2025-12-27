<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import IsLoading from '../ui/Loading.vue';


const movieDetail = ref([])
const isLoading = ref(true)

const props = defineProps({
  id: String
})

const api = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGM1MDJlOGVlYjdiNDcwZGViYmM3ZDViMjU3MzFiYSIsIm5iZiI6MTc1Mzg1NTMzNi41NTEsInN1YiI6IjY4ODliNTY4NTE4YjdkYmFiYTVhZTEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KONGxJhJ3AWq6JApsjxjoC3wKCSCLdegGip93jv7Idg';


const getMovie = async (moveId) => {
  movieDetail.value = await axios.get(`https://api.themoviedb.org/3/movie/${moveId}?language=ko-kr`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${api}`
    }
  })
    .then(res => res.data)
    .catch(err => err)
    .finally(() => isLoading.value = false)

}

onMounted(() => {
  getMovie(props.id)

})





</script>

<template>

  <router-link to="/">돌아가기</router-link>


  <IsLoading :Loading="isLoading" v-if="isLoading"></IsLoading>


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
    <div>
      <a :href="`${movieDetail.homepage}`" v-if="movieDetail.homepage">영화</a>
      <a style="pointer-events: none;" v-else>영화 링크가 없습니다</a>
    </div>

  </div>







</template>