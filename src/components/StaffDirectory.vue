<template>
  <div class="nice">
    <h3>{{ msg }}</h3>
    <table class="table table-striped">
      <thead>
      <th>titre</th>
      <th> <a @click="sortedEmployees2('prenom')"> prénom </a> </th>
      <th @click="sortedEmployees2('nom')">nom</th>
      <th @click="sortedEmployees2('email')">email</th>
      <th @click="sortedEmployees2('telephone')">telephone</th>
      <th @click="sortedEmployees2('ville')">Ville</th>
      </thead>
      <tbody>
        <tr v-for='(emplyee, index) in sortedEmployees' v-bind:key='index' >
          <td>{{emplyee.title}}</td>
          <td>{{emplyee.prenom}}</td>
          <td>{{emplyee.nom}}</td>
          <td>{{ emplyee.email}}</td>
          <td>{{ emplyee.telephone}}</td>
          <td>{{ emplyee.ville}}</td>
        </tr>
      </tbody>

      <tfoot>
      <tr>
        <span>
          <button class='btn-warning btn-sm' @click="prevPage">Précedent</button>
          <button class='btn-warning btn-sm' @click="nextPage">Suivant</button>
        </span>
      </tr>

      </tfoot>
  </table>
  </div>

</template>

<script>

export default{
  name : 'StaffDirectory',
  props: {
    filterKey : {
      type : String,
      required: true,
      default : "d"
    }
  },

  data () {
    return {
      msg : "d",
      employees : [],
      sortBy : "nom",
      currentSort : "nom",
      order : 1,
      pageSize : 10,
      currentPage : 1,
    }
  },


  created()  {
    // API public 'https://randomuser.me/api/?nat=gb,us,au&results=10&seed=abc'
    //const url = 'https://randomuser.me/api/?nat=fr&results=10&seed=abc'
    //const url = 'http://localhost:8000/apipro/directories/'
    const url = 'http://51.178.136.190:93/apipro/directories/'

    fetch(url)
    .then(response => response.json())
    .then( data => {
      this.employees = data
      console.log("data load = " + this.filterKey + "**")
    } )
    .catch(error => console.log("erreur = " + error));
  },

  computed: {
    sortedEmployees(){
      return this.employees
      .filter(employee => employee.nom.includes(this.filterKey))
      .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]))

    },
    //-------------
    filteredData() {
      var sortBy = this.sortBy
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      //var order = this.sortOrders[sortBy] || 1

      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortBy) {
        data = data.slice().sort(function (a, b) {
          a = a[this.currentSort]
          b = b[this.currentSort]
          return (a === b ? 0 : a > b ? 1 : -1) * this.order
        })
      }
      return data
    }
  },

  filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
    },

  methods: {

    // paginator
    nextPage(){
      if((this.currentPage*this.pageSize) < this.employees.length) {
        this.currentPage++
      }
    },

    prevPage(){
      if(this.currentPage > 1) this.currentPage--
    },
    //------
    compareValues(key, ordre = 'asc') {
      function comparer (a, b) {
        //if (! a.hasOwnProperty (key) ||! b.hasOwnProperty (key)) return 0;
        var comparaison = a [key] .localeCompare (b [key]);
        return( (ordre == 'desc')? (comparaison * -1): comparaison )
      }
      return comparer()
    },


    //----
    sortedEmployees2(sortedBy){
      this.currentSort = sortedBy

      if (this.employees.length > 0) {
        // order trier
        this.order = this.order * -1

        return this.employees
        .sort((a,b) => {

          if(a[this.currentSort] < b[this.currentSort]) return -1 * this.order
          if(a[this.currentSort] > b[this.currentSort]) return 1 * this.order
          return 0
          }).filter((row, index) => {
            var start = (this.currentPage-1)*this.pageSize
            var end = this.currentPage*this.pageSize
            console.log(" start end sortedEmployees2 ..." +  start + " end = " + end)
            if(index >= start && index < end) return true
            return false
        })
      }
    },

    /***

    Vue.filter('arrondi', function (value, number) {
      return parseFloat(value.toFixed(number))
    }),

    Vue.filter('formatDate', function(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm')
      }
    });

    Vue.filter('reverse', function (value) {
      return value.split('').reverse().join('')
    })

    Vue.filter('substr', function (value, pos) {
      return value.slice(0, pos)
    })
    ***/
    //FIN methods
    },

}


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
</style>
