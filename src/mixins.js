import axios from 'axios';

axios.defaults.baseURL = 'https://sbbro.xyz/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default {
  methods: {
    async $api(url, method, data, headers) {
      // console.log(data);
      // alert(data);
      return (
        await axios({
          url,
          method,
          // target,
          data,
          headers,
        }).catch(e => {
          console.log(e);
        })
      ).data;
    },
  },
};
