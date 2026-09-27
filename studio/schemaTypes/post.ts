export default {
  name: 'post',
  title: 'Bài viết',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tiêu đề bài viết', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { 
      name: 'author', 
      title: 'Tác giả', 
      type: 'reference', 
      to: { type: 'author' } 
    },
    { name: 'mainImage', title: 'Ảnh chính', type: 'image', options: { hotspot: true } },
    { 
      name: 'categories', 
      title: 'Danh mục', 
      type: 'array', 
      of: [{ type: 'reference', to: { type: 'category' } }] 
    },
    { name: 'publishedAt', title: 'Ngày xuất bản', type: 'datetime' },
    { name: 'body', title: 'Nội dung', type: 'array', of: [{ type: 'block' }] },
  ],
}