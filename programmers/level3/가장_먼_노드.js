function solution(n, edge) {
  const connects = new Array(n).fill().map(_ => []);

  // 각 노드와 연결된 노드
  // [[1번 노드와 연결된 노드], [2번 노드와 연결된 노드], ...]
  for (const e of edge) {
    connects[e[0] - 1].push(e[1] - 1);
    connects[e[1] - 1].push(e[0] - 1);
  }

  const visited = [1]; // deps
  const queue = [0]; // 1번 노드
  while (queue.length) {
    console.log(visited);
    const cur = queue.shift();

    for (const next of connects[cur]) {
      if (!visited[next]) {
        // 방문을 안 했을 경우에만
        visited[next] = visited[cur] + 1;
        queue.push(next);
      }
    }
  }

  const max = Math.max(...visited);

  return visited.filter(el => el === max).length;
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2]
  ])
);
