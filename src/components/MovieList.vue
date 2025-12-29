<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import router from '../router';
import axios from 'axios';
import IsLoading from '../ui/Loading.vue';

const movieData = ref([])
const isLoading = ref(true)
const page = ref(1)
const searchValue = ref('')
const selectedGeners = ref([])


const getMovie = async () => {
  const response = await axios.get(`/discover/movie`, {
    params: {
      include_adult: false,
      language: 'ko-kr',
      page: page.value,
      sort_by: 'popularity.desc',
      with_genres: selectedGeners.value
    }
  }).finally(() => isLoading.value = false)


  movieData.value = response.data
}

onMounted(() => {
  getMovie()
})

const moveToDetail = (id) => router.push({ name: 'detail', params: { id: id } })


watch(page, () => {
  getMovie()
})

watch(selectedGeners, async (newSelectedGeners) => {
  getMovie()
})



const movieSearch = async () => {

  if (!searchValue.value.trim()) return getMovie();

  try {
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: searchValue.value, // 사용자가 입력한 검색어 (필수)
        include_adult: false,
        language: 'ko-kr',
        page: page.value,
        with_genres: selectedGeners.value

      }
    })



    movieData.value = search.data

  } catch (err) {
    return err

  }



}

const genres = ref([
  {
    "id": 28,
    "name": "액션"
  },
  {
    "id": 12,
    "name": "모험"
  },
  {
    "id": 16,
    "name": "애니메이션"
  },
  {
    "id": 35,
    "name": "코미디"
  },
  {
    "id": 80,
    "name": "범죄"
  },
  {
    "id": 99,
    "name": "다큐멘터리"
  },
  {
    "id": 18,
    "name": "드라마"
  },
  {
    "id": 10751,
    "name": "가족"
  },
  {
    "id": 14,
    "name": "판타지"
  },
  {
    "id": 36,
    "name": "역사"
  },
  {
    "id": 27,
    "name": "공포"
  },
  {
    "id": 10402,
    "name": "음악"
  },
  {
    "id": 9648,
    "name": "미스터리"
  },
  {
    "id": 10749,
    "name": "로맨스"
  },
  {
    "id": 878,
    "name": "SF"
  },
  {
    "id": 10770,
    "name": "TV 영화"
  },
  {
    "id": 53,
    "name": "스릴러"
  },
  {
    "id": 10752,
    "name": "전쟁"
  },
  {
    "id": 37,
    "name": "서부"
  }
])
</script>

<template>



  <IsLoading :data="isLoading" v-if="isLoading"></IsLoading>



  <div class="container" v-else>

    <div class="category col-md-3 col-lg-2 border-end border-secondary" style="min-height: 100vh;">
      <div v-for="item in genres" :key="item.id"
        class="d-flex justify-content-between align-items-center p-3 text-white border-bottom border-dark shadow-sm">
        <label :for="item.id" class="form-check-label cursor-pointer">{{ item.name }}</label>
        <input type="checkbox" :id="item.id" :value="item.id" class="form-check-input mt-0" v-model="selectedGeners">
      </div>
    </div>

    <div class="items">
      <div class="searh-container d-flex align-items-center bg-white rounded-5">
        <input type="text" v-model="searchValue" class="border-0 shadow-none form-control"
          @keyup.enter="movieSearch(searchValue)">
        <font-awesome-icon icon="fa-solid fa-search " class="fs-4" />
      </div>

      <div class="movies">
        <div v-for="(item) in movieData.results" :key="item.id" @click="moveToDetail(item.id)">
          <img :src="`https://image.tmdb.org/t/p/w780/${item.poster_path}`" class="rounded">
          <div class="item-content text-white text-center p-2">
            <div>{{ item.title }}</div>
            <div>{{ item.release_date }}</div>
          </div>

        </div>
      </div>


      <div class="move d-flex justify-content-center gap-5 mt-4 m-auto align-items-center">
        <div class="left text-white fs-4" @click="page <= 1 ? page : page--" style="cursor: pointer;">
          <font-awesome-icon icon="fa-solid fa-caret-left" />
        </div>
        <div class="text-white fw-bold fs-3">{{ page }}</div>
        <div class="right text-white fs-4" @click="page++" style="cursor: pointer;">
          <font-awesome-icon icon="fa-solid fa-caret-right" />
        </div>
      </div>
    </div>

  </div>




</template>