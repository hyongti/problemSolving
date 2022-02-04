// https://programmers.co.kr/learn/courses/30/lessons/42860?language=javascript
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function solution(name) {
  return updownCount(name) + leftrightCount(name);
}

const updownCount = (name) => {
  let count = 0;
  for (let i = 0; i < name.length; ++i) {
    const index = alphabet.indexOf(name[i]);
    if (index <= 12) {
      count += index;
    } else {
      count += 26 - index;
    }
  }
  return count;
};

const leftrightCount = (name) => {
  const isCheck = [];
  for (let i = 0; i < name.length; ++i) {
    name[i] === "A" ? isCheck.push(true) : isCheck.push(false);
  }
  let i = 0;
  let count = 0;
  let direction;
  while (true) {
    if (isCheck[i] === false) {
      isCheck[i] = true;
    }
    if (isCheck.indexOf(false) === -1) return count;
    // 오른쪽 왼쪽 어디로 갈지
    const { leftCount, rightCount } = repeatTrue(isCheck, i);
    // let direction = leftCount < rightCount ? -leftCount : rightCount;
    if (leftCount < rightCount) {
      direction = -leftCount;
    } else if (leftCount > rightCount) {
      direction = rightCount;
    } else {
      const { leftCount, rightCount } = repeatFalse(isCheck, i);
      direction = leftCount < rightCount ? -1 : 1;
    }
    // 실제 이동
    i += direction;
    if (i > isCheck.length - 1) {
      i -= isCheck.length;
    } else if (i < 0) {
      i += isCheck.length;
    }
    count += Math.abs(direction);
  }
};

const repeatTrue = (isCheck, index) => {
  let rightCount = 1;
  for (
    let i = index + 1 > isCheck.length - 1 ? 0 : index + 1;
    isCheck[i] === true;
    ++i
  ) {
    if (i > isCheck.length - 1) {
      i = 0;
    }
    ++rightCount;
  }
  let leftCount = 1;
  for (
    let i = index - 1 > 0 ? index - 1 : isCheck.length - 1;
    isCheck[i] === true;
    --i
  ) {
    if (i < 0) {
      i = isCheck.length - 1;
    }
    ++leftCount;
  }
  return { leftCount, rightCount };
};

const repeatFalse = (isCheck, index) => {
  let rightCount = 0;
  for (
    let i = index + 1 > isCheck.length - 1 ? 0 : index + 1;
    isCheck[i] === false;
    ++i
  ) {
    if (i > isCheck.length - 1) {
      i = 0;
    }
    ++rightCount;
  }
  let leftCount = 0;
  for (
    let i = index - 1 > 0 ? index - 1 : isCheck.length - 1;
    isCheck[i] === false;
    --i
  ) {
    if (i < 0) {
      i = isCheck.length - 1;
    }
    ++leftCount;
  }
  return { leftCount, rightCount };
};

console.log(solution("JEROEN"));
console.log(solution("JAN"));
console.log(solution("ABAAAAAAAAABB"));
console.log(solution("AAAABABAAAA"));
console.log(solution("AAA"));
console.log(solution("BBBBAAAB"));
console.log(solution("ABABA"));
