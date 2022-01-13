<template>
  <a-sub-menu :key="menu.path">
    <template #title>
      <span class="anticon">
        <svg-icon
          :iconName="menu.meta && menu.meta.icon"
          className="aside-svg"
        />
      </span>
      <span>{{ menu.meta && menu.meta.title }}</span>
    </template>
    <template v-if="menu.children && menu.children.length">
      <template v-for="item in menu.children">
        <template v-if="!item.meta.hidden">
          <!-- 一层 -->
          <a-menu-item v-if="!item.children" :key="item.path">
            <router-link :to="item.path">
              <span>{{ item.meta && item.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <!-- 多层 -->
          <Menu :menu="item" v-else :key="item.path" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: "Menu",
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>
