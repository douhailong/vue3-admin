import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import "@/components/svgIcon/svg.js";

export default {
  install(App) {
    App.component(SvgIcon.name, SvgIcon)
  }
}