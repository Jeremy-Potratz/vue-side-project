<template>
  <div class="home">
    <Scores msg="Games" />
    {{ start() }}
  </div>
</template>

<script>
// @ is an alias to /src
import Scores from "@/components/Scores.vue";
import axios from 'axios'

export default {
  name: "home",
  components: {
    Scores
  },
  methods : {
    start : () => {
    axios.get('localhost:3000/auth');
    }
  }
};
</script>
