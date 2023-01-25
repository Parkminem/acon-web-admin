<template>
  <div class="sideMenu" :style="{ left: moveLeft() + 'px' }">
    <div class="header">
      <div class="top">
        <div class="logo">
          <router-link to="/main"><h1>IDEACONCERT</h1></router-link>
        </div>
        <div class="nav">
          <ul class="list">
            <li class="depth01">
              <router-link to="/history"><span class="material-icons"> handyman </span><span>연혁</span></router-link>
            </li>
            <li class="depth01">
              <router-link to="/news"><span class="material-icons"> handyman </span><span>소식</span></router-link>
            </li>
            <li class="depth01">
              <router-link to="/partners"
                ><span class="material-icons"> handyman </span><span>파트너사</span></router-link
              >
            </li>
            <li class="depth01">
              <router-link to="/location"><span class="material-icons"> handyman </span><span>위치</span></router-link>
            </li>
            <li class="depth01 arrow" @click="slideToggle(1)">
              <div class="box">
                <div class="left"><span class="material-icons"> handyman </span><span>문의</span></div>
                <span class="material-icons arrowIcon"> expand_more </span>
              </div>
              <ul class="depth02" :style="{ height: height(slide[1], 96) + 'px' }">
                <li>
                  <router-link to="/questiontype"><span>문의유형</span></router-link>
                </li>
                <li>
                  <router-link to="/question"><span>문의내역</span></router-link>
                </li>
              </ul>
            </li>
            <li class="depth01">
              <router-link to="/portfolio"
                ><span class="material-icons"> handyman </span><span>포트폴리오</span></router-link
              >
            </li>
            <li class="depth01" v-if="false">
              <router-link to="/promotion"
                ><span class="material-icons"> handyman </span><span>홍보영상</span></router-link
              >
            </li>
            <li class="depth01 arrow" @click="slideToggle(2)" v-if="false">
              <div class="box">
                <div class="left"><span class="material-icons"> handyman </span><span>재물관리</span></div>
                <span class="material-icons arrowIcon"> expand_more </span>
              </div>
              <ul class="depth02" :style="{ height: height(slide[2], 276) + 'px' }">
                <li>
                  <router-link to="/employee"><span>직원 관리</span></router-link>
                </li>
                <li>
                  <router-link to="/computer"><span>컴퓨터 관리</span></router-link>
                </li>
                <li>
                  <router-link to="/monitor"><span>모니터 관리</span></router-link>
                </li>
                <li>
                  <router-link to="/peripheral"><span>주변기기 관리</span></router-link>
                </li>
                <li>
                  <router-link to="/book"><span>도서 관리</span></router-link>
                </li>
                <li>
                  <router-link to="/program"><span>프로그램 관리</span></router-link>
                </li>
              </ul>
            </li>
            <li class="depth01" v-if="false">
              <router-link to="/organization"
                ><span class="material-icons"> handyman </span><span>조직도</span></router-link
              >
            </li>
            <li class="depth01" v-if="false">
              <router-link to="/cooperation"
                ><span class="material-icons"> handyman </span><span>업무협업시스템</span></router-link
              >
            </li>
            <li class="depth01" v-if="false">
              <router-link to="/toonflix"
                ><span class="material-icons"> handyman </span><span>툰플릭스 관리자</span></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hamberger" @click="headerStore.sideToggleAct" :class="{ close: slideState }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useHeaderStore } from '@/store/header';
const headerStore = useHeaderStore();
const { slideState } = storeToRefs(headerStore);

const moveLeft = () => {
  if (slideState.value) return 0;
  else return -280;
};

//문의, 재물관리 토글 함수
const slide = ref({
  1: false,
  2: false
});
const slideToggle = (idx) => {
  if (slide.value[idx]) return (slide.value[idx] = false);
  else return (slide.value[idx] = true);
};
const height = (item, num) => {
  if (item) return num;
  else return 0;
};
</script>
<style lang="scss" scoped>
.sideMenu {
  position: fixed;
  z-index: 99;
  width: 280px;
  background-color: #303641;
  height: 100vh;
  transition: all 0.3s ease-in-out;
}
.router-link-exact-active {
  background-color: #343942;
  color: #fff;
  .material-icons {
    color: #fff;
  }

  &.arrow .box .material-icons {
    color: #fff;
  }
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .logo {
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    padding: 19px 32px 20px;
    border-bottom: 1px solid #343e50;
  }
  .nav {
    color: #8d97ad;
    padding: 30px 0;
    .list {
      .depth01 {
        > a {
          display: block;
          padding: 20px 30px;
          font-weight: 300;
          transition: all 0.2s ease-out;
          &:hover {
            background-color: #343942;
            color: #fff;
            .material-icons {
              color: #fff;
            }
          }
          .box {
            display: flex;
            justify-content: space-between;
          }
        }
        &.arrow {
          .box {
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            &:hover {
              background-color: #343942;
              color: #fff;
              .material-icons {
                color: #fff;
              }
            }
          }
        }
        .material-icons {
          font-size: 14px;
          color: #6a56a5;
          margin-right: 10px;
          transition: all 0.2s ease-out;
          &.arrowIcon {
            color: #8d97ad;
            font-size: 18px;
            font-weight: 700;
          }
        }
        .depth02 {
          overflow-y: hidden;
          transition: all 0.4s ease-in-out;
          li a {
            padding: 15px 60px;
            display: block;
            transition: all 0.2s ease-out;
            &:hover {
              color: #fff;
            }
            &.active {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .langauge {
    padding-bottom: 20px;
    .list {
      display: flex;
      justify-content: center;
      li {
        button {
          color: #5a5a5a;
          font-size: $fontM;
          background-color: transparent;
          font-weight: 700;
          &.active {
            color: #fff;
          }
        }
        &:not(:last-child) {
          margin-right: 14px;
        }
      }
    }
  }
}
.hamberger {
  position: fixed;
  z-index: 99;
  left: 0;
  padding: 14px;
  top: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.close {
    left: 280px;
    background: #303641;
    span {
      background-color: #fffbfb;
      &:first-child {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:last-child {
        transform: rotate(-45deg) translate(3px, -3px);
      }
    }
  }
  span {
    background-color: #b3aaaa;
    display: block;
    width: 22px;
    height: 2px;
    margin: 4px 0;
    border-radius: 15px;
    transition: all 0.3s ease 0s;
    box-shadow: 0 0 0 4px rgb(99 96 96 / 3%);
  }
}
</style>
