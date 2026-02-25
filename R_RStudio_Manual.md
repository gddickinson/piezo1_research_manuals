# R and RStudio Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why R?](#1-introduction-why-r)
2. [Installing R and RStudio](#2-installing-r-and-rstudio)
3. [The RStudio Interface](#3-the-rstudio-interface)
4. [Installing and Loading Packages](#4-installing-and-loading-packages)

**Part II: R Fundamentals**

5. [Variables and Data Types](#5-variables-and-data-types)
6. [Vectors: R's Fundamental Data Structure](#6-vectors-rs-fundamental-data-structure)
7. [Factors, Lists, and Matrices](#7-factors-lists-and-matrices)
8. [Data Frames and Tibbles](#8-data-frames-and-tibbles)
9. [Control Flow: if, for, while, apply](#9-control-flow-if-for-while-apply)
10. [Writing Functions](#10-writing-functions)
11. [The Pipe Operator and Tidy Workflows](#11-the-pipe-operator-and-tidy-workflows)

**Part III: Data Wrangling with the Tidyverse**

12. [Reading and Writing Data](#12-reading-and-writing-data)
13. [dplyr: Filtering, Selecting, Mutating, and Summarising](#13-dplyr-filtering-selecting-mutating-and-summarising)
    - [Research Example: Single-Molecule Tracking Data Wrangling](#research-example-single-molecule-tracking-data-wrangling)
14. [tidyr: Reshaping Data (Pivoting, Nesting, Separating)](#14-tidyr-reshaping-data-pivoting-nesting-separating)
15. [Working with Strings (stringr) and Dates (lubridate)](#15-working-with-strings-stringr-and-dates-lubridate)

**Part IV: Visualisation with ggplot2**

16. [The Grammar of Graphics](#16-the-grammar-of-graphics)
17. [Common Plot Types for Biology](#17-common-plot-types-for-biology)
    - [Research Example: Single-Molecule Imaging Figures](#research-example-single-molecule-imaging-figures)
18. [Customising Themes, Colours, and Fonts](#18-customising-themes-colours-and-fonts)
19. [Multi-Panel Figures with patchwork and facets](#19-multi-panel-figures-with-patchwork-and-facets)
20. [Saving Publication-Quality Figures](#20-saving-publication-quality-figures)

**Part V: Statistics**

21. [Descriptive Statistics and Exploratory Analysis](#21-descriptive-statistics-and-exploratory-analysis)
22. [t-Tests and Paired Comparisons](#22-t-tests-and-paired-comparisons)
    - [Research Example: Comparing PIEZO1 Puncta Density Across Conditions](#research-example-comparing-piezo1-puncta-density-across-conditions)
23. [ANOVA and Post-Hoc Tests](#23-anova-and-post-hoc-tests)
24. [Non-Parametric Tests](#24-non-parametric-tests)
    - [Research Example: Distribution Comparisons for Diffusion Data](#research-example-distribution-comparisons-for-diffusion-data)
25. [Correlation and Linear Regression](#25-correlation-and-linear-regression)
26. [Nonlinear Curve Fitting](#26-nonlinear-curve-fitting)
27. [Mixed-Effects Models](#27-mixed-effects-models)
28. [Multiple Testing Correction](#28-multiple-testing-correction)
29. [Power Analysis and Sample Size](#29-power-analysis-and-sample-size)

**Part VI: Bioinformatics with Bioconductor**

30. [Introduction to Bioconductor](#30-introduction-to-bioconductor)
31. [Working with Genomic Data Structures](#31-working-with-genomic-data-structures)
32. [RNA-Seq Differential Expression with DESeq2](#32-rna-seq-differential-expression-with-deseq2)
33. [RNA-Seq Differential Expression with edgeR and limma](#33-rna-seq-differential-expression-with-edger-and-limma)
34. [Gene Set Enrichment and Pathway Analysis](#34-gene-set-enrichment-and-pathway-analysis)
35. [Visualising Genomic Data (Volcano Plots, Heatmaps, MA Plots)](#35-visualising-genomic-data-volcano-plots-heatmaps-ma-plots)

**Part VII: Image Analysis in R**

36. [Image Analysis with EBImage and imager](#36-image-analysis-with-ebimage-and-imager)

**Part VIII: Reproducible Research**

37. [R Markdown and Quarto](#37-r-markdown-and-quarto)
38. [R Projects and Version Control](#38-r-projects-and-version-control)
    - [Research Example: Single-Molecule Imaging Analysis Project](#research-example-single-molecule-imaging-analysis-project)

**Appendices**

39. [R vs. Python: When to Use Which](#39-r-vs-python-when-to-use-which)
40. [Common Errors and Troubleshooting](#40-common-errors-and-troubleshooting)
41. [Quick Reference: Essential Functions](#41-quick-reference-essential-functions)

---

## 1. Introduction: Why R?

### What is R?

R is a free, open-source programming language and software environment for statistical computing and graphics. It was created by **Ross Ihaka** and **Robert Gentleman** at the University of Auckland, New Zealand, in 1993, as a free implementation of the S language developed at Bell Laboratories by John Chambers. R is maintained by the **R Core Team** and the **R Foundation for Statistical Computing**. The current stable release is R 4.5.x (2025).

R has become the *de facto* standard for statistical analysis in the life sciences. It is the language of choice for bioinformatics (via the **Bioconductor** project), clinical trials, ecological research, and increasingly for single-cell genomics, spatial transcriptomics, and computational biology.

### Why R for biology research?

| Strength | What it means for you |
|---|---|
| **Free and open source** | No licence fees, no vendor lock-in. Runs on Windows, macOS, and Linux. |
| **Statistical depth** | R was designed by statisticians for statistics. Every test, model, and method you need is available. |
| **Bioconductor** | A curated repository of 2,300+ packages for genomics, proteomics, flow cytometry, imaging, and more. |
| **ggplot2** | The most powerful and flexible scientific plotting system available in any language. |
| **Reproducibility** | R Markdown and Quarto combine code, results, and narrative into a single document. |
| **Tidyverse** | A coherent collection of packages (dplyr, ggplot2, tidyr, readr, etc.) for data science with consistent syntax. |
| **Community** | Massive active community. Over 21,000 packages on CRAN. Extensive documentation, tutorials, Stack Overflow answers. |
| **Publication ecosystem** | Many journals accept R code as supplementary material. Reviewers can verify your analysis. |

### Limitations to be aware of

| Limitation | Detail |
|---|---|
| **Steep learning curve** | R's syntax is different from most languages. It rewards persistence. |
| **1-indexed** | Like MATLAB, R arrays start at index 1 (not 0 as in Python). |
| **Memory model** | R loads all data into RAM. Very large datasets (> available memory) require special handling. |
| **Speed** | Pure R loops can be slow. Vectorised operations and compiled code (Rcpp) solve this. |
| **Not a general-purpose language** | R is designed for statistics and data analysis. For GUI development, web scraping, or system programming, Python is better suited. |
| **Image analysis** | R has basic image analysis tools (EBImage, imager) but cannot replace FIJI/ImageJ or CellProfiler for serious microscopy work. |

### How to cite R

```r
citation()        # citation for base R
citation("DESeq2")  # citation for a specific package
```

The standard citation for R itself is:

> R Core Team (2025). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria. https://www.R-project.org/

---

## 2. Installing R and RStudio

### Step 1: Install R

R is the language. Download from **CRAN** (Comprehensive R Archive Network):

- **Windows:** https://cran.r-project.org/bin/windows/base/
- **macOS:** https://cran.r-project.org/bin/macosx/
- **Linux:** `sudo apt install r-base` (Ubuntu/Debian) or `sudo dnf install R` (Fedora)

### Step 2: Install RStudio

RStudio is the IDE. It provides a far better interface than R's default console. RStudio Desktop is **free** and open source.

Download from: https://posit.co/download/rstudio-desktop/

**Note:** The company behind RStudio was renamed from "RStudio, PBC" to **Posit, PBC** in 2022, reflecting their broader focus on data science. RStudio the IDE remains free and is actively maintained. Posit has also released **Positron**, a next-generation IDE (based on VS Code) for both R and Python, which became generally available in 2025. Both are excellent choices.

### Step 3: Verify installation

Open RStudio. In the **Console** pane, type:

```r
R.version.string
# [1] "R version 4.5.1 (2025-06-13)"

.libPaths()
# Shows where R packages are installed

sessionInfo()
# Complete session information: R version, platform, loaded packages
```

---

## 3. The RStudio Interface

### The four panes

**Source (top-left)** — Where you write and edit R scripts (`.R` files), R Markdown documents (`.Rmd`), and Quarto documents (`.qmd`). Write code here, then run it with Ctrl+Enter (current line) or Ctrl+Shift+Enter (entire script).

**Console (bottom-left)** — The R interpreter. Code executes here, and output is displayed. You can type commands directly, but it is better practice to write in the Source pane and send lines to the Console.

**Environment / History (top-right)** — The **Environment** tab shows all variables currently in memory (their names, types, and values). Click a data frame to view it in a spreadsheet-like viewer. The **History** tab logs all executed commands.

**Files / Plots / Packages / Help / Viewer (bottom-right)** — A multi-purpose pane:
- **Files** — file browser for the current working directory
- **Plots** — displays graphs generated by your code
- **Packages** — lists installed and loaded packages. Click "Install" to add new packages.
- **Help** — displays documentation. Type `?function_name` in the Console to view help here.
- **Viewer** — for HTML widgets, Shiny apps, and R Markdown previews

### Essential RStudio shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl+Enter** | Run current line/selection |
| **Ctrl+Shift+Enter** | Run entire script |
| **Ctrl+Shift+N** | New R script |
| **Ctrl+S** | Save |
| **Ctrl+Shift+C** | Comment/uncomment selected lines |
| **Ctrl+Shift+M** | Insert pipe operator (`|>` or `%>%`) |
| **Ctrl+Shift+K** | Knit R Markdown document |
| **Alt+-** | Insert assignment operator (`<-`) |
| **Tab** | Auto-complete function/variable names |
| **F1** (with cursor on a function) | Open help for that function |
| **Ctrl+L** | Clear console |
| **Ctrl+Shift+F10** | Restart R session (clean slate) |

---

## 4. Installing and Loading Packages

### CRAN packages

```r
# Install a package from CRAN (only needed once)
install.packages("ggplot2")

# Install multiple packages at once
install.packages(c("dplyr", "tidyr", "readr", "ggplot2", "patchwork"))

# Load a package (needed every session)
library(ggplot2)

# Check installed packages
installed.packages()[, "Package"]

# Update all installed packages
update.packages(ask = FALSE)
```

### Bioconductor packages

```r
# Install BiocManager (only once)
install.packages("BiocManager")

# Install Bioconductor packages
BiocManager::install("DESeq2")
BiocManager::install(c("edgeR", "limma", "clusterProfiler", "EBImage"))

# Check Bioconductor version
BiocManager::version()  # should match your R version (3.22 for R 4.5)

# Update Bioconductor packages
BiocManager::install()  # with no arguments, updates all
```

### Recommended packages for biology research

| Package | Source | Purpose |
|---|---|---|
| **ggplot2** | CRAN | Publication-quality plotting |
| **dplyr** | CRAN | Data manipulation (filter, mutate, summarise) |
| **tidyr** | CRAN | Data reshaping (pivot_longer, pivot_wider) |
| **readr** | CRAN | Fast CSV/TSV reading |
| **readxl** | CRAN | Read Excel files |
| **patchwork** | CRAN | Combine multiple ggplot panels |
| **broom** | CRAN | Tidy model outputs |
| **ggpubr** | CRAN | ggplot2 shortcuts for publication figures |
| **rstatix** | CRAN | Pipe-friendly statistical tests |
| **lme4** | CRAN | Mixed-effects models |
| **survival** | CRAN | Survival analysis |
| **pwr** | CRAN | Power analysis |
| **pheatmap** | CRAN | Heatmaps |
| **DESeq2** | Bioconductor | RNA-Seq differential expression |
| **edgeR** | Bioconductor | RNA-Seq differential expression |
| **limma** | Bioconductor | Linear models for microarray/RNA-Seq |
| **clusterProfiler** | Bioconductor | Gene set enrichment, GO, KEGG |
| **org.Hs.eg.db** | Bioconductor | Human gene annotation database |
| **EBImage** | Bioconductor | Image processing |
| **GenomicRanges** | Bioconductor | Genomic interval operations |
| **Biostrings** | Bioconductor | DNA/RNA/protein sequence handling |

---

## 5. Variables and Data Types

### Assignment

R uses `<-` for assignment (the "arrow"). `=` also works but `<-` is the convention.

```r
x <- 42
pixel_size <- 0.107
filename <- "calcium_imaging.tif"
is_control <- TRUE

# Display a value
x              # just type the variable name
print(x)       # explicit print
cat("Value:", x, "\n")  # formatted output
```

### Data types

| Type | Example | Check with |
|---|---|---|
| **numeric** (double) | `3.14`, `42` | `is.numeric(x)` |
| **integer** | `42L` (note the `L` suffix) | `is.integer(x)` |
| **character** (string) | `"hello"`, `'PIEZO1'` | `is.character(x)` |
| **logical** (boolean) | `TRUE`, `FALSE` (or `T`, `F`) | `is.logical(x)` |
| **complex** | `3 + 4i` | `is.complex(x)` |
| **factor** | `factor(c("Control", "Treated"))` | `is.factor(x)` |

```r
# Check and convert types
class(x)          # "numeric"
is.numeric(x)     # TRUE
as.character(42)  # "42"
as.numeric("3.14")  # 3.14
as.integer(3.7)   # 3 (truncates)
```

### Special values

| Value | Meaning |
|---|---|
| `NA` | Missing value (Not Available). R's primary missing data indicator. |
| `NULL` | Empty / nothing. An object with no value at all. |
| `NaN` | Not a Number (0/0). |
| `Inf`, `-Inf` | Positive/negative infinity. |
| `TRUE`, `FALSE` | Logical constants. |

```r
# NA is contagious
x <- c(1, 2, NA, 4, 5)
mean(x)             # NA
mean(x, na.rm = TRUE)  # 3.0 — the na.rm argument removes NAs before calculation

# Check for NA
is.na(x)            # FALSE FALSE TRUE FALSE FALSE
sum(is.na(x))       # 1 — count of NAs
```

---

## 6. Vectors: R's Fundamental Data Structure

Everything in R is a vector. A single number is a vector of length 1. There are no scalars.

### Creating vectors

```r
# Combine values with c()
intensities <- c(1524, 1830, 1650, 1720, 1590)
conditions <- c("Control", "Drug_A", "Drug_B", "Control", "Drug_A")
is_bright <- c(TRUE, TRUE, FALSE, TRUE, FALSE)

# Sequences
1:10                           # 1, 2, 3, ..., 10
seq(0, 1, by = 0.1)           # 0.0, 0.1, 0.2, ..., 1.0
seq(0, 100, length.out = 50)  # 50 evenly spaced points

# Repeat
rep(0, 10)                     # ten zeros
rep(c("A", "B"), 5)            # "A" "B" "A" "B" "A" "B" "A" "B" "A" "B"
rep(c("A", "B"), each = 5)    # "A" "A" "A" "A" "A" "B" "B" "B" "B" "B"
```

### Vectorised operations

R operations work element-wise on vectors — no loops needed:

```r
x <- c(10, 20, 30, 40, 50)

x + 5          # 15, 25, 35, 45, 55
x * 2          # 20, 40, 60, 80, 100
x^2            # 100, 400, 900, 1600, 2500
sqrt(x)        # 3.16, 4.47, 5.48, 6.32, 7.07
log(x)         # natural log of each element
x > 25         # FALSE, FALSE, TRUE, TRUE, TRUE

# Operations between vectors (element-wise)
y <- c(1, 2, 3, 4, 5)
x + y          # 11, 22, 33, 44, 55
x / y          # 10, 10, 10, 10, 10
```

### Indexing vectors (1-based!)

```r
x <- c(10, 20, 30, 40, 50)

x[1]           # 10 (first element)
x[5]           # 50 (fifth element)
x[c(1, 3, 5)] # 10, 30, 50 (specific indices)
x[2:4]         # 20, 30, 40 (range)
x[-1]          # 20, 30, 40, 50 (everything except first)
x[-c(1, 5)]   # 20, 30, 40 (drop first and last)

# Logical indexing
x[x > 25]     # 30, 40, 50 (elements where condition is TRUE)

# Named vectors
names(x) <- c("a", "b", "c", "d", "e")
x["c"]         # 30
```

### Summary functions

```r
length(x)      # 5
sum(x)         # 150
mean(x)        # 30
median(x)      # 30
sd(x)          # 15.81
var(x)         # 250
min(x)         # 10
max(x)         # 50
range(x)       # 10, 50
which.max(x)   # 5 (index of maximum)
sort(x)        # ascending order
rev(sort(x))   # descending order
table(conditions)  # frequency counts
```

---

## 7. Factors, Lists, and Matrices

### Factors

Factors represent categorical data with a fixed set of levels. They are essential for statistical modelling and for controlling the order of categories in plots.

```r
# Create a factor
condition <- factor(c("Control", "Drug_A", "Drug_B", "Control", "Drug_A"))
levels(condition)    # "Control" "Drug_A" "Drug_B" (alphabetical by default)

# Set custom level order (crucial for plots!)
condition <- factor(condition, levels = c("Control", "Drug_A", "Drug_B"))

# Ordered factor (for ordinal data)
severity <- factor(c("Low", "High", "Medium", "Low"),
                   levels = c("Low", "Medium", "High"), ordered = TRUE)
```

### Lists

Lists can hold elements of different types and lengths — R's most flexible container:

```r
experiment <- list(
  name = "Yoda1 dose-response",
  date = "2025-01-15",
  concentrations = c(0, 0.1, 1, 10, 100),
  responses = c(0.02, 0.15, 0.55, 0.85, 0.95),
  n_cells = 42
)

# Access elements
experiment$name              # "Yoda1 dose-response"
experiment[["responses"]]    # c(0.02, 0.15, 0.55, 0.85, 0.95)
experiment[[4]]              # same as above (by position)
```

### Matrices

2D arrays of a single type (all numeric, all character, etc.):

```r
# Create a matrix
m <- matrix(1:12, nrow = 3, ncol = 4)
#      [,1] [,2] [,3] [,4]
# [1,]    1    4    7   10
# [2,]    2    5    8   11
# [3,]    3    6    9   12

# Note: R fills matrices column-by-column by default!
m <- matrix(1:12, nrow = 3, ncol = 4, byrow = TRUE)  # fill row-by-row

# Indexing
m[2, 3]        # row 2, column 3
m[1, ]         # entire first row
m[, 2]         # entire second column
m[1:2, 3:4]   # submatrix

# Matrix operations
t(m)           # transpose
m %*% t(m)     # matrix multiplication (note: %*% not *)
```

---

## 8. Data Frames and Tibbles

### Data frames

The data frame is R's primary structure for tabular data — like a spreadsheet where each column can be a different type.

```r
# Create a data frame
df <- data.frame(
  cell_id = paste0("Cell_", 1:5),
  area = c(150.2, 210.5, 180.3, 195.7, 165.0),
  mean_intensity = c(1524, 1830, 1650, 1720, 1590),
  condition = factor(c("Control", "Treated", "Control", "Treated", "Control"))
)

# Inspect
head(df)           # first 6 rows
str(df)            # structure (types and dimensions)
summary(df)        # summary statistics for each column
nrow(df); ncol(df) # dimensions
names(df)          # column names

# Access columns
df$area            # as a vector
df[, "area"]       # same
df[["area"]]       # same

# Filter rows
df[df$condition == "Control", ]
df[df$area > 170, ]

# Add a column
df$ctcf <- df$mean_intensity * df$area
```

### Tibbles (modern data frames)

Tibbles are the tidyverse version of data frames — they print more cleanly, never convert strings to factors, and never drop dimensions.

```r
library(tibble)

tb <- tibble(
  cell_id = paste0("Cell_", 1:5),
  area = c(150.2, 210.5, 180.3, 195.7, 165.0),
  mean_intensity = c(1524, 1830, 1650, 1720, 1590),
  condition = c("Control", "Treated", "Control", "Treated", "Control")
)

# Convert between types
as_tibble(df)     # data frame → tibble
as.data.frame(tb) # tibble → data frame
```

---

## 9. Control Flow: if, for, while, apply

### if / else

```r
mean_int <- 1500

if (mean_int > 2000) {
  category <- "bright"
} else if (mean_int > 1000) {
  category <- "medium"
} else {
  category <- "dim"
}

# Vectorised if: ifelse()
categories <- ifelse(intensities > 1500, "bright", "dim")

# dplyr's case_when() for multiple conditions (see Section 13)
```

### for loops

```r
# Basic loop
for (i in 1:10) {
  cat("Frame", i, "\n")
}

# Loop over elements
files <- c("trace_01.csv", "trace_02.csv", "trace_03.csv")
for (f in files) {
  data <- read.csv(f)
  cat("Loaded:", f, "with", nrow(data), "rows\n")
}

# Store results (always preallocate!)
n <- 100
results <- numeric(n)
for (i in 1:n) {
  results[i] <- mean(rnorm(1000))
}
```

### The apply family (vectorised alternatives to loops)

```r
# sapply: apply a function to each element and simplify the result
files <- list.files(pattern = "\\.csv$")
row_counts <- sapply(files, function(f) nrow(read.csv(f)))

# lapply: same but returns a list (safer for complex results)
data_list <- lapply(files, read.csv)

# apply: apply across rows (1) or columns (2) of a matrix
m <- matrix(rnorm(100), nrow = 10)
col_means <- apply(m, 2, mean)   # mean of each column
row_sds <- apply(m, 1, sd)       # SD of each row

# vapply: like sapply but you specify the output type (safest)
row_counts <- vapply(files, function(f) nrow(read.csv(f)), numeric(1))
```

---

## 10. Writing Functions

```r
# Basic function
calculate_dff <- function(trace, baseline_frames = 1:50) {
  # Calculate dF/F from a fluorescence trace
  #
  # Args:
  #   trace: numeric vector of fluorescence intensity values
  #   baseline_frames: indices of frames to use as baseline (default 1:50)
  #
  # Returns:
  #   numeric vector of dF/F values

  f0 <- mean(trace[baseline_frames])
  dff <- (trace - f0) / f0
  return(dff)
}

# Use it
raw_trace <- rnorm(500, mean = 1000, sd = 50)
dff <- calculate_dff(raw_trace, baseline_frames = 1:100)

# Function with multiple return values (use a list)
measure_roi <- function(intensities) {
  list(
    mean = mean(intensities, na.rm = TRUE),
    sd = sd(intensities, na.rm = TRUE),
    n = sum(!is.na(intensities)),
    sem = sd(intensities, na.rm = TRUE) / sqrt(sum(!is.na(intensities)))
  )
}

stats <- measure_roi(c(1500, 1600, 1550, NA, 1700))
stats$mean   # 1587.5
stats$sem    # 42.7
```

---

## 11. The Pipe Operator and Tidy Workflows

The pipe passes the result of the left-hand side as the first argument to the right-hand side. It transforms nested function calls into readable left-to-right chains.

```r
# Without pipe (nested, hard to read)
round(mean(log(c(10, 100, 1000))), 2)

# With pipe (reads left to right)
c(10, 100, 1000) |> log() |> mean() |> round(2)

# The native pipe |> was introduced in R 4.1 (2021)
# The tidyverse pipe %>% from the magrittr package works identically
# Either is fine; |> requires no additional package

# Typical tidy workflow
library(dplyr)

results <- raw_data |>
  filter(condition != "Excluded") |>
  group_by(condition) |>
  summarise(
    mean_intensity = mean(intensity),
    sem = sd(intensity) / sqrt(n()),
    n = n()
  ) |>
  arrange(desc(mean_intensity))
```

---

## 12. Reading and Writing Data

### CSV and text files

```r
# readr (tidyverse, recommended — faster, cleaner)
library(readr)
df <- read_csv("measurements.csv")        # comma-separated
df <- read_tsv("measurements.txt")        # tab-separated
df <- read_delim("data.txt", delim = ";") # custom delimiter

# Base R (no packages needed)
df <- read.csv("measurements.csv")
df <- read.table("data.txt", header = TRUE, sep = "\t")

# Write
write_csv(df, "output.csv")               # readr
write.csv(df, "output.csv", row.names = FALSE)  # base R
```

### Excel files

```r
library(readxl)
df <- read_excel("data.xlsx", sheet = "Results")
df <- read_excel("data.xlsx", range = "A1:D50")

# Write to Excel
library(writexl)
write_xlsx(df, "output.xlsx")
```

### R data files

```r
# Save R objects (preserves types, factors, etc.)
save(df, model_results, file = "analysis.RData")
load("analysis.RData")   # restores objects to the workspace

# Save a single object
saveRDS(df, "data.rds")
df <- readRDS("data.rds")
```

### Listing files

```r
# List files matching a pattern
files <- list.files("data/", pattern = "\\.csv$", full.names = TRUE)

# Recursively search subdirectories
files <- list.files("data/", pattern = "\\.tif$", recursive = TRUE, full.names = TRUE)
```

---

## 13. dplyr: Filtering, Selecting, Mutating, and Summarising

dplyr provides the "verbs" for data manipulation. All functions take a data frame as the first argument and return a data frame — perfect for piping.

```r
library(dplyr)

# filter() — keep rows that match a condition
bright_cells <- df |> filter(mean_intensity > 1500)
controls <- df |> filter(condition == "Control")
subset <- df |> filter(area > 100 & area < 500, condition != "Excluded")

# select() — keep or drop columns
df |> select(cell_id, area, mean_intensity)
df |> select(-comments, -notes)    # drop columns
df |> select(starts_with("mean"))  # helper functions

# mutate() — add or modify columns
df <- df |> mutate(
  log_area = log10(area),
  normalised = mean_intensity / max(mean_intensity),
  ctcf = mean_intensity * area - bg_mean * area
)

# summarise() — reduce to summary statistics
df |> summarise(
  mean_area = mean(area),
  sd_area = sd(area),
  n = n()
)

# group_by() + summarise() — statistics per group
df |> 
  group_by(condition) |>
  summarise(
    mean_int = mean(mean_intensity),
    sem = sd(mean_intensity) / sqrt(n()),
    n = n()
  )

# arrange() — sort
df |> arrange(desc(mean_intensity))

# count() — frequency table
df |> count(condition)

# distinct() — unique rows
df |> distinct(condition)

# rename()
df |> rename(fluorescence = mean_intensity)

# case_when() — vectorised multi-condition if
df <- df |> mutate(
  category = case_when(
    mean_intensity > 2000 ~ "Bright",
    mean_intensity > 1000 ~ "Medium",
    TRUE ~ "Dim"
  )
)
```

### Research Example: Single-Molecule Tracking Data Wrangling

The following examples illustrate dplyr workflows for single-molecule tracking data, based on analyses like those in Bertaccini et al. 2025 (*Nature Communications*), which used PIEZO1-HaloTag knock-in hiPSCs to study the diffusion and organisation of endogenous PIEZO1 at the single-molecule level.

```r
# ── Load and inspect tracking data ──────────────────────────────────────────
# Tracking software (e.g., TrackMate) exports one row per detection per frame.
# Typical columns: track_id, frame, x, y, intensity, cell_id, condition

library(dplyr)
library(readr)

tracks <- read_csv("data/raw/trackmate_spots.csv")

# ── Quality filtering: keep only tracks with a minimum number of links ──────
# Short tracks are unreliable — a minimum of 4 linked detections is typical
# (Bertaccini et al. required ≥4 links per trajectory).

tracks_filtered <- tracks |>
  group_by(track_id) |>
  filter(n() >= 4) |>          # keep tracks with at least 4 detections

  ungroup()

cat("Tracks before filter:", n_distinct(tracks$track_id),
    "\nTracks after filter:", n_distinct(tracks_filtered$track_id), "\n")

# ── Compute per-track summary statistics ────────────────────────────────────
# For each trajectory, compute path length, diffusion coefficient, MSD, and
# dwell time — metrics used for classifying mobile vs immobile molecules.

pixel_size_um <- 0.107   # camera pixel size in micrometres
frame_interval_s <- 0.05 # time between frames in seconds

track_stats <- tracks_filtered |>
  arrange(track_id, frame) |>
  group_by(track_id, cell_id, condition) |>
  summarise(
    n_detections = n(),
    duration_s   = (max(frame) - min(frame)) * frame_interval_s,
    # Path length = sum of step distances
    path_length_um = sum(sqrt(diff(x)^2 + diff(y)^2)) * pixel_size_um,
    # Mean fluorescence intensity along the track
    mean_intensity = mean(intensity, na.rm = TRUE),
    .groups = "drop"
  )

# ── Classify mobile vs immobile using a path length cutoff ──────────────────
# Bertaccini et al. separated trajectories into mobile and immobile populations
# using a path length threshold derived from fixed-cell controls (n=14,943
# trajectories from fixed cells established the immobile reference).

# Determine the cutoff from fixed-cell data (e.g., 95th percentile of path lengths)
fixed_cell_stats <- track_stats |> filter(condition == "Fixed")
path_length_cutoff <- quantile(fixed_cell_stats$path_length_um, 0.95)

track_stats <- track_stats |>
  mutate(
    mobility = if_else(path_length_um > path_length_cutoff, "Mobile", "Immobile")
  )

# ── Compute puncta density per cell ────────────────────────────────────────
# Puncta density = number of detected puncta / cell area (puncta/um^2)
# Cell areas are measured independently (e.g., from bright-field segmentation).

cell_areas <- read_csv("data/raw/cell_areas.csv")  # columns: cell_id, area_um2

puncta_per_cell <- tracks_filtered |>
  # Count unique puncta per cell (first frame of each track = one punctum)
  group_by(cell_id, condition) |>
  summarise(n_puncta = n_distinct(track_id), .groups = "drop") |>
  left_join(cell_areas, by = "cell_id") |>
  mutate(puncta_density = n_puncta / area_um2)    # puncta per um^2

# ── Per-cell summaries for condition comparisons ────────────────────────────
# Statistical tests compare conditions at the cell level (n = 12–26 cells per
# condition across 3+ independent experiments).

cell_summaries <- track_stats |>
  group_by(cell_id, condition) |>
  summarise(
    n_tracks          = n(),
    median_path_length = median(path_length_um),
    mean_intensity     = mean(mean_intensity),
    frac_mobile        = mean(mobility == "Mobile"),
    .groups = "drop"
  )

# ── Combine data from multiple experimental replicates ──────────────────────
# When experiments are run on different days, bind them and tag with replicate.

all_data <- list.files("data/raw/", pattern = "tracks_rep\\d+\\.csv",
                       full.names = TRUE) |>
  purrr::map_dfr(read_csv, .id = "replicate")
```

---

## 14. tidyr: Reshaping Data (Pivoting, Nesting, Separating)

```r
library(tidyr)

# pivot_longer() — wide to long (gather)
# When each column is a time point or condition
wide_data <- tibble(
  cell = c("Cell_1", "Cell_2"),
  t0 = c(100, 110),
  t10 = c(150, 160),
  t20 = c(200, 180)
)

long_data <- wide_data |>
  pivot_longer(cols = t0:t20, names_to = "timepoint", values_to = "intensity")

# pivot_wider() — long to wide (spread)
wide_again <- long_data |>
  pivot_wider(names_from = timepoint, values_from = intensity)

# separate() — split one column into multiple
df |> separate(sample_id, into = c("condition", "replicate"), sep = "_")

# unite() — combine columns
df |> unite(sample_id, condition, replicate, sep = "_")

# drop_na() — remove rows with NA in specified columns
df |> drop_na(intensity)

# fill() — fill NAs with previous/next value
df |> fill(condition, .direction = "down")
```

---

## 15. Working with Strings (stringr) and Dates (lubridate)

### Strings with stringr

```r
library(stringr)

str_detect("calcium_imaging.tif", "calcium")   # TRUE
str_replace("old_name.tif", "old", "new")      # "new_name.tif"
str_extract("cell_42_control", "\\d+")          # "42"
str_split("a,b,c,d", ",")                       # list: c("a","b","c","d")
str_to_upper("piezo1")                          # "PIEZO1"
str_trim("  hello  ")                           # "hello"
str_pad("42", width = 4, pad = "0")             # "0042"
str_glue("Cell {i}: intensity = {val}")         # string interpolation
```

### Dates with lubridate

```r
library(lubridate)

today()                    # current date
now()                      # current date-time
ymd("2025-01-15")          # parse date
mdy("01/15/2025")          # parse US format
dmy("15-01-2025")          # parse European format

d <- ymd("2025-01-15")
year(d)                    # 2025
month(d)                   # 1
day(d)                     # 15

# Time differences
d2 <- ymd("2025-03-01")
d2 - d                     # 45 days
difftime(d2, d, units = "weeks")  # 6.43 weeks
```

---

## 16. The Grammar of Graphics

ggplot2 is built on the **Grammar of Graphics** — every plot is composed from layers:

```r
library(ggplot2)

# The basic template:
ggplot(data, aes(x = x_var, y = y_var)) +
  geom_*() +      # geometric objects (points, lines, bars...)
  scale_*() +     # control axes, colours, sizes
  facet_*() +     # split into panels
  theme_*() +     # control non-data appearance
  labs()          # labels and title

# Example: scatter plot
ggplot(df, aes(x = area, y = mean_intensity, colour = condition)) +
  geom_point(size = 3) +
  labs(x = "Area (µm²)", y = "Mean Intensity (AU)", colour = "Condition") +
  theme_classic(base_size = 12)
```

### Key aesthetic mappings (aes)

| Aesthetic | Maps to |
|---|---|
| `x`, `y` | Position |
| `colour` (or `color`) | Line/point colour |
| `fill` | Fill colour (bars, boxes, areas) |
| `shape` | Point shape |
| `size` | Point/line size |
| `linetype` | Line type (solid, dashed, dotted) |
| `alpha` | Transparency (0–1) |
| `group` | Grouping variable |

### Key geoms

| Geom | Plot type |
|---|---|
| `geom_point()` | Scatter plot |
| `geom_line()` | Line plot |
| `geom_col()` / `geom_bar()` | Bar chart |
| `geom_boxplot()` | Box plot |
| `geom_violin()` | Violin plot |
| `geom_jitter()` | Jittered scatter (avoids overplotting) |
| `geom_errorbar()` | Error bars |
| `geom_histogram()` | Histogram |
| `geom_density()` | Density curve |
| `geom_smooth()` | Trend line (loess or lm) |
| `geom_hline()` / `geom_vline()` | Reference lines |
| `geom_text()` / `geom_label()` | Text annotations |
| `geom_ribbon()` | Shaded area (for confidence bands) |
| `geom_tile()` | Heatmap tiles |

---

## 17. Common Plot Types for Biology

### Time-course traces

```r
ggplot(traces_long, aes(x = time, y = dff, colour = roi)) +
  geom_line(linewidth = 0.8) +
  labs(x = "Time (s)", y = expression(Delta*F/F[0]), colour = "ROI") +
  theme_classic(base_size = 12) +
  scale_colour_brewer(palette = "Set1")
```

### Bar chart with error bars and individual points

```r
# summary_df has columns: condition, mean, sem
# raw_df has columns: condition, value

ggplot(summary_df, aes(x = condition, y = mean)) +
  geom_col(fill = "grey80", colour = "black", width = 0.6) +
  geom_errorbar(aes(ymin = mean - sem, ymax = mean + sem),
                width = 0.2, linewidth = 0.8) +
  geom_jitter(data = raw_df, aes(x = condition, y = value),
              width = 0.15, size = 2, alpha = 0.6) +
  labs(x = NULL, y = "Mean Intensity (AU)") +
  theme_classic(base_size = 12)
```

### Box plot with jittered points

```r
ggplot(df, aes(x = condition, y = intensity, fill = condition)) +
  geom_boxplot(outlier.shape = NA, alpha = 0.5) +
  geom_jitter(width = 0.2, size = 1.5, alpha = 0.7) +
  labs(x = NULL, y = "Intensity (AU)") +
  scale_fill_brewer(palette = "Set2") +
  theme_classic(base_size = 12) +
  theme(legend.position = "none")
```

### Dose-response curve

```r
ggplot(dose_data, aes(x = concentration, y = response)) +
  geom_point(size = 3) +
  geom_errorbar(aes(ymin = response - sem, ymax = response + sem), width = 0.1) +
  geom_smooth(method = "nls",
              formula = y ~ Bottom + (Top - Bottom) / (1 + (EC50/x)^nH),
              method.args = list(start = list(Bottom = 0, Top = 1, EC50 = 10, nH = 1)),
              se = FALSE, colour = "red") +
  scale_x_log10() +
  labs(x = "[Drug] (µM)", y = "Normalised Response") +
  theme_classic(base_size = 12)
```

### Heatmap

```r
library(pheatmap)

# matrix_data: genes (rows) × samples (columns)
pheatmap(matrix_data,
         scale = "row",                    # z-score each row
         cluster_rows = TRUE,
         cluster_cols = TRUE,
         color = colorRampPalette(c("blue", "white", "red"))(100),
         fontsize = 8,
         show_rownames = FALSE)
```

### Research Example: Single-Molecule Imaging Figures

The following plot types are drawn from single-molecule imaging studies such as Bertaccini et al. 2025 (*Nature Communications*), which characterised PIEZO1-HaloTag dynamics in hiPSC-derived endothelial cells (ECs) and neural stem cells (NSCs). Conditions included WT vs PIEZO1 KO, +/-Yoda1 agonist, and +/-DMSO vehicle control.

#### Bar chart with individual data points and mean +/- SEM

This is the standard format for comparing per-cell measurements (e.g., puncta density) across conditions with modest sample sizes (n = 12-26 cells). Each point represents one cell; the bar shows the group mean and error bars show +/- SEM.

```r
library(ggplot2)
library(dplyr)

# Compute group summaries (mean +/- SEM)
summary_df <- puncta_per_cell |>
  group_by(condition) |>
  summarise(
    mean_density = mean(puncta_density),
    sem          = sd(puncta_density) / sqrt(n()),
    n            = n(),
    .groups = "drop"
  )

# Set factor levels to control the order on the x-axis
condition_order <- c("WT", "PIEZO1_KO", "WT_DMSO", "WT_Yoda1")
summary_df$condition <- factor(summary_df$condition, levels = condition_order)
puncta_per_cell$condition <- factor(puncta_per_cell$condition, levels = condition_order)

ggplot(summary_df, aes(x = condition, y = mean_density)) +
  geom_col(fill = "grey80", colour = "black", width = 0.6) +
  geom_errorbar(aes(ymin = mean_density - sem, ymax = mean_density + sem),
                width = 0.2, linewidth = 0.8) +
  geom_jitter(data = puncta_per_cell,
              aes(x = condition, y = puncta_density),
              width = 0.15, size = 2, alpha = 0.6) +
  labs(x = NULL, y = expression("Puncta density (puncta/"*mu*"m"^2*")")) +
  theme_classic(base_size = 12) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

#### Cumulative distribution function (CDF) for diffusion coefficients

CDFs are ideal for comparing entire distributions between conditions — they reveal shifts that summary statistics may obscure. Bertaccini et al. used CDFs to compare diffusion coefficient distributions between WT and PIEZO1 KO cells.

```r
ggplot(track_stats, aes(x = diffusion_coeff, colour = condition)) +
  stat_ecdf(linewidth = 0.8) +
  scale_x_log10(
    labels = scales::label_scientific()
  ) +
  labs(
    x = expression("Diffusion coefficient ("*mu*"m"^2*"/s)"),
    y = "Cumulative fraction",
    colour = "Condition"
  ) +
  theme_classic(base_size = 12) +
  scale_colour_manual(values = c("WT" = "#377EB8", "PIEZO1_KO" = "#E41A1C"))
```

#### Histogram on log scale

Log-scaled histograms are essential for single-molecule data where measurements (diffusion coefficients, intensities) span several orders of magnitude.

```r
ggplot(track_stats, aes(x = diffusion_coeff, fill = condition)) +
  geom_histogram(bins = 50, alpha = 0.6, position = "identity") +
  scale_x_log10(labels = scales::label_scientific()) +
  labs(
    x = expression("Diffusion coefficient ("*mu*"m"^2*"/s)"),
    y = "Count",
    fill = "Condition"
  ) +
  facet_wrap(~ condition, ncol = 1, scales = "free_y") +
  theme_classic(base_size = 12)
```

#### Density scatter plot (2D density with individual points)

When plotting thousands of trajectories (e.g., MSD vs time lag), a density scatter plot avoids overplotting. Colour encodes local point density.

```r
library(ggpointdensity)   # provides geom_pointdensity()

ggplot(msd_data, aes(x = time_lag_s, y = msd_um2)) +
  geom_pointdensity(size = 0.5) +
  scale_colour_viridis_c(name = "Density") +
  scale_y_log10() +
  labs(
    x = "Time lag (s)",
    y = expression("MSD ("*mu*"m"^2*")")
  ) +
  facet_wrap(~ condition) +
  theme_classic(base_size = 12)

# Alternative without ggpointdensity: use geom_hex() or stat_density_2d()
ggplot(msd_data, aes(x = time_lag_s, y = msd_um2)) +
  stat_density_2d(aes(fill = after_stat(density)),
                  geom = "raster", contour = FALSE) +
  scale_fill_viridis_c() +
  scale_y_log10() +
  theme_classic(base_size = 12)
```

#### Multi-panel figure combining plot types

A typical figure in a single-molecule paper combines bar charts, CDFs, and representative images. Use patchwork (Section 19) to assemble panels.

```r
library(patchwork)

p_bar <- ggplot(summary_df, aes(x = condition, y = mean_density)) +
  geom_col(fill = "grey80", colour = "black", width = 0.6) +
  geom_errorbar(aes(ymin = mean_density - sem, ymax = mean_density + sem),
                width = 0.2) +
  geom_jitter(data = puncta_per_cell,
              aes(y = puncta_density), width = 0.15, size = 1.5, alpha = 0.5) +
  labs(x = NULL, y = expression("Puncta/"*mu*"m"^2), title = "A") +
  theme_classic(base_size = 10)

p_cdf <- ggplot(track_stats, aes(x = diffusion_coeff, colour = condition)) +
  stat_ecdf(linewidth = 0.7) +
  scale_x_log10() +
  labs(x = expression("D ("*mu*"m"^2*"/s)"), y = "CDF", title = "B") +
  theme_classic(base_size = 10) +
  theme(legend.position = c(0.75, 0.3))

p_hist <- ggplot(track_stats, aes(x = path_length_um, fill = mobility)) +
  geom_histogram(bins = 40, alpha = 0.7, position = "identity") +
  labs(x = expression("Path length ("*mu*"m)"), y = "Count", title = "C") +
  scale_fill_manual(values = c("Mobile" = "#E41A1C", "Immobile" = "#377EB8")) +
  theme_classic(base_size = 10)

(p_bar | p_cdf) / p_hist +
  plot_annotation(tag_levels = list(c("", "", "")))  # titles already set manually

ggsave("figures/figure2.pdf", width = 17, height = 12, units = "cm", dpi = 300)
```

---

## 18. Customising Themes, Colours, and Fonts

### Built-in themes

```r
p + theme_classic()      # clean: no gridlines, axes on left and bottom
p + theme_minimal()      # minimal: light gridlines, no box
p + theme_bw()           # black and white with gridlines
p + theme_void()         # nothing (for maps, images)
```

### Custom theme modifications

```r
p + theme(
  text = element_text(family = "Arial", size = 10),
  axis.title = element_text(size = 12),
  axis.text = element_text(size = 10, colour = "black"),
  legend.position = "bottom",     # or "none", "right", "top", c(0.8, 0.9)
  legend.title = element_blank(),
  panel.grid = element_blank(),
  strip.background = element_blank()  # for facets
)
```

### Colour scales

```r
# Discrete colours
p + scale_colour_brewer(palette = "Set1")        # ColorBrewer qualitative
p + scale_colour_manual(values = c("Control" = "#377EB8", "Treated" = "#E41A1C"))
p + scale_fill_viridis_d()                        # colourblind-friendly

# Continuous colours
p + scale_colour_viridis_c()                      # colourblind-friendly gradient
p + scale_fill_gradient2(low = "blue", mid = "white", high = "red", midpoint = 0)
```

### Mathematical notation in labels

```r
# Use expression() for mathematical notation
labs(
  x = expression(paste("Concentration (", mu, "M)")),
  y = expression(Delta * F / F[0]),
  title = expression(paste("PIEZO1-", italic("GFP"), " Response"))
)
```

---

## 19. Multi-Panel Figures with patchwork and facets

### Faceting (splitting by a variable)

```r
# One variable
ggplot(df, aes(x = time, y = intensity)) +
  geom_line() +
  facet_wrap(~ condition, ncol = 2)

# Two variables
ggplot(df, aes(x = time, y = intensity)) +
  geom_line() +
  facet_grid(drug ~ concentration)

# Free scales
facet_wrap(~ condition, scales = "free_y")
```

### patchwork (combining independent plots)

```r
library(patchwork)

p1 <- ggplot(df, aes(x = time, y = dff)) + geom_line() + labs(title = "A")
p2 <- ggplot(summary, aes(x = condition, y = mean)) + geom_col() + labs(title = "B")
p3 <- ggplot(df, aes(x = area, y = intensity)) + geom_point() + labs(title = "C")

# Arrange
p1 + p2           # side by side
p1 / p2           # stacked
(p1 | p2) / p3    # 2 on top, 1 below

# Control layout
p1 + p2 + p3 + plot_layout(ncol = 2, widths = c(2, 1))

# Add shared annotations
(p1 | p2) / p3 +
  plot_annotation(tag_levels = "A")  # adds A, B, C labels
```

---

## 20. Saving Publication-Quality Figures

```r
# ggsave (the recommended way)
ggsave("figure1.pdf", plot = p, width = 17, height = 8.5, units = "cm", dpi = 300)
ggsave("figure1.tiff", plot = p, width = 17, height = 8.5, units = "cm", dpi = 300)
ggsave("figure1.png", plot = p, width = 17, height = 8.5, units = "cm", dpi = 300)
ggsave("figure1.svg", plot = p, width = 17, height = 8.5, units = "cm")
ggsave("figure1.eps", plot = p, width = 17, height = 8.5, units = "cm")

# Common journal widths
# Single column: 8.5 cm (3.35 in)
# 1.5 column: 11.4 cm (4.49 in)
# Double column: 17.4 cm (6.85 in)
```

For publication, ensure: fonts are embedded (PDF/EPS), resolution is ≥300 DPI (raster), and the figure dimensions match journal specifications.

---

## 21. Descriptive Statistics and Exploratory Analysis

```r
# Base R
mean(x)
median(x)
sd(x)
var(x)
quantile(x, probs = c(0.25, 0.5, 0.75))
IQR(x)
range(x)

# Summary of a data frame
summary(df)

# Per-group statistics with dplyr
df |>
  group_by(condition) |>
  summarise(
    n = n(),
    mean = mean(intensity, na.rm = TRUE),
    sd = sd(intensity, na.rm = TRUE),
    sem = sd / sqrt(n),
    median = median(intensity, na.rm = TRUE),
    q25 = quantile(intensity, 0.25, na.rm = TRUE),
    q75 = quantile(intensity, 0.75, na.rm = TRUE)
  )

# Normality testing
shapiro.test(x)        # Shapiro-Wilk (best for n < 50)
# If p > 0.05, data is consistent with normality
```

---

## 22. t-Tests and Paired Comparisons

```r
# Two-sample t-test (independent groups)
control <- c(150, 160, 155, 170, 165, 158, 162)
treated <- c(180, 175, 190, 185, 178, 172, 188)

result <- t.test(control, treated)
result$p.value    # p-value
result$estimate   # group means
result$conf.int   # 95% CI for the difference

# Welch's t-test (default — does NOT assume equal variances)
t.test(control, treated)

# Equal variance t-test (Student's)
t.test(control, treated, var.equal = TRUE)

# Paired t-test
before <- c(100, 110, 105, 115, 108)
after  <- c(120, 125, 118, 130, 122)
t.test(before, after, paired = TRUE)

# One-sample t-test
t.test(x, mu = 100)    # test if mean differs from 100

# Formula interface (using a data frame)
t.test(intensity ~ condition, data = df)

# Effect size (Cohen's d)
library(effectsize)
cohens_d(control, treated)
```

---

## 23. ANOVA and Post-Hoc Tests

### One-Way ANOVA

```r
# Using aov()
model <- aov(intensity ~ condition, data = df)
summary(model)

# Check assumptions
plot(model)              # diagnostic plots
shapiro.test(residuals(model))  # normality of residuals
bartlett.test(intensity ~ condition, data = df)  # equal variances

# Post-hoc tests
TukeyHSD(model)          # Tukey's Honest Significant Difference
```

### Two-Way ANOVA

```r
model <- aov(intensity ~ drug * concentration, data = df)
summary(model)

# Interaction plots
interaction.plot(df$concentration, df$drug, df$intensity)
```

### Repeated Measures ANOVA

```r
library(rstatix)

# rstatix provides a pipe-friendly interface
result <- df |>
  anova_test(dv = intensity, wid = subject, within = timepoint)
result

# Post-hoc pairwise comparisons with Bonferroni correction
df |>
  pairwise_t_test(intensity ~ timepoint, paired = TRUE, p.adjust.method = "bonferroni")
```

---

## 24. Non-Parametric Tests

Use when data violates normality assumptions or for ordinal data.

```r
# Mann-Whitney U test (= Wilcoxon rank-sum) — non-parametric alternative to independent t-test
wilcox.test(control, treated)

# Wilcoxon signed-rank test — non-parametric paired test
wilcox.test(before, after, paired = TRUE)

# Kruskal-Wallis test — non-parametric one-way ANOVA
kruskal.test(intensity ~ condition, data = df)

# Post-hoc: Dunn's test
library(dunn.test)
dunn.test(df$intensity, df$condition, method = "bonferroni")

# Kolmogorov-Smirnov test — compare distributions
ks.test(sample1, sample2)

# Fisher's exact test — for 2×2 contingency tables
fisher.test(matrix(c(10, 5, 3, 12), nrow = 2))

# Chi-squared test — for larger contingency tables
chisq.test(table(df$condition, df$outcome))
```

---

## 25. Correlation and Linear Regression

### Correlation

```r
# Pearson's correlation
cor.test(x, y, method = "pearson")

# Spearman's rank correlation (non-parametric)
cor.test(x, y, method = "spearman")

# Correlation matrix
cor(df[, c("area", "intensity", "circularity")])
```

### Simple linear regression

```r
model <- lm(intensity ~ area, data = df)
summary(model)

# Extract specific values
coef(model)              # coefficients
summary(model)$r.squared # R²
confint(model)           # 95% CI for coefficients

# Tidy output with broom
library(broom)
tidy(model)              # coefficients as a tibble
glance(model)            # model statistics as a tibble
augment(model)           # fitted values and residuals

# Plot with regression line
ggplot(df, aes(x = area, y = intensity)) +
  geom_point() +
  geom_smooth(method = "lm", se = TRUE) +
  annotate("text", x = 150, y = 2000,
           label = paste0("R² = ", round(summary(model)$r.squared, 3)))
```

### Multiple linear regression

```r
model <- lm(intensity ~ area + circularity + condition, data = df)
summary(model)
```

---

## 26. Nonlinear Curve Fitting

### Using nls()

```r
# Fit an exponential decay: y = A * exp(-x/tau) + y0
fit <- nls(intensity ~ A * exp(-time / tau) + y0,
           data = trace_data,
           start = list(A = 1000, tau = 100, y0 = 200))

summary(fit)
coef(fit)        # A, tau, y0

# Predict and plot
trace_data$fitted <- predict(fit)
ggplot(trace_data, aes(x = time)) +
  geom_point(aes(y = intensity), alpha = 0.5) +
  geom_line(aes(y = fitted), colour = "red", linewidth = 1) +
  labs(x = "Time (s)", y = "Intensity")

# Confidence intervals on parameters
confint(fit)
```

### Dose-response fitting (4-parameter logistic)

```r
library(drc)

# drc is the gold standard package for dose-response in R
fit <- drm(response ~ concentration, data = dose_data,
           fct = LL.4(names = c("Slope", "Lower", "Upper", "ED50")))

summary(fit)
ED(fit, c(50))   # EC50 with confidence interval

plot(fit, type = "all",
     xlab = "Concentration (µM)", ylab = "Normalised Response")
```

### Gaussian fitting

```r
fit <- nls(y ~ A * exp(-(x - mu)^2 / (2 * sigma^2)) + offset,
           data = peak_data,
           start = list(A = max(peak_data$y), mu = 0, sigma = 1, offset = 0))

fwhm <- 2.355 * coef(fit)["sigma"]
```

---

## 27. Mixed-Effects Models

When data has hierarchical structure (e.g., multiple cells per dish, multiple dishes per experiment), mixed-effects models account for the non-independence.

```r
library(lme4)

# Random intercept: each dish has a different baseline
model <- lmer(intensity ~ condition + (1 | dish), data = df)
summary(model)

# Random intercept and slope
model <- lmer(intensity ~ time * condition + (1 + time | subject), data = df)

# Get p-values (lme4 doesn't provide them by default)
library(lmerTest)
model <- lmer(intensity ~ condition + (1 | dish), data = df)
summary(model)  # now includes p-values via Satterthwaite approximation

# Compare models
model_null <- lmer(intensity ~ 1 + (1 | dish), data = df)
model_full <- lmer(intensity ~ condition + (1 | dish), data = df)
anova(model_null, model_full)
```

---

## 28. Multiple Testing Correction

When performing many statistical tests (e.g., comparing gene expression across thousands of genes), adjust p-values to control the false discovery rate.

```r
# p.adjust() applies corrections to a vector of p-values
p_values <- c(0.001, 0.04, 0.05, 0.1, 0.5, 0.01)

# Bonferroni (most conservative — controls family-wise error rate)
p.adjust(p_values, method = "bonferroni")

# Benjamini-Hochberg (FDR — controls false discovery rate, standard for genomics)
p.adjust(p_values, method = "BH")

# Holm (step-down Bonferroni — always at least as powerful as Bonferroni)
p.adjust(p_values, method = "holm")

# In practice for RNA-Seq, DESeq2 and edgeR handle this automatically (padj column)
```

---

## 29. Power Analysis and Sample Size

```r
library(pwr)

# How many samples per group for a t-test?
pwr.t.test(
  d = 0.8,          # expected effect size (Cohen's d)
  sig.level = 0.05,  # α
  power = 0.80,      # 1 - β
  type = "two.sample"
)
# Result: n = ~26 per group

# Power for a given sample size
pwr.t.test(n = 15, d = 0.8, sig.level = 0.05, type = "two.sample")

# One-way ANOVA
pwr.anova.test(k = 3, f = 0.4, sig.level = 0.05, power = 0.80)

# Chi-squared test
pwr.chisq.test(w = 0.3, df = 1, sig.level = 0.05, power = 0.80)

# Correlation
pwr.r.test(r = 0.3, sig.level = 0.05, power = 0.80)
```

---

## 30. Introduction to Bioconductor

### What is Bioconductor?

Bioconductor is an open-source, open-development software project for the analysis and comprehension of genomic data, built on R. It provides over 2,300 packages for genomics, proteomics, metabolomics, flow cytometry, imaging, and more. Bioconductor releases twice per year, in sync with R releases. The current release is Bioconductor 3.22, which works with R 4.5.

### Installing Bioconductor packages

```r
if (!requireNamespace("BiocManager", quietly = TRUE))
  install.packages("BiocManager")

BiocManager::install("DESeq2")
BiocManager::install(c("edgeR", "limma", "clusterProfiler",
                        "org.Hs.eg.db", "GenomicRanges"))
```

### Key Bioconductor packages for biology

| Package | Purpose |
|---|---|
| **DESeq2** | RNA-Seq differential expression (negative binomial model) |
| **edgeR** | RNA-Seq differential expression (negative binomial, quasi-likelihood) |
| **limma** | Linear models for microarray and RNA-Seq (voom) |
| **clusterProfiler** | GO enrichment, KEGG pathway analysis, GSEA |
| **org.Hs.eg.db** | Human gene annotation (Entrez, Ensembl, Symbol, GO) |
| **org.Mm.eg.db** | Mouse gene annotation |
| **GenomicRanges** | Genomic interval operations (overlaps, nearest, coverage) |
| **Biostrings** | DNA/RNA/protein sequence manipulation |
| **BSgenome** | Whole genome sequences |
| **rtracklayer** | Import/export BED, GFF, BigWig, BAM files |
| **SummarizedExperiment** | Standard container for assay data + metadata |
| **SingleCellExperiment** | Container for single-cell data |
| **Seurat** (CRAN) | Single-cell RNA-seq analysis (clustering, UMAP, markers) |
| **EBImage** | Image processing and analysis |

---

## 31. Working with Genomic Data Structures

### SummarizedExperiment

The standard Bioconductor container for rectangular assay data (genes × samples):

```r
library(SummarizedExperiment)

# A SummarizedExperiment holds:
# - assays: one or more matrices (e.g., counts, TPM, normalised)
# - colData: sample metadata (condition, batch, etc.)
# - rowData: gene/feature metadata (gene name, chromosome, etc.)

# Access components
assay(se)            # the count matrix
colData(se)          # sample information
rowData(se)          # gene information
assay(se, "counts")  # specific assay by name
```

### GRanges (Genomic Ranges)

For working with genomic coordinates:

```r
library(GenomicRanges)

gr <- GRanges(
  seqnames = c("chr1", "chr1", "chr2"),
  ranges = IRanges(start = c(100, 200, 150), end = c(150, 300, 250)),
  strand = c("+", "-", "+"),
  score = c(10, 20, 15)
)

# Operations
findOverlaps(gr, other_gr)   # find overlapping regions
subsetByOverlaps(gr, other)  # keep only overlapping
reduce(gr)                    # merge overlapping intervals
```

---

## 32. RNA-Seq Differential Expression with DESeq2

DESeq2 is the most widely used package for RNA-Seq differential expression analysis.

```r
library(DESeq2)

# 1. Prepare input
# count_matrix: genes (rows) × samples (columns), raw integer counts
# col_data: data frame with sample metadata, rownames matching colnames of count_matrix

col_data <- data.frame(
  condition = factor(c("Control", "Control", "Control",
                       "Treated", "Treated", "Treated")),
  row.names = colnames(count_matrix)
)

# 2. Create DESeqDataSet
dds <- DESeqDataSetFromMatrix(
  countData = count_matrix,
  colData = col_data,
  design = ~ condition
)

# 3. Run the analysis (normalisation, dispersion estimation, statistical testing)
dds <- DESeq(dds)

# 4. Extract results
res <- results(dds, contrast = c("condition", "Treated", "Control"))
res <- res[order(res$padj), ]  # sort by adjusted p-value

# 5. Summary
summary(res, alpha = 0.05)

# 6. Key columns in results:
# baseMean        — average normalised count across all samples
# log2FoldChange  — log2(Treated/Control)
# lfcSE           — standard error of log2FC
# stat            — Wald test statistic
# pvalue          — raw p-value
# padj            — BH-adjusted p-value (FDR)

# 7. Filter significant genes
sig_genes <- subset(res, padj < 0.05 & abs(log2FoldChange) > 1)

# 8. Normalised counts for plotting
normalised_counts <- counts(dds, normalized = TRUE)

# 9. Variance-stabilised transformation (for PCA, heatmaps)
vsd <- vst(dds, blind = FALSE)
plotPCA(vsd, intgroup = "condition")
```

---

## 33. RNA-Seq Differential Expression with edgeR and limma

### edgeR

```r
library(edgeR)

# 1. Create DGEList
y <- DGEList(counts = count_matrix, group = condition)

# 2. Filter low-expression genes
keep <- filterByExpr(y)
y <- y[keep, , keep.lib.sizes = FALSE]

# 3. Normalisation (TMM)
y <- calcNormFactors(y)

# 4. Estimate dispersion
design <- model.matrix(~ condition)
y <- estimateDisp(y, design)

# 5. Quasi-likelihood F-test (recommended)
fit <- glmQLFit(y, design)
qlf <- glmQLFTest(fit, coef = 2)

# 6. Extract results
topTags(qlf, n = 20)
results <- topTags(qlf, n = Inf)$table
sig <- results[results$FDR < 0.05 & abs(results$logFC) > 1, ]
```

### limma-voom

```r
library(limma)
library(edgeR)

# 1. DGEList and filtering
y <- DGEList(counts = count_matrix, group = condition)
keep <- filterByExpr(y)
y <- y[keep, , keep.lib.sizes = FALSE]
y <- calcNormFactors(y)

# 2. Voom transformation
design <- model.matrix(~ condition)
v <- voom(y, design, plot = TRUE)

# 3. Linear model fitting
fit <- lmFit(v, design)
fit <- eBayes(fit)

# 4. Results
topTable(fit, coef = 2, n = 20)
results <- topTable(fit, coef = 2, n = Inf)
sig <- results[results$adj.P.Val < 0.05 & abs(results$logFC) > 1, ]
```

---

## 34. Gene Set Enrichment and Pathway Analysis

### GO enrichment with clusterProfiler

```r
library(clusterProfiler)
library(org.Hs.eg.db)

# Gene list: Entrez IDs of significant genes
sig_genes <- res[res$padj < 0.05 & abs(res$log2FoldChange) > 1, ]
gene_list <- rownames(sig_genes)

# Convert gene symbols to Entrez IDs if needed
gene_ids <- bitr(gene_list, fromType = "SYMBOL", toType = "ENTREZID",
                 OrgDb = org.Hs.eg.db)

# GO enrichment (over-representation analysis)
ego <- enrichGO(
  gene = gene_ids$ENTREZID,
  OrgDb = org.Hs.eg.db,
  ont = "BP",           # "BP" (biological process), "MF", "CC", or "ALL"
  pAdjustMethod = "BH",
  pvalueCutoff = 0.05,
  readable = TRUE        # convert Entrez IDs to gene symbols
)

# Visualise
dotplot(ego, showCategory = 20)
barplot(ego, showCategory = 15)
cnetplot(ego, showCategory = 5)      # network of genes and GO terms
```

### KEGG pathway enrichment

```r
ekegg <- enrichKEGG(
  gene = gene_ids$ENTREZID,
  organism = "hsa",      # human
  pvalueCutoff = 0.05
)

dotplot(ekegg, showCategory = 15)
```

### Gene Set Enrichment Analysis (GSEA)

GSEA uses the entire ranked gene list (not just significant genes):

```r
# Create a named vector: gene → log2FoldChange, sorted descending
gene_list_ranked <- res$log2FoldChange
names(gene_list_ranked) <- rownames(res)
gene_list_ranked <- sort(gene_list_ranked, decreasing = TRUE)
gene_list_ranked <- gene_list_ranked[!is.na(gene_list_ranked)]

# Run GSEA
gsea_result <- gseGO(
  geneList = gene_list_ranked,
  OrgDb = org.Hs.eg.db,
  ont = "BP",
  keyType = "SYMBOL",
  pvalueCutoff = 0.05
)

# Visualise
gseaplot2(gsea_result, geneSetID = 1:3)
dotplot(gsea_result, showCategory = 20)
```

---

## 35. Visualising Genomic Data (Volcano Plots, Heatmaps, MA Plots)

### Volcano plot

```r
library(ggplot2)
library(ggrepel)

res_df <- as.data.frame(res)
res_df$gene <- rownames(res_df)
res_df$significance <- ifelse(res_df$padj < 0.05 & abs(res_df$log2FoldChange) > 1,
                              ifelse(res_df$log2FoldChange > 0, "Up", "Down"), "NS")

ggplot(res_df, aes(x = log2FoldChange, y = -log10(pvalue), colour = significance)) +
  geom_point(alpha = 0.6, size = 1.5) +
  scale_colour_manual(values = c("Up" = "red", "Down" = "blue", "NS" = "grey70")) +
  geom_hline(yintercept = -log10(0.05), linetype = "dashed", colour = "grey40") +
  geom_vline(xintercept = c(-1, 1), linetype = "dashed", colour = "grey40") +
  geom_text_repel(data = subset(res_df, padj < 1e-10),
                  aes(label = gene), size = 3, max.overlaps = 20) +
  labs(x = expression(log[2]~"Fold Change"), y = expression(-log[10]~"p-value")) +
  theme_classic(base_size = 12) +
  theme(legend.position = "top")
```

### MA plot

```r
plotMA(res, ylim = c(-5, 5), main = "MA Plot: Treated vs Control")
```

### Heatmap of top DE genes

```r
library(pheatmap)

# Get top 50 genes by adjusted p-value
top_genes <- head(order(res$padj), 50)
mat <- assay(vsd)[top_genes, ]
mat <- mat - rowMeans(mat)  # centre by row (z-score-like)

# Annotation for columns
annotation_col <- data.frame(
  Condition = colData(dds)$condition,
  row.names = colnames(mat)
)

pheatmap(mat,
         annotation_col = annotation_col,
         cluster_rows = TRUE,
         cluster_cols = TRUE,
         show_rownames = TRUE,
         fontsize_row = 7,
         color = colorRampPalette(c("#2166AC", "white", "#B2182B"))(100),
         scale = "row",
         main = "Top 50 Differentially Expressed Genes")
```

### PCA plot

```r
vsd <- vst(dds, blind = FALSE)
pcaData <- plotPCA(vsd, intgroup = "condition", returnData = TRUE)

ggplot(pcaData, aes(x = PC1, y = PC2, colour = condition)) +
  geom_point(size = 4) +
  labs(x = paste0("PC1: ", round(attr(pcaData, "percentVar")[1] * 100), "% variance"),
       y = paste0("PC2: ", round(attr(pcaData, "percentVar")[2] * 100), "% variance")) +
  theme_classic(base_size = 12)
```

---

## 36. Image Analysis with EBImage and imager

For basic image analysis in R. For serious microscopy work, use FIJI/ImageJ or CellProfiler and import results into R.

### EBImage (Bioconductor)

```r
library(EBImage)

# Read an image
img <- readImage("cells.tif")
display(img, method = "raster")

# Basic operations
dim(img)                           # dimensions
img_grey <- channel(img, "grey")   # convert to greyscale
img_smooth <- gblur(img_grey, sigma = 2)  # Gaussian blur

# Threshold and segment
threshold <- otsu(img_grey)
mask <- img_grey > threshold
mask <- fillHull(mask)
mask <- bwlabel(mask)              # label connected components

# Measure objects
features <- computeFeatures.shape(mask)
features_int <- computeFeatures.moment(mask, img_grey)
```

### imager (CRAN)

```r
library(imager)

img <- load.image("cells.tif")
plot(img)

# Operations
img_grey <- grayscale(img)
img_blur <- isoblur(img_grey, sigma = 3)
img_thresh <- threshold(img_blur)
plot(img_thresh)
```

---

## 37. R Markdown and Quarto

### R Markdown

R Markdown combines prose (Markdown), code (R), and output (figures, tables) into a single reproducible document. Output formats include HTML, PDF, and Word.

```markdown
---
title: "PIEZO1 Calcium Imaging Analysis"
author: "George Dickinson"
date: "`r Sys.Date()`"
output: html_document
---

## Introduction

This analysis examines calcium responses in PIEZO1-expressing cells.

```{r load-data}
library(tidyverse)
df <- read_csv("data/calcium_traces.csv")
```

## Results

```{r summary-stats}
df |>
  group_by(condition) |>
  summarise(mean_dff = mean(dff), sem = sd(dff) / sqrt(n()))
```

```{r figure-1, fig.width=8, fig.height=4, fig.cap="dF/F traces by condition"}
ggplot(df, aes(x = time, y = dff, colour = condition)) +
  geom_line() +
  theme_classic()
```
```

Click **Knit** (Ctrl+Shift+K) in RStudio to render the document.

### Quarto

Quarto is the next-generation version of R Markdown, supporting R, Python, Julia, and Observable. It is now the recommended format.

```markdown
---
title: "PIEZO1 Analysis"
author: "George Dickinson"
format: html
---

```{r}
#| label: load-data
#| message: false
library(tidyverse)
df <- read_csv("data/traces.csv")
```
```

Render with: **Ctrl+Shift+K** or `quarto render document.qmd` from the terminal.

---

## 38. R Projects and Version Control

### RStudio Projects

An RStudio Project ties a working directory, workspace, and settings into a single `.Rproj` file. This is the foundation of reproducible analysis.

**To create:** File → New Project → New Directory → New Project

Benefits:
- The working directory is always set to the project folder
- You can switch between projects without conflicts
- RStudio restores open files and settings when you reopen a project
- Plays well with Git version control

### Recommended project structure

```
my_experiment/
├── my_experiment.Rproj     # RStudio project file
├── data/
│   ├── raw/                # untouched original data
│   └── processed/          # cleaned/transformed data
├── scripts/
│   ├── 01_import.R
│   ├── 02_clean.R
│   ├── 03_analyse.R
│   └── 04_figures.R
├── results/
│   ├── figures/
│   └── tables/
├── reports/
│   └── analysis_report.qmd
└── README.md
```

### Git integration

RStudio has built-in Git support. To set up:

1. Install Git (https://git-scm.com/)
2. In RStudio: Tools → Global Options → Git/SVN → set the path to Git
3. When creating a project: check "Create a git repository"
4. Use the Git pane (top-right) to stage, commit, push, and pull

---

## 39. R vs. Python: When to Use Which

| Consideration | R | Python |
|---|---|---|
| **Statistics** | Designed for statistics. Every test is built-in or a package away. | scipy.stats, statsmodels — capable but less integrated. |
| **Bioinformatics** | Bioconductor is the gold standard (DESeq2, edgeR, etc.) | Scanpy for single-cell; less mature for bulk RNA-Seq |
| **Plotting** | ggplot2 is arguably the best scientific plotting system | matplotlib + seaborn — flexible but more verbose |
| **Data wrangling** | dplyr/tidyr — elegant and consistent | pandas — equally powerful, different syntax |
| **Machine learning** | caret, tidymodels | scikit-learn, PyTorch, TensorFlow (larger ecosystem) |
| **Image analysis** | EBImage (limited) | scikit-image, OpenCV, napari (much stronger) |
| **Microscopy** | Not its strength | PyImageJ, FLIKA, napari |
| **General programming** | Designed for data analysis, not general computing | General-purpose language for any task |
| **Speed** | Vectorised R is fast; loops are slow | NumPy equally fast; Python loops faster than R loops |
| **Community** | Strong in academia, biostatistics, clinical trials | Dominant in industry, ML, software engineering |
| **IDE** | RStudio is excellent | VS Code, Jupyter, Spyder, Positron |
| **Reproducibility** | R Markdown / Quarto | Jupyter notebooks / Quarto |
| **Cost** | Free | Free |

**Recommendation:** Use R for statistical analysis, RNA-Seq, and publication figures. Use Python for image analysis, deep learning, and general automation. Many researchers use both — R for stats and plotting, Python for everything else.

---

## 40. Common Errors and Troubleshooting

### "could not find function"

**Cause:** The package containing the function is not loaded.
**Fix:** Run `library(package_name)` first. If not installed, run `install.packages("package_name")`.

### "object not found"

**Cause:** The variable does not exist, or you misspelled it.
**Fix:** Check the Environment pane. R is case-sensitive (`Data` ≠ `data`).

### "unexpected symbol" or "unexpected string constant"

**Cause:** Syntax error — usually a missing comma, bracket, or quote.
**Fix:** Check the line indicated by the error. Look for unclosed parentheses or missing commas.

### "non-numeric argument to binary operator"

**Cause:** Trying arithmetic on a character or factor column.
**Fix:** Convert with `as.numeric()`. Check `class(your_variable)`.

### "package is not available for this version of R"

**Cause:** The package requires a newer R version, or it has been removed from CRAN.
**Fix:** Update R to the latest version. For Bioconductor packages, use `BiocManager::install()`.

### ggplot2 shows an empty plot

**Cause:** Common mistakes — forgetting to add a geom, or mapping aesthetics inside `ggplot()` but not using `+` correctly.
**Fix:** Ensure you have at least one `geom_*()` layer. Check that `+` (not `|>`) connects ggplot layers.

### "cannot allocate vector of size X Gb"

**Cause:** The dataset is too large for available RAM.
**Fix:** Filter data before loading. Use `data.table` instead of `data.frame` for large datasets. Consider using R on a computing cluster.

### "there is no package called 'X'" after upgrading R

**Cause:** R major version upgrades (e.g., 4.4 → 4.5) use a new library directory.
**Fix:** Reinstall your packages: `install.packages(old_packages)`.

---

## 41. Quick Reference: Essential Functions

### Data wrangling (dplyr/tidyr)

| Function | Description |
|---|---|
| `filter()` | Keep rows matching conditions |
| `select()` | Keep or drop columns |
| `mutate()` | Add or modify columns |
| `summarise()` | Reduce to summary statistics |
| `group_by()` | Group data for per-group operations |
| `arrange()` | Sort rows |
| `count()` | Frequency counts |
| `pivot_longer()` | Wide → long |
| `pivot_wider()` | Long → wide |
| `left_join()` | Merge tables |
| `bind_rows()` | Stack data frames |
| `distinct()` | Unique rows |
| `rename()` | Rename columns |
| `case_when()` | Vectorised multi-condition if |

### Statistics

| Function | Description |
|---|---|
| `t.test()` | t-test (one-sample, two-sample, paired) |
| `wilcox.test()` | Wilcoxon rank-sum / signed-rank test |
| `aov()` | ANOVA |
| `TukeyHSD()` | Post-hoc after ANOVA |
| `kruskal.test()` | Kruskal-Wallis test |
| `cor.test()` | Correlation test |
| `lm()` | Linear regression |
| `nls()` | Nonlinear least-squares fitting |
| `glm()` | Generalised linear model |
| `lmer()` | Linear mixed-effects model (lme4) |
| `chisq.test()` | Chi-squared test |
| `fisher.test()` | Fisher's exact test |
| `shapiro.test()` | Shapiro-Wilk normality test |
| `p.adjust()` | Multiple testing correction |

### Plotting (ggplot2)

| Function | Description |
|---|---|
| `ggplot()` | Initialise a plot |
| `aes()` | Map variables to aesthetics |
| `geom_point()` | Scatter plot |
| `geom_line()` | Line plot |
| `geom_col()` | Bar chart |
| `geom_boxplot()` | Box plot |
| `geom_violin()` | Violin plot |
| `geom_histogram()` | Histogram |
| `geom_errorbar()` | Error bars |
| `geom_smooth()` | Trend line |
| `facet_wrap()` | Multi-panel by one variable |
| `scale_*_manual()` | Custom colours/shapes |
| `theme_classic()` | Clean theme |
| `labs()` | Axis labels and title |
| `ggsave()` | Save figure to file |

### I/O

| Function | Description |
|---|---|
| `read_csv()` | Read CSV (readr) |
| `read_excel()` | Read Excel (readxl) |
| `write_csv()` | Write CSV |
| `saveRDS()` / `readRDS()` | Save/load single R object |
| `save()` / `load()` | Save/load multiple objects |
| `list.files()` | List files in a directory |

### Bioconductor essentials

| Function | Description |
|---|---|
| `DESeqDataSetFromMatrix()` | Create DESeq2 input |
| `DESeq()` | Run differential expression analysis |
| `results()` | Extract DESeq2 results |
| `vst()` | Variance-stabilising transformation |
| `plotPCA()` | PCA plot of samples |
| `enrichGO()` | GO enrichment analysis |
| `enrichKEGG()` | KEGG pathway enrichment |
| `gseGO()` | Gene Set Enrichment Analysis |
| `filterByExpr()` | Filter low-count genes (edgeR) |
| `calcNormFactors()` | TMM normalisation (edgeR) |
| `voom()` | Variance modelling (limma) |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using R and RStudio for statistical analysis, bioinformatics, and data visualisation. For questions or suggestions, contact george.dickinson@gmail.com.*

*R is free software and comes with ABSOLUTELY NO WARRANTY. R is a collaborative project with many contributors. Type `contributors()` for more information.*
