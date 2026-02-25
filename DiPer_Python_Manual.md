# DiPer (Python) Manual for Biology Researchers

**A Comprehensive Guide to Directional Persistence Analysis Using the Python Implementation of DiPer**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why DiPer in Python?](#1-introduction-why-diper-in-python)
2. [Installation and Setup](#2-installation-and-setup)
3. [The Mathematics of Directional Persistence](#3-the-mathematics-of-directional-persistence)

**Part II: Preparing Your Data**

4. [Input File Format](#4-input-file-format)
5. [Preparing Tracking Data from Other Software](#5-preparing-tracking-data-from-other-software)

**Part III: Running DiPer**

6. [Overview of the Analysis Modules](#6-overview-of-the-analysis-modules)
7. [Command-Line Interface](#7-command-line-interface)
8. [Python Library Usage](#8-python-library-usage)

**Part IV: The Analysis Modules in Detail**

9. [Plot_At_Origin: Trajectory Visualisation](#9-plot_at_origin-trajectory-visualisation)
10. [Make_Charts: Individual Trajectory Plots](#10-make_charts-individual-trajectory-plots)
11. [Sparse_Data: Temporal Down-Sampling](#11-sparse_data-temporal-down-sampling)
12. [Speed: Average Cell Speed](#12-speed-average-cell-speed)
13. [Dir_Ratio: The Directionality Ratio](#13-dir_ratio-the-directionality-ratio)
14. [MSD: Mean Square Displacement](#14-msd-mean-square-displacement)
15. [Autocorrel: Direction Autocorrelation](#15-autocorrel-direction-autocorrelation)
16. [Autocorrel_NoGaps: Handling Stationary Periods](#16-autocorrel_nogaps-handling-stationary-periods)
17. [Autocorrel_3D: Three-Dimensional Analysis](#17-autocorrel_3d-three-dimensional-analysis)
18. [Vel_Cor: Normalised Velocity Autocorrelation](#18-vel_cor-normalised-velocity-autocorrelation)

**Part V: Interpreting Results**

19. [Interpreting Trajectory Plots](#19-interpreting-trajectory-plots)
20. [Interpreting Speed](#20-interpreting-speed)
21. [Interpreting the Directionality Ratio](#21-interpreting-the-directionality-ratio)
22. [Interpreting MSD Plots](#22-interpreting-msd-plots)
23. [Interpreting Direction Autocorrelation](#23-interpreting-direction-autocorrelation)
24. [Why Direction Autocorrelation is Better Than the Directionality Ratio](#24-why-direction-autocorrelation-is-better-than-the-directionality-ratio)

**Part VI: Practical Workflows**

25. [Workflow 1: Complete Analysis of a Two-Condition Experiment](#25-workflow-1-complete-analysis-of-a-two-condition-experiment)
26. [Workflow 2: Analysing PIEZO1-Dependent Migration Changes](#26-workflow-2-analysing-piezo1-dependent-migration-changes)
27. [Workflow 3: PIEZO1-HaloTag Single-Particle Tracking with DiPer](#27-workflow-3-piezo1-halotag-single-particle-tracking-with-diper)
28. [Workflow 4: Batch Processing Multiple Experiments](#28-workflow-4-batch-processing-multiple-experiments)
29. [Workflow 5: Combining DiPer with u-track and FLIKA Output](#29-workflow-5-combining-diper-with-u-track-and-flika-output)
30. [Workflow 6: 3D Trajectory Analysis from Light-Sheet Microscopy](#30-workflow-6-3d-trajectory-analysis-from-light-sheet-microscopy)

**Part VII: Output Files and Publication Figures**

31. [Output File Structure](#31-output-file-structure)
32. [Creating Publication-Quality Figures](#32-creating-publication-quality-figures)

**Part VIII: Tips and Troubleshooting**

33. [Common Problems and Solutions](#33-common-problems-and-solutions)
34. [Performance Tips for Large Datasets](#34-performance-tips-for-large-datasets)
35. [DiPer Python vs. DiPer Excel VBA](#35-diper-python-vs-diper-excel-vba)

---

## 1. Introduction: Why DiPer in Python?

### What is DiPer?

DiPer (Directional Persistence) is a suite of tools for the quantitative analysis of cell migration and particle trajectories in two and three dimensions. It was originally developed as a set of **Excel VBA macros** by Roman Gorelik and Alexis Gautreau to provide an unbiased measure of directional persistence --- the **direction autocorrelation** function --- that is independent of cell speed.

This manual covers the **Python implementation** of DiPer, which faithfully reproduces all of the original VBA analyses while adding several advantages of a modern programming environment.

### Citation

**Original method:**
Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. *Nature Protocols*, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131

### Why Python instead of Excel VBA?

The original DiPer VBA macros are excellent for small-scale, interactive analysis. However, the Python implementation offers significant advantages for modern research workflows:

| Feature | Excel VBA | Python |
|---|---|---|
| **Batch processing** | Manual, one-at-a-time | Automated, scriptable |
| **Reproducibility** | Requires exact manual steps | Fully scripted, version-controlled |
| **Large datasets** | Slow; Excel row limits apply | Handles millions of data points |
| **3D analysis** | Limited | Full 3D autocorrelation support |
| **Output formats** | Excel charts only | PNG, PDF, CSV, Excel |
| **Integration** | Standalone | Integrates with NumPy, SciPy, pandas, trackpy |
| **Stationary period handling** | Not available | Autocorrel_NoGaps module |
| **Velocity autocorrelation** | Not available | Vel_Cor module |
| **Custom pipelines** | Difficult | Easy --- import as a library |
| **Statistical testing** | Export required | Direct access to SciPy stats |

### What DiPer provides

DiPer calculates and plots several key migration and trajectory parameters:

- **Trajectory plots** (individual and collective, centred at origin)
- **Cell speed** (average instantaneous speed per condition)
- **Directionality ratio** (displacement / path length over time)
- **Mean square displacement (MSD)** with diffusion exponent (alpha)
- **Direction autocorrelation** (unbiased persistence measure) --- the core analysis
- **Direction autocorrelation without gaps** (handles stationary periods)
- **3D direction autocorrelation** (for volumetric imaging data)
- **Normalised velocity autocorrelation** (incorporates speed and direction)

### Why DiPer for our research?

In research involving PIEZO1 mechanotransduction (e.g., Bertaccini et al., 2025, *Nature Communications*), we often need to:

- **Track PIEZO1-HaloTag puncta** in TIRF movies and characterise their mobility (mobile vs. immobile populations)
- **Analyse cell migration** in hiPSC-derived endothelial cells and keratinocytes, where PIEZO1 knockout or pharmacological modulation (Yoda1, GsMTx4) may alter both speed and persistence
- **Compare directional persistence** independent of speed changes --- essential because PIEZO1 affects contractility via Ca2+ signalling, which can change speed and persistence simultaneously
- **Process large datasets** from automated tracking (ThunderSTORM + FLIKA, u-track) with hundreds to thousands of trajectories

The Python DiPer implementation handles all of these requirements efficiently and reproducibly.

### What DiPer does NOT do

- **Tracking:** DiPer analyses pre-existing trajectory data. Track cells or particles first using ImageJ/FIJI (Manual Tracking, TrackMate), u-track, FLIKA, ThunderSTORM, trackpy, or similar software.
- **Detection:** DiPer does not detect or localise fluorescent puncta. Use ThunderSTORM, StarDist, Cellpose, or similar tools for detection.
- **Statistical tests:** DiPer computes metrics but does not perform statistical comparisons. Use SciPy, statsmodels, or R for statistics (though these can be easily combined in a Python script).
- **Animated visualisations:** DiPer generates static plots. Use Napari or custom matplotlib animations for dynamic visualisation.

---

## 2. Installation and Setup

### Requirements

- **Python 3.7 or higher** (Python 3.9+ recommended)
- Required packages: pandas, numpy, matplotlib, seaborn, openpyxl

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/yourusername/diper.git
cd diper
```

**Step 2: Create a virtual environment (recommended)**

```bash
# Using venv
python -m venv diper_env
source diper_env/bin/activate    # macOS / Linux
diper_env\Scripts\activate       # Windows

# Or using conda
conda create -n diper python=3.10
conda activate diper
```

**Step 3: Install dependencies**

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install pandas numpy matplotlib seaborn openpyxl
```

**Step 4: Install the package**

```bash
pip install -e .
```

The `-e` flag installs in "editable" (development) mode, so changes to the source code take effect immediately.

### Verifying the installation

```python
import diper
print(diper.__version__)  # Should print "1.0.0"

from diper.utils import load_data
print("DiPer loaded successfully")
```

### Dependencies

| Package | Purpose | Version |
|---|---|---|
| `pandas` | Data loading, manipulation, and export | >= 1.3 |
| `numpy` | Numerical calculations (vectors, statistics) | >= 1.20 |
| `matplotlib` | Plotting and figure generation | >= 3.4 |
| `seaborn` | Statistical visualisation (box plots) | >= 0.11 |
| `openpyxl` | Reading/writing Excel files | >= 3.0 |

---

## 3. The Mathematics of Directional Persistence

### The problem with the classical directionality ratio

The most common measure of directional persistence is the **directionality ratio** (also called the straightness index):

**Directionality ratio = d / D**

where *d* = net displacement (straight-line distance from start to current position) and *D* = total path length (cumulative distance along the trajectory).

This ratio ranges from 0 (the object returns to its start) to 1 (perfectly straight-line movement). The critical problem is that this ratio is **biased by speed**: faster-moving objects inherently appear more persistent because they cover more ground before random turning accumulates.

### Direction autocorrelation: the unbiased alternative

The **direction autocorrelation** function measures how correlated an object's direction of movement is with its direction at a previous time point:

**C(dt) = < cos(theta(t, t+dt)) >**

where theta(t, t+dt) is the angle between the displacement vector at time *t* and the displacement vector at time *t*+dt, and the average is taken over all valid time pairs and all trajectories.

- **C(dt) = 1:** Perfect persistence (movement continues in the same direction)
- **C(dt) = 0:** No directional memory (random relative to earlier direction)
- **C(dt) < 0:** Anti-persistence (tendency to reverse direction)

In the Python implementation, this is computed as the **dot product of normalised displacement vectors**, which equals the cosine of the angle between them:

```
cos(theta) = (v1 . v2) / (|v1| * |v2|)
```

Since the vectors are normalised to unit length, the dot product directly gives the cosine.

### Mean square displacement (MSD)

The MSD quantifies the area explored over time:

**MSD(dt) = < |r(t+dt) - r(t)|^2 >**

On a log-log plot, the slope (alpha) indicates the type of motion:

| Alpha | Motion type | Meaning |
|---|---|---|
| ~1 | Diffusive (Brownian) | Random walk; MSD grows linearly |
| ~2 | Ballistic (directed) | Straight-line; MSD grows quadratically |
| 1 < alpha < 2 | Persistent random walk | Typical for migrating cells |
| < 1 | Subdiffusive / confined | Restricted movement |

### Normalised velocity autocorrelation

The velocity autocorrelation incorporates both speed and direction information:

**Cv(dt) = < v(t) . v(t+dt) > / < |v|^2 >**

Unlike the direction autocorrelation (which uses normalised vectors), the velocity autocorrelation uses un-normalised displacement vectors divided by time. This means faster movements contribute more weight. It is useful when speed variations carry meaningful information.

---

## 4. Input File Format

### Supported file formats

The Python DiPer accepts:
- **Excel files** (.xlsx, .xls) --- each worksheet is one experimental condition
- **CSV files** (.csv) --- each file is one condition (filename becomes the label)

### Column structure

Data must be organised in at least six columns:

| Column | Index | Content | Required |
|---|---|---|---|
| 1 | 0 | Optional metadata (e.g., cell ID) | No |
| 2 | 1 | Optional metadata | No |
| 3 | 2 | Optional metadata | No |
| 4 | 3 | **Frame number** | Yes |
| 5 | 4 | **X coordinate** | Yes |
| 6 | 5 | **Y coordinate** | Yes |
| 7 | 6 | Z coordinate (for 3D analysis) | Optional |

### Important rules

- **No header row** is expected by default. If your file has headers, they will be treated as column names by pandas and renamed internally.
- **Trajectory boundaries** are detected when the frame number **does not increase** (i.e., resets or decreases). This is how DiPer identifies where one trajectory ends and the next begins.
- **Frame numbers must increase monotonically** within each trajectory.
- **Coordinates** can be in any units (pixels, micrometres, etc.) but must be consistent within a dataset. If coordinates are in micrometres and frames are in minutes, speed will be in micrometres per minute.
- **Trajectories must have at least 2 data points** to be included in any analysis.

### Example: Excel format

A workbook with two worksheets ("WT" and "PIEZO1_KO"), each containing:

| Col A | Col B | Col C | Col D | Col E | Col F |
|---|---|---|---|---|---|
| cell1 | exp1 | | 0 | 100.5 | 200.3 |
| cell1 | exp1 | | 1 | 101.2 | 201.1 |
| cell1 | exp1 | | 2 | 102.8 | 200.9 |
| cell2 | exp1 | | 0 | 300.2 | 150.7 |
| cell2 | exp1 | | 1 | 301.5 | 149.2 |

Cell2 starts with frame 0 immediately after cell1 ends. The frame reset signals a new trajectory.

### Example: CSV format

```csv
cell1,exp1,,0,100.5,200.3
cell1,exp1,,1,101.2,201.1
cell1,exp1,,2,102.8,200.9
cell2,exp1,,0,300.2,150.7
cell2,exp1,,1,301.5,149.2
```

---

## 5. Preparing Tracking Data from Other Software

### From ThunderSTORM + FLIKA (PIEZO1-HaloTag puncta tracking)

In the Bertaccini et al. (2025) workflow, PIEZO1-HaloTag puncta are localised with ThunderSTORM in FIJI, then trajectories are formed by linking localisations across frames using FLIKA. To prepare this output for DiPer:

```python
import pandas as pd

# Load FLIKA trajectory output
# Typical columns: track_id, frame, x_um, y_um
tracks = pd.read_csv('flika_tracks.csv')

# Prepare DiPer format
diper_rows = []
for tid, grp in tracks.groupby('track_id'):
    grp = grp.sort_values('frame').reset_index(drop=True)
    for i, row in grp.iterrows():
        diper_rows.append([tid, '', '', i, row['x_um'], row['y_um']])

diper_df = pd.DataFrame(diper_rows, columns=['A', 'B', 'C', 'D', 'E', 'F'])

# Save --- one sheet per condition
with pd.ExcelWriter('diper_input.xlsx') as writer:
    diper_df.to_excel(writer, sheet_name='Basal', index=False, header=False)
```

### From u-track (MATLAB)

```matlab
% Export u-track tracks for DiPer
[trackedFeatureInfo, ~] = convStruct2MatNoMS(tracksFinal);
pixelSize = 0.108;  % um per pixel (typical for 60x TIRF)

nTracks = size(trackedFeatureInfo, 1);
nFrames = size(trackedFeatureInfo, 2) / 8;

rows = [];
for t = 1:nTracks
    frameCount = 0;
    for f = 1:nFrames
        idx = (f-1)*8;
        x = trackedFeatureInfo(t, idx+1) * pixelSize;
        y = trackedFeatureInfo(t, idx+2) * pixelSize;
        if ~isnan(x)
            frameCount = frameCount + 1;
            rows = [rows; t, 0, 0, frameCount, x, y];
        end
    end
end

T = array2table(rows, 'VariableNames', {'A','B','C','Frame','X','Y'});
writetable(T, 'diper_input.xlsx', 'WriteVariableNames', false);
```

### From ImageJ/FIJI Manual Tracking

The Manual Tracking plugin outputs: Track#, Slice#, X, Y. Rearrange so that columns 4, 5, 6 contain Slice# (frame), X, Y:

```python
import pandas as pd

manual = pd.read_csv('manual_tracking_results.csv')

diper_rows = []
for tid, grp in manual.groupby('Track n°'):
    grp = grp.sort_values('Slice n°').reset_index(drop=True)
    for i, row in grp.iterrows():
        diper_rows.append([tid, '', '', i, row['X'], row['Y']])

diper_df = pd.DataFrame(diper_rows)
diper_df.to_excel('diper_input.xlsx', index=False, header=False, sheet_name='Condition1')
```

### From TrackMate (FIJI)

```python
import pandas as pd

# TrackMate exports spots and edges as CSV
spots = pd.read_csv('trackmate_spots.csv')

diper_rows = []
for tid, grp in spots.groupby('TRACK_ID'):
    grp = grp.sort_values('FRAME').reset_index(drop=True)
    for i, row in grp.iterrows():
        diper_rows.append([tid, '', '', i, row['POSITION_X'], row['POSITION_Y']])

diper_df = pd.DataFrame(diper_rows)
diper_df.to_excel('diper_input.xlsx', index=False, header=False, sheet_name='Condition1')
```

### From trackpy (Python)

```python
import trackpy as tp
import pandas as pd

# Locate and link features
features = tp.locate(frames, diameter=11)
tracks = tp.link(features, search_range=5)

# Prepare DiPer format
diper_rows = []
for tid, grp in tracks.groupby('particle'):
    grp = grp.sort_values('frame').reset_index(drop=True)
    for i, row in grp.iterrows():
        diper_rows.append([tid, '', '', i, row['x'], row['y']])

diper_df = pd.DataFrame(diper_rows)
diper_df.to_excel('diper_input.xlsx', index=False, header=False, sheet_name='Condition1')
```

---

## 6. Overview of the Analysis Modules

| Module | Function | Key output |
|---|---|---|
| **plot_at_origin** | Translate trajectories to (0,0) and overlay | Combined trajectory plot per condition |
| **make_charts** | Plot each trajectory individually | Individual trajectory charts with start/end markers |
| **sparse_data** | Keep every Nth frame | Down-sampled trajectory data |
| **speed** | Average instantaneous speed per cell | Box plots with individual data points |
| **dir_ratio** | Directionality ratio over time and at endpoint | Time-course plot; endpoint bar chart |
| **msd** | Mean square displacement vs. time lag | Log-log and linear MSD plots; alpha values |
| **autocorrel** | Direction autocorrelation | Autocorrelation decay curve per condition |
| **autocorrel_nogaps** | Autocorrelation with stationary-period handling | Autocorrelation curve (gaps randomised) |
| **autocorrel_3d** | 3D direction autocorrelation | 3D autocorrelation decay curve |
| **vel_cor** | Normalised velocity autocorrelation | Velocity autocorrelation curve |

### Recommended analysis order

1. **plot_at_origin** --- visualise trajectories, check data quality
2. **speed** --- basic speed comparison between conditions
3. **msd** --- area exploration, diffusion exponent
4. **autocorrel** --- unbiased directional persistence (the key analysis)
5. **dir_ratio** --- classical persistence (for comparison with literature)
6. **vel_cor** --- velocity autocorrelation (combines speed and direction)

---

## 7. Command-Line Interface

### Basic usage

```bash
python -m diper.main --input data.xlsx --output results --time-interval 1.0
```

### All command-line arguments

| Argument | Short | Type | Default | Description |
|---|---|---|---|---|
| `--input` | `-i` | str | Required | Input file path (Excel or CSV) |
| `--output` | `-o` | str | `"output"` | Output directory |
| `--time-interval` | `-t` | float | `1.0` | Time between frames (in your chosen units) |
| `--analysis` | `-a` | str | `"all"` | Which analysis to run (see below) |
| `--sparse-factor` | `-n` | int | `3` | For sparse_data: keep 1 out of N frames |
| `--max-intervals` | `-m` | int | `30` | Max intervals for autocorrelation |
| `--threshold` | | float | `0.0` | Distance threshold for autocorrel_nogaps |
| `--plot-size` | | float | `None` | Fixed plot area size for make_charts |
| `--no-plots` | | flag | `False` | Disable plot generation (data only) |

### Analysis options for `--analysis`

- `all` --- run all analyses (default)
- `plot_at_origin` --- trajectory visualisation only
- `make_charts` --- individual trajectory plots
- `sparse_data` --- temporal down-sampling
- `speed` --- speed analysis
- `dir_ratio` --- directionality ratio
- `msd` --- mean square displacement
- `autocorrel` --- direction autocorrelation
- `autocorrel_nogaps` --- autocorrelation with gap handling
- `autocorrel_3d` --- 3D autocorrelation
- `vel_cor` --- velocity autocorrelation

### Examples

```bash
# Run all analyses on PIEZO1-HaloTag puncta data, 100 ms frame interval
python -m diper.main -i puncta_tracks.xlsx -o puncta_results -t 0.1

# Speed analysis only, 5-minute frame interval for cell migration
python -m diper.main -i migration_data.xlsx -o migration_results -t 5.0 -a speed

# MSD with custom max intervals
python -m diper.main -i data.xlsx -o results -t 1.0 -a msd -m 50

# Direction autocorrelation with gap handling (threshold 0.05 um)
python -m diper.main -i data.xlsx -o results -t 0.1 -a autocorrel_nogaps --threshold 0.05

# Generate data files only (no plots)
python -m diper.main -i data.xlsx -o results -t 1.0 --no-plots
```

---

## 8. Python Library Usage

### Basic example

```python
from diper.utils import load_data
from diper.speed import run_speed_analysis

# Load trajectory data
data = load_data("experiment.xlsx")

# Run speed analysis
results = run_speed_analysis(data, time_interval=1.0, output_dir="results")
```

### Complete analysis pipeline

```python
from diper.utils import load_data, ensure_output_dir
from diper.plot_at_origin import run_plot_at_origin_analysis
from diper.speed import run_speed_analysis
from diper.msd import run_msd_analysis
from diper.autocorrel import run_autocorrelation_analysis
from diper.dir_ratio import run_dir_ratio_analysis

# Parameters
input_file = "migration_data.xlsx"
output_dir = "analysis_results"
time_interval = 5.0  # minutes between frames

# Load data
data = load_data(input_file)
print(f"Loaded {len(data)} condition(s): {', '.join(data.keys())}")

# Run analyses
ensure_output_dir(output_dir)

trajectories = run_plot_at_origin_analysis(data, output_dir=output_dir)
speed_results = run_speed_analysis(data, time_interval=time_interval, output_dir=output_dir)
msd_results = run_msd_analysis(data, time_interval=time_interval, output_dir=output_dir)
autocorr_results = run_autocorrelation_analysis(
    data, time_interval=time_interval, max_intervals=30, output_dir=output_dir
)
dir_ratio_results = run_dir_ratio_analysis(
    data, time_interval=time_interval, output_dir=output_dir
)

# Print summary
for condition in speed_results:
    summary = speed_results[condition]['summary']
    avg_speed = summary[summary['Statistic'] == 'Grand Average']['Value'].iloc[0]
    alpha = msd_results['alpha_values'].get(condition, float('nan'))
    print(f"{condition}: speed = {avg_speed:.3f}, MSD alpha = {alpha:.2f}")
```

### Key functions at a glance

| Function | Module | Returns |
|---|---|---|
| `load_data(file_path)` | `diper.utils` | `Dict[str, DataFrame]` keyed by condition |
| `split_trajectories(df)` | `diper.utils` | `List[DataFrame]` of individual trajectories |
| `run_plot_at_origin_analysis(data, output_dir)` | `diper.plot_at_origin` | Dict of translated trajectory lists |
| `run_make_charts_analysis(data, plot_area_edge, output_dir)` | `diper.make_charts` | None (saves plots) |
| `run_sparse_data_analysis(data, n, output_dir)` | `diper.sparse_data` | Dict of sparsed DataFrames |
| `run_speed_analysis(data, time_interval, output_dir)` | `diper.speed` | Dict of speed results |
| `run_dir_ratio_analysis(data, time_interval, output_dir)` | `diper.dir_ratio` | Dict with `overtime` and `lastpoint` |
| `run_msd_analysis(data, time_interval, ...)` | `diper.msd` | Dict with `msd_results` and `alpha_values` |
| `run_autocorrelation_analysis(data, time_interval, max_intervals, output_dir)` | `diper.autocorrel` | Dict of autocorrelation DataFrames |
| `run_autocorrelation_nogaps_analysis(data, time_interval, max_intervals, threshold, output_dir)` | `diper.autocorrel_nogaps` | Dict of autocorrelation DataFrames |
| `run_autocorrelation_3d_analysis(data, time_interval, max_intervals, output_dir)` | `diper.autocorrel_3d` | Dict of 3D autocorrelation DataFrames |
| `run_vel_cor_analysis(data, time_interval, max_step_fraction, output_dir)` | `diper.vel_cor` | Dict of velocity autocorrelation DataFrames |

---

## 9. Plot_At_Origin: Trajectory Visualisation

### What it does

Translates all trajectories so they start at coordinate (0, 0), then plots them overlaid in a single chart per condition. This visualisation reveals whether cells or particles migrate isotropically (all directions equally) or show a directional bias.

### Usage

```python
from diper.utils import load_data
from diper.plot_at_origin import run_plot_at_origin_analysis

data = load_data("data.xlsx")
translated = run_plot_at_origin_analysis(data, output_dir="results")

# Access individual translated trajectories
for condition, traj_list in translated.items():
    print(f"{condition}: {len(traj_list)} trajectories")
```

Command line:
```bash
python -m diper.main -i data.xlsx -o results -a plot_at_origin
```

### Output

- **Plots:** `plots/plot_at_origin_[condition].png` and `.pdf`
- **Data:** `translated_trajectories_[condition].csv` --- origin-centred coordinates with `relative_x` and `relative_y` columns

### What to look for

- **Random migration:** Trajectories fan out equally in all directions from the origin.
- **Directed migration:** Trajectories biased toward one direction (chemotaxis, galvanotaxis).
- **Confined motion:** Trajectories stay close to the origin (typical for immobile PIEZO1 puncta).
- **Wide spread:** High motility / mobile puncta population.
- **Outliers:** Unusually long or straight trajectories that may indicate tracking errors.

---

## 10. Make_Charts: Individual Trajectory Plots

### What it does

Creates a separate plot for each trajectory, with green and red markers for the start and end points. Useful for quality control and selecting representative trajectories for publication figures.

### Usage

```python
from diper.utils import load_data
from diper.make_charts import run_make_charts_analysis

data = load_data("data.xlsx")
run_make_charts_analysis(data, plot_area_edge=50, output_dir="results")
```

### Parameters

- `plot_area_edge` (optional): Fixed plot area size in coordinate units. If not set, each plot is automatically scaled to fit the trajectory.

### Output

- Individual trajectory plots saved to `individual_trajectories/[condition]/cell_[N].png` and `.pdf`

---

## 11. Sparse_Data: Temporal Down-Sampling

### What it does

Keeps only every Nth frame from each trajectory, discarding the rest. This is essential when comparing datasets acquired at different frame rates.

### Usage

```python
from diper.utils import load_data
from diper.sparse_data import run_sparse_data_analysis

data = load_data("data.xlsx")
sparsed = run_sparse_data_analysis(data, n=5, output_dir="results")

# Use sparsed data for subsequent analyses
from diper.speed import run_speed_analysis
speed_results = run_speed_analysis(sparsed, time_interval=2.5, output_dir="results")
```

### When to use

- Comparing TIRF data acquired at 10 fps with data at 100 fps
- Matching frame rates between cell migration experiments performed on different days
- Testing the sensitivity of persistence measurements to temporal resolution (direction autocorrelation is more robust than the directionality ratio)

### Important

When you sparse data, the effective time interval changes. If the original time interval was 0.5 minutes and you keep every 5th frame, the new time interval is 2.5 minutes. You must update the `time_interval` parameter in all subsequent analyses.

---

## 12. Speed: Average Cell Speed

### What it does

Calculates the **average instantaneous speed** for each trajectory and then provides summary statistics (mean, SEM) per condition. Instantaneous speed is:

**v(t) = sqrt[(x(t+1) - x(t))^2 + (y(t+1) - y(t))^2] / dt**

### Usage

```python
from diper.utils import load_data
from diper.speed import run_speed_analysis

data = load_data("data.xlsx")
results = run_speed_analysis(data, time_interval=1.0, output_dir="results")

# Access per-cell speeds
for condition, result in results.items():
    speeds = result['cell_speeds']
    summary = result['summary']
    print(f"{condition}:")
    print(f"  Mean speed: {summary[summary['Statistic']=='Grand Average']['Value'].iloc[0]:.3f}")
    print(f"  SEM: {summary[summary['Statistic']=='SEM']['Value'].iloc[0]:.3f}")
    print(f"  N cells: {int(summary[summary['Statistic']=='Cell Count']['Value'].iloc[0])}")
```

### Output

- `cell_speeds_[condition].csv` --- individual cell average speeds
- `speed_summary_[condition].csv` --- mean, SEM, N
- `speed_summary_all.csv` --- combined summary
- `speed_by_cell.png/.pdf` --- box plot with individual data points overlaid

### Units

Speed is in **coordinate units per time unit**. If your coordinates are in micrometres and your time interval is in seconds, speed will be in um/s. For cell migration with coordinates in um and frame intervals in minutes, speed will be in um/min.

---

## 13. Dir_Ratio: The Directionality Ratio

### What it does

Calculates the directionality ratio (d/D) as a function of elapsed time:

- **d(t):** straight-line distance from the starting position at time t
- **D(t):** cumulative path length up to time t

Also reports the **endpoint directionality ratio** (the ratio at the last time point of each trajectory).

### Usage

```python
from diper.utils import load_data
from diper.dir_ratio import run_dir_ratio_analysis

data = load_data("data.xlsx")
results = run_dir_ratio_analysis(data, time_interval=1.0, output_dir="results")

# Access endpoint ratios
for condition, ratios in results['lastpoint'].items():
    import numpy as np
    mean_ratio = np.mean(ratios)
    sem = np.std(ratios) / np.sqrt(len(ratios))
    print(f"{condition}: {mean_ratio:.3f} +/- {sem:.3f} (n={len(ratios)})")
```

### Output

- `overtime/dir_ratio_overtime_[condition].csv` --- time-course data
- `lastpoint/dir_ratio_last_[condition].csv` --- endpoint ratios per cell
- `dir_ratio_overtime.png/.pdf` --- directionality ratio vs. time
- `dir_ratio_lastpoint.png/.pdf` --- endpoint bar chart

### Limitations

The directionality ratio is **biased by speed**. Use direction autocorrelation (Section 15) as the primary persistence measure. The directionality ratio is included for comparison with existing literature.

---

## 14. MSD: Mean Square Displacement

### What it does

Calculates the mean square displacement as a function of time lag using **overlapping intervals** for better statistics:

**MSD(dt) = < (x(t+dt) - x(t))^2 + (y(t+dt) - y(t))^2 >**

Plots on both log-log and linear scales, and extracts the **diffusion exponent alpha** from the log-log slope.

### Usage

```python
from diper.utils import load_data
from diper.msd import run_msd_analysis

data = load_data("data.xlsx")
results = run_msd_analysis(
    data,
    time_interval=0.1,       # seconds
    max_interval_fraction=0.5,  # use up to half the trajectory length
    alpha_fraction=0.1,       # fit alpha from the first 10% of data points
    output_dir="results"
)

# Access alpha values
for condition, alpha in results['alpha_values'].items():
    print(f"{condition}: alpha = {alpha:.2f}")
```

### Parameters

- `max_interval_fraction` (default 0.5): Maximum time lag as a fraction of trajectory length. MSD at long time lags is noisy due to fewer data points. Using only up to half the trajectory is a common practice.
- `alpha_fraction` (default 0.1): Fraction of MSD data points (from the short-lag end) used to fit the log-log slope for the diffusion exponent. A small fraction captures the initial scaling behaviour.

### Output

- `msd_avg_[condition].csv` --- averaged MSD with SEM
- `msd_cell_[N]_[condition].csv` --- individual cell MSD
- `msd_alpha_[condition].csv` --- alpha and R-squared
- `msd_alpha_all.csv` --- combined alpha values
- `msd_log_log.png/.pdf` --- log-log MSD plot with alpha in legend
- `msd_linear.png/.pdf` --- linear MSD plot

### Interpreting alpha

| Alpha | Motion type | Example |
|---|---|---|
| ~1.0 | Brownian diffusion | Free diffusion in membrane; immobile PIEZO1 puncta (Bertaccini et al., 2025, Fig. 2I) |
| ~1.5 | Persistent random walk | Typical migrating cells |
| ~2.0 | Ballistic / directed | Active transport along cytoskeleton |
| < 1.0 | Sub-diffusive / confined | Tethered membrane proteins; confined organelles |

---

## 15. Autocorrel: Direction Autocorrelation

### What it does

Calculates the **direction autocorrelation** function --- the core analysis of DiPer and the primary reason the software exists:

**C(dt) = < cos(theta(t, t+dt)) >**

This is computed by:
1. Calculating displacement vectors between consecutive positions for each trajectory
2. Normalising these vectors to unit length
3. Computing the dot product between normalised vectors separated by time lag dt
4. Averaging over all valid time pairs and all trajectories per condition

### Usage

```python
from diper.utils import load_data
from diper.autocorrel import run_autocorrelation_analysis

data = load_data("data.xlsx")
results = run_autocorrelation_analysis(
    data,
    time_interval=1.0,
    max_intervals=30,  # compute autocorrelation up to 30 time steps
    output_dir="results"
)

# Access averaged autocorrelation
for condition, df in results.items():
    print(f"\n{condition}:")
    print(df[['time_interval', 'avg_autocorr', 'sem']].head(10))
```

### Parameters

- `max_intervals` (default 30): Maximum number of time steps for the autocorrelation calculation. Longer intervals give more information about long-range persistence but become noisier (fewer data points per trajectory contribute).

### Output

- `autocorr_[condition].csv` --- averaged autocorrelation with SEM and N
- `autocorr_stats_[condition].csv` --- per-trajectory autocorrelation values at each time interval
- `autocorrelation.png/.pdf` --- decay curve per condition with error bars

### Why this is the gold standard

The direction autocorrelation:
- Depends **only on angles** between displacement vectors, not on step sizes (speeds)
- Is **unbiased** with respect to cell speed
- Provides persistence information **at all time scales**
- Can distinguish cells that are equally fast but differently persistent
- Is the scientifically correct way to compare persistence when speed differs between conditions

---

## 16. Autocorrel_NoGaps: Handling Stationary Periods

### What it does

A variant of direction autocorrelation that handles **stationary periods** (where a cell or particle does not move between frames). When displacement is below a threshold, the direction is undefined. This module adds a **small random displacement** to fill these gaps, preventing undefined angles from biasing the autocorrelation.

### When to use

- **PIEZO1-HaloTag puncta** that have immobile periods (the "immobile" population in Bertaccini et al., 2025)
- Slowly moving cells where some frames show zero displacement due to localisation noise
- Any trajectory data with frequent stationary frames

### Usage

```python
from diper.utils import load_data
from diper.autocorrel_nogaps import run_autocorrelation_nogaps_analysis

data = load_data("data.xlsx")
results = run_autocorrelation_nogaps_analysis(
    data,
    time_interval=0.1,
    max_intervals=30,
    threshold=0.05,  # displacements below 0.05 um treated as stationary
    output_dir="results"
)
```

### Parameters

- `threshold` (default 0.0): Distance below which movement is considered stationary. Set this based on your localisation precision. For TIRF single-molecule data with ~30 nm localisation error, a threshold of 0.05 um is reasonable.

### How it works

For each pair of consecutive frames where the displacement magnitude is less than or equal to the threshold:
1. A random angle is generated uniformly in [0, 2*pi)
2. A small random displacement slightly above the threshold is applied
3. This replaces the zero-displacement step with a random direction

The result is that stationary periods contribute random (uncorrelated) directions rather than undefined or artificially correlated values.

---

## 17. Autocorrel_3D: Three-Dimensional Analysis

### What it does

Extends the direction autocorrelation to three-dimensional trajectories, using 3D displacement vectors and their dot products.

### When to use

- Trajectories from **light-sheet microscopy** (e.g., AO-LLSM imaging of PIEZO1-HaloTag in micropatterned neural rosettes, as in Bertaccini et al., 2025, Fig. 5)
- 3D cell migration data from confocal time-lapse imaging
- Volumetric particle tracking data

### Usage

```python
from diper.utils import load_data
from diper.autocorrel_3d import run_autocorrelation_3d_analysis

# Data must include Z coordinates in column 7
data = load_data("3d_tracks.xlsx")
results = run_autocorrelation_3d_analysis(
    data,
    time_interval=1.0,
    max_intervals=25,
    output_dir="3d_results"
)
```

### Requirements

Input data must include a **7th column** (index 6) with Z coordinates. If Z coordinates are not present, the module will skip those conditions with a warning.

---

## 18. Vel_Cor: Normalised Velocity Autocorrelation

### What it does

Calculates the **normalised velocity autocorrelation**, which uses un-normalised displacement vectors (velocity vectors). Unlike the direction autocorrelation, this preserves speed information:

**Cv(dt) = < v(t) . v(t+dt) > / < |v|^2 >**

### When to use

- When you want to capture both speed and directional changes in a single metric
- Comparing conditions where speed changes are themselves informative
- Complementary analysis alongside direction autocorrelation

### Usage

```python
from diper.utils import load_data
from diper.vel_cor import run_vel_cor_analysis

data = load_data("data.xlsx")
results = run_vel_cor_analysis(
    data,
    time_interval=1.0,
    max_step_fraction=1/3,
    output_dir="results"
)
```

### Parameters

- `max_step_fraction` (default 1/3): Maximum step size as a fraction of trajectory length. Limits the time lag to one third of the trajectory to ensure reliable statistics.

---

## 19. Interpreting Trajectory Plots

### Origin-centred plots (Plot_At_Origin)

- **Isotropic spread:** Trajectories fan out equally in all directions --- random migration.
- **Asymmetric spread:** Trajectories biased toward one direction --- directed migration (e.g., chemotaxis toward a wound edge).
- **Tight cluster near origin:** Low motility or confined motion (e.g., immobile PIEZO1-HaloTag puncta show paths within ~1 um of origin).
- **Wide spread with long trajectories:** High motility (e.g., mobile PIEZO1 puncta with path lengths exceeding 3 um in 5 seconds; Bertaccini et al., 2025, Fig. 2G-H).

### Comparing conditions

If "WT" trajectories spread widely and "PIEZO1_KO" trajectories cluster near the origin, PIEZO1 loss reduces migration. But is this due to reduced speed, reduced persistence, or both? The Speed and Autocorrel analyses will disentangle these.

---

## 20. Interpreting Speed

### What speed tells you

Speed measures how fast objects move, independent of direction.

### Common scenarios in PIEZO1 research

- **WT faster than PIEZO1 KO:** PIEZO1-mediated Ca2+ influx may promote contractility and cell motility.
- **Same speed, different persistence:** PIEZO1 affects directional decision-making without altering the migration machinery.
- **Yoda1-treated cells faster than control:** PIEZO1 activation increases motility.
- **Different speed with different puncta populations:** Mobile PIEZO1-HaloTag puncta move faster than the apparent motion of immobile puncta (which is dominated by localisation noise).

---

## 21. Interpreting the Directionality Ratio

### The curve

The directionality ratio starts at 1 and decays over time. More persistent cells maintain a higher ratio longer.

### Endpoint value

The ratio at the last time point is commonly reported but depends on observation time (longer movies give lower endpoint ratios). Always report the observation duration.

### Bias warning

The directionality ratio is biased by speed. If condition A is faster with the same true persistence as condition B, condition A will show a higher directionality ratio. Use direction autocorrelation as the primary measure.

---

## 22. Interpreting MSD Plots

### Log-log slope

On a log-log scale, MSD vs. time lag is approximately linear. The slope (alpha) indicates motion type:

- **alpha ~ 1:** Brownian diffusion (random walk)
- **alpha ~ 1.5:** Persistent random walk (typical migrating cells)
- **alpha ~ 2:** Ballistic (directed) motion
- **alpha < 1:** Subdiffusive (confined) motion

### Extracting the diffusion coefficient

For diffusive motion (alpha ~ 1):

**MSD = 4D * dt** (in 2D)

So D = MSD / (4 * dt) from the linear portion of the curve.

In Bertaccini et al. (2025), the diffusion coefficient for mobile PIEZO1-HaloTag puncta in endothelial cells was 0.029 um^2/s, and for immobile puncta 0.003 um^2/s. These values fall within the expected range for membrane ion channels.

### Comparing conditions

- **Higher MSD at same lag time:** More area explored (faster, more persistent, or both).
- **Different slopes:** Different motion types.
- **MSD plateau at long lags:** Confined motion (cells trapped in a region).

---

## 23. Interpreting Direction Autocorrelation

### The decay curve

The autocorrelation starts at 1 (by convention, or at the first lag) and decays toward 0:

- **Rapid decay:** Low persistence --- the object quickly forgets its direction.
- **Slow decay:** High persistence --- direction is maintained for many time steps.
- **Exponential decay C(dt) = exp(-dt / tau):** Classic persistent random walk. tau is the **persistence time**.

### Extracting persistence time

Fit the autocorrelation curve to:

**C(dt) = exp(-dt / tau)**

where tau is the persistence time. In Python:

```python
from scipy.optimize import curve_fit
import numpy as np

def exp_decay(t, tau):
    return np.exp(-t / tau)

# Fit
popt, pcov = curve_fit(exp_decay, time_intervals, autocorr_values, p0=[5.0])
tau = popt[0]
print(f"Persistence time: {tau:.2f}")
```

### Comparing conditions

- **Condition A decays faster than B:** A is less persistent (regardless of speed).
- **Same decay, different speed:** Same directional persistence but different motility.

---

## 24. Why Direction Autocorrelation is Better Than the Directionality Ratio

### The speed bias problem

Consider two populations with identical persistence time (tau = 10 min):
- **Population A:** Speed = 1 um/min
- **Population B:** Speed = 2 um/min

The directionality ratio will be **higher** for Population B (faster cells appear more persistent). The direction autocorrelation will be **identical** because both populations turn at the same rate.

### When this matters for PIEZO1

PIEZO1 activation or knockout often affects cell speed (via Ca2+-dependent contractility) simultaneously with persistence. The directionality ratio conflates these effects. The direction autocorrelation cleanly isolates the persistence component.

---

## 25. Workflow 1: Complete Analysis of a Two-Condition Experiment

### Scenario

You have tracked cells in two conditions (Control vs. Drug) and want to characterise how the treatment affects migration.

### Script

```python
from diper.utils import load_data, ensure_output_dir
from diper.plot_at_origin import run_plot_at_origin_analysis
from diper.speed import run_speed_analysis
from diper.msd import run_msd_analysis
from diper.autocorrel import run_autocorrelation_analysis
from diper.dir_ratio import run_dir_ratio_analysis

# Parameters
data = load_data("two_conditions.xlsx")  # Sheets: "Control", "Drug"
output_dir = "two_condition_results"
dt = 5.0  # 5-minute frame interval

ensure_output_dir(output_dir)

# Step 1: Visualise
run_plot_at_origin_analysis(data, output_dir=output_dir)

# Step 2: Speed
speed = run_speed_analysis(data, time_interval=dt, output_dir=output_dir)

# Step 3: MSD
msd = run_msd_analysis(data, time_interval=dt, output_dir=output_dir)

# Step 4: Direction autocorrelation (the key analysis)
autocorr = run_autocorrelation_analysis(data, time_interval=dt, output_dir=output_dir)

# Step 5: Directionality ratio (for literature comparison)
dir_ratio = run_dir_ratio_analysis(data, time_interval=dt, output_dir=output_dir)

# Summary
import numpy as np
for condition in speed:
    s = speed[condition]['summary']
    avg = s[s['Statistic'] == 'Grand Average']['Value'].iloc[0]
    alpha = msd['alpha_values'].get(condition, float('nan'))
    print(f"{condition}: speed={avg:.2f}, alpha={alpha:.2f}")
```

---

## 26. Workflow 2: Analysing PIEZO1-Dependent Migration Changes

### Scenario

You want to determine whether PIEZO1 affects cell migration persistence using hiPSC-derived endothelial cells or keratinocytes, comparing wild-type vs. PIEZO1-knockout or pharmacologically modulated cells.

### Experimental design

- **Condition 1:** WT cells (or DMSO control)
- **Condition 2:** PIEZO1 KO (or Yoda1-treated, or GsMTx4-inhibited)
- Track at least 30--50 cells per condition
- Use consistent imaging conditions (same frame rate, duration, magnification)

### Analysis script

```python
from diper.utils import load_data, ensure_output_dir
from diper.speed import run_speed_analysis
from diper.msd import run_msd_analysis
from diper.autocorrel import run_autocorrelation_analysis

data = load_data("piezo1_migration.xlsx")  # Sheets: "WT", "PIEZO1_KO"
output = "piezo1_results"
dt = 5.0  # minutes

ensure_output_dir(output)

speed = run_speed_analysis(data, time_interval=dt, output_dir=output)
msd = run_msd_analysis(data, time_interval=dt, output_dir=output)
autocorr = run_autocorrelation_analysis(data, time_interval=dt, output_dir=output)

# Interpretation table
import numpy as np
for cond in speed:
    s = speed[cond]['summary']
    avg_speed = s[s['Statistic'] == 'Grand Average']['Value'].iloc[0]
    alpha = msd['alpha_values'].get(cond, float('nan'))
    print(f"{cond}: speed = {avg_speed:.3f}, alpha = {alpha:.2f}")
```

### Interpretation

| Speed | Persistence (Autocorrel) | Interpretation |
|---|---|---|
| Decreased | Decreased | PIEZO1 affects both migration machinery and directional decision-making |
| Decreased | Unchanged | PIEZO1 affects speed only (e.g., contractility) |
| Unchanged | Decreased | PIEZO1 specifically affects directional persistence |
| Unchanged | Unchanged | PIEZO1 does not affect 2D migration under these conditions |

---

## 27. Workflow 3: PIEZO1-HaloTag Single-Particle Tracking with DiPer

### Scenario

You have tracked PIEZO1-HaloTag puncta in TIRF movies using ThunderSTORM (localisation) + FLIKA (linking), following the pipeline in Bertaccini et al. (2025). You want to characterise the mobility of these puncta.

### Analysis

```python
from diper.utils import load_data, ensure_output_dir
from diper.plot_at_origin import run_plot_at_origin_analysis
from diper.speed import run_speed_analysis
from diper.msd import run_msd_analysis
from diper.autocorrel import run_autocorrelation_analysis
from diper.autocorrel_nogaps import run_autocorrelation_nogaps_analysis

# TIRF at 10 fps -> dt = 0.1 seconds
data = load_data("piezo1_puncta.xlsx")  # Sheets: "Mobile", "Immobile"
output = "puncta_analysis"
dt = 0.1  # seconds

ensure_output_dir(output)

# Visualise: mobile puncta spread widely, immobile cluster near origin
run_plot_at_origin_analysis(data, output_dir=output)

# Speed: mobile puncta are faster
speed = run_speed_analysis(data, time_interval=dt, output_dir=output)

# MSD: mobile puncta have alpha > 1, immobile alpha ~ 1 (Brownian)
msd = run_msd_analysis(data, time_interval=dt, output_dir=output)

# Autocorrelation: use NoGaps for immobile puncta (many zero-displacement steps)
autocorr = run_autocorrelation_nogaps_analysis(
    data, time_interval=dt, max_intervals=20,
    threshold=0.03,  # 30 nm ~ localisation precision
    output_dir=output
)

for cond in msd['alpha_values']:
    print(f"{cond}: alpha = {msd['alpha_values'][cond]:.2f}")
```

### Expected results

Based on Bertaccini et al. (2025):
- **Mobile puncta:** Path length > 3 um at 5 s; diffusion coefficient ~0.029 um^2/s; sub-Brownian MSD at longer times
- **Immobile puncta:** Path length < 3 um at 5 s; diffusion coefficient ~0.003 um^2/s; MSD consistent with localisation noise
- The cutoff of 3 um path length at 5 seconds separates the two populations

---

## 28. Workflow 4: Batch Processing Multiple Experiments

### Scenario

You have tracking data from multiple experimental repeats, each in a separate Excel file. You want to run the same analysis on all of them.

### Script

```python
import os
import glob
from diper.utils import load_data, ensure_output_dir
from diper.speed import run_speed_analysis
from diper.msd import run_msd_analysis
from diper.autocorrel import run_autocorrelation_analysis

# Find all Excel files
input_files = glob.glob("experiments/*.xlsx")
dt = 5.0

for filepath in input_files:
    basename = os.path.splitext(os.path.basename(filepath))[0]
    output_dir = f"batch_results/{basename}"
    ensure_output_dir(output_dir)

    print(f"\n{'='*50}")
    print(f"Processing: {basename}")
    print(f"{'='*50}")

    data = load_data(filepath)
    run_speed_analysis(data, time_interval=dt, output_dir=output_dir)
    run_msd_analysis(data, time_interval=dt, output_dir=output_dir)
    run_autocorrelation_analysis(data, time_interval=dt, output_dir=output_dir)

print("\nBatch processing complete.")
```

---

## 29. Workflow 5: Combining DiPer with u-track and FLIKA Output

### Complete pipeline

1. **Acquire** TIRF movies of PIEZO1-HaloTag labelled cells
2. **Localise** puncta with ThunderSTORM in FIJI
3. **Link** localisations into trajectories with FLIKA
4. **Separate** mobile and immobile populations by path length cutoff (e.g., 3 um at 5 s)
5. **Export** to DiPer format (see Section 5)
6. **Run** DiPer analyses: Plot_At_Origin, Speed, MSD, Autocorrel, Autocorrel_NoGaps
7. **Compare** conditions (e.g., untreated vs. Yoda1, WT vs. PIEZO1 KO)

### Separating mobile and immobile populations

```python
import pandas as pd
import numpy as np
from diper.utils import load_data, split_trajectories

data = load_data("all_puncta.xlsx")
mobile_rows = []
immobile_rows = []

for condition, df in data.items():
    trajectories = split_trajectories(df)
    for traj in trajectories:
        # Calculate total path length
        dx = traj['x'].diff()
        dy = traj['y'].diff()
        path_length = np.sqrt(dx**2 + dy**2).sum()

        if path_length > 3.0:  # 3 um cutoff
            mobile_rows.append(traj)
        else:
            immobile_rows.append(traj)

# Save as separate conditions
mobile_df = pd.concat(mobile_rows, ignore_index=True)
immobile_df = pd.concat(immobile_rows, ignore_index=True)

with pd.ExcelWriter('separated_puncta.xlsx') as writer:
    mobile_df.to_excel(writer, sheet_name='Mobile', index=False, header=True)
    immobile_df.to_excel(writer, sheet_name='Immobile', index=False, header=True)
```

---

## 30. Workflow 6: 3D Trajectory Analysis from Light-Sheet Microscopy

### Scenario

You have 3D trajectories from lattice light-sheet microscopy (e.g., AO-LLSM imaging of PIEZO1-HaloTag in micropatterned neural rosettes, as in Bertaccini et al., 2025, Fig. 5).

### Analysis

```python
from diper.utils import load_data
from diper.autocorrel_3d import run_autocorrelation_3d_analysis

# Data must have 7 columns: 3 metadata, frame, x, y, z
data = load_data("3d_lightsheet_tracks.xlsx")
results = run_autocorrelation_3d_analysis(
    data,
    time_interval=0.2,  # seconds between z-stacks
    max_intervals=25,
    output_dir="3d_results"
)
```

### Note on 3D data format

The 7th column (index 6) must contain Z coordinates. The data structure is otherwise identical to 2D:

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 |
|---|---|---|---|---|---|---|
| track1 | | | 0 | 10.5 | 20.3 | 5.1 |
| track1 | | | 1 | 11.2 | 21.1 | 5.3 |
| track1 | | | 2 | 12.0 | 22.5 | 5.8 |

---

## 31. Output File Structure

DiPer generates output in a structured directory:

```
output/
├── plots/                              # Plot_At_Origin plots
│   ├── plot_at_origin_WT.png
│   ├── plot_at_origin_WT.pdf
│   ├── plot_at_origin_PIEZO1_KO.png
│   └── plot_at_origin_PIEZO1_KO.pdf
├── individual_trajectories/            # Make_Charts output
│   ├── WT/
│   │   ├── cell_1.png / .pdf
│   │   ├── cell_2.png / .pdf
│   │   └── ...
│   └── PIEZO1_KO/
│       └── ...
├── overtime/                           # Dir_Ratio time-course data
│   └── dir_ratio_overtime_[condition].csv
├── lastpoint/                          # Dir_Ratio endpoint data
│   └── dir_ratio_last_[condition].csv
├── translated_trajectories_[condition].csv
├── sparsed_[N]_[condition].csv
├── cell_speeds_[condition].csv
├── speed_summary_[condition].csv
├── speed_summary_all.csv
├── speed_by_cell.png / .pdf
├── dir_ratio_overtime.png / .pdf
├── dir_ratio_lastpoint.png / .pdf
├── msd_avg_[condition].csv
├── msd_cell_[N]_[condition].csv
├── msd_alpha_[condition].csv
├── msd_alpha_all.csv
├── msd_log_log.png / .pdf
├── msd_linear.png / .pdf
├── autocorr_[condition].csv
├── autocorr_stats_[condition].csv
├── autocorrelation.png / .pdf
├── autocorr_nogaps_[condition].csv
├── autocorrelation_nogaps.png / .pdf
├── autocorr_3d_[condition].csv
├── autocorrelation_3d.png / .pdf
├── vel_cor_[condition].csv
└── vel_cor.png / .pdf
```

### File formats

- **CSV:** Tab-free, comma-separated data for import into any software
- **PNG:** 300 DPI raster images for presentations and manuscripts
- **PDF:** Vector graphics for publication-quality figures

---

## 32. Creating Publication-Quality Figures

### Customising DiPer plots

DiPer generates matplotlib figures that can be customised before saving:

```python
import matplotlib.pyplot as plt
from diper.utils import load_data
from diper.autocorrel import (
    run_autocorrelation_analysis,
    normalize_vectors,
    calculate_autocorrelation,
    average_autocorrelation_results
)
from diper.utils import split_trajectories

data = load_data("data.xlsx")
dt = 5.0

# Manual plotting for full control
fig, ax = plt.subplots(figsize=(8, 6))

colours = {'WT': '#2166ac', 'PIEZO1_KO': '#b2182b'}

for condition, df in data.items():
    trajectories = split_trajectories(df)
    vector_trajs = [normalize_vectors(t) for t in trajectories]
    autocorrs = [calculate_autocorrelation(t, dt, 30) for t in vector_trajs if len(t) > 1]
    avg = average_autocorrelation_results(autocorrs)

    ax.errorbar(
        avg['time_interval'], avg['avg_autocorr'], yerr=avg['sem'],
        label=condition, color=colours.get(condition, 'grey'),
        marker='o', markersize=5, capsize=3, linewidth=2
    )

ax.set_xlabel("Time interval (min)", fontsize=14)
ax.set_ylabel("Direction autocorrelation", fontsize=14)
ax.set_ylim(-0.1, 1.05)
ax.legend(fontsize=12, frameon=False)
ax.tick_params(labelsize=12)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

fig.savefig("publication_autocorr.pdf", dpi=300, bbox_inches='tight')
fig.savefig("publication_autocorr.png", dpi=300, bbox_inches='tight')
```

### Recommended figure panels for a migration paper

1. **Representative trajectories** (Plot_At_Origin) --- panels for each condition side-by-side
2. **Speed comparison** (box plot with individual data points; add p-values from SciPy)
3. **MSD plot** (log-log, conditions overlaid, with alpha values annotated)
4. **Direction autocorrelation** (conditions overlaid, with error bars)

### Re-plotting DiPer CSV output in other software

All DiPer results are saved as CSV files that can be imported into OriginPro, GraphPad Prism, R (ggplot2), or any other graphing tool. Key files for re-plotting:

- `autocorr_[condition].csv` --- columns: `time_interval`, `avg_autocorr`, `sem`, `n`
- `msd_avg_[condition].csv` --- columns: `time_interval`, `avg_msd`, `sem`, `n`
- `cell_speeds_[condition].csv` --- columns: `Cell Number`, `Average Speed`

---

## 33. Common Problems and Solutions

### Data loading errors

**"CSV file doesn't have enough columns"**
- Ensure your data has at least 6 columns (3 metadata + frame + X + Y)
- Check for missing columns or extra delimiters

**"Sheet [name] doesn't have enough columns"**
- Verify each Excel worksheet has the required column structure
- Check for hidden columns or merged cells

### No trajectories detected

- Verify frame numbers increase within each trajectory and reset/decrease at boundaries
- Ensure frame numbers are numeric, not text strings
- Check for empty rows or NaN values in the frame column

### Autocorrelation is very noisy

- You need more trajectories. Aim for at least 30 per condition with at least 20 time points each.
- Short trajectories produce unreliable autocorrelation at long time lags.
- Reduce `max_intervals` to only include time lags with sufficient data.

### MSD is noisy at long time lags

- This is expected. At long lags, fewer data points contribute.
- Only interpret MSD up to about 1/4 of the total trajectory length.
- Reduce `max_interval_fraction` (e.g., from 0.5 to 0.25).

### Speed values seem wrong

- Check your coordinate units and time interval. Speed = distance_units / time_units.
- Verify the `time_interval` parameter matches your actual frame rate.
- For TIRF at 10 fps, `time_interval = 0.1` seconds.
- For cell migration at 1 frame per 5 minutes, `time_interval = 5.0` minutes.

### Memory errors with large datasets

- Use `sparse_data` to reduce dataset size before other analyses
- Process conditions one at a time by loading individual sheets
- Use `--no-plots` to skip plot generation (plotting large datasets is memory-intensive)

### Empty or missing output plots

- Verify that matplotlib is installed and the backend is configured
- Check that the output directory is writable
- Use `--no-plots` and manually plot from the CSV output if needed

---

## 34. Performance Tips for Large Datasets

### Dataset size guidelines

| Dataset size | Expected performance |
|---|---|
| < 100 trajectories, < 100 frames | Seconds |
| 100--1000 trajectories | Minutes |
| > 1000 trajectories, > 1000 frames | May require sparsing or batching |

### Optimisation strategies

1. **Sparse first:** If you have high-frame-rate data (e.g., 100 fps TIRF), sparse to a reasonable interval before running computationally intensive analyses (MSD, autocorrelation).

2. **Process conditions separately:** Load and analyse one condition at a time if memory is limited.

3. **Reduce max_intervals:** For autocorrelation, using `max_intervals=20` instead of 30 reduces computation by 1/3.

4. **Skip unnecessary analyses:** Use `--analysis` to run only what you need.

5. **Disable plots:** Use `--no-plots` for batch processing, then generate plots only for final results.

---

## 35. DiPer Python vs. DiPer Excel VBA

| Feature | DiPer Excel VBA | DiPer Python |
|---|---|---|
| **Environment** | Microsoft Excel | Python (any OS) |
| **Installation** | Copy-paste VBA macros | `pip install` |
| **User interface** | Excel GUI + VBA Editor | Command line + Python scripts |
| **Batch processing** | Manual only | Fully scriptable |
| **Reproducibility** | Depends on manual steps | Version-controlled scripts |
| **3D analysis** | Limited (autocorrelation only) | Full 3D autocorrelation module |
| **Stationary handling** | Not available | Autocorrel_NoGaps module |
| **Velocity autocorrelation** | Not available | Vel_Cor module |
| **Output formats** | Excel charts | PNG, PDF, CSV, Excel |
| **Large datasets** | Slow (Excel row limits) | Handles millions of points |
| **Statistical testing** | Must export | Direct (SciPy, statsmodels) |
| **Integration** | Standalone | NumPy, pandas, trackpy, SciPy |
| **Learning curve** | Very low (Excel) | Moderate (Python basics) |
| **Best for** | Quick interactive analysis | Reproducible, large-scale, automated pipelines |

### When to use the Excel VBA version

- Quick one-off analysis with a small dataset
- Lab members who are not comfortable with Python
- When you need to visually inspect and edit data in Excel alongside the analysis

### When to use the Python version

- Reproducible, scripted analysis workflows
- Large datasets (hundreds of trajectories)
- Batch processing multiple experiments
- 3D trajectory analysis
- Integration with other Python tools (trackpy, SciPy, etc.)
- Automated pipelines from tracking to publication figures

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using the Python implementation of DiPer for quantitative analysis of directional persistence in cell migration and particle trajectories. The key advantage of DiPer is its calculation of direction autocorrelation, an unbiased measure of persistence that is decoupled from cell speed --- essential when comparing conditions that may affect both speed and persistence.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*Citation: Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. Nature Protocols, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131*
