import DefaultTheme from "vitepress/theme"; 
import type { Theme } from "vitepress";
import './style/var.css'
export default {
  ...DefaultTheme,
enhanceApp({app}){
    // 注册全局组件 app 就是 vue 的 app
}
}