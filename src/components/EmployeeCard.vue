<script setup lang="ts">
import { KFilterResetIcon } from "@kosygin-rsu/components";

const img = undefined;

defineProps<{
  name?: string;
  who?: string;
  institution?: string;
  department?: string;
  post?: string;
  edu_post?: string;
  edu_grade?: string;
}>();
</script>

<template>
  <div class="employee__card">
    <div class="employee__card__upper">
      <img :src="img || '/images/placeholder.png'" alt="pfp" />
      <div class="employee__card__upper__text">
        <span class="breadcrumbs__text">{{ who || "Руководитель ОПОП" }}</span>
        <h4 class="table-card__header">{{ name || "Косолапов Эдуард Вашльшмахович" }}</h4>
        <p class="card__text">{{ institution || "Институт мехатроники и информационных технологий" }}</p>
      </div>
      <KFilterResetIcon style="flex-shrink: 0" />
    </div>
    <div class="employee__card__lower">
      <div class="employee__card__lower__wrapper">
        <span class="breadcrumbs__text">Кафедра</span>
        <p class="card__text">{{ department || "Автоматики и промышленной электроники" }}</p>
      </div>
      <div class="employee__card__lower__wrapper">
        <span class="breadcrumbs__text">Должность</span>
        <p class="card__text">{{ post || "Старший преподователь" }}</p>
      </div>
      <section>
        <div class="employee__card__lower__wrapper">
          <span class="breadcrumbs__text">Ученое звание</span>
          <p class="card__text">{{ edu_post || "Профессор" }}</p>
        </div>
        <div class="employee__card__lower__wrapper">
          <span class="breadcrumbs__text">Ученая степерь</span>
          <p class="card__text">{{ edu_grade || "Доктор наук" }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.employee__card {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
  border-radius: 20px;
  background: var(--white);
  color: var(--main-text);

  &__upper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    > img {
      width: 124px;
      height: 124px;
    }
    &__text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      > span {
        color: var(--unactive-text);
      }
    }
  }
  &__lower {
    display: flex;
    flex-direction: column;
    gap: 15px;
    &__wrapper {
      > span {
        color: var(--unactive-text);
      }
    }

    > section {
      display: flex;
      flex-direction: row;
      gap: 36px;
    }
  }
}
</style>
