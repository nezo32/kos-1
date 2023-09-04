<script setup lang="ts">
import type { DocumentsParts } from "@/types/directus";
import { KForms } from "@kosygin-rsu/components";
import { ref, watch, type Ref, reactive, type WatchStopHandle, computed } from "vue";
import debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";

const prop = defineProps<{
  data: DocumentsParts[] | DocumentsParts | undefined;
  booked?: boolean;
  activeField?: string;
}>();

type Field = { key: string; value: string };

const emit = defineEmits<{
  (event: "changeField", data: Field, changeFullValue?: boolean): void;
}>();

function getNewInner() {
  return { org: "", reviewer: "", date: "", key: uuidv4() };
}

function createRef(key: string) {
  return ref({ key, value: "" });
}

function update(n: Field, changeFullValue?: boolean) {
  emit("changeField", n, changeFullValue);
}

const debouncedUpdate = debounce(update, 1000);

function setEvent(arr: Ref<Field>[]) {
  return arr.map((el) => {
    return watch(
      el,
      (n) => {
        debouncedUpdate(n);
      },
      { deep: true }
    );
  });
}

function setEventMulti(arr: Ref<{ key: string; value: string[] }>[]) {
  return arr.map((el) => {
    return watch(
      el,
      (n) => {
        const tmp = Array.from(n.value);
        tmp.shift();
        debouncedUpdate({ key: n.key, value: JSON.stringify(tmp) }, true);
      },
      { deep: true }
    );
  });
}

function setAllWatchers() {
  const watchStopHandlers: WatchStopHandle[] = [];

  watchStopHandlers.push(...setEvent([a, b, c, d, e, f, g, h, i, j, k]));

  watchStopHandlers.push(...setEventMulti([aa, ab]));

  return watchStopHandlers;
}

const a = createRef("o1_professional_edu_program");
const b = createRef("o1_сode_of_training_direction");
const c = createRef("o1_name_of_training_direction");
const d = createRef("o1_level_of_edu");
const e = createRef("o1_profile");
const f = createRef("o1_field_of_study");
const g = createRef("o1_profile");
const h = createRef("o1_form_of_edu");
const i = createRef("o1_scope_of_the_educational_program");
const j = createRef("o1_implementation_of_educational_programs_is_carried_out_partially_in_a_foreign_language");
const k = createRef("o1_term_of_education_under_the_educational_program");

const aa = ref<{ key: string; value: string[] }>({
  key: "o1_purpose_of_the_educational_program_is_to",
  value: []
});
const ab = ref<{ key: string; value: string[] }>({
  key: "o1_state_final_attestation_includes",
  value: []
});

function setValues(n: DocumentsParts[] | DocumentsParts | undefined) {
  if (!n) return;

  const refs = [a, b, c, d, e, f, g, h, i, j, k];
  const multiRef = [aa, ab];

  console.log(n);

  if (n instanceof Array) {
    n?.forEach((el) => {
      refs.forEach((elem) => {
        if (elem.value.key == el.key) {
          //@ts-ignore
          elem.value.value = el.value.value as string;
        }
      });
      multiRef.forEach((elem) => {
        if (elem.value.key == el.key) {
          //@ts-ignore
          elem.value.value = [null, ...(el.value as string[])];
        }
      });
    });
  } else {
    refs.forEach((elem) => {
      if (elem.value.key == n.key) {
        //@ts-ignore
        elem.value.value = n.value as string;
      }
    });
    multiRef.forEach((elem) => {
      if (elem.value.key == n.key) {
        //@ts-ignore
        elem.value.value = [null, ...(n.value as string[])];
      }
    });
  }
}

const watchers = ref<WatchStopHandle[]>([]);

watch(
  () => prop.data,
  (n) => {
    if (watchers.value.length > 0) {
      watchers.value.forEach((el) => el());
      watchers.value = [];
    }

    setValues(n);

    watchers.value = setAllWatchers();
  }
);
</script>

<template>
  <div class="o1">
    <section>
      <KForms
        :disabled="booked"
        :on-work="a.key == activeField"
        v-model="a.value"
        type="dropdown"
        :content="['test']"
        header="Основная профессиональная образовательная программа по"
      />
      <KForms
        :disabled="booked"
        :on-work="b.key == activeField"
        v-model="b.value"
        type="dropdown"
        :content="[]"
        header="Код направления подготовки"
      />
      <KForms
        :disabled="booked"
        :on-work="c.key == activeField"
        v-model="c.value"
        type="dropdown"
        :content="[]"
        header="Наименование направления подготовки"
      />
      <KForms
        :disabled="booked"
        :on-work="d.key == activeField"
        v-model="d.value"
        type="dropdown"
        :content="[]"
        header="Профиль"
      />
    </section>
    <section>
      <KForms
        v-model="aa.value"
        :disabled="booked"
        :on-work="aa.key == activeField"
        type="multi"
        :content="['a']"
        header="Целью образовательной программы является:"
      />
    </section>
    <section>
      <div class="o1__inner">
        <KForms
          :disabled="booked"
          :on-work="e.key == activeField"
          v-model="e.value"
          type="dropdown"
          :content="[]"
          header="Форма обучения"
        />
        <KForms
          :disabled="booked"
          :on-work="f.key == activeField"
          v-model="f.value"
          type="input"
          :content="[]"
          header="Объем образовательной программы составляет"
        />
      </div>
      <KForms
        :disabled="booked"
        :on-work="g.key == activeField"
        v-model="g.value"
        type="dropdown"
        :content="[]"
        header="Срок получения образования по образовательной программе"
      />
    </section>
    <section>
      <KForms
        v-model="ab.value"
        :disabled="booked"
        :on-work="ab.key == activeField"
        type="multi"
        :content="['a']"
        header="Государственная итоговая аттестация включает в себя:"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.o1 {
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
