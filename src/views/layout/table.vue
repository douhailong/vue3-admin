<template>
  <!-- 搜索区 -->
  <div class="table-page-search-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="规则编号">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="规则编号">
            <a-input />
          </a-form-item>
        </a-col>
        <template v-if="isHide">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input />
            </a-form-item>
          </a-col>
        </template>
        <a-col :md="8" :sm="24">
          <span class="col-span">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ isHide ? "收起 " : "展开" }}
              <SvgIcon
                :iconName="`${isHide ? 'open' : 'close'}`"
                className="openSvg"
              />
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <!-- 表格 -->
  <a-card :bordered="false" style="margin-top: 15px">
    <a-row >
      <a-col flex="100px">
        <div  class="ant-pro-table-list-toolbar-title">查询表格</div>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
      <template #indexes="{ index }">
        {{ index + 1 }}
      </template>
      <template #status="{ text }">
        <span>
          <span class="ant-badge-status-dot" :class="text.status === 1 ? 'ant-badge-status-processing' : 'ant-badge-status-error'"></span>
          {{ text.status === 1 ? '启用' : '禁用' }}
        </span>
      </template>
      <template #operation>
        <!-- <a-button size="small" type="link">详情</a-button> -->
        <!-- <a-divider type="vertical" /> -->
        <a-button size="small" type="link" @click="showModal">编辑</a-button>
        <a-divider type="vertical" />
        <a-button size="small" type="link">删除</a-button>
      </template>
    </a-table>
  </a-card>
  <!-- 弹窗 -->
  <ModalPro v-model:show="visible" />
</template>
<script>
import {GetCode} from "@/api/user.js"
import ModalPro from "@/components/modalPro"
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, toRefs } from 'vue';
const columns = [
  {
    title: '#',
    dataIndex: 'indexes',
    key: 'indexes',
    slots: {
      customRender: 'indexes',
    }
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '真实姓名',
    dataIndex: 'truename',
    key: 'truename',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '角色类型',
    key: 'role',
    dataIndex: 'role',
  },
  {
    title: '状态',
    key: 'status',
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '操作',
    key: 'operation',
    // align: "center",
    width: 150,
    slots: {
      customRender: 'operation',
    },
  },

];
const data = [
  {
    key: '1',
    username: 'zhen',
    truename: '真',
    phone: '133......',
    role: 'admin',
    status: 1
  },
  {
    key: '2',
    username: 'zhen',
    truename: '真',
    phone: '133......',
    role: 'admin',
    status: 2
  },
  {
    key: '3',
    username: 'zhen',
    truename: '真',
    phone: '133......',
    role: 'admin',
    status: 2
  },
  {
    key: '4',
    username: 'zhen',
    truename: '真',
    phone: '133......',
    role: 'admin',
    status: 1
  }
];
export default defineComponent({
  setup(props,ctx) {
    console.log(ctx)
    const visible = ref(false);
    const formState = reactive({
      isHide: false
    });
    const toggleAdvanced = () => {
      formState.isHide = !formState.isHide
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    }
    const showModal = () => {
      visible.value = true;
    };
    return {
      visible,
      showModal,
      ...toRefs(formState),
      toggleAdvanced,
      columns,
      data,
      rowSelection,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
    ModalPro
  },
});
</script>
<style lang="scss" scoped>
.table-page-search-wrapper {
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
</style>