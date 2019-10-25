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

<script src="~pikaday/pikaday.js"></script>
<script src="~moment/moment.js"></script>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
@import '~pikaday/css/pikaday.css';
</style>

<script>
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
import Moment from 'moment'
import Pikaday from 'pikaday'

export default {
  data: function () {
    let outerThis = this
    return {
      hotSettings: {
        el: '#example1',
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation',
        startRows: 5,
        startCols: 3,
        colHeaders: true,
        columns: [
          { data: 'id', className: 'htLeft' },
          { title: 'Title', data: 'title', className: 'htLeft' },
          { title: 'Date',
            data: 'datestring',
            type: 'date',
            className: 'htLeft',
          },
          { title: 'Significance', data: 'userSignificance' },
          { title: 'Group', data: 'group' }
        ],
        hiddenColumns: {
          columns: [0],
          indicators: false
        },
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
      this.items = items
      this.$refs.hTable.hotInstance.loadData(items)
      this.$emit('new-table', items)
    },
    emitChange (change) {
      const [row, property, oldVal, newVal] = change
      this.$emit('update-table', {
        // ASSUME THIS IS THE UNIQUE ID AND COLUMNS CANNOT BE SWAPPED
        // The id column is hidden, so it's legit
        id: this.$refs.hTable.hotInstance.getDataAtRow(row)[0],
        property: property,
        oldVal: oldVal,
        newVal: newVal
      })
    }
  }

}
</script>
