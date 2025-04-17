
import React from 'react';
import { X } from 'lucide-react';

type PropertiesPanelProps = {
  node: any;
  onClose: () => void;
  onChange: (id: string, data: any) => void;
};

const PropertiesPanel = ({ node, onClose, onChange }: PropertiesPanelProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(node.id, { ...node.data, [name]: value });
  };

  const handleColorChange = (color: string) => {
    const variant = color === 'purple' ? 'purple' : color === 'dark' ? 'dark' : undefined;
    onChange(node.id, { ...node.data, variant });
  };

  return (
    <div className="bg-white border-l border-gray-200 w-72 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Node Properties</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
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
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        
        {node.type === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              <div 
                onClick={() => handleColorChange('default')}
                className={`h-6 w-6 rounded-full bg-gray-200 cursor-pointer ${!node.data.variant ? 'ring-2 ring-blue-500' : ''}`}
              ></div>
              <div 
                onClick={() => handleColorChange('purple')}
                className={`h-6 w-6 rounded-full bg-purple-500 cursor-pointer ${node.data.variant === 'purple' ? 'ring-2 ring-blue-500' : ''}`}
              ></div>
              <div 
                onClick={() => handleColorChange('dark')}
                className={`h-6 w-6 rounded-full bg-black cursor-pointer ${node.data.variant === 'dark' ? 'ring-2 ring-blue-500' : ''}`}
              ></div>
            </div>
          </div>
        )}
        
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
                onChange={(e) => onChange(node.id, { ...node.data, flags: e.target.checked })}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show Flags
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
