<template>
  <PageHeader />
  <!-- Search area -->
  <div class="table-page-search-wrapper">
    <a-form :model="searchState" layout="inline" ref="formRef">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="角色类型" name="role">
            <a-select
              v-model:value="searchState.role"
              placeholder="Please enter"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="admin">超级管理员</a-select-option>
              <a-select-option value="user">用户管理员</a-select-option>
              <a-select-option value="product">产品管理员</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="选择状态" name="status">
            <a-select
              v-model:value="searchState.status"
              placeholder="Please enter"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option :value="false">禁用</a-select-option>
              <a-select-option :value="true">启用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="state.isHide">
          <a-col :md="8" :sm="24">
            <a-form-item label="关键字段" name="search_key">
              <a-select
                v-model:value="searchState.search_key"
                placeholder="Please enter"
              >
                <a-select-option value="phone">手机号</a-select-option>
                <a-select-option value="username">用户名</a-select-option>
                <a-select-option value="truename">真实姓名</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="输入字段" name="search_value">
              <a-input
                v-model:value="searchState.search_value"
                placeholder="Please enter"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input placeholder="~" />
            </a-form-item>
          </a-col>
        </template>
        <a-col :md="8" :sm="24">
          <span class="col-span">
            <a-button
              type="primary"
              :loading="state.searchLoading"
              @click="searchUserList"
              >查询</a-button
            >
            <a-button style="margin-left: 8px" @click="resetSearch"
              >重置</a-button
            >
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ state.isHide ? "收起 " : "展开" }}
              <SvgIcon
                :iconName="`${state.isHide ? 'open' : 'close'}`"
                className="openSvg"
              />
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <a-card :bordered="false" class="tab-content">
    <a-row justify="space-between" style="margin-bottom: 10px;">
      <a-col flex="80px">
        <span class="tab-title">查询表格</span>
      </a-col>
      <a-col :span="20">
        <span style="float: right;">
          <a-button class="tab-btn" type="primary" @click="state.visible = true">
            新增
          </a-button>
          <!-- :disabled="state.batchBtnDisable" -->
          <a-button danger @click="deleteUser()" >
            批量删除
          </a-button>
          <span class="tab-refresh">
            <svg-icon iconName="refresh" @click="getUserList" />
          </span>
        </span>
      </a-col>
    </a-row>
    <table-pro
      :columns="columns"
      :tabState="state.tabState"
      :tabLoading="state.tabLoading"
      @refresh="getUserList()"
      ref="tabRef"
    >
      <!-- Disable / Enable -->
      <template v-slot:status="{ info }">
        <span
          class="ant-badge-status-dot"
          :class="
            info.status === 1
              ? 'ant-badge-status-processing'
              : 'ant-badge-status-error'
          "
        />
        {{ info.status === 1 ? "启用" : "禁用" }}
      </template>
      <!-- operation -->
      <template #operation="info">
        <a-button
          size="small"
          type="link"
          @click="editFormInfo(info)"
          style="padding-left: 0"
          >编辑</a-button
        >
        <a-divider type="vertical" />
        <a-button size="small" type="link" @click="deleteUser(info)"
          >删除</a-button
        >
      </template>
    </table-pro>
      <a-pagination
        style="float: right; margin: 16px 0"
        show-quick-jumper
        v-model:current="paging.current"
        :total="paging.total"
        @change="handlerPage"
      />
  </a-card>
  <modal-pro
    v-model:show="state.visible"
    v-model:rowId="state.rowId"
    @refresh="getUserList()"
  />

</template>
<script setup>
//api
import { UserList, UserDelete, UserSwitch } from "@/api/user.js";
import ModalPro from "@/components/modalPro";
import TablePro from "@/components/tablePro";
import { reactive, ref } from '@vue/reactivity';
import PageHeader from "@/components/pageHead";

const columns = [
  {
    title: '#',
    dataIndex: 'indexes',
    key: 'indexes',
    width: 60
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    ellipsis: true
  },
  {
    title: '真实姓名',
    dataIndex: 'truename',
    key: 'truename',
    ellipsis: true
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true
  },
  {
    title: '角色类型',
    key: 'role',
    dataIndex: 'role',
    ellipsis: true
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'role',
    type: 'slot',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'role',
    type: 'slot',
    // align: "center",
    width: 220,
  },
];

const formRef = ref();
const tabRef = ref();
const state = reactive({
  tabState: [],
  isHide: false,
  visible: false,
  rowId: '',
  searchLoading: false,
  tabLoading: false,
  batchBtnDisable: true
});
const searchState = reactive({
  role: null,
  status: null,
  search_key: '',
  search_value: '',
})
const paging = reactive({
  pageSize: 10,
  page_number: 1,
  total: 0,
  current: 0
})

//请求数据
const getUserList = (params = {}) => {
  state.tabLoading = true;
  const page = { pageSize: paging.pageSize, pageNumber: paging.page_number }
  UserList({ ...page, ...params }).then(res => {
    state.tabState = res.content.data;
    paging.total = res.content.total
    state.tabLoading = false;
  }).catch(err => {
    state.tabLoading = false;
  })
};
getUserList();
//search
const searchUserList = () => {
  const reqState = Object.assign({}, searchState);
  if (reqState.search_key && reqState.search_value) {
    reqState[reqState.search_key] = reqState.search_value;
  }
  delete reqState.search_key;
  delete reqState.search_value;
  for (const key in reqState) {
    if (reqState[key] === "" || reqState[key] === null) {
      delete reqState[key]
    }
  }
  getUserList(reqState);
};
//edit
const editFormInfo = (params = {}) => {
  state.rowId = params.info.member_id;
  showModal();
};
//delete
const deleteUser = (params) => {
  tabRef.value.callDelete(params && params.info.member_id)
};
//分页
const handlerPage = (value) => {
  paging.page_number = value;
  getUserList();
};
//reset
const resetSearch = () => {
  formRef.value.resetFields();
  getUserList()
};

const toggleAdvanced = () => {
  state.isHide = !state.isHide;
};

const showModal = () => {
  state.visible = true;
};

</script>

<style lang="scss" scoped>

.table-page-search-wrapper {
  margin: 24px;
  padding: 24px 24px 0px 24px;
  background-color: #fff;
  overflow: hidden;
  .ant-row {
    display: flex;
    flex: 1;
  }
  .ant-form-inline .ant-form-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 24px;
    margin-right: 0;
  }
  .col-span {
    min-width: 192px;
    display: inline-block;
    margin-bottom: 24px;
  }
}
.tab-content {
  margin: 24px;
  .tab-title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
  }
  .tab-btn {
    margin-right: 6px;
  }
  .tab-refresh {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }

  }
}
</style>
