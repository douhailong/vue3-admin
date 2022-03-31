<template>
  <a-table
    :row-selection="rowSelection" 
    :columns="columns"
    :data-source="tabState"
    :loading="tabLoading"
    :pagination="false"
    rowKey="member_id"
  >
    <template #bodyCell="{ column, record, index }">
      <!-- Serial number default true -->
      <template v-if="column.key === 'indexes'">
        {{ index + 1 }}
      </template>
      <!-- slot -->
      <template v-if="column.type === 'slot'">
        <slot :name="column.key" :info="record" />
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { UserDelete } from "@/api/user.js";
import { reactive, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const state = reactive({
  delete_id: []
});

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  tabState: {
    type: Array,
    default: () => []
  },
  indexes: {
    type: Boolean,
    drfault: true
  },
  tabLoading: {
    type: Boolean,
    drfault: false
  }
});
const emit = defineEmits(["refresh"]);

//delete
const callDelete = (value) => {
  proxy.$showConfirm({
    handleOk: () => {
      UserDelete({ member_id: value || state.delete_id }).then(res => {
        emit("refresh");
      })
    }
  });
};

const rowSelection = {
  onChange: (selectedRowKeys) => {
    state.delete_id = selectedRowKeys
  },
};

defineExpose({
  callDelete
})
</script>

