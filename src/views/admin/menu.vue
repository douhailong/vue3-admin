<template>
  <div>
    <a-button type="primary" @click="showModal"
      >Open Modal with async logic</a-button
    >
    <a-modal
      title="Title"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>ssssssssss</p>
    </a-modal>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const modalText = ref('Content of the modal');
    const visible = ref(false);
    const confirmLoading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      modalText.value = 'The modal will be closed after two seconds';
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    return {
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
    };
  },
});
</script>