<template>
  <h1>상품 수정</h1>
  <h3>상품에 대한 수정이 가능합니다.</h3>
  <main>
    <div class="regi">
      <br />
      상품명 <input
        type="text"
        :placeholder="this.product.productName"
        name="productName"
        id="productName"
        required
      />
      <br />
      가격 <input
        type="text"
        :placeholder="this.product.price"
        name="price"
        id="price"
        required
      />
      <br />
      재고 <input
        type="text"
        :placeholder="this.product.stock"
        name="stock"
        id="stock"
        required
      />
      <br />
      상품 코드 <input
        type="text"
        :placeholder="this.product.productCode"
        name="productCode"
        id="productCode"
        required
      />
      <br />
      대 카테고리 : {{this.product.categoryFirstName}}<select @change="changeCategoryFirst($event)" id="first_select">
        <option>첫번째 카테고리를 선택해주세요</option>
        <option v-for="(category, i) in categoryList" :key="i" :value="i">
          <p>{{ category.categoryName }}</p>
          <div :id="`${category.id}`" style="dispaly: none"></div>
        </option>
      </select>
      <br />
      <br />
      중 카테고리 : {{this.product.categorySecondName}}<select @change="changeCategorySecond($event)" id="second_select">
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
      소 카테고리 : {{this.product.categoryThirdName}}<select id="third_select" @change="changeCategoryThird()">
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
      보증기간 : <input
        type="text"
        :placeholder="this.product.warranty"
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
        @click="updateProduct"
      >
        수정
      </button>
    </div>
    
  </main>
</template>
<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      productId: 0,
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      product: ""
    };
  },
  created() {
    this.getCategoryList();
    this.getProduct();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    async getProduct() {
      var route = useRoute();
      this.productId = route.query.productId;
      axios
        .get(
          'https://sbbro.xyz/api/product/products/'+this.productId,
        )
        .then(response => {
          this.product=response.data;
        });
    },
    updateProduct() {
      let sel_1 = document.getElementById('first_select');
      let fistValue = sel_1.options[sel_1.selectedIndex].childNodes[1].id;
      let sel_2 = document.getElementById('second_select');
      let secondValue = sel_2.options[sel_2.selectedIndex].childNodes[1].id;
      let sel_3 = document.getElementById('third_select');
      let thirdValue = sel_3.options[sel_3.selectedIndex].childNodes[1].id;

      const formdata = new FormData();
      formdata.append('id', this.productId);
      formdata.append('categoryFirstId', fistValue);
      formdata.append('categorySecondId', secondValue);
      formdata.append('categoryThirdId', thirdValue);
      formdata.append('productName',document.getElementById('productName').value);
      formdata.append('price', document.getElementById('price').value);
      formdata.append('stock', document.getElementById('stock').value);
      formdata.append('warranty', document.getElementById('warranty').value);
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
        .post('https://sbbro.xyz/api/product/sellers/products/update', fd, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response);
          alert("수정완료!");
        });
    },
    changeCategoryFirst(event) {
      this.categorySecondList =
        this.categoryList[event.target.value].categorySecondDtoList;
      let sel = document.getElementById('first_select');
    },
    changeCategorySecond(event) {
      this.categoryThirdList =
        this.categorySecondList[event.target.value].categoryThirdDtoList;
      let sel = document.getElementById('second_select');
    },
    changeCategoryThird() {
      let sel = document.getElementById('third_select');
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