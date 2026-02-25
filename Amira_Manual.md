# Amira Manual for Biology Researchers

**A Comprehensive Guide to 3D Visualisation, Segmentation, and Analysis for Life Sciences**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is Amira?](#1-introduction-what-is-amira)
2. [System Requirements and Installation](#2-system-requirements-and-installation)
3. [The Amira Interface](#3-the-amira-interface)

**Part II: Visualisation**

4. [Opening and Importing Data](#4-opening-and-importing-data)
5. [2D Viewers: Orthogonal and Oblique Slices](#5-2d-viewers-orthogonal-and-oblique-slices)
6. [3D Volume Rendering](#6-3d-volume-rendering)
7. [Multi-Channel and Time Series Data](#7-multi-channel-and-time-series-data)

**Part III: Image Processing**

8. [Filtering and Noise Reduction](#8-filtering-and-noise-reduction)
9. [Background Correction and Intensity Normalisation](#9-background-correction-and-intensity-normalisation)
10. [Image Arithmetic and Registration](#10-image-arithmetic-and-registration)

**Part IV: Segmentation**

11. [Classic Segmentation Editor](#11-classic-segmentation-editor)
12. [Segmentation+ Workroom](#12-segmentation-workroom)
13. [AI-Assisted Segmentation](#13-ai-assisted-segmentation)
14. [Thresholding and Watershed](#14-thresholding-and-watershed)
15. [Cell Separation](#15-cell-separation)

**Part V: Quantitative Analysis**

16. [Label Analysis and Measurements](#16-label-analysis-and-measurements)
17. [Filament Tracing and Network Analysis](#17-filament-tracing-and-network-analysis)
18. [Automated Workflows and Recipes](#18-automated-workflows-and-recipes)
19. [Exporting Results](#19-exporting-results)

**Part VI: Application to PIEZO1 Research**

20. [Amira vs. Imaris: When to Use Which](#20-amira-vs-imaris-when-to-use-which)
21. [Visualising Organoid Sections](#21-visualising-organoid-sections)
22. [Segmenting Cells in 3D Tissue](#22-segmenting-cells-in-3d-tissue)
23. [Common Problems and Solutions](#23-common-problems-and-solutions)

---

## 1. Introduction: What is Amira?

### Overview

Thermo Scientific **Amira Software** is a commercial platform for 2D--5D visualisation, processing, segmentation, and quantitative analysis of life science imaging data. Originally developed at the Zuse Institute Berlin (ZIB) and now maintained by Thermo Fisher Scientific, Amira supports data from optical microscopy, electron microscopy, CT, MRI, and other modalities.

Amira's sister product **Avizo** serves materials science; both share the same software engine but are marketed for different disciplines.

### Why Amira for PIEZO1 research?

In Bertaccini et al. (2025), Amira 3D 2021.1 was used alongside Imaris for:
- **3D visualisation** of volumetric microscopy data from confocal and light-sheet imaging of PIEZO1-HaloTag-labelled organoids
- **Segmentation** of tissue structures in organoid sections
- **Complementary analysis** to Imaris, particularly for EM-correlated data and advanced image processing workflows

### Key capabilities

- Multi-planar visualisation of 2D--5D datasets with seamless 2D/3D transitions
- AI-driven segmentation (Segmentation+ workroom with deep learning models)
- Classic segmentation tools (brush, lasso, magic wand, watershed, morphological operators)
- Cellpose and Cellpose-SAM integration (Amira 3D Pro)
- Over 200 built-in measurements for quantification
- Automated recipe-based workflows for reproducibility
- Filament detection and network reconstruction
- Data-flow-oriented architecture for flexible pipeline construction
- BioFormats compatibility for virtually all microscopy file formats

### Editions

| Edition | Key features |
|---|---|
| **Amira 3D** | Core visualisation, classic segmentation, basic AI tools |
| **Amira 3D Pro** | All of 3D + advanced filters (XImagePAQ), texture classification, deep learning segmentation, Cellpose |

### Citation

Reference: "Volumetric visualisation and segmentation were performed using Amira 3D 2021.1 (Thermo Fisher Scientific, https://www.thermofisher.com/amira)."

---

## 2. System Requirements and Installation

### Hardware recommendations

| Component | Minimum | Recommended |
|---|---|---|
| **OS** | Windows 10 64-bit / Linux | Windows 11 64-bit |
| **RAM** | 16 GB | 64+ GB |
| **GPU** | OpenGL 3.3, 2 GB VRAM | NVIDIA 8+ GB VRAM |
| **Storage** | SSD | NVMe SSD |

### Licensing

Amira requires a commercial licence from Thermo Fisher Scientific. Academic licences are available. Trial versions can be requested from the Thermo Fisher website.

### AI / Deep Learning setup

For AI segmentation features (Segmentation+ workroom), install the Python Environment and Deep Learning packages at first use. This is a one-time setup guided by the software.

---

## 3. The Amira Interface

### Data-flow architecture

Amira uses a **visual programming / data-flow** paradigm:
- **Data objects** (images, labels, meshes) appear as green icons in the Project View
- **Modules** (processing steps, visualisation) appear as connected orange/yellow icons
- You connect modules to data objects to build analysis pipelines
- The pipeline is visible and editable as a network graph

### Main panels

- **Project View (Network Editor):** Shows the data-flow graph of all loaded data and attached processing/visualisation modules
- **3D Viewer:** Interactive 3D rendering viewport
- **2D Viewers:** Orthogonal slice views (XY, XZ, YZ) with segmentation overlay
- **Properties Panel:** Parameters and settings for the selected module
- **Console:** Log messages, scripting interface (Tcl)

---

## 4. Opening and Importing Data

### Supported formats

Amira supports virtually all microscopy formats via BioFormats:
- TIFF, multi-page TIFF, BigTIFF
- Leica .lif, Zeiss .czi/.lsm, Nikon .nd2, Olympus .oif/.oib
- OME-TIFF
- DICOM (CT/MRI)
- Amira native formats (.am, .hx)
- Raw binary data

### Opening files

**File → Open Data** → select your file. Amira auto-detects format and metadata (voxel size, channels, time points).

### Handling large data

Amira supports out-of-core processing for datasets exceeding RAM. The software loads data on demand using multi-resolution representations, similar to Imaris's .ims approach.

---

## 5. 2D Viewers: Orthogonal and Oblique Slices

### Ortho Slice module

Attach an **Ortho Slice** to your image data to view XY, XZ, or YZ cross-sections. Navigate through slices with the slider. Multiple Ortho Slices can be active simultaneously.

### Oblique Slice

The **Oblique Slice** module allows arbitrary-angle sectioning. Position and orient the slice plane interactively in the 3D viewer.

### Annotation on slices

Segmentation tools (brush, lasso, etc.) work directly on 2D slice views. Objects segmented in 2D slices are automatically assembled into 3D labels.

---

## 6. 3D Volume Rendering

### Volume Rendering module

Attach a **Volume Rendering** module to your data for GPU-accelerated 3D visualisation. Adjust transfer function (colour and opacity mapping) to highlight structures of interest.

### Isosurface

The **Isosurface** module generates triangulated surface meshes at a specified intensity threshold. Useful for creating solid 3D renderings of cell membranes, tissue boundaries, or organoid surfaces.

### Surface rendering

After segmentation (labelling), generate smooth surface meshes using the **Generate Surface** module. Amira produces high-quality meshes with smoothed interfaces suitable for publication figures and 3D printing.

---

## 7. Multi-Channel and Time Series Data

### Multi-channel display

- Assign colours to each channel via the Display Properties
- Adjust intensity ranges independently per channel
- Use channel arithmetic (add, subtract, ratio) for derived images

### Time series

- Use the time slider to navigate through time points
- The **XPlore5D** extension provides advanced multi-channel, time-series visualisation and processing for very large datasets without size or memory limitations

---

## 8. Filtering and Noise Reduction

### Available filters

Amira (especially Amira 3D Pro with XImagePAQ) provides:
- **Gaussian blur:** Smoothing for noise reduction
- **Median filter:** Edge-preserving noise reduction (good for salt-and-pepper noise)
- **Non-local means:** Advanced denoising preserving structural detail
- **Unsharp mask:** Contrast enhancement
- **AI-based denoising:** Deep learning noise reduction (Amira 3D Pro)

### Practical advice for PIEZO1 data

For confocal z-stacks of PIEZO1-HaloTag puncta:
- Apply median filter (3×3×1 kernel) to reduce shot noise while preserving puncta
- Avoid aggressive smoothing that could blur diffraction-limited puncta
- For light-sheet data, anisotropic diffusion filtering preserves edges while reducing noise in the depth direction

---

## 9. Background Correction and Intensity Normalisation

### Background subtraction

- **Arithmetic module:** Subtract a background image or constant value
- **Rolling ball:** Available through connected filter modules
- **FFT filtering:** Remove low-frequency background using Fourier-domain high-pass filters

### Intensity normalisation

For comparing fluorescence intensity across conditions, normalise using:
- Histogram equalisation
- Percentile-based normalisation
- Reference channel normalisation

---

## 10. Image Arithmetic and Registration

### Arithmetic

The **Arithmetic** module performs pixel-wise operations: addition, subtraction, multiplication, division, thresholding, logical operations.

### Registration

Amira provides inter-modal registration for aligning datasets from different imaging modalities or time points:
- **Rigid registration:** Translation + rotation (6 DOF)
- **Affine registration:** Translation + rotation + scaling + shearing (12 DOF)
- **Elastic registration:** Non-linear deformation field
- **Landmark-based registration:** Manual correspondence points

---

## 11. Classic Segmentation Editor

### Overview

The Classic Segmentation Editor provides a suite of manual and semi-automatic tools for labelling structures in 3D images:

### Tools

| Tool | Description |
|---|---|
| **Brush** | Paint labels on slices |
| **Lasso** | Freehand polygon selection |
| **Magic Wand** | Region growing from a seed point |
| **Threshold** | Global or local intensity thresholding |
| **Watershed** | Marker-controlled watershed segmentation |
| **Morphological operators** | Erode, dilate, open, close on labels |
| **Interpolation** | Interpolate labels between annotated slices |
| **Region growing** | 3D flood-fill from seed points |

### Materials

Labels are organised into "materials" --- named regions with assigned colours. You can have an unlimited number of materials, and materials can be grouped hierarchically.

---

## 12. Segmentation+ Workroom

### Overview (Amira 2021.2+)

The **Segmentation+ Workroom** is a purpose-built interface that combines interactive and AI-based segmentation tools:

- High-performance segmentation of large images (3--5× faster than classic editor on 16k×16k data)
- Seamless 2D/3D transition in the data viewer
- Unlimited material labels organised into groups
- **Lasso tool** with spline fitting and edge detection for precise boundary tracing
- **Superpixel tool** for grouping similar pixels to accelerate selection
- AI-Assisted Segmentation with deep learning models
- Extended undo/redo
- All classic tools (brush, magic wand, watershed, morphological operators) also available

### Workflow

1. Open your dataset
2. Switch to Segmentation+ workroom
3. Create material labels for each structure
4. Annotate a few slices using the Lasso, Brush, or AI tools
5. Review and refine in 3D
6. Export the labelled volume

---

## 13. AI-Assisted Segmentation

### Deep learning segmentation (Amira 3D Pro)

Amira offers AI-based segmentation powered by deep learning:

1. **Annotate** a few slices (typically 2--5) using manual tools
2. **Train** a model directly in Amira (2D or 3D training)
3. **Predict** --- the model segments the entire volume automatically
4. **Refine** --- correct errors manually and retrain for improved results

### Model types

- **Shallow models:** Fast processing for simpler segmentation tasks
- **Deep models:** Higher precision for complex images with low contrast or overlapping structures

### Pre-trained models

Amira includes pre-trained models for:
- Light microscopy (cells, nuclei)
- Electron microscopy (membranes, organelles)
- CT data

### Cellpose integration (Amira 3D Pro)

Cellpose and Cellpose-SAM (Segment Anything Model) are integrated for cell and nucleus segmentation across imaging modalities:
- Works in 2D and 3D
- No additional training required for common cell types
- Accessible through the Segmentation+ workroom

---

## 14. Thresholding and Watershed

### Automatic thresholding

Amira supports multiple automatic thresholding methods (Otsu, triangle, etc.) for binarising grayscale images.

### Interactive thresholding

Set upper and lower intensity bounds interactively. Preview the result on the current slice.

### Watershed segmentation

Marker-controlled watershed for separating touching objects:
1. Create seeds (markers) inside each object manually or from local maxima
2. Apply watershed with intensity gradient as the landscape
3. Objects are separated at saddle points in the gradient

---

## 15. Cell Separation

### XImagePAQ cell separation (Amira 3D Pro)

For dense cell cultures where cells touch:
1. Threshold to create a binary cell mask
2. Apply distance transform
3. Detect local maxima as cell seeds
4. Watershed on the distance transform to separate cells
5. Filter by size to remove fragments

### 3D cell separation

The same workflow operates in 3D for confocal z-stacks and light-sheet data, separating touching cells throughout the volume.

---

## 16. Label Analysis and Measurements

### Available measurements

After segmentation, the **Label Analysis** module computes over 200 measurements:

| Category | Examples |
|---|---|
| **Size** | Volume, surface area, equivalent diameter |
| **Shape** | Sphericity, elongation, flatness, aspect ratio |
| **Position** | Centroid XYZ, bounding box |
| **Intensity** | Mean, median, min, max, std within each label |
| **Orientation** | Principal axis angles, eigenvalues |
| **Neighbours** | Contact area, number of neighbours |
| **Custom** | User-defined measurements via recipes |

### Analysis to Spreadsheet

The **Analysis to Spreadsheet** feature converts all measurements into tabular format for export to CSV or Excel.

---

## 17. Filament Tracing and Network Analysis

### Automatic filament detection

Amira detects filamentous structures (cytoskeleton, neurons, vasculature):
1. Enhance linear structures with ridge detection or tubeness filters
2. Trace centrelines using the filament detection algorithm
3. Compute: length, diameter, orientation, branch points, connectivity

### Spatial Graph

Filament networks are represented as **Spatial Graphs** --- nodes (branch points, endpoints) connected by edges (segments). Measurements include graph topology, total network length, segment statistics, and connectivity.

---

## 18. Automated Workflows and Recipes

### Recipe system

Amira's recipe system allows you to:
1. Build a processing/analysis pipeline in the Project View
2. Save the pipeline as a "recipe"
3. Apply the recipe to new datasets with one click
4. Run recipes in batch mode for high-throughput analysis

### Workflow automation

No programming is required. The visual data-flow architecture means you build workflows by connecting modules, then save the entire network as a reusable recipe. Recipes can include AI-based processing steps.

---

## 19. Exporting Results

### Data export

- **Images:** TIFF, PNG, JPEG, Amira .am
- **Labels:** TIFF label images, Amira .am
- **Surfaces/meshes:** STL (3D printing), PLY, OBJ, VTK
- **Statistics:** CSV, Excel via Analysis to Spreadsheet
- **Snapshots:** High-resolution images of 3D renderings
- **Animations:** Image sequences, AVI

### Scripting

Amira supports Tcl scripting and Python (for AI modules) for custom automation beyond the recipe system.

---

## 20. Amira vs. Imaris: When to Use Which

| Feature | Amira | Imaris |
|---|---|---|
| **Strength** | Image processing pipelines, EM data, advanced segmentation | Interactive 3D rendering, object tracking, elegant GUI |
| **Segmentation** | Comprehensive tools + AI + Cellpose | Wizard-based + AI pixel classifier |
| **Tracking** | Basic | Advanced (Brownian, autoregressive, gap closing) |
| **Filaments** | Spatial graph analysis | ML-guided tree/network tracing (v10+) |
| **Large data** | Out-of-core, multi-resolution | .ims multi-resolution, Big Surface |
| **Workflow automation** | Recipe system (visual) | Workflows (v11), XTensions |
| **EM data** | Excellent | Limited |
| **Colocalization** | Basic | Comprehensive (Pearson, Mander, scatter) |
| **User interface** | Data-flow network (flexible but steeper learning curve) | Point-and-click wizards (easier for beginners) |

### For PIEZO1 research

- **Use Imaris** for: 3D rendering of confocal/light-sheet data, Spot detection and tracking of PIEZO1 puncta, distance measurements, colocalization, publication figures
- **Use Amira** for: Advanced image processing pipelines, EM-correlated data, AI segmentation of complex tissue, recipe-based batch analysis, mesh generation for 3D printing

---

## 21. Visualising Organoid Sections

### Workflow for confocal organoid z-stacks

1. Open z-stack in Amira
2. Attach Ortho Slice for 2D section views
3. Attach Volume Rendering for 3D overview
4. Use Oblique Slice to section through the organoid at natural tissue planes
5. Segment the organoid boundary using the Lasso tool in Segmentation+
6. Generate Surface from the segmentation for 3D rendering
7. Export high-resolution snapshot

---

## 22. Segmenting Cells in 3D Tissue

### Workflow for hiPSC-derived organoid sections

1. **Pre-process:** Apply median filter for noise reduction, background subtraction
2. **Nuclear segmentation:** Use AI segmentation or watershed on the nuclear channel (SPY505-DNA or Hoechst)
3. **Cell separation:** Apply distance-transform-based cell separation from the nuclear seeds
4. **Membrane segmentation:** Segment cell boundaries from membrane channel using Lasso with edge detection
5. **Measurements:** Run Label Analysis to extract per-cell volume, shape, and intensity statistics
6. **Export:** Save statistics to CSV for analysis in OriginPro or R

---

## 23. Common Problems and Solutions

### Amira does not recognise my file format

- Ensure BioFormats is up to date (check for Amira updates)
- Convert to TIFF or OME-TIFF using ImageJ/FIJI before importing
- Check that multi-file series are in the expected naming convention

### Voxel dimensions are incorrect

- Edit → Image Properties to set correct pixel size and Z spacing
- Incorrect Z spacing is the most common metadata error

### Segmentation is too slow on large datasets

- Use the Segmentation+ workroom (3--5× faster than classic editor)
- Downsample for initial segmentation, then refine at full resolution
- Use AI segmentation to minimise manual effort

### AI segmentation produces poor results

- Add more training annotations in regions where the model fails
- Ensure annotations cover all structure types and backgrounds
- Try 3D training instead of 2D for volumetric data with axial context

### Out of memory

- Use out-of-core data loading for large datasets
- Reduce the crop region to the area of interest
- Close unused modules and data objects in the Project View

---

*This manual was developed for the PIEZO1 research group to support 3D visualisation and segmentation of PIEZO1-HaloTag fluorescence in hiPSC-derived cells and organoids. Amira 3D 2021.1 was used in Bertaccini et al. (2025).*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*Amira is commercial software from Thermo Fisher Scientific: https://www.thermofisher.com/amira*
