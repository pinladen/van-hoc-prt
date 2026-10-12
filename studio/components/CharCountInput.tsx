import React from 'react'
import { Stack, Text } from '@sanity/ui'

// Hàm bóc tách chữ thuần từ mảng Portable Text
function extractPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (!block || block._type !== 'block' || !block.children) return ''
      return block.children.map((child: any) => child?.text || '').join('')
    })
    .join('\n')
}

export function CharCountInput(props: any) {
  const { value, schemaType } = props

  // Lấy chuỗi văn bản thuần túy
  let textContent = ''
  if (typeof value === 'string') {
    textContent = value
  } else if (Array.isArray(value)) {
    textContent = extractPlainText(value)
  }

  // Đếm ký tự
  const charCount = textContent.length

  // Đếm số từ (áp dụng khi là bài viết dài / mảng nội dung)
  const trimmed = textContent.trim()
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0

  const maxLength = schemaType.options?.maxLength
  const isOverLimit = maxLength ? charCount > maxLength : false

  return (
    <Stack gap={2}>
      {/* Hiển thị khung soạn thảo gốc của Sanity */}
      {props.renderDefault(props)}

      {/* Dòng thông số hiển thị ngay dưới chân khung */}
      <Text
        size={1}
        style={{
          fontSize: '12px',
          color: isOverLimit ? '#e11d48' : '#71717a',
          fontWeight: isOverLimit ? 600 : 400,
          marginTop: '6px',
        }}
      >
        {/* Nếu có giới hạn (như tiêu đề SEO) thì hiện / max, nếu là bài viết (body) thì hiện ký tự & số từ */}
        {maxLength ? (
          <>
            Characters: {charCount.toLocaleString('vi-VN')} / {maxLength}
            {isOverLimit && ' (Đã vượt quá giới hạn tối đa)'}
          </>
        ) : (
          <>
            Dung lượng tác phẩm: <strong>{charCount.toLocaleString('vi-VN')}</strong> ký tự (khoảng <strong>{wordCount.toLocaleString('vi-VN')}</strong> từ)
          </>
        )}
      </Text>
    </Stack>
  )
}