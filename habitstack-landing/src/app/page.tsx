'use client';

import { Target, TrendingUp, Award, ChevronRight, Check, BarChart3, Calendar, Sparkles, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)`,
        }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">AI-Powered Habit Tracker</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Build Better Habits,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Build a Better Life</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Track your habits, analyze patterns, and achieve your goals with AI-powered insights. 
            HabitStack makes building good habits simple and rewarding.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30">
              Start Free Trial
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="https://github.com/logeshkannan19/HabitStack" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-4 rounded-full transition-all duration-300 border border-white/20">
              View on GitHub
            </a>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No credit card</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Three steps to habit mastery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Create Habits', desc: 'Set your daily habits and goals. Choose from templates or create custom ones.', icon: Target },
              { step: '02', title: 'Track Daily', desc: 'Check off habits as you complete them. See your streak and progress.', icon: Calendar },
              { step: '03', title: 'Analyze & Improve', desc: 'Get AI insights on your patterns and suggestions to build better habits.', icon: Sparkles },
            ].map((f, i) => (
              <div key={i} className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">{f.step}</div>
                <f.icon className="w-10 h-10 text-blue-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Target, title: 'Goal Setting', desc: 'Set SMART goals and break them into daily habits' },
              { icon: Calendar, title: 'Daily Tracking', desc: 'Simple check-ins to build consistency' },
              { icon: BarChart3, title: 'Analytics', desc: 'Visualize your progress with charts' },
              { icon: Trophy, title: 'Streaks & Rewards', desc: 'Earn badges and maintain streaks' },
              { icon: Sparkles, title: 'AI Insights', desc: 'Get personalized recommendations' },
              { icon: Award, title: 'Achievements', desc: 'Unlock achievements as you progress' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all">
                <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '2M+', label: 'Habits Tracked' },
              { value: '85%', label: 'Success Rate' },
              { value: '4.9', label: 'App Rating' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="py-24 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Built With</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.IO', 'Recharts'].map((t) => (
              <div key={t} className="bg-slate-700 px-6 py-3 rounded-full text-slate-300 border border-slate-600">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <Target className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h2 className="text-4xl font-bold mb-4">Ready to Build Better Habits?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">Start your 7-day free trial today. No credit card required.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg">
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 HabitStack. Open Source under MIT License.</p>
        </div>
      </footer>
    </main>
  );
}
