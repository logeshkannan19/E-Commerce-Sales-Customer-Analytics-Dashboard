"""
E-Commerce Data Generator
Generates synthetic e-commerce transaction data for testing and development
"""

from __future__ import annotations

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from pathlib import Path
from typing import Dict, List, Tuple


class EcommerceDataGenerator:
    """Generate realistic synthetic e-commerce data."""

    REGIONS: List[str] = ["North", "South", "East", "West", "Central"]
    CATEGORIES: List[str] = [
        "Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys"
    ]

    PRODUCTS: Dict[str, List[str]] = {
        "Electronics": ["Laptop", "Smartphone", "Tablet", "Headphones", "Smart Watch", "Camera", "Speaker"],
        "Clothing": ["T-Shirt", "Jeans", "Jacket", "Dress", "Sneakers", "Hat", "Sweater"],
        "Home & Garden": ["Furniture Set", "Lamp", "Plant Pot", "Kitchenware", "Bed Sheets", "Curtains"],
        "Sports": ["Yoga Mat", "Dumbbells", "Bicycle", "Running Shoes", "Tennis Racket", "Swim Goggles"],
        "Books": ["Fiction Novel", "Cookbook", "Biography", "Self-Help", "Science Book", "History Book"],
        "Toys": ["Action Figure", "Board Game", "Puzzle", "Building Blocks", "Remote Car", "Doll"]
    }

    FIRST_NAMES: List[str] = [
        "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
        "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
        "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", "Daniel", "Nancy"
    ]

    LAST_NAMES: List[str] = [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
        "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
        "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White"
    ]

    def __init__(self, seed: int = 42) -> None:
        """Initialize generator with random seed."""
        np.random.seed(seed)
        random.seed(seed)
        self._customers: Dict[str, str] = {}

    def _generate_customer_id(self) -> str:
        """Generate unique customer ID."""
        return f"CUST-{random.randint(1000, 9999)}"

    def _generate_customer_name(self) -> str:
        """Generate random customer name."""
        return f"{random.choice(self.FIRST_NAMES)} {random.choice(self.LAST_NAMES)}"

    def _get_base_price(self, category: str) -> float:
        """Get base price range for category."""
        prices = {
            "Electronics": (50, 1500),
            "Clothing": (15, 200),
            "Home & Garden": (20, 500),
            "Sports": (10, 300),
            "Books": (8, 50),
            "Toys": (10, 100)
        }
        return random.uniform(*prices[category])

    def generate(
        self,
        n_records: int = 5000,
        start_date: str = "2023-01-01",
        end_date: str = "2024-12-31"
    ) -> pd.DataFrame:
        """Generate synthetic e-commerce dataset."""
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
        date_range = (end - start).days

        data: List[Dict] = []

        for _ in range(n_records):
            order_date = start + timedelta(days=random.randint(0, date_range))

            customer_id = self._generate_customer_id()
            if customer_id not in self._customers:
                self._customers[customer_id] = self._generate_customer_name()

            category = random.choice(self.CATEGORIES)
            product = random.choice(self.PRODUCTS[category])
            quantity = random.randint(1, 10)

            base_price = self._get_base_price(category)
            discount = random.choice([0, 0, 0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3])

            sales = round(quantity * base_price * (1 - discount), 2)
            cost_ratio = random.uniform(0.4, 0.8)
            profit = round(sales * (1 - cost_ratio) * (1 - discount * 0.5), 2)

            data.append({
                "Order ID": f"ORD-{order_date.strftime('%Y%m%d')}-{random.randint(1000, 9999)}",
                "Order Date": order_date.strftime("%Y-%m-%d"),
                "Customer ID": customer_id,
                "Customer Name": self._customers[customer_id],
                "Region": random.choice(self.REGIONS),
                "Product Name": product,
                "Category": category,
                "Quantity": quantity,
                "Sales": sales,
                "Profit": profit,
                "Discount": round(discount * 100, 0)
            })

        df = pd.DataFrame(data)
        df = df.sort_values("Order Date").reset_index(drop=True)
        return df

    def save(self, df: pd.DataFrame, filepath: str) -> None:
        """Save generated data to CSV."""
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(filepath, index=False)
        print(f"Data saved to {filepath}")


def main() -> None:
    """CLI entry point."""
    generator = EcommerceDataGenerator(seed=42)
    df = generator.generate(n_records=5000)

    output_path = "data/raw/ecommerce_data.csv"
    generator.save(df, output_path)

    print(f"\nGenerated {len(df)} records")
    print(f"Date range: {df['Order Date'].min()} to {df['Order Date'].max()}")
    print(f"Total Sales: ${df['Sales'].sum():,.2f}")
    print(f"Total Profit: ${df['Profit'].sum():,.2f}")
    print(f"Unique Customers: {df['Customer ID'].nunique()}")


if __name__ == "__main__":
    main()