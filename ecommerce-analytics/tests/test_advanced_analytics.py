"""
Unit tests for advanced analytics module
"""

from __future__ import annotations

import pytest
import pandas as pd
import numpy as np
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from analytics.advanced_analytics import AdvancedAnalytics


class TestAdvancedAnalytics:
    """Test cases for AdvancedAnalytics class."""

    @pytest.fixture
    def sample_data(self) -> pd.DataFrame:
        """Create sample test data."""
        np.random.seed(42)
        dates = pd.date_range("2023-01-01", periods=100, freq="D")
        
        data = {
            "Order ID": [f"ORD-{i:04d}" for i in range(100)],
            "Order Date": np.random.choice(dates, 100),
            "Customer ID": [f"CUST-{np.random.randint(1, 20):03d}" for _ in range(100)],
            "Customer Name": [f"Customer {i}" for i in range(100)],
            "Region": np.random.choice(["North", "South", "East", "West"], 100),
            "Product Name": np.random.choice(["Laptop", "Phone", "Tablet"], 100),
            "Category": np.random.choice(["Electronics", "Electronics", "Electronics"], 100),
            "Quantity": np.random.randint(1, 10, 100),
            "Sales": np.random.uniform(100, 2000, 100).round(2),
            "Profit": np.random.uniform(10, 500, 100).round(2),
            "Discount": np.random.choice([0, 5, 10, 15], 100)
        }
        return pd.DataFrame(data)

    def test_load_data(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test data loading."""
        input_file = tmp_path / "test_data.csv"
        sample_data.to_csv(input_file, index=False)
        
        analytics = AdvancedAnalytics(str(input_file), str(tmp_path))
        loaded = analytics.load_data()
        
        assert len(loaded) == 100
        assert "Order ID" in loaded.columns

    def test_rfm_analysis(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test RFM analysis produces correct columns."""
        input_file = tmp_path / "test_data.csv"
        sample_data.to_csv(input_file, index=False)
        
        analytics = AdvancedAnalytics(str(input_file), str(tmp_path))
        analytics.load_data()
        rfm = analytics.perform_rfm_analysis()
        
        assert "R_Score" in rfm.columns
        assert "F_Score" in rfm.columns
        assert "M_Score" in rfm.columns
        assert "RFM_Score" in rfm.columns
        assert "Segment" in rfm.columns

    def test_segment_distribution(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test segment distribution contains expected segments."""
        input_file = tmp_path / "test_data.csv"
        sample_data.to_csv(input_file, index=False)
        
        analytics = AdvancedAnalytics(str(input_file), str(tmp_path))
        analytics.load_data()
        analytics.perform_rfm_analysis()
        
        expected_segments = {"VIP/Premium", "Loyal", "Potential Loyalist", "At Risk", "Lost"}
        actual_segments = set(analytics.rfm["Segment"].unique())
        
        assert expected_segments.intersection(actual_segments), "Expected segments not found"

    def test_product_performance(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test product performance analysis."""
        input_file = tmp_path / "test_data.csv"
        sample_data.to_csv(input_file, index=False)
        
        analytics = AdvancedAnalytics(str(input_file), str(tmp_path))
        analytics.load_data()
        product_perf, loss_making = analytics.analyze_product_performance()
        
        assert "Margin %" in product_perf.columns
        assert isinstance(product_perf, pd.DataFrame)
        assert isinstance(loss_making, pd.DataFrame)

    def test_discount_impact(self, sample_data: pd.DataFrame, tmp_path: Path) -> None:
        """Test discount impact analysis."""
        input_file = tmp_path / "test_data.csv"
        sample_data.to_csv(input_file, index=False)
        
        analytics = AdvancedAnalytics(str(input_file), str(tmp_path))
        analytics.load_data()
        result = analytics.analyze_discount_impact()
        
        assert "Margin %" in result.columns
        assert isinstance(result, pd.DataFrame)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])