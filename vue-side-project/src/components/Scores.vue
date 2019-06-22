<template>
  <div class="hello">
    <b-container class="bv-example-row">
    <b-row>
      <b-col align="right">
        {{this.TeamOne.playerOne.name}} and {{this.TeamOne.playerTwo.name}}<br>
        <b-button v-on:click=teamOneScored pill>Scored!</b-button>
      </b-col>
      <b-col>|</b-col>
      <b-col align="left">
        {{this.TeamTwo.playerOne.name}} and {{this.TeamTwo.playerTwo.name}}<br>
        <b-button pill v-on:click=teamTwoScored>Scored!</b-button>
      </b-col>
      </b-row>
    </b-container>
    <h2>{{this.TeamOne.score}} - {{this.TeamTwo.score}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function(){
    return{
    TeamOne: {
      score: 0,
      playerOne: {
        name: "Luke",
        pointsScored: 1,
        sinks: 0
      },
      playerTwo: {
        name: "Jon",
        pointsScored: 5,
        sinks: 1
      }
    },
    TeamTwo: {
      score: 0,
      playerOne: {
        name: "Walker",
        pointsScored: 2,
        sinks: 0
      },
      playerTwo: {
        name: "Brad",
        pointsScored: 2,
        sinks: 0
      }
    }
    }
  },
  computed: {
  },
  methods: {
    teamOneScored: function(){
      this.TeamOne.score++;
    },
    teamTwoScored: function(){
      this.TeamTwo.score++;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* @import 'bootstrap/scss/bootstrap.scss';
@import 'bootstrap-vue/src/index.scss'; */
</style>
