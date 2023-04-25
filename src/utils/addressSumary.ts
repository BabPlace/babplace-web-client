import type { SelectPlace } from '@/interfaces';

export default function addressSumary(selectedSearchResult: SelectPlace | null) {
  if (!selectedSearchResult) return '';
  if (selectedSearchResult.road_address_name !== '') {
    const sgRegex = /(\S+[시군구])/;
    const sgMatch = selectedSearchResult.road_address_name.match(sgRegex);
    const sg = sgMatch ? sgMatch[1] : '';

    // 도로명 패턴 찾기
    const roadRegex = /(\S+[로])/;
    const roadMatch = selectedSearchResult.road_address_name.match(roadRegex);
    const road = roadMatch ? roadMatch[0] : '';
    return `${sg} ${road}`;
  } else {
    const sgRegex = /(\S+[시군구])/;
    const sgMatch = selectedSearchResult.address_name.match(sgRegex);
    const sg = sgMatch ? sgMatch[1] : '';

    const dmuRegex = /(\S+[동면읍])/;
    const dmuMatch = selectedSearchResult.address_name.match(dmuRegex);
    const dmu = dmuMatch ? dmuMatch[1] : '';
    return `${sg} ${dmu}`;
  }
}
