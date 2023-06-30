<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  placeholder?: string
  modelValue?: string
}>()
const emit = defineEmits(['update:modelValue'])

const cmpt = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const textarea = ref<HTMLTextAreaElement>()

function grow() {
  if (!textarea.value) return
  textarea.value.style.height = '25px'
  textarea.value.style.height = textarea.value.scrollHeight + 'px'
}

onMounted(() => {
  if (!textarea.value) return
  textarea.value.style.height = '25px'
})
</script>

<template>
  <div class="textarea">
    <textarea
      @input="grow()"
      v-model="cmpt"
      class="forms__text"
      ref="textarea"
      :placeholder="placeholder || 'Placeholder'"
    />
  </div>
</template>

<style scoped lang="scss">
.textarea {
  padding: 12px 15px 9px 15px;
  border-radius: 10px;
  border: 1px solid var(--unactive-text, #a3aed0);
  background: var(--white, #fff);
  > textarea {
    padding: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    outline: none;
    resize: none;
    border: none;
    color: var(--main-text);
    width: calc(100% - 8px);
    &::placeholder {
      color: var(--unactive-text);
    }
  }
}
</style>
