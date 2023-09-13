import { Graph, Platform, StringExt } from '@antv/x6'
import type { Edge, Node } from '@antv/x6'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Position } from '../position'
import type { NodeData } from '../node/node-data'
import { CellShape, TYPE_TO_LABEL } from '../creation'
import { getPortsByType } from '../node/node-ports'
import { executeRegister } from '../graph/register-graph'
import type { VertexTypes } from '~/composables'

const useGraphUi = defineStore('graph-ui', () => {
  const graph = ref<Graph>()

  function createNode(type: VertexTypes, position?: Position) {
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
        body: {},
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

  function initGraph(container: HTMLElement) {
    executeRegister()
    graph.value = new Graph({
      background: {
        color: '#F2F7FA',
      },
      // grid: {
      //   visible: true,
      //   type: 'doubleMesh',
      //   args: [
      //     {
      //       color: '#eee', // 主网格线颜色
      //       thickness: 1, // 主网格线宽度
      //     },
      //     {
      //       color: '#ddd', // 次网格线颜色
      //       thickness: 1, // 次网格线宽度
      //       factor: 4, // 主次网格线间隔
      //     },
      //   ],
      // },
      container,
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        sourceAnchor: {
          name: 'left',
          args: {
            dx: Platform.IS_SAFARI ? 4 : 8,
          },
        },
        targetAnchor: {
          name: 'right',
          args: {
            dx: Platform.IS_SAFARI ? 4 : -8,
          },
        },
        createEdge({ sourceCell }) {
          if (!graph.value)
            return
          const edge = graph.value.createEdge({
            shape: CellShape.Edge,
            // attrs: {
            //   line: {
            //     strokeDasharray: '5 5',
            //   },
            // },
            data: { source: sourceCell.id },
            zIndex: -1,
          })
          return edge
        },
        // 连接桩校验
        validateConnection({ sourceMagnet, targetMagnet, sourceCell, targetCell }) {
          // 只能从输出链接桩创建连接
          if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in')
            return false

          // 只能连接到输入链接桩
          if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in')
            return false

          const existingEdges = graph.value?.getEdges() || []
          if (existingEdges.find(i => i.getSourceCellId() === sourceCell?.id && i.getTargetCellId() === targetCell?.id))
            return false

          return true
        },
      },
    })

    graph.value?.on('cell:mouseenter', ({ cell }) => {
      if (cell.isNode()) {
        cell.addTools([
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: 0, y: 0 },
            },
          },
        ])
      }
      else if (cell.isEdge()) {
        cell.addTools({
          name: 'button-remove',
          args: {
            x: 0, y: 0,
          },
        })
      }
    })

    graph.value?.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
  }

  function centerContent() {
    graph.value?.centerContent()
  }

  function graphToJSON() {
    return graph.value?.toJSON()
  }

  function getInstantParents(id: string) {
    const edges = graph.value?.getIncomingEdges(id)
    return edges
  }

  function getNodeLabel(id: string) {
    const data = graph.value?.getNodes()?.find(i => i.id === id)?.data
    return data.label
  }

  return { graph, createEdge, createNode, initGraph, centerContent, graphToJSON, getInstantParents, getNodeLabel }
})

export {
  useGraphUi,
}
