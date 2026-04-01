# E-Commerce Sales & Customer Analytics Dashboard

<p align="center">
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/Python-3.10+-blue.svg?style=flat&logo=python" alt="Python">
  </a>
  <a href="https://streamlit.io/">
    <img src="https://img.shields.io/badge/Streamlit-1.20+-red.svg?style=flat&logo=streamlit" alt="Streamlit">
  </a>
  <a href="https://pandas.pydata.org/">
    <img src="https://img.shields.io/badge/Pandas-1.5+-green.svg?style=flat" alt="Pandas">
  </a>
  <a href="https://github.com/logeshkannan19/E-Commerce-Sales-Customer-Analytics-Dashboard/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat" alt="License">
  </a>
  <a href="https://github.com/logeshkannan19/E-Commerce-Sales-Customer-Analytics-Dashboard/actions">
    <img src="https://img.shields.io/badge/Docker-Ready-blue.svg?style=flat&logo=docker" alt="Docker">
  </a>
</p>

> A production-ready end-to-end analytics platform for e-commerce sales data processing, customer segmentation, and interactive business intelligence.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Business Insights](#-business-insights)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

This project provides a complete data analytics solution for e-commerce businesses, encompassing data generation, cleaning, transformation, advanced analytics, and interactive visualization. It is designed with production-readiness in mind, featuring modular architecture, comprehensive testing, containerization, and CI/CD readiness.

### Key Capabilities

- **Synthetic Data Generation**: Generate realistic e-commerce transaction data (5,000+ records)
- **Data Pipeline**: Automated cleaning, transformation, and validation
- **Customer Segmentation**: RFM (Recency, Frequency, Monetary) analysis
- **Interactive Dashboard**: Real-time Streamlit dashboard with filters
- **SQL Analytics**: 16 comprehensive SQL queries for business intelligence
- **CLI Interface**: Programmatic and command-line access

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **Data Generation** | Synthetic e-commerce data with realistic patterns |
| **Data Processing** | Automated ETL pipeline with validation |
| **RFM Analysis** | Customer segmentation (VIP, Loyal, At Risk, Lost) |
| **Product Analytics** | Performance analysis, loss-making detection |
| **Discount Analysis** | Impact of discounts on profitability |
| **Interactive Dashboard** | Streamlit with region/category/date filters |
| **SQL Queries** | 16 PostgreSQL/MySQL compatible queries |
| **CLI Tools** | Command-line interface for all operations |
| **Docker Support** | Containerized deployment ready |
| **Unit Tests** | pytest with coverage reporting |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      E-Commerce Analytics                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │  Data Gen    │───▶│  Processing  │───▶│  Analytics   │     │
│  │  (5K+ rows)  │    │  (Clean/Val) │    │  (RFM/Seg)   │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   CSV/JSON   │    │  Processed   │    │   Dashboard  │     │
│  │   (Raw)      │    │    (CSV)     │    │  (Streamlit) │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏃 Quick Start

### Prerequisites

- Python 3.10+
- pip or conda
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/logeshkannan19/E-Commerce-Sales-Customer-Analytics-Dashboard.git
cd E-Commerce-Sales-Customer-Analytics-Dashboard

# Install dependencies
pip install -r requirements.txt

# Or using Make
make install
```

### Run Full Pipeline

```bash
# Option 1: Using CLI
python cli.py full

# Option 2: Using Make
make run

# Option 3: Using Python module
python -m src.main
```

### Launch Dashboard

```bash
# Option 1: CLI
python cli.py dashboard

# Option 2: Make
make dashboard

# Option 3: Direct
cd dashboard && streamlit run app.py
```

---

## 📁 Project Structure

```text
ecommerce-analytics/
├── config/                      # Configuration files
│   └── config.yaml             # YAML configuration
├── data/                       # Data directory
│   ├── raw/                   # Raw data (generated)
│   └── processed/             # Processed data + outputs
├── dashboard/                 # Streamlit dashboard
│   └── app.py                # Dashboard application
├── notebooks/                 # Jupyter notebooks
│   └── eda_analysis.ipynb    # EDA notebook
├── sql/                      # SQL queries
│   └── analysis_queries.sql  # 16 analytics queries
├── src/                      # Source code
│   ├── __init__.py
│   ├── main.py              # Main entry point
│   ├── cli.py               # CLI interface
│   ├── analytics/           # Advanced analytics
│   │   ├── __init__.py
│   │   └── advanced_analytics.py
│   ├── generators/          # Data generation
│   │   ├── __init__.py
│   │   └── data_generator.py
│   └── processors/         # Data processing
│       ├── __init__.py
│       └── data_processor.py
├── tests/                   # Unit tests
│   ├── __init__.py
│   ├── test_data_processor.py
│   └── test_advanced_analytics.py
├── logs/                    # Log files
├── models/                  # Saved models
├── reports/                # Generated reports/charts
├── .env.example            # Environment template
├── .gitignore             # Git ignore
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose
├── Makefile              # Build automation
├── cli.py                # CLI tool
├── pytest.ini            # pytest config
├── requirements.txt      # Dependencies
├── setup.py             # Package config
└── README.md            # This file
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | Python 3.10+ |
| **Data Processing** | Pandas, NumPy |
| **Visualization** | Plotly, Matplotlib, Seaborn |
| **Dashboard** | Streamlit |
| **Database** | PostgreSQL, MySQL |
| **Testing** | pytest, pytest-cov |
| **Container** | Docker, Docker Compose |
| **Code Quality** | Black, isort, flake8 |
| **Type Checking** | mypy |

---

## ⚙️ Configuration

### YAML Configuration

Edit `config/config.yaml`:

```yaml
data:
  raw: data/raw/ecommerce_data.csv
  processed: data/processed/ecommerce_processed.csv
  output: data/processed/

analysis:
  rfm:
    quartiles: 5
    top_customers_percent: 10

  segmentation:
    vip_threshold: 13
    loyal_threshold: 10
    at_risk_threshold: 5

dashboard:
  title: "E-Commerce Analytics Dashboard"
  theme: "light"
  page_icon: "📊"

logging:
  level: INFO
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  file: logs/analytics.log
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
# Data paths
DATA_RAW_PATH=data/raw/ecommerce_data.csv
DATA_PROCESSED_PATH=data/processed/ecommerce_processed.csv

# Dashboard
DASHBOARD_HOST=0.0.0.0
DASHBOARD_PORT=8501

# Database (optional)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
```

---

## 💻 Usage

### CLI Commands

```bash
# Generate data
python cli.py generate -n 5000 -o data/raw/ecommerce_data.csv

# Process data
python cli.py process -i data/raw/ecommerce_data.csv -o data/processed/ecommerce_processed.csv

# Run analytics
python cli.py analytics -i data/processed/ecommerce_processed.csv

# Launch dashboard
python cli.py dashboard -p 8501 -H localhost

# Full pipeline
python cli.py full
```

### Make Commands

```bash
make help        # Show available commands
make install     # Install dependencies
make setup       # Create directories
make generate   # Generate data
make process     # Process data
make analytics   # Run analytics
make dashboard  # Launch dashboard
make test        # Run tests
make lint        # Run linter
make format      # Format code
make clean       # Clean generated files
```

### Python API

```python
from src.generators.data_generator import EcommerceDataGenerator
from src.processors.data_processor import DataProcessor
from src.analytics.advanced_analytics import AdvancedAnalytics

# Generate data
generator = EcommerceDataGenerator(seed=42)
df = generator.generate(n_records=5000)
generator.save(df, "data/raw/ecommerce_data.csv")

# Process data
processor = DataProcessor(
    input_path="data/raw/ecommerce_data.csv",
    output_path="data/processed/ecommerce_processed.csv"
)
processor.run_pipeline()

# Run analytics
analytics = AdvancedAnalytics(
    data_path="data/processed/ecommerce_processed.csv",
    output_dir="data/processed"
)
insights = analytics.run_full_analysis()
```

---

## 📊 Business Insights

### Key Metrics

| Metric | Value |
|--------|-------|
| **Total Revenue** | $5,649,938.80 |
| **Total Profit** | $2,164,840.00 |
| **Profit Margin** | 38.32% |
| **Total Orders** | 5,000 |
| **Unique Customers** | 3,829 |
| **Avg Order Value** | $1,129.99 |

### Customer Segmentation (RFM)

| Segment | Count | Percentage | Revenue Share |
|---------|-------|------------|---------------|
| **VIP/Premium** | 518 | 13.5% | High |
| **Loyal** | 1,107 | 28.9% | Very High |
| **Potential Loyalist** | 1,395 | 36.4% | Medium |
| **At Risk** | 648 | 16.9% | Low |
| **Lost** | 161 | 4.2% | Minimal |

### Top Performing Segments

- **Best Category**: Electronics ($1.7M revenue)
- **Best Region**: North ($1.2M revenue)
- **Best Month**: October

---

## 🧪 Testing

```bash
# Run all tests
make test

# Run with coverage
pytest tests/ -v --cov=src --cov-report=html

# Run specific test file
pytest tests/test_data_processor.py -v

# Run with verbose output
pytest -vv --tb=long

# Check code quality
make lint

# Format code
make format
```

---

## 🐳 Deployment

### Docker

```bash
# Build image
docker build -t ecommerce-analytics .

# Run container
docker run -p 8501:8501 ecommerce-analytics
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Using Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8501 dashboard.app:main

# Using Supervisor
sudo cp deploy/supervisor.conf /etc/supervisor/conf.d/
sudo supervisorctl reread
sudo supervisorctl start ecommerce-analytics
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for all public methods
- Maintain 80%+ test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.