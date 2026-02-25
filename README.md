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
4. **Advanced microscopy** --- TIRF (Total Internal Reflection Fluorescence) at 10--500 fps via Micro-Manager, confocal microscopy, and adaptive optics lattice light-sheet microscopy (AO-LLSM)
5. **Image restoration** --- content-aware denoising (CARE/CSBDeep) for light-sheet data
6. **Single-molecule localization** (ThunderSTORM), **trajectory linking** (FLIKA), and **particle tracking** (u-track)
7. **3D visualisation** --- Imaris and Amira for volumetric rendering, segmentation, and quantification
8. **Quantitative analysis** of channel localization, mobility (MSD, diffusion coefficients), directional persistence (DiPer), and channel activity (AutoDISC/pyDISC idealization of fluorescence flickering)
9. **Statistical analysis and publication-quality figure preparation** (OriginPro, R, Python)

The manuals in this collection cover every major software tool in this pipeline.

---

## The Manuals

### Imaging and Microscopy Software

| Manual | Description |
|---|---|
| **[Micro-Manager Manual](MicroManager_Manual.md)** | Open-source microscope control and image acquisition software. Covers hardware configuration, multi-dimensional acquisition (time-lapse, Z-stack, multi-channel, multi-position), high-speed acquisition at 200--500 fps, hardware triggering for single-molecule TIRF, the cellTIRF plugin, scripting (Beanshell), and Python integration via Pycro-Manager. Micro-Manager 2.0 with cellTIRF 1.4 was used for all TIRF acquisition in Bertaccini et al. (2025). |
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

### 3D Visualisation and Analysis

| Manual | Description |
|---|---|
| **[Imaris Manual](Imaris_Manual.md)** | Commercial 3D/4D microscopy visualisation and analysis software (Oxford Instruments). Covers volume rendering, Spots detection for PIEZO1 puncta in confocal z-stacks, Surface segmentation for cells, Filament tracing for neurons and vasculature, tracking, distance measurements, colocalization, AI segmentation (v10.1+), and batch Workflows (v11). Imaris x64 10.0.0 was used for 3D rendering in Bertaccini et al. (2025). |
| **[Amira Manual](Amira_Manual.md)** | Commercial 3D visualisation, segmentation, and analysis platform (Thermo Fisher Scientific). Covers volume rendering, the Segmentation+ workroom with AI-driven deep learning tools, classic segmentation editor, filament tracing, label analysis with 200+ measurements, automated recipe workflows, and Cellpose integration. Amira 3D 2021.1 was used alongside Imaris for volumetric analysis in Bertaccini et al. (2025). |

### Image Restoration

| Manual | Description |
|---|---|
| **[CARE/CSBDeep Manual](CARE_CSBDeep_Manual.md)** | Content-aware image restoration using deep learning. Covers training data acquisition (matched image pairs), patch generation, CARE model training and prediction via the CSBDeep Python package (Keras/TensorFlow), denoising, isotropic resolution recovery, the FIJI plugin, Noise2Void self-supervised denoising, and application to PIEZO1 light-sheet and TIRF data. CARE was used for denoising light-sheet microscopy data in Bertaccini et al. (2025). |

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

### Python Scientific Libraries

| Manual | Description |
|---|---|
| **[NumPy Manual](NumPy_Manual.md)** | Foundational array computing library for Python. Covers ndarray creation and manipulation, data types for microscopy (uint8/uint16), indexing, slicing, boolean masking, broadcasting, aggregation, linear algebra, Fourier transforms, file I/O, and practical recipes for microscopy image processing. |
| **[SciPy Manual](SciPy_Manual.md)** | Higher-level scientific computing built on NumPy. Covers signal processing (filtering calcium traces, peak detection), N-dimensional image filtering (scipy.ndimage), statistical tests for biology (t-tests, ANOVA, normality tests), curve fitting and optimisation (exponentials, Gaussians, dose-response), interpolation, and spatial analysis (nearest-neighbour distances, Voronoi tessellation). |
| **[Pandas Manual](Pandas_Manual.md)** | Data manipulation and analysis with tabular data. Covers Series and DataFrame structures, reading/writing CSV and Excel files, selecting and filtering data, handling missing data, merging and reshaping datasets, GroupBy split-apply-combine aggregation, and time series analysis --- essential for managing tracking results and experimental metadata. |
| **[matplotlib Manual](matplotlib_Manual.md)** | The standard Python plotting library. Covers the pyplot and object-oriented interfaces, line plots for fluorescence traces, image display, multi-panel figures, scatter plots, bar charts, box plots, histograms, heatmaps and kymographs, colour maps, annotations, scale bars, styling, saving publication-quality figures (PNG, PDF, SVG, EPS), animations, and 3D plots. |
| **[scikit-image Manual](scikit-image_Manual.md)** | Python library for image processing built on NumPy arrays. Covers filtering and denoising, thresholding (Otsu, adaptive), morphological operations, watershed segmentation, region property measurements, edge detection, feature detection (blob detection), image transforms, registration and alignment, and practical recipes for quantitative microscopy analysis. |

### Development Environments

| Manual | Description |
|---|---|
| **[IPython Manual](IPython_Manual.md)** | Enhanced interactive Python shell. Covers tab completion, introspection, input/output history, magic commands (%timeit, %run, %debug), shell integration, timing and profiling, auto-reloading modules, and interactive microscopy data exploration workflows. |
| **[Jupyter Notebook Manual](Jupyter_Notebook_Manual.md)** | Interactive notebook environment for combining code, documentation, and visualisation. Covers code and Markdown cells, inline plotting with matplotlib, interactive widgets, kernel management, exporting and sharing notebooks, JupyterLab, and best practices for reproducible research documentation. |
| **[Spyder Manual](Spyder_Manual.md)** | MATLAB-like Python IDE designed for scientific computing. Covers the Editor, IPython Console, Variable Explorer (inspect arrays and DataFrames), Plots pane, visual debugger with breakpoints, code cells, projects, and integration with Conda environments. |

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
3. **NumPy Manual**, **SciPy Manual**, **Pandas Manual**, **matplotlib Manual** --- companion guides to the Python Manual covering the core scientific libraries
4. **Jupyter Notebook Manual** or **Spyder Manual** --- choose a development environment
5. **ImageJ/FIJI Manual** --- the standard imaging tool you will use daily
6. **FLIKA Manual** --- our lab's primary image processing platform

Then proceed to the analysis-specific manuals relevant to your project.

### For PIEZO1-HaloTag single-particle tracking

Follow the analysis pipeline:
1. **Micro-Manager** (cellTIRF) --- acquire TIRF movies of PIEZO1-HaloTag-labelled cells
2. **ImageJ/FIJI** (ThunderSTORM) --- localize PIEZO1-HaloTag puncta in TIRF images
3. **FLIKA** --- link localizations into trajectories and extract intensity traces
4. **DiPer Python** --- analyse trajectory persistence, MSD, speed, diffusion
5. **AutoDISC/pyDISC** --- idealize fluorescence flickering traces for channel kinetics
6. **OriginPro** or **R** --- statistical comparisons and publication figures

### For cell migration analysis

1. **ImageJ/FIJI** (Manual Tracking or TrackMate) or **u-track** --- track migrating cells
2. **Cellpose** --- segment cell bodies for morphometric analysis
3. **DiPer Excel VBA** or **DiPer Python** --- analyse directional persistence
4. **OriginPro** or **R** --- statistics and figures

### For organoid imaging

