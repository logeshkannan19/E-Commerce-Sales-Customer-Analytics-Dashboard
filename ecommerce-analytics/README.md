# E-Commerce Sales & Customer Analytics Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/Streamlit-1.20+-red.svg" alt="Streamlit">
  <img src="https://img.shields.io/badge/Pandas-1.5+-green.svg" alt="Pandas">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

A production-ready end-to-end analytics project featuring data processing, SQL analysis, exploratory data analysis (EDA), and an interactive Streamlit dashboard with customer segmentation.

## Project Overview

This project demonstrates a complete data pipeline for e-commerce sales analysis, from raw data generation to interactive dashboards. It includes:
- Synthetic e-commerce data generation (5000+ records)
- Data cleaning and feature engineering
- SQL-based analytics queries
- Interactive visualizations
- RFM customer segmentation
- Business insights generation

## Directory Structure

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
│   ├── __init__.py
│   ├── analytics/         # Advanced analytics
│   │   ├── __init__.py
│   │   └── advanced_analytics.py
│   ├── generators/        # Data generators
│   │   ├── __init__.py
│   │   └── data_generator.py
│   └── processors/        # Data processors
│       ├── __init__.py
│       └── data_processor.py
├── tests/                 # Unit tests
├── logs/                  # Log files
├── models/                # Saved models
├── reports/               # Generated reports
├── requirements.txt
└── README.md
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Python 3.10+ |
| Data Processing | Pandas, NumPy |
| Visualization | Plotly, Matplotlib, Seaborn |
| Dashboard | Streamlit |
| Database | PostgreSQL/MySQL |
| Notebook | Jupyter |
| Config | YAML |

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Generate Data (if needed)

```bash
cd src/generators
python data_generator.py
```

### 3. Process Data

```bash
cd src/processors
python data_processor.py
```

### 4. Run Analytics

```bash
cd src/analytics
python advanced_analytics.py
```

### 5. Launch Dashboard

```bash
cd dashboard
streamlit run app.py
```

### 6. Open Jupyter Notebook

```bash
jupyter notebook notebooks/eda_analysis.ipynb
```

## Features

### Data Pipeline
- Synthetic e-commerce data generation
- Data cleaning (missing values, duplicates)
- Feature engineering (Profit Margin, Year, Month, etc.)

### SQL Analysis
- 16 comprehensive SQL queries covering:
  - Revenue, profit, and order metrics
  - Monthly sales trends
  - Top products and categories
  - Regional performance
  - Customer segmentation
  - Discount impact analysis

### EDA (Jupyter Notebook)
- Monthly revenue/profit trends
- Category and regional performance
- Top products and customers
- Discount impact visualization
- Correlation matrix

### Interactive Dashboard
- KPI metrics (Revenue, Profit, Orders, Customers)
- Interactive filters (Region, Category, Date Range)
- Line charts for trends
- Bar charts for product/region analysis
- Pie charts for category distribution

### Advanced Analytics
- **RFM Customer Segmentation**
  - VIP/Premium
  - Loyal
  - Potential Loyalist
  - At Risk
  - Lost
  
- **High-Value Customer Identification**
- **Product Performance Analysis**
- **Discount Impact Analysis**
- **Customer Retention Analysis**

## Key Business Metrics

| Metric | Value |
|--------|-------|
| Total Revenue | $5,649,938.80 |
| Total Profit | $2,164,840.00 |
| Profit Margin | 38.32% |
| Total Orders | 5,000 |
| Unique Customers | 3,829 |
| Avg Order Value | $1,129.99 |

## Customer Segmentation

| Segment | Count | Percentage |
|---------|-------|------------|
| Potential Loyalist | 1,395 | 36.4% |
| Loyal | 1,107 | 28.9% |
| At Risk | 648 | 16.9% |
| VIP/Premium | 518 | 13.5% |
| Lost | 161 | 4.2% |

## Business Recommendations

1. **Focus marketing** on Electronics category and North region
2. **Implement loyalty programs** for "At Risk" segment
3. **Review discount strategies** - high discounts reduce margins
4. **Target VIP customers** with personalized offers
5. **Increase retention** - currently only 25.6%

## Configuration

Edit `config/config.yaml` to customize:

- Data paths
- RFM parameters
- Dashboard settings
- Logging configuration

## License

MIT License - See LICENSE file for details

## Author

Data Engineering Project - Portfolio Ready