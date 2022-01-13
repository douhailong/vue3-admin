<template>
  <PageHeader />
  <div class="content">
    <Table />
    <router-view />
  </div>
</template>

<script>
import Table from "../table.vue"
import PageHeader from "@/components/PageHeader.vue"
export default {
  name: "Content",
  components: {
    PageHeader,
    Table
  },
}
</script>

<style lang="scss" scoped>
.content {
  margin: 20px;
}
.content-fotter {
  text-align: center;
  padding-bottom: 20px;
}
</style>