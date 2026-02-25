# Bioimaging and Analysis Software Manuals

**A collection of manuals for the software tools used in mechanosensitive ion channel research, single-molecule imaging, and cell biology**

*Developed for the PIEZO1 Research Group --- Department of Physiology and Biophysics, University of California, Irvine*

George Dickinson | george.dickinson@gmail.com

---

## Overview

This repository contains detailed, researcher-oriented manuals for the software tools commonly used in our laboratory to study mechanosensitive ion channels --- particularly PIEZO1 --- in human induced pluripotent stem cell (hiPSC)-derived cell types and tissue organoids.

These manuals are designed for **graduate students and scientists** entering the field of single-molecule imaging, cell migration analysis, and mechanotransduction research. Each manual goes beyond generic software documentation to include practical examples, recommended parameters, and workflows drawn from our published research, including:

> Bertaccini, G.A., Casanellas, I., Evans, E.L., Nourse, J.L., Dickinson, G.D., *et al.* (2025). Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology. *Nature Communications*, 16, 5556. https://doi.org/10.1038/s41467-025-59150-1

---

## The Research

PIEZO1 is a mechanically activated ion channel critical to numerous physiological processes, including vascular development, blood pressure regulation, cell volume homeostasis, and wound healing. Understanding how PIEZO1 is organized and activated in living human cells requires a multi-modal imaging and analysis pipeline:

1. **CRISPR engineering** of hiPSCs to express PIEZO1-HaloTag fusion protein at endogenous levels
2. **Differentiation** into specialized cell types (endothelial cells, keratinocytes, neural stem cells) and tissue organoids (micropatterned neural rosettes)
3. **Fluorescence labelling** with Janelia Fluor HaloTag ligands (JF646, JF549, JF635, JF646-BAPTA)
4. **Advanced microscopy** --- TIRF (Total Internal Reflection Fluorescence) at 10--500 fps, confocal microscopy, and adaptive optics lattice light-sheet microscopy (AO-LLSM)
5. **Single-molecule localization** (ThunderSTORM), **trajectory linking** (FLIKA), and **particle tracking** (u-track)
6. **Quantitative analysis** of channel localization, mobility (MSD, diffusion coefficients), directional persistence (DiPer), and channel activity (AutoDISC/pyDISC idealization of fluorescence flickering)
7. **Statistical analysis and publication-quality figure preparation** (OriginPro, R, Python)

The manuals in this collection cover every major software tool in this pipeline.

---

## The Manuals

### Imaging and Microscopy Software

| Manual | Description |
|---|---|
| **[ImageJ/FIJI Manual](ImageJ_FIJI_Manual.md)** | The standard open-source platform for biological image analysis. Covers Bio-Formats, ROI management, measurements, stack operations, multi-channel imaging, and **ThunderSTORM** for single-molecule localization of PIEZO1-HaloTag puncta in TIRF images. |
| **[FLIKA Manual](FLIKA_Manual.md)** | Open-source Python-based image processing and analysis platform developed for calcium imaging and single-molecule studies. Used for linking ThunderSTORM localizations into trajectories, extracting fluorescence intensity traces from PIEZO1-HaloTag-BAPTA puncta, and batch processing TIRF movies. |
| **[Napari Manual](Napari_Manual.md)** | Modern Python-native multi-dimensional image viewer. Covers visualization of TIRF movies, overlay of tracked trajectories, multi-channel rendering, 3D volumetric data from light-sheet microscopy, and integration with segmentation tools. |

### Segmentation and Detection

| Manual | Description |
|---|---|
| **[Cellpose Manual](Cellpose_Manual.md)** | Deep learning-based cell segmentation. Covers whole-cell and nucleus segmentation of hiPSC-derived cells, creating cell masks for per-cell PIEZO1 puncta density analysis, custom model training, and Python/CLI batch processing. |
| **[StarDist Manual](StarDist_Manual.md)** | Star-convex polygon-based nucleus segmentation. Covers fluorescent nucleus detection (Hoechst, SPY505-DNA) in hiPSC-derived cells and organoid sections, 3D segmentation, and integration with downstream analysis tools. |
| **[ilastik Manual](ilastik_Manual.md)** | Interactive machine learning for image classification and segmentation. Covers pixel classification for membrane segmentation, object classification, density counting, semi-automatic tracking, and batch/headless processing for high-throughput TIRF analysis. |
| **[CellProfiler Manual](CellProfiler_Manual.md)** | Automated image analysis pipeline builder. Covers illumination correction, feature enhancement for PIEZO1 puncta, object identification and filtering, tracking, texture analysis, and complete measurement workflows. |

