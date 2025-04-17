
import { Link } from 'react-router-dom';
import { ArrowRight, Square, LayoutTemplate, Diamond as DiamondIcon } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
              <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-gray-800">FlowDesigner</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#templates" className="text-gray-600 hover:text-gray-900">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 rounded text-gray-600 hover:text-gray-900">Log in</Link>
            <Link to="/diagrams" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Get Started</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Design Beautiful Flowcharts Easily</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Create professional diagrams, flowcharts, and visualizations in minutes with our intuitive design tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <Link to="/diagrams" className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center">
            <span>Start Designing</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a href="#demo" className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-100">
            Watch Demo
          </a>
        </div>
        <div className="mt-12">
          <img 
            src="/lovable-uploads/9d893983-ae62-4cda-a41b-6298d90df48e.png" 
            alt="FlowDesigner Interface" 
            className="rounded-lg shadow-2xl max-w-full h-auto" 
          />
        </div>
      </div>
      
      {/* Features */}
      <div id="features" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Complex Workflows</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to design professional diagrams for your team or clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Square className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Process Nodes</h3>
              <p className="text-gray-600">Create clear process blocks with customizable content and connections.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <DiamondIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Decision Points</h3>
              <p className="text-gray-600">Add decision diamonds with yes/no branches to model complex logic.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <LayoutTemplate className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Nodes</h3>
              <p className="text-gray-600">Design your own node types with custom shapes, colors, and behaviors.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-purple-700 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start designing?</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-10">
            Join thousands of users creating professional flowcharts today.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 focus:outline-none"
              />
              <button className="px-6 py-3 bg-purple-900 text-white font-medium hover:bg-purple-800">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="white" strokeWidth="2" />
                </svg>
                <span className="ml-2 text-xl font-bold">FlowDesigner</span>
              </div>
              <p className="mt-2 text-gray-400">
                Create professional flowcharts quickly and easily.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-gray-300 font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-300 font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-300 font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 FlowDesigner. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
