# CellProfiler Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is CellProfiler?](#1-introduction-what-is-cellprofiler)
2. [Installation](#2-installation)
3. [The CellProfiler Interface](#3-the-cellprofiler-interface)
4. [Your First Pipeline: A Walkthrough](#4-your-first-pipeline-a-walkthrough)

**Part II: Setting Up Your Analysis**

5. [Projects and Files](#5-projects-and-files)
6. [The Images Module](#6-the-images-module)
7. [The Metadata Module](#7-the-metadata-module)
8. [The NamesAndTypes Module](#8-the-namesandtypes-module)
9. [The Groups Module](#9-the-groups-module)

**Part III: Image Processing**

10. [Illumination Correction](#10-illumination-correction)
11. [Enhancing Features](#11-enhancing-features)
12. [Image Maths and Transformations](#12-image-maths-and-transformations)
13. [Smoothing, Thresholding, and Morphology](#13-smoothing-thresholding-and-morphology)

**Part IV: Finding Objects**

14. [Identifying Primary Objects](#14-identifying-primary-objects)
15. [Identifying Secondary and Tertiary Objects](#15-identifying-secondary-and-tertiary-objects)
16. [Filtering and Editing Objects](#16-filtering-and-editing-objects)
17. [Tracking Objects Across Frames](#17-tracking-objects-across-frames)
18. [Relating Objects to Each Other](#18-relating-objects-to-each-other)

**Part V: Measuring**

19. [Measuring Object Intensity](#19-measuring-object-intensity)
20. [Measuring Size and Shape](#20-measuring-size-and-shape)
21. [Measuring Colocalization](#21-measuring-colocalization)
22. [Measuring Texture and Granularity](#22-measuring-texture-and-granularity)
23. [Image-Level Measurements](#23-image-level-measurements)
24. [Understanding Measurement Names](#24-understanding-measurement-names)

**Part VI: Output and Automation**

25. [Exporting Data to Spreadsheets](#25-exporting-data-to-spreadsheets)
26. [Saving Images](#26-saving-images)
27. [Test Mode: Developing Your Pipeline](#27-test-mode-developing-your-pipeline)
28. [Running Full Analyses](#28-running-full-analyses)
29. [Batch Processing and the Command Line](#29-batch-processing-and-the-command-line)

**Part VII: Practical Workflows**

30. [Workflow: Counting Cells and Measuring Expression](#30-workflow-counting-cells-and-measuring-expression)
31. [Workflow: PIEZO1 Puncta Analysis in TIRF Images](#31-workflow-piezo1-puncta-analysis-in-tirf-images)
32. [Workflow: Multi-Channel Colocalization](#32-workflow-multi-channel-colocalization)
33. [Workflow: Time-Lapse Calcium Imaging](#33-workflow-time-lapse-calcium-imaging)
34. [Workflow: Analysing CellProfiler Output with Python](#34-workflow-analysing-cellprofiler-output-with-python)

**Part VIII: Tips and Reference**

35. [Using AI to Build Pipelines](#35-using-ai-to-build-pipelines)
36. [Troubleshooting](#36-troubleshooting)
37. [Module Quick Reference](#37-module-quick-reference)

---

## 1. Introduction: What is CellProfiler?

CellProfiler is a free, open-source image analysis application developed by the Broad Institute of MIT and Harvard. It is designed for biologists who need to extract quantitative measurements from microscopy images --- without writing code.

You build an analysis **pipeline** by stringing together **modules**, each of which performs one step (load images, correct illumination, find cells, measure intensity, export data). CellProfiler then runs this pipeline on every image in your experiment, producing spreadsheets of measurements you can analyse in Excel, R, or Python.

### Why use CellProfiler?

- **No programming required.** The entire workflow is point-and-click.
- **Reproducible.** Pipelines are saved as files (`.cppipe`) that you can share with collaborators, include in publications, and re-run on new data.
- **High-throughput.** CellProfiler can process tens of thousands of images unattended. If you image many fields of view, many wells, or many conditions, CellProfiler scales.
- **Quantitative.** It extracts hundreds of measurements per object (intensity, size, shape, texture, spatial distribution, colocalization) with well-documented formulas.
- **Community.** Thousands of researchers use CellProfiler. There are published example pipelines, an active forum (forum.image.sc), and extensive documentation.

### How does it relate to our work?

In a PIEZO1 research lab, CellProfiler is useful for:

- **Counting cells** and measuring transfection efficiency (what fraction express PIEZO1-GFP?)
- **Quantifying fluorescence intensity** per cell (how much PIEZO1-GFP is expressed?)
- **Detecting and measuring puncta** in TIRF images (how many PIEZO1 clusters are at the membrane? How big are they?)
- **PIEZO1-HaloTag puncta analysis** using Janelia Fluor ligands (JF646, JF549, JF635) in hiPSC-derived cell types --- endothelial cells, keratinocytes, and neural stem cells (Bertaccini et al., 2025)
- **Colocalization analysis** (does PIEZO1-GFP colocalize with mCherry-tagged proteins?)
- **Tracking changes over time** in calcium imaging experiments
- **Batch processing** hundreds of images from multi-well plates or multi-condition experiments

### Companion tools

- **CellProfiler Analyst:** A separate application for machine learning classification of cells based on CellProfiler measurements.
- **Python:** CellProfiler output (CSV files) is easy to analyse with pandas. CellProfiler itself can be run from the command line for automation.

### When to cite CellProfiler

If you use CellProfiler in published research, cite:

> Stirling DR, Swain-Bowden MJ, Lucas AM, Carpenter AE, Cimini BA, Goodman A (2021). CellProfiler 4: improvements in speed, utility and usability. *BMC Bioinformatics* 22:433.

### Key reference: PIEZO1-HaloTag puncta analysis

For methods related to PIEZO1-HaloTag puncta detection in hiPSC-derived cells, see:

> Bertaccini et al. (2025). Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology. *Nature Communications*.

### Resources

| Resource | URL |
|---|---|
| Website | https://cellprofiler.org |
| Manual (v4.2.8) | https://cellprofiler-manual.s3.amazonaws.com/CellProfiler-4.2.8/index.html |
| Tutorials and examples | https://cellprofiler.org/examples |
| Forum (image.sc) | https://forum.image.sc/tag/cellprofiler |
| GitHub | https://github.com/CellProfiler/CellProfiler |
| CellProfiler Analyst | https://cellprofiler.org/cp-analyst |

---

## 2. Installation

### Download

Download CellProfiler from https://cellprofiler.org/releases. Choose the installer for your operating system (Windows, macOS, or Linux).

CellProfiler is a standalone application --- you do not need to install Python separately to use the GUI.

### Windows

1. Download the `.exe` installer
2. Run the installer and follow the prompts
3. Launch CellProfiler from the Start menu or desktop shortcut

### macOS

1. Download the `.dmg` file
2. Open the `.dmg` and drag CellProfiler to your Applications folder
3. On first launch, you may need to right-click and select **Open** (macOS security will block it otherwise)

### Linux

1. Download the `.tar.gz` archive or install via pip:
   ```bash
   pip install cellprofiler
   ```
2. Launch with `cellprofiler` from the terminal

### Installing for command-line / Python use

If you want to run CellProfiler from scripts or the command line (e.g. for batch processing on a cluster), install it into a conda environment:

```bash
conda create -n cellprofiler python=3.8
conda activate cellprofiler
pip install cellprofiler
```

Verify the installation:

```bash
cellprofiler --version
cellprofiler --help
```

### Java dependency

CellProfiler uses the Bio-Formats library (Java-based) to read microscopy file formats. Java is bundled with the desktop installers. If you install via pip, you may need to install Java separately and set the `JAVA_HOME` environment variable.

---

## 3. The CellProfiler Interface

When you launch CellProfiler, you see the main window with several distinct areas.

### Main layout

```
┌─────────────────────────────────────────────────────────┐
│  File   Edit   Test   Window                    [Help]  │
├──────────────────┬──────────────────────────────────────┤
│                  │                                      │
│  Pipeline Panel  │       Module Settings Panel          │
│                  │                                      │
│  ┌────────────┐  │  Settings for whichever module is    │
│  │ Images     │◄─│─ selected in the pipeline panel      │
│  │ Metadata   │  │  appear here.                        │
│  │ NamesTypes │  │                                      │
│  │ Groups     │  │  Each setting has a help icon (?)    │
│  ├────────────┤  │  you can click for documentation.    │
│  │ Module 1   │  │                                      │
│  │ Module 2   │  │                                      │
│  │ Module 3   │  │                                      │
│  │ ...        │  │                                      │
│  └────────────┘  │                                      │
│                  │                                      │
│  [+] [-] [▲][▼] │                                      │
│                  │                                      │
├──────────────────┴──────────────────────────────────────┤
│  File List / Image Set Display                          │
│  (Drag and drop images or folders here)                 │
├─────────────────────────────────────────────────────────┤
│  [Analyze Images]  [Start Test Mode]   Status bar       │
└─────────────────────────────────────────────────────────┘
```

### Pipeline panel (left)

This is where your analysis pipeline lives. The top four modules (**Images**, **Metadata**, **NamesAndTypes**, **Groups**) are always present --- they define which images to process and how to organise them. Below these, you add your own processing, identification, measurement, and export modules.

- **Add a module:** Click the **+** button or right-click in the pipeline panel
- **Remove a module:** Select it and click the **-** button
- **Reorder:** Drag and drop, or use the arrow buttons

### Module status icons

Each module shows a coloured icon:

| Icon | Meaning |
|---|---|
| Red circle | There is a configuration error --- the pipeline cannot run |
| Yellow warning | A setting may need attention, but the pipeline can still run |
| Green tick | The module is properly configured |

### Module settings panel (right)

When you click on a module in the pipeline panel, its settings appear here. Each setting has:

- A **label** describing what it controls
- A **value** (text field, dropdown, slider, or checkbox)
- A **?** button that opens the help text for that specific setting

### File list area (bottom)

This is where you add your images. You can:

- **Drag and drop** files or folders from your file manager
- Use **File > Import > File List** to load a text file of paths
- Right-click to remove files

### Key menu items

| Menu | Item | What it does |
|---|---|---|
| File | Open Project... | Open a saved project (`.cpproj`) |
| File | Save Project As... | Save your current work |
| File | Import > Pipeline from File | Load a `.cppipe` pipeline file |
| File | Export > Pipeline | Save just the pipeline (without image list) |
| File | Preferences | Set default folders, number of workers, etc. |
| Test | Start Test Mode | Enter test mode (process one image set at a time) |
| Test | Step | Run the next module in test mode |
| Test | Choose Image Set | Pick which image set to test on |

---

## 4. Your First Pipeline: A Walkthrough

Let us build a simple pipeline that counts cells and measures their PIEZO1-GFP fluorescence. This walkthrough uses a single TIFF image, but the same pipeline works on hundreds of images.

### Step 1: Add your images

1. Launch CellProfiler
2. Drag and drop your folder of TIFF images into the **File List** area at the bottom of the window
3. Click on **Images** in the pipeline panel --- you should see your files listed

### Step 2: Name your images

1. Click on **NamesAndTypes** in the pipeline panel
2. Set **Assign a name to** → "All images"
3. Set **Name to assign these images** → `GFP`
4. Set **Select the image type** → "Grayscale image"

If you have multi-channel data, choose "Images matching rules" instead (see Section 8).

### Step 3: Add modules

Click the **+** button below the pipeline panel and add these modules in order:

1. **IdentifyPrimaryObjects** --- to find cells
2. **MeasureObjectIntensity** --- to measure their fluorescence
3. **MeasureObjectSizeShape** --- to measure their size
4. **ExportToSpreadsheet** --- to save the results

### Step 4: Configure IdentifyPrimaryObjects

1. Click on **IdentifyPrimaryObjects** in the pipeline panel
2. Set **Select the input image** → `GFP`
3. Set **Name the primary objects** → `Cells`
4. Set **Typical diameter of objects** → `30` to `100` (in pixels --- adjust for your images)
5. Leave other settings at their defaults for now

### Step 5: Configure MeasureObjectIntensity

1. Click on **MeasureObjectIntensity**
2. **Select images to measure** → `GFP`
3. **Select objects to measure** → `Cells`

### Step 6: Configure MeasureObjectSizeShape

1. Click on **MeasureObjectSizeShape**
2. **Select objects to measure** → `Cells`

### Step 7: Configure ExportToSpreadsheet

1. Click on **ExportToSpreadsheet**
2. Leave defaults (exports all measurements as CSV files to the default output folder)

### Step 8: Test

1. Go to **Test > Start Test Mode**
2. Click **Test > Step** repeatedly to run each module one at a time
3. Examine the output windows --- do the identified objects look correct?
4. If objects are too big, too small, merged, or split, adjust the **Typical diameter** in IdentifyPrimaryObjects and re-test

### Step 9: Run

1. Go to **Test > Exit Test Mode**
2. Click **Analyze Images**
3. Wait for processing to complete
4. Open the CSV files in the output folder --- you will find measurements for every cell in every image

That is the core CellProfiler workflow: **load images → find objects → measure → export**.

---

## 5. Projects and Files

### What is a CellProfiler project?

A project combines three things:

1. **Image file list** --- the images you want to analyse
2. **Pipeline** --- the sequence of modules and their settings
3. **Metadata** --- any additional information about your images (conditions, wells, timepoints, etc.)

### File formats

| Format | Extension | Contains | When to use |
|---|---|---|---|
| Project | `.cpproj` | Pipeline + image list + metadata (HDF5 format) | Saving your complete work |
| Pipeline | `.cppipe` | Pipeline modules and settings only | Sharing pipelines, version control, batch processing |

### Saving your work

- CellProfiler auto-saves your project as you work
- Use **File > Save Project As** to save to a specific location
- Use **File > Export > Pipeline** to save just the pipeline (portable, shareable)

### Recommended folder structure

For a typical experiment, organise your files like this:

```
experiment_2025_01_15/
├── raw_images/
│   ├── condition_A/
│   │   ├── field_001_GFP.tif
│   │   ├── field_001_mCherry.tif
│   │   ├── field_002_GFP.tif
│   │   └── ...
│   └── condition_B/
│       ├── field_001_GFP.tif
│       └── ...
├── pipelines/
│   └── piezo1_analysis.cppipe
├── output/
│   ├── Cells.csv
│   ├── Image.csv
│   └── annotated_images/
└── notes.txt
```

### Supported image formats

CellProfiler uses the Bio-Formats library and supports most microscopy formats:

| Format | Extension | Notes |
|---|---|---|
| TIFF | `.tif`, `.tiff` | Recommended. Lossless, widely supported |
| PNG | `.png` | Lossless, good for single images |
| Nikon | `.nd2` | Native Nikon format, metadata preserved |
| MetaMorph | `.stk` | MetaMorph stacks |
| OME-TIFF | `.ome.tif` | Open standard with embedded metadata |
| Leica | `.lif` | Leica confocal |
| Zeiss | `.czi`, `.zvi` | Zeiss microscopes |
| JPEG | `.jpg` | **Not recommended** --- lossy compression |

**Tip:** Always use lossless formats (TIFF or PNG) for quantitative analysis. JPEG compression introduces artefacts that affect intensity measurements.

---

## 6. The Images Module

The **Images** module is the starting point of every pipeline. It specifies which files CellProfiler should analyse.

### Adding images

- **Drag and drop** a folder or individual files into the file list
- CellProfiler automatically lists all image files it finds (ignoring non-image files)

### Filtering

When a folder contains files you do not want to analyse (e.g. notes, processed images, thumbnails), use the filtering options:

1. Click on the **Images** module
2. Under **Filter images?**, select "Custom"
3. Build rules to include or exclude files based on filename, extension, or metadata

**Example:** To include only GFP TIFF files:
- Filter: "File" → "Does" → "Contain" → `GFP`

**Example:** To exclude thumbnail images:
- Filter: "File" → "Does Not" → "Contain" → `thumb`

### Tips

- You can add multiple folders --- CellProfiler will combine their contents
- Use **"Show files excluded by filters"** to verify your filtering is correct
- For very large experiments, use the **LoadData** module instead, which reads a CSV file listing all image paths

---

## 7. The Metadata Module

The **Metadata** module extracts experimental information from your filenames, folder names, or external files. This information is then available to the rest of the pipeline for organising, grouping, and labelling your data.

### Why metadata matters

Imagine you have images named like this:

```
PIEZO1_HEK_WT_field001_GFP.tif
PIEZO1_HEK_WT_field001_mCherry.tif
PIEZO1_HEK_R2456H_field001_GFP.tif
PIEZO1_HEK_R2456H_field001_mCherry.tif
```

The filenames contain useful information: the cell line (`HEK`), the PIEZO1 variant (`WT` or `R2456H`), the field of view (`field001`), and the channel (`GFP` or `mCherry`). The Metadata module can extract these automatically.

### Extracting metadata from filenames

1. Click on **Metadata** in the pipeline panel
2. Set **Extract metadata?** → "Yes"
3. Click **Add another extraction method**
4. Set **Metadata source** → "File name"
5. Set **Regular expression** to match your naming pattern

**Example regular expression** for the filenames above:

```
^PIEZO1_(?P<CellLine>[A-Za-z0-9]+)_(?P<Variant>[A-Za-z0-9]+)_(?P<Field>field[0-9]+)_(?P<Channel>.+)
```

This extracts four metadata fields:
- `CellLine` = `HEK`
- `Variant` = `WT` or `R2456H`
- `Field` = `field001`
- `Channel` = `GFP` or `mCherry`

### Extracting metadata from folder names

If your images are organised in folders by condition:

```
data/WT/field001_GFP.tif
data/R2456H/field001_GFP.tif
```

Set **Metadata source** → "Folder name" and use:

```
.*[\\/](?P<Variant>[^\\/]+)$
```

### Importing metadata from a CSV

You can also load metadata from an external spreadsheet:

1. Set **Metadata source** → "Import from file"
2. Point to a CSV file with columns like `FileName`, `Condition`, `Treatment`, `Concentration`, etc.
3. CellProfiler matches rows to images by filename

### Verifying extraction

After configuring, click the **Update** button at the bottom of the module. A table shows what metadata was extracted for each file. Check that the columns and values are correct.

### Common regular expression patterns

| Pattern | Matches | Example |
|---|---|---|
| `(?P<Name>.+)` | Anything (greedy) | Captures entire string |
| `(?P<Field>field[0-9]+)` | "field" followed by digits | `field001` |
| `(?P<Channel>GFP\|mCherry\|DAPI)` | One of the listed channels | `GFP` |
| `(?P<Well>[A-H][0-9]{2})` | A plate well (A01-H12) | `B07` |
| `(?P<Timepoint>T[0-9]+)` | A timepoint label | `T005` |

---

## 8. The NamesAndTypes Module

The **NamesAndTypes** module tells CellProfiler what each image represents. It assigns meaningful names (like `GFP` or `mCherry`) to your images and groups multi-channel images into **image sets** --- the collection of images that represent a single field of view.

### Single-channel experiments

If every image is the same type (e.g. all GFP):

1. Set **Assign a name to** → "All images"
2. Set **Name** → `GFP`
3. Set **Select the image type** → "Grayscale image"

### Multi-channel experiments

If you have multiple channels per field of view:

1. Set **Assign a name to** → "Images matching rules"
2. Click **Add another image** for each channel
3. For each channel, define a rule to match it:
   - **Rule:** "File" → "Does" → "Contain" → `GFP` → **Name:** `GFP`
   - **Rule:** "File" → "Does" → "Contain" → `mCherry` → **Name:** `mCherry`

Or, if you extracted channel metadata:
   - **Rule:** "Metadata" → "Does" → "Have Channel matching" → `GFP` → **Name:** `GFP`

### How image sets work

An **image set** is all the images for one field of view. For example:

| Image set | GFP image | mCherry image |
|---|---|---|
| 1 | `field001_GFP.tif` | `field001_mCherry.tif` |
| 2 | `field002_GFP.tif` | `field002_mCherry.tif` |
| 3 | `field003_GFP.tif` | `field003_mCherry.tif` |

CellProfiler matches images into sets using their metadata (Field, Well, etc.) or by ordering. Click **Update** to see the matched image sets and verify they are correct.

### Image types

| Type | When to use |
|---|---|
| Grayscale image | Single-channel fluorescence (GFP, mCherry, etc.) |
| Color image | RGB brightfield or composite images |
| Binary mask | Pre-made masks (white = foreground, black = background) |
| Illumination function | Output of CorrectIlluminationCalculate |
| Objects | Pre-segmented label images |

### Setting pixel size

If your images have calibrated pixel sizes (e.g. from microscope metadata), you can set them here so that CellProfiler reports measurements in physical units (microns) rather than pixels.

---

## 9. The Groups Module

The **Groups** module divides your image sets into separate groups that are processed independently. This is essential for time-lapse experiments and plate-based assays.

### When to use grouping

| Scenario | Group by | Why |
|---|---|---|
| Time-lapse movies | Movie / experiment ID | Prevents tracking from jumping between movies |
| Multi-well plates | Plate and Well | Calculates per-well illumination correction |
| Multiple conditions | Condition metadata | Processes each condition independently |
| Z-stacks for projection | Stack ID | MakeProjection works per group |

### Setting up groups

1. Click on **Groups** in the pipeline panel
2. Set **Do you want to group your images?** → "Yes"
3. Select the metadata field(s) to group by (e.g. `Field`, `Well`, `MovieID`)

### Example: grouping time-lapse data

If you have multiple calcium imaging recordings:

```
recording_001_T001.tif
recording_001_T002.tif
...
recording_001_T100.tif
recording_002_T001.tif
recording_002_T002.tif
...
```

1. Extract metadata: `(?P<Recording>recording_[0-9]+)_(?P<Timepoint>T[0-9]+)`
2. In Groups, group by `Recording`
3. Each recording is processed as an independent group
4. TrackObjects will track cells within each recording, not across recordings

### Important note

When grouping is enabled, only **one worker** processes each group (even if you have multiple workers configured). This means grouping can slow down processing for experiments with many small groups. Only use grouping when it is actually needed.

---

## 10. Illumination Correction

Uneven illumination is common in fluorescence microscopy: the centre of the field is often brighter than the edges. If not corrected, this causes systematic errors in intensity measurements. CellProfiler provides two modules that work together:

1. **CorrectIlluminationCalculate** --- calculates the illumination pattern
2. **CorrectIlluminationApply** --- applies the correction to your images

### When to use illumination correction

- You are making **intensity measurements** and need them to be accurate across the field of view
- You can see vignetting (dark edges) or bright spots in your images
- You are comparing intensities between images taken at different times or on different microscopes

### CorrectIlluminationCalculate

This module creates an **illumination function** --- an image representing the illumination pattern.

**Key settings:**

| Setting | Recommended value | Notes |
|---|---|---|
| Select the input image | Your fluorescence channel | e.g. `GFP` |
| Name the output image | `IllumGFP` | Name for the correction image |
| Select how the illumination function is calculated | **Regular** | For fluorescence; use "Background" for brightfield |
| Calculate function for each image individually, or across all images? | **All: First cycle** or **Each** | "All" is better if you have many images; "Each" for single images |
| Smoothing method | **Median Filter** | Best balance of speed and quality |
| Calculate smoothing filter size automatically? | **Yes** | Or set manually based on object size |

### CorrectIlluminationApply

This module applies the illumination function to correct your images.

**Key settings:**

| Setting | Recommended value | Notes |
|---|---|---|
| Select the input image | `GFP` | The image to correct |
| Name the output image | `CorrGFP` | Name for the corrected image |
| Select the illumination function | `IllumGFP` | From CorrectIlluminationCalculate |
| Select how the illumination function is applied | **Divide** | For fluorescence microscopy (multiplicative shading). Use "Subtract" for additive background. |

### Example: correcting TIRF illumination

TIRF microscopy often has an uneven illumination profile due to the evanescent field. A typical correction setup:

```
Pipeline:
  Images
  NamesAndTypes        → name images as "GFP"
  CorrectIlluminationCalculate
      Input: GFP
      Output: IllumGFP
      Method: Regular
      Smoothing: Median Filter
  CorrectIlluminationApply
      Input: GFP
      Illumination function: IllumGFP
      Output: CorrGFP
      Method: Divide
  IdentifyPrimaryObjects
      Input: CorrGFP     ← use the CORRECTED image
  ...
```

### Special considerations for PIEZO1-HaloTag TIRF imaging

When imaging PIEZO1-HaloTag puncta labelled with Janelia Fluor ligands (JF646, JF549, or JF635), the evanescent field non-uniformity is compounded by the inherent Gaussian profile of the TIRF excitation beam. Because PIEZO1-HaloTag puncta densities are quantified in absolute terms (e.g., 0.5 puncta/um^2 for PIEZO1-HaloTag vs. 0.004 puncta/um^2 for knockout controls; Bertaccini et al., 2025), even modest illumination gradients can bias density measurements by causing false negatives in dimmer peripheral regions. For PIEZO1-HaloTag TIRF data:

- **Calculate per-image**, not across all images, because the evanescent field angle and hence the illumination profile can shift between acquisitions.
- **Use "Divide" correction** (multiplicative model) rather than "Subtract", since the TIRF excitation gradient is multiplicative.
- Consider using **Splines** smoothing if the illumination pattern is not a simple radial gradient --- this is common when the TIRF angle is adjusted between fields of view or when imaging different cell types (endothelial cells vs. keratinocytes) that have different footprint sizes on the coverslip.
- After correction, verify that background intensity is uniform by measuring a line profile across the corrected image in Test mode. This is especially important before computing puncta densities.

### Tips

- Always use the **corrected** image for downstream identification and measurement
- For a quick check, view the illumination function in Test mode --- it should show the smooth illumination gradient, not individual cells
- If calculating across all images ("All: First cycle"), CellProfiler uses the first cycle to compute the function and applies it to all subsequent images
- Splines smoothing is the most flexible method for complex illumination patterns but is slower

---

## 11. Enhancing Features

The **EnhanceOrSuppressFeatures** module improves the visibility of specific structures before you try to identify them. This is especially useful for detecting small features like PIEZO1 puncta in TIRF images.

### Feature types

| Feature | What it enhances | When to use |
|---|---|---|
| **Speckles** | Small bright spots relative to their surroundings | PIEZO1-GFP puncta, vesicles, foci |
| **Neurites** | Long, thin structures | Membrane protrusions, filopodia |
| **Dark holes** | Dark spots within bright regions | Holes in membrane staining |
| **Circles** | Ring-shaped objects | Cell outlines, annular structures |
| **Texture** | Areas with high local intensity variation | Textured cytoplasm vs. smooth background |

### Enhancing PIEZO1 puncta (speckles)

For detecting PIEZO1-GFP clusters in TIRF images:

1. Add **EnhanceOrSuppressFeatures** to your pipeline (before IdentifyPrimaryObjects)
2. **Select the input image** → `CorrGFP` (the illumination-corrected image)
3. **Name the output image** → `EnhancedPuncta`
4. **Select the operation** → "Enhance"
5. **Feature type** → "Speckles"
6. **Feature size** → The approximate diameter of your puncta in pixels (e.g. `5` to `15`)
7. **Speed and accuracy** → "Slow" for small features (≤10 px), "Fast" for larger features

The enhanced image will have bright puncta on a dark, uniform background, making them much easier for IdentifyPrimaryObjects to detect.

### Enhancing PIEZO1-HaloTag puncta in hiPSC-derived cells

PIEZO1-HaloTag puncta labelled with Janelia Fluor ligands appear as diffraction-limited spots approximately 200--300 nm in diameter in TIRF images (Bertaccini et al., 2025). At typical TIRF magnifications (100x, ~65 nm/pixel), these correspond to roughly 3--5 pixels in diameter. Enhancement is critical because:

- **Signal-to-noise varies by cell type:** hiPSC-derived endothelial cells (ECs) have higher PIEZO1-HaloTag expression than neural stem cells (NSCs), requiring different feature size and threshold tuning per cell type.
- **Background subtraction context:** Bertaccini et al. used a 3x3 pixel ROI for local background subtraction around each punctum. In CellProfiler, the "Speckles" enhancement with a feature size of 5--7 pixels achieves a comparable effect by applying a white top-hat transform that removes local background on the same spatial scale.
- **Ligand choice affects SNR:** JF646 and JF549 have different brightness and photostability characteristics. JF646 (far-red) typically has lower autofluorescence background, which may allow a smaller feature size setting (closer to 3--5 pixels). JF549 is brighter but sits in a spectral region with more cellular autofluorescence, so a feature size of 5--7 pixels and additional smoothing may help.
- **Yoda1-treated cells:** After Yoda1 treatment, puncta density increases substantially (from approximately 0.07 to 0.22 puncta/um^2; Bertaccini et al., 2025). The enhancement step should be tuned on untreated images first, then verified on treated images, as the higher density may cause closely spaced puncta to be merged if the feature size is set too large.

**Recommended settings for PIEZO1-HaloTag puncta:**

| Parameter | Value | Rationale |
|---|---|---|
| Feature type | Speckles | Diffraction-limited puncta |
| Feature size | 5 (at ~65 nm/pixel) | Matches ~300 nm spots at 100x |
| Speed and accuracy | Slow | Necessary for features under 10 pixels |

### Enhancing neurite-like structures

For detecting filopodia or membrane protrusions:

1. **Feature type** → "Neurites"
2. **Enhancement method** → "Tubeness" (recommended)
3. **Smoothing scale** → Width of the structures in pixels
4. **Feature size** → Width of the structures

### Suppressing features

You can also **suppress** features to remove them. For example, to remove bright puncta from an image and keep only the diffuse membrane signal:

1. **Select the operation** → "Suppress"
2. **Feature type** → "Speckles"
3. **Feature size** → Size of the puncta to remove

---

## 12. Image Maths and Transformations

### ImageMath

The **ImageMath** module performs arithmetic operations on images. This is useful for background subtraction, creating ratio images, and combining channels.

**Operations available:**

| Operation | Formula | Use case |
|---|---|---|
| Add | A + B | Combining channels |
| Subtract | A - B | Background subtraction |
| Multiply | A × B | Masking (multiply by binary mask) |
| Divide | A / B | Ratio imaging |
| Average | (A + B) / 2 | Noise reduction by averaging |
| Invert | 1 - A | Inverting an image |
| Log transform | log₂(A + 1) | Compressing dynamic range |
| None (single image) | A × factor + offset | Scaling and offsetting |

**Example --- subtract a background image:**

```
Module: ImageMath
  Operation: Subtract
  First image: CorrGFP
  Second image: Background
  Name the output image: SubtractedGFP
  Multiply the first image by: 1.0
  Multiply the second image by: 1.0
```

### ColorToGray

The **ColorToGray** module converts colour or multi-channel images to individual grayscale channels.

**When to use it:**
- Your microscope saves multi-channel data as RGB colour images
- You need to extract individual channels from a composite image

**Settings:**
- **Conversion method:** "Split" separates channels; "Combine" merges them
- **Channel names:** Assign names to each extracted channel (e.g. `Red` → `mCherry`, `Green` → `GFP`)

### RescaleIntensity

The **RescaleIntensity** module normalises image intensities. Use it when:
- Your images have different bit depths (e.g. 12-bit saved as 16-bit)
- You need consistent intensity ranges for thresholding

**Common methods:**

| Method | What it does |
|---|---|
| Stretch each image to use the full intensity range | Maps min→0, max→1 per image |
| Choose specific values | Maps a custom input range to 0–1 (e.g. 0–4095 for 12-bit) |
| Divide each image by the same value | Divide by a constant |

**Caution:** Rescaling changes absolute intensity values. If you need to compare intensities between images, use the same rescaling parameters for all images, or measure intensities *before* rescaling.

### MakeProjection

The **MakeProjection** module combines multiple 2D images into a single 2D image. Use it for Z-stacks or time series.

**Projection types:**

| Type | Use case |
|---|---|
| **Average** | Reduce noise by averaging frames |
| **Maximum** | Maximum intensity projection (shows brightest signal at each pixel) |
| **Minimum** | Shows dimmest signal (useful for finding constant features) |
| **Sum** | Total signal |
| **Variance** | Highlights pixels that change over time |

**Important:** MakeProjection requires the **Groups** module to define which images belong to the same stack. The projection image is only available after all cycles in the group are complete, so it should typically be created in a separate pipeline from your analysis pipeline.

---

## 13. Smoothing, Thresholding, and Morphology

### Smooth

The **Smooth** module blurs images to reduce noise. Available methods:

| Method | Best for |
|---|---|
| Gaussian Filter | General-purpose smoothing. Set sigma (standard deviation of the Gaussian kernel). |
| Median Filter | Removing salt-and-pepper noise while preserving edges. |
| Mean Filter | Simple averaging. Fast but blurs edges. |
| Smooth Keeping Edges | Bilateral filter --- smooths flat areas while keeping sharp boundaries. |

**Tip:** A light Gaussian smooth (sigma = 1–2) before IdentifyPrimaryObjects can improve segmentation of noisy images without losing much spatial resolution.

### Threshold

The **Threshold** module converts a grayscale image into a binary (black and white) image. This is used to create masks or to visualise where objects are.

**Thresholding strategies:**

| Strategy | Description |
|---|---|
| **Global** | One threshold value for the entire image |
| **Adaptive** | Threshold varies across the image (handles uneven illumination) |

**Thresholding methods:**

| Method | When to use |
|---|---|
| **Minimum Cross-Entropy** | General-purpose. Works well for most fluorescence images. |
| **Otsu** | Two-class or three-class thresholding. Good when foreground and background are clearly separated. |
| **Robust Background** | Estimates background from the mode of the intensity histogram. Good when most of the image is background. |
| **Manual** | You set the threshold value. Use when automatic methods fail. |
| **Sauvola** | Adaptive, works on uneven illumination with varying local contrast. |

**Tip:** You rarely need to use the Threshold module directly. IdentifyPrimaryObjects has a built-in thresholding step. Use the Threshold module when you need a binary mask for other purposes (e.g. masking a region).

### Morph

The **Morph** module applies morphological operations to images. Common operations:

| Operation | Effect |
|---|---|
| Erode | Shrinks bright regions (removes small noise) |
| Dilate | Expands bright regions (fills small gaps) |
| Open | Erode then dilate (removes small bright spots) |
| Close | Dilate then erode (fills small holes) |
| Skeletonize | Thin objects to one-pixel-wide lines |
| Fill | Fill holes in binary objects |

These are advanced operations. You typically use them to clean up binary masks or prepare images for specialised analysis.

---

## 14. Identifying Primary Objects

**IdentifyPrimaryObjects** is the most important module in CellProfiler. It finds objects (cells, nuclei, puncta, etc.) in a grayscale image where the objects appear **bright** on a **dark** background.

### How it works

The module uses a three-step process:

1. **Threshold** the image to separate foreground from background
2. **Declump** overlapping objects by finding dividing lines between them
3. **Filter** to discard objects that are too small, too large, or on the image border

### Essential settings

| Setting | What it controls | Recommended starting values |
|---|---|---|
| **Select the input image** | Which image to segment | Your fluorescence channel (e.g. `CorrGFP`) |
| **Name the primary objects** | Name for the found objects | e.g. `Cells`, `Nuclei`, `Puncta` |
| **Typical diameter (min, max)** | Expected object size in pixels | **This is the most critical setting.** Measure a few objects in your images. |
| **Discard objects outside the diameter range** | Remove too-small or too-large objects | Yes (recommended) |
| **Discard objects touching the border** | Remove partial objects at edges | Yes (recommended for accurate measurements) |

### Setting the typical diameter

This is the most important parameter. To find it:

1. Open one of your images in FLIKA, ImageJ, or CellProfiler's Test mode
2. Measure the diameter of your smallest and largest objects of interest in pixels
3. Enter these as the minimum and maximum typical diameter

**Typical values for our work:**

| Object type | Typical diameter (pixels) | Notes |
|---|---|---|
| HEK293T nucleus | 30–60 | With 40x objective |
| HEK293T whole cell | 60–150 | With 40x objective |
| CHO cell | 50–120 | With 40x objective |
| PIEZO1-GFP puncta (TIRF) | 3–15 | Small, bright spots |
| PIEZO1-HaloTag puncta (TIRF, 100x) | 3–5 | Diffraction-limited, ~200--300 nm (Bertaccini et al., 2025) |
| hiPSC-derived endothelial cell (TIRF footprint) | 200–600 | Cell body in TIRF at 100x, ~65 nm/pixel |
| hiPSC-derived keratinocyte (TIRF footprint) | 150–500 | Typically smaller footprint than ECs |
| Neural stem cell (NSC) | 100–300 | Compact morphology |
| Calcium indicator-positive cell | 40–100 | Depends on magnification |

### Declumping methods

When cells are touching or overlapping, CellProfiler needs to separate them:

| Method | When to use |
|---|---|
| **Intensity** | Objects have a bright centre and dim edges (most fluorescence images) |
| **Shape** | Objects are roughly round and you want to separate them by shape |
| **None** | Objects do not touch (e.g. sparse puncta in TIRF) |

For most cell identification, **Intensity** declumping works well. For puncta that rarely overlap, **None** is faster and avoids over-splitting.

### Thresholding within IdentifyPrimaryObjects

The module has a built-in thresholding step with the same options as the Threshold module (Section 13). Key settings:

| Setting | Recommended starting value |
|---|---|
| **Threshold strategy** | Global |
| **Thresholding method** | Minimum Cross-Entropy |
| **Threshold smoothing scale** | 1.3488 (default) |
| **Threshold correction factor** | 1.0 (increase to be stricter, decrease to be more permissive) |
| **Lower/upper bounds** | 0.0 and 1.0 (default) |

### Tips for getting good segmentation

1. **Start simple.** Use defaults, test on one image, and adjust from there.
2. **Use Test mode.** Run IdentifyPrimaryObjects in Test mode and examine the output. The module shows the original image with object outlines overlaid.
3. **Adjust the diameter first.** If objects are being missed or split, the diameter range is usually the issue.
4. **Try different thresholding methods.** If Minimum Cross-Entropy does not work well, try Otsu or Robust Background.
5. **Use the correction factor.** If the threshold is too low (too much background included), increase the correction factor to 1.2 or 1.5. If too high (missing dim cells), decrease to 0.8.
6. **Pre-process.** If segmentation is difficult, add an EnhanceOrSuppressFeatures or Smooth module before IdentifyPrimaryObjects.

---

## 15. Identifying Secondary and Tertiary Objects

### IdentifySecondaryObjects

This module finds objects (e.g. whole cells) using previously identified primary objects (e.g. nuclei) as seeds. Each primary object produces exactly one secondary object that contains it.

**When to use it:**
- You have stained nuclei (DAPI or Hoechst) and want to find whole cell boundaries
- You have identified cell bodies and want to find membrane regions

**Key settings:**

| Setting | Description |
|---|---|
| **Select the input objects** | The primary objects (e.g. `Nuclei`) |
| **Name the secondary objects** | e.g. `Cells` |
| **Select the input image** | The image showing cell boundaries (e.g. a membrane or cytoplasm stain) |
| **Select the identification method** | See below |

**Identification methods:**

| Method | How it works | Best for |
|---|---|---|
| **Propagation** (default) | Expands from nuclei using both distance and image intensity | Most situations. The regularisation factor (default 0.05) balances distance vs. intensity. |
| **Distance - N** | Expands by N pixels from each primary object | When you have no cell boundary stain. Set the number of pixels to approximate cell radius. |
| **Watershed - Gradient** | Uses image gradient to find cell edges | Clear cell boundaries in the image |
| **Watershed - Image** | Uses image intensity directly | Bright cells on dark background |

**Example --- finding whole cells from nuclei:**

```
Module: IdentifyPrimaryObjects
  Input image: DAPI
  Objects: Nuclei
  Typical diameter: 30 to 60

Module: IdentifySecondaryObjects
  Input objects: Nuclei
  Output objects: Cells
  Input image: GFP            ← or a membrane/cytoplasm stain
  Method: Propagation
  Regularization factor: 0.05
```

### IdentifyTertiaryObjects

This module creates objects by subtracting one set of objects from another. The classic use case is defining the **cytoplasm** as the cell minus the nucleus.

**Settings:**

| Setting | Value |
|---|---|
| **Select the larger objects** | `Cells` (from IdentifySecondaryObjects) |
| **Select the smaller objects** | `Nuclei` (from IdentifyPrimaryObjects) |
| **Name the tertiary objects** | `Cytoplasm` |

The result is a ring-shaped region for each cell representing the cytoplasm.

---

## 16. Filtering and Editing Objects

### FilterObjects

After identifying objects, you often need to remove misidentified ones (debris, oversegmented fragments, artefacts). **FilterObjects** removes objects based on their measurements.

**How to use it:**

1. First, run a measurement module (e.g. MeasureObjectSizeShape) to measure the property you want to filter by
2. Add FilterObjects to the pipeline
3. Select the objects to filter and the measurement to filter by
4. Set minimum and/or maximum acceptable values

**Example --- remove small debris:**

```
Module: MeasureObjectSizeShape
  Objects: Puncta

Module: FilterObjects
  Select objects: Puncta
  Name output objects: FilteredPuncta
  Filtering mode: Measurements
  Method: Limits
  Measurement: AreaShape_Area
  Minimum: 10
  Maximum: 500
```

**Common filters for our work:**

| Filter by | Purpose | Typical range |
|---|---|---|
| `AreaShape_Area` | Remove debris (too small) and clumps (too large) | 50–5000 for cells; 5–200 for puncta |
| `AreaShape_FormFactor` | Remove elongated objects (not round cells) | 0.5–1.0 (1.0 = perfect circle) |
| `AreaShape_Solidity` | Remove irregular objects | 0.8–1.0 |
| `Intensity_MeanIntensity` | Remove dim objects (background) | Set a minimum |

### FilterObjects: border removal

You can also use FilterObjects to remove objects touching the image border:

1. **Filtering mode** → "Image or mask border"
2. This removes any object that touches the edge of the image

### EditObjectsManually

If automatic filtering is not sufficient, **EditObjectsManually** lets you interactively accept or reject objects. The pipeline pauses, displays the objects, and lets you click to remove unwanted ones. This is useful for small datasets or quality control, but does not scale to large experiments.

---

## 17. Tracking Objects Across Frames

The **TrackObjects** module follows objects (cells, puncta) across frames in a time-lapse series. It assigns a consistent identity to each object so you can measure how it changes over time.

### Prerequisites

- Images must be loaded as a time series (one frame per image set)
- The **Groups** module must be configured to group frames by movie/recording
- The **Metadata** module must extract frame/timepoint information
- Objects must be identified (e.g. by IdentifyPrimaryObjects) before tracking

### Tracking methods

| Method | Best for | Speed |
|---|---|---|
| **Overlap** | High frame rate, little movement between frames | Fast |
| **Distance** | Moderate movement, sparse objects | Fast |
| **LAP** (Linear Assignment Problem) | Complex scenarios: dense objects, temporary disappearances, splitting/merging | Slow |
| **Measurements** | When objects are better distinguished by a measurement (intensity, shape) than by position | Medium |

### Recommended setup for calcium imaging

For tracking cells in calcium imaging time-lapse recordings:

```
Module: TrackObjects
  Tracking method: LAP
  Select objects to track: Cells
  Maximum pixel distance: 50      ← adjust based on how much cells move

  LAP settings:
    Movement model: Random         ← cells are mostly stationary
    Search radius limit: 5, 50     ← min and max displacement
    Run second phase: Yes          ← close gaps from missed detections
    Maximum temporal gap: 3        ← allow up to 3 frames of missed detection
```

### Measurements produced by tracking

| Measurement | Description |
|---|---|
| `TrackObjects_Label` | Unique ID for each tracked object |
| `TrackObjects_Lifetime` | How many frames the object has been tracked |
| `TrackObjects_DistanceTraveled` | Distance moved from previous frame |
| `TrackObjects_Displacement` | Straight-line distance from starting position |
| `TrackObjects_IntegratedDistance` | Total path length over all frames |
| `TrackObjects_Linearity` | Displacement / IntegratedDistance (1.0 = straight line) |

### Tips

- **Test on a short sequence first** (10–20 frames) to verify tracking works
- **Adjust maximum pixel distance** based on how fast your objects move between frames
- If objects frequently disappear and reappear (e.g. blinking), enable the LAP second phase with gap closing
- Export tracked data and plot trajectories in Python (see Section 34)

---

## 18. Relating Objects to Each Other

The **RelateObjects** module establishes parent-child relationships between objects. For example, you can relate PIEZO1 puncta (children) to cells (parents) to count how many puncta each cell has.

### Setting up relationships

```
Module: RelateObjects
  Parent objects: Cells
  Child objects: Puncta
  Calculate child-parent distances: Both
  Calculate per-parent means: Yes
```

### What it produces

**Parent measurements:**
- `Children_Puncta_Count` --- number of puncta in each cell
- `Mean_Puncta_Intensity_MeanIntensity_GFP` --- mean puncta intensity per cell (if you measured puncta intensity upstream)

**Child measurements:**
- `Parent_Cells` --- which cell each punctum belongs to
- `Distance_Minimum_Cells` --- distance from punctum to nearest cell edge
- `Distance_Centroid_Cells` --- distance from punctum to cell centre

### When to use it

- **Counting puncta per cell:** Relate puncta (children) to cells (parents) → get `Children_Puncta_Count`
- **Measuring nuclear vs. cytoplasmic signal:** Relate nuclei to cells
- **Associating spots with compartments:** Relate any small objects to larger containing objects

---

## 19. Measuring Object Intensity

The **MeasureObjectIntensity** module measures the fluorescence intensity of each identified object.

### Settings

- **Select images to measure:** Choose one or more channels (e.g. `GFP`, `mCherry`)
- **Select objects to measure:** Choose one or more object sets (e.g. `Cells`, `Puncta`)

### Measurements produced

For each object-image combination, 21 measurements are made:

| Measurement | Description |
|---|---|
| `IntegratedIntensity` | Sum of all pixel intensities in the object (total fluorescence) |
| `MeanIntensity` | Average pixel intensity |
| `StdIntensity` | Standard deviation of pixel intensities |
| `MaxIntensity` | Brightest pixel |
| `MinIntensity` | Dimmest pixel |
| `MedianIntensity` | Median pixel intensity |
| `MADIntensity` | Median absolute deviation (robust measure of spread) |
| `LowerQuartileIntensity` | 25th percentile |
| `UpperQuartileIntensity` | 75th percentile |
| `IntegratedIntensityEdge` | Sum of intensities at the object edge |
| `MeanIntensityEdge` | Mean intensity at the object edge |
| `StdIntensityEdge` | Std dev of edge intensities |
| `MaxIntensityEdge` | Max edge intensity |
| `MinIntensityEdge` | Min edge intensity |
| `MassDisplacement` | Distance between intensity centre of mass and geometric centre |
| `Location_CenterMassIntensity_X` | X coordinate of intensity centre of mass |
| `Location_CenterMassIntensity_Y` | Y coordinate of intensity centre of mass |

### Which measurements to use

| Goal | Measurement |
|---|---|
| Total amount of PIEZO1-GFP per cell | `IntegratedIntensity` |
| Expression level (normalised by cell size) | `MeanIntensity` |
| Whether a cell is "positive" for expression | `MeanIntensity` above a threshold |
| How uniform the signal is within a cell | `StdIntensity` or `MADIntensity` |
| Membrane vs. interior staining | Compare `MeanIntensityEdge` to `MeanIntensity` |
| Where the protein is concentrated | `MassDisplacement` (0 = centred, high = off-centre) |

### Tips

- CellProfiler rescales 16-bit images to the range 0–1 by default. Report intensities as "arbitrary units" in publications.
- **MADIntensity** is robust to outliers (e.g. one very bright pixel).
- You can measure the same objects in multiple channels to compare GFP vs. mCherry intensity.

---

## 20. Measuring Size and Shape

The **MeasureObjectSizeShape** module measures the geometry of each identified object.

### Settings

- **Select objects to measure:** Choose one or more object sets
- **Calculate Zernike features?** → Yes (adds 30 shape descriptors, useful for machine learning)
- **Calculate advanced features?** → No (unless you need moment-based features)

### Key measurements

| Measurement | Description | Useful for |
|---|---|---|
| `Area` | Number of pixels in the object | Cell size, punctum size |
| `Perimeter` | Length of the object boundary (pixels) | Cell shape complexity |
| `FormFactor` | 4π × Area / Perimeter² (1.0 = perfect circle) | How round is the cell? |
| `Eccentricity` | How elongated (0 = circle, 1 = line) | Cell morphology |
| `Compactness` | Perimeter² / (4π × Area) | Inverse of FormFactor |
| `Solidity` | Area / ConvexArea (1.0 = no indentations) | How irregular is the shape? |
| `MajorAxisLength` | Length of the longest axis | Object size |
| `MinorAxisLength` | Length of the shortest axis | Object width |
| `EquivalentDiameter` | Diameter of a circle with the same area | Standardised size |
| `Orientation` | Angle of the major axis (degrees) | Alignment |
| `MaxFeretDiameter` | Maximum distance between any two boundary points | True maximum size |
| `MinFeretDiameter` | Minimum width across the object | True minimum width |
| `BoundingBoxArea` | Area of the bounding rectangle | Quick size estimate |
| `Extent` | Area / BoundingBoxArea | How much of the bounding box is filled |

### Zernike features

The 30 Zernike shape features (ZernikeN_M) describe the shape of each object using Zernike polynomial decomposition. They are useful for machine learning classifiers but are not easily interpretable individually.

### Tips

- Measurements are only reliable for objects fully inside the image --- discard border objects
- `FormFactor` = 1.0 for a perfect circle; healthy, well-spread cells are typically 0.5–0.8
- Use `EquivalentDiameter` to convert pixel areas to physical sizes if you know the pixel size

---

## 21. Measuring Colocalization

The **MeasureColocalization** module quantifies how much two fluorescent signals overlap. This is essential for multi-channel experiments with PIEZO1.

### Settings

- **Select images to measure:** Choose two or more channels (e.g. `GFP` and `mCherry`)
- **Select where to measure:** "Across entire image", "Within objects", or "Both"
- **Select objects to measure:** If measuring within objects, choose which (e.g. `Cells`)
- **Threshold as percentage of maximum:** Default 15% (pixels below this are excluded)

### Measurements produced

| Measurement | Description | Range |
|---|---|---|
| **Correlation** (Pearson's r) | Linear correlation between two channels | -1 to +1. Positive = same direction, 0 = no correlation |
| **Slope** | Slope of the best-fit line (Ch1 vs Ch2) | If slope > 1, Ch2 is brighter than Ch1 |
| **Overlap coefficient** | Like Pearson's but without mean subtraction | 0 to 1 |
| **Manders M1** | Fraction of Ch1 that overlaps with Ch2 | 0 to 1. "What fraction of GFP signal is in mCherry-positive areas?" |
| **Manders M2** | Fraction of Ch2 that overlaps with Ch1 | 0 to 1. The reverse question. |
| **Manders (Costes)** | Manders with automatic threshold | More objective than manual threshold |
| **RWC** (Rank Weighted Colocalization) | Weighted by rank order of intensities | 0 to 1. Robust to intensity differences |

### Which measurement to use

| Question | Measurement |
|---|---|
| "Do PIEZO1-GFP and mCherry-marker have the same spatial pattern?" | Pearson's Correlation |
| "What fraction of PIEZO1-GFP signal is in mCherry-positive regions?" | Manders M1 |
| "What fraction of mCherry signal is in PIEZO1-GFP-positive regions?" | Manders M2 |
| "Is the colocalization statistically significant?" | Costes' automated threshold + Manders |

### Tips

- **Always** measure colocalization within identified objects (e.g. within cells), not across the whole image. Background pixels add noise to the correlation.
- The **threshold** setting (default 15%) excludes dim pixels. Adjust if your signal is very bright (increase) or very dim (decrease).
- For publication, report both Pearson's correlation and Manders coefficients.
- Costes' method provides an objective threshold --- use "Faster" for 16-bit images.

---

## 22. Measuring Texture and Granularity

### MeasureTexture

The **MeasureTexture** module quantifies the texture (roughness, smoothness, regularity) of objects using **Haralick texture features** derived from grey-level co-occurrence matrices (GLCM).

**Settings:**
- **Select images to measure:** Your fluorescence channel(s)
- **Select objects to measure:** Your identified objects
- **Texture scale:** The pixel distance at which to measure co-occurrence (default 3). Try multiple scales.

**Key texture features (13 per scale):**

| Feature | What it describes |
|---|---|
| AngularSecondMoment | Uniformity (high = uniform intensity) |
| Contrast | Local intensity variation (high = lots of variation) |
| Correlation | Linear dependency of grey levels on neighbouring pixels |
| Entropy | Randomness of intensity (high = heterogeneous texture) |
| Variance | Spread of the co-occurrence matrix |
| DifferenceEntropy | Randomness of intensity differences |
| InverseDifferenceMoment | Homogeneity (high = uniform regions) |
| InfoMeas1, InfoMeas2 | Information-theoretic measures of texture |
| SumAverage | Average of co-occurrence sum |
| SumEntropy | Entropy of co-occurrence sum |
| SumVariance | Variance of co-occurrence sum |
| DifferenceVariance | Variance of co-occurrence difference |

**When to use it:**
- Distinguishing different cell morphologies (smooth vs. granular cytoplasm)
- Classifying cells by internal structure
- As features for machine learning classifiers

### MeasureGranularity

The **MeasureGranularity** module measures the size distribution of textural features in an image. It reports a **granularity spectrum** --- a series of values (GS1, GS2, ..., GSN) representing what fraction of signal comes from features of increasing size.

**Settings:**
- **Subsampling factor:** 0.25 (default). Speeds processing and enables detection of larger structures.
- **Radius of structuring element:** ~10. Should match the size of features of interest after subsampling.
- **Range of granular spectrum:** 16 (default). Number of size scales to measure.

**When to use it:**
- Characterising the size distribution of fluorescent puncta or granules
- Distinguishing cells with many small vesicles from cells with fewer large ones

---

## 23. Image-Level Measurements

### MeasureImageIntensity

Measures intensity statistics for the **entire image** (not per object):

- Total intensity, mean, median, standard deviation
- Min, max, quartiles, percentiles
- Useful for quality control (is the image too bright? too dim? saturated?)

### MeasureImageQuality

Assesses image quality metrics:

| Metric | What it measures |
|---|---|
| FocusScore | Sharpness / focus quality |
| LocalFocusScore | Focus quality across image regions |
| PowerLogLogSlope | Frequency domain focus metric (more negative = more blurred) |
| PercentMaximal | Fraction of saturated pixels |
| PercentMinimal | Fraction of zero-intensity pixels |

**When to use it:**
- Quality control: automatically flag out-of-focus or saturated images
- Filtering: use with FilterObjects (on images) to exclude bad images from analysis

### MeasureImageAreaOccupied

Measures how much of the image is covered by objects or foreground:

- Total area occupied
- Total perimeter
- Useful for confluence measurements (what percentage of the field is covered by cells?)

---

## 24. Understanding Measurement Names

CellProfiler uses a structured naming convention for all measurements:

```
Object_Category_Feature_Parameters
```

### Components

| Component | Examples | Description |
|---|---|---|
| **Object** | `Cells`, `Nuclei`, `Puncta`, `Image` | What was measured |
| **Category** | `Intensity`, `AreaShape`, `Texture`, `Neighbors` | Type of measurement |
| **Feature** | `MeanIntensity`, `Area`, `Correlation` | Specific metric |
| **Parameters** | `GFP`, `3_256` | Image name, scale, etc. |

### Examples

| Full name | Meaning |
|---|---|
| `Cells_Intensity_MeanIntensity_GFP` | Mean GFP intensity of each cell |
| `Cells_AreaShape_Area` | Area (in pixels) of each cell |
| `Nuclei_Texture_Entropy_DAPI_3_256` | Entropy texture of nuclei in DAPI channel, scale 3, 256 grey levels |
| `Cells_Children_Puncta_Count` | Number of puncta in each cell |
| `Puncta_Parent_Cells` | Which cell each punctum belongs to |
| `Image_Count_Cells` | Number of cells in the image |
| `Image_Intensity_MeanIntensity_GFP` | Mean GFP intensity of the whole image |

### Tips for navigating measurements

- In exported CSV files, each measurement is a column
- Use the naming convention to find what you need: search for `MeanIntensity` to find all mean intensity measurements
- `Image_Count_<ObjectName>` gives the number of objects per image
- Per-image means of object measurements are in the Image file (if you enabled "Calculate per-image mean values" in ExportToSpreadsheet)

---

## 25. Exporting Data to Spreadsheets

The **ExportToSpreadsheet** module saves all your measurements as CSV files. This is typically the last module in your pipeline.

### Settings

| Setting | Recommended value | Notes |
|---|---|---|
| Select the column delimiter | Comma | Standard CSV format |
| Output file location | Default Output Folder | Or specify a custom folder |
| Add a prefix to file names? | Yes → `MyExpt_` | Keeps output files organised |
| Overwrite existing files? | No | Prevents accidental data loss |
| Add image metadata columns to object data? | Yes | Includes condition/well info in every row |
| Export all measurement types? | Yes | Exports everything; filter later in Python/Excel |
| Calculate per-image mean values for object measurements? | Yes | Adds summary statistics to the Image file |

### Output files

CellProfiler creates one CSV file per object type, plus additional files:

| File | Contains | One row per |
|---|---|---|
| `Image.csv` | Image-level measurements (counts, mean intensities, quality metrics) | Image |
| `Cells.csv` | All measurements for Cell objects | Cell |
| `Puncta.csv` | All measurements for Puncta objects | Punctum |
| `Nuclei.csv` | All measurements for Nuclei objects | Nucleus |
| `Experiment.csv` | Pipeline-wide information | Experiment |

### Linking data across files

Each object has an `ImageNumber` and `ObjectNumber`. Use these to link data:

- `Cells.csv` row with `ImageNumber=5, ObjectNumber=12` is cell #12 in image #5
- `Image.csv` row with `ImageNumber=5` contains image-level data for image #5
- Parent-child relationships: `Puncta.csv` has a `Parent_Cells` column linking each punctum to its parent cell

### Tips

- For large experiments, CSV files can be very large. Consider using ExportToDatabase (SQLite) instead.
- Open CSV files in Python (pandas) or R rather than Excel for large datasets --- Excel has a row limit of ~1 million.
- If you only need specific measurements, uncheck "Export all measurement types" and select the ones you want.

---

## 26. Saving Images

CellProfiler does **not** automatically save processed images. If you want to save annotated images, segmentation masks, or processed results, you must add a **SaveImages** module.

### Common uses

| What to save | Image to select | Format |
|---|---|---|
| Annotated images with outlines | Output of OverlayOutlines | PNG or TIFF |
| Segmentation masks | Objects (converted to image) | TIFF (16-bit for label images) |
| Illumination-corrected images | Output of CorrectIlluminationApply | TIFF |
| Cropped individual cells | Use SaveCroppedObjects instead | TIFF or PNG |

### Settings

| Setting | Description |
|---|---|
| **Select the image to save** | Name of the image (from any upstream module) |
| **Select the file format** | TIFF (lossless, recommended), PNG, or JPEG |
| **Output file location** | Default Output Folder or custom |
| **File naming** | Use metadata tags to create meaningful names (e.g. `\g<Well>_\g<Field>_overlay`) |
| **Overwrite?** | Yes or No |

### OverlayOutlines

To create annotated images showing where objects were found:

1. Add **OverlayOutlines** before **SaveImages**
2. **Select image to overlay on** → Your original image (e.g. `GFP`)
3. **Select objects to display** → Your identified objects (e.g. `Cells`)
4. **Name the output image** → `OverlayImage`
5. Then save `OverlayImage` with SaveImages

---

## 27. Test Mode: Developing Your Pipeline

Test mode is essential for developing and debugging your pipeline. It lets you run the pipeline on a single image set, see the results, adjust settings, and re-run --- without processing your entire dataset.

### How to use Test mode

1. **Enter Test mode:** Test menu → Start Test Mode (or click the "Start Test Mode" button)
2. **Choose an image set:** Test menu → Choose Image Set (pick a representative image)
3. **Step through modules:** Click "Step" to run the next module. After each module, a window shows the output.
4. **Examine results:** Look at the segmentation --- are the objects correct? Are measurements reasonable?
5. **Adjust and re-run:** Change settings, then use Test menu → "Run from module X" to re-run from a specific point
6. **Exit Test mode:** Test menu → Exit Test Mode (before running the full analysis)

### What to check at each step

| Module type | What to look for |
|---|---|
| Illumination correction | Is the correction function smooth? No cell-shaped features? |
| EnhanceOrSuppressFeatures | Are the features of interest enhanced? Is background suppressed? |
| IdentifyPrimaryObjects | Are objects correctly identified? No over-splitting? No missed objects? Are borders excluded? |
| IdentifySecondaryObjects | Do cell boundaries look reasonable? |
| FilterObjects | Were the right objects kept/removed? |
| MeasureObjectIntensity | Are the measurement values in a reasonable range? |

### Tips

- **Always test on multiple images** --- not just the best one. Test on bright images, dim images, crowded images, and sparse images.
- **Test on worst-case images** to make sure your pipeline handles them.
- Use **Test > Choose Image Set** to jump between different images.
- The display windows show outlines, measurements, and histograms --- use them to validate your settings.

---

## 28. Running Full Analyses

Once you are satisfied with your pipeline in Test mode, run it on your full dataset.

### Running locally

1. **Exit Test mode** (Test → Exit Test Mode)
2. Click **Analyze Images**
3. The status bar shows progress: image sets completed, elapsed time, estimated time remaining

### Controls during analysis

| Button | What it does |
|---|---|
| Pause | Temporarily stops processing (resumes from where it paused) |
| Stop Analysis | Ends the run and saves measurements collected so far |

### Parallel processing

CellProfiler automatically uses multiple CPU cores. Configure the number of workers in **File > Preferences**. Each worker processes one image set at a time.

**Tip:** Set the number of workers to the number of CPU cores minus 1, leaving one core free for the GUI.

### What happens when processing finishes

- CSV files (or database entries) are written to the output folder
- The status bar shows "Analysis complete"
- You can examine results immediately by opening the CSV files

### Handling errors

If CellProfiler encounters an error on a specific image:
- It logs the error and skips that image set
- Other image sets continue processing
- Check the log file in the output folder for details

---

## 29. Batch Processing and the Command Line

For large experiments or computing cluster use, CellProfiler can run without a GUI (headless mode).

### Running from the command line

```bash
# Run a pipeline on a set of images
cellprofiler -p my_pipeline.cppipe -c -r \
    -i /path/to/images/ \
    -o /path/to/output/

# Flags:
#   -p   Pipeline or batch file
#   -c   Run headless (no GUI)
#   -r   Run the pipeline immediately
#   -i   Input image directory
#   -o   Output directory
```

### Processing a subset of image sets

```bash
# Process only image sets 1 through 50
cellprofiler -p my_pipeline.cppipe -c -r \
    -f 1 -l 50 \
    -i /path/to/images/ \
    -o /path/to/output/
```

### Batch processing on a computing cluster

For very large datasets (thousands of images), divide the work across cluster nodes:

1. **Prepare locally:**
   - Build and test your pipeline in the CellProfiler GUI
   - Add a **CreateBatchFiles** module at the end of the pipeline
   - Click "Analyze Images" --- this does not process all images; it creates a `Batch_data.h5` file

2. **Submit jobs on the cluster:**
   ```bash
   # Process image sets 1-100 on one node
   cellprofiler -p /output/Batch_data.h5 -c -r -f 1 -l 100

   # Process image sets 101-200 on another node
   cellprofiler -p /output/Batch_data.h5 -c -r -f 101 -l 200
   ```

3. **Combine results:** All nodes write to the same output folder. CSV files from different batches can be concatenated.

### Running from Python

You can also call CellProfiler from a Python script using `subprocess`:

```python
import subprocess
from pathlib import Path

pipeline = Path("pipelines/piezo1_analysis.cppipe")
image_dir = Path("raw_images")
output_dir = Path("output")
output_dir.mkdir(exist_ok=True)

result = subprocess.run([
    "cellprofiler",
    "-p", str(pipeline),
    "-c", "-r",
    "-i", str(image_dir),
    "-o", str(output_dir),
], capture_output=True, text=True)

if result.returncode == 0:
    print("CellProfiler analysis complete!")
else:
    print(f"Error: {result.stderr}")
```

---

## 30. Workflow: Counting Cells and Measuring Expression

**Goal:** Count how many HEK293T cells express PIEZO1-GFP and measure expression levels.

### Imaging setup

- HEK293T cells transfected with PIEZO1-GFP
- Widefield or confocal fluorescence microscopy
- Two channels: GFP (PIEZO1) and DAPI or Hoechst (nuclei)
- Multiple fields of view per condition

### Pipeline

```
 1. Images              ← drag in your image folder
 2. Metadata            ← extract condition and field from filenames
 3. NamesAndTypes       ← name channels: "GFP" and "DAPI"
 4. Groups              ← not needed for single timepoint data
 5. IdentifyPrimaryObjects
      Input: DAPI
      Objects: Nuclei
      Diameter: 30–60 pixels
 6. IdentifySecondaryObjects
      Input objects: Nuclei
      Input image: GFP
      Output: Cells
      Method: Propagation
 7. MeasureObjectIntensity
      Images: GFP
      Objects: Cells, Nuclei
 8. MeasureObjectSizeShape
      Objects: Cells, Nuclei
 9. ClassifyObjects  (or do this in Python)
      Objects: Cells
      Measurement: Intensity_MeanIntensity_GFP
      Bin: "Positive" if > threshold, "Negative" otherwise
10. OverlayOutlines
      Image: GFP
      Objects: Cells (different colour for positive/negative)
11. SaveImages
      Image: Overlay
12. ExportToSpreadsheet
      Export all measurements
```

### Analysis in Excel or Python

After running:
- Open `Image.csv` → each row is one field of view → `Image_Count_Cells` gives total cells
- Open `Cells.csv` → each row is one cell → `Cells_Intensity_MeanIntensity_GFP` gives expression level
- Calculate transfection efficiency: (number of GFP-positive cells) / (total cells) × 100%

---

## 31. Workflow: PIEZO1 Puncta Analysis in TIRF Images

**Goal:** Detect, count, and measure PIEZO1-GFP clusters (puncta) at the cell membrane in TIRF images.

### Imaging setup

- HEK293T or CHO cells expressing PIEZO1-GFP
- TIRF microscopy (evanescent field illuminates the basal membrane)
- Single-channel GFP images
- PIEZO1-GFP appears as bright spots (puncta) on a dim, diffuse background

### Pipeline

```
 1. Images              ← TIRF TIFF files
 2. NamesAndTypes       ← name as "GFP", grayscale
 3. CorrectIlluminationCalculate
      Input: GFP
      Output: IllumGFP
      Method: Regular
      Calculate for: Each image
      Smoothing: Median Filter
 4. CorrectIlluminationApply
      Input: GFP
      Function: IllumGFP
      Output: CorrGFP
      Method: Divide
 5. EnhanceOrSuppressFeatures
      Input: CorrGFP
      Output: EnhancedPuncta
      Operation: Enhance
      Feature: Speckles
      Feature size: 8         ← diameter of puncta in pixels
 6. IdentifyPrimaryObjects
      Input: EnhancedPuncta
      Objects: Puncta
      Diameter: 3–15 pixels   ← range for PIEZO1 puncta
      Declumping: None        ← puncta rarely overlap
      Threshold: Robust Background
      Correction factor: 1.2  ← adjust to be stricter/more permissive
      Discard border objects: Yes
 7. MeasureObjectIntensity
      Images: CorrGFP         ← measure on the corrected (not enhanced) image
      Objects: Puncta
 8. MeasureObjectSizeShape
      Objects: Puncta
 9. FilterObjects
      Input: Puncta
      Output: FilteredPuncta
      Filter by: AreaShape_Area
      Min: 5, Max: 200        ← remove noise and large artefacts
10. OverlayOutlines
      Image: CorrGFP
      Objects: FilteredPuncta
      Output: Overlay
11. SaveImages
      Image: Overlay
12. ExportToSpreadsheet
      Export all measurements
```

### Key measurements to analyse

| Question | Where to find the answer |
|---|---|
| How many puncta per cell? | `Image_Count_FilteredPuncta` (per image), or use RelateObjects for per-cell counts |
| How bright are the puncta? | `FilteredPuncta_Intensity_IntegratedIntensity_CorrGFP` |
| How big are the puncta? | `FilteredPuncta_AreaShape_Area` or `EquivalentDiameter` |
| Are puncta round or elongated? | `FilteredPuncta_AreaShape_FormFactor` (1.0 = round) |

### Tips

- **Feature size** in EnhanceOrSuppressFeatures should match your puncta diameter. If unsure, test several values.
- **Measure intensity on the corrected image**, not the enhanced image. The enhanced image is only for detection.
- Use **FilterObjects** to remove false positives (dust, noise). Check the size distribution in Test mode first.
- If you also want per-cell puncta counts, add IdentifyPrimaryObjects for cells (or IdentifySecondaryObjects if you have a cell stain) and then RelateObjects.

---

## 32. Workflow: Multi-Channel Colocalization

**Goal:** Quantify colocalization between PIEZO1-GFP and a second fluorescent marker (e.g. mCherry-tagged protein) within identified cells.

### Imaging setup

- Cells co-expressing PIEZO1-GFP and mCherry-marker
- Two-channel fluorescence images (separate files or multi-channel TIFF)
- Optional: DAPI nuclear stain as third channel

### Pipeline

```
 1. Images              ← all image files
 2. Metadata            ← extract field and channel from filenames
 3. NamesAndTypes       ← "GFP", "mCherry", and optionally "DAPI"
 4. IdentifyPrimaryObjects
      Input: DAPI (or GFP if no nuclear stain)
      Objects: Nuclei
      Diameter: 30–60
 5. IdentifySecondaryObjects
      Input objects: Nuclei
      Input image: GFP
      Output: Cells
      Method: Distance - N (pixels = 30)
                          ← use Distance if no membrane stain
 6. MeasureObjectIntensity
      Images: GFP, mCherry
      Objects: Cells
 7. MeasureColocalization
      Images: GFP, mCherry
      Where: Within objects
      Objects: Cells
      Threshold: 15%
      Run all metrics: Yes
 8. ExportToSpreadsheet
      Export all measurements
```

### Interpreting results

In `Cells.csv`, each cell has:
- `Cells_Correlation_Correlation_GFP_mCherry` — Pearson's r
- `Cells_Correlation_Manders_GFP_mCherry` — fraction of GFP in mCherry-positive areas
- `Cells_Correlation_Manders_mCherry_GFP` — fraction of mCherry in GFP-positive areas
- `Cells_Correlation_RWC_GFP_mCherry` — rank-weighted colocalization

**Interpretation guide:**
- Pearson's r > 0.5: strong colocalization
- Pearson's r = 0.0: no correlation
- Pearson's r < 0: anti-correlation (signals avoid each other)
- Manders M1 = 0.8 means 80% of the GFP signal is in mCherry-positive areas

---

## 33. Workflow: Time-Lapse Calcium Imaging

**Goal:** Track cells across frames in a calcium imaging time-lapse and measure how fluorescence changes over time.

### Imaging setup

- Cells loaded with a calcium indicator (e.g. Fluo-4, GCaMP, or mCherry-GECO)
- Time-lapse recording: hundreds to thousands of frames
- Images saved as individual TIFFs (one per frame) or as a TIFF stack

### If images are individual TIFFs

Ensure filenames contain the frame number:
```
calcium_movie_T001.tif
calcium_movie_T002.tif
...
calcium_movie_T500.tif
```

### Pipeline

```
 1. Images              ← all frames
 2. Metadata            ← extract frame number: (?P<Frame>T[0-9]+)
 3. NamesAndTypes       ← name as "Calcium", grayscale
 4. Groups              ← group by movie ID (if multiple recordings)
 5. IdentifyPrimaryObjects
      Input: Calcium
      Objects: Cells
      Diameter: 40–100
      Threshold: Robust Background
 6. MeasureObjectIntensity
      Images: Calcium
      Objects: Cells
 7. MeasureObjectSizeShape
      Objects: Cells
 8. TrackObjects
      Objects: Cells
      Method: LAP
      Max distance: 30
      Movement model: Random
      Second phase: Yes
      Max gap: 3 frames
 9. ExportToSpreadsheet
      Add metadata columns: Yes
      Export all measurements
```

### Analysing time traces

In `Cells.csv`, each row is one cell at one timepoint. Key columns:
- `ImageNumber` — the frame number
- `TrackObjects_Label` — unique cell ID (consistent across frames)
- `Cells_Intensity_MeanIntensity_Calcium` — fluorescence at this timepoint

To extract a time trace for cell #5:
```python
import pandas as pd

cells = pd.read_csv("output/Cells.csv")
cell_5 = cells[cells["TrackObjects_Label_30"] == 5]
trace = cell_5.sort_values("ImageNumber")["Intensity_MeanIntensity_Calcium"]
```

See Section 34 for more detailed Python analysis.

### Important notes

- **Frame rate:** CellProfiler does not know your frame rate. You need to convert frame numbers to time yourself (e.g. frame × 0.1 s if imaging at 10 fps).
- **dF/F:** CellProfiler does not compute dF/F directly. Extract raw traces and compute dF/F in Python (see Section 34).
- **For fast calcium transients** (sub-second), CellProfiler may not be the best tool --- consider FLIKA, which is designed for this.
- **Grouping is essential** if you have multiple movies. Without it, TrackObjects will try to track cells across movie boundaries.

---

## 34. Workflow: Analysing CellProfiler Output with Python

CellProfiler exports CSV files that are easy to analyse with Python and pandas. This section shows common analysis patterns.

### Loading CellProfiler output

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

# Load the exported CSV files
output_dir = Path("output")
images = pd.read_csv(output_dir / "Image.csv")
cells = pd.read_csv(output_dir / "Cells.csv")
puncta = pd.read_csv(output_dir / "Puncta.csv")

print(f"Images: {len(images)}")
print(f"Cells: {len(cells)}")
print(f"Puncta: {len(puncta)}")
```

### Calculating transfection efficiency

```python
# Define a threshold for "GFP-positive"
threshold = 0.05  # adjust based on your data

cells["GFP_positive"] = (
    cells["Intensity_MeanIntensity_GFP"] > threshold
)

# Per-image transfection efficiency
efficiency = cells.groupby("ImageNumber").agg(
    total_cells=("ObjectNumber", "count"),
    positive_cells=("GFP_positive", "sum"),
)
efficiency["percent_positive"] = (
    efficiency["positive_cells"] / efficiency["total_cells"] * 100
)
print(efficiency)
print(f"\nOverall: {efficiency['percent_positive'].mean():.1f}% ± "
      f"{efficiency['percent_positive'].std():.1f}%")
```

### Comparing conditions

```python
# If you extracted condition metadata
# (e.g. "Variant" = WT or R2456H)
merged = cells.merge(
    images[["ImageNumber", "Metadata_Variant"]],
    on="ImageNumber"
)

# Compare GFP intensity between conditions
for variant, group in merged.groupby("Metadata_Variant"):
    intensities = group["Intensity_MeanIntensity_GFP"]
    print(f"{variant}: mean = {intensities.mean():.4f}, "
          f"n = {len(intensities)} cells")

# Plot
fig, ax = plt.subplots(figsize=(6, 4))
merged.boxplot(
    column="Intensity_MeanIntensity_GFP",
    by="Metadata_Variant",
    ax=ax
)
ax.set_ylabel("PIEZO1-GFP Mean Intensity (a.u.)")
ax.set_title("PIEZO1-GFP Expression by Variant")
plt.suptitle("")
plt.tight_layout()
plt.savefig("intensity_comparison.png", dpi=150)
plt.show()
```

### Puncta analysis

```python
# Puncta size distribution
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].hist(puncta["AreaShape_Area"], bins=50, edgecolor="black")
axes[0].set_xlabel("Puncta Area (pixels)")
axes[0].set_ylabel("Count")
axes[0].set_title("Puncta Size Distribution")

axes[1].hist(puncta["Intensity_IntegratedIntensity_CorrGFP"],
             bins=50, edgecolor="black")
axes[1].set_xlabel("Integrated Intensity (a.u.)")
axes[1].set_ylabel("Count")
axes[1].set_title("Puncta Brightness Distribution")

plt.tight_layout()
plt.savefig("puncta_analysis.png", dpi=150)
plt.show()

# Summary statistics
print(f"Mean puncta area: {puncta['AreaShape_Area'].mean():.1f} pixels")
print(f"Mean puncta diameter: {puncta['AreaShape_EquivalentDiameter'].mean():.1f} pixels")
print(f"Puncta per image: {puncta.groupby('ImageNumber').size().mean():.1f}")
```

### Extracting calcium traces from tracked cells

```python
# Load tracked cell data
cells = pd.read_csv("output/Cells.csv")

# Get unique tracked cell IDs
# (The label column name includes the max distance setting)
label_col = [c for c in cells.columns if "TrackObjects_Label" in c][0]

# Extract traces for all tracked cells
fps = 10.0  # your imaging frame rate
traces = {}

for label, group in cells.groupby(label_col):
    if label == 0:
        continue  # label 0 = untracked
    group = group.sort_values("ImageNumber")
    if len(group) < 20:
        continue  # skip short tracks
    traces[label] = {
        "time": (group["ImageNumber"].values - 1) / fps,
        "intensity": group["Intensity_MeanIntensity_Calcium"].values,
    }

print(f"Found {len(traces)} tracked cells")

# Plot traces
fig, ax = plt.subplots(figsize=(10, 5))
for label, data in list(traces.items())[:10]:  # plot first 10
    ax.plot(data["time"], data["intensity"], alpha=0.7, label=f"Cell {label}")
ax.set_xlabel("Time (s)")
ax.set_ylabel("Calcium Intensity (a.u.)")
ax.set_title("Calcium Traces from CellProfiler Tracking")
ax.legend(fontsize=8, ncol=2)
plt.tight_layout()
plt.savefig("calcium_traces.png", dpi=150)
plt.show()

# Compute dF/F
baseline_seconds = 5.0
for label, data in traces.items():
    baseline_mask = data["time"] < baseline_seconds
    f0 = data["intensity"][baseline_mask].mean()
    data["dff"] = (data["intensity"] - f0) / f0

# Plot dF/F
fig, ax = plt.subplots(figsize=(10, 5))
for label, data in list(traces.items())[:10]:
    ax.plot(data["time"], data["dff"], alpha=0.7, label=f"Cell {label}")
ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.set_title("Calcium dF/F Traces")
ax.axhline(y=0, color="gray", linestyle="--", linewidth=0.5)
ax.legend(fontsize=8, ncol=2)
plt.tight_layout()
plt.savefig("calcium_dff.png", dpi=150)
plt.show()
```

### Saving results for publication

```python
# Create a summary table
summary = pd.DataFrame({
    "Condition": [],
    "N_images": [],
    "N_cells": [],
    "Mean_GFP_intensity": [],
    "SEM_GFP_intensity": [],
    "Mean_puncta_per_cell": [],
})

# ... fill in from your analysis ...

summary.to_csv("results_summary.csv", index=False)
```

---

## 35. Using AI to Build Pipelines

AI assistants like Claude can help you design CellProfiler pipelines, troubleshoot settings, and write Python scripts to analyse CellProfiler output. However, CellProfiler pipelines are configured through the GUI, not written as code, so the way you use AI is different from coding tasks.

### What AI can help with

- **Designing a pipeline:** Describe your experiment and images, and ask which modules to use and in what order
- **Choosing settings:** Describe what your images look like and ask for recommended parameter values
- **Troubleshooting:** Describe the problem (e.g. "objects are being split") and ask for solutions
- **Writing Python scripts** to analyse CellProfiler CSV output
- **Understanding measurements:** Ask what a specific measurement means or which measurement answers your question

### What to include in your prompts

#### 1. Describe your images

```
I have TIRF microscopy images of HEK293T cells expressing PIEZO1-GFP.
- Single channel, grayscale 16-bit TIFF
- 512 x 512 pixels, 100 nm/pixel
- PIEZO1-GFP appears as bright puncta (roughly 5-10 pixels diameter)
  on a dim, diffuse membrane background
- About 2-5 cells per field of view
- Some images have uneven illumination (brighter in the centre)
```

#### 2. State your goal

```
I want to:
1. Detect and count PIEZO1 puncta in each image
2. Measure the intensity and size of each punctum
3. Export the results to CSV for analysis in Python
```

#### 3. Mention what you have already tried (if applicable)

```
I tried using IdentifyPrimaryObjects directly on the GFP image, but it
detects a lot of background noise as objects. The threshold seems too low.
```

### Example prompts

#### Designing a pipeline

> I am using CellProfiler to analyse fluorescence microscopy images. My experiment: HEK293T cells co-transfected with PIEZO1-GFP and mCherry-CAAX (membrane marker). I have two-channel TIFF images (separate files per channel, named like `field001_GFP.tif` and `field001_mCherry.tif`). I want to: (1) identify cells using the mCherry membrane signal, (2) measure PIEZO1-GFP intensity per cell, (3) measure colocalization between GFP and mCherry, and (4) export everything to CSV. What modules should I use, in what order, and what settings do you recommend?

#### Troubleshooting

> In CellProfiler, I am using IdentifyPrimaryObjects to find PIEZO1-GFP puncta in TIRF images. The module is finding too many false positives --- tiny bright noise pixels are being detected as puncta. My settings: typical diameter 3-15 pixels, threshold method Otsu, global strategy. The real puncta are 5-10 pixels in diameter and much brighter than the noise. How can I fix this?

#### Analysing output

> I have CellProfiler output CSV files: Image.csv, Cells.csv, and Puncta.csv. The Puncta.csv has columns including AreaShape_Area, Intensity_MeanIntensity_GFP, and Parent_Cells. I want a Python script that: (1) calculates the number of puncta per cell, (2) makes a histogram of puncta sizes, (3) compares mean puncta intensity between experimental conditions (condition is in Image.csv as Metadata_Condition), and (4) runs a statistical test (t-test) between conditions. Please use pandas and matplotlib.

### Tips

- CellProfiler pipelines are **not code** --- they are GUI configurations. AI can describe what modules and settings to use, but you apply them in the CellProfiler GUI yourself.
- For **Python scripts** that analyse CellProfiler output, AI can generate complete, runnable code.
- Include the **column names** from your CSV files when asking about analysis --- CellProfiler's naming convention (Section 24) can be complex.
- If asking about a specific module, mention its name (e.g. "IdentifyPrimaryObjects") and your current settings.

---

## 36. Troubleshooting

### Pipeline does not run (red icons)

**Cause:** One or more modules have configuration errors.
**Fix:** Click on each module with a red icon and read the error message. Common issues:
- An image or object name referenced in one module was not created by an earlier module
- A required setting is empty
- Modules are in the wrong order (e.g. trying to measure objects before identifying them)

### Objects are over-split (too many small objects)

**Possible causes and fixes:**
- **Diameter too small:** Increase the minimum typical diameter
- **Threshold too low:** Increase the threshold correction factor (e.g. from 1.0 to 1.3)
- **Noise causing false detections:** Add a Smooth or EnhanceOrSuppressFeatures module before IdentifyPrimaryObjects
- **Declumping too aggressive:** Try declumping method "None" (for sparse objects) or "Shape" instead of "Intensity"

### Objects are merged (multiple cells identified as one)

**Possible causes and fixes:**
- **Diameter too large:** Decrease the maximum typical diameter
- **Declumping not working:** Try "Intensity" or "Shape" declumping instead of "None"
- **Cells touching tightly:** Use a nuclear stain with IdentifyPrimaryObjects (nuclei are easier to separate), then IdentifySecondaryObjects for whole cells

### Threshold is wrong (too much or too little background included)

**Fixes:**
- Try a different thresholding method (Otsu, Robust Background, Minimum Cross-Entropy)
- Adjust the correction factor (higher = stricter, lower = more permissive)
- Try Adaptive instead of Global thresholding (for uneven illumination)
- Pre-process with CorrectIlluminationCalculate/Apply before identification

### Measurements look wrong

**Common issues:**
- **Intensity values are 0–1:** CellProfiler rescales images to 0–1 by default. This is normal. To get original intensity values, multiply by the bit depth maximum (e.g. 65535 for 16-bit).
- **All cells have the same intensity:** You may be measuring the wrong image. Make sure MeasureObjectIntensity is set to measure the correct channel.
- **NaN values:** Objects with zero area (degenerate objects) produce NaN. Use FilterObjects to remove them.

### CellProfiler is slow

**Fixes:**
- Increase the number of workers (File > Preferences)
- Resize images if they are very large (Resize module or pixel binning before loading)
- Disable modules you do not need (right-click → disable)
- Use "Fast" mode in EnhanceOrSuppressFeatures for large feature sizes
- Close display windows during full analysis (they slow processing)

### CellProfiler crashes or runs out of memory

**Fixes:**
- Close other applications to free RAM
- Process fewer images at a time (use -f and -l flags on the command line)
- Resize large images before loading
- Save intermediate results and break the pipeline into two stages

### Images do not load

**Possible causes:**
- File format not supported: convert to TIFF
- File is corrupted: re-export from microscope software
- Path contains special characters: move images to a simple path
- Bio-Formats cannot read the file: try converting with ImageJ first

### Tracking jumps between movies

**Cause:** The Groups module is not configured, so TrackObjects tries to track across movie boundaries.
**Fix:** Configure the Groups module to group by movie/recording ID (from Metadata).

---

## 37. Module Quick Reference

### Input modules

| Module | Purpose |
|---|---|
| **Images** | Specify which files to analyse |
| **Metadata** | Extract experimental info from filenames |
| **NamesAndTypes** | Name channels and define image sets |
| **Groups** | Divide image sets into independent groups |

### Image processing

| Module | Purpose |
|---|---|
| **ColorToGray** | Split colour images into channels |
| **GrayToColor** | Combine channels into colour image |
| **CorrectIlluminationCalculate** | Calculate illumination correction |
| **CorrectIlluminationApply** | Apply illumination correction |
| **EnhanceOrSuppressFeatures** | Enhance puncta, neurites, circles, etc. |
| **ImageMath** | Add, subtract, multiply, divide images |
| **MakeProjection** | Z-projection (average, max, min, sum) |
| **RescaleIntensity** | Normalise intensity range |
| **Smooth** | Gaussian, median, or mean blur |
| **Threshold** | Create binary mask |
| **Morph** | Morphological operations (erode, dilate, etc.) |
| **Resize** | Change image resolution |
| **Crop** | Crop to rectangle, ellipse, or shape |
| **MaskImage** | Hide parts of an image |
| **Align** | Align channels to each other |

### Object processing

| Module | Purpose |
|---|---|
| **IdentifyPrimaryObjects** | Find objects in a grayscale image |
| **IdentifySecondaryObjects** | Find objects using seeds from primary objects |
| **IdentifyTertiaryObjects** | Subtract one object set from another (e.g. cytoplasm) |
| **FilterObjects** | Remove objects by measurement criteria |
| **TrackObjects** | Track objects across time-lapse frames |
| **RelateObjects** | Establish parent-child relationships |
| **ExpandOrShrinkObjects** | Grow or shrink objects by pixels |
| **SplitOrMergeObjects** | Split or combine objects |
| **EditObjectsManually** | Hand-edit objects interactively |
| **MaskObjects** | Remove objects outside a region |
| **ClassifyObjects** | Classify objects by measurement or ML model |

### Measurement

| Module | Purpose | Level |
|---|---|---|
| **MeasureObjectIntensity** | Intensity features per object | Object |
| **MeasureObjectSizeShape** | Area, perimeter, shape features per object | Object |
| **MeasureColocalization** | Channel correlation and overlap | Image or Object |
| **MeasureTexture** | Haralick texture features | Object |
| **MeasureGranularity** | Size spectrum of textures | Image or Object |
| **MeasureObjectIntensityDistribution** | Radial intensity from centre to edge | Object |
| **MeasureObjectNeighbors** | Neighbour counts and distances | Object |
| **MeasureImageIntensity** | Whole-image intensity statistics | Image |
| **MeasureImageQuality** | Focus, saturation, noise metrics | Image |
| **MeasureImageAreaOccupied** | Area covered by objects | Image |

### Output

| Module | Purpose |
|---|---|
| **ExportToSpreadsheet** | Save measurements as CSV |
| **ExportToDatabase** | Save measurements to MySQL or SQLite |
| **SaveImages** | Save processed/annotated images |
| **SaveCroppedObjects** | Save individual objects as separate image files |
| **OverlayOutlines** | Draw object outlines on images |
| **CreateBatchFiles** | Create files for cluster batch processing |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using CellProfiler for quantitative fluorescence microscopy image analysis. For questions or suggestions, contact george.dickinson@gmail.com.*

*When using CellProfiler in published research, please cite: Stirling et al., BMC Bioinformatics 22:433, 2021.*
