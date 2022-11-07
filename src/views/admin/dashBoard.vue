<template>
  <main>
    <h1>메인 센터</h1>
    <br />
    <br />
    <div class="first_grid">
      <div style="background-color: gray; font-size: 150px">
        차트 넣어주세용~
      </div>
      <!-- <v-calendar /> -->
      <v-date-picker v-model="date" is-expanded style="height: 500px" />
    </div>
    <div class="second_grid">
      <div>
        <h1>등록상품</h1>
        <hr />
        <div class="table_grid">
          <div>
            <table id="customers" style="width: 500px">
              <tr>
                <th></th>
                <th>이미지</th>
                <th>상품명</th>
                <th>상품가격</th>
                <th>재고</th>
                <th>보증기간</th>
                <th>게시일</th>
              </tr>
              <tr v-for="product in productList">
                <td>
                  <input
                    type="checkbox"
                    v-model="productCheckVmodel"
                    :value="product"
                    class="customers_check"
                  />
                </td>
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
    </div>
    <div></div>
    <!-- <div class="third_grid">
      <div></div>
      <div></div>
    </div> -->
  </main>
</template>
<script>
import 'v-calendar/dist/style.css';
</script>

<style>
.first_grid {
  display: grid;
  grid-template-columns: 1000px 400px;
  margin-bottom: 0px;
  gap: 50px;
  /* grid-auto-rows: minmax(25px, auto); */
}

/* .first_grid div {
  background-color: gray;
  width: 100%;
  height: 400px;
} */

.second_grid {
  display: grid;
  grid-template-columns: 700px 700px;
  margin-bottom: 0px;
  gap: 50px;
}

.second_grid div {
  background-color: gray;
  width: 100%;
  height: 400px;
}

.third_grid {
  display: grid;
  grid-template-columns: 700px 700px;
  margin-bottom: 0px;
  gap: 50px;
}

.third_grid div {
  background-color: gray;
  width: 100%;
  height: 400px;
}

.table_grid {
  display: grid;
  grid-template-columns: 500px 50px 500px 100px;
  gap: 30px;
  border: solid 2px black;
  /* grid-auto-rows: minmax(25px, auto); */
}

.table_grid div table {
  width: 500px;
  margin-left: 10px;
  margin-top: 10px;
  border: solid 2px gray;
}
</style>
