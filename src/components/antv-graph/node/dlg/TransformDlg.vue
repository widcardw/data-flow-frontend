<script setup lang="ts">
import { NButton, NDrawerContent, NSpace } from 'naive-ui'
import type { TransformVertex } from '~/composables'

const props = defineProps<{
  data?: Partial<TransformVertex>
  label: string
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: TransformVertex): void
}>()

function onConfirmClicked() {

}

function closeDlg() {
  emits('close')
}
</script>

<template>
  <NDrawerContent>
    <template #header>
      {{ label }}
    </template>
    <!-- 这里需要有 Transform 的一系列算子 -->

    <template #footer>
      <NSpace>
        <NButton @click="closeDlg">
          取消
        </NButton>
        <NButton type="primary" @click="onConfirmClicked">
          确认
        </NButton>
      </NSpace>
    </template>
  </NDrawerContent>
</template>
