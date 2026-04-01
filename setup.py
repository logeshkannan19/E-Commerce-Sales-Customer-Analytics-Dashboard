from setuptools import setup, find_packages

setup(
    name="ecommerce-analytics",
    version="1.0.0",
    description="E-Commerce Sales & Customer Analytics Dashboard",
    author="Data Engineering Team",
    packages=find_packages(),
    install_requires=[
        "pandas>=1.5.0",
        "numpy>=1.21.0",
        "matplotlib>=3.5.0",
        "seaborn>=0.11.0",
        "plotly>=5.10.0",
        "streamlit>=1.20.0",
        "sqlalchemy>=1.4.0",
        "psycopg2-binary>=2.9.0",
        "pyyaml>=6.0",
        "python-dotenv>=1.0.0",
    ],
    python_requires=">=3.10",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Programming Language :: Python :: 3.10",
    ],
)