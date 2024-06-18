import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Web Note",
  description: "for study and write something about Web",
  outDir:"docs",// 输出目录
  base:"/docs/",// 输出时带上路径以免css的等失效
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/markdown-examples' }
    ],
    // 左侧菜单栏
    sidebar: [
      {
        text: 'HTML',
        items: [
          { text: '示例1', link: '/html-md/cs-01.md' },
          { text: '示例2', link: '/html-md/cs-02.md' }
        ]
      },
      {
        text: 'CSS',
        items: [
          { text: '左侧1', link: '/markdown-examples' },
          { text: '左侧2', link: '/api-examples' }
        ]
      },
      {
        text: 'JavaScript',
        items: [
          { text: '左侧1', link: '/markdown-examples' },
          { text: '左侧2', link: '/api-examples' }
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: '左侧1', link: '/markdown-examples' },
          { text: '左侧2', link: '/api-examples' }
        ]
      }
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
