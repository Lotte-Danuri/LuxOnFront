<template>
  <main>
    <div class="promotion_container">
      <p style="font-size: 20px; " class="period">[프로모션 기간] {{ $route.query.startDate }}~{{ $route.query.endDate }}</p>
      <img :src="$route.query.imageUrl" class="promotionImage" />
      <button class="btn btn-dark getInBtn" @click="sendPromotion()">
        이벤트 참여하기
      </button>

    </div>

  </main>
</template>

<script>
import router from '@/router';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { result } from 'lodash';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { html } from 'dom7';
axios.defaults.baseURL = 'http://localhost:5174';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://43.200.203.135:42213';

export default {
  name: 'Prommotion',
  query: {
    title: { type: String, default: '프로모션' },
    imageUrl: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    buttonUrl: { type: String, default: '' },
  },
  data: () => {
    return {
      isShow: false,
      result: '',
      router: useRouter(),
      isSuccess: false,
      pathUri: '',
      isLoading: true,
    }
  },
  methods: {
    movePage: function () {
      clearInterval(this.interval)
      this.isShow = !this.isShow

      if (this.isSuccess) {
        this.pathUri = '/mypage/coupon'
      } else {
        this.pathUri = '/main'
      }
    },
    sendPromotion: function () {
      axios
        .get('http://43.200.203.135:42213/join',
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
              'Access-Control-Expose-Headers': 'Authorization',
              "Access-Control-Allow-Origin": '*',
              'Access-Control-Allow-Credentials': 'true',
            },
          })
        .then(res => {
          console.log(res);
          if (res) {
            // axios check 실행
            this.isShow = true;

            Swal.fire({
              title: '프로모션 현황',
              html: '<b>잠시만 기다려주세요</b>',
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b');

                this.interval = setInterval(() => {
                  axios
                    .get('http://43.200.203.135:42213/check',
                      {
                        headers: {
                          Authorization: `Bearer ` + localStorage.getItem('token'),
                          contentType: 'application/json',
                        },
                      },
                    )
                    .then(resp => {
                      console.log(resp);

                      if (resp.data == "success") {
                        this.isSuccess = true;
                        clearInterval(this.interval);
                        Swal.fire({
                          icon: 'success',
                          title: "프로모션에 당첨되었습니다!",
                          text: "마이페이지의 쿠폰함을 확인해보세요!"
                        }).then(result => {
                          if (result.isConfirmed) {
                            router.push({
                              path: '/mypage/coupon'
                            })
                          }
                        })

                      }
                      else if (resp.data == "exited") {
                        clearInterval(this.interval);
                        Swal.close();
                        Swal.fire({
                          icon: 'error',
                          title: "프로모션이 종료되었습니다.",
                          text: "응모에 실패하였습니다. 다음 프로모션을 도전해주세요!"
                        }).then(result => {
                          if (result.isConfirmed) {
                            router.push({
                              path: '/main'
                            })
                          }
                        })

                      }
                      else if (resp.data == "waiting") {
                        b.textContent = "접속 대기중입니다.."
                      }
                      else {
                        b.textContent = resp.data + "번 째"
                      }

                    })
                    .catch(err => {
                      console.log(err);
                    });
                }, 1000);
              }
            })

          } else {
            alert("다시 시도해주십시오.");
          }
        }).catch(error => {
          console.log(error);
          alert("다시 시도해주십시오.")
        })
    },
  },
};
</script>

<style>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-left: 25%;
  margin-top: 5%;
}


.promotion_container {
  display: flex;
  flex-direction: column;
}

.getInBtn {
  width: 300px;
  height: 100px;
  align-self: center;
}

.promotionImage {
  width: 1100px;
  height: 1200px;
  align-self: center;
  margin-bottom: 5%;
}

.period {
  margin-top: 5%;
  margin-left: 50%;
}

.popupTitle {
  margin-top: 41px;
  margin-bottom: 1rem;
  margin-left: 16rem;
  font-size: 35px;
  font-weight: bold;

}
</style>