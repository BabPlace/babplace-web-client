export function categorySplit(category: string | undefined) {
  return category ? category.split(' > ') : [];
}

export function categoryFormat(category: string) {
  return categorySplit(category).slice(1).join('/');
}
