// A single Source to be used in the graph
import Source from '@/classes/source.ts'

export default class GraphUtils {
  public static setGraphData (graph: any, sourceList: Array<Source>) {
    // Get nodes and links
    let copiedSource = JSON.parse(JSON.stringify(sourceList))
    let graphData = GraphUtils.sourceListToGraphData(copiedSource)
    // Set data + attributes
    graph
      .graphData(graphData)
      .nodeId('id')
      .nodeLabel('title')
      .nodeVal('userSignificance')
      .nodeColor(GraphUtils.nodeToColor)
  }

  public static updateGraphData (graph: any, id: any, property: any, oldVal: any, newVal: any) {
    let graphData = graph.graphData()
    for (let node of graphData.nodes) {
      if (node.id === id) {
        if (property === 'group') {
          delete node.color
          delete node.materialcolor
        }
        node[property] = newVal
        console.log(node)
        // If property is 'group' - recolor
        graph.refresh()
      }
    }
  }

  static getRandomInt (min: any, max: any) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
  }
  private static sourceListToGraphData (sourceList: Array<Source>) {
    let graphData: any = {
      nodes: [],
      links: []
    }
    graphData.nodes = sourceList

    for (let i = 0; i < graphData.nodes.length; i++) {
      const src = i % graphData.nodes.length
      const dst = GraphUtils.getRandomInt(0, graphData.nodes.length)
      graphData.links.push({
        source: graphData.nodes[src].id,
        target: graphData.nodes[dst].id
      })
    }

    return graphData
  }

  private static nodeToColor (node: any) {
    return GraphUtils.stringToColor3(node.group)
  }
  private static stringToColor (str: String) {
    return GraphUtils.intToRGB(GraphUtils.hashCode(str))
  }

  private static stringToColor2 (str: String) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF
      color += ('00' + value.toString(16)).substr(-2)
    }
    return color
  }

  private static stringToColor3 (str: String) {
    return GraphUtils.intToHSL(GraphUtils.hashCode2(str))
  }

  private static hashCode (str: String) { // java String#hashCode
    var hash = 0
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  private static hashCode2 (str: String) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0)
  }

  private static intToRGB (i: number) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

    return '00000'.substring(0, 6 - c.length) + c
  }

  private static intToHSL = function (val: number) {
    // saturation is how rich you want the color,
    // lightness determines the deepness:
    //    50% is normal, 25% is dark colors, 75% is pastel.
    var shortened = val % 360
    return 'hsl(' + shortened + ',100%, 75%)'
  };
}
