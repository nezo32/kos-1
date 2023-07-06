<script setup lang="ts">
import { getMainView } from "@/core";
import { KFilter, KFilterResetIcon, KTable, KArrowFormIcon } from "@kosygin-rsu/components";
import { onMounted, ref, watch, shallowReactive, type Ref } from "vue";
import { useRouter } from "vue-router";
import { stringFirstToUpper } from "@/utils";

type DataType = Array<{
  title: string;
  subtitle: string;
  data: Ref<string[][]>;
  headers: string[];
  opened: boolean;
}>;

const currentPage = ref(1);

const router = useRouter();

const data = shallowReactive<DataType>([
  {
    opened: true,
    title: "Основные образовательные программы",
    subtitle: "2023 год",
    data: ref([]),
    headers: []
  }
]);

data.forEach(
  (v, i) => (data[i].headers = ["Код", "Направление подготовки", "Профиль", "Квалификация", "Форма", "Заполнено"])
);

function tableRouting(v: string[]) {
  if (!apiData.value) return;
  const found = apiData.value.find((el) => {
    if (!(el.active_oop?.name && el.oop?.code && el.title && el.qualification && el.edu_form?.name)) return false;

    const code = el.oop.code;
    const title = el.title.slice(el.title.indexOf(" ") + 1);
    const name = el.active_oop.name;
    const edu_form = el.edu_form.name.includes(" форма")
      ? el.edu_form.name.slice(0, el.edu_form.name.indexOf(" форма"))
      : el.edu_form.name;
    const qualification = stringFirstToUpper(el.qualification);

    return code == v[0] && title == v[1] && name == v[2] && qualification == v[3] && edu_form == v[4] && v[5] == "100%"
      ? true
      : false;
  });
  if (!found) return;
  router.push(`/programs/${found.id}`);
}

const count = ref(0);
const apiData = ref<Awaited<ReturnType<typeof getMainView>>["data"]>();

const sortTable = ref<{ index: number; direction: "descending" | "ascending" } | undefined>();

watch(sortTable, async (n) => {
  await displayData(n);
});

async function displayData(sort?: typeof sortTable.value) {
  // data[0].data.splice(0, data[0].data.length);

  const req = await getMainView(currentPage.value, sort);

  apiData.value = req.data;
  count.value = req.count;

  const newArr: string[][] = [];

  apiData.value?.forEach((el) => {
    newArr.push([
      el.oop?.code || "ㅤ",
      el.title ? el.title.slice(el.title.indexOf(" ") + 1) : "",
      el.active_oop?.name || "ㅤ",
      stringFirstToUpper(el.qualification || "ㅤ"),
      el.edu_form?.name
        ? el.edu_form.name.includes(" форма")
          ? el.edu_form.name.slice(0, el.edu_form.name.indexOf(" форма"))
          : el.edu_form.name
        : "",
      "100%"
    ]);
  });
  data[0].data.value = newArr;
}

const institution = ref("");
const department = ref("");
const code = ref("");
const form = ref("");

watch(currentPage, async () => {
  await displayData(sortTable.value);
});
onMounted(async () => {
  await displayData();
});
</script>

<template>
  <div class="home">
    <div class="home__filter">
      <KFilter placeholder="Институт" />
      <KFilter placeholder="Код направления" style="width: 200px" />
      <KFilter placeholder="Форма" style="width: 120px" />
      <KFilterResetIcon />
    </div>
    <div class="home__content">
      <template v-for="(v, i) of data" :key="i">
        <KTable
          v-model:col-sort="sortTable"
          v-model:current-page="currentPage"
          :routing-handler="tableRouting"
          v-if="v.opened"
          :title="v.title"
          :subtitle="v.subtitle"
          :pages="Math.ceil(count / 15)"
          :headers="v.headers"
          :content="(v.data as any)"
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
.home {
  .table__body {
    &__column {
      max-width: 230px !important;
    }
    > *:nth-child(1) {
      max-width: 90px !important;
    }
    > *:nth-child(2) {
      min-width: 230px;
    }
    > *:nth-child(3) {
      min-width: 230px;
    }
    > *:nth-child(4) {
      min-width: 230px;
    }
    > *:nth-child(5) {
      width: 136px;
      flex-grow: unset;
    }
    > *:nth-child(6) {
      max-width: unset !important;
      flex-grow: unset;
      width: 120px;
    }
  }

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
