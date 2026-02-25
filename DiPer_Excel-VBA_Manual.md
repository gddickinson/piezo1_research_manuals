# DiPer Manual for Biology Researchers

**A Comprehensive Guide for Analysing Directional Persistence in Cell Migration and Particle Trajectories**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why DiPer?](#1-introduction-why-diper)
2. [Installing DiPer](#2-installing-diper)
3. [The Mathematics of Directional Persistence](#3-the-mathematics-of-directional-persistence)

**Part II: Preparing Your Data**

4. [Input File Format](#4-input-file-format)
5. [Preparing Tracking Data from Other Software](#5-preparing-tracking-data-from-other-software)

**Part III: The DiPer Programs**

6. [Overview of the DiPer Suite](#6-overview-of-the-diper-suite)
7. [Plot_At_Origin: Trajectory Plots](#7-plot_at_origin-trajectory-plots)
8. [Make_Charts: Individual Trajectory Plots](#8-make_charts-individual-trajectory-plots)
9. [Sparse_Data: Temporal Down-Sampling](#9-sparse_data-temporal-down-sampling)
10. [Speed: Average Cell Speed](#10-speed-average-cell-speed)
11. [DirRatio: The Directionality Ratio](#11-dirratio-the-directionality-ratio)
12. [MSD: Mean Square Displacement](#12-msd-mean-square-displacement)
13. [Dir_AutoCorr: Direction Autocorrelation](#13-dir_autocorr-direction-autocorrelation)

**Part IV: Running DiPer Step by Step**

14. [How to Run a DiPer Macro](#14-how-to-run-a-diper-macro)
15. [Complete Analysis Walkthrough](#15-complete-analysis-walkthrough)

**Part V: Interpreting Results**

16. [Interpreting Trajectory Plots](#16-interpreting-trajectory-plots)
17. [Interpreting Speed](#17-interpreting-speed)
18. [Interpreting the Directionality Ratio](#18-interpreting-the-directionality-ratio)
19. [Interpreting MSD Plots](#19-interpreting-msd-plots)
20. [Interpreting Direction Autocorrelation](#20-interpreting-direction-autocorrelation)
21. [Why Direction Autocorrelation is Better Than the Directionality Ratio](#21-why-direction-autocorrelation-is-better-than-the-directionality-ratio)

**Part VI: Practical Workflows**

22. [Workflow 1: Comparing Cell Migration Under Two Conditions](#22-workflow-1-comparing-cell-migration-under-two-conditions)
23. [Workflow 2: Analysing PIEZO1-Dependent Migration Changes](#23-workflow-2-analysing-piezo1-dependent-migration-changes)
24. [Workflow 3: Particle Trajectory Analysis (Non-Cell Applications)](#24-workflow-3-particle-trajectory-analysis-non-cell-applications)
25. [Workflow 4: Combining DiPer with u-track Output](#25-workflow-4-combining-diper-with-u-track-output)

**Part VII: Tips and Troubleshooting**

26. [Common Problems and Solutions](#26-common-problems-and-solutions)
27. [Tips for Publication-Quality Figures](#27-tips-for-publication-quality-figures)
28. [DiPer vs. Other Migration Analysis Tools](#28-diper-vs-other-migration-analysis-tools)

---

## 1. Introduction: Why DiPer?

### What is DiPer?

DiPer (Directional Persistence) is a suite of open-source **Excel VBA macro programs** for the quantitative analysis of cell migration trajectories in two dimensions. It was developed to provide an unbiased measure of directional persistence that is independent of cell speed --- the **direction autocorrelation** function.

DiPer was developed by **Roman Gorelik** and **Alexis Gautreau** at the **Laboratoire d'Enzymologie et Biochimie Structurales (LEBS)**, CNRS, Gif-sur-Yvette, France.

### Citation

Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. *Nature Protocols*, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131

### What DiPer provides

DiPer calculates and plots several key migration parameters:

- **Trajectory plots** (individual and collective, centred at origin)
- **Cell speed** (average instantaneous speed per condition)
- **Directionality ratio** (displacement / path length over time)
- **Mean square displacement (MSD)** (area explored over time, log-log plot)
- **Direction autocorrelation** (unbiased persistence measure)

### Why DiPer for our research?

- **Unbiased persistence measurement:** The direction autocorrelation depends only on the angles of movement vectors, completely decoupled from speed. This is critical when comparing conditions where cell speed changes (e.g., PIEZO1 knockout vs. wild-type), because speed differences bias the classical directionality ratio.
- **Publication-quality plots:** DiPer generates Excel charts formatted for direct use in publications.
- **No programming required:** Runs entirely within Microsoft Excel via VBA macros.
- **Familiar environment:** Most researchers already use Excel for organising tracking data.
- **Complete analysis suite:** Speed, directionality ratio, MSD, and direction autocorrelation in one package.
- **Transparent:** All intermediate calculations are displayed in the spreadsheet, making it easy to verify and understand the analysis.

### What DiPer does NOT do

- **Tracking:** DiPer analyses pre-existing trajectory data. You must first track your cells using ImageJ/FIJI (Manual Tracking plugin), u-track, TrackMate, or similar software.
- **Statistical tests:** DiPer computes the metrics but does not perform statistical comparisons between conditions. Export the results and use GraphPad Prism, R, or Python for statistics.
- **3D analysis:** Most DiPer programs are designed for 2D trajectories. Direction autocorrelation can be used for 3D (since it is based on angles between sequential displacement vectors), but the other tools are 2D-specific.
- **Automated batch processing:** Each macro must be run manually.

---

## 2. Installing DiPer

### Requirements

- **Microsoft Excel** (Windows or macOS)
- VBA macros must be enabled (see below)
- No additional software is required

### Obtaining DiPer

The DiPer programs are provided as supplementary data files with the Nature Protocols paper. Download the text files from: https://www.nature.com/articles/nprot.2014.131#Sec26

The suite consists of the following files:

| File | Supplementary Data # | Function |
|---|---|---|
| `Plot_At_Origin.txt` | 1 | Plot all trajectories from the origin |
| `Make_Charts.txt` | 2 | Plot each trajectory individually |
| `Sparse_Data.txt` | 3 | Temporal down-sampling of trajectories |
| `Speed.txt` | 6 | Calculate and plot average speed |
| `DirRatio.txt` | 7 | Calculate and plot directionality ratio |
| `MSD.txt` | 8 | Calculate and plot mean square displacement |
| `Dir_AutoCorr.txt` | 9 | Calculate and plot direction autocorrelation |

### Enabling VBA macros in Excel

**Windows:**
1. File → Options → Trust Center → Trust Center Settings
2. Macro Settings → Enable all macros (or "Disable all macros with notification")
3. Also check "Trust access to the VBA project object model"

**macOS:**
1. Excel → Preferences → Security & Privacy
2. Enable all macros

---

## 3. The Mathematics of Directional Persistence

### The problem with the classical directionality ratio

The most common measure of directional persistence is the **directionality ratio** (also called straightness index or persistence ratio):

**Directionality ratio = d / D**

where *d* = net displacement (straight-line distance from start to end) and *D* = total path length (sum of step lengths along the trajectory).

This ratio ranges from 0 (the cell returns to its starting point) to 1 (perfectly straight-line movement). The problem is that this ratio is **biased by cell speed**. Faster cells inherently appear more persistent because they cover more ground before random turning accumulates. When comparing a condition that affects both speed and persistence (as many perturbations do), the directionality ratio conflates the two effects.

### Direction autocorrelation: the unbiased alternative

The **direction autocorrelation** function measures how correlated a cell's direction of movement is with its direction at a previous time point. It is calculated as:

**C(Δt) = ⟨cos(θ(t, t+Δt))⟩**

where θ(t, t+Δt) is the angle between the displacement vector at time *t* and the displacement vector at time *t*+Δt, and the average ⟨...⟩ is taken over all time points and all cells.

- **C(Δt) = 1:** Perfect persistence (the cell moves in exactly the same direction)
- **C(Δt) = 0:** No directional memory (movement is random relative to the earlier direction)
- **C(Δt) < 0:** Anti-persistence (the cell tends to reverse direction)

The direction autocorrelation depends **only on the angles** between sequential displacement vectors, not on their magnitudes (speeds). This makes it an unbiased measure of directional persistence.

### Mean square displacement (MSD)

The MSD quantifies the area explored by a cell over time:

**MSD(Δt) = ⟨|r(t+Δt) - r(t)|²⟩**

On a log-log plot:
- **Slope ≈ 1:** Brownian (diffusive) motion. MSD grows linearly with time.
- **Slope ≈ 2:** Ballistic (directed) motion. MSD grows quadratically with time.
- **Slope between 1 and 2:** Persistent random walk (the typical case for cells).
- **Slope < 1:** Subdiffusive or confined motion.

---

## 4. Input File Format

### Required format

DiPer reads trajectory data from an Excel workbook where:

- **Each condition (experimental group) is in a separate worksheet** (tab)
- **Worksheet names become condition labels** in the output plots
- Within each worksheet, trajectories are listed **one below another without blank rows**
- Data is in **six columns** (though not all are required by every macro):

| Column | Content | Notes |
|---|---|---|
| A | (Optional/unused) | Can be cell ID or blank |
| B | (Optional/unused) | Can be additional metadata |
| C | (Optional/unused) | Can be additional metadata |
| D | **Frame number** | Sequential integers (1, 2, 3, ...) for each trajectory, restarting from 1 for each new cell |
| E | **X coordinate** | Position in your chosen units (pixels, µm, etc.) |
| F | **Y coordinate** | Position in your chosen units |

### Important rules

- **No header row.** Data starts in row 1.
- **No blank rows** between trajectories. The program uses the frame number resetting to 1 to identify where one trajectory ends and the next begins.
- **Frame numbers restart from 1** at the beginning of each new trajectory.
- **All trajectories within a worksheet should have the same time interval** between frames.
- Coordinates can be in any units (pixels, µm, mm), but must be consistent. If you want speed in µm/min, provide coordinates in µm and frame intervals in minutes.

### Example

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| cell1 | | | 1 | 100.5 | 200.3 |
| cell1 | | | 2 | 101.2 | 201.1 |
| cell1 | | | 3 | 102.8 | 200.9 |
| cell1 | | | 4 | 103.1 | 202.5 |
| cell2 | | | 1 | 300.2 | 150.7 |
| cell2 | | | 2 | 301.5 | 149.2 |
| cell2 | | | 3 | 303.1 | 148.8 |

Notice: cell2 starts with frame number 1 immediately after cell1 ends, with no blank row.

---

## 5. Preparing Tracking Data from Other Software

### From ImageJ/FIJI Manual Tracking plugin

The Manual Tracking plugin outputs columns: Track#, Slice#, X, Y. Rearrange so that columns D, E, F contain Slice# (frame), X, Y. Ensure frame numbers restart from 1 for each track.

### From TrackMate (FIJI)

Export spots as CSV from TrackMate. Reorganise so that for each track, you have frame, X, Y in columns D, E, F with frame numbers restarting from 1.

### From u-track (MATLAB)

```matlab
% Export u-track tracks for DiPer (see u-track manual Workflow 5)
[trackedFeatureInfo, ~] = convStruct2MatNoMS(tracksFinal);
pixelSize = 0.108;  % µm per pixel

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

### From Python (trackpy, pandas)

```python
import pandas as pd

df = pd.read_csv('tracks.csv')  # columns: track_id, frame, x, y

# Prepare DiPer format
diper_rows = []
for tid, grp in df.groupby('track_id'):
    grp = grp.sort_values('frame').reset_index(drop=True)
    for i, row in grp.iterrows():
        diper_rows.append([tid, '', '', i+1, row['x'], row['y']])

diper_df = pd.DataFrame(diper_rows, columns=['A','B','C','D','E','F'])
diper_df.to_excel('diper_input.xlsx', index=False, header=False, sheet_name='Condition1')
```

---

## 6. Overview of the DiPer Suite

| Program | What it does | Key output |
|---|---|---|
| **Plot_At_Origin** | Translates all trajectories so they start at (0,0) and plots them overlaid | Combined trajectory plot per condition |
| **Make_Charts** | Plots each trajectory individually in a separate chart | Individual trajectory charts |
| **Sparse_Data** | Removes every N-1 out of N time points | Down-sampled trajectory data |
| **Speed** | Calculates average instantaneous speed per cell and per condition | Bar chart of speed per condition |
| **DirRatio** | Calculates the directionality ratio (d/D) as a function of elapsed time | Directionality ratio vs. time plot; endpoint ratio values |
| **MSD** | Calculates mean square displacement as a function of time lag | Log-log MSD plot per condition |
| **Dir_AutoCorr** | Calculates direction autocorrelation as a function of time lag | Direction autocorrelation plot per condition |

### Recommended analysis order

1. **Plot_At_Origin** → visualise trajectories, check data quality
2. **Speed** → basic migration speed comparison
3. **MSD** → area exploration, diffusivity
4. **Dir_AutoCorr** → unbiased directional persistence
5. **DirRatio** → classical persistence (for comparison with literature)

---

## 7. Plot_At_Origin: Trajectory Plots

### What it does

For each condition (worksheet), translates all trajectories so that they originate from coordinate (0, 0), then plots them overlaid in a single chart. This visualisation immediately reveals whether cells migrate in all directions (isotropic) or have a directional bias.

### Output

- A new worksheet per condition containing the origin-centred trajectories
- A chart per condition showing all trajectories superimposed

### What to look for

- **Random migration:** Trajectories radiate in all directions roughly equally from the origin.
- **Directed migration:** Trajectories are biased toward one direction (e.g., chemotaxis).
- **Confined migration:** Trajectories stay close to the origin.
- **Outliers:** Unusually long or straight trajectories that may indicate tracking errors.

---

## 8. Make_Charts: Individual Trajectory Plots

### What it does

Plots each cell trajectory as a separate X-Y chart next to the corresponding data in the spreadsheet.

### When to use

- Quality control: identify trajectories with artefacts (jumps, tracking errors)
- Presentation: show representative individual trajectories
- Publication: select example cells that illustrate typical behaviour

---

## 9. Sparse_Data: Temporal Down-Sampling

### What it does

Removes intermediate time points from trajectories, keeping only every Nth frame. The program prompts you for the value of N.

### When to use

- When comparing datasets acquired at different frame rates
- When your tracking data has higher temporal resolution than needed and you want to match a reference condition
- To study the effect of temporal resolution on persistence measurements (the directionality ratio is sensitive to frame rate; direction autocorrelation is more robust)

### Example

If your data was acquired at 1 frame per minute and you set N = 5, the output will have one point every 5 minutes.

---

## 10. Speed: Average Cell Speed

### What it does

Calculates the **average instantaneous speed** for each cell trajectory and then averages across all cells in each condition. The instantaneous speed for each time step is:

**v(t) = √[(x(t+1) - x(t))² + (y(t+1) - y(t))²] / Δt**

where Δt is the time interval between frames.

### Output

- Average speed for each individual cell
- Mean speed per condition
- Bar chart comparing conditions

### Units

The speed is reported in **coordinate units per frame**. If your coordinates are in µm and your frame interval is in minutes, the speed will be in µm/min. DiPer does not explicitly handle unit conversion --- it depends on your input data units.

### Important note

The instantaneous speed depends on the time interval between measurements. Shorter intervals tend to give higher speeds (because more of the fine-scale wiggling is captured). This is why it's important to compare conditions that were imaged with the **same frame rate** and, if needed, use Sparse_Data to match frame rates.

---

## 11. DirRatio: The Directionality Ratio

### What it does

Calculates the directionality ratio as a function of elapsed time for each cell and then averages across all cells per condition:

**DR(t) = d(t) / D(t)**

where d(t) is the straight-line displacement from the starting position at time t, and D(t) is the total path length up to time t.

### Output

- Directionality ratio vs. elapsed time plot
- Endpoint directionality ratio (the ratio at the last time point)

### Behaviour

- At t = 1 frame, the ratio is always 1 (the cell has only moved one step, so displacement = path length)
- Over time, for a randomly migrating cell, the ratio decreases because the path meanders while net displacement grows more slowly
- The rate of decrease reflects directional persistence: more persistent cells maintain a high ratio for longer

### Limitations

As discussed in Section 3, the directionality ratio is biased by cell speed. **The direction autocorrelation (Section 13) is the preferred measure.** The directionality ratio is included in DiPer for comparison with existing literature that uses this metric.

---

## 12. MSD: Mean Square Displacement

### What it does

Calculates the mean square displacement as a function of time lag Δt and plots it on a **log-log scale**:

**MSD(Δt) = ⟨(x(t+Δt) - x(t))² + (y(t+Δt) - y(t))²⟩**

The average is taken over all possible time origins t and all cells.

### Output

- Log-log MSD vs. time lag plot per condition
- Intermediate calculation data in new worksheets

### Interpreting the log-log slope

| Log-log slope (α) | Motion type | Meaning |
|---|---|---|
| α ≈ 1 | Diffusive / Brownian | Cell migration resembles a random walk |
| α ≈ 2 | Ballistic / directed | Cell moves in a straight line |
| 1 < α < 2 | Persistent random walk | Cell has some directional memory --- **typical for most migrating cells** |
| α < 1 | Subdiffusive / confined | Cell is restricted in its movement (e.g., confined to a region) |

### Extracting the diffusion coefficient

For diffusive motion (slope ≈ 1), the diffusion coefficient D can be extracted from:

**MSD = 4DΔt** (in 2D)

So D = MSD / (4Δt) from the linear portion of the MSD curve.

---

## 13. Dir_AutoCorr: Direction Autocorrelation

### What it does

Calculates the **direction autocorrelation** function — the key output of DiPer and the reason the software was created:

**C(Δt) = ⟨cos(θ(t, t+Δt))⟩**

where θ is the angle between the displacement vector at time t and the displacement vector at time t+Δt. The cosine of this angle is computed for all pairs of time points separated by Δt, across all cells, and averaged.

### Output

- Direction autocorrelation vs. time lag plot per condition
- Intermediate calculation data

### Interpreting the curve

- **C(0) = 1** by definition (a vector is perfectly correlated with itself)
- The autocorrelation **decays towards 0** for a persistent random walker. The rate of decay reflects the strength of directional persistence.
- **Faster decay** = less persistent (the cell forgets its direction more quickly)
- **Slower decay** = more persistent (the cell maintains its direction for longer)
- The **time at which C drops to 1/e ≈ 0.37** is sometimes used as a characteristic "persistence time"

### Why this is the gold standard

The direction autocorrelation:
- Depends **only on angles**, not on step sizes (speeds)
- Is **unbiased** with respect to cell speed
- Provides persistence information **at all time scales** (not just a single endpoint value)
- Can distinguish cells that are equally fast but differently persistent

---

## 14. How to Run a DiPer Macro

### Step-by-step for each macro

1. **Prepare your input data** in an Excel workbook (see Section 4)
2. **Open the workbook** in Excel
3. **Open the Visual Basic Editor:** Press **Alt+F11** (Windows) or **⌥+F11** (macOS)
   - Alternatively: Developer tab → Visual Basic
   - If the Developer tab is not visible: File → Options → Customise Ribbon → check "Developer"
4. **Insert a new module:** In the VB Editor, click Insert → Module
5. **Paste the code:** Open the DiPer text file (e.g., `Plot_At_Origin.txt`) in a text editor, select all (Ctrl+A), copy (Ctrl+C), then paste (Ctrl+V) into the VB Editor module window
6. **Run the macro:** Press **F5** (or Run → Run Sub/UserForm) while the cursor is inside the code
7. **View the results:** Switch back to Excel. The output will appear in new worksheets and/or charts

### Tips

- Run one macro at a time per workbook
- Some macros create new worksheets. If you re-run a macro, delete the output sheets first to avoid errors
- Save your original data workbook separately before running macros, as some macros modify the data
- For Dir_AutoCorr: the computation can take several minutes for large datasets

---

## 15. Complete Analysis Walkthrough

### Step 1: Prepare data

- Open Excel
- Create one worksheet per condition (e.g., "WT", "PIEZO1_KO")
- Paste tracking data in the DiPer format (columns D=frame, E=X, F=Y, no headers, no blank rows)
- Save as .xlsx

### Step 2: Visualise trajectories

- Open VB Editor (Alt+F11)
- Insert → Module → paste `Plot_At_Origin.txt` code → F5
- Check the output charts: do trajectories look reasonable? Any obvious outliers?

### Step 3: Calculate speed

- Delete the Plot_At_Origin module (or the output sheets)
- Insert → Module → paste `Speed.txt` code → F5
- Note the average speed per condition

### Step 4: Calculate MSD

- Insert → Module → paste `MSD.txt` code → F5
- Check the log-log MSD plot
- Note the slopes

### Step 5: Calculate direction autocorrelation

- Insert → Module → paste `Dir_AutoCorr.txt` code → F5
- Compare the autocorrelation decay curves between conditions
- This is your main result for directional persistence

### Step 6: (Optional) Calculate directionality ratio

- Insert → Module → paste `DirRatio.txt` code → F5
- Compare with the direction autocorrelation results

### Step 7: Export for statistics

- Copy the output data from the DiPer worksheets
- Paste into GraphPad Prism, R, or Python for statistical testing

---

## 16. Interpreting Trajectory Plots

### Origin-centred plots (Plot_At_Origin)

- **Isotropic spread:** Trajectories fan out equally in all directions → random migration
- **Asymmetric spread:** Trajectories biased toward one direction → directed migration (chemotaxis, galvanotaxis, etc.)
- **Tight cluster:** Trajectories stay close to origin → low motility or confinement
- **Wide spread:** Cells explore a large area → high motility

### Comparing conditions

If "WT" trajectories spread widely and "PIEZO1_KO" trajectories stay near the origin, this suggests PIEZO1 loss reduces cell migration. But is it due to reduced speed, reduced persistence, or both? The subsequent analyses (Speed, MSD, Dir_AutoCorr) will disentangle these factors.

---

## 17. Interpreting Speed

### What speed tells you

Speed measures how fast cells move, independent of direction. A speed difference between conditions tells you about the cell's **migration machinery** (actin dynamics, adhesion, contractility) but not about **directional decision-making**.

### Common scenarios

- **WT faster than KO:** The perturbation reduces the cell's ability to migrate
- **Same speed, different persistence:** The perturbation affects the cell's ability to maintain direction without affecting its raw motility
- **Different speed, same persistence:** The perturbation affects the migration machinery but not the directional decision-making process

---

## 18. Interpreting the Directionality Ratio

### The curve

The directionality ratio starts at 1 and decays over time. More persistent cells maintain a higher ratio for longer.

### Endpoint value

The directionality ratio at the last time point is the most commonly reported value. However, it depends on the total observation time: longer movies give lower endpoint ratios (because cells have more time to meander).

### Bias warning

Remember: the directionality ratio is biased by speed. If condition A has higher speed and the same true persistence as condition B, condition A will show a higher directionality ratio. This is why direction autocorrelation is preferred.

---

## 19. Interpreting MSD Plots

### The log-log plot

On a log-log scale, MSD vs. time lag appears as a roughly linear relationship. The slope tells you the type of motion:

- **Slope ≈ 1:** Pure diffusion. The cell is a random walker.
- **Slope ≈ 1.5:** Persistent random walk. Typical for most migrating cells.
- **Slope ≈ 2:** Ballistic (directed) motion. The cell is moving in a straight line.
- **Slope < 1:** Confined or subdiffusive. The cell is trapped.

### Comparing conditions

- **Higher MSD at the same time lag:** Cells explore more area (could be faster, more persistent, or both)
- **Different slopes:** Different motion types (more vs. less persistent)
- **MSD plateaus at long time lags:** Confined motion (cells can't escape a region)

---

## 20. Interpreting Direction Autocorrelation

### The decay curve

The direction autocorrelation always starts at 1 (at Δt = 0) and decays toward 0. The **shape of the decay** is the key information:

- **Rapid decay:** Low persistence. The cell quickly "forgets" its direction.
- **Slow decay:** High persistence. The cell maintains its direction for a long time.
- **Exponential decay C(Δt) = exp(-Δt/τ):** Classic persistent random walk. The time constant τ is the **persistence time** --- the characteristic time over which the cell maintains its direction.

### Extracting persistence time

Fit the autocorrelation curve to an exponential decay:

C(Δt) = exp(-Δt / τ)

where τ is the persistence time. Larger τ = more persistent.

### Comparing conditions

- **Condition A decays faster than B:** A is less persistent than B (regardless of their speeds)
- **Same decay rate but different speeds:** The cells have the same directional persistence but different migration machinery
- **This is the whole point of direction autocorrelation:** It cleanly separates persistence from speed

---

## 21. Why Direction Autocorrelation is Better Than the Directionality Ratio

### The speed bias problem

Consider two cell populations:
- **Population A:** Speed = 1 µm/min, persistence time = 10 min
- **Population B:** Speed = 2 µm/min, persistence time = 10 min

Both populations have identical directional persistence (τ = 10 min). However, the directionality ratio will be **higher** for Population B because faster cells cover more ground before random turning accumulates enough to reduce the ratio.

### The direction autocorrelation solution

The direction autocorrelation for both populations will be **identical**, because it only measures the correlation of movement directions (angles), not step sizes. Both populations turn at the same rate (τ = 10 min), so their autocorrelation curves are the same.

### When this matters for PIEZO1

If PIEZO1 loss affects cell speed (e.g., through mechanosensitive calcium signalling altering contractility), the directionality ratio will conflate speed and persistence effects. The direction autocorrelation cleanly isolates the persistence component, allowing you to determine whether PIEZO1 specifically affects the cell's ability to maintain a direction.

---

## 22. Workflow 1: Comparing Cell Migration Under Two Conditions

### Scenario

You performed a wound-healing or random migration assay and tracked cells in two conditions (e.g., Control vs. Drug treatment). You want to determine how the drug affects cell speed and directional persistence.

### Steps

1. **Track cells** using your preferred software (e.g., Manual Tracking in FIJI, TrackMate, or u-track)
2. **Export coordinates** in DiPer format to an Excel workbook with two worksheets: "Control" and "Drug"
3. **Run Plot_At_Origin** → visually compare trajectory spread
4. **Run Speed** → determine if the drug affects speed
5. **Run Dir_AutoCorr** → determine if the drug affects persistence (independent of speed)
6. **Run MSD** → determine if the drug affects overall area exploration
7. **Export** speed values and autocorrelation curves for statistical testing
8. **Report:**
   - Speed: mean ± SEM per condition, t-test or Mann-Whitney
   - Direction autocorrelation: plot curves with error bars (SEM), compare decay rates
   - MSD: plot log-log curves, compare slopes

---

## 23. Workflow 2: Analysing PIEZO1-Dependent Migration Changes

### Scenario

You want to determine whether PIEZO1 affects cell migration persistence. You have tracking data from wild-type cells and PIEZO1-knockout or inhibited cells.

### Experimental design

- **Condition 1:** WT cells (or DMSO control)
- **Condition 2:** PIEZO1 KO (or Yoda1-treated, or GsMTx4-inhibited)
- Track at least 30--50 cells per condition for statistical power
- Use consistent imaging conditions (same frame rate, duration, magnification)

### Analysis

1. Prepare DiPer input (two worksheets: "WT", "PIEZO1_KO")
2. **Speed:** Does PIEZO1 loss/inhibition change speed? (Hypothesis: PIEZO1-mediated calcium influx may regulate contractility, affecting speed)
3. **Dir_AutoCorr:** Does PIEZO1 loss/inhibition change persistence? (Hypothesis: PIEZO1 mechano-feedback may regulate lamellipodial stability, affecting directional persistence)
4. **MSD:** How does PIEZO1 loss affect overall area exploration?

### Interpretation

| Speed | Persistence (Dir_AutoCorr) | Interpretation |
|---|---|---|
| ↓ | ↓ | PIEZO1 affects both migration machinery and directional decision-making |
| ↓ | = | PIEZO1 affects migration speed but not directional persistence |
| = | ↓ | PIEZO1 specifically affects directional persistence without changing speed |
| = | = | PIEZO1 does not affect 2D migration under these conditions |

---

## 24. Workflow 3: Particle Trajectory Analysis (Non-Cell Applications)

### DiPer for non-cell trajectories

DiPer can analyse any 2D trajectory, not just cell migration. Applications include:

- **PIEZO1-HaloTag puncta trajectories** from single-particle tracking (e.g., ThunderSTORM localisation linked via FLIKA, or u-track output)
- **Organelle trajectories** (vesicles, mitochondria)
- **Bacterial motility**
- **Whole organism locomotion** (C. elegans, Drosophila larvae, zebrafish)

### For PIEZO1 puncta

After tracking PIEZO1 puncta (e.g., with ThunderSTORM + FLIKA or u-track), export the tracks in DiPer format (see Section 5) and run the DiPer suite. The direction autocorrelation will reveal whether puncta exhibit persistent motion (suggesting active transport) or pure diffusion (random membrane diffusion).

In Bertaccini et al. (2025, *Nature Communications*), PIEZO1-HaloTag puncta in hiPSC-derived endothelial cells were tracked at 10 fps using TIRF microscopy and classified into two populations based on path length at 5 seconds: **mobile** (path length > 3 µm; diffusion coefficient ~0.029 µm²/s) and **immobile** (path length < 3 µm; diffusion coefficient ~0.003 µm²/s). MSD analysis revealed sub-Brownian behaviour for mobile puncta at longer time scales, suggesting anomalous diffusion. DiPer's MSD and direction autocorrelation analyses are well suited for characterising these distinct mobility behaviours.

> **Tip:** When analysing PIEZO1 puncta trajectories acquired at high frame rates (10--500 fps), consider using the Python implementation of DiPer rather than the Excel VBA version, as the Python version handles large datasets more efficiently and supports batch processing. See the **DiPer Python Manual** for details.

---

## 25. Workflow 4: Combining DiPer with u-track Output

### Complete pipeline

1. **Acquire** TIRF movies of PIEZO1-HaloTag cells labelled with Janelia Fluor HaloTag ligands (e.g., JF646 HTL at 500 pM; Bertaccini et al., 2025)
2. **Localise** puncta with ThunderSTORM in FIJI (Gaussian PSF fitting, sigma-based filtering to remove autofluorescent spots)
3. **Link** localisations into trajectories using FLIKA (max linking distance 324 nm, gap of 1 frame, minimum 4 links) or u-track in MATLAB
4. **Export** to DiPer format (see Section 5)
5. **Open** the exported Excel file
6. **Run** DiPer macros: Plot_At_Origin, Speed, MSD, Dir_AutoCorr
7. **Compare** conditions (e.g., untreated vs. Yoda1, WT vs. PIEZO1 KO, different substrates, EC vs. NSC)

### Separating mobile and immobile puncta

Following Bertaccini et al. (2025), PIEZO1-HaloTag puncta can be separated into mobile and immobile populations based on total path length: puncta with path length > 3 µm at 5 seconds are classified as **mobile**, and those below as **immobile**. Place these two populations in separate worksheets (e.g., "Mobile" and "Immobile") to analyse their persistence and diffusion characteristics independently.

### Converting u-track motion analysis to DiPer input

If u-track's motion analysis classifies tracks as "Brownian" or "directed", you can separate them into different DiPer worksheets and analyse their persistence characteristics independently.

---

## 26. Common Problems and Solutions

### "Macros are disabled"

- Enable macros in Excel's Trust Center (see Section 2)
- On macOS: Excel → Preferences → Security & Privacy → enable macros

### "Run-time error" or "Subscript out of range"

- Most likely a formatting issue in your input data
- Check: no blank rows between trajectories, no header row, frame numbers in column D restart from 1 for each trajectory
- Ensure there are no merged cells or non-numeric values in columns D, E, F

### Macro runs but produces no output / empty charts

- Verify that data is in columns D, E, F (not A, B, C)
- Check that frame numbers are in column D (not track IDs)
- Ensure worksheet names are simple (avoid special characters)

### Direction autocorrelation is very noisy

- You need more cells or longer tracks. With few cells, the averaging is insufficient.
- Try at least 30 cells per condition with at least 20 time points each.
- Short tracks produce unreliable autocorrelation at long time lags.

### MSD curves are very noisy at long time lags

- This is normal and expected. At long time lags, there are fewer independent data points for averaging.
- Only interpret the MSD up to about 1/4 of the total track length.

### Speed values seem wrong

- Check your coordinate units. If coordinates are in pixels, speed will be in pixels/frame. Convert to µm/min by multiplying by (pixel size in µm) / (frame interval in min).
- DiPer does not perform unit conversion automatically.

---

## 27. Tips for Publication-Quality Figures

### DiPer generates Excel charts

DiPer produces formatted Excel charts that can be used directly in publications. To export:

1. Click on the chart in Excel
2. Right-click → Copy (or Ctrl+C)
3. Paste into PowerPoint, Illustrator, or your manuscript as an image
4. Or: right-click → Save as Picture → choose PNG or SVG

### Improving DiPer charts

- **Axis labels:** DiPer charts may need manual adjustment of axis labels and titles
- **Colours:** Change line/marker colours in Chart Format options
- **Font size:** Increase fonts for readability in publications
- **Error bars:** DiPer plots show averaged curves. For error bars, export the data and re-plot in GraphPad or Python.

### Recommended figure panels for a migration paper

1. **Representative trajectories** (from Plot_At_Origin or Make_Charts)
2. **Speed comparison** (bar plot with individual data points)
3. **MSD plot** (log-log, all conditions overlaid)
4. **Direction autocorrelation plot** (all conditions overlaid, with error bars)

---

## 28. DiPer vs. Other Migration Analysis Tools

| Consideration | DiPer (Excel VBA) | DiPer (Python) | Cell_Motility (MATLAB) | FPCAnalysis (R) |
|---|---|---|---|---|
| **Environment** | Microsoft Excel | Python (any OS) | MATLAB | R |
| **Direction autocorrelation** | Yes (core feature) | Yes (core feature) | No | Possible |
| **Directionality ratio** | Yes | Yes | Yes | Yes |
| **MSD** | Yes (log-log) | Yes (log-log + linear) | Yes (with Fürth's formula) | Yes |
| **Speed** | Yes | Yes | Yes | Yes |
| **3D autocorrelation** | Limited | Yes (dedicated module) | No | No |
| **Stationary handling** | No | Yes (NoGaps module) | No | No |
| **Velocity autocorrelation** | No | Yes (Vel_Cor module) | No | No |
| **Batch processing** | Manual only | Fully scriptable | Scriptable | Scriptable |
| **Programming required** | No (copy-paste macros) | Yes (Python) | Yes | Yes |
| **Large datasets** | Slow (Excel limits) | Fast (millions of points) | Fast | Moderate |
| **Best for** | Quick interactive analysis | Reproducible, large-scale pipelines | MATLAB-based pipelines | Statistical analysis |

> **Note:** A Python implementation of DiPer is available that reproduces all of the VBA analyses and adds 3D autocorrelation, stationary-period handling, velocity autocorrelation, and batch processing capabilities. See the **DiPer Python Manual** for details.

### When to use DiPer

- You want the **direction autocorrelation** (the unbiased persistence measure)
- You don't want to write code
- You already have tracking data in spreadsheet format
- You want quick, publication-quality output

### When to use DiPer Python instead

- You need automated batch processing of many conditions
- You have large datasets (hundreds of trajectories from ThunderSTORM + FLIKA)
- You need 3D direction autocorrelation (e.g., light-sheet microscopy data from organoid imaging)
- You need to handle stationary periods in puncta trajectories (Autocorrel_NoGaps)
- You want to integrate with SciPy for statistical testing in the same script

### When to use something else entirely

- You need statistical testing within a dedicated statistics tool → R or OriginPro
- You want to fit persistence models (e.g., persistent random walk, Fürth's formula) → MATLAB or Python
- You need channel activity analysis (e.g., PIEZO1-HaloTag-BAPTA fluorescence idealization) → AutoDISC or pyDISC

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using DiPer for quantitative analysis of directional persistence in cell migration and particle trajectories. The key advantage of DiPer is its calculation of direction autocorrelation, an unbiased measure of persistence that is decoupled from cell speed --- essential when comparing conditions that may affect both speed and persistence.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*DiPer is open-source software distributed as supplementary material with the Nature Protocols paper.*

*Citation: Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. Nature Protocols, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131*
