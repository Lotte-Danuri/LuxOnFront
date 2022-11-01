<template>
  <main>
    <div class="regi">
      <h2>상품 등록</h2>

      <br />
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        name="productName"
        id="productName"
        required
      />
      <br />
      <input
        type="text"
        placeholder="가격을 입력하세요"
        name="price"
        id="price"
        required
      />
      <br />
      <input
        type="text"
        placeholder="재고를 입력하세요"
        name="stock"
        id="stock"
        required
      />
      <br />
      <!-- <input
        type="text"
        placeholder="스토어 ID를 입력하세요"
        name="storeId"
        id="storeId"
        required
      /> -->
      <br />
      <input
        type="text"
        placeholder="상품 코드를 입력하세요"
        name="productCode"
        id="productCode"
        required
      />
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
      <br />
      <br />
      <input
        type="text"
        placeholder="보증기간을 입력하세요"
        name="warranty"
        id="warranty"
        required
      />
      <br />
      <input
        multiple="multiple"
        type="file"
        id="file-upload"
        ref="serveImage"
      />
      <br />
      <button
        style="
          width: 100px;
          height: 50px;
          background-color: black;
          color: white;
        "
        @click="regiProduct"
      >
        전송
      </button>
    </div>
    <div>
      {{ categoryList }}
    </div>
    <div></div>
  </main>
</template>
<script>
// import { reactive } from 'vue';
// import { onBeforeMount } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
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
    regiProduct() {
      let sel_1 = document.getElementById('first_select');
      let fistValue = sel_1.options[sel_1.selectedIndex].childNodes[1].id;
      let sel_2 = document.getElementById('second_select');
      let secondValue = sel_2.options[sel_2.selectedIndex].childNodes[1].id;
      let sel_3 = document.getElementById('third_select');
      let thirdValue = sel_3.options[sel_3.selectedIndex].childNodes[1].id;

      const formdata = new FormData();
      formdata.append('categoryFirstId', fistValue);
      formdata.append('categorySecondId', secondValue);
      formdata.append('categoryThirdId', thirdValue);
      formdata.append(
        'productName',
        document.getElementById('productName').value,
      );
      formdata.append('price', document.getElementById('price').value);
      formdata.append('stock', document.getElementById('stock').value);
      formdata.append('storeId', localStorage.getItem('store_id'));
      formdata.append(
        'productCode',
        document.getElementById('productCode').value,
      );
      const file_length = this.$refs.serveImage.files.length;

      var object = {};
      formdata.forEach((value, key) => (object[key] = value));

      const fd = new FormData();
      const js2 = JSON.stringify(object);
      const blob = new Blob([js2], { type: 'application/json' });
      fd.append('productDto', blob);
      for (let i = 0; i < file_length; i++) {
        fd.append('imageList', this.$refs.serveImage.files[i]);
      }

      axios
        .post('https://sbbro.xyz/api/product/sellers/products', fd, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response);
          console.log(formdata);
        });
    },
    changeCategoryFirst(event) {
      this.categorySecondList =
        this.categoryList[event.target.value].categorySecondDtoList;
      let sel = document.getElementById('first_select');
      alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
    changeCategorySecond(event) {
      this.categoryThirdList =
        this.categorySecondList[event.target.value].categoryThirdDtoList;
      let sel = document.getElementById('second_select');
      alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
    changeCategoryThird() {
      let sel = document.getElementById('third_select');
      alert(sel.options[sel.selectedIndex].childNodes[1].id);
    },
  },
};
</script>
<style scoped>
.regi input {
  width: 200px;
  height: 20px;
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>
