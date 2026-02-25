# OriginPro Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is OriginPro?](#1-introduction-what-is-originpro)
2. [Licensing, Installation, and First Launch](#2-licensing-installation-and-first-launch)
3. [The Origin Interface](#3-the-origin-interface)
4. [Projects, Folders, and File Management](#4-projects-folders-and-file-management)

**Part II: The Worksheet — Your Data Home**

5. [Worksheets: Structure and Data Types](#5-worksheets-structure-and-data-types)
6. [Importing Data](#6-importing-data)
7. [Column Operations and Set Column Values](#7-column-operations-and-set-column-values)
8. [Data Cleaning: Masking, Filtering, and Missing Values](#8-data-cleaning-masking-filtering-and-missing-values)

**Part III: Graphing — From Data to Publication Figures**

9. [Creating Your First Graph](#9-creating-your-first-graph)
10. [Graph Anatomy: Pages, Layers, and Plots](#10-graph-anatomy-pages-layers-and-plots)
11. [Customising Axes, Ticks, and Labels](#11-customising-axes-ticks-and-labels)
12. [Formatting Plots: Colours, Symbols, and Lines](#12-formatting-plots-colours-symbols-and-lines)
13. [Multi-Panel Figures and Insets](#13-multi-panel-figures-and-insets)
14. [Graph Types for Biology Research](#14-graph-types-for-biology-research)
15. [Graph Templates and Themes](#15-graph-templates-and-themes)
16. [Exporting Publication-Quality Figures](#16-exporting-publication-quality-figures)

**Part IV: Statistical Analysis**

17. [Descriptive Statistics](#17-descriptive-statistics)
18. [Hypothesis Testing: t-Tests, ANOVA, and Non-Parametric Tests](#18-hypothesis-testing-t-tests-anova-and-non-parametric-tests)
19. [Correlation and Linear Regression](#19-correlation-and-linear-regression)
20. [Survival Analysis (OriginPro)](#20-survival-analysis-originpro)

**Part V: Curve Fitting**

21. [Linear and Polynomial Fitting](#21-linear-and-polynomial-fitting)
22. [Nonlinear Curve Fitting (NLFit)](#22-nonlinear-curve-fitting-nlfit)
23. [User-Defined Fitting Functions](#23-user-defined-fitting-functions)
24. [Global Fitting and Fit Comparison](#24-global-fitting-and-fit-comparison)
25. [Peak Analysis and Peak Fitting (OriginPro)](#25-peak-analysis-and-peak-fitting-originpro)

**Part VI: Signal and Image Processing**

26. [Smoothing and Filtering](#26-smoothing-and-filtering)
27. [FFT and Spectral Analysis](#27-fft-and-spectral-analysis)
28. [Baseline Correction](#28-baseline-correction)
29. [Image Processing in Origin](#29-image-processing-in-origin)

**Part VII: Automation and Batch Processing**

30. [Analysis Templates: The No-Code Approach](#30-analysis-templates-the-no-code-approach)
31. [Batch Processing with Analysis Templates](#31-batch-processing-with-analysis-templates)
32. [LabTalk Scripting Essentials](#32-labtalk-scripting-essentials)
33. [Python in Origin](#33-python-in-origin)

**Part VIII: Practical Workflows**

34. [Workflow: Dose-Response Curve](#34-workflow-dose-response-curve)
35. [Workflow: Time-Course Fluorescence Traces with dF/F](#35-workflow-time-course-fluorescence-traces-with-dff)
36. [Workflow: Bar Chart with Individual Data Points and Statistics](#36-workflow-bar-chart-with-individual-data-points-and-statistics)
37. [Workflow: Multi-Panel Publication Figure](#37-workflow-multi-panel-publication-figure)

**Appendices**

38. [Origin vs. OriginPro: Feature Comparison](#38-origin-vs-originpro-feature-comparison)
39. [Keyboard Shortcuts Quick Reference](#39-keyboard-shortcuts-quick-reference)
40. [Common Problems and Solutions](#40-common-problems-and-solutions)
41. [Quick Reference: Essential Menu Paths](#41-quick-reference-essential-menu-paths)

---

## 1. Introduction: What is OriginPro?

### Overview

Origin is a proprietary data analysis and graphing application developed by **OriginLab Corporation**, founded in 1992 and based in Northampton, Massachusetts. It is one of the most widely used graphing tools in the physical and life sciences, with over one million registered users across corporations, universities, and government laboratories.

> **Version note:** This manual was developed around **OriginPro 2020 (64-bit), SR1 build 9.9.0.225**, the version used for all statistical analyses and figure preparation in Bertaccini et al. 2025 (*Nature Communications*). That study used PIEZO1-HaloTag hiPSC imaging to examine mechanosensitive channel organization, with all p-value calculations, effect size measurements, and publication figures produced in this build. Menu paths and dialog options described here reflect OriginPro 2020; later versions may rearrange some menus but retain the same functionality.

Origin was originally developed as companion software for isothermal titration calorimeters manufactured by MicroCal (later acquired by Malvern Instruments). The software was designed to graph instrument data and perform nonlinear curve fitting. OriginLab spun off from MicroCal and has developed Origin into a general-purpose scientific graphing and analysis platform.

**Origin** and **OriginPro** are two editions. Origin includes core graphing and analysis. OriginPro includes all features of Origin plus extended tools for peak fitting, surface fitting, advanced statistics (survival analysis, power analysis, ROC curves), short-time FFT, image processing, and batch peak analysis. This manual covers both, with OriginPro-only features clearly marked.

### Why Origin for biology research?

| Strength | What it means for you |
|---|---|
| **Publication-quality graphs** | Over 100 graph types with fine-grained control. Journals frequently accept Origin-produced figures without modification. For example, all figures in Bertaccini et al. 2025 (*Nature Communications*) — puncta density plots, fluorescence intensity distributions, electrophysiology bar charts, and MSD curves — were produced entirely in OriginPro. |
| **Point-and-click workflow** | Most analysis and graphing requires no programming. Ideal for researchers who prefer a GUI. |
| **Nonlinear curve fitting** | 200+ built-in fitting functions. Define custom functions. Levenberg-Marquardt and Simplex algorithms. |
| **Analysis Templates** | Record a sequence of operations (import → process → fit → plot) and replay it on new data — batch processing without code. |
| **Auto-recalculation** | Change data or parameters and all downstream results (fits, graphs, statistics) update automatically. |
| **Peak analysis** | Dedicated Peak Analyzer wizard for baseline subtraction, peak finding, and multi-peak fitting (OriginPro). |
| **Export flexibility** | Vector formats (EPS, SVG, PDF, EMF) and raster formats (TIFF, PNG) with precise control over size and resolution. |
| **LabTalk and Python scripting** | For automation beyond the GUI, Origin supports LabTalk (its native scripting language), Python (fully integrated since 2021), and Origin C. |

### Limitations to be aware of

| Limitation | Detail |
|---|---|
| **Windows only** | Origin runs only on Microsoft Windows. macOS and Linux are not supported. Mac users can run Origin through Parallels, VMware, or Boot Camp. |
| **Cost** | Requires a paid licence. Academic individual OriginPro: ~$255/year or ~$850 perpetual. Student: ~$69/year. Many universities have site licences. |
| **Proprietary project format** | Origin project files (.opju) can only be opened in Origin. The free **Origin Viewer** can display but not edit them. |
| **Not a programming language** | Origin is a graphing and analysis application, not a general-purpose programming language like Python or MATLAB. For complex custom algorithms, Origin can call Python. |
| **Image analysis is limited** | Origin has basic image processing (OriginPro), but it is not a substitute for ImageJ/FIJI or CellProfiler for serious microscopy image analysis. |

### Resources

| Resource | URL |
|---|---|
| OriginLab documentation | https://www.originlab.com/doc/ |
| Video tutorials | https://www.originlab.com/videos/ |
| Origin Forum | https://www.originlab.com/forum/ |
| Graph Gallery (examples) | https://www.originlab.com/graphgallery/ |
| App Center | https://www.originlab.com/fileExchange/ |
| Learning Center (built-in) | Help → Learning Center (inside Origin) |

---

## 2. Licensing, Installation, and First Launch

### Licence types and pricing

| Licence type | Approximate cost (US) | Notes |
|---|---|---|
| **Academic Individual (OriginPro)** | ~$255/year or ~$850 perpetual | For faculty, post-docs, and staff at degree-granting institutions |
| **Student** | ~$69/year or ~$29.95 for 6 months | Requires valid student ID. Personal use only. |
| **Campus/Site licence** | Varies | Many universities (including UC Irvine, CU Boulder, UIUC) provide free access. **Check with your IT department first.** |
| **Commercial Individual** | ~$435+/year or ~$1,525+ perpetual | For corporate/government use |
| **Free trial** | 21 days (with trial licence) or 3 days (without) | Download from https://www.originlab.com/try |

**Recommendation:** Before purchasing, check whether your institution already has a site licence. Many do.

### Installation

1. Download the installer from https://www.originlab.com/try (trial) or your institution's software portal
2. Run the installer — Origin is Windows-only and requires approximately 2 GB of disk space
3. During installation, enter your licence serial number when prompted
4. Launch Origin and register with your OriginLab account (create one at https://www.originlab.com if needed)

### First launch: the Learning Center

On first launch, Origin opens the **Learning Center** (also accessible from **Help → Learning Center**). This is an excellent starting point — it provides categorised samples for every graph type and analysis tool. You can open a sample, inspect how it was built, and modify it with your own data.

The **Start Dialog** also appears at startup, offering quick access to recent files, templates, and new project creation.

---

## 3. The Origin Interface

### Main interface components

**Menu Bar** — Standard menus: File, Edit, View, Plot, Column, Worksheet, Analysis, Statistics, LabTalk (or Python), Tools, Format, Window, Help. Most actions are accessible from these menus.

**Toolbars** — Customisable toolbars beneath the menu bar provide one-click access to common actions. Key toolbars include Standard, Graph, Column, and Worksheet toolbars.

**Project Explorer** — The left panel. Displays the hierarchical structure of your project: folders, workbooks, graphs, matrices, notes. Right-click items to rename, move, or delete. Organise your project into folders for clarity (e.g., "Raw Data", "Processed", "Figures").

**Workbook** — The central workspace for data. Each workbook contains one or more **worksheets** (tabs at the bottom). Each worksheet is a spreadsheet of rows and columns. This is where your numerical data lives.

**Graph Window** — Each graph is a separate window. Double-click any element (axis, label, data point, legend) to edit it. The **Mini Toolbar** (floating toolbar that appears when you click a graph element) provides quick formatting access.

**Matrix Window** — A 2D grid for image data or Z-values used in contour/surface plots.

**Notes Window** — For free-form text, Markdown, HTML, or LaTeX. Useful for documenting analysis steps.

**Command Window / Script Window** — Access via **Window → Command Window** (Ctrl+Shift+O for Script Window). Execute LabTalk commands interactively.

**Messages Log** — Displays output from scripts and operations. View → Message Log.

### Mini Toolbars

A key feature of modern Origin. When you click on any element of a graph or worksheet, a small floating toolbar appears with the most relevant formatting options for that element. For example, clicking on a data plot shows options for symbol type, size, colour, and line style. This makes formatting much faster than navigating through menus or dialog boxes.

---

## 4. Projects, Folders, and File Management

### The Origin project

Everything in Origin lives inside a **project file** (`.opju`). A single project can contain hundreds of workbooks, graphs, matrices, notes, and analysis results. This is fundamentally different from applications like Excel where each file is independent.

```
My_Experiment.opju
├── Raw Data/
│   ├── Workbook: Control_Data
│   ├── Workbook: Drug_A_Data
│   └── Workbook: Drug_B_Data
├── Analysis/
│   ├── Graph: Dose_Response_Curve
│   ├── Workbook: Fit_Results
│   └── Workbook: Statistics_Summary
└── Figures/
    ├── Graph: Figure_1_Traces
    ├── Graph: Figure_2_BarChart
    └── Graph: Figure_3_DoseResponse
```

### Key file operations

| Action | Method |
|---|---|
| **New project** | File → New → Project (Ctrl+N) |
| **Save project** | File → Save Project (Ctrl+S). Saves everything. |
| **Save as template** | File → Save Workbook as Analysis Template |
| **Open recent** | File → Recent Projects |
| **Import** | Data → Connect to File, or File → Import |
| **Export graph** | File → Export Graph (while a graph window is active) |
| **Export worksheet** | File → Export → ASCII / Excel |

### Organising with folders

Use the **Project Explorer** (left panel) to create folders:

1. Right-click in Project Explorer → New Folder
2. Name it descriptively (e.g., "TIRF_Traces", "Statistics", "Figures")
3. Drag workbooks and graphs into appropriate folders

A well-organised project makes it easy to find data months later and to share work with colleagues.

---

## 5. Worksheets: Structure and Data Types

### Worksheet anatomy

Each worksheet is a grid of rows and columns. Columns have special properties:

**Column designations** — Each column has a designation that tells Origin how to use it in plots:

| Designation | Letter | Meaning |
|---|---|---|
| **X** | X | Independent variable (horizontal axis) |
| **Y** | Y | Dependent variable (vertical axis) — the default for new columns |
| **Z** | Z | Z-values for 3D plots or contours |
| **Y Error** | yEr | Error bars (±) for the Y column to its left |
| **X Error** | xEr | Error bars (±) for X |
| **Label** | L | Text labels for data points |
| **Disregard** | D | Column is ignored during plotting |
| **Group** | G | Grouping variable for categorical data |
| **Subject** | S | Subject identifier for repeated-measures designs |

To change a column designation: right-click the column header → Set As → choose designation.

**Column header rows** — Above the data, each column has header rows:

| Row | Content | Example |
|---|---|---|
| **Long Name** | Descriptive name | "Mean Intensity" |
| **Units** | Physical units | "AU" or "µm" |
| **Comments** | Free-form notes | "Background subtracted" |
| **Short Name** | Internal reference (A, B, C...) | Automatically assigned |
| **F(x)=** | Column formula | `col(B) / col(A)` |

### Data types

Each column can hold one data type:

| Type | Use for | Set via |
|---|---|---|
| **Numeric (Double 8)** | Floating-point numbers (default) | Right-click header → Properties → Format: Numeric |
| **Text** | Labels, conditions, filenames | Format: Text |
| **Text & Numeric** | Mixed content | Format: Text & Numeric |
| **Date** | Dates | Format: Date |
| **Time** | Time stamps | Format: Time |
| **Month / Day of Week** | Categorical time | Format: Month / Day of Week |

### Adding and managing columns

| Action | Method |
|---|---|
| **Add column** | Right-click column header → Insert (before) or Add New Column. Or: Column menu → Add New Columns. |
| **Delete column** | Right-click → Delete |
| **Move column** | Right-click → Move Column → Left/Right/First/Last |
| **Rename** | Double-click the Long Name row |
| **Set units** | Double-click the Units row |
| **Fill with row numbers** | Right-click → Fill Column With → Row Numbers |
| **Fill with random** | Right-click → Fill Column With → Uniform Random / Normal Random |

---

## 6. Importing Data

### Data Connectors (recommended, modern approach)

Data Connectors are the preferred import method since Origin 2019. They create a live link between the worksheet and the source file. If the source file changes, you can re-import with a single click.

**To use a Data Connector:**
1. Select **Data → Connect to File** (or click the Connector icon in the toolbar)
2. Choose the file type: CSV, Excel, MATLAB, Origin, TDMS, JSON, HDF5, and many more
3. Browse to your file and click Open
4. Configure import options (delimiter, header rows, selected columns)
5. Click OK — data appears in the worksheet

The green Connector icon in the top-left corner of the workbook indicates an active connection. Right-click it to re-import, disconnect, or change settings.

### Supported import formats

| Category | Formats |
|---|---|
| **Text** | CSV, TXT, DAT (ASCII), tab-delimited, fixed-width |
| **Spreadsheet** | Excel (.xlsx, .xls), Google Sheets (via connector) |
| **Scientific** | MATLAB (.mat), HDF5, NetCDF, NIfTI, TDMS, pClamp (ABF) |
| **Image** | TIFF, BMP, PNG, JPEG, GIF (imported into a Matrix) |
| **Instrument** | Perkin Elmer, Thermo, JCAMP-DX, SPC, XRDML, and many more via Apps |

### Importing ASCII/CSV files

**Method 1: Data Connector (recommended)**

Data → Connect to File → Text/CSV → select file → OK

**Method 2: Drag and drop**

Simply drag a CSV or TXT file from Windows Explorer into an open workbook.

**Method 3: Classic import**

File → Import → Single ASCII → select file → configure options → OK

### Importing from the clipboard

1. Select data in Excel, a text file, or any table
2. Copy (Ctrl+C)
3. Click on the destination cell in Origin's worksheet
4. Paste (Ctrl+V)

Origin will attempt to parse the clipboard contents and place them in columns. For complex pastes, use Edit → Paste Special for more control.

### Importing images (into a Matrix)

Images in Origin live in **Matrix** windows, not worksheets:

1. File → Import → Image to Matrix
2. Select the image file (TIFF, PNG, JPEG, etc.)
3. The image appears as a matrix of pixel values

For TIRF or microscopy images, you typically do analysis in FIJI or MATLAB and import the resulting numerical data (traces, measurements) into Origin for graphing and statistics.

---

## 7. Column Operations and Set Column Values

### The Set Column Values dialog

This is Origin's most powerful tool for data transformation. It lets you write formulas that operate on entire columns at once — similar to Excel formulas but much more powerful.

**To open:** Right-click a column header → Set Column Values, or press **Ctrl+Q** with a column selected.

The dialog provides:

- **Formula box** — Enter your expression. Reference other columns with `col(A)`, `col(B)`, etc., or by Long Name: `col("Mean Intensity")`
- **Before Formula Scripts** — LabTalk code that runs before the formula (e.g., define variables)
- **Functions menu** — Browse available mathematical, statistical, and string functions
- **Column references** — Click to insert column references

### Common formulas

```
// Basic arithmetic
col(C) = col(B) / col(A);

// dF/F calculation (baseline from first 50 rows)
col(C) = (col(B) - mean(col(B)[1:50])) / mean(col(B)[1:50]);

// Normalise to maximum
col(C) = col(B) / max(col(B));

// Normalise to range [0, 1]
col(C) = (col(B) - min(col(B))) / (max(col(B)) - min(col(B)));

// Log transform
col(C) = ln(col(B));       // natural log
col(C) = log(col(B));      // log base 10

// Convert pixel coordinates to micrometres
col(C) = col(A) * 0.107;   // pixel_size = 0.107 µm

// Time from frame number (at 50 Hz)
col(A) = (i - 1) / 50;     // 'i' is the row index (1-based)

// Conditional: classify intensity
col(C) = (col(B) > 1000) ? "Bright" : "Dim";

// Correct for background (mean of a background column)
col(D) = col(B) - mean(col(C));

// Running average (5-point)
col(D) = mean(col(B)[i-2:i+2]);
```

### The row index variable `i`

In Set Column Values, `i` represents the current row number (1-based). This is useful for generating sequences:

```
// Row numbers starting from 0
col(A) = i - 1;

// Time axis at 20 ms intervals
col(A) = (i - 1) * 0.020;

// Sine wave
col(B) = sin(2 * pi * 0.5 * col(A));
```

### Column statistics in formulas

You can use statistical functions directly in column formulas:

| Function | Description | Example |
|---|---|---|
| `mean(col(A))` | Arithmetic mean | Baseline correction |
| `median(col(A))` | Median | Robust baseline |
| `std(col(A))` | Standard deviation | Noise estimate |
| `min(col(A))`, `max(col(A))` | Extremes | Normalisation |
| `sum(col(A))` | Sum | Integration |
| `total(col(A))` | Count of non-empty cells | N for statistics |
| `mean(col(A)[1:50])` | Mean of rows 1-50 | Baseline from first 50 frames |

---

## 8. Data Cleaning: Masking, Filtering, and Missing Values

### Masking data points

Masking temporarily hides data points from analysis and graphs without deleting them. Masked points appear as a different colour (red by default) and are excluded from fits and statistics.

**To mask manually:**
1. Select cells or data points in a graph
2. Right-click → Set As → Masked (or click the Mask icon in the toolbar)

**To mask by condition:**
1. Worksheet → Worksheet Data Operations → Mask by Condition
2. Enter a condition (e.g., `x > 10000` to mask outliers)

**To unmask:** Select masked cells → right-click → Set As → Unmasked

### Filtering rows

Filters let you show/hide rows based on conditions without removing data:

1. Click the column header of the column to filter
2. Column → Add/Remove Data Filter
3. A filter icon appears in the column header — click it to set conditions
4. Filtered rows are hidden from view and from all plots that reference this worksheet

### Missing values

Origin represents missing values as `--` in the worksheet (internally stored as a special NaN-like value). Missing values are automatically excluded from calculations, fits, and plots.

To set a cell as missing: select the cell → press Delete, or type `--`.

To find and handle missing values:
- Worksheet → Worksheet Data Operations → Find and Replace (search for `--`)
- Use **interpolation** to fill gaps: Analysis → Mathematics → Interpolate/Extrapolate

---

## 9. Creating Your First Graph

### Quick start: select and plot

1. Enter or import data into a worksheet. Ensure the X column is designated as X and the Y column(s) as Y.
2. Select the Y column(s) you want to plot (click the column header, or select multiple with Ctrl+click)
3. Choose a plot type from the **Plot** menu or the toolbar:
   - **Plot → Line** for time traces
   - **Plot → Scatter** for individual measurements
   - **Plot → Line + Symbol** for both
   - **Plot → Column/Bar** for bar charts
4. A graph window opens with your data plotted

### Plot from the Plot menu

The Plot menu is organised into categories:

| Category | Graph types |
|---|---|
| **Line** | Line, Line + Symbol, Horizontal Step |
| **Scatter** | Scatter, Y Error, XY Error, Bubble |
| **Line + Symbol** | Line + Symbol, 3-Point Segment |
| **Column/Bar** | Column, Bar, Grouped Column, Stacked Column, Floating Bar |
| **Pie** | Pie, Doughnut |
| **Area** | Area, Stacked Area, Fill Area |
| **Box** | Box Plot, Violin, Ridgeline, Grouped Box |
| **Histogram** | Histogram, Histogram + Probabilities, Marginal Box |
| **Contour** | Contour, Heatmap, Polar Contour |
| **3D** | 3D Surface, 3D Bar, 3D Scatter, 3D Waterfall |
| **Statistical** | Bland-Altman, Kaplan-Meier, ROC, Forest Plot, QQ Plot |
| **Specialised** | Windrose, Ternary, Smith Chart, Parallel Coordinates |

### The Graph Wizard

For more control over the initial plot setup, use **Plot → Graph Wizard** (or the Graph Wizard button in the toolbar). The wizard walks you through selecting data, choosing the graph type, and configuring options before creating the graph.

---

## 10. Graph Anatomy: Pages, Layers, and Plots

Understanding Origin's three-level graph hierarchy is essential:

### Page

The **page** is the entire graph window — the canvas. It has a background colour and a fixed size (set in Format → Page Properties or by right-clicking the white space). The page size determines the physical dimensions of your exported figure.

Typical page sizes:
- Single-column journal figure: 8.5 cm × 8.5 cm (or 3.35 in)
- Double-column journal figure: 17 cm × 8.5 cm (or 6.7 in × 3.35 in)
- Full-page figure: 17 cm × 22 cm
- Presentation slide: 25.4 cm × 19.05 cm (10 in × 7.5 in)

### Layer

A **layer** is a set of axes (X and Y, possibly with secondary axes) that holds one or more data plots. A single page can contain multiple layers for:

- **Multi-panel figures** (e.g., four traces stacked vertically, each with its own Y-axis)
- **Insets** (a small zoomed-in region embedded in the main graph)
- **Dual Y-axis plots** (two Y-axes sharing one X-axis)

Each layer is numbered (Layer 1, Layer 2, etc.) and can be selected by clicking its icon in the top-left corner of the graph window.

To add layers: Graph → New Layer → choose type (Linked Top X, Linked Right Y, Inset, etc.)

### Plot

A **plot** is a single data series within a layer. A layer can contain multiple plots (e.g., control and treated traces overlaid in the same axes). Each plot has its own formatting (line style, colour, symbol shape).

### The hierarchy

```
Graph Page (one window)
├── Layer 1 (left Y-axis, bottom X-axis)
│   ├── Plot 1: Control trace (blue line)
│   └── Plot 2: Treated trace (red line)
├── Layer 2 (right Y-axis — dual Y)
│   └── Plot 3: Temperature (grey dashed)
└── Layer 3 (inset — zoomed region)
    └── Plot 4: Zoomed control trace
```

---

## 11. Customising Axes, Ticks, and Labels

### Accessing axis settings

Double-click any axis to open the **Axis Dialog** (or right-click an axis → Axis Properties). This dialog has tabs for:

- **Scale** — range (From, To), type (Linear, Log10, Log2, Reciprocal), increment
- **Grid Lines** — major and minor grid lines, style, colour
- **Tick Labels** — font, size, format (decimal places, scientific notation), rotation
- **Title** — axis title text, font, size, position
- **Minor Ticks / Major Ticks** — tick direction (In, Out, In & Out), length, count

### Common axis adjustments

| Task | How |
|---|---|
| **Set axis range** | Double-click axis → Scale tab → From/To |
| **Set to log scale** | Scale tab → Type: Log10 |
| **Change tick increment** | Scale tab → Increment: enter value |
| **Format tick labels** | Tick Labels tab → Format, Decimal Places |
| **Rotate tick labels** | Tick Labels tab → Rotation: 45° (useful for category labels) |
| **Add axis title** | Title tab → enter text. Use `\i(text)` for italic, `\b(text)` for bold. |
| **Greek letters** | In any text field, type `\g(a)` for α, `\g(b)` for β, `\g(m)` for µ, `\g(D)` for Δ |
| **Subscript / superscript** | `\-(text)` for subscript, `\+(text)` for superscript. E.g., `Ca\+(2+)` → Ca²⁺ |
| **Axis break** | Right-click axis → Axis Breaks → add a break at specified values |

### Special text formatting codes

Origin uses escape codes for rich text in axis titles, legends, and annotations:

| Code | Result | Example |
|---|---|---|
| `\b(text)` | **Bold** | `\b(Intensity)` |
| `\i(text)` | *Italic* | `\i(F/F\-(0))` |
| `\-(text)` | Subscript | `Ca\-(i)` → Caᵢ |
| `\+(text)` | Superscript | `cm\+(-2)` → cm⁻² |
| `\g(letter)` | Greek letter | `\g(l)` → λ |
| `\(num)` | Unicode character | `\(176)` → ° |
| `\n` | Line break | Multi-line labels |

---

## 12. Formatting Plots: Colours, Symbols, and Lines

### Using the Mini Toolbar

The fastest way to format plots. Click on any data plot to select it, then use the floating Mini Toolbar to change:

- Symbol shape, size, and colour
- Line style (solid, dashed, dotted) and width
- Fill pattern and colour
- Error bar style

### The Plot Details dialog

For comprehensive formatting, double-click a data plot to open **Plot Details**. This multi-tabbed dialog controls every aspect of the plot:

**Symbol tab:** Shape (circle, square, triangle, diamond, star, and 20+ more), size (in points), edge and fill colour, transparency.

**Line tab:** Style (solid, dash, dot, dash-dot, and more), width, colour, transparency, connect type (straight, spline, step).

**Fill tab:** Pattern, colour, transparency. Used for area fills, bar charts, and box plots.

**Drop Lines tab:** Vertical or horizontal lines from data points to the axes.

**Error Bar tab:** Plus/minus direction, line width, cap width, colour. Requires columns designated as Y Error.

**Color Chooser tab:** Map colours to a column of values (colormap). Useful for encoding a third variable.

**Label tab:** Show value labels next to data points.

### Colour palettes and custom colours

Origin includes many built-in colour palettes. Access via the colour drop-down in any formatting dialog:

- **Single colour:** Click the colour swatch → choose from the palette or use Custom to enter RGB/hex values
- **Colour by column:** In Plot Details → Symbol tab → Symbol Color → select "By Points" → choose a colour column or grouping column
- **Increment colour list:** When plotting multiple Y columns, Origin automatically increments colours from the active palette

To manage colour palettes: Tools → Color Manager. You can import colour palettes, create custom palettes, and set the default palette for new graphs.

---

## 13. Multi-Panel Figures and Insets

### Creating multi-panel figures

**Method 1: Merge multiple graphs**

1. Create individual graphs first
2. Select the graph windows to merge (Ctrl+click in Project Explorer)
3. Graph → Merge Graph Windows
4. Set the number of rows and columns (e.g., 2×2 for a four-panel figure)
5. Adjust spacing and alignment

**Method 2: Add layers to an existing graph**

1. Start with a graph containing Layer 1
2. Graph → New Layer → choose type:
   - **Bottom X, Left Y** — new panel at a specified position
   - **Linked Top X** — layer sharing the bottom X-axis
   - **Linked Right Y** — dual Y-axis
   - **Inset** — small layer embedded in the main plot

**Method 3: Use a multi-panel template**

Origin includes templates for common layouts. In the Graph Wizard or Plot menu, choose templates like "4-panel", "Stacked", or "Side-by-Side".

### Adding panel labels

Add text annotations (A, B, C, D) to each layer:

1. Click inside a layer to make it active
2. Click the Text tool (T) in the toolbar
3. Click in the desired position and type the label (e.g., "A")
4. Format: bold, font size ~12–14 pt

Or use **Graph → Add Panel Label** to add panel labels automatically to all layers.

### Creating insets

1. Graph → New Layer → Inset
2. Drag the inset to the desired position
3. Add data to the inset layer by dragging a column from the worksheet onto the inset, or right-click in the inset → Layer Contents → add plots
4. Adjust the inset's axis ranges to show the zoomed region

---

## 14. Graph Types for Biology Research

### Time-course traces (Line or Line + Symbol)

For fluorescence traces, calcium imaging data, or any signal over time:

1. Column A = Time (designated X)
2. Columns B, C, D... = traces for each ROI or condition (designated Y)
3. Select all Y columns → Plot → Line
4. Customise: line width ~1.5 pt, different colours per trace, legend with ROI or condition names

### Bar charts with error bars

For comparing means across conditions:

1. Prepare data with columns: Group label (text), Mean, SEM (or SD)
2. Set the Label column as X, Mean as Y, SEM as Y Error
3. Select Mean and SEM columns → Plot → Column/Bar → Column
4. Double-click the bars to adjust width, fill colour, edge colour
5. Error bars appear automatically from the Y Error column

### Scatter with regression

1. X column = predictor, Y column = response
2. Plot → Scatter
3. Analysis → Fitting → Linear Fit (or Quick Fit from the toolbar)
4. The fit line, equation, and R² appear on the graph

### Box plots and violin plots

1. Data in columns: each column is one group/condition
2. Select all columns → Plot → Box → Box Plot (or Violin)
3. Double-click to customise: show mean line, individual data points, outlier symbols, whisker type

### Dose-response curves

1. X column = concentration (often on log scale), Y column = response
2. Plot → Scatter
3. Analysis → Fitting → Nonlinear Curve Fit → choose "DoseResp" or "Hill" function category
4. Set X-axis to Log10 scale
5. The fitted sigmoidal curve appears on the graph

### Heatmaps

1. Import data into a Matrix (or use Worksheet → Convert to Matrix)
2. Plot → Contour → Heatmap
3. Customise the colour scale (double-click the colour bar)

### Research example: PIEZO1-HaloTag hiPSC data types (Bertaccini et al. 2025)

The following data types were plotted in OriginPro for a *Nature Communications* study of PIEZO1 mechanosensitive channels in human iPSC-derived cells. Each requires a slightly different graph setup:

| Data type | Units | Typical graph | Notes |
|---|---|---|---|
| **Puncta density** | puncta/um^2 | Bar + scatter overlay | One value per cell; compare WT vs. PIEZO1 KO, +/-Yoda1, +/-DMSO, EC vs. NSC |
| **Fluorescence intensity** | camera units (AU) | Histogram or box/violin | Distribution across many puncta; Gaussian fits used to characterise peaks |
| **Current amplitude** | pA | Bar + scatter overlay | Whole-cell patch-clamp; compare +/-Yoda1 conditions |
| **Path length** | um | Histogram / cumulative distribution | Single-particle tracking; compare distributions with K-S test |
| **MSD (mean squared displacement)** | um^2 | Line (mean +/- SEM vs. time lag) | One curve per condition; fit to extract diffusion coefficient |

**Puncta density bar charts with individual data points** — the most common figure type in the study. Each bar shows the mean, error bars show SEM, and every individual cell measurement is overlaid as a scatter point. See Section 36 for the full workflow. For the PIEZO1 study, comparisons such as WT vs. PIEZO1 KO or +Yoda1 vs. +DMSO are shown side-by-side with significance brackets and p-values annotated directly on the graph.

**MSD curves** — plot time lag (s) on the X-axis and MSD (um^2) on the Y-axis. Each condition (e.g., WT basal, WT + Yoda1, KO basal) is a separate plot in the same layer, shown as mean +/- SEM. The initial linear portion can be fit to extract the diffusion coefficient D = MSD / (4 * t) for 2D diffusion.

---

## 15. Graph Templates and Themes

### Graph Templates

A Graph Template saves the graph's formatting (axes, colours, fonts, layout) so you can re-use it with different data:

1. Create and format a graph exactly how you want it
2. File → Save Template As → enter a name and category
3. To use: Plot → Template Library → select your template

Templates are stored as `.otpu` files in your Origin user folder.

### Themes

A Theme saves a specific set of formatting properties that can be applied to any existing graph:

1. Format a graph to your liking
2. Right-click the graph → Save Format as Theme → name the theme
3. To apply to another graph: right-click → Apply Theme → select your theme

Themes are lighter-weight than templates — they change formatting without altering the graph's structure.

### System Theme (default formatting)

To set your preferred formatting as the default for all new graphs:

1. Format one graph perfectly
2. Tools → Theme Organizer → select your theme → Set as System Theme

All new graphs will use these defaults.

### Recommended lab standards

Create a "Lab Theme" with consistent formatting for all figures:

| Property | Recommendation |
|---|---|
| **Font** | Arial or Helvetica, 8–10 pt for tick labels, 10–12 pt for axis titles |
| **Line width** | 1–1.5 pt for data, 0.75 pt for axes |
| **Colours** | Colourblind-friendly palette (e.g., Okabe-Ito or ColorBrewer) |
| **Symbols** | 6–8 pt, filled circles as default |
| **Background** | White, no frame |
| **Legend** | No border, transparent background |

---

## 16. Exporting Publication-Quality Figures

### Choosing the right format

| Format | Type | Use case |
|---|---|---|
| **EPS** (Encapsulated PostScript) | Vector | Gold standard for journals. Editable in Illustrator. |
| **PDF** | Vector | Universally viewable. Editable in Illustrator/Inkscape. |
| **SVG** | Vector | Web and modern workflows. Editable in Inkscape/Illustrator. |
| **EMF** (Enhanced Metafile) | Vector | Best for insertion into Word/PowerPoint on Windows. |
| **TIFF** | Raster | Journals that require raster. Set ≥300 DPI. |
| **PNG** | Raster | Presentations, web. Lossless compression. Set ≥300 DPI. |

### Export steps

1. Activate the graph window (click on it)
2. File → Export Graph (Ctrl+G for the advanced dialog)
3. Choose Image Type (e.g., EPS, TIFF, PNG)
4. Set **DPI Resolution**: 300 DPI minimum for print, 600 DPI for line art
5. Set **Page Size**: "Same as Graph Page" or specify exact dimensions
6. **Raster formats:** choose colour depth (24-bit colour, 8-bit greyscale)
7. Click OK

### Key export settings

**For journal submission (typical requirements):**
- Format: TIFF or EPS
- Resolution: 300 DPI (photographs/halftones), 600 DPI (line art), 600 DPI (combination)
- Colour mode: RGB (for online) or CMYK (check journal requirements)
- Width: match journal column width (typically 8.5 cm single column, 17 cm double)

**Nature Communications specific requirements (used in Bertaccini et al. 2025):**
- Accepted formats: EPS, PDF, TIFF, or SVG (vector preferred for graphs)
- Resolution: minimum 300 DPI for halftone, 600 DPI for line art, 1000 DPI for combination
- Maximum single figure width: 180 mm (double-column); minimum: 88 mm (single-column)
- Fonts: Arial, Helvetica, or Times New Roman at 5-7 pt minimum; embed all fonts
- RGB colour mode (Nature journals do not use CMYK)
- Individual data points must be shown (not just bars with error bars) — this is an editorial requirement for transparency
- The study exported all graphs as high-resolution vector-format files from OriginPro, then assembled multi-panel figures with panel labels (a, b, c, etc. in lowercase bold) for final submission

**For editable figures (e.g., to refine in Illustrator):**
- Format: EPS or PDF
- Check "Use GDI+ Text Rendering" to keep text editable
- Uncheck "Rasterize" to preserve vector elements

**For PowerPoint:**
- Format: EMF (vector, scales perfectly) or PNG at 150–300 DPI

### Setting exact figure dimensions

To match journal specifications:

1. Right-click the graph page → Page Properties (or Format → Page)
2. Set Width and Height in cm or inches
3. Export with "Page Size: Same as Graph Page"

---

## 17. Descriptive Statistics

### Quick column statistics

Select a column → right-click → Statistics on Column. A summary appears in the Messages Log with: N, Mean, Standard Deviation, Standard Error, Minimum, Maximum, Median, and Sum.

### Detailed descriptive statistics

**Analysis → Statistics → Descriptive Statistics → Statistics on Columns**

This dialog lets you:
- Select multiple columns for analysis
- Choose which statistics to compute (N, Mean, SD, SEM, CI, Median, Skewness, Kurtosis, Percentiles)
- Output results to a new worksheet
- Group by a categorical column

Results appear in a report sheet with:

| Statistic | Abbreviation |
|---|---|
| N (count) | N |
| Mean | Mean |
| Standard Deviation | SD |
| Standard Error | SE |
| 95% Confidence Interval | LCL, UCL |
| Median | Median |
| Minimum, Maximum | Min, Max |
| Skewness, Kurtosis | Skewness, Kurtosis |
| 1st and 3rd Quartile | Q1, Q3 |

### Row statistics

For computing statistics across columns for each row (e.g., the mean of multiple replicates for each time point):

**Analysis → Statistics → Descriptive Statistics → Statistics on Rows**

Select the columns representing replicates. Output: a new column with the row-wise mean, SD, SEM, etc.

### Effect sizes: Cohen's d

Many journals now require reporting effect sizes alongside p-values. OriginPro does not compute Cohen's d automatically, but it is straightforward to calculate from the descriptive statistics output using Set Column Values or LabTalk.

**Cohen's d formula (independent two-sample):**

```
d = (Mean1 - Mean2) / SD_pooled

where SD_pooled = sqrt( ((n1-1)*SD1^2 + (n2-1)*SD2^2) / (n1+n2-2) )
```

**In LabTalk:**

```c
// After running descriptive statistics on two groups (e.g., WT vs. PIEZO1 KO puncta density)
double m1 = mean(col(A));    // WT puncta density (puncta/um^2)
double m2 = mean(col(B));    // KO puncta density
double s1 = std(col(A));
double s2 = std(col(B));
double n1 = total(col(A));
double n2 = total(col(B));
double sp = sqrt( ((n1-1)*s1^2 + (n2-1)*s2^2) / (n1+n2-2) );
double d = (m1 - m2) / sp;
type "Cohen's d = $(d)";
```

In Bertaccini et al. 2025, Cohen's d was calculated for all comparisons (e.g., WT vs. PIEZO1 KO puncta density, +Yoda1 vs. +DMSO fluorescence intensity, EC vs. NSC current amplitudes) and reported alongside p-values.

**Interpretation guidelines:**

| Cohen's d | Effect size |
|---|---|
| 0.2 | Small |
| 0.5 | Medium |
| 0.8 | Large |

### Estimation statistics and confidence intervals

In addition to null-hypothesis significance testing, Bertaccini et al. 2025 used estimation statistics via **estimationstats.com** — a free web tool that generates Gardner-Altman estimation plots showing the mean difference between groups, its 95% confidence interval, and the underlying bootstrap distribution. This complements the p-values calculated in OriginPro by visualising the magnitude and uncertainty of the effect.

**Workflow for combining OriginPro and estimationstats.com:**

1. Organise raw data in OriginPro (one column per condition, e.g., WT and KO puncta density)
2. Run hypothesis tests in OriginPro (two-sample t-test or Mann-Whitney) to obtain the p-value
3. Export the raw data columns as CSV (File → Export → ASCII)
4. Upload to estimationstats.com → generate the estimation plot
5. Report both the p-value (from OriginPro) and the mean difference with 95% CI (from estimation statistics) in the manuscript

This dual-reporting approach satisfies the growing editorial preference for effect sizes and estimation statistics alongside traditional p-values.

---

## 18. Hypothesis Testing: t-Tests, ANOVA, and Non-Parametric Tests

### t-Tests

**Analysis → Statistics → Hypothesis Testing → Two-Sample t-Test**

| Test | When to use | Menu path |
|---|---|---|
| **One-sample t-test** | Compare a sample mean to a known value | Hypothesis Testing → One-Sample t-Test |
| **Two-sample t-test** | Compare means of two independent groups | Hypothesis Testing → Two-Sample t-Test |
| **Paired t-test** | Compare means of two related groups (before/after) | Hypothesis Testing → Paired-Sample t-Test |

The dialog asks you to:
1. Select the data columns for each group
2. Choose significance level (default α = 0.05)
3. Choose test type: two-tailed or one-tailed
4. Optionally assume equal variances (or use Welch's correction)

Results include: t-statistic, degrees of freedom, p-value, confidence interval for the difference, and a conclusion statement.

### ANOVA

**Analysis → Statistics → ANOVA**

| Test | When to use |
|---|---|
| **One-Way ANOVA** | Compare means of 3+ independent groups |
| **Two-Way ANOVA** | Two factors (e.g., drug treatment × time point) |
| **Repeated Measures ANOVA** | Same subjects measured multiple times (OriginPro) |

After ANOVA, if significant:
- **Post-hoc tests:** Tukey, Bonferroni, Scheffé, Fisher LSD, Dunnett (compare all groups to control)
- **Means comparison plots** with significance brackets

### Non-parametric tests

| Test | Parametric equivalent | Menu path |
|---|---|---|
| **Mann-Whitney U** | Independent t-test | Statistics → Nonparametric Tests → Mann-Whitney |
| **Wilcoxon Signed-Rank** | Paired t-test | Statistics → Nonparametric Tests → Wilcoxon Signed-Rank |
| **Kruskal-Wallis** | One-Way ANOVA | Statistics → Nonparametric Tests → Kruskal-Wallis |
| **Friedman** | Repeated Measures ANOVA | Statistics → Nonparametric Tests → Friedman |
| **Kolmogorov-Smirnov** | — (normality test) | Statistics → Nonparametric Tests → K-S Test |

### Normality testing

Before choosing parametric vs. non-parametric tests:

**Analysis → Statistics → Normality Test** — performs Shapiro-Wilk, Kolmogorov-Smirnov, Lilliefors, and Anderson-Darling tests.

---

## 19. Correlation and Linear Regression

### Correlation

**Analysis → Statistics → Descriptive Statistics → Correlation**

Computes Pearson's r (and optionally Spearman's ρ) for selected columns. Output includes the correlation matrix, p-values, and sample sizes.

### Simple linear regression

**Analysis → Fitting → Linear Fit** (or right-click a scatter plot → Linear Fit)

This performs ordinary least-squares regression: y = a + bx

Results include:
- Slope (b) and intercept (a) with standard errors
- R² (coefficient of determination) and Adjusted R²
- ANOVA table (F-statistic, p-value)
- Residual plots
- Confidence and prediction bands (optional)

The fit line is added directly to the graph. Click the green lock icon on the graph to access the full report.

### Multiple linear regression

**Analysis → Fitting → Multiple Linear Regression**

For models with multiple predictors: y = a + b₁x₁ + b₂x₂ + ...

---

## 20. Survival Analysis (OriginPro)

OriginPro includes survival analysis tools:

**Analysis → Statistics → Survival Analysis**

- **Kaplan-Meier Estimator** — survival curves with log-rank test for comparing groups
- **Cox Proportional Hazards** — regression model for survival data with covariates
- **Weibull Fit** — parametric survival model

These are useful for time-to-event data in biology, such as cell viability assays or time to first calcium event.

---

## 21. Linear and Polynomial Fitting

### Quick linear fit

1. Create a scatter plot
2. Click the **Quick Fit** button on the toolbar (or Analysis → Fitting → Linear Fit)
3. The fit line, equation, and R² appear on the graph

### Polynomial fit

**Analysis → Fitting → Polynomial Fit**

Choose the polynomial order (1 = linear, 2 = quadratic, 3 = cubic, etc.). Results include coefficients, R², adjusted R², and a report sheet.

### Fit Linear: options

The full Linear Fit dialog (Analysis → Fitting → Fit Linear) provides additional options:

- **Fix intercept** — force the line through the origin or a specific value
- **Weights** — weight data points by a column (e.g., 1/variance for weighted least squares)
- **Confidence/Prediction bands** — display 95% confidence bands on the graph
- **Residual analysis** — output residuals, standardised residuals, and Q-Q plot

---

## 22. Nonlinear Curve Fitting (NLFit)

### Opening the NLFit dialog

**Analysis → Fitting → Nonlinear Curve Fit** (or Ctrl+Y on a graph)

This opens Origin's most powerful fitting tool.

### The NLFit workflow

**Step 1: Function Selection page**

Choose a fitting function from the category tree. Key categories for biology:

| Category | Functions | Use case |
|---|---|---|
| **Exponential** | ExpDec1, ExpDec2, ExpAssoc, ExpGrow1 | Fluorescence decay, bleaching, association |
| **Growth/Sigmoidal** | DoseResp, Hill, Logistic, Boltzmann, Gompertz | Dose-response, growth curves |
| **Peak** | Gaussian, Lorentz, Voigt, GaussAmp, PseudoVoigt | Spectral peaks, PSF fitting, histograms |
| **Pharmacology** | MichaelisMenten, Hill equation variants | Enzyme kinetics |
| **Statistics** | Normal, LogNormal, Weibull | Distribution fitting |
| **Polynomial** | Poly2, Poly3, Poly4, Poly5 | General polynomial models |
| **User Defined** | Your custom functions | See Section 23 |

**Step 2: Settings**

- **Input Data** — confirm the correct X and Y data are selected
- **Initial Parameter Values** — Origin auto-estimates starting values for built-in functions. Review and adjust if needed. Poor initial values are the most common cause of fitting failure.
- **Bounds/Constraints** — set upper/lower bounds on parameters (e.g., amplitude must be positive)

**Step 3: Fit**

Click the **Fit** button (or the iterate icon ▶ to watch iterations step by step).

**Step 4: Results**

The output report includes:

| Section | Contents |
|---|---|
| **Parameter values** | Best-fit values ± standard errors for each parameter |
| **Statistics** | Reduced Chi-Square, R², Adjusted R², Residual Sum of Squares |
| **Covariance/Correlation matrix** | Parameter correlations (useful for detecting parameter coupling) |
| **Fitted curve** | The fit curve is added to the graph automatically |
| **Residuals** | Residual plot (check for systematic patterns indicating a poor model) |
| **Confidence/Prediction bands** | Optional, shown on the graph |

### Example: fitting an exponential decay

A fluorescence photobleaching trace decays exponentially: I(t) = A × exp(−t/τ) + y₀

1. Plot your trace (time vs. intensity)
2. Analysis → Fitting → Nonlinear Curve Fit
3. Category: Exponential → Function: **ExpDec1** (y = y0 + A1 × exp(−x/t1))
4. Review initial parameter estimates: y0 ≈ baseline, A1 ≈ amplitude, t1 ≈ time constant
5. Click Fit
6. Read τ (t1) from the results. Convert to half-life: t₁/₂ = τ × ln(2)

### Fit algorithm settings

- **Levenberg-Marquardt (LM)** — the default. Efficient, reliable for most problems. Requires reasonable initial values.
- **Simplex** — more robust for poorly-conditioned problems. Does not require derivatives. Slower.
- **Tolerance** — default 1e-9. Decrease for very precise fits; increase if fitting is slow.
- **Maximum iterations** — default 200. Increase for complex functions.

---

## 23. User-Defined Fitting Functions

### Creating a custom function

**Tools → Fitting Function Builder** (or click the ƒ button in NLFit)

1. **Name** — give your function a unique name (e.g., "BiExpDecay")
2. **Category** — choose or create a category (e.g., "User Defined" or "My Lab")
3. **Function Body** — enter the mathematical expression:

```
// Biexponential decay
y = y0 + A1 * exp(-x/t1) + A2 * exp(-x/t2);
```

4. **Parameters** — list all parameters: y0, A1, t1, A2, t2
5. **Initial Values** — optionally write LabTalk code to auto-estimate parameters from data:

```
y0 = min(y_data);
A1 = (max(y_data) - y0) * 0.7;
A2 = (max(y_data) - y0) * 0.3;
t1 = (max(x_data) - min(x_data)) / 5;
t2 = (max(x_data) - min(x_data)) / 20;
```

6. **Bounds** — set constraints (e.g., t1 > 0, t2 > 0, A1 > 0, A2 > 0)
7. Click **Save** — the function appears in NLFit under your chosen category

### Common custom functions for biology

**Hill equation (4-parameter):**
```
y = Bottom + (Top - Bottom) / (1 + (EC50/x)^nH);
```
Parameters: Bottom, Top, EC50, nH (Hill coefficient)

**Biexponential association:**
```
y = Ymax * (1 - F1 * exp(-x/t1) - (1-F1) * exp(-x/t2));
```
Parameters: Ymax, F1 (fraction fast), t1 (fast τ), t2 (slow τ)

**Gaussian on a linear baseline:**
```
y = A * exp(-(x-xc)^2 / (2*w^2)) + a0 + a1*x;
```
Parameters: A (amplitude), xc (centre), w (sigma), a0 (intercept), a1 (slope)

---

## 24. Global Fitting and Fit Comparison

### Global fitting

Fit the same model to multiple datasets simultaneously, with some parameters shared (global) and others independent (local):

1. Plot multiple datasets in the same graph
2. Open NLFit → select all datasets in the Input Data panel
3. Under each parameter, choose **Share** (same across all datasets) or **Local** (independent for each dataset)
4. Click Fit

Example: Fitting exponential decays to 5 traces, sharing the time constant τ but allowing each trace to have its own amplitude and baseline.

### Fit comparison (F-test)

Compare two fits (e.g., single vs. double exponential) to determine whether the more complex model is statistically justified:

**Analysis → Fitting → Compare Models**

This uses an F-test to determine if the extra parameters in the complex model significantly improve the fit over the simpler model.

### Information criteria

The NLFit report includes:
- **AIC** (Akaike Information Criterion) — lower is better; penalises extra parameters
- **BIC** (Bayesian Information Criterion) — stronger penalty for extra parameters

Compare AIC/BIC values between models. The model with the lower AIC/BIC is preferred.

---

## 25. Peak Analysis and Peak Fitting (OriginPro)

### The Peak Analyzer

OriginPro's **Peak Analyzer** is a multi-step wizard for baseline subtraction, peak finding, and peak fitting.

**Analysis → Peaks and Baseline → Peak Analyzer**

The wizard walks through these steps:

1. **Goal** — choose: Find Peaks, Subtract Baseline, Fit Peaks, or Integrate Peaks
2. **Baseline Mode** — select a baseline method:
   - **None** (flat at 0)
   - **Constant** (Y = c)
   - **Endpoints Weighted** (linear between first and last points)
   - **User-defined anchor points** (click on the graph to place anchor points; Origin interpolates)
   - **2nd Derivative** (automatic detection of baseline regions)
3. **Find Peaks** — automatic peak detection. Adjust sensitivity with the **Local Maximum** method (set minimum height and peak separation) or use **2nd Derivative** for overlapping peaks.
4. **Fit Peaks** — choose peak function (Gaussian, Lorentzian, Voigt, Pseudo-Voigt, etc.), fit all peaks simultaneously with shared or independent widths.
5. **Results** — peak positions, heights, widths (FWHM), areas, and the deconvolved fit are displayed on the graph and in a report.

### Batch Peak Analysis

For processing many spectra or traces with the same peak-fitting protocol:

1. Set up the Peak Analyzer on one dataset and save the settings as a Theme
2. Use **Analysis → Peaks and Baseline → Batch Peak Analysis** (OriginPro)
3. Select the datasets to process
4. Apply the saved theme
5. Results for all datasets are collected in a summary table

---

## 26. Smoothing and Filtering

### Smoothing

**Analysis → Signal Processing → Smooth**

| Method | Best for | Notes |
|---|---|---|
| **Adjacent Averaging** | General noise reduction | Simple moving average. Window size determines smoothness. |
| **Savitzky-Golay** | Preserving peaks and edges | Fits a polynomial locally. Specify polynomial order (2–4) and window points. Best default choice. |
| **Percentile Filter** | Robust to outliers | Replaces each point with the percentile of its neighbourhood. Median filter when set to 50th percentile. |
| **FFT Filter** | Frequency-based noise removal | Low-pass, high-pass, band-pass, or band-block. Specify cutoff frequency. |
| **LOWESS/LOESS** | Non-parametric trend estimation | Locally weighted regression. Good for finding trends without a model. |

### FFT Filter

**Analysis → Signal Processing → FFT Filter**

1. Select **Low Pass** to remove high-frequency noise
2. Set the **Cutoff Frequency** (in Hz if your X-axis is time in seconds, or in the reciprocal units of your X-axis)
3. Preview the filtered result
4. Click OK — the filtered data is added to the worksheet

---

## 27. FFT and Spectral Analysis

### Fast Fourier Transform

**Analysis → Signal Processing → FFT → FFT**

Computes the frequency spectrum of a time-domain signal. Output includes:

- Frequency axis
- Amplitude (magnitude) spectrum
- Phase spectrum
- Power spectrum (amplitude²)

### Power Spectrum

**Analysis → Signal Processing → FFT → Power Spectrum**

Directly computes the power spectral density. Useful for identifying dominant frequencies in fluorescence traces (e.g., oscillation frequency of calcium signals).

### Short-Time FFT (OriginPro)

**Analysis → Signal Processing → FFT → STFT**

Produces a time-frequency spectrogram — shows how the frequency content of a signal changes over time. Useful for non-stationary signals.

### Correlation

**Analysis → Signal Processing → Correlation**

Computes auto-correlation or cross-correlation of signals. Auto-correlation is useful for measuring the periodicity of oscillating fluorescence signals.

---

## 28. Baseline Correction

Baseline subtraction is critical for fluorescence traces, spectral data, and any signal with drift.

### Methods available

**Analysis → Peaks and Baseline → Baseline**

| Method | How it works | Best for |
|---|---|---|
| **User-defined anchor points** | Click on the graph to place baseline points; Origin interpolates (linear, spline, or polynomial) | Spectra with known baseline regions |
| **2nd Derivative** | Automatically finds regions where the 2nd derivative is near zero (flat regions = baseline) | Spectra with clear baseline regions |
| **Asymmetric Least Squares** | Iterative fitting that penalises positive residuals more than negative | General-purpose automatic baseline |
| **XPS Baseline (Shirley/Tougaard)** | Specialised for X-ray photoelectron spectroscopy | (Not relevant for biology) |

### Simple baseline subtraction in Set Column Values

For fluorescence traces where the baseline is defined by the first N frames:

```
// Subtract mean of first 50 frames as baseline
col(C) = col(B) - mean(col(B)[1:50]);
```

---

## 29. Image Processing in Origin

Origin's image processing is limited compared to FIJI or MATLAB, but OriginPro includes basic tools. Images must be in a **Matrix** window.

### Importing images

File → Import → Image to Matrix → select file (TIFF, PNG, BMP, JPEG)

### Available operations (OriginPro)

**Image menu** (only visible when a Matrix is active):

| Operation | Description |
|---|---|
| **Adjust Intensity** | Brightness/contrast adjustment |
| **Spatial Filters** | Mean, Gaussian, Median, Sharpen, Edge detect |
| **Arithmetic** | Add, Subtract, Multiply, Divide between matrices |
| **Convert to Data** | Extract pixel values as a worksheet for analysis |
| **Profile** | Line profile across the image |
| **Crop** | Crop to a region of interest |
| **Resize** | Change pixel dimensions |
| **Rotate** | Rotate by any angle |
| **Set XY** | Set physical coordinates (e.g., pixel size in µm) |

### Recommendation for microscopy images

For serious microscopy image analysis (thresholding, segmentation, particle tracking, co-localisation), use FIJI/ImageJ or CellProfiler. Import the resulting **numerical data** (measurements, traces, coordinates) into Origin for graphing and statistical analysis. Origin excels at the graphing and statistics stage — not at the image analysis stage.

---

## 30. Analysis Templates: The No-Code Approach

### What is an Analysis Template?

An Analysis Template is a workbook that remembers every operation you performed — import settings, column formulas, fits, statistics, and graphs. When you open it with new data, all operations are re-executed automatically on the new data.

This is Origin's most powerful feature for repetitive analysis: set up the pipeline once, then reuse it with a single click.

### Creating an Analysis Template

1. **Start with raw data:** Import a dataset into a workbook
2. **Perform all analysis steps:** Set Column Values, smoothing, curve fitting, statistical tests, graphing
3. **Save as template:** File → Save Workbook as Analysis Template → name it (e.g., "dF_F_Pipeline.ogwu")

### Using an Analysis Template

1. **Open the template:** File → Open → browse to your `.ogwu` file
2. **Replace the data:** The template shows placeholder data. Use Data → Connect to File (or drag-and-drop) to replace with new data
3. **Recalculate:** All operations run automatically. Fits update, statistics update, graphs update.

### The green lock icon

After performing analysis (e.g., a curve fit), a green lock icon (🔒) appears on the graph or worksheet. This indicates that the result is "locked" to the source data and will auto-recalculate if the data changes. Click the lock to access the analysis report or change parameters.

---

## 31. Batch Processing with Analysis Templates

### Processing multiple files

Once you have an Analysis Template, you can apply it to many files at once:

**Analysis → Batch Processing**

1. Select your Analysis Template (`.ogwu` file)
2. Click "Add Files" to add all the data files to process
3. Set the output options (summary worksheet, individual results, graphs)
4. Click OK — Origin processes each file through the template and collects results

Results from all files are compiled into a summary worksheet with one row per file.

### Example: Batch fitting exponential decays to 50 traces

1. Create an Analysis Template that imports one trace, fits ExpDec1, and reports τ, amplitude, and R²
2. Analysis → Batch Processing → select the template → add 50 CSV files
3. Click OK — Origin produces a summary table of 50 rows with τ, amplitude, and R² for each

### Alternative: Batch processing via GUI without templates

For simpler batch tasks:

1. Import all data files into one workbook (each file as a separate worksheet, or as separate columns)
2. Use the analysis dialog (e.g., NLFit) → in the Input Data section, select "All data in the workbook" or select multiple datasets
3. Origin fits each dataset independently and outputs all results

---

## 32. LabTalk Scripting Essentials

### What is LabTalk?

LabTalk is Origin's built-in scripting language. It has similarities to C and DOS batch commands. While most Origin tasks can be accomplished through the GUI, LabTalk is useful for:

- Automating repetitive tasks
- Custom calculations beyond Set Column Values
- Programmatic control of graphs (formatting, export)
- Batch operations

### Running LabTalk

| Method | How |
|---|---|
| **Command Window** | Window → Command Window. Type commands and press Enter. |
| **Script Window** | Window → Script Window (Ctrl+Shift+O). Write multi-line scripts and execute with Ctrl+Enter. |
| **Before Formula Scripts** | In Set Column Values, the "Before Formula Scripts" box accepts LabTalk. |
| **Toolbar button** | Assign a script to a custom toolbar button. |

### Language basics

```c
// Variables
double x = 3.14;
int n = 10;
string fname$ = "data.csv";

// Arithmetic
double result = x^2 + 2*x + 1;

// Print to Messages Log
type "Hello, Origin!";
type "Result = $(result)";         // variable substitution uses $()
type "File: %(fname$)";            // string variables use %()

// Column references
double m = mean(col(B));           // mean of column B in the active sheet
double s = std(col(B));

// Set column values
col(C) = (col(B) - m) / m;        // dF/F calculation

// Loop
loop(i, 1, 10) {
    type "Iteration $(i)";
}

// If/else
if (m > 1000) {
    type "Bright";
} else {
    type "Dim";
}
```

### Working with worksheets and workbooks

```c
// Create a new workbook
newbook name:="Results" sheet:=3;

// Activate a workbook by name
win -a "Results";

// Rename the active worksheet
wks.name$ = "Summary";

// Add a column
wks.addCol("NewColumn");

// Set column Long Name and Units
col(A)[L]$ = "Time";
col(A)[U]$ = "s";
col(B)[L]$ = "Intensity";
col(B)[U]$ = "AU";

// Navigate worksheets
page.active = 2;                    // switch to sheet 2

// Import a file
string fn$ = "C:\Data\trace.csv";
impasc fname:=fn$;
```

### Working with graphs

```c
// Create a scatter plot from columns A and B
plotxy iy:=(1,2) plot:=201;         // 201 = scatter plot type

// Set axis range
layer.x.from = 0;
layer.x.to = 100;
layer.y.from = -0.5;
layer.y.to = 3.0;

// Set axis title
xaxis.text$ = "Time (s)";
yaxis.text$ = "dF/F";

// Change font size
xaxis.font.size = 14;
yaxis.font.size = 14;

// Export the graph
string path$ = "C:\Figures\trace.png";
expGraph type:=png path:=path$ tr.Resolution:=300;
```

### Running X-Functions

X-Functions are the core commands in Origin. They expose all analysis and data processing operations to scripting:

```c
// Smooth data
smooth iy:=col(B) method:=sg poly:=3 npts:=11;

// Linear fit
fitlr iy:=(1,2);

// Nonlinear fit
nlbegin iy:=(1,2) func:=ExpDec1;
nlfit;
nlend;

// FFT
fft1 iy:=col(B);

// Import ASCII
impasc fname:="C:\Data\trace.csv" options.FileName.HeaderLines:=1;
```

### Batch processing with LabTalk

```c
// Process all CSV files in a folder
string folder$ = "C:\Data\Raw\";
string fname$;

// Find files
findfiles ext:="*.csv" path:=folder$;

// Loop through files
int nFiles = fname.GetNumTokens(CRLF);
loop(i, 1, nFiles) {
    // Get the i-th filename
    string fn$ = fname.GetToken(i, CRLF)$;
    
    // Import
    newbook;
    impasc fname:=fn$;
    
    // Process
    col(C) = (col(B) - mean(col(B)[1:50])) / mean(col(B)[1:50]);
    
    // Fit
    nlbegin iy:=(1,3) func:=ExpDec1;
    nlfit;
    
    type "Processed: %(fn$)";
}
```

---

## 33. Python in Origin

### Overview

Since Origin 2021, Python is fully integrated into Origin. You can run Python scripts, use Python packages (NumPy, SciPy, pandas, matplotlib), and access Origin data from Python.

### Setting up Python in Origin

Origin uses its own embedded Python installation, or you can connect it to an external Python environment (e.g., Anaconda):

1. **Tools → Options → System Path tab → Python** — set the path to your Python installation
2. Or use Origin's built-in Python (installs automatically)

To install packages:

```python
# In Origin's Python console
import pip
pip.main(['install', 'scipy', 'pandas', 'scikit-image'])
```

Or use Origin's **pip** command: Connectivity → Python Packages.

### Running Python in Origin

| Method | How |
|---|---|
| **Python Console** | Connectivity → Python Console. Interactive shell. |
| **Code Builder** | View → Code Builder → New Python File. Write and run `.py` scripts. |
| **Set Column Values** | In the Set Column Values dialog, switch to Python mode (toggle button). |
| **Before/After Import Script** | Run Python code automatically when data is imported. |

### The `originpro` package

Origin provides the `originpro` Python package for accessing worksheets, graphs, and analysis:

```python
import originpro as op
import numpy as np

# Access the active worksheet
wks = op.find_sheet('w')

# Read data from a column
time = wks.to_list('A')          # column A as a Python list
intensity = wks.to_list('B')

# Convert to numpy arrays
time = np.array(time)
intensity = np.array(intensity)

# Compute dF/F
baseline = np.mean(intensity[:50])
dff = (intensity - baseline) / baseline

# Write results back to Origin
wks.from_list('C', dff.tolist())
wks.set_label('C', 'dF/F', 'L')     # set Long Name
wks.set_label('C', 'AU', 'U')       # set Units

# Create a graph
graph = op.new_graph(template='line')
layer = graph[0]
plot = layer.add_plot(wks, coly='C', colx='A')
layer.set_xlim(0, 10)
layer.set_ylim(-0.5, 3.0)

# Export
graph.save_fig('figure.png', width=600, dpi=300)
```

### When to use Python vs. LabTalk

| Task | Recommended |
|---|---|
| Quick formatting or column operations | LabTalk |
| Complex numerical computation | Python (NumPy, SciPy) |
| Custom fitting algorithms | Python |
| File I/O with non-Origin formats | Python |
| Batch graph export | LabTalk (more direct control of Origin) |
| Machine learning | Python (scikit-learn) |
| Accessing Origin-specific features (themes, templates) | LabTalk |

---

## 34. Workflow: Dose-Response Curve

### Step-by-step

**1. Prepare data in the worksheet**

| Column A (X) | Column B (Y) | Column C (yEr) |
|---|---|---|
| Concentration (M) | Response (normalised, 0–1) | SEM |

Set Column A as X, Column B as Y, Column C as Y Error.

**2. Transform concentration to log scale**

Add a new column D with the formula: `col(D) = log(col(A));`

Set column D as X. Now you have log[concentration] vs. response.

**3. Plot**

Select columns D (X), B (Y), and C (yEr) → Plot → Scatter (or Line + Symbol)

**4. Fit the dose-response model**

Analysis → Fitting → Nonlinear Curve Fit

Category: **Growth/Sigmoidal** → Function: **DoseResp** or **Logistic**

The DoseResp function is: y = A1 + (A2 − A1) / (1 + 10^((LOGx0 − x) × p))

Where: A1 = bottom, A2 = top, LOGx0 = log(EC50), p = Hill slope

**5. Review results**

- Read EC50 = 10^LOGx0
- Hill coefficient = p
- Check R² and residuals

**6. Format for publication**

- X-axis title: "log[Drug] (M)" or "[Drug] (M)" with log scale
- Y-axis title: "Normalised Response"
- Add the fit equation and EC50 as a text annotation
- Export as EPS at journal column width

---

## 35. Workflow: Time-Course Fluorescence Traces with dF/F

### Step-by-step

**1. Import raw traces**

Data → Connect to File → CSV. Import time in column A and raw fluorescence traces in columns B, C, D, etc.

**2. Calculate dF/F for each trace**

For each trace column (B, C, D...), add a new column using Set Column Values:

```
// In Set Column Values for a new column:
col(E) = (col(B) - mean(col(B)[1:50])) / mean(col(B)[1:50]);
```

Repeat for each trace (or use a LabTalk loop).

**3. Plot all dF/F traces**

Select the time column (X) and all dF/F columns (Y) → Plot → Line

**4. Format**

- X-axis: "Time (s)"
- Y-axis: "dF/F" (or "ΔF/F₀" using Origin's text codes: `\g(D)F/F\-(0)`)
- Different colours for each trace. Use a colourblind-friendly palette.
- Add a scale bar or time marker for stimulus application (use the Line tool or a vertical dashed line)
- Legend with condition names

**5. Compute mean ± SEM across traces**

Analysis → Statistics → Descriptive Statistics → Statistics on Rows

Select all dF/F trace columns. Output: columns for Mean and SEM at each time point.

**6. Plot mean ± SEM**

Plot the Mean column as a line. Add the SEM column as Y Error. Or use Plot → Line → Fill Area with error bands.

---

## 36. Workflow: Bar Chart with Individual Data Points and Statistics

### Step-by-step

**1. Organise data**

Arrange data with one column per condition (e.g., Control, Drug A, Drug B). Each row is one measurement (one cell, one experiment).

**2. Compute statistics**

Analysis → Statistics → Descriptive Statistics → Statistics on Columns

Output: Mean and SEM (or SD) for each condition.

**3. Create the bar chart**

Method A (from raw data):
Select all data columns → Plot → Column/Bar → Grouped Column

Method B (from statistics):
Create a summary table with columns: Group (text, X), Mean (Y), SEM (yEr). Plot → Column.

**4. Overlay individual data points**

With the bar chart active:

1. Right-click on the graph → Layer Contents (or Graph → Layer Contents)
2. Add the raw data columns as additional plots in the same layer
3. Set these new plots to **Scatter** (right-click plot → Change Plot To → Scatter)
4. Format the scatter: small symbols (4–6 pt), semi-transparent, jittered horizontally

Or use Plot → Categorical → Grouped Scatter – Indexed Data, which handles this automatically.

**5. Add significance brackets**

1. Use the **Line** and **Text** annotation tools to draw brackets between groups
2. Add asterisks: * (p < 0.05), ** (p < 0.01), *** (p < 0.001), ns (not significant)
3. Or use the **Significance Brackets** tool: Graph → Add Significance Brackets (available in recent Origin versions)

**6. Format for publication**

- Remove top and right axes (right-click axis → Hide)
- Y-axis from 0 to an appropriate maximum
- Bar fill: light colours with darker edges
- Error bars: black, cap width ~4 pt
- Font: Arial 8–10 pt

---

## 37. Workflow: Multi-Panel Publication Figure

### Step-by-step

**1. Create individual graphs**

Make each panel as a separate graph window (Graph A: traces, Graph B: bar chart, Graph C: dose-response, etc.). Format each one individually.

**2. Set page sizes**

Before merging, set each graph's page size to the desired panel size. For a 2×2 figure at journal double-column width (17 cm):

- Each panel: ~8 cm × 7 cm

**3. Merge graphs**

Graph → Merge Graph Windows

- Select the graphs to merge
- Set Rows: 2, Columns: 2
- Adjust spacing (Gap between panels: ~10% or set in cm)
- Click OK

**4. Add panel labels**

For each layer, add a text annotation "A", "B", "C", "D" — bold, ~12–14 pt, positioned in the top-left corner.

Or: Graph → Add Panel Label (automatic).

**5. Final formatting**

- Ensure consistent fonts across all panels
- Ensure consistent axis line widths
- Check that colour schemes are consistent
- Align panels precisely using Format → Page Properties

**6. Export**

File → Export Graph → EPS or TIFF at 300+ DPI, width = journal double-column width (17 cm or 6.7 inches).

---

## 38. Origin vs. OriginPro: Feature Comparison

| Feature | Origin | OriginPro |
|---|---|---|
| **Core graphing (100+ graph types)** | ✓ | ✓ |
| **Data import (CSV, Excel, etc.)** | ✓ | ✓ |
| **Linear/polynomial fitting** | ✓ | ✓ |
| **Nonlinear curve fitting** | ✓ | ✓ |
| **Basic statistics (t-test, ANOVA)** | ✓ | ✓ |
| **Set Column Values** | ✓ | ✓ |
| **Analysis Templates** | ✓ | ✓ |
| **LabTalk and Python scripting** | ✓ | ✓ |
| **Peak Analyzer (baseline, find, fit peaks)** | — | ✓ |
| **Batch Peak Analysis** | — | ✓ |
| **Surface fitting** | — | ✓ |
| **Short-Time FFT (STFT)** | — | ✓ |
| **Wavelet analysis** | — | ✓ |
| **Image processing** | — | ✓ |
| **Repeated Measures ANOVA** | — | ✓ |
| **Survival Analysis (Kaplan-Meier, Cox)** | — | ✓ |
| **Power Analysis** | — | ✓ |
| **ROC Curves** | — | ✓ |
| **Multivariate analysis (PCA, cluster)** | — | ✓ |
| **Global fitting with shared parameters** | ✓ (limited) | ✓ (full) |

**Recommendation for biology research:** OriginPro is worth the upgrade for peak fitting, image processing, survival analysis, and batch peak analysis. If your work is primarily graphing and basic curve fitting, standard Origin may suffice.

---

## 39. Keyboard Shortcuts Quick Reference

### General

| Shortcut | Action |
|---|---|
| **Ctrl+N** | New project |
| **Ctrl+S** | Save project |
| **Ctrl+Z** | Undo |
| **Ctrl+Y** | Redo |
| **Ctrl+C** / **Ctrl+V** | Copy / Paste |
| **Ctrl+Shift+O** | Open Script Window |
| **F1** | Help |
| **F2** | Edit cell (in worksheet) |
| **Ctrl+Q** | Set Column Values (with column selected) |

### Worksheet

| Shortcut | Action |
|---|---|
| **Ctrl+D** | Set column designation |
| **Ctrl+Q** | Set Column Values |
| **Ctrl+Home** | Go to first cell |
| **Ctrl+End** | Go to last cell |
| **Ctrl+Shift+L** | Add new column |
| **Ctrl+G** | Go to row |

### Graph

| Shortcut | Action |
|---|---|
| **Ctrl+G** | Export Graph dialog |
| **Ctrl+L** | Open Legend dialog |
| **Ctrl+J** | Speed Mode settings |
| **Ctrl+B** | Open Plot Details |
| **Ctrl+Shift+G** | Graph Merge dialog |
| **Double-click axis** | Axis Properties |
| **Double-click plot** | Plot Details |
| **Double-click legend** | Edit legend |
| **Space** (with graph active) | Cycle through layers |
| **Ctrl+click** | Select multiple data points |

### Analysis

| Shortcut | Action |
|---|---|
| **Ctrl+Y** | Nonlinear Curve Fit (NLFit) |
| **Ctrl+1** | Quick Fit (linear) |
| **Ctrl+2** | Quick Fit (polynomial) |

---

## 40. Common Problems and Solutions

### Graph looks blank or shows only axes

**Cause:** Data is outside the axis range, or the wrong columns are assigned.
**Fix:** Double-click the axis → Scale tab → Auto Scale. Check that the correct X and Y columns are selected in Layer Contents (right-click graph → Layer Contents).

### Columns don't appear in the plot dialog

**Cause:** The column designation is wrong (e.g., X column designated as Y).
**Fix:** Right-click the column header → Set As → X (or Y, etc.).

### Error bars don't show up

**Cause:** The error column is not designated as Y Error, or it's not adjacent to the Y data column.
**Fix:** Set the column designation to yEr. In Plot Details → Error Bar tab, ensure "Connect to" points to the correct column.

### Curve fit fails to converge

**Cause:** Poor initial parameter estimates, or the model is not appropriate for the data.
**Fix:**
1. Manually set reasonable initial values in NLFit → Parameters tab
2. Try the Simplex algorithm instead of Levenberg-Marquardt
3. Increase maximum iterations (e.g., to 500)
4. Set parameter bounds (e.g., all amplitudes > 0)
5. Check that your data doesn't have NaN or masked points in the fit range
6. Try a simpler model first

### Exported figure is blurry

**Cause:** Low DPI or raster export when vector was needed.
**Fix:** Export as vector format (EPS, SVG, PDF) for graphs with lines and text. For raster, set DPI to 300+ in the Export Graph dialog.

### Text appears as boxes or garbled characters in exported EPS/PDF

**Cause:** Font embedding issues.
**Fix:** In Export Graph → Settings → check "Embed Fonts" or switch to a standard font (Arial, Helvetica, Times New Roman). Alternatively, use GDI+ text rendering.

### Origin crashes when opening large files

**Cause:** Memory limitations with very large datasets.
**Fix:** Import only needed columns. Use Data Connectors with "Partial Import" to load a subset of rows. Close unused workbooks and graphs.

### Changes to data don't update the graph

**Cause:** Auto-recalculation is turned off, or the graph is not linked to the data.
**Fix:** Check that the green lock icon is present on analysis results. If missing, re-run the analysis. Check Edit → Preferences → Auto-Update.

### LabTalk script gives "command not found" error

**Cause:** Syntax error, or the function/X-Function name is misspelled.
**Fix:** Check the LabTalk Reference at https://www.originlab.com/doc/LabTalk/ref/. Use `ed.s` to set the echo flag for debugging: `@err = 1;` to see error messages.

---

## 41. Quick Reference: Essential Menu Paths

### Importing

| Task | Menu Path |
|---|---|
| Import CSV/text | Data → Connect to File → Text/CSV |
| Import Excel | Data → Connect to File → Excel |
| Import image | File → Import → Image to Matrix |
| Paste from clipboard | Edit → Paste (Ctrl+V) |

### Graphing

| Task | Menu Path |
|---|---|
| Line plot | Plot → Line |
| Scatter plot | Plot → Scatter |
| Bar chart | Plot → Column/Bar → Column |
| Box plot | Plot → Box → Box Plot |
| Histogram | Plot → Histogram |
| Heatmap | Plot → Contour → Heatmap |
| Multi-panel merge | Graph → Merge Graph Windows |
| Add layer/inset | Graph → New Layer |
| Export figure | File → Export Graph (Ctrl+G) |

### Analysis

| Task | Menu Path |
|---|---|
| Descriptive statistics | Analysis → Statistics → Descriptive Statistics → Statistics on Columns |
| t-test | Analysis → Statistics → Hypothesis Testing → Two-Sample t-Test |
| One-Way ANOVA | Analysis → Statistics → ANOVA → One-Way ANOVA |
| Linear fit | Analysis → Fitting → Linear Fit |
| Polynomial fit | Analysis → Fitting → Polynomial Fit |
| Nonlinear fit | Analysis → Fitting → Nonlinear Curve Fit (Ctrl+Y) |
| Peak analysis | Analysis → Peaks and Baseline → Peak Analyzer |
| Smooth | Analysis → Signal Processing → Smooth |
| FFT | Analysis → Signal Processing → FFT → FFT |
| Baseline | Analysis → Peaks and Baseline → Baseline |
| Batch processing | Analysis → Batch Processing |

### Worksheet operations

| Task | Menu Path |
|---|---|
| Set Column Values | Column → Set Column Values (Ctrl+Q) |
| Column statistics | Right-click column → Statistics on Column |
| Sort | Worksheet → Sort Columns |
| Transpose | Worksheet → Transpose |
| Mask by condition | Worksheet → Worksheet Data Operations → Mask by Condition |
| Fill column | Right-click column → Fill Column With |

### Formatting

| Task | Method |
|---|---|
| Edit axis | Double-click axis |
| Edit plot | Double-click plot (opens Plot Details) |
| Edit legend | Double-click legend |
| Page properties | Format → Page Properties |
| Apply theme | Right-click graph → Apply Theme |
| Save template | File → Save Template As |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using OriginPro for data analysis, graphing, and publication figure preparation. For questions or suggestions, contact george.dickinson@gmail.com.*

*Origin and OriginPro are registered trademarks of OriginLab Corporation.*
