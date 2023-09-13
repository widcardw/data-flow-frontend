import { type Edge, type Vertex, type VertexId, type VertexToBeAdded, VertexTypes } from '../types'

class DAGraph {
  private vertices: Map<VertexId, Vertex>

  constructor() {
    this.vertices = new Map()
  }

  addVertex(vertex: VertexToBeAdded) {
    const graphVertexIds = new Set(this.vertices.keys())
    if (!graphVertexIds.has(vertex.id))
      this.vertices.set(vertex.id, { ...vertex, adjacentTo: [], prev: [] })
  }

  addVertices(...vertices: VertexToBeAdded[]) {
    const graphVertexIds = new Set(this.vertices.keys())
    for (const uniqueVertex of this.keepUniqueVertices(vertices)) {
      if (!graphVertexIds.has(uniqueVertex.id))
        this.addVertex(uniqueVertex)
    }
  }

  hasVertex(vertexId: VertexId): boolean
  hasVertex(vertex: Vertex): boolean
  hasVertex(v: Vertex | VertexId) {
    if (typeof v === 'string')
      return this.vertices.has(v)
    else
      return this.vertices.has(v.id)
  }

  addEdge({ from, to }: Edge) {
    if (from === to)
      return
    const [fromVertex, toVertex] = [this.vertices.get(from), this.vertices.get(to)]
    if (fromVertex && toVertex) {
      const hasNotSameAdjacentVertex = !fromVertex.adjacentTo.find(
        adjacentVertex => adjacentVertex === toVertex.id,
      )
      if (hasNotSameAdjacentVertex) {
        fromVertex.adjacentTo.push(toVertex.id)
        toVertex.prev.push(fromVertex.id)
        // TODO: assign operand
        switch (toVertex.body.type) {
          case VertexTypes.Export:
          case VertexTypes.Transform:{
            toVertex.body.operand = from
            break
          }
          // case VertexTypes.Join: {
          //   // TODO
          // }
        }
      }
    }
  }

  deleteEdge({ from, to }: Edge) {
    const [fromVertex, toVertex] = [this.vertices.get(from), this.vertices.get(to)]
    if (fromVertex) {
      fromVertex.adjacentTo = fromVertex.adjacentTo.filter(
        adjacentVertexId => adjacentVertexId !== to,
      )
    }
    if (toVertex) {
      toVertex.prev = toVertex.prev.filter(
        prevVertexId => prevVertexId !== from,
      )
    }
  }

  deleteVertex(vertexId: VertexId) {
    const vertex = this.vertices.get(vertexId)
    if (vertex) {
      for (const p of vertex.prev)
        this.deleteEdge({ from: p, to: vertexId })

      for (const a of vertex.adjacentTo)
        this.deleteEdge({ from: vertexId, to: a })

      this.vertices.delete(vertexId)
    }
  }

  updateVertexBody(vertexId: VertexId, body: Vertex['body']) {
    const rootVertexToMutate = this.vertices.get(vertexId)

    if (rootVertexToMutate)
      rootVertexToMutate.body = body
  }

  private *keepUniqueVertices(vertices: VertexToBeAdded[]): Generator<VertexToBeAdded> {
    const uniqueVerticesIds = new Set<VertexId>()

    for (const vertex of vertices) {
      if (!uniqueVerticesIds.has(vertex.id)) {
        uniqueVerticesIds.add(vertex.id)
        yield vertex
      }
    }
  }

  toDict() {
    return Object.fromEntries(this.vertices.entries())
  }
}

export {
  DAGraph,
}
