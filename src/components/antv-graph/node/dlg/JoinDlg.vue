<script setup lang="ts">
import { NButton, NDrawerContent, NInput, NInputGroup, NInputGroupLabel, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { useGraphUi } from '../../stores/graph-store-ui'
import { type JoinVertex, VertexTypes } from '~/composables'

const props = defineProps<{
  id: string
  label: string
  data?: Partial<JoinVertex>
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: JoinVertex): void
}>()

const { getInstantParents, getNodeLabel } = useGraphUi()

function closeDlg() {
  emits('close')
}

const formValue = ref(props.data?.joinOptions || [])

const incomingEdges = getInstantParents(props.id)
const parentNodesIds = ref(incomingEdges?.map(i => i.data.source) || [])

const col_1 = ref(props.data?.joinOptions?.[0].col_1 || '')

if (formValue.value.length <= 0) {
  for (const n of parentNodesIds.value.slice(1)) {
    formValue.value.push({
      one: parentNodesIds.value[0],
      other: n,
      col_1: '',
      col_2: '',
    })
  }
}

function onConfirm() {
  for (let i = 0; i < formValue.value.length; i++)
    formValue.value[i].col_1 = col_1.value

  // console.log(formValue.value)
  emits('save', {
    type: VertexTypes.Join,
    joinOptions: formValue.value,
  })
  closeDlg()
}
</script>

<template>
  <NDrawerContent>
    <template #header>
      {{ label }}
    </template>
    <NSpace vertical>
      <div>主节点</div>
      <NInputGroup>
        <NInputGroupLabel>{{ getNodeLabel(parentNodesIds[0]) }}</NInputGroupLabel>
        <NInput v-model:value="col_1" placeholder="列名" />
      </NInputGroup>
      <div>从节点</div>
      <template v-for="i in formValue.length" :key="i">
        <NInputGroup>
          <NInputGroupLabel>{{ getNodeLabel(formValue[i - 1].other) }}</NInputGroupLabel>
          <NInput v-model:value="formValue[i - 1].col_2" placeholder="列名" />
        </NInputGroup>
      </template>
    </NSpace>
    <template #footer>
      <NSpace>
        <NButton @click="closeDlg">
          取消
        </NButton>
        <NButton type="primary" @click="onConfirm">
          确认
        </NButton>
      </NSpace>
    </template>
  </NDrawerContent>
</template>
