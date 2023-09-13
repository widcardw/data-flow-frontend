import type { ScalaDataType } from './scala-data-type'
import type { TransformOperationTypes } from './transform'

enum NumericOperator {
  Equal = 'Equal',
  NotEqual = 'NotEqual',
  Greater = 'Greater',
  Less = 'Less',
  GreaterEqual = 'GreaterEqual',
  LessEqual = 'LessEqual',
  IsNull = 'IsNull',
  IsNaN = 'IsNaN',
}

interface AbstractTransformOperation {
  type: TransformOperationTypes
}

interface OperationFilter extends AbstractTransformOperation {
  type: TransformOperationTypes.Filter
  column: string
  dataType: ScalaDataType
  operator: NumericOperator
  value: string
}

interface OperationRename extends AbstractTransformOperation {
  type: TransformOperationTypes.Rename
  src: string
  dst: string
}

interface OperationDelete extends AbstractTransformOperation {
  type: TransformOperationTypes.Delete
  columns: string[]
}

interface OperationMerge extends AbstractTransformOperation {
  type: TransformOperationTypes.Merge
  column_1: string
  column_2: string
  dst: string
  prefix: string
  suffix: string
  delimiter: string
}

interface OperationSplit extends AbstractTransformOperation {
  type: TransformOperationTypes.Split
  column: string
  delimiter: string
}

interface OperationCast extends AbstractTransformOperation {
  type: TransformOperationTypes.Cast
  column: string
  newType: ScalaDataType
}

type Operation = OperationCast | OperationDelete | OperationFilter | OperationMerge | OperationMerge | OperationRename | OperationSplit

export {
  NumericOperator,
}

export type {
  Operation,
  OperationCast,
  OperationDelete,
  OperationFilter,
  OperationMerge,
  OperationRename,
  OperationSplit,
}
