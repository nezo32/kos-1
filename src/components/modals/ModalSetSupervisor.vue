<script setup lang="ts">
import { KKIDButton, KCustomInput } from '@kosygin-rsu/components'
import ModalBase from './ModalBase.vue'
import { computed, ref, watch } from 'vue'

const prop = defineProps<{
  active: boolean
  selected: string
  save: boolean
}>()
const emit = defineEmits(['update:active', 'update:selected', 'update:save'])

const activeL = computed({
  get() {
    return prop.active
  },
  set(value) {
    emit('update:active', value)
  }
})

const input = computed({
  get() {
    return prop.selected
  },
  set(value) {
    emit('update:selected', value)
  }
})

watch(input, () => {
  if (error.value) error.value = false
})

const error = ref(false)
function select() {
  if (!input.value.trim()) {
    error.value = true
    return
  }
  emit('update:save', true)
}
</script>

<template>
  <ModalBase v-model:active="activeL">
    <div class="set-supervisor">
      <div class="set-supervisor__text">
        <h3 class="table-card__header">Назначение руководителя</h3>
        <div class="set-supervisor__text__input">
          <span class="text">Введите ФИО руководителя</span>
          <KCustomInput theme="ФИО" v-model="input" />
          <span class="table__action__text" v-if="error">Ошибка! Введите корректные данные</span>
        </div>
      </div>
      <div class="set-supervisor__buttons">
        <KKIDButton content="Назначить" general @click="select()" />
        <KKIDButton content="Закрыть" @click="emit('update:active', false)" />
      </div>
    </div>
  </ModalBase>
</template>

<style scoped lang="scss">
.set-supervisor {
  color: var(--main-text);

  display: flex;
  flex-direction: column;
  gap: 30px;

  &__text {
    display: flex;
    flex-direction: column;
    gap: 20px;

    > h3 {
      color: var(--elements);
      text-align: center;
    }
    &__input {
      display: flex;
      flex-direction: column;
      gap: 10px;

      > *:last-child {
        color: var(--rejected);
      }
    }
  }
  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 20px;
    > * {
      width: 100%;
    }
  }
}
</style>
