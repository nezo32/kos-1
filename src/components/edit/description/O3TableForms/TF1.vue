<script setup lang="ts">
import BasicTableForms from '@/components/BasicTableForms.vue'
import Textarea from '@/components/Textarea.vue'
import { KForms } from '@kosygin-rsu/components'
import { v4 as uuidv4 } from 'uuid'
import { reactive, watch } from 'vue'

type DataType = {
  name: string
  uk: string
  key: string
  data: {
    key: string
    code: string
  }[]
}

const getNewGeneral: () => DataType = () => ({
  name: '',
  uk: '',
  key: uuidv4(),
  data: reactive([getNewInner()])
})
const getNewInner = () => ({ key: uuidv4(), code: '' })
/* const getNewSmaller = () => ({ key: uuidv4(), text: '' }) */

const data = reactive<DataType[]>([getNewGeneral()])

watch(data, () => {
  data.forEach((el, ind) => {
    el.data.forEach((e, i) => {
      if (e.code == '' && i != el.data.length - 1) {
        data[ind].data.splice(i, 1)
      }
    })
    if (
      el.name == '' &&
      el.uk == '' &&
      ind != data.length - 1 &&
      el.data.every((e) => e.key == '')
    ) {
      data.splice(ind, 1)
    }
  })
})
</script>

<template>
  <BasicTableForms header="Универсальные компетенции выпускников и индикаторы их достижения">
    <template #head>
      <div class="tf1__head">
        <p class="forms__text">
          Код и наименование универсальной<br />
          компетенции выпускника
        </p>
        <p class="forms__text">
          Код и наименование индикатора достижения<br />
          универсальной компетенции (ИД-УК)
        </p>
      </div>
    </template>
    <template #body>
      <div class="tf1__body">
        <div class="tf1__body__data" v-for="(v, i) in data" :key="v.key">
          <KForms type="input" :content="[]" v-model="v.name" />
          <div class="tf1__body__data__content">
            <div class="tf1__body__data__content__inner">
              <Textarea v-model="v.uk" />
              <div class="tf1__body__data__content__inner__right">
                <section v-for="(value, ind) in v.data" :key="value.key">
                  <Textarea v-model="value.code" />
                  <div
                    class="tf1__body__data__content__inner__right__add"
                    v-if="ind == v.data.length - 1"
                  >
                    <div
                      class="tf1__body__data__content__inner__right__add__text"
                      @click="value.code != '' ? data[i].data.push(getNewInner()) : true"
                    >
                      <span>+</span>
                      Добавить ИД-УК
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div class="tf1__body__add">
          <p></p>
          <div
            class="tf1__body__add__text"
            @click="data[data.length - 1].name ? data.push(getNewGeneral()) : true"
          >
            <span>+</span>
            Добавить универсальную компетецию
          </div>
          <p></p>
        </div>
      </div>
    </template>
  </BasicTableForms>
</template>

<style scoped lang="scss">
.tf1 {
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

        &__inner {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;

          color: var(--main-text);

          &__right {
            display: flex;
            flex-direction: column;
            gap: 30px;

            &__add {
              margin-top: 24px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
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
          }

          > * {
            box-sizing: border-box;
          }

          > * {
            width: calc((100% - 10px) / 2);
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
