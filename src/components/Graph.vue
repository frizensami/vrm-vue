<template>

<div id="graph-outer">
  <FileSelect v-on:new-file="onNewFile"/>
  <div id="graph">
  </div>
  <SourceTable v-on:new-table="onNewTable" v-on:update-table="onUpdateTable" ref="childTable"/>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import ForceGraph3D from '3d-force-graph'
import FileSelect from '@/components/FileSelect.vue'
import SourceTable from '@/components/SourceTable.vue'
import Cite from 'citation-js'
import Source from '@/classes/source.ts'
import GraphUtils from '@/classes/graphUtils.ts'

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
          // Set list for table
          // outerThis.items = sourceList
          console.log('Sending sourceList:')
          console.log(sourceList)
          outerThis.$refs.childTable.loadTable(sourceList)
          // Update graph with nodes
          // GraphUtils.setGraphData(outerThis.graph, sourceList)
        })
      }
    },
    onNewTable: function (newTable: any) {
      // Read file and convert to citation list
      console.log('Received new table')
      console.log(newTable)
      GraphUtils.setGraphData(this.graph, newTable)
    },
    onUpdateTable: function (update: any) {
      // Read file and convert to citation list
      console.log('Received new update')
      console.log(update)
      GraphUtils.updateGraphData(this.graph, update.id, update.property, update.oldVal, update.newVal)
    }
  },
  mounted: function () {
    // Run this function once the component is added to the DOM
    this.$nextTick(function () {
      // Map this concretely to the graph id: DO NOT CHANGE
      this.graph(document.getElementById('graph'))
    })
  },
  components: {
    FileSelect,
    SourceTable
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
