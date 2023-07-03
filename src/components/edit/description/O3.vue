<script setup lang="ts">
import TF1 from './O3TableForms/TF1.vue'
import TF2 from './O3TableForms/TF2.vue'
import TF3 from './O3TableForms/TF3.vue'
import TF4 from './O3TableForms/TF4.vue'
</script>

<template>
  <div class="o3">
    <section>
      <TF1 />
    </section>
    <section>
      <TF2 />
    </section>
    <section>
      <TF3 />
    </section>
    <section>
      <TF4 />
    </section>
  </div>
</template>

<style scoped lang="scss">
.o3 {
  display: flex;
  flex-direction: column;
  gap: 80px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__inner {
    display: flex;
    flex-direction: row;
    gap: 20px;
    > * {
      width: 100%;
    }
  }
}
</style>
