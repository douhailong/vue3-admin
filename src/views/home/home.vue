<template>
  <p @click="change">{{ name }}</p>
</template>
<script setup>
const props = defineProps({
  name: String
})
let emit = defineEmits(['aa']);
const change = () => {
    emit('aa');
}
</script>
<style lang="scss" scoped>
</style>
