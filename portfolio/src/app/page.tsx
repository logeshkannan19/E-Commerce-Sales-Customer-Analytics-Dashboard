const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "MongoDB", "MySQL"] },
  { category: "AI/ML", items: ["TensorFlow", "NLP", "Sentiment Analysis", "LLMs"] },
  { category: "DevOps", items: ["AWS", "Docker", "Kubernetes", "Kafka", "Nginx"] },
];

const projects = [
  {
    name: "Trainiq",
    description: "AI fitness coach on WhatsApp with personalized workouts and real-time progress tracking",
    tags: ["WhatsApp Bot", "AI Chatbot", "Fitness", "Health Tech"],
    emoji: "💪",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Spendiq",
    description: "Personal CFO that tracks expenses, generates insights, and predicts spending using AI",
    tags: ["Fintech", "AI Analytics", "Expense Tracker", "Automation"],
    emoji: "💰",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "LocalLens",
    description: "AI-powered platform to discover, analyze, and understand nearby businesses in real time",
    tags: ["AI Assistant", "Geolocation", "Recommendation System", "LLM"],
    emoji: "🔍",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "MeetScribe",
    description: "Turn meetings into structured summaries and actionable insights with AI",
    tags: ["NLP", "Speech-to-Text", "Summarization", "Productivity"],
    emoji: "📝",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    name: "ResumeForge",
    description: "Analyze, optimize, and build job-winning resumes with AI",
    tags: ["ATS", "NLP", "Job Search", "FastAPI"],
    emoji: "📄",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "ReviewScope",
    description: "Turn customer reviews into actionable insights with AI",
    tags: ["Sentiment Analysis", "Analytics", "Machine Learning"],
    emoji: "⭐",
    gradient: "from-pink-500 to-rose-600",
  },
];

const stats = [
  { value: "10+", label: "Products Built" },
  { value: "6+", label: "AI Projects" },
  { value: "Dubai", label: "Based In" },
  { value: "Full-Stack", label: "Engineer" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            LOGESH
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm text-gray-400 hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="text-sm text-gray-400 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#contact" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Available for projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Founder.
            </span>
            <br />
            <span className="text-white">Engineer.</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Builder.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            I don&apos;t just write code — I build AI-powered businesses. Turning ideas into products that actually matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#work" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
              Get in Touch
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-sm text-violet-400 font-mono">01</span>
            <h2 className="text-3xl font-bold">Featured Work</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="p-8">
                  <div className="text-4xl mb-4">{project.emoji}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-sm text-violet-400 font-mono">02</span>
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-xl opacity-20" />
                <div className="relative bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl aspect-square flex items-center justify-center border border-white/10">
                  <div className="text-8xl">🚀</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Building the future, one AI product at a time
              </h3>
              <div className="space-y-4 text-gray-400">
                <p>
                  Based in <span className="text-white font-medium">Dubai, UAE</span>, I&apos;m a full-stack engineer and entrepreneur focused on building AI-powered SaaS products that solve real problems.
                </p>
                <p>
                  From fitness coaching on WhatsApp to personal finance AI, each product I build reflects my passion for combining cutting-edge technology with practical business solutions.
                </p>
                <p>
                  Currently learning <span className="text-white font-medium">System Design</span>, <span className="text-white font-medium">AI/ML integration</span>, and <span className="text-white font-medium">advanced backend architectures</span>.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="https://linkedin.com/in/logeshkannana" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://x.com/LOGESHx7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  X / Twitter
                </a>
                <a href="https://github.com/logeshkannan19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-sm text-violet-400 font-mono">03</span>
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold mb-4 text-violet-400">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-gradient-to-t from-violet-950/30 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <span className="text-sm text-violet-400 font-mono">04</span>
            <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
          </div>
          
          <h3 className="text-4xl font-bold mb-4">
            Have an idea?
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Let&apos;s build it together.
            </span>
          </h3>
          
          <p className="text-gray-400 mb-10">
            I&apos;m always looking for new challenges, collaborations, and opportunities to build impactful products.
          </p>
          
          <a
            href="mailto:logeshkannan19@gmail.com"
            className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            logeshkannan19@gmail.com
          </a>
          
          <div className="flex justify-center gap-8 mt-12">
            <a href="https://linkedin.com/in/logeshkannana" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://x.com/LOGESHx7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://github.com/logeshkannan19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://facebook.com/logeshkannan19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Logesh Kannan. Built with passion & code.
          </p>
          <div className="flex gap-6">
            <a href="#work" className="text-sm text-gray-500 hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="text-sm text-gray-500 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm text-gray-500 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
