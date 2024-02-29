import chroma from 'chroma-js';

class Grid {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getAdjacentNodes(position) {
    return this.nodes.filter(node => isAdjacent(node, new ColorNode('', position)));
  }
}

class ColorNode {
  constructor(color, position) {
    this.color = color;
    this.position = position;
    this.adjacentNodes = [];
  }
}

function colorDifference(color1, color2) {
  const labA = chroma(color1).lab();
  const labB = chroma(color2).lab();
  const deltaE = Math.sqrt(labA.reduce((acc, val, i) => acc + Math.pow(val - labB[i], 2), 0));
  return deltaE;
}

function isAdjacent(node1, node2) {
  const dx = Math.abs(node1.position.x - node2.position.x);
  const dy = Math.abs(node1.position.y - node2.position.y);
  return dx <= 1 && dy <= 1 && (dx + dy > 0);
}

function addNodeToGrid(grid, position, color) {
  const adjacentNodes = grid.getAdjacentNodes(position);
  const validPlacement = adjacentNodes.every(adjNode => colorDifference(adjNode.color, color) >= 2);

  if (validPlacement) {
    const newNode = new ColorNode(color, position);
    grid.addNode(newNode);
    // Linking adjacent nodes
    adjacentNodes.forEach(adjNode => {
      newNode.adjacentNodes.push(adjNode);
      adjNode.adjacentNodes.push(newNode);
    });
    return true;
  } else {
    console.error("Color too similar to adjacent nodes.");
    return false;
  }
}

export { Grid, ColorNode, colorDifference, addNodeToGrid };
