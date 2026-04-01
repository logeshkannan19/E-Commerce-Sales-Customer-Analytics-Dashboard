.PHONY: help install setup generate process analytics dashboard test clean lint format run

help:
	@echo "E-Commerce Analytics - Available Commands"
	@echo "============================================"
	@echo "make install      - Install dependencies"
	@echo "make setup        - Setup project structure"
	@echo "make generate     - Generate synthetic data"
	@echo "make process      - Process raw data"
	@echo "make analytics    - Run advanced analytics"
	@echo "make dashboard    - Launch Streamlit dashboard"
	@echo "make test         - Run unit tests"
	@echo "make lint         - Run code linting"
	@echo "make format       - Format code"
	@echo "make run          - Run full pipeline"
	@echo "make clean        - Clean generated files"

install:
	pip install -r requirements.txt

setup:
	mkdir -p data/raw data/processed logs reports

generate:
	cd src && python3 generators/data_generator.py

process:
	cd src && python3 processors/data_processor.py

analytics:
	cd src && python3 analytics/advanced_analytics.py

dashboard:
	cd dashboard && streamlit run app.py --server.port 8501

test:
	pytest tests/ -v --cov=src --cov-report=html

lint:
	flake8 src/ tests/ --max-line-length=120 --ignore=E203,W503 || true
	pylint src/ --disable=all --enable=E,F || true

format:
	black src/ tests/ dashboard/ --line-length=120 || true
	isort src/ tests/ dashboard/ --profile=black || true

run: generate process analytics
	@echo "Full pipeline completed!"

clean:
	rm -rf data/processed/*.csv
	rm -rf __pycache__ src/__pycache__ src/**/__pycache__
	rm -rf .pytest_cache
	rm -rf htmlcov .coverage
	rm -rf logs/*.log
	rm -rf reports/*.png
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true