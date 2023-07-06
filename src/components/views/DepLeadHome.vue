<script setup lang="ts">
import { KFilter, KFilterResetIcon } from "@kosygin-rsu/components";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import { useRouter } from "vue-router";
import { getMainView } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { onMounted, ref, shallowRef } from "vue";

const router = useRouter();

const apiData = ref<Awaited<ReturnType<typeof getMainView>>["data"]>();
const data = shallowRef<string[][]>([]);

const sortTable = ref<{ index: number; direction: "descending" | "ascending" } | undefined>();
const currentPage = ref(1);
const count = ref(0);

async function displayData(sort?: typeof sortTable.value) {
  const req = await getMainView(currentPage.value, sort);

  apiData.value = req.data;
  count.value = req.count;

  const newArr: string[][] = [];

  apiData.value?.forEach((el) => {
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
      "100%",
      el.id
    ]);
  });
  data.value = newArr;
}

onMounted(() => {
  displayData();
});
</script>

<template>
  <div class="dep-lead-home">
    <div class="dep-lead-home__filter">
      <KFilter style="width: 200px" placeholder="Код направления" />
      <KFilter style="width: 120px" placeholder="Год" />
      <KFilterResetIcon />
    </div>
    <div class="dep-lead-home__content">
      <DepLeadHomeCard
        @click="router.push(`programs/${v[6]}`)"
        v-for="(v, i) of data"
        :code="v[0]"
        :name="v[1]"
        :direction="v[2]"
        :form="v[4]"
        :graduate="v[3]"
        year="2023 год"
        :filled="v[5]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dep-lead-home {
  display: flex;
  flex-direction: column;
  gap: 20px;

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

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
