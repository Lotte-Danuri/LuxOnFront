<template>
  <main>
    <h1>맞춤 상품 추천</h1>
    <br />
    <div style="display: flex">
      <h3>선택한 사용자에게 프로모션 정보를 챗으로 전달합니다.</h3>
      <h3 style="font-style: italic; color: gray; margin-left: 44%">
        {{ userName }}
      </h3>
      <h3>　님 안녕하세요</h3>
      <a @click="logout" style="margin-left: 4%">
        <div style="display: flex; margin-bottom: 0px">
          <span class="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </div>
      </a>
    </div>
    <hr />
    <div class="input_body">
      <div>
        <input
          type="text"
          class="search_userId"
          v-model="inputName"
          placeholder="빈칸시 전체 조회"
        />
        <button class="btn btn-dark" @click="getMember(inputName)">
          조회 <i class="fa fa-search" />
        </button>
      </div>
      <div class="info">
        <div class="memberList">
          <table class="table table-striped table-hover">
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
                    :value="{
                      loginId: member.loginId.split('@')[0],
                      memberId: member.id,
                    }"
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
        <br />
        <h4>맞춤 추천 상품 보내기</h4>
        <input class="search_userId" type="text" v-model="content" />
        <button
          class="btn btn-dark"
          @click="sendMessages(content, this.selectedMembers)"
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
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SysRecommend',
  data() {
    return {
      userName: localStorage.getItem('userName'),
      router: useRouter(),

      picked: 0,
      members: [],
      selectedMembers: [],
      searchMembers: [],
      inputName: '',
      content: '고객 맞춤 추천 상품',
      recList: [],
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
      console.log('get');
      console.log(this.members);
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
    sendMessages: async function (content, selectedMembers) {
      console.log(selectedMembers);
      await axios
        .post(
          'https://sbbro.xyz/api/recommend/recommends/member/list',
          selectedMembers,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => (this.recList = res.data))
        .catch(err => console.log(err));
      console.log(this.recList);
      this.recList.forEach(async function (rec) {
        rec.productCode.length != 0
          ? await axios
              .post(
                'https://sbbro.xyz/api/chat/chatRoom/chat',
                {
                  id: null,
                  content: content,
                  contentType: '추천',
                  sendBy: localStorage.getItem('login_id'),
                  sendTo: rec.loginId,
                  source: rec.productCode,
                },
                {
                  headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then()
              .catch(err => console.log(err))
          : false;
      });
      alert('상품 추천 메세지 전송 완료!');
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
            selectedMembers.push({
              loginId: user.loginId.split('@')[0],
              memberId: user.id,
            });
          });
        }

        this.selectedMembers = selectedMembers;
      },
    },
  },
};
</script>

<style scoped>
.input_body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 500px;
  overflow-y: auto;
  background-color: white;
  font-size: large;
  border: 3px solid black;
}
.search_userId {
  width: 35%;
  height: 30px;
  border: 3px solid black;
}

.btn {
  width: 15%;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
  height: 32px;
}

.form-control {
  width: 50%;
}
</style>
