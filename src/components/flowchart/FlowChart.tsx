
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
  getRectOfNodes,
  getTransformForBounds,
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

// Use an empty flow as initial state
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
        width: nodesBounds.width + 100,
        height: nodesBounds.height + 100,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
      filter: (node) => {
        // Don't include controls in the exported image
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
