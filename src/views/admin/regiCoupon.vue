<template>
  <h1>쿠폰 등록</h1>
  <main>
    <div class="top_div">
      <input placeholder="쿠폰명" />
      <input placeholder="내용" />
      <input placeholder="할인율" />
      <br />
      <input type="date" placeholder="시작일" />
      <input type="date" placeholder="종료일" />
      <br />
      <input placeholder="최소주문금액" />
      <input placeholder="최대할인금액" />
      <br />
      <input placeholder="상품선택" />
      <br />

      <select @change="changeCategoryFirst($event)" id="first_select">
        <option>첫번째 카테고리를 선택해주세요</option>
        <option v-for="(category, i) in categoryList" :key="i" :value="i">
          <p>{{ category.categoryName }}</p>
          <div :id="`${category.id}`" style="dispaly: none"></div>
        </option>
      </select>
      <br />
      <br />
      <select @change="changeCategorySecond($event)" id="second_select">
        <option>두번째 카테고리를 선택해주세요</option>
        <option
          v-for="(categorySecond, i) in categorySecondList"
          :key="i"
          :value="i"
        >
          <p>{{ categorySecond.categoryName }}</p>
          <p :id="`${categorySecond.id}`" style="dispaly: none"></p>
        </option>
      </select>
      <br />
      <br />
      <select id="third_select" @change="changeCategoryThird()">
        <option>세번째 카테고리를 선택해주세요</option>
        <option
          v-for="(categoryThird, i) in categoryThirdList"
          :key="i"
          :value="i"
        >
          <p>{{ categoryThird.categoryName }}</p>
          <p :id="`${categoryThird.id}`" style="dispaly: none"></p>
        </option>
      </select>
      <br />
      <br />
    </div>

    <!-- <div class="category_grid" style="display: none">
      <div>
        <h3>대분류</h3>
        <div v-for="(category, i) in categoryList" :key="i" :value="i">
          <input
            type="checkbox"
            :id="`${category.id}`"
            name="vehicle1"
            :value="`${category.id}`"
            v-model="firstNames"
            class="myCheckbox"
            @click="calc"
          />
          <label :for="`label_${category.id}`">
            {{ category.categoryName }}</label
          >
        </div>
        <br />
      </div>
      <div>
        <h3>중분류</h3>
        <div
          v-for="(categorySecond, i) in categorySecondList"
          :key="i"
          :value="i"
        >
          <input
            type="checkbox"
            :id="`${categorySecond.id}`"
            name="vehicle1"
            :value="`${categorySecond.id}`"
            v-model="secondNames"
            class="myCheckbox"
          />
          <label :for="`label_${categorySecond.id}`">
            {{ categorySecond.categoryName }}</label
          ><br />
        </div>
      </div>
      <div>
        <h3>소분류</h3>
        <div
          v-for="(categoryThird, i) in categoryThirdList"
          :key="i"
          :value="i"
        >
          <input
            type="checkbox"
            :id="`${categoryThird.id}`"
            name="vehicle1"
            :value="`${categoryThird.id}`"
            v-model="thirdNames"
            class="myCheckbox"
          />
          <label :for="`label_${categoryThird.id}`">{{
            categoryThird.categoryName
          }}</label
          ><br />
        </div>
      </div>
      <span>대분류값 : {{ firstNames }}</span>
      <span>중분류값 : {{ seconddNames }}</span>
      <span>소분류값 : {{ thirdNames }}</span>
    </div> -->

    <table id="customers">
      <tr>
        <th>상품선택</th>
        <th>이미지</th>
        <th>상품명</th>
        <th>상품가격</th>
        <th>재고</th>
        <th>보증기간</th>
        <th>게시일</th>
      </tr>
      <tr v-for="product in productList" :key="i">
        <td><input type="checkbox" /></td>
        <td>
          <img :src="`${product.thumbnailUrl}`" />
        </td>
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.warranty }}</td>
        <td>{{ product.createdDate }}</td>
      </tr>
    </table>
    <button
      style="background-color: black; width: 100px; height: 50px; color: white"
    >
      등록
    </button>
    <button
      style="
        background-color: white;
        width: 100px;
        height: 50px;
        color: black;
        border: solid 1px black;
        margin-left: 100px;
      "
      @click="testClick"
    >
      test
    </button>
  </main>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      firstNames: [],
      secondNames: [],
      thirdNames: [],
      productList: [],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    changeCategoryFirst(event) {
      this.categorySecondList =
        this.categoryList[event.target.value].categorySecondDtoList;
      let sel = document.getElementById('first_select');
      // alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
    changeCategorySecond(event) {
      this.categoryThirdList =
        this.categorySecondList[event.target.value].categoryThirdDtoList;
      let sel = document.getElementById('second_select');
      // alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
    changeCategoryThird() {
      let sel = document.getElementById('third_select');
      // alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
    calc() {
      if (document.querySelector('.myCheckbox').checked) {
        console.log(this.id);
      }
    },
    testClick() {
      let sel_1 = document.getElementById('first_select');
      let fistValue = '';
      console.log(sel_1.options[0]);
      if (sel_1.options.value == undefined) {
        this.fistValue = '';
      } else {
        this.fistValue = sel_1.options[sel_1.selectedIndex].childNodes[1].id;
      }

      let sel_2 = document.getElementById('second_select');
      let secondValue = '';
      if (sel_2.options.value == undefined) {
        this.secondValue = '';
      } else {
        this.secondValue = sel_2.options[sel_2.selectedIndex].childNodes[1].id;
      }

      let sel_3 = document.getElementById('third_select');
      let thirdValue = '';
      if (sel_3.options.value == undefined) {
        this.thirdValue = '';
      } else {
        this.thirdValue = sel_3.options[sel_3.selectedIndex].childNodes[1].id;
      }

      console.log('value', fistValue, secondValue, thirdValue);

      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/category',
          {
            stordId: 9,
            categoryFirstId: fistValue,
            categorySecondId: secondValue,
            categoryThirdId: thirdValue,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
          this.productList = response.data;
        });
    },
  },
};
</script>

<style scoped>
.category_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  grid-auto-rows: minmax(25px, auto);
}

.category_grid div input {
  margin: 0px;
  width: 30px;
  height: 30px;
}

.top_div input {
  width: 200px;
  height: 40px;
  border: 2px solid black;
  margin-left: 100px;
  margin-bottom: 30px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 50%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
