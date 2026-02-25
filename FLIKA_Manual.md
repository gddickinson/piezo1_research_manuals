# FLIKA Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is FLIKA?](#1-introduction-what-is-flika)
2. [Installation](#2-installation)
3. [The FLIKA Interface](#3-the-flika-interface)
4. [Opening and Viewing Images](#4-opening-and-viewing-images)

**Part II: Core Concepts**

5. [Windows: How FLIKA Represents Images](#5-windows-how-flika-represents-images)
6. [Regions of Interest (ROIs)](#6-regions-of-interest-rois)
7. [Trace Windows and Plotting](#7-trace-windows-and-plotting)
8. [Global Variables and Settings](#8-global-variables-and-settings)

**Part III: Built-in Processing**

9. [File Operations](#9-file-operations)
10. [Filters](#10-filters)
11. [Math Operations](#11-math-operations)
12. [Binary and Threshold Operations](#12-binary-and-threshold-operations)
13. [Stack Operations](#13-stack-operations)
14. [Overlays and Annotations](#14-overlays-and-annotations)
15. [Measuring and Exporting Data](#15-measuring-and-exporting-data)

**Part IV: Scripting**

16. [The Script Editor](#16-the-script-editor)
17. [Writing FLIKA Scripts](#17-writing-flika-scripts)
18. [Combining FLIKA with Your Own Python Code](#18-combining-flika-with-your-own-python-code)
19. [Automating Batch Analysis](#19-automating-batch-analysis)

**Part V: Plugins**

20. [Using Plugins](#20-using-plugins)
21. [Available Plugins for PIEZO1 Research](#21-available-plugins-for-piezo1-research)
22. [Writing Your Own Plugins](#22-writing-your-own-plugins)
23. [Using AI to Generate FLIKA Scripts and Plugins](#23-using-ai-to-generate-flika-scripts-and-plugins)

**Part VI: Practical Workflows**

24. [Workflow: Calcium Imaging Analysis](#24-workflow-calcium-imaging-analysis)
25. [Workflow: TIRF Image Processing](#25-workflow-tirf-image-processing)
26. [Workflow: Kymograph Analysis](#26-workflow-kymograph-analysis)
27. [Workflow: Multi-Channel Experiments](#27-workflow-multi-channel-experiments)

**Appendices**

28. [API Quick Reference](#28-api-quick-reference)
29. [Troubleshooting](#29-troubleshooting)


---

## 1. Introduction: What is FLIKA?

FLIKA is a free, open-source image processing application designed specifically for biologists. It was originally created to automatically identify and analyse local calcium signals (calcium "puffs"), but has grown into a general-purpose tool for fluorescence microscopy analysis.

FLIKA is written entirely in Python, built on PyQt (for the graphical interface) and pyqtgraph (for fast image display and plotting). This means that everything you do in FLIKA's GUI can also be done from a Python script, and you can seamlessly mix FLIKA's built-in tools with your own NumPy/SciPy code.

### Key features

- **Multiple format support:** Works with TIFF (.tif), Nikon (.nd2), MetaMorph (.stk), and other common microscopy formats
- **Built-in image processing:** Filters, thresholding, maths operations, projections, and more
- **ROI tools:** Draw rectangles, lines, freehand regions, and lines with width. Extract intensity traces and kymographs.
- **Scriptable:** Record your analysis steps as a Python script, then replay them on new data. Write custom scripts in the built-in editor.
- **Extensible plugins:** A growing library of community plugins for specialised analyses (puff detection, single-molecule localisation, beam splitting, and more)
- **Python ecosystem:** Because FLIKA data is stored as NumPy arrays, you can use any Python library (SciPy, scikit-image, pandas, matplotlib) alongside FLIKA.
- **Cross-platform:** Runs on Windows, macOS, and Linux

### When to cite FLIKA

If you use FLIKA in published research, cite:

> Ellefsen KL, Bhatt D, Bhatt DK, Wang Y, Bhatt JM, et al. (2014) Cell Calcium 56:147-156.

FLIKA (version 4.8.1) was used in Bertaccini et al. (2025) *Nature Communications* for two critical analysis tasks in a PIEZO1-HaloTag single-molecule imaging study: (1) linking ThunderSTORM localizations into single-particle trajectories for PIEZO1 puncta diffusion analysis, and (2) recording puncta fluorescence intensity traces from JF646-BAPTA-labelled PIEZO1-HaloTag cells to report channel gating via fluorescence flickering.

### Resources

| Resource | URL |
|---|---|
| Website and documentation | https://flika-org.github.io |
| GitHub repository | https://github.com/flika-org/flika |
| API reference | https://flika-org.github.io/api.html |
| PyPI package | https://pypi.org/project/flika/ |
| Bug reports and feature requests | https://github.com/flika-org/flika/issues |

---

## 2. Installation

### Prerequisites

You need Python 3 installed. We recommend using Anaconda (see the Python Manual, Section 2).

### Install via pip

```bash
# Create and activate a conda environment (recommended)
conda create -n flika_env python=3.11
conda activate flika_env

# Install FLIKA
pip install flika

# Verify the installation
python -c "import flika; print(flika.__version__)"
```

### Install from source (for development)

```bash
git clone https://github.com/flika-org/flika.git
cd flika
pip install -e .
```

### Starting FLIKA

```python
# From a Python script or the terminal
import flika
flika.start_flika()
```

Or from the command line:

```bash
python -m flika
```

### Key dependencies

FLIKA depends on: NumPy, SciPy, PyQt5 (or PyQt6), pyqtgraph, scikit-image, tifffile, and nd2reader. These are installed automatically by pip.

---

## 3. The FLIKA Interface

When you start FLIKA, you see the main application window. The interface consists of:

### Main window

The main window contains the **menu bar** at the top. This provides access to all built-in operations, organised into:

- **File** --- Open, save, import, export
- **Process** --- Image processing operations (filters, maths, binary, stacks)
- **ROI** --- Region of interest tools
- **Plugins** --- Installed plugin functions
- **Script Editor** --- Open the Python scripting console
- **Window** --- Manage open image windows

### Image windows

Each image or stack you open appears in its own **Window**. A Window displays the image with:

- An intensity scale bar (colourmap) on the right
- A **time slider** at the bottom (for stacks/movies) --- drag to scrub through frames
- **Mouse coordinates and pixel values** shown in the status area as you hover
- Right-click **context menu** for common operations

### Mouse modes

FLIKA has several mouse modes that determine what happens when you click on an image. You can switch between them from the menu or toolbar:

| Mode | What it does |
|---|---|
| **Rectangle** | Click and drag to create a rectangular ROI |
| **Freehand** | Click and drag to draw a freehand polygon ROI |
| **Line** | Click and drag to create a line ROI |
| **Rect Line** | Click to place connected line segments with adjustable width |
| **Point** | Click to place a point marker |
| **Pencil** | Click to edit individual pixel values |

### Keyboard shortcuts

| Key | Action |
|---|---|
| Left/Right arrows | Navigate frames (previous/next) |
| Ctrl+C | Copy selected ROI |
| Ctrl+V | Paste ROI |
| Delete | Delete selected ROI |

---

## 4. Opening and Viewing Images

### Opening files from the GUI

**File > Open Image** to open a single image or multi-frame TIFF stack. FLIKA supports:

- TIFF files (.tif, .tiff) --- the primary format, including multi-frame stacks with metadata
- Nikon NIS-Elements files (.nd2)
- MetaMorph stacks (.stk)
- PNG files (.png)
- Image sequences (numbered files in a folder)

### Opening files from a script

```python
from flika.process.file_ import open_file

# Open a single file
win = open_file("calcium_timelapse.tif")

# Open an image sequence (numbered files)
from flika.process.file_ import open_image_sequence
win = open_image_sequence("data/frame_001.tif")
```

### Navigating a stack

- **Drag the time slider** at the bottom of the window to move through frames
- **Left/Right arrow keys** to step one frame at a time
- From a script: `g.win.setIndex(42)` to jump to frame 42

### Adjusting the display

- **Scroll the mouse wheel** over the colourbar to adjust brightness/contrast
- Right-click on the image for a context menu with display options
- The display adjustments change how the image *looks* but do not modify the underlying data

---

## 5. Windows: How FLIKA Represents Images

The **Window** is the central object in FLIKA. Every image, stack, or processing result is stored in a Window. Understanding Windows is essential for scripting.

### The image data is a NumPy array

The pixel data for any Window is stored as a standard NumPy array in `window.image`:

```python
import flika.global_vars as g

# Access the currently selected window's data
data = g.win.image

print(data.shape)    # e.g. (500, 512, 512)
print(data.dtype)    # e.g. float64
print(data.min(), data.max())
```

### Shape conventions

| Shape | Meaning |
|---|---|
| `(height, width)` | Single 2D grayscale image |
| `(frames, height, width)` | Time-lapse / z-stack (3D) |
| `(height, width, 3)` | Single RGB colour image |
| `(frames, height, width, 3)` | Colour time-lapse (4D) |

### Key Window attributes

| Attribute | Type | Description |
|---|---|---|
| `image` | ndarray | The pixel data as a NumPy array |
| `name` | str | Window title (displayed in the title bar) |
| `filename` | str | Full path to the source file |
| `mx` | int | Width in pixels |
| `my` | int | Height in pixels |
| `mt` | int | Number of frames (1 for a single image) |
| `nDims` | int | Number of dimensions (2, 3, or 4) |
| `dtype` | dtype | Data type of the image (uint8, uint16, float64, etc.) |
| `framerate` | float | Frames per second (Hz), if known from metadata |
| `currentIndex` | int | Index of the currently displayed frame |
| `commands` | list | History of processing commands applied to this window |
| `metadata` | dict | File metadata (timestamps, format info, etc.) |
| `rois` | list | All ROI objects attached to this window |
| `currentROI` | ROI | The currently selected ROI (or None) |
| `closed` | bool | Whether the window has been closed |
| `linkedWindows` | set | Other windows linked to this one (synchronised frame navigation) |

### Key Window methods

```python
# Navigation
g.win.setIndex(42)               # Jump to frame 42

# Naming
g.win.setName("Processed data")  # Rename the window

# Linking (synchronise frame navigation between windows)
g.win.link(other_window)         # Link time sliders
g.win.unlink(other_window)       # Unlink

# Saving
g.win.save("output.tif")         # Save to TIFF

# ROI operations
g.win.plotAllROIs()              # Plot traces for all ROIs
g.win.removeAllROIs()            # Delete all ROIs
g.win.save_rois("rois.txt")     # Export ROI definitions

# Data access
arr = g.win.imageArray()         # Get image as a guaranteed 3D array
pts = g.win.getScatterPts()      # Get scatter points as Nx3 array (frame, x, y)

# Set as active
g.win.setAsCurrentWindow()       # Make this the currently selected window
```

### Creating a new Window from a NumPy array

```python
from flika.window import Window
import numpy as np

# Create some data (e.g. a dF/F movie)
dff = (stack - baseline) / baseline

# Display it in a new FLIKA window
new_win = Window(dff, name="dF/F movie")

# With full metadata
new_win = Window(
    dff,
    name="dF/F movie",
    filename="",
    commands=["dF/F calculated from raw data"],
    metadata={"framerate": 10.0}
)
```

---

## 6. Regions of Interest (ROIs)

ROIs let you select parts of an image to extract intensity traces, crop regions, or create kymographs. FLIKA provides four ROI types.

### ROI types

| Type | How to create | Best for |
|---|---|---|
| **Rectangle** | Click and drag | Cell bodies, fixed regions, background areas |
| **Freehand** | Click and draw a polygon | Irregularly shaped cells or structures |
| **Line** | Click and drag | Line profiles, kymographs along a membrane |
| **Rect Line** | Click to place points | Paths with width (e.g. along a curved membrane) |

### Creating ROIs from the GUI

1. Select the desired mouse mode (rectangle, freehand, line, etc.) from the menu or toolbar
2. Click and drag on the image to draw the ROI
3. The ROI appears as a coloured overlay on the image
4. Drag the ROI to reposition it; drag the handles to resize

### Creating ROIs from a script

```python
from flika.roi import makeROI
import flika.global_vars as g

# Rectangle ROI: [[y1, x1], [y2, x2]]
roi = makeROI('rectangle', [[100, 100], [150, 150]], window=g.win)

# Line ROI: [[y1, x1], [y2, x2]]
roi = makeROI('line', [[50, 50], [200, 300]], window=g.win)

# Freehand ROI: list of [y, x] vertices
roi = makeROI('freehand', [[50, 50], [50, 150], [150, 150], [150, 50]], window=g.win)

# Rect Line: connected segments with width
roi = makeROI('rect_line', [[50, 50], [100, 150], [200, 200]], window=g.win)
```

### Common ROI operations

```python
# Get the intensity trace (mean intensity over time for the ROI)
trace = roi.getTrace()         # Returns a 1D numpy array

# Plot the trace in a trace window
roi.plot()

# Remove from the trace window
roi.unplot()

# Get the pixel mask (coordinates of all pixels inside the ROI)
xx, yy = roi.getMask()

# Get the ROI boundary points (for export/import)
points = roi.getPoints()

# Delete the ROI
roi.delete()

# Copy/paste
roi.copy()                     # Store in clipboard
g.win.paste()                  # Paste into the current window

# Change colour
roi.changeColor()              # Opens a colour picker dialog
roi.setPen('red')              # Set directly

# Show the ROI as a binary mask image
roi.showMask()

# Link ROIs (move together across windows)
roi1.link(roi2)
```

### Rectangle-specific operations

```python
# Crop: create a new window containing only the ROI region
roi.crop()

# Centre the ROI on specific coordinates
roi.center_around(x=256, y=256)

# Check if a point is inside
roi.contains_pts(x=200, y=200)    # Returns True/False
```

### Line-specific operations

```python
# Generate a kymograph (space-time image along the line)
roi.kymograph                  # Access the kymograph window
# The kymograph is automatically created when you draw a line ROI
# and updated as you move it
```

### Saving and loading ROIs

```python
from flika.process.file_ import save_rois, open_rois

# Save all ROIs in the current window
save_rois("my_rois.txt")

# Load ROIs from a file
open_rois("my_rois.txt")
```

### Working with multiple ROIs

```python
# Access all ROIs in the current window
for roi in g.win.rois:
    trace = roi.getTrace()
    print(f"ROI mean: {trace.mean():.1f}")

# Plot all ROI traces at once
g.win.plotAllROIs()

# Remove all ROIs
g.win.removeAllROIs()
```

---

## 7. Trace Windows and Plotting

When you plot an ROI trace (`roi.plot()`), FLIKA creates a **TraceFig** window. This is an interactive plot showing the mean intensity of the ROI over time.

### TraceFig features

- **Main plot (top):** Shows the trace for the selected frame range, with zoom and pan
- **Overview plot (bottom):** Shows the full trace with a draggable **region selector** to choose which portion is displayed in the main plot
- **Mouse hover:** Shows the frame index and intensity value in the status bar
- **Multiple traces:** You can plot multiple ROIs in the same TraceFig by calling `roi.plot()` on each one

### Interacting with trace windows

- Drag the **region selector** (the highlighted band in the overview) to scroll through time
- **Zoom** with the mouse scroll wheel on the main plot
- **Click** on the trace to jump the parent image window to that frame

### Trace window from a script

```python
# The trace window is accessible from the ROI
roi.plot()
trace_window = roi.traceWindow    # The TraceFig object

# Get the current view bounds (start and end frame)
start, end = trace_window.getBounds()

# Export trace data
trace_window.export("trace_data.txt")    # Tab-separated text file

# Generate a power spectrum (FFT)
trace_window.generate_power_spectrum()
```

### Global trace settings

```python
import flika.global_vars as g

# Multiple trace windows mode:
# When True, each ROI gets its own trace window
# When False, all ROIs share one trace window
g.setMultipleTraceWindows(True)
```

---

## 8. Global Variables and Settings

FLIKA uses a central global state object (`g`) to track open windows, the current selection, and persistent settings.

### Accessing global state

```python
import flika.global_vars as g

# Currently selected window
g.win                         # The active Window object
g.currentWindow               # Alias for g.win

# All open windows
g.windows                     # List of all Window objects

# Trace windows
g.currentTrace                # Currently selected TraceFig
g.traceWindows                # List of all TraceFig objects

# Main application
g.m                           # The main FLIKA application window

# Clipboard
g.clipboard                   # Copy/paste storage for ROIs
```

### Settings

Settings are stored as a dictionary-like object that automatically saves to `~/.FLIKA/settings.json`:

```python
# Access settings
g.settings['internal_data_type']    # 'float64' (default processing dtype)
g.settings['mousemode']             # 'rectangle', 'freehand', 'line', etc.
g.settings['multiprocessing']       # True/False
g.settings['nCores']                # Number of CPU cores for parallel processing
g.settings['recent_files']          # List of recently opened files
g.settings['recent_scripts']        # List of recently run scripts
g.settings['show_windows']          # Auto-show new windows on creation
g.settings['point_color']           # Default colour for scatter points
g.settings['roi_color']             # Default ROI colour ('random' or hex)
g.settings['debug_mode']            # Verbose logging
```

### Changing settings

```python
# Change the mouse mode
g.setmousemode('freehand')

# Change the internal data type (affects all subsequent processing)
g.setInternalDataType('float32')

# Toggle multiple trace windows
g.setMultipleTraceWindows(True)

# Direct setting modification (auto-saved)
g.settings['show_windows'] = True
```

### Utility functions

```python
# Show a popup message
g.alert("Analysis complete!", title="Done")
```

---

## 9. File Operations

### Opening files

```python
from flika.process.file_ import open_file, open_image_sequence, open_points, open_rois

# Open a single image or stack
win = open_file("calcium_timelapse.tif")

# Open from the GUI (opens a file dialog)
win = open_file()

# Open a numbered image sequence
win = open_image_sequence("frame_001.tif")

# Open previously saved point coordinates
open_points("cell_positions.txt")

# Open previously saved ROI definitions
open_rois("my_rois.txt")
```

### Saving files

```python
from flika.process.file_ import save_file, save_points, save_rois, save_movie_gui

# Save the current window as a TIFF
save_file("processed_output.tif")

# Save from the GUI (opens a save dialog)
save_file()

# Save scatter points (frame, x, y coordinates)
save_points("detected_events.txt")

# Save ROI definitions
save_rois("analysis_rois.txt")

# Save as a movie (opens a dialog; requires ffmpeg)
save_movie_gui()
```

### Metadata

FLIKA stores metadata in TIFF files as a JSON string in the TIFF description field. This includes timestamps, framerate, colour information, and any custom data you add.

```python
# Access metadata
print(g.win.metadata)

# Typical metadata keys
# 'is_rgb'           --- whether the image is colour
# 'timestamp_units'  --- units for timestamp data
# 'framerate'        --- frames per second
```

---

## 10. Filters

All filter functions operate on the **currently selected window** (`g.win`) and create a **new window** with the result.

```python
from flika.process import (
    gaussian_blur,
    mean_filter,
    median_filter,
    difference_of_gaussians,
    butterworth_filter,
    fourier_filter,
    wavelet_filter,
    bilateral_filter,
    difference_filter,
    boxcar_differential_filter,
    variance_filter,
)
```

### Spatial filters

```python
# Gaussian blur --- smooth noise, specify sigma in pixels
result = gaussian_blur(sigma=2.0)
result = gaussian_blur(sigma=2.0, norm_edges=True)    # Normalise edges

# Mean filter --- local average, specify kernel size
result = mean_filter(size=3)

# Median filter --- remove salt-and-pepper noise
result = median_filter(size=3)

# Variance filter --- highlight regions with high variability
result = variance_filter(size=5)

# Bilateral filter --- smooth while preserving edges
result = bilateral_filter(sigma_space=3.0, sigma_intensity=50.0)
```

### Bandpass and frequency filters

```python
# Difference of Gaussians --- bandpass filter (enhances features between two scales)
result = difference_of_gaussians(sigma1=1.0, sigma2=5.0)

# Butterworth filter --- frequency domain low-pass filter
result = butterworth_filter(order=2, cutoff=0.1)

# Fourier filter --- interactive FFT-based filtering
result = fourier_filter()

# Wavelet filter --- wavelet decomposition filtering
result = wavelet_filter()
```

### Temporal filters

```python
# Difference filter --- frame-to-frame difference (highlights changes)
result = difference_filter()

# Boxcar differential filter --- smoothed temporal difference
result = boxcar_differential_filter(size=5)
```

### The `keepSourceWindow` parameter

All process functions accept `keepSourceWindow=False` as a keyword argument. When `False` (the default), the source window is replaced by the result. When `True`, the source window is kept open alongside the new result window.

```python
# Default: source window is replaced
gaussian_blur(sigma=2.0)

# Keep the source window open
gaussian_blur(sigma=2.0, keepSourceWindow=True)
```

---

## 11. Math Operations

Mathematical operations on the currently selected window.

```python
from flika.process import (
    subtract,
    multiply,
    divide,
    power,
    sqrt,
    ratio,
    absolute_value,
    subtract_trace,
    divide_trace,
)

# Subtract a constant from every pixel
result = subtract(value=100)

# Multiply every pixel by a constant
result = multiply(value=2.0)

# Divide every pixel by a constant
result = divide(value=255.0)

# Raise every pixel to a power
result = power(value=0.5)    # Same as square root

# Square root of every pixel
result = sqrt()

# Absolute value
result = absolute_value()

# Ratio: divide current window by a baseline window (frame by frame)
result = ratio(baselineWindow=baseline_win)

# Subtract an ROI trace from each frame
# (the current ROI's mean trace is subtracted from every pixel in each frame)
result = subtract_trace()

# Divide each frame by the ROI trace
result = divide_trace()
```

---

## 12. Binary and Threshold Operations

These functions convert images to binary (0/1) masks or operate on existing binary images.

```python
from flika.process import (
    threshold,
    adaptive_threshold,
    canny_edge_detector,
    logically_combine,
    remove_small_blobs,
    binary_erosion,
    binary_dilation,
    generate_rois,
)

# Simple threshold --- pixels above the value become 1, below become 0
result = threshold(value=100)
result = threshold(value=100, darkBackground=True)    # Invert

# Adaptive threshold --- local thresholding (good for uneven illumination)
result = adaptive_threshold(value=10, block_size=25)

# Canny edge detector
result = canny_edge_detector(sigma=1.0)

# Logical operations between two binary images
result = logically_combine(operation='AND', window2=other_win)
# Operations: 'AND', 'OR', 'XOR'

# Remove small objects from a binary image
result = remove_small_blobs(size=50)    # Remove blobs smaller than 50 pixels

# Morphological operations on binary images
result = binary_erosion(iterations=1)
result = binary_dilation(iterations=1)

# Automatically generate ROIs from connected components in a binary image
result = generate_rois(minSize=20, maxSize=5000)
```

### Practical pattern: segment cells and create ROIs

```python
from flika.process import gaussian_blur, threshold, remove_small_blobs, generate_rois

# Start with a fluorescence image of PIEZO1-GFP expressing cells
# 1. Smooth to reduce noise
gaussian_blur(sigma=2.0)

# 2. Threshold to create a binary mask
threshold(value=50, darkBackground=True)

# 3. Clean up the mask
remove_small_blobs(size=100)

# 4. Create an ROI for each connected region
generate_rois(minSize=100, maxSize=10000)

# Now g.win.rois contains one ROI per detected cell
for roi in g.win.rois:
    trace = roi.getTrace()
    print(f"Cell mean intensity: {trace.mean():.1f}")
```

---

## 13. Stack Operations

Operations for manipulating multi-frame stacks (time-lapses, z-stacks).

```python
from flika.process import (
    duplicate,
    trim,
    zproject,
    resize,
    deinterleave,
    pixel_binning,
    frame_binning,
    concatenate_stacks,
    change_datatype,
)

# Duplicate the current window
dup = duplicate()

# Trim: extract a range of frames
result = trim(firstFrame=10, lastFrame=200)
result = trim(firstFrame=10, lastFrame=200, increment=2)    # Every 2nd frame

# Z-project: collapse frames into a single image
# projection_type options: 'Average', 'Max Intensity', 'Min Intensity',
#                          'Sum Slices', 'Standard Deviation', 'Median'
result = zproject(firstFrame=0, lastFrame=100, projection_type='Average')
result = zproject(firstFrame=0, lastFrame=100, projection_type='Max Intensity')

# Resize (upscale) the image
result = resize(factor=2)

# Deinterleave: separate interleaved channels
# e.g. if frames alternate between GFP and mCherry:
result = deinterleave(nChannels=2)

# Pixel binning: reduce spatial resolution (2x2 binning)
result = pixel_binning(nPixels=2)

# Frame binning: average consecutive frames together
result = frame_binning(nFrames=5)

# Concatenate multiple stacks into one
result = concatenate_stacks()    # Opens a dialog to select windows

# Change the data type
result = change_datatype()       # Opens a dialog
```

---

## 14. Overlays and Annotations

Add visual annotations to your images.

```python
from flika.process import time_stamp, scale_bar

# Add a time stamp overlay to the movie
time_stamp(framerate=10.0, show=True)

# Add a calibrated scale bar
scale_bar(scale=0.11, unit='um', position='bottom_right')
```

---

## 15. Measuring and Exporting Data

### Interactive measurement

From the menu: **Process > Measure**. This activates point-click measurement mode:

- Click on the image to place measurement points
- Shift-click to snap to the nearest data point
- FLIKA displays distances, slopes, and intensity values
- Results can be exported to a text file

### Exporting traces

```python
# From a trace window
roi.plot()
roi.traceWindow.export("trace_data.txt")    # Tab-separated values

# Or manually using numpy
import numpy as np
trace = roi.getTrace()
np.savetxt("trace.csv", trace, delimiter=",")

# With time axis
fps = g.win.framerate
time = np.arange(len(trace)) / fps
data = np.column_stack([time, trace])
np.savetxt("trace_with_time.csv", data, delimiter=",",
           header="time_s,intensity", comments="")
```

### Exporting scatter points

```python
from flika.process.file_ import save_points

# Save all point markers (frame, x, y)
save_points("detected_points.txt")

# Or access directly
pts = g.win.getScatterPts()    # Nx3 numpy array: (frame, x, y)
```

### Extracting puncta intensity traces for single-molecule analysis

In single-molecule TIRF experiments --- such as the PIEZO1-HaloTag imaging in Bertaccini et al. (2025) --- you often need to record the fluorescence intensity trace of an individual punctum over time. FLIKA is well suited to this task using small ROIs.

**Procedure used in Bertaccini et al. (2025):**

1. Place a 3x3 pixel rectangular ROI centred on the punctum of interest.
2. Place a second 3x3 pixel ROI in a cell-devoid region of the field to serve as a background reference.
3. Extract both traces and subtract the background trace from the punctum trace frame by frame.

```python
from flika.roi import makeROI
import numpy as np
import flika.global_vars as g

# ROI centred on a PIEZO1-HaloTag punctum (3x3 pixels)
roi_punctum = makeROI('rectangle', [[cy-1, cx-1], [cy+2, cx+2]], window=g.win)

# Background ROI in a cell-devoid area (3x3 pixels)
roi_bg = makeROI('rectangle', [[bg_y, bg_x], [bg_y+3, bg_x+3]], window=g.win)

# Extract and background-subtract
trace_punctum = roi_punctum.getTrace()
trace_bg = roi_bg.getTrace()
corrected_trace = trace_punctum - trace_bg

# Export for downstream analysis (e.g. AutoDISC/pyDISC idealization)
np.savetxt("punctum_trace.csv", corrected_trace, delimiter=",")
```

The background-subtracted intensity traces from JF646-BAPTA-labelled PIEZO1-HaloTag puncta exhibit fluorescence flickering that reports PIEZO1 channel gating events. These traces can be further analysed by constructing all-points amplitude histograms and by applying step-detection algorithms such as AutoDISC or pyDISC for idealization of the discrete intensity levels.

### All-points amplitude histograms from intensity traces

After extracting a background-subtracted punctum intensity trace, you can build an all-points amplitude histogram to visualize the distribution of intensity states. This approach was used in Bertaccini et al. (2025) to characterize PIEZO1-HaloTag gating from JF646-BAPTA fluorescence traces.

```python
import matplotlib.pyplot as plt
import numpy as np

# corrected_trace from the extraction above
fig, axes = plt.subplots(1, 2, figsize=(12, 4), gridspec_kw={'width_ratios': [3, 1]})

# Trace plot
time = np.arange(len(corrected_trace)) / fps
axes[0].plot(time, corrected_trace, lw=0.5, color='k')
axes[0].set_xlabel("Time (s)")
axes[0].set_ylabel("Fluorescence (a.u.)")
axes[0].set_title("PIEZO1-HaloTag Punctum Intensity Trace")

# All-points amplitude histogram (rotated to align with trace y-axis)
axes[1].hist(corrected_trace, bins=100, orientation='horizontal',
             color='steelblue', edgecolor='none')
axes[1].set_xlabel("Count")
axes[1].set_ylim(axes[0].get_ylim())

plt.tight_layout()
plt.savefig("amplitude_histogram.png", dpi=300)
```

### Power spectrum analysis

```python
# From any trace window
roi.traceWindow.generate_power_spectrum()
# Opens an FFT analyser with log-log power spectrum plot
# Results can be exported to CSV
```

---

## 16. The Script Editor

FLIKA has a built-in Python script editor with an integrated IPython terminal. Open it from **Script Editor** in the menu bar.

### Features

- **Tabbed editor:** Open multiple scripts in tabs
- **Syntax highlighting:** Python keywords, strings, and comments are coloured
- **Run button:** Execute the entire script
- **Run Selected:** Execute only the highlighted portion of code
- **IPython terminal:** An interactive Python console below the editor, with access to all FLIKA objects
- **Recent scripts:** Quickly reopen previously used scripts
- **From Window:** Generate a script from a window's command history (reproducing the processing steps applied to that window)

### Pre-loaded namespace

When you run code in the script editor, the following are already available:

| Name | What it is |
|---|---|
| `g` | Global variables (`g.win`, `g.windows`, etc.) |
| `np` | NumPy |
| `scipy` | SciPy |
| `pg` | pyqtgraph |
| All process functions | `open_file`, `gaussian_blur`, `threshold`, etc. |
| `Window` | The Window class |
| `makeROI` | ROI creation function |
| `open_rois` | Load ROIs from file |

### Generating a script from a window's history

Every time you apply a processing step in the GUI, FLIKA records the command. You can turn this history into a script:

**File > From Window** in the script editor, then select the window. FLIKA generates a Python script that reproduces all the steps.

---

## 17. Writing FLIKA Scripts

### Basic script structure

```python
# A typical FLIKA analysis script
from flika import *
from flika.process.file_ import open_file, save_file
from flika.process import gaussian_blur, threshold, zproject
from flika.roi import makeROI
import numpy as np

# 1. Load the data
win = open_file("calcium_timelapse.tif")
print(f"Loaded: {g.win.image.shape}")

# 2. Process
gaussian_blur(sigma=1.5)

# 3. Create ROIs and extract traces
roi_cell = makeROI('rectangle', [[200, 200], [230, 230]], window=g.win)
roi_bg   = makeROI('rectangle', [[10, 10], [40, 40]], window=g.win)

trace_cell = roi_cell.getTrace()
trace_bg   = roi_bg.getTrace()

# 4. Compute dF/F
corrected = trace_cell - trace_bg
f0 = corrected[:50].mean()
dff = (corrected - f0) / f0

# 5. Plot
import matplotlib.pyplot as plt
fps = 10.0
time = np.arange(len(dff)) / fps
plt.figure(figsize=(10, 4))
plt.plot(time, dff)
plt.xlabel("Time (s)")
plt.ylabel("dF/F")
plt.title("PIEZO1 Calcium Response")
plt.savefig("dff_trace.png", dpi=300)
plt.show()

# 6. Save processed image
save_file("processed.tif")
```

### Using the `from flika import *` pattern

The `from flika import *` statement imports the global variables module as `g` and sets up the namespace so that all built-in process functions are available. This is the standard way to start a FLIKA script.

### Switching between windows

```python
# Process functions always operate on g.win (the currently selected window)
# To switch which window is active:
g.windows[0].setAsCurrentWindow()    # Select the first window
gaussian_blur(sigma=2.0)             # This now operates on that window

g.windows[1].setAsCurrentWindow()    # Select the second window
threshold(value=50)                  # This operates on the second window
```

### Running external scripts

You can run a script from the command line that starts FLIKA, runs your analysis, and then either keeps the GUI open or exits:

```python
#!/usr/bin/env python3
"""Run PIEZO1 analysis from the command line."""
import flika
flika.start_flika()

from flika import *
from flika.process.file_ import open_file

# Your analysis here...
win = open_file("data.tif")
# ...
```

---

## 18. Combining FLIKA with Your Own Python Code

Because FLIKA stores image data as NumPy arrays, you can freely combine FLIKA's tools with any Python library.

### Pull data out, process, push back in

```python
import numpy as np
from scipy.signal import find_peaks
from flika.window import Window
import flika.global_vars as g

# Get data from the current FLIKA window
stack = g.win.image.copy()

# --- Your custom analysis ---
# Background subtract using your own method
bg = stack[:, 10:40, 10:40].mean(axis=(1, 2))
corrected = stack - bg[:, np.newaxis, np.newaxis]

# Compute dF/F
baseline = corrected[:50].mean(axis=0)
dff = (corrected - baseline) / baseline

# Find peaks in a specific ROI trace
roi_trace = dff[:, 200:230, 200:230].mean(axis=(1, 2))
peaks, properties = find_peaks(roi_trace, height=0.1, distance=20)
print(f"Found {len(peaks)} calcium transients")

# --- Push the result back into FLIKA ---
dff_win = Window(dff, name="dF/F (custom)")
```

### Use scikit-image for segmentation

```python
from skimage import filters, morphology, measure
import numpy as np
from flika.window import Window
import flika.global_vars as g

# Get a mean projection from FLIKA
mean_img = g.win.image.mean(axis=0)

# Segment using scikit-image
thresh = filters.threshold_otsu(mean_img)
binary = mean_img > thresh
cleaned = morphology.remove_small_objects(binary, min_size=50)

# Label connected components
labels = measure.label(cleaned)
props = measure.regionprops(labels, intensity_image=mean_img)

print(f"Found {len(props)} cells")
for p in props:
    print(f"  Cell at ({p.centroid[1]:.0f}, {p.centroid[0]:.0f}), "
          f"area={p.area}, mean intensity={p.mean_intensity:.1f}")

# Display the label image in FLIKA
Window(labels.astype(np.float64), name="Cell labels")
```

### Use pandas for results

```python
import pandas as pd
import numpy as np
import flika.global_vars as g

# Extract traces for all ROIs
results = []
fps = g.win.framerate or 10.0

for i, roi in enumerate(g.win.rois):
    trace = roi.getTrace()
    results.append({
        "roi_index": i,
        "mean_intensity": trace.mean(),
        "max_intensity": trace.max(),
        "std_intensity": trace.std(),
    })

df = pd.DataFrame(results)
df.to_csv("roi_summary.csv", index=False)
print(df)
```

---

## 19. Automating Batch Analysis

### Process multiple files with the same pipeline

```python
#!/usr/bin/env python3
"""Batch process all TIFF stacks in a directory."""
from pathlib import Path
import numpy as np
import flika
flika.start_flika()

from flika import *
from flika.process.file_ import open_file, save_file
from flika.process import gaussian_blur, zproject
from flika.roi import makeROI

input_dir = Path("data/raw")
output_dir = Path("data/processed")
output_dir.mkdir(exist_ok=True)

roi_coords = (200, 230, 200, 230)    # y1, y2, x1, x2

tiff_files = sorted(input_dir.glob("*.tif"))
print(f"Found {len(tiff_files)} files to process")

for filepath in tiff_files:
    print(f"\nProcessing: {filepath.name}")

    # Open
    win = open_file(str(filepath))
    print(f"  Shape: {g.win.image.shape}")

    # Process
    gaussian_blur(sigma=1.5)

    # Extract trace
    y1, y2, x1, x2 = roi_coords
    trace = g.win.image[:, y1:y2, x1:x2].mean(axis=(1, 2))

    # Save trace
    np.savetxt(output_dir / f"{filepath.stem}_trace.csv", trace, delimiter=",")

    # Save mean projection
    mean_proj = zproject(firstFrame=0, lastFrame=g.win.mt - 1,
                         projection_type='Average')
    save_file(str(output_dir / f"{filepath.stem}_mean.tif"))

    # Close windows to free memory
    for w in list(g.windows):
        w.close()

print("\nBatch processing complete!")
```

### Record a script from the GUI, then replay it

1. Perform your analysis on one file using the FLIKA GUI
2. Open the Script Editor
3. **File > From Window** --- select the processed window
4. FLIKA generates a script reproducing all your steps
5. Edit the script to accept a file path as input
6. Wrap it in a loop to process multiple files

---

## 20. Using Plugins

Plugins extend FLIKA with specialised analysis tools. They appear in the **Plugins** menu.

### Installing plugins

1. Open **Plugins > Plugin Manager** in FLIKA
2. Browse or search for the plugin you want
3. Click **Install** --- the plugin is downloaded and placed in `~/.FLIKA/plugins/`
4. Restart FLIKA (or the plugin may load automatically)

Alternatively, install manually:

```bash
# Clone a plugin repository into the plugins directory
cd ~/.FLIKA/plugins/
git clone https://github.com/flika-org/plugin_name.git
```

### Plugin directory

All user plugins live in:

```
~/.FLIKA/plugins/           # macOS/Linux
C:\Users\<you>\.FLIKA\plugins\    # Windows
```

### Using a plugin

Once installed, plugin functions appear in the **Plugins** menu. Click to open the plugin's dialog, set parameters, and run. Most plugins follow the same pattern as built-in processes --- they operate on the current window and create a new window with the result.

---

## 21. Available Plugins for PIEZO1 Research

The following plugins are available and relevant to PIEZO1 microscopy research. Some have been developed and customised specifically for use in the lab.

### Image processing and transformation

| Plugin | Purpose |
|---|---|
| **image_transforms** | Rotate, flip, transpose, invert, normalise, crop, bin, and pad images |
| **frame_remover** | Remove specific frame ranges from a movie (e.g. flash artifacts, bad frames) |
| **flash_remover** | Automatically detect and remove flash artifacts from recordings |
| **scaledAverageSubtract** | Subtract a scaled average image --- useful for removing static background |
| **translateAndScale** | Align and scale images (registration) |

### Channel separation

| Plugin | Purpose |
|---|---|
| **BeamSplitter** | Split a beam-splitter image into separate channel windows |
| **advanced_beam_splitter** | Extended beam splitter with more alignment options |

### ROI and trace analysis

| Plugin | Purpose |
|---|---|
| **roiExtras** | Extended ROI tools with histogram display |
| **centerSurroundROI** | Create linked centre/surround ROIs for comparing signals inside and outside a region |
| **linescan** | Line profile analysis with live plotting |
| **kymograph_analyzer** | Spatiotemporal analysis along ROIs --- velocity, dwell time, event detection |

### Event detection

| Plugin | Purpose |
|---|---|
| **detect_puffs_GDedit** | Detect and analyse calcium puff events with Gaussian fitting. Reports amplitude, duration, spatial extent. Directly relevant to PIEZO1 calcium signalling. |
| **simulatePuff** | Generate simulated calcium puff data for testing detection algorithms |
| **fft_Chunker** | Frequency-domain analysis of traces --- power spectra, dominant frequencies |

### Single-molecule localisation and tracking

| Plugin | Purpose |
|---|---|
| **thunderstorm_flika** | Comprehensive single-molecule localisation microscopy (SMLM) pipeline: detection, fitting, drift correction, rendering |
| **locsAndTracksPlotter** | Visualise and analyse single-particle tracking data |
| **pynsight_GDedit** | Particle tracking and analysis |
| **spt_batch_analysis** | Batch single-particle tracking analysis with autocorrelation and diffusion |

### Specialised microscopy

| Plugin | Purpose |
|---|---|
| **lightSheet_tiffLoader** | Load light sheet microscopy TIFF files |
| **light_sheet_analyzer_GDedit** | Analyse light sheet microscopy data |
| **volumeSlider** | Navigate and slice 3D volume data |

### Visualisation and export

| Plugin | Purpose |
|---|---|
| **overlay** | Overlay images with heatmaps or other images |
| **overlayMultipleRecordings** | Overlay and compare multiple recordings as heatmaps |
| **timestamp** | Add timestamps to image frames |
| **videoExporter** | Export images and movies in various formats |
| **annotator** | Add text and shape annotations to images |
| **mask_editor** | Interactive binary mask creation and editing |

---

## 22. Writing Your Own Plugins

FLIKA's plugin system lets you add new menu items and processing functions. A plugin is a Python package in `~/.FLIKA/plugins/` containing your code and a metadata file.

### Plugin directory structure

```
my_plugin/
├── __init__.py          # Can be empty (makes it a Python package)
├── info.xml             # Plugin metadata (name, author, version, menu layout)
├── about.html           # Description shown in the Plugin Manager
└── my_plugin.py         # Your processing code
```

### The info.xml file

```xml
<plugin name="My PIEZO1 Analyzer">
    <directory>my_plugin</directory>
    <version>2025.02.24</version>
    <author>Your Name</author>
    <url>https://github.com/yourname/my_plugin/archive/master.zip</url>
    <dependencies>
        <dependency name="scipy"></dependency>
    </dependencies>
    <menu_layout>
        <action location="my_plugin" function="my_analyzer.gui">
            My PIEZO1 Analysis
        </action>
    </menu_layout>
</plugin>
```

The `<menu_layout>` section defines how your plugin appears in the Plugins menu. Each `<action>` maps a menu item to a Python function.

### Writing a BaseProcess plugin

The standard way to write a plugin is to inherit from `BaseProcess`. This gives you automatic GUI generation, settings persistence, and proper data flow.

```python
# my_plugin/my_plugin.py
"""Custom analysis plugin for PIEZO1 calcium imaging data."""

from flika.utils.BaseProcess import BaseProcess, SliderLabel, CheckBox
from flika.window import Window
import flika.global_vars as g
import numpy as np


class PiezoAnalyzer(BaseProcess):
    """Analyse calcium transients in PIEZO1 imaging data.

    This plugin computes dF/F from the current window, using the first
    N seconds as a baseline. Optionally applies temporal smoothing.
    """

    def __init__(self):
        super().__init__()

    def get_init_settings_dict(self):
        """Default parameter values (saved between sessions)."""
        return {
            'baseline_seconds': 5.0,
            'sigma': 1.0,
            'smooth': True,
        }

    def gui(self):
        """Build the parameter dialog."""
        self.gui_reset()

        # Baseline duration slider
        baseline = SliderLabel(1)          # 1 decimal place
        baseline.setRange(0.5, 30.0)
        baseline.setValue(5.0)
        self.items.append({
            'name': 'baseline_seconds',
            'string': 'Baseline duration (s)',
            'object': baseline,
        })

        # Smoothing sigma slider
        sigma = SliderLabel(1)
        sigma.setRange(0.1, 10.0)
        sigma.setValue(1.0)
        self.items.append({
            'name': 'sigma',
            'string': 'Temporal smoothing (sigma)',
            'object': sigma,
        })

        # Enable smoothing checkbox
        smooth = CheckBox()
        smooth.setChecked(True)
        self.items.append({
            'name': 'smooth',
            'string': 'Apply temporal smoothing',
            'object': smooth,
        })

        super().gui()

    def __call__(self, baseline_seconds=5.0, sigma=1.0, smooth=True,
                 keepSourceWindow=False):
        """Run the dF/F analysis.

        This method can be called from the GUI dialog or from a script:
            piezo_analyzer(baseline_seconds=5.0, sigma=1.0)

        Args:
            baseline_seconds: Duration of baseline period in seconds
            sigma:            Gaussian smoothing sigma (if smooth=True)
            smooth:           Whether to apply temporal smoothing
            keepSourceWindow: Keep the source window open
        """
        self.start(keepSourceWindow)

        # self.tif is the source image as a numpy array
        stack = self.tif.astype(np.float64)

        # Temporal smoothing
        if smooth and sigma > 0:
            from scipy.ndimage import gaussian_filter1d
            stack = gaussian_filter1d(stack, sigma=sigma, axis=0)

        # Calculate dF/F
        fps = g.win.framerate or 10.0
        baseline_frames = max(1, int(fps * baseline_seconds))
        baseline = stack[:baseline_frames].mean(axis=0)

        # Avoid division by zero
        baseline[baseline == 0] = 1.0
        self.newtif = (stack - baseline) / baseline

        self.newname = f"{self.oldname} - dF/F (baseline={baseline_seconds}s)"
        return self.end()


# Create the module-level instance that FLIKA will use
piezo_analyzer = PiezoAnalyzer()
```

### Available UI widgets for plugins

| Widget | Purpose | Key methods |
|---|---|---|
| `SliderLabel(decimals)` | Numeric slider + spinbox | `.setRange(min, max)`, `.setValue(val)`, `.value()` |
| `SliderLabelOdd()` | Slider that only allows odd numbers | Same as SliderLabel |
| `CheckBox()` | Boolean toggle | `.setChecked(True)`, `.isChecked()` |
| `ComboBox()` | Dropdown selector | `.addItem(text)`, `.addItems([...])` |
| `WindowSelector()` | Button to select a FLIKA window | `.value()` returns the selected Window |
| `FileSelector(filetypes)` | Button to select a file | `.value()` returns the file path |
| `ColorSelector()` | Button to pick a colour | `.color` attribute (hex string) |

### Plugin without a prior window

If your plugin creates new data (e.g. loads a special file format or generates synthetic data), inherit from `BaseProcess_noPriorWindow`:

```python
from flika.utils.BaseProcess import BaseProcess_noPriorWindow, FileSelector
from flika.window import Window
import numpy as np


class SyntheticData(BaseProcess_noPriorWindow):
    """Generate synthetic calcium imaging data for testing."""

    def __init__(self):
        super().__init__()

    def gui(self):
        self.gui_reset()
        # ... define parameters ...
        super().gui()

    def __call__(self, n_frames=500, width=128, n_cells=5):
        # Generate fake data
        stack = np.random.poisson(100, (n_frames, width, width)).astype(np.float64)
        # ... add synthetic calcium transients ...

        Window(stack, name=f"Synthetic ({n_cells} cells)")


synthetic_data = SyntheticData()
```

### Tips for plugin development

1. **Start from a template:** Clone an existing plugin with a similar structure
2. **Test interactively:** Use the script editor to test your `__call__` method before building the GUI
3. **Use `get_init_settings_dict`:** This saves parameter values between sessions so users do not have to re-enter them
4. **Add a docstring:** The docstring of your class is displayed in the plugin dialog --- use it to explain what the plugin does
5. **Handle edge cases:** Check for 2D vs 3D input, handle missing ROIs, and validate parameters
6. **Process large data carefully:** Use `qApp.processEvents()` inside long loops to keep the GUI responsive

---

## 23. Using AI to Generate FLIKA Scripts and Plugins

AI assistants like Claude can be powerful tools for writing FLIKA scripts, building plugins, and troubleshooting your analysis code. However, to get useful results, you need to provide the right context in your prompts. FLIKA is a specialised application with a small user base, so AI models may not have detailed knowledge of its API unless you tell them about it.

### Why context matters

General-purpose AI models are trained on publicly available code and documentation. They know Python, NumPy, SciPy, and common libraries very well. However, they may have limited or outdated knowledge of FLIKA-specific APIs. The key to getting good results is to **include the relevant FLIKA details in your prompt** so the AI can write correct code.

### What to include in your prompts

#### 1. Describe the FLIKA environment

Always start by telling the AI what FLIKA is and how it works. You can paste a summary like this at the start of your conversation:

```
I am using FLIKA, a Python-based fluorescence microscopy image analysis
application. Key things to know:

- Images are stored as NumPy arrays in Window objects: g.win.image
  (shape: frames x height x width for stacks, or height x width for 2D)
- Global state is accessed via: import flika.global_vars as g
  - g.win = currently selected window
  - g.windows = list of all open windows
  - g.win.mt = number of frames, g.win.mx = width, g.win.my = height
  - g.win.framerate = frames per second
  - g.win.rois = list of ROIs on the current window
- Built-in processing functions are in flika.process (e.g. gaussian_blur,
  threshold, zproject, deinterleave)
- ROIs are created with: from flika.roi import makeROI
- New windows are created with: from flika.window import Window
  then Window(numpy_array, name="My Result")
- Scripts run in the FLIKA script editor or as standalone Python scripts
  that call flika.start_flika() first
```

#### 2. Provide the specific API details you need

If you are asking about a particular FLIKA function or plugin, paste the relevant information. For example:

```
The FLIKA gaussian_blur function works like this:
  from flika.process import gaussian_blur
  gaussian_blur(sigma=2.0)
It operates on the current window (g.win) and replaces its data in place.
The sigma parameter controls the width of the Gaussian kernel.
```

You can find this information in this manual (especially the API Quick Reference in Section 28) or by inspecting FLIKA's source code.

#### 3. Describe your data clearly

Be specific about what your data looks like:

```
My data is a TIFF stack of PIEZO1-GFP TIRF microscopy recordings:
- 1000 frames at 20 fps (50 seconds total)
- 512 x 512 pixels
- 16-bit unsigned integer
- The first 100 frames (5 seconds) are baseline before stimulation
- Cells are HEK293T expressing PIEZO1-GFP
- I have ~10-15 cells per field of view
```

#### 4. State exactly what you want the script to do

Break your goal into clear steps:

```
I need a script that:
1. Opens a TIFF stack in FLIKA
2. Applies a Gaussian blur with sigma=1.5
3. Computes dF/F using the first 100 frames as baseline
4. Creates ROIs on the 5 brightest cells automatically
5. Extracts traces from each ROI
6. Saves the traces to a CSV file with columns: frame, time_s, cell_1, cell_2, ...
```

### Example prompts

#### Example 1: Generating a simple analysis script

> **Prompt:**
>
> I am using FLIKA, a Python fluorescence microscopy image analysis tool. Images are NumPy arrays stored in Window objects accessed via `import flika.global_vars as g` --- `g.win.image` gives the current image array (frames, height, width). Processing functions like `gaussian_blur(sigma)` are in `flika.process` and operate on the current window.
>
> I have a folder of TIFF stacks from calcium imaging experiments on PIEZO1-expressing HEK293T cells. Each stack is 500 frames at 10 fps, 256x256 pixels. I need a FLIKA script that:
> 1. Opens each TIFF file in a folder
> 2. Applies a Gaussian blur (sigma=1.0)
> 3. Computes dF/F using frames 0-49 as baseline
> 4. Saves the dF/F stack as a new TIFF
> 5. Extracts the mean intensity trace from the whole field of view and saves it as a CSV
> 6. Closes all windows before processing the next file
>
> The script should run in the FLIKA script editor.

#### Example 2: Asking for help with a plugin

> **Prompt:**
>
> I need help writing a FLIKA plugin. FLIKA plugins inherit from BaseProcess and follow this pattern:
>
> ```python
> from flika.utils.BaseProcess import BaseProcess, SliderLabel, CheckBox
> from flika.window import Window
> import flika.global_vars as g
> import numpy as np
>
> class MyPlugin(BaseProcess):
>     def __init__(self):
>         super().__init__()
>
>     def get_init_settings_dict(self):
>         return {'param1': 5.0, 'param2': True}
>
>     def gui(self):
>         self.gui_reset()
>         # Add UI widgets to self.items:
>         slider = SliderLabel(1)  # 1 decimal place
>         slider.setRange(0.1, 50.0)
>         slider.setValue(5.0)
>         self.items.append({'name': 'param1', 'string': 'My Parameter', 'object': slider})
>         super().gui()
>
>     def __call__(self, param1=5.0, param2=True, keepSourceWindow=False):
>         self.start(keepSourceWindow)
>         # self.tif = source image as numpy array
>         # Do processing...
>         self.newtif = result_array
>         self.newname = f"{self.oldname} - processed"
>         return self.end()
>
> my_plugin = MyPlugin()
> ```
>
> Available UI widgets: SliderLabel(decimals), CheckBox(), ComboBox(), WindowSelector(), FileSelector(filetypes).
>
> I want a plugin that detects bright spots (possible PIEZO1 clusters) in TIRF images. It should:
> - Take the current window (a time-averaged TIRF image, 2D)
> - Apply a difference-of-Gaussians filter (user sets sigma1 and sigma2 with sliders)
> - Threshold to find spots (user sets threshold with a slider)
> - Remove spots smaller than a minimum size (user sets with slider)
> - Label each detected spot
> - Create a new window showing the labelled spots
> - Print the number of spots found, and their mean size and intensity

#### Example 3: Debugging a script

> **Prompt:**
>
> I am using FLIKA (Python microscopy tool). My script is giving an error and I need help fixing it. Here is the script:
>
> ```python
> from flika import *
> from flika.process.file_ import open_file
> from flika.process import gaussian_blur, zproject
>
> win = open_file("data.tif")
> gaussian_blur(sigma=2)
> mean = zproject(0, g.win.mt, 'Average')
> ```
>
> The error is:
> ```
> IndexError: index 500 is out of bounds for axis 0 with size 500
> ```
>
> The TIFF has 500 frames. In FLIKA, `g.win.mt` returns the number of frames, and `zproject(firstFrame, lastFrame, projection_type)` uses zero-based indexing.

(The fix is that `lastFrame` should be `g.win.mt - 1` since frame indices are zero-based.)

#### Example 4: Converting analysis ideas to code

> **Prompt:**
>
> I am using FLIKA for TIRF microscopy analysis of PIEZO1-GFP. Data is in `g.win.image` as a NumPy array (frames, height, width). I can create new FLIKA windows with `Window(array, name="name")`.
>
> I want to quantify how PIEZO1-GFP clusters move over time. My idea:
> - I have a time-lapse TIRF recording (1000 frames, 512x512)
> - PIEZO1-GFP appears as bright spots on the cell membrane
> - I want to track how the total number of visible spots changes over time
> - I also want to measure the mean spot intensity in each frame
>
> I know basic Python and NumPy. Can you write a script that does this, using scipy and skimage for the detection? Please explain each step so I can understand and modify it.

### Tips for better results

1. **Paste the API Quick Reference.** If you are having a long conversation with Claude about FLIKA, paste the key parts of Section 28 (API Quick Reference) at the start. This gives the AI a reliable reference to write correct code.

2. **Include error messages in full.** When debugging, paste the complete error traceback, not just the last line. The full traceback shows which line and function caused the problem.

3. **Show your current code.** If you have a partially working script, include it. The AI can build on what you have rather than starting from scratch.

4. **Specify whether the script runs in the FLIKA script editor or standalone.** Scripts running standalone need `import flika; flika.start_flika()` at the top. Scripts in the FLIKA editor do not.

5. **Mention the libraries you have installed.** If you know you have scipy, scikit-image, pandas, etc. installed, say so. If you are not sure, the AI can suggest what you need to install.

6. **Ask for explanations.** If you are learning, ask the AI to add comments explaining each step. This helps you understand the code and modify it for future experiments.

7. **Iterate.** If the first result is not quite right, describe what went wrong and ask for corrections. You can say things like "This works but the baseline subtraction is not correct --- the baseline should be the mean of the first 5 seconds, not the first frame" and the AI will fix it.

8. **Test on a small dataset first.** Before running AI-generated code on your full dataset, test it on a single small file to make sure it works correctly.

### What AI assistants are good at (and not so good at)

**AI is good at:**
- Writing boilerplate code (batch processing loops, file I/O, CSV export)
- Translating your analysis ideas into NumPy/SciPy code
- Building the GUI structure for FLIKA plugins (the `gui()` method and widget setup)
- Debugging error messages and suggesting fixes
- Explaining what existing code does
- Converting MATLAB or ImageJ macro logic into FLIKA Python scripts
- Suggesting appropriate scipy/skimage functions for image processing tasks

**AI may struggle with:**
- Knowing the exact FLIKA API without you providing it (always include API details)
- Understanding your specific experimental setup (always describe your data)
- Choosing the right biological parameters (e.g. threshold values, ROI sizes) --- you need to validate these yourself
- Knowing which FLIKA plugins are available or how they work (paste the plugin API if relevant)
- Performance optimisation for very large datasets --- test and profile the code yourself

### Using Claude with the FLIKA source code

For advanced work, you can share relevant parts of the FLIKA source code with Claude to help it understand how specific features work. For example, if you want to understand or extend the ROI system, you could share the contents of `flika/roi.py`. Similarly, if you want to create a plugin that interacts with TraceFig, sharing `flika/tracefig.py` will help the AI write correct code.

You can also share the source code of an existing plugin as a template. For example:

> **Prompt:**
>
> Here is the source code for an existing FLIKA plugin that detects calcium puffs (attached). I want to create a similar plugin but instead of detecting puffs, it should detect and count step-like intensity changes (photobleaching steps) in single-molecule PIEZO1-GFP traces. Please use the same plugin structure (BaseProcess, gui, \_\_call\_\_) but modify the detection algorithm.

---

## 24. Workflow: Calcium Imaging Analysis

A step-by-step workflow for analysing calcium imaging data from PIEZO1-expressing cells.

### Step 1: Load the data

```python
from flika import *
from flika.process.file_ import open_file
from flika.process import gaussian_blur, zproject
from flika.roi import makeROI
import numpy as np

# Open the calcium imaging stack
win = open_file("piezo1_calcium_001.tif")
print(f"Stack: {g.win.image.shape}, fps: {g.win.framerate}")
```

### Step 2: Inspect the data

```python
# Create a mean projection to see all cells
mean_win = zproject(firstFrame=0, lastFrame=g.win.mt - 1,
                    projection_type='Average', keepSourceWindow=True)

# Also check a max projection
g.windows[0].setAsCurrentWindow()    # Go back to original stack
max_win = zproject(firstFrame=0, lastFrame=g.win.mt - 1,
                   projection_type='Max Intensity', keepSourceWindow=True)
```

### Step 3: Filter (optional)

```python
# Go back to the original stack
g.windows[0].setAsCurrentWindow()

# Light spatial smoothing to reduce noise
gaussian_blur(sigma=1.0)
```

### Step 4: Define ROIs

```python
# Create ROIs for cells and background
roi_cell1 = makeROI('rectangle', [[200, 200], [230, 230]], window=g.win)
roi_cell2 = makeROI('rectangle', [[300, 150], [330, 180]], window=g.win)
roi_bg    = makeROI('rectangle', [[10, 10], [40, 40]], window=g.win)

# Plot all traces
g.win.plotAllROIs()
```

### Step 5: Extract and analyse traces

```python
# Extract raw traces
trace1 = roi_cell1.getTrace()
trace2 = roi_cell2.getTrace()
bg     = roi_bg.getTrace()

# Background correction
corr1 = trace1 - bg
corr2 = trace2 - bg

# dF/F
fps = g.win.framerate or 10.0
baseline_frames = int(fps * 5)    # 5-second baseline
f0_1 = corr1[:baseline_frames].mean()
f0_2 = corr2[:baseline_frames].mean()
dff1 = (corr1 - f0_1) / f0_1
dff2 = (corr2 - f0_2) / f0_2

# Find peaks
from scipy.signal import find_peaks
peaks1, props1 = find_peaks(dff1, height=0.05, distance=int(fps * 2))
peaks2, props2 = find_peaks(dff2, height=0.05, distance=int(fps * 2))

print(f"Cell 1: {len(peaks1)} transients, peak dF/F = {dff1.max():.3f}")
print(f"Cell 2: {len(peaks2)} transients, peak dF/F = {dff2.max():.3f}")
```

### Step 6: Plot and save

```python
import matplotlib.pyplot as plt

time = np.arange(len(dff1)) / fps
fig, ax = plt.subplots(figsize=(12, 5))
ax.plot(time, dff1, label="Cell 1", lw=1.5)
ax.plot(time, dff2, label="Cell 2", lw=1.5)
ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.set_title("PIEZO1 Calcium Responses")
ax.legend()
plt.tight_layout()
plt.savefig("calcium_traces.png", dpi=300)
plt.show()

# Save ROIs for later reuse
from flika.process.file_ import save_rois
save_rois("calcium_rois.txt")
```

---

## 25. Workflow: TIRF Image Processing

A workflow for processing TIRF microscopy images of PIEZO1-GFP at the cell membrane.

```python
from flika import *
from flika.process.file_ import open_file, save_file
from flika.process import (gaussian_blur, subtract, zproject,
                           threshold, remove_small_blobs)
import numpy as np

# 1. Load
win = open_file("piezo1_gfp_tirf.tif")

# 2. Background subtraction (rolling ball equivalent)
#    Compute a heavily blurred version and subtract it
from flika.process import duplicate
dup = duplicate()
gaussian_blur(sigma=50)    # Now g.win is the blurred version
bg_win = g.win

# Switch to the original and subtract
g.windows[0].setAsCurrentWindow()
from flika.process import ratio
# Use the blurred image as a baseline for dF/F-like normalisation
corrected = ratio(baselineWindow=bg_win)

# 3. Temporal filtering to highlight dynamics
from flika.process import difference_filter
diff_win = difference_filter()

# 4. Create a mean projection of the corrected stack
g.windows[-2].setAsCurrentWindow()    # Go back to corrected
mean_proj = zproject(firstFrame=0, lastFrame=g.win.mt - 1,
                     projection_type='Average')

# 5. Save results
save_file("piezo1_tirf_processed.tif")
```

---

## 26. Workflow: Kymograph Analysis

Kymographs (space-time images) are valuable for analysing dynamics along a membrane or a line feature.

```python
from flika import *
from flika.process.file_ import open_file
from flika.roi import makeROI
import flika.global_vars as g

# 1. Load the stack
win = open_file("membrane_dynamics.tif")

# 2. Set mouse mode to 'line'
g.setmousemode('line')

# 3. Draw a line ROI along the membrane (interactively in the GUI)
#    Or create one from a script:
roi = makeROI('line', [[100, 50], [100, 400]], window=g.win)

# 4. The kymograph is automatically generated
#    Access it via:
kymo = roi.kymograph    # This is a FLIKA Window showing the kymograph

# 5. The kymograph is a 2D image:
#    x-axis = position along the line
#    y-axis = time (frames)
#    Pixel intensity = fluorescence at that position and time

# 6. You can process the kymograph like any other image
#    e.g. enhance contrast:
from flika.process import gaussian_blur
kymo.setAsCurrentWindow()
gaussian_blur(sigma=1.0)

# 7. Save the kymograph
from flika.process.file_ import save_file
save_file("kymograph.tif")
```

For advanced kymograph analysis (velocity measurement, event detection, dwell times), use the **kymograph_analyzer** plugin.

---

## 27. Workflow: Multi-Channel Experiments

When imaging PIEZO1 with two fluorescent channels (e.g. PIEZO1-GFP and a calcium indicator like mCherry-GECO), you need to separate the channels.

### If channels are interleaved (alternating frames)

```python
from flika import *
from flika.process.file_ import open_file
from flika.process import deinterleave

# Load the interleaved stack
win = open_file("dual_channel.tif")
print(f"Total frames: {g.win.mt}")    # e.g. 1000 (500 per channel)

# Separate into two windows (one per channel)
deinterleave(nChannels=2)

# Now you have two windows:
# g.windows[-2] = channel 1 (e.g. GFP, 500 frames)
# g.windows[-1] = channel 2 (e.g. mCherry, 500 frames)

# Link them so the time sliders move together
g.windows[-2].link(g.windows[-1])
```

### If channels are side-by-side (beam splitter)

Use the **BeamSplitter** plugin:

```python
# From the Plugins menu: BeamSplitter > Beam Splitter Dialog
# Or from a script, after installing the plugin:
from flika_plugins.BeamSplitter import beam_splitter
beam_splitter.gui()    # Opens the dialog
```

### Analysing both channels

```python
from flika.roi import makeROI
import numpy as np

# Create matching ROIs on both channels
gfp_win = g.windows[-2]
ca_win = g.windows[-1]

gfp_win.setAsCurrentWindow()
roi_gfp = makeROI('rectangle', [[200, 200], [230, 230]], window=gfp_win)

ca_win.setAsCurrentWindow()
roi_ca = makeROI('rectangle', [[200, 200], [230, 230]], window=ca_win)

# Link the ROIs so they move together
roi_gfp.link(roi_ca)

# Extract traces
gfp_trace = roi_gfp.getTrace()
ca_trace = roi_ca.getTrace()

# Now you can correlate PIEZO1-GFP membrane dynamics with calcium signals
from scipy.stats import pearsonr
r, p = pearsonr(gfp_trace, ca_trace)
print(f"Correlation: r = {r:.3f}, p = {p:.4f}")
```

---

## 28. API Quick Reference

### Imports

```python
from flika import *                              # Standard FLIKA setup
import flika.global_vars as g                    # Global state
from flika.window import Window                  # Create windows
from flika.roi import makeROI, open_rois         # ROI tools
from flika.process.file_ import (open_file, save_file,
    open_image_sequence, save_points, save_rois, open_points)
from flika.process import (gaussian_blur, median_filter, mean_filter,
    bilateral_filter, difference_of_gaussians, butterworth_filter,
    fourier_filter, wavelet_filter, difference_filter,
    boxcar_differential_filter, variance_filter,
    subtract, multiply, divide, power, sqrt, ratio,
    absolute_value, subtract_trace, divide_trace,
    threshold, adaptive_threshold, canny_edge_detector,
    logically_combine, remove_small_blobs,
    binary_erosion, binary_dilation, generate_rois,
    duplicate, trim, zproject, resize, deinterleave,
    pixel_binning, frame_binning, concatenate_stacks,
    change_datatype, time_stamp, scale_bar, split_channels)
```

### Global state

| Expression | Returns |
|---|---|
| `g.win` | Currently selected Window |
| `g.windows` | List of all open Windows |
| `g.win.image` | Image data as NumPy array |
| `g.win.mt` | Number of frames |
| `g.win.mx`, `g.win.my` | Width, height in pixels |
| `g.win.framerate` | Frames per second |
| `g.win.currentIndex` | Currently displayed frame |
| `g.win.rois` | List of ROIs in current window |
| `g.win.currentROI` | Currently selected ROI |
| `g.settings` | Persistent settings dict |

### Window operations

| Code | Action |
|---|---|
| `open_file("path.tif")` | Open a TIFF file |
| `save_file("path.tif")` | Save current window |
| `Window(array, name="x")` | Create window from array |
| `g.win.setIndex(n)` | Jump to frame n |
| `g.win.setName("x")` | Rename window |
| `g.win.link(win2)` | Link time sliders |
| `g.win.close()` | Close window |

### ROI operations

| Code | Action |
|---|---|
| `makeROI('rectangle', [[y1,x1],[y2,x2]], window=g.win)` | Create rectangle ROI |
| `makeROI('line', [[y1,x1],[y2,x2]], window=g.win)` | Create line ROI |
| `makeROI('freehand', pts, window=g.win)` | Create freehand ROI |
| `roi.getTrace()` | Get intensity trace (1D array) |
| `roi.getMask()` | Get pixel coordinates (xx, yy) |
| `roi.plot()` | Display trace in TraceFig |
| `roi.unplot()` | Remove from TraceFig |
| `roi.delete()` | Delete the ROI |
| `roi.crop()` | Crop image to ROI (rectangle only) |
| `roi.kymograph` | Get kymograph (line ROIs only) |
| `roi.link(roi2)` | Link ROIs to move together |

### Filters

| Code | Action |
|---|---|
| `gaussian_blur(sigma=2.0)` | Gaussian spatial smoothing |
| `median_filter(size=3)` | Median filter |
| `mean_filter(size=3)` | Local mean |
| `bilateral_filter(sigma_space=3, sigma_intensity=50)` | Edge-preserving smooth |
| `difference_of_gaussians(sigma1=1, sigma2=5)` | Bandpass filter |
| `butterworth_filter(order=2, cutoff=0.1)` | Frequency low-pass |
| `difference_filter()` | Frame-to-frame difference |

### Math

| Code | Action |
|---|---|
| `subtract(value=100)` | Subtract constant |
| `multiply(value=2)` | Multiply by constant |
| `ratio(baselineWindow=win)` | Divide by baseline |
| `sqrt()` | Square root |

### Stacks

| Code | Action |
|---|---|
| `duplicate()` | Copy current window |
| `trim(first, last)` | Extract frame range |
| `zproject(first, last, 'Average')` | Z-projection |
| `deinterleave(nChannels=2)` | Separate channels |
| `frame_binning(nFrames=5)` | Bin frames |
| `pixel_binning(nPixels=2)` | Bin pixels |

---

## 29. Troubleshooting

### FLIKA does not start

```
ModuleNotFoundError: No module named 'flika'
```
**Fix:** Make sure FLIKA is installed (`pip install flika`) and you have activated the correct conda environment (`conda activate flika_env`).

### Import errors for plugins

```
ImportError: No module named 'scipy.signal'
```
**Fix:** Install the missing dependency in your conda environment: `pip install scipy`.

### Image appears blank or wrong colours

**Cause:** The display range may not match the data range.
**Fix:** Scroll the mouse wheel over the colourbar to adjust brightness/contrast. Or from a script: the display is auto-adjusted when the window is created, but you can modify the lookup table interactively.

### "Window is closed" errors in scripts

**Cause:** You are trying to access a window that has been closed.
**Fix:** Check `g.win.closed` before accessing window attributes. When processing multiple files, make sure you close old windows and update `g.win` appropriately.

### Processing is slow on large stacks

**Suggestions:**
- Enable multiprocessing: `g.settings['multiprocessing'] = True`
- Use `pixel_binning` to reduce spatial resolution before analysis
- Use `trim` to work on a subset of frames first
- Use `frame_binning` to reduce temporal resolution
- Close windows you no longer need to free memory

### ROI trace looks wrong

**Cause:** The ROI may be in the wrong position, or the image may have been modified.
**Fix:**
- Check the ROI position by hovering over it
- Make sure you are extracting the trace from the correct window
- Check `g.win.image.shape` to ensure dimensions are what you expect

### Script editor does not show output

**Fix:** Make sure you are using `print()` for output. Check the IPython terminal at the bottom of the script editor for any error messages.

### Plugin not appearing in the menu

**Fix:**
1. Check that the plugin is in `~/.FLIKA/plugins/`
2. Verify the `info.xml` file has correct syntax and function references
3. Restart FLIKA
4. Check the terminal/console for import errors when FLIKA starts

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using FLIKA for fluorescence microscopy image analysis. For questions or suggestions, contact george.dickinson@gmail.com.*

*When using FLIKA in published research, please cite: Ellefsen et al., Cell Calcium 56:147-156, 2014.*
