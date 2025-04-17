
import { Handle, Position } from '@xyflow/react';

type DecisionNodeProps = {
  data: {
    label: string;
  };
  selected?: boolean;
};

const DecisionNode = ({ data, selected }: DecisionNodeProps) => {
  return (
    <div 
      className={`diamond-node relative w-32 h-20 text-center flex items-center justify-center bg-yellow-300 transform rotate-45 ${selected ? 'border-2 border-blue-500' : ''}`}
      style={{ minWidth: '80px', minHeight: '80px' }}
    >
      <div className="transform -rotate-45">
        <div className="text-sm font-medium">{data.label}</div>
      </div>
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
      <Handle
        type="source"
        position={Position.Left}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
      />
    </div>
  );
};

export default DecisionNode;
