<template>
  <div>
    <div>맞춤 상품 추천</div>
    <div v-for="product in plist" :key="product.id">
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
        <div>{{ product.productName }}</div>
        <div>{{ $comma(product.price) }}</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    chatData: {},
  },

  method: {
    async getRecommendProduct(productList) {
      if (this.first) {
        this.first = false;
        let plist = [];
        console.log(productList);
        await productList.forEach(async product => {
          await axios
            .get('https://sbbro.xyz/api/product/products/list/' + product, {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                contentType: 'application/json',
              },
            })
            .then(res => plist.push(res.data[0]))
            .catch(err => console.log(err));
        });
        this.plist = plist;
        console.log(this.plist);
      }
    },
  },
  created() {
    this.getRecommendProduct(this.chatData.source.split('/'));
  },
};
</script>

<style></style>
