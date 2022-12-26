<template>
  <div class="map">
    <div class="head">
      <div class="box">
        <img src="/images/test_user.png" alt="" />
        <div class="textBox">
          <span class="team">경영지원팀</span>
          <strong class="position">사장</strong>
          <span class="name">전달용</span>
        </div>
      </div>
    </div>
    <div class="body">
      <ul class="teamList">
        <li>
          <details>
            <summary><span>대외협력팀</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">대외협력팀</span>
                    <strong class="position">부장</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>경영지원팀</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">경영지원팀</span>
                    <strong class="position">차장</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>기획/마케팅</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">기획/마케팅</span>
                    <strong class="position">사원</strong>
                    <span class="name">MAULANA RIZKI</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>디자인팀</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">디자인팀</span>
                    <strong class="position">대리</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>웹툰작화팀</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">웹툰작화팀</span>
                    <strong class="position">사원</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>만화영상</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">만화영상</span>
                    <strong class="position">사원</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>웹툰영상</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">웹툰영상</span>
                    <strong class="position">사원</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>개발팀</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">개발팀</span>
                    <strong class="position">사원</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><span>자문단</span></summary>
            <ul>
              <li>
                <div class="box">
                  <img src="/images/test_user.png" alt="" />
                  <div class="textBox">
                    <span class="team">자문단</span>
                    <strong class="position">부장</strong>
                    <span class="name">홍길동</span>
                  </div>
                </div>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.map {
  text-align: center;
  .box {
    width: 135px;
    border: 1px solid #94a0b4;
    border-radius: 5px;
    position: relative;
    min-height: 80px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      background-color: #c8e4f8;
    }
    img {
      position: absolute;
      left: -25%;
      top: 50%;
      transform: translateY(-50%);
      border: 1px solid #94a0b4;
      border-radius: 100%;
      vertical-align: middle;
      overflow: hidden;
    }
    .textBox {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      font-size: 14px;
      margin-top: 5px;
      .position {
        margin-top: 7px;
        color: #007bff;
        font-size: 16px;
      }
      .name {
        font-weight: 700;
        margin-top: 9px;
        word-break: keep-all;
        display: block;
        width: 50%;
        margin: 9px auto 0 auto;
        padding-bottom: 10px;
      }
    }
  }
  .head {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .body {
    display: flex;
    justify-content: center;
    position: relative;
    .teamList {
      display: flex;
      margin-top: 10px;
      &::before {
        content: '';
        display: block;
        width: 1616px;
        height: 20px;
        border-top: 1px solid #94a0b4;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      > li {
        padding: 15px 0px;
        user-select: none;
        position: relative;
        &::before {
          content: '';
          width: calc(100% - 40px);
          height: 23px;
          position: absolute;
          top: -10px;
          border-left: 1px solid #94a0b4;
          left: 47%;
        }
        &:first-child::before {
          border-radius: 10px 0 0 0;
        }
        &:last-child::before {
          border-left: 0;
          border-right: 1px solid #94a0b4;
          left: -25%;
          border-radius: 0 10px 0 0;
        }
        details {
          summary {
            display: flex;
            justify-content: center;
            width: 200px;
            span {
              display: block;
              font-size: 20px;
              border: 1px solid #aaa;
              width: 136px;
              height: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 7px;
              &:hover {
              }
            }
          }
          ul li {
            margin: 10px;
          }
        }
      }
    }
  }
}
summary::marker {
  font-size: 0;
}
</style>