### Particle Tracking and Trajectory Analysis

| Manual | Description |
|---|---|
| **[u-track Manual](u-track_Manual.md)** | MATLAB-based single-particle tracking framework using LAP (Linear Assignment Problem) optimization. Covers point source detection, frame-to-frame linking with motion models, gap closing, merge/split detection, motion analysis, and extraction of diffusion coefficients from PIEZO1 puncta trajectories. |
| **[DiPer Excel VBA Manual](DiPer_Excel-VBA_Manual.md)** | Original Excel macro implementation of the DiPer directional persistence analysis suite. Covers trajectory plotting, speed, directionality ratio, MSD, and direction autocorrelation --- the unbiased persistence measure that is independent of cell speed. |
| **[DiPer Python Manual](DiPer_Python_Manual.md)** | Python implementation of DiPer with extended capabilities. Adds batch processing, 3D autocorrelation, stationary-period handling, velocity autocorrelation, and integration with the scientific Python ecosystem. Reproduces all original VBA analyses. |

### Channel Activity Analysis

| Manual | Description |
|---|---|
| **[AutoDISC MATLAB Manual](AutoDISC_Matlab_Manual.md)** | MATLAB implementation of the Divisive Segmentation and Clustering (DISC) algorithm with automated objective criterion selection. Used for idealizing PIEZO1-HaloTag-BAPTA fluorescence intensity traces to extract channel open/closed states, dwell times, and activity metrics. |
| **[pyDISC Manual](pyDISC_Manual.md)** | Python implementation of DISC/AutoDISC. Open-source alternative requiring no MATLAB licence. Includes GUI (DISCO), programmatic API, Zarr data format support, and HMM refinement via pomegranate. |

### Statistics and Visualization

