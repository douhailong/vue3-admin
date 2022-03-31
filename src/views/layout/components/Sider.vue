<template>
  <div class="menu-logo">
    <svg-icon iconName="logo" className="logo-svg" />
    <h1>Dou Design Vue</h1>
  </div>
  <a-menu mode="inline" theme="dark" :inline-collapsed="!trigger">
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
        <Nav v-else :menu="item" :key="item.path" />
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import { useRouter } from "vue-router";
import Nav from "./Nav.vue";

const props = defineProps({
  trigger: {
    type: Boolean,
    default: true
  }
});
const routers = useRouter().options.routes;
const hasOnlyChildren = (parame) => {
  if (parame.children) {
    const iS = parame.children.filter(item => item.meta.hidden ? false : true);
    return (iS.length === 1) ? true : false;
  }
};
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
    margin-left: 3px;
    vertical-align: middle;
  }
  h1 {
    display: inline-block;
    color: #fff;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
    margin-left: 12px;
  }
}
</style>