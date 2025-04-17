
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const templates = [
  {
    id: 'userflow',
    title: 'User Flow',
    description: 'Template for mapping out user journeys through your application or website',
    image: '/placeholder.svg',
    category: 'UX/UI'
  },
  {
    id: 'sitemap',
    title: 'Site Map',
    description: 'Visualize your website structure with this comprehensive site mapping template',
    image: '/placeholder.svg',
    category: 'Web Design'
  },
  {
    id: 'process',
    title: 'Business Process',
    description: 'Map out business processes, approvals, and workflows with this template',
    image: '/placeholder.svg',
    category: 'Business'
  },
  {
    id: 'mindmap',
    title: 'Mind Map',
    description: 'Brainstorm ideas and concepts with this mind mapping template',
    image: '/placeholder.svg',
    category: 'Ideation'
  },
  {
    id: 'dataflow',
    title: 'Data Flow Diagram',
    description: 'Visualize how data moves through systems with this data flow template',
    image: '/placeholder.svg',
    category: 'Development'
  },
  {
    id: 'orgchart',
    title: 'Organization Chart',
    description: 'Create organizational hierarchies and team structures',
    image: '/placeholder.svg',
    category: 'Business'
  },
  {
    id: 'gantt',
    title: 'Gantt Chart',
    description: 'Plan project timelines and milestones with this Gantt chart template',
    image: '/placeholder.svg',
    category: 'Project Management'
  },
  {
    id: 'decision',
    title: 'Decision Tree',
    description: 'Map out decision points and outcomes for complex scenarios',
    image: '/placeholder.svg',
    category: 'Planning'
  }
];

const TemplatesPage = () => {
  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Templates</h1>
          <p className="text-gray-600">Start your flowchart with a pre-built template</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 border-b">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{template.title}</CardTitle>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1">
                      {template.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>
                  {template.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Link to="/editor">
                  <Button variant="default" size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700">
                    Use Template
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesPage;
