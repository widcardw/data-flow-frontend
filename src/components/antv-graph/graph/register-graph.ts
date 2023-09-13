import { register } from '@antv/x6-vue-shape'
import { Edge, Graph, Path } from '@antv/x6'
import DagNode from '../node/DagNode.vue'
import { CellShape } from '../creation'

function executeRegister() {
  register({
    shape: CellShape.Node,
    width: 212,
    height: 48,
    component: DagNode,
    // port默认不可见
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },

        out: {
          position: {
            name: 'right',
            args: {
              dx: -32,
            },
          },

          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },
      },
    },
  })

  Graph.registerConnector(
    'curveConnector',
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x)
      const path = new Path()
      path.appendSegment(
        Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y),
      )
      path.appendSegment(
        Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y),
      )
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          'C',
          sourcePoint.x < targetPoint.x
            ? sourcePoint.x + hgap / 2
            : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x
            ? targetPoint.x - hgap / 2
            : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x - 6,
          targetPoint.y,
        ),
      )
      path.appendSegment(
        Path.createSegment('L', targetPoint.x + 2, targetPoint.y),
      )

      return path.serialize()
    },
    true,
  )

  Edge.config({
    markup: [
      {
        tagName: 'path',
        selector: 'wrap',
        attrs: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeLinecap: 'round',
        },
      },
      {
        tagName: 'path',
        selector: 'line',
        attrs: {
          fill: 'none',
          pointerEvents: 'none',
        },
      },
    ],
    connector: { name: 'curveConnector' },
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: 'round',
      },
      line: {
        connection: true,
        stroke: '#A2B1C3',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 6,
        },
      },
    },
  })

  Graph.registerEdge(CellShape.Edge, Edge, true)
}
export {
  executeRegister,
}
