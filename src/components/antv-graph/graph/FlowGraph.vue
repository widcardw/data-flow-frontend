<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NButton } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useGraphUi } from '../stores/graph-store-ui'
import { VertexTypes } from '~/composables/data-structure/dag'

const container = ref<HTMLDivElement>()
const { initGraph, createNode, centerContent, graphToJSON } = useGraphUi()

onMounted(() => {
  initGraph(container.value!)
})

function addImportNode() {
  createNode(VertexTypes.Import)
  centerContent()
}

function log() {
  console.log(graphToJSON())
}
</script>

<template>
  <div>
    <NButton @click="addImportNode">
      添加导入节点
    </NButton>
    <NButton quaternary circle title="居中视图" @click="centerContent()">
      <Icon icon="carbon:center-circle" />
    </NButton>
    <NButton @click="log">
      打印
    </NButton>
  </div>
  <div ref="container" style="{ min-width: 400px; min-height: 600px; }" />
</template>
