<script setup lang="ts">
import { uploadRpdFile } from "@/core";
import { KKIDButton } from "@kosygin-rsu/components";
import { ref } from "vue";

const props = defineProps<{
  disciplineFileType: string;
  disciplineId: string;
}>();

const document = ref<File | null>(null);
const fileInput = ref<HTMLInputElement>();

function dragOverHandler(ev: DragEvent) {
  ev.preventDefault();
}
function dropHandler(ev: DragEvent) {
  if (!ev.dataTransfer) return;
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        document.value = file;
      }
    });
  }
}

function addDocument() {
  if (!fileInput.value) return;
  const temp = fileInput.value.files ? (fileInput.value.files[0] ? fileInput.value.files[0] : null) : null;
  if (!temp) return;
  document.value = temp;
}

async function sendDocument() {
  if (!document.value) return;
  await uploadRpdFile(props.disciplineId, document.value, props.disciplineFileType);
}
</script>

<template>
  <div class="placeholder__document__edit">
    <div class="placeholder__document__edit__inner">
      <h5 class="table-card__header">Готовый документ</h5>
      <div class="placeholder__document__edit__inner__text" v-if="!document">
        <label @drop="dropHandler" @dragover="dragOverHandler" @change="addDocument()">
          <input type="file" ref="fileInput" accept=".pdf" />
        </label>
        <section>
          <img src="../../assets/svg/plus.svg" alt="plus" />
        </section>
        <span>Выберите файл с компьютера или перетащите </span>
      </div>
      <div class="placeholder__document__edit__inner__text" v-else>
        <label @drop="dropHandler" @dragover="dragOverHandler" @change="addDocument()">
          <input type="File" ref="fileInput" />
        </label>
        <section>
          <img src="../../assets/svg/documentReady.svg" alt="documentReady" style="padding: 10px" />
        </section>
        <span>{{ document.name }}</span>
      </div>
      <KKIDButton content="Отправить на проверку" general @click="sendDocument()" />
    </div>
    <div class="placeholder__document__edit__inner">
      <h5 class="table-card__header">Шаблон документа</h5>
      <div class="placeholder__document__edit__inner__text">
        <section>
          <img src="../../assets/svg/document.svg" alt="document" style="padding: 10px" />
        </section>
        <span>Аннотация рабочей программы дисциплины</span>
      </div>

      <KKIDButton content="Скачать файл" general />
    </div>
  </div>
</template>

<style scoped lang="scss">
.placeholder__document__edit {
  display: flex;
  flex-direction: row;
  gap: 20px;

  > * {
    width: 100%;
  }

  &__inner {
    color: var(--main-text);

    padding: 30px;
    border-radius: 20px;
    background: var(--white);

    display: flex;
    flex-direction: column;
    gap: 30px;

    &__text {
      position: relative;
      > label {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        > input {
          display: none;
        }
      }

      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      section {
        width: fit-content;
        padding: 20px;
        border-radius: 14.286px;
        background: var(--background, #f4f7fe);
      }

      > span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
      }
    }

    > *:last-child {
      width: 270px;
    }
  }
}
</style>
