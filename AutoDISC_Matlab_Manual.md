# AutoDISC Manual for Biology Researchers

**A Comprehensive Guide for Idealising Single-Molecule Fluorescence Time Series with Application to PIEZO1-HaloTag-BAPTA Activity Recordings**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why AutoDISC?](#1-introduction-why-autodisc)
2. [The DISC Algorithm](#2-the-disc-algorithm)
3. [What AutoDISC Adds to DISC](#3-what-autodisc-adds-to-disc)
4. [Installation and Requirements](#4-installation-and-requirements)

**Part II: Understanding the Algorithm**

5. [Step 1: Divisive Segmentation](#5-step-1-divisive-segmentation)
6. [Step 2: Hierarchical Agglomerative Clustering](#6-step-2-hierarchical-agglomerative-clustering)
7. [Step 3: Viterbi Refinement](#7-step-3-viterbi-refinement)
8. [Objective Criteria: AIC vs. BIC](#8-objective-criteria-aic-vs-bic)
9. [The AutoDISC Decision Boundary](#9-the-autodisc-decision-boundary)

**Part III: Using the DISCO GUI**

10. [Launching DISCO](#10-launching-disco)
11. [Loading Data](#11-loading-data)
12. [The DISCO Interface](#12-the-disco-interface)
13. [Running Analysis with AutoDISC](#13-running-analysis-with-autodisc)
14. [Navigating and Inspecting Traces](#14-navigating-and-inspecting-traces)
15. [Filtering Traces by SNR and Number of States](#15-filtering-traces-by-snr-and-number-of-states)
16. [Dwell Time Analysis](#16-dwell-time-analysis)
17. [Exporting Results](#17-exporting-results)

**Part IV: Command-Line Usage**

18. [Running AutoDISC from the Command Line](#18-running-autodisc-from-the-command-line)
19. [Running DISC Without the GUI](#19-running-disc-without-the-gui)
20. [Batch Processing](#20-batch-processing)

**Part V: Application to PIEZO1-HaloTag-BAPTA Data**

21. [The PIEZO1-HaloTag-BAPTA System](#21-the-piezo1-halotag-bapta-system)
22. [Preparing PIEZO1 Fluorescence Traces for AutoDISC](#22-preparing-piezo1-fluorescence-traces-for-autodisc)
23. [Workflow 1: Idealising PIEZO1-BAPTA Flicker Traces](#23-workflow-1-idealising-piezo1-bapta-flicker-traces)
24. [Workflow 2: Comparing PIEZO1 Activity Across Conditions](#24-workflow-2-comparing-piezo1-activity-across-conditions)
25. [Workflow 3: Extracting Open and Closed Dwell Times](#25-workflow-3-extracting-open-and-closed-dwell-times)
26. [Interpreting Idealised PIEZO1-BAPTA Traces](#26-interpreting-idealised-piezo1-bapta-traces)

**Part VI: Tips and Troubleshooting**

27. [Parameter Tuning Guide](#27-parameter-tuning-guide)
28. [Common Problems and Solutions](#28-common-problems-and-solutions)
29. [AutoDISC vs. Other Idealisation Methods](#29-autodisc-vs-other-idealisation-methods)

---

## 1. Introduction: Why AutoDISC?

### What is AutoDISC?

AutoDISC is an extension of the DISC (Divisive Segmentation and Clustering) algorithm that provides **fully automated, unsupervised idealisation of single-molecule fluorescence time series** in MATLAB. Given a noisy fluorescence intensity trace --- for example, from a single PIEZO1-HaloTag-BAPTA punctum flickering between dim (closed) and bright (open) states --- AutoDISC identifies the distinct intensity levels and the precise time points at which transitions between levels occur, producing a noise-free "idealised" trace.

The key advance of AutoDISC over the original DISC is the **automated selection of the optimal objective criterion** (OC) on a per-trace basis, using a machine-learning-derived decision boundary. This makes the analysis completely unsupervised: no user input is required beyond loading the data.

### Citations

**DISC:**
White, D.S., Goldschen-Ohm, M.P., Goldsmith, R.H. & Chanda, B. (2020). Top-down machine learning approach for high-throughput single-molecule analysis. *eLife*, 9, e53357. https://doi.org/10.7554/eLife.53357

**AutoDISC:**
Bandyopadhyay, A. & Goldschen-Ohm, M.P. (2021). Unsupervised selection of optimal single-molecule time series idealization criterion. *Biophysical Journal*, 120(20), 4472--4483. https://doi.org/10.1016/j.bpj.2021.08.045

**PIEZO1-HaloTag-BAPTA:**
Bertaccini, G.A., Casanellas, I., Evans, E.L., Nourse, J.L., Dickinson, G.D. et al. (2025). Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology. *Nature Communications*, 16, 5556. https://doi.org/10.1038/s41467-025-59150-1

### What AutoDISC does

Given a noisy 1D time series, AutoDISC:

1. **Identifies all distinct intensity levels** (states) without requiring you to specify the number of states
2. **Locates every transition** (change point) between states with single-frame precision
3. **Produces an idealised trace** where each data point is assigned to one of the identified intensity levels
4. **Automatically selects** the optimal analysis criterion for each individual trace based on its SNR and length

### Why AutoDISC for PIEZO1-HaloTag-BAPTA?

The PIEZO1-HaloTag system, combined with Ca²⁺-sensitive JF646-BAPTA HaloTag ligand, produces fluorescence intensity traces at individual PIEZO1 puncta that flicker between a dim baseline (channel closed, low local Ca²⁺) and bright states (channel open, high local Ca²⁺ near the pore). These traces are ideal candidates for AutoDISC analysis because:

- **The traces are noisy.** Single-molecule fluorescence inherently has low SNR.
- **The number of states is unknown a priori.** A PIEZO1 punctum may contain one or several channels, and channels may exhibit multiple conductance levels, producing multiple bright-state intensity levels. Each punctum may represent a cluster of two or more PIEZO1 channels (Bertaccini et al. 2025), so the number of accessible intensity levels is not known in advance.
- **Trace lengths vary.** Photobleaching, channel mobility in and out of the TIRF field, and imaging duration create stochastic variation in trace length.
- **SNR varies across puncta.** Different axial positions within the evanescent field, variable labelling efficiency, and puncta stoichiometry cause per-punctum variation in brightness.
- **You need to be unbiased.** Manual thresholding of "open" vs. "closed" introduces operator bias. AutoDISC provides objective, reproducible state assignment.
- **Multiple cell types and stimuli must be compared.** Bertaccini et al. (2025) compared PIEZO1 activity in endothelial cells (ECs) versus neural stem cells (NSCs) and across pharmacological (Yoda1) and mechanical (osmotic) stimuli. Consistent, automated state assignment is essential when aggregating results across conditions.

### What AutoDISC does NOT do

- **Tracking:** AutoDISC analyses intensity time series, not images. You need to first track your puncta (e.g., using ThunderSTORM + FLIKA, as described in Bertaccini et al. 2025) and extract their intensity traces.
- **Baseline correction:** If your trace has a slow drift (e.g., from photobleaching), you should correct it before running AutoDISC. See the companion tool smBEVO (Tran, Bandyopadhyay & Goldschen-Ohm) for automated baseline correction.
- **Statistical comparisons between conditions:** AutoDISC idealises individual traces. Comparing conditions (e.g., ± Yoda1) requires exporting the idealised results and performing statistics in MATLAB, Python, R, or GraphPad.

---

## 2. The DISC Algorithm

### Overview

DISC (Divisive Segmentation and Clustering) takes a **top-down approach** to time series idealisation. Rather than building up a model from individual events (bottom-up), DISC starts with all data assigned to a single level and recursively subdivides until the optimal segmentation is found. This top-down strategy makes DISC orders of magnitude faster than traditional Hidden Markov Model (HMM) approaches while maintaining comparable or better accuracy.

### The three steps

DISC operates in three sequential steps:

**Step 1 --- Divisive segmentation:** Starting with all data points assigned to a single cluster (the overall mean), DISC recursively splits each cluster into two child clusters by detecting change points. Splitting continues until the objective criterion (OC) indicates that further splitting would overfit the noise.

**Step 2 --- Hierarchical agglomerative clustering:** During segmentation, data segments that belong to the same intensity level may end up in different branches simply due to noise. The agglomerative step merges segments with similar intensity distributions back into single levels, again guided by the OC.

**Step 3 --- Viterbi refinement:** The segmentation and clustering steps identify the intensity levels well but may not optimally assign every individual data point. The Viterbi algorithm (from the HMM framework) refines the assignment of each data point to the most likely state sequence, given the identified levels and estimated transition probabilities.

### Default parameters

The following defaults are established in DISC and used by AutoDISC:

| Parameter | Default | Meaning |
|---|---|---|
| alpha_value | 0.05 | Confidence level for change point detection (Student's t-test) |
| Objective criterion | BIC_GMM (DISC) or Auto (AutoDISC) | Guides segmentation and clustering |
| Viterbi iterations | 1 | Number of Viterbi refinement passes |

---

## 3. What AutoDISC Adds to DISC

### The problem

DISC requires the user to choose an **objective criterion** (OC) --- a mathematical formula that balances goodness-of-fit against model complexity. Different OCs are optimal for different types of data:

- **BIC_RSS** (Bayesian Information Criterion based on residual sum of squares): Best for **short traces with low SNR** --- it has a smaller penalty for adding states, so it avoids underfitting noisy data.
- **AIC_GMM** (Akaike Information Criterion based on Gaussian Mixture Model likelihood): Best for **longer traces with higher SNR** --- it handles per-event intensity heterogeneity well and avoids the overfitting that BIC_RSS shows on longer traces.

In a typical PIEZO1-HaloTag-BAPTA dataset, different puncta will have different trace lengths (due to photobleaching or mobility) and different SNR values (due to position in the evanescent field, labelling efficiency, and stoichiometry). No single OC is optimal for all traces.

### The AutoDISC solution

AutoDISC automates the per-trace selection of the optimal OC using a **linear decision boundary** in the 2D space of (effective SNR) × (number of sample points):

```
Decision boundary: log₁₀(#samples) = −0.49 × SNR_effective + 4.69
```

The AutoDISC workflow for each trace:

1. Run DISC with BIC_RSS to generate an initial idealisation (which may overfit but is unlikely to underfit)
2. Estimate the effective SNR from the initial idealisation (noise σ from residuals; signal ΔI_avg from step heights > 2σ)
3. Use the decision boundary to determine whether AIC_GMM or BIC_RSS is optimal for this trace
4. If AIC_GMM is optimal, re-run DISC with AIC_GMM. Otherwise, keep the initial BIC_RSS result.

This workflow makes AutoDISC **completely unsupervised** --- no user input is required beyond loading the data.

---

## 4. Installation and Requirements

### Requirements

- **MATLAB R2017b or later** (tested on R2017b through R2019a+)
- **Statistics and Machine Learning Toolbox** (required)
- Any operating system: Linux, macOS, or Windows

### Installation

1. Download or clone the repository: https://github.com/marcel-goldschen-ohm/AutoDISC
2. In MATLAB, add the AutoDISC folder (with all subfolders) to your path:
   ```matlab
   addpath(genpath('/path/to/AutoDISC'));
   savepath;  % optional: save the path permanently
   ```

### Folder structure

| Folder | Contents |
|---|---|
| `src_DISC/` | Core DISC algorithm functions |
| `src_AutoDISC/` | AutoDISC extension (runAutoDISC, SNR estimation, decision boundary) |
| `src_GUI/` | DISCO graphical user interface |
| `docs/` | DISC manual |
| `docs_AutoDISC/` | AutoDISC user manual (PDF) |
| `sample_data/` | Sample simulated data for DISC |
| `sample_data_AutoDISC/` | Sample data for AutoDISC |
| `simulate_data/` | Scripts to generate simulated test data |

---

## 5. Step 1: Divisive Segmentation

### How it works

Divisive segmentation starts with all data points in the trace assigned to a single segment (the overall mean intensity). The algorithm then:

1. Scans across the segment to find the most statistically significant **change point** --- the time point at which the mean intensity changes most significantly (using a Student's t-test at the specified alpha level, default α = 0.05)
2. Splits the segment at the change point into two child segments
3. Recursively applies the same procedure to each child segment
4. Stops splitting when either: no significant change point is found (at the specified α level), or further splitting would worsen the objective criterion

### The alpha parameter

The `alpha_value` (default 0.05) controls the sensitivity of change point detection:

- **Lower α (e.g., 0.01):** More conservative --- fewer change points detected, reduces false positives but may miss real transitions
- **Higher α (e.g., 0.10):** More sensitive --- more change points detected, catches subtle transitions but increases false positive risk

For most single-molecule fluorescence data, α = 0.05 is appropriate.

---

## 6. Step 2: Hierarchical Agglomerative Clustering

### Why this step is needed

After divisive segmentation, segments that belong to the same true intensity level may be assigned to different states because of noise fluctuations. For example, multiple "open" events from the same PIEZO1 channel may be split into slightly different intensity levels.

### How it works

Starting from all the segments identified in Step 1, the algorithm:

1. Computes the pairwise distance between every pair of segment intensity distributions
2. Merges the closest pair of segments into a single level
3. Recalculates the objective criterion after each merge
4. Continues merging until further merging would worsen the OC

This produces the final set of **distinct intensity levels** in the trace.

---

## 7. Step 3: Viterbi Refinement

### Why this step is needed

The segmentation and clustering steps correctly identify intensity levels and approximate transition locations, but the exact assignment of each individual data point may not be optimal, especially near transitions where noise makes the true state ambiguous.

### How it works

The Viterbi algorithm is the standard dynamic programming algorithm for finding the most likely state sequence in a Hidden Markov Model. Given:

- The identified intensity levels (state means and variances from Steps 1--2)
- Estimated transition probabilities (from the frequencies of transitions in the Step 1--2 idealisation)
- The noisy data

...the Viterbi algorithm finds the single most likely state sequence that generated the observed data. This refines the exact location of every transition to within a single time point.

### Default: 1 iteration

By default, DISC applies one pass of the Viterbi algorithm. In principle, the Viterbi output could be used to re-estimate transition probabilities for a second pass, but one iteration is typically sufficient.

---

## 8. Objective Criteria: AIC vs. BIC

### What is an objective criterion?

An objective criterion (OC) balances two competing goals:

- **Goodness of fit:** The idealised trace should match the data as closely as possible
- **Parsimony:** The model should be as simple as possible (few states, few transitions) to avoid fitting noise

Every OC has the general form:

**OC = fit_error + overfit_penalty**

The **fit_error** decreases as the model becomes more complex (more states, more transitions), but the **overfit_penalty** increases. The optimal model minimises the OC.

### The key OCs in AutoDISC

| OC | Fit term | Penalty term | Best for |
|---|---|---|---|
| **BIC_RSS** | n·ln(RSS/n) | (n_transitions + n_states)·ln(n) | Short traces, low SNR |
| **AIC_GMM** | −2·ln(L) | 2·(3·n_states − 1) | Long traces, high SNR |

Where n = number of data points, RSS = residual sum of squares, L = Gaussian mixture model likelihood, n_transitions = number of change points, n_states = number of distinct levels.

### Why BIC_RSS for short/noisy traces

BIC_RSS has a penalty that scales with ln(n) --- for short traces, this penalty is small, so BIC_RSS can detect levels even in noisy data without being overly conservative. However, for long traces with high SNR, BIC_RSS tends to **overfit** by splitting levels with heterogeneous event intensities into multiple spurious sub-levels.

### Why AIC_GMM for long/clean traces

AIC_GMM has a fixed penalty per state (independent of trace length), which prevents it from overfitting long traces. The GMM likelihood is also more robust to per-event intensity heterogeneity (common in TIRF data where puncta move slightly in the evanescent field). However, for short traces with low SNR, AIC_GMM tends to **underfit** (assigning a constant mean).

---

## 9. The AutoDISC Decision Boundary

### The SVM-derived boundary

AutoDISC uses a linear decision boundary trained by a Support Vector Machine (SVM) classifier on simulated data spanning a wide range of conditions:

```
log₁₀(#samples) = −0.49 × SNR_effective + 4.69
```

- If the trace falls **below** the boundary (short trace and/or low SNR): use **BIC_RSS**
- If the trace falls **above** the boundary (long trace and/or high SNR): use **AIC_GMM**

### SNR estimation

AutoDISC estimates the effective SNR of each trace automatically:

1. Run DISC with BIC_RSS (initial idealisation)
2. σ = standard deviation of (data − idealisation) residuals
3. ΔI_avg = mean of absolute step heights at change points, excluding steps < 2σ, weighted by segment length
4. SNR_effective = ΔI_avg / σ

### Why this matters for PIEZO1-BAPTA data

In a typical PIEZO1-HaloTag-BAPTA dataset imaged by TIRF at 200--500 fps:

- Trace lengths range from ~50 to ~5000+ frames (depending on imaging duration, bleaching, and track duration)
- SNR typically ranges from ~2 to ~8 (depending on position in evanescent field, labelling, and camera settings)

Many PIEZO1-BAPTA traces fall near the decision boundary, making the automated OC selection particularly impactful.

---

## 10. Launching DISCO

DISCO is the graphical user interface for DISC/AutoDISC.

In the MATLAB command window:

```matlab
>> DISCO
```

This opens the DISCO GUI.

---

## 11. Loading Data

### Supported formats

DISCO accepts data in two formats:

**1. MATLAB .mat files:**
The .mat file should contain a variable that is either:
- A **matrix** where each row is one time series (molecule/punctum) and each column is a time point
- A **cell array** where each cell contains a vector (one time series per cell --- allows variable-length traces)

**2. Plain text .dat or .csv files:**
Tab- or comma-delimited files in HaMMy/vbFRET format: two columns per molecule (donor, acceptor) for FRET data, or a single column for direct intensity measurements.

### Loading in DISCO

1. Click **File → Load Data** (or the Load button)
2. Select your .mat or .dat file
3. DISCO will display the first trace with the data in the top panel

### For PIEZO1-BAPTA traces

Typically, you will extract intensity traces from tracked PIEZO1-HaloTag-BAPTA puncta using FLIKA or custom MATLAB/Python scripts (see Section 22) and save them as a .mat file.

---

## 12. The DISCO Interface

### Main panels

The DISCO interface displays:

- **Top panel:** The raw (noisy) fluorescence trace for the current ROI (region of interest / molecule), with the idealised trace overlaid after analysis
- **Channel selector:** For multi-channel data (e.g., donor/acceptor FRET). For single-channel PIEZO1-BAPTA data, you will have one channel.
- **ROI navigation:** Buttons and input field to navigate between traces (ROI 1, 2, 3, ...)
- **Histogram:** An all-points amplitude histogram of the current trace, with Gaussian fits to each identified level overlaid after analysis

### Key controls

| Control | Function |
|---|---|
| **Load** | Load data file |
| **Analyze** | Run DISC/AutoDISC on all traces |
| **ROI navigation** | Scroll through individual traces |
| **SNR / # States histograms** | Distribution of SNR and number of identified states across all traces |
| **Filter** | Filter traces by SNR and/or number of states |
| **Dwell** | Dwell time analysis |
| **Export** | Export results |

---

## 13. Running Analysis with AutoDISC

### Step by step

1. **Load your data** (Section 11)
2. Click **Analyze**
3. In the dialog that appears:
   - **Check the "Automated selection" box** (this enables AutoDISC; unchecked = original DISC with a fixed OC)
   - If using DISC (not AutoDISC), select the objective criterion: BIC_GMM (default), AIC_GMM, BIC_RSS, etc.
   - Confirm the alpha value (default 0.05)
   - Set the number of Viterbi iterations (default 1)
4. Click **OK** to run

### What happens during analysis

- AutoDISC processes each trace independently
- For each trace, it estimates the SNR, selects the optimal OC, and produces an idealised trace
- Progress is typically very fast: hundreds of traces in seconds
- After completion, the idealised trace is overlaid on the raw data in the top panel

### Interpreting the overlay

- **Grey/noisy trace:** Your raw fluorescence data
- **Coloured stepped trace:** The AutoDISC idealisation (each step represents a distinct intensity level)
- **Histogram panel:** The intensity distribution with Gaussian fits showing each identified state

---

## 14. Navigating and Inspecting Traces

After analysis, use the ROI navigation to scroll through individual traces:

- **Arrow buttons** or **ROI number field** to move between traces
- Inspect each idealisation visually: does it capture the real transitions? Are there obvious over- or underfitting artefacts?

### What good idealisation looks like

- The idealised trace follows the "envelope" of the noisy data, stepping cleanly between distinct levels
- Brief excursions to bright states (channel openings) are captured as distinct events
- Noise fluctuations within a state are not assigned as separate events
- The number of identified levels is physically reasonable

### What overfitting looks like

- Many very short-lived "states" that appear to be tracking noise
- More intensity levels identified than expected (e.g., 6--7 levels for a simple open/closed channel)

### What underfitting looks like

- Obvious transitions in the raw data are missed
- The idealised trace is a flat line despite visible flickers in the data

---

## 15. Filtering Traces by SNR and Number of States

### SNR and state histograms (DISC 2.0+)

After analysis, DISCO displays histograms of:

- **SNR distribution** across all traces
- **Number of identified states** across all traces

### Filtering

Use the Filter function to select subsets of traces based on:

- **Minimum SNR:** Exclude noisy traces that may produce unreliable idealisations
- **Number of states:** Select traces with, e.g., exactly 2 states (for simple open/closed analysis) or 3+ states (for multi-level analysis)

### Export selected traces

After filtering, you can export only the selected traces, effectively trimming your dataset to the highest-quality traces.

---

## 16. Dwell Time Analysis

### Built-in dwell time analysis (DISC 2.0+)

DISCO provides dwell time analysis for each identified state:

1. After running analysis, click the **Dwell** button
2. DISCO extracts the duration of every event (dwell) in each state across all analysed traces
3. Dwell time distributions are displayed as histograms
4. Exponential fits (single or multi-exponential) are applied to estimate rate constants
5. Results are exportable to .csv

### For PIEZO1-BAPTA data

- **Closed (dim) state dwell times** reflect the inter-opening intervals
- **Open (bright) state dwell times** reflect the channel open duration
- Exponential fits yield rate constants: k_open (from closed dwells) and k_close (from open dwells)
- Multi-exponential fits may indicate multiple gating modes or subconductance states

---

## 17. Exporting Results

### Export options in DISCO

- **Idealised traces:** Export the ideal intensity (stepped) or state index (integer class labels) for each trace as .dat files
- **Selected traces only:** Export only traces that pass your SNR / state-number filter
- **Plots:** Export the current ROI plot (raw + idealised + histogram) as a figure
- **Dwell times:** Export dwell time distributions and fit parameters as .csv

### Programmatic export

After command-line analysis, all results are stored in the output structure (see Section 18) and can be saved to .mat or exported to other formats.

---

## 18. Running AutoDISC from the Command Line

### The runAutoDISC function

```matlab
% Load your data (each row is one trace)
data = load('piezo1_traces.mat');
traces = data.traces;  % N_traces × N_timepoints matrix

% Run AutoDISC on all traces
results = runAutoDISC(traces);
```

### Output structure

The `results` structure contains, for each trace:

| Field | Description |
|---|---|
| `idealised` | The idealised intensity trace (same length as input) |
| `class` | State index (integer) at each time point |
| `levels` | Mean intensity of each identified state |
| `transitions` | Time indices where transitions occur |
| `n_states` | Number of distinct states identified |
| `snr_effective` | Estimated effective SNR |
| `oc_selected` | Which OC was selected ('AIC_GMM' or 'BIC_RSS') |
| `dwell_times` | Dwell times for each state |

---

## 19. Running DISC Without the GUI

### DISC_noGUI

For standard DISC (without AutoDISC's automated OC selection):

```matlab
>> DISC_noGUI
```

This runs DISC on data loaded from the command line with default parameters (BIC_GMM, α = 0.05, 1 Viterbi iteration).

### Running DISC programmatically

```matlab
% Run DISC with a specific OC
results = runDISC(trace, 'BIC_GMM', 0.05, 1);
```

Where the arguments are: (1) the trace vector, (2) the OC string, (3) alpha value, (4) number of Viterbi iterations.

---

## 20. Batch Processing

### Processing many traces

```matlab
% Load all traces
data = load('all_piezo1_traces.mat');
traces = data.traces;  % cell array of variable-length traces

nTraces = length(traces);
results = cell(nTraces, 1);

for i = 1:nTraces
    results{i} = runAutoDISC(traces{i});
    if mod(i, 100) == 0
        fprintf('Processed %d / %d traces\n', i, nTraces);
    end
end

save('autodisc_results.mat', 'results');
```

### Processing multiple conditions

```matlab
conditions = {'untreated', 'DMSO', 'Yoda1_2uM'};

for c = 1:length(conditions)
    data = load([conditions{c} '_traces.mat']);
    traces = data.traces;
    
    results = cell(length(traces), 1);
    for i = 1:length(traces)
        results{i} = runAutoDISC(traces{i});
    end
    
    save([conditions{c} '_autodisc_results.mat'], 'results');
end
```

---

## 21. The PIEZO1-HaloTag-BAPTA System

### Overview

The PIEZO1-HaloTag system (Bertaccini et al., 2025) uses CRISPR-engineered hiPSCs where endogenous PIEZO1 is fused to a HaloTag at the C-terminus. The HaloTag covalently binds to exogenously provided HaloTag ligands (HTLs). Two types of HTLs are used:

- **JF646 HTL (non-Ca²⁺-sensitive):** Provides a constant fluorescent signal for localisation and tracking of PIEZO1 puncta, regardless of channel state.
- **JF646-BAPTA HTL (Ca²⁺-sensitive):** The BAPTA moiety is a Ca²⁺ chelator. When PIEZO1 opens, Ca²⁺ flows through the pore and binds to the nearby BAPTA, causing the JF646 fluorophore to brighten. When the channel closes, local Ca²⁺ drops and the fluorophore dims. This produces **fluorescence flickers** that report on channel gating.

### Why AutoDISC is ideal for this data

The JF646-BAPTA signal from a single PIEZO1 punctum is a noisy time series that alternates between a dim baseline (channel closed) and bright flickers (channel open). The key features:

- The signal-to-noise is low (single-molecule fluorescence)
- The channel opening and closing transitions are abrupt (< 2 frames at 500 fps, i.e., < 4 ms temporal resolution)
- Multiple intensity levels may be present (multiple channels in a punctum, subconductance states, or variable local Ca²⁺)
- Traces have variable lengths and SNR

AutoDISC handles all of these features automatically, making it the ideal tool for unbiased analysis of PIEZO1-BAPTA activity recordings.

---

## 22. Preparing PIEZO1 Fluorescence Traces for AutoDISC

### From TIRF imaging to intensity traces

The pipeline for generating AutoDISC-compatible traces from PIEZO1-HaloTag-BAPTA TIRF movies:

1. **Acquire** TIRF movies of PIEZO1-HaloTag cells labelled with JF646-BAPTA HTL (200--500 fps)
2. **Detect puncta** using ThunderSTORM or similar localisation software
3. **Track puncta** using FLIKA's SPT batch analysis plugin to link localisations into trajectories
4. **Extract intensity traces** for each tracked punctum: at each frame, measure the integrated fluorescence intensity in a small ROI (e.g., 5-pixel diameter circle) centred on the punctum, with local background subtraction
5. **Separate immobile and mobile puncta** (based on path length at 5 s; see Bertaccini et al. 2025). For dwell time analysis, focus on immobile puncta where the trace duration is longest.

### Formatting for AutoDISC

```matlab
% traces is a cell array: traces{i} is a 1×N_i vector of
% background-subtracted fluorescence intensities for punctum i
% N_i may differ between puncta (variable-length traces)

save('piezo1_bapta_traces.mat', 'traces');
```

Alternatively, if all traces have the same length, use a matrix:

```matlab
% traces is an N_puncta × N_frames matrix
save('piezo1_bapta_traces.mat', 'traces');
```

### Important preprocessing

- **Background subtraction:** Subtract local background for each punctum at each frame. A common approach is to measure the mean intensity in an annular region surrounding the punctum.
- **Baseline correction:** If there is slow photobleaching or drift, correct it before running AutoDISC. A simple approach: fit and subtract a slow exponential decay from the trace, or use smBEVO.
- **Do NOT threshold or filter the raw trace.** AutoDISC will determine the states objectively.

---

## 23. Workflow 1: Idealising PIEZO1-BAPTA Flicker Traces

### Complete MATLAB workflow

```matlab
%% Load traces
data = load('piezo1_bapta_traces.mat');
traces = data.traces;  % cell array of intensity traces

%% Run AutoDISC on all traces
nTraces = length(traces);
idealised = cell(nTraces, 1);
nStates = zeros(nTraces, 1);
snrEst = zeros(nTraces, 1);

for i = 1:nTraces
    result = runAutoDISC(traces{i});
    idealised{i} = result.idealised;
    nStates(i) = result.n_states;
    snrEst(i) = result.snr_effective;
end

%% Visualise a single trace
traceIdx = 5;  % choose a trace to inspect
t = (1:length(traces{traceIdx})) / 200;  % time in seconds (at 200 fps)

figure;
plot(t, traces{traceIdx}, 'Color', [0.7 0.7 0.7]); hold on;
plot(t, idealised{traceIdx}, 'b', 'LineWidth', 1.5);
xlabel('Time (s)');
ylabel('Fluorescence (c.u.)');
title(sprintf('Punctum %d: %d states, SNR = %.1f', ...
    traceIdx, nStates(traceIdx), snrEst(traceIdx)));

%% Summary histograms
figure;
subplot(1,2,1); histogram(nStates, 'BinMethod', 'integers');
xlabel('Number of states'); ylabel('Count');
title('States per punctum');

subplot(1,2,2); histogram(snrEst, 20);
xlabel('Effective SNR'); ylabel('Count');
title('SNR distribution');
```

---

## 24. Workflow 2: Comparing PIEZO1 Activity Across Conditions

### Scenario

You have PIEZO1-HaloTag-BAPTA traces from: (1) untreated ECs, (2) DMSO control, (3) 2 µM Yoda1-treated ECs. You want to determine how Yoda1 affects channel open probability and dwell times.

### MATLAB workflow

```matlab
conditions = {'Untreated', 'DMSO', 'Yoda1_2uM'};
files = {'untreated_traces.mat', 'dmso_traces.mat', 'yoda1_traces.mat'};

allResults = struct();

for c = 1:length(conditions)
    data = load(files{c});
    traces = data.traces;
    
    nTraces = length(traces);
    openFraction = zeros(nTraces, 1);
    
    for i = 1:nTraces
        result = runAutoDISC(traces{i});
        
        % Define "open" as any state above the lowest level
        levels = sort(unique(result.idealised));
        baseline = levels(1);
        isOpen = result.idealised > baseline;
        openFraction(i) = sum(isOpen) / length(isOpen);
    end
    
    allResults.(conditions{c}).openFraction = openFraction;
    fprintf('%s: mean open fraction = %.3f ± %.3f (n=%d)\n', ...
        conditions{c}, mean(openFraction), ...
        std(openFraction)/sqrt(nTraces), nTraces);
end

%% Plot comparison
figure;
data_to_plot = {allResults.Untreated.openFraction, ...
                allResults.DMSO.openFraction, ...
                allResults.Yoda1_2uM.openFraction};
boxplot(padcat(data_to_plot{:}), 'Labels', conditions);
ylabel('Open fraction');
title('PIEZO1 open probability');
```

### Expected result

Yoda1 increases the open-state occupancy of PIEZO1 (Bertaccini et al. 2025 showed increased puncta density and brightness with Yoda1). AutoDISC provides the objective state assignments needed to quantify this effect at the single-punctum level.

---

## 25. Workflow 3: Extracting Open and Closed Dwell Times

### Extracting dwells from idealised traces

```matlab
function dwells = extractDwells(idealised, fps)
    % Extract dwell times from an idealised trace
    % Returns a struct with fields: state, duration_s
    
    levels = sort(unique(idealised));
    baseline = levels(1);
    
    dwells = struct('state', {}, 'duration_s', {}, 'level', {});
    
    currentState = idealised(1);
    dwellStart = 1;
    
    for t = 2:length(idealised)
        if idealised(t) ~= currentState
            % Record the completed dwell
            d.level = currentState;
            d.state = ifelse(currentState <= baseline, 'closed', 'open');
            d.duration_s = (t - dwellStart) / fps;
            dwells(end+1) = d;
            
            currentState = idealised(t);
            dwellStart = t;
        end
    end
    
    % Record the last dwell (mark as censored - it extends to edge)
    d.level = currentState;
    d.state = ifelse(currentState <= baseline, 'closed', 'open');
    d.duration_s = (length(idealised) - dwellStart + 1) / fps;
    dwells(end+1) = d;
end

function out = ifelse(cond, a, b)
    if cond, out = a; else, out = b; end
end
```

### Analysing dwell time distributions

```matlab
fps = 200;  % frames per second

allOpenDwells = [];
allClosedDwells = [];

for i = 1:nTraces
    result = runAutoDISC(traces{i});
    dwells = extractDwells(result.idealised, fps);
    
    openIdx = strcmp({dwells.state}, 'open');
    closedIdx = strcmp({dwells.state}, 'closed');
    
    allOpenDwells = [allOpenDwells, dwells(openIdx).duration_s];
    allClosedDwells = [allClosedDwells, dwells(closedIdx).duration_s];
end

%% Plot dwell time histograms
figure;
subplot(1,2,1);
histogram(allOpenDwells * 1000, 50);  % convert to ms
xlabel('Open dwell time (ms)');
ylabel('Count');
title('Open state dwell times');

subplot(1,2,2);
histogram(allClosedDwells * 1000, 50);
xlabel('Closed dwell time (ms)');
ylabel('Count');
title('Closed state dwell times');
```

---

## 26. Interpreting Idealised PIEZO1-BAPTA Traces

### Two-state (open/closed) traces

The simplest case: the idealised trace has two levels.

- **Low level (baseline):** Channel closed. JF646-BAPTA fluorescence is dim because local Ca²⁺ is at resting cytosolic levels (~100 nM), below the dye's bright threshold.
- **High level (flicker):** Channel open. Ca²⁺ flows through the PIEZO1 pore, local Ca²⁺ near the BAPTA rises to > 15 µM, causing a bright fluorescence signal.

### Multi-level traces

AutoDISC may identify three or more levels. Possible interpretations:

- **Multiple channels:** A PIEZO1 punctum may contain multiple channels. If two channels open simultaneously, the combined Ca²⁺ influx is higher, producing a brighter signal.
- **Subconductance states:** PIEZO1 may exhibit partial openings with lower Ca²⁺ flux.
- **Variable labelling:** Not all HaloTag sites in a trimer may be labelled with BAPTA-HTL, creating intermediate intensity levels.
- **Photobleaching steps:** If the BAPTA dye bleaches during the recording, the maximum intensity decreases stepwise.

### All-points amplitude histograms

Plot the histogram of all fluorescence values in the trace. After AutoDISC idealisation, overlay Gaussian fits for each identified level. Peaks in the histogram correspond to the identified states.

---

## 27. Parameter Tuning Guide

### When to change alpha

| Situation | Recommendation |
|---|---|
| Too many false transitions detected | Decrease α to 0.01 or 0.005 |
| Obvious transitions being missed | Increase α to 0.10 |
| Default works well for most PIEZO1-BAPTA data | Keep α = 0.05 |

### When to manually select the OC (instead of AutoDISC)

| Situation | Recommendation |
|---|---|
| All traces are long with high SNR | Use AIC_GMM directly |
| All traces are short and noisy | Use BIC_RSS directly |
| Traces vary in length and SNR (typical) | Use AutoDISC (recommended) |

### When to change Viterbi iterations

For almost all PIEZO1-BAPTA data, 1 Viterbi iteration is sufficient. If you observe that transitions are consistently misplaced by 1--2 frames, try increasing to 2 iterations, but this is rarely necessary.

---

## 28. Common Problems and Solutions

### AutoDISC assigns only 1 state (flat line) despite visible flickers

- **Cause:** SNR is too low, or the flickers are too brief relative to the noise
- **Solutions:**
  - Check your background subtraction --- poor background subtraction increases noise
  - Try running DISC manually with BIC_RSS and α = 0.10 (more sensitive)
  - Average adjacent frames (bin the trace) to increase SNR at the cost of temporal resolution

### Too many states identified (overfitting)

- **Cause:** Per-event intensity heterogeneity (common in TIRF due to evanescent field variation), or noise spikes
- **Solutions:**
  - AutoDISC should handle this automatically (it selects AIC_GMM when appropriate)
  - If running DISC manually, switch from BIC_RSS to AIC_GMM
  - Filter traces by SNR threshold --- discard traces with SNR < 2

### Idealised trace has transitions that don't match visible events

- **Cause:** Slow baseline drift (photobleaching) being interpreted as state transitions
- **Solutions:**
  - Apply baseline correction before running AutoDISC (fit and subtract slow exponential, or use smBEVO)
  - For PIEZO1-BAPTA, the dim-state baseline is usually near zero (BAPTA is nearly dark at resting Ca²⁺), so large drifts suggest a preprocessing issue

### MATLAB error: "Statistics and Machine Learning Toolbox not found"

- **Solution:** Install the required toolbox via MATLAB Add-Ons, or use the MATLAB Home tab → Add-Ons → Get Add-Ons

### Analysis is very slow

- **Cause:** Very long traces (> 100,000 data points)
- **Solutions:**
  - Downsample the trace if the temporal resolution exceeds what is needed
  - DISC/AutoDISC is designed to be fast (orders of magnitude faster than HMMs), but extremely long traces still take proportionally longer

---

## 29. AutoDISC vs. Other Idealisation Methods

| Feature | AutoDISC | STaSI | vbFRET | HMM (general) | Manual threshold |
|---|---|---|---|---|---|
| **Unsupervised** | Fully | Fully | Requires # states | Requires model | No |
| **Speed** | Very fast (ms per trace) | Moderate | Slow | Very slow | Fast |
| **Accuracy** | State-of-the-art | Good | Good | Good (if model correct) | Variable |
| **Handles variable SNR** | Yes (per-trace OC selection) | No | No | No | No |
| **Handles variable trace length** | Yes | Partially | Yes | Yes | Yes |
| **Robust to intensity heterogeneity** | Yes | No (overfits) | Yes | If modelled | No |
| **Identifies # states** | Automatically | Automatically | User-specified | User-specified | User-specified |
| **Requires model** | No | No | Yes (HMM) | Yes (HMM) | No |
| **Platform** | MATLAB | MATLAB | MATLAB | Various | Various |
| **Best for** | High-throughput SM fluorescence with variable conditions | Moderate-throughput SM | smFRET with known models | Well-defined models | Quick-and-dirty |

### When to use AutoDISC

- You have many traces with variable SNR and lengths (typical of TIRF experiments)
- You don't know the number of states a priori
- You want fully automated, reproducible analysis
- Speed matters (large datasets)

### When to use something else

- You have a well-defined kinetic model and want to globally fit it → HMM (e.g., QuB, SPARTAN)
- You are doing classic smFRET with known states → vbFRET
- You want simple two-state analysis with a known threshold → manual thresholding (but AutoDISC is still better)

---

*This manual was developed for the PIEZO1 research group to support analysis of PIEZO1-HaloTag-BAPTA calcium-sensitive fluorescence recordings. AutoDISC provides fully unsupervised, optimised idealisation of the noisy single-molecule time series produced by PIEZO1 channel gating, enabling objective quantification of channel activity states, open probability, and dwell times across experimental conditions.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*AutoDISC is open-source software (GPL-3.0) available at https://github.com/marcel-goldschen-ohm/AutoDISC.*

*Citations:*

*White, D.S. et al. (2020). eLife, 9, e53357.*

*Bandyopadhyay, A. & Goldschen-Ohm, M.P. (2021). Biophysical Journal, 120(20), 4472--4483.*

*Bertaccini, G.A. et al. (2025). Nature Communications, 16, 5556.*
