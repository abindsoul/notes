import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Web Note",
  description: "for study and write something about Web",
  head: [["link", { rel: "manifest", href: "/notes/manifest.json" }]],
  outDir: "docs", // 输出目录
  base: "/notes/", // 输出时带上路径以免css的等失效
  lastUpdated: true, // 最后更新时间
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: "/image/logo.png",
      dark: "/image/logo_hover.png",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ],
    // 左侧菜单栏
    sidebar: [
      {
        text: "HTML",
        items: [{ text: "HTML基础", link: "/md/html-md/basis.md" }],
      },
      {
        text: "CSS",
        items: [
          { text: "CSS基础", link: "/md/css-md/basis.md" },
          { text: "BEM", link: "/md/css-md/bem.md" }

        ],
      },
      {
        text: "JavaScript",
        items: [
          { text: "JS基础", link: "/md/js-md/basis.md" },
          { text: "JS进阶", link: "/md/js-md/progress.md" },
          { text: "JS高级", link: "/md/js-md/senior.md" },
        ],
      },
      {
        text: "Typescript",
        items: [
          { text: "TS基础", link: "/md/ts-md/basis.md" },
          { text: "TS配置", link: "/md/ts-md/config.md" },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "基础", link: "/md/vue-md/basis.md" },
          { text: "进阶", link: "/md/vue-md/progress.md" },
          { text: "周边生态", link: "/md/vue-md/periphery.md" },
        ],
      },
      {
        text: "Node",
        items: [
          { text: "基础", link: "/md/node-md/basis.md" },
          { text: "进阶", link: "/md/node-md/progress.md" },
        ],
      },
      {
        text: "网络",
        items: [
          { text: "网络基础", link: "/md/network-md/basis.md" },
          { text: "网络请求", link: "/md/network-md/request.md" },
        ],
      },
      {
        text: "框架",
        items: [
          { text: "vite", link: "/md/framework-md/vite.md" },
          { text: "webpack", link: "/md/framework-md/webpack.md" }
        ],
      },
      {
        text: "服务器",
        items: [
          { text: "Nginx", link: "/md/server-md/nginx.md" },
          { text: "Nest.js", link: "/md/server-md/nestJs.md" },
        ],
      },
      {
        text: "代码规范",
        items: [
          { text: "Prettier", link: "/md/specification-md/prettier.md" },
          { text: "Eslint", link: "/md/specification-md/eslint.md" },
        ],
      },
      {
        text: "算法相关",
        items: [{ text: "常见算法", link: "/md/algorithm-md/algorithm.md" }],
      },
      {
        text: "拓展",
        items: [
          { text: "PWA", link: "/md/other-md/pwa.md" },
          { text: "gulp", link: "/md/other-md/gulp.md" },
          { text: "monorepo", link: "/md/other-md/monorepo.md" },
          { text: "esbuild", link: "/md/other-md/esbuild.md" },
          { text: "cicd", link: "/md/other-md/cicd.md" },
          { text: "V8", link: "/md/other-md/v8.md" },
          { text: "puppeteer", link: "/md/other-md/puppeteer.md" },

        ],
      },
    ],
    // 页脚的翻页功能
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // 搜索
    search: {
      provider: "local",
    },
    lastUpdatedText: "last time",
    socialLinks: [{ icon: "github", link: "https://github.com/abindsoul" }],
  },
});
