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
  
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <!-- <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div> -->

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="TeamOne.playerOne.name"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
  
  </div>
  
</template>

<script>
import axios from "axios";

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
    },
    handleOk(bvModalEvt) {
        // Prevent modal from closing
        //bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid

      // Push the name to submitted names
      //this.submittedNames.push(this.name)

      axios.get('http://localhost:3000/auth');

      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  },
  created : () => {
    axios.get('http://localhost:3000/auth');
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
