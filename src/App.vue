<template>
  <div id="app">
    <transition name="router-animate" enter-active-class="animated fadeInLeft">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  /* margin-top: 60px; */
}
.fadeInLeft {
  -webkit-animation: fadeInLeft .15s; /* Safari 4+ */
  -moz-animation:    fadeInLeft .15s; /* Fx 5+ */
  -o-animation:      fadeInLeft .15s; /* Opera 12+ */
  animation:         fadeInLeft .15s; /* IE 10+, Fx 29+ */
}
</style>
