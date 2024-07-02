import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Web Note",
  description: "for study and write something about Web",
  outDir:"docs",// 输出目录
  base:"/notes/",// 输出时带上路径以免css的等失效
  lastUpdated: true,// 最后更新时间
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light:'/image/logo.png',
      dark: '/image/logo_hover.png'
    }
    ,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/markdown-examples' }
    ],
    // 左侧菜单栏
    sidebar: [
      {
        text: 'HTML',
        items: [
          { text: 'HTML基础', link: '/html-md/basis.md' },
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: 'CSS基础', link: '/css-md/basis.md' },
        ]
      },
      {
        text: 'JavaScript',
        items: [
          { text: 'JS基础', link: '/js-md/basis.md' },
          { text: 'JS进阶', link: '/js-md/progress.md' },
          { text: 'JS高级', link: '/js-md/senior.md' },

        ]
      },
      {
        text: 'Vue',
        items: [
          { text: '基础', link: '/vue-md/basis.md' },
          { text: '进阶', link: '/vue-md/progress.md' },
          { text: '周边生态', link: '/vue-md/periphery.md' },

        ]
      },
      {
        text: 'Node',
        items: [
          { text: '基础', link: '/node-md/basis.md' },
          { text: '进阶', link: '/node-md/progress.md'}

        ]
      },
      {
        text: '网络',
        items: [
          { text: '网络基础', link: '/network-md/basis.md' },
          { text: '网络请求', link: '/network-md/request.md' },
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'vite', link: '/framework-md/vite.md' },
        ]
      },
      
    ],
    // 页脚的翻页功能
    docFooter: {
      prev:'上一页',
      next:'下一页',
    },
    // 搜索
    search:{
        provider:'local'
    },
    lastUpdatedText: "last time",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/abindsoul' }

    ]
  }
})
