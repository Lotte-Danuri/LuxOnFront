<template>
  <br/>
  <br/>
  <h1>상품 수정</h1>
  <br/>
  <div style="display:flex;">
    <h3>상품에 대한 수정이 가능합니다.</h3>
    <h3 style="font-style: italic; color:gray; margin-left:57%;">{{userName}}</h3><h3>　님 안녕하세요</h3>
    <a @click="logout" style="margin-left: 4%;">
      <div style="display:flex; margin-bottom: 0px;">
        <span class="material-icons-sharp">logout</span>
        <h3>Logout</h3>
      </div>
    </a>
  </div>
  <hr/>
  <main>
    <div class="div-regi">
      <div class="regi">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">상품명</span>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            :placeholder="this.product.productName"
            name="productName"
            id="productName"
            required
          />
        </div>
        <div class="input-group">
        <span class="input-group-text" id="basic-addon1">가격</span>
        <input
          type="text"
          class="form-control"
            aria-describedby="basic-addon1"
          :placeholder="this.product.price"
          name="price"
          id="price"
          required
          />
        </div>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">재고</span>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            :placeholder="this.product.stock"
            name="stock"
            id="stock"
            required
          />
        </div>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">상품 코드</span>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            :placeholder="this.product.productCode"
            name="productCode"
            id="productCode"
            required
          />
        </div>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">카테고리</span>
          <span class="input-group-text">기존 : [{{this.product.categoryFirstName}}-{{this.product.categorySecondName}}-{{this.product.categoryThirdName}}]</span>
          <select @change="changeCategoryFirst($event)" id="first_select" class="form-control">
            <option>- 대분류 -</option>
            <option v-for="(category, i) in categoryList" :key="i" :value="i">
              <p>{{ category.categoryName }}</p>
              <div :id="`${category.id}`" style="dispaly: none"></div>
            </option>
          </select>
          <select @change="changeCategorySecond($event)" id="second_select" class="form-control">
            <option>- 중분류 -</option>
            <option
              v-for="(categorySecond, i) in categorySecondList"
              :key="i"
              :value="i"
            >
              <p>{{ categorySecond.categoryName }}</p>
              <p :id="`${categorySecond.id}`" style="dispaly: none"></p>
            </option>
          </select>
          <select id="third_select" @change="changeCategoryThird()" class="form-control">
            <option>- 소분류 -</option>
            <option
              v-for="(categoryThird, i) in categoryThirdList"
              :key="i"
              :value="i"
            >
              <p>{{ categoryThird.categoryName }}</p>
              <p :id="`${categoryThird.id}`" style="dispaly: none"></p>
            </option>
          </select>
        </div>
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1">보증기간</span>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            :placeholder="this.product.warranty"
            name="warranty"
            id="warranty"
            required
          />
        </div>
        <div class="input-group-file">
          <input
            multiple="multiple"
            class="form-control"
            aria-describedby="basic-addon1"
            type="file"
            id="file-upload"
            ref="serveImage"
          />
        </div>

        <button
          class="btn btn-outline-dark"
          style="
            width: 100px;
            height: 50px;
            margin-left:41%;
          "
          @click="updateProduct"
        >
          수정
        </button>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      productId: 0,
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      product: "",
      router : useRouter(),
      userName: localStorage.getItem('userName'),
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
    logout(){
      localStorage.removeItem('login_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      this.router.push('../');
    },
  },
};
</script>
<style scoped>
.input-group-text{
  border-radius: .375rem .01rem .01rem .375rem;
}

.input-group-prepend{
  margin-bottom: 0px;
}

.regi{
  width: 50%;
  margin-left:25%;
  margin-top:7%;
  padding: 50px 100px 50px 100px;
  border:solid 1px black;
  border-radius: 15px;
}

#div-text{
  margin-bottom:0px;
}

.input-group{
  height:50px;
  margin-bottom:30px;
}

.input-group-file{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  margin-bottom:30px;
}
</style>