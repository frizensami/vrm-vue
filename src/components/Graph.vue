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
  data: function () {
    return {
      // Graph initialization (displays nothing)
      graph: ForceGraph3D()
    }
  },
  methods: {
    /**
     * Reads the file uploaded by user, converts to citation list,
     * then creates internal representation (Source) objects,
     * calls method to load table with these objects
     * @param newFile File object from new-file event
     */
    onNewFile: function (newFile: File) {
      // We only care about CSL-JSON
      if (newFile.type === 'application/json') {
        const fileBlob = newFile as any // Blob .text() not recognized
        let outerThis: any = this // this clobbered in callback
        fileBlob.text().then(function (results: string) {
          // Javascript representation of JSON file
          const jsonFile: Array<Object> = JSON.parse(results)
          // Cite object representation of all references
          const citationList = Cite(results)
          // Convert citation list to internal Source representaiton
          const sourceList = citationList.data.map(function (citation: any) {
            return new Source(citation)
          })
          // Update table
          outerThis.$refs.childTable.loadTable(sourceList)
        })
      }
    },
    /**
     * Table component emits new-table event:
     * We force graph to initialize with this data
     * @param newTable List of Source objects
     */
    onNewTable: function (newTable: any) {
      // Read file and convert to citation list
      GraphUtils.setGraphData(this.graph, newTable)
    },
    /**
     * Fired every time a row in the table is updated
     * We get graph to update a single node with the change
     * @param update A dict indicating what was updated
     */
    onUpdateTable: function (update: any) {
      // Read file and convert to citation list
      GraphUtils.updateGraphData(this.graph, update.id, update.property, update.oldVal, update.newVal)
    }
  },
  /**
   * Runs once after component mount to place the graph in the DOM
   * The graph needs a reference to the exact DOM element it's placed in
   */
  mounted: function () {
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
