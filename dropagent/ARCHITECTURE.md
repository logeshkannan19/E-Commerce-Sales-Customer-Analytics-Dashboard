# Architecture Overview

## Structure Philosophy

```
dropagent/
├── apps/                 # Application code (monorepo-ready)
│   ├── web/             # React frontend
│   ├── api/             # Node.js backend
│   └── docs/            # Documentation site
├── infra/               # Infrastructure as code
│   └── terraform/       # AWS/Terraform configs
├── scripts/             # Automation & utilities
└── .github/             # GitHub workflows & templates
```

## Why This Structure?

### 1. Monorepo-Ready
- `apps/` directory allows future expansion (web, mobile, api)
- Shared configs in root
- Easy to add microservices later

### 2. Separation of Concerns
- Frontend (`apps/web/`) — UI only
- Backend (`apps/api/`) — Business logic
- Infrastructure (`infra/`) — Deployment configs

### 3. Scalability (10 → 1M users)

| Component | Current | Scaled |
|-----------|---------|--------|
| Web | Single server | CDN + edge caching |
| API | Express | Kubernetes + auto-scale |
| Database | Postgres (single) | Read replicas + sharding |
| ML Pipeline | Local Python | Dedicated GPU cluster |

## Key Design Decisions

### Event-Driven Architecture
Signals (TikTok, Amazon, AliExpress) are processed asynchronously via a message queue. This ensures:
- No lost signals during traffic spikes
- Independent scaling of detection vs. deployment
- Resilience to third-party API downtime

### ML Pipeline Isolation
- Python ML service runs separately from Node.js API
- Model updates don't require API redeployment
- GPU costs only when needed (batch processing)

### Shopify Direct Integration
No middleware between DropAgent and Shopify:
- Lower latency
- Fewer failure points
- Direct access to webhooks for pricing updates

## Security

- All secrets in environment variables
- API keys never committed
- Shopify tokens scoped to required permissions
- Rate limiting on all external APIs
- Request validation on all endpoints

## Performance

- Frontend bundles < 200KB gzipped
- API response times < 100ms (p95)
- ML inference < 2s per product
- Database queries use connection pooling

## Future Considerations

- Add Redis for session/function caching
- Implement GraphQL for flexible queries
- Add WebSocket for real-time updates
- Multi-region deployment for global users