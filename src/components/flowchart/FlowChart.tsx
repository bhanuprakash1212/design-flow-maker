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
import { toPng } from 'html-to-image';

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

const templates = {
  blank: {
    nodes: [],
    edges: []
  },
  simpleProcess: {
    nodes: [
      {
        id: 'node-1',
        type: 'process',
        position: { x: 250, y: 100 },
        data: { label: 'Start Process' },
        style: { backgroundColor: '#e0f2fe' }
      },
      {
        id: 'node-2',
        type: 'process',
        position: { x: 250, y: 200 },
        data: { label: 'Step 1' },
        style: { backgroundColor: '#f3f4f6' }
      },
      {
        id: 'node-3',
        type: 'decision',
        position: { x: 250, y: 300 },
        data: { label: 'Decision' },
        style: { width: 150, height: 100 }
      },
      {
        id: 'node-4',
        type: 'process',
        position: { x: 100, y: 400 },
        data: { label: 'Option A' },
        style: { backgroundColor: '#dcfce7' }
      },
      {
        id: 'node-5',
        type: 'process',
        position: { x: 400, y: 400 },
        data: { label: 'Option B' },
        style: { backgroundColor: '#fee2e2' }
      },
      {
        id: 'node-6',
        type: 'process',
        position: { x: 250, y: 500 },
        data: { label: 'End Process' },
        style: { backgroundColor: '#e0f2fe' }
      }
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e2-3', source: 'node-2', target: 'node-3', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e3-4', source: 'node-3', target: 'node-4', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e3-5', source: 'node-3', target: 'node-5', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e4-6', source: 'node-4', target: 'node-6', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e5-6', source: 'node-5', target: 'node-6', animated: false, style: { stroke: '#b8b8b8' } }
    ]
  },
  feedback: {
    nodes: [
      {
        id: 'start',
        type: 'process',
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
        style: { backgroundColor: '#e0f2fe' }
      },
      {
        id: 'create',
        type: 'process',
        position: { x: 250, y: 150 },
        data: { label: 'Create Product' },
        style: { backgroundColor: '#f3f4f6' }
      },
      {
        id: 'feedback',
        type: 'process',
        position: { x: 250, y: 250 },
        data: { label: 'Collect Feedback' },
        style: { backgroundColor: '#fef3c7' }
      },
      {
        id: 'improve',
        type: 'decision',
        position: { x: 250, y: 350 },
        data: { label: 'Improvements Needed?' },
      },
      {
        id: 'ship',
        type: 'process',
        position: { x: 400, y: 450 },
        data: { label: 'Ship Product' },
        style: { backgroundColor: '#dcfce7' }
      },
      {
        id: 'iterate',
        type: 'process',
        position: { x: 100, y: 450 },
        data: { label: 'Iterate Design' },
        style: { backgroundColor: '#f5d0fe' }
      }
    ],
    edges: [
      { id: 'e-start-create', source: 'start', target: 'create', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e-create-feedback', source: 'create', target: 'feedback', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e-feedback-improve', source: 'feedback', target: 'improve', animated: false, style: { stroke: '#b8b8b8' } },
      { id: 'e-improve-ship', source: 'improve', target: 'ship', animated: false, label: 'No', style: { stroke: '#b8b8b8' } },
      { id: 'e-improve-iterate', source: 'improve', target: 'iterate', animated: false, label: 'Yes', style: { stroke: '#b8b8b8' } },
      { id: 'e-iterate-feedback', source: 'iterate', target: 'feedback', animated: true, style: { stroke: '#b8b8b8' } }
    ]
  }
};

const initialNodes: Node[] = [];
const initialEdges: CustomEdge[] = [];

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

