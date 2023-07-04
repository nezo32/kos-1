<script setup lang="ts">
import BasicTableForms from '@/components/BasicTableForms.vue'
import Textarea from '@/components/Textarea.vue'
import { KForms } from '@kosygin-rsu/components'
import { v4 as uuidv4 } from 'uuid'
import { reactive, watch } from 'vue'

type DataType = {
  type: string
  name: string
  key: string
  dataOTF: {
    key: string
    otf: string
    data: {
      code: string
      key: string
    }[]
  }[]
  dataPK: {
    key: string
    pk: string
    data: {
      code: string
      key: string
    }[]
  }[]
}

const getNewGeneral: () => DataType = () => ({
  type: '',
  name: '',
  key: uuidv4(),
  dataOTF: reactive([getNewOTF()]),
  dataPK: reactive([getNewPK()])
})
const getNewPK = () => ({ key: uuidv4(), pk: '', data: reactive([getNewSmaller()]) })
const getNewOTF = () => ({ key: uuidv4(), otf: '', data: reactive([getNewSmaller()]) })
const getNewSmaller = () => ({ key: uuidv4(), code: '' })

const data = reactive<DataType[]>([getNewGeneral()])

watch(data, () => {
  data.forEach((e, i) => {
    e.dataOTF.forEach((el, ind) => {
      el.data.forEach((elem, inde) => {
        elem.code == '' && inde != el.data.length - 1
          ? data[i].dataOTF[ind].data.splice(inde, 1)
          : true
      })
      el.otf == '' && ind != e.dataOTF.length - 1 && el.data.every((v) => v.code == '')
        ? data[i].dataOTF.splice(ind, 1)
        : true
    })

    e.dataPK.forEach((el, ind) => {
      el.data.forEach((elem, inde) => {
        elem.code == '' && inde != el.data.length - 1
          ? data[i].dataPK[ind].data.splice(inde, 1)
          : true
      })
      el.pk == '' && ind != e.dataPK.length - 1 && el.data.every((v) => v.code == '')
        ? data[i].dataPK.splice(ind, 1)
        : true
    })

    i != data.length - 1 &&
    e.name == '' &&
    e.type == '' &&
    e.dataOTF.every((v) => v.otf == '' && v.data.every((val) => val.code == '')) &&
    e.dataPK.every((v) => v.pk == '' && v.data.every((val) => val.code == ''))
      ? data.splice(i, 1)
      : true
  })
})
</script>

<template>
  <BasicTableForms
    header="Профессиональные компетенции выпускников, установленные университетом самостоятельно на основе профессиональных стандартов, и индикаторы их достижения"
  >
    <template #head>
      <div class="tf3__head">
        <p class="forms__text">
          Код, наименование и уровень квалификации ОТФ на<br />
          которые ориентирована образовательная программа
        </p>
        <p class="forms__text">
          Код и наименование ТФ на которые ориентирована<br />
          образовательная программа
        </p>
      </div>
    </template>
    <template #body>
      <div class="tf3__body">
        <div class="tf3__body__data" v-for="(v, i) in data" :key="v.key">
          <KForms type="input" :content="[]" v-model="v.name" />
          <KForms type="input" :content="[]" v-model="v.type" />
          <div class="tf3__body__data__content">
            <div
              class="tf3__body__data__content__inner"
              v-for="(val, ind) in v.dataOTF"
              :key="val.key"
            >
              <Textarea v-model="val.otf" />
              <div class="tf3__body__data__content__inner__right">
                <section v-for="(value, index) in val.data" :key="value.key">
                  <Textarea v-model="value.code" />
                  <div
                    class="tf3__body__data__content__inner__right__add"
                    v-if="index == val.data.length - 1"
                  >
                    <div
                      class="tf3__body__data__content__inner__right__add__text"
                      @click="
                        value.code != '' ? data[i].dataOTF[ind].data.push(getNewSmaller()) : true
                      "
                    >
                      <span>+</span>
                      Добавить ТФ
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="tf3__body__data__content__add">
              <p></p>
              <div
                class="tf3__body__data__content__add__text"
                @click="
                  v.dataOTF[v.dataOTF.length - 1].otf != ''
                    ? data[i].dataOTF.push(getNewOTF())
                    : true
                "
              >
                <span>+</span>
                Добавить ОТФ
              </div>
              <p></p>
            </div>
          </div>
          <div class="tf3__body__data__content">
            <div
              class="tf3__body__data__content__inner"
              v-for="(val, ind) in v.dataPK"
              :key="val.key"
            >
              <Textarea v-model="val.pk" />
              <div class="tf3__body__data__content__inner__right">
                <section v-for="(value, index) in val.data" :key="value.key">
                  <Textarea v-model="value.code" />
                  <div
                    class="tf3__body__data__content__inner__right__add"
                    v-if="index == val.data.length - 1"
                  >
                    <div
                      class="tf3__body__data__content__inner__right__add__text"
                      @click="
                        value.code != '' ? data[i].dataPK[ind].data.push(getNewSmaller()) : true
                      "
                    >
                      <span>+</span>
                      Добавить ИД-ПК
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="tf3__body__data__content__add">
              <p></p>
              <div
                class="tf3__body__data__content__add__text"
                @click="
                  v.dataPK[v.dataPK.length - 1].pk != '' ? data[i].dataPK.push(getNewPK()) : true
                "
              >
                <span>+</span>
                Добавить ПК
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="tf3__body__add">
          <p></p>
          <div
            class="tf3__body__add__text"
            @click="data[data.length - 1].name ? data.push(getNewGeneral()) : true"
          >
            <span>+</span>
            Добавить
          </div>
          <p></p>
        </div>
      </div>
    </template>
  </BasicTableForms>
</template>

<style scoped lang="scss">
.tf3 {
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
