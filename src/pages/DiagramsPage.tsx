
import { Layout } from "@/components/Layout";
import { PlusCircle, Search, MoreVertical } from "lucide-react";

const DiagramsPage = () => {
  const diagrams = [
    { id: 1, name: "User Flow", updatedAt: "2 days ago", team: "Design Team" },
    { id: 2, name: "Payment Process", updatedAt: "1 week ago", team: "Finance" },
    { id: 3, name: "Onboarding Flow", updatedAt: "3 days ago", team: "Product" },
    { id: 4, name: "Checkout Process", updatedAt: "1 day ago", team: "Engineering" },
    { id: 5, name: "Account Setup", updatedAt: "Just now", team: "Design Team" },
  ];

  return (
    <Layout>
      <div className="h-full w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Diagrams</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <PlusCircle className="h-5 w-5" />
            <span>New Diagram</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search diagrams..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-md shadow">
          <div className="px-6 py-3 border-b border-gray-200 grid grid-cols-12 text-sm font-medium text-gray-500">
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Last Updated</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-1"></div>
          </div>
          {diagrams.map((diagram) => (
            <div 
              key={diagram.id} 
              className="px-6 py-4 border-b border-gray-200 grid grid-cols-12 items-center hover:bg-gray-50 cursor-pointer"
            >
              <div className="col-span-5 font-medium">{diagram.name}</div>
              <div className="col-span-3 text-gray-500">{diagram.updatedAt}</div>
              <div className="col-span-3 text-gray-500">{diagram.team}</div>
              <div className="col-span-1 flex justify-end">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DiagramsPage;
