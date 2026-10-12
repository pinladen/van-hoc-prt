import { defineType, defineArrayMember } from 'sanity'
import React from 'react'

// 1. Tạo các biểu tượng (Icon) chuẩn cho thanh công cụ
const AlignCenterIcon = () =>
  React.createElement(
    'svg',
    { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 4, y1: 6, x2: 20, y2: 6 }),
    React.createElement('line', { x1: 7, y1: 12, x2: 17, y2: 12 }),
    React.createElement('line', { x1: 5, y1: 18, x2: 19, y2: 18 })
  )

const AlignRightIcon = () =>
  React.createElement(
    'svg',
    { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 4, y1: 6, x2: 20, y2: 6 }),
    React.createElement('line', { x1: 9, y1: 12, x2: 20, y2: 12 }),
    React.createElement('line', { x1: 6, y1: 18, x2: 20, y2: 18 })
  )

const AlignJustifyIcon = () =>
  React.createElement(
    'svg',
    { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 4, y1: 6, x2: 20, y2: 6 }),
    React.createElement('line', { x1: 4, y1: 12, x2: 20, y2: 12 }),
    React.createElement('line', { x1: 4, y1: 18, x2: 20, y2: 18 })
  )

export default defineType({
  title: 'Nội dung bài viết',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Khối chữ',
      type: 'block',
      styles: [
        { title: 'Văn xuôi', value: 'normal' },
        { title: 'Khổ thơ', value: 'poem' },
        { title: 'Trích dẫn', value: 'blockquote' },
        { title: 'Lời đề từ (In nghiêng)', value: 'epigraph' },
        { title: 'Tiêu đề mục (H3)', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Đậm', value: 'strong' },
          { title: 'Nghiêng', value: 'em' },
          { title: 'Gạch chân', value: 'underline' },

          // --- CÁC NÚT BẤM CĂN LỀ HIỂN THỊ TRỰC TIẾP TRÊN TOOLBAR ---
        
          {
            title: 'Căn phải (Right)',
            value: 'alignRight',
            icon: AlignRightIcon,
            component: (props: any) =>
              React.createElement('span', { style: { display: 'block', textAlign: 'right' } }, props.children),
          },
        {
            title: 'Căn giữa (Center)',
            value: 'alignCenter',
            icon: AlignCenterIcon,
            component: (props: any) =>
              React.createElement('span', { style: { display: 'block', textAlign: 'center' } }, props.children),
          },
          {
            title: 'Căn đều (Justify)',
            value: 'alignJustify',
            icon: AlignJustifyIcon,
            component: (props: any) =>
              React.createElement('span', { style: { display: 'block', textAlign: 'justify' } }, props.children),
          },
        ],
        annotations: [
          {
            title: 'Liên kết (URL)',
            name: 'link',
            type: 'object',
            fields: [
              { title: 'Đường dẫn', name: 'href', type: 'url' },
            ],
          },
        ],
      },
    }),

    // Khối ảnh minh họa xen kẽ
    defineArrayMember({
      type: 'image',
      name: 'inlineImage',
      title: 'Ảnh minh họa xen kẽ',
      options: { hotspot: true },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Lời bình tranh / ảnh',
        },
      ],
    }),
    

    // Khối hoa văn ngắt khổ
    defineArrayMember({
      type: 'object',
      name: 'breakLine',
      title: 'Đường hoa văn phân cách (Divider)',
      fields: [
        {
          name: 'style',
          type: 'string',
          title: 'Kiểu hoa văn',
          initialValue: 'ornament',
          options: {
            list: [
              { title: 'Dải hoa văn cổ điển (~ ✤ ~)', value: 'ornament' },
              { title: 'Ba dấu sao (* * *)', value: 'stars' },
              { title: 'Đường kẻ thanh mảnh', value: 'line' },
            ],
          },
        },
      ],
    }),

    // Thêm khối Ngắt trang (Page Break) trực quan vào đây
    defineArrayMember({
      type: 'object',
      name: 'pageBreak',
      title: 'Ngắt trang',
      // Định nghĩa icon hiển thị (một vạch đứt quãng)
      icon: () => '⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼', 
      fields: [
        {
          name: 'title',
          title: 'Nhãn hiển thị',
          type: 'string',
          initialValue: '--- Ngắt trang tại đây ---',
          readOnly: true, // Không cho sửa chữ để đảm bảo tính nhất quán
        }
      ],
      // Tạo giao diện hiển thị vạch đứt trực quan ngay trong khung soạn thảo
      preview: {
        prepare() {
          return {
            title: '---------------- PAGE BREAK / NGẮT TRANG ----------------',
          }
        }
      }
    }),
  ],
})