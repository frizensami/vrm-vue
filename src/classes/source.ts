// A single Source to be used in the graph
export default class Source {
    title: String;
    id: String;
    constructor (citation: any) {
      this.title = citation.title
      this.id = citation.id
    }
}
