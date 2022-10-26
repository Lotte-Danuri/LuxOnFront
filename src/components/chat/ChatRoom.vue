<script>
export default {
  name: 'ChatRoom',
  props: ['rooms'],
  data() {
    return {
      name: 'ChatRoom',
      props: ['rooms'],
    };
  },
};
</script>

<template>
  <div
    v-for="room in rooms"
    :key="room.chatRoomId"
    class="room"
    tabindex="0"
    @keydown.space.prevent="
      () => {
        emit('update:chatRoomId', room.chatRoomId);
      }
    "
    @click="
      () => {
        emit('update:chatRoomId', room.chatRoomId);
      }
    "
  >
    <div class="room_detail">
      <div class="room_username">{{ room.userName }}</div>
      <div class="room_content">
        <span class="room_message">{{ room.lastChatContent }}</span>
        <span class="room_date">{{ room.lastChatCreatedAt }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.room {
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.room:focus {
  background-color: grey;
}
</style>
