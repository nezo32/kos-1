<script setup lang="ts">
import { pagination, columnMapper } from "@/core/main";
import { KArrowFormIcon, KNewTable, KTableTypes } from "@kosygin-rsu/components";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { exportAsCSV } from "@/utils";
import Filter from "@/components/Filter.vue";
import type { Plans } from "@/types/directus";

type DataType = Array<{
  title: string;
  subtitle: string;
  headers: KTableTypes.TableHeadType<Record<string | number | symbol, string | undefined | null>>[];
  opened: boolean;
}>;

const router = useRouter();

const page = ref(1);
const data = ref<DataType>([
  {
    opened: true,
    title: "Основные образовательные программы",
    subtitle: "2023 год",
    headers: [
      /* {
        "oop.code": {
          title: "Код",
          width: "90px"
        },
        "oop.name": { title: "Направление подготовки", width: "255px" },
        "active_oop.name": { title: "Профиль", width: "255px" },
        qualification: { title: "Квалификация", width: "150px" },
        "edu_form.name": { title: "Форма", width: "140px" }
      } */
      {
        "oop.code": {
          title: "Код",
          width: "90px"
        },
        "oop.name": { title: "Направление подготовки", width: "255px" },
        "active_oop.name": { title: "Профиль", width: "255px" },
        qualification: { title: "Квалификация", width: "150px" },
        "edu_form.name": { title: "Форма", width: "140px" },
        faculty: { title: "Заполнено", width: "140px", hideOrder: true }
      }
    ]
  }
]);

function routing(ev: MouseEvent, data: any) {
  router.push("programs/" + data.id);
}

function dropdownClickHandler(v: (Plans | undefined)[]) {
  const rawHeadValues = Object.values(data.value[0].headers[0]);
  const rawHeadKeys = Object.keys(data.value[0].headers[0]);

  const head: string[] = [];
  const content: string[][] = [];

  rawHeadValues.forEach((el, i) => {
    if (i == rawHeadValues.length - 1) return;
    if (typeof el == "string") return;
    head.push(el.title);
  });

  v.forEach((el) => {
    const data: string[] = [];

    rawHeadKeys.forEach((value) => {
      if (value == "faculty") return;
      //@ts-ignore
      data.push(el[value]);
    });

    content.push(data);
  });
  exportAsCSV(head, content);
}
</script>

<template>
  <div class="home">
    <!-- <div class="home__filter">
      <KFilter placeholder="Институт" v-model="institution" :content="iDropDown" :trigger="filterTrigger" />
      <Filter placeholder="Код направления" v-model="code" style="width: 200px" />
      <KFilter placeholder="Форма" v-model="form" style="width: 180px" :content="fDropDown" :trigger="filterTrigger" />
      <KFilterResetIcon @click="filterTrigger = !filterTrigger" />
    </div> -->
    <div class="home__content">
      <template v-for="(v, i) of data" :key="i">
        <KNewTable
          @dropdownClick="dropdownClickHandler"
          @row-click="routing"
          v-model:page="page"
          style="width: 1040px !important; box-sizing: border-box"
          v-if="v.opened"
          :head="v.headers[i]"
          :title="v.title"
          :subtitle="v.subtitle"
          :pagination="pagination"
          :column-mapper="columnMapper"
        >
          <template #faculty="{ content }">
            <span :class="{ green: content == '100.0%', red: content == '0.0%' }" v-if="content && content != ''">{{
              content
            }}</span>
            <span v-else style="height: 16px"></span>
          </template>
        </KNewTable>
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
.green {
  color: var(--resolved);
}
.red {
  color: var(--rejected);
}
.home {
  .skeleton {
    height: 16px;
  }

  .table__row {
    cursor: pointer;
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
