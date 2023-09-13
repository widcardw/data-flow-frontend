import { StringExt } from '@antv/x6'
import type { Edge, Graph, Node } from '@antv/x6'
import { atom } from 'nanostores'
import type { NodeData } from '../node/node-data'
import { CellShape, TYPE_TO_LABEL } from '../creation'
import type { Position } from '../position'
import { getPortsByType } from '../node/node-ports'
import type { VertexTypes } from '~/data-structure/dag'

const graph = atom<Graph | undefined>()

function createNode(type: VertexTypes, position?: Position) {
  // const graphInstance = graph.get()
  if (!graph.value)
    return
  const sameTypeNodes = graph.value
    .getNodes()
    .filter(i => i.getData<NodeData>().key === type)
  const labelName = TYPE_TO_LABEL[type]
  const id = StringExt.uuid()
  const node: Node.Metadata = {
    id,
    shape: CellShape.Node,
    x: position?.x,
    y: position?.y,
    ports: getPortsByType(type, id),
    data: {
      key: type,
      label: `${labelName}_${sameTypeNodes.length + 1}`,
    },
  }
  const newNode = graph.value.addNode(node)
  return newNode
}

function createEdge(source: string, target: string) {
  if (!graph.value)
    return
  const existingEdges = graph.value.getEdges()
  if (existingEdges.find(i => i.getSourceCellId() === source && i.getTargetCellId() === target))
    return

  const edge: Edge.Metadata = {
    id: StringExt.uuid(),
    shape: CellShape.Edge,
    source: {
      cell: source,
      port: `${source}-out`,
    },
    target: {
      cell: target,
      port: `${target}-in`,
    },
    zIndex: -1,
    data: {
      source,
      target,
    },
  }
  return graph.value.addEdge(edge)
}

export {
  graph,
  createEdge,
  createNode,
}
