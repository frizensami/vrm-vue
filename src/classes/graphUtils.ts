// A single Source to be used in the graph
import Source from '@/classes/source.ts'

export default class GraphUtils {
  public static setGraphData (graph: any, sourceList: Array<Source>) {
    let graphData = GraphUtils.sourceListToGraphData(sourceList)
    graph.graphData(graphData)
  }

  private static getRandomInt (min: any, max: any) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
  }
  private static sourceListToGraphData (sourceList: Array<Source>) {
    let graphData: any = {
      nodes: [],
      links: []
    }

    graphData.nodes = sourceList.map(function (source) {
      return {
        id: source.id,
        name: source.title
      }
    })

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
}
