import * as MarkdownIt from 'markdown-it'
import { encode } from 'plantuml-encoder'

const server = 'https://www.plantuml.com/plantuml/svg'
const skinParam = 'skinparam defaultFontName HarmonyOS Sans SC\n'

/**
 * PlantUML 渲染插件
 */
export function plantUMLPlugin(md: MarkdownIt): void {
  const defaultRender = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    // 检查是否为 PlantUML 代码块
    if (token.info.trim() === 'plantuml') {
      // 获取代码块内容
      let content = token.content.trim()

      // 设置主题参数
      const startIndex = content.indexOf('@startuml')
      const insertIndex = startIndex + '@startuml'.length + 1
      content = content.slice(0, insertIndex) + skinParam + content.slice(insertIndex)

      // 编码内容并返回渲染后的图片标签
      const encoded = encode(content)
      return `<p><img src="${server}/${encoded}" alt="PlantUML"></p>`
    }

    // 非 PlantUML 代码块则使用默认渲染方式
    return defaultRender(tokens, idx, options, env, self)
  }
}
