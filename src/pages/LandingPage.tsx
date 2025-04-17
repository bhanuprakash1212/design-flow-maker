
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Square, 
  LayoutTemplate, 
  Diamond as DiamondIcon,
  BarChart3, 
  Workflow, 
  Lightbulb,
  Users,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
              <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">FlowDesign</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#templates" className="text-gray-600 hover:text-gray-900">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 rounded text-gray-600 hover:text-gray-900">Log in</Link>
            <Link to="/editor" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Try Free
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Flowcharts Made <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create stunning diagrams, flowcharts, and visualizations with our intuitive design tools. Perfect for teams, presentations, and documentation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/editor" className="px-8 py-3 flex items-center justify-center">
                  <span>Start Designing</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#demo" className="px-8 py-3">
                  Watch Demo
                </a>
              </Button>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
              <span className="mx-3">•</span>
              <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free for personal use</span>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-purple-200 rounded-lg transform rotate-3"></div>
              <img 
                src="/lovable-uploads/9d893983-ae62-4cda-a41b-6298d90df48e.png" 
                alt="FlowDesigner Interface" 
                className="relative z-10 rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Logos */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8">TRUSTED BY TEAMS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {['Microsoft', 'Google', 'Airbnb', 'Spotify', 'Netflix', 'Amazon'].map(company => (
              <div key={company} className="text-gray-400 font-bold text-xl">{company}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Complex Workflows</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to design professional diagrams for your team or clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Square className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Process Nodes</h3>
              <p className="text-gray-600">Create clear process blocks with customizable content and connections. Perfect for step-by-step workflows.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <DiamondIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Decision Points</h3>
              <p className="text-gray-600">Add decision diamonds with yes/no branches to model complex logic and conditional pathways.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <LayoutTemplate className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Nodes</h3>
              <p className="text-gray-600">Design your own node types with custom shapes, colors, and behaviors to match your specific needs.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Workflow className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Connections</h3>
              <p className="text-gray-600">Connect nodes with intelligent routing that automatically adapts to your diagram layout.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
              <p className="text-gray-600">Transform complex data into clear, visually appealing diagrams that tell a story.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Template Library</h3>
              <p className="text-gray-600">Start faster with pre-built templates for common diagram types and workflows.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div id="testimonials" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of professionals love using FlowDesign for their diagramming needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "FlowDesign has transformed how our team documents processes. The intuitive interface saves us hours every week.",
                author: "Sarah Johnson",
                role: "Product Manager, Acme Inc."
              },
              {
                quote: "The best diagramming tool I've used. The ability to customize nodes and create professional flows in minutes is game-changing.",
                author: "Michael Chen",
                role: "UX Designer, TechCorp"
              },
              {
                quote: "We use FlowDesign for all our client presentations. It helps us communicate complex ideas in a simple, visual way.",
                author: "Emily Rodriguez",
                role: "Consultant, Strategy Partners"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start designing?</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-10">
            Join thousands of professionals creating stunning flowcharts today.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row overflow-hidden rounded-lg shadow-lg">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 focus:outline-none"
              />
              <button className="px-6 py-3 bg-purple-900 text-white font-medium hover:bg-purple-800 transition-colors">
                Start Free Trial
              </button>
            </div>
            <p className="text-sm text-purple-200 mt-3">14-day free trial. No credit card required.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="white" strokeWidth="2" />
                </svg>
                <span className="ml-2 text-xl font-bold">FlowDesign</span>
              </div>
              <p className="text-gray-400 mb-4">
                Create professional flowcharts quickly and easily.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-300 font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-300 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-300 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 FlowDesign. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
