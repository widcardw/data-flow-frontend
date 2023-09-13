import { VertexTypes } from '~/composables/data-structure/dag'

const CREATE_NODE_TYPE = [
  { label: '转换节点', key: VertexTypes.Transform },
  { label: '连接节点', key: VertexTypes.Join },
  { label: '导出节点', key: VertexTypes.Export },
]

const TYPE_TO_LABEL = {
  [VertexTypes.Import]: '导入节点',
  [VertexTypes.Transform]: '转换节点',
  [VertexTypes.Join]: '连接节点',
  [VertexTypes.Export]: '导出节点',
}

const TYPE_TO_ICON = {
  [VertexTypes.Import]: 'carbon:port-input',
  [VertexTypes.Join]: 'carbon:join-left',
  [VertexTypes.Transform]: 'carbon:3rd-party-connected',
  [VertexTypes.Export]: 'carbon:port-output',
}

enum CellShape {
  Node = 'data-processing-dag-node',
  Edge = 'data-processing-curve',
}

// function initGraph(container: HTMLElement) {
//   executeRegister()
//   graph.set(new Graph({
//     grid: {
//       visible: true,
//       type: 'doubleMesh',
//       args: [
//         {
//           color: '#eee', // 主网格线颜色
//           thickness: 1, // 主网格线宽度
//         },
//         {
//           color: '#ddd', // 次网格线颜色
//           thickness: 1, // 次网格线宽度
//           factor: 4, // 主次网格线间隔
//         },
//       ],
//     },
//     container,
//     panning: {
//       enabled: true,
//       eventTypes: ['leftMouseDown', 'mouseWheel'],
//     },
//     mousewheel: {
//       enabled: true,
//       modifiers: 'ctrl',
//       factor: 1.1,
//       maxScale: 1.5,
//       minScale: 0.5,
//     },
//     highlighting: {
//       magnetAdsorbed: {
//         name: 'stroke',
//         args: {
//           attrs: {
//             fill: '#fff',
//             stroke: '#31d0c6',
//             strokeWidth: 4,
//           },
//         },
//       },
//     },
//     connecting: {
//       snap: true,
//       allowBlank: false,
//       allowLoop: false,
//       highlight: true,
//       sourceAnchor: {
//         name: 'left',
//         args: {
//           dx: Platform.IS_SAFARI ? 4 : 8,
//         },
//       },
//       targetAnchor: {
//         name: 'right',
//         args: {
//           dx: Platform.IS_SAFARI ? 4 : -8,
//         },
//       },
//       createEdge({ sourceCell }) {
//         if (!graph.value)
//           return
//         const edge = graph.value.createEdge({
//           shape: CellShape.Edge,
//           // attrs: {
//           //   line: {
//           //     strokeDasharray: '5 5',
//           //   },
//           // },
//           data: { source: sourceCell.id },
//           zIndex: -1,
//         })
//         return edge
//       },
//       // 连接桩校验
//       validateConnection({ sourceMagnet, targetMagnet, sourceCell, targetCell }) {
//       // 只能从输出链接桩创建连接
//         if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in')
//           return false

//         // 只能连接到输入链接桩
//         if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in')
//           return false

//         const existingEdges = graph.value?.getEdges() || []
//         if (existingEdges.find(i => i.getSourceCellId() === sourceCell?.id && i.getTargetCellId() === targetCell?.id))
//           return false

//         return true
//       },
//     },
//   }))

//   graph.value?.on('cell:mouseenter', ({ cell }) => {
//     if (cell.isNode()) {
//       cell.addTools([
//         {
//           name: 'button-remove',
//           args: {
//             x: 0,
//             y: 0,
//             offset: { x: 0, y: 0 },
//           },
//         },
//       ])
//     }
//     else if (cell.isEdge()) {
//       cell.addTools({
//         name: 'button-remove',
//         args: {
//           x: 0, y: 0,
//         },
//       })
//     }
//   })

//   graph.value?.on('cell:mouseleave', ({ cell }) => {
//     cell.removeTools()
//   })
// }

export {
  CREATE_NODE_TYPE,
  TYPE_TO_LABEL,
  TYPE_TO_ICON,
  CellShape,
  // initGraph,
}
