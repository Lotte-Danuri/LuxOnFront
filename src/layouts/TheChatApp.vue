<template>
  <div class="chat-app-wrapper">
    <div class="chat-app-header border">
      <div class="logo">
        <img
          class="chat-msg-img"
          src="@/assets/logo/logo_white.png"
          alt=""
          width="100px"
          height="100%"
        />
      </div>
      <button class="btn close-btn">
        <i class="bi bi-x-circle"></i>
      </button>
    </div>
    <div class="chat-app-body border">
      <div class="chat-app-sidebar"></div>
      <div class="content"></div>
    </div>
    <div class="chat-app-footer border"></div>
  </div>
</template>
<script></script>
<style>
.chat-app-wrapper {
  display: flex;
  flex-direction: column;
}
.chat-app-header {
  background-color: red;
  display: flex;
  width: 100%;
  height: 80px;
}

.chat-app-body {
  flex-grow: 1;
  background-color: white;
  width: 100%;
  display: flex;
}

.chat-app-sidebar {
  background-color: yellow;
  width: 20%;
}

.content {
  background-color: aqua;
  width: 80%;
}
.chat-app-footer {
  background-color: black;
  width: 100%;
  height: 80px;
}

.close-btn {
  right: 10px;
}
</style>
