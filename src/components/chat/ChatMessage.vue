<template>
  <div>
    <div class="chat__mymessage" :class="[isSame ? '' : 'chat__first']">
      <!-- <p class="chat__yourmessage__time">23:38</p> -->
      <p class="chat__mymessage__paragraph">{{ msg.msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'prev'],
  data() {
    return {
      isSame: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style>
.chat__mymessage {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  margin: 0;
  min-height: 40px;
  line-break: anywhere;
}

.chat__mymessage__paragraph {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: #bbc4ef;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}
</style>
