import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { Iframe } from 'sanity-plugin-iframe-pane'

// Tự động nhận diện môi trường: Localhost hay Vercel
const getPreviewUrl = (doc: any) => {
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  const baseUrl = isLocal 
    ? 'http://localhost:4321' 
    : 'https://van-hoc-prt.vercel.app' // Thay link Vercel của bạn nếu có

  return doc?.slug?.current
    ? `${baseUrl}/posts/${doc.slug.current}`
    : baseUrl
}

// Cấu hình View xem trước cho từng bài viết
const defaultDocumentNode = (S: any, { schemaType }: any) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(), // Tab soạn thảo văn bản
      S.view
        .component(Iframe)
        .id('preview') // Đặt ID tiếng Anh chuẩn web để tránh lỗi ký tự tiếng Việt
        .options({
          url: (doc: any) => getPreviewUrl(doc),
          reload: {
            button: true, // Nút tải lại trang xem trước
          },
        })
        .title('Xem trước (Preview)'),
    ])
  }
  return S.document().views([S.view.form()])
}

export default defineConfig({
  name: 'default',
  title: 'Văn Học PRT',

  projectId: 'oeqzzve8',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})