<template>
  <main>
    <div style="width: 80%; margin-left: 10%; margin-right: 10%">
      <br />
      <h2 style="text-align: center; font-weight: bold; margin-top: 50px">
        주문서
      </h2>
      <hr style="border: 2px solid black" />
      <div class="initOrder_grid">
        <div>
          <div>
            <h2 style="font-weight: bold">배송지</h2>
            <hr />
            <br />
            <div>
              <div class="small_grid">
                받는분
                <p id="insertAddress">주소를 입력해 주세요</p>
                <button
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: white;
                    border: solid 1px black;
                  "
                  @click="openPost"
                >
                  입력
                </button>
              </div>
              <div class="small_grid">
                배송 메시지
                <select
                  style="
                    margin-left: 10%;
                    width: 450px;
                    height: 30px;
                    color: gray;
                    border: solid 1px;
                    text-align: center;
                  "
                >
                  <option>배송 전에 미리 연락 바랍니다.</option>
                  <option>부재 시 경비실에 맡겨 주세요.</option>
                  <option>부재 시 문 앞에 놓아 주세요.</option>
                  <option>부재 시 전화나 문자 주세요.</option>
                </select>
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
          <div>
            <h2 style="font-weight: bold">쿠폰</h2>
            <hr />
            <br />
            <div>
              <div class="small_grid">
                쿠폰적용
                <select
                  style="
                    width: 300px;
                    height: 30px;
                    margin-left:10%
                    color: gray;
                    border: solid 1px;
                    text-align: center;
                  "
                >
                  <option>10% 할인 쿠폰</option>
                  <option>5% 할인 쿠폰</option>
                  <option>배송 무료 쿠폰</option>
                </select>
                <button
                  style="width: 100px; background-color: black; color: white"
                  @click="showAlert"
                >
                  적용
                </button>
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
          <div>
            <h2 style="font-weight: bold">주문고객</h2>
            <hr />
            <br />
            <div class="custom_info">
              <div class="small_grid">
                이름
                <input value="양준혁" />
              </div>
              <div class="small_grid">
                이메일 주소
                <input value="lotte@luxon.com" />
              </div>
              <div class="small_grid">
                휴대폰 번호
                <div>
                  <select
                    style="width: 50px; height: 30px; border: 1px solid gray"
                  >
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                  </select>
                  <input
                    style="margin-left: 10px; width: 323px"
                    value="양준혁"
                  />
                </div>
              </div>
              <div class="small_grid">
                다른 연락처
                <input value="" />
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
          <div>
            <h2 style="font-weight: bold">주문상품</h2>
            <hr />
            <br />
            <div class="order_product_grid">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/696/221019003338696.jpg?RS=120&SP=1"
              />
              <div>
                <p style="font-weight: bold">PHILIPP PLEIN GOLF</p>
                <p>[Men] 샤인 헤비 다운 베스트</p>
                <p>블랙/S</p>
              </div>
              <div>
                <p>1개 주문</p>
              </div>
              <div>
                <p style="font-weight: bold">1,150,000원</p>
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
        </div>
        <aside class="aside" style="padding: 20px; height: 410px">
          <br />
          <div class="small_aside_grid">
            <div style="font-weight: bold; color: gray">상품금액</div>
            <div style="margin-left: 30%">1,000,000원</div>
          </div>
          <hr />
          <div class="small_aside_grid">
            <div style="font-weight: bold; color: gray">배송비</div>
            <div style="margin-left: 30%">0원</div>
          </div>
          <hr style="border: 4px solid black" />
          <br /><br />
          <div>
            <div style="font-weight: bold; color: gray">최종 결제금액</div>
            <div
              style="
                margin-left: 10%;
                font-size: 40px;
                font-weight: bold;
                color: goldenrod;
              "
            >
              2,000,000원
            </div>
          </div>
          <hr />
          <button
            style="
              background-color: black;
              width: 200px;
              height: 40px;
              margin-top: 3%;
              margin-left: 15%;
              color: white;
            "
          >
            결제하기
          </button>
        </aside>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      example: '',
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    openPost() {
      new daum.Postcode({
        oncomplete: function (data) {
          console.log(data);
          document.getElementById('insertAddress').innerText = data.address;
        },
      }).open();
    },
    showAlert() {
      // Use sweetalert2
      this.$swal('적용 되었습니다');
    },
  },
};
</script>

<style scoped>
.initOrder_grid {
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  display: grid;
  grid-template-columns: 65% 35%;
}

.aside {
  background-color: rgb(230, 230, 230);
  margin-left: 20%;
  position: sticky;
  top: 50px;
}

.small_grid {
  font-weight: bold;
  color: gray;
  margin-left: 5%;
  display: grid;
  grid-template-columns: 15% 70% 35%;
}

.custom_info div input {
  border: 1px solid gray;
  height: 30px;
  padding: 10px;
}

.order_product_grid {
  display: grid;
  grid-template-columns: 15% 40% 30% 35%;
}

.order_product_grid div {
  margin-left: 10%;
}

.order_product_grid div p {
  font-size: 15px;
}

.small_aside_grid {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 5px;
}
</style>
