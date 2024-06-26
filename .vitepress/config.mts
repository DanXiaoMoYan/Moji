import { defineConfig } from 'vitepress'
import { generateSidebar } from './utils/genSidebar'
import { plantUMLPlugin } from './utils/plantUMLPlugin'

export default defineConfig({
  // 站点配置
  title: '莫记',
  description: '淡笑莫言的随记小站',
  head: [ [ 'link', { rel: 'icon', href: '/logo.svg' } ] ],
  lang: 'zh-cn',
  srcDir: 'src',
  cleanUrls: true,
  sitemap: { hostname: 'https://blog.dxmy.fun' },

  // 主题配置
  themeConfig: {
    logo: '/logo.svg',

    // 导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '博客', link: '/blog/', activeMatch: '^/blog/' },
      { text: '笔记', link: '/note/', activeMatch: '^/note/' },
      { text: '杂谈', link: '/other/', activeMatch: '^/other/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DanXiaoMoYan' }
    ],

    // 侧边栏
    sidebar: {
      '/blog/': generateSidebar('src/blog'),
      '/note/': generateSidebar('src/note'),
      '/other/': generateSidebar('src/other')
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '在莫记中搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                noResultsText: '未找到相关结果',
                footer: {
                  navigateText: '切换',
                  selectText: '选择',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      level: [ 2, 3 ],
      label: '章节速览'
    },
    lastUpdated: {
      text: '最后编辑',
      formatOptions: {
        timeStyle: undefined
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true
  },

  // Markdown 配置
  markdown: {
    theme: {
      light: 'material-theme',
      dark: 'material-theme'
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    codeCopyButtonTitle: '复制代码',
    config: md => {
      md.use(plantUMLPlugin)
    }
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 80
    }
  }
})