| Manual | Description |
|---|---|
| **[OriginPro Manual](OriginPro_Manual.md)** | Comprehensive graphing and statistics software. Covers data import, graphing (scatter, bar, box, line, contour, heatmap), curve fitting (exponential dwell times, Gaussian distributions), statistical testing (t-test, Mann-Whitney, Kolmogorov-Smirnov, Cohen's d), and publication-quality figure preparation. OriginPro 2020 was used for all statistical analyses and graphs in Bertaccini et al. (2025). |
| **[R/RStudio Manual](R_RStudio_Manual.md)** | Statistical computing and visualization with R. Covers data manipulation (dplyr/tidyverse), visualization (ggplot2), statistical testing, and modelling --- applicable to analysing PIEZO1 puncta metrics, comparing conditions, and creating publication figures. |

### Programming Languages

| Manual | Description |
|---|---|
| **[Python Manual](Python_Manual.md)** | Python programming guide for scientific computing. Covers the scientific ecosystem (NumPy, SciPy, pandas, matplotlib), file I/O for microscopy data, image processing, and building custom analysis pipelines. Python 3.11.5 was used in the Bertaccini et al. (2025) analysis pipeline. |
| **[MATLAB Manual](MATLAB_Manual.md)** | MATLAB programming for image analysis and scientific computing. Covers arrays/matrices, image stack handling, Bio-Formats, statistics, curve fitting, signal processing, and the Image Processing Toolbox. MATLAB R2022b/R2023a were used in the study. |
| **[Java Manual](Java_Manual.md)** | Java programming fundamentals relevant to ImageJ/FIJI plugin development. Covers object-oriented programming, collections, exception handling, and the foundation for understanding and extending Java-based imaging tools. ImageJ 2.9.0 with Java 1.8.0_322 was used. |
| **[Command Line Manual](Command_Line_Manual.md)** | Terminal/shell fundamentals for researchers. Covers file navigation, organization, pattern matching, scripting, and automation of microscopy data processing workflows. Essential for batch processing large TIRF datasets. |

---

## How to Use These Manuals

### For new lab members

Start with these manuals in order:
1. **Command Line Manual** --- foundational terminal skills
2. **Python Manual** or **MATLAB Manual** --- depending on your programming background
3. **ImageJ/FIJI Manual** --- the standard imaging tool you will use daily
4. **FLIKA Manual** --- our lab's primary image processing platform

Then proceed to the analysis-specific manuals relevant to your project.

### For PIEZO1-HaloTag single-particle tracking

Follow the analysis pipeline:
1. **ImageJ/FIJI** (ThunderSTORM) --- localize PIEZO1-HaloTag puncta in TIRF images
2. **FLIKA** --- link localizations into trajectories and extract intensity traces
3. **DiPer Python** --- analyse trajectory persistence, MSD, speed, diffusion
4. **AutoDISC/pyDISC** --- idealize fluorescence flickering traces for channel kinetics
5. **OriginPro** or **R** --- statistical comparisons and publication figures

### For cell migration analysis

1. **ImageJ/FIJI** (Manual Tracking or TrackMate) or **u-track** --- track migrating cells
2. **Cellpose** --- segment cell bodies for morphometric analysis
3. **DiPer Excel VBA** or **DiPer Python** --- analyse directional persistence
4. **OriginPro** or **R** --- statistics and figures

### For organoid imaging

1. **ImageJ/FIJI** --- initial image inspection and ThunderSTORM localization
2. **Cellpose** + **StarDist** --- cell and nucleus segmentation in organoid sections
3. **ilastik** --- pixel classification for tissue boundary identification
4. **Napari** --- 3D visualization of light-sheet data
5. **DiPer Python** (3D autocorrelation) --- analyse 3D puncta trajectories

---

## Software Versions

The following software versions were used in Bertaccini et al. (2025) and are documented in these manuals:

| Software | Version |
|---|---|
| OriginPro | 2020 (64-bit) SRI 9.9.0.225 |
| FLIKA | 4.8.1 |
| ImageJ | 2.9.0/1.53t |
| Java | 1.8.0_322 |
| Micro-Manager | 2.0 |
| cellTIRF | 1.4 |
| Python | 3.11.5 |
| MATLAB | R2022b, R2023a |
| Imaris | x64: 10.0.0 |
| Amira | 3D 2021.1 |

---

## Future Updates

The following manuals and topics are planned for future inclusion:

### Planned manuals

- **TrackMate Manual** --- FIJI plugin for automated particle and cell tracking with multiple detection and linking algorithms; widely used alternative to u-track
- **TrackPy Manual** --- Python-based particle tracking library; integrates naturally with the scientific Python ecosystem and DiPer Python
- **GraphPad Prism Manual** --- statistical analysis and graphing software popular in biology; alternative to OriginPro for dose-response curves and survival analysis
- **Imaris Manual** --- 3D/4D visualization and analysis for light-sheet and confocal data; used for volumetric rendering of organoid images
- **Amira Manual** --- 3D visualization and analysis; used alongside Imaris for volumetric data
- **Huygens/DeconvolutionLab Manual** --- deconvolution software for improving resolution in fluorescence microscopy images
- **CARE/CSBDeep Manual** --- content-aware image restoration using deep learning; used for denoising light-sheet microscopy data in Bertaccini et al. (2025)
- **MicroManager Manual** --- open-source microscope control software used for TIRF and widefield acquisition

### Planned topic guides

- **TIRF Microscopy Setup and Optimization Guide** --- practical guide to setting up TIRF illumination, choosing laser power, selecting filters, and optimizing for single-molecule detection
- **HaloTag Labelling Protocol and Optimization Guide** --- selecting HaloTag ligands, optimizing labelling concentrations, wash protocols, and quality control
- **Single-Molecule Localization Microscopy (SMLM) Analysis Guide** --- comprehensive guide to ThunderSTORM parameters, localization precision, drift correction, and super-resolution reconstruction
- **Electrophysiology Data Analysis Guide** --- patch clamp data analysis, including comparison with optical (HaloTag-BAPTA) channel activity measurements
- **Statistical Methods for Single-Molecule Data** --- guide to appropriate statistical tests, effect sizes, bootstrap methods, and estimation statistics for single-particle tracking and channel activity data
- **Machine Learning for Ion Channel Analysis** --- applying ML/DL methods to classify channel states, detect events, and automate analysis pipelines

---

## Citation

If these manuals are useful in your research, please cite the primary research paper:

> Bertaccini, G.A., Casanellas, I., Evans, E.L., Nourse, J.L., Dickinson, G.D., *et al.* (2025). Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology. *Nature Communications*, 16, 5556. https://doi.org/10.1038/s41467-025-59150-1

For the DiPer analysis method:

> Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. *Nature Protocols*, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131

---

## Contributing

These manuals are maintained by the PIEZO1 research group. To suggest corrections, additions, or new manual topics, please contact george.dickinson@gmail.com or open an issue in this repository.

---

## Licence

These manuals are provided for educational and research purposes. The software tools described are subject to their own respective licences.
