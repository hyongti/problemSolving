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
  const { aLength, index } = maxRepeatA(name);
  // 한번 방향이 바뀌면 그대로 쭉 가야 함.
  // 반복되는 (A의 개수 + 1)이 내가 돌아가야하는 길보다 커야 함.
  // 즉, 다음 식이 성립하면 돌아가는 게 더 좋다.
  // i + {name.length - (i + repeatA)} < repeatA + 1
  // 5 + (17 - 5 - 8) 1을 더 빼야하는구나..
  //  위 식을 정리하면,
  // i + name.length - i - repeatA - 1 < repeatA + 1
  // 즉, name.length < 2 * repeatA + 2 이면
  // leftRightCount는 i + {name.length - (i + repeatA)}
  // 그렇지 않으면 그냥 name.length - 1 리턴하면 됨!
  //   console.log(aLength, index);
  if (name.length < 2 * aLength + 2) {
    return name.length - index - aLength;
  } else {
    let lastACount = 0;
    for (let i = name.length - 1; name[i] === "A"; --i) {
      lastACount += 1;
    }
    return name.length - 1 - lastACount;
  }
};

const maxRepeatA = (name) => {
  const aArr = Array.from({ length: name.length }, () => "A");
  for (; aArr.length > 0; aArr.pop()) {
    if (name.indexOf(aArr.join("")) !== -1) {
      return { aLength: aArr.length, index: name.indexOf(aArr.join("")) };
    }
  }
  return {};
};

console.log(solution("JEROEN"));
console.log(solution("JAN"));
console.log(solution("AAAABABAAAA"));
console.log(solution("AAAABAB"));
