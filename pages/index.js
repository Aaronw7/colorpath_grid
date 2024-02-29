import React, { useState } from 'react';
import Head from 'next/head';
import { ColorNode, findAdjacentNodes, colorDifference } from '../utils/colorNode';

export default function Home() {
  const [grid, setGrid] = useState({ nodes: [] });
  const [clickedCells, setClickedCells] = useState({});
  const [highlightedCells, setHighlightedCells] = useState({});
  const deltaEThreshold = 20;

  const highlightPredecessors = (node) => {
    if (!node) return;

    const key = `${node.position.x},${node.position.y}`;

    setHighlightedCells(prev => ({ ...prev, [key]: true }));

    node.predecessors.forEach(predPos => {
      const predKey = `${predPos.x},${predPos.y}`;
      const predNode = grid.nodes.find(n => `${n.position.x},${n.position.y}` === predKey);
      highlightPredecessors(predNode);
    });
  };

  const handleCellClick = (x, y) => {
    const tempGrid = { ...grid };
    const key = `${x},${y}`;

    const existingNode = grid.nodes.find(node => `${node.position.x},${node.position.y}` === key);

    if (existingNode) {
      setHighlightedCells({});
      console.log(`Cell at x: ${x}, y: ${y} is already filled. Highlighting path to origin.`);
      highlightPredecessors(existingNode);
      return;
    } else {
      setHighlightedCells({});
    }

    const adjacentNodes = findAdjacentNodes(tempGrid, x, y);
    let predecessors = [];

    if (adjacentNodes.length > 0) {
      predecessors = adjacentNodes.map(node => node.position);
    }

    const newNode = new ColorNode('bg-red-500', { x, y }, predecessors);
    tempGrid.nodes.push(newNode);

    setGrid(tempGrid);
    setClickedCells(prevState => ({
      ...prevState,
      [key]: true
    }));

    console.log(`Added node at x: ${x}, y: ${y}`);
  };

  const renderGrid = () => {
    const gridSize = 50;
    let gridVisual = [];

    const middle = Math.floor(gridSize / 2);

    for (let y = 0; y < gridSize; y++) {
      let rowVisual = [];
      for (let x = 0; x < gridSize; x++) {
        const adjustedX = x - middle;
        const adjustedY = middle - y;
        const cellKey = `${adjustedX},${adjustedY}`;
        const isCenter = adjustedX === 0 && adjustedY === 0;

        rowVisual.push(
          <div
            key={cellKey}
            className={`w-4 h-4 border ${highlightedCells[cellKey] ? 'border-green-400' : ''} ${clickedCells[cellKey] ? 'bg-red-500' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleCellClick(adjustedX, adjustedY)}
          >
            {/* FUTURE MODAL/SIDEBAR: Display node info or coordinates */}
          </div>
        );
      }
      gridVisual.push(<div key={`row-${y}`} className="flex justify-center">{rowVisual}</div>);
    }

    return (
      <div className="flex w-full h-full grid grid-cols-1 gap-0">
        {gridVisual}
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>ColorPath Grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <h1 className="text-lg font-bold mb-5">Welcome to ColorPath Grid</h1>
        {renderGrid()}
      </main>
    </div>
  );
}
