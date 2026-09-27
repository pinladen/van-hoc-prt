export default {
  name: 'author',
  title: 'Tác giả',
  type: 'document',
  fields: [
    { name: 'name', title: 'Tên tác giả', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'image', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Tiểu sử', type: 'text' },
  ],
}