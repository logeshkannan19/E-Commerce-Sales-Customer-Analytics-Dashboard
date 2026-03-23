import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-badge fade-in">Commerce Automation</div>
          <h1 className="hero-title fade-in">DropAgent</h1>
          <p className="hero-one-liner fade-in">Autonomous product discovery and pricing — built for speed.</p>
          <div className="hero-meta fade-in">
            <span>E-commerce Entrepreneurs & DTC Brands</span>
            <span className="divider">/</span>
            <span>2025</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label fade-in">Overview</div>
          <p className="overview-text fade-in">
            DropAgent is an autonomous dropshipping agent designed for operators who optimize for speed and scale.
            <br /><br />
            It continuously identifies high-velocity products, generates optimized listings, and deploys them directly to Shopify — removing manual bottlenecks from product discovery to execution.
            <br /><br />
            Built as a fully automated system, DropAgent transforms dropshipping from a reactive workflow into a real-time, intelligence-driven engine.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="card fade-in">
              <div className="card-label">Problem</div>
              <p className="card-text">Manual dropshipping is slow, reactive, and inefficient. By the time products are researched, listed, and priced — the opportunity is already gone.</p>
            </div>
            <div className="card fade-in">
              <div className="card-label">Solution</div>
              <p className="card-text">A fully autonomous agent that discovers, lists, and prices products in real time — eliminating lag between signal and execution.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label fade-in">Product Engine</div>
          <div className="pipeline-grid fade-in">
            <div className="pipeline-step">
              <div className="step-number">01</div>
              <div className="step-title">Signal Detection</div>
              <p className="step-desc">Monitor TikTok, Amazon, AliExpress for emerging trends in real-time</p>
            </div>
            <div className="pipeline-arrow">→</div>
            <div className="pipeline-step">
              <div className="step-number">02</div>
              <div className="step-title">Product Scoring</div>
              <p className="step-desc">Analyze demand velocity and margin potential with ML models</p>
            </div>
            <div className="pipeline-arrow">→</div>
            <div className="pipeline-step">
              <div className="step-number">03</div>
              <div className="step-title">AI Listings</div>
              <p className="step-desc">Generate optimized titles, descriptions, and tags automatically</p>
            </div>
            <div className="pipeline-arrow">→</div>
            <div className="pipeline-step">
              <div className="step-number">04</div>
              <div className="step-title">Auto-Deploy</div>
              <p className="step-desc">Push live to Shopify in minutes, not hours</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label fade-in">Intelligent Pricing Layer</div>
          <div className="pricing-grid fade-in">
            <div className="pricing-item">
              <div className="pricing-icon">◈</div>
              <div className="pricing-title">Real-time Tracking</div>
              <p className="pricing-desc">Monitor competitor prices across all major platforms</p>
            </div>
            <div className="pricing-item">
              <div className="pricing-icon">◈</div>
              <div className="pricing-title">Dynamic Engine</div>
              <p className="pricing-desc">Adjust prices instantly based on market signals</p>
            </div>
            <div className="pricing-item">
              <div className="pricing-icon">◈</div>
              <div className="pricing-title">Margin Optimization</div>
              <p className="pricing-desc">Maximize profitability with intelligent price rules</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label fade-in">Impact</div>
          <div className="metrics-grid fade-in">
            <div className="metric">
              <div className="metric-value">4×</div>
              <div className="metric-label">Faster Listing Speed</div>
            </div>
            <div className="metric">
              <div className="metric-value">38%</div>
              <div className="metric-label">Better Margin Consistency</div>
            </div>
            <div className="metric">
              <div className="metric-value">6h → 10m</div>
              <div className="metric-label">Workflow Reduction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="testimonial fade-in">
            <p className="quote">"DropAgent basically runs my store for me. I went from manually listing 5 products a day to having 40+ live listings optimized and priced automatically. It's the unfair advantage I didn't know I needed."</p>
            <div className="quote-author">— Operations Lead, DTC Brand</div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <p className="cta-text fade-in">Built for operators who move faster than the market.</p>
          <div className="cta-buttons fade-in">
            <a href="#" className="btn btn-primary">View Live</a>
            <a href="#" className="btn btn-secondary">Get Access</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-line" />
          <p className="footer-text">© 2025 DropAgent. Crafted with precision.</p>
        </div>
      </footer>
    </div>
  )
}

export default App