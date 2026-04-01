"""
E-Commerce Advanced Analytics
Performs RFM analysis, customer segmentation, and business insights
"""

from __future__ import annotations

import pandas as pd
import numpy as np
from typing import Tuple, Dict, List
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AdvancedAnalytics:
    """Advanced analytics for e-commerce data."""

    def __init__(self, data_path: str, output_dir: str = "data/processed") -> None:
        """Initialize analytics module.

        Args:
            data_path: Path to processed data CSV
            output_dir: Directory to save analysis outputs
        """
        self.data_path = data_path
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.df: Optional[pd.DataFrame] = None
        self.rfm: Optional[pd.DataFrame] = None

    def load_data(self) -> pd.DataFrame:
        """Load processed data."""
        logger.info(f"Loading data from {self.data_path}")
        self.df = pd.read_csv(self.data_path, parse_dates=["Order Date"])
        return self.df

    def perform_rfm_analysis(self) -> pd.DataFrame:
        """Perform RFM (Recency, Frequency, Monetary) customer segmentation.

        Returns:
            DataFrame with RFM scores and segments
        """
        logger.info("=" * 60)
        logger.info("RFM CUSTOMER SEGMENTATION ANALYSIS")
        logger.info("=" * 60)

        reference_date = self.df["Order Date"].max() + pd.Timedelta(days=1)

        self.rfm = self.df.groupby("Customer ID").agg({
            "Order Date": lambda x: (reference_date - x.max()).days,
            "Order ID": "count",
            "Sales": "sum",
            "Profit": "sum"
        }).reset_index()

        self.rfm.columns = ["Customer ID", "Recency", "Frequency", "Monetary", "Total Profit"]

        self.rfm["R_Score"] = pd.qcut(self.rfm["Recency"], q=5, labels=[5, 4, 3, 2, 1], duplicates="drop")
        self.rfm["F_Score"] = pd.qcut(self.rfm["Frequency"].rank(method="first"), q=5, labels=[1, 2, 3, 4, 5])
        self.rfm["M_Score"] = pd.qcut(self.rfm["Monetary"].rank(method="first"), q=5, labels=[1, 2, 3, 4, 5])

        self.rfm["R_Score"] = self.rfm["R_Score"].astype(int)
        self.rfm["F_Score"] = self.rfm["F_Score"].astype(int)
        self.rfm["M_Score"] = self.rfm["M_Score"].astype(int)

        self.rfm["RFM_Score"] = self.rfm["R_Score"] + self.rfm["F_Score"] + self.rfm["M_Score"]

        def segment_customer(score: int) -> str:
            if score >= 13:
                return "VIP/Premium"
            elif score >= 10:
                return "Loyal"
            elif score >= 7:
                return "Potential Loyalist"
            elif score >= 5:
                return "At Risk"
            else:
                return "Lost"

        self.rfm["Segment"] = self.rfm["RFM_Score"].apply(segment_customer)

        logger.info(f"\nRFM Segment Distribution:\n{self.rfm['Segment'].value_counts()}")

        segment_stats = self.rfm.groupby("Segment").agg({
            "Monetary": ["count", "sum", "mean"],
            "Frequency": "mean",
            "Recency": "mean"
        }).round(2)
        logger.info(f"\nSegment Performance:\n{segment_stats}")

        self.rfm.to_csv(self.output_dir / "rfm_analysis.csv", index=False)
        logger.info(f"RFM analysis saved to {self.output_dir / 'rfm_analysis.csv'}")

        return self.rfm

    def identify_high_value_customers(self, top_percent: float = 10.0) -> pd.DataFrame:
        """Identify high-value customers based on monetary value.

        Args:
            top_percent: Percentage of top customers to identify

        Returns:
            DataFrame of high-value customers
        """
        logger.info("\n" + "=" * 60)
        logger.info(f"HIGH-VALUE CUSTOMERS (Top {top_percent}%)")
        logger.info("=" * 60)

        if self.rfm is None:
            self.perform_rfm_analysis()

        threshold = self.rfm["Monetary"].quantile(1 - top_percent / 100)
        high_value = self.rfm[self.rfm["Monetary"] >= threshold].sort_values("Monetary", ascending=False)

        logger.info(f"Total Customers: {len(self.rfm)}")
        logger.info(f"High-Value Count: {len(high_value)}")
        logger.info(f"Threshold: ${threshold:,.2f}")
        logger.info(f"Total Revenue from HV: ${high_value['Monetary'].sum():,.2f}")

        return high_value

    def analyze_product_performance(self) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Analyze product performance and identify loss-making products.

        Returns:
            Tuple of (product_performance, loss_making_products)
        """
        logger.info("\n" + "=" * 60)
        logger.info("PRODUCT PERFORMANCE ANALYSIS")
        logger.info("=" * 60)

        product_perf = self.df.groupby(["Product Name", "Category"]).agg({
            "Sales": "sum",
            "Profit": "sum",
            "Quantity": "sum",
            "Order ID": "count"
        }).reset_index()

        product_perf["Margin %"] = (product_perf["Profit"] / product_perf["Sales"] * 100).round(2)

        loss_making = product_perf[product_perf["Profit"] < 0].sort_values("Profit")

        logger.info(f"Total Products: {len(product_perf)}")
        logger.info(f"Loss-Making Products: {len(loss_making)}")

        if len(loss_making) > 0:
            logger.info(f"\nLoss-Making Products:\n{loss_making[['Product Name', 'Category', 'Sales', 'Profit', 'Margin %']]}")

        low_margin = product_perf.nsmallest(10, "Margin %")
        logger.info(f"\nLowest Margin Products (Top 10):\n{low_margin[['Product Name', 'Category', 'Sales', 'Profit', 'Margin %']]}")

        product_perf.to_csv(self.output_dir / "product_performance.csv", index=False)

        return product_perf, loss_making

    def analyze_discount_impact(self) -> pd.DataFrame:
        """Analyze impact of discount on profitability."""
        logger.info("\n" + "=" * 60)
        logger.info("DISCOUNT IMPACT ANALYSIS")
        logger.info("=" * 60)

        self.df["Discount Bin"] = pd.cut(
            self.df["Discount"],
            bins=[-1, 0, 10, 20, 30, 100],
            labels=["0%", "1-10%", "11-20%", "21-30%", ">30%"]
        )

        discount_analysis = self.df.groupby("Discount Bin").agg({
            "Sales": ["sum", "mean"],
            "Profit": ["sum", "mean"],
            "Order ID": "count"
        }).round(2)

        discount_analysis.columns = ["Total Sales", "Avg Sales", "Total Profit", "Avg Profit", "Order Count"]
        discount_analysis["Margin %"] = (discount_analysis["Total Profit"] / discount_analysis["Total Sales"] * 100).round(2)

        logger.info(f"\nDiscount Range Performance:\n{discount_analysis}")

        return discount_analysis

    def analyze_customer_retention(self) -> Dict:
        """Analyze customer retention and repeat purchase behavior."""
        logger.info("\n" + "=" * 60)
        logger.info("CUSTOMER RETENTION ANALYSIS")
        logger.info("=" * 60)

        customer_orders = self.df.groupby("Customer ID")["Order ID"].count()

        one_time = (customer_orders == 1).sum()
        repeat = (customer_orders > 1).sum()
        retention_rate = (repeat / len(customer_orders)) * 100

        logger.info(f"Total Unique Customers: {len(customer_orders)}")
        logger.info(f"One-Time Buyers: {one_time} ({one_time / len(customer_orders) * 100:.1f}%)")
        logger.info(f"Repeat Buyers: {repeat} ({repeat / len(customer_orders) * 100:.1f}%)")
        logger.info(f"Retention Rate: {retention_rate:.1f}%")

        return {
            "total_customers": len(customer_orders),
            "one_time_buyers": one_time,
            "repeat_buyers": repeat,
            "retention_rate": retention_rate
        }

    def generate_business_insights(self) -> Dict:
        """Generate comprehensive business insights."""
        logger.info("\n" + "=" * 60)
        logger.info("BUSINESS INSIGHTS SUMMARY")
        logger.info("=" * 60)

        if self.df is None:
            self.load_data()

        total_revenue = self.df["Sales"].sum()
        total_profit = self.df["Profit"].sum()
        profit_margin = (total_profit / total_revenue * 100)

        category_perf = self.df.groupby("Category")["Sales"].sum()
        region_perf = self.df.groupby("Region")["Sales"].sum()

        insights = {
            "total_revenue": total_revenue,
            "total_profit": total_profit,
            "profit_margin": profit_margin,
            "total_orders": len(self.df),
            "unique_customers": self.df["Customer ID"].nunique(),
            "avg_order_value": total_revenue / len(self.df),
            "best_category": category_perf.idxmax(),
            "best_region": region_perf.idxmax(),
            "top_products": self.df.groupby("Product Name")["Sales"].sum().nlargest(5).to_dict()
        }

        logger.info(f"""
