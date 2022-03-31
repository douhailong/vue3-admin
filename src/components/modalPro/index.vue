<template>
  <div>
    <a-modal
      v-model:visible="state.visible"
      :title="rowId ? '编辑' : '新增'"
      width="40%"
      @ok="handleOk"
      @cancel="cancel"
      :confirm-loading="state.confirmLoading"
    >
      <a-form :model="form_state" layout="vertical" ref="formRef">
        <a-form-item label="手机号" name="phone">
          <a-input
            v-model:value="form_state.phone"
            placeholder="Please enter your mobile phone number"
          />
        </a-form-item>
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="form_state.username"
            placeholder="Please enter one user name"
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            v-model:value="form_state.password"
            placeholder="Please input a password"
          />
        </a-form-item>
        <a-form-item label="真实姓名" name="truename">
          <a-input
            v-model:value="form_state.truename"
            placeholder="Please enter your real name"
          />
        </a-form-item>
        <a-form-item label="身份证" name="card_id">
          <a-input
            v-model:value="form_state.card_id"
            placeholder="Please enter your ID number"
          />
        </a-form-item>
        <a-form-item label="角色类型" name="role">
          <a-radio-group
            :options="roleOptions"
            v-model:value="form_state.role"
          />
        </a-form-item>
        <a-form-item label="禁启用" name="status">
          <a-radio-group
            :options="isOptions"
            v-model:value="form_state.status"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>

import { UserCreate, UserInfo, UserUpdate } from "@/api/user.js";
import md5 from "js-md5";
import { message } from "ant-design-vue";
import { reactive, ref, watch } from 'vue';

const roleOptions = [
  { label: "超级管理员", value: "admin" },
  { label: "产品管理员", value: "product" },
  { label: "用户管理员", value: "user" },
];
const isOptions = [
  { label: "启用", value: true },
  { label: "禁用", value: false },
];

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  rowId: {
    type: [Number, String],
    default: ""
  }
});

const emit = defineEmits(["update:show", "update:rowId", "refresh"]);

const formRef = ref();
const state = reactive({
  confirmLoading: false,
  visible: false
});
const form_state = reactive({
  username: "",
  truename: "",
  phone: "",
  password: "",
  card_id: "",
  role: "admin",
  status: true
})


const handleOk = async() => {
  props.rowId ? await editUser() : await addUser();
  closeModal();
  resetForm();
  refresh();
};

//edit
const editUser = () => {
  state.confirmLoading = true;
  const reqState = Object.assign({}, form_state);
  reqState.password === "" ?
    delete reqState.password :
    reqState.password = md5(reqState.password);
  UserUpdate({ ...reqState, member_id: props.rowId }).then(res => {
    message.success(res.msg);
    state.confirmLoading = false;
  }).catch(err => {
    state.confirmLoading = false;
  });
};

//add
const addUser = () => {
  state.confirmLoading = true;
  const reqState = Object.assign({}, form_state);
  reqState.password = md5(reqState.password);
  UserCreate(reqState).then(res => {
    res.content.user ? message.success(res.msg) : message.error(res.msg);
    state.confirmLoading = false;
  }).catch(err => {
    state.confirmLoading = false;
  });
};

//获取Info
const getUserInfo = () => {
  UserInfo({ member_id: props.rowId }).then(res => {
    res.content.status = res.content.status === 1 ? true : false;
    const keys = Object.keys(res.content);
    for (const key in form_state) {
      if (keys.includes(key)) {
        form_state[key] = res.content[key];
      }
    }
  });
};

const cancel = () => {
  closeModal();
  resetForm();
};

//关闭Modal
const closeModal = () => {
  emit("update:show", false);
  emit("update:rowId", '');
};

//刷新
const refresh = () => {
  emit("refresh");
};

//清除
const resetForm = () => {
  formRef.value.resetFields();
};

watch(() => props.show, newVal => {
  state.visible = newVal;
  newVal && props.rowId && getUserInfo();
});

</script>