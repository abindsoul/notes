import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Web Note",
  description: "for study and write something about Web",
  outDir:"docs",// 输出目录
  base:"/notes/",// 输出时带上路径以免css的等失效
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

        ]
      },
      {
        text: 'Vue',
        items: [
          { text: '左侧1', link: '/markdown-examples' },
          { text: '左侧2', link: '/api-examples' }
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
        text: '网络请求',
        items: [
          { text: '基础', link: '/network-md/basis.md' },
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/abindsoul' }

    ]
  }
})
