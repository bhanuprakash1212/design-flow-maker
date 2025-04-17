import React, { useCallback, useState, useRef, useEffect } from 'react';
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
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './flowchart.css';
import PropertiesPanel from './PropertiesPanel';

import DecisionNode from './nodes/DecisionNode';
import ProcessNode from './nodes/ProcessNode';
import CustomNode from './nodes/CustomNode';
import ImageNode from './nodes/ImageNode';
import { 
  Square, 
  Circle, 
  Diamond as DiamondIcon, 
  LayoutTemplate,
  Plus,
  Trash2,
  Download,
  Share2,
  Image,
  FileText,
  Palette,
  ArrowUpRight,
  CornerDownRight,
  Move,
  ZoomIn,
  ZoomOut,
  Type,
  Copy,
  Scissors,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Grid3X3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const nodeTypes = {
  decision: DecisionNode,
  process: ProcessNode,
  custom: CustomNode,
  image: ImageNode,
};

interface CustomEdge extends Edge {
  animated: boolean;
  style: {
    stroke: string;
    strokeDasharray?: string;
    strokeWidth?: number;
  };
}

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

const initialEdges: CustomEdge[] = [
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

const colorPalette = [
  "#f3f4f6", // light gray
  "#fee2e2", // light red
  "#e0f2fe", // light blue
  "#dcfce7", // light green
  "#fef3c7", // light yellow
  "#f5d0fe", // light purple
  "#ffffff", // white
];

const edgeStyles = [
  { id: "default", label: "Default", style: { stroke: '#b8b8b8' }, animated: false },
  { id: "dashed", label: "Dashed", style: { stroke: '#b8b8b8', strokeDasharray: '5,5' }, animated: false },
  { id: "thick", label: "Thick", style: { stroke: '#b8b8b8', strokeWidth: 3 }, animated: false },
  { id: "animated", label: "Animated", style: { stroke: '#b8b8b8' }, animated: true },
];

const FlowChartContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [showProperties, setShowProperties] = useState(false);
  const [nodeColor, setNodeColor] = useState("#f3f4f6");
  const [edgeStyle, setEdgeStyle] = useState(edgeStyles[0]);
  const [copiedNode, setCopiedNode] = useState<Node | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reactFlowInstance = useReactFlow();

  const selectedNodeObj = nodes.find(node => node.id === selectedNode);
  const selectedEdgeObj = edges.find(edge => edge.id === selectedEdge);

  const [history, setHistory] = useState<{nodes: Node[], edges: CustomEdge[]}[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      if (historyIndex === history.length - 1) {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), {nodes, edges}]);
        setHistoryIndex(prev => prev + 1);
      }
    }
  }, [nodes, edges]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(prevState => {
        return nextState.edges.map(edge => ({
          ...edge,
          animated: edge.animated || false,
          style: edge.style || { stroke: '#b8b8b8' }
        }));
      });
      setHistoryIndex(historyIndex + 1);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: CustomEdge = {
        ...params,
        id: `e${params.source}-${params.target}-${Date.now()}`,
        animated: edgeStyle.animated,
        style: edgeStyle.style,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, edgeStyle]
  );

  const addNode = (type: string) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: type,
      position: { x: 250, y: 250 },
      data: { 
        label: type === 'decision' ? 'New Decision' : 'New Node',
        variant: type === 'custom' ? 'purple' : undefined,
      },
      style: { 
        width: type === 'custom' ? 100 : undefined,
        backgroundColor: nodeColor
      },
    };
    setNodes((nds) => nds.concat(newNode));
    toast({
      title: "Node Added",
      description: `A new ${type} node has been added to the canvas`,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        const newNode = {
          id: `image_${Date.now()}`,
          type: 'image',
          position: { x: 250, y: 250 },
          data: { 
            imageUrl: imageUrl,
            label: file.name,
          },
          style: { width: 150 },
        };
        
        setNodes((nds) => nds.concat(newNode));
        toast({
          title: "Image Added",
          description: `The image "${file.name}" has been added to the canvas`,
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setSelectedEdge(null);
    setShowProperties(true);
  };

  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge.id);
    setSelectedNode(null);
    setShowProperties(true);
  };

  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== selectedNode && edge.target !== selectedNode
      ));
      setSelectedNode(null);
      setShowProperties(false);
      toast({
        title: "Node Deleted",
        description: "The selected node has been removed from the canvas",
      });
    } else if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge));
      setSelectedEdge(null);
      setShowProperties(false);
      toast({
        title: "Edge Deleted",
        description: "The selected edge has been removed from the canvas",
      });
    }
  };

  const copySelectedNode = () => {
    if (selectedNode) {
      const nodeToCopy = nodes.find(node => node.id === selectedNode);
      if (nodeToCopy) {
        setCopiedNode(nodeToCopy);
        toast({
          title: "Node Copied",
          description: "The selected node has been copied to clipboard",
        });
      }
    }
  };

  const pasteNode = () => {
    if (copiedNode) {
      const newNode = {
        ...copiedNode,
        id: `node_${Date.now()}`,
        position: {
          x: copiedNode.position.x + 50,
          y: copiedNode.position.y + 50
        }
      };
      setNodes((nds) => nds.concat(newNode));
      toast({
        title: "Node Pasted",
        description: "The copied node has been added to the canvas",
      });
    }
  };

  const handleZoom = (action: 'in' | 'out' | 'fit') => {
    if (action === 'in') {
      reactFlowInstance.zoomIn();
    } else if (action === 'out') {
      reactFlowInstance.zoomOut();
    } else if (action === 'fit') {
      reactFlowInstance.fitView();
    }
  };

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

  const handleNodeStyleChange = (id: string, style: any) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, style: {...node.style, ...style} };
        }
        return node;
      })
    );
  };

  const handleEdgeStyleChange = (id: string, style: any) => {
    setEdges((eds) => 
      eds.map((edge) => {
        if (edge.id === id) {
          return { ...edge, ...style };
        }
        return edge;
      })
    );
  };

  const saveFlowchart = () => {
    const flowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(flowData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `flowchart_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
    
    toast({
      title: "Flowchart Saved",
      description: "Your flowchart has been saved successfully",
    });
  };

  const exportAsPNG = () => {
    toast({
      title: "Export as PNG",
      description: "Your flowchart has been exported as PNG",
    });
  };

  const shareFlowchart = () => {
    toast({
      title: "Share Link Created",
      description: "A shareable link has been copied to your clipboard",
    });
  };

  const closeProperties = () => {
    setShowProperties(false);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const selectEdgeStyle = (style: typeof edgeStyles[0]) => {
    setEdgeStyle(style);
    
    if (selectedEdge) {
      handleEdgeStyleChange(selectedEdge, {
        animated: style.animated,
        style: style.style
      });
    }
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
          onEdgeClick={onEdgeClick}
          onPaneClick={closeProperties}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={16} color="#f1f1f1" variant={BackgroundVariant.Dots} />
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <Panel position="top-left" className="bg-white shadow-md rounded-md p-2 flex items-center space-x-4 ml-2 mt-2">
            <TooltipProvider>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleUndo} disabled={historyIndex <= 0}>
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Undo</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                        <Redo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Redo</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="h-px bg-gray-200 w-full"></div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleZoom('in')}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom In</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleZoom('out')}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom Out</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleZoom('fit')}>
                      <Move className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Fit View</TooltipContent>
                </Tooltip>
                
                <div className="h-px bg-gray-200 w-full"></div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copySelectedNode} disabled={!selectedNode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Copy</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={pasteNode} disabled={!copiedNode}>
                      <Scissors className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Paste</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 ${selectedNode || selectedEdge ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'}`}
                      onClick={deleteSelectedNode} 
                      disabled={!selectedNode && !selectedEdge}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Delete</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </Panel>
          
          <Panel position="top-center" className="bg-white shadow-md rounded-md p-2 flex items-center space-x-4">
            <TooltipProvider>
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => addNode('process')} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Add Process Node">
                      <Square className="h-5 w-5" />
                      <span className="text-xs mt-1">Process</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add Process Node</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => addNode('decision')} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Add Decision Node">
                      <DiamondIcon className="h-5 w-5" />
                      <span className="text-xs mt-1">Decision</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add Decision Node</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => addNode('custom')} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Add Custom Node">
                      <LayoutTemplate className="h-5 w-5" />
                      <span className="text-xs mt-1">Custom</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add Custom Node</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={triggerImageUpload} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Upload Image">
                      <Image className="h-5 w-5" />
                      <span className="text-xs mt-1">Image</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Upload Image</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Add Text">
                      <Type className="h-5 w-5" />
                      <span className="text-xs mt-1">Text</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add Text (Coming Soon)</TooltipContent>
                </Tooltip>
                
                <div className="h-10 border-r border-gray-300"></div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Node Color">
                      <Palette className="h-5 w-5" />
                      <span className="text-xs mt-1">Color</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3">
                    <h3 className="text-sm font-medium mb-2">Node Background Color</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {colorPalette.map((color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-md border ${nodeColor === color ? 'ring-2 ring-blue-500' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setNodeColor(color);
                            if (selectedNode) {
                              handleNodeStyleChange(selectedNode, { backgroundColor: color });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Edge Style">
                      <ArrowUpRight className="h-5 w-5" />
                      <span className="text-xs mt-1">Lines</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3">
                    <h3 className="text-sm font-medium mb-2">Edge Styles</h3>
                    <div className="space-y-2">
                      {edgeStyles.map((style, index) => (
                        <button
                          key={index}
                          className={`flex items-center w-full p-2 rounded-md ${edgeStyle.id === style.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                          onClick={() => selectEdgeStyle(style)}
                        >
                          <div className="w-16 h-1 mr-2" style={{ 
                            ...style.style, 
                            strokeDasharray: style.id === 'dashed' ? '5,5' : undefined 
                          }}></div>
                          <span>{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Align Elements">
                      <AlignCenter className="h-5 w-5" />
                      <span className="text-xs mt-1">Align</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Align Elements (Coming Soon)</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-md" title="Toggle Grid">
                      <Grid3X3 className="h-5 w-5" />
                      <span className="text-xs mt-1">Grid</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle Grid (Coming Soon)</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </Panel>
          
          <Panel position="bottom-center" className="bg-white shadow-md rounded-md p-2 mb-4 flex items-center space-x-4">
            <Button onClick={saveFlowchart} variant="ghost" className="flex items-center gap-2 hover:bg-gray-100" title="Save Diagram">
              <Save className="h-5 w-5" />
              <span>Save</span>
            </Button>
            <Button onClick={exportAsPNG} variant="ghost" className="flex items-center gap-2 hover:bg-gray-100" title="Export as PNG">
              <FileText className="h-5 w-5" />
              <span>Export PNG</span>
            </Button>
            <Button onClick={shareFlowchart} variant="ghost" className="flex items-center gap-2 hover:bg-gray-100" title="Share Diagram">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </Panel>
        </ReactFlow>
      </div>
      
      {showProperties && (selectedNodeObj || selectedEdgeObj) && (
        <div className="properties-panel">
          <PropertiesPanel 
            node={selectedNodeObj} 
            edge={selectedEdgeObj}
            onClose={closeProperties} 
            onNodeChange={handleNodeChange} 
            onNodeStyleChange={handleNodeStyleChange}
            onEdgeStyleChange={handleEdgeStyleChange}
            colorPalette={colorPalette}
            edgeStyles={edgeStyles}
          />
        </div>
      )}
    </div>
  );
};

export const FlowChart = () => {
  return (
    <ReactFlowProvider>
      <FlowChartContent />
    </ReactFlowProvider>
  );
};

export default FlowChart;
