# Pandas Manual for Biology Researchers

**A Companion to the Python Manual for Biology Researchers**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started with pandas**

1. [Introduction: Why pandas?](#1-introduction-why-pandas)
2. [Installing and Importing pandas](#2-installing-and-importing-pandas)
3. [Core Data Structures: Series and DataFrame](#3-core-data-structures-series-and-dataframe)

**Part II: Loading and Inspecting Data**

4. [Reading Data from Files](#4-reading-data-from-files)
5. [Inspecting Your Data](#5-inspecting-your-data)
6. [Data Types in pandas](#6-data-types-in-pandas)

**Part III: Selecting and Filtering Data**

7. [Selecting Columns and Rows](#7-selecting-columns-and-rows)
8. [Boolean Filtering](#8-boolean-filtering)
9. [Working with the Index](#9-working-with-the-index)

**Part IV: Modifying and Cleaning Data**

10. [Adding and Modifying Columns](#10-adding-and-modifying-columns)
11. [Handling Missing Data](#11-handling-missing-data)
12. [Renaming, Replacing, and Retyping](#12-renaming-replacing-and-retyping)
13. [Sorting and Ranking](#13-sorting-and-ranking)

**Part V: Combining and Reshaping Data**

14. [Concatenating DataFrames](#14-concatenating-dataframes)
15. [Merging and Joining](#15-merging-and-joining)
16. [Reshaping: Pivot, Melt, and Stack](#16-reshaping-pivot-melt-and-stack)

**Part VI: Grouping and Aggregation**

17. [GroupBy: Split-Apply-Combine](#17-groupby-split-apply-combine)
18. [Pivot Tables and Cross-Tabulations](#18-pivot-tables-and-cross-tabulations)

**Part VII: Working with Text and Time**

19. [String Methods](#19-string-methods)
20. [Date and Time Data](#20-date-and-time-data)

**Part VIII: Statistics, Plotting, and Export**

21. [Descriptive Statistics](#21-descriptive-statistics)
22. [Plotting with pandas](#22-plotting-with-pandas)
23. [Saving and Exporting Data](#23-saving-and-exporting-data)

**Part IX: Performance and Best Practices**

24. [Performance Tips](#24-performance-tips)
25. [Common Pitfalls and How to Avoid Them](#25-common-pitfalls-and-how-to-avoid-them)
26. [pandas and NumPy: Working Together](#26-pandas-and-numpy-working-together)

**Part X: Practical Examples for PIEZO1 Research**

27. [Working with ThunderSTORM Localisation Tables](#27-working-with-thunderstorm-localisation-tables)
28. [Single-Particle Tracking Analysis](#28-single-particle-tracking-analysis)
29. [Calcium Imaging Metadata and Batch Analysis](#29-calcium-imaging-metadata-and-batch-analysis)
30. [Publication-Ready Summary Tables](#30-publication-ready-summary-tables)

**Appendices**

31. [Quick Reference](#31-quick-reference)
32. [Resources for Learning pandas](#32-resources-for-learning-pandas)

---

## 1. Introduction: Why pandas?

### What is pandas?

pandas is an open-source Python library for working with **tabular data** --- data that lives naturally in rows and columns, like a spreadsheet or a database table. It was created by Wes McKinney in 2008 and has become an essential tool in data science and scientific research.

The name "pandas" is derived from "panel data", an econometrics term for multi-dimensional structured datasets. It is conventionally written in lowercase.

### Why do biologists need pandas?

As a researcher studying PIEZO1 mechanosensitive ion channels, you routinely work with data that is tabular:

| Data source | What the table looks like |
|---|---|
| **ThunderSTORM localisation tables** | Each row is a detected molecule with columns for x, y, sigma, intensity, frame, uncertainty |
| **Single-particle tracking exports** | Each row is a localisation linked to a trajectory ID, with columns for x, y, frame, track_id |
| **Calcium imaging measurements** | Each row is a cell or ROI with columns for condition, dF/F peak, rise time, decay time |
| **Experiment metadata** | Each row is a recording with columns for date, cell type, treatment, filename, notes |
| **Diffusion coefficients** | Each row is a trajectory with columns for D, path length, mobile/immobile, cell type |
| **Cell culture logs** | Each row is a passage or experiment with columns for date, passage number, confluency, notes |

All of these are CSV files, Excel sheets, or tab-delimited text files. pandas reads all of them with a single line of code.

### pandas vs. other tools

| Task | Excel | R | NumPy | pandas |
|---|---|---|---|---|
| Open a CSV | Click to open | `read.csv()` | `np.loadtxt()` | `pd.read_csv()` |
| Filter rows by condition | Manual filter | `subset()` or `dplyr::filter()` | Boolean indexing (no labels) | `df[df["condition"] == "treated"]` |
| Group and summarise | Pivot table | `aggregate()` or `dplyr::group_by()` | Manual with loops | `df.groupby("cell_type").mean()` |
| Merge two tables | VLOOKUP | `merge()` | No built-in support | `pd.merge(df1, df2, on="track_id")` |
| Handle missing values | Blank cells | `NA` system | `np.nan` (limited) | Full `NaN` system with `fillna()`, `dropna()` |
| Column labels | Column letters (A, B, C) | Column names | Integer indices only | Named columns (like a database) |

pandas combines the **labelled columns of a spreadsheet** with the **computational power of NumPy**. If you already know NumPy from the main Python manual, pandas adds a layer of labels, alignment, and convenience on top.

### How this manual relates to the Python manual

This manual is a companion to the *Python Manual for Biology Researchers*. It assumes you are familiar with:

- Python basics (variables, lists, dictionaries, loops, functions) --- Parts I-II of the Python manual
- NumPy arrays (the `.shape`, `.dtype`, indexing, and broadcasting concepts) --- Section 12
- matplotlib for plotting --- Section 14
- File I/O basics --- Section 16

If any of these are unfamiliar, work through the relevant sections of the Python manual first.

---

## 2. Installing and Importing pandas

### Installation

If you followed the Python manual's environment setup, pandas may already be installed:

```bash
# Check if pandas is available
python -c "import pandas; print('pandas:', pandas.__version__)"

# Install if needed (inside your conda environment)
conda activate microscopy
pip install pandas
```

### The standard import

```python
import pandas as pd
```

The alias `pd` is universal --- every tutorial, textbook, and Stack Overflow answer uses it. Always import pandas as `pd`.

### Typical imports for microscopy analysis

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tifffile
from pathlib import Path
```

---

## 3. Core Data Structures: Series and DataFrame

pandas has two core data structures:

| Structure | Analogy | Dimensions |
|---|---|---|
| **Series** | A single column in a spreadsheet | 1D --- values with an index |
| **DataFrame** | An entire spreadsheet or table | 2D --- rows and columns, each column is a Series |

### Series

A Series is a one-dimensional labelled array. Think of it as a single column of data with row labels (the **index**).

```python
import pandas as pd
import numpy as np

# Create from a list
intensities = pd.Series([1542.7, 1380.2, 1610.5, 1455.0])
print(intensities)
# 0    1542.7
# 1    1380.2
# 2    1610.5
# 3    1455.0
# dtype: float64

# Create with a custom index
intensities = pd.Series(
    [1542.7, 1380.2, 1610.5, 1455.0],
    index=["cell_1", "cell_2", "cell_3", "cell_4"],
    name="peak_intensity"
)
print(intensities["cell_3"])   # 1610.5

# Create from a dictionary
conditions = pd.Series({
    "cell_1": "control",
    "cell_2": "treated",
    "cell_3": "control",
    "cell_4": "treated",
})
```

### DataFrame

A DataFrame is a two-dimensional labelled table. Each column is a Series, and all columns share the same index.

```python
# Create from a dictionary of lists (most common)
df = pd.DataFrame({
    "cell":       ["cell_1", "cell_2", "cell_3", "cell_4"],
    "condition":  ["control", "treated", "control", "treated"],
    "peak_dff":   [0.45, 1.82, 0.51, 1.65],
    "rise_time":  [2.3, 1.1, 2.5, 1.2],
    "n_events":   [3, 8, 2, 7],
})
print(df)
#     cell condition  peak_dff  rise_time  n_events
# 0  cell_1   control      0.45        2.3         3
# 1  cell_2   treated      1.82        1.1         8
# 2  cell_3   control      0.51        2.5         2
# 3  cell_4   treated      1.65        1.2         7
```

```python
# Create from a NumPy array (with explicit column names)
data = np.random.rand(5, 3)
df = pd.DataFrame(data, columns=["x", "y", "intensity"])

# Create from a list of dictionaries (one dict per row)
rows = [
    {"cell": "cell_1", "D": 0.032, "mobile": True},
    {"cell": "cell_2", "D": 0.005, "mobile": False},
    {"cell": "cell_3", "D": 0.041, "mobile": True},
]
df = pd.DataFrame(rows)
```

### The relationship between DataFrame and Series

```python
# Each column of a DataFrame is a Series
peak_col = df["peak_dff"]
print(type(peak_col))   # <class 'pandas.core.series.Series'>

# Each row is also a Series (accessed via .loc or .iloc)
row_0 = df.iloc[0]
print(type(row_0))      # <class 'pandas.core.series.Series'>
```

---

## 4. Reading Data from Files

Loading data from files is the most common starting point. pandas can read dozens of file formats; here are the ones you will use most.

### CSV files

CSV (comma-separated values) is the most common format for tabular scientific data. ThunderSTORM exports CSVs, FLIKA exports CSVs, and most analysis tools produce CSVs.

```python
# Basic CSV read
df = pd.read_csv("localisations.csv")

# Tab-separated files (e.g., some ThunderSTORM exports)
df = pd.read_csv("data.tsv", sep="\t")

# Skip header lines (common in instrument output files)
df = pd.read_csv("data.csv", skiprows=3)

# Specify column names manually
df = pd.read_csv("data.csv", header=None,
                  names=["frame", "x", "y", "sigma", "intensity"])

# Read only certain columns (saves memory for large files)
df = pd.read_csv("localisations.csv",
                  usecols=["x [nm]", "y [nm]", "frame", "intensity [photon]"])

# Handle European-style decimals (comma as decimal separator)
df = pd.read_csv("data.csv", sep=";", decimal=",")
```

### ThunderSTORM CSV files

ThunderSTORM (the ImageJ/FIJI plugin for single-molecule localisation microscopy) exports localisation tables as CSV files with standardised column names.

```python
# Typical ThunderSTORM output
ts = pd.read_csv("thunderstorm_localisations.csv")
print(ts.columns.tolist())
# ['id', 'frame', 'x [nm]', 'y [nm]', 'sigma [nm]',
#  'intensity [photon]', 'offset [photon]', 'bkgstd [photon]',
#  'uncertainty [nm]']

print(ts.shape)    # (125430, 9) --- 125,430 localisations, 9 columns
print(ts.head())   # First 5 rows
```

### Excel files

```python
# Read an Excel file
df = pd.read_excel("experiment_log.xlsx")

# Read a specific sheet
df = pd.read_excel("experiment_log.xlsx", sheet_name="Sheet2")

# Read all sheets into a dictionary of DataFrames
all_sheets = pd.read_excel("experiment_log.xlsx", sheet_name=None)
for name, sheet_df in all_sheets.items():
    print(f"Sheet '{name}': {sheet_df.shape}")
```

**Note:** Reading Excel files requires the `openpyxl` package (`pip install openpyxl`).

### Other formats

```python
# Fixed-width text (some instrument outputs)
df = pd.read_fwf("data.txt")

# JSON
df = pd.read_json("data.json")

# Clipboard (useful for quick copy-paste from Excel)
df = pd.read_clipboard()

# Parquet (fast binary format, good for large datasets)
df = pd.read_parquet("data.parquet")

# HDF5 (hierarchical data, common in large scientific datasets)
df = pd.read_hdf("data.h5", key="localisations")
```

### Reading multiple files

A very common pattern in microscopy analysis is loading data from many files (one per field of view, cell, or condition) and combining them into a single DataFrame.

```python
from pathlib import Path

# Read all CSV files in a directory
data_dir = Path("thunderstorm_results")
csv_files = sorted(data_dir.glob("*.csv"))

dfs = []
for f in csv_files:
    temp = pd.read_csv(f)
    temp["source_file"] = f.stem       # Add a column to track origin
    dfs.append(temp)

combined = pd.concat(dfs, ignore_index=True)
print(f"Combined: {combined.shape[0]} localisations from {len(csv_files)} files")
```

---

## 5. Inspecting Your Data

After loading data, always inspect it before doing any analysis. These methods are your diagnostic toolkit.

### Shape and size

```python
df.shape          # (rows, columns) as a tuple
len(df)           # Number of rows
df.size           # Total number of elements (rows * columns)
df.columns        # Column names (as an Index object)
df.columns.tolist()  # Column names as a plain Python list
df.dtypes         # Data type of each column
```

### Viewing rows

```python
df.head()         # First 5 rows
df.head(10)       # First 10 rows
df.tail()         # Last 5 rows
df.sample(5)      # 5 random rows (useful for large DataFrames)
```

### Summary statistics

```python
df.describe()     # Count, mean, std, min, 25%, 50%, 75%, max for numeric columns
df.info()         # Column names, non-null counts, dtypes, memory usage
```

### Quick diagnostic function for DataFrames

This is the pandas equivalent of the `inspect()` function from the NumPy section of the Python manual:

```python
def inspect_df(df, name="DataFrame"):
    """Print a diagnostic summary of a DataFrame."""
    print(f"{name}:")
    print(f"  shape   : {df.shape[0]} rows x {df.shape[1]} columns")
    print(f"  columns : {df.columns.tolist()}")
    print(f"  dtypes  : {df.dtypes.value_counts().to_dict()}")
    print(f"  nulls   : {df.isnull().sum().sum()} total missing values")
    print(f"  memory  : {df.memory_usage(deep=True).sum() / 1e6:.1f} MB")

inspect_df(ts, "ThunderSTORM localisations")
```

### Unique values and value counts

```python
# How many unique values in a column?
df["condition"].nunique()        # 2

# What are the unique values?
df["condition"].unique()         # array(['control', 'treated'], dtype=object)

# Count occurrences of each value
df["condition"].value_counts()
# treated    2
# control    2
# Name: condition, dtype: int64
```

---

## 6. Data Types in pandas

Every column in a DataFrame has a data type (dtype). Getting the types right is important for correct calculations and memory efficiency.

### Common dtypes

| pandas dtype | Python equivalent | Used for | Example |
|---|---|---|---|
| `int64` | `int` | Integer data (frame numbers, counts, IDs) | `1, 42, 500` |
| `float64` | `float` | Decimal data (coordinates, intensities, D values) | `0.108, 1542.7` |
| `object` | `str` | Text data (filenames, conditions, labels) | `"control"`, `"cell_1"` |
| `bool` | `bool` | True/False (is_mobile, is_valid) | `True`, `False` |
| `datetime64` | `datetime` | Dates and times | `2025-03-15 14:30:00` |
| `category` | --- | Categorical labels (more memory-efficient than `object`) | `"control"`, `"treated"` |

### Checking and converting types

```python
# Check types
print(df.dtypes)

# Convert a column
df["frame"] = df["frame"].astype(int)
df["intensity"] = df["intensity"].astype(float)
df["condition"] = df["condition"].astype("category")

# Convert to numeric (handles text that should be numbers)
df["measurement"] = pd.to_numeric(df["measurement"], errors="coerce")
# errors="coerce" turns un-convertible values into NaN instead of raising an error
```

### Memory efficiency for large localisation tables

ThunderSTORM tables for a full TIRF experiment can contain millions of rows. Reducing dtype precision saves memory:

```python
# Default read: every float column is float64 (8 bytes per value)
ts = pd.read_csv("localisations.csv")
print(f"Memory: {ts.memory_usage(deep=True).sum() / 1e6:.1f} MB")

# Downcast to float32 (4 bytes --- plenty of precision for nm coordinates)
for col in ts.select_dtypes(include="float64").columns:
    ts[col] = ts[col].astype(np.float32)
print(f"Memory: {ts.memory_usage(deep=True).sum() / 1e6:.1f} MB")  # ~half
```

---

## 7. Selecting Columns and Rows

Selecting specific data from a DataFrame is the most common operation you will perform.

### Selecting columns

```python
# Single column (returns a Series)
x_coords = df["x [nm]"]

# Multiple columns (returns a DataFrame)
coords = df[["x [nm]", "y [nm]"]]

# Columns by pattern
intensity_cols = df.filter(like="intensity")   # All columns containing "intensity"
nm_cols = df.filter(regex=r"\[nm\]")           # All columns with "[nm]"
```

### Selecting rows by position: `.iloc`

`.iloc` uses **integer positions** (0-based), just like NumPy indexing.

```python
df.iloc[0]          # First row (returns a Series)
df.iloc[-1]         # Last row
df.iloc[0:5]        # First 5 rows (returns a DataFrame)
df.iloc[::100]      # Every 100th row

# Specific rows and columns by position
df.iloc[0:5, 0:3]         # First 5 rows, first 3 columns
df.iloc[:, 1]              # All rows, second column
```

### Selecting rows by label: `.loc`

`.loc` uses **labels** (the index values and column names).

```python
# If your index is the default (0, 1, 2, ...):
df.loc[0]                  # Row with index label 0
df.loc[0:4]                # Rows with labels 0 through 4 (inclusive!)

# Select specific columns by name
df.loc[:, "x [nm]"]                          # All rows, one column
df.loc[:, ["x [nm]", "y [nm]", "frame"]]     # All rows, three columns

# Combine row and column selection
df.loc[0:10, ["x [nm]", "y [nm]"]]
```

**Important:** `.loc` slicing is **inclusive** on both ends (`0:4` gives 5 rows). `.iloc` slicing is **exclusive** on the right end (`0:4` gives 4 rows), just like standard Python.

### `.loc` vs `.iloc` summary

| Method | Selects by | Slice end | Use when |
|---|---|---|---|
| `.iloc` | Integer position | Exclusive (Python-style) | You know the row/column number |
| `.loc` | Label/name | Inclusive (both ends) | You know the index value or column name |

---

## 8. Boolean Filtering

Boolean filtering is how you select rows that match a condition. This is the pandas equivalent of `np.where()` and NumPy boolean indexing.

### Basic filtering

```python
# Rows where condition is "treated"
treated = df[df["condition"] == "treated"]

# Rows where peak dF/F exceeds a threshold
strong = df[df["peak_dff"] > 1.0]

# Rows for a specific frame
frame_100 = ts[ts["frame"] == 100]
```

### Combining conditions

Use `&` (and), `|` (or), and `~` (not). **Parentheses are required** around each condition.

```python
# Treated cells with strong responses
strong_treated = df[(df["condition"] == "treated") & (df["peak_dff"] > 1.0)]

# Control OR peak > 1.5
subset = df[(df["condition"] == "control") | (df["peak_dff"] > 1.5)]

# NOT control
non_control = df[~(df["condition"] == "control")]

# Filter by multiple allowed values
selected = df[df["condition"].isin(["treated", "washout"])]
```

### Filtering ThunderSTORM localisations

```python
# Filter by uncertainty (quality control for SMLM data)
good_locs = ts[ts["uncertainty [nm]"] < 30]

# Filter by intensity and sigma
filtered = ts[
    (ts["intensity [photon]"] > 500) &
    (ts["sigma [nm]"] > 100) &
    (ts["sigma [nm]"] < 300)
]
print(f"Kept {len(filtered)} / {len(ts)} localisations "
      f"({100 * len(filtered) / len(ts):.1f}%)")
```

### String-based filtering

```python
# Filenames containing a specific substring
subset = df[df["filename"].str.contains("PIEZO1")]

# Case-insensitive search
subset = df[df["cell_type"].str.lower() == "ec"]
```

---

## 9. Working with the Index

The index is the set of row labels. By default it is `0, 1, 2, ...`, but you can set it to something meaningful.

### Setting and resetting the index

```python
# Set a column as the index
df = df.set_index("cell")
print(df.loc["cell_1"])       # Now you can look up by cell name

# Reset back to default integer index
df = df.reset_index()

# Set index during read
df = pd.read_csv("data.csv", index_col="cell")
```

### When to use a custom index

| Situation | Recommended index |
|---|---|
| General analysis | Default integer index (simplest) |
| Looking up cells by name | `set_index("cell")` |
| Time-series data | `set_index("timestamp")` |
| Merging on a shared key | Usually keep default and use `merge()` |

For most microscopy work, the default integer index is fine. Set a custom index when you need fast label-based lookups.

---

## 10. Adding and Modifying Columns

### Adding new columns

```python
# Add a column with a constant value
df["lab"] = "Pathak"

# Add a column computed from other columns
df["speed"] = df["distance_um"] / df["time_s"]

# Add a column with NumPy operations
df["log_intensity"] = np.log10(df["intensity [photon]"])

# Convert units: nm to um
ts["x [um]"] = ts["x [nm]"] / 1000
ts["y [um]"] = ts["y [nm]"] / 1000
```

### Conditional columns

```python
# Binary classification
df["mobile"] = df["path_length_um"] > 3.0
# This creates a boolean column: True/False

# Multi-category classification using np.select
conditions = [
    df["D"] < 0.01,
    df["D"] < 0.05,
    df["D"] >= 0.05,
]
labels = ["immobile", "slow", "fast"]
df["mobility_class"] = np.select(conditions, labels, default="unknown")
```

### The `.apply()` method

For more complex row-by-row calculations:

```python
# Apply a function to each value in a column
df["label"] = df["cell"].apply(lambda s: s.upper())

# Apply a function to each row (axis=1)
def classify_trajectory(row):
    if row["n_frames"] < 5:
        return "too_short"
    elif row["path_length_um"] > 3.0:
        return "mobile"
    else:
        return "immobile"

df["class"] = df.apply(classify_trajectory, axis=1)
```

**Performance note:** `.apply()` is slower than vectorised operations. Prefer NumPy-based column operations wherever possible, and reserve `.apply()` for complex logic that cannot be expressed with simple arithmetic or `np.select`.

### Dropping columns

```python
# Drop a single column
df = df.drop(columns="temp_column")

# Drop multiple columns
df = df.drop(columns=["temp1", "temp2", "debug_notes"])
```

---

## 11. Handling Missing Data

Missing data is represented in pandas by `NaN` (Not a Number) for numeric columns and `None` or `NaN` for object columns. Missing values are a fact of life in experimental data --- a cell may have died mid-recording, a localisation may lack a trajectory assignment, or a metadata field may be blank.

### Detecting missing values

```python
# Check for any missing values
df.isnull().sum()           # Count of NaNs per column
df.isnull().any()           # True/False per column
df.isnull().sum().sum()     # Total NaN count across entire DataFrame

# Check a specific column
df["rise_time"].isnull()    # Boolean Series: True where NaN
```

### Dropping missing data

```python
# Drop rows where ANY column is NaN
df_clean = df.dropna()

# Drop rows where a SPECIFIC column is NaN
df_clean = df.dropna(subset=["peak_dff"])

# Drop rows where ALL columns are NaN (blank rows)
df_clean = df.dropna(how="all")
```

### Filling missing data

```python
# Fill with a constant
df["notes"] = df["notes"].fillna("none")

# Fill with the column mean (common for missing measurements)
df["rise_time"] = df["rise_time"].fillna(df["rise_time"].mean())

# Forward fill (use previous value --- good for time series metadata)
df["temperature"] = df["temperature"].ffill()
```

---

## 12. Renaming, Replacing, and Retyping

### Renaming columns

ThunderSTORM and other tools often produce column names with spaces and units that are awkward to type. Rename them for convenience.

```python
# Rename specific columns
ts = ts.rename(columns={
    "x [nm]":               "x_nm",
    "y [nm]":               "y_nm",
    "sigma [nm]":           "sigma_nm",
    "intensity [photon]":   "intensity",
    "uncertainty [nm]":     "uncertainty_nm",
})

# Rename all columns at once (e.g., lowercase and replace spaces)
ts.columns = ts.columns.str.lower().str.replace(" ", "_").str.replace("[", "").str.replace("]", "")
```

### Replacing values

```python
# Replace specific values
df["condition"] = df["condition"].replace({"ctrl": "control", "trt": "treated"})

# Replace across the whole DataFrame
df = df.replace(-999, np.nan)   # Sentinel value to NaN
```

---

## 13. Sorting and Ranking

### Sorting

```python
# Sort by one column
df_sorted = df.sort_values("peak_dff", ascending=False)

# Sort by multiple columns
df_sorted = df.sort_values(["condition", "peak_dff"], ascending=[True, False])

# Sort ThunderSTORM data by frame then intensity
ts_sorted = ts.sort_values(["frame", "intensity [photon]"], ascending=[True, False])

# Sort and reset index
df_sorted = df.sort_values("peak_dff").reset_index(drop=True)
```

### Ranking

```python
# Rank cells by response strength
df["rank"] = df["peak_dff"].rank(ascending=False)

# Percentile rank (0.0 to 1.0)
df["percentile"] = df["peak_dff"].rank(pct=True)
```

---

## 14. Concatenating DataFrames

### Stacking rows (vertical concatenation)

This is the pattern for combining data from multiple files:

```python
# Combine DataFrames with the same columns
combined = pd.concat([df1, df2, df3], ignore_index=True)

# The multi-file loading pattern (from Section 4)
from pathlib import Path

dfs = []
for f in Path("data").glob("*.csv"):
    temp = pd.read_csv(f)
    temp["source"] = f.stem
    dfs.append(temp)

all_data = pd.concat(dfs, ignore_index=True)
```

### Stacking columns (horizontal concatenation)

```python
# Add new columns side-by-side
result = pd.concat([coords_df, intensity_df], axis=1)
```

**`ignore_index=True`:** Resets the index to `0, 1, 2, ...`. Without it, concatenated DataFrames retain their original indices, which can cause duplicate index values.

---

## 15. Merging and Joining

Merging combines two DataFrames by matching values in one or more **key columns**. This is the pandas equivalent of SQL `JOIN` or Excel `VLOOKUP`.

### Basic merge

```python
# DataFrame 1: trajectory measurements
trajectories = pd.DataFrame({
    "track_id":   [1, 2, 3, 4],
    "D":          [0.032, 0.005, 0.041, 0.003],
    "n_frames":   [50, 120, 35, 200],
})

# DataFrame 2: trajectory metadata
metadata = pd.DataFrame({
    "track_id":   [1, 2, 3, 4],
    "cell_type":  ["EC", "EC", "KC", "KC"],
    "treatment":  ["control", "treated", "control", "treated"],
})

# Merge on the shared key column
merged = pd.merge(trajectories, metadata, on="track_id")
print(merged)
#    track_id      D  n_frames cell_type treatment
# 0         1  0.032        50        EC   control
# 1         2  0.005       120        EC   treated
# 2         3  0.041        35        KC   control
# 3         4  0.003       200        KC   treated
```

### Merge types

| `how` | SQL equivalent | Keeps |
|---|---|---|
| `"inner"` (default) | INNER JOIN | Only rows with matching keys in **both** tables |
| `"left"` | LEFT JOIN | All rows from the left table; NaN where right has no match |
| `"right"` | RIGHT JOIN | All rows from the right table |
| `"outer"` | FULL OUTER JOIN | All rows from both tables; NaN where there is no match |

```python
# Keep all trajectories, even if no metadata exists
merged = pd.merge(trajectories, metadata, on="track_id", how="left")
```

### Merging on different column names

```python
# When the key column has different names in each DataFrame
merged = pd.merge(df1, df2, left_on="traj_id", right_on="trajectory_id")
```

### Practical example: adding cell type to ThunderSTORM localisations

```python
# localisations.csv has columns: id, frame, x, y, ..., source_file
# metadata.csv has columns: filename, cell_type, treatment, date

locs = pd.read_csv("localisations.csv")
meta = pd.read_csv("metadata.csv")

# Merge on the filename/source column
locs = pd.merge(locs, meta, left_on="source_file", right_on="filename", how="left")
# Now every localisation row carries its cell_type and treatment
```

---

## 16. Reshaping: Pivot, Melt, and Stack

### Wide to long format: `melt()`

"Long" format (one measurement per row) is usually best for analysis and plotting.

```python
# Wide format: one column per time point
wide = pd.DataFrame({
    "cell":    ["cell_1", "cell_2", "cell_3"],
    "t0":      [100, 120, 110],
    "t10":     [150, 180, 140],
    "t20":     [130, 200, 125],
})

# Melt to long format
long = wide.melt(
    id_vars="cell",
    value_vars=["t0", "t10", "t20"],
    var_name="timepoint",
    value_name="intensity"
)
print(long)
#     cell timepoint  intensity
# 0  cell_1        t0        100
# 1  cell_2        t0        120
# 2  cell_3        t0        110
# 3  cell_1       t10        150
# 4  cell_2       t10        180
# ...
```

### Long to wide format: `pivot()`

```python
# Convert back to wide format
wide_again = long.pivot(index="cell", columns="timepoint", values="intensity")
wide_again = wide_again.reset_index()
```

### When to use each format

| Format | Structure | Best for |
|---|---|---|
| **Wide** | One column per time point or condition | Viewing in Excel, quick visual comparison |
| **Long** | One measurement per row | Grouping, filtering, plotting with seaborn, statistical tests |

Most pandas operations (especially `groupby` and plotting) work best with long format.

---

## 17. GroupBy: Split-Apply-Combine

`groupby()` is one of the most powerful features in pandas. It splits a DataFrame into groups, applies a function to each group, and combines the results.

### Basic groupby

```python
# Mean of all numeric columns, grouped by condition
df.groupby("condition").mean(numeric_only=True)

# Specific column and specific function
df.groupby("condition")["peak_dff"].mean()

# Multiple aggregation functions
df.groupby("condition")["peak_dff"].agg(["mean", "std", "count"])
```

### Grouping by multiple columns

```python
# Group by cell type AND treatment
summary = df.groupby(["cell_type", "treatment"])["D"].agg(["mean", "std", "count"])
print(summary)
#                        mean       std  count
# cell_type treatment
# EC        control    0.032     0.005      15
#           treated    0.008     0.003      12
# KC        control    0.041     0.008      18
#           treated    0.011     0.004      14
```

### Custom aggregation

```python
# Multiple different aggregations on different columns
summary = df.groupby("condition").agg(
    mean_dff=("peak_dff", "mean"),
    std_dff=("peak_dff", "std"),
    n_cells=("cell", "count"),
    median_rise=("rise_time", "median"),
)
```

### GroupBy for PIEZO1 trajectory analysis

```python
# Compute per-trajectory statistics from a localisation table
traj_stats = locs.groupby("track_id").agg(
    n_frames=("frame", "count"),
    first_frame=("frame", "min"),
    last_frame=("frame", "max"),
    mean_x=("x_nm", "mean"),
    mean_y=("y_nm", "mean"),
    mean_intensity=("intensity", "mean"),
)
print(f"Statistics for {len(traj_stats)} trajectories")
```

### Transform: same shape as input

`transform()` returns a result with the same index as the input, so you can add group-level statistics back as columns.

```python
# Add group mean as a new column (for each row, the mean of its group)
df["group_mean_dff"] = df.groupby("condition")["peak_dff"].transform("mean")

# Normalise within each group
df["dff_zscore"] = df.groupby("condition")["peak_dff"].transform(
    lambda x: (x - x.mean()) / x.std()
)
```

---

## 18. Pivot Tables and Cross-Tabulations

### Pivot tables

`pivot_table()` is a higher-level interface for groupby + reshape, similar to Excel's Pivot Table.

```python
# Average diffusion coefficient by cell type and treatment
pt = df.pivot_table(
    values="D",
    index="cell_type",
    columns="treatment",
    aggfunc="mean"
)
print(pt)
# treatment    control   treated
# cell_type
# EC            0.032     0.008
# KC            0.041     0.011
# NSC           0.028     0.007
```

```python
# Multiple aggregations
pt = df.pivot_table(
    values="D",
    index="cell_type",
    columns="treatment",
    aggfunc=["mean", "std", "count"]
)
```

### Cross-tabulations

Count the frequency of combinations:

```python
# How many trajectories in each cell_type x mobility_class combination?
ct = pd.crosstab(df["cell_type"], df["mobility_class"])
print(ct)
# mobility_class  immobile  mobile  slow
# cell_type
# EC                   45      30    15
# KC                   38      42    20
# NSC                  50      25    12
```

---

## 19. String Methods

pandas provides vectorised string methods via the `.str` accessor. These are essential when cleaning filenames, parsing condition labels, or extracting information from text columns.

### Common string operations

```python
# Convert case
df["cell_type"] = df["cell_type"].str.upper()
df["condition"] = df["condition"].str.lower()

# Strip whitespace (very common in data from Excel)
df["notes"] = df["notes"].str.strip()

# Check for substrings
mask = df["filename"].str.contains("PIEZO1")
mask = df["filename"].str.startswith("exp_")
mask = df["filename"].str.endswith(".tif")

# Split strings
df["date"] = df["filename"].str.split("_").str[0]

# Replace substrings
df["label"] = df["label"].str.replace("GFP", "HaloTag")
```

### Extracting information from filenames

Microscopy filenames often encode metadata:

```python
# Filename like: "20250315_PIEZO1_EC_treated_FOV3.tif"
df["date"]      = df["filename"].str.split("_").str[0]
df["protein"]   = df["filename"].str.split("_").str[1]
df["cell_type"] = df["filename"].str.split("_").str[2]
df["treatment"] = df["filename"].str.split("_").str[3]
df["fov"]       = df["filename"].str.extract(r"(FOV\d+)")
```

---

## 20. Date and Time Data

### Parsing dates

```python
# Convert a string column to datetime
df["date"] = pd.to_datetime(df["date"])

# Specify the format (faster and unambiguous)
df["date"] = pd.to_datetime(df["date"], format="%Y%m%d")

# Common date formats in lab data
# "2025-03-15"     -> format="%Y-%m-%d"
# "15/03/2025"     -> format="%d/%m/%Y"
# "20250315"       -> format="%Y%m%d"
# "Mar 15, 2025"   -> format="%b %d, %Y"
```

### Extracting date components

```python
df["year"]  = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"]   = df["date"].dt.day
df["weekday_name"] = df["date"].dt.day_name()
```

### Time differences

```python
# Days between experiments
df["days_since_plating"] = (df["imaging_date"] - df["plating_date"]).dt.days
```

---

## 21. Descriptive Statistics

### Per-column statistics

```python
df["peak_dff"].mean()       # Mean
df["peak_dff"].median()     # Median
df["peak_dff"].std()        # Standard deviation
df["peak_dff"].sem()        # Standard error of the mean
df["peak_dff"].min()        # Minimum
df["peak_dff"].max()        # Maximum
df["peak_dff"].quantile(0.25)  # 25th percentile
df["peak_dff"].quantile([0.25, 0.5, 0.75])  # Multiple quantiles
```

### Descriptive summary

```python
# All numeric columns at once
df.describe()

# Include percentiles relevant to your analysis
df.describe(percentiles=[0.05, 0.25, 0.5, 0.75, 0.95])

# For non-numeric columns
df.describe(include="object")
# Shows count, unique, top (most frequent), freq (count of the most frequent)
```

### Correlation

```python
# Pairwise correlation between all numeric columns
corr = df[["peak_dff", "rise_time", "n_events", "D"]].corr()
print(corr)
```

---

## 22. Plotting with pandas

pandas has built-in plotting methods that call matplotlib underneath. They are convenient for quick exploration.

### Basic plots from a DataFrame

```python
# Histogram of diffusion coefficients
df["D"].plot.hist(bins=30, edgecolor="white", alpha=0.8)
plt.xlabel("D (um²/s)")
plt.title("Diffusion Coefficient Distribution")
plt.tight_layout()
plt.show()

# Box plot by condition
df.boxplot(column="peak_dff", by="condition", figsize=(6, 4))
plt.suptitle("")   # Remove the automatic pandas title
plt.ylabel("Peak dF/F")
plt.tight_layout()
plt.show()

# Scatter plot
df.plot.scatter(x="rise_time", y="peak_dff", alpha=0.6)
plt.xlabel("Rise Time (s)")
plt.ylabel("Peak dF/F")
plt.tight_layout()
plt.show()
```

### Plotting grouped data

```python
# Histogram per group
df.groupby("condition")["D"].plot.hist(alpha=0.5, legend=True, bins=20)
plt.xlabel("D (um²/s)")
plt.show()

# Bar chart of group means with error bars
summary = df.groupby("condition")["peak_dff"].agg(["mean", "sem"])
summary["mean"].plot.bar(yerr=summary["sem"], capsize=4, color="steelblue",
                         edgecolor="black")
plt.ylabel("Peak dF/F (mean ± SEM)")
plt.tight_layout()
plt.show()
```

### When to use pandas plotting vs. matplotlib directly

| Use pandas `.plot` | Use matplotlib directly |
|---|---|
| Quick exploratory plots | Publication-quality figures |
| One-liners during analysis | Multi-panel layouts |
| Prototyping before polishing | Full control over every element |

For publication figures, the matplotlib techniques from Section 14 of the Python manual give you full control. Use pandas `.plot` for rapid exploration during analysis.

---

## 23. Saving and Exporting Data

### CSV (most common)

```python
# Save to CSV
df.to_csv("results.csv", index=False)

# Save with specific options
df.to_csv("results.csv", index=False, float_format="%.4f")

# Save a subset
df[df["condition"] == "treated"].to_csv("treated_only.csv", index=False)
```

**`index=False`:** Almost always include this. Without it, pandas writes the index as an extra unnamed column, which causes confusion when reloading.

### Excel

```python
# Save to Excel
df.to_excel("results.xlsx", index=False, sheet_name="Summary")

# Save multiple DataFrames to different sheets
with pd.ExcelWriter("experiment_results.xlsx") as writer:
    summary.to_excel(writer, sheet_name="Summary", index=False)
    raw_data.to_excel(writer, sheet_name="Raw Data", index=False)
    metadata.to_excel(writer, sheet_name="Metadata", index=False)
```

### Other formats

```python
# Tab-separated (for some bioinformatics tools)
df.to_csv("results.tsv", sep="\t", index=False)

# Parquet (fast, compressed --- good for large datasets)
df.to_parquet("results.parquet", index=False)

# LaTeX table (for papers)
print(df.to_latex(index=False, float_format="%.3f"))

# Clipboard (paste into Excel or Google Sheets)
df.to_clipboard(index=False)

# Markdown table
print(df.to_markdown(index=False))
```

---

## 24. Performance Tips

### Vectorised operations vs. loops

The single most important performance rule in pandas is the same as in NumPy: **avoid row-by-row loops**. Use vectorised operations instead.

```python
# SLOW: iterating row by row
for i, row in df.iterrows():
    df.at[i, "speed"] = row["distance"] / row["time"]

# FAST: vectorised column operation
df["speed"] = df["distance"] / df["time"]
```

### Method chaining

Method chaining is a clean, readable way to perform multiple operations in sequence:

```python
result = (
    ts
    .rename(columns={"x [nm]": "x_nm", "y [nm]": "y_nm"})
    .query("uncertainty_nm < 30")
    .assign(x_um=lambda d: d["x_nm"] / 1000,
            y_um=lambda d: d["y_nm"] / 1000)
    .sort_values("frame")
    .reset_index(drop=True)
)
```

### Memory management for large datasets

```python
# Read only the columns you need
ts = pd.read_csv("big_file.csv", usecols=["frame", "x [nm]", "y [nm]"])

# Read in chunks for files that do not fit in memory
chunks = pd.read_csv("huge_file.csv", chunksize=100000)
results = []
for chunk in chunks:
    filtered = chunk[chunk["intensity [photon]"] > 500]
    results.append(filtered)
result = pd.concat(results, ignore_index=True)

# Downcast numeric types
df["frame"] = df["frame"].astype(np.int32)
df["x_nm"]  = df["x_nm"].astype(np.float32)
```

---

## 25. Common Pitfalls and How to Avoid Them

### SettingWithCopyWarning

This is the most common pandas warning for newcomers. It occurs when you try to modify a slice of a DataFrame.

```python
# WARNING: may not modify the original DataFrame
subset = df[df["condition"] == "treated"]
subset["normalised"] = subset["peak_dff"] / subset["peak_dff"].max()
# SettingWithCopyWarning!

# FIX: use .copy() to make an explicit copy
subset = df[df["condition"] == "treated"].copy()
subset["normalised"] = subset["peak_dff"] / subset["peak_dff"].max()
# No warning --- you are clearly modifying the copy

# FIX (alternative): use .loc on the original DataFrame
df.loc[df["condition"] == "treated", "normalised"] = (
    df.loc[df["condition"] == "treated", "peak_dff"]
    / df.loc[df["condition"] == "treated", "peak_dff"].max()
)
```

### Forgetting `ignore_index=True` in `concat`

```python
# Without ignore_index: duplicate index values (0, 1, 2, 0, 1, 2)
combined = pd.concat([df1, df2])

# With ignore_index: clean sequential index (0, 1, 2, 3, 4, 5)
combined = pd.concat([df1, df2], ignore_index=True)
```

### Forgetting `index=False` in `to_csv()`

```python
# Without index=False: adds an "Unnamed: 0" column when reloaded
df.to_csv("results.csv")
reloaded = pd.read_csv("results.csv")   # Has an extra "Unnamed: 0" column!

# With index=False: clean output
df.to_csv("results.csv", index=False)
```

### Comparing with `NaN`

```python
# WRONG: NaN != NaN in Python (this is always True for NaN values)
df[df["value"] != np.nan]   # Does NOT filter out NaNs!

# CORRECT: use .isna() and .notna()
df[df["value"].notna()]     # Rows where value is not NaN
```

### Modifying while iterating

```python
# WRONG: modifying a DataFrame while iterating over it
for i, row in df.iterrows():
    df.at[i, "result"] = compute(row)

# BETTER: use vectorised operations, .apply(), or build a list
results = []
for i, row in df.iterrows():
    results.append(compute(row))
df["result"] = results

# BEST: use vectorised operations if possible
df["result"] = compute_vectorised(df)
```

---

## 26. pandas and NumPy: Working Together

pandas is built on top of NumPy. Understanding how they interact will make your analysis workflow smoother.

### Converting between pandas and NumPy

```python
# DataFrame or Series to NumPy array
array = df["x_nm"].to_numpy()
# or equivalently:
array = df["x_nm"].values

# Multiple columns to a 2D NumPy array
xy = df[["x_nm", "y_nm"]].to_numpy()
print(xy.shape)   # (N, 2) --- ready for MSD calculation

# NumPy array to DataFrame
df = pd.DataFrame(xy, columns=["x", "y"])

# NumPy array to Series
s = pd.Series(array, name="x_nm")
```

### Using NumPy functions on pandas objects

Most NumPy functions work directly on pandas Series and DataFrames:

```python
np.mean(df["intensity"])
np.log10(df["D"])
np.sqrt(df["msd"])
np.histogram(df["D"].dropna(), bins=30)
```

### The typical workflow

In practice, you use pandas for **loading, cleaning, filtering, and grouping** tabular data, and NumPy for **numerical computation** on the extracted arrays.

```python
# 1. Load and filter with pandas
ts = pd.read_csv("localisations.csv")
ts = ts[ts["uncertainty [nm]"] < 30].copy()

# 2. Extract arrays with NumPy for computation
xy = ts[["x [nm]", "y [nm]"]].to_numpy() / 1000   # Convert nm to um

# 3. Compute with NumPy (e.g., MSD)
lags, msd = compute_msd(xy, dt=0.01)

# 4. Store results back in pandas for grouping and export
results_df = pd.DataFrame({"lag_s": lags, "msd_um2": msd})
results_df.to_csv("msd_results.csv", index=False)
```

---

## 27. Working with ThunderSTORM Localisation Tables

ThunderSTORM exports localisation results as CSV files. These tables are the starting point for all SMLM analysis of PIEZO1-HaloTag data.

### Loading and inspecting

```python
import pandas as pd
import numpy as np

ts = pd.read_csv("thunderstorm_localisations.csv")
inspect_df(ts, "ThunderSTORM")

# Typical output:
# ThunderSTORM:
#   shape   : 125430 rows x 9 columns
#   columns : ['id', 'frame', 'x [nm]', 'y [nm]', 'sigma [nm]',
#              'intensity [photon]', 'offset [photon]',
#              'bkgstd [photon]', 'uncertainty [nm]']
```

### Cleaning and renaming

```python
# Rename for convenience
ts = ts.rename(columns={
    "x [nm]":             "x_nm",
    "y [nm]":             "y_nm",
    "sigma [nm]":         "sigma_nm",
    "intensity [photon]": "intensity",
    "offset [photon]":    "offset",
    "bkgstd [photon]":    "bkgstd",
    "uncertainty [nm]":   "uncertainty_nm",
})
```

### Quality-control filtering

```python
# Remove poor-quality localisations
before = len(ts)
ts_clean = ts[
    (ts["uncertainty_nm"] < 30) &
    (ts["sigma_nm"] > 80) &
    (ts["sigma_nm"] < 300) &
    (ts["intensity"] > 300)
].copy()
after = len(ts_clean)
print(f"Filtering: {before} -> {after} localisations ({100*after/before:.1f}% retained)")
```

### Per-frame statistics

```python
# How many localisations per frame?
per_frame = ts_clean.groupby("frame").agg(
    n_locs=("id", "count"),
    mean_intensity=("intensity", "mean"),
    mean_uncertainty=("uncertainty_nm", "mean"),
)
print(per_frame.head(10))

# Plot localisations per frame (detect bleaching or drift)
per_frame["n_locs"].plot(figsize=(10, 3), title="Localisations per Frame")
plt.xlabel("Frame")
plt.ylabel("Count")
plt.tight_layout()
plt.show()
```

### Converting to physical units

```python
# Add micrometer columns (pixel size ~108 nm for PIEZO1-HaloTag TIRF)
ts_clean["x_um"] = ts_clean["x_nm"] / 1000
ts_clean["y_um"] = ts_clean["y_nm"] / 1000
```

---

## 28. Single-Particle Tracking Analysis

After localisations have been linked into trajectories (e.g., via FLIKA or trackpy), the tracking data typically has a `track_id` column that groups localisations into individual particle trajectories.

### Computing per-trajectory statistics

```python
tracks = pd.read_csv("linked_trajectories.csv")

# Per-trajectory summary
traj_stats = tracks.groupby("track_id").agg(
    n_frames=("frame", "count"),
    duration_frames=("frame", lambda x: x.max() - x.min()),
    first_frame=("frame", "min"),
    last_frame=("frame", "max"),
    mean_x_um=("x_um", "mean"),
    mean_y_um=("y_um", "mean"),
    mean_intensity=("intensity", "mean"),
).reset_index()

# Filter: keep only trajectories with enough frames
min_frames = 10
traj_stats = traj_stats[traj_stats["n_frames"] >= min_frames].copy()
print(f"{len(traj_stats)} trajectories with >= {min_frames} frames")
```

### Path length and mobility classification

Following the approach in Bertaccini et al. 2025, PIEZO1-HaloTag trajectories were classified as mobile or immobile based on a path-length cutoff of 3 µm over a 5-second window.

```python
def compute_path_length(group):
    """Compute total path length in um for a single trajectory."""
    xy = group[["x_um", "y_um"]].to_numpy()
    steps = np.diff(xy, axis=0)
    return np.sum(np.sqrt(np.sum(steps**2, axis=1)))

# Apply to each trajectory
traj_stats["path_length_um"] = tracks.groupby("track_id").apply(
    compute_path_length
).values

# Classify mobility (3 um cutoff from Bertaccini et al.)
traj_stats["mobile"] = traj_stats["path_length_um"] > 3.0

# Summary
print(traj_stats["mobile"].value_counts())
print(f"Mobile fraction: {traj_stats['mobile'].mean():.1%}")
```

### Diffusion coefficient per trajectory

```python
def fit_D_from_trajectory(group, dt, fit_points=4):
    """Fit diffusion coefficient from a single trajectory's MSD."""
    xy = group[["x_um", "y_um"]].to_numpy()
    n = len(xy)
    if n < fit_points + 1:
        return np.nan
    max_lag = min(n // 4, 20)
    if max_lag < fit_points:
        return np.nan
    msd = np.zeros(max_lag)
    for lag in range(1, max_lag + 1):
        displacements = xy[lag:] - xy[:-lag]
        sq_disp = np.sum(displacements**2, axis=1)
        msd[lag - 1] = np.mean(sq_disp)
    lags = np.arange(1, max_lag + 1) * dt
    slope, _ = np.polyfit(lags[:fit_points], msd[:fit_points], 1)
    return slope / 4.0    # D = slope / (2 * n_dim) for 2D

fps = 100.0
dt = 1.0 / fps

traj_stats["D_um2s"] = tracks.groupby("track_id").apply(
    lambda g: fit_D_from_trajectory(g, dt)
).values

# Summary by mobility class
print(traj_stats.groupby("mobile")["D_um2s"].describe())
```

### Adding metadata and exporting

```python
# Merge with experimental metadata
meta = pd.read_csv("experiment_metadata.csv")
traj_stats = pd.merge(traj_stats, meta, on="source_file", how="left")

# Export for statistical analysis
traj_stats.to_csv("trajectory_statistics.csv", index=False)
```

---

## 29. Calcium Imaging Metadata and Batch Analysis

### Organising experiment metadata

```python
# Build an experiment log DataFrame
experiments = pd.DataFrame({
    "date":       ["2025-03-10", "2025-03-10", "2025-03-12", "2025-03-12"],
    "cell_type":  ["EC", "EC", "KC", "KC"],
    "treatment":  ["control", "Yoda1_5uM", "control", "Yoda1_5uM"],
    "filename":   ["exp001.tif", "exp002.tif", "exp003.tif", "exp004.tif"],
    "n_cells":    [12, 15, 8, 10],
    "passage":    [5, 5, 3, 3],
})
experiments["date"] = pd.to_datetime(experiments["date"])
```

### Batch processing results

```python
# Assume you have run calcium trace analysis on all files
# and saved per-cell results as CSVs
from pathlib import Path

results = []
for _, exp in experiments.iterrows():
    result_file = Path("results") / f"{Path(exp['filename']).stem}_cells.csv"
    if result_file.exists():
        cells = pd.read_csv(result_file)
        cells["filename"] = exp["filename"]
        results.append(cells)

all_cells = pd.concat(results, ignore_index=True)

# Merge with experiment metadata
all_cells = pd.merge(all_cells, experiments, on="filename", how="left")
```

### Summarising by condition

```python
# Summary statistics per condition
summary = all_cells.groupby(["cell_type", "treatment"]).agg(
    n_cells=("peak_dff", "count"),
    mean_peak_dff=("peak_dff", "mean"),
    sem_peak_dff=("peak_dff", "sem"),
    mean_rise_time=("rise_time_s", "mean"),
    sem_rise_time=("rise_time_s", "sem"),
    responder_fraction=("responded", "mean"),    # If "responded" is boolean
).reset_index()

print(summary.to_markdown(index=False, floatfmt=".3f"))
```

---

## 30. Publication-Ready Summary Tables

### Formatted summary tables

```python
# Create a publication-style summary
pub_table = all_cells.groupby(["cell_type", "treatment"]).apply(
    lambda g: pd.Series({
        "n":              len(g),
        "Peak dF/F":      f"{g['peak_dff'].mean():.2f} ± {g['peak_dff'].sem():.2f}",
        "Rise time (s)":  f"{g['rise_time_s'].mean():.1f} ± {g['rise_time_s'].sem():.1f}",
        "Responders (%)": f"{100 * g['responded'].mean():.0f}",
    })
).reset_index()

print(pub_table.to_markdown(index=False))
```

### Exporting for journals

```python
# To LaTeX (for direct inclusion in a paper)
latex = pub_table.to_latex(index=False, escape=False, column_format="llcccc")
with open("table1.tex", "w") as f:
    f.write(latex)

# To Excel with formatting
pub_table.to_excel("Table1.xlsx", index=False, sheet_name="Summary")

# To CSV for supplementary data
all_cells.to_csv("Supplementary_Table_S1.csv", index=False)
```

---

## 31. Quick Reference

### Essential imports

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

### Loading data

```python
df = pd.read_csv("data.csv")                # CSV
df = pd.read_csv("data.tsv", sep="\t")      # Tab-separated
df = pd.read_excel("data.xlsx")             # Excel
df = pd.read_csv("data.csv", usecols=["x", "y"])  # Specific columns only
```

### Inspecting

```python
df.shape              # (rows, cols)
df.head()             # First 5 rows
df.dtypes             # Column types
df.describe()         # Summary statistics
df.info()             # Column info and memory usage
df.columns.tolist()   # Column names as a list
```

### Selecting

```python
df["col"]                            # Single column (Series)
df[["col1", "col2"]]                 # Multiple columns (DataFrame)
df.iloc[0]                           # First row by position
df.iloc[0:5]                         # First 5 rows by position
df.loc[0:4, ["col1", "col2"]]       # Rows 0-4, specific columns by label
```

### Filtering

```python
df[df["col"] > value]                              # By condition
df[(df["A"] > 1) & (df["B"] == "x")]               # Multiple conditions
df[df["col"].isin(["a", "b"])]                      # By set membership
df[df["col"].str.contains("pattern")]               # By string match
```

### Modifying

```python
df["new_col"] = df["A"] / df["B"]                  # New column from calculation
df["label"] = np.where(df["x"] > 0, "pos", "neg")  # Conditional column
df = df.rename(columns={"old": "new"})             # Rename columns
df = df.drop(columns=["temp"])                     # Drop columns
df = df.dropna(subset=["col"])                     # Drop rows with NaN
df = df.sort_values("col")                         # Sort
```

### Grouping

```python
df.groupby("group")["val"].mean()                  # Group mean
df.groupby("group")["val"].agg(["mean", "std", "count"])  # Multiple stats
df.groupby(["g1", "g2"]).agg(m=("val", "mean"), n=("val", "count"))  # Named agg
```

### Combining

```python
pd.concat([df1, df2], ignore_index=True)           # Stack rows
pd.merge(df1, df2, on="key")                       # Join on a key column
pd.merge(df1, df2, left_on="a", right_on="b")      # Different key names
```

### Saving

```python
df.to_csv("out.csv", index=False)                  # CSV
df.to_excel("out.xlsx", index=False)               # Excel
df.to_csv("out.tsv", sep="\t", index=False)        # Tab-separated
```

### Common patterns

```python
# Load multiple files
dfs = [pd.read_csv(f) for f in Path("dir").glob("*.csv")]
combined = pd.concat(dfs, ignore_index=True)

# Group, summarise, and export
summary = df.groupby("condition")["measurement"].agg(["mean", "sem"]).reset_index()
summary.to_csv("summary.csv", index=False)

# pandas to NumPy and back
array = df[["x", "y"]].to_numpy()
df_new = pd.DataFrame(array, columns=["x", "y"])
```

---

## 32. Resources for Learning pandas

### Official resources

| Resource | Description | Cost |
|---|---|---|
| **pandas documentation** (pandas.pydata.org/docs/) | Comprehensive official docs with a "Getting Started" tutorial, user guide, and full API reference | Free |
| **10 Minutes to pandas** (pandas.pydata.org/docs/user_guide/10min.html) | Official quick-start tutorial covering the essentials | Free |

### Books

| Book | Author | Best for |
|---|---|---|
| **Python for Data Analysis** | Wes McKinney | The definitive pandas book, written by the creator of pandas. Covers NumPy, pandas, and matplotlib in depth. |
| **Python Data Science Handbook** | Jake VanderPlas | Comprehensive coverage of pandas alongside NumPy and matplotlib. Free online at jakevdp.github.io/PythonDataScienceHandbook/ |
| **Pandas Cookbook** | Matt Harrison, Theodore Petrou | Practical recipes for common pandas tasks, organised by difficulty |

### Online tutorials

| Resource | Description | Cost |
|---|---|---|
| **Kaggle Learn: Pandas** (kaggle.com/learn/pandas) | Short, interactive micro-course with hands-on exercises | Free |
| **Real Python: pandas Tutorials** (realpython.com/pandas-python-explore-dataset/) | High-quality articles on specific pandas topics | Free articles; paid membership for full access |
| **Corey Schafer: pandas Tutorials** (YouTube) | Clear, well-paced video tutorials on pandas fundamentals | Free |

### Cheat sheets

| Resource | Description |
|---|---|
| **pandas Cheat Sheet** (pandas.pydata.org/Pandas_Cheat_Sheet.pdf) | Official two-page PDF covering the most common operations |
| **DataCamp pandas Cheat Sheet** | Visual quick-reference card |

### Getting help

| Resource | When to use it |
|---|---|
| **Stack Overflow** (stackoverflow.com/questions/tagged/pandas) | Search for specific "how do I..." questions. The pandas tag has hundreds of thousands of answered questions. |
| **pandas GitHub Issues** (github.com/pandas-dev/pandas/issues) | Report bugs or check known issues |
| **AI assistants (Claude, etc.)** | Paste your DataFrame structure and error message for instant, personalised help. See Section 31 of the Python manual. |

### Recommended learning path

1. **Day 1:** Read Sections 1--5 of this manual. Load one of your own CSV files and explore it with `head()`, `describe()`, `info()`.
2. **Week 1:** Work through Sections 6--13. Practice filtering, adding columns, and sorting on your real data.
3. **Week 2:** Read Sections 14--18 (combining, grouping). Apply `groupby` to summarise your experimental data by condition.
4. **Week 3:** Read Sections 27--30. Apply the ThunderSTORM and tracking workflows to your actual PIEZO1 data.
5. **Ongoing:** Use the Quick Reference (Section 31) as a daily cheat sheet. Refer to *Python for Data Analysis* by Wes McKinney for deeper understanding.

---

*This manual was developed as a companion to the Python Manual for Biology Researchers, for the PIEZO1 research group. It supports graduate students and scientists in using pandas for tabular data analysis in microscopy and biophysics research. For questions or suggestions, contact george.dickinson@gmail.com.*
