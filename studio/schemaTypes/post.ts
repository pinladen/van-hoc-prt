import { defineField, defineType } from 'sanity'
import { CharCountInput } from '../components/CharCountInput'

export default defineType({
  name: 'post',
  title: 'Bài viết',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề bài viết',
      type: 'string',
      options: {
        maxLength: 60, // Mốc chuẩn SEO
      } as any,
      components: {
        input: CharCountInput,
      },
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning('Tiêu đề nên gói gọn trong 60 ký tự để tối ưu hiển thị SEO và mạng xã hội.'),
    }),

    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Bắt buộc phải tạo đường dẫn tĩnh (Slug) cho bài viết.'),
    }),

    defineField({
      name: 'author',
      title: 'Tác giả / Bút danh',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện (Cover Image)',
      type: 'image',
      options: {
        hotspot: true, // Cho phép căn chỉnh điểm lấy nét ảnh trên các màn hình khác nhau
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Mô tả hình ảnh (Alt text)',
          type: 'string',
          description: 'Hỗ trợ SEO và trải nghiệm đọc hỗ trợ người khiếm thị.',
        }),
      ],
    }),

    defineField({
      name: 'categories',
      title: 'Danh mục thể loại',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'datetime',
      initialValue: () => new Date().toISOString(), // Tự động điền ngày giờ hiện tại khi tạo bài mới
    }),

    defineField({
      name: 'body',
      title: 'Nội dung tác phẩm',
      type: 'blockContent',
      components: {
        input: CharCountInput, // Gắn component đếm ký tự vào khung soạn thảo
      },
      validation: (Rule) => Rule.required().error('Nội dung tác phẩm không được để trống.'),
    }),
  ],

  // Cấu hình hiển thị trực quan trong danh sách bài viết ở cột bên trái Studio
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author ? `Tác giả: ${author}` : 'Khuyết danh',
      }
    },
  },
})