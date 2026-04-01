"""
E-Commerce Analytics Package
Main entry point for the application
"""

from __future__ import annotations

import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from generators.data_generator import EcommerceDataGenerator
from processors.data_processor import DataProcessor
from analytics.advanced_analytics import AdvancedAnalytics


def main() -> None:
    """Main CLI entry point."""
    print("=" * 60)
    print("E-Commerce Analytics Pipeline")
    print("=" * 60)
    
    # Step 1: Generate data
    print("\n[1/3] Generating synthetic data...")
    generator = EcommerceDataGenerator(seed=42)
    df = generator.generate(n_records=5000)
    generator.save(df, "data/raw/ecommerce_data.csv")
    print(f"Generated {len(df)} records")
    
    # Step 2: Process data
    print("\n[2/3] Processing data...")
    processor = DataProcessor(
        input_path="data/raw/ecommerce_data.csv",
        output_path="data/processed/ecommerce_processed.csv"
    )
    processor.run_pipeline()
    summary = processor.get_summary()
    print(f"Processed {summary['total_records']} records")
    
    # Step 3: Run analytics
    print("\n[3/3] Running advanced analytics...")
    analytics = AdvancedAnalytics(
        data_path="data/processed/ecommerce_processed.csv",
        output_dir="data/processed"
    )
    insights = analytics.run_full_analysis()
    
    print("\n" + "=" * 60)
    print("Pipeline Complete!")
    print("=" * 60)
    print(f"\nTotal Revenue: ${insights['total_revenue']:,.2f}")
    print(f"Total Profit: ${insights['total_profit']:,.2f}")
    print(f"Profit Margin: {insights['profit_margin']:.2f}%")
    print(f"Unique Customers: {insights['unique_customers']:,}")


if __name__ == "__main__":
    main()