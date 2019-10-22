<template>

<div id="sourcelist">
    <h3> Source List </h3>
        <table>
            <thead>
                <tr>
                    <td> <b> Title </b> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td v-bind:href="item.URL">{{ item.title }}</td>
                </tr>
            </tbody>
        </table>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import Cite from 'citation-js'

export default Vue.extend({
  name: 'Graph',
  props: {
    items: Array
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 15px;
}
td {
  text-align: left;
}
</style>
