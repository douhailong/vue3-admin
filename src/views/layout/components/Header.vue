<template>
  <span id="headerTrigger" @click="headerTrigger">
    <svg-icon :iconName="`${trigger ? 'asideClose' : 'asideOpen'}`" />
  </span>
  <svg-icon iconName="refresh" />
</template>

<script setup>
import { watch, ref } from "vue";

const trigger = ref(true);
const headerTrigger = () => {
  trigger.value = !trigger.value;
  trigger.value ? document.getElementsByTagName('body')[0].style.setProperty('--tWidth', '250px') :
    document.getElementsByTagName('body')[0].style.setProperty('--tWidth', '80px');
};
</script>

<style lang="scss" scoped>
#headerTrigger {
  display: inline-block;
  height: 100%;
  width: $heights;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
}
</style>
