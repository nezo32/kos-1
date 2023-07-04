<script setup lang="ts">
import BasicTableForms from '@/components/BasicTableForms.vue'
import Textarea from '@/components/Textarea.vue'
import { KForms } from '@kosygin-rsu/components'
import { v4 as uuidv4 } from 'uuid'
import { reactive, watch } from 'vue'

type DataType = {
  type: string
  docs: string
  func: string
  req: string
  key: string
  data: {
    pk: string
    key: string
    data: {
      code: string
      key: string
    }[]
  }[]
}

const getNewGeneral: () => DataType = () => ({
  type: '',
  docs: '',
  func: '',
  req: '',
  key: uuidv4(),
  data: reactive([getNewInner()])
})
const getNewInner = () => ({ key: uuidv4(), pk: '', data: reactive([getNewSmaller()]) })
const getNewSmaller = () => ({ key: uuidv4(), code: '' })

const data = reactive<DataType[]>([getNewGeneral()])

watch(data, () => {
  data.forEach((e, i) => {
    e.data.forEach((el, ind) => {
      el.data.forEach((elem, index) => {
        elem.code == '' && index != el.data.length - 1
          ? data[i].data[ind].data.splice(index, 1)
          : true
      })

      el.pk == '' && ind != e.data.length - 1 && el.data.every((v) => v.code == '')
        ? data[i].data.splice(ind, 1)
        : true
    })

    e.type == '' &&
    e.docs == '' &&
    e.func == '' &&
    e.req == '' &&
    i != data.length - 1 &&
    e.data.every((v) => v.pk == '' && v.data.every((val) => val.code == ''))
      ? data.splice(i, 1)
      : true
  })
})
</script>

<template>
  <BasicTableForms
    header="Профессиональные компетенции выпускников, установленные университетом самостоятельно на основе анализа требований к профессиональным компетенциям, предъявляемых на рынке труда, и индикаторы их достижения"
  >
    <template #head>
      <div class="tf4__head">
        <p class="forms__text">Наименование профессиональных компетенций</p>
        <p class="forms__text">
          Код и наименование индикатора достижения<br />
          профессиональной компетенции
        </p>
      </div>
    </template>
    <template #body>
      <div class="tf4__body">
        <div class="tf4__body__data" v-for="(v, i) in data" :key="v.key">
          <KForms type="input" :content="[]" v-model="v.type" />
          <Textarea v-model="v.docs" />
          <Textarea v-model="v.func" />
          <Textarea v-model="v.req" />
          <div class="tf4__body__data__content">
            <div
              class="tf4__body__data__content__inner"
              v-for="(val, ind) in v.data"
              :key="val.key"
            >
              <Textarea v-model="val.pk" />
              <div class="tf4__body__data__content__inner__right">
                <section v-for="(value, index) in val.data" :key="value.key">
                  <Textarea v-model="value.code" />
                  <div
                    class="tf4__body__data__content__inner__right__add"
                    v-if="index == val.data.length - 1"
                  >
                    <div
                      class="tf4__body__data__content__inner__right__add__text"
                      @click="
                        value.code != '' ? data[i].data[ind].data.push(getNewSmaller()) : true
                      "
                    >
                      <span>+</span>
                      Добавить ИД-ПК
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="tf4__body__data__content__add">
              <p></p>
              <div
                class="tf4__body__data__content__add__text"
                @click="
                  v.data[v.data.length - 1].pk != '' ? data[i].data.push(getNewInner()) : true
                "
              >
                <span>+</span>
                Добавить ПК
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="tf4__body__add">
          <p></p>
          <div
            class="tf4__body__add__text"
            @click="
              data[data.length - 1].docs != '' &&
              data[data.length - 1].func != '' &&
              data[data.length - 1].req != '' &&
              data[data.length - 1].type != ''
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
    </template>
  </BasicTableForms>
</template>

<style scoped lang="scss">
.tf4 {
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