1. **Micro-Manager** --- acquire confocal z-stacks or light-sheet volumes
2. **CARE/CSBDeep** --- denoise light-sheet data for improved SNR at depth
3. **ImageJ/FIJI** --- initial image inspection and ThunderSTORM localization
4. **Cellpose** + **StarDist** --- cell and nucleus segmentation in organoid sections
5. **ilastik** --- pixel classification for tissue boundary identification
6. **Imaris** --- 3D volume rendering, Spot detection, Surface segmentation, publication figures
7. **Amira** --- advanced segmentation workflows, AI-driven analysis, mesh generation
8. **Napari** --- 3D visualization of light-sheet data
9. **DiPer Python** (3D autocorrelation) --- analyse 3D puncta trajectories

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
- **Huygens/DeconvolutionLab Manual** --- deconvolution software for improving resolution in fluorescence microscopy images

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

### Software references

Please also cite the software tools you use. The following references are drawn from each manual.

#### Imaging and Microscopy Software

> Edelstein, A., Amodaj, N., Hoover, K., Vale, R. & Stuurman, N. (2010). Computer control of microscopes using µManager. *Current Protocols in Molecular Biology*, Chapter 14, Unit 14.20.

> Schindelin, J., Arganda-Carreras, I., Frise, E., *et al.* (2012). Fiji: an open-source platform for biological-image analysis. *Nature Methods*, 9(7), 676--682.

> Schneider, C.A., Rasband, W.S. & Eliceiri, K.W. (2012). NIH Image to ImageJ: 25 years of image analysis. *Nature Methods*, 9, 671--675.

> Ovesný, M., Křížek, P., Borkovec, J., Švindrych, Z. & Hagen, G.M. (2014). ThunderSTORM: a comprehensive ImageJ plug-in for PALM and STORM data analysis and super-resolution imaging. *Bioinformatics*, 30(16), 2389--2390. https://doi.org/10.1093/bioinformatics/btu202

> Ellefsen, K.L., Bhatt, D., Bhatt, D.K., Wang, Y., Bhatt, J.M., *et al.* (2014). Cell Calcium, 56, 147--156.

> napari contributors (2019). napari: a multi-dimensional image viewer for Python. https://doi.org/10.5281/zenodo.3555620

#### Segmentation and Detection

> Stringer, C., Wang, T., Michaelos, M. & Pachitariu, M. (2021). Cellpose: a generalist algorithm for cellular segmentation. *Nature Methods*, 18(1), 100--106.

> Schmidt, U., Weigert, M., Broaddus, C. & Myers, G. (2018). Cell detection with star-convex polygons. *MICCAI*, 265--273.

> Berg, S., Kutra, D., Kroeger, T., Straehle, C.N., Kausler, B.X., Haubold, C., Schiegg, M., Ales, J., Beier, T., Rudy, M., Eren, K., Cervantes, J.I., Xu, B., Beuttenmueller, F., Wolny, A., Zhang, C., Kreshuk, A. & Hamprecht, F.A. (2019). ilastik: interactive machine learning for (bio)image analysis. *Nature Methods*, 16, 1226--1232. https://doi.org/10.1038/s41592-019-0582-9

> Stirling, D.R., Swain-Bowden, M.J., Lucas, A.M., Carpenter, A.E., Cimini, B.A. & Goodman, A. (2021). CellProfiler 4: improvements in speed, utility and usability. *BMC Bioinformatics*, 22, 433.

#### 3D Visualisation and Analysis

> Imaris [version] (Bitplane/Oxford Instruments). https://imaris.oxinst.com

> Amira 3D [version] (Thermo Fisher Scientific). https://www.thermofisher.com/amira

#### Image Restoration

> Weigert, M., Schmidt, U., Boothe, T., Müller, A., Dibrov, A., Jain, A., Wilhelm, B., Schmidt, D., Broaddus, C., Culley, S., Rocha-Martins, M., Segovia-Miranda, F., Norden, C., Henriques, R., Zerial, M., Solimena, M., Rink, J., Tomancak, P., Royer, L., Jug, F. & Myers, E.W. (2018). Content-aware image restoration: pushing the limits of fluorescence microscopy. *Nature Methods*, 15(12), 1090--1097.

