<template>
  <br/>
  <br/>
  <h1>상품 등록</h1>
  <br/>
  <div style="display:flex;">
    <h3>상품 정보를 입력하여 상품 등록이 가능합니다.</h3>
    <h3 style="font-style: italic; color:gray; margin-left:50%;">{{userName}}</h3><h3>　님 안녕하세요</h3>
    <a @click="logout" style="margin-left: 4%;">
      <div style="display:flex; margin-bottom: 0px;">
        <span class="material-icons-sharp">logout</span>
        <h3>Logout</h3>
      </div>
    </a>
  </div>
  <hr/>
  <br/>
  <main class="main_grid">
    <div class="regi">
      <div class="inner_grid">
        <div></div>
        <div class="input_cls">
          <div>
            <input
              class="form-control"
              type="text"
              placeholder="상품명을 입력하세요"
              name="productName"
              id="productName"
              required
            />
            <br />
            <input
              class="form-control"
              type="text"
              placeholder="가격을 입력하세요"
              name="price"
              id="price"
              required
            />
            <br />
            <input
              class="form-control"
              type="text"
              placeholder="재고를 입력하세요"
              name="stock"
              id="stock"
              required
            />
            <br />
            <input
              class="form-control"
              type="text"
              placeholder="상품 코드를 입력하세요"
              name="productCode"
              id="productCode"
              required
            />
            <br />
            <input
              class="form-control"
              type="text"
              placeholder="보증기간을 입력하세요"
              name="warranty"
              id="warranty"
              required
            />
            <br />
            <div class="input-group mb-3">
              <select @change="changeCategoryFirst($event)" id="first_select" class="form-control">
                <option>- 대분류 -</option>
                <option v-for="(category, i) in categoryList" :key="i" :value="i">
                  <p>{{ category.categoryName }}</p>
                  <div :id="`${category.id}`" style="dispaly: none"></div>
                </option>
              </select>
              <br />
              <br />
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
              <br />
              <br />
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
            <br>
          </div>
            <input
              class="form-control"
              multiple="multiple"
              type="file"
              id="file-upload"
              ref="serveImage"
            />
            <br />
            <button
              class="btn btn-outline-dark"
              style="
                width: 300px;
                height: 70px;
              "
              @click="regiProduct"
            >
              등록
            </button>
        </div>
        <div>
          <button
            style="
              margin-top: 300px;
              background-color: gray;
              color: white;
              font-weight: bold;
              width: 50px;
              height: 50px;
              margin-left:25px;
            "
          >
            >>>
          </button>
        </div>
        <div
          style="
            width: 620px;
            height: 700px;
            background-color: white;
            border: 1px solid black;
            border-radius: 15px;
            overflow: scroll;
            overflow-x: hidden;
            padding-top: 15px;
          "
        >
          <h2 style="margin-left: 38%; margin-bottom: 20px;">등록 상품 List</h2>
          <table id="customers" style="width: 600px">
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>상품가격</th>
              <th>재고</th>
            </tr>
            <tr v-for="product in productList.slice().reverse()">
              <td>
                <img :src="`${product.thumbnailUrl}`" style="height: 100px" />
              </td>
              <td>{{ product.productName }}</td>
              <td>{{ product.price }}원</td>
              <td>{{ product.stock }}개</td>
            </tr>
          </table>
        </div>
        <div></div>
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
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      productList: [],
      userName: localStorage.getItem('userName'),
      router : useRouter(),
    };
  },
  mounted() {
    axios
      .post(
        'https://sbbro.xyz/api/product/sellers/products/category',
        {
          stordId: localStorage.getItem('store_id'),
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
        .post('https://sbbro.xyz/api/product/sellers/products', fd, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response);
          console.log(formdata);
          axios
            .post(
              'https://sbbro.xyz/api/product/sellers/products/category',
              {
                stordId: localStorage.getItem('store_id'),
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
        });
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
tbody, td, tfoot, th, thead, tr {
  text-align: center;
}

td{
  size:15px;
  font-size: 14px;
}
.main_grid div {
  background-color: (245, 245, 245);
}
.regi input {
  width: 300px;
  margin-bottom: 10px;
}

.form-control{
  height:50px;
}

.form-control[type=file]{
  height:auto;
}

.regi select {
  width: 70px;
}

.input_cls {
  padding: 50px 80px 50px 180px;
  border: solid 1px black;
  border-radius: 15px;
}

.inner_grid {
  display: grid;
  grid-template-columns: 130px 650px 100px 650px 100px;
  /* grid-template-columns: 650px 100px 650px ; */
}

.input-group {
  width: 300px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
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
  text-align: center;
  background-color: #9b9b9b;
  color: white;
}
</style>
