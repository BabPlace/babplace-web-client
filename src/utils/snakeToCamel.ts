export default function snakeToCamel(obj: { [key: string]: any }): { [key: string]: any } {
  // 빈 객체 생성
  const result: { [key: string]: any } = {};

  // object의 key 순회
  for (const [key, value] of Object.entries(obj)) {
    // key가 snake case인 경우
    if (key.includes('_')) {
      // "_"를 기준으로 분리한 후, 각각의 문자열을 camel case로 변환하여 합침
      const newKey = key
        .split('_')
        .map((str, index) => {
          if (index === 0) {
            return str;
          }
          return str.charAt(0).toUpperCase() + str.slice(1);
        })
        .join('');

      // 새로운 key와 value를 result에 추가
      result[newKey] = value;
    }
    // key가 snake case가 아닌 경우
    else {
      result[key] = value;
    }
  }

  return result;
}
