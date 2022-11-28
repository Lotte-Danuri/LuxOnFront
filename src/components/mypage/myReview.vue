<template>
  <div class="mypage col-12 col-md-9 col-lg-8 offset-lg-1">
    <h2 style="text-align: center">리뷰 작성</h2>
    <br />

    <div
      style="
        margin-bottom: 20px;
        margin-left: 10%;
        padding: 10px;
        border: solid 0px black;
        width: 800px;
      "
    >
      <div style="display: grid; grid-template-columns: 13% 20% 20%">
        <div style="">
          <!-- <img src="@/assets/logo/logo_white_6.png" style="width: 50px" /> -->
        </div>
        <h3>{{ state.login_id }}</h3>
      </div>
      <br />
      <input
        id="input_title"
        placeholder="제목을 입력해 주세요"
        style="
          width: 470px;
          height: 50px;
          margin-left: 20%;
          border: 1px solid black;
          /* border-radius: 10px; */
        "
      />
      <br />
      <br />
      <input
        id="input_review"
        placeholder="리뷰를 입력해 주세요"
        style="
          width: 470px;
          height: 160px;
          margin-left: 20%;
          border: 1px solid black;
          /* border-radius: 10px; */
        "
      />
      <br />
      <br />
      <div style="display: grid; grid-template-columns: 50% 50%">
        <input
          class="form-control"
          multiple="multiple"
          type="file"
          id="file-upload"
          ref="serveImage"
          style="width: 400px; margin-left: 40%"
        />
        <button
          style="
            margin-left: 110px;
            color: white;
            background-color: black;
            /* border-radius: 10px; */
            width: 130px;
            height: 40px;
          "
          @click="submit_review"
        >
          작성
        </button>
      </div>
    </div>
  </div>

  <!-- mypage-shopping__content end -->
</template>

<script>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';
// import { getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const serveImage = ref(null);

    const state = reactive({
      coupons: [],
      productCode: '',
    });

    onBeforeMount(async () => {
      // await getCoupons();
      // alert(route.query.productCode);
      state.productCode = route.query.productCode;
    });

    const submit_review = async () => {
      const formdata = new FormData();
      formdata.append('title', document.getElementById('input_title').value);
      formdata.append(
        'contents',
        document.getElementById('input_review').value,
      );
      formdata.append('productCode', state.productCode);

      const file_length = serveImage.value.files.length;

      var object = {};
      formdata.forEach((value, key) => (object[key] = value));

      const fd = new FormData();
      const js2 = JSON.stringify(object);
      const blob = new Blob([js2], { type: 'application/json' });
      fd.append('reviewDto', blob);
      for (let i = 0; i < file_length; i++) {
        fd.append('image', serveImage.value.files[i]);
      }

      console.log(fd);

      await axios
        .post('http://localhost:8000/review/', fd, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data);

          Swal.fire({
            title: '리뷰 작성이 완료되었습니다!',
            icon: 'success',
            showCancelButton: true,
          }).then(result => {
            router.push('/mypage/order');
          });
        });
    };

    return { state, submit_review, serveImage };
  },
};
</script>

<style>
.pc-wrap {
}

.mypage {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  width: 1182px;
  min-height: 1467px;
  padding: 40px;
  box-sizing: border-box;
  margin-left: 0;
}

.main__styling-img img {
  height: 650px;
  width: 433px;
  object-fit: cover;
}

.main__styling-slide {
  position: relative;
  display: flex;
  height: 730px;
  padding: 0 183px 0 200px;
  box-sizing: border-box;
}

.main__styling-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__styling-img {
  position: absolute;
  top: 41px;
  right: 223px;
}

.main__styling-text h2 {
  margin-bottom: 57px;
  font-size: 72px;
  color: #141a23;
}

.main__styling-text-strong {
  white-space: nowrap;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main__styling-text-description {
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  color: #404040;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
