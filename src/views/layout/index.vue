<template>
  <div class="whole">
    <aside>
      <Sider />
    </aside>
    <div class="subject">
      <header>
        <Header />
      </header>
      <main>
        <Content />
      </main>
      <footer>
        <a-layout-footer class="content-fotter">
          Vue3 Admin ©2022 Created by Dou
        </a-layout-footer>
      </footer>
    </div>
  </div>
</template>
<script setup>
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Sider from "./components/Sider.vue";
</script>
<style lang="scss" scoped>
.whole {
  display: flex;
  background-color: rgba(0, 0, 0, 0.06);
  aside {
    width: $widths;
    height: 100vh;
    overflow: auto;
    background-color: #001529;
    transition: all 0.3s;
  }
  .subject {
    flex: 1;
    height: 100vh;
    overflow: auto;
    transition: all 0.3s;
    header {
      height: $heights;
      line-height: $heights;
      background-color: #fff;
    }
    footer {
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      background-color: rgba(0, 0, 0, 0);
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
