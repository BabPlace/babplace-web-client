export default function sliceByOffset<T>(array: T[], offset: number) {
  return [array.slice(0, offset), array.slice(offset)];
}
