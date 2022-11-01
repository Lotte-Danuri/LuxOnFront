<script>
export default {
  name: 'ChatRoom',
  props: ['rooms', 'selectChatRoom'],
  data() {
    return {
      name: 'ChatRoom',
      props: ['rooms', 'selectChatRoom'],
    };
  },
  method: {},
  emits: ['selectChatRoom'],
};
</script>

<template>
  <div>
    <div
      v-for="room in rooms"
      :key="room.chatRoomId"
      class="room"
      tabindex="0"
      @click="$emit('selectChatRoom', room)"
    >
      <div>
        <img
          src="@/assets/img/avatar.png"
          style="
            border-radius: 30%;
            width: 55px;
            height: 55px;
            padding: auto;
            background-color: lightgray;
            text-align: center;
            vertical-align: middle;
            float: left;
          "
        />
      </div>
      <div class="room_detail">
        <span class="room_username">{{ room.userName }}</span>
        <span class="room_count" v-if="room.countNewChats !== 0">{{
          room.countNewChats
        }}</span>

        <div class="room_message">
          {{ room.lastChatContent }}
        </div>
        <span class="room_date">{{
          room.lastChatCreatedAt !== null
            ? room.lastChatCreatedAt.substr(11, 5)
            : room.lastChatCreatedAt
        }}</span>

        <hr style="margin-top: 25px; color: grey" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.room {
  align-items: center;
  max-width: 100%;
  height: 100px;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.room:focus {
  background-color: rgb(197, 195, 195);
}

.room:hover {
  background-color: rgb(237, 235, 235);
}

.room_detail {
  height: 24px;
}

.room_username {
  padding-left: 14px;
  height: 24px;
  font-weight: bold;
  font-size: 16px;
}

.room_message {
  padding-left: 70px;
  font-size: 14px;
  margin-top: 5px;
  height: 24px;
}

.room_date {
  float: right;
  height: 24px;
  margin: -10px;
  color: grey;
  font-size: small;
}
.room_count {
  float: right;
  background-color: black;
  border: 1px solid black;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  font-size: 12px;
  padding-top: 3px;
  text-align: center;
  vertical-align: middle;
  color: white;
  margin-top: 8px;
}
</style>