#### Particle Tracking and Trajectory Analysis

> Jaqaman, K., Loerke, D., Mettlen, M., *et al.* (2008). Robust single-particle tracking in live-cell time-lapse sequences. *Nature Methods*, 5, 695--702. https://doi.org/10.1038/nmeth.1237

> Gorelik, R. & Gautreau, A. (2014). Quantitative and unbiased analysis of directional persistence in cell migration. *Nature Protocols*, 9(8), 1931--1943. https://doi.org/10.1038/nprot.2014.131

#### Channel Activity Analysis

> White, D.S., Goldschen-Ohm, M.P., Goldsmith, R.H. & Chanda, B. (2020). Top-down machine learning approach for high-throughput single-molecule analysis. *eLife*, 9, e53357. https://doi.org/10.7554/eLife.53357

> Bandyopadhyay, A. & Goldschen-Ohm, M.P. (2021). Unsupervised selection of optimal single-molecule time series idealization criterion. *Biophysical Journal*, 120(20), 4472--4483. https://doi.org/10.1016/j.bpj.2021.08.045

#### Statistics and Visualisation

> OriginPro [version]. OriginLab Corporation, Northampton, MA. https://www.originlab.com

> R Core Team (2025). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria. https://www.R-project.org/

#### Python Scientific Libraries

> Harris, C.R., Millman, K.J., van der Walt, S.J., *et al.* (2020). Array programming with NumPy. *Nature*, 585, 357--362. https://doi.org/10.1038/s41586-020-2649-2

> Virtanen, P., Gommers, R., Oliphant, T.E., *et al.* (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. *Nature Methods*, 17, 261--272. https://doi.org/10.1038/s41592-019-0686-2

> McKinney, W. (2010). Data Structures for Statistical Computing in Python. *Proceedings of the 9th Python in Science Conference*, 56--61.

> Hunter, J.D. (2007). Matplotlib: A 2D Graphics Environment. *Computing in Science & Engineering*, 9(3), 90--95. https://doi.org/10.1109/MCSE.2007.55

> van der Walt, S., Schönberger, J.L., Nunez-Iglesias, J., Boulogne, F., Warner, J.D., Yager, N., Gouillart, E., Yu, T. & the scikit-image contributors (2014). scikit-image: image processing in Python. *PeerJ*, 2, e453. https://doi.org/10.7717/peerj.453

#### Development Environments

> Pérez, F. & Granger, B.E. (2007). IPython: A System for Interactive Scientific Computing. *Computing in Science & Engineering*, 9(3), 21--29. https://doi.org/10.1109/MCSE.2007.53

> Kluyver, T., Ragan-Kelley, B., Pérez, F., Granger, B., Bussonnier, M., Frederic, J., Kelley, K., Hamrick, J., Grout, J., Corlay, S., Ivanov, P., Avila, D., Abdalla, S. & Willing, C. (2016). Jupyter Notebooks --- a publishing format for reproducible computational workflows. *Positioning and Power in Academic Publishing: Players, Agents and Agendas* (ELPUB), 87--90.

> Spyder IDE. The Spyder Project Contributors. https://www.spyder-ide.org

#### Programming Languages

> MATLAB [version]. The MathWorks Inc., Natick, Massachusetts. https://www.mathworks.com

> Van Rossum, G. & Drake, F.L. (2009). *Python 3 Reference Manual*. CreateSpace, Scotts Valley, CA.

> Arnold, K., Gosling, J. & Holmes, D. (2005). *The Java Programming Language* (4th ed.). Addison-Wesley Professional.

---

## Contributing

These manuals are maintained by the PIEZO1 research group. To suggest corrections, additions, or new manual topics, please contact george.dickinson@gmail.com or open an issue in this repository.

---

## Licence

These manuals are provided for educational and research purposes. The software tools described are subject to their own respective licences.
