<script setup lang="ts">
import BasicTableForms from "@/components/BasicTableForms.vue";
import Textarea from "@/components/Textarea.vue";
import { KForms } from "@kosygin-rsu/components";
import { v4 as uuidv4 } from "uuid";
import { reactive, watch } from "vue";

type DataType = {
  name: string;
  key: string;
  data: {
    type: string;
    key: string;
    code: string;
    text: string;
  }[];
};

const getNewGeneral: () => DataType = () => ({
  name: "",
  key: uuidv4(),
  data: reactive([{ key: uuidv4(), type: "", code: "", text: "" }])
});
const getNewInner = () => ({ code: "", type: "", text: "", key: uuidv4() });

const data = reactive<DataType[]>([getNewGeneral()]);

watch(data, () => {
  data.forEach((el, ind) => {
    el.data.forEach((e, i) => {
      if (e.code == "" && e.text == "" && e.type == "" && i != el.data.length - 1) {
        data[ind].data.splice(i, 1);
      }
    });

    if (el.name == "" && ind != data.length - 1 && el.data.every((e) => e.code == "" && e.text == "" && e.type == "")) {
      data.splice(ind, 1);
    }
  });
});
</script>

<template>
  <BasicTableForms header="Перечень основных задач профессиональной деятельности выпускников">
    <template #head>
      <div class="tf2__head">
        <p class="forms__text">
          Задачи профессиональной<br />
          деятельности
        </p>
        <p class="forms__text">Объекты профессиональной деятельности <br />(или области знания)</p>
      </div>
    </template>
    <template #body>
      <div class="tf2__body">
        <div class="tf2__body__data" v-for="(v, i) in data" :key="v.key">
          <KForms type="input" :content="[]" v-model="v.name" />
          <div class="tf2__body__data__content">
            <div class="tf2__body__data__content__inner" v-for="value in v.data" :key="value.key">
              <KForms type="input" :content="[]" v-model="value.type" />
              <section>
                <Textarea v-model="value.code" />
                <Textarea v-model="value.text" />
              </section>
            </div>
            <div class="tf2__body__data__content__add">
              <p></p>
              <div
                class="tf2__body__data__content__add__text"
                @click="
                  data[i].data[data[i].data.length - 1].code && data[i].data[data[i].data.length - 1].text
                    ? data[i].data.push(getNewInner())
                    : true
                "
              >
                <span>+</span>
                Добавить
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="tf2__body__add">
          <p></p>
          <div class="tf2__body__add__text" @click="data[data.length - 1].name ? data.push(getNewGeneral()) : true">
            <span>+</span>
            Добавить вид профессиональной деятельности
          </div>
          <p></p>
        </div>
      </div>
    </template>
  </BasicTableForms>
</template>

<style scoped lang="scss">
.tf2 {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 35px;
    &__data {
      display: flex;
      flex-direction: column;
      gap: 30px;
      &__content {
        display: flex;
        flex-direction: column;
        gap: 30px;

        &__add {
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
          &__text {
            cursor: pointer;
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

        &__inner {
          display: flex;
          flex-direction: column;
          gap: 30px;

          > section {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;

            color: var(--main-text);

            > * {
              box-sizing: border-box;
            }

            > * {
              width: calc((100% - 10px) / 2);
            }
          }
        }
      }
    }
    &__add {
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
      &__text {
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

  &__head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    > * {
      box-sizing: border-box;
    }

    > * {
      width: calc((100% - 10px) / 2);
    }
  }
}
</style>
