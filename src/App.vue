<template>
  <div id="app">
    <h1> Ma premiere  applications X01</h1>
    <img alt="Vue logo" src="./assets/logo.png">

    <div class="container-fluid">
            <div class="">
                  <template>
			<SearchBox />
			<StaffDirectory filterKey="" />
                  </template>

               {{ msg}}
            </div>
    </div>
  </div>
</template>

<script>
import StaffDirectory from './components/StaffDirectory.vue'
import SearchBox from './components/SearchBox.vue'

import 'jquery'
//import 'bootstrap'
import Vue from 'vue'

// Bus
var eventBus = new Vue()


export default {
  name: 'app',
  components: {
    StaffDirectory,
    SearchBox,
  },

  data(){
    return {
      msg :"this is App.vue !!!",
      url : "",
    }
  },

    methods: {
      emitChangeStatut(v_id, v_statut) {
        eventBus.$emit('statut_change',v_id,  v_statut)
      },

      searchStaff(key_search){
        console.log("je recherche ...!  = "  + key_search )
      }
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


@import'~bootstrap/dist/css/bootstrap.css'
</style>
