
import { Layout } from "@/components/Layout";
import FlowChart from "@/components/flowchart/FlowChart";

const Index = () => {
  return (
    <Layout>
      <div className="h-full w-full">
        <header className="bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Flow Designer</h1>
            <div className="space-x-2">
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Share
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Save
              </button>
            </div>
          </div>
        </header>
        <div className="h-[calc(100%-4rem)]">
          <FlowChart />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
