enum NodeStatus {
  Success = 'success',
  Error = 'error',
  Default = 'default',
}

const STATUS_TO_ICON = {
  [NodeStatus.Success]: {
    icon: 'carbon:checkmark-outline',
    color: '#339933',
  },
  [NodeStatus.Error]: {
    icon: 'carbon:close-outline',
    color: '#ff3333',
  },
  [NodeStatus.Default]: {
    icon: '',
    color: '',
  },
}

export {
  NodeStatus,
  STATUS_TO_ICON,
}
