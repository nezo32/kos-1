<script setup lang="ts">
import BasicTableForms from '@/components/BasicTableForms.vue'
import Textarea from '@/components/Textarea.vue'
import { KForms } from '@kosygin-rsu/components'
import { v4 as uuidv4 } from 'uuid'
import { reactive, watch } from 'vue'

const first = '80px'
const second = '400px'
const third = '400px'

type DataType = {
  name: string
  key: string
  data: {
    key: string
    code: string
    text: string
  }[]
}

const getNewGeneral: () => DataType = () => ({
  name: '',
  key: uuidv4(),
  data: reactive([{ key: uuidv4(), code: '', text: '' }])
})
const getNewInner = () => ({ code: '', text: '', key: uuidv4() })

const data = reactive<DataType[]>([getNewGeneral()])

watch(data, () => {
  data.forEach((el, ind) => {
    el.data.forEach((e, i) => {
      if (e.code == '' && e.text == '' && i != el.data.length - 1) {
        data[ind].data.splice(i, 1)
      }
    })
    if (
      el.name == '' &&
      ind != data.length - 1 &&
      el.data.every((e) => e.code == '' && e.text == '')
    ) {
      data.splice(ind, 1)
    }
  })
})
</script>

<template>
  <BasicTableForms>
    <template #head>
      <div class="resurses__head">
        <p class="forms__text">N п/п</p>
        <p class="forms__text">Наименование</p>
        <p class="forms__text">Ссылка на ресурс</p>
      </div>
    </template>
    <template #body>
      <div class="resurses__body">
        <div class="resurses__body__data" v-for="(v, i) in data" :key="v.key">
          <KForms type="input" :content="[]" v-model="v.name" />
          <div class="resurses__body__data__content">
            <div
              class="resurses__body__data__content__inner"
              v-for="(value, index) in v.data"
              :key="value.key"
            >
              <p class="forms__text">{{ index + 1 }}</p>
              <KForms v-model="value.code" type="input" :content="[]" />
              <Textarea v-model="value.text" />
            </div>
            <div class="resurses__body__data__content__add">
              <p></p>
              <div
                class="resurses__body__data__content__add__text"
                @click="
                  data[i].data[data[i].data.length - 1].code &&
                  data[i].data[data[i].data.length - 1].text
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
        <div class="resurses__body__add">
          <p></p>
          <div
            class="resurses__body__add__text"
            @click="data[data.length - 1].name ? data.push(getNewGeneral()) : true"
          >
            <span>+</span>
            Добавить профессиональный стандарт
          </div>
          <p></p>
        </div>
      </div>
    </template>
  </BasicTableForms>
</template>

<style scoped lang="scss">
.resurses {
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
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;

          color: var(--main-text);

          > * {
            box-sizing: border-box;
          }

          > :nth-child(1) {
            padding-top: 12px;
            width: v-bind(first);
          }
          > :nth-child(2) {
            width: v-bind(second);
          }

          > :nth-child(3) {
            width: v-bind(third);
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

    > * {
      box-sizing: border-box;
    }

    > :nth-child(1) {
      width: v-bind(first);
    }
    > :nth-child(2) {
      width: v-bind(second);
    }
    > :nth-child(3) {
      width: v-bind(third);
    }
  }
}
</style>
