// src/components/NestedFlowChart.js
import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
  { id: '1', data: { label: 'API Config 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'API Config 2' }, position: { x: 200, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

function NestedFlowChart() {
  return <ReactFlow elements={elements} />;
}

export default NestedFlowChart;
