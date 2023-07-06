<script setup lang="ts">
defineProps<{
  code: string;
  name: string;
  direction: string;
  form: string;
  graduate: string;
  filled: string;
  year: string;
  img?: string;
}>();
</script>

<template>
  <div class="dep-lead__home__card">
    <img :src="img || '/images/placeholder.png'" alt="program" />
    <div class="dep-lead__home__card__text">
      <div class="dep-lead__home__card__text__head">
        <h3 class="table-card__header">{{ code }}</h3>
        <h3 class="table-card__header">{{ name }}</h3>
      </div>
      <div class="dep-lead__home__card__text__field">
        <span class="breadcrumbs__text">Профиль</span>
        <p class="card__text">{{ direction }}</p>
      </div>
      <div class="dep-lead__home__card__text__field">
        <span class="breadcrumbs__text">Форма обучения</span>
        <p class="card__text">{{ form }}</p>
      </div>
      <div class="dep-lead__home__card__text__field">
        <span class="breadcrumbs__text">Квалификация</span>
        <p class="card__text">{{ graduate }}</p>
      </div>
    </div>
    <div class="dep-lead__home__card__adi">
      <p class="card__text">{{ year }}</p>
      <div class="dep-lead__home__card__adi__filled">
        <span>
          <span>Документы образовательной</span>
          <span>программы заполнены на:</span>
        </span>
        <p class="card__text">{{ filled }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dep-lead__home__card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-radius: 20px;
  background: var(--white, #fff);
  padding: 20px;

  > img {
    width: 190px;
    height: 190px;
    margin-right: 40px;
  }

  &__text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: var(--main-text);
    &__field {
      > span {
        color: var(--unactive-text);
      }
    }
  }

  &__adi {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > p {
      align-self: flex-end;
      color: var(--elements);
    }
    &__filled {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;

      padding: 10px;
      border-radius: 10px;
      background: var(--background);

      box-sizing: border-box;
      width: 179px;
      height: 74px;

      > span {
        color: var(--unactive-text);
        display: flex;
        flex-direction: column;

        font-size: 10px;
        font-weight: 500;
      }
      > p {
        color: var(--main-text);
      }
    }
  }
}
</style>
