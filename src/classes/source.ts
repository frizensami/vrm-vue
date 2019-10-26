// A single Source to be used in the graph
import GraphUtils from '@/classes/graphUtils.ts'
import { parse, format } from '@citation-js/date'
import Moment from 'moment'

export default class Source {
    title: String;
    id: String;
    userSignificance: Number;
    group: String;
    datestring: String;
    constructor (citation: any) {
      this.title = citation.title
      this.id = citation.id
      this.userSignificance = GraphUtils.getRandomInt(1, 100)
      this.group = 'all'

      if (citation.issued) {
        let date = Moment(format(citation.issued, '-'))
        this.datestring = date.format('Do MMM YYYY')
      } else if (citation.accessed) {
        let date = Moment(format(citation.accessed, '-'))
        this.datestring = date.format('Do MMM YYYY')
      } else {
        this.datestring = ''
      }
    }
}
