<template>
  <div class="mypage-dashboard">
    <!-- 마이페이지 대시보드 -->
    <div class="mypage-dashboard__info">
      <div class="mypage-dashboard__row">
        <div class="col-2">
          <div class="info-grade">
            <div class="level">
              <span class="lv welcome">등급</span>
              <span class="user">
                <div class="mem">
                  <em class="grade">WELCOME</em>
                </div>
                <span class="name">
                  <strong>박세훈님</strong>
                  <button class="btn-arrow" id="nextMonthGrade">
                    다음달 예상 등급
                  </button>
                </span>
              </span>
            </div>
          </div>
          <ul class="info-disc"></ul>
        </div>
        <div class="col-2">
          <ul class="info-point">
            <li>
              <span class="tit">S.I.포인트</span>
              <em class="won"
                ><a
                  href="javascript:;"
                  onclick="overpass.mypage.searchSIPoint()"
                  id="siPoint"
                ></a
                >P</em
              >
            </li>
            <li>
              <span class="tit">e포인트</span>
              <em class="won"
                ><a
                  href="javascript:;"
                  onclick="overpass.mypage.searchEPoint()"
                  id="ePoint"
                ></a
                >P</em
              >
            </li>
            <li>
              <span class="tit">쿠폰</span>
              <em class="won"
                ><a
                  href="javascript:;"
                  onclick="overpass.mypage.searchCpn()"
                  id="couponCnt"
                ></a
                >장</em
              >
            </li>
            <li>
              <span class="tit">리뷰</span>
              <em class="won"
                ><a
                  href="javascript:;"
                  onclick="overpass.mypage.goReviewList()"
                  id="reviewCnt"
                ></a
                >개</em
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- //마이페이지 대시보드 -->
  </div>
</template>

<script>
export default {};
</script>

<style>
.mypage-dashboard {
  width: 100%;
  height: 150px;
  margin-bottom: 24px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
}
.mypage-dashboard__info {
  padding: 40px 32px 40px 40px;
  background-color: #fff;
}
.mypage-dashboard__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mypage-dashboard__row .info-grade {
  position: relative;
  display: inline-block;
  max-width: 538px;
}
.mypage-dashboard__row .info-grade .level {
  display: flex;
}
.mypage-dashboard__row .info-grade .level .lv {
  display: inline-block;
  width: 62px;
  height: 62px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  color: transparent;
  text-indent: -99999em;
}
.mypage-dashboard__row .info-grade .level .lv.diamond {
  background-image: url("../../image/badge_diamond.png");
}
.mypage-dashboard__row .info-grade .level .lv.platinum {
  background-image: url("../../image/badge_platinum.png");
}
.mypage-dashboard__row .info-grade .level .lv.gold {
  background-image: url("../../image/badge_gold.png");
}
.mypage-dashboard__row .info-grade .level .lv.silver {
  background-image: url("../../image/badge_silver.png");
}
.mypage-dashboard__row .info-grade .level .lv.bronze {
  background-image: url("../../image/badge_bronze.png");
}
.mypage-dashboard__row .info-grade .level .lv.family {
  background-image: url("../../image/badge_family.png");
}
.mypage-dashboard__row .info-grade .level .lv.welcome {
  background-image: url("../../image/badge_welcome.png");
}
.mypage-dashboard__row .info-grade .level .user {
  display: inline-block;
  margin-left: 12px;
}
.mypage-dashboard__row .info-grade .level .name {
  display: inline-block;
  max-width: 440px;
}
.mypage-dashboard__row .info-grade .level .name strong {
  margin-right: 8px;
  color: #000;
  font-size: 16px;
  line-height: 24px;
  word-break: break-all;
}
.mypage-dashboard__row .info-grade .level .btn-arrow {
  display: inline-block;
  padding-right: 16px;
  color: #404040;
  font-size: 14px;
  line-height: 24px;
  background: url("../../image/ico_arrow_gray_border_right.svg") no-repeat
    center right/14px;
}
.mypage-dashboard__row .info-grade .mem:after {
  content: "";
  clear: both;
  display: block;
}
.mypage-dashboard__row .info-grade .mem .grade {
  float: left;
  display: block;
  max-width: 270px;
  margin-bottom: 10px;
  color: #131922;
  font-family: RegularBoldCello;
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  word-break: break-all;
}
.mypage-dashboard__row .info-grade .mem a.btn-wide {
  float: left;
  width: auto;
  height: 32px;
  margin-left: 12px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
}
.mypage-dashboard__row .info-grade .mem span.bt {
  height: 28px;
  padding-top: 8px;
}
.mypage-dashboard__row .info-point {
  display: flex;
}
.mypage-dashboard__row .info-point li {
  width: 160px;
  padding: 0 16px;
  border-right: 1px solid #f0f0f0;
}
.mypage-dashboard__row .info-point li:nth-last-of-type(1) {
  border-right: 0;
}
.mypage-dashboard__row .info-point span,
.mypage-dashboard__row .info-point em {
  display: block;
  width: 100%;
  text-align: center;
}
.mypage-dashboard__row .info-point .tit {
  margin-bottom: 17px;
  color: #404040;
  font-size: 14px;
  line-height: 20px;
}
.mypage-dashboard__row .info-point .won {
  color: #000;
  font-size: 16px;
  line-height: 28px;
  font-weight: 500;
}
.mypage-dashboard__row .info-point .won a {
  display: inline-block;
  padding-right: 4px;
  font-size: 22px;
  font-weight: bold;
}
.mypage-dashboard__row .info-disc {
  display: flex;
  padding-left: 62px;
  margin-top: 17px;
}
.mypage-dashboard__row .info-disc li {
  position: relative;
  padding: 0 12px;
  font-size: 14px;
  line-height: 30px;
}
.mypage-dashboard__row .info-disc li:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 1px;
  height: 10px;
  background-color: #e0e0e0;
  transform: translateY(-50%);
}
.mypage-dashboard__row .info-disc li:nth-last-of-type(1) {
  margin-right: 0;
  padding-right: 0;
}
.mypage-dashboard__row .info-disc li:nth-last-of-type(1):after {
  content: none;
}
.mypage-dashboard__row .info-disc li .tit,
.mypage-dashboard__row .info-disc li .won {
  display: inline-block;
  line-height: 24px;
}
.mypage-dashboard__row .info-disc li .tit {
  margin-right: 7px;
  color: #404040;
}
.mypage-dashboard__row .info-disc li .won {
  color: #000;
}
.mypage-dashboard__row .info-disc li .won b {
  font-size: 16px;
}
.mypage-dashboard__row .info-disc li .tooltip-trigger {
  margin: -4px 0 0 4px;
}
</style>
