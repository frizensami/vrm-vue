<template>

<div id="graph-outer">
  <FileSelect v-on:new-file="onNewFile"/>
  <div id="graph">
  </div>
  <SourceList v-bind:items='items'/>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import ForceGraph3D from '3d-force-graph'
import FileSelect from '@/components/FileSelect.vue'
import SourceList from '@/components/SourceList.vue'
import Cite from 'citation-js'
import Source from '@/classes/source.ts'

export default Vue.extend({
  name: 'Graph',
  props: {
    msg: String
  },
  data: function () {
    return {
      // Initialization
      graph: ForceGraph3D(),
      items: []
    }
  },
  methods: {
    onNewFile: function (newFile: File) {
      // Read file and convert to citation list
      console.log(newFile)
      if (newFile.type === 'application/json') {
        const fileBlob = newFile as any // Blob .text() not recognized
        let outerThis: any = this
        fileBlob.text().then(function (results: string) {
          // List of objects
          const jsonFile: Array<Object> = JSON.parse(results)

          // Cite object representation of all references
          const citationList = Cite(results)
          console.log(citationList)

          // Convert citation list to internal Source representaiton
          // outerThis.items = citationList
          const sourceList = citationList.data.map(function (citation: any) {
            return new Source(citation)
          })
          outerThis.items = sourceList
        })
      }
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
    FileSelect,
    SourceList
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
