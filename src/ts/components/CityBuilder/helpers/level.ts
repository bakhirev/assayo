type IMap = number[][];
type ICell = {
  row: number,
  column: number,
  corridor: [number, number],
};

function getMap(height: number, width: number): IMap {
  return Array(height).fill(0).map(() => Array(width).fill(0));
}

export function getRandom(max: number): number {
  return Math.round(Math.random() * max);
}

function getNeighbor(visited: any, row: number, column: number): ICell | null {
  const neighbors: ICell[] = [];
  if ((visited[row - 2] || [])[column] === 0) neighbors.push({
    row: row - 2,
    column: column,
    corridor: [row - 1, column],
  });

  if (visited[row][column + 2] === 0) neighbors.push({
    row: row,
    column: column + 2,
    corridor: [row, column + 1],
  });

  if (visited[row][column - 2] === 0) neighbors.push({
    row: row,
    column: column - 2,
    corridor: [row, column - 1],
  });

  if ((visited[row + 2] || [])[column] === 0) neighbors.push({
    row: row + 2,
    column: column,
    corridor: [row + 1, column],
  });

  if (!neighbors.length) return null;
  const index = getRandom(neighbors.length - 1);
  return neighbors[index];
}

function step(visited: IMap, history: any) {
  if (history.length === 0) return false;
  const current = history[history.length - 1];
  visited[current.row][current.column] = 1;
  const neighbor = getNeighbor(visited, current.row, current.column);
  if (neighbor) {
    visited[neighbor.corridor[0]][neighbor.corridor[1]] = 1;
    history.push(neighbor);
  } else {
    history.pop();
  }
  return true;
}

export function getRandomLevel( width: number, height: number) {
  const visited = getMap(height + 2, width + 2);
  const stack = [{ row: 1, column: 1 }];
  while (step(visited, stack)) {
  }
  visited.shift();
  visited.forEach((row) => {
    row.shift();
  });
  return visited;
}

export function getCopyLevel(level: IMap) {
  return level.map(row => [...row]);
}

export function printLevel(level: IMap) {
  console.log(level.map(row => row.map(v => v ? '#' : ' ').join(' ')).join('\n'));
}
