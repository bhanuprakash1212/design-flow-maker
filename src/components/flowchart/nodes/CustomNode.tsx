
import { Handle, Position } from '@xyflow/react';

type CustomNodeProps = {
  data: {
    label?: string;
    content?: React.ReactNode;
    variant?: 'purple' | 'dark';
  };
  selected?: boolean;
};

const CustomNode = ({ data, selected }: CustomNodeProps) => {
  // Determine background color based on variant
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-900';
  
  if (data.variant === 'purple') {
    bgColor = 'bg-purple-500';
    textColor = 'text-white';
  } else if (data.variant === 'dark') {
    bgColor = 'bg-black';
    textColor = 'text-white';
  }

  return (
    <div 
      className={`custom-node ${bgColor} ${textColor} p-3 rounded-md flex items-center justify-center ${selected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ minWidth: '60px', minHeight: '40px' }}
    >
      {data.content ? data.content : <div className="text-sm font-medium">{data.label}</div>}
      
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
      />
    </div>
  );
};

export default CustomNode;
