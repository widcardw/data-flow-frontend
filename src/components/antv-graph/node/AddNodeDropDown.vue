<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { VertexTypes } from '~/composables/data-structure/dag'

const emits = defineEmits<{
  (e: 'selectChanged', value: VertexTypes): void
}>()

const createNodeOptions: DropdownMixedOption[] = [
  { label: '新增转换节点', key: VertexTypes.Transform },
  { label: '新增连接节点', key: VertexTypes.Join },
  { label: '新增导出节点', key: VertexTypes.Export },
]

function handleSelect(key: VertexTypes) {
  emits('selectChanged', key)
}
</script>

<template>
  <NDropdown
    trigger="click"
    :options="createNodeOptions"
    @select="handleSelect"
  >
    <slot />
  </NDropdown>
</template>
