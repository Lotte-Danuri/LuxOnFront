<template>
  <main>
    <h1>프로모션 전송</h1>
    <br />
    <div style="display: flex">
      <h3>선택한 사용자에게 프로모션 정보를 챗으로 전달합니다.</h3>
      <h3 style="font-style: italic; color: gray; margin-left: 44%">
        {{ userName }}
      </h3>
      <h3>님 안녕하세요</h3>
      <a @click="logout" style="margin-left: 4%">
        <div style="display: flex; margin-bottom: 0px">
          <span class="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </div>
      </a>
    </div>
    <hr />
    <br />
    <div class="input_body">
      <div class="left_div">
        <div class="input_user">
          <h2 style="font-weight: bold">사용자 ID 검색</h2>
          <div>
            <input
              type="text"
              class="search_userId"
              v-model="inputName"
              placeholder="빈칸시 전체 조회"
              @keyup.enter="getMember(inputName)"
            />
            <button class="btn btn-dark" @click="getMember(inputName)">
              조회 <i class="fa fa-search" />
            </button>
          </div>
        </div>
        <div>
          <div class="info">
            <table class="table table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>
                    <input type="checkbox" v-model="selectMemberAll" />
                  </th>
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
        </div>
      </div>
      <div class="right_div">
        <div class="input_user">
          <h2 style="font-weight: bold">프로모션 전송</h2>
        </div>
        <div>
          <input type="text" class="search_userId" v-model="content" />
          <button
            class="btn btn-dark"
            @click="sendMessages(content, selectedMembers)"
          >
            보내기
            <i class="fa fa-envelope" />
          </button>
        </div>
        <div class="info">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" v-model="selectPromotionAll" />
                </th>
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
                <td>{{ formatDatetime(new Date(promotion.startDate)) }}</td>
                <td>{{ formatDatetime(new Date(promotion.endDate)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { getCurrentInstance } from 'vue';

export default {
  name: 'SysPromotion',
  data() {
    return {
      formatDatetime:
        getCurrentInstance().appContext.config.globalProperties.$formatDatetime,
      userName: localStorage.getItem('userName'),
      picked: 0,
      members: [],
      selectedMembers: [],
      selectedPromotions: [],
      searchMembers: [],
      inputName: '',
      content: '',
      recList: [],
      promotions: [],
      router: useRouter(),
    };
  },
  methods: {
    getMember: async function (value) {
      await axios
        .get('http://localhost:8000/auth/all/0', {
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
        .get('http://localhost:8000/member/promotion/all', {
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
            'http://localhost:8000/chat/chatRoom/chats',
            {
              id: null,
              content: content,
              contentType: '프로모션',
              sendBy: localStorage.getItem('login_id'),
              sendTo: selectedMembers,
              source: promotion,
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
    logout() {
      localStorage.removeItem('login_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      this.router.push('../');
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

<style scoped>
input {
  margin-bottom: -10px;
}
.left_div {
  width: 800px;
}

.center_Btn {
  margin-top: 200px;
}

.center_Btn button {
  width: 50px;
  height: 50px;
  background-color: white;
  border: solid 1px black;
}

.right_div {
  width: 1200px;
}

.input_body {
  margin-left: 100px;
  display: grid;
  grid-template-columns: 500px 100px 1000px;
}
.info {
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 300px;
  overflow-y: auto;
  background-color: white;
  font-size: large;
  border: 2px solid black;
}
.search_userId {
  padding-bottom: 6px;
  width: 40%;
  height: 33px;
  border: 2px solid black;
}

.btn {
  width: 15%;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
  height: 32px;
}
</style>
