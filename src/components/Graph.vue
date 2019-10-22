<template>

<div id="graph-outer">
  <FileSelect v-on:new-file="onNewFile"/>
  <div id="graph">
  </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import ForceGraph3D from '3d-force-graph'
import FileSelect from '@/components/FileSelect.vue'

export default Vue.extend({
  name: 'Graph',
  props: {
    msg: String
  },
  data: function () {
    return {
      // Initialization
      graph: ForceGraph3D()
    }
  },
  methods: {
    onNewFile: function () {
      console.log('New file detected')
      alert('New File!')
    }
  },
  mounted: function () {
    // Run this function once the component is added to the DOM
    this.$nextTick(function () {
      // Random tree
      const N = 300
      const gData = {
        nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
          .filter(id => id)
          .map(id => ({
            source: id,
            target: Math.round(Math.random() * (id - 1))
          }))
      }
      // Map this concretely to the graph id: DO NOT CHANGE
      this.graph(document.getElementById('graph')).graphData(gData)
    })
  },
  components: {
    FileSelect
  }
})
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
