<template>
  <div class="loginWrap">
    <!-- v-if로 로그인 전, 후 박스 교체 -->
    <div class="loginBox" v-if="!token">
      <div class="title">
        <h1>LOGIN</h1>
      </div>
      <div class="inputBox">
        <div class="info">
          <div class="idBox">
            <label :class="{ up: upDown[1] }">ID</label
            ><input
              type="text"
              v-model="idVal"
              @focusin="upDown[1] = true"
              @focusout="if (idVal.length === 0) upDown[1] = false;"
            /><span class="material-icons"> mail_outline </span>
          </div>
          <div class="pwBox">
            <label :class="{ up: upDown[2] }">Password</label
            ><input
              type="password"
              v-model="pwVal"
              @focusin="upDown[2] = true"
              @focusout="if (pwVal.length == 0) upDown[2] = false;"
            /><span class="material-icons-outlined"> lock </span>
          </div>
        </div>
        <div class="loginBtn">
          <button @click="onLogin"><span>LOGIN</span><span class="material-icons"> arrow_forward </span></button>
        </div>
      </div>
    </div>
    <!-- v-if 작업 -->
    <div class="loginBox" v-else>
      <div class="title">
        <h1>IDEACONCERT</h1>
      </div>
      <div class="inputBox">
        <div class="desc">
          <p>안녕하세요 <strong>ideaconcert</strong> 님</p>
        </div>
        <div class="btns">
          <router-link to="/main"><span>Back To Main</span></router-link>
          <button @click="onLogout"><span>LOGOUT</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';
import { useAuthStore } from '@/store/auth';

const idVal = ref('');
const pwVal = ref('');

const upDown = ref({ 1: false, 2: false });

onUpdated(() => {
  if (idVal.value.length > 0) return (upDown.value[1] = true);
  if (pwVal.value.length > 0) return (upDown.value[2] = true);
});

const authStore = useAuthStore();

let token = localStorage.getItem('token');

const onLogin = () => {
  authStore.loginAct(idVal.value, pwVal.value);
};

const onLogout = () => {
  token = localStorage.removeItem('token');
  location.reload();
};
</script>
<style lang="scss" scoped>
.loginWrap {
  width: 100vw;
  height: 100vh;
  background-color: #f3f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginBox {
    width: 450px;
    .title {
      background-color: #8655fc;
      color: #fff;
      font-size: $fontTitle;
      font-weight: 700;
      padding: 50px 0;
      text-align: center;
    }
    .inputBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fefefe;
      padding: 50px;
      .info {
        width: 100%;
        > div {
          position: relative;
          width: 100%;
          &:first-child {
            margin-bottom: 20px;
          }
          .material-icons,
          .material-icons-outlined {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #8655fc;
            font-size: 19px;
          }
          label {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #b3b2b2;
            font-size: 13px;
            transition: all 0.25s ease-in-out;
            &.up {
              transform: translateY(0);
              top: -10px;
              color: #8655fc;
            }
          }
          input {
            width: 100%;
            height: 30px;
            border: none;
            border-bottom: 1px solid #e6e6e6;
            outline: none;
          }
        }
      }
      .loginBtn {
        width: 100%;
        margin-top: 30px;
        button {
          width: 100%;
          box-shadow: 0 0 22px rgb(0 0 0 / 7%);
          font-size: 12px;
          border-radius: 40px;
          height: 50px;
          color: #585b5f;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-out;
          &:hover {
            background-color: #2c71da;
            color: #fff;
            .material-icons {
              color: #fff;
              margin-left: 15px;
            }
          }
          .material-icons {
            font-size: 17px;
            margin-left: 10px;
          }
        }
      }
      .desc {
        font-size: $fontS;
        margin-bottom: 50px;
        p strong {
          font-weight: 600;
        }
      }
      .btns {
        display: flex;
        a,
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 43px;
          border-radius: 40px;
          font-weight: 600;
          font-size: 12px;
          box-shadow: 0 0 22px rgb(0 0 0 / 7%);
          color: #fff;
          transition: all 0.3s ease-out;
          &:first-child {
            background-color: #8655fc;
            margin-right: 30px;
            &:hover {
              box-shadow: 0 5px 15px rgb(44 113 218 / 38%);
            }
          }
          &:last-child {
            background-color: #fb5757;
            &:hover {
              box-shadow: 0 5px 15px rgb(251 87 87 / 38%);
              color: inherit;
            }
          }
        }
      }
    }
  }
}
</style>
