export default function splitByValue(source: string, delim: string) {
  const isValidDelim = (delim: string) => {
    const regex = /^[a-zA-Z0-9가-힣\s]*$/;
    return regex.test(delim);
  };
  if (!isValidDelim(delim)) {
    return [source];
  }
  return source.split(new RegExp(`(${delim})`, 'gi'));
}
