<script setup lang="ts">
import type { Graph, Node } from '@antv/x6'
import { Icon } from '@iconify/vue'
import { inject, reactive, ref } from 'vue'
import { NDrawer, NDropdown } from 'naive-ui'
import { useGraphUi } from '../stores/graph-store-ui'
import { getDownstreamNodePosition } from '../position'
import { TYPE_TO_ICON } from '../creation'
import AddNodeDropDown from './AddNodeDropDown.vue'
import { NodeStatus, STATUS_TO_ICON } from './cell-status'
import type { NodeData } from './node-data'
import ImportDlg from './dlg/ImportDlg.vue'
import ExportDlg from './dlg/ExportDlg.vue'
import JoinDlg from './dlg/JoinDlg.vue'
import { VertexTypes } from '~/composables/data-structure/dag'

// 显示添加节点的按钮
const plusActionSelected = ref(false)

// @antv/x6-vue-shape 提供的获取本节点参数的方法
const getNode = inject('getNode') as () => Node

// 当前节点的实例
const node = getNode()
// 节点 data 属性中的数据
// TODO 这个属性并没有更新
const data = reactive(node?.getData<NodeData>() || { key: VertexTypes.Import, label: '数据导入', body: {} })
const { key, label, status = NodeStatus.Default } = data

function onNodeBodyClicked() {
  plusActionSelected.value = !plusActionSelected.value
}

const { graph, createNode, createEdge } = useGraphUi()

function onAddDownStreamNode(key: VertexTypes) {
  plusActionSelected.value = false
  const pos = getDownstreamNodePosition(node, graph as Graph)
  const newNode = createNode(key, pos)!
  createEdge(node.id, newNode.id)
  plusActionSelected.value = false
}

function onMouseEnterNode() {
  const ports = node?.getPorts() || []
  ports.forEach((port) => {
    node.setPortProp(port.id!, 'attrs/circle', {
      fill: '#fff',
      stroke: '#85A5FF',
    })
  })
}

function onMouseLeaveNode() {
  const ports = node?.getPorts() || []
  ports.forEach((port) => {
    node.setPortProp(port.id!, 'attrs/circle', {
      fill: 'transparent',
      stroke: 'transparent',
    })
  })
}

// function deleteNode() {
//   graph.value?.removeNode(node.id)
// }

const EDIT_NODE_OPTIONS = [{ key: 'Edit', label: '编辑' }]

const showModal = ref(false)
function openNodeEditDialog() {
  showModal.value = true
}

function onSaveData(e: any) {
  // 将节点的数据写入到 node 当中
  node.setData({ body: e })
  data.body = e
}
</script>

<template>
  <div
    class="main-node"
    @mouseenter="onMouseEnterNode"
    @mouseleave="onMouseLeaveNode"
  >
    <div
      class="node-body"

      @click="onNodeBodyClicked"
    >
      <Icon :icon="TYPE_TO_ICON[key]" style="margin: 0 0.75rem" />
      <div class="node-label">
        {{ label }}
      </div>
      <Icon class="node-status" :icon="STATUS_TO_ICON[status].icon" :color="STATUS_TO_ICON[status].color" />
      <NDropdown trigger="click" :options="EDIT_NODE_OPTIONS" @select="openNodeEditDialog">
        <Icon icon="ic:baseline-more-vert" style="margin-right: 0.75rem" />
      </NDropdown>
    </div>
    <AddNodeDropDown
      v-if="key !== VertexTypes.Export && plusActionSelected"
      @select-changed="onAddDownStreamNode"
    >
      <Icon icon="carbon:add-alt" class="add-action" />
    </AddNodeDropDown>
    <Icon v-else icon="" class="add-action-empty" />
  </div>
  <!-- <NModal
    v-model:show="showModal"
    :title="label"
    preset="dialog"
    content="确认"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onModalPositiveClicked"
    @negative-click="onModalNegativeClicked"
  /> -->
  <NDrawer v-model:show="showModal" resizable :mask-closable="false" width="600px">
    <template v-if="key === VertexTypes.Import">
      <ImportDlg
        :id="node.id"
        :label="label" :data="data.body"
        @close="showModal = false"
        @save="onSaveData"
      />
    </template>
    <template v-else-if="key === VertexTypes.Export">
      <ExportDlg
        :id="node.id"
        :label="label" :data="data.body"
        @close="showModal = false"
        @save="onSaveData"
      />
    </template>
    <template v-else-if="key === VertexTypes.Join">
      <JoinDlg
        :id="node.id"
        :label="label"
        :data="data.body"
        @close="showModal = false"
        @save="onSaveData"
      />
    </template>
  </NDrawer>
</template>

<style scoped>
.node-body {
  width: 180px;
  height: 48px;
  box-shadow: 0 0 2px #777;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  background-color: #fff;
}
.main-node {
  display: flex;
  align-items: center;
}
.node-label {
  flex: 1;
  display: flex;
  align-items: center;
}
.node-status {
  margin-right: 0.5rem;
}
.add-action {
  margin-left: 0.75rem;
  cursor: pointer;
  background-color: #fff;
}
.add-action-empty {
  margin-left: 0.75rem;
}
</style>
../stores/graph-ui-store-old
