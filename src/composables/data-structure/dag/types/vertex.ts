import type { Operation } from './operation'
import type { ExportMode } from './transform'

enum VertexTypes {
  Import = 'Import',
  Transform = 'Transform',
  Join = 'Join',
  Export = 'Export',
}

enum DataFormat {
  Delta = 'delta',
  File = 'file',
  Db = 'db',
  Csv = 'csv',
}

interface AbstractVertex {
  type: VertexTypes
}

interface ImportVertex extends AbstractVertex {
  type: VertexTypes.Import
  format: DataFormat
  srcPath: string
  options: Record<string, any>
}

interface TransformVertex extends AbstractVertex {
  type: VertexTypes.Transform
  operand: string
  operations: Operation[]
}

interface JoinVertex extends AbstractVertex {
  type: VertexTypes.Join
  // main: string
  // other: string
  // // select * from main
  // // inner join other
  // // on
  // // main.column1 = other.column2
  // //      ^^^^^^^         ^^^^^^^
  // on: [string, string]
  joinOptions: Array<{
    one: string
    col_1: string
    other: string
    col_2: string
  }>
}

interface ExportVertex extends AbstractVertex {
  type: VertexTypes.Export
  format: DataFormat
  dstPath: string
  mode: ExportMode
  operand: string
}

type VertexContext = ImportVertex | TransformVertex | JoinVertex | ExportVertex

type VertexId = string

interface VertexToBeAdded {
  id: VertexId
  body: VertexContext
}

interface Vertex extends VertexToBeAdded {
  adjacentTo: VertexId[]
  prev: VertexId[]
}

export {
  VertexTypes,
  DataFormat,
}

export type {
  Vertex,
  VertexContext,
  ExportVertex,
  JoinVertex,
  ImportVertex,
  TransformVertex,
  VertexId,
  VertexToBeAdded,
}
