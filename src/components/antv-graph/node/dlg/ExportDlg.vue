<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NDrawerContent, NForm, NFormItem, NInput, NSelect, NSpace } from 'naive-ui'
import { reactive, ref } from 'vue'
import { DataFormat, ExportMode, type ExportVertex, VertexTypes } from '~/composables'

const props = defineProps<{
  data?: Partial<ExportVertex>
  label: string
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: ExportVertex): void
}>()

const formRef = ref<FormInst>()
const formValue = reactive<ExportVertex>({
  type: VertexTypes.Export,
  dstPath: props.data?.dstPath || '',
  format: props.data?.format || DataFormat.Delta,
  mode: props.data?.mode || ExportMode.Overwrite,
  operand: props.data?.operand || '',
})

const rules: FormRules = {
  dstPath: {
    required: true,
    message: '请输入目标路径',
  },
  format: {
    required: true,
    message: '请选择输出类型',
  },
  mode: {
    required: true,
    message: '请选择写入模式',
  },
}

const formatOptions = Object.values(DataFormat).map(i => ({ value: i, label: i }))

const modeOptions = Object.values(ExportMode).map(i => ({ value: i, label: i }))

function onConfirmClicked() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emits('save', formValue)
      closeDlg()
    }
  })
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

    <template #default>
      <NForm ref="formRef" :model="formValue" :rules="rules">
        <NFormItem label="数据输出路径" path="dstPath">
          <NInput v-model:value="formValue.dstPath" />
        </NFormItem>
        <NFormItem label="类型" path="format">
          <NSelect v-model:value="formValue.format" :options="formatOptions" />
        </NFormItem>
        <NFormItem label="输出模式" path="mode">
          <NSelect v-model:value="formValue.mode" :options="modeOptions" />
        </NFormItem>
      </NForm>
    </template>

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
