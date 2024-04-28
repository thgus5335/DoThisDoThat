// 해시 함수: 문자열을 기반으로 숫자를 생성
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i); //문자의 ASCII 값으로 해시 값을 계산. 해시 값은 문자열에 따라 고유한 숫자를 생성하므로, 같은 문자열은 항상 같은 해시 값을 가집니다.
    hash = (hash << 5) - hash + char;
    hash |= 0; // 숫자를 32비트 정수로 변환
  }
  return hash;
};

// 랜덤 색상 생성 함수
export const getRandomcolorForPrefix = (prefix: string) => {
  const baseColor = Math.abs(hashString(prefix)) % 360;
  const color = `hsl(${baseColor}, 70%, 40%)`; // 밝은 색상
  const backgroundColor = `hsl(${baseColor}, 70%, 90%)`; // 어두운 배경
  return { color, backgroundColor };
};
