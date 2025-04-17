
import { Layout } from "@/components/Layout";
import FlowChart from "@/components/flowchart/FlowChart";
import { Button } from "@/components/ui/button";
import { Download, Share, Save, Undo, Redo, ZoomIn, ZoomOut } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="h-full w-full flex flex-col">
        <header className="bg-white p-4 border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Flow Designer</h1>
              <div className="h-5 border-r border-gray-300 mx-2"></div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Undo">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Redo">
                  <Redo className="h-4 w-4" />
                </Button>
                <div className="h-5 border-r border-gray-300 mx-1"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Zoom In">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Zoom Out">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="default" size="sm" className="gap-1.5 bg-purple-600 hover:bg-purple-700">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 min-h-0">
          <FlowChart />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
