<script setup lang="ts">
import type { DocumentsParts } from "@/types/directus";
import { KForms } from "@kosygin-rsu/components";
import { ref, watch, nextTick, type Ref, onMounted, onBeforeUpdate } from "vue";
import debounce from "lodash.debounce";

const prop = defineProps<{ data: DocumentsParts[] | undefined }>();

type Field = { key: string; value: string };

const emit = defineEmits<{
  (event: "changeField", data: Field, init: boolean): void;
}>();

const init = ref(true);

function createRef(key: string) {
  return ref({ key, value: "" });
}

function update(n: Field, init: boolean) {
  emit("changeField", n, init);
}

const debouncedUpdate = debounce(update, 150);

function setEvent(arr: Ref<Field>[]) {
  arr.forEach((el) => {
    watch(
      el,
      (n) => {
        debouncedUpdate(n, init.value);
      },
      { deep: true }
    );
  });
}

watch(
  () => prop.data,
  (n) => {
    n?.forEach((el) => {
      [a, b, c, d, e, f, g, h, i, j, k, l, aa, ab, ac, ad, ae, ba, bb, bc, ca, cb, cc, da, db].forEach((elem) => {
        if (elem.value.key == el.key) {
          init.value = true;
          //@ts-ignore
          elem.value.value = el.value.value as string;
        }
      });
    });
  },
  { deep: true }
);

const a = createRef("Наименование института");
const b = createRef("Утверждено");
const c = createRef("Дата утверждения");
const d = createRef("Уровень образования");
const e = createRef("Код направления подготовки");
const f = createRef("Наименование направления подготовки");
const g = createRef("Профиль");
const h = createRef("Форма обучения");
const i = createRef("ОПОП разработана в соответсвии с ФГОС от");
const j = createRef("ОПОП разработана в соответсвии с ФГОС от № приказа");
const k = createRef("Утверждена решением ученого совета от");
const l = createRef("Утверждена решением ученого совета от № приказа");
const aa = createRef("ОПОП ВО рассмотрена и одобрена на заседании кафедры");
const ab = createRef("Одобрена на заседании кафедры от");
const ac = createRef("Одобрена на заседании кафедры от № протокола");
const ad = createRef("Руководитель образовательный программы");
const ae = createRef("Заведующий кафедрой");
const ba = createRef("1 Образовательная программа одобрена и согласована организациями/предприятиями");
const bb = createRef("1 Рецензент");
const bc = createRef("1 № протокола согласования от");
const ca = createRef("2 Образовательная программа одобрена и согласована организациями/предприятиями");
const cb = createRef("2 Рецензент");
const cc = createRef("2 № протокола согласования от");
const da = createRef("Согласованно начальником Управления образовательных программ и проектов");
const db = createRef("Согласованно директором института");

onMounted(async () => {
  setEvent([a, b, c, d, e, f, g, h, i, j, k, l, aa, ab, ac, ad, ae, ba, bb, bc, ca, cb, cc, da, db]);
});

onBeforeUpdate(() => {
  init.value = false;
});
</script>

<template>
  <div class="desc-main">
    <section>
      <KForms type="dropdown" v-model="a.value" :content="['bebar']" header="Наименование института" />
      <div class="desc-main__inner">
        <KForms type="input" v-model="b.value" :content="[]" header="Утверждено" />
        <KForms type="date" v-model="c.value" :content="[]" header="Дата утверждения" />
      </div>
      <div class="desc-main__inner">
        <KForms type="dropdown" v-model="d.value" :content="[]" header="Уровень образования" />
        <KForms type="dropdown" v-model="e.value" :content="[]" header="Код направления подготовки" />
      </div>
      <KForms type="dropdown" v-model="f.value" :content="[]" header="Наименование направления подготовки" />
      <KForms type="dropdown" v-model="g.value" :content="[]" header="Профиль" />
      <KForms type="dropdown" v-model="h.value" :content="[]" header="Форма обучения" />
      <div class="desc-main__inner">
        <KForms type="date" v-model="i.value" :content="[]" header="ОПОП разработана в соответсвии с ФГОС от" />
        <KForms type="input" v-model="j.value" :content="[]" header="№ приказа" />
      </div>
      <div class="desc-main__inner">
        <KForms type="date" v-model="k.value" :content="[]" header="Утверждена решением ученого совета от" />
        <KForms type="input" v-model="l.value" :content="[]" header="№ приказа" />
      </div>
    </section>
    <section>
      <KForms
        type="dropdown"
        v-model="aa.value"
        :content="[]"
        header="ОПОП ВО рассмотрена и одобрена на заседании кафедры"
      />
      <div class="desc-main__inner">
        <KForms type="date" v-model="ab.value" :content="[]" header="Одобрена на заседании кафедры от" />
        <KForms type="input" v-model="ac.value" :content="[]" header="№ протокола" />
      </div>
      <div class="desc-main__inner">
        <KForms type="dropdown" v-model="ad.value" :content="[]" header="Руководитель образовательный программы" />
        <KForms type="dropdown" v-model="ae.value" :content="[]" header="Заведующий кафедрой" />
      </div>
    </section>
    <section>
      <KForms
        v-model="ba.value"
        type="input"
        :content="[]"
        header="Образовательная программа одобрена и согласована организациями/предприятиями"
      />
      <div class="desc-main__inner">
        <KForms v-model="bb.value" type="dropdown" :content="[]" header="Рецензент" />
        <KForms v-model="bc.value" type="date" :content="[]" header="№ протокола согласования от" />
      </div>
    </section>
    <section>
      <KForms
        v-model="ca.value"
        type="input"
        :content="[]"
        header="Образовательная программа одобрена и согласована организациями/предприятиями"
      />
      <div class="desc-main__inner">
        <KForms v-model="cb.value" type="dropdown" :content="[]" header="Рецензент" />
        <KForms v-model="cc.value" type="date" :content="[]" header="№ протокола согласования от" />
      </div>
    </section>
    <section>
      <KForms
        v-model="da.value"
        type="dropdown"
        :content="[]"
        header="Согласованно начальником Управления образовательных программ и проектов"
      />
      <KForms v-model="db.value" type="dropdown" :content="[]" header="Согласованно директором института" />
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
