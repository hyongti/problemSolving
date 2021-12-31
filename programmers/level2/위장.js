function solution(clothes) {
  const closet = new Map();
  clothes.forEach((cloth) => {
    if (closet.get(cloth[1]) === undefined) {
      closet.set(cloth[1], [cloth[0]]);
    } else {
      closet.get(cloth[1]).push(cloth[0]);
    }
  });
  let answer = 1;
  closet.forEach((value) => (answer *= value.length + 1));
  return answer - 1;
}

console.log(
  solution([
    ["yellowhat", "headgear"],
    ["bluesunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);
