<template>
  <div class="menu-logo">
    <svg-icon iconName="logo" className="logo-svg" />
    <h1>Created By Dou</h1>
  </div>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="!trigger"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in routers">
      <template v-if="!item.meta.hidden">
        <!-- 一层 -->
        <a-menu-item v-if="hasOnlyChildren(item)" :key="item.path">
          <template v-for="itm in item.children" :key="itm.path">
            <router-link :to="itm.path">
              <span class="anticon">
                <svg-icon :iconName="item.meta.icon" />
              </span>
              <span>{{ itm.meta && itm.meta.title }}</span>
            </router-link>
          </template>
        </a-menu-item>
        <!-- 多层 -->
        <Menu v-else :menu="item" :key="item.path" />
      </template>
    </template>
  </a-menu>
</template>

<script>
import { useRouter } from "vue-router";
import Menu from "./menu.vue"
import { defineComponent, reactive, toRefs, watch } from 'vue';
export default defineComponent({
  name: "Sider",
  props: {
    trigger: {
      type: Boolean,
      default: true
    }
  },
  setup(props, contex) {
    const routers = useRouter().options.routes;
    
    let i = 0;
    const hasOnlyChildren = (parame) => {
      if (parame.children) {
        const iS = parame.children.filter(item => item.meta.hidden ? false : true);
        return (iS.length === 1) ? true : false;
      }
    };

    return {
      routers,
      hasOnlyChildren
    };
  },
  components: {
    Menu
  }
});
</script>



<style lang="scss" scoped>
.menu-logo {
  position: relative;
  height: $heights;
  padding-left: 24px;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: $heights;
  svg {
    vertical-align: middle;
  }
  h1 {
    display: inline-block;
    color: #fff;
    font-size: 20px;
    margin-left: 12px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }
}
</style>