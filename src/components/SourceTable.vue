<template>
  <hot-table :settings="hotSettings" ref="hTable">
  </hot-table>
</template>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
@import '~pikaday/css/pikaday.css';
</style>

<script>
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
// These two imports that follow are necessary for date picker and formatting
// in handsontable
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
            dateFormat: 'Do MMM YYYY',
            className: 'htLeft'
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
    /**
     * Called by parent to load the array of objects into the table.
     * new-table is emitted to force the parent to initialize the
     *  graph with this data.
     * The columns option in hotSettings will tell the table how to display
     * the array of Source objects it will load from this function
     * @param items Array of Source objects for the table
     */
    loadTable (items) {
      this.items = items
      this.$refs.hTable.hotInstance.loadData(items)
      this.$emit('new-table', items)
    },
    /**
     * Called on every change to the table. Emits event to force
     * graph to update the node affected by this change.
     * @param change Array of values representing this change
     */
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
