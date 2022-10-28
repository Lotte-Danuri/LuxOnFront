<template>
  <main>
    <div class="list_contents">
      <div class="div_top">
        <div>
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/572/221004003247572.jpg?RS=600&SP=1"
          />
        </div>
        <div style="margin-left: 10%">
          <span>
            <p>상품코드 DH22302022</p>
            <h1>DU Haute</h1>
            <h3>[MAX MARA] LILIA 릴리아 캐시미어 코트</h3>
            <h2 style="font-weight: bold">￦3,026,000 원</h2>
          </span>
          <hr />
          <br />
          <div class="option_grid">
            <div class="option_name">
              <h3>할인쿠폰</h3>
            </div>
            <div>
              <button>50% 상품쿠폰</button>
              <br />
              <br />
              <button>15% 더블쿠폰</button>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>색상</h3>
            </div>
            <div>
              <span class="siv-colorchip__option">
                <img
                  src="https://image.sivillage.com/upload/C00001/upload1/product/colorChip/15_04_카멜.png"
                  style="width: 50px"
                  alt="카멜"
                />
              </span>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>옵션</h3>
            </div>
            <div class="size_div" style="float: left">
              <button>Small</button>
              <button>Medium</button>
              <button>Large</button>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>수량</h3>
            </div>
            <div class="count">
              <button @click="minusBtn">-</button>
              <input id="countValue" value="0" style="text-align: center" />
              <button @click="plusBtn">+</button>
            </div>
          </div>
          <hr style="border: 3px solid black !important" />
          <div class="option_grid">
            <div class="option_name">
              <h3>판매가</h3>
            </div>
            <div class="size_div" style="float: left">
              <h2 style="margin-left: 50%; font-weight: bold">3,026,000 원</h2>
            </div>
          </div>
          <div class="actionBtn">
            <button style="background-color: gray">장바구니</button>
            <button @click="initOrder" style="margin-left: 10%">
              바로구매
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1>상품상세</h1>
        <div style="margin-right: 20%">
          <img
            src="https://image.sivillage.com/upload/C00001/daliy/202208/2022082208491615.jpg"
            alt="/"
          />
        </div>
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
    minusBtn() {
      if (document.getElementById('countValue').value > 0) {
        document.getElementById('countValue').value--;
      }
    },
    plusBtn() {
      document.getElementById('countValue').value++;
    },
    initOrder() {
      this.$router.push('initOrder');
    },
  },
};
</script>
<style scoped>
.list_contents {
  margin-left: 20%;
  margin-top: 5%;
}
.div_top {
  margin-right: 20%;
  display: grid;
  grid-template-columns: 40% 60%;
}

.option_grid {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: -20px;
  margin-top: 20px;
}

.option_name {
  margin-left: 15%;
}

.option_name h3 {
  font-weight: bold;
}

.option_grid button {
  width: 300px;
  height: 30px;
  background-color: white;
  border-color: black;
  border: 1px solid black;
}

.size_div {
  margin-bottom: 0px;
}

.size_div button {
  width: 70px;
  margin-left: 20px;
}

.count {
  display: flex;
}
.count input {
  width: 250px;
  height: 40px;
  border: solid 1px black;
}

.count button {
  width: 40px;
  height: 40px;
}

.actionBtn button {
  width: 250px;
  height: 70px;
  font-size: 20px;
  background-color: black;
  color: white;
  margin-top: 40px;
  margin-right: 10px;
  margin-left: 30px;
}
</style>
