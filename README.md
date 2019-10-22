# vrm-vue

## Motivation
Represent an area of research (i.e. a set of research papers) **visually** to **organize a large body of work**.

## Stack
- [Vue.js](https://vuejs.org/): Frontend framework
- [3D-Force-Graph](https://github.com/vasturiano/3d-force-graph): 3D graph library
- [Citation.js](https://github.com/larsgw/citation.js/): Reading citations

## Conceptual planning
User-configurable attributes of each paper
- Significance value (i.e. how important do you consider this paper to be?)

Auto-inferred for each paper (aim)
- Number cited by
- Number of papers cited

Graph / node attributes that can map onto paper attributes
- Size of each node
- Color of each node
- Shape of each node
- Link length
- Link color
- Link size

## User flow
- User imports a list of citations in some ((format))
- The citations are parsed by `Citation.js` into a common format internal to itself
- The user sets the graph configuration, saved in a `Config` object
- A converter changes each Citation.js object into a `Source` object (project-specific intermediate type)
- A `SourceFormatter` object (configured with a `Config` object) will collect the correct fields from the `Source` object to be displayed in the graph.

## Status
### Achieved
- Can take a CSL-JSON file as user input
- Can convert that to a list of Cite objects
- Can display them as a list below the graph
- Conversion of Cite list of sources into internal Source type
### TODO
- Change graph based on list of sources
- Allow user configuration of graph display
- Get useful metric from graph

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
