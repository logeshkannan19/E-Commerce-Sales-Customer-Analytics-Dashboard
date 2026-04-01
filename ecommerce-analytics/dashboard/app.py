"""
E-Commerce Analytics Dashboard
Streamlit Web Application
"""

from __future__ import annotations

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
from typing import Optional

st.set_page_config(
    page_title="E-Commerce Analytics Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)


@st.cache_data
def load_data() -> pd.DataFrame:
    """Load processed data."""
    df = pd.read_csv("data/processed/ecommerce_processed.csv", parse_dates=["Order Date"])
    return df


def main() -> None:
    """Main dashboard application."""

    df = load_data()

    st.sidebar.title("🎯 Filters")

    region_filter = st.sidebar.multiselect(
        "Select Region",
        options=df["Region"].unique(),
        default=df["Region"].unique()
    )

    category_filter = st.sidebar.multiselect(
        "Select Category",
        options=df["Category"].unique(),
        default=df["Category"].unique()
    )

    date_range = st.sidebar.date_input(
        "Select Date Range",
        value=(df["Order Date"].min().date(), df["Order Date"].max().date()),
        min_value=df["Order Date"].min().date(),
        max_value=df["Order Date"].max().date()
    )

    if len(date_range) == 2:
        start_date, end_date = date_range
    else:
        start_date = df["Order Date"].min().date()
        end_date = df["Order Date"].max().date()

    filtered_df = df[
        (df["Region"].isin(region_filter)) &
        (df["Category"].isin(category_filter)) &
        (df["Order Date"].dt.date >= start_date) &
        (df["Order Date"].dt.date <= end_date)
    ]

    st.title("📊 E-Commerce Sales & Customer Analytics Dashboard")
    st.markdown("---")

    # KPI Metrics
    col1, col2, col3, col4 = st.columns(4)

    total_revenue = filtered_df["Sales"].sum()
    total_profit = filtered_df["Profit"].sum()
    total_orders = len(filtered_df)
    unique_customers = filtered_df["Customer ID"].nunique()
    profit_margin = (total_profit / total_revenue * 100) if total_revenue > 0 else 0

    with col1:
        st.metric("Total Revenue", f"${total_revenue:,.2f}", delta=f"${total_revenue:,.0f}")

    with col2:
        st.metric("Total Profit", f"${total_profit:,.2f}", delta=f"{profit_margin:.1f}%")

    with col3:
        st.metric("Total Orders", f"{total_orders:,}", delta=f"{total_orders:,} orders")

    with col4:
        st.metric("Unique Customers", f"{unique_customers:,}", delta=f"{unique_customers:,} customers")

    st.markdown("---")

    # Monthly Trend & Category Distribution
    col_left, col_right = st.columns([2, 1])

    with col_left:
        st.subheader("📈 Monthly Sales Trend")

        monthly_data = filtered_df.groupby(filtered_df["Order Date"].dt.to_period("M")).agg({
            "Sales": "sum",
            "Profit": "sum"
        }).reset_index()
        monthly_data["Period"] = monthly_data["Order Date"].astype(str)

        fig_trend = px.line(
            monthly_data,
            x="Period",
            y="Sales",
            markers=True,
            line_shape="spline",
            color_discrete_sequence=["#2E86AB"]
        )
        fig_trend.update_layout(
            xaxis_title="Month",
            yaxis_title="Revenue ($)",
            hovermode="x unified"
        )
        st.plotly_chart(fig_trend, use_container_width=True)

    with col_right:
        st.subheader("🏆 Top Categories")

        category_data = filtered_df.groupby("Category")["Sales"].sum().reset_index()
        category_data = category_data.sort_values("Sales", ascending=True)

        fig_pie = px.pie(
            category_data,
            values="Sales",
            names="Category",
            color_discrete_sequence=px.colors.qualitative.Set3
        )
        fig_pie.update_layout(showlegend=True)
        st.plotly_chart(fig_pie, use_container_width=True)

    st.markdown("---")

    # Top Products & Regional Performance
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("📦 Top 10 Products by Revenue")

        top_products = filtered_df.groupby("Product Name").agg({
            "Sales": "sum",
            "Profit": "sum"
        }).nlargest(10, "Sales").reset_index()

        fig_products = px.bar(
            top_products,
            x="Sales",
            y="Product Name",
            orientation="h",
            color="Sales",
            color_continuous_scale="Viridis"
        )
        fig_products.update_layout(
            yaxis_title="",
            xaxis_title="Revenue ($)",
            yaxis={"categoryorder": "total ascending"}
        )
        st.plotly_chart(fig_products, use_container_width=True)

    with col2:
        st.subheader("🌍 Sales by Region")

        region_data = filtered_df.groupby("Region").agg({
            "Sales": "sum",
            "Profit": "sum",
            "Order ID": "count"
        }).reset_index()
        region_data.columns = ["Region", "Revenue", "Profit", "Orders"]

        fig_region = px.bar(
            region_data,
            x="Region",
            y="Revenue",
            color="Region",
            color_discrete_sequence=px.colors.qualitative.Pastel
        )
        fig_region.update_layout(
            xaxis_title="Region",
            yaxis_title="Revenue ($)"
        )
        st.plotly_chart(fig_region, use_container_width=True)

    st.markdown("---")

    # Top Customers & Profit Margins
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("👥 Top 10 Customers")

        top_customers = filtered_df.groupby(["Customer ID", "Customer Name"]).agg({
            "Sales": "sum",
            "Profit": "sum",
            "Order ID": "count"
        }).nlargest(10, "Sales").reset_index()
        top_customers.columns = ["Customer ID", "Customer Name", "Revenue", "Profit", "Orders"]

        fig_customers = px.bar(
            top_customers,
            x="Revenue",
            y="Customer Name",
            orientation="h",
            color="Revenue",
            color_continuous_scale="Blues"
        )
        fig_customers.update_layout(
            yaxis_title="",
            xaxis_title="Total Revenue ($)",
            yaxis={"categoryorder": "total ascending"}
        )
        st.plotly_chart(fig_customers, use_container_width=True)

    with col2:
        st.subheader("📉 Profit Margin by Category")

        margin_data = filtered_df.groupby("Category").agg({
            "Sales": "sum",
            "Profit": "sum"
        }).reset_index()
        margin_data["Margin %"] = (margin_data["Profit"] / margin_data["Sales"] * 100).round(2)
        margin_data = margin_data.sort_values("Margin %", ascending=True)

        fig_margin = px.bar(
            margin_data,
            x="Category",
            y="Margin %",
            color="Margin %",
            color_continuous_scale="RdYlGn"
        )
        fig_margin.update_layout(
            xaxis_title="Category",
            yaxis_title="Profit Margin (%)"
        )
        st.plotly_chart(fig_margin, use_container_width=True)

    st.markdown("---")

    # Data Table
    st.subheader("📋 Detailed Data View")
    st.dataframe(filtered_df.head(100), use_container_width=True)

    # Summary Statistics
    st.subheader("📊 Summary Statistics")
    col1, col2 = st.columns(2)

    with col1:
        st.write("### Sales Statistics")
        st.write(filtered_df[["Sales", "Profit", "Quantity", "Discount"]].describe().round(2))

    with col2:
        st.write("### Regional Performance")
        region_stats = filtered_df.groupby("Region").agg({
            "Sales": ["sum", "mean"],
            "Profit": ["sum", "mean"],
            "Order ID": "count"
        }).round(2)
        st.write(region_stats)

    st.markdown("---")
    st.markdown("""
    <div style='text-align: center; color: gray;'>
        <p>📊 E-Commerce Analytics Dashboard | Built with Streamlit</p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()