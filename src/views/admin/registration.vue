<template>
  <main class="main_grid">
    <div class="regi">
      <h1>상품 등록</h1>
      <div class="inner_grid">
        <div class="input_cls">
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
          <input
            type="text"
            placeholder="상품 코드를 입력하세요"
            name="productCode"
            id="productCode"
            required
          />
          <br />
          <input
            type="text"
            placeholder="보증기간을 입력하세요"
            name="warranty"
            id="warranty"
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
          <img id="img1" src="" />
          <img id="img2" src="" />
          <img id="img3" src="" />
          <input
            multiple="multiple"
            type="file"
            id="file-upload"
            ref="serveImage"
          />
          <br />
          <button
            style="
              width: 300px;
              height: 70px;
              background-color: black;
              color: white;
            "
            @click="regiProduct"
          >
            전송
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
            "
          >
            >>>
          </button>
        </div>
        <div
          style="
            width: 505px;
            height: 700px;
            background-color: white;
            border: 2px solid black;
          "
        >
          <h2 style="margin-left: 35%">등록 상품 List</h2>
          <table id="customers" style="width: 500px">
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>상품가격</th>
              <th>재고</th>
              <th>보증기간</th>
              <th>게시일</th>
            </tr>
            <tr v-for="product in productList">
              <td>
                <img :src="`${product.thumbnailUrl}`" style="height: 100px" />
              </td>
              <td>{{ product.productName }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.warranty }}</td>
              <td>{{ product.createdDate }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div></div>
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
      productList: [],
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
      formdata.append('warranty', document.getElementById('warranty').vaule);
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
.main_grid {
  display: grid;
  grid-template-columns: 500px 500px;
  gap: 30px;
}

.main_grid div {
  background-color: (245, 245, 245);
  width: 500px;
}
.regi input {
  width: 300px;
  height: 50px;
  border: 1px solid black;
  margin-bottom: 10px;
}

.regi select {
  width: 300px;
  height: 50px;
}

.input_cls {
  margin-left: 100px;
  margin-top: 50px;
}

.inner_grid {
  display: grid;
  grid-template-columns: 500px 100px 800px;
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
  text-align: left;
  background-color: #9b9b9b;
  color: white;
}
</style>
