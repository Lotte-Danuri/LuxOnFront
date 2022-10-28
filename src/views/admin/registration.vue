<template>
  <main>
    <div class="regi">
      <h2>상품 등록</h2>
      <label for="id"><b>id</b></label>
      <input type="text" placeholder="Enter id" name="id" id="id" required />
      <br />
      <label for="productName"><b>productName</b></label>
      <input
        type="text"
        placeholder="Enter productName"
        name="productName"
        id="productName"
        required
      />
      <br />
      <label for="thumbnailUrl"><b>thumbnailUrl</b></label>
      <input
        type="text"
        placeholder="Enter thumbnailUrl"
        name="thumbnailUrl"
        id="thumbnailUrl"
        required
      />
      <br />
      <label for="price"><b>price</b></label>
      <input
        type="text"
        placeholder="Enter price"
        name="price"
        id="price"
        required
      />
      <br />
      <label for="stock"><b>stock</b></label>
      <input
        type="text"
        placeholder="Enter stock"
        name="stock"
        id="stock"
        required
      />
      <br />
      <label for="storeId"><b>storeId</b></label>
      <input
        type="text"
        placeholder="Enter storeId"
        name="storeId"
        id="storeId"
        required
      />
      <br />
      <label for="likeCount"><b>likeCount</b></label>
      <input
        type="text"
        placeholder="Enter likeCount"
        name="likeCount"
        id="likeCount"
        required
      />
      <br />
      <label for="productCode"><b>productCode</b></label>
      <input
        type="text"
        placeholder="Enter productCode"
        name="productCode"
        id="productCode"
        required
      />
      <br />
      <label for="warranty"><b>warranty</b></label>
      <input
        type="text"
        placeholder="Enter warranty"
        name="warranty"
        id="warranty"
        required
      />
      <br />
      <label for="categoryFirstId"><b>categoryFirstId</b></label>
      <input
        type="text"
        placeholder="Enter categoryFirstId"
        name="categoryFirstId"
        id="categoryFirstId"
        required
      />
      <br />
      <label for="categorySecondId"><b>categorySecondId</b></label>
      <input
        type="text"
        placeholder="Enter categorySecondId"
        name="categorySecondId"
        id="categorySecondId"
        required
      />
      <br />
      <label for="categoryThirdId"><b>categoryThirdId</b></label>
      <input
        type="text"
        placeholder="Enter categoryThirdId"
        name="categoryThirdId"
        id="categoryThirdId"
        required
      />
      <br />
      <label for="updatedDate"><b>updatedDate</b></label>
      <input
        type="text"
        placeholder="Enter updatedDate"
        name="updatedDate"
        id="updatedDate"
        required
      />
      <br />
      <input type="file" id="file-upload" />
      <br />
      <button>전송</button>
    </div>
    <div></div>
    <div>
      {{ productList }}
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api('/product/products');
      console.log(this.productList);
    },
    async postProductList() {
      this.productList = await this.$api('/product/products');
      console.log(this.productList);
    },
    // https://sbbro.xyz/api/product/products
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
