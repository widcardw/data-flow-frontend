import type { Cell } from '@antv/x6'
import { CellShape } from '../creation'
import type { Position } from '../position'
import type { NodeData } from '../node/node-data'
import { DAGraph, VertexTypes } from '~/composables/data-structure/dag'
import type { Edge as DagEdge, ExportVertex, ImportVertex, JoinVertex, TransformVertex, VertexToBeAdded } from '~/composables/data-structure/dag'

type PartitionRes = [CellNode[], CellEdge[]]

interface CellEdge {
  shape: CellShape.Edge
  connector: {
    name: 'curveConnector'
  }
  id: string
  zIndex: -1
  data: {
    /** source node id */
    source: string
    /** target node id */
    target?: string
  }
  source: {
    /** source node id */
    cell: string
    port: string
  }
  target: {
    /** target node id */
    cell: string
    port: string
  }
}

interface CellNode {
  position: Position
  size: { width: number; height: number }
  view: string
  shape: CellShape.Node
  ports: {
    groups: {
      in: any
      out: any
    }
    items: any
  }
  id: string
  data: NodeData
  zIndex: number
}

function partition(jsonData: Cell.Properties[]): PartitionRes {
  const res: PartitionRes = [[], []]
  jsonData.forEach((value) => {
    switch (value.shape) {
      case CellShape.Node: {
        res[0].push(value as CellNode)
        break
      }
      case CellShape.Edge: {
        res[1].push(value as CellEdge)
        break
      }
    }
  })
  return res
}

function toVertex(cell: CellNode): VertexToBeAdded {
  const { id, data } = cell
  const { key: type } = data
  switch (type) {
    case VertexTypes.Import: {
      const { body }: { body: ImportVertex } = data
      return { id, body }
    }
    case VertexTypes.Export: {
      const { body }: { body: ExportVertex } = data
      return { id, body }
    }
    case VertexTypes.Transform: {
      const { body }: { body: TransformVertex } = data
      return { id, body }
    }
    case VertexTypes.Join: {
      const { body }: { body: JoinVertex } = data
      return { id, body }
    }
  }
}

function toEdge(edge: CellEdge): DagEdge {
  const { source: { cell: sourceId }, target: { cell: targetId } } = edge
  return { from: sourceId, to: targetId }
}

function antvGraph2Dag(jsonData: Cell.Properties[]): DAGraph {
  const [nodes, edges] = partition(jsonData)
  const graph = new DAGraph()
  graph.addVertices(...nodes.map(toVertex))
  edges.forEach((edge) => {
    graph.addEdge(toEdge(edge))
  })
  return graph
}

export {
  antvGraph2Dag,
}
