<script setup lang="ts">
import { KFilterIcon } from "@kosygin-rsu/components";
import { computed } from "vue";

const prop = defineProps<{
  modelValue?: string;
  placeholder: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return prop.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>

<template>
  <div class="filter">
    <input :placeholder="placeholder" type="text" class="search__text" v-model="value" />
    <KFilterIcon style="flex-shrink: 0" />
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 12px;
  border-radius: 20px;
  background: var(--background, #f4f7fe);

  > input {
    width: 100%;
    outline: none;
    border: none;
    background: none;
    color: var(--main-text);

    &::placeholder {
      color: var(--unactive-text);
    }
  }
}
</style>
