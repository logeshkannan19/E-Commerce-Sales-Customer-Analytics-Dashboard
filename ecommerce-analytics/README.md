# E-Commerce Sales & Customer Analytics Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/Streamlit-1.20+-red.svg" alt="Streamlit">
  <img src="https://img.shields.io/badge/Pandas-1.5+-green.svg" alt="Pandas">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  <img src="https://img.shields.io/badge/Docker-Ready-blue.svg" alt="Docker">
</p>

A production-ready end-to-end analytics project featuring data processing, SQL analysis, exploratory data analysis (EDA), and an interactive Streamlit dashboard with customer segmentation.

## Features

- **Data Generation**: Synthetic e-commerce data (5000+ records)
- **Data Processing**: Cleaning, transformation, validation pipeline
- **Advanced Analytics**: RFM customer segmentation
- **Interactive Dashboard**: Streamlit with filters and visualizations
- **SQL Analysis**: 16 comprehensive queries
- **CLI Interface**: Easy-to-use command-line tools

## Quick Start

### Using Make

```bash
# Install dependencies
make install

# Run full pipeline
make run

# Launch dashboard
make dashboard

# Run tests
make test
```

### Using CLI

```bash
# Full pipeline
python cli.py full

# Individual commands
python cli.py generate -n 5000
python cli.py process
python cli.py analytics
python cli.py dashboard -p 8501
```

### Using Python

```bash
# Run main pipeline
python -m src.main
```

## Project Structure

```
ecommerce-analytics/
├── config/                 # Configuration files
│   └── config.yaml
├── data/                   # Data files
│   ├── raw/               # Raw data
│   └── processed/         # Processed data
├── dashboard/             # Streamlit dashboard
│   └── app.py
├── notebooks/             # Jupyter notebooks
│   └── eda_analysis.ipynb
├── sql/                   # SQL queries
│   └── analysis_queries.sql
├── src/                   # Source code
│   ├── main.py           # Main entry point
│   ├── cli.py            # CLI interface
│   ├── analytics/        # Advanced analytics
│   ├── generators/       # Data generators
│   └── processors/       # Data processors
├── tests/                 # Unit tests
├── logs/                  # Log files
├── models/                # Saved models
├── reports/              # Generated reports
├── Makefile             # Build automation
├── cli.py               # CLI tool
├── Dockerfile           # Docker configuration
├── pytest.ini           # Test configuration
├── requirements.txt     # Dependencies
└── setup.py            # Package configuration
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Python 3.10+ |
| Data Processing | Pandas, NumPy |
| Visualization | Plotly, Matplotlib, Seaborn |
| Dashboard | Streamlit |
| Database | PostgreSQL/MySQL |
| Testing | pytest, pytest-cov |
| Docker | Multi-stage build |

## Configuration

Edit `config/config.yaml` or `.env.example` to customize:

```yaml
data:
  raw: data/raw/ecommerce_data.csv
  processed: data/processed/ecommerce_processed.csv

analysis:
  rfm:
    quartiles: 5
    top_customers_percent: 10

dashboard:
  title: "E-Commerce Analytics Dashboard"
  theme: "light"
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `make help` | Show available commands |
| `make install` | Install dependencies |
| `make setup` | Create project directories |
| `make generate` | Generate synthetic data |
| `make process` | Process raw data |
| `make analytics` | Run advanced analytics |
| `make dashboard` | Launch Streamlit dashboard |
| `make test` | Run unit tests |
| `make lint` | Run code linting |
| `make format` | Format code |
| `make clean` | Clean generated files |

## Docker

```bash
# Build image
docker build -t ecommerce-analytics .

# Run container
docker run -p 8501:8501 ecommerce-analytics

# Run with docker-compose
docker-compose up -d
```

## Testing

```bash
# Run tests with coverage
make test

# Run specific test
pytest tests/test_data_processor.py -v

# Run with coverage report
pytest --cov=src --cov-report=html
```

## Key Business Metrics

| Metric | Value |
|--------|-------|
| Total Revenue | $5,649,938.80 |
| Total Profit | $2,164,840.00 |
| Profit Margin | 38.32% |
| Total Orders | 5,000 |
| Unique Customers | 3,829 |

## Customer Segmentation

| Segment | Count | Percentage |
|---------|-------|------------|
| VIP/Premium | 518 | 13.5% |
| Loyal | 1,107 | 28.9% |
| Potential Loyalist | 1,395 | 36.4% |
| At Risk | 648 | 16.9% |
| Lost | 161 | 4.2% |

## License

MIT License - See LICENSE file for details

## Author

Data Engineering Team