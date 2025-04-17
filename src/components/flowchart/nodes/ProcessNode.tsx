
import { Handle, Position } from '@xyflow/react';

type ProcessNodeProps = {
  data: {
    label: string;
    flags?: boolean;
  };
  selected?: boolean;
};

const ProcessNode = ({ data, selected }: ProcessNodeProps) => {
  const flags = [
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'es', name: 'Spain' },
    { code: 'it', name: 'Italy' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'us', name: 'United States' },
    { code: 'cn', name: 'China' },
    { code: 'jp', name: 'Japan' },
  ];

  return (
    <div 
      className={`process-node bg-blue-400 text-white p-4 rounded-md flex flex-col items-center justify-center ${selected ? 'ring-2 ring-blue-700' : ''}`}
      style={{ minWidth: '100px', minHeight: '80px' }}
    >
      <div className="text-sm font-medium mb-1">{data.label}</div>
      
      {data.flags && (
        <div className="flags-container grid grid-cols-4 gap-1 mt-2">
          {flags.map((flag, index) => (
            <div key={index} className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-[8px]">
              {flag.code}
            </div>
          ))}
        </div>
      )}
      
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

export default ProcessNode;
