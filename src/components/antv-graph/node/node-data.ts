import type { NodeStatus } from './cell-status'
import type { VertexTypes } from '~/composables/data-structure/dag'

interface NodeData {
  key: VertexTypes
  label: string
  status?: NodeStatus
  body: any
}

export type {
  NodeData,
}
