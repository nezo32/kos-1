<script setup lang="ts">
import { getMainView } from '@/core'
import { KFilter, KFilterResetIcon, KTable, KArrowFormIcon } from '@kosygin-rsu/components'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { stringFirstToUpper } from '@/utils'

type DataType = Array<{
  title: string
  subtitle: string
  data: string[][]
  headers: string[]
  opened: boolean
}>

const currentPage = ref(1)

const router = useRouter()

const data = reactive<DataType>([
  {
    opened: true,
    title: 'Основные образовательные программы',
    subtitle: '2023 год',
    data: [],
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
  if (!apiData.value) return
  const found = apiData.value.find((el) => {
    if (!(el.active_oop?.name && el.oop?.code && el.title && el.qualification && el.edu_form?.name))
      return false

    const code = el.oop.code
    const title = el.title.slice(el.title.indexOf(' ') + 1)
    const name = el.active_oop.name
    const edu_form = el.edu_form.name.includes(' форма')
      ? el.edu_form.name.slice(0, el.edu_form.name.indexOf(' форма'))
      : el.edu_form.name
    const qualification = stringFirstToUpper(el.qualification)

    return code == v[0] &&
      title == v[1] &&
      name == v[2] &&
      qualification == v[3] &&
      edu_form == v[4] &&
      v[5] == '100%'
      ? true
      : false
  })
  if (!found) return
  router.push(`/programs/${found.id}`)
}

const req = await getMainView(currentPage.value)

const apiData = ref(req.data)

async function displayData() {
  data[0].data.splice(0, data[0].data.length - 1)
  apiData.value = (await getMainView(currentPage.value)).data
  apiData.value?.forEach((el) => {
    if (!(el.active_oop?.name && el.oop?.code && el.title && el.qualification && el.edu_form?.name))
      return
    data[0].data.push([
      el.oop.code,
      el.title.slice(el.title.indexOf(' ') + 1),
      el.active_oop.name,
      stringFirstToUpper(el.qualification),
      el.edu_form.name.includes(' форма')
        ? el.edu_form.name.slice(0, el.edu_form.name.indexOf(' форма'))
        : el.edu_form.name,
      '100%'
    ])
  })
}

watch(currentPage, async () => {
  displayData()
})

onMounted(() => {
  displayData()
})
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
          v-model:current-page="currentPage"
          :routing-handler="tableRouting"
          v-if="v.opened"
          :title="v.title"
          :subtitle="v.subtitle"
          :pages="Math.ceil(req.count / 15)"
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

<style lang="scss">
.table__body__column {
  max-width: 230px !important;
}

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
