<script setup lang="ts">
import { KFilter, KFilterResetIcon, KTable, KArrowFormIcon } from '@kosygin-rsu/components'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

type DataType = Array<{
  title: string
  subtitle: string
  data: string[][]
  headers: string[]
  opened: boolean
}>

const router = useRouter()

const data = reactive<DataType>([
  {
    opened: true,
    title: 'Основные образовательные программы',
    subtitle: '2021 год',
    data: [
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%']
    ],
    headers: []
  },
  {
    opened: false,
    title: 'Основные образовательные программы',
    subtitle: '2020 год',
    data: [
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%'],
      ['38.03.04', 'Сервис', 'Фортепиано', 'Аспирант', 'Очно-заочная', '100%']
    ],
    headers: []
  }
])

data.forEach(
  (v, i) =>
    (data[i].headers = [
      'Код',
      'Направление подготовки',
      'Профиль',
      'Уровень',
      'Форма',
      'Заполнено'
    ])
)

function tableRouting(v: string[]) {
  router.push('/programs/test')
}
</script>

<template>
  <div class="home">
    <div class="home__filter">
      <KFilter placeholder="Институт" />
      <KFilter placeholder="Кафедра" style="width: 250px" />
      <KFilter placeholder="Код направления" style="width: 200px" />
      <KFilter placeholder="Форма" style="width: 120px" />
      <KFilterResetIcon />
    </div>
    <div class="home__content">
      <template v-for="(v, i) of data" :key="i">
        <KTable
          :routing-handler="tableRouting"
          v-if="v.opened"
          :title="v.title"
          :subtitle="v.subtitle"
          :pages="1"
          :headers="v.headers"
          :content="v.data"
        />
        <div class="home__content__close" v-else @click="data[i].opened = true">
          <div class="home__content__close__left">
            <p class="table__text">{{ v.subtitle }}</p>
            <h3 class="table-card__header">{{ v.title }}</h3>
          </div>
          <KArrowFormIcon :direciton="1" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__close {
      color: var(--main-text);

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      border-radius: 20px;
      background: var(--white, #fff);
      padding: 20px;

      &__left {
        display: flex;
        flex-direction: column;
        gap: 8px;
        > p {
          color: var(--unactive-text);
        }
      }
    }
  }

  &__filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    border-radius: 20px;
    background: var(--white, white);
    padding: 10px 20px;

    > * {
      flex-shrink: 0;
    }

    > *:first-child {
      flex-shrink: unset;
    }
  }
}
</style>
