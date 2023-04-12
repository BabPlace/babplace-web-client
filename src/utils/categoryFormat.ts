export default function categoryFormat(category: string) {
  const categories = category.split('>');

  return categories.slice(1).join('/');
}
