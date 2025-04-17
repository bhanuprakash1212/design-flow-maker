
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const tutorials = [
  {
    id: 'getting-started',
    title: 'Getting Started with Flow Designer',
    description: 'Learn the basics of creating flowcharts and diagrams with Flow Designer',
    duration: '5 min',
    level: 'Beginner',
    image: '/placeholder.svg'
  },
  {
    id: 'advanced-nodes',
    title: 'Advanced Node Types and Customization',
    description: 'Explore different node types and how to customize them for your specific needs',
    duration: '8 min',
    level: 'Intermediate',
    image: '/placeholder.svg'
  },
  {
    id: 'edge-styling',
    title: 'Edge Styling and Animations',
    description: 'Learn how to style edges and add animations to make your flowcharts more dynamic',
    duration: '6 min',
    level: 'Intermediate',
    image: '/placeholder.svg'
  },
  {
    id: 'export-share',
    title: 'Exporting and Sharing Your Diagrams',
    description: 'Discover various export options and how to share your diagrams with others',
    duration: '4 min',
    level: 'Beginner',
    image: '/placeholder.svg'
  },
  {
    id: 'user-flows',
    title: 'Creating Effective User Flows',
    description: 'Best practices for designing user flow diagrams that communicate clearly',
    duration: '10 min',
    level: 'Advanced',
    image: '/placeholder.svg'
  },
  {
    id: 'decision-trees',
    title: 'Building Decision Trees',
    description: 'How to create decision trees for complex decision-making processes',
    duration: '7 min',
    level: 'Intermediate',
    image: '/placeholder.svg'
  },
  {
    id: 'data-visualization',
    title: 'Data Flow Visualization',
    description: 'Techniques for visualizing data flows in systems and applications',
    duration: '12 min',
    level: 'Advanced',
    image: '/placeholder.svg'
  },
  {
    id: 'mobile-responsive',
    title: 'Creating Mobile-Responsive Diagrams',
    description: 'Tips and tricks for designing diagrams that look great on all devices',
    duration: '6 min',
    level: 'Intermediate',
    image: '/placeholder.svg'
  }
];

const TutorialsPage = () => {
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tutorials</h1>
          <p className="text-gray-600">Learn how to create beautiful and effective diagrams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100 border-b">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="default" size="icon" className="rounded-full h-12 w-12 bg-white text-black hover:bg-white/90">
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-block text-xs px-2 py-1 rounded ${getLevelColor(tutorial.level)}`}>
                        {tutorial.level}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {tutorial.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to={`/tutorials/${tutorial.id}`} className="w-full">
                  <Button variant="outline" className="w-full gap-2 mt-2">
                    <BookOpen className="h-4 w-4" />
                    View Tutorial
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

export default TutorialsPage;
