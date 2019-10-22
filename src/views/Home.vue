<template>
  <div class="home">
    <FileSelect/>
    <Graph/>
  </div>
</template>

<script>
// @ is an alias to /src
import Graph from '@/components/Graph.vue'
import FileSelect from '@/components/FileSelect.vue'

export default {
  name: 'home',
  components: {
    Graph,
    FileSelect
  }
}
</script>
