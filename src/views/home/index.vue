<template>
    <Home @aa="aa" name="huang" />
</template>
<script setup>
import Home from "./home.vue"
const aa = () => {
    console.log('aaaaa')
}
</script>
<style lang="scss" scoped>

</style>
