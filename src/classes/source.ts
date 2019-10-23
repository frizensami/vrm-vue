// A single Source to be used in the graph
export default class Source {
    title: String;
    id: String;
    userSignificance: Number;
    constructor (citation: any) {
      this.title = citation.title
      this.id = citation.id
      this.userSignificance = 1;
    }
}
