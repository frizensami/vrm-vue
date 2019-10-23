// A single Source to be used in the graph
import GraphUtils from '@/classes/graphUtils.ts'
export default class Source {
    title: String;
    id: String;
    userSignificance: Number;
    constructor (citation: any) {
      this.title = citation.title
      this.id = citation.id
      this.userSignificance = GraphUtils.getRandomInt(1, 100)
    }
}
