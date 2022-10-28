import axios from 'axios';

axios.defaults.baseURL = 'https://sbbro.xyz/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  methods: {
    async $api(url) {
      return (
        await axios({
          url,
          // method: 'get',
          // target,
          // data,
        }).catch(e => {
          console.log(e);
        })
      ).data;
    },
  },
};
