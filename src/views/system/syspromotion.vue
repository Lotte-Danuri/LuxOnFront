<template>
  <main>
    <h1>프로모션 관리</h1>
    <div class="input_body">
      <div>
        <input
          type="text"
          class="search_userId"
          v-model="inputName"
          placeholder="빈칸시 전체 조회"
        />
        <button class="btn btn-primary" @click="getMember(inputName)">
          조회 <i class="fa fa-search" />
        </button>
      </div>
      <div class="info">
        <div class="memberList">
          <table class="table">
            <thead>
              <tr>
                <th><input type="checkbox" v-model="selectMemberAll" /></th>
                <th>아이디</th>
                <th>이름</th>
              </tr>
            </thead>
            <tbody id="memberData">
              <tr v-for="member in searchMembers" :key="member.loginId">
                <td>
                  <input
                    type="checkbox"
                    :value="member.loginId.split('@')[0]"
                    v-model="selectedMembers"
                  />
                </td>
                <td>{{ member.loginId }}</td>
                <td>{{ member.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="promotionList">
          <table class="table">
            <thead>
              <tr>
                <th><input type="checkbox" v-model="selectPromotionAll" /></th>
                <th>프로모션명</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>
                  <button class="btn" @click="getPromotion()">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody id="promotionData">
              <tr v-for="promotion in promotions" :key="promotion.id">
                <td>
                  <input
                    type="checkbox"
                    :value="promotion.id"
                    v-model="selectedPromotions"
                  />
                </td>
                <td>{{ promotion.title }}</td>
                <td>{{ promotion.startDate }}</td>
                <td>{{ promotion.endDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="message_form">
        <input type="text" v-model="content" />
        <button
          class="btn btn-primary"
          @click="sendMessages(content, selectedMembers)"
        >
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
      selectedPromotions: [],
      searchMembers: [],
      inputName: '',
      content: '',
      recList: [],
      promotions: [],
    };
  },
  methods: {
    getMember: async function (value) {
      await axios
        .get('https://sbbro.xyz/api/auth/all/0', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.members = res.data))
        .catch(err => console.log(err));
      if (value == null) {
        this.searchMembers = this.members;
      } else {
        this.searchMember(value);
      }
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
    getPromotion: async function () {
      await axios
        .get('https://sbbro.xyz/api/member/promotion/all', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => (this.promotions = res.data))
        .catch(err => console.log(err));
    },
    sendMessages: function (content, selectedMembers) {
      this.selectedPromotions.forEach(async function (promotion) {
        await axios
          .post(
            'https://sbbro.xyz/api/chat/chatRoom/chats',
            {
              id: null,
              content: content,
              contentType: '프로모션',
              sendBy: localStorage.getItem('login_id'),
              sendTo: selectedMembers,
              source: promotion.id,
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(alert('프로모션 전송 완료!'))
          .catch(err => console.log(err));
      });
    },
  },
  mounted: function () {
    this.getPromotion();
  },
  computed: {
    selectMemberAll: {
      get: function () {
        return this.members
          ? this.selectedMembers.length == this.members.length
          : false;
      },
      set: function (value) {
        var selectedMembers = [];

        if (value) {
          this.members.forEach(function (user) {
            selectedMembers.push(user.loginId.split('@')[0]);
          });
        }

        this.selectedMembers = selectedMembers;
      },
    },
    selectPromotionAll: {
      get: function () {
        return this.promotions
          ? this.selectedPromotions.length == this.promotions.length
          : false;
      },
      set: function (value) {
        var selectedPromotions = [];

        if (value) {
          this.promotions.forEach(function (promotion) {
            selectedPromotions.push(promotion.id);
          });
        }

        this.selectedPromotions = selectedPromotions;
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
.info {
  display: flex;
  flex-direction: column;
}
</style>
