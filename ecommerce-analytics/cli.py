#!/usr/bin/env python3
"""
E-Commerce Analytics CLI
Command-line interface for the analytics pipeline
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from generators.data_generator import EcommerceDataGenerator
from processors.data_processor import DataProcessor
from analytics.advanced_analytics import AdvancedAnalytics


def cmd_generate(args) -> None:
    """Generate synthetic data."""
    print(f"Generating {args.records:,} records...")
    generator = EcommerceDataGenerator(seed=args.seed)
    df = generator.generate(n_records=args.records)
    generator.save(df, args.output)
    print(f"✓ Saved to {args.output}")


def cmd_process(args) -> None:
    """Process raw data."""
    print(f"Processing {args.input}...")
    processor = DataProcessor(
        input_path=args.input,
        output_path=args.output
    )
    processor.run_pipeline()
    print(f"✓ Saved to {args.output}")


def cmd_analytics(args) -> None:
    """Run advanced analytics."""
    print("Running advanced analytics...")
    analytics = AdvancedAnalytics(
        data_path=args.input,
        output_dir=args.output
    )
    analytics.run_full_analysis()
    print(f"✓ Results saved to {args.output}")


def cmd_dashboard(args) -> None:
    """Launch dashboard."""
    import subprocess
    subprocess.run([
        "streamlit", "run", "dashboard/app.py",
        "--server.port", str(args.port),
        "--server.address", args.host
    ])


def cmd_full(args) -> None:
    """Run full pipeline."""
    print("=" * 60)
    print("Running Full Pipeline")
    print("=" * 60)
    
    # Generate
    print("\n[1/3] Generating data...")
    generator = EcommerceDataGenerator(seed=42)
    df = generator.generate(n_records=5000)
    generator.save(df, "data/raw/ecommerce_data.csv")
    
    # Process
    print("\n[2/3] Processing data...")
    processor = DataProcessor(
        input_path="data/raw/ecommerce_data.csv",
        output_path="data/processed/ecommerce_processed.csv"
    )
    processor.run_pipeline()
    
    # Analytics
    print("\n[3/3] Running analytics...")
    analytics = AdvancedAnalytics(
        data_path="data/processed/ecommerce_processed.csv",
        output_dir="data/processed"
    )
    insights = analytics.run_full_analysis()
    
    print("\n" + "=" * 60)
    print("✓ Pipeline Complete!")
    print("=" * 60)


def main() -> None:
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="E-Commerce Analytics CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Generate command
    gen_parser = subparsers.add_parser("generate", help="Generate synthetic data")
    gen_parser.add_argument("-n", "--records", type=int, default=5000, help="Number of records")
    gen_parser.add_argument("-o", "--output", default="data/raw/ecommerce_data.csv", help="Output path")
    gen_parser.add_argument("-s", "--seed", type=int, default=42, help="Random seed")
    gen_parser.set_defaults(func=cmd_generate)
    
    # Process command
    proc_parser = subparsers.add_parser("process", help="Process raw data")
    proc_parser.add_argument("-i", "--input", default="data/raw/ecommerce_data.csv", help="Input path")
    proc_parser.add_argument("-o", "--output", default="data/processed/ecommerce_processed.csv", help="Output path")
    proc_parser.set_defaults(func=cmd_process)
    
    # Analytics command
    ana_parser = subparsers.add_parser("analytics", help="Run advanced analytics")
    ana_parser.add_argument("-i", "--input", default="data/processed/ecommerce_processed.csv", help="Input path")
    ana_parser.add_argument("-o", "--output", default="data/processed", help="Output directory")
    ana_parser.set_defaults(func=cmd_analytics)
    
    # Dashboard command
    dash_parser = subparsers.add_parser("dashboard", help="Launch Streamlit dashboard")
    dash_parser.add_argument("-p", "--port", type=int, default=8501, help="Port number")
    dash_parser.add_argument("-H", "--host", default="localhost", help="Host address")
    dash_parser.set_defaults(func=cmd_dashboard)
    
    # Full pipeline command
    full_parser = subparsers.add_parser("full", help="Run full pipeline")
    full_parser.set_defaults(func=cmd_full)
    
    args = parser.parse_args()
    
    if args.command is None:
        parser.print_help()
        sys.exit(1)
    
    args.func(args)


if __name__ == "__main__":
    main()