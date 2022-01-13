<template>
  <svg class="svg-class" :class="className" aria-hidden="true">
    <use :href="'#icon-' + iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "aside-svg",
    }
  },
  setup(props) {
  }

}
</script>
<style lang="scss" scoped>
</style>
