import DefaultTheme from "vitepress/theme"; 
import type { Theme } from "vitepress";
export default {
  ...DefaultTheme,
enhanceApp({app}){
    // 注册全局组件 app 就是 vue 的 app
}
}