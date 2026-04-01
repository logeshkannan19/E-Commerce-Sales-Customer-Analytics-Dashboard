"""
Unit tests for data processor module
"""

from __future__ import annotations

import pytest
import pandas as pd
import numpy as np
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from processors.data_processor import DataProcessor


class TestDataProcessor:
    """Test cases for DataProcessor class."""

    @pytest.fixture
    def sample_data(self) -> pd.DataFrame:
        """Create sample test data."""
        data = {
            "Order ID": ["ORD-001", "ORD-002", "ORD-003"],
            "Order Date": ["2023-01-01", "2023-01-02", "2023-01-03"],
            "Customer ID": ["CUST-001", "CUST-002", "CUST-001"],
            "Customer Name": ["John Doe", "Jane Smith", "John Doe"],
            "Region": ["North", "South", "North"],
            "Product Name": ["Laptop", "Phone", "Laptop"],
            "Category": ["Electronics", "Electronics", "Electronics"],
            "Quantity": [1, 2, 1],
            "Sales": [1000, 500, 1000],
            "Profit": [200, 100, 200],
            "Discount": [0, 10, 0]
        }
        return pd.DataFrame(data)

    def test_data_loading(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test data loading functionality."""
        input_file = tmp_path / "test_input.csv"
        sample_data.to_csv(input_file, index=False)

        processor = DataProcessor(str(input_file), str(tmp_path / "output.csv"))
        loaded_df = processor.load()

        assert len(loaded_df) == 3
        assert "Order ID" in loaded_df.columns

    def test_data_cleaning(self, sample_data: pd.DataFrame) -> None:
        """Test data cleaning removes duplicates."""
        processor = DataProcessor("", "")
        processor.df = sample_data.copy()

        processor.df = pd.concat([processor.df, processor.df.iloc[[0]]])

        processor.clean()

        assert len(processor.df) == 3

    def test_data_transformation(self, sample_data: pd.DataFrame) -> None:
        """Test feature engineering."""
        processor = DataProcessor("", "")
        processor.df = sample_data.copy()

        processor.transform()

        assert "Year" in processor.df.columns
        assert "Month" in processor.df.columns
        assert "Profit Margin" in processor.df.columns
        assert "Unit Price" in processor.df.columns

    def test_validation(self, sample_data: pd.DataFrame) -> None:
        """Test data validation."""
        processor = DataProcessor("", "")
        processor.df = sample_data.copy()

        is_valid, errors = processor.validate()

        assert is_valid is True
        assert len(errors) == 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])