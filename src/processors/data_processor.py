"""
E-Commerce Data Processor
Cleans, transforms, and prepares e-commerce data for analysis
"""

from __future__ import annotations

import pandas as pd
import numpy as np
from pathlib import Path
from typing import Tuple, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DataProcessor:
    """Process and transform e-commerce data."""

    def __init__(self, input_path: str, output_path: str) -> None:
        """Initialize processor.

        Args:
            input_path: Path to raw data CSV
            output_path: Path to save processed data
        """
        self.input_path = input_path
        self.output_path = output_path
        self.df: Optional[pd.DataFrame] = None

    def load(self) -> pd.DataFrame:
        """Load raw data from CSV."""
        logger.info(f"Loading data from {self.input_path}")
        self.df = pd.read_csv(self.input_path)
        logger.info(f"Loaded {len(self.df)} records")
        return self.df

    def clean(self) -> pd.DataFrame:
        """Clean data: handle missing values and duplicates."""
        logger.info("Starting data cleaning...")

        initial_shape = self.df.shape
        logger.info(f"Initial shape: {initial_shape}")

        missing = self.df.isnull().sum()
        if missing.any():
            logger.info(f"Missing values:\n{missing[missing > 0]}")
        else:
            logger.info("No missing values found")

        self.df = self.df.drop_duplicates()
        logger.info(f"After removing duplicates: {self.df.shape}")

        numeric_cols = ["Quantity", "Sales", "Profit", "Discount"]
        for col in numeric_cols:
            if self.df[col].isnull().any():
                self.df[col] = self.df[col].fillna(self.df[col].median())

        self.df = self.df.dropna()
        logger.info(f"After handling missing values: {self.df.shape}")

        return self.df

    def transform(self) -> pd.DataFrame:
        """Transform data: create new features."""
        logger.info("Starting data transformation...")

        self.df["Order Date"] = pd.to_datetime(self.df["Order Date"])

        self.df["Year"] = self.df["Order Date"].dt.year
        self.df["Month"] = self.df["Order Date"].dt.month
        self.df["Month Name"] = self.df["Order Date"].dt.month_name()
        self.df["Quarter"] = self.df["Order Date"].dt.quarter
        self.df["Day of Week"] = self.df["Order Date"].dt.day_name()

        self.df["Profit Margin"] = (self.df["Profit"] / self.df["Sales"] * 100).round(2)

        self.df["Unit Price"] = (self.df["Sales"] / self.df["Quantity"]).round(2)

        self.df["Order Value Category"] = pd.cut(
            self.df["Sales"],
            bins=[0, 100, 500, 1000, float("inf")],
            labels=["Low", "Medium", "High", "Premium"]
        )

        logger.info(
            "Added features: Year, Month, Month Name, Quarter, Day of Week, "
            "Profit Margin, Unit Price, Order Value Category"
        )

        return self.df

    def validate(self) -> Tuple[bool, list]:
        """Validate data quality."""
        logger.info("Starting data validation...")

        errors: list = []

        if self.df["Sales"].min() < 0:
            errors.append("Negative sales found")

        if self.df["Profit"].min() < -1000:
            errors.append("Excessive negative profit found")

        if self.df["Quantity"].min() < 1:
            errors.append("Invalid quantity found")

        if self.df["Discount"].max() > 100:
            errors.append("Discount exceeds 100%")

        if not errors:
            logger.info("All validations passed!")
        else:
            logger.warning(f"Validation errors: {errors}")

        return len(errors) == 0, errors

    def save(self) -> None:
        """Save processed data to CSV."""
        Path(self.output_path).parent.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.output_path, index=False)
        logger.info(f"Processed data saved to {self.output_path}")

    def run_pipeline(self) -> pd.DataFrame:
        """Execute complete data processing pipeline."""
        logger.info("=" * 50)
        logger.info("Starting Data Processing Pipeline")
        logger.info("=" * 50)

        self.load()
        self.clean()
        self.transform()
        is_valid, errors = self.validate()

        if is_valid:
            self.save()
            logger.info("Pipeline completed successfully!")
        else:
            logger.error(f"Pipeline failed with errors: {errors}")

        logger.info("=" * 50)

        return self.df

    def get_summary(self) -> dict:
        """Get data summary statistics."""
        return {
            "total_records": len(self.df),
            "total_columns": len(self.df.columns),
            "date_range": f"{self.df['Order Date'].min()} to {self.df['Order Date'].max()}",
            "total_revenue": self.df["Sales"].sum(),
            "total_profit": self.df["Profit"].sum(),
            "unique_customers": self.df["Customer ID"].nunique(),
            "unique_products": self.df["Product Name"].nunique()
        }


def main() -> None:
    """CLI entry point."""
    processor = DataProcessor(
        input_path="data/raw/ecommerce_data.csv",
        output_path="data/processed/ecommerce_processed.csv"
    )

    df = processor.run_pipeline()
    summary = processor.get_summary()

    print("\n--- Data Summary ---")
    for key, value in summary.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()