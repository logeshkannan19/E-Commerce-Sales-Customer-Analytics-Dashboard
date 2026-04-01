-- ============================================================
-- E-Commerce Sales Analysis SQL Queries
-- PostgreSQL / MySQL Compatible
-- ============================================================

-- ============================================================
-- 1. KEY METRICS OVERVIEW
-- ============================================================

SELECT 
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin_pct,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM ecommerce_data;

-- ============================================================
-- 2. MONTHLY SALES TREND
-- ============================================================

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    TO_CHAR(order_date, 'YYYY-MM') AS year_month,
    COUNT(*) AS order_count,
    SUM(sales) AS revenue,
    SUM(profit) AS profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date), TO_CHAR(order_date, 'YYYY-MM')
ORDER BY year_month;

-- ============================================================
-- 3. TOP 10 PRODUCTS BY REVENUE
-- ============================================================

SELECT 
    product_name,
    category,
    COUNT(*) AS order_count,
    SUM(quantity) AS total_quantity_sold,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY product_name, category
ORDER BY total_revenue DESC
LIMIT 10;

-- ============================================================
-- 4. TOP 10 PRODUCTS BY PROFIT
-- ============================================================

SELECT 
    product_name,
    category,
    COUNT(*) AS order_count,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY product_name, category
ORDER BY total_profit DESC
LIMIT 10;

-- ============================================================
-- 5. SALES BY REGION
-- ============================================================

SELECT 
    region,
    COUNT(*) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY region
ORDER BY total_revenue DESC;

-- ============================================================
-- 6. SALES BY CATEGORY
-- ============================================================

SELECT 
    category,
    COUNT(*) AS order_count,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY category
ORDER BY total_revenue DESC;

-- ============================================================
-- 7. MONTHLY TREND BY CATEGORY
-- ============================================================

SELECT 
    category,
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    SUM(sales) AS revenue,
    SUM(profit) AS profit
FROM ecommerce_data
GROUP BY category, EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date)
ORDER BY year, month, category;

-- ============================================================
-- 8. CUSTOMER SEGMENTATION - TOP CUSTOMERS
-- ============================================================

SELECT 
    customer_id,
    customer_name,
    region,
    COUNT(*) AS total_orders,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(AVG(sales), 2) AS avg_order_value,
    MAX(order_date) AS last_order_date
FROM ecommerce_data
GROUP BY customer_id, customer_name, region
ORDER BY total_revenue DESC
LIMIT 20;

-- ============================================================
-- 9. CUSTOMER SEGMENTATION BY ORDER FREQUENCY
-- ============================================================

SELECT 
    customer_segment,
    COUNT(*) AS customer_count,
    ROUND(AVG(total_orders), 1) AS avg_orders,
    ROUND(AVG(total_revenue), 2) AS avg_revenue
FROM (
    SELECT 
        customer_id,
        customer_name,
        COUNT(*) AS total_orders,
        SUM(sales) AS total_revenue,
        CASE 
            WHEN COUNT(*) >= 5 THEN 'Frequent'
            WHEN COUNT(*) >= 2 THEN 'Regular'
            ELSE 'One-time'
        END AS customer_segment
    FROM ecommerce_data
    GROUP BY customer_id, customer_name
) customer_summary
GROUP BY customer_segment
ORDER BY customer_count DESC;

-- ============================================================
-- 10. DISCOUNT IMPACT ANALYSIS
-- ============================================================

SELECT 
    CASE 
        WHEN discount = 0 THEN 'No Discount'
        WHEN discount <= 10 THEN '0-10%'
        WHEN discount <= 20 THEN '10-20%'
        WHEN discount <= 30 THEN '20-30%'
        ELSE '>30%'
    END AS discount_range,
    COUNT(*) AS order_count,
    ROUND(AVG(sales), 2) AS avg_sales,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY discount_range
ORDER BY discount_range;

-- ============================================================
-- 11. PRODUCTS WITH NEGATIVE PROFIT (LOSS-MAKING)
-- ============================================================

SELECT 
    product_name,
    category,
    COUNT(*) AS order_count,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY product_name, category
HAVING SUM(profit) < 0
ORDER BY total_profit ASC;

-- ============================================================
-- 12. QUARTERLY PERFORMANCE
-- ============================================================

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(QUARTER FROM order_date) AS quarter,
    SUM(sales) AS revenue,
    SUM(profit) AS profit,
    ROUND(SUM(profit) / SUM(sales) * 100, 2) AS profit_margin
FROM ecommerce_data
GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(QUARTER FROM order_date)
ORDER BY year, quarter;

-- ============================================================
-- 13. REGION + CATEGORY PERFORMANCE
-- ============================================================

SELECT 
    region,
    category,
    COUNT(*) AS order_count,
    SUM(sales) AS revenue,
    SUM(profit) AS profit
FROM ecommerce_data
GROUP BY region, category
ORDER BY region, revenue DESC;

-- ============================================================
-- 14. DAY OF WEEK PERFORMANCE
-- ============================================================

SELECT 
    TO_CHAR(order_date, 'Day') AS day_of_week,
    EXTRACT(DOW FROM order_date) AS day_num,
    COUNT(*) AS order_count,
    SUM(sales) AS revenue
FROM ecommerce_data
GROUP BY TO_CHAR(order_date, 'Day'), EXTRACT(DOW FROM order_date)
ORDER BY day_num;

-- ============================================================
-- 15. RFM ANALYSIS PREPARATION
-- ============================================================

SELECT 
    customer_id,
    customer_name,
    MAX(order_date) AS last_order_date,
    COUNT(*) AS purchase_frequency,
    SUM(sales) AS total_monetary,
    SUM(profit) AS total_profit
FROM ecommerce_data
GROUP BY customer_id, customer_name
ORDER BY total_monetary DESC;

-- ============================================================
-- 16. YEAR-OVER-YEAR COMPARISON
-- ============================================================

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    COUNT(*) AS total_orders,
    SUM(sales) AS total_revenue,
    SUM(profit) AS total_profit,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM ecommerce_data
GROUP BY EXTRACT(YEAR FROM order_date)
ORDER BY year;