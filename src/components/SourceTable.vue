<template>
  <hot-table :settings="hotSettings" ref="hTable">
    <!--
    <hot-column title="Title">
    </hot-column>
    <hot-column title="Significance">
    </hot-column>
    -->
  </hot-table>
</template>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>

<script>
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'

export default {
  data: function () {
    let outerThis = this
    return {
      hotSettings: {
        el: '#example1',
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation',
        startRows: 5,
        startCols: 2,
        colHeaders: true,
        columns: [
          { data: 'title', className: 'htLeft' },
          { data: 'userSignificance' }
        ],
        afterChange: function (changes) {
          if (changes == null) return
          for (const change of changes) {
            // To update the graph
            outerThis.emitChange(change)
          }
        }
      },
      items: []

    }
  },
  components: {
    HotTable
  },
  methods: {
    loadTable (items) {
      this.$refs.hTable.hotInstance.loadData(items)
      this.$emit('new-table', items)
    },
    emitChange (change) {
      const [row, property, oldVal, newVal] = change
      this.$emit('update-table', {
        // ASSUME THIS IS THE UNIQUE ID AND COLUMNS CANNOT BE SWAPPED
        id: this.$refs.hTable.hotInstance.getDataAtRow(row)[0],
        property: property,
        oldVal: oldVal,
        newVal: newVal
      })
    }
  }

}
</script>
