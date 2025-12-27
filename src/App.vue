<script setup>

import axios from 'axios';
import { ref } from 'vue';


const movieData = ref([]);


const getMovie = async () => {
  movieData.value = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-kr&page=1&sort_by=popularity.desc', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${api}`
    }
  })
    .then(res => res.data)
    .catch(err => err);
}




</script>

<template>


  <div class="container ">
    <router-view></router-view>
  </div>



</template>
