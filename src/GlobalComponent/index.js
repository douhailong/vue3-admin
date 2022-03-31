import SvgIcon from "@/globalComponent/svgIcon/index.vue"; // svg组件
import "@/globalComponent/svgIcon/svg.js";
import { showConfirm } from "@/globalComponent/deleteConfirm";



export default {
  install(App) {
    App.component(SvgIcon.name, SvgIcon);
    App.config.globalProperties["$showConfirm"] = showConfirm;
  }
}