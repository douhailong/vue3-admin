<template>
  <a-page-header title="查询表格" :breadcrumb="{ routes }" />
</template>
<script setup>
const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: '列表页',
  },
  {
    path: 'second',
    breadcrumbName: '查询表格',
  },
];
</script>
<style lang="scss" scoped>
.ant-page-header {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background-color: #fff;
}
</style>
