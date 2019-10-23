<template>
  <hot-table :settings="hotSettings" ref="hTable">
    <hot-column title="Title">
    </hot-column>
    <hot-column title="References">
    </hot-column>
  </hot-table>
</template>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>

<script>
import { HotTable, HotColumn } from '@handsontable/vue'
import Handsontable from 'handsontable'

export default {
  props: {
    items: Array
  },
  data: function () {
    return {
      hotSettings: {
        el: '#example1',
        stretchH: 'all',
        data: [
          2, 3
        ],
        colHeaders: true,
        rowHeaders: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  components: {
    HotTable,
    HotColumn
  },
  watch: {
    items: function () {
      let data = []
      for (const item of this.items) {
        data.push([item.title, null])
      }
      this.$refs.hTable.hotInstance.loadData(data)
    }
  }
}
</script>
