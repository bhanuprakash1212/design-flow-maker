
import { Handle, Position } from '@xyflow/react';

type DecisionNodeProps = {
  data: {
    label: string;
  };
  selected?: boolean;
};

const DecisionNode = ({ data, selected }: DecisionNodeProps) => {
  return (
    <div className="relative">
      {/* Diamond shape using a pseudo-element */}
      <div 
        className={`diamond-container w-32 h-32 relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
      >
        <div className="absolute inset-0 flex items-center justify-center rotate-45 bg-yellow-300 border border-yellow-400 shadow-md">
          <div className="transform -rotate-45 p-4 text-center">
            <div className="text-sm font-medium">{data.label}</div>
          </div>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
        style={{ top: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
        style={{ bottom: -6 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
        style={{ left: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-white"
        style={{ right: -6 }}
      />
    </div>
  );
};

export default DecisionNode;
