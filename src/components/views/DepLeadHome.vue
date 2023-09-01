<script setup lang="ts">
import { KFilter, KFilterResetIcon, KPageSwitcher } from "@kosygin-rsu/components";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import { useRouter } from "vue-router";
import { db, getMainView, type FilterObject } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { onMounted, ref, shallowRef, watch } from "vue";
import { readItems } from "@directus/sdk";

const router = useRouter();

const apiData = ref<Awaited<ReturnType<typeof getMainView>>["data"]>();
const data = shallowRef<string[][]>([]);

const sortTable = ref<{ index: number; direction: "descending" | "ascending" } | undefined>();
const currentPage = ref(1);
const count = ref(0);

watch(currentPage, async () => {
  await displayData();
});

const codeFilter = ref<string>();
const codeDD = ref();

watch(codeFilter, async (n) => {
  await displayData({ code: n });
});

async function displayData(filter?: FilterObject) {
  const req = await getMainView(currentPage.value, { index: 0, direction: "ascending" }, filter);

  apiData.value = req.data;
  count.value = Math.ceil(req.count / 15);

  const newArr: string[][] = [];

  apiData.value?.forEach(async (el) => {
    newArr.push([
      el.oop?.code || "",
      el.title ? el.title.slice(el.title.indexOf(" ") + 1) : "",
      el.active_oop?.name || "",
      stringFirstToUpper(el.qualification || ""),
      el.edu_form?.name
        ? el.edu_form.name.includes(" форма")
          ? el.edu_form.name.slice(0, el.edu_form.name.indexOf(" форма"))
          : el.edu_form.name
        : "",
      "",
      el.id,
      el.oop!.id
    ]);
  });
  data.value = newArr;
}

onMounted(async () => {
  codeDD.value =
    (
      await db.request(
        readItems("plans", {
          //@ts-ignore
          fields: ["oop.code"],
          //@ts-ignore
          sort: ["oop.code"]
        })
      )
    )
      ?.map((el) => el.oop?.code || "")
      .filter((value, index, arr) => arr.indexOf(value) === index) ?? [];
  await displayData();
});
</script>

<template>
  <div class="dep-lead-home">
    <div class="dep-lead-home__inner">
      <div class="dep-lead-home__inner__page">
        <KPageSwitcher :count-pages="count" v-model:current-page="currentPage" />
      </div>
      <div class="dep-lead-home__inner__filter">
        <KFilter style="width: 200px" placeholder="Код направления" v-model="codeFilter" :content="codeDD" />
        <KFilter style="width: 120px" placeholder="Год" />
        <KFilterResetIcon />
      </div>
    </div>
    <div class="dep-lead-home__content">
      <DepLeadHomeCard
        style="cursor: pointer"
        @click="router.push(`programs/${v[6]}`)"
        v-for="(v, i) of data"
        :code="v[0]"
        :name="v[1]"
        :direction="v[2]"
        :form="v[4]"
        :graduate="v[3]"
        year="2023 год"
        :id="v[6]"
        :oopid="v[7]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dep-lead-home {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__filter {
      width: fit-content;
      align-self: flex-end;

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

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
