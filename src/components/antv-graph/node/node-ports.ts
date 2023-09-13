import { VertexTypes } from '~/composables/data-structure/dag'

function getPortsByType(type: VertexTypes, nodeId: string) {
  let ports = []
  switch (type) {
    case VertexTypes.Import:
      ports = [{ id: `${nodeId}-out`, group: 'out' }]
      break
    case VertexTypes.Export:
      ports = [{ id: `${nodeId}-in`, group: 'in' }]
      break
    default:
      ports = [
        { id: `${nodeId}-in`, group: 'in' },
        { id: `${nodeId}-out`, group: 'out' },
      ]
      break
  }
  return ports
}

export {
  getPortsByType,
}
