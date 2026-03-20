'use client';

import { FileText, Sparkles, Zap, Shield, Download, Edit3, Send, ChevronRight, Check, Star } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
        }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Resume Builder</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Build Resumes That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Get You Hired</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Create professional resumes in minutes with AI. 
            Import, edit, and export beautiful resumes - all powered by GPT-4.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              <FileText className="w-5 h-5" />
              Create Resume Free
            </a>
            <a 
              href="https://github.com/logeshkannan19/ResumeForge"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-4 rounded-full transition-all duration-300 border border-white/20"
            >
              View on GitHub
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>AI-powered suggestions</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Create a professional resume in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Upload or Start Fresh',
                description: 'Upload your existing resume or start with our AI-generated templates.',
                icon: Upload,
              },
              {
                step: '02',
                title: 'AI Enhances',
                description: 'GPT-4 optimizes your content, suggests improvements, and fixes gaps.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'Export & Share',
                description: 'Download as PDF or share a link. ATS-optimized and recruiter-ready.',
                icon: Download,
              },
            ].map((feature, index) => (
              <div key={index} className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {feature.step}
                </div>
                <feature.icon className="w-10 h-10 text-purple-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Stand Out</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Sparkles, title: 'AI Content Optimization', desc: 'GPT-4 enhances your experience descriptions' },
              { icon: Edit3, title: 'Smart Editing', desc: 'Real-time suggestions and grammar checks' },
              { icon: Shield, title: 'ATS Optimization', desc: 'Pass Applicant Tracking Systems with ease' },
              { icon: Download, title: 'Multiple Formats', desc: 'Export to PDF, DOCX, or share a link' },
              { icon: Zap, title: 'Fast Processing', desc: 'Generate resumes in under 2 minutes' },
              { icon: Send, title: 'Easy Sharing', desc: 'Generate shareable links for recruiters' },
            ].map((item, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                <item.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: '10K+', label: 'Resumes Created' },
              { value: '95%', label: 'Interview Rate' },
              { value: '4.9', label: 'Average Rating' },
              { value: '50+', label: 'Templates' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Built With</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center max-w-3xl mx-auto">
            {['FastAPI', 'OpenAI GPT-4', 'MongoDB', 'React', 'Python', 'PDF Generation'].map((tech) => (
              <div key={tech} className="bg-slate-700 px-6 py-3 rounded-full text-slate-300 border border-slate-600">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 text-purple-400" />
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Land Your Dream Job?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Start building your professional resume today. It takes less than 2 minutes.
          </p>
          <a 
            href="#"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 ResumeForge. Open Source under MIT License.</p>
        </div>
      </footer>
    </main>
  );
}

function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  );
}