function getRectOfNodes(nodes: Node[]) {
  if (nodes.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const nodeWidth = node.width || 150; // Default width if not specified
    const nodeHeight = node.height || 50; // Default height if not specified

    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + nodeWidth);
    maxY = Math.max(maxY, node.position.y + nodeHeight);
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function getTransformForBounds(
  bounds: { width: number; height: number; x: number; y: number },
  size: { width: number; height: number },
  padding: number = 0.1
) {
  const xScale = size.width / bounds.width;
  const yScale = size.height / bounds.height;
  const scale = Math.min(xScale, yScale) * (1 - padding);

  const xOffset = -bounds.x * scale + (size.width - bounds.width * scale) / 2;
  const yOffset = -bounds.y * scale + (size.height - bounds.height * scale) / 2;

  return [xOffset, yOffset, scale];
}

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
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [showTemplates, setShowTemplates] = useState(false);

  const selectedNodeObj = nodes.find(node => node.id === selectedNode);
  const selectedEdgeObj = edges.find(edge => edge.id === selectedEdge);

  const [history, setHistory] = useState<{nodes: Node[], edges: CustomEdge[]}[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHistoryAction, setIsHistoryAction] = useState(false);

  useEffect(() => {
    if (nodes.length === 0 && edges.length === 0) {
      setNodes(templates.blank.nodes);
      setEdges(templates.blank.edges as CustomEdge[]);
      
      setHistory([{nodes: templates.blank.nodes, edges: templates.blank.edges as CustomEdge[]}]);
      setHistoryIndex(0);
    }
  }, []);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      if (!isHistoryAction) {
        const newHistory = [...history.slice(0, historyIndex + 1), {nodes: [...nodes], edges: [...edges]}];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
      setIsHistoryAction(false);
    }
  }, [nodes, edges]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setIsHistoryAction(true);
      const prevState = history[historyIndex - 1];
      setNodes([...prevState.nodes]);
      setEdges([...prevState.edges]);
      setHistoryIndex(historyIndex - 1);
      
      toast({
        title: "Undo",
        description: "Previous action undone",
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setIsHistoryAction(true);
      const nextState = history[historyIndex + 1];
      setNodes([...nextState.nodes]);
      setEdges([...nextState.edges]);
      setHistoryIndex(historyIndex + 1);
      
      toast({
        title: "Redo",
        description: "Action redone",
      });
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

  const applyTemplate = (templateName: string) => {
    if (templates[templateName as keyof typeof templates]) {
      const template = templates[templateName as keyof typeof templates];
      setNodes(template.nodes);
      setEdges(template.edges as CustomEdge[]);
      
      setHistory([{nodes: template.nodes, edges: template.edges as CustomEdge[]}]);
      setHistoryIndex(0);
      
      setShowTemplates(false);
      
      toast({
        title: "Template Applied",
        description: `The ${templateName} template has been applied`,
      });
    }
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
    if (!reactFlowWrapper.current || nodes.length === 0) {
      toast({
        title: "Cannot Export",
        description: "There are no nodes to export or the flow is not ready",
        variant: "destructive"
      });
      return;
    }

    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
      nodesBounds,
      {
        width: nodesBounds.width + 100,
        height: nodesBounds.height + 100,
      },
      0.5
    );

    toPng(reactFlowWrapper.current, {
      backgroundColor: '#ffffff',
      width: nodesBounds.width + 100,
      height: nodesBounds.height + 100,
      style: {
        width: nodesBounds.width + 100 + 'px',
        height: nodesBounds.height + 100 + 'px',
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
      filter: (node) => {
        if (
          node?.classList?.contains('react-flow__panel') ||
          node?.classList?.contains('react-flow__controls') ||
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('properties-panel')
        ) {
          return false;
        }
        return true;
      },
    })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `flowchart_${new Date().toISOString().slice(0,10)}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Export as PNG",
        description: "Your flowchart has been exported as PNG",
      });
    })
    .catch((error) => {
      console.error('Error exporting image:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your flowchart",
        variant: "destructive"
      });
    });
  };

  const shareFlowchart = () => {
    navigator.clipboard.writeText(`${window.location.origin}/editor?shared=true`)
      .then(() => {
        toast({
          title: "Share Link Created",
          description: "A shareable link has been copied to your clipboard",
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Share Failed",
          description: "There was an error creating a shareable link",
          variant: "destructive"
        });
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
      {showTemplates && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select a Template</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowTemplates(false)}
                className="rounded-full h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                onClick={() => applyTemplate('blank')}
              >
                <h3 className="font-medium mb-2">Blank Canvas</h3>
                <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400">
                  Start from scratch
                </div>
              </div>
              
              <div 
                className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                onClick={() => applyTemplate('simpleProcess')}
              >
                <h3 className="font-medium mb-2">Simple Process</h3>
                <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                  <div className="w-3/4 h-24 bg-white rounded shadow-sm relative">
                    <div className="absolute w-1/2 h-2 bg-blue-500 top-4 left-1/4 rounded"></div>
                    <div className="absolute w-6 h-6 bg-yellow-300 top-8 left-1/4 rounded-full"></div>
                    <div className="absolute w-6 h-6 bg-green-300 top-8 right-1/4 rounded-full"></div>
                    <div className="absolute w-1/2 h-2 bg-blue-500 bottom-4 left-1/4 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div 
                className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                onClick={() => applyTemplate('feedback')}
              >
                <h3 className="font-medium mb-2">Feedback Loop</h3>
                <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                  <div className="w-3/4 h-24 bg-white rounded shadow-sm relative">
                    <div className="absolute w-12 h-3 bg-blue-500 top-6 left-1/4 rounded"></div>
                    <div className="absolute w-8 h-8 transform rotate-45 bg-yellow-300 top-8 left-1/2 -ml-4"></div>
                    <div className="absolute w-12 h-3 bg-purple-500 bottom-6 right-1/4 rounded"></div>
                    <div className="absolute w-12 h-12 border-2 border-dashed border-purple-500 right-1/4 top-1/2 -mt-6 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setShowTemplates(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={reactFlowWrapper}
        className={`flex-1 ${showProperties ? 'border-r border-gray-200' : ''}`}
      >
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
          <Background gap={20} size={1} color="#f0f0f0" variant={BackgroundVariant.Lines} />
          
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={handleUndo} 
                        disabled={historyIndex <= 0}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Undo</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={handleRedo} 
                        disabled={historyIndex >= history.length - 1}
                      >
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
                
                <div className="h-px bg-gray-200 w-full"></div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setShowTemplates(true)}
                    >
                      <LayoutTemplate className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Templates</TooltipContent>
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
