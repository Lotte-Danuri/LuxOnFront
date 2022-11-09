<template>
  <div class="mypage-lnb">
    <h1 class="mypage-lnb__title">
      <strong>마이페이지</strong>
    </h1>
    <!-- LNB -->
    <nav class="mypage-lnb__set">
      <div class="menu">
        <br />
        <p class="menu-title">나의 쇼핑정보</p>
        <ul>
          <li>
            <router-link to="/mypage/order">
              <a>주문/배송 조회</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="menu">
        <p class="menu-title">나의 활동정보</p>
        <ul>
          <li><a>상품리뷰</a></li>
          <li>
            <router-link to="/mypage/like">
              <a>찜</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="menu">
        <p class="menu-title">나의 정보 관리</p>
        <ul>
          <li><a>개인정보 수정</a></li>
          <li><a>회원탈퇴</a></li>
        </ul>
      </div>
    </nav>
    <!-- //LNB -->
  </div>
</template>

<script>
export default {};
</script>

<style></style>
