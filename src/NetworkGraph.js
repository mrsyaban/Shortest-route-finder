import React from 'react';
import { Network } from 'vis-network';

const data = {
  nodes: [
    { id: 1, label: 'Node 1', color: 'red' },
    { id: 2, label: 'Node 2', color: 'red' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
  ],
  edges: [
    { from: 1, to: 2, color: 'red' },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ],
};

const options = {
  nodes: {
    shape: 'circle',
    color: '#8d99ae',
  },
  edges: {
    color: '#8d99ae',
    width: '8',
  },
};

const NetworkGraph = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const network = new Network(containerRef.current, data, options);
    return () => network.destroy();
  }, []);

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default NetworkGraph;
