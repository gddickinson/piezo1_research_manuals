# pyDISC Manual for Biology Researchers

**A Comprehensive Guide for Time Series Idealisation in Python with DISC/AutoDISC, with Application to PIEZO1-HaloTag-BAPTA Activity Recordings**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is pyDISC?](#1-introduction-what-is-pydisc)
2. [pyDISC vs. MATLAB AutoDISC](#2-pydisc-vs-matlab-autodisc)
3. [Installation](#3-installation)

**Part II: The Algorithm**

4. [How DISC Works: A Quick Summary](#4-how-disc-works-a-quick-summary)
5. [Objective Criteria: RSS, AIC, BIC, HQC](#5-objective-criteria-rss-aic-bic-hqc)
6. [The AutoDISC Decision Boundary](#6-the-autodisc-decision-boundary)
7. [HMM Refinement: Viterbi and Baum-Welch](#7-hmm-refinement-viterbi-and-baum-welch)

**Part III: Using the DISCO GUI**

8. [Launching the GUI](#8-launching-the-gui)
9. [Loading Data](#9-loading-data)
10. [The DISCO Interface](#10-the-disco-interface)
11. [Running Analysis](#11-running-analysis)
12. [Adjusting Levels Manually](#12-adjusting-levels-manually)
13. [Simulating Test Data](#13-simulating-test-data)
14. [Saving and Loading Zarr Stores](#14-saving-and-loading-zarr-stores)

**Part IV: Python API**

15. [The DISC_Sequence Class](#15-the-disc_sequence-class)
16. [The run_DISC Function](#16-the-run_disc-function)
17. [The auto_DISC Function](#17-the-auto_disc-function)
18. [Utility Functions](#18-utility-functions)
19. [Batch Processing](#19-batch-processing)

**Part V: Application to PIEZO1-HaloTag-BAPTA Data**

20. [The PIEZO1-HaloTag-BAPTA System](#20-the-piezo1-halotag-bapta-system)
21. [Preparing PIEZO1 Traces for pyDISC](#21-preparing-piezo1-traces-for-pydisc)
22. [Workflow 1: Idealising PIEZO1-BAPTA Flicker Traces](#22-workflow-1-idealising-piezo1-bapta-flicker-traces)
23. [Workflow 2: Comparing Conditions (± Yoda1)](#23-workflow-2-comparing-conditions--yoda1)
24. [Workflow 3: Extracting Dwell Times](#24-workflow-3-extracting-dwell-times)
25. [Workflow 4: GUI-Based Interactive Analysis](#25-workflow-4-gui-based-interactive-analysis)

**Part VI: Tips and Troubleshooting**

26. [Parameter Tuning Guide](#26-parameter-tuning-guide)
27. [Common Problems and Solutions](#27-common-problems-and-solutions)

---

## 1. Introduction: What is pyDISC?

### Overview

pyDISC is the **Python implementation** of the DISC (Divisive Segmentation and Clustering) and AutoDISC algorithms for single-molecule time series idealisation. It provides both a **Python API** for scripted/batch analysis and a **PyQt-based graphical user interface** (DISCO) for interactive exploration of traces.

Given a noisy fluorescence intensity trace --- for example, from a single PIEZO1-HaloTag-BAPTA punctum flickering between dim (closed) and bright (open) states --- pyDISC identifies distinct intensity levels and the precise transition points between them, producing a noise-free "idealised" trace.

### Key features

- **Pure Python** --- no MATLAB licence required
- **PyQt GUI (DISCO)** with interactive trace navigation, level adjustment, and simulation
- **AutoDISC** automated per-trace criterion selection
- **HMM refinement** with both Viterbi and Baum-Welch algorithms via pomegranate
- **Zarr-based** data I/O for efficient storage of large datasets
- **Embedded Jupyter console** in the GUI for interactive scripting
- **GPU acceleration** possible via PyTorch/pomegranate

### Citations

**DISC:** White, D.S. et al. (2020). Top-down machine learning approach for high-throughput single-molecule analysis. *eLife*, 9, e53357.

**AutoDISC:** Bandyopadhyay, A. & Goldschen-Ohm, M.P. (2021). Unsupervised selection of optimal single-molecule time series idealization criterion. *Biophysical Journal*, 120(20), 4472--4483.

**PIEZO1-HaloTag-BAPTA:** Bertaccini, G.A. et al. (2025). Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology. *Nature Communications*, 16, 5556.

### Repository

https://github.com/marcel-goldschen-ohm/pyDISC

---

## 2. pyDISC vs. MATLAB AutoDISC

| Feature | pyDISC (Python) | AutoDISC (MATLAB) |
|---|---|---|
| **Language** | Python 3.9--3.11 | MATLAB R2017b+ |
| **Licence** | MIT (free, open source) | GPL-3.0 (free, open source), but requires MATLAB licence |
| **GUI** | PyQt-based DISCO with embedded Jupyter console | MATLAB DISCO GUI |
| **HMM engine** | pomegranate (Viterbi + Baum-Welch) | Custom MATLAB Viterbi |
| **Criteria** | RSS, AIC, BIC, HQC | BIC_RSS, AIC_GMM, BIC_GMM, HQC_GMM, MDL |
| **AutoDISC** | Same SVM decision boundary | Same SVM decision boundary |
| **Data format** | NumPy arrays, Zarr stores | MATLAB .mat, .dat |
| **Level function** | np.median (default) or np.mean | Mean |
| **Divisive attempts** | Automatic (3 for short, 1 for long) | 1 |
| **HMM scan** | Optional (scans neighbouring # levels) | Not in original |
| **Interactive editing** | Add/remove/merge levels in GUI | Limited |
| **Simulation** | Built-in simulation with GUI controls | Separate scripts |

### Which to use?

- **Use pyDISC** if you work in Python, want free software, need the interactive GUI features, or want to integrate with Python-based imaging pipelines (FLIKA, napari, scikit-image)
- **Use MATLAB AutoDISC** if your pipeline is MATLAB-based (e.g., u-track output), or you need the exact MATLAB DISCO 2.0 features (dwell time fitting, trace filtering by SNR)

---

## 3. Installation

### Step 1: Create a conda environment

pyDISC requires Python < 3.12 (as of Dec 2024):

```bash
conda create -n pyDISC-env "python<3.12"
conda activate pyDISC-env
```

### Step 2: Install a PyQt backend

pyDISC uses qtpy, which works with PySide6, PyQt6, or PyQt5:

```bash
pip install PySide6
```

### Step 3: Install pyDISC

Install directly from GitHub (latest development version):

```bash
pip install pyDISC@git+https://github.com/marcel-goldschen-ohm/pyDISC
```

### Dependencies installed automatically

| Package | Purpose |
|---|---|
| numpy (<2) | Array operations |
| scipy | Statistics, signal processing |
| scikit-learn | KMeans clustering |
| pomegranate (≥1.1.1) | HMM (Viterbi, Baum-Welch), GMM |
| qtpy | Qt abstraction layer |
| qtawesome (≥1.3.0) | Icons for GUI |
| zarr | Data storage |
| qtconsole (≥5.5.2) | Embedded Jupyter console |
| pyqtgraph-ext | Enhanced plotting (custom fork) |

### Verify installation

```python
from pydisc import DISC_Sequence, DISCO
print("pyDISC installed successfully")
```

---

## 4. How DISC Works: A Quick Summary

DISC idealises a noisy time series in three stages:

**Stage 1 --- Divisive segmentation:** Recursively split the data into segments by detecting change points. The algorithm starts with all data in one segment and splits until the objective criterion is optimised. In pyDISC, the divisive segmentation uses KMeans-based splitting (which introduces some randomness), so by default the algorithm runs multiple divisive attempts (3 for traces < 1000 points, 2 for < 3000, 1 for longer) and keeps the best result.

**Stage 2 --- Agglomerative clustering:** Merge segments with similar intensity distributions back into single levels, guided by the objective criterion. This corrects over-segmentation from Stage 1.

**Stage 3 --- HMM refinement:** Refine the exact state assignments using the Viterbi algorithm (most likely state sequence) or Baum-Welch (expectation-maximisation for HMM parameters). By default, pyDISC runs 2 Viterbi repeats with state optimisation between repeats.

Additionally, pyDISC performs **post-HMM level merging**: after the HMM step, it tries merging the nearest levels and checks if the objective criterion improves. This can help remove spurious levels.

---

## 5. Objective Criteria: RSS, AIC, BIC, HQC

pyDISC supports four objective criteria. Each balances goodness-of-fit against model complexity differently:

| Criterion | Fit term | Penalty term | pyDISC name |
|---|---|---|---|
| **RSS** | n·ln(RSS/n) | ln(n)·(n_changepoints + n_levels) | `"RSS"` |
| **AIC** | −2·ln(L_GMM) | 2·(3·n_levels − 1) | `"AIC"` |
| **BIC** | −2·ln(L_GMM) | ln(n)·(3·n_levels − 1) | `"BIC"` |
| **HQC** | −2·ln(L_GMM) | 2·ln(ln(n))·(3·n_levels − 1) | `"HQC"` |

Where L_GMM is the Gaussian Mixture Model likelihood, n is the number of data points, and n_levels is the number of identified intensity levels.

### Default: BIC

The default criterion in pyDISC is `"BIC"` for both divisive segmentation and agglomerative clustering. When AutoDISC is enabled, the algorithm automatically selects between `"RSS"` and `"AIC"` on a per-trace basis.

---

## 6. The AutoDISC Decision Boundary

When `auto=True` is used, pyDISC implements the same decision boundary as MATLAB AutoDISC:

```
log₁₀(#samples) = −0.49 × SNR_effective + 4.69
```

The workflow:

1. Run DISC with RSS criterion (tends not to underfit)
2. Estimate effective SNR from the initial idealisation
3. If log₁₀(n_samples) ≥ boundary → re-run with AIC criterion
4. Otherwise → keep the RSS result

This is implemented in the `auto_DISC()` function and activated via `DISC_Sequence.run(auto=True)` or the AutoDISC checkbox in the GUI.

---

## 7. HMM Refinement: Viterbi and Baum-Welch

pyDISC uses **pomegranate** for HMM operations, providing two algorithms:

**Viterbi** (default, `hmm_algorithm='viterbi'`): Finds the single most likely state sequence given the emission distributions and transition probabilities. Fast, with optional state parameter reoptimisation between repeats (default: 2 repeats).

**Baum-Welch** (`hmm_algorithm='baum-welch'`): Full expectation-maximisation of the HMM parameters (emission means/stdevs, transition probabilities). Slower but can produce better fits. Can also be used as a final optimisation step after Viterbi.

### HMM scan

When `hmm_scan=True`, pyDISC applies the HMM to multiple numbers of levels (around the agglomeration optimum) and selects the one with the best information criterion. This is slower but can find the true number of levels more reliably.

---

## 8. Launching the GUI

### From the command line

```bash
conda activate pyDISC-env
pydisc
```

### From Python

```python
from qtpy.QtWidgets import QApplication
from pydisc import DISCO

app = QApplication([])
widget = DISCO()
widget.show()
app.exec()
```

---

## 9. Loading Data

### Programmatic loading (before showing GUI)

```python
import numpy as np
from pydisc import DISC_Sequence, DISCO
from qtpy.QtWidgets import QApplication

app = QApplication([])
widget = DISCO()

# Load your traces as a list of numpy arrays
traces = np.load('piezo1_traces.npy', allow_pickle=True)

# Convert to DISC_Sequence objects
widget.data = [DISC_Sequence(trace) for trace in traces]
# Or provide raw numpy arrays directly:
# widget.data = [trace for trace in traces]

widget.show()
app.exec()
```

### From Zarr stores

The GUI has a **Load** button (folder icon) that opens Zarr stores. Zarr is an efficient format for large array datasets. You can also save your results to Zarr from the GUI using the **Save** button.

### Supported input types

The `DISCO.data` property accepts a list of:
- **NumPy arrays** (1D float arrays)
- **DISC_Sequence objects** (which wrap a NumPy array with parameters and results)

---

## 10. The DISCO Interface

### Layout

The pyDISC DISCO GUI contains:

- **Trace plot** (top): Displays the raw noisy trace (grey) with the idealised trace overlaid (coloured steps) after analysis
- **Criterion plot** (bottom): Shows the information criterion vs. number of levels, indicating the optimal agglomeration level
- **Toolbar** with buttons for:

| Button | Icon | Function |
|---|---|---|
| **Load** | Folder | Load Zarr store |
| **Save** | Floppy disk | Save to Zarr store |
| **Simulate** | Waveform | Generate simulated test data |
| **Run (single)** | Play | Run DISC on the current trace |
| **Run (all)** | Play-all | Run DISC on all traces |
| **Settings** | Gear | DISC parameters (criteria, HMM, AutoDISC toggle) |
| **Add level** | Stairs up | Force one more level |
| **Remove level** | Stairs down | Force one fewer level |
| **Merge** | Merge icon | Merge the two nearest levels |
| **HMM** | HMM button | Run Baum-Welch optimisation on current idealisation |

- **Trace selector** (spinbox): Navigate between traces ("Trace 1 of N")
- **Bin factor** (spinbox): Temporal binning of the displayed/analysed trace
- **Embedded Jupyter console**: Interactive Python access to data and results

---

## 11. Running Analysis

### With AutoDISC (recommended)

1. Load your data
2. Open **Settings** (gear icon next to Run)
3. Ensure the **AutoDISC** checkbox is checked (it is by default)
4. Click **Run All** (play-all icon) to idealise all traces

### With manual criterion

1. Uncheck **AutoDISC**
2. Set **Divisive Criterion** and **Agglomerative Criterion** (e.g., both to "BIC")
3. Click **Run All**

### Preset configurations

The Settings panel includes two convenience buttons:

- **Faster**: Minimises computation time (fewer Viterbi repeats, no HMM scan, no Baum-Welch)
- **Most Accurate**: Maximises accuracy (HMM scan enabled, Baum-Welch final optimisation, more Viterbi repeats)

### Settings reference

| Setting | Default | Description |
|---|---|---|
| # Levels | auto | Leave empty for automatic; set a number to force that many levels |
| Divisive Criterion | BIC | Criterion for segmentation step |
| Agglomerative Criterion | BIC | Criterion for clustering step |
| AutoDISC | ✓ (checked) | Automatically select RSS or AIC per trace |
| HMM algorithm | Viterbi | Viterbi (fast) or Baum-Welch (thorough) |
| # Viterbi Repeats | 2 | Number of Viterbi passes with level reoptimisation |
| HMM scan | ☐ (unchecked) | Test multiple numbers of levels with HMM |
| Final Baum-Welch | ☐ (unchecked) | Apply Baum-Welch after Viterbi for final refinement |
| Verbose | ☐ (unchecked) | Print timing and diagnostics to stdout |

---

## 12. Adjusting Levels Manually

After running DISC, you can interactively adjust the idealisation:

- **Add level** (stairs-up button): Re-runs DISC with one additional required level. Useful if the algorithm missed a state.
- **Remove level** (stairs-down button): Re-runs DISC with one fewer level. Useful if a state was spurious.
- **Merge nearest levels** (merge button): Merges the two closest intensity levels. Useful when the algorithm has split a single state into two nearby sub-levels.
- **HMM button**: Runs Baum-Welch optimisation on the current idealisation without changing the number of levels. Refines level means, variances, and transition probabilities.

These adjustments are per-trace and do not affect other traces.

---

## 13. Simulating Test Data

The GUI includes a built-in trace simulator for testing and validation:

1. Click the **Simulation settings** gear icon
2. Configure: number of traces, number of samples, level means, level standard deviations, transition probabilities
3. Click the **Simulate** waveform button

The simulator generates traces with known ground truth, displayed alongside any idealisation. This is useful for:
- Learning how DISC behaves on different types of data
- Testing parameter settings before applying to real data
- Validating that your analysis pipeline produces correct results

### From Python

```python
from pydisc.DISC import simulate_trace

data, noiseless, params = simulate_trace(
    n_pts=2000,
    levels=np.array([0.0, 1.0]),
    sigmas=np.array([0.3, 0.3]),
    transition_proba=np.array([[0.95, 0.05],
                                [0.10, 0.90]])
)
```

---

## 14. Saving and Loading Zarr Stores

pyDISC uses **Zarr** for persistent data storage. Zarr stores are directory-based, compressed array formats that handle large datasets efficiently.

### From the GUI

- **Save** button → choose a directory → saves all traces, idealisations, parameters, and metadata
- **Load** button → select a Zarr directory → restores the full session

### From Python

```python
import zarr

# The DISCO widget has built-in save/load methods
widget.save_zarr()  # opens dialog
widget.load_zarr()  # opens dialog
```

---

## 15. The DISC_Sequence Class

`DISC_Sequence` is the core data container. Each trace is wrapped in a `DISC_Sequence` object.

### Creation

```python
from pydisc import DISC_Sequence
import numpy as np

seq = DISC_Sequence(data=my_trace)  # my_trace is a 1D numpy array
```

### Key attributes

| Attribute | Type | Description |
|---|---|---|
| `data` | np.ndarray | The raw noisy time series |
| `idealized_data` | np.ndarray | The idealised trace (after running DISC) |
| `idealized_metric` | float | The information criterion value for the idealisation |
| `div_criterion` | str | Divisive criterion ("RSS", "AIC", "BIC", "HQC") |
| `agg_criterion` | str | Agglomerative criterion |
| `n_required_levels` | int or None | Force this many levels (None = automatic) |
| `level_func` | callable | Function for computing segment level (default: np.median) |
| `hmm_algorithm` | str | "viterbi" or "baum-welch" |
| `n_viterbi_repeats` | int | Number of Viterbi passes (default: 2) |
| `hmm_scan` | bool | HMM scan for optimal # levels (default: False) |
| `mask` | np.ndarray or None | Boolean mask to exclude data points |
| `tags` | str | Metadata string |
| `noiseless_data` | np.ndarray or None | Ground truth for simulated data |
| `bin_factor` | int | Temporal binning factor |

### Key methods

```python
# Run DISC (manual criterion)
seq.run(auto=False, verbose=True)

# Run AutoDISC (automatic criterion selection)
seq.run(auto=True, verbose=True)

# Run with temporal binning
seq.run(bin_factor=2, auto=True)

# Manually adjust levels
seq.add_level()       # force one more level
seq.remove_level()    # force one fewer level
seq.merge_nearest_levels()  # merge closest two levels
```

---

## 16. The run_DISC Function

For direct functional use without the `DISC_Sequence` wrapper:

```python
from pydisc.DISC import run_DISC

idealized_data, metric = run_DISC(
    data,                          # 1D numpy array
    div_criterion='BIC',           # divisive criterion
    agg_criterion='BIC',           # agglomerative criterion
    n_required_levels=None,        # None = auto, or int
    level_func=np.median,          # segment level function
    n_div_attempts=None,           # None = auto (3/2/1 based on length)
    hmm_algorithm='viterbi',       # 'viterbi' or 'baum-welch'
    hmm_optimize_states=True,      # optimise level means/stdevs in HMM
    n_viterbi_repeats=2,           # Viterbi passes
    hmm_scan=False,                # scan # levels with HMM
    final_baum_welch_optimization=False,
    return_intermediate_results=False,
    verbose=False
)
```

### Return values

- `idealized_data`: NumPy array (same length as input), containing the idealised intensity at each time point
- `metric`: The information criterion value for the final idealisation
- If `return_intermediate_results=True`, also returns a dict with divisive tree, agglomerative traces, HMM results, etc.

---

## 17. The auto_DISC Function

```python
from pydisc.DISC import auto_DISC

(idealized_data, metric), selected_criterion = auto_DISC(
    data,
    # same keyword arguments as run_DISC
    verbose=True
)
print(f"Selected criterion: {selected_criterion}")  # "RSS" or "AIC"
```

The function returns the idealisation results **and** the criterion that was selected for this trace.

---

## 18. Utility Functions

### SNR estimation

```python
from pydisc.DISC import estimate_SNR

snr = estimate_SNR(data, idealized_data)
```

### Noise estimation

```python
from pydisc.DISC import gaussian_noise_estimate

sigma = gaussian_noise_estimate(data)
```

### Trace simulation

```python
from pydisc.DISC import simulate_trace

data, noiseless, (levels, sigmas, trans_proba, heterogeneity) = simulate_trace(
    n_pts=3000,
    levels=np.array([0.0, 1.0, 2.0]),
    sigmas=np.array([0.25, 0.25, 0.25]),
    transition_proba=np.array([
        [0.95, 0.04, 0.01],
        [0.05, 0.90, 0.05],
        [0.01, 0.04, 0.95]
    ])
)
```

### Trace binning

```python
from pydisc.DISC import bin_trace, unbin_trace

binned = bin_trace(data, bin_factor=5)
unbinned = unbin_trace(binned, bin_factor=5, trace_length=len(data))
```

### Information criterion

```python
from pydisc.DISC import information_criterion

metric = information_criterion(data, idealized_data, criterion="BIC")
```

---

## 19. Batch Processing

### Processing many traces

```python
import numpy as np
from pydisc.DISC import auto_DISC

# Load traces (list of 1D arrays)
traces = np.load('piezo1_traces.npy', allow_pickle=True)

results = []
for i, trace in enumerate(traces):
    (idealised, metric), criterion = auto_DISC(trace, verbose=False)
    n_levels = len(np.unique(idealised))
    results.append({
        'trace_index': i,
        'idealised': idealised,
        'metric': metric,
        'criterion': criterion,
        'n_levels': n_levels
    })
    if (i + 1) % 50 == 0:
        print(f"Processed {i+1}/{len(traces)}")

np.save('pydisc_results.npy', results)
```

### Parallel processing

```python
from concurrent.futures import ProcessPoolExecutor
from pydisc.DISC import auto_DISC

def process_trace(trace):
    (idealised, metric), criterion = auto_DISC(trace)
    return idealised, metric, criterion

with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(process_trace, traces))
```

---

## 20. The PIEZO1-HaloTag-BAPTA System

The PIEZO1-HaloTag system (Bertaccini et al. 2025) uses CRISPR-engineered hiPSCs where endogenous PIEZO1 is fused to a HaloTag at the C-terminus. When labelled with the Ca²⁺-sensitive JF646-BAPTA HaloTag ligand:

- **Channel closed:** Local Ca²⁺ near the BAPTA is at resting cytosolic levels (~100 nM). The dye is dim.
- **Channel open:** Ca²⁺ flows through the PIEZO1 pore, raising local Ca²⁺ to > 15 µM. The dye brightens, producing a "flicker."

The resulting fluorescence traces are ideal for DISC/AutoDISC analysis: noisy, with abrupt transitions, variable SNR and trace length, and an unknown number of intensity levels.

---

## 21. Preparing PIEZO1 Traces for pyDISC

### Pipeline

1. Acquire TIRF movies of JF646-BAPTA-labelled PIEZO1-HaloTag cells (200--500 fps)
2. Detect and track PIEZO1 puncta (ThunderSTORM → FLIKA SPT)
3. Extract background-subtracted intensity traces per punctum
4. Save as NumPy arrays

```python
import numpy as np

# traces is a list of 1D numpy arrays (variable length OK)
# Each array is the background-subtracted fluorescence of one punctum
np.save('piezo1_bapta_traces.npy', np.array(traces, dtype=object))
```

### Preprocessing

- **Background subtraction:** Subtract local background (annular region) at each frame
- **Baseline correction:** If slow photobleaching drift exists, correct it (fit/subtract slow exponential)
- **Do NOT threshold.** pyDISC will identify states objectively.

---

## 22. Workflow 1: Idealising PIEZO1-BAPTA Flicker Traces

```python
import numpy as np
import matplotlib.pyplot as plt
from pydisc.DISC import auto_DISC, estimate_SNR

# Load traces
traces = np.load('piezo1_bapta_traces.npy', allow_pickle=True)
fps = 200  # frames per second

# Idealise all traces with AutoDISC
idealisations = []
for trace in traces:
    (idealised, metric), criterion = auto_DISC(trace)
    idealisations.append(idealised)

# Plot an example trace
idx = 5
t = np.arange(len(traces[idx])) / fps
fig, ax = plt.subplots(figsize=(12, 3))
ax.plot(t, traces[idx], color='0.7', linewidth=0.5, label='Raw')
ax.plot(t, idealisations[idx], color='tab:blue', linewidth=1.5, label='Idealised')
ax.set_xlabel('Time (s)')
ax.set_ylabel('Fluorescence (c.u.)')
ax.legend()
n_levels = len(np.unique(idealisations[idx]))
snr = estimate_SNR(traces[idx], idealisations[idx])
ax.set_title(f'Punctum {idx}: {n_levels} levels, SNR = {snr:.1f}')
plt.tight_layout()
plt.show()
```

---

## 23. Workflow 2: Comparing Conditions (± Yoda1)

```python
import numpy as np
from pydisc.DISC import auto_DISC

conditions = {
    'Untreated': np.load('untreated_traces.npy', allow_pickle=True),
    'DMSO': np.load('dmso_traces.npy', allow_pickle=True),
    'Yoda1_2uM': np.load('yoda1_traces.npy', allow_pickle=True),
}

open_fractions = {}

for name, traces in conditions.items():
    fracs = []
    for trace in traces:
        (idealised, _), _ = auto_DISC(trace)
        levels = np.sort(np.unique(idealised))
        baseline = levels[0]
        frac_open = np.mean(idealised > baseline)
        fracs.append(frac_open)
    open_fractions[name] = np.array(fracs)
    print(f"{name}: open fraction = {np.mean(fracs):.3f} ± "
          f"{np.std(fracs)/np.sqrt(len(fracs)):.3f} (n={len(fracs)})")

# Plot
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
positions = range(len(conditions))
for i, (name, fracs) in enumerate(open_fractions.items()):
    ax.boxplot(fracs, positions=[i], widths=0.5)
ax.set_xticks(list(positions))
ax.set_xticklabels(list(conditions.keys()))
ax.set_ylabel('Open fraction')
ax.set_title('PIEZO1 open probability')
plt.show()
```

---

## 24. Workflow 3: Extracting Dwell Times

```python
import numpy as np
from pydisc.DISC import auto_DISC, find_piecewise_constant_segments

def extract_dwells(idealised, fps):
    """Extract dwell times from an idealised trace."""
    levels = np.sort(np.unique(idealised))
    baseline = levels[0]
    
    starts, stops = find_piecewise_constant_segments(idealised)
    
    open_dwells = []
    closed_dwells = []
    
    for start, stop in zip(starts, stops):
        level = idealised[start]
        duration = (stop - start) / fps
        if level <= baseline:
            closed_dwells.append(duration)
        else:
            open_dwells.append(duration)
    
    return np.array(open_dwells), np.array(closed_dwells)

# Analyse all traces
fps = 200
all_open = []
all_closed = []

traces = np.load('piezo1_bapta_traces.npy', allow_pickle=True)
for trace in traces:
    (idealised, _), _ = auto_DISC(trace)
    od, cd = extract_dwells(idealised, fps)
    all_open.extend(od)
    all_closed.extend(cd)

all_open = np.array(all_open)
all_closed = np.array(all_closed)

# Plot dwell time histograms
import matplotlib.pyplot as plt
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.hist(all_open * 1000, bins=50, color='tab:red', alpha=0.7)
ax1.set_xlabel('Open dwell time (ms)')
ax1.set_ylabel('Count')
ax1.set_title(f'Open dwells (n={len(all_open)})')

ax2.hist(all_closed * 1000, bins=50, color='tab:blue', alpha=0.7)
ax2.set_xlabel('Closed dwell time (ms)')
ax2.set_ylabel('Count')
ax2.set_title(f'Closed dwells (n={len(all_closed)})')
plt.tight_layout()
plt.show()

# Fit single exponential to open dwells
from scipy.optimize import curve_fit
def exp_func(t, A, tau):
    return A * np.exp(-t / tau)

counts, bin_edges = np.histogram(all_open * 1000, bins=50)
bin_centres = (bin_edges[:-1] + bin_edges[1:]) / 2
popt, _ = curve_fit(exp_func, bin_centres[counts > 0], counts[counts > 0],
                    p0=[counts.max(), np.mean(all_open) * 1000])
print(f"Open time constant: {popt[1]:.1f} ms")
```

---

## 25. Workflow 4: GUI-Based Interactive Analysis

### Step by step

1. **Launch:** `pydisc` from command line, or from Python (Section 8)
2. **Load data:** Either via the Load button (Zarr) or by setting `widget.data` programmatically
3. **Configure:** Open Settings (gear icon), ensure AutoDISC is checked
4. **Run All:** Click the Run All button. All traces are idealised.
5. **Browse:** Use the trace selector spinbox to scroll through traces. The trace plot shows raw data with idealised overlay; the criterion plot shows the agglomeration metric vs. # levels.
6. **Adjust:** For any trace where the idealisation seems wrong, use Add Level / Remove Level / Merge buttons to refine.
7. **Use the Jupyter console:** Access `self` (the DISCO widget) and `self._traces` (list of DISC_Sequence objects) for custom analysis interactively.
8. **Save:** Click Save to export the full session to a Zarr store.

---

## 26. Parameter Tuning Guide

### Quick decision tree

```
Is your data noisy with variable trace lengths?
  → YES: Use AutoDISC (auto=True) with defaults. Done.
  → NO (uniform, clean data): Use manual BIC criterion.

Is AutoDISC missing obvious transitions?
  → Increase n_viterbi_repeats to 3
  → Enable hmm_scan=True

Is AutoDISC detecting too many levels?
  → Use Remove Level / Merge in GUI
  → Or set n_required_levels explicitly

Do you need maximum accuracy and speed doesn't matter?
  → Use "Most Accurate" preset:
    hmm_scan=True, final_baum_welch_optimization=True, n_viterbi_repeats=3

Do you need maximum speed for a huge dataset?
  → Use "Faster" preset
  → Or use bin_factor > 1 to reduce data size
```

### Level function: median vs. mean

pyDISC defaults to `level_func=np.median`. Median is more robust to outliers within a dwell. If your data has symmetric noise and no outliers, `np.mean` may be slightly more accurate.

---

## 27. Common Problems and Solutions

### Import error: "No module named 'pomegranate'"

```bash
pip install pomegranate>=1.1.1
```
pomegranate v1.x requires PyTorch. If installation fails, ensure PyTorch is installed first: `pip install torch`.

### Import error: "No module named 'qtpy'" or Qt-related errors

```bash
pip install PySide6 qtpy
```

### GUI window appears but is blank or misrendered (macOS)

If using the Magnet window manager on macOS, it can interfere with Qt rendering. Disable Magnet for the pyDISC window.

### AutoDISC assigns only 1 level despite visible transitions

- The SNR is very low. Try: `seq.run(auto=False)` with `div_criterion='RSS'`
- Or bin the trace: `seq.run(bin_factor=2, auto=True)`
- Or force levels: `seq.n_required_levels = 2; seq.run(auto=False)`

### Too many levels identified

- Use Remove Level button in GUI, or `seq.remove_level()`
- Or `seq.merge_nearest_levels()`
- Check if baseline drift is being misidentified as state changes. Apply baseline correction before analysis.

### Analysis is very slow

- Baum-Welch and HMM scan are the slowest options. Disable if not needed.
- Reduce `n_viterbi_repeats` to 1
- Use `bin_factor` > 1 for very long traces
- Use the "Faster" preset in the GUI

### Python version error

pyDISC requires Python < 3.12. If you see compatibility errors, create a fresh conda environment: `conda create -n pyDISC-env "python<3.12"`

---

*This manual was developed for the PIEZO1 research group to support analysis of PIEZO1-HaloTag-BAPTA calcium-sensitive fluorescence recordings using the Python implementation of DISC/AutoDISC. pyDISC provides a MATLAB-free, fully open-source pipeline for unsupervised idealisation of single-molecule fluorescence time series, with both a scriptable Python API and an interactive PyQt GUI.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*pyDISC is open-source software (MIT licence) available at https://github.com/marcel-goldschen-ohm/pyDISC.*

*Citations:*

*White, D.S. et al. (2020). eLife, 9, e53357.*

*Bandyopadhyay, A. & Goldschen-Ohm, M.P. (2021). Biophysical Journal, 120(20), 4472--4483.*

*Bertaccini, G.A. et al. (2025). Nature Communications, 16, 5556.*
