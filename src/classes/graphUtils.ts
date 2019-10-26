// A single Source to be used in the graph
import Source from '@/classes/source.ts'

/**
 * Utility functions for 3d-force-graph
 */
export default class GraphUtils {
  /**
   * Copies array of source objects, converts them to nodes/links,
   * and sets the graph options and nodes + links
   * @param graph Handle to the graph object
   * @param sourceList Array of Source objects
   */
  public static setGraphData (graph: any, sourceList: Array<Source>) {
    // Copy source array
    let copiedSource = JSON.parse(JSON.stringify(sourceList))
    // Get nodes and links ({nodes: ..., links: ...})
    let graphData = GraphUtils.sourceListToGraphData(copiedSource)
    // Set data + attributes
    graph
      .graphData(graphData)
      .nodeId('id')
      .nodeLabel('title')
      .nodeVal('userSignificance')
      .nodeColor(GraphUtils.nodeToColor)
  }

  /**
   * A change in the table has happened - find the node in graph that
   * needs updating, and change the relevant property.
   * @param graph Handle to the graph object
   * @param id Unique identifier for the node
   * @param property Object property that changed
   * @param oldVal Old value of property
   * @param newVal New value of property
   */
  public static updateGraphData (graph: any, id: any, property: any, oldVal: any, newVal: any) {
    let graphData = graph.graphData()
    for (let node of graphData.nodes) {
      if (node.id === id) {
        // Re-color if group changes
        if (property === 'group') {
          delete node.color
          delete node.materialcolor
        }
        node[property] = newVal
        graph.refresh()
      }
    }
  }

  /**
   * Helper function to generate a random int between
   * min (inclusive) and max (exclusive)
   * @param min Lowest number that can be generated
   * @param max One above the highest number that can be generated
   */
  static getRandomInt (min: any, max: any) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  /**
   * Convert an array of Source objects into the data format that
   * the graph object is expecting
   * @param sourceList Array of source objects
   */
  private static sourceListToGraphData (sourceList: Array<Source>) {
    let graphData: any = {
      nodes: [],
      links: []
    }
    graphData.nodes = sourceList
    // Currently: randomly link the nodes together
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

  /**
   * Coloring function used to auto-color the nodes. Can choose from
   * multiple combinations of hashing and coloring.
   * @param node Node that we have to decide the color for
   */
  private static nodeToColor (node: any) {
    return GraphUtils.stringToColor3(node.group)
  }

  /**
   * Basic string to RGB converter.
   * Not used since this doesn't look nice.
   * @param str Node group name
   */
  private static stringToColor (str: String) {
    return GraphUtils.intToRGB(GraphUtils.hashCode(str))
  }

  /**
   * Another string to RGB converter. Better colors as a result,
   * but still has bad contrast characteristics.
   * @param str Node group name
   */
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

  /**
   * Generates a HSL color from the string instead of RGB.
   * Different hash function used to be more sensitive
   * @param str Node group name
   */
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
