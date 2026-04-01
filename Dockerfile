FROM python:3.10-slim

LABEL maintainer="Data Engineering Team"
LABEL description="E-Commerce Analytics Dashboard"

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create necessary directories
RUN mkdir -p data/raw data/processed logs reports

# Expose Streamlit port
EXPOSE 8501

# Default command
CMD ["streamlit", "run", "dashboard/app.py", "--server.address", "0.0.0.0"]