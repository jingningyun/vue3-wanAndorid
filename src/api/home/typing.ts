/**
 * banner请求结果
 */
export interface bannerResult {
  // 描述
  desc: string

  id: number

  // 图片地址
  imagePath: string

  // 是否显示
  isVisible: boolean

  // 顺序
  order: number

  // 标题
  title: string

  type: number

  // 链接地址
  url: string
}

/**
 * 文章列表请求结果
 */
export interface articletResult {

  // 文章作者
  author: string

  // 文章id
  id: number

  // 文章标题
  title: string

  // 时间
  niceShareDate: string

  // 分类
  superChapterName: string

  // 文章链接
  link: string

  // 是否收藏
  collect: boolean

}
