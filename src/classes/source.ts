// A single Source to be used in the graph
import GraphUtils from '@/classes/graphUtils.ts'
import { parse, format } from '@citation-js/date'

export default class Source {
    title: String;
    id: String;
    userSignificance: Number;
    group: String;
    date: Date;
    datestring: String;
    constructor (citation: any) {
      this.title = citation.title
      this.id = citation.id
      this.userSignificance = GraphUtils.getRandomInt(1, 100)
      this.group = 'all'

      let options = { year: 'numeric', month: 'long', day: 'numeric' }

      if (citation.issued) {
        this.date = new Date(format(citation.issued, '-'))
        this.datestring = this.date.toLocaleDateString('en-US', options)
      } else if (citation.accessed) {
        this.date = new Date(format(citation.accessed, '-'))
        this.datestring = this.date.toLocaleDateString('en-US', options)
      } else {
        this.date = null
        this.datestring = ''
      }
    }
}
