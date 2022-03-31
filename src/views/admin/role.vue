<template>
  <div class="wrapper">
    <div class="item" v-for="item in arr" :key="item.index">
      <p style="textAlign: center; padding: 0 50px;">标题</p>
      <span>User {{item}}</span>
    </div>
    <!-- <div class="item">
      <UserOutlined style="fontSize: 30px;" />
      <span>User</span>
    </div> -->
  </div>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
const arr = [1,2,3,4,5,6,7,8,9,0,12,3,4,5,6,7,7]
</script>

<style>
.wrapper {
   display: flex;
   flex-wrap: wrap;
   
   /* flex-direction: column; */
   /* padding: 10px; */
   /* background-color: #001529; */
   background-color: #cecece;
}
.item {
  background-color: #fff;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>