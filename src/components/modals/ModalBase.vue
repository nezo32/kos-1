<template>
  <Teleport to="body">
    <div class="modal" ref="outerModal">
      <div class="modal-inner">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { KDetectOutsideElement } from '@kosygin-rsu/components'

defineProps<{
  active: boolean
}>()
const emit = defineEmits(['update:active'])

const outerModal = ref()

KDetectOutsideElement(outerModal, () => {
  emit('update:active', false)
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.body.style.marginRight = '5px'
})
onUnmounted(() => {
  document.body.style.overflow = 'auto'
  document.body.style.marginRight = '0px'
})
</script>

<style lang="scss">
.modal-inner {
  box-sizing: border-box;
  width: 460px;

  cursor: default;

  position: relative;

  background: #ffffff;
  box-shadow: 1px 2px 20px -2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;

  & > * {
    max-height: calc(100vh - 130px);
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: white;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--unactive-text);
      border-radius: 5px;
    }
  }
}
</style>
