<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="ggg"
      width="35%"
      @ok="handleOk"
      @cancel="cancel"
    >
      <a-form
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 21 }"
      >
        <a-form-item label="手机号" name="phone">
          <a-input />
        </a-form-item>
        <a-form-item label="用户名" name="username">
          <a-input />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input />
        </a-form-item>
        <a-form-item label="真实姓名" name="truename">
          <a-input />
        </a-form-item>
        <a-form-item label="身份证" name="card_id">
          <a-input />
        </a-form-item>
        <a-form-item label="角色类型" name="role">
          <a-radio-group />
        </a-form-item>
        <a-form-item label="禁启用" name="status">
          <a-radio-group />
        </a-form-item>
        <a-form-item>
          <a-button class="m-r" type="primary">确定</a-button>
          <a-button class="m-r">取消</a-button>
          <a-button>重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: "ModalPro",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, contex) {
    const visible = ref(false)
    const handleOk = () => {
      contex.emit("update:show", false)
    };

    const cancel = () => {
      contex.emit("update:show", false)
    };

    watch(() => props.show, newVal => {
      visible.value = newVal
    });

    return {
      visible,
      handleOk,
      cancel
    };
  },
});
</script>