<script setup>
import { onMounted, ref, watch } from "vue";
import router from "../router";
import IsLoading from "../ui/Loading.vue";
import { getMovie, movieSearch } from "../script/script";
import { genres, langueageTypes } from "../assets/data";

const movieData = ref([]);
const isLoading = ref(true);
const searchLoading = ref(false);
const page = ref(1);
const searchValue = ref("");
const selectedGeners = ref(genres);
const langType = ref("");

onMounted(async () => {
  loadData();
});

const loadData = async () => {
  try {
    isLoading.value = true;
    const movieList = await getMovie(
      page.value,
      selectedGeners.value,
      langType.value
    );
    movieData.value = movieList;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const moveToDetail = (id) =>
  router.push({ name: "detail", params: { id: id } });

watch([page, langType, selectedGeners], () => loadData());

const searchMovie = async () => {
  try {
    searchLoading.value = true;
    const data = await movieSearch(
      searchValue.value,
      page.value,
      selectedGeners.value,
      langType.value
    );

    movieData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    searchLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div
      class="category col-md-3 col-lg-2 border-end border-secondary"
      style="min-height: 100vh"
    >
      <select class="LangSelect" style="width: 150px" v-model="langType" placeholder="언어">
        <option value="">전체</option>
        <option
          :value="item.iso_3166_1"
          v-for="item in langueageTypes"
          :key="item.iso_3166_1"
        >
          {{ item.english_name }}
        </option>
      </select>

      <div
        v-for="item in genres"
        :key="item.id"
        class="d-flex justify-content-between align-items-center p-3 text-white border-bottom border-dark shadow-sm"
      >
        <label :for="item.id" class="form-check-label cursor-pointer">{{
          item.name
        }}</label>
        <input
          type="checkbox"
          :id="item.id"
          :value="item.id"
          class="form-check-input mt-0"
          v-model="selectedGeners"
        />
      </div>
    </div>

    <div class="items">
      <div class="searh-container d-flex align-items-center bg-white rounded-5">
        <input
          type="text"
          v-model="searchValue"
          class="border-0 shadow-none form-control"
          @keyup.enter="searchMovie"
        />
        <font-awesome-icon icon="fa-solid fa-search " class="fs-4" />
      </div>

      <div class="movies">
        <IsLoading :loading="isLoading" v-if="isLoading"></IsLoading>

        <div
          v-for="item in movieData.results"
          :key="item.id"
          @click="moveToDetail(item.id)"
          v-else
        >
          <img
            :src="`https://image.tmdb.org/t/p/w780/${item.poster_path}`"
            class="rounded"
          />
          <div class="item-content text-white text-center p-2">
            <div>{{ item.title }}</div>
            <div>{{ item.release_date }}</div>
          </div>
        </div>
      </div>

      <div
        class="move d-flex justify-content-center gap-5 mt-4 m-auto align-items-center"
      >
        <div
          class="left text-white fs-4"
          @click="page <= 1 ? page : page--"
          style="cursor: pointer"
        >
          <font-awesome-icon icon="fa-solid fa-caret-left" />
        </div>
        <div class="text-white fw-bold fs-3">{{ page }}</div>
        <div
          class="right text-white fs-4"
          @click="page++"
          style="cursor: pointer"
        >
          <font-awesome-icon icon="fa-solid fa-caret-right" />
        </div>
      </div>
    </div>
  </div>
</template>
