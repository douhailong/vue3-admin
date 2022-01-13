<template>
  <div @click="eventAgent($event)">
    <aside id="sider">
      <Sider :trigger="trigger" />
    </aside>
    <header id="header">
      <Header :trigger="trigger" />
    </header>
    <section id="main">
      <Content />
      <a-layout-footer class="content-fotter">
        Vue3 Admin ©2022 Created by Dou
      </a-layout-footer>
    </section>
  </div>
</template>

<script>
import Content from "./components/Content.vue";
import Sider from "./components/Sider.vue";
import Header from "./components/Header.vue";
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: "Layout",
  setup() {
    const data = reactive({
      trigger: true
    })
    const eventAgent = (e) => {
      const tarId = e.target.getAttribute('id');
      if (tarId === 'headerTrigger') {
        data.trigger = !data.trigger;
      }
    }
    return {
      ...toRefs(data),
      eventAgent
    }
  },
  components: {
    Content,
    Sider,
    Header
  },
});
</script>

<style lang="scss" scoped>
/* content */
#main {
  min-height: 100vh;
  margin: $heights 0 0 $widths;
  transition: width, 0.3s;
  background-color: rgba(0, 0, 0, 0.06);
  .content-fotter {
    text-align: center;
    padding-bottom: 20px;
    background-color: rgba(0,0,0,0);
  }
}
/* header */
#header {
  position: absolute;
  top: 0;
  left: $widths;
  height: $heights;
  line-height: $heights;
  width: calc(100% - $widths);
  transition: width, 0.3s;
  font-size: 20px;
}
/* aside */
#sider {
  position: fixed;
  top: 0;
  width: $widths;
  height: 100%;
  transition: width, 0.3s;
  overflow: auto;
  background-color: #001529;
}
</style>