<template>
  <div class="home">
    <Scores msg="Games" />
  </div>
</template>

<script>
// @ is an alias to /src
import Scores from "@/components/Scores.vue";

export default {
  name: "home",
  components: {
    Scores
  }
};
</script>
