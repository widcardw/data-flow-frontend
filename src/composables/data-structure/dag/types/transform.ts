enum TransformOperationTypes {
  Filter = 'Filter',
  Rename = 'Rename',
  Delete = 'Delete',
  Merge = 'Merge',
  Split = 'Split',
  Cast = 'Cast',
}

enum ExportMode {
  Append = 'append',
  Overwrite = 'overwrite',
  Error = 'error',
  ErrorIfExists = 'errorifexists',
  Ignore = 'ignore',
}

export {
  TransformOperationTypes,
  ExportMode,
}