KEY METRICS:
   - Total Revenue: ${total_revenue:,.2f}
   - Total Profit: ${total_profit:,.2f}
   - Profit Margin: {profit_margin:.2f}%
   - Total Orders: {len(self.df):,}
   - Unique Customers: {self.df['Customer ID'].nunique():,}
   - Avg Order Value: ${total_revenue / len(self.df):.2f}

TOP SEGMENTS:
   - Best Category: {category_perf.idxmax()} (${category_perf.max():,.2f})
   - Best Region: {region_perf.idxmax()} (${region_perf.max():,.2f})

RECOMMENDATIONS:
   1. Focus marketing on high-margin categories
   2. Implement loyalty programs for repeat customers
   3. Review discount strategies for low-margin products
   4. Target VIP customers with personalized offers
""")

        return insights

    def run_full_analysis(self) -> Dict:
        """Run complete analytics pipeline."""
        logger.info("Starting full analytics pipeline...")

        self.load_data()

        insights = self.generate_business_insights()
        self.perform_rfm_analysis()
        self.identify_high_value_customers()
        self.analyze_product_performance()
        self.analyze_discount_impact()
        self.analyze_customer_retention()

        logger.info("\n✅ Analytics Pipeline Complete!")

        return insights


def main() -> None:
    """CLI entry point."""
    analytics = AdvancedAnalytics(
        data_path="data/processed/ecommerce_processed.csv",
        output_dir="data/processed"
    )

    results = analytics.run_full_analysis()

    print("\n--- Key Metrics ---")
    for key, value in results.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()