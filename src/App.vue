<template>
  <router-view></router-view>
</template>
<script setup></script>
<style>
@import 'reset-css';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
body {
  font-family: 'Noto Sans KR', sans-serif;
  color: #222;
  overflow-x: hidden;
}
button {
  border: none;
  outline: none;
  background-color: none;
  padding: 0;
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
