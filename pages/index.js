import React, { useState } from 'react';
import Head from 'next/head';
import { Grid, ColorNode, addNodeToGrid } from '../utils/colorNode';

export default function Home() {
  const [grid, setGrid] = useState(new Grid());
  const [clickedCells, setClickedCells] = useState({});
  const deltaEThreshold = 20;

  const handleCellClick = (x, y) => {
    const key = `${x},${y}`;
    console.log(`Clicked cell at x: ${x}, y: ${y}`);
    setClickedCells(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
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
            className={`w-4 h-4 border ${clickedCells[cellKey] ? 'bg-red-500' : 'bg-transparent'} cursor-pointer`}
            onClick={() => handleCellClick(adjustedX, adjustedY)}
          >
            {/* Future Modal/Sidebar: Display node info or coordinates */}
          </div>
        );
      }
      gridVisual.push(<div key={`row-${y}`} className="flex">{rowVisual}</div>);
    }

    return (
      <div className="grid grid-cols-1 gap-0">
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
