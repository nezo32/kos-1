<script setup lang="ts">
import type { DocumentsParts } from "@/types/directus";
import { KForms } from "@kosygin-rsu/components";
import {
  ref,
  watch,
  type Ref,
  onMounted,
  onBeforeUpdate,
  reactive,
  onUpdated,
  nextTick,
  type WatchStopHandle,
  toRefs
} from "vue";
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

function setAllWatchers() {
  const watchStopHandlers: WatchStopHandle[] = [];

  watchStopHandlers.push(...setEvent([a, b, c, d, e, f, g, h, i, j, k, l, aa, ab, ac, ad, ae, da, db]));
  watchStopHandlers.push(
    watch(
      eduProgram,
      (n) => {
        eduProgram.value.forEach((el, ind) => {
          if (el.date == "" && el.org == "" && ind != eduProgram.value.length - 1 && el.reviewer == "") {
            eduProgram.value.splice(ind, 1);
          }
        });
        const tmp = Object.assign({}, n);
        tmp.value.forEach((_, i) => {
          delete tmp.value[i].key;
        });
        debouncedUpdate({ key: tmp.key, value: JSON.stringify(tmp.value) }, true);
      },
      { deep: true }
    )
  );
  return watchStopHandlers;
}

const a = createRef("institution_name");
const b = createRef("approved_by");
const c = createRef("date_of_approval");
const d = createRef("level_of_edu");
const e = createRef("code_of_train_dir");
const f = createRef("field_of_study");
const g = createRef("profile");
const h = createRef("form_of_edu");
const i = createRef("fgos_date");
const j = createRef("fgos_order");
const k = createRef("approved_academ_council_date");
const l = createRef("approved_academ_council_order");
const aa = createRef("reviewed_approved_department_meet_by");
const ab = createRef("department_meet_date");
const ac = createRef("department_meet_order");
const ad = createRef("head_edu_program");
const ae = createRef("head_department");
const da = createRef("approved_by_head_department_edu_progs_projs");
const db = createRef("agreed_by_institute_director");

const eduProgram = reactive<{ key: string; value: { org: string; reviewer: string; date: string; key?: string }[] }>({
  key: "edu_program_org",
  value: [
    {
      org: "",
      reviewer: "",
      date: "",
      key: uuidv4()
    }
  ]
});

