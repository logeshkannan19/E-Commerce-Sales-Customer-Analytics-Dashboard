# DropAgent

**Autonomous product discovery and pricing — built for speed.**

> "DropAgent basically runs my store for me." — Operations Lead, DTC Brand

---

## The Problem

Manual dropshipping is slow, reactive, and inefficient. By the time products are researched, listed, and priced — the opportunity is already gone.

- 6+ hours per day on manual research
- Missed trends while you're sleeping
- Pricing wars you can't keep up with
- No systematic way to find winners

## The Solution

DropAgent is an autonomous dropshipping agent that discovers, lists, and prices products in real time — eliminating lag between signal and execution.

It continuously identifies high-velocity products, generates optimized listings, and deploys them directly to Shopify — transforming dropshipping from a reactive workflow into a real-time, intelligence-driven engine.

## Key Features

- **Signal Detection** — Real-time monitoring across TikTok, Amazon, AliExpress for emerging trends
- **Product Scoring** — ML-powered demand velocity and margin potential analysis
- **AI-Generated Listings** — Optimized titles, descriptions, and tags automatically
- **Auto-Deploy** — Push live to Shopify in minutes, not hours
- **Dynamic Pricing** — Real-time competitor tracking with intelligent margin optimization
- **Full Automation** — Zero manual intervention required after setup

## Product Demo

```
┌─────────────────────────────────────────────────────────┐
│                    DropAgent Dashboard                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   📊 Active Listings    42                              │
│   💰 Today's Revenue    $2,847                          │
│   ⚡ Listings Today     12                              │
│   🎯 Win Rate          34%                             │
│                                                         │
│   [Trending Products] [Auto-Deploy] [Pricing Engine]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, CSS Modules |
| API | Node.js, Express |
| Database | PostgreSQL |
| ML/AI | Python, TensorFlow |
| Infrastructure | AWS, Docker |
| CI/CD | GitHub Actions |

## Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Signal     │───▶│   Product    │───▶│   Shopify    │
│   Sources    │    │   Engine     │    │   Deploy     │
└──────────────┘    └──────────────┘    └──────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  TikTok             ML Scoring          Live Store
  Amazon             Demand Analysis     Auto-Pricing
  AliExpress         Margin Calc         Real-time Sync
```

### Why This Architecture

- **Microservices** — Each component scales independently (10 → 1M users)
- **Event-driven** — Signals processed asynchronously, no bottlenecks
- **ML pipeline** — Isolated for model updates without downtime
- **Shopify API** — Direct integration, no middleware required

## Quick Start

```bash
# Clone the repo
git clone https://github.com/logeshkannan19/DropAgent.git
cd DropAgent

# Install dependencies
npm install

# Start development
npm run dev
```

## Environment Variables

Create a `.env` file in `apps/web/`:

```env
# Shopify Integration
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
SHOPIFY_API_KEY=xxxxx
SHOPIFY_API_SECRET=xxxxx

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dropagent

# ML Pipeline
ML_API_URL=http://localhost:8000
ML_API_KEY=your-ml-key

# App Config
NODE_ENV=development
PORT=5173
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products |
| `/api/products` | POST | Create new listing |
| `/api/signals` | GET | Fetch active signals |
| `/api/pricing/optimize` | POST | Get optimal price |
| `/api/shopify/sync` | POST | Sync with Shopify |

## Deployment

### Docker

```bash
docker build -t dropagent:latest .
docker run -p 3000:3000 dropagent:latest
```

### Vercel (Frontend)

```bash
cd apps/web
vercel deploy
```

### Manual (Production)

```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

## Roadmap

- [ ] **Q1 2025** — Multi-store support (5+ Shopify stores)
- [ ] **Q2 2025** — Mobile app (iOS/Android)
- [ ] **Q3 2025** — AI chat interface for strategy queries
- [ ] **Q4 2025** — European market expansion (localized)

## Contributing

Open to contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](./LICENSE).

## Contact

- Email: founders@dropagent.io
- Twitter: @dropagent
- Discord: [Join the community](https://discord.gg/dropagent)

---

**Built for operators who move faster than the market.**