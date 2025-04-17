
import { Handle, Position } from '@xyflow/react';

type ImageNodeProps = {
  data: {
    imageUrl: string;
    label?: string;
  };
  selected?: boolean;
};

const ImageNode = ({ data, selected }: ImageNodeProps) => {
  return (
    <div 
      className={`image-node rounded-md overflow-hidden flex flex-col ${selected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ minWidth: '120px', minHeight: '100px' }}
    >
      {data.imageUrl && (
        <div className="image-container flex-1 min-h-[80px] overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt={data.label || 'Uploaded image'} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {data.label && (
        <div className="bg-gray-800 text-white text-xs py-1 px-2 truncate">
          {data.label}
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

export default ImageNode;
