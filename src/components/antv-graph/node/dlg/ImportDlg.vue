<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { NButton, NDrawerContent, NForm, NFormItem, NInput, NSelect, NSpace } from 'naive-ui'
import { reactive, ref } from 'vue'
import type { ImportVertex } from '~/composables'
import { DataFormat, VertexTypes } from '~/composables'

const props = defineProps<{
  data?: Partial<ImportVertex>
  label: string
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: ImportVertex): void
}>()

const DEFAULTOPTIONS = {
  [DataFormat.Csv]: {
    inferSchema: true,
    header: true,
    delimiter: ',',
  },
  [DataFormat.Db]: {},
  [DataFormat.Delta]: {},
  [DataFormat.File]: {},
}

const formRef = ref<FormInst>()
const formValue = reactive<ImportVertex>({
  type: VertexTypes.Import,
  srcPath: props.data?.srcPath || '',
  format: props.data?.format || DataFormat.Csv,
  options: props.data?.options || DEFAULTOPTIONS[DataFormat.Csv],
})

const rules: FormRules = {
  srcPath: {
    required: true,
    message: '请输入数据路径',
  },
  format: {
    required: true,
    message: '请选择类型',
  },
}

const formatOptions = Object.values(DataFormat).map(i => ({ value: i, label: i }))

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
        <NFormItem label="数据输入路径" path="srcPath">
          <NInput v-model:value="formValue.srcPath" />
        </NFormItem>
        <NFormItem label="类型" path="format">
          <NSelect v-model:value="formValue.format" :options="formatOptions" />
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