function setValues(n: DocumentsParts[] | DocumentsParts | undefined) {
  if (!n) return;

  const refs = [a, b, c, d, e, f, g, h, i, j, k, l, aa, ab, ac, ad, ae, da, db];

  if (n instanceof Array) {
    n?.forEach((el) => {
      refs.forEach((elem) => {
        if (elem.value.key == el.key) {
          //@ts-ignore
          elem.value.value = el.value.value as string;
        }
      });
      if (el.key == eduProgram.key) {
        eduProgram.value = el.value as any;
        eduProgram.value.forEach((_, i) => {
          eduProgram.value[i].key = uuidv4();
        });
      }
    });
  } else {
    refs.forEach((elem) => {
      if (elem.value.key == n.key) {
        //@ts-ignore
        elem.value.value = n.value.value as string;
      }
    });
    if (n.key == eduProgram.key) {
      eduProgram.value = n.value as any;
      eduProgram.value.forEach((_, i) => {
        eduProgram.value[i].key = uuidv4();
      });
    }
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
  <div class="desc-main">
    <section>
      <KForms
        type="dropdown"
        :disabled="booked"
        v-model="a.value"
        :on-work="a.key == activeField"
        :content="['bebar']"
        header="Наименование института"
      />
      <div class="desc-main__inner">
        <KForms
          :on-work="b.key == activeField"
          type="input"
          :disabled="booked"
          v-model="b.value"
          :content="[]"
          header="Утверждено"
        />
        <KForms
          :on-work="c.key == activeField"
          type="date"
          :disabled="booked"
          v-model="c.value"
          :content="[]"
          header="Дата утверждения"
        />
      </div>
      <div class="desc-main__inner">
        <KForms
          :on-work="d.key == activeField"
          type="dropdown"
          :disabled="booked"
          v-model="d.value"
          :content="[]"
          header="Уровень образования"
        />
        <KForms
          :on-work="e.key == activeField"
          type="dropdown"
          :disabled="booked"
          v-model="e.value"
          :content="[]"
          header="Код направления подготовки"
        />
      </div>
      <KForms
        :on-work="f.key == activeField"
        type="dropdown"
        :disabled="booked"
        v-model="f.value"
        :content="[]"
        header="Наименование направления подготовки"
      />
      <KForms
        :on-work="g.key == activeField"
        type="dropdown"
        :disabled="booked"
        v-model="g.value"
        :content="[]"
        header="Профиль"
      />
      <KForms
        :on-work="h.key == activeField"
        type="dropdown"
        :disabled="booked"
        v-model="h.value"
        :content="[]"
        header="Форма обучения"
      />
      <div class="desc-main__inner">
        <KForms
          :on-work="i.key == activeField"
          type="date"
          :disabled="booked"
          v-model="i.value"
          :content="[]"
          header="ОПОП разработана в соответсвии с ФГОС от"
        />
        <KForms
          :on-work="j.key == activeField"
          type="input"
          :disabled="booked"
          v-model="j.value"
          :content="[]"
          header="№ приказа"
        />
      </div>
      <div class="desc-main__inner">
        <KForms
          :on-work="k.key == activeField"
          type="date"
          :disabled="booked"
          v-model="k.value"
          :content="[]"
          header="Утверждена решением ученого совета от"
        />
        <KForms
          :on-work="l.key == activeField"
          type="input"
          :disabled="booked"
          v-model="l.value"
          :content="[]"
          header="№ приказа"
        />
      </div>
    </section>
    <section>
      <KForms
        :on-work="aa.key == activeField"
        :disabled="booked"
        type="dropdown"
        v-model="aa.value"
        :content="[]"
        header="ОПОП ВО рассмотрена и одобрена на заседании кафедры"
      />
      <div class="desc-main__inner">
        <KForms
          :on-work="ab.key == activeField"
          :disabled="booked"
          type="date"
          v-model="ab.value"
          :content="[]"
          header="Одобрена на заседании кафедры от"
        />
        <KForms
          :on-work="ac.key == activeField"
          :disabled="booked"
          type="input"
          v-model="ac.value"
          :content="[]"
          header="№ протокола"
        />
      </div>
      <div class="desc-main__inner">
        <KForms
          :on-work="ad.key == activeField"
          :disabled="booked"
          type="dropdown"
          v-model="ad.value"
          :content="[]"
          header="Руководитель образовательной программы"
        />
        <KForms
          :on-work="ae.key == activeField"
          :disabled="booked"
          type="dropdown"
          v-model="ae.value"
          :content="[]"
          header="Заведующий кафедрой"
        />
      </div>
    </section>

    <!--  -->

    <section>
      <article v-for="(v, i) of eduProgram.value" :key="v.key">
        <KForms
          :on-work="'edu_program_org' == activeField"
          :disabled="booked"
          v-model="v.org"
          type="input"
          :content="[]"
          header="Образовательная программа одобрена и согласована организациями/предприятиями"
        />
        <div class="desc-main__inner">
          <KForms
            :on-work="'edu_program_org' == activeField"
            :disabled="booked"
            v-model="v.reviewer"
            type="dropdown"
            :content="['test rewier']"
            header="Рецензент"
          />
          <KForms
            :on-work="'edu_program_org' == activeField"
            :disabled="booked"
            v-model="v.date"
            type="date"
            :content="[]"
            header="№ протокола согласования от"
          />
        </div>
      </article>
      <aside>
        <p></p>
        <span
          @click="
            eduProgram.value[eduProgram.value.length - 1].org &&
            eduProgram.value[eduProgram.value.length - 1].date &&
            eduProgram.value[eduProgram.value.length - 1].reviewer
              ? eduProgram.value.push(getNewInner())
              : true
          "
          ><span>+</span>Добавить</span
        >
        <p></p>
      </aside>
    </section>

    <!--  -->

    <section>
      <KForms
        :on-work="da.key == activeField"
        :disabled="booked"
        v-model="da.value"
        type="dropdown"
        :content="[]"
        header="Согласованно начальником Управления образовательных программ и проектов"
      />
      <KForms
        :on-work="db.key == activeField"
        :disabled="booked"
        v-model="db.value"
        type="dropdown"
        :content="[]"
        header="Согласованно директором института"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.desc-main {
  display: flex;
  flex-direction: column;
  gap: 80px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;

    > article {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    > aside {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 73px;
      > p {
        background: #016ae7;
        height: 1px;
        width: 100%;
      }
      > span {
        cursor: pointer;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 33px;
        color: var(--elements);
        font-weight: 400;
        font-size: 17px;
        line-height: normal;
        > span {
          padding: 4px 11px;
          font-size: 24px;
        }
      }
    }
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
