<template>
  <div class="rotuerLinks d-flex justify-content-around w-25 bg-white  align-items-center ">
    <router-link class="m-0" to="/">Home</router-link>
    <router-link class="m-0" to="/WishList">WishList</router-link>
  </div>

  <div class="container">
    <router-view></router-view>
  </div>
</template>