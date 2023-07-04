<script setup lang="ts">
import { KHintIcon } from '@kosygin-rsu/components'

function checkInput(ev: Event) {
  const target = ev.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9+]/g, '')
}
</script>

<template>
  <div class="insert-answer">
    <div class="insert-answer__header">
      <span class="input__header">Кадровые условия реализации образовательной программы</span>
      <KHintIcon active />
    </div>
    <div class="insert-answer__field forms__text">
      Не менее
      <input @input="checkInput" type="text" maxlength="3" class="forms__text" placeholder="___" />
      процентов численности педагогических работников Университета, участвующих в реализации
      программы, и лиц, привлекаемых к реализации программы на иных условиях (исходя из количества
      замещаемых ставок, приведенного к целочисленным значениям), ведут научную, учебно-методическую
      и (или) практическую работу, соответствующую профилю преподаваемой дисциплины (модуля).
    </div>
    <div class="insert-answer__field forms__text">
      Не менее
      <input @input="checkInput" type="text" maxlength="3" class="forms__text" placeholder="___" />
      процентов численности педагогических работников Университета, участвующих в реализации
      программы, и лиц, привлекаемых к реализации программы на иных условиях (исходя из количества
      замещаемых ставок, приведенного к целочисленным значениям), являются руководителями и (или)
      работниками иных организаций, осуществляющими трудовую деятельность в профессиональной сфере,
      соответствующей профессиональной деятельности, к которой готовятся выпускники (имеют стаж
      работы в данной профессиональной сфере не менее 3 лет).
    </div>
    <div class="insert-answer__field forms__text">
      Не менее
      <input @input="checkInput" type="text" maxlength="3" class="forms__text" placeholder="___" />
      процентов численности педагогических работников Университета и лиц, привлекаемых к
      образовательной деятельности Университетом на иных условиях (исходя из количества замещаемых
      ставок, приведенного к целочисленным значениям), имеют ученую степень (в том числе ученую
      степень, полученную в иностранном государстве и признаваемую в Российской Федерации) и (или)
      ученое звание (в том числе ученое звание, полученное в иностранном государстве и признаваемое
      в Российской Федерации).
    </div>
  </div>
</template>

<style scoped lang="scss">
.insert-answer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    color: var(--elements);
  }
  &__field {
    color: var(--main-text);

    padding: 10px 15px;

    border-radius: 10px;
    border: 1px solid var(--unactive-text, #a3aed0);
    background: var(--white, #fff);

    > input {
      text-align: center;

      border: none;
      padding: 0px 5px;
      width: calc(3 * 10px);

      color: var(--elements);
      outline: none;

      &::placeholder {
        color: var(--rejected);
      }
    }
  }
}
</style>
