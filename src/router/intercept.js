import Router from "./index";
// cookies
import { getToken } from "@/utils/cookies";
// 前置路由
Router.beforeEach((to, form, next) => {
    if(getToken()) {
        next();
    }else{
        if( to.name === "Login" || to.name === "Register" || to.name === "Forget" ) {
            next();
        }else{
            next({ name: "Login" });
        }
    }
}) 