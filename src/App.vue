<template>
  <router-view></router-view>
</template>
<script setup></script>
<style>
@import 'reset-css';
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
}
/* 테이블 위의 셀렉트, search input을 묶어주는 div, 
테이블 밑의 글 갯수, 페이지네이션을 묶어주는 div */
.tableTop,
.tableBottom {
  display: flex;
  justify-content: space-between;
  color: #333;
}
</style>
