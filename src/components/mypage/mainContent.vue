<template>
  <div class="mypage-shopping__content">
    <form id="searchForm" method="post">
      <input type="hidden" name="page_idx" value="1" />
    </form>
    <h2 class="page-title">주문/배송 조회</h2>
    <br />
    <div class="product hide-scroll">
      <ul class="product__list thum--4 gap--mid">
        <li class="product__item">
          <div class="product__thum gray">
            <button style="border: none">
              <i class="fa-regular fa-heart"></i>
            </button>
            <a
              href="javascript:void(0);"
              onclick="overpass.tracking.link({  goods_no : '2209554217', sale_shop_divi_cd : '11', sale_shop_no : '2201046636', tr_yn : '', conts_form_cd : '100', conts_dist_no : '2209554217', conts_divi_cd : '20', rel_no : '2209554217', rel_divi_cd : '10', openwinyn : '', disp_ctg_no : '', layer_yn : 'N', jajuYn : 'N'});"
            >
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/578/221004003247578.jpg?RS=300&SP=1"
                alt="[MAX MARA] LILIA 릴리아 캐시미어 코트"
                onError="this.src='https://image.sivillage.com/upload/C00001/common/noimg.jpg?RS=300&SP=1'"
              />
            </a>
          </div>
          <a
            class="product__data"
            href="javascript:void(0);"
            onclick="overpass.tracking.link({  goods_no : '2209554217', sale_shop_divi_cd : '11', sale_shop_no : '2201046636', tr_yn : '', conts_form_cd : '100', conts_dist_no : '2209554217', conts_divi_cd : '20', rel_no : '2209554217', rel_divi_cd : '10', openwinyn : '', disp_ctg_no : '', layer_yn : 'N', jajuYn : 'N'});"
          >
            <p class="product__data-brand">DU HAUTE</p>
            <p class="product__data-name">
              [MAX MARA] LILIA 릴리아 캐시미어 코트
            </p>
            <p class="product__data-price">3,026,000</p>
          </a>
          <p class="product__data__delivery">신상</p>
        </li>
      </ul>
    </div>
  </div>
  <!-- mypage-shopping__content end -->
</template>

<script>
import axios from 'axios';
export default {
  created() {
    axios.get('http://localhost:8000/member/products');
  },
};
</script>

<style>
.product__thum a,
.product__thum .no-click {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.product__thum a img,
.product__thum .no-click img {
  width: 100%;
  mix-blend-mode: darken;
  -o-object-fit: cover;
  object-fit: cover;
}
.product__data .like-btn {
  position: absolute;
}
.detail__top-cart_sns ul li .like-btn {
  position: initial;
}
.sb-order__thum .like-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
}
.like-btn {
  width: 24px;
  height: 24px;
  background-image: url(../image/icon_heart_light_off.svg);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
}
.like-btn.on {
  background-image: url(../image/icon_heart_light_on.svg);
}
.like-btn.on {
  -webkit-animation: like-on 1s;
  animation: like-on 1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.product__thum .like-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  right: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 2;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
  background-image: url(../image/ico_like_off_light.svg);
}
.product__thum .like-btn.on {
  background-image: url(../image/ico_like_on_light.svg);
}
.siv-product__thum .like-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}
.filter__option .options .option .like-btn {
  width: 16px;
  height: 16px;
  margin: 0 6px;
}
.module-cody-recom__tab .product__list.type-w80px .product__thum {
  width: 80px;
  height: 120px;
}
.module-cody-recom__tab .product__list.type-w80px .product__thum > a {
  position: relative;
}
.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active
  img {
  opacity: 1;
}
.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active
  .module-cody-recom__bedge {
  background: #d99c63;
}
.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #d99c63;
  content: '';
}
.module-cody-recom__tab .product__list.type-w80px .product__thum > a img {
  opacity: 0.5;
}
.product__thum {
  aspect-ratio: 264/396;
}
.product__list.square-type .product__thum {
  aspect-ratio: 1/1;
}
.product__list.square-type .product__thum img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.product__thum > a,
.product__thum > .no-click {
  justify-content: center;
}
.product__thum .siv-product__cover {
  z-index: 10;
}
.product__item.type_v .product__thum {
  width: 56px;
  height: 84px;
  background-color: #f8f8f8;
}
.product__thum {
  position: relative;
  width: 100%;
  height: auto;
  background: #f8f8f8;
}
.product__thum .like-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  right: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 2;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
  background-image: url(../image/ico_like_off_light.svg);
}
.product__thum .like-btn.on {
  background-image: url(../image/ico_like_on_light.svg);
}
.product__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.product.swiper-container .product__list {
  flex-wrap: nowrap;
}

