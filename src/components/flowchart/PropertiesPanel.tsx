
import React from 'react';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PropertiesPanelProps = {
  node?: any;
  edge?: any;
  onClose: () => void;
  onNodeChange: (id: string, data: any) => void;
  onNodeStyleChange: (id: string, style: any) => void;
  onEdgeStyleChange: (id: string, style: any) => void;
  colorPalette: string[];
  edgeStyles: {
    id: string;
    label: string;
    style: any;
    animated?: boolean;
  }[];
};

const PropertiesPanel = ({ 
  node, 
  edge, 
  onClose, 
  onNodeChange, 
  onNodeStyleChange,
  onEdgeStyleChange,
  colorPalette,
  edgeStyles
}: PropertiesPanelProps) => {
  
  const handleNodeDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onNodeChange(node.id, { ...node.data, [name]: value });
  };

  const handleNodeColorChange = (color: string) => {
    onNodeStyleChange(node.id, { backgroundColor: color });
  };

  const handleNodeVariantChange = (variant: string | undefined) => {
    onNodeChange(node.id, { ...node.data, variant });
  };

  const handleEdgeStyleChange = (styleId: string) => {
    const style = edgeStyles.find(s => s.id === styleId);
    if (style && edge) {
      onEdgeStyleChange(edge.id, {
        animated: style.animated,
        style: style.style
      });
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 w-80 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Properties</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {node && (
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded">
                {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input 
                type="text" 
                name="label" 
                value={node.data.label || ''}
                onChange={handleNodeDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">X</label>
                  <input 
                    type="number" 
                    value={Math.round(node.position.x)} 
                    disabled
                    className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Y</label>
                  <input 
                    type="number" 
                    value={Math.round(node.position.y)} 
                    disabled
                    className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm"
                  />
                </div>
              </div>
            </div>
            
            {node.type === 'process' && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <input 
                    type="checkbox" 
                    checked={!!node.data.flags} 
                    onChange={(e) => onNodeChange(node.id, { ...node.data, flags: e.target.checked })}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show Flags
                </label>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4">
            {node.type === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style Variant
                </label>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleNodeVariantChange(undefined)}
                    className={`h-8 px-3 rounded-md border ${!node.data.variant ? 'ring-2 ring-blue-500 bg-gray-100' : 'border-gray-300'}`}
                  >
                    Default
                  </button>
                  <button 
                    onClick={() => handleNodeVariantChange('purple')}
                    className={`h-8 px-3 rounded-md border ${node.data.variant === 'purple' ? 'ring-2 ring-blue-500 bg-purple-100' : 'border-gray-300'}`}
                  >
                    Purple
                  </button>
                  <button 
                    onClick={() => handleNodeVariantChange('dark')}
                    className={`h-8 px-3 rounded-md border ${node.data.variant === 'dark' ? 'ring-2 ring-blue-500 bg-gray-800 text-white' : 'border-gray-300'}`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="grid grid-cols-7 gap-2">
                {colorPalette.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-md border ${node.style?.backgroundColor === color ? 'ring-2 ring-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleNodeColorChange(color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width</label>
                  <input 
                    type="number" 
                    value={node.style?.width || 100} 
                    onChange={(e) => onNodeStyleChange(node.id, { width: parseInt(e.target.value) })}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height</label>
                  <input 
                    type="number" 
                    value={node.style?.height || 'auto'} 
                    onChange={(e) => onNodeStyleChange(node.id, { height: parseInt(e.target.value) })}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      {edge && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edge Type
            </label>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded">
              Connection
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Style
            </label>
            <div className="space-y-2 mt-2">
              {edgeStyles.map((style, index) => (
                <button
                  key={index}
                  className={`flex items-center w-full p-2 rounded-md ${
                    (edge.animated === style.animated && 
                    JSON.stringify(edge.style) === JSON.stringify(style.style)) 
                      ? 'bg-gray-100' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleEdgeStyleChange(style.id)}
                >
                  <div className="w-16 h-1 mr-2" style={{ 
                    ...style.style, 
                    strokeDasharray: style.id === 'dashed' ? '5,5' : undefined 
                  }}></div>
                  <span>{style.label}</span>
                  {style.animated && <span className="ml-2 text-xs text-blue-500">Animated</span>}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input 
              type="text" 
              value={edge.label || ''}
              onChange={(e) => onEdgeStyleChange(edge.id, { label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Add label..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
