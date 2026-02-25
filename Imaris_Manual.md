# Imaris Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is Imaris?](#1-introduction-what-is-imaris)
2. [Installation and Licensing](#2-installation-and-licensing)
3. [The Imaris Interface](#3-the-imaris-interface)
4. [Opening and Importing Data](#4-opening-and-importing-data)

**Part II: 3D Visualization**

5. [Volume Rendering](#5-volume-rendering)
6. [Maximum Intensity Projection (MIP)](#6-maximum-intensity-projection-mip)
7. [Blend and Shadow Rendering](#7-blend-and-shadow-rendering)
8. [Adjusting Display: Colours, Contrast, and Transparency](#8-adjusting-display-colours-contrast-and-transparency)
9. [Camera Controls: Rotation, Zoom, and Clipping Planes](#9-camera-controls-rotation-zoom-and-clipping-planes)
10. [Multi-Channel Display](#10-multi-channel-display)

**Part III: Object Detection and Segmentation**

11. [Spots Detection](#11-spots-detection)
12. [Surfaces: 3D Object Segmentation](#12-surfaces-3d-object-segmentation)
13. [Cells Module](#13-cells-module)
14. [Filaments: Neurite Tracing and Cytoskeletal Structures](#14-filaments-neurite-tracing-and-cytoskeletal-structures)
15. [Measurement Points and Manual Annotations](#15-measurement-points-and-manual-annotations)

**Part IV: Tracking**

16. [Tracking Principles in Imaris](#16-tracking-principles-in-imaris)
17. [Spot Tracking](#17-spot-tracking)
18. [Surface Tracking](#18-surface-tracking)
19. [Track Statistics: Speed, Displacement, and Diffusion](#19-track-statistics-speed-displacement-and-diffusion)
20. [Track Visualisation and Editing](#20-track-visualisation-and-editing)

**Part V: Measurement and Statistics**

21. [Object Statistics](#21-object-statistics)
22. [Distance Measurements](#22-distance-measurements)
23. [Co-localisation Analysis](#23-co-localisation-analysis)
24. [Exporting Statistics](#24-exporting-statistics)

**Part VI: Time-Series Analysis**

25. [4D Visualisation (3D + Time)](#25-4d-visualisation-3d--time)
26. [Drift Correction](#26-drift-correction)
27. [Object-Based Analysis Over Time](#27-object-based-analysis-over-time)

**Part VII: Animation and Publication Figures**

28. [Creating Animations (Key Frame Animator)](#28-creating-animations-key-frame-animator)
29. [Snapshot and Movie Export](#29-snapshot-and-movie-export)
30. [Publication-Quality Figure Preparation](#30-publication-quality-figure-preparation)

**Part VIII: Advanced Features**

31. [Imaris XT: Python and MATLAB Scripting](#31-imaris-xt-python-and-matlab-scripting)
32. [Batch Processing](#32-batch-processing)
33. [Working with Very Large Datasets](#33-working-with-very-large-datasets)
34. [Imaris File Converter](#34-imaris-file-converter)

**Part IX: Practical Workflows**

35. [Workflow 1: 3D Rendering of Organoid Light-Sheet Data](#35-workflow-1-3d-rendering-of-organoid-light-sheet-data)
36. [Workflow 2: PIEZO1 Puncta Detection and Counting in 3D](#36-workflow-2-piezo1-puncta-detection-and-counting-in-3d)
37. [Workflow 3: Tracking PIEZO1 Puncta in 4D Organoids](#37-workflow-3-tracking-piezo1-puncta-in-4d-organoids)
38. [Workflow 4: Multi-Channel Organoid Rendering for Figures](#38-workflow-4-multi-channel-organoid-rendering-for-figures)
39. [Workflow 5: Distance Analysis (PIEZO1 to Lumen)](#39-workflow-5-distance-analysis-piezo1-to-lumen)

**Part X: Tips and Troubleshooting**

40. [Performance Tips for Large 3D Data](#40-performance-tips-for-large-3d-data)
41. [Common Problems and Solutions](#41-common-problems-and-solutions)
42. [Imaris vs. Other 3D Viewers](#42-imaris-vs-other-3d-viewers)

---

## 1. Introduction: What is Imaris?

### Overview

Imaris is a commercial software platform for the visualisation, segmentation, and analysis of 3D and 4D microscopy data. Developed by **Bitplane** (now part of **Oxford Instruments**), Imaris is widely used in biological research for rendering volumetric datasets from confocal, light-sheet, and multi-photon microscopy.

Imaris provides GPU-accelerated 3D rendering, built-in object detection (spots, surfaces, filaments, cells), tracking, and a rich statistics export system. Its intuitive interface makes it accessible to biologists without programming experience, while the Imaris XT extension enables scripting in Python and MATLAB for advanced or automated workflows.

### Why Imaris for PIEZO1 research?

In Bertaccini et al. (2025) *Nature Communications*, Imaris x64 version 10.0.0 was used for 3D/4D visualisation and analysis of PIEZO1-HaloTag data from adaptive optical lattice light-sheet microscopy (AO-LLSM) of Micropatterned Neural Rosettes (MNRs). Specific applications included:

- **Volumetric rendering** of MNRs showing actin, nuclei, and PIEZO1-HaloTag JF635 puncta in 3D
- **Spot detection** of PIEZO1-HaloTag puncta in 3D volumes
- **Visualisation** of the spatial distribution of PIEZO1 relative to the MNR lumen and outer edge

### When to cite Imaris

Imaris is a commercial product; include it in your Methods section with the version number:

> "3D visualization was performed using Imaris x64 10.0.0 (Bitplane/Oxford Instruments)."

### Key features

| Feature | Description |
|---|---|
| **Volume rendering** | GPU-accelerated rendering of 3D/4D microscopy data |
| **Spots** | Detect and quantify point-like objects (puncta, vesicles, nuclei) in 3D |
| **Surfaces** | Segment and mesh 3D structures (cells, organoids, nuclei) |
| **Filaments** | Trace elongated structures (neurites, blood vessels, cytoskeleton) |
| **Tracking** | Track objects over time in 4D datasets |
| **Statistics** | 100+ built-in measurements, exportable to CSV |
| **Animation** | Key-frame animator for creating movies of 3D fly-throughs |
| **Imaris XT** | Python and MATLAB scripting for custom analysis |
| **File handling** | Native `.ims` format for efficient handling of terabyte-scale datasets |

### Resources

| Resource | URL |
|---|---|
| Oxford Instruments Imaris | https://imaris.oxinst.com |
| Imaris Learning Center | https://imaris.oxinst.com/learning |
| Tutorials and videos | https://imaris.oxinst.com/tutorials |
| Imaris XT API documentation | https://imaris.oxinst.com/open |
| Forum (image.sc) | https://forum.image.sc/tag/imaris |
| Support | https://imaris.oxinst.com/support |

---

## 2. Installation and Licensing

### System requirements

| Component | Minimum | Recommended |
|---|---|---|
| **OS** | Windows 10 64-bit | Windows 11 64-bit |
| **CPU** | 4 cores | 8+ cores, high clock speed |
| **RAM** | 16 GB | 64+ GB (for large datasets) |
| **GPU** | NVIDIA with 2 GB VRAM, OpenGL 3.3 | NVIDIA RTX with 8+ GB VRAM |
| **Disk** | SSD | NVMe SSD, multi-TB for datasets |

Imaris uses the GPU extensively for rendering. An NVIDIA GPU with CUDA support is strongly recommended.

### Installation

1. Download the Imaris installer from the Oxford Instruments website
2. Run the installer and follow prompts
3. Install the Imaris File Converter separately (useful for converting data formats)
4. Configure your licence (node-locked or floating)

### Licensing

Imaris uses a modular licensing system:

| Module | Functionality |
|---|---|
| **Imaris** | Core 3D/4D viewer, volume rendering |
| **Imaris MeasurementPro** | Advanced statistics and object measurements |
| **Imaris Track** | Object tracking over time |
| **Imaris Cell** | Cell and compartment segmentation |
| **Imaris Filament Tracer** | Neurite and filament tracing |
| **Imaris Vantage** | Multi-dimensional statistics plots |
| **Imaris XT** | Python/MATLAB scripting |
| **Imaris Batch** | Batch processing without GUI |

For PIEZO1 organoid analysis, the core Imaris module plus MeasurementPro and Track are typically sufficient.

---

## 3. The Imaris Interface

### Main components

When you open a dataset in Imaris, the interface consists of:

| Component | Description |
|---|---|
| **3D View** | The central viewport showing the rendered volume |
| **Surpass Tree** | Hierarchical list of objects (volume, spots, surfaces, etc.) |
| **Object toolbar** | Buttons for creating new Spots, Surfaces, Filaments, etc. |
| **Properties panel** | Settings for the selected object (colour, size, thresholds) |
| **Time slider** | Scrub through time points in 4D data |
| **Channel controls** | Adjust colours, contrast, and visibility per channel |
| **Menu bar** | File, Edit, Image Processing, and other menus |

### View modes

| Mode | Description | Shortcut |
|---|---|---|
| **Surpass** | Full 3D rendering and analysis | Default |
| **Section** | 2D orthogonal slices (XY, XZ, YZ) | Toggle in menu |
| **3D View** | Camera rotation around dataset | Mouse drag |
| **Slice** | Single optical section | Slider |
| **Gallery** | Thumbnail overview of channels | — |

### Navigation controls

| Action | Mouse/Keyboard |
|---|---|
| Rotate | Left-click + drag |
| Pan | Middle-click + drag (or Shift + left-click) |
| Zoom | Scroll wheel |
| Reset view | Double-click in empty area |
| Frame selection | Click object in Surpass tree |

---

## 4. Opening and Importing Data

### Native Imaris format (.ims)

Imaris uses its own HDF5-based file format (`.ims`) for efficient multi-resolution storage and access. For very large datasets, converting to `.ims` first is strongly recommended.

### Supported formats

Imaris can open many formats directly:

| Format | Extension | Source |
|---|---|---|
| Imaris | .ims | Native |
| TIFF | .tif, .tiff | Universal |
| Nikon NIS | .nd2 | Nikon microscopes |
| Zeiss CZI | .czi | Zeiss microscopes |
| Leica LIF | .lif | Leica microscopes |
| OME-TIFF | .ome.tif | Open standard |
| Micro-Manager | .ome.tif + metadata.txt | Micro-Manager |

### Opening AO-LLSM data

Lattice light-sheet data from Bertaccini et al. (2025) was processed with MATLAB (deskewing, deconvolution, stitching) before loading into Imaris. The processed data was saved as multi-page TIFF stacks and then converted to `.ims` format using the Imaris File Converter.

### Imaris File Converter

The File Converter is a standalone application for converting large datasets to `.ims`:

1. Open Imaris File Converter
2. Drag and drop the input files (TIFF series, .nd2, .czi, etc.)
3. Configure the output: set voxel size, channel colours, time points
4. Set the output path and click **Start**

For a multi-channel dataset:

| Channel | File pattern | Colour |
|---|---|---|
| Actin | `actin_t*.tif` | Orange |
| Nuclei | `nuclei_t*.tif` | Cyan |
| PIEZO1 | `piezo1_t*.tif` | Green |

### Setting voxel size

After importing, verify the voxel size:

```
Edit > Image Properties > Voxel Size
  X: 0.108 μm    (pixel size in X)
  Y: 0.108 μm    (pixel size in Y)
  Z: 0.215 μm    (z step, after deskewing for lattice light-sheet)
```

Correct voxel sizes are essential for accurate 3D rendering and distance measurements.

---

## 5. Volume Rendering

### What is volume rendering?

Volume rendering displays every voxel in a 3D dataset, with transparency and colour determined by the voxel intensity. This gives a holistic view of the full sample volume.

### Rendering modes

Imaris provides several volume rendering modes:

| Mode | Description | Best for |
|---|---|---|
| **Maximum Intensity Projection (MIP)** | Each pixel shows the maximum intensity along the viewing ray | Quick overview, bright structures on dark background |
| **Blend** | Weighted sum of voxels along viewing ray | Dense structures, tissue context |
| **Normal Shading** | Surface-like rendering with lighting | Solid structures, organoids |
| **Shadow** | Similar to Blend but with directional lighting | Depth perception in dense samples |

### Adjusting volume display

For each channel, adjust:

- **Colour map:** Choose a colour (e.g. green for actin, cyan for nuclei, red/magenta for PIEZO1)
- **Contrast range:** Set the min/max display values using the histogram
- **Gamma:** Adjust the nonlinear mapping (gamma < 1 brightens dim structures)
- **Opacity:** Control how transparent the channel appears

### Tips for organoid rendering

For MNR data with actin, nuclei, and PIEZO1:

1. Set actin to **orange** and adjust contrast to show both the lumen and outer edge
2. Set nuclei to **cyan** with moderate opacity to show cell positions without obscuring other channels
3. Set PIEZO1 to **green** or **magenta** with high contrast to make sparse puncta visible
4. Apply a gamma of 0.5 to the actin channel to bring out dimmer structures (as done in Bertaccini et al. 2025, Fig. 5B)
5. Use clipping planes (Section 9) to cut through the organoid and reveal internal structure

---

## 6. Maximum Intensity Projection (MIP)

### When to use MIP

MIP rendering is the default for most fluorescence microscopy data. It works well when:

- Structures of interest are bright relative to background
- The sample is relatively sparse (individual puncta, fibres, nuclei)
- You need a quick overview of a 3D volume

### MIP limitations

MIP does not convey depth information well and can obscure the 3D structure of dense samples. For organoids, consider Blend or Shadow rendering for context, with MIP overlay for bright puncta.

### Creating 2D MIP images

For analysis or figures, Imaris can generate 2D maximum intensity projections:

```
Image Processing > Maximum Intensity Projection
  → Axis: Z (project along Z to create XY view)
```

In Bertaccini et al. (2025), 3-plane MIP images were generated from AO-LLSM stacks for quantitative analysis of PIEZO1 puncta distribution in MNRs.

---

## 7. Blend and Shadow Rendering

### Blend mode

Blend mode accumulates intensities along the viewing ray, producing a semi-transparent rendering where dense structures appear brighter. This is useful for showing the internal structure of organoids.

### Shadow mode

Shadow mode adds directional lighting to the Blend rendering, creating shadows that enhance depth perception. This is particularly effective for MNR images where you want to show the lumen, cell organisation, and PIEZO1 distribution simultaneously.

### Adjusting lighting

In Shadow mode:

- **Light direction:** Click and drag the light direction indicator
- **Shadow intensity:** Adjust the shadow slider
- **Ambient light:** Controls the overall brightness of unlit regions

---

## 8. Adjusting Display: Colours, Contrast, and Transparency

### Channel display settings

For each channel, click on the channel name in the channel list to access:

| Setting | Description |
|---|---|
| **Colour** | LUT colour (click the colour swatch) |
| **Min/Max** | Display range (drag the histogram handles) |
| **Gamma** | Non-linear contrast curve |
| **Opacity** | Channel transparency (0 = invisible, 1 = fully opaque) |
| **Blend mode** | How this channel composites with others |

### Recommended display settings for PIEZO1 organoid data

| Channel | Colour | Gamma | Opacity | Notes |
|---|---|---|---|---|
| Actin (SPY555-actin) | Orange | 0.5 | 0.5 | Gamma 0.5 reveals dim structures |
| Nuclei (SPY505-DNA) | Cyan | 1.0 | 0.3 | Low opacity to avoid obscuring PIEZO1 |
| PIEZO1 (JF635 HTL) | Green | 1.0 | 1.0 | Full opacity for puncta visibility |

---

## 9. Camera Controls: Rotation, Zoom, and Clipping Planes

### Rotation and zoom

- **Rotate:** Left-click + drag in the 3D view
- **Zoom:** Scroll wheel or Shift + right-click + drag
- **Pan:** Middle-click + drag or Shift + left-click + drag
- **Reset:** Press **Home** or double-click background

### Clipping planes

Clipping planes cut through the volume to reveal internal structures. This is essential for organoid imaging:

1. **Edit > Show Clipping Plane** (or press **C**)
2. A plane appears in the viewport; drag it to cut through the organoid
3. Adjust the plane position and orientation
4. Multiple clipping planes can be active simultaneously

For MNRs, a horizontal clipping plane at mid-height reveals the cross-sectional organisation of cells around the central lumen, matching the confocal imaging plane shown in Bertaccini et al. (2025), Fig. 5B.

### Orthogonal views (Section view)

The Section view shows XY, XZ, and YZ orthogonal slices simultaneously, useful for verifying 3D structures and checking z-resolution.

---

## 10. Multi-Channel Display

### Overlay modes

Imaris displays multi-channel data as an overlay by default:

- Each channel has its own colour and contrast settings
- Channels are composited additively (colours blend where channels overlap)
- Toggle individual channels on/off by clicking the eye icon

### Split view

Use **Edit > Grid View** to display each channel in a separate panel, side by side. This is useful for checking individual channels before creating composite views.

### Channel arithmetic

Imaris can perform channel operations:

```
Image Processing > Channel Arithmetic
  → New channel = Channel1 - Channel2    (e.g., background subtraction)
```

---

## 11. Spots Detection

### What are Spots?

The Spots module detects and quantifies point-like objects in 3D, such as:

- PIEZO1-HaloTag puncta
- Fluorescent beads
- Nuclei (if roughly spherical)
- Vesicles

### Creating Spots

1. Click the **Spots** button in the object toolbar (or **Add New Spots** in the Surpass tree)
2. The Spots creation wizard opens with several steps:

**Step 1: Source channel**
- Select the channel containing the objects to detect (e.g. PIEZO1-JF635)
- Choose whether to use the existing channel or a pre-processed version

**Step 2: Estimated diameter**
- Set the estimated XY diameter of the objects
- For PIEZO1-HaloTag puncta: ~0.4 μm (diffraction-limited)
- Check **Model PSF-elongation along Z-axis** for 3D detection with anisotropic resolution

**Step 3: Quality threshold**
- Imaris applies a Gaussian-based filter and thresholds to find spots
- Adjust the quality slider: higher threshold = fewer, brighter spots
- Preview the detections on the image

**Step 4: Filter**
- Optional: filter detected spots by additional criteria (intensity, distance to other objects, etc.)

### Spots statistics

After detection, each spot has statistics:

| Statistic | Description |
|---|---|
| Position X, Y, Z | 3D coordinates |
| Intensity Mean | Mean intensity within the spot |
| Intensity Sum | Sum of intensity within the spot |
| Quality | Detection quality score |
| Distance to surface | Distance to a selected surface object |

### Spots parameters for PIEZO1 puncta

For detecting PIEZO1-HaloTag JF635 puncta in AO-LLSM data:

| Parameter | Value | Rationale |
|---|---|---|
| Estimated XY diameter | 0.4 μm | Diffraction-limited puncta |
| Background subtraction | Enabled | Removes autofluorescence |
| Quality threshold | Adjusted per sample | Set to minimise false positives (compare to KO control) |
| Model PSF elongation | Enabled | Corrects for z-elongation in light-sheet data |

---

## 12. Surfaces: 3D Object Segmentation

### What are Surfaces?

The Surfaces module segments and meshes 3D structures, creating a polygonal surface representation. Uses include:

- Segmenting cells or nuclei in 3D
- Creating MNR lumen and outer edge surfaces
- Defining tissue boundaries
- Measuring volume, surface area, and shape

### Creating Surfaces

1. Click the **Surfaces** button in the object toolbar
2. The wizard guides you through:

**Step 1: Source channel**
- Select the channel (e.g. actin for lumen/outer edge)

**Step 2: Smoothing and thresholding**
- **Surface grain size:** Controls surface detail (0.5–2 μm for cellular structures)
- **Absolute intensity threshold** or **Background subtraction:** Choose the segmentation method
- Adjust threshold to delineate the structure of interest

**Step 3: Filtering**
- Filter by volume, sphericity, or other criteria to remove small debris

### Creating MNR lumen and outer edge surfaces

For the organoid analysis in Bertaccini et al. (2025), surfaces representing the lumen and outer edge were created:

1. Use the actin channel (bright at lumen and outer edge)
2. Create a surface around the bright lumen ring
3. Create a second surface around the outer edge boundary
4. Use these surfaces as references for distance measurements from PIEZO1 puncta

---

## 13. Cells Module

### What is the Cells module?

The Cells module provides a specialised workflow for detecting cells and their compartments (nucleus, cytoplasm, membrane, vesicles) in 3D images. It combines surface and spot detection with cell-based assignment.

### When to use Cells vs. Surfaces

| Use case | Tool |
|---|---|
| Individual cells with nuclei | Cells module |
| Tissue boundaries (lumen, edge) | Surfaces |
| Punctate objects (PIEZO1) | Spots |
| Complex morphology | Surfaces or Cells |

### Cells workflow for organoids

1. Detect nuclei using the nuclear channel (SPY505-DNA or Hoechst)
2. Define cell boundaries from the membrane/actin channel
3. Assign PIEZO1 puncta (detected as Spots) to individual cells
4. Measure per-cell puncta density

---

## 14. Filaments: Neurite Tracing and Cytoskeletal Structures

### Overview

The Filaments module traces elongated, branching structures in 3D. While primarily designed for neurite tracing, it can also be used for:

- Actin stress fibres
- Microtubule networks
- Blood vessels in organoids

### Basic filament tracing

1. Select the source channel
2. Set the estimated diameter of the filament
3. Use automatic detection or manual tracing
4. Imaris generates a skeleton with branching points, end points, and segment statistics

### Application to MNR analysis

In MNRs, the actin cytoskeleton radiates from the lumen to the outer edge. Filament tracing can map these radial structures, providing a spatial framework for understanding PIEZO1 distribution relative to cytoskeletal organisation.

---

## 15. Measurement Points and Manual Annotations

### Measurement Points

Imaris provides tools for placing manual measurement points in 3D:

- **Point:** Click to place a single point
- **Line:** Click two points to measure distance
- **Angle:** Click three points to measure angle

### Manual annotations

When automatic detection is insufficient, manually place landmarks or reference points:

1. **Add New Measurement Points** in the Surpass tree
2. Click in the 3D view to place points
3. Points are stored with full 3D coordinates and can be exported

---

## 16. Tracking Principles in Imaris

### Tracking algorithms

Imaris provides several tracking algorithms:

| Algorithm | Description | Best for |
|---|---|---|
| **Autoregressive Motion** | Predicts next position based on recent trajectory | Directed motion (migrating cells) |
| **Brownian Motion** | Assumes random diffusion | Freely diffusing objects (membrane proteins) |
| **Connected Components** | Links overlapping objects between frames | Slow-moving, dense objects |
| **Lineage** | Tracks with division events | Dividing cells |

### Key parameters

| Parameter | Description |
|---|---|
| **Max distance** | Maximum allowed displacement between frames |
| **Max gap size** | Maximum number of frames a track can skip |
| **Track duration filter** | Minimum number of time points for a valid track |

For PIEZO1-HaloTag puncta, the **Brownian Motion** model is appropriate given the diffusive behavior observed in Bertaccini et al. (2025), where mobile puncta showed anomalous sub-Brownian diffusion.

---

## 17. Spot Tracking

### Setting up spot tracking

1. Create Spots (Section 11) on a 4D dataset
2. In the Spots creation wizard, the tracking step appears after detection
3. Select the tracking algorithm (Brownian Motion for PIEZO1 puncta)
4. Set maximum displacement per frame: for PIEZO1 in ECs, the mobile diffusion coefficient is ~0.029 μm²/s, so at 10 fps the expected displacement is ~√(4 × 0.029 × 0.1) ≈ 0.11 μm per frame; set the max distance to 3–5× this value (~0.3–0.5 μm)
5. Set the gap size (1–2 frames)

### Track filtering

After tracking, filter tracks by:

- **Track Duration:** Keep only tracks lasting ≥ a minimum number of frames (e.g. 40 frames = 4 s at 10 fps)
- **Track Displacement Length:** Remove very short tracks that may be noise
- **Mean Speed:** Separate mobile and immobile populations

### Comparing with FLIKA tracking

For the TIRF data in Bertaccini et al. (2025), trajectory linking was performed using FLIKA (nearest-neighbour within 3 pixels). Imaris spot tracking is an alternative approach for 3D data where FLIKA (2D) is not directly applicable. The 3D tracking in Imaris is particularly useful for the volumetric AO-LLSM data of MNRs.

---

## 18. Surface Tracking

### Tracking surface objects

Surface objects (e.g. cells, organoid structures) can also be tracked over time:

1. Create Surfaces on a 4D dataset
2. Enable tracking in the wizard
3. Select a tracking algorithm and parameters

### Application

Surface tracking is useful for following the morphological evolution of MNR structures over time, such as lumen expansion or cell rearrangement.

---

## 19. Track Statistics: Speed, Displacement, and Diffusion

### Available track statistics

Imaris computes a comprehensive set of track statistics:

| Statistic | Description | Units |
|---|---|---|
| Track Duration | Length of track in time | s |
| Track Displacement Length | Straight-line distance from start to end | μm |
| Track Length | Total path length | μm |
| Track Mean Speed | Mean velocity | μm/s |
| Track Max Speed | Maximum velocity | μm/s |
| Track Straightness | Displacement / Path length (0–1) | — |
| Mean Square Displacement | MSD at each time lag | μm² |
| Diffusion Coefficient (estimated) | D from MSD fit | μm²/s |

### Exporting tracks for further analysis

Export track data for analysis in Python, MATLAB, or OriginPro:

```
Statistics tab > Export All Statistics to File
  → Format: CSV
  → Includes: Position (X, Y, Z, Time), all track statistics
```

The exported CSV can be directly loaded into:

- **DiPer Python** for directional persistence analysis (see DiPer Python Manual)
- **OriginPro** for MSD fitting and diffusion coefficient extraction (see OriginPro Manual)
- **Python** for custom analysis with NumPy/pandas

---

## 20. Track Visualisation and Editing

### Track display options

| Display mode | Description |
|---|---|
| **Dragon tail** | Shows the trailing trajectory behind each moving object |
| **Track line** | Full trajectory line for each track |
| **Colour by time** | Tracks change colour over time (rainbow) |
| **Colour by speed** | Fast objects are coloured differently from slow ones |
| **Colour by track ID** | Each track has a unique colour |

### Dragon tail length

Set the number of trailing frames to display:

```
Track Settings > Tail Length: 20 frames
```

### Manual track editing

Tracks can be manually corrected:

- **Connect:** Link two track fragments
- **Disconnect:** Break a track at a specific time point
- **Delete:** Remove spurious tracks
- **Re-assign:** Correct mis-linked objects

---

## 21. Object Statistics

### Accessing statistics

Select any object (Spots, Surfaces, Filaments) in the Surpass tree and click the **Statistics** tab. Statistics are organised by:

| Category | Examples |
|---|---|
| **Overall** | Total count, mean values across all objects |
| **Detailed** | Per-object values (one row per object) |
| **Selection** | Statistics for manually selected objects |

### Key statistics for PIEZO1 analysis

| Object type | Statistic | Use |
|---|---|---|
| Spots (PIEZO1) | Number of spots | Puncta density |
| Spots (PIEZO1) | Intensity Mean | Fluorescence level per punctum |
| Spots (PIEZO1) | Distance to Surface (Lumen) | PIEZO1-to-lumen distance |
| Surfaces (Cells) | Volume | Cell size |
| Surfaces (Lumen) | Area | Lumen cross-sectional area |

---

## 22. Distance Measurements

### Object-to-object distances

Imaris can calculate distances between different object types:

1. Detect PIEZO1 puncta as Spots
2. Create a Surface around the lumen
3. In the Spots statistics, Imaris automatically computes "Distance to Surface [Lumen]" for each spot

This approach was used conceptually in Bertaccini et al. (2025) to quantify the enrichment of PIEZO1 at the MNR lumen edge, although the actual distance calculations were performed in MATLAB using Euclidean distance transforms.

### Distance transform approach (Imaris XT)

For custom distance analysis using Imaris XT in MATLAB:

```matlab
% Get Imaris Spots object
spots = app.GetSurpassSelection();
positions = spots.GetPositionsXYZ();  % N x 3 array

% Get surface
surface = ... % surface object reference

% Calculate distances to surface for each spot
for i = 1:size(positions, 1)
    dist(i) = surface.GetDistanceToSurface(positions(i,:));
end
```

---

## 23. Co-localisation Analysis

### Co-localisation module

Imaris includes a co-localisation module for analysing the spatial overlap between two channels:

1. Select two channels (e.g. PIEZO1 and actin)
2. Set intensity thresholds for each channel
3. Imaris computes:
   - Pearson's coefficient
   - Manders' coefficients (M1, M2)
   - Co-localisation volume
   - Co-localised intensity

### Application to PIEZO1 research

Co-localisation analysis can assess whether PIEZO1 puncta preferentially localise to actin-rich regions (lumen, outer edge, stress fibres) versus actin-poor regions in MNRs.

---

## 24. Exporting Statistics

### Export formats

| Format | Use |
|---|---|
| **CSV** | Universal; load into Python, R, OriginPro, Excel |
| **Excel** | Direct Excel import |
| **Imaris Statistics File** | Imaris-specific; for reload |

### Batch export

To export statistics from multiple datasets:

1. Open each dataset
2. Click **Statistics > Export All Statistics to File**
3. Name files consistently: `sample_001_stats.csv`

Or use Imaris XT for automated batch export (Section 32).

### Export statistics to Python

```python
import pandas as pd

# Load exported Imaris statistics
stats = pd.read_csv("PIEZO1_spots_stats.csv")

# Filter and analyse
print(f"Total puncta: {len(stats)}")
print(f"Mean distance to lumen: {stats['Distance to Lumen'].mean():.2f} μm")
```

---

## 25. 4D Visualisation (3D + Time)

### Navigating 4D data

Use the time slider at the bottom of the viewport to scrub through time points. The 3D rendering updates in real time.

### Playback controls

| Control | Description |
|---|---|
| **Play** | Animate through time points |
| **Speed** | Adjust playback rate |
| **Loop** | Continuous looping |
| **Frame step** | Navigate one frame at a time |

### 4D rendering of MNR dynamics

For the AO-LLSM 4D data of MNRs (3 z-planes × 30 time points), visualise how PIEZO1 puncta appear and disappear over time. This is particularly relevant for JF646-BAPTA-labelled MNRs, where flickering PIEZO1 signals report channel activity.

---

## 26. Drift Correction

### Why drift correction?

Thermal drift or mechanical vibrations can shift the sample over time, leading to artefactual motion in tracks.

### Drift correction in Imaris

1. Detect reference objects (e.g. immobile bright features) as Spots
2. Track these reference spots
3. Use the reference tracks to calculate and correct drift:
   ```
   Image Processing > Drift Correction
   ```

### Alternative: Pre-processing drift correction

For TIRF data, ThunderSTORM includes a drift correction module (see ImageJ/FIJI Manual). For light-sheet data, drift correction can be applied during processing in MATLAB.

---

## 27. Object-Based Analysis Over Time

### Tracking statistics over time

For tracked objects, Imaris provides time-resolved statistics:

- Speed vs. time
- Intensity vs. time
- Position vs. time
- MSD vs. time lag

### Visualising changes

Use the **Vantage** module (if licensed) to create multi-dimensional plots of track statistics, such as:

- Scatter plot of Speed vs. Distance to Lumen
- Histogram of diffusion coefficients over time
- Distribution of track straightness across cell types

---

## 28. Creating Animations (Key Frame Animator)

### The Key Frame Animator

Imaris includes a powerful animation system for creating 3D fly-through movies:

1. **Animation > Animation** (or press **F7**)
2. Set the camera position and display for the first key frame
3. Click **Add Key Frame**
4. Move the camera/time to the next desired view
5. Click **Add Key Frame** again
6. Repeat for all desired views
7. Imaris interpolates smoothly between key frames

### Animation parameters

| Parameter | Description |
|---|---|
| **Duration** | Total movie length (s) |
| **Frame rate** | Output fps (24 or 30 for smooth video) |
| **Interpolation** | Linear or smooth (spline) camera motion |
| **Resolution** | Output image size (1920 × 1080 for HD) |

### Example animation for MNR presentation

1. Start with a top-down overview of the MNR
2. Rotate to show the side view, revealing the lumen structure
3. Zoom into the lumen region where PIEZO1 puncta are enriched
4. Advance through time to show PIEZO1 dynamics
5. Pull back to show the full organoid context

---

## 29. Snapshot and Movie Export

### Snapshots

Capture a high-resolution snapshot of the current 3D view:

```
Edit > Snapshot
  → Resolution: 4× or 8× (for publication quality)
  → Format: TIFF (lossless)
  → File: snapshot_MNR_topview.tif
```

### Movie export

Export the animation as a video:

```
Edit > Make Movie
  → Quality: High
  → Format: AVI (uncompressed) or MP4
  → Frame rate: 30 fps
  → Resolution: 1920 × 1080
```

### Tips for publication figures

- Use **white background** for journal figures (some journals require this)
- Set the **scale bar** in the viewport before capturing: **Edit > Show Scale Bar**
- Export at **300 dpi** minimum for print
- For composite figures, export individual channels as separate snapshots and combine in Adobe Illustrator

---

## 30. Publication-Quality Figure Preparation

### Figure preparation workflow

1. Set up the 3D rendering with appropriate colours, contrast, and camera angle
2. Add a scale bar (**Edit > Show Scale Bar**)
3. Capture a high-resolution snapshot (4–8× screen resolution)
4. Open the snapshot in Adobe Illustrator or Inkscape
5. Add labels, arrows, and panel letters
6. Combine with other panels (2D images, graphs)

### Matching the Bertaccini et al. (2025) figure style

Figure 5C of Bertaccini et al. (2025) shows a volumetric rendering of an MNR with:

- Actin in orange
- PIEZO1 detections in cyan
- Top-down and side views
- A 2 μm slab projection showing both channels
- Zoomed insets

To reproduce this style:

1. Set actin channel to orange, PIEZO1 to cyan
2. Capture top-down view (XY projection)
3. Rotate 90° and capture side view (XZ projection)
4. Use a 2 μm clipping slab for the detail view
5. Export each view as a separate snapshot

---

## 31. Imaris XT: Python and MATLAB Scripting

### Overview

Imaris XT enables programmatic control of Imaris through Python or MATLAB. This is essential for:

- Automating repetitive analysis tasks
- Custom measurements not available in the GUI
- Batch processing multiple datasets
- Integration with external analysis pipelines

### Python interface

```python
# Connect to running Imaris instance
import ImarisLib
lib = ImarisLib.ImarisLib()
app = lib.GetApplication(0)  # Connect to first running Imaris instance

# Get the current dataset
dataset = app.GetDataSet()
size_x = dataset.GetSizeX()
size_y = dataset.GetSizeY()
size_z = dataset.GetSizeZ()
size_t = dataset.GetSizeT()
size_c = dataset.GetSizeC()

print(f"Dataset: {size_x}x{size_y}x{size_z}, {size_t} time points, {size_c} channels")
```

### MATLAB interface

```matlab
% Connect to Imaris
javaaddpath(fullfile('C:', 'Program Files', 'Bitplane', 'Imaris x64 10.0.0', 'XT', 'matlab'));
app = ImarisLib.ImarisLib.GetApplication(0);

% Get spots
spots = app.GetFactory.ToSpots(app.GetSurpassSelection);
positions = spots.GetPositionsXYZ;

disp(['Number of puncta: ' num2str(size(positions, 1))]);
```

### Custom XTension example: PIEZO1 density per region

```python
# XTension: Calculate PIEZO1 density in lumen vs. outer edge regions
def PIEZO1_density_by_region(app):
    # Get spots and surface objects
    scene = app.GetSurpassScene()
    spots = None
    lumen_surface = None
    
    for i in range(scene.GetNumberOfChildren()):
        obj = scene.GetChild(i)
        if app.GetFactory().IsSpots(obj):
            spots = app.GetFactory().ToSpots(obj)
        elif app.GetFactory().IsSurfaces(obj):
            name = obj.GetName()
            if "Lumen" in name:
                lumen_surface = app.GetFactory().ToSurfaces(obj)
    
    # Get spot positions
    positions = spots.GetPositionsXYZ()
    
    # Calculate distances to lumen surface
    # ... custom distance calculation
    
    # Count spots within 5 μm of lumen
    near_lumen = sum(1 for d in distances if d < 5.0)
    total = len(distances)
    
    print(f"Puncta near lumen (<5 μm): {near_lumen}/{total} ({100*near_lumen/total:.1f}%)")
```

---

## 32. Batch Processing

### Imaris Batch module

If you have the Imaris Batch licence, you can process multiple datasets with the same analysis pipeline:

1. Set up the analysis on one representative dataset
2. Save the analysis as an Imaris Arena (batch pipeline)
3. Add all datasets to the batch queue
4. Run the batch; Imaris processes each dataset with the same parameters

### Scripted batch processing

Using Imaris XT, write a script that loops through files:

```python
import os
import ImarisLib

lib = ImarisLib.ImarisLib()
app = lib.GetApplication(0)

data_dir = "D:/Data/MNR_lightsheet/"
files = [f for f in os.listdir(data_dir) if f.endswith('.ims')]

for fname in files:
    filepath = os.path.join(data_dir, fname)
    app.FileOpen(filepath, "")
    
    # Run analysis
    # ... spots detection, statistics export, etc.
    
    # Export results
    # ... save statistics to CSV
    
    print(f"Processed: {fname}")
```

---

## 33. Working with Very Large Datasets

### The .ims format advantage

The native `.ims` format uses HDF5 with multi-resolution pyramids, allowing Imaris to display very large datasets (hundreds of GB to TB) by loading only the visible region at the required resolution.

### Performance tips

| Tip | Description |
|---|---|
| **Convert to .ims** | Always convert large datasets to `.ims` before analysis |
| **Use SSD** | Store datasets on NVMe SSD for fast access |
| **Increase GPU VRAM** | More VRAM = smoother 3D rendering of large volumes |
| **Reduce display quality** | Lower rendering quality for navigation; increase for snapshots |
| **Crop** | Use **Edit > Crop** to work on a subregion |
| **Resampling** | Downsample for overview; full resolution for quantitative analysis |

---

## 34. Imaris File Converter

### Standalone converter

The Imaris File Converter is a separate application for converting microscopy data to `.ims`:

1. Open Imaris File Converter
2. Add input files (TIFF, .nd2, .czi, .lif, etc.)
3. Set voxel sizes (from microscope metadata or manually)
4. Configure channels (colours, names)
5. Set output path
6. Convert

### Command-line conversion

For batch conversion:

```bash
ImarisFileConverter.exe -i "input_folder" -o "output.ims" -t tiff
```

### Converting AO-LLSM data

The processed AO-LLSM data from Bertaccini et al. (2025) was saved as TIFF stacks after deskewing and deconvolution in MATLAB, then converted to `.ims` for 3D rendering in Imaris:

```
Input: deskewed_deconvolved_actin_ch0.tif, nuclei_ch1.tif, piezo1_ch2.tif
Voxel: 0.108 × 0.108 × 0.215 μm
Output: MNR_sample01.ims
```

---

## 35. Workflow 1: 3D Rendering of Organoid Light-Sheet Data

This workflow produces volumetric renderings of MNRs similar to Figure 5C of Bertaccini et al. (2025).

### Step 1: Convert data to .ims

Use the Imaris File Converter to import the deskewed, deconvolved TIFF stacks from MATLAB processing:

- Channel 0: Actin (SPY555-actin)
- Channel 1: Nuclei (SPY505-DNA, denoised with CARE)
- Channel 2: PIEZO1 (JF635 HTL)
- Voxel size: 0.108 × 0.108 × 0.215 μm

### Step 2: Set display parameters

- Actin: orange, gamma 0.5, opacity 0.5
- Nuclei: cyan, gamma 1.0, opacity 0.3
- PIEZO1: green or cyan, gamma 1.0, opacity 1.0, high contrast

### Step 3: Navigate and compose views

1. Top-down view: shows the radial organisation of the MNR
2. Side view: reveals the lumen structure and PIEZO1 enrichment at the lumen edge
3. 2 μm slab: clipping plane to show a thin section with PIEZO1 detections overlaid on actin

### Step 4: Capture snapshots

Export each view at 4× resolution as TIFF for figure assembly.

---

## 36. Workflow 2: PIEZO1 Puncta Detection and Counting in 3D

### Step 1: Open the dataset

Load the `.ims` file containing the PIEZO1 channel.

### Step 2: Create Spots

1. Select the PIEZO1 channel
2. Estimated diameter: 0.4 μm
3. Enable PSF elongation along Z
4. Set quality threshold by comparing PIEZO1-HaloTag and KO control samples

### Step 3: Filter spots

Remove spots with low quality or unusual size. Compare the number of detected spots in PIEZO1-HaloTag vs. KO MNRs to estimate the false positive rate.

### Step 4: Quantify

- Total puncta count
- Puncta per unit volume
- Spatial distribution relative to lumen and outer edge

### Step 5: Export

Export spot coordinates and statistics as CSV for further analysis in MATLAB or Python.

---

## 37. Workflow 3: Tracking PIEZO1 Puncta in 4D Organoids

### Step 1: Detect spots across all time points

Create Spots on the 4D dataset, detecting PIEZO1 puncta in each time frame.

### Step 2: Track

Select Brownian Motion tracking with:

- Max displacement: 0.5 μm per frame (based on expected diffusion)
- Gap size: 1 frame
- Track duration filter: minimum 4 time points

### Step 3: Analyse tracks

- Calculate diffusion coefficients from MSD plots
- Compare mobile vs. immobile populations
- Assess whether mobility differs in lumen vs. outer edge regions

### Step 4: Export tracks

Export track coordinates for analysis in DiPer Python (3D autocorrelation) or OriginPro (MSD fitting).

---

## 38. Workflow 4: Multi-Channel Organoid Rendering for Figures

### Step 1: Prepare the composite rendering

Set up all channels with publication-appropriate colours and contrast.

### Step 2: Create a figure panel layout

1. Capture a full-volume top view
2. Capture a side view
3. Capture a clipped section view
4. Capture zoomed-in insets of regions with PIEZO1 enrichment
5. Export all as high-resolution TIFFs

### Step 3: Assemble in Adobe Illustrator

Combine the Imaris snapshots with other panels (TIRF images, graphs, schematics) in Illustrator.

---

## 39. Workflow 5: Distance Analysis (PIEZO1 to Lumen)

### Purpose

Quantify the spatial enrichment of PIEZO1 at the MNR lumen, as reported in Bertaccini et al. (2025).

### Step 1: Create a Surface for the lumen

1. Use the actin channel to segment the lumen ring
2. Create a Surface representing the lumen border

### Step 2: Detect PIEZO1 as Spots

Create Spots in the PIEZO1 channel.

### Step 3: Measure distances

Imaris automatically calculates "Shortest Distance to Surface [Lumen]" for each spot. Export this statistic.

### Step 4: Analyse distribution

```python
import pandas as pd
import matplotlib.pyplot as plt

# Load exported distances
data = pd.read_csv("piezo1_distance_to_lumen.csv")

# Histogram
plt.hist(data['Distance to Lumen'], bins=50, range=(0, 80))
plt.xlabel('Distance to Lumen Edge (μm)')
plt.ylabel('Count')
plt.title('PIEZO1 Puncta Distance from Lumen')
plt.show()

# Percentage within 5 μm
near_lumen = (data['Distance to Lumen'] < 5).mean() * 100
print(f"Puncta within 5 μm of lumen: {near_lumen:.1f}%")
# Bertaccini et al. reported 38 ± 1% within 5 μm
```

---

## 40. Performance Tips for Large 3D Data

### GPU performance

- Use a modern NVIDIA GPU with ≥8 GB VRAM
- Update NVIDIA drivers regularly
- Close other GPU-intensive applications while using Imaris

### Memory management

- For datasets >10 GB, ensure you have at least 64 GB RAM
- Convert to `.ims` format for efficient multi-resolution access
- Use **Edit > Preferences > Memory** to set the RAM allocation

### Rendering performance

- Reduce rendering quality (**View > Render Quality > Low**) for navigation
- Increase quality for final snapshots and movies
- Turn off channels you are not actively viewing

---

## 41. Common Problems and Solutions

### Data appears rotated or flipped

**Cause:** Incorrect voxel orientation during import.
**Fix:** Check the import settings in the File Converter. Verify that the XYZ axes match your microscope coordinate system.

### Spots detection finds too many / too few objects

**Cause:** Quality threshold is too low or too high.
**Fix:** Compare with KO control data to set appropriate thresholds. Use the preview to iteratively adjust.

### Rendering is slow

**Cause:** Dataset is too large, GPU VRAM insufficient, or rendering quality too high.
**Fix:** Convert to `.ims`, reduce rendering quality, crop dataset, or upgrade GPU.

### Imaris crashes on large datasets

**Cause:** Insufficient RAM or VRAM.
**Fix:** Increase system RAM. Convert to `.ims` for efficient memory-mapped access. Process subregions.

### Export is missing statistics

**Cause:** Required statistics not computed.
**Fix:** Enable the statistics of interest in the Statistics tab. Some statistics require MeasurementPro licence.

---

## 42. Imaris vs. Other 3D Viewers

| Feature | Imaris | Napari | FIJI 3D Viewer | Amira |
|---|---|---|---|---|
| **Cost** | $$$$ (commercial) | Free | Free | $$$$ (commercial) |
| **3D rendering** | Excellent (GPU) | Good (GPU) | Basic | Excellent (GPU) |
| **Built-in segmentation** | Yes (Spots, Surfaces) | Via plugins | Limited | Yes |
| **Tracking** | Built-in | Via plugins | Via plugins | Built-in |
| **Batch processing** | Yes (XT, Batch) | Yes (Python) | Yes (macros) | Yes |
| **Scripting** | Python, MATLAB | Python | Java, macros | Python, Tcl |
| **File handling** | Excellent (.ims) | Good (dask/zarr) | Moderate | Good |
| **Learning curve** | Moderate | Moderate | Low | Steep |
| **Best for** | Publication 3D figures, quantitative 3D analysis | Interactive exploration, Python integration | Quick viewing | Advanced 3D meshing |

For PIEZO1 organoid research, Imaris excels at publication-quality 3D rendering and integrated spot detection + distance analysis. For exploratory analysis and Python scripting, Napari is a strong open-source complement.

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using Imaris for 3D/4D visualisation and analysis of microscopy data. For questions or suggestions, contact george.dickinson@gmail.com.*

*When using Imaris in published research, include the version number in the Methods section: "3D visualization was performed using Imaris x64 10.0.0 (Bitplane/Oxford Instruments)."*
