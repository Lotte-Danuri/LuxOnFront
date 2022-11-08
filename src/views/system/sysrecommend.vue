<template>
  <main>
    <h1>추천 관리</h1>
    <div class="input_body">
      <div>
        <input
          type="text"
          class="search_userId"
          v-model="inputName"
          placeholder="빈칸시 전체 조회"
        />
        <button class="btn btn-primary" @click="searchMember(inputName)">
          조회 <i class="fa fa-search" />
        </button>
      </div>
      <div class="member_info">
        <div class="memberList">
          <table class="table">
            <thead>
              <tr>
                <th><input type="checkbox" v-model="selectAll" /></th>
                <th>아이디</th>
                <th>이름</th>
              </tr>
            </thead>
            <tbody id="memberData">
              <tr v-for="member in searchMembers" :key="member.loginId">
                <td>
                  <input
                    type="checkbox"
                    :value="member.loginId"
                    v-model="selectedMembers"
                  />
                </td>
                <td>{{ member.loginId }}</td>
                <td>{{ member.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="message_form">
        <input type="text" v-model="content" />
        <button class="btn btn-primary" @click="sendMessages(content)">
          보내기
          <i class="fa fa-envelope" />
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SysPromotion',
  data() {
    return {
      picked: 0,
      members: [],
      selectedMembers: [],
      searchMembers: [],
      inputName: '',
      content: '고객 맞춤 추천 상품',
    };
  },
  methods: {
    searchRole: async function (value) {
      await axios
        .get('https://sbbro.xyz/api/auth/all/' + value, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.members = res.data))
        .catch(err => console.log(err));
      this.searchMembers = this.members;
    },
    searchMember: function (value) {
      var searchMembers = [];
      this.members.forEach(function (item) {
        if (item.loginId.indexOf(value) != -1) {
          searchMembers.push(item);
        }
      });
      this.searchMembers = searchMembers;
    },
    sendMessages: function (content) {
      axios
        .post(
          'https://sbbro.xyz/api/chat/chatRoom/chats',
          {
            id: null,
            content: content,
            contentType: '추천',
            sendBy: localStorage.getItem('login_id'),
            sendTo: this.selectedMembers,
            source: '',
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(alert('상품 추천 메세지 전송 완료!'));
    },
  },
  computed: {
    selectAll: {
      get: function () {
        return this.members
          ? this.selectedMembers.length == this.members.length
          : false;
      },
      set: function (value) {
        var selectedMembers = [];

        if (value) {
          this.members.forEach(function (user) {
            selectedMembers.push(user.loginId);
          });
        }

        this.selectedMembers = selectedMembers;
      },
    },
  },
};
</script>

<style>
.input_body {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
}
.select_reciver {
  display: flex;
  flex-direction: row;
}
.member_info {
  display: flex;
  flex-direction: row;
}
</style>
