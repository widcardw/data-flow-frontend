<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import type { VertexTypes } from '~/composables/data-structure/dag'

const emits = defineEmits<{
  (e: 'selectChanged', value: VertexTypes): void
}>()

function handleSelect(key: VertexTypes) {
  emits('selectChanged', key)
}

const NODE_OPTIONS: DropdownMixedOption[] = [
  { key: 'Delete', label: '删除' },
]
</script>

<template>
  <NDropdown
    trigger="click"
    :options="NODE_OPTIONS"
    @select="handleSelect"
  >
    <slot />
  </NDropdown>
</template>
