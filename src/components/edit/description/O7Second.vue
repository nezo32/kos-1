<script setup lang="ts">
import BasicTableForms from '@/components/BasicTableForms.vue'
import Textarea from '@/components/Textarea.vue'
import { KForms } from '@kosygin-rsu/components'
import { v4 as uuidv4 } from 'uuid'
import { reactive, watch } from 'vue'

const first = '80px'
const second = '400px'
const third = '380px'

type DataType = {
  key: string
  po: string
  contract: string
}

const getNewGeneral: () => DataType = () => ({
  po: '',
  contract: '',
  key: uuidv4()
})

const data = reactive<DataType[]>([getNewGeneral()])

watch(data, () => {
  data.forEach((el, ind) => {
    el.contract == '' && el.po == '' && ind != data.length - 1 ? data.splice(ind, 1) : true
  })
})
</script>

<template>
  <div class="o7">
    <section>
      <BasicTableForms>
        <template #head>
          <div class="o7__head">
            <p class="forms__text">N п/п</p>
            <p class="forms__text">Программное обеспечение</p>
            <p class="forms__text">
              Реквизиты подтверждающего документа/<br />
              Свободно распространяемое
            </p>
          </div>
        </template>
        <template #body>
          <div class="o7__body">
            <div class="o7__body__data">
              <div class="o7__body__data__content">
                <div
                  class="o7__body__data__content__inner"
                  v-for="(value, index) in data"
                  :key="value.key"
                >
                  <p class="forms__text">{{ index + 1 }}</p>
                  <Textarea v-model="value.po" />
                  <KForms v-model="value.contract" type="input" :content="[]" />
                </div>
                <div class="o7__body__data__content__add">
                  <p></p>
                  <div
                    class="o7__body__data__content__add__text"
                    @click="
                      data[data.length - 1].contract != '' && data[data.length - 1].po != ''
                        ? data.push(getNewGeneral())
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
          </div>
        </template>
      </BasicTableForms>
    </section>
  </div>
</template>

<style scoped lang="scss">
.o7 {
  display: flex;
  flex-direction: column;
  gap: 80px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
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
