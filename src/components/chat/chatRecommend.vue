<template>
  <div class="product_list">
    <div style="font-weight: bold">맞춤 상품 추천</div>
    <div class="product_info" v-for="product in this.plist" :key="product.id">
      <hr />
      <div
        @click="
          router.push({
            path: '/product/myProduct',
            query: {
              productCode: product.productCode,
            },
          })
        "
      >
        <img :src="product.thumbnailUrl" />
        <div class="product_name">{{ product.productName }}</div>
        <div>{{ $comma(product.price) }}원</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  props: {
    chatData: {},
  },

  data() {
    return {
      plist: [],
      router: useRouter(),
    };
  },

  created() {
    let productList = this.chatData.source.split('/');
    console.log(productList);
    productList.forEach(async product => {
      await axios
        .get('https://sbbro.xyz/api/product/products/list/' + product, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => {
          if (res.data[0] != null) this.plist.push(res.data[0]);
        })
        .catch(err => console.log(err));
    });
  },
};
</script>

<style scoped>
.product_list {
  display: flex;
  flex-direction: column;
}
.product_name {
  font-weight: bold;
}
</style>
