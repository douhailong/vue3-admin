<template>
  <span id="headerTrigger">
    <SvgIcon :iconName="`${trigger ? 'asideClose' : 'asideOpen'}`" />
  </span>
  <SvgIcon iconName="refresh" />
  <span class="ss">
    <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <SvgIcon iconName="portrait" />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  </span>
  <span>
    
  </span>
</template>

<script>
import { toRefs, reactive, watch } from "vue";
export default {
  name: "Header",
  props: {
    trigger: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    watch(() => props.trigger, newVal => {
      newVal ? document.getElementsByTagName('body')[0].style.setProperty('--tWidth', '250px') :
               document.getElementsByTagName('body')[0].style.setProperty('--tWidth', '80px');
    });
    return {
    };
  }
};
</script>
<style lang="scss" scoped>
.ss {
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
