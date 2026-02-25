# ImageJ/FIJI Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is ImageJ/FIJI?](#1-introduction-what-is-imagejfiji)
2. [Installation and Configuration](#2-installation-and-configuration)
3. [The FIJI Interface](#3-the-fiji-interface)

**Part II: Bio-Formats and File Handling**

4. [Bio-Formats and the Open Microscopy Environment](#4-bio-formats-and-the-open-microscopy-environment)
5. [Opening, Importing, and Saving Images](#5-opening-importing-and-saving-images)

**Part III: Everyday Image Analysis**

6. [Navigating Images and Adjusting the Display](#6-navigating-images-and-adjusting-the-display)
7. [Regions of Interest and the ROI Manager](#7-regions-of-interest-and-the-roi-manager)
8. [Making Measurements](#8-making-measurements)
9. [The Results Table: Statistics, Saving, and Export](#9-the-results-table-statistics-saving-and-export)
10. [Plotting: Profiles, Histograms, and Time Traces](#10-plotting-profiles-histograms-and-time-traces)
11. [Image Processing Essentials](#11-image-processing-essentials)
12. [Stack Operations for Time-Series and Z-Stacks](#12-stack-operations-for-time-series-and-z-stacks)
13. [Multi-Channel Images and Composites](#13-multi-channel-images-and-composites)
14. [Saving Images and Creating Figures](#14-saving-images-and-creating-figures)

**Part IV: thunderSTORM — Single-Molecule Localization Microscopy**

15. [thunderSTORM Overview and Installation](#15-thunderstorm-overview-and-installation)
16. [Camera Setup and Calibration](#16-camera-setup-and-calibration)
17. [Image Filtering Algorithms](#17-image-filtering-algorithms)
18. [Molecule Detection Methods](#18-molecule-detection-methods)
19. [Sub-Pixel Localization: PSF Models and Fitting](#19-sub-pixel-localization-psf-models-and-fitting)
20. [Post-Processing Pipeline](#20-post-processing-pipeline)
21. [Rendering and Visualization](#21-rendering-and-visualization)
22. [thunderSTORM Settings for PIEZO1 TIRF-SMLM](#22-thunderstorm-settings-for-piezo1-tirf-smlm)

**Part V: Complementary Plugins for TIRF Analysis**

23. [TrackMate for Single-Particle Tracking](#23-trackmate-for-single-particle-tracking)
24. [Drift Correction with StackReg and TurboReg](#24-drift-correction-with-stackreg-and-turboreg)
25. [Additional SMLM and TIRF Plugins](#25-additional-smlm-and-tirf-plugins)

**Part VI: Macros and Automation**

26. [The Macro Recorder](#26-the-macro-recorder)
27. [ImageJ Macro Language Essentials](#27-imagej-macro-language-essentials)
28. [Batch Processing](#28-batch-processing)
29. [Example Macros for TIRF Workflows](#29-example-macros-for-tirf-workflows)
30. [Scripting with Jython and Other Languages](#30-scripting-with-jython-and-other-languages)

**Part VII: Practical Workflows**

31. [Workflow: Measuring Fluorescence Intensity in Cells](#31-workflow-measuring-fluorescence-intensity-in-cells)
32. [Workflow: Counting and Measuring Puncta](#32-workflow-counting-and-measuring-puncta)
33. [Workflow: TIRF Time-Lapse Analysis](#33-workflow-tirf-time-lapse-analysis)
34. [Workflow: SMLM Reconstruction with thunderSTORM](#34-workflow-smlm-reconstruction-with-thunderstorm)

**Appendices**

35. [Keyboard Shortcuts Quick Reference](#35-keyboard-shortcuts-quick-reference)
36. [Troubleshooting](#36-troubleshooting)

---

## 1. Introduction: What is ImageJ/FIJI?

ImageJ is a free, open-source, cross-platform image processing application written in Java. It was created in 1997 by Wayne Rasband at the National Institutes of Health (NIH) as a successor to NIH Image, a Macintosh-only program that Rasband had developed in 1987. ImageJ's Java foundation means it runs identically on Windows, macOS, and Linux, and its plugin architecture has made it the most widely used image analysis platform in the biological sciences.

**FIJI** ("FIJI Is Just ImageJ," a recursive acronym) was created in 2007 by Johannes Schindelin and Albert Cardona. FIJI is not a separate program but a *distribution* of ImageJ that bundles hundreds of life-science plugins, an automatic updater, and a multi-language script editor. FIJI is the recommended download for researchers — it includes everything in ImageJ plus a curated collection of tools for microscopy analysis.

### Key features

- **Universal file format support:** Bio-Formats reads over 160 proprietary microscopy formats, including Nikon .nd2, Zeiss .czi, Leica .lif, MetaMorph .stk, and OME-TIFF
- **Comprehensive image processing:** Filters, background subtraction, FFT, thresholding, morphological operations, and arithmetic
- **Measurement and quantification:** Area, intensity, shape descriptors, centroid, and integrated density with results export to CSV
- **ROI tools:** Rectangle, oval, polygon, freehand, line, multi-point selections with the ROI Manager for batch operations
- **Stack and hyperstack support:** Navigate and analyse time-lapse movies, z-stacks, and multi-channel datasets
- **Plotting:** Line profiles, histograms, z-axis profiles, and interactive plot windows with data export
- **Plugin ecosystem:** Nearly 2,000 plugins for specialised tasks including particle tracking (TrackMate), super-resolution (thunderSTORM), registration (StackReg), and machine learning (Weka, StarDist)
- **Macro language and scripting:** Record GUI actions as macros, then edit and run them for automation. Supports Jython, Groovy, BeanShell, and JavaScript
- **Cross-platform:** Runs on Windows, macOS, and Linux with identical functionality

### When to cite

If you use FIJI in published research, cite:

> Schindelin J, Arganda-Carreras I, Frise E, et al. "Fiji: an open-source platform for biological-image analysis." *Nature Methods* 9(7):676–682 (2012).

For ImageJ itself:

> Schneider CA, Rasband WS, Eliceiri KW. "NIH Image to ImageJ: 25 years of image analysis." *Nature Methods* 9:671–675 (2012).

### Resources

| Resource | URL |
|---|---|
| FIJI download | https://fiji.sc |
| ImageJ documentation | https://imagej.net |
| ImageJ User Guide (PDF) | https://imagej.net/ij/docs/guide |
| Forum (questions and help) | https://forum.image.sc |
| Macro language reference | https://imagej.net/ij/developer/macro/macros.html |
| Built-in macro functions | https://imagej.net/ij/developer/macro/functions.html |
| Plugin list | https://imagej.net/list-of-plugins |

---

## 2. Installation and Configuration

### Downloading FIJI

FIJI is a portable application requiring no installer. Download from **https://fiji.sc** or **https://imagej.net/downloads**:

- **Windows:** Extract the ZIP to a user-writable location such as `C:\Users\[name]\Fiji.app`. **Do not** install in `C:\Program Files` — Windows will block the automatic updater. Run `ImageJ-win64.exe`.
- **macOS:** Download for arm64 (Apple Silicon) or x86-64 (Intel). Move `Fiji.app` to Applications. On first launch, right-click → Open to bypass Gatekeeper.
- **Linux:** Extract the tar.gz archive and run `./Fiji.app/ImageJ-linux64`.

Current FIJI builds bundle Java 21, so no separate Java installation is needed.

### Memory configuration

For large TIRF datasets and SMLM analysis, allocate sufficient RAM:

1. Go to **Edit → Options → Memory & Threads**
2. Set maximum memory to approximately 75% of physical RAM (e.g., 24 GB on a 32 GB system)
3. Set the number of threads equal to your CPU core count
4. Restart FIJI for changes to take effect

Monitor memory usage by clicking the status bar at the bottom of the FIJI window — it displays `[used] of [max]`. Click to force garbage collection.

### Enabling update sites

FIJI's plugin ecosystem uses **update sites** — web-hosted repositories. To enable additional plugins:

1. Go to **Help → Update**
2. Click **Manage Update Sites**
3. Check the boxes for desired sites (e.g., "ThunderSTORM", "GDSC SMLM", "TrackMate")
4. Click **Close**, then **Apply Changes**
5. Restart FIJI

### Setting default options

Several options should be set once and left alone:

- **Edit → Options → Conversions:** Uncheck "Scale When Converting" if you want to preserve raw intensity values when changing bit depth
- **Process → Binary → Options:** Check "Black background" if your fluorescence images have bright objects on dark backgrounds (the standard for TIRF)
- **Edit → Options → Input/Output:** Set "File extension for tables" to `.csv` for spreadsheet-compatible output

---

## 3. The FIJI Interface

When you launch FIJI, a small toolbar window appears. This is the main control centre for the application.

### The toolbar

The FIJI toolbar contains drawing and selection tools. From left to right, the main tools are:

| Tool | Shortcut | Description |
|---|---|---|
| Rectangle | (none) | Draw rectangular selections. Right-click for rounded rectangle and other variants |
| Oval | (none) | Draw oval/elliptical selections |
| Polygon | (none) | Click vertices to draw a polygon; double-click to close |
| Freehand | (none) | Draw freeform selections by clicking and dragging |
| Straight line | (none) | Draw line selections for profiles. Right-click for segmented and freehand lines |
| Multi-point | (none) | Place multiple point markers for counting or coordinate recording |
| Wand | (none) | Click to auto-select a contiguous region by intensity |
| Text | (none) | Add text annotations |
| Magnifying glass | (none) | Zoom in (click) or out (right-click) |
| Scrolling hand | (none) | Pan around a zoomed image |

Double-click any tool to open its options dialog.

### The menu bar

The menu bar provides access to all commands:

- **File** — Open, save, import, export, and page setup
- **Edit** — Copy, paste, fill, clear, selection operations, and options
- **Image** — Adjust brightness/contrast, type conversion, stacks, hyperstacks, colour, crop, scale, and properties
- **Process** — Filters, binary operations, maths, FFT, background subtraction, noise reduction, shadows, and batch
- **Analyze** — Measure, set measurements, analyse particles, histogram, plot profile, ROI Manager, and tools
- **Plugins** — Installed plugins, macros, script editor, and the update manager
- **Window** — List and arrange open windows

### The status bar

The status bar at the bottom of the toolbar shows:

- **Pixel coordinates and intensity** when hovering over an image: e.g., `x=256, y=128, value=1842`
- **Progress bars** during long operations
- **Memory usage** when clicked

### Image windows

Each image opens in its own window showing the image with scrollbars for navigation. For stacks and hyperstacks, sliders appear at the bottom for navigating frames (t), slices (z), and channels (c).

---

## 4. Bio-Formats and the Open Microscopy Environment

### What is Bio-Formats?

Bio-Formats is a Java library developed by the **Open Microscopy Environment (OME) consortium** that reads over 160 proprietary microscopy file formats and converts their metadata into a standardised OME data model. It comes pre-installed in FIJI and is invoked automatically when you open most microscopy files.

For quantitative TIRF work, Bio-Formats is essential because it extracts the **physical pixel size** (needed for converting pixel coordinates to nanometres), preserves **camera and detector metadata** (gain, offset, readout noise), and maintains **per-frame timestamps** (needed for drift correction and temporal analysis).

### Key microscopy file formats

| Format | Extension | Key features |
|---|---|---|
| **Nikon NIS-Elements** | .nd2 | Multi-position, multi-channel, time-lapse with JPEG-2000 or lossless compression |
| **MetaMorph** | .stk | TIFF-based with custom UIC tags storing per-plane Z-distances and timestamps |
| **OME-TIFF** | .ome.tif | Open standard for microscopy data exchange; embeds OME-XML metadata; BigTIFF for >4 GB |
| **Zeiss** | .czi | Segment-based architecture with XML metadata; supports JPEG-XR and ZSTD compression |
| **Leica** | .lif | Container format holding multiple image series in a single file |
| **Standard TIFF** | .tif | Universal format; multi-frame stacks supported; preserves calibration if saved from FIJI |

### Using Bio-Formats in FIJI

Access Bio-Formats via **Plugins → Bio-Formats → Bio-Formats Importer**, or simply drag and drop a file onto the FIJI toolbar. The import dialog offers several important options:

- **Color Mode:** Choose Composite (overlaid channels), Colorized (pseudocolor per channel), or Grayscale
- **Virtual Stack:** Loads frames on demand from disk — essential for datasets too large to fit in RAM
- **Split Channels:** Opens each channel as a separate stack
- **Display Metadata:** Opens a window showing all extracted key/value metadata pairs
- **Display OME-XML:** Shows the full standardised metadata block

For batch processing in macros:
```
run("Bio-Formats Importer", "open=/path/to/file.nd2 autoscale color_mode=Default view=Hyperstack stack_order=XYCZT");
```

### Checking and setting calibration

After opening an image, verify the spatial calibration:

1. Go to **Image → Properties** (Ctrl+Shift+P)
2. Check that **Pixel width** and **Pixel height** are set correctly (e.g., 0.107 µm for 107 nm pixels)
3. Check the **Unit of length** (should be "µm" or "um")
4. For time-lapse data, verify the **Frame interval** in seconds

If Bio-Formats did not set these automatically, enter the correct values manually. All subsequent measurements will use these calibrated units.

**Example — Olympus IX83 TIRF system:** In the Bertaccini et al. (2025) study of PIEZO1-HaloTag in hiPSCs, TIRF imaging was performed with a PLAPO 60x oil-immersion objective (NA 1.45 or 1.50), yielding an effective pixel size of ~0.108--0.109 µm/pixel. After opening the acquisition files, confirm this value in Image → Properties. Getting the pixel size right is essential because downstream tools such as thunderSTORM and FLIKA convert pixel coordinates to nanometres using this calibration.

---

## 5. Opening, Importing, and Saving Images

### Opening files

There are several ways to open files in FIJI:

- **File → Open** (Ctrl+O): Opens standard formats (TIFF, PNG, JPEG, BMP). For microscopy formats, Bio-Formats is invoked automatically.
- **Drag and drop:** Drag a file onto the FIJI toolbar. This is the easiest method and handles all formats.
- **File → Import → Image Sequence:** Opens a numbered series of files as a single stack. Select the first file and FIJI detects the numbering pattern.
- **Plugins → Bio-Formats → Bio-Formats Importer:** Opens the full Bio-Formats dialog with all import options.

### Opening subsets of large datasets

For very large TIRF acquisitions (thousands of frames at high frame rates), opening the entire dataset may exhaust memory. For example, single-molecule PIEZO1-HaloTag TIRF imaging at 100--500 fps (Bertaccini et al. 2025) generates thousands of frames per recording. Use these strategies:

- **Virtual stacks:** Check "Use virtual stack" in the Bio-Formats dialog. Frames are loaded from disk on demand, using minimal RAM. Limitation: some processing operations require the full dataset in memory.
- **Crop on import:** In Bio-Formats, check "Crop on import" and specify the region of interest.
- **Specify range:** In Bio-Formats, use "Specify range for each series" to load only a subset of time points or channels.

### Saving images

| Format | Command | Use case |
|---|---|---|
| TIFF | File → Save As → Tiff | **Default for data.** Preserves calibration, bit depth, and stack structure. Use for all intermediate and final data files. |
| OME-TIFF | Plugins → Bio-Formats → Bio-Formats Exporter | Archival format with full metadata. Best for sharing data between labs. |
| PNG | File → Save As → PNG | Lossless single images for figures and presentations. |
| JPEG | File → Save As → Jpeg | Lossy compression — **never use for quantitative data.** Only for web/email previews. |
| AVI | File → Save As → AVI | Movies for presentations. Set compression and frame rate in the dialog. |
| CSV/text | File → Save As → Results | Measurement data. Set `.csv` extension in Edit → Options → Input/Output for spreadsheet compatibility. |

**Critical:** Only TIFF and OME-TIFF preserve spatial calibration and bit depth. Saving to PNG or JPEG converts to 8-bit RGB and loses calibration metadata.

---

## 6. Navigating Images and Adjusting the Display

### Zooming and panning

| Action | How |
|---|---|
| Zoom in | Click magnifying glass, or press `+` |
| Zoom out | Right-click magnifying glass, or press `-` |
| Zoom to fit window | Press `Shift+F` or View → Fit in Window |
| Zoom to 100% (1:1) | Double-click magnifying glass, or View → Original Scale |
| Pan | Hold spacebar and drag, or use scrolling hand tool |
| Zoom to selection | Draw a rectangle, then press `Shift+E` (Edit → Selection → Fit Spline will not work; instead View → Zoom → To Selection) |

### Navigating stacks and hyperstacks

For time-lapse or z-stack data:

- **Drag the slider** at the bottom of the image window to scrub through frames
- **Left/Right arrow keys** or mouse scroll wheel to step one frame at a time
- **`<` and `>`** (comma/period): Jump to the first or last frame
- For hyperstacks with multiple dimensions, separate sliders appear for channels (c), slices (z), and frames (t)
- **Image → Stacks → Set Slice:** Jump to a specific slice number
- **Animate:** Right-click the slider and select "Start Animation" to play the stack as a movie. Press Escape or `\` to stop.

### Adjusting brightness and contrast

**Image → Adjust → Brightness/Contrast** (Ctrl+Shift+C) opens the B&C dialog:

- **Minimum** and **Maximum** sliders set the display range: pixels at or below the minimum appear black; pixels at or above the maximum appear white
- **Auto:** Automatically adjusts based on the image histogram. Hold Alt when clicking for a more conservative stretch.
- **Reset:** Restores the full data range

**Critical distinction:** Adjusting B&C changes only the *display*, not the underlying pixel values. Your data is unchanged. However, clicking **Apply** permanently alters pixel values — avoid this unless you specifically intend to change the data (e.g., for creating figure panels).

For 16-bit TIRF data, the raw display range (0–65535) often makes the image appear very dark. Use Auto or manually set the maximum to a sensible value (inspect the histogram with Analyze → Histogram to find the actual data range).

### Lookup tables (LUTs)

LUTs map pixel intensity values to displayed colours. Access via **Image → Lookup Tables**:

| LUT | Use case |
|---|---|
| Grays | Default; standard for single-channel quantitative data |
| Green, Red, Cyan, Magenta | Channel-specific display for multi-colour imaging |
| Fire, Jet, Turbo | Pseudocolour for visualising intensity gradients (good for TIRF intensity maps) |
| HiLo | Highlights clipped pixels: blue = zero (saturated dark), red = maximum (saturated bright). **Use this to check for saturation before analysis.** |

---

## 7. Regions of Interest and the ROI Manager

### Drawing ROIs

ROIs (Regions of Interest) define areas, lines, or points on an image for measurement, cropping, or masking. Select a tool from the toolbar, then click/drag on the image:

| Tool | How to use | Best for |
|---|---|---|
| Rectangle | Click and drag | Cell bodies, background regions, fixed areas |
| Oval | Click and drag | Nuclei, circular structures |
| Polygon | Click at each vertex; double-click to close | Irregularly shaped cells |
| Freehand | Click and drag to draw | Tracing cell outlines |
| Straight line | Click and drag | Line profiles across membranes, PSF measurements |
| Segmented line | Click at each point; double-click to finish | Profiles along curved structures |
| Multi-point | Click to place points | Counting objects, marking positions |
| Wand | Click inside a region | Auto-selecting objects by intensity (after thresholding) |

**Line width:** Double-click the line tool to set the width. A wider line averages intensity across its width, improving signal-to-noise for line profiles.

### The ROI Manager

The **ROI Manager** (Analyze → Tools → ROI Manager, or press **T** with a selection active) is essential for working with multiple ROIs:

**Adding ROIs:**
- Draw a selection, then press **T** (or click "Add" in the ROI Manager)
- Each ROI is added to the list with a label (rename by selecting it and clicking "Rename")

**Managing ROIs:**
- **Select** an ROI in the list to display it on the image
- **Show All:** Check this box to display all ROIs simultaneously as overlays
- **Labels:** Check this box to display ROI names/numbers on the image

**Measuring with ROIs:**
- Select one or more ROIs in the list, then click **Measure** to measure each one
- **More >> → Multi Measure:** Measures all ROIs across all slices of a stack, producing one row per slice — critical for tracking intensity changes in TIRF time-lapse experiments

**Saving and loading ROIs:**
- **More >> → Save:** Saves all ROIs as a `.zip` file. This preserves positions, shapes, and names.
- **More >> → Open:** Loads a previously saved ROI set
- Individual ROIs can be saved with **File → Save As → Selection**

**Combining ROIs:**
- Select multiple ROIs (Shift+click), then use **More >> → Combine** (logical OR), **AND** (intersection), or **XOR** (exclusive or)

**Important:** There is only one ROI Manager in FIJI. ROIs from different images share the same manager. Use "Associate with Slice" (More >> → Properties) to link ROIs to specific slices in a stack.

### Transferring ROIs between images

To measure the same region in two different images (e.g., measure GFP intensity in a region defined on the DAPI channel):

1. Draw and add ROIs on the first image
2. Select the second image (click its window)
3. In the ROI Manager, select the ROI(s) you want to transfer
4. Click **Measure** — the measurement uses the selected ROI position on the currently active image

Alternatively, use the **Redirect To** option in Set Measurements (see Section 8) to measure intensities in a different image from the one containing the ROI.

---

## 8. Making Measurements

### Configuring measurements: Set Measurements

Before measuring, configure which parameters FIJI reports via **Analyze → Set Measurements** (or in a macro: `run("Set Measurements...", "area mean ...")`). The most important options:

| Measurement | Results column | Description |
|---|---|---|
| **Area** | Area | Area of the selection in calibrated units² (e.g., µm²) or pixels² |
| **Mean gray value** | Mean | Average pixel intensity within the selection |
| **Standard deviation** | StdDev | Standard deviation of pixel intensities within the selection |
| **Min & max gray value** | Min, Max | Minimum and maximum pixel intensity |
| **Integrated density** | IntDen, RawIntDen | IntDen = Area × Mean. RawIntDen = sum of all pixel values in the selection. For uncalibrated images these are identical. |
| **Centroid** | X, Y | Centre point of the selection in calibrated coordinates |
| **Centre of mass** | XM, YM | Intensity-weighted centre (the "bright spot" centre) |
| **Perimeter** | Perim. | Length of the outer boundary |
| **Shape descriptors** | Circ., AR, Round, Solidity | Circularity = 4π(area/perimeter²); Aspect ratio; Roundness; Solidity |
| **Fitted ellipse** | Major, Minor, Angle | Best-fit ellipse axes and orientation |
| **Feret's diameter** | Feret, FeretAngle, MinFeret, FeretX, FeretY | Caliper (longest) diameter and its angle |
| **Median** | Median | Median pixel intensity |
| **Stack position** | Slice | Which slice/frame was measured — **always enable this for stacks** |
| **Display label** | Label | Image filename and slice info — **always enable this for batch processing** |

**Additional options at the bottom of the dialog:**

- **Limit to threshold:** Only measures pixels within the current threshold range. Useful for measuring only the bright puncta and excluding background.
- **Redirect to:** Measures intensities in a *different* image from the one containing the selection. Use this when you segment on one channel and measure on another.
- **Decimal places:** Number of decimal digits in the Results table (default 3).

**Recommended setup for TIRF analysis:**
```
run("Set Measurements...", "area mean standard modal min integrated median stack display redirect=None decimal=3");
```

**Background subtraction with small ROIs:** For single-molecule TIRF data, background can be estimated from a small region immediately adjacent to each punctum rather than from a single global region. Bertaccini et al. (2025) used a **3x3 pixel ROI** placed next to each PIEZO1-HaloTag punctum to measure local background, which was then subtracted from the punctum intensity. This approach accounts for spatial variation in TIRF illumination and out-of-focus fluorescence that a single distant background ROI would miss. In FIJI, you can implement this by adding paired ROIs (punctum + adjacent background) to the ROI Manager and computing the corrected intensity in the Results table or a downstream script.

### The Measure command

With a selection active, press **M** (or Analyze → Measure) to measure. Each measurement adds a row to the Results table. If no selection is present, the entire image is measured.

For **line selections**, Measure reports the line length and angle. For **point selections**, it reports the X and Y coordinates and the pixel value at each point.

### Analyze Particles: automated object measurement

**Analyze → Analyze Particles** (after thresholding) automatically detects and measures all objects:

1. **Threshold the image** (Image → Adjust → Threshold, or Ctrl+Shift+T) to highlight objects of interest
2. Run **Analyze → Analyze Particles**
3. Set parameters:
   - **Size:** Minimum and maximum object area (in calibrated units or pixels). For TIRF puncta, try `0.05-5` µm² or `4-200` pixels².
   - **Circularity:** Range from 0 (infinitely elongated) to 1.0 (perfect circle). For round puncta, use `0.5-1.0`.
   - **Show:** Choose "Outlines" (numbered outlines), "Masks" (filled objects), "Ellipses" (best-fit), or "Count Masks" (each object labelled with a unique number).
   - **Display results:** Adds each object's measurements to the Results table.
   - **Add to Manager:** Adds each object as an ROI in the ROI Manager — very useful for subsequent manual inspection.
   - **Summarize:** Adds a summary line with count, mean, and standard deviation of each measurement.
   - **Exclude on edges:** Ignores objects touching the image border.
   - **Include holes:** Treats holes within objects as part of the object.

---

## 9. The Results Table: Statistics, Saving, and Export

### The Results table

Every time you run Measure or Analyze Particles, results are appended to the **Results table** — a spreadsheet-like window. Important features:

- **Only one "official" Results table exists.** It has the title "Results" and includes a special Results menu. Other tables may look similar but are separate.
- **Column widths** can be adjusted by dragging the vertical lines between column headings.
- **Sorting:** Click a column heading to sort by that column.
- **Selecting rows:** Click to select; Shift+click for a range; Ctrl+click for individual rows. Press Delete/Backspace to remove selected rows.

### Getting summary statistics

From the Results table, use **Results → Summarize** to add a summary row at the bottom showing the **Mean**, **Standard Deviation**, **Min**, and **Max** for every numeric column across all rows. This is the quickest way to get aggregate statistics.

For a more detailed statistical breakdown, use **Results → Distribution** to plot a histogram of any column's values, with statistics displayed.

### Saving results

| Method | How | Output format |
|---|---|---|
| **Save from Results window** | Results window → File → Save As | Tab-delimited text (.xls) or CSV (.csv) depending on extension |
| **Save as CSV** | Set extension to `.csv` in the filename, or configure in Edit → Options → Input/Output | Comma-separated values, directly importable by Excel, R, Python |
| **Copy to clipboard** | Results window → Edit → Copy All (or right-click → Copy All) | Paste directly into Excel or Google Sheets |
| **Save from a macro** | `saveAs("Results", "/path/to/results.csv");` | Automated saving in batch scripts |

**Tip:** To ensure all results save as CSV by default, go to **Edit → Options → Input/Output** and set "File extension for tables" to `.csv`.

### Clearing results

- **Results window → Results → Clear Results** or `run("Clear Results");` in a macro
- Always clear results before starting a new analysis to avoid mixing data from different experiments

### Working with results in macros

```
// Get the number of results rows
n = nResults;

// Get a value from the table
meanVal = getResult("Mean", 0);  // first row, "Mean" column

// Set a value
setResult("Label", 0, "Cell_1");

// Add a custom column
for (i = 0; i < nResults; i++) {
    raw = getResult("RawIntDen", i);
    area = getResult("Area", i);
    bg = 500;  // background value
    ctcf = raw - (area * bg);
    setResult("CTCF", i, ctcf);
}
updateResults();
```

### Corrected Total Cell Fluorescence (CTCF)

A common quantification method in fluorescence microscopy is Corrected Total Cell Fluorescence, which accounts for background:

**CTCF = Integrated Density − (Area of cell × Mean background fluorescence)**

To calculate this in FIJI:
1. Enable Area, Integrated Density, and Mean Gray Value in Set Measurements
2. Select a cell and Measure
3. Select a nearby background region (no cells) and Measure
4. In a spreadsheet: CTCF = IntDen(cell) − Area(cell) × Mean(background)

---

## 10. Plotting: Profiles, Histograms, and Time Traces

### Line profiles

**Analyze → Plot Profile** (Ctrl+K) displays a graph of pixel intensity along a line selection:

- **X-axis:** Distance along the line in calibrated units
- **Y-axis:** Pixel intensity
- For **rectangular selections**, the profile shows the column-averaged intensity (vertically averaged). Hold Alt when running to average horizontally instead.
- **Line width matters:** Set the line width (double-click the line tool) to average intensity across a band. For TIRF membrane analysis, a width of 3–5 pixels smooths noise while preserving features.

**Plot window controls:**

| Button | Action |
|---|---|
| **List** | Opens a table of X and Y values — can be copied or saved |
| **Save** | Saves the profile data as a text file |
| **Copy** | Copies the plot as an image to the clipboard |
| **Live** | Updates the plot in real time as you move the line on the image |
| **More >>** | Additional options: set range, add from clipboard, apply function |

### Histograms

**Analyze → Histogram** (H) displays the distribution of pixel intensities:

- For 8-bit images: 256 bins spanning 0–255
- For 16-bit images: bins spanning the actual data range
- The histogram window shows count, mean, standard deviation, minimum, maximum, and mode below the plot

**Histogram controls:**

| Button | Action |
|---|---|
| **List** | Table of bin values and counts |
| **Log** | Logarithmic Y-axis — useful for distinguishing small counts |
| **Live** | Updates as you modify the image or selection |

### Z-axis profiles (intensity over time)

For time-lapse data, **Image → Stacks → Plot Z-axis Profile** plots the mean intensity of the current selection across all frames:

1. Draw an ROI around the region of interest (e.g., a cell, a membrane patch)
2. Run Image → Stacks → Plot Z-axis Profile
3. The resulting plot shows time (frame number) on the X-axis and mean intensity on the Y-axis

This is the primary tool for generating intensity time traces from TIRF movies — for example, monitoring PIEZO1 intensity fluctuations at the membrane.

**Fluorescence flickering and channel activity:** Bertaccini et al. (2025) used intensity time traces of individual PIEZO1-HaloTag puncta labelled with the Ca2+-sensitive JF646-BAPTA HaloTag ligand to monitor channel gating in real time. When PIEZO1 opens, local Ca2+ influx quenches JF646-BAPTA fluorescence, producing intensity dips ("flickering") that correspond to open/closed state transitions. To extract these traces in FIJI, draw a small circular ROI (~5 pixel diameter) around a punctum, use Plot Z-axis Profile to generate the raw trace, then subtract a local background trace (from an adjacent 3x3 pixel ROI) frame-by-frame. The resulting corrected trace can be exported to Python or MATLAB for event detection (e.g., step-finding algorithms or hidden Markov modelling). Treatment with the PIEZO1 agonist Yoda1 increased both puncta density and flickering frequency, providing a built-in positive control for this assay.

**Multi-ROI time traces:** To plot multiple ROIs simultaneously across a stack:
1. Add all ROIs to the ROI Manager
2. Select them all in the manager (Ctrl+A)
3. Click **More >> → Multi Measure**
4. Check "Measure all slices" and "One row per slice"
5. The Results table now contains one row per frame with a column for each ROI's mean intensity

### Dynamic Profiler plugin

The **Dynamic Profiler** plugin (Plugins → Dynamic Profiler) creates a live-updating profile plot that follows the line selection as you move it. This is extremely useful for interactively exploring intensity distributions across membranes or other structures.

### Creating custom plots

FIJI includes a built-in plotting API accessible from macros:

```
// Create a simple plot from arrays
x = newArray(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
y = newArray(10, 25, 45, 30, 55, 40, 35, 60, 50, 70);
Plot.create("My Plot", "Time (s)", "Intensity (AU)");
Plot.setColor("blue");
Plot.add("line", x, y);
Plot.setLimitsToFit();
Plot.show();
```

---

## 11. Image Processing Essentials

### Background subtraction

**Process → Subtract Background** uses the **rolling ball algorithm** (or its faster sliding paraboloid approximation) to estimate and remove uneven background:

- **Rolling ball radius:** Must be at least as large as the largest foreground feature. For single-molecule TIRF data with PSFs of 3–5 pixel radius, use **15–50 pixels**. For uneven TIRF illumination, use larger radii (50–100 pixels).
- **Sliding paraboloid:** Leave checked for the faster, improved algorithm.
- **Create background:** Check this to preview the estimated background *without* subtracting it. Inspect the result before committing.
- **Light background:** Check only if objects are dark on a bright background (the opposite of fluorescence microscopy).

An effective alternative for SMLM data is **temporal median subtraction**: compute the median projection (Image → Stacks → Z Project → Median) and subtract it from each frame using Process → Image Calculator. This removes static background while preserving transient single-molecule events.

### Gaussian blur

**Process → Filters → Gaussian Blur** smooths noise with a Gaussian kernel:

- **Sigma 0.5–1.0 pixels:** Gentle noise reduction, preserving single-molecule spots
- **Sigma 1.0–2.0 pixels:** Moderate smoothing for visualization of puncta
- **Sigma 3.0+ pixels:** Heavy smoothing — appropriate for generating illumination correction images

### Median filter

**Process → Filters → Median** replaces each pixel with the median of its neighbourhood:

- **Radius 1:** Excellent for removing single hot pixels (common in EMCCD cameras) without blurring edges
- **Radius 2:** Moderate noise reduction

### Removing outlier pixels

**Process → Noise → Remove Outliers** specifically targets pixels deviating from the local median by more than a threshold:

- **Radius:** Size of the local neighbourhood (use 2–3 for hot pixel removal)
- **Threshold:** How far from the median a pixel must be to be replaced (set based on your noise level; 50 is a reasonable starting point for 16-bit data)
- **Which outliers:** Bright (hot pixels) or Dark (dead pixels)

### FFT bandpass filter

**Process → FFT → Bandpass Filter** operates in the frequency domain, simultaneously removing low-frequency background and high-frequency noise:

- **Filter large structures down to:** Set to 40–100 pixels to remove uneven TIRF illumination
- **Filter small structures up to:** Set to 2–5 pixels to remove noise
- **Suppress stripes:** Set to "None" unless striping artefacts are present

### Image Calculator

**Process → Image Calculator** performs pixel-by-pixel arithmetic between two images:

| Operation | Use case |
|---|---|
| Subtract | Subtract a background image or pre-treatment frame |
| Divide | Ratiometric imaging (channel A / channel B) |
| Multiply | Apply a binary mask to isolate a region |
| AND, OR, XOR | Combine binary masks from different channels |

Check "Create new window" to preserve the originals. Check "32-bit (float) result" to avoid clipping when subtracting.

### Thresholding

**Image → Adjust → Threshold** (Ctrl+Shift+T) segments images into foreground and background:

1. Open the threshold dialog
2. Adjust the lower and upper bounds manually, or select an automatic method from the dropdown
3. Common auto-threshold methods for TIRF data:
   - **Otsu:** Minimises intra-class variance; good for bimodal intensity distributions
   - **Triangle:** Works well when the object (bright) peak is much smaller than the background peak — typical for sparse TIRF puncta
   - **Li:** Minimum cross-entropy; good for dim signals
   - **Default (IsoData):** Iterative method; a reliable starting point
4. Click **Apply** to convert to a binary image (0 and 255)

**Dark background:** Ensure "Dark background" is checked for fluorescence images.

After thresholding, apply **Process → Binary → Watershed** to separate touching objects before running Analyze Particles.

---

## 12. Stack Operations for Time-Series and Z-Stacks

### Z-Projection

**Image → Stacks → Z Project** collapses a stack along the Z or time axis:

| Projection type | Description | TIRF use case |
|---|---|---|
| **Max Intensity** | Maximum value at each pixel across all frames | Visualise cumulative PIEZO1 puncta positions across a recording; shows all binding/unbinding events |
| **Average Intensity** | Mean value at each pixel | Steady-state membrane labelling; reduces noise by √n |
| **Sum Slices** | Sum of pixel values across frames | Quantitative total fluorescence per position |
| **Standard Deviation** | Pixel-by-pixel standard deviation across frames | **Highlights dynamic regions** — exocytosis, endocytosis, and binding/unbinding sites appear bright; static areas appear dark |
| **Median** | Median value at each pixel | Robust background estimation for subtraction |
| **Min Intensity** | Minimum value at each pixel | Identifies pixels that are always bright (persistent structures) |

Specify the start and stop slices to project a subset of the stack. For large datasets, projecting subsets (e.g., 100 frames at a time) can reveal temporal changes.

### Reslice and kymographs

A **kymograph** shows space (X-axis) versus time (Y-axis) for a line drawn across a structure. To create one:

1. Draw a line ROI along the structure of interest (e.g., across a membrane)
2. Set the line width (double-click the line tool) to 3–5 pixels for better signal-to-noise
3. Run **Image → Stacks → Reslice** (shortcut: `/`)
4. In the resulting image: stationary particles appear as vertical lines, moving particles as diagonal lines (slope = velocity), and binding/unbinding events as sudden appearances and disappearances

### Temporal Color Code

**Image → Hyperstacks → Temporal-Color Code** assigns LUT colours to different time points, producing a single composite image where colour encodes when events occurred. Useful for publication figures showing PIEZO1 dynamics over time.

### Concatenate and substack

- **Image → Stacks → Concatenate:** Join multiple stacks end-to-end (e.g., before and after treatment)
- **Image → Stacks → Tools → Make Substack:** Extract a range of slices (e.g., frames 100–200) as a new stack

### Deinterleave

For multi-channel time-lapse data stored as interleaved frames (channel 1 frame 1, channel 2 frame 1, channel 1 frame 2, ...):

**Image → Stacks → Tools → Deinterleave:** Separates interleaved channels into individual stacks. Enter the number of channels.

---

## 13. Multi-Channel Images and Composites

### Hyperstacks

FIJI represents multi-dimensional data as **hyperstacks** with up to five dimensions: X, Y, Z (slices), C (channels), and T (frames). The hyperstack window shows separate sliders for each dimension.

Convert a simple stack to a hyperstack via **Image → Hyperstacks → Stack to Hyperstack** — specify the number of channels, slices, and frames.

### Composite mode

For multi-channel images, use **Image → Color → Channels Tool** (Ctrl+Shift+Z) to control display:

- **Composite:** All channels overlaid simultaneously (the standard for publication)
- **Color:** Single channel displayed with its assigned LUT
- **Grayscale:** Single channel in grey

Toggle individual channels on/off using the checkboxes or keyboard shortcuts C1–C7.

### Splitting and merging channels

- **Image → Color → Split Channels:** Separates a multi-channel image into individual single-channel windows
- **Image → Color → Merge Channels:** Combines individual images into a single composite. Assign each image to a colour channel (C1=red, C2=green, C3=blue, etc.)

### Adjusting individual channel display

With a composite image active:
1. Select the channel using the C slider or Channels Tool
2. Open Brightness/Contrast (Ctrl+Shift+C)
3. Adjust the display range for that channel only
4. Switch to the next channel and repeat

Each channel has independent display settings while the data remains unmodified.

### Multi-ligand HaloTag imaging

When using HaloTag fusions with spectrally distinct Janelia Fluor ligands, each ligand is imaged in a separate channel. Bertaccini et al. (2025) labelled PIEZO1-HaloTag hiPSCs with JF549, JF635, and JF646 ligands at various concentrations to achieve sparse single-molecule labelling for TIRF-SMLM, or denser labelling for diffraction-limited tracking. To display these in FIJI, merge the channels (Image → Color → Merge Channels) and assign appropriate LUTs — for example, Red for JF549 (excitation ~549 nm), Magenta or Far Red for JF635/JF646 (excitation ~635/646 nm). Adjust Brightness/Contrast independently per channel, since single-molecule channels will have very different intensity ranges from diffraction-limited channels. For dual-colour experiments combining a structural HaloTag ligand (e.g., JF549) with the Ca2+-sensitive JF646-BAPTA ligand, the composite view lets you simultaneously visualise PIEZO1 localisation and channel activity.

---

## 14. Saving Images and Creating Figures

### Scale bars

Add scale bars via **Analyze → Tools → Scale Bar**:

- **Width:** 5 or 10 µm for typical TIRF cell images; 1 or 2 µm for zoomed super-resolution panels
- **Height:** 3–5 pixels for publication
- **Location:** Lower right is conventional
- **Overlay:** Creates a non-destructive overlay (recommended). To make it permanent, use Image → Overlay → Flatten.
- **Label all slices:** Adds the scale bar to every frame of a stack

### Timestamps

For time-lapse data, add timestamps via **Image → Stacks → Time Stamper** or the Time Stamper plugin. Enter the frame interval, starting time, and position.

### Creating montages

**Image → Stacks → Make Montage** arranges stack frames in a grid:

1. Choose the number of columns and rows
2. Set the scale factor (1.0 = full size; 0.5 = half size)
3. Set the first and last slice, and the increment
4. Optionally add a border width between panels

### Flattening overlays for export

Before saving images with ROIs, scale bars, or annotations for use in other programs:

**Image → Overlay → Flatten** creates an RGB copy with all overlays burned into the pixels. This is necessary because overlay information is only preserved within FIJI. The original image is unchanged.

### Recommended figure preparation workflow

1. Adjust display (B&C) for each channel
2. Add scale bar as an overlay
3. Add any ROI outlines as overlays (Edit → Selection → Add to Overlay)
4. Flatten (Image → Overlay → Flatten)
5. Save as TIFF (for archiving with full quality) and PNG (for insertion into documents/presentations)

---

## 15. thunderSTORM Overview and Installation

### What is thunderSTORM?

**thunderSTORM** is an open-source ImageJ plugin for automated processing, analysis, and visualisation of single-molecule localisation microscopy (SMLM) data from PALM, STORM, and dSTORM experiments. It was developed by Martin Ovesný, Pavel Křížek, Josef Borkovec, Zdeněk Švindrych, and Guy M. Hagen at the Institute of Cellular Biology and Pathology, First Faculty of Medicine, Charles University in Prague.

**Citation:** Ovesný M, Křížek P, Borkovec J, Švindrych Z, Hagen GM. "ThunderSTORM: a comprehensive ImageJ plug-in for PALM and STORM data analysis and super-resolution imaging." *Bioinformatics* 30(16):2389–2390 (2014). DOI: 10.1093/bioinformatics/btu202.

The software has been cited over 1,300 times and ranked among the top performers in SMLM software benchmarks, achieving the highest F1 score (best precision-recall balance) against QuickPALM and rapidSTORM on the "Tubulins I" challenge dataset. It is licensed under GNU GPLv3.

### Installation

1. Download `Thunder_STORM.jar` from https://github.com/zitmen/thunderstorm/releases
2. **Rename** the file to `Thunder_STORM.jar` (the underscore is mandatory for ImageJ plugin recognition)
3. Copy to FIJI's `plugins/` folder
4. Restart FIJI
5. Verify: a **ThunderSTORM** submenu should appear under the Plugins menu

For large datasets, allocate at least 16 GB RAM (Edit → Options → Memory & Threads) and load data as virtual stacks. Set processing threads equal to CPU core count.

---

## 16. Camera Setup and Calibration

thunderSTORM works in physical units (photons and nanometres), so accurate camera calibration is essential. Configure via the Camera Setup section of the Run Analysis dialog:

| Parameter | Description | How to determine |
|---|---|---|
| **Pixel size [nm]** | Effective pixel size in sample plane = camera pixel pitch ÷ total magnification | Camera spec sheet + objective magnification; verify with stage micrometer |
| **Photoelectrons per A/D count** | Conversion gain (electrons/count) | Camera specification or photon transfer curve measurement |
| **Base level [A/D counts]** | Digitiser offset (baseline at zero signal) | Camera spec sheet, or mean of dark frames |
| **EM gain** | Electron-multiplying gain (set to 1 for CCD/sCMOS) | Camera settings during acquisition |
| **Readout noise [e⁻]** | RMS readout noise in electrons | Camera specification sheet |

Incorrect camera parameters directly compromise MLE fitting accuracy and localization precision estimates. For EMCCD cameras, the excess noise factor (~√2) effectively doubles the shot noise variance; thunderSTORM models this internally via a Gamma distribution.

**Quick calibration check:** Take a series of dark frames (shutter closed) and flat-field illumination frames (uniform, moderate intensity). The mean of dark frames gives the base level. The slope of variance versus mean intensity gives the conversion gain.

**Example — PIEZO1-HaloTag TIRF setup (Bertaccini et al. 2025):** The Olympus IX83 system with a PLAPO 60x/1.45 or 60x/1.50 oil objective produces an effective pixel size of ~108--109 nm in the sample plane. Enter `108` (or `109`) in the Pixel size field. Obtain the remaining parameters (conversion gain, base level, EM gain, readout noise) from your camera specification sheet. For sCMOS cameras commonly paired with this system, EM gain should be set to 1. TIRF acquisitions in this study ranged from 10 to 500 fps depending on the experiment (slower rates for tracking, faster for single-molecule localisation), so also verify that the frame interval in Image → Properties matches the actual acquisition rate.

---

## 17. Image Filtering Algorithms

Filtering enhances molecular signals and suppresses noise before detection. thunderSTORM provides seven filter options plus a no-filter bypass:

### Wavelet filter (B-spline) — default and recommended

The *à trous* (undecimated) wavelet algorithm uses B-spline wavelets to decompose the image into spatial frequency bands. The second wavelet level F₂ acts as a band-pass filter that enhances features at the spatial scale of single-molecule PSFs (FWHM 2–5 pixels) while rejecting both high-frequency noise (contained in F₁) and low-frequency background. The standard deviation of the first wavelet level, `std(Wave.F1)`, serves as a robust noise estimate for threshold calculations.

**Parameters:** Order (default: 3), Scale (default: 2.0). Leave at defaults for most TIRF-SMLM applications.

### Difference of Gaussians (DoG)

Computes DoG = G(σ₁) − G(σ₂), where G(σ) denotes Gaussian blur with standard deviation σ. The smaller σ₁ (~1.0 pixel) passes molecule-scale features while σ₂ (~1.6 × σ₁) defines the low-frequency cutoff. This approximates a Laplacian of Gaussian, which is optimal for blob detection.

### Other filters

- **Lowered Gaussian:** Subtracts a constant background estimate from a Gaussian-blurred image
- **Moving average, Median, Box (uniform):** Simple smoothing — provide only low-pass filtering without background rejection
- **Difference of Averaging Filters:** DoG concept using box filters for faster computation
- **No filter:** Passes raw frames directly — suitable only for pre-processed or very high-SNR data

**Recommendation:** Use the Wavelet B-spline filter (order 3, scale 2) as the default for TIRF-SMLM. Band-pass filters consistently outperform low-pass-only filters.

---

## 18. Molecule Detection Methods

After filtering, candidate molecule positions are identified at pixel resolution. Three detection methods are available:

### Local maximum (default, recommended)

Identifies pixels brighter than all connected neighbours. thunderSTORM allows **mathematical expressions** for thresholds — for example, `1*std(Wave.F1)` sets the threshold to one standard deviation of the first wavelet level, providing a systematic, image-adaptive criterion.

**Parameters:**
- **Threshold:** Typical range 0.5–2 × std(Wave.F1). Lower values detect more molecules but increase false positives.
- **Connectivity:** 4-neighbourhood (horizontal/vertical only) or 8-neighbourhood (including diagonals). **8-connected** detection yields the highest F1-score in benchmarks.

### Centroid of connected components

Thresholds the filtered image, identifies connected blobs, and computes each blob's intensity-weighted centroid. Handles extended or partially overlapping spots better than local maximum detection.

### Non-maximum suppression

Finds local maxima within a user-specified radius, suppressing all non-maximal pixels. The radius parameter enforces a minimum separation between detected molecules.

---

## 19. Sub-Pixel Localization: PSF Models and Fitting

Sub-pixel localization refines coarse pixel-level positions to nanometre precision by fitting a PSF model to the image data around each detected candidate. This is the core step enabling super-resolution.

### PSF models

**Integrated Gaussian (recommended).** Rather than evaluating the Gaussian at pixel centres, this model integrates the continuous PSF over each pixel's area, properly accounting for the finite pixel size. Fitted parameters: position (x₀, y₀), PSF width (σ), total photon count (N), and per-pixel background (b). This is the most accurate model for 2D SMLM.

**Elliptical Gaussian** extends the integrated model with separate σₓ and σᵧ, enabling 3D localization via astigmatism. A cylindrical lens introduces asymmetry: molecules above the focal plane appear elongated in one axis, below in the other. Calibrate via Plugins → ThunderSTORM → 3D calibration using fluorescent bead z-stacks.

**Symmetric Gaussian (point-sampled)** evaluates the Gaussian at pixel centres without integration. Computationally faster but less accurate.

**Radial symmetry** (Parthasarathy 2012) exploits PSF radial symmetry using gradient analysis — extremely fast with moderate accuracy.

**Centroid:** Intensity-weighted centre of mass — fast but biased.

### Fitting methods

**Least Squares (LSQ)** minimises Σᵢ(kᵢ − μᵢ)². Simple, requires no camera calibration, but discards approximately one-third of the available information (Mortensen et al., 2010, *Nature Methods*).

**Weighted Least Squares (WLSQ)** uses weights wᵢ = 1/μᵢ, approximating Poisson variance weighting. Better than LSQ when noise varies across pixels.

**Maximum Likelihood Estimation (MLE)** assumes Poisson-distributed photon counts and achieves the **Cramér-Rao Lower Bound** — the theoretical minimum variance of any unbiased estimator. MLE is the most accurate method, especially at low photon counts, but **requires correct camera parameters**. With incorrect calibration, MLE can perform worse than LSQ.

### Key fitting parameters

- **Fitting radius:** Set to approximately 3 × σ pixels. For typical TIRF with σ ≈ 1.0–1.5 pixels, use 3–5 pixels.
- **Initial sigma:** Estimate as σ ≈ 0.21 × λ/NA. For dSTORM (λ = 680 nm, NA = 1.49): σ ≈ 96 nm ≈ 1.0 pixel at 100 nm/pixel.

### Sigma as a quality metric

The fitted PSF width (sigma) is one of the most informative quality metrics for localisations. True single-molecule spots have sigma values tightly clustered around the expected diffraction-limited PSF width for the optical system. Localisations with anomalously large sigma often correspond to autofluorescent cellular debris, out-of-focus molecules, or overlapping emitters rather than genuine single-molecule events. Bertaccini et al. (2025) exploited this by applying a **sigma-based filter to remove autofluorescent spots**: localisations with sigma > 280 nm were discarded, effectively separating bona fide PIEZO1-HaloTag puncta from broader autofluorescent features. After fitting, plot the sigma histogram (see Section 20) and look for a clean, narrow peak; a long tail toward high sigma values indicates contamination that should be filtered out.

### Multiple-emitter fitting (MFA)

For high-density data with overlapping PSFs, MFA fits 1–N models per region and uses statistical model selection to determine the optimal number. Approximately 20× slower than single-emitter fitting.

---

## 20. Post-Processing Pipeline

thunderSTORM's recommended order: remove duplicates (if MFA used) → filtering → Z-stage offset (if applicable) → drift correction → merging.

### Filtering localizations

Remove outliers using mathematical expressions on any column:

- `sigma>50 & sigma<300` — retains molecules with reasonable PSF width
- `intensity>100` — minimum brightness
- `uncertainty<50` — good localization precision
- Combined: `sigma>50 & sigma<300 & intensity>100 & uncertainty<50`
- Circular ROI: `(x-10000)^2 + (y-10000)^2 < 2000^2`

### Drift correction

**Cross-correlation method:** Divides the acquisition into N temporal bins, reconstructs a super-resolution image from each, and computes cross-correlation between successive images. Parameters: number of bins (5–20), magnification (5–10).

**Fiducial marker method:** Identifies molecules in prolonged "on" states and tracks their positions. Parameters: max distance, min marker visibility ratio, trajectory smoothing factor.

### Merging repeated localizations

Combines molecules reappearing within a maximum distance across consecutive frames (allowing for "off-gap" frames). Parameters: max distance (~1 pixel width in nm), max off-gap frames (2–5).

### Density filtering

Removes isolated localizations by discarding molecules with fewer than a minimum number of neighbours within a specified radius.

---

## 21. Rendering and Visualization

thunderSTORM provides four rendering methods:

| Method | Description | Speed | Best for |
|---|---|---|---|
| **Scatter plot** | Single point per localization | Fastest | Quick preview |
| **2D histogram** | Bins localizations on a high-resolution grid | Fast | Routine visualization |
| **Average shifted histograms (ASH)** | Multiple shifted histograms averaged | Fast | **Recommended for routine use** |
| **Gaussian rendering** | Each localization drawn as a Gaussian with width = uncertainty | Slowest | Publication figures encoding per-molecule precision |

The rendered image pixel size equals camera pixel size ÷ magnification factor (e.g., 100 nm camera pixel with 10× magnification = 10 nm rendered pixel).

### Export formats

Localizations export to CSV, XLS, XML, YAML, JSON, Protocol Buffer, and Tagged Spot File. Standard CSV columns: `id`, `frame`, `x [nm]`, `y [nm]`, `sigma [nm]`, `intensity [photon]`, `offset [photon]`, `bkgstd [photon]`, `uncertainty [nm]`.

---

## 22. thunderSTORM Settings for PIEZO1 TIRF-SMLM

PIEZO1 is a trimeric mechanosensitive ion channel (~23 nm diameter, ~289 kDa per subunit) that forms dome-shaped invaginations in the plasma membrane. Its location at the cell–coverslip interface makes it ideal for TIRF imaging.

### Labelling strategies

- **PIEZO1-HaloTag** knock-in with Janelia Fluor dyes (JF646) — gold standard for live-cell SMLM
- **Immunolabelling** with anti-PIEZO1 antibodies and Alexa Fluor 647 for fixed-cell dSTORM
- **Fluorescent protein fusions** (GFP, tdTomato) for diffraction-limited tracking

### Recommended parameters

| Step | Setting | Value |
|---|---|---|
| Camera | Pixel size | 100–160 nm |
| Camera | EM gain, conversion gain, offset | From camera specifications |
| Filter | Type | Wavelet B-spline, order 3, scale 2 |
| Detection | Method | Local maximum, 8-connected |
| Detection | Threshold | `1*std(Wave.F1)` (use 0.5× for sparse labelling) |
| Fitting | PSF model | Integrated Gaussian |
| Fitting | Initial sigma | 1.0–1.5 pixels |
| Fitting | Fitting radius | 3–5 pixels |
| Fitting | Method | MLE for fixed cells; LSQ for live cells |
| Post-processing | Sigma filter | 50–300 nm |
| Post-processing | Intensity filter | >100 photons |
| Post-processing | Uncertainty filter | <50 nm |
| Post-processing | Drift correction | Cross-correlation, 10 bins, magnification 5 |
| Post-processing | Merge distance | ~1 pixel width in nm |
| Post-processing | Merge gap frames | 2–5 |
| Rendering | Method | ASH at 10 nm pixels (routine); Gaussian (publication) |

### Quality control

- Verify puncta density matches expected expression levels (~0.1–1 per µm²)
- Check sigma histogram for a single peak near expected PSF width
- Compare reconstructed image against diffraction-limited average projection

---

## 23. TrackMate for Single-Particle Tracking

**TrackMate** is FIJI's premier particle tracking plugin, developed by Jean-Yves Tinevez (Institut Pasteur). Citation: Tinevez et al., *Methods* 115:80–90 (2017) and Ershov et al., *Nature Methods* 19:829–832 (2022).

For TIRF tracking of PIEZO1:
- **Detector:** Laplacian of Gaussian (LoG), estimated diameter 250–400 nm, threshold Quality to reject noise
- **Tracker:** Simple LAP tracker with max linking distance 500 nm–1 µm, max frame gap 1–3 frames
- **Output:** Spot coordinates, track statistics (duration, displacement, velocity, confinement ratio), trajectory visualizations

Access via **Plugins → Tracking → TrackMate**.

---

## 24. Drift Correction with StackReg and TurboReg

**StackReg** (Philippe Thévenaz, EPFL) aligns stack frames using intensity-based registration:

1. Install: Download from http://bigwww.epfl.ch/thevenaz/stackreg/ and place JARs in the plugins folder
2. Run: **Plugins → Registration → StackReg**
3. For TIRF drift: select **Rigid Body** (translation + rotation) or **Translation** (lateral drift only)

StackReg aligns each slice to the previous one sequentially. For long acquisitions, cumulative error can build up; in that case, use TurboReg with a reference frame or thunderSTORM's built-in drift correction.

---

## 25. Additional SMLM and TIRF Plugins

### GDSC SMLM

Alex Herbert, University of Sussex. Comprehensive alternative to thunderSTORM with PeakFit engine. Install via "GDSC SMLM2" update site. Includes camera calibration tools, simulation engines, and cluster analysis.

### NanoJ-SRRF

Ricardo Henriques lab. Achieves super-resolution from standard fluorophores (e.g., GFP) without photoswitching by analyzing temporal fluctuations. Processes groups of ~100 raw frames for 50–150 nm resolution. Valuable for live-cell TIRF imaging of PIEZO1-GFP. Install via "NanoJ-Core" and "NanoJ-SRRF" update sites.

### Coloc 2

**Analyze → Colocalization → Coloc 2** computes Pearson's correlation, Manders' coefficients (M1, M2), and Costes significance tests for dual-colour TIRF experiments.

---

## 26. The Macro Recorder

The **Macro Recorder** is the fastest way to learn the macro language and automate workflows.

### Using the recorder

1. Open the recorder: **Plugins → Macros → Record**
2. Perform your analysis steps using the GUI — every command is captured as macro code
3. Review the recorded code in the Recorder window
4. Click **Create** to open the code in the Script Editor for editing
5. Save with a `.ijm` extension

### Example: recording a background subtraction and measurement

Perform these steps with the Recorder running:

1. Open an image
2. Process → Subtract Background (radius 50)
3. Analyze → Set Measurements (area, mean, integrated density)
4. Draw an ROI
5. Analyze → Measure

The Recorder produces:

```
open("/path/to/image.tif");
run("Subtract Background...", "rolling=50 sliding");
run("Set Measurements...", "area mean integrated display redirect=None decimal=3");
makeRectangle(100, 100, 50, 50);
run("Measure");
```

This recorded code can be edited and reused on other images.

---

## 27. ImageJ Macro Language Essentials

The ImageJ macro language uses C-like syntax with typeless variables. Here are the key concepts:

### Variables and data types

```
// Variables are typeless — they hold numbers or strings
x = 42;
name = "PIEZO1";
pi = 3.14159;

// String concatenation uses +
message = "Analysing " + name + " with value " + x;
print(message);
```

### Arrays

```
// Create arrays
values = newArray(10, 20, 30, 40, 50);
names = newArray("GFP", "RFP", "DAPI");

// Access elements (0-indexed)
first = values[0];    // 10
print(names[1]);      // "RFP"

// Array length
n = values.length;    // 5
```

### Control flow

```
// If/else
if (mean > threshold) {
    print("Signal detected");
} else {
    print("Below threshold");
}

// For loops
for (i = 0; i < 10; i++) {
    print("Frame " + i);
}

// While loops
i = 0;
while (i < nSlices) {
    setSlice(i + 1);
    run("Measure");
    i++;
}
```

### Functions

```
// Define a function
function calculateCTCF(intden, area, bgMean) {
    return intden - (area * bgMean);
}

// Use it
ctcf = calculateCTCF(50000, 200, 120);
print("CTCF = " + ctcf);
```

### User dialogs

```
// Simple input
radius = getNumber("Enter rolling ball radius:", 50);

// Complex dialogs
Dialog.create("Analysis Parameters");
Dialog.addNumber("Sigma:", 1.5);
Dialog.addChoice("Method:", newArray("Otsu", "Triangle", "Li"));
Dialog.addCheckbox("Subtract background", true);
Dialog.addDirectory("Output folder:", "");
Dialog.show();

sigma = Dialog.getNumber();
method = Dialog.getChoice();
doBgSub = Dialog.getCheckbox();
outDir = Dialog.getString();
```

### Key built-in functions

| Function | Description |
|---|---|
| `run("Command", "params")` | Execute any ImageJ command |
| `open(path)` | Open a file |
| `save(path)` or `saveAs("Tiff", path)` | Save the active image |
| `close()` | Close the active image |
| `close("*")` | Close all images |
| `getTitle()` | Get the active image title |
| `nSlices` | Number of slices in the active stack |
| `nResults` | Number of rows in the Results table |
| `getResult("Column", row)` | Get a value from the Results table |
| `setResult("Column", row, value)` | Set or add a value in the Results table |
| `getDirectory("Choose...")` | File chooser dialog for directories |
| `getFileList(dir)` | Array of filenames in a directory |
| `print(text)` | Print to the Log window |
| `setBatchMode(true/false)` | Hide/show image windows during processing (much faster) |
| `makeRectangle(x, y, w, h)` | Create a rectangular selection |
| `makeLine(x1, y1, x2, y2)` | Create a line selection |
| `roiManager("Add")` | Add current selection to the ROI Manager |
| `roiManager("Measure")` | Measure all ROIs |
| `updateResults()` | Refresh the Results table display |
| `selectWindow(title)` | Bring a specific window to the front |
| `waitForUser("Message")` | Pause and display a message; wait for OK |

---

## 28. Batch Processing

### The basic batch processing pattern

```
// Get input and output directories
input = getDirectory("Choose input folder");
output = getDirectory("Choose output folder");

// Get list of files
list = getFileList(input);

// Enable batch mode (hides windows, much faster)
setBatchMode(true);

// Process each file
for (i = 0; i < list.length; i++) {
    if (endsWith(list[i], ".tif")) {
        processFile(input, output, list[i]);
    }
}

setBatchMode(false);
print("Done! Processed " + list.length + " files.");

function processFile(inputDir, outputDir, filename) {
    open(inputDir + filename);
    
    // --- Your analysis steps go here ---
    
    // Save and close
    saveAs("Tiff", outputDir + "processed_" + filename);
    close();
}
```

### Using the built-in Batch Processor

FIJI includes a simpler batch interface at **Process → Batch → Macro**:

1. Select an **Input** directory
2. Select an **Output** directory
3. Choose an **Output format**
4. Write or paste macro code that processes the active image
5. Click **Process**

The system automatically opens each file, runs your code, saves the result, and closes the image.

### Recursive folder processing

To process files in subdirectories:

```
input = getDirectory("Choose input folder");
output = getDirectory("Choose output folder");
setBatchMode(true);
processFolder(input);
setBatchMode(false);

function processFolder(dir) {
    list = getFileList(dir);
    for (i = 0; i < list.length; i++) {
        if (endsWith(list[i], "/")) {
            // It's a subfolder — recurse into it
            processFolder(dir + list[i]);
        } else if (endsWith(list[i], ".tif")) {
            processFile(dir, list[i]);
        }
    }
}

function processFile(dir, filename) {
    open(dir + filename);
    // Your processing here
    run("Measure");
    close();
}
```

---

## 29. Example Macros for TIRF Workflows

### Macro 1: Batch background subtraction and max projection

```
/*
 * Batch Background Subtraction and Max Projection
 * 
 * For each TIFF stack in the input folder:
 * 1. Subtracts background (rolling ball)
 * 2. Creates a max intensity projection
 * 3. Saves the projection to the output folder
 */

input = getDirectory("Input folder with TIFF stacks");
output = getDirectory("Output folder for projections");

// Parameters
rollingBallRadius = 50;

list = getFileList(input);
setBatchMode(true);

for (i = 0; i < list.length; i++) {
    if (endsWith(list[i], ".tif")) {
        showProgress(i, list.length);
        open(input + list[i]);
        
        // Subtract background from all frames
        run("Subtract Background...", "rolling=" + rollingBallRadius + " sliding stack");
        
        // Max intensity projection
        run("Z Project...", "projection=[Max Intensity]");
        
        // Save the projection
        saveAs("Tiff", output + "MAX_" + list[i]);
        
        // Clean up
        close();  // close projection
        close();  // close original stack
    }
}

setBatchMode(false);
print("\\Clear");
print("Done! Processed " + list.length + " files.");
```

### Macro 2: Measure mean intensity in ROIs across a time-lapse

```
/*
 * Time-Lapse ROI Intensity Measurement
 *
 * Measures mean intensity across all frames for multiple ROIs.
 * Saves results as CSV with one row per frame and one column per ROI.
 * Requires: image stack already open, ROIs in the ROI Manager.
 */

if (nSlices == 1) exit("This macro requires a stack (time-lapse).");
if (roiManager("count") == 0) exit("Add ROIs to the ROI Manager first.");

run("Set Measurements...", "mean stack display redirect=None decimal=3");
run("Clear Results");

// Measure all ROIs across all slices
roiManager("Deselect");
roiManager("multi-measure measure_all one append");

// Save results
outputPath = getDirectory("Save results to") + getTitle() + "_ROI_traces.csv";
saveAs("Results", outputPath);
print("Saved results to: " + outputPath);
```

### Macro 3: Automated puncta counting across a folder

```
/*
 * Batch Puncta Counter
 *
 * For each image in the input folder:
 * 1. Subtracts background
 * 2. Applies Gaussian blur
 * 3. Auto-thresholds (Triangle method, good for sparse puncta)
 * 4. Runs Analyze Particles to count and measure puncta
 * 5. Saves overlay image and appends measurements to results
 *
 * Adjust size and circularity parameters for your puncta.
 */

#@ File (label="Input directory", style="directory") input
#@ File (label="Output directory", style="directory") output
#@ Float (label="Gaussian sigma (pixels)", value=1.0) sigma
#@ Float (label="Min puncta area (um^2)", value=0.05) minArea
#@ Float (label="Max puncta area (um^2)", value=5.0) maxArea
#@ String (label="Threshold method", choices={"Triangle","Otsu","Li","Default"}) threshMethod

run("Set Measurements...", "area mean integrated centroid shape stack display redirect=None decimal=3");
run("Clear Results");
setBatchMode(true);

list = getFileList(input);
totalPuncta = 0;

for (i = 0; i < list.length; i++) {
    if (endsWith(list[i], ".tif")) {
        showProgress(i, list.length);
        open(input + File.separator + list[i]);
        title = getTitle();
        
        // Pre-process
        run("Duplicate...", " ");
        run("Subtract Background...", "rolling=50 sliding");
        run("Gaussian Blur...", "sigma=" + sigma);
        
        // Threshold
        setAutoThreshold(threshMethod + " dark");
        run("Convert to Mask");
        run("Watershed");
        
        // Count and measure
        run("Analyze Particles...", "size=" + minArea + "-" + maxArea + " circularity=0.3-1.00 show=Overlay display exclude add");
        
        count = roiManager("count");
        totalPuncta += count;
        print(title + ": " + count + " puncta");
        
        // Save overlay image
        selectWindow(title);
        run("Flatten");
        saveAs("Tiff", output + File.separator + "counted_" + list[i]);
        
        // Clean up
        close();  // flattened
        close();  // mask
        close();  // original
        roiManager("reset");
    }
}

setBatchMode(false);
saveAs("Results", output + File.separator + "all_puncta_measurements.csv");
print("\\Clear");
print("=== Batch Puncta Counting Complete ===");
print("Total images: " + list.length);
print("Total puncta: " + totalPuncta);
```

### Macro 4: Line profile across a membrane for multiple frames

```
/*
 * Membrane Line Profile Extraction
 *
 * Draws a line profile across a user-defined membrane ROI
 * for each frame in a time-lapse stack.
 * Outputs a 2D array (frames x distance) as an image.
 *
 * How to use:
 * 1. Open your time-lapse stack
 * 2. Draw a line across the membrane of interest
 * 3. Set line width to 3-5 pixels for averaging (double-click line tool)
 * 4. Run this macro
 */

if (selectionType() != 5 && selectionType() != 6) {
    exit("Please draw a line selection first.");
}

// Get the line profile for each frame
nFrames = nSlices;
getLine(x1, y1, x2, y2, lineWidth);

// Get profile length from the first frame
setSlice(1);
profile = getProfile();
profileLength = profile.length;

// Create an image to hold all profiles (kymograph-like)
newImage("Membrane Profiles", "32-bit black", profileLength, nFrames, 1);
profileWindow = getTitle();

for (t = 0; t < nFrames; t++) {
    // Select the original stack and go to frame t
    selectWindow(getInfo("window.title"));
    setSlice(t + 1);
    makeLine(x1, y1, x2, y2);
    profile = getProfile();
    
    // Write profile into the result image
    selectWindow(profileWindow);
    for (p = 0; p < profileLength; p++) {
        setPixel(p, t, profile[p]);
    }
}

selectWindow(profileWindow);
run("Enhance Contrast", "saturated=0.35");
run("Fire");
```

### Macro 5: Save individual channels with scale bars

```
/*
 * Multi-Channel Figure Preparation
 *
 * Splits a multi-channel image into individual channels,
 * adds scale bars, and saves each as a PNG for figures.
 */

title = getTitle();
outputDir = getDirectory("Save channels to");

// Get the base name without extension
dotIndex = indexOf(title, ".");
if (dotIndex > 0) baseName = substring(title, 0, dotIndex);
else baseName = title;

// Split channels
run("Split Channels");

// Process each channel
channelNames = newArray("C1-", "C2-", "C3-", "C4-");
channelLabels = newArray("GFP", "RFP", "DAPI", "BF");

for (c = 0; c < 4; c++) {
    windowName = channelNames[c] + title;
    if (isOpen(windowName)) {
        selectWindow(windowName);
        
        // Adjust display
        run("Enhance Contrast", "saturated=0.35");
        
        // Add scale bar
        run("Scale Bar...", "width=10 height=4 font=14 color=White background=None location=[Lower Right] overlay");
        
        // Flatten and save
        run("Flatten");
        saveAs("PNG", outputDir + baseName + "_" + channelLabels[c] + ".png");
        close();  // flattened
        close();  // original channel
    }
}

print("Saved individual channels to: " + outputDir);
```

### Macro 6: Automatic background ROI detection

This macro automatically finds the best rectangular region in a time-lapse stack to use as a background reference. The algorithm works by computing the maximum intensity projection (the worst-case brightness at each pixel across all frames), then scanning all candidate ROI positions to find the region where even the brightest frame has the lowest intensity. This guarantees the selected region never contains transient bright events such as single-molecule blinks or puncta.

The user specifies the ROI width and height, and the macro provides three modes of operation: (a) place the ROI on the current image, (b) place the ROI and extract a mean intensity time trace, or (c) batch-process a folder of recordings, saving the ROI location for each file.

```
/*
 * Automatic Background ROI Detector
 *
 * Finds the optimal rectangular region for background measurement in a
 * time-lapse fluorescence stack. The algorithm:
 *
 *   1. Computes the MAX intensity projection across all frames.
 *      Using the max (rather than the mean) ensures we find regions
 *      that NEVER contain bright events — a pixel could have a low
 *      temporal mean but still be hit by an occasional single-molecule
 *      blink, making it unsuitable as a stable background reference.
 *
 *   2. Scans all candidate ROI positions on the max projection at a
 *      user-defined step size (stride). For each position, the mean
 *      intensity within the ROI is computed.
 *
 *   3. The position with the lowest mean-of-max is selected. This is
 *      the region that stays dimmest across the entire recording.
 *
 *   4. Optionally, a secondary check ranks the top N candidates by
 *      their temporal standard deviation (computed from the original
 *      stack) and picks the one with the most stable intensity over
 *      time.  This is controlled by the "Verify temporal stability"
 *      checkbox and is recommended for long recordings where slow
 *      drift in illumination might affect the result.
 *
 * Three output modes:
 *   - "Place ROI" — adds the background ROI to the ROI Manager
 *   - "Place ROI and extract trace" — also generates a mean intensity
 *     time trace across all frames and saves it as a CSV file
 *   - "Batch process folder" — processes every TIFF in a folder, saves
 *     each ROI location (x, y, width, height, mean-of-max score) to a
 *     separate text file, and appends a summary line to a master CSV
 *
 * Author: George Dickinson
 * Developed for the PIEZO1 Research Group, UC Irvine
 */

// =====================================================================
// User dialog
// =====================================================================
Dialog.create("Automatic Background ROI Detector");

Dialog.addMessage("=== ROI Dimensions ===");
Dialog.addNumber("ROI width (pixels):", 20);
Dialog.addNumber("ROI height (pixels):", 20);

Dialog.addMessage("=== Search Parameters ===");
Dialog.addNumber("Scan step size (pixels):", 5);
Dialog.addNumber("Edge margin (pixels):", 10);
Dialog.addCheckbox("Verify temporal stability (slower but more robust)", true);
Dialog.addNumber("Number of candidates to verify:", 5);

Dialog.addMessage("=== Output Mode ===");
Dialog.addChoice("Mode:", newArray(
    "Place ROI on current image",
    "Place ROI and extract time trace",
    "Batch process folder"
), "Place ROI on current image");

Dialog.show();

roiW       = Dialog.getNumber();
roiH       = Dialog.getNumber();
stride     = Dialog.getNumber();
margin     = Dialog.getNumber();
doVerify   = Dialog.getCheckbox();
nCandidates = Dialog.getNumber();
mode       = Dialog.getChoice();

// =====================================================================
// Core function: find the best background ROI in the active stack
// Returns an array: [bestX, bestY, bestScore]
// =====================================================================
function findBackgroundROI(roiW, roiH, stride, margin, doVerify, nCandidates) {

    sourceTitle = getTitle();
    sourceID    = getImageID();
    W = getWidth();
    H = getHeight();
    nFrames = nSlices;

    // --- Step 1: Max intensity projection ---
    // Each pixel in the max projection holds the highest value that pixel
    // ever reached.  A region that is dim in the max projection was dim
    // in EVERY frame — the ideal background.
    run("Z Project...", "projection=[Max Intensity]");
    maxProjID = getImageID();
    maxProjTitle = getTitle();

    // --- Step 2: Scan candidate positions ---
    // We slide the ROI across the max projection in steps of 'stride'
    // pixels, measuring the mean intensity within the ROI at each position.
    // The search area is inset by 'margin' pixels from each edge to avoid
    // vignetting artefacts common at the borders of TIRF images.
    
    bestScore  = 1e30;
    bestX      = margin;
    bestY      = margin;

    // Arrays to hold top-N candidates (for optional stability check)
    candX     = newArray(nCandidates);
    candY     = newArray(nCandidates);
    candScore = newArray(nCandidates);
    for (c = 0; c < nCandidates; c++) candScore[c] = 1e30;

    xStart = margin;
    xEnd   = W - roiW - margin;
    yStart = margin;
    yEnd   = H - roiH - margin;

    if (xEnd < xStart || yEnd < yStart) {
        exit("Image too small for the specified ROI size and margin.");
    }

    selectImage(maxProjID);
    totalPositions = floor((xEnd - xStart) / stride + 1) * floor((yEnd - yStart) / stride + 1);
    posCount = 0;

    for (y = yStart; y <= yEnd; y += stride) {
        for (x = xStart; x <= xEnd; x += stride) {
            makeRectangle(x, y, roiW, roiH);
            getRawStatistics(nPix, meanVal);

            // Track the single best position
            if (meanVal < bestScore) {
                bestScore = meanVal;
                bestX = x;
                bestY = y;
            }

            // Track top-N candidates (insert into sorted list)
            // Find the worst (highest score) among current candidates
            worstIdx = 0;
            for (c = 1; c < nCandidates; c++) {
                if (candScore[c] > candScore[worstIdx]) worstIdx = c;
            }
            if (meanVal < candScore[worstIdx]) {
                candScore[worstIdx] = meanVal;
                candX[worstIdx] = x;
                candY[worstIdx] = y;
            }

            posCount++;
            if (posCount % 200 == 0) showProgress(posCount, totalPositions);
        }
    }

    // Close the max projection
    selectImage(maxProjID);
    close();

    // --- Step 3 (optional): Verify temporal stability ---
    // Among the top-N candidates, pick the one with the lowest temporal
    // standard deviation (most stable intensity over time). This guards
    // against selecting a region that is dim on average but has occasional
    // bright transients or fluctuating illumination.
    if (doVerify && nFrames > 1) {
        selectImage(sourceID);
        bestStd = 1e30;

        for (c = 0; c < nCandidates; c++) {
            if (candScore[c] >= 1e30) continue;  // unfilled slot

            // Measure mean intensity in this ROI across all frames
            intensities = newArray(nFrames);
            for (f = 1; f <= nFrames; f++) {
                setSlice(f);
                makeRectangle(candX[c], candY[c], roiW, roiH);
                getRawStatistics(nPix, meanVal);
                intensities[f - 1] = meanVal;
            }

            // Compute standard deviation of the time trace
            sum = 0;
            for (f = 0; f < nFrames; f++) sum += intensities[f];
            traceMean = sum / nFrames;

            sumSq = 0;
            for (f = 0; f < nFrames; f++) {
                diff = intensities[f] - traceMean;
                sumSq += diff * diff;
            }
            traceStd = sqrt(sumSq / nFrames);

            if (traceStd < bestStd) {
                bestStd   = traceStd;
                bestX     = candX[c];
                bestY     = candY[c];
                bestScore = candScore[c];
            }
        }
        setSlice(1);
    }

    // Return result as array
    return newArray(bestX, bestY, bestScore);
}


// =====================================================================
// Mode 1 & 2: Single image (place ROI, optionally extract trace)
// =====================================================================
if (mode != "Batch process folder") {

    if (nSlices < 2) exit("The active image must be a stack (time-lapse).");

    result = findBackgroundROI(roiW, roiH, stride, margin, doVerify, nCandidates);
    bx = result[0];
    by = result[1];
    bScore = result[2];

    // Place the ROI on the image
    makeRectangle(bx, by, roiW, roiH);
    roiManager("Add");
    nROIs = roiManager("count");
    roiManager("select", nROIs - 1);
    roiManager("Rename", "Background_auto");

    print("\\Clear");
    print("=== Automatic Background ROI ===");
    print("Position: x=" + bx + ", y=" + by);
    print("Size: " + roiW + " x " + roiH + " pixels");
    print("Max-projection mean score: " + d2s(bScore, 2));
    print("ROI added to ROI Manager as 'Background_auto'");

    // --- Mode 2: Extract and save the time trace ---
    if (mode == "Place ROI and extract time trace") {
        run("Set Measurements...", "mean stack display redirect=None decimal=3");
        run("Clear Results");

        nFrames = nSlices;
        makeRectangle(bx, by, roiW, roiH);

        for (f = 1; f <= nFrames; f++) {
            setSlice(f);
            run("Measure");
        }

        // Build a clean trace table with frame number and mean intensity
        traceX = newArray(nFrames);
        traceY = newArray(nFrames);
        for (f = 0; f < nFrames; f++) {
            traceX[f] = f + 1;
            traceY[f] = getResult("Mean", f);
        }

        // Plot the trace
        Plot.create("Background Trace — " + getTitle(),
                     "Frame", "Mean Intensity");
        Plot.setColor("blue");
        Plot.add("line", traceX, traceY);
        Plot.setLimitsToFit();
        Plot.show();

        // Save the results as CSV
        outputPath = getDirectory("Save background trace to");
        baseName = getTitle();
        dotIdx = indexOf(baseName, ".");
        if (dotIdx > 0) baseName = substring(baseName, 0, dotIdx);
        tracePath = outputPath + baseName + "_background_trace.csv";
        saveAs("Results", tracePath);
        print("Trace saved to: " + tracePath);
    }
}

// =====================================================================
// Mode 3: Batch processing
// =====================================================================
if (mode == "Batch process folder") {

    inputDir  = getDirectory("Select input folder containing TIFF stacks");
    outputDir = getDirectory("Select output folder for ROI files");

    list = getFileList(inputDir);
    setBatchMode(true);

    // Create a master summary CSV
    summaryPath = outputDir + "background_roi_summary.csv";
    summaryHeader = "Filename,ROI_X,ROI_Y,ROI_Width,ROI_Height,MaxProj_Mean_Score";
    File.saveString(summaryHeader + "\n", summaryPath);

    fileCount = 0;

    for (i = 0; i < list.length; i++) {
        if (endsWith(list[i], ".tif") || endsWith(list[i], ".tiff")) {
            showProgress(i, list.length);
            open(inputDir + list[i]);
            title = getTitle();

            if (nSlices < 2) {
                print("Skipping (not a stack): " + title);
                close();
                continue;
            }

            // Find background ROI
            result = findBackgroundROI(roiW, roiH, stride, margin,
                                       doVerify, nCandidates);
            bx = result[0];
            by = result[1];
            bScore = result[2];

            // Save ROI location to an individual text file
            baseName = title;
            dotIdx = indexOf(baseName, ".");
            if (dotIdx > 0) baseName = substring(baseName, 0, dotIdx);

            roiFilePath = outputDir + baseName + "_background_roi.txt";
            roiText  = "# Automatic Background ROI\n";
            roiText += "# Source: " + title + "\n";
            roiText += "# Algorithm: minimum mean of max-projection\n";
            roiText += "roi_x=" + bx + "\n";
            roiText += "roi_y=" + by + "\n";
            roiText += "roi_width=" + roiW + "\n";
            roiText += "roi_height=" + roiH + "\n";
            roiText += "max_proj_mean_score=" + d2s(bScore, 4) + "\n";
            File.saveString(roiText, roiFilePath);

            // Append to master summary
            summaryLine = title + "," + bx + "," + by + ","
                        + roiW + "," + roiH + "," + d2s(bScore, 4);
            File.append(summaryLine, summaryPath);

            fileCount++;
            print("Processed: " + title + " -> ROI at (" + bx + "," + by + ")");

            close();
        }
    }

    setBatchMode(false);
    print("\\Clear");
    print("=== Batch Background ROI Detection Complete ===");
    print("Files processed: " + fileCount);
    print("Individual ROI files saved to: " + outputDir);
    print("Summary CSV: " + summaryPath);
}
```

**How the algorithm works — a deeper explanation:**

The key insight is that the ideal background region must satisfy two conditions simultaneously: it must be dim, and it must be *consistently* dim across every frame. A region where a single-molecule event blinks on in frame 300 out of 2000 may have a low temporal mean, but it is not a reliable background reference for that frame.

The **maximum intensity projection** captures this perfectly. Each pixel in the max projection equals the brightest value that pixel ever reached during the entire recording. If that brightest-ever value is still dim, then the pixel was dim in every single frame. By scanning the max projection for the rectangular region with the lowest average intensity, we find the area that was most consistently dark throughout the acquisition.

The optional **temporal stability verification** adds a second check: among the top N candidate positions identified from the max projection, it measures the actual frame-by-frame intensity and selects the candidate with the lowest temporal standard deviation. This guards against pathological cases where two candidate regions have similar max-projection scores but one shows slow drift (e.g., gradual photobleaching of out-of-focus background) while the other remains flat.

The **scan stride** parameter (default 5 pixels) controls the trade-off between speed and spatial precision. A stride of 1 evaluates every possible position but is slow for large images; a stride of 5–10 is typically sufficient because background intensity varies smoothly across the field of view.


### Macro 7: Merging channels into a multi-channel image stack

This macro combines two or more single-channel image stacks into a single multi-channel composite hyperstack. It handles the common TIRF scenario where channels are acquired sequentially or saved as separate files and need to be combined for overlay visualisation, colocalization analysis, or export.

```
/*
 * Channel Merger
 *
 * Merges 2–7 single-channel image stacks into one multi-channel
 * composite hyperstack.
 *
 * Two modes of operation:
 *   - "Open images" — select images that are already open in FIJI
 *   - "Load from files" — select TIFF files from disk
 *
 * The macro handles dimension validation (all images must have the
 * same X, Y, and number of frames), assigns lookup tables to each
 * channel, and saves the merged result as a multi-channel TIFF or
 * OME-TIFF.
 *
 * Typical use: merging PIEZO1-GFP (channel 1) with a calcium
 * indicator such as mCherry-GECO (channel 2), and optionally a
 * transmitted-light or membrane marker (channel 3).
 *
 * Author: George Dickinson
 * Developed for the PIEZO1 Research Group, UC Irvine
 */

// =====================================================================
// Configuration
// =====================================================================
// Default LUT assignments for each channel slot (C1–C7).
// These can be changed in the dialog.
defaultLUTs = newArray("Green", "Red", "Blue", "Cyan", "Magenta", "Yellow", "Grays");

// =====================================================================
// User dialog
// =====================================================================
Dialog.create("Channel Merger");

Dialog.addChoice("Source:", newArray("Use open images", "Load files from disk"),
                 "Use open images");
Dialog.addNumber("Number of channels to merge (2-7):", 2);
Dialog.addCheckbox("Save merged result", true);
Dialog.addChoice("Save format:", newArray("TIFF", "OME-TIFF"), "TIFF");
Dialog.show();

sourceMode = Dialog.getChoice();
nChannels  = Dialog.getNumber();
doSave     = Dialog.getCheckbox();
saveFormat = Dialog.getChoice();

if (nChannels < 2 || nChannels > 7) exit("Number of channels must be between 2 and 7.");

// =====================================================================
// Collect input images
// =====================================================================
channelTitles = newArray(nChannels);
channelLUTs   = newArray(nChannels);

if (sourceMode == "Use open images") {
    // Build a list of all open images
    nOpen = nImages;
    if (nOpen < nChannels)
        exit("Not enough images open. You have " + nOpen
             + " but need " + nChannels + ".");

    openTitles = newArray(nOpen);
    for (i = 0; i < nOpen; i++) {
        selectImage(i + 1);
        openTitles[i] = getTitle();
    }

    // Let the user assign each channel
    Dialog.create("Assign Channels");
    for (c = 0; c < nChannels; c++) {
        Dialog.addChoice("Channel " + (c+1) + " image:",
                         openTitles, openTitles[c]);
        Dialog.addChoice("Channel " + (c+1) + " LUT:",
                         defaultLUTs, defaultLUTs[c]);
    }
    Dialog.show();

    for (c = 0; c < nChannels; c++) {
        channelTitles[c] = Dialog.getChoice();
        channelLUTs[c]   = Dialog.getChoice();
    }

} else {
    // Load files from disk
    Dialog.create("Select Channel Files");
    for (c = 0; c < nChannels; c++) {
        Dialog.addFile("Channel " + (c+1) + " file:", "");
        Dialog.addChoice("Channel " + (c+1) + " LUT:",
                         defaultLUTs, defaultLUTs[c]);
    }
    Dialog.show();

    for (c = 0; c < nChannels; c++) {
        filePath = Dialog.getString();
        channelLUTs[c] = Dialog.getChoice();
        open(filePath);
        channelTitles[c] = getTitle();
    }
}

// =====================================================================
// Validate dimensions
// =====================================================================
selectWindow(channelTitles[0]);
refW = getWidth();
refH = getHeight();
refN = nSlices;

for (c = 1; c < nChannels; c++) {
    selectWindow(channelTitles[c]);
    if (getWidth() != refW || getHeight() != refH) {
        exit("Dimension mismatch: '" + channelTitles[c] + "' is "
             + getWidth() + "x" + getHeight()
             + " but channel 1 is " + refW + "x" + refH + ".");
    }
    if (nSlices != refN) {
        // Warn but allow — some channels may have different frame counts
        showMessage("Warning",
            "Frame count mismatch: '" + channelTitles[c] + "' has "
            + nSlices + " frames but channel 1 has " + refN + ".\n"
            + "The merged stack will use the frame count of channel 1.\n"
            + "Extra frames will be truncated; missing frames will be black.");
    }
}

// =====================================================================
// Merge channels
// =====================================================================
// Build the Merge Channels command string.
// The command expects: "c1=[title1] c2=[title2] ... create"
// The "create" flag produces a new composite hyperstack.
mergeArgs = "";
for (c = 0; c < nChannels; c++) {
    mergeArgs += "c" + (c + 1) + "=[" + channelTitles[c] + "] ";
}
mergeArgs += "create";

run("Merge Channels...", mergeArgs);

mergedTitle = getTitle();

// =====================================================================
// Apply LUTs to each channel
// =====================================================================
Stack.getDimensions(w, h, channels, slices, frames);

for (c = 0; c < nChannels; c++) {
    Stack.setChannel(c + 1);
    run(channelLUTs[c]);
    run("Enhance Contrast", "saturated=0.35");
}

// Return to composite view with all channels visible
Stack.setChannel(1);
Stack.setDisplayMode("composite");

print("\\Clear");
print("=== Channel Merge Complete ===");
print("Merged " + nChannels + " channels into: " + mergedTitle);
print("Dimensions: " + w + " x " + h + " pixels, "
      + channels + " channels, " + frames + " frames");
for (c = 0; c < nChannels; c++) {
    print("  C" + (c+1) + ": " + channelTitles[c] + " [" + channelLUTs[c] + "]");
}

// =====================================================================
// Save the merged result
// =====================================================================
if (doSave) {
    outputDir = getDirectory("Save merged stack to");

    // Generate output filename from the first channel name
    baseName = channelTitles[0];
    dotIdx = indexOf(baseName, ".");
    if (dotIdx > 0) baseName = substring(baseName, 0, dotIdx);
    outputName = baseName + "_merged_" + nChannels + "ch";

    if (saveFormat == "OME-TIFF") {
        outputPath = outputDir + outputName + ".ome.tif";
        run("Bio-Formats Exporter",
            "save=[" + outputPath + "] compression=Uncompressed");
        print("Saved as OME-TIFF: " + outputPath);
    } else {
        outputPath = outputDir + outputName + ".tif";
        saveAs("Tiff", outputPath);
        print("Saved as TIFF: " + outputPath);
    }
}
```

**Usage notes for multi-channel TIRF merging:**

When merging separately acquired TIRF channels, keep several considerations in mind. First, check that both channels share the same spatial calibration — if one was acquired at a different magnification or with a different camera, the pixel sizes will not match and the overlay will be meaningless without rescaling. Second, if the channels were acquired sequentially rather than simultaneously, biological movement between acquisitions will introduce registration errors. Use Plugins → Registration → StackReg (or the Correct 3D Drift plugin for time-lapse) to align the channels before merging. Third, for quantitative colocalization analysis after merging, ensure you perform the measurements on the individual pre-merge channels (using the "Redirect to" option in Set Measurements or by splitting channels after merging) to avoid LUT-induced artefacts in intensity values.

For **PIEZO1 dual-channel experiments** — for example, PIEZO1-GFP with mCherry-GECO calcium indicator — a typical workflow is:

1. Open both channel stacks
2. Run this macro to merge (Green LUT for GFP, Red for mCherry)
3. Scroll through the composite to identify frames where PIEZO1 puncta colocalize with calcium signals
4. Use Image → Color → Split Channels if you need to return to individual channels for quantitative measurement

---

## 30. Scripting with Jython and Other Languages

FIJI's Script Editor (**File → New → Script**) supports multiple languages. Select the language from the **Language** dropdown menu:

### Jython (Python 2.5 on JVM)

Jython provides Python syntax with full access to the ImageJ Java API:

```python
#@ ImagePlus imp

from ij import IJ
from ij.plugin.frame import RoiManager
from ij.measure import ResultsTable

# Get the current image
imp = IJ.getImage()
print("Image: " + imp.getTitle())
print("Dimensions: " + str(imp.getWidth()) + " x " + str(imp.getHeight()))
print("Slices: " + str(imp.getNSlices()))

# Run a command
IJ.run(imp, "Gaussian Blur...", "sigma=1.5 stack")

# Access the results table
rt = ResultsTable.getResultsTable()
for i in range(rt.size()):
    area = rt.getValue("Area", i)
    mean = rt.getValue("Mean", i)
    print("Row %d: Area=%.2f, Mean=%.2f" % (i, area, mean))

# Access the ROI Manager
rm = RoiManager.getInstance()
if rm is not None:
    for i in range(rm.getCount()):
        roi = rm.getRoi(i)
        print("ROI %d: %s" % (i, roi.getName()))
```

### Groovy

Modern JVM language recommended by many FIJI developers for its concise syntax:

```groovy
#@ ImagePlus imp

import ij.IJ

println "Processing: ${imp.title}"
IJ.run(imp, "Subtract Background...", "rolling=50 sliding stack")
IJ.run(imp, "Z Project...", "projection=[Max Intensity]")
```

### When to use each language

| Language | Best for |
|---|---|
| **IJM (Macro)** | Quick automation, recording GUI actions, simple batch processing |
| **Jython** | Complex analysis requiring Python-like readability, array manipulation, string processing |
| **Groovy** | Direct Java API access with minimal boilerplate, complex plugin interactions |
| **JavaScript/BeanShell** | Quick experiments with Java API |

---

## 31. Workflow: Measuring Fluorescence Intensity in Cells

This workflow measures the corrected total cell fluorescence (CTCF) for individual cells in a TIRF image.

### Step-by-step

1. **Open your image** (File → Open or drag-and-drop)

2. **Set measurements:** Analyze → Set Measurements → check Area, Mean Gray Value, Integrated Density. Enable Display Label.

3. **Check the image is not saturated:** Image → Lookup Tables → HiLo. Red pixels indicate saturation — if present, the image cannot be quantified reliably.

4. **Select the first cell:** Use the Freehand or Polygon tool to trace the cell outline.

5. **Add to ROI Manager:** Press T. Rename the ROI (click Rename) to something meaningful (e.g., "Cell_1").

6. **Repeat** for all cells of interest.

7. **Measure a background region:** Draw a small ROI in an area with no cells. Add to the Manager and rename "Background".

8. **Measure all ROIs:** Select all in the ROI Manager (Ctrl+A), then click Measure.

9. **Export results:** File → Save As from the Results window. Save as `.csv`.

10. **Calculate CTCF in a spreadsheet:**
    ```
    CTCF = IntDen(cell) - Area(cell) × Mean(background)
    ```

### Macro version

```
// Assumes ROIs are already in the ROI Manager,
// with the last ROI being "Background"

run("Set Measurements...", "area mean integrated display redirect=None decimal=3");
run("Clear Results");
roiManager("Deselect");
roiManager("Measure");

// Get background mean from the last ROI
nROIs = roiManager("count");
bgMean = getResult("Mean", nROIs - 1);

// Calculate CTCF for each cell (exclude background ROI)
for (i = 0; i < nROIs - 1; i++) {
    intden = getResult("RawIntDen", i);
    area = getResult("Area", i);
    ctcf = intden - (area * bgMean);
    setResult("CTCF", i, ctcf);
}
updateResults();
```

---

## 32. Workflow: Counting and Measuring Puncta

This workflow counts PIEZO1 puncta in TIRF images using thresholding and Analyze Particles.

### Step-by-step

1. **Open your TIRF image.** For a time-lapse, first create a max projection (Image → Stacks → Z Project → Max Intensity).

2. **Subtract background:** Process → Subtract Background → rolling ball radius 50, check Sliding Paraboloid.

3. **Smooth:** Process → Filters → Gaussian Blur → sigma 1.0 pixel.

4. **Duplicate** the image (Ctrl+Shift+D) before thresholding — you may want the original for intensity measurements.

5. **Threshold:** Image → Adjust → Threshold (Ctrl+Shift+T). Select Triangle (good for sparse puncta on dark background). Adjust if needed. Click Apply.

6. **Separate touching puncta:** Process → Binary → Watershed.

7. **Set measurements:** Analyze → Set Measurements → Area, Mean, Integrated Density, Centroid, Shape Descriptors, Display Label.

8. **Configure the Redirect:** If you want intensity measurements from the original (pre-threshold) image, set "Redirect to" in Set Measurements to the original image name.

9. **Count and measure:** Analyze → Analyze Particles → Size: 0.05–5 µm², Circularity: 0.3–1.0, Show: Outlines, check Display Results, Exclude on Edges, Add to Manager.

10. **Inspect results:** Review the Results table and the overlay/outlines image. Remove false positives by deleting ROIs from the Manager.

11. **Save:** Save results as CSV and ROIs as a ZIP file for reproducibility.

---

## 33. Workflow: TIRF Time-Lapse Analysis

This workflow tracks intensity changes at the membrane over time.

### Monitoring PIEZO1 puncta intensity over time

1. **Open the time-lapse stack.** Verify spatial calibration (Image → Properties) and frame interval.

2. **Subtract background:** Process → Subtract Background → rolling ball 50, Sliding Paraboloid, check "Stack."

3. **Identify puncta of interest:** Scroll through the stack or make a max projection to find stable puncta.

4. **Draw ROIs around each punctum:** Use small circular selections (5–10 pixel diameter). Add each to the ROI Manager (T).

5. **Draw a background ROI:** Place a similar-sized circle in an area without puncta.

6. **Extract time traces:** In the ROI Manager, select all ROIs → More >> → Multi Measure → check "Measure all slices" and "One row per slice."

7. **Save results:** Save as CSV. Each column corresponds to one ROI, each row to one frame.

8. **Analyse in Python or Excel:** Subtract background trace from each punctum trace. Plot corrected intensity over time. Identify events (binding, unbinding, intensity changes).

### Creating a kymograph along the membrane

1. **Draw a line or segmented line along the cell membrane** in the TIRF image.
2. **Set line width** to 3–5 pixels (double-click the line tool).
3. **Image → Stacks → Reslice** (shortcut: /).
4. The resulting image shows membrane position (X-axis) versus time (Y-axis).
5. Vertical bright lines = stationary PIEZO1 clusters. Diagonal lines = laterally mobile puncta.

---

## 34. Workflow: SMLM Reconstruction with thunderSTORM

This workflow reconstructs a super-resolution image of PIEZO1 from a dSTORM acquisition.

### Step-by-step

1. **Open the dSTORM acquisition stack.** Use Bio-Formats with "Use virtual stack" for large datasets.

2. **Set camera parameters:** Plugins → ThunderSTORM → Camera Setup. Enter pixel size, conversion gain, base level, EM gain, and readout noise from your camera specifications.

3. **Run analysis:** Plugins → ThunderSTORM → Run Analysis.
   - **Filter:** Wavelet (B-spline), order 3, scale 2
   - **Detector:** Local maximum, 8-connected, threshold `1*std(Wave.F1)`
   - **Estimator:** PSF: Integrated Gaussian, Method: Maximum likelihood, Fitting radius: 5 pixels, Initial sigma: 1.5 pixels
   - Click **Preview** on a single frame to verify detection before processing the full stack
   - Click **OK** to process all frames

4. **Inspect raw localisations:** The Results table shows all detected molecules. Check:
   - Total count (thousands to millions for a typical acquisition)
   - Sigma values: should cluster around 100–200 nm
   - Intensity values: should be above background

5. **Filter localisations:** Plugins → ThunderSTORM → Filter. Enter:
   ```
   sigma>50 & sigma<300 & intensity>100 & uncertainty<50
   ```

6. **Correct drift:** Plugins → ThunderSTORM → Drift correction → Cross-correlation. Set bins to 10, magnification to 5. Inspect the drift trajectory plot.

7. **Merge repeated localisations:** Plugins → ThunderSTORM → Merge. Distance: 100 nm (or ~1 pixel), max gap frames: 3.

8. **Render super-resolution image:** Plugins → ThunderSTORM → Visualization. Choose Average Shifted Histograms, magnification 10× (gives 10 nm pixels at 100 nm camera pixel size).

9. **Export localisations:** Plugins → ThunderSTORM → Export. Save as CSV for downstream analysis in Python, R, or other software.

10. **Save the rendered image:** File → Save As → Tiff. Add a scale bar (Analyze → Tools → Scale Bar) before saving for figures.

---

## 35. Keyboard Shortcuts Quick Reference

| Shortcut | Action |
|---|---|
| **Ctrl+O** | Open file |
| **Ctrl+S** | Save |
| **Ctrl+Shift+S** | Save As |
| **Ctrl+W** | Close window |
| **Ctrl+Z** | Undo |
| **M** | Measure |
| **H** | Histogram |
| **Ctrl+K** | Plot Profile |
| **T** | Add selection to ROI Manager |
| **Ctrl+Shift+T** | Threshold |
| **Ctrl+Shift+C** | Brightness/Contrast |
| **Ctrl+Shift+P** | Image Properties |
| **Ctrl+Shift+D** | Duplicate |
| **Ctrl+Shift+E** | Scale (resize) |
| **Ctrl+D** | Draw (burn selection into image) |
| **Ctrl+M** | Measure |
| **`+`** | Zoom in |
| **`-`** | Zoom out |
| **Left/Right arrows** | Previous/next slice |
| **`<`** / **`>`** | First/last slice |
| **Spacebar (hold)** | Pan tool |
| **`\`** | Start/stop animation |
| **`/`** | Reslice (for kymographs) |
| **Ctrl+A** | Select all |
| **Ctrl+Shift+A** | Remove selection |
| **Ctrl+E** | Restore previous selection |

---

## 36. Troubleshooting

### Image appears black or blank

**Cause:** The display range does not match the data range. Common with 16-bit TIRF data where actual intensities occupy a small fraction of the 0–65535 range.
**Fix:** Image → Adjust → Brightness/Contrast (Ctrl+Shift+C) → click Auto. Or manually set the minimum and maximum to match your data range (check with Analyze → Histogram).

### "Out of memory" errors

**Cause:** The dataset exceeds allocated RAM.
**Fix:** Increase memory allocation in Edit → Options → Memory & Threads (restart required). For very large datasets, use virtual stacks (check "Use virtual stack" in Bio-Formats Importer). Close unnecessary windows to free memory.

### Bio-Formats does not recognise the file format

**Fix:** Update FIJI (Help → Update). If the format is still unsupported, try Plugins → Bio-Formats → Bio-Formats Importer and manually select the reader. Check the Bio-Formats supported formats list at https://docs.openmicroscopy.org/bio-formats/latest/supported-formats.html.

### Measurements give values of zero or NaN

**Cause:** The measurement is configured to "Limit to threshold" but no threshold is set, or the ROI is outside the image bounds.
**Fix:** Uncheck "Limit to threshold" in Set Measurements unless you specifically need it. Verify ROI positions.

### Macro runs but produces no output

**Cause:** Often due to `setBatchMode(true)` without corresponding `setBatchMode(false)`, or the macro exiting early due to an error.
**Fix:** Add `print()` statements to debug. Check the Log window for error messages. Remove `setBatchMode(true)` temporarily to see what is happening.

### thunderSTORM produces too many / too few detections

**Too many (false positives):** Increase the detection threshold (e.g., from `1*std(Wave.F1)` to `2*std(Wave.F1)`). Tighten post-processing filters (reduce max sigma, increase min intensity).
**Too few (missing molecules):** Decrease the threshold (e.g., `0.5*std(Wave.F1)`). Increase the fitting radius. Check that the initial sigma matches your PSF.

### ROIs do not appear on the correct image

**Cause:** The ROI Manager is shared across all images. ROIs drawn on one image may not correspond to the correct position on another.
**Fix:** Use "Associate with Slice" in ROI properties. When measuring on a different image, ensure the spatial dimensions match.

### Plugin not appearing after installation

**Fix:**
1. Verify the JAR file is in FIJI's `plugins/` directory
2. Check that the filename contains an underscore (e.g., `Thunder_STORM.jar`)
3. Restart FIJI
4. Check the FIJI console (Window → Console) for error messages during startup

### Saved TIFF loses calibration when opened in other software

**Cause:** Not all software reads TIFF metadata. FIJI stores calibration in standard TIFF tags.
**Fix:** Save as OME-TIFF (Plugins → Bio-Formats → Bio-Formats Exporter) for maximum metadata compatibility. Alternatively, always note the pixel size in your lab notebook and re-enter it when opening in other software.

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using ImageJ/FIJI for TIRF microscopy image analysis. For questions or suggestions, contact george.dickinson@gmail.com.*

*When using FIJI in published research, please cite: Schindelin et al., Nature Methods 9(7):676–682, 2012.*
