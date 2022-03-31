<template>
  <PageHeader />
  <a-row>
    <a-col :span="13">
      <a-card
        title="菜单列表"
        :bordered="false"
        style="margin: 24px 0 24px 24px"
      >
        <a-spin size="large" :spinning="state.tree_spinning">
          <a-tree
            :tree-data="state.tree_state"
            :fieldNames="{key: 'menu_id'}"
            defaultExpandAll
            showLine
          >
            <template #title="{ menu_id, menu_name_cn }">
              <span>{{ menu_name_cn }}</span>
              <span>
                <a-button type="primary" size="small" @click="handleType('edit', menu_id)" :loading="state.form_spinning">编辑</a-button>
                <a-button size="small" style="margin: 0 6px;" @click="handleType('sub_menu', menu_id)">添加</a-button>
                <a-button size="small" danger @click="handleMenuDelete(menu_id)">删除</a-button>
              </span>
            </template>
          </a-tree>
          <a-button type="primary" style="margin-top: 10px;" @click="handleType('first_menu')">添加一级菜单</a-button>
        </a-spin>
      </a-card>
    </a-col>
    <a-col :span="11">
      <a-card title="菜单信息" :bordered="false" style="margin: 24px">
        <a-spin size="large" :spinning="state.form_spinning">
          <a-form layout="vertical" :model="form_state" ref="formRef">
          <a-row :gutter="48">
            <a-col :md="12" :sm="24">
              <a-form-item label="菜单名称（中文）" name="menu_name_cn">
                <a-input v-model:value="form_state.menu_name_cn" placeholder="Please enter" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="菜单名称（英文）" name="menu_name_en">
                <a-input v-model:value="form_state.menu_name_en" placeholder="Please enter" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="Path路径" name="router_path">
                <a-input v-model:value="form_state.router_path" placeholder="Please enter" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="路由名称" name="router_name">
                <a-input v-model:value="form_state.router_name" placeholder="Please enter" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="页面路径" name="component">
                <a-input v-model:value="form_state.component" placeholder="Please enter" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="重定向" name="redirect">
                <a-input v-model:value="form_state.redirect" placeholder="Please enter" />
              </a-form-item>
            </a-col>
             <a-col :md="12" :sm="24">
              <a-form-item label="页面缓存" name="keep">
                    <a-radio-group :options="state.isOptions" v-model:value="form_state.keep" />
                </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="隐藏路由" name="hidden">
                    <a-radio-group :options="state.isOptions" v-model:value="form_state.hidden" />
                </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="禁启用" name="disabled">
                    <a-radio-group :options="state.isOptions" v-model:value="form_state.disabled" />
                </a-form-item>
            </a-col>
            <!-- <a-col :md="12" :sm="24">
              <a-form-item label="图标" name="icon">
                    <a-upload
                        v-model:file-list="form_state.icon"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <loading-outlined v-if="loading"></loading-outlined>
                            <plus-outlined v-else></plus-outlined>
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
            </a-col> -->

            <a-col :md="12" :sm="24">
              <a-form-item label="排序" name="sort" >
                <a-input-number :min="1" :max="10" v-model:value="form_state.sort" />
              </a-form-item>
            </a-col>

          </a-row>
          <a-form-item :wrapper-col="{ span: 14}">
            <a-button
              type="primary"
              :disabled="!state.menu_type"
              @click="handleFinish"
            >
              确定{{ state.menu_type === 'edit' ? '修改' : '添加' }}
            </a-button>
            <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
          </a-form-item>
          </a-form>
        </a-spin>
      </a-card>
    </a-col>
  </a-row>

</template>

<script setup>
//api
import { MenuCreate, MenuListTree, MenuDetailed, MenuUpdate, MenuRemove } from '@/api/menu.js';
import { reactive, ref, watchEffect, getCurrentInstance } from 'vue'; 
import PageHeader from "@/components/pageHead";

const { proxy } = getCurrentInstance();
const formRef = ref();
const state = reactive({
  tree_state: [],
  isOptions: [
    { label: '启用', value: '0' },
    { label: '禁用', value: '1' }
  ],
  menu_type: '',
  menu_id: 0,
  tree_spinning: false,
  form_spinning: false,
});
const form_state = reactive({
  menu_name_cn: "",
  menu_name_en: "",
  router_name: "",
  router_path: "",
  component: "",
  icon: "",
  sort: "1",
  disabled: "0",
  keep: "0",
  hidden: "0",
  redirect: "",
  lang: "en"
});

//MenuListTree
const GetMenuListTree = () => {
  state.tree_spinning = true;
  MenuListTree().then(res => {
    state.tree_state = res.content;
    state.tree_spinning = false;
  }).catch(err => {
    state.tree_spinning = false;
  })
};

GetMenuListTree();

// //MenuList 打平数据 递归Tree
// const GetMenuList = () => {
//   MenuList().then(res => {
//     const res_state = res.content;
//     formatTree(res_state);
//   })
// };

// //formatTree
// const formatTree = (params) => {
//   params.forEach(item => {
    
//   });
// };





//表单类型
const handleType = (type, menu_id) => {
  state.menu_type = type;
  menu_id && (state.menu_id = menu_id);
  resetForm();
  (type === "edit") && GetMenuDetailed();
};

//表单提交
const handleFinish = async () => {
  if(state.menu_type === 'first_menu' || state.menu_type === 'sub_menu') {
    await handleFirstMenuAdd();
  } else if (state.menu_type === 'edit') {
    await handleSubMenuEdit()
  }
  handleReset();
  GetMenuListTree();
};

//菜单添加
const handleFirstMenuAdd = () => {
  state.form_spinning = true;
  const req_state = {};
  (state.menu_type === "sub_menu") && (req_state.parent_id = state.menu_id);
  MenuCreate({...form_state, ...req_state}).then(res => {
    state.form_spinning = false;
  }).catch(err => {
    state.form_spinning = false;
  })
};

//Menu Delete
const handleMenuDelete = (id) => {
  proxy.$showConfirm({
    handleOk: () => {
      MenuRemove({menu_id: id}).then(res => {
        GetMenuListTree();
      })
    }
  });
};

//表单数据还原
const GetMenuDetailed = () => {
  state.form_spinning = true;
  MenuDetailed({menu_id: state.menu_id}).then(res => {
    const keys = Object.keys(res.content);
    for(const key in form_state) {
      if(keys.includes(key)) {
        form_state[key] = res.content[key];
      }
    }
    state.form_spinning = false;
  }).catch(err => {
    state.form_spinning = false;
  })
};

//菜单编辑
const handleSubMenuEdit = () => {
  MenuUpdate({...form_state, menu_id: state.menu_id}).then(res => {
    console.log(res)
  })
};

const handleReset = () => {
  state.menu_type = '';
  resetForm();
};

//reset
const resetForm = () => {
  formRef.value.resetFields();
};

</script>

<style lang="scss" scoped>

:deep(.ant-tree .ant-tree-treenode) {
  width: 100%;
}

:deep(.ant-tree .ant-tree-node-content-wrapper) {
  width: 100%;
}

:deep(.ant-tree-title) {
  display: flex;
  justify-content: space-between;
}

</style>