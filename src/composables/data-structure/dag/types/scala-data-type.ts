enum ScalaDataType {
  /** Operate with NumericOperator */
  Byte = 'Byte',
  /** Operate with NumericOperator */
  Short = 'Short',
  /** Operate with NumericOperator */
  Integer = 'Integer',
  /** Operate with NumericOperator */
  Long = 'Long',
  /** Operate with NumericOperator */
  Float = 'Float',
  /** Operate with NumericOperator */
  Double = 'Double',
  /** Operate with NumericOperator */
  Decimal = 'Decimal',
  /** Operate with StringOperator */
  String = 'String',
  /** @NotImplemented */
  Binary = 'Binary',
  /** Operate with NumericOperator */
  Boolean = 'Boolean',
  /** Operate with NumericOperator */
  Timestamp = 'Timestamp',
  /** Operate with NumericOperator */
  TimestampNTZ = 'TimestampNTZ',
  /** Operate with NumericOperator */
  Date = 'Date',
  /** Operate with NumericOperator */
  YearMonthInterval = 'YearMonthInterval',
  /** Operate with NumericOperator */
  DayTimeInterval = 'DayTimeInterval',
  /** @NotImplemented */
  Array = 'Array',
  /** @NotImplemented */
  Map = 'Map',
  /** @NotImplemented */
  Struct = 'Struct',
  /** @NotImplemented */
  StructField = 'StructField',
}

export {
  ScalaDataType,
}