.product__list.gap--sml {
  gap: 12px;
}
.product__list.gap--mid {
  gap: 24px;
}
.product__list.gap--big {
  gap: 84px;
}
.product__list.thum--2.gap--sml .product__item,
.product__list.thum--2.gap--sml .product__more {
  flex-basis: calc((100% - 12px) / 2);
}
.product__list.thum--2.gap--sml .product__item:nth-of-type(2n),
.product__list.thum--2.gap--sml .product__more:nth-of-type(2n) {
  margin-right: -12px;
}
.product__list.thum--2.gap--mid .product__item,
.product__list.thum--2.gap--mid .product__more {
  flex-basis: calc((100% - 24px) / 2);
}
.product__list.thum--2.gap--mid .product__item:nth-of-type(2n),
.product__list.thum--2.gap--mid .product__more:nth-of-type(2n) {
  margin-right: -24px;
}
.product__list.thum--2.gap--big .product__item,
.product__list.thum--2.gap--big .product__more {
  flex-basis: calc((100% - 84px) / 2);
}
.product__list.thum--2.gap--big .product__item:nth-of-type(2n),
.product__list.thum--2.gap--big .product__more:nth-of-type(2n) {
  margin-right: -84px;
}
.product__list.thum--3.gap--sml .product__item,
.product__list.thum--3.gap--sml .product__more {
  flex-basis: calc((100% - 24px) / 3);
}
.product__list.thum--3.gap--sml .product__item:nth-of-type(3n),
.product__list.thum--3.gap--sml .product__more:nth-of-type(3n) {
  margin-right: -12px;
}
.product__list.thum--3.gap--mid .product__item,
.product__list.thum--3.gap--mid .product__more {
  flex-basis: calc((100% - 48px) / 3);
}
.product__list.thum--3.gap--mid .product__item:nth-of-type(3n),
.product__list.thum--3.gap--mid .product__more:nth-of-type(3n) {
  margin-right: -24px;
}
.product__list.thum--3.gap--big .product__item,
.product__list.thum--3.gap--big .product__more {
  flex-basis: calc((100% - 168px) / 3);
}
.product__list.thum--3.gap--big .product__item:nth-of-type(3n),
.product__list.thum--3.gap--big .product__more:nth-of-type(3n) {
  margin-right: -84px;
}
.product__list.thum--4.gap--sml .product__item,
.product__list.thum--4.gap--sml .product__more {
  flex-basis: calc((100% - 36px) / 4);
}
.product__list.thum--4.gap--sml .product__item:nth-of-type(4n),
.product__list.thum--4.gap--sml .product__more:nth-of-type(4n) {
  margin-right: -12px;
}
.product__list.thum--4.gap--mid .product__item,
.product__list.thum--4.gap--mid .product__more {
  flex-basis: calc((100% - 72px) / 4);
}
.product__list.thum--4.gap--mid .product__item:nth-of-type(4n),
.product__list.thum--4.gap--mid .product__more:nth-of-type(4n) {
  margin-right: -24px;
}
.product__list.thum--4.gap--big .product__item,
.product__list.thum--4.gap--big .product__more {
  flex-basis: calc((100% - 252px) / 4);
}
.product__list.thum--4.gap--big .product__item:nth-of-type(4n),
.product__list.thum--4.gap--big .product__more:nth-of-type(4n) {
  margin-right: -84px;
}
.product__list.thum--5.gap--sml .product__item,
.product__list.thum--5.gap--sml .product__more {
  flex-basis: calc((100% - 48px) / 5);
}
.product__list.thum--5.gap--sml .product__item:nth-of-type(5n),
.product__list.thum--5.gap--sml .product__more:nth-of-type(5n) {
  margin-right: -12px;
}
.product__list.thum--5.gap--mid .product__item,
.product__list.thum--5.gap--mid .product__more {
  flex-basis: calc((100% - 96px) / 5);
}
.product__list.thum--5.gap--mid .product__item:nth-of-type(5n),
.product__list.thum--5.gap--mid .product__more:nth-of-type(5n) {
  margin-right: -24px;
}
.product__list.thum--5.gap--big .product__item,
.product__list.thum--5.gap--big .product__more {
  flex-basis: calc((100% - 336px) / 5);
}
.product__list.thum--5.gap--big .product__item:nth-of-type(5n),
.product__list.thum--5.gap--big .product__more:nth-of-type(5n) {
  margin-right: -84px;
}
.product__list.thum--6.gap--sml .product__item,
.product__list.thum--6.gap--sml .product__more {
  flex-basis: calc((100% - 60px) / 6);
}
.product__list.thum--6.gap--sml .product__item:nth-of-type(6n),
.product__list.thum--6.gap--sml .product__more:nth-of-type(6n) {
  margin-right: -12px;
}
.product__list.thum--6.gap--mid .product__item,
.product__list.thum--6.gap--mid .product__more {
  flex-basis: calc((100% - 120px) / 6);
}
.product__list.thum--6.gap--mid .product__item:nth-of-type(6n),
.product__list.thum--6.gap--mid .product__more:nth-of-type(6n) {
  margin-right: -24px;
}
.product__list.thum--6.gap--big .product__item,
.product__list.thum--6.gap--big .product__more {
  flex-basis: calc((100% - 420px) / 6);
}
.product__list.thum--6.gap--big .product__item:nth-of-type(6n),
.product__list.thum--6.gap--big .product__more:nth-of-type(6n) {
  margin-right: -84px;
}
.product__list.exception {
  gap: 0;
}
.product__list.square-type .product__thum {
  aspect-ratio: 1/1;
}
.product__list.square-type .product__thum img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
