# u-track 2.5 Manual for Biology Researchers

**A Comprehensive Guide for Single-Particle Tracking of Fluorescent Puncta**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why u-track?](#1-introduction-why-u-track)
2. [Installing u-track](#2-installing-u-track)
3. [How u-track Works: The Algorithm](#3-how-u-track-works-the-algorithm)

**Part II: The u-track GUI**

4. [Creating a Movie Database](#4-creating-a-movie-database)
5. [The Main Analysis Panel](#5-the-main-analysis-panel)

**Part III: Step 1 — Detection**

6. [Point Source Detection (Gaussian Mixture-Model Fitting)](#6-point-source-detection-gaussian-mixture-model-fitting)
7. [Detection Parameters](#7-detection-parameters)
8. [Evaluating Detection Quality](#8-evaluating-detection-quality)

**Part IV: Step 2 — Tracking (Frame-to-Frame Linking)**

9. [The Frame-to-Frame Linking Step](#9-the-frame-to-frame-linking-step)
10. [Motion Models](#10-motion-models)
11. [Linking Parameters](#11-linking-parameters)

**Part V: Step 3 — Gap Closing, Merging and Splitting**

12. [Gap Closing](#12-gap-closing)
13. [Merging and Splitting](#13-merging-and-splitting)
14. [Gap Closing Parameters](#14-gap-closing-parameters)

**Part VI: Step 4 — Track Analysis**

15. [Motion Analysis](#15-motion-analysis)

**Part VII: Output**

16. [The tracksFinal Structure](#16-the-tracksfinal-structure)
17. [Converting Tracks to Matrix Format](#17-converting-tracks-to-matrix-format)
18. [Saving and Exporting Results](#18-saving-and-exporting-results)

**Part VIII: Visualisation**

19. [plotTracks2D](#19-plottracks2d)
20. [overlayFeaturesMovie](#20-overlayfeaturesmovie)
21. [overlayTracksMovieNew](#21-overlaytracksmoviewew)
22. [plotCompTrack](#22-plotcomptrack)

**Part IX: Command Line Scripting**

23. [scriptDetectGeneral](#23-scriptdetectgeneral)
24. [scriptTrackGeneral](#24-scripttrackgeneral)
25. [Batch Processing Multiple Movies](#25-batch-processing-multiple-movies)

**Part X: Practical Workflows**

26. [Workflow 1: PIEZO1-GFP Puncta Tracking (TIRF)](#26-workflow-1-piezo1-gfp-puncta-tracking-tirf)
27. [Workflow 2: Tracking with Merge/Split Detection](#27-workflow-2-tracking-with-mergesplit-detection)
28. [Workflow 3: Extracting Diffusion Coefficients from Tracks](#28-workflow-3-extracting-diffusion-coefficients-from-tracks)
29. [Workflow 4: Lifetime Analysis of Puncta](#29-workflow-4-lifetime-analysis-of-puncta)
30. [Workflow 5: Exporting Tracks to Python for Further Analysis](#30-workflow-5-exporting-tracks-to-python-for-further-analysis)

**Part XI: Tips and Troubleshooting**

31. [Parameter Tuning Strategy](#31-parameter-tuning-strategy)
32. [Common Problems and Solutions](#32-common-problems-and-solutions)
33. [u-track vs. Other Tracking Software](#33-u-track-vs-other-tracking-software)

---

## 1. Introduction: Why u-track?

### What is u-track?

u-track is a **multiple-particle tracking** software written in MATLAB. It is designed to (1) track dense particle fields, (2) close gaps in particle trajectories resulting from detection failure, and (3) capture particle **merging and splitting** events resulting from occlusion or genuine aggregation and dissociation. The current version is **u-track 2.5**.

u-track's core algorithm formulates the correspondence problem (which particle in frame *t* corresponds to which particle in frame *t*+1?) as a **linear assignment problem (LAP)** and searches for a **globally optimal solution**, rather than using greedy nearest-neighbour approaches that can make locally good but globally suboptimal assignments.

### The u-track papers

| Paper | Reference | Contribution |
|---|---|---|
| **u-track** | Jaqaman, Loerke, Mettlen et al. (2008). *Nature Methods*, 5(8), 695--702. | Core LAP-based tracking algorithm with gap closing, merging and splitting. |
| **plusTipTracker** | Applegate, Besson, Matov et al. (2011). *J. Struct. Biol.*, 176(2), 168--84. | Microtubule plus-end tracking within u-track. |
| **Nuclei tracking** | Ng, Besser, Danuser & Brugge (2012). *J. Cell Biol.*, 199(3), 545--63. | Nuclei tracking application. |
| **u-track 3D** | Risiber, Miao et al. (2022). *bioRxiv*. | Extension to 3D light-sheet data with dynamic ROIs. |

u-track was developed by **Khuloud Jaqaman** (now UT Southwestern) in the laboratory of **Gaudenz Danuser** (UT Southwestern), with contributions from Dinah Loerke, Marcel Mettlen, and many others.

### Why u-track for PIEZO1 puncta?

- **Sub-pixel localisation:** Gaussian mixture-model fitting achieves localisation precision well below the diffraction limit, ideal for PIEZO1-GFP puncta imaged by TIRF
- **Dense particle fields:** Handles high puncta densities typical of membrane protein distributions
- **Gap closing:** Automatically reconnects trajectories when puncta temporarily disappear (e.g., blinking, out-of-focus motion, transient signal loss)
- **Merge/split detection:** Captures aggregation and dissociation events, relevant for PIEZO1 cluster dynamics
- **Motion classification:** Built-in motion analysis distinguishes Brownian (diffusive) from directed (actively transported) motion
- **Globally optimal:** The LAP formulation finds the best overall assignment of particles to tracks, avoiding the cascading errors of greedy algorithms
- **Mature and validated:** Over 1,400 citations since 2008; extensively validated on diverse biological tracking problems
- **Kalman filtering:** Uses Kalman filters for motion prediction, improving tracking of fast-moving particles

### u-track in the PIEZO1 literature

u-track has been used for single-particle tracking of PIEZO1 in several studies:

| Study | PIEZO1 label | Cell type | Tracking software |
|---|---|---|---|
| Holt et al. (2021) | PIEZO1-tdTomato (knock-in) | Mouse chondrocytes | u-track |
| Ly et al. (2025) | PIEZO1-GFP | Overexpression models | u-track |
| Bertaccini et al. (2025) | PIEZO1-HaloTag (endogenous, hiPSC) | Human endothelial cells, cardiomyocytes | ThunderSTORM + FLIKA |

Bertaccini et al. (2025, *Nature Communications*) imaged endogenous PIEZO1-HaloTag in hiPSC-derived cells using JF549-HaloTag ligand (HTL) and JF646-BAPTA-HTL under TIRF, but chose ThunderSTORM for detection and FLIKA for linking rather than u-track. Nonetheless, the quantitative parameters reported in that study---pixel size, PSF characteristics, diffusion coefficients, mobile/immobile classification criteria, and gap closing considerations---are directly informative for configuring u-track on similar PIEZO1 imaging data. The sections below incorporate these parameters where relevant. u-track remains the primary tool for PIEZO1-tdTomato tracking in mouse cells (Holt et al. 2021) and for comparison/benchmarking studies.

### What u-track does NOT do

- **Segmentation:** u-track detects diffraction-limited point sources, not extended objects. For cell segmentation, use Cellpose, StarDist, or ilastik.
- **Image pre-processing:** u-track does not perform background subtraction, drift correction, or denoising. Do these upstream.
- **3D tracking (v2.5):** The standard u-track 2.5 is designed for 2D time-lapse data. For 3D, see u-track 3D.
- **Non-MATLAB analysis:** u-track runs exclusively in MATLAB. For Python-based tracking, see trackpy or LapTrack.

---

## 2. Installing u-track

### Requirements

- **MATLAB** 2011a or later (tested through 2024b)
- **Required toolboxes:** Image Processing Toolbox, Statistics and Machine Learning Toolbox, Optimization Toolbox, Curve Fitting Toolbox
- **Operating systems:** Windows, macOS (including Apple Silicon M1--M4 as of v2.5), Linux
- **RAM:** 8 GB minimum; 16+ GB for large/long movies

### Installation

1. Download u-track from https://github.com/DanuserLab/u-track
2. Extract the zip file
3. In MATLAB, add the software directory to the path:
   - Right-click the `software` folder → **Add to Path → Selected Folders and Subfolders**
   - Or: **Home → Set Path → Add with Subfolders** → select the `software` directory → Save
4. Verify: type `u_quantify` at the MATLAB command prompt (v2.4+) or `movieSelectorGUI` (older versions) --- the GUI should appear

### Docker alternative

A containerised u-track is available on Docker Hub (`jennyzouutsw/utrack2.3`) for environments where MATLAB licensing is difficult.

### Version history highlights

| Version | Key change |
|---|---|
| **2.5** | Apple Silicon (M-series Mac) support |
| **2.4** | GUI renamed to "u-quantify" (`u_quantify` command) |
| **2.3** | Major speed improvements for large/long movies |
| **2.2** | Parallel processing for multi-movie datasets |
| **2.1** | OMERO server support |
| **2.0** | Added plusTipTracker and nuclei tracking applications |

---

## 3. How u-track Works: The Algorithm

### The three-step process

u-track constructs tracks from a time-lapse image sequence in three steps:

**Step 0 — Detection.** In each frame independently, detect particles and determine their sub-pixel positions by fitting Gaussian kernels (or Gaussian mixture models) to local intensity maxima.

**Step 1 — Frame-to-frame linking.** Link detected particles between consecutive frames (frame *t* to frame *t*+1) by constructing a **cost matrix** where each entry represents the cost of assigning particle *i* in frame *t* to particle *j* in frame *t*+1. The cost is based on predicted positions (from Kalman filtering) and particle amplitudes. The globally optimal assignment is found by solving the **linear assignment problem (LAP)**. This step also allows particles to appear (births) or disappear (deaths) between frames.

**Step 2 — Gap closing, merging, and splitting.** After the initial frame-to-frame linking produces short track segments, a second LAP is solved to: (a) **close gaps** by linking the end of one segment to the start of a later segment that represents the same particle after a temporary disappearance; (b) **capture merges** where a segment end corresponds to a particle joining an ongoing track; (c) **capture splits** where a new segment start corresponds to a particle leaving an ongoing track.

### The cost matrix

The cost matrix is the mathematical heart of u-track. For frame-to-frame linking:

- **Top-left block:** Costs for linking particle *i* (frame *t*) to particle *j* (frame *t*+1). Based on the distance between the predicted position of *i* and the observed position of *j*, weighted by the localisation uncertainty and motion model.
- **Top-right block:** Costs for particle *i* to "die" (disappear / not link to anything in frame *t*+1).
- **Bottom-left block:** Costs for particle *j* to be "born" (appear / not linked from anything in frame *t*).
- **Bottom-right block:** Auxiliary block required by the LAP formulation.

An entry marked as impossible (cost = infinity) means the link exceeds the maximum search radius. The LAP solver finds the global assignment that minimises total cost.

### Kalman filtering

u-track uses Kalman filters to propagate particle positions forward in time. The Kalman filter maintains an estimate of each particle's state (position, velocity) and updates it with each new observation. This allows u-track to predict where a particle should appear in the next frame, making the search more efficient and accurate, especially for directed motion.

---

## 4. Creating a Movie Database

### Launching the GUI

```matlab
% Version 2.4+
u_quantify

% Older versions
movieSelectorGUI
```

This opens the **Movie selection panel**: a left panel listing movies and a right panel listing available analysis packages.

### Method 1: Import using Bio-Formats (recommended)

1. Click **New** in the Movie selection panel
2. In the Movie edition interface, click **Import movie using Bio-Formats**
3. Select your image file (supports TIFF stacks, ND2, CZI, LIF, OIF, and many more via Bio-Formats)
4. The metadata (pixel size, time interval, etc.) will be read automatically if present
5. **Critical:** Verify and fill in if missing:
   - **Pixel size** (nm) --- e.g., 108 nm for a typical TIRF setup
   - **Time interval** (seconds) --- e.g., 0.1 s for 10 fps acquisition
   - **Numerical aperture** --- e.g., 1.49 for a TIRF objective
   - **Camera bit depth** --- e.g., 16-bit
6. For each channel, click **Advanced Channel Settings** and fill in the **emission wavelength** (nm) --- e.g., 509 nm for GFP
7. Click **Save** --- choose a location for the MAT file containing the movie database

### Method 2: From TIFF file series

If your data is stored as individual TIFF files per frame:

1. Organise files with naming convention: `MyMovie001.tif`, `MyMovie002.tif`, ...
2. Store each channel in a separate folder
3. Click **New**, then **Add Channel**, select the folder
4. Fill in pixel size, time interval, NA, bit depth manually
5. Select an output directory for results
6. Click **Save**

### Important: metadata accuracy

The pixel size and emission wavelength are used to calculate the **PSF sigma** (the standard deviation of the Gaussian point spread function), which directly affects detection sensitivity. If these are wrong, detection will be suboptimal.

---

## 5. The Main Analysis Panel

After adding movies and selecting the **Tracking** package, the main analysis panel appears with a sequential workflow:

| Step | Process | Description |
|---|---|---|
| **Step 1** | Detection | Detect particles in each frame |
| **Step 2** | Tracking | Link particles between frames and close gaps |
| **Step 3** | Track Analysis | Classify track motion (optional) |

For each step:
- Click **Setting** to configure parameters
- Check the checkbox to schedule for processing
- Click **Run** to execute
- Click **Result** to view output (after successful run)

**Multi-movie processing:** Use **Apply to All Movies** in the Settings to configure all movies at once, and **Run All Movies** to process in batch. Version 2.2+ supports parallel processing.

### Application selection

When first running u-track on a movie, a dialog asks which objects to track:

| Application | Default detection | Default tracking | Best for |
|---|---|---|---|
| **Single particles** | Gaussian mixture-model fitting | Brownian + directed motion | Fluorescent puncta, receptors, vesicles, single molecules |
| **Microtubule plus-ends** | Comet detection | MT plus-end dynamics | EB1/EB3 comets |
| **Nuclei** | Nuclei detection | Brownian + directed motion | Fluorescently labelled nuclei |

**For PIEZO1 puncta: select "Single particles."**

---

## 6. Point Source Detection (Gaussian Mixture-Model Fitting)

### How detection works

u-track detects diffraction-limited particles using a multi-step process:

1. **Local maxima detection:** Find candidate bright spots by identifying intensity peaks above the local background. u-track searches for local maxima in time-averaged images (to increase SNR for finding candidates) and then fits in individual frames.

2. **Sub-pixel localisation by Gaussian fitting:** For each candidate, fit a 2D Gaussian function (matching the PSF shape) to the intensity profile around the local maximum. This achieves sub-pixel localisation precision, typically 10--50 nm depending on SNR.

3. **Statistical testing:** Each candidate is tested against the local background using a significance test controlled by an **alpha value**. Only candidates that are statistically significant (brighter than expected from noise alone) are retained.

4. **Gaussian mixture-model fitting:** When two particles are close together (within a few PSF widths), their images overlap. u-track uses iterative Gaussian mixture-model fitting to decompose overlapping spots into individual particles, enabling detection in dense fields.

### Detection methods in the GUI

| Method | Description | Best for |
|---|---|---|
| **Gaussian mixture-model fitting** (default for single particles) | Full iterative GMM fitting; handles overlapping particles | Dense puncta fields, TIRF data |
| **Point source detection** | Simpler single-Gaussian fitting without mixture model iteration | Sparse, well-separated particles |

For PIEZO1 puncta in TIRF, **Gaussian mixture-model fitting** is recommended because puncta can be closely spaced on the membrane.

---

## 7. Detection Parameters

### Accessing detection settings

In the GUI: click **Setting** next to Step 1 (Detection).

### Key parameters

**PSF sigma (σ).** The standard deviation of the Gaussian approximation to the microscope's point spread function, in pixels. This is calculated from the emission wavelength (λ), numerical aperture (NA), and pixel size (p):

σ ≈ 0.21 × λ / NA / p

For example, with λ = 509 nm (GFP), NA = 1.49, pixel size = 108 nm:

σ ≈ 0.21 × 509 / 1.49 / 108 ≈ 0.67 pixels

If the metadata (pixel size, NA, emission wavelength) was entered correctly, u-track calculates this automatically.

**Alpha value (α).** The significance level for the statistical test that distinguishes real particles from noise. This is the **most important tuning parameter** for detection.

- **α = 0.05** (default): Standard statistical threshold. Good starting point.
- **Smaller α (e.g., 0.01, 0.001):** More stringent. Fewer detections, fewer false positives. Use for noisy data where you're getting too many spurious detections.
- **Larger α (e.g., 0.1, 0.2):** More permissive. More detections, including dimmer particles. Use if real puncta are being missed.

**Fitting window size.** The region around each local maximum used for Gaussian fitting, in multiples of PSF sigma. Default is typically 4σ.

**Maximum number of Gaussian mixtures.** The maximum number of overlapping Gaussians that the mixture-model fitting will try to decompose. Default: automatically determined. Increase if you have very dense clusters.

**Absolute background (optional).** A separate background image (e.g., a region outside the cell) can be provided for a stricter statistical comparison, reducing false positives outside the cell while maintaining sensitivity inside.

### Recommended starting parameters for PIEZO1-GFP TIRF

| Parameter | Recommended value | Notes |
|---|---|---|
| Detection method | Gaussian mixture-model fitting | Handles dense puncta |
| PSF sigma | Auto-calculated from metadata | Verify ~0.5--1.0 pixels for TIRF |
| Alpha value | 0.05 (start here) | Decrease to 0.01 if too many false positives; increase to 0.1 if missing puncta |
| Mask from channel | Enable if you have a cell mask | Restricts detection to within cells |

---

## 8. Evaluating Detection Quality

### Using overlayFeaturesMovie

After running detection, click **Result** next to Step 1 to view detected features overlaid on the raw images. Alternatively, from the command line:

```matlab
overlayFeaturesMovie(movieInfo, [], 0, [], [], 1, 1, firstImageFile);
```

### What to look for

- **Under-detection (false negatives):** Visible puncta without detection markers. Fix by increasing α (e.g., 0.1) or checking PSF sigma.
- **Over-detection (false positives):** Detection markers on noise/background. Fix by decreasing α (e.g., 0.01) or providing an absolute background image.
- **Detection in noise regions outside cells:** Provide a cell mask or use the absolute background option.
- **Closely spaced puncta resolved:** Verify that the mixture-model fitting is separating adjacent puncta. If not, ensure the fitting window and maximum mixtures are large enough.

---

## 9. The Frame-to-Frame Linking Step

### How linking works

After detection, u-track links particles across consecutive frames. For each pair of frames (*t*, *t*+1):

1. **Predict positions:** Use Kalman filter predictions from the motion model to estimate where each particle in frame *t* should appear in frame *t*+1.
2. **Build cost matrix:** Calculate the cost of linking each detected particle in frame *t* to each detected particle in frame *t*+1. The cost combines position distance (actual vs. predicted) and amplitude similarity.
3. **Apply search radius cutoff:** Links whose predicted-to-observed distance exceeds the maximum search radius are forbidden (set to infinite cost).
4. **Include birth/death costs:** Add the option for particles to appear or disappear.
5. **Solve the LAP:** Find the globally optimal assignment that minimises total cost.

### Multiple linking rounds

u-track performs linking in multiple rounds to handle motion heterogeneity:

- **Round 1:** Link with minimal assumptions (random/Brownian motion). This initialises the Kalman filters.
- **Round 2:** Re-link using the Kalman filter predictions from Round 1. Now the tracker can use velocity estimates.
- **Round 3:** Re-link using time-reversed Kalman filter information (improves linking at track beginnings).

---

## 10. Motion Models

### Available motion models (linearMotion parameter)

| Value | Model | Description | Best for |
|---|---|---|---|
| `linearMotion = 0` | **Brownian (random) only** | One motion model: pure diffusion. Search radius scales with √time. | Freely diffusing particles, membrane proteins with no directed transport |
| `linearMotion = 1` | **Brownian + constant velocity** | Two motion models: random diffusion AND directed motion with constant velocity. | Motor-driven transport, vesicle trafficking |
| `linearMotion = 2` | **Brownian + linear (with reversal)** | Two motion models: random diffusion AND motion along a line with possible direction reversal. | 1D diffusion along filaments, confined motion |

### For PIEZO1 puncta

PIEZO1 on the cell membrane is primarily expected to undergo **Brownian diffusion** (possibly confined). Unless you observe clear directed transport, start with `linearMotion = 0`. If you see puncta moving along tracks (e.g., along actin filaments), try `linearMotion = 1`.

---

## 11. Linking Parameters

### Key parameters

**Maximum search radius (in pixels).** The maximum distance a particle is allowed to move between consecutive frames. Any link exceeding this distance is forbidden.

- Too small: Real links are broken, creating track fragments.
- Too large: Spurious links between unrelated particles.
- **Rule of thumb:** Set to the maximum expected displacement per frame. For diffusing PIEZO1 puncta, estimate from √(4Dτ) where D is the expected diffusion coefficient and τ is the frame interval.

**Minimum search radius (in pixels).** The minimum search radius, providing a lower bound even when the Kalman filter predicts very small displacements. Default: typically 2--3 pixels.

**Brownian search radius multiplication factor.** A factor by which the predicted Brownian search radius is multiplied. Default: 3. Increase if tracks are fragmenting.

**Number of frames for initial search radius estimation.** The number of frames used to estimate the initial search radius from the data itself. Default: 10.

### Recommended starting parameters for PIEZO1-GFP TIRF

| Parameter | Recommended value | Notes |
|---|---|---|
| Motion model (linearMotion) | 0 (Brownian only) | Start simple; try 1 if directed motion is observed |
| Maximum search radius | 5--10 pixels | Depends on frame rate and diffusion coefficient |
| Minimum search radius | 2 pixels | Prevents search radius collapsing to zero |
| Brownian multiplication factor | 3 | Increase to 5 if many gaps/fragmenting |

---

## 12. Gap Closing

### What is gap closing?

After the frame-to-frame linking step, many track segments will have gaps where a particle temporarily disappeared (e.g., due to photobleaching recovery, out-of-focus motion, transient membrane unbinding, or simply a missed detection). Gap closing links the **end of one track segment** to the **start of a later segment** if they likely represent the same particle.

### How gap closing works

A second cost matrix is constructed:

- **Gap closing costs:** Based on the distance between the last known position of segment I and the first known position of segment J, scaled by the time gap and the motion history of the segments.
- **Merge/split costs:** (see next section)
- **Alternative costs:** The cost of not closing a gap (i.e., accepting the segments as separate tracks).

The LAP is solved globally to find the optimal set of gap closures, merges, and splits.

### Gap closing time window

The maximum number of frames that a gap can span. If a particle disappears for longer than this window, the gap will not be closed.

- **Rule of thumb:** Set based on expected disappearance durations. For PIEZO1 puncta that might blink or transiently unbind, 2--5 frames is a reasonable starting point.
- **Diagnostic:** After tracking, examine the histogram of closed gap lengths. If the histogram has a plateau at long gaps (rather than declining monotonically), the time window may be too large.

---

## 13. Merging and Splitting

### What are merging and splitting events?

- **Merging:** Two previously separate particles join together into one. In the cost matrix, the end of track segment I is linked to an interior point of track segment J.
- **Splitting:** One particle divides into two. In the cost matrix, the start of track segment I is linked to an interior point of track segment J.

### When to enable merge/split

For PIEZO1 puncta, merge/split detection is relevant if you are studying:
- **Cluster formation:** PIEZO1 molecules aggregating into larger clusters
- **Cluster dissociation:** Clusters breaking apart
- **Endocytic events:** Puncta being internalised from the membrane

If you only care about individual puncta trajectories without aggregation dynamics, you can **disable merge/split** to simplify the tracking and reduce computation time.

---

## 14. Gap Closing Parameters

### Key parameters

**Gap closing time window (frames).** Maximum number of frames a gap can span.
- Default: 8
- For PIEZO1 at 10 fps: 5 frames = 0.5 seconds maximum disappearance.
- For PIEZO1 at 2 fps: 3 frames = 1.5 seconds maximum disappearance.

**Merge/split enabled.** Whether to allow merge and split events.
- For basic PIEZO1 diffusion analysis: **disable** (set to 0)
- For PIEZO1 clustering studies: **enable** (set to 1)

**Search radius scaling.** The gap closing search radius scales with time: larger gaps allow larger spatial displacements. The scaling exponents are:
- **brownScaling:** How the Brownian search radius scales with gap length. Default: [0.5, 0.01]. The first value (0.5 = √time) is used for gaps up to `timeReachConfB` frames; the second value is used for longer gaps.
- **linScaling:** Same for the directed motion component.

**timeReachConfB / timeReachConfL.** The number of frames after which the search radius transitions from √time scaling to near-constant scaling. This prevents the search radius from growing indefinitely for long gaps.

**Gap length penalty (gapPenalty).** A penalty factor for longer gaps. If gapPenalty = p, the cost of a gap of length n is multiplied by p^n.
- p > 1: Longer gaps are penalised (conservative gap closing)
- p = 1: No penalty (default)
- p < 1: Longer gaps are favoured (aggressive gap closing)

**Resolution limit (resLimit).** The resolution limit in pixels (approximately the Airy disk radius). Used to ensure merge/split search radii are not smaller than the optical resolution.

### Recommended starting parameters for PIEZO1-GFP TIRF

| Parameter | Recommended value | Notes |
|---|---|---|
| Gap closing time window | 3--5 frames | Adjust based on frame rate |
| Merge/split | Off (disable) | Enable only for clustering studies |
| brownScaling | [0.5 0.01] | Default; √time scaling |
| timeReachConfB | 3--5 frames | ~same as gap window |
| gapPenalty | 1 | No penalty (start here) |

---

## 15. Motion Analysis

### The optional Step 3

After tracking, u-track can classify each track (or sub-segments of tracks) by motion type. In the GUI, this is Step 3: **Track Analysis → Motion Analysis**.

### Motion classification

The motion analysis classifies track segments as:

- **Immobile / confined:** The particle is essentially stationary or confined to a small area.
- **Brownian (diffusive):** Random walk with mean-square displacement (MSD) growing linearly with time.
- **Directed (linear):** The particle moves with a persistent velocity; MSD grows quadratically with time.

The classification is based on fitting the MSD curve of each track segment and comparing the goodness-of-fit for different motion models.

### Output

Motion analysis produces:
- Classification of each track or track segment
- Diffusion coefficients for Brownian segments
- Velocities for directed segments
- Confinement radii for confined segments

---

## 16. The tracksFinal Structure

### Format

The tracking output is a MATLAB structure array called `tracksFinal`. If u-track finds N compound tracks, `tracksFinal` is an N×1 structure with three fields per entry:

**1. tracksFeatIndxCG**

Connectivity matrix of particles between frames (after gap closing).

- Rows = number of track segments within the compound track
- Columns = number of frames the compound track spans
- Values = index of the detected particle in that frame (from `movieInfo`); 0 = particle not present (gap, or before/after track)

**2. tracksCoordAmpCG**

Positions and amplitudes of tracked particles (after gap closing).

- Rows = number of track segments within the compound track
- Columns = 8 × number of frames the compound track spans

For each frame, 8 values are stored in order:
1. x-coordinate
2. y-coordinate
3. z-coordinate (0 for 2D)
4. amplitude (integrated intensity)
5. x-coordinate standard deviation
6. y-coordinate standard deviation
7. z-coordinate standard deviation (0 for 2D)
8. amplitude standard deviation

**3. seqOfEvents**

Matrix recording the sequence of events in a compound track.

- Rows = number of events (= 2 × number of segments)
- 4 columns per row:
  1. Frame index
  2. Event type: 1 = start, 2 = end
  3. Local segment index
  4. NaN = true initiation/termination; a number = the segment from which this segment split or into which it merged

### Example: accessing a simple track

```matlab
% Get track #5
track = tracksFinal(5);

% Get coordinates
coords = track.tracksCoordAmpCG;

% Extract x, y, amplitude (every 8th column)
x = coords(1, 1:8:end);   % x positions
y = coords(1, 2:8:end);   % y positions
amp = coords(1, 4:8:end);  % amplitudes

% Start and end frames
startFrame = track.seqOfEvents(1, 1);
endFrame = track.seqOfEvents(end, 1);
lifetime = endFrame - startFrame + 1;

fprintf('Track 5: %d frames, start=%d, end=%d\n', lifetime, startFrame, endFrame);
```

---

## 17. Converting Tracks to Matrix Format

### Without merging/splitting

```matlab
[trackedFeatureInfo, trackedFeatureIndx] = convStruct2MatNoMS(tracksFinal);
```

- `trackedFeatureInfo`: Matrix of positions/amplitudes for all tracks (rows) across all frames (columns, 8 per frame).
- `trackedFeatureIndx`: Matrix of particle indices for all tracks across all frames.

NaN values indicate frames where the particle is not present.

### With merging/splitting (ignoring the merge/split structure)

```matlab
[trackedFeatureInfo, trackedFeatureIndx, trackStartRow, numSegments] = ...
    convStruct2MatIgnoreMS(tracksFinal);
```

**Warning:** The matrix format can consume a lot of memory for long movies. Merge/split information is lost in the conversion.

---

## 18. Saving and Exporting Results

### Saving in MATLAB

```matlab
% Save tracksFinal as a MAT file
save('tracking_results.mat', 'tracksFinal', 'movieInfo');
```

### Exporting tracks to CSV

```matlab
% Convert to matrix format
[trackedFeatureInfo, ~] = convStruct2MatNoMS(tracksFinal);

nTracks = size(trackedFeatureInfo, 1);
nFrames = size(trackedFeatureInfo, 2) / 8;

% Build a table: track_id, frame, x, y, amplitude
rows = [];
for t = 1:nTracks
    for f = 1:nFrames
        idx = (f-1)*8;
        x = trackedFeatureInfo(t, idx+1);
        y = trackedFeatureInfo(t, idx+2);
        amp = trackedFeatureInfo(t, idx+4);
        if ~isnan(x)
            rows = [rows; t, f, x, y, amp];
        end
    end
end

T = array2table(rows, 'VariableNames', {'track_id','frame','x','y','amplitude'});
writetable(T, 'tracks.csv');
```

### Exporting to Python (via MAT file)

```python
# In Python, using scipy
from scipy.io import loadmat
import numpy as np

data = loadmat('tracking_results.mat', squeeze_me=True, struct_as_record=False)
tracksFinal = data['tracksFinal']

for i, track in enumerate(tracksFinal):
    coords = track.tracksCoordAmpCG
    # coords shape: (n_segments, 8 * n_frames)
    # Extract x, y, amp
    if coords.ndim == 1:
        coords = coords.reshape(1, -1)
    x = coords[0, 0::8]
    y = coords[0, 1::8]
    amp = coords[0, 3::8]
```

---

## 19. plotTracks2D

```matlab
% Plot all tracks, colour-coded by time
plotTracks2D(tracksFinal, [], 1, [], 1, 1);

% Plot tracks 50-150 frames, random colours, on first image
img = imread('frame001.tif');
plotTracks2D(tracksFinal, [50 150], 2, [], 1, 1, img);

% Plot only tracks longer than 20 frames, all in red
plotTracks2D(tracksFinal, [], 'r', [], 1, 1, [], [], 0, [], 20);
```

In the plot:
- **Dotted line** = closed gap
- **Dashed line** = merge
- **Dash-dotted line** = split

---

## 20. overlayFeaturesMovie

Generates a movie of detected features overlaid on the raw images:

```matlab
overlayFeaturesMovie(movieInfo, [], 0, [], [], 1, 1, firstImageFile);
% Arguments: movieInfo, startend, saveMovie, movieName, [], showRaw,
%            intensityScale, firstImageFile
```

Useful for checking detection quality before tracking.

---

## 21. overlayTracksMovieNew

Generates a movie of tracks overlaid on the raw images:

```matlab
overlayTracksMovieNew(tracksFinal, [], 10, 1, 'tracks_overlay.mov', ...
    [], 0, [], 0, 1, 0, firstImageFile);
```

In the overlay:
- **Circles** = detected particles
- **Asterisks** = closed gaps
- **Yellow diamonds** = merges
- **Green diamonds** = splits

---

## 22. plotCompTrack

Plots a single compound track showing coordinates and amplitude vs. time:

```matlab
% Plot track #10
plotCompTrack(tracksFinal(10));
```

Shows x, y, and amplitude over time, highlighting gaps, merges, and splits.

---

## 23. scriptDetectGeneral

For command-line usage without the GUI:

```matlab
% Open and edit the detection script
edit scriptDetectGeneral

% Key parameters to set:
% - movieParam.imageDir: path to image files
% - movieParam.filenameBase: base name of files
% - movieParam.firstImageNum, lastImageNum: frame range
% - movieParam.digits4Num: number of digits in filename numbering
% - detectionParam.psfSigma: PSF sigma in pixels
% - detectionParam.testAlpha: struct with fields .fdr (alpha value)
% - saveResults.dir: output directory
% - saveResults.filename: output filename

% Run
scriptDetectGeneral
% Output: movieInfo (structure array, one entry per frame)
```

---

## 24. scriptTrackGeneral

```matlab
% Open and edit the tracking script
edit scriptTrackGeneral

% Key sections to configure:
% 1. Cost function names
%    gapCloseParam.mergeSplit = 0; % 0=off, 1=on for merge/split
%    costMatrices(1).funcName = 'costMatRandomDirectedSwitchingMotionLink';
%    costMatrices(2).funcName = 'costMatRandomDirectedSwitchingMotionCloseGaps';

% 2. Linking parameters
%    costMatrices(1).parameters.linearMotion = 0;  % 0=Brownian only
%    costMatrices(1).parameters.maxSearchRadius = 10;
%    costMatrices(1).parameters.minSearchRadius = 2;

% 3. Gap closing parameters
%    gapCloseParam.timeWindow = 5;
%    costMatrices(2).parameters.brownScaling = [0.5 0.01];
%    costMatrices(2).parameters.timeReachConfB = 5;

% 4. Kalman filter functions
%    kalmanFunctions.initMethod = 'initCoordSimple';
%    kalmanFunctions.calcMethod = 'kalmanResMemLM';

% Run
scriptTrackGeneral
% Output: tracksFinal
```

---

## 25. Batch Processing Multiple Movies

### In the GUI

1. Add all movies to the Movie selection panel
2. In each Settings dialog, check **Apply to All Movies**
3. Check **Apply Check/Uncheck to All Movies** for scheduling
4. Click **Run All Movies**

Version 2.2+ supports parallel processing via MATLAB's Parallel Computing Toolbox.

### From the command line

```matlab
% Define list of movie directories
movieDirs = {'movie01/', 'movie02/', 'movie03/'};

for m = 1:length(movieDirs)
    % Set up detection parameters for this movie
    movieParam.imageDir = movieDirs{m};
    % ... (set all parameters)
    
    % Run detection
    movieInfo = detectSubResFeatures2D_StandAlone(...);
    
    % Run tracking
    tracksFinal = trackCloseGapsKalmanSparse(...);
    
    % Save
    save(fullfile(movieDirs{m}, 'tracking.mat'), 'tracksFinal', 'movieInfo');
end
```

---

## 26. Workflow 1: PIEZO1-GFP Puncta Tracking (TIRF)

### Scenario

You have TIRF microscopy movies of cells expressing PIEZO1-GFP. You want to track individual PIEZO1 puncta to measure their diffusion characteristics on the membrane.

### Step-by-step (GUI)

1. **Launch:** `u_quantify` in MATLAB
2. **Create movie:** New → Import movie using Bio-Formats → select your TIFF stack
3. **Verify metadata:** Pixel size = 108 nm, Time interval = 0.1 s (10 fps), NA = 1.49, Emission = 509 nm (GFP)
4. **Select package:** Tracking → Continue → Single particles
5. **Step 1 — Detection:**
   - Method: Gaussian mixture-model fitting
   - Alpha value: 0.05
   - PSF sigma: auto-calculated (~0.67 pixels)
   - Run → check results with overlayFeaturesMovie
   - If too many false positives: decrease α to 0.01
   - If missing puncta: increase α to 0.1
6. **Step 2 — Tracking:**
   - Motion model: linearMotion = 0 (Brownian)
   - Max search radius: 8 pixels (~0.86 µm)
   - Min search radius: 2 pixels
   - Gap closing time window: 3 frames (0.3 s)
   - Merge/split: disabled
   - Run
7. **Step 3 — Track Analysis:**
   - Motion analysis
   - Run
8. **View results:** plotTracks2D, overlayTracksMovieNew

---

## 27. Workflow 2: Tracking with Merge/Split Detection

### Scenario

You want to study PIEZO1 clustering dynamics --- whether puncta aggregate into larger clusters or disperse.

### Key settings

```matlab
% Enable merge/split
gapCloseParam.mergeSplit = 1;   % 1 = allow merging and splitting

% Set merge/split search radius
costMatrices(2).parameters.resLimit = 3;  % resolution limit in pixels
```

### Interpreting merge/split events

```matlab
for i = 1:length(tracksFinal)
    events = tracksFinal(i).seqOfEvents;
    for e = 1:size(events, 1)
        frame = events(e, 1);
        eventType = events(e, 2);  % 1=start, 2=end
        segIdx = events(e, 3);
        linkTo = events(e, 4);     % NaN=true start/end, number=merge/split
        
        if eventType == 2 && ~isnan(linkTo)
            fprintf('Track %d: segment %d MERGES with segment %d at frame %d\n', ...
                i, segIdx, linkTo, frame);
        elseif eventType == 1 && ~isnan(linkTo)
            fprintf('Track %d: segment %d SPLITS from segment %d at frame %d\n', ...
                i, segIdx, linkTo, frame);
        end
    end
end
```

---

## 28. Workflow 3: Extracting Diffusion Coefficients from Tracks

### MSD-based diffusion analysis

```matlab
% Convert tracks
[trackedFeatureInfo, ~] = convStruct2MatNoMS(tracksFinal);

nTracks = size(trackedFeatureInfo, 1);
nFrames = size(trackedFeatureInfo, 2) / 8;
pixelSize = 0.108;  % µm per pixel
dt = 0.1;            % seconds per frame

diffCoeffs = nan(nTracks, 1);
minTrackLength = 20;  % minimum frames for reliable MSD

for t = 1:nTracks
    % Extract x, y in µm
    x = trackedFeatureInfo(t, 1:8:end) * pixelSize;
    y = trackedFeatureInfo(t, 2:8:end) * pixelSize;
    
    % Remove NaN (gaps)
    valid = ~isnan(x);
    x = x(valid);
    y = y(valid);
    
    if length(x) < minTrackLength
        continue;
    end
    
    % Calculate MSD for first 1/4 of track length
    maxLag = floor(length(x) / 4);
    msd = zeros(maxLag, 1);
    counts = zeros(maxLag, 1);
    
    for lag = 1:maxLag
        dx = x(lag+1:end) - x(1:end-lag);
        dy = y(lag+1:end) - y(1:end-lag);
        displacements = dx.^2 + dy.^2;
        msd(lag) = mean(displacements);
        counts(lag) = length(displacements);
    end
    
    % Fit MSD = 4*D*t + offset (first 5 points)
    fitPoints = min(5, maxLag);
    taus = (1:fitPoints)' * dt;
    msdFit = msd(1:fitPoints);
    
    % Linear fit: MSD = slope * t + intercept
    p = polyfit(taus, msdFit, 1);
    diffCoeffs(t) = p(1) / 4;  % D = slope / 4 for 2D diffusion
end

% Summary
validD = diffCoeffs(~isnan(diffCoeffs));
fprintf('Median D = %.4f µm²/s (n=%d tracks)\n', median(validD), length(validD));

% Histogram
figure;
histogram(log10(validD), 30);
xlabel('log_{10}(D [µm²/s])');
ylabel('Count');
title('PIEZO1 Diffusion Coefficient Distribution');
```

---

## 29. Workflow 4: Lifetime Analysis of Puncta

### Measuring how long puncta persist on the membrane

```matlab
pixelSize = 0.108;  % µm
dt = 0.1;            % seconds

lifetimes = zeros(length(tracksFinal), 1);
for i = 1:length(tracksFinal)
    events = tracksFinal(i).seqOfEvents;
    startFrame = events(1, 1);
    endFrame = events(end, 1);
    lifetimes(i) = (endFrame - startFrame) * dt;  % in seconds
end

% Filter: exclude tracks that span the entire movie
% (these are censored — lifetime is unknown)
movieLength = nFrames * dt;
uncensored = lifetimes < (movieLength - 2*dt);

figure;
histogram(lifetimes(uncensored), 50);
xlabel('Lifetime (s)');
ylabel('Count');
title('PIEZO1 Puncta Lifetime Distribution');

fprintf('Median lifetime = %.2f s (n=%d)\n', ...
    median(lifetimes(uncensored)), sum(uncensored));
```

---

## 30. Workflow 5: Exporting Tracks to Python for Further Analysis

### Save as CSV from MATLAB

```matlab
[trackedFeatureInfo, ~] = convStruct2MatNoMS(tracksFinal);
pixelSize = 0.108;  % µm
dt = 0.1;            % seconds

nTracks = size(trackedFeatureInfo, 1);
nFrames = size(trackedFeatureInfo, 2) / 8;

rows = [];
for t = 1:nTracks
    for f = 1:nFrames
        idx = (f-1)*8;
        x_px = trackedFeatureInfo(t, idx+1);
        y_px = trackedFeatureInfo(t, idx+2);
        amp = trackedFeatureInfo(t, idx+4);
        if ~isnan(x_px)
            rows = [rows; t, f, (f-1)*dt, x_px*pixelSize, y_px*pixelSize, amp];
        end
    end
end

T = array2table(rows, 'VariableNames', ...
    {'track_id','frame','time_s','x_um','y_um','amplitude'});
writetable(T, 'piezo1_tracks.csv');
fprintf('Exported %d localisations in %d tracks\n', size(rows,1), nTracks);
```

### Load in Python

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('piezo1_tracks.csv')
print(f"{df['track_id'].nunique()} tracks, {len(df)} localisations")

# Plot all tracks
fig, ax = plt.subplots(figsize=(8, 8))
for tid, grp in df.groupby('track_id'):
    ax.plot(grp['x_um'], grp['y_um'], linewidth=0.5, alpha=0.5)
ax.set_xlabel('x (µm)')
ax.set_ylabel('y (µm)')
ax.set_aspect('equal')
ax.set_title('PIEZO1 Tracks')
plt.tight_layout()
plt.savefig('piezo1_tracks.png', dpi=300)
plt.show()
```

---

## 31. Parameter Tuning Strategy

### Systematic approach

1. **Start with detection.** Get detection right before worrying about tracking. Run detection, visualise with overlayFeaturesMovie, and adjust α until most real puncta are detected with few false positives.

2. **Run tracking with conservative parameters.** Use Brownian motion only (linearMotion = 0), a moderate max search radius, and a small gap closing window. Visualise with plotTracks2D and overlayTracksMovieNew.

3. **Check for fragmented tracks.** If tracks are too short and you can see visually that they should be longer, the problem is either:
   - Max search radius too small → increase it
   - Gap closing time window too small → increase it
   - Brownian multiplication factor too small → increase it

4. **Check for spurious links.** If tracks jump between different particles:
   - Max search radius too large → decrease it
   - Too many particles and not enough motion constraint → try adding directed motion model

5. **Iterate.** Tracking is an iterative process. Adjust, re-run, visualise, repeat.

### Diagnostics

- **Frame-to-frame linking distances:** Set `parameters.diagnostics` to plot histograms of linking distances. If the histogram extends to the search radius limit, increase the limit.
- **Gap length histogram:** Set `gapCloseParam.diagnostics = 1` to plot gap lengths after tracking. A declining histogram is healthy; a plateau suggests the time window is too large.

---

## 32. Common Problems and Solutions

### No particles detected

- **Wrong PSF sigma:** Verify metadata (pixel size, NA, emission wavelength). Try manually setting PSF sigma.
- **Alpha too strict:** Increase α to 0.1 or 0.2.
- **Image format issue:** Ensure images are correctly loaded (check dimensions, bit depth).

### Too many false detections

- **Alpha too permissive:** Decrease α to 0.01 or 0.001.
- **Background fluorescence:** Provide absolute background images from regions outside cells.
- **Cell mask:** Use a cell mask to restrict detection to regions of interest.

### Tracks are too short / fragmented

- **Max search radius too small:** Increase it. Estimate expected displacement per frame.
- **Gap closing window too small:** Increase from 3 to 5--8 frames.
- **Brownian multiplication factor too small:** Increase from 3 to 5.

### Tracks jump between particles (wrong links)

- **Max search radius too large:** Decrease it.
- **Particle density too high:** Ensure mixture-model fitting is decomposing overlapping particles.
- **Frame rate too low:** If particles move too far between frames, tracking becomes ambiguous. Consider increasing frame rate or accepting shorter tracks.

### Out-of-memory errors

- **Large movies:** u-track 2.3+ has improved memory handling. Upgrade if using an older version.
- **Matrix conversion:** `convStruct2MatNoMS` can be very memory-intensive. Work with the structure format directly or process movies in chunks.

### "Toolbox not found" errors

- Verify all four required toolboxes are installed: Image Processing, Statistics, Optimization, Curve Fitting.

---

## 33. u-track vs. Other Tracking Software

| Consideration | u-track | TrackMate (FIJI) | trackpy (Python) | Icy |
|---|---|---|---|---|
| **Language** | MATLAB | Java (FIJI plugin) | Python | Java |
| **Algorithm** | LAP (global optimum) | LAP (Jaqaman algorithm available) | Crocker-Grier + LAP | Various |
| **Detection** | Gaussian / GMM fitting (sub-pixel) | LoG, DoG, and many others | Bandpass + centroid | Wavelet, others |
| **Gap closing** | Yes (built-in, LAP-based) | Yes (LAP-based) | Yes (basic) | Yes |
| **Merge/split** | Yes (native) | Limited | No | Limited |
| **Motion models** | Brownian, directed, switching | Simple LAP | Nearest-neighbour | Various |
| **Kalman filtering** | Yes | Limited | No | No |
| **3D** | Via u-track 3D (separate) | Yes | Yes | Yes |
| **GUI** | Yes | Yes (excellent) | No (scripting) | Yes |
| **Scripting** | Yes (MATLAB) | Yes (Jython/Groovy) | Yes (Python) | Yes (JavaScript) |
| **Best for** | Dense, heterogeneous SPT with merge/split; sub-pixel precision; motion classification | General-purpose tracking with many detection options; ease of use | Python-based workflows; colloid tracking; simple SPT | Multi-purpose bioimage analysis |

### When to use u-track

- You need **sub-pixel localisation** of diffraction-limited particles
- Your particles exhibit **heterogeneous motion** (some diffusing, some directed)
- You need to detect **merging and splitting** events
- You want **globally optimal** tracking (LAP, not greedy)
- You work in MATLAB
- You have **dense particle fields** (GMM fitting resolves overlapping particles)

### When to use something else

- **TrackMate:** If you prefer working in FIJI, want a more intuitive GUI, or need diverse detection methods
- **trackpy:** If you work in Python and your tracking problem is straightforward
- **Icy:** If you want a general-purpose bioimage analysis platform with tracking

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using u-track for tracking fluorescent PIEZO1-GFP puncta on cell membranes. u-track's combination of sub-pixel Gaussian detection, globally optimal LAP-based linking, Kalman filter motion prediction, and gap closing makes it an excellent choice for quantitative single-particle tracking in TIRF microscopy.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*u-track is free software released under the GPL-3.0 licence.*

*Tutorial video: https://youtu.be/dPTc4du7iqY*

*For community support, post on the image.sc forum or open an issue at https://github.com/DanuserLab/u-track*

*Citation: Jaqaman, K., Loerke, D., Mettlen, M. et al. Robust single-particle tracking in live-cell time-lapse sequences. Nature Methods 5, 695--702 (2008). https://doi.org/10.1038/nmeth.1237*
