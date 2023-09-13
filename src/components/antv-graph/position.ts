import type { Graph, Node } from '@antv/x6'

interface Position {
  x: number
  y: number
}

function getDownstreamNodePosition(node: Node,
  graph: Graph,
  dx = 250,
  dy = 100) {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList: string[] = []
  graph.getEdges().forEach((edge) => {
    const originEdge = edge.toJSON()?.data
    if (originEdge.source === node.id)
      downstreamNodeIdList.push(originEdge.target)
  })
  // 获取起点的位置信息
  const position = node.getPosition()
  let minX = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.includes(graphNode.id)) {
      const nodePosition = graphNode.getPosition()
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX)
        minX = nodePosition.x

      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY)
        maxY = nodePosition.y
    }
  })

  return {
    x: minX !== Number.POSITIVE_INFINITY ? minX : position.x + dx,
    y: maxY !== Number.NEGATIVE_INFINITY ? maxY + dy : position.y,
  }
}

export {
  getDownstreamNodePosition,
}
export type {
  Position,
}
