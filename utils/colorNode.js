import chroma from 'chroma-js';

class ColorNode {
  constructor(color, position, predecessors = []) {
    this.color = color;
    this.position = position;
    this.predecessors = predecessors;
  }
};

const findAdjacentNodes = (grid, x, y) => {
  const adjacentPositions = [
    { x: x-1, y }, { x: x+1, y },
    { x, y: y-1 }, { x, y: y+1 },
    { x: x-1, y: y-1 }, { x: x+1, y: y-1 },
    { x: x-1, y: y+1 }, { x: x+1, y: y+1 }
  ];
  return adjacentPositions
    .filter(pos => grid.nodes.find(node => node.position.x === pos.x && node.position.y === pos.y))
    .map(pos => grid.nodes.find(node => node.position.x === pos.x && node.position.y === pos.y));
};

function colorDifference(color1, color2) {
  const labA = chroma(color1).lab();
  const labB = chroma(color2).lab();
  const deltaE = Math.sqrt(labA.reduce((acc, val, i) => acc + Math.pow(val - labB[i], 2), 0));
  return deltaE;
};

export { ColorNode, findAdjacentNodes, colorDifference };
