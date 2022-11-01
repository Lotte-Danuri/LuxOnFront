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
      <input
        type="text"
        placeholder="스토어 ID를 입력하세요"
        name="storeId"
        id="storeId"
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
        placeholder="Enter categoryFirstId"
        name="categoryFirstId"
        id="categoryFirstId"
        required
      />
      <select>
        <option v-for="category in categoryList" :key="i">
          {{ category.id }}
        </option>
      </select>
      <br />
      <input
        type="text"
        placeholder="Enter categorySecondId"
        name="categorySecondId"
        id="categorySecondId"
        required
      />
      <select>
        <option v-for="categorySecondDtoList in category" :key="j">
          {{ categorySecondDtoList.id }}
        </option>
      </select>
      <br />
      <input
        type="text"
        placeholder="Enter categoryThirdId"
        name="categoryThirdId"
        id="categoryThirdId"
        required
      />
      <select>
        <option v-for="categoryThirdDtoList in categorySecondDtoList" :key="k">
          {{ categorySecondDtoList.id }}
        </option>
      </select>
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
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      categoryList: [],
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
      const formdata = new FormData();
      formdata.append(
        'categoryFirstId',
        document.getElementById('categoryFirstId').value,
      );
      formdata.append(
        'categorySecondId',
        document.getElementById('categorySecondId').value,
      );
      formdata.append(
        'categoryThirdId',
        document.getElementById('categoryThirdId').value,
      );
      formdata.append(
        'productName',
        document.getElementById('productName').value,
      );
      formdata.append('price', document.getElementById('price').value);
      formdata.append('stock', document.getElementById('stock').value);
      formdata.append('storeId', document.getElementById('storeId').value);
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
