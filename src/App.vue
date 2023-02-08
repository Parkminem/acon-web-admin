<template>
  <router-view></router-view>
</template>
<script setup></script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
* {
  box-sizing: border-box;
}
body {
  font-family: 'Noto Sans KR', sans-serif;
  color: #222;
  overflow-x: hidden;
}
button {
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
input,
select {
  outline: none;
}
/* 각 뷰의 subtitle 밑 컨텐츠들을 묶어주는 div */
.container {
  min-height: calc(100vh - 51px - 58px - 74px);
  padding: 50px;
}
/* 각 view의 container 바로 밑 div*/
.section {
  background-color: #fff;
  padding: 30px;
  &__top,
  &__bottom {
    display: flex;
    justify-content: space-between;
    color: #333;
  }
  &__left {
    display: flex;
    align-items: center;
  }
}
.sort-box {
  &__select {
    margin-left: 10px;
    font-size: 15px;
  }
}
.search-box {
  display: flex;
  align-items: center;
  &__select {
    font-size: 15px;
  }
  &__input-box__input {
    margin: 0 10px;
    max-width: 130px;
  }
  &__btn-box__btn {
    background-color: #333;
    color: #fff;
    padding: 3px;
    font-size: 13px;
  }
}
</style>
