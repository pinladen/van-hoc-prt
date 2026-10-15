import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên danh mục',
      type: 'string',
      validation: (Rule) => Rule.required().error('Tên danh mục không được để trống.'),
    }),

    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      options: {
        source: 'title', // Tự động chuyển đổi từ Tên danh mục (có dấu -> không dấu gạch ngang)
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Bắt buộc phải tạo slug cho danh mục.'),
    }),

    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      description: 'Mô tả tóm tắt về thể loại/chủ đề này (hiển thị đầu trang danh mục).',
    }),
  ],
})