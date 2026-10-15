import { DocumentActionComponent, DocumentActionProps, useDocumentOperation } from 'sanity'
import { useState } from 'react'

export const CleanTextAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const { patch } = useDocumentOperation(props.id, props.type)
  const [isProcessing, setIsProcessing] = useState(false)

  // Lấy dữ liệu bài viết: Ưu tiên bản Draft, nếu không có thì lấy bản đã Publish
  const doc: any = props.draft || props.published

  return {
    label: isProcessing ? 'Đang chuẩn hóa...' : 'Chuẩn hóa văn bản',
    title: 'Tự động quét sạch rác OCR, số thứ tự câu thừa và đưa về chuẩn Unicode tiếng Việt',
    // Nút luôn sáng miễn là bài viết có tồn tại dữ liệu
    disabled: !doc || isProcessing,
    onHandle: () => {
      setIsProcessing(true)

      if (!doc || !doc.body || !Array.isArray(doc.body)) {
        setIsProcessing(false)
        return
      }

      // Quét và làm sạch dữ liệu
      const cleanedBody = doc.body.map((block: any) => {
        if (block._type !== 'block' || !block.children) return block

        return {
          ...block,
          children: block.children.map((child: any) => {
            if (typeof child.text !== 'string') return child

            let cleaned = child.text
              .normalize('NFC')
              // 1. Xóa số thứ tự câu thơ đầu dòng (5., 10., 15., 20.)
              .replace(/^\s*\d+\.\s*/gm, '')
              // 2. Ghép dấu rách OCR (bắt tất cả các loại dấu: ´, `, ˊ, ˋ, ’)
              .replace(/([a-zA-Z\u00C0-\u1EF9])[´`ˊˋ’]\s*([a-zA-Z\u00C0-\u1EF9])/gu, '$1$2')
              // 3. Xóa khoảng trắng thừa cuối dòng
              .replace(/[ \t]+$/gm, '')

            return {
              ...child,
              text: cleaned,
            }
          }),
        }
      })

      // Ghi đè dữ liệu sạch vào bài viết
      patch.execute([{ set: { body: cleanedBody } }])
      setIsProcessing(false)
    },
  }
}