<template>
  <section>
    <div>Facebook user: {{ user }}</div>
    <div>error: {{ error }}</div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      error: null,
    };
  },
  mounted() {
    // 1
    axios.get('http://localhost:3000/server/auth/facebook/callback',{
      params: this.$route.query,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(res => {
      // 3
      this.user = 1;
      console.log(res)
    }).catch(err => {
      this.error = err;
    });
  },
};
</script>