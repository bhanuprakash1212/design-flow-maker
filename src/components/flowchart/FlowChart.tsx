
import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Panel,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './flowchart.css';
import PropertiesPanel from './PropertiesPanel';

import DecisionNode from './nodes/DecisionNode';
import ProcessNode from './nodes/ProcessNode';
import CustomNode from './nodes/CustomNode';
import { 
  Square, 
  Circle, 
  Diamond as DiamondIcon, 
  LayoutTemplate,
  Plus,
  Trash2,
  Download,
  Share2
} from 'lucide-react';

// Node types for registration with ReactFlow
const nodeTypes = {
  decision: DecisionNode,
  process: ProcessNode,
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'process',
    data: { label: 'User Flow' },
    position: { x: 250, y: 0 },
  },
  {
    id: 'decision1',
    type: 'decision',
    data: { label: 'Is user country?' },
    position: { x: 250, y: 100 },
  },
  {
    id: 'yes1',
    type: 'custom',
    data: { 
      label: '',
      content: <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div> 
    },
    position: { x: 175, y: 180 },
  },
  {
    id: 'no1',
    type: 'custom',
    data: { 
      label: '',
      content: <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div> 
    },
    position: { x: 325, y: 180 },
  },
  {
    id: 'process1',
    type: 'process',
    data: { 
      label: 'Internationalized',
      flags: true
    },
    position: { x: 130, y: 250 },
    style: { width: 180 },
  },
  {
    id: 'process2',
    type: 'process',
    data: { label: 'Not Accessible' },
    position: { x: 350, y: 250 },
    style: { width: 120 },
  },
  {
    id: 'exit1',
    type: 'custom',
    data: { 
      label: 'Exit',
      variant: 'dark',
    },
    position: { x: 380, y: 350 },
    style: { width: 60 },
  },
  {
    id: 'custom1',
    type: 'custom',
    data: { 
      label: 'Account',
      variant: 'purple',
    },
    position: { x: 130, y: 330 },
    style: { width: 80 },
  },
  {
    id: 'custom2',
    type: 'custom',
    data: { 
      label: 'Currency',
      variant: 'purple',
    },
    position: { x: 130, y: 390 },
    style: { width: 80 },
  },
  {
    id: 'custom3',
    type: 'custom',
    data: { 
      label: 'Country',
      variant: 'purple',
    },
    position: { x: 130, y: 450 },
    style: { width: 80 },
  },
  {
    id: 'custom4',
    type: 'custom',
    data: { 
      label: 'Popular System',
      variant: 'purple',
    },
    position: { x: 130, y: 510 },
    style: { width: 140 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: 'start',
    target: 'decision1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e2-3',
    source: 'decision1',
    target: 'yes1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e2-4',
    source: 'decision1',
    target: 'no1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e3-5',
    source: 'yes1',
    target: 'process1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e4-6',
    source: 'no1',
    target: 'process2',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e6-7',
    source: 'process2',
    target: 'exit1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e5-8',
    source: 'process1',
    target: 'custom1',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e8-9',
    source: 'custom1',
    target: 'custom2',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e9-10',
    source: 'custom2',
    target: 'custom3',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
  {
    id: 'e10-11',
    source: 'custom3',
    target: 'custom4',
    animated: false,
    style: { stroke: '#b8b8b8' },
  },
];

export const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showProperties, setShowProperties] = useState(false);

  // Get the selected node object
  const selectedNodeObj = nodes.find(node => node.id === selectedNode);

  // Add new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ 
        ...params, 
        animated: false,
        style: { stroke: '#b8b8b8' },
      }, eds));
    },
    [setEdges]
  );

  // Add a new node of the selected type
  const addNode = (type: string) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: type,
      position: { x: 250, y: 250 },
      data: { 
        label: type === 'decision' ? 'New Decision' : 'New Node',
        variant: type === 'custom' ? 'purple' : undefined,
      },
      style: { width: type === 'custom' ? 100 : undefined },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Handle node selection
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setShowProperties(true);
  };

  // Delete the selected node
  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== selectedNode && edge.target !== selectedNode
      ));
      setSelectedNode(null);
      setShowProperties(false);
    }
  };

  // Handle node data changes from properties panel
  const handleNodeChange = (id: string, newData: any) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
  };

  // Close properties panel
  const closeProperties = () => {
    setShowProperties(false);
    setSelectedNode(null);
  };

  return (
    <div className="h-full w-full bg-gray-50 flex">
      <div className={`flex-1 ${showProperties ? 'border-r border-gray-200' : ''}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={closeProperties}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={16} color="#f1f1f1" variant={BackgroundVariant.Dots} />
          
          {/* Top Toolbar */}
          <Panel position="top-center" className="bg-white shadow-md rounded-md p-2 flex items-center space-x-4">
            <button onClick={() => addNode('process')} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" title="Add Process Node">
              <Square className="h-5 w-5" />
              <span>Process</span>
            </button>
            <button onClick={() => addNode('decision')} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" title="Add Decision Node">
              <DiamondIcon className="h-5 w-5" />
              <span>Decision</span>
            </button>
            <button onClick={() => addNode('custom')} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" title="Add Custom Node">
              <LayoutTemplate className="h-5 w-5" />
              <span>Custom</span>
            </button>
            <div className="h-6 border-r border-gray-300"></div>
            <button 
              onClick={deleteSelectedNode} 
              className={`flex items-center gap-2 p-2 rounded-md ${selectedNode ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'}`}
              disabled={!selectedNode}
              title="Delete Selected"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </Panel>
          
          {/* Bottom Toolbar */}
          <Panel position="bottom-center" className="bg-white shadow-md rounded-md p-2 mb-4 flex items-center space-x-4">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" title="Save Diagram">
              <Download className="h-5 w-5" />
              <span>Save</span>
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" title="Share Diagram">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </Panel>
        </ReactFlow>
      </div>
      
      {/* Properties Panel */}
      {showProperties && selectedNodeObj && (
        <div className="properties-panel">
          <PropertiesPanel 
            node={selectedNodeObj} 
            onClose={closeProperties} 
            onChange={handleNodeChange} 
          />
        </div>
      )}
    </div>
  );
};

export default FlowChart;
