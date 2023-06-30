<script setup lang="ts">
import { KForms } from '@kosygin-rsu/components'
</script>

<template>
  <div class="desc-main">
    <section>
      <KForms type="dropdown" :content="[]" header="Наименование института" />
      <div class="desc-main__inner">
        <KForms type="input" :content="[]" header="Утверждено" />
        <KForms type="date" :content="[]" header="Дата утверждения" />
      </div>
      <div class="desc-main__inner">
        <KForms type="dropdown" :content="[]" header="Уровень образования " />
        <KForms type="dropdown" :content="[]" header="Код направления подготовки" />
      </div>
      <KForms type="dropdown" :content="[]" header="Наименование направления подготовки" />
      <KForms type="dropdown" :content="[]" header="Профиль" />
      <KForms type="dropdown" :content="[]" header="Форма обучения" />
      <div class="desc-main__inner">
        <KForms type="date" :content="[]" header="ОПОП разработана в соответсвии с ФГОС от" />
        <KForms type="input" :content="[]" header="№ приказа" />
      </div>
      <div class="desc-main__inner">
        <KForms type="date" :content="[]" header="Утверждена решением ученого совета от" />
        <KForms type="input" :content="[]" header="№ приказа" />
      </div>
    </section>
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="ОПОП ВО рассмотрена и одобрена на заседании кафедры "
      />
      <div class="desc-main__inner">
        <KForms type="date" :content="[]" header="Одобрена на заседании кафедры от" />
        <KForms type="input" :content="[]" header="№ протокола" />
      </div>
      <div class="desc-main__inner">
        <KForms type="dropdown" :content="[]" header="Руководитель образовательный программы" />
        <KForms type="dropdown" :content="[]" header="Заведующий кафедрой" />
      </div>
    </section>
    <section>
      <KForms
        type="input"
        :content="[]"
        header="Образовательная программа одобрена и согласована организациями/предприятиями"
      />
      <div class="desc-main__inner">
        <KForms type="dropdown" :content="[]" header="Рецензент" />
        <KForms type="date" :content="[]" header="№ протокола согласования от" />
      </div>
    </section>
    <section>
      <KForms
        type="input"
        :content="[]"
        header="Образовательная программа одобрена и согласована организациями/предприятиями"
      />
      <div class="desc-main__inner">
        <KForms type="dropdown" :content="[]" header="Рецензент" />
        <KForms type="date" :content="[]" header="№ протокола согласования от" />
      </div>
    </section>
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="Согласованно начальником Управления образовательных программ и проектов"
      />
      <KForms type="dropdown" :content="[]" header="Согласованно директором института" />
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
