# Napari Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why Napari?](#1-introduction-why-napari)
2. [Installing Napari](#2-installing-napari)
3. [The Napari Interface](#3-the-napari-interface)
4. [Opening and Viewing Images](#4-opening-and-viewing-images)

**Part II: Layer Types**

5. [Image Layers](#5-image-layers)
6. [Labels Layers (Segmentation Masks)](#6-labels-layers-segmentation-masks)
7. [Points Layers](#7-points-layers)
8. [Shapes Layers](#8-shapes-layers)
9. [Tracks Layers](#9-tracks-layers)
10. [Vectors and Surface Layers](#10-vectors-and-surface-layers)

**Part III: Working with the Viewer**

11. [Navigation: Pan, Zoom, Scroll, and 3D](#11-navigation-pan-zoom-scroll-and-3d)
12. [Contrast, Colourmaps, and Blending](#12-contrast-colourmaps-and-blending)
13. [Multi-Channel and Multi-Dimensional Data](#13-multi-channel-and-multi-dimensional-data)
14. [Overlays: Scale Bars, Text, and Colourbars](#14-overlays-scale-bars-text-and-colourbars)
15. [Grid Mode](#15-grid-mode)

**Part IV: The Python API**

16. [Launching Napari from Python](#16-launching-napari-from-python)
17. [Adding and Manipulating Layers Programmatically](#17-adding-and-manipulating-layers-programmatically)
18. [The Built-In Console](#18-the-built-in-console)
19. [Connecting Napari to NumPy, scikit-image, and scipy](#19-connecting-napari-to-numpy-scikit-image-and-scipy)
20. [Saving Data and Screenshots](#20-saving-data-and-screenshots)

**Part V: Annotations and Manual Analysis**

21. [Drawing ROIs with Shapes](#21-drawing-rois-with-shapes)
22. [Painting Labels (Manual Segmentation)](#22-painting-labels-manual-segmentation)
23. [Placing Points (Cell Counting, Landmarks)](#23-placing-points-cell-counting-landmarks)
24. [Measuring from Annotations](#24-measuring-from-annotations)

**Part VI: Plugins**

25. [The Plugin Ecosystem](#25-the-plugin-ecosystem)
26. [Cell Segmentation: Cellpose and StarDist](#26-cell-segmentation-cellpose-and-stardist)
27. [Other Essential Plugins](#27-other-essential-plugins)
28. [Writing a Simple Plugin](#28-writing-a-simple-plugin)

**Part VII: Workflows for Biology**

29. [Workflow 1: Calcium Imaging Trace Inspection](#29-workflow-1-calcium-imaging-trace-inspection)
30. [Workflow 2: Cell Segmentation and Measurement](#30-workflow-2-cell-segmentation-and-measurement)
31. [Workflow 3: Multi-Channel TIRF Overlay](#31-workflow-3-multi-channel-tirf-overlay)
32. [Workflow 4: 3D Z-Stack Visualisation](#32-workflow-4-3d-z-stack-visualisation)
33. [Workflow 5: Manual Annotation for Training Data](#33-workflow-5-manual-annotation-for-training-data)

**Part VIII: Tips and Integration**

34. [Napari vs. FIJI/ImageJ: When to Use Which](#34-napari-vs-fijiimagej-when-to-use-which)
35. [Performance Tips for Large Data](#35-performance-tips-for-large-data)
36. [Keyboard Shortcuts Quick Reference](#36-keyboard-shortcuts-quick-reference)
37. [Common Problems and Troubleshooting](#37-common-problems-and-troubleshooting)

---

## 1. Introduction: Why Napari?

### What is Napari?

Napari is a free, open-source, Python-native, multi-dimensional image viewer designed for browsing, annotating, and analysing large scientific images. It is built on top of **Qt** (for the GUI), **VisPy** (for GPU-accelerated rendering), and the scientific Python stack (**NumPy**, **SciPy**). The current stable version is **0.6.5** (October 2025).

Napari was created in 2018--2019 by a team including **Nicholas Sofroniew**, **Talley Lambert**, **Juan Nunez-Iglesias**, **Kevin Yamauchi**, **Kira Evans**, **Grzegorz Bokota**, and others, with significant support from the **Chan Zuckerberg Initiative (CZI)**. The project is community-governed and developed in the open on GitHub.

The name "napari" comes from a type of coral found in the Pacific Ocean --- fitting for a tool that helps visualise the intricate structures of biological imaging data.

### Why Napari for microscopy research?

| Feature | What it means for you |
|---|---|
| **N-dimensional first** | Built for 2D, 3D, 4D, and 5D data from the ground up. Time-lapse Z-stacks with multiple channels are first-class citizens. |
| **GPU-accelerated** | VisPy renders images on the GPU. Large datasets display smoothly. |
| **Python-native** | Every viewer operation is a Python API call. Script everything. |
| **Bidirectional** | Changes in the GUI update Python objects; changes in code update the GUI. |
| **Layer-based** | Overlay images, segmentation masks, points, shapes, tracks, and vectors. |
| **Plugin ecosystem** | Extend with cellpose, StarDist, napari-animation, and hundreds more. |
| **Free and open source** | BSD-3 licence. No fees, no subscriptions. |
| **Active development** | Funded by CZI, with frequent releases and a growing community. |

### What Napari is NOT

Napari is a **viewer and annotation tool**, not a complete image processing suite. It does not have FIJI's 500+ built-in menu commands. Instead, Napari integrates with the Python ecosystem --- you use scikit-image, scipy, cellpose, etc. for processing, and Napari for visualisation, annotation, and interaction. Think of it as the display layer that connects to Python's analysis power.

### How to cite Napari

```
napari contributors (2019). napari: a multi-dimensional image viewer for python.
doi:10.5281/zenodo.3555620
```

---

## 2. Installing Napari

### Recommended installation (conda)

```bash
# Create a dedicated environment
conda create -y -n napari-env -c conda-forge python=3.11

# Activate it
conda activate napari-env

# Install napari with all GUI dependencies
pip install "napari[all]"

# Verify
napari --version
```

The `[all]` extra installs a Qt backend (PyQt5 or PySide6). Without it, napari has no GUI.

### Alternative: pip only

```bash
python -m venv napari-env
source napari-env/bin/activate    # Linux/macOS
# napari-env\Scripts\activate     # Windows

pip install "napari[all]"
```

### Installing with specific Qt backends

```bash
pip install "napari[pyqt5]"       # PyQt5 backend
pip install "napari[pyside6]"     # PySide6 backend (newer, increasingly recommended)
```

### Bundled installer (no Python required)

For users who do not have Python installed, napari provides platform-specific bundled installers at https://napari.org/stable/tutorials/fundamentals/quick_start.html. These include Python and all dependencies in a self-contained application.

### Installing common microscopy packages alongside Napari

```bash
pip install tifffile imagecodecs scikit-image scipy cellpose stardist
```

---

## 3. The Napari Interface

### Main components

**Canvas (centre)** --- The image display area. GPU-rendered via VisPy. Supports 2D and 3D viewing. All layers are composited here.

**Layer List (left panel)** --- Shows all layers (images, labels, points, shapes, etc.) in the viewer. Layers are drawn from bottom to top --- the topmost layer in the list is drawn on top. Click the eye icon to toggle visibility. Click the layer name to select it.

**Layer Controls (left panel, below layer list)** --- Properties for the currently selected layer: contrast limits, colourmap, opacity, blending mode, brush size (for labels), symbol size (for points), etc. The controls change depending on the layer type.

**Dimension Sliders (below canvas)** --- For data with more than 2 spatial dimensions, sliders let you scrub through time points, Z-slices, or channels. For example, a 4D dataset (T, Z, Y, X) shows two sliders: one for time and one for Z.

**Status Bar (bottom)** --- Displays cursor coordinates, pixel values under the cursor, and the current data coordinates.

**Activity Dock (bottom)** --- Shows progress bars and log messages from long-running operations.

### Opening the console

The built-in IPython console gives you live access to the viewer and all layer data while the GUI is open. Open it via the menu: **Window → Console** or press the console button in the bottom-left corner.

In the console, the variable `viewer` refers to the current napari Viewer instance:

```python
>>> viewer.layers
[<Image layer 'calcium_stack' at 0x...>]
>>> viewer.layers[0].data.shape
(500, 512, 512)
```

---

## 4. Opening and Viewing Images

### From the GUI

- **File → Open File(s)** — select one or more files (TIFF, PNG, JPEG, etc.)
- **File → Open Folder** — open an entire folder as an image sequence
- **File → Open Sample** — built-in sample datasets for testing
- **Drag and drop** — drag files directly onto the napari window

### From the command line

```bash
# Open a single file
napari path/to/image.tif

# Open multiple files
napari file1.tif file2.tif

# Open a folder
napari path/to/folder/
```

### From Python

```python
import napari
import tifffile

# Load an image
stack = tifffile.imread("calcium_timelapse.tif")

# Open the viewer and add the image
viewer = napari.Viewer()
viewer.add_image(stack, name="Calcium Imaging")

napari.run()   # start the event loop (required when running from a script)
```

### Using napari.imshow() for quick viewing

```python
import napari
from skimage import data

# One-liner: create viewer and add image in one call
viewer, layer = napari.imshow(data.cells3d(), channel_axis=1, ndisplay=3)
napari.run()
```

---

## 5. Image Layers

Image layers display pixel data: single images, time-lapse stacks, Z-stacks, multi-channel volumes.

### Adding image layers

```python
# Basic: 2D image
viewer.add_image(image_2d, name="Brightfield")

# Time-lapse stack (T, Y, X)
viewer.add_image(timelapse, name="Calcium", colormap="magma")

# Multi-channel (split channels into separate layers)
viewer.add_image(multichannel, channel_axis=1, name=["GFP", "mCherry"])

# 3D volume (Z, Y, X)
viewer.add_image(volume, name="Z-stack", rendering="mip")
```

### Key properties

```python
layer = viewer.layers["Calcium"]

layer.data                 # the underlying NumPy array
layer.contrast_limits      # (min, max) for display
layer.colormap             # current colourmap (e.g., "gray", "magma", "green")
layer.opacity              # 0.0 to 1.0
layer.blending             # "translucent", "additive", "opaque", "minimum"
layer.visible              # True/False
layer.name                 # display name
layer.scale                # pixel size (e.g., (1.0, 0.107, 0.107) for Z, Y, X in µm)
layer.translate            # offset in world coordinates
layer.rendering            # 3D rendering: "mip", "attenuated_mip", "minip", "translucent", "iso"
```

### Setting contrast limits

```python
# Auto-contrast (full range of actual data)
layer.contrast_limits = (layer.data.min(), layer.data.max())

# Manual contrast
layer.contrast_limits = (100, 3000)

# Percentile-based (good default for microscopy)
import numpy as np
lo, hi = np.percentile(layer.data, (1, 99.5))
layer.contrast_limits = (lo, hi)
```

### Setting the physical scale (pixel size)

```python
# If your pixels are 0.107 µm × 0.107 µm
viewer.add_image(data, scale=(0.107, 0.107), name="TIRF")

# For a Z-stack with 0.3 µm Z-step, 0.107 µm XY
viewer.add_image(zstack, scale=(0.3, 0.107, 0.107), name="Confocal")

# For time-lapse with 0.1 s interval, 0.107 µm pixels
viewer.add_image(timelapse, scale=(0.1, 0.107, 0.107), name="Calcium")
```

---

## 6. Labels Layers (Segmentation Masks)

Labels layers hold integer arrays where each unique value represents a different object (cell, nucleus, etc.). Value 0 is always background.

### Creating a labels layer

```python
import numpy as np

# From a segmentation result
labels = segment_cells(image)   # e.g., from cellpose or scikit-image
viewer.add_labels(labels, name="Cell Masks")

# Empty labels layer for manual painting
blank = np.zeros(image.shape[-2:], dtype=np.int32)
viewer.add_labels(blank, name="Manual Labels")
```

### Painting labels (manual segmentation)

With a Labels layer selected:

| Tool | Shortcut | Description |
|---|---|---|
| **Paint brush** | 2 | Paint with the current label value |
| **Erase** | 3 | Set pixels to 0 (background) |
| **Fill** | 4 | Flood-fill a contiguous region |
| **Pick** | 5 | Pick the label value under the cursor |
| **Pan/zoom** | 1 | Navigate without painting |

- **Brush size:** Adjust with the slider in layer controls, or use `[` and `]` keys
- **Current label:** Shown in layer controls. Change with `M` (next label) or by typing a number.
- **Preserve labels:** When enabled, painting does not overwrite existing non-zero labels.

### Properties

```python
labels_layer = viewer.layers["Cell Masks"]

labels_layer.data                # the integer mask array
labels_layer.selected_label      # current painting label
labels_layer.brush_size          # painting brush diameter
labels_layer.num_colors          # number of colours in the colourmap cycle
labels_layer.opacity             # 0.0 to 1.0

# Get unique label values
unique_labels = np.unique(labels_layer.data)
n_objects = len(unique_labels) - 1  # subtract 1 for background (0)
```

---

## 7. Points Layers

Points layers mark discrete locations in the image --- ideal for cell centroids, landmarks, puncta, or any coordinate-based annotations.

### Creating a points layer

```python
# From coordinates (N × D array: each row is a point)
coords = np.array([[100, 200], [150, 300], [200, 250]])
viewer.add_points(coords, name="Cell Centroids", size=10)

# With per-point properties
viewer.add_points(
    coords,
    name="Detections",
    size=8,
    face_color="cyan",
    properties={"intensity": [1500, 2200, 1800]},
)

# Empty points layer for interactive clicking
viewer.add_points(ndim=2, name="Click to add")
```

### Interactive point placement

With a Points layer selected and the **Add** tool active (shortcut: `2`), click on the image to place points. Press `1` to switch back to pan/zoom.

### Properties

```python
pts = viewer.layers["Cell Centroids"]

pts.data            # (N, D) array of coordinates
pts.size            # point display size
pts.face_color      # fill colour
pts.edge_color      # border colour
pts.symbol          # marker symbol ("o", "s", "+", "x", etc.)
pts.properties      # dict of per-point properties
```

### Research example: ThunderSTORM PIEZO1-HaloTag localizations

Single-molecule localization microscopy data --- such as PIEZO1-HaloTag puncta detected by ThunderSTORM in TIRF movies of hiPSC-derived cells (Bertaccini et al. 2025, *Nat. Commun.*) --- maps naturally onto a Points layer. ThunderSTORM outputs a CSV table of fitted localization coordinates; loading these into napari lets you overlay detections directly on the raw TIRF frames.

```python
import pandas as pd
import numpy as np

# Load ThunderSTORM localization results
locs = pd.read_csv("thunderstorm_locs.csv")
# Typical columns: frame, x [nm], y [nm], sigma [nm], intensity, offset, uncertainty [nm]

# Convert nm coordinates to pixel coordinates (e.g., 107 nm/px TIRF)
pixel_size = 107  # nm per pixel
coords = np.column_stack([
    locs["frame"].values,                   # time dimension
    locs["y [nm]"].values / pixel_size,     # Y in pixels
    locs["x [nm]"].values / pixel_size,     # X in pixels
])

# Colour by localization uncertainty for quality assessment
viewer.add_points(
    coords,
    name="PIEZO1-HaloTag Localizations",
    size=4,
    face_color="cyan",
    properties={
        "uncertainty_nm": locs["uncertainty [nm]"].values,
        "intensity": locs["intensity"].values,
    },
)

# Colour points by uncertainty to assess localization precision
pts = viewer.layers["PIEZO1-HaloTag Localizations"]
pts.face_color = "uncertainty_nm"
pts.face_colormap = "viridis"
```

Because the coordinate array includes a time (frame) column, napari automatically links each point to the correct time slider position, so stepping through frames reveals only the localizations from that frame --- exactly as they appear in the TIRF movie.

---

## 8. Shapes Layers

Shapes layers hold geometric primitives: rectangles, ellipses, polygons, lines, and paths. Use these for ROIs, measurements, and annotations.

### Creating a shapes layer

```python
# Add an empty shapes layer for drawing
viewer.add_shapes(name="ROIs")

# Add predefined rectangles (each is a list of corner points)
rects = [
    np.array([[10, 10], [10, 60], [60, 60], [60, 10]]),   # ROI 1
    np.array([[100, 100], [100, 200], [200, 200], [200, 100]]),  # ROI 2
]
viewer.add_shapes(rects, shape_type="rectangle", name="ROIs",
                  edge_color="yellow", face_color="transparent", edge_width=2)
```

### Drawing tools

With a Shapes layer selected:

| Tool | Shortcut | Description |
|---|---|---|
| **Rectangle** | R | Draw a rectangle by clicking and dragging |
| **Ellipse** | E | Draw an ellipse |
| **Line** | L | Draw a line segment |
| **Path** | T | Click to add vertices, double-click to finish |
| **Polygon** | P | Click to add vertices, double-click to close |
| **Select** | 5 | Select, move, and resize existing shapes |
| **Direct select** | 6 | Edit individual vertices |

---

## 9. Tracks Layers

Tracks layers display particle trajectories over time --- perfect for single-particle tracking (SPT) data.

### Creating a tracks layer

```python
# Track data: each row is (track_id, time, y, x)
tracks = np.array([
    [0, 0, 100, 200],
    [0, 1, 102, 203],
    [0, 2, 105, 208],
    [1, 0, 300, 150],
    [1, 1, 298, 152],
    [1, 2, 295, 155],
])

viewer.add_tracks(tracks, name="SPT Tracks")
```

### Properties

```python
tracks_layer = viewer.layers["SPT Tracks"]

tracks_layer.data         # (N, D+1) array: [track_id, t, z, y, x]
tracks_layer.tail_length  # how many frames of track history to display
tracks_layer.tail_width   # line width
tracks_layer.head_length  # frames of track future to display
tracks_layer.color_by     # "track_id" or a property name
```

---

## 10. Vectors and Surface Layers

### Vectors

Vectors layers display arrows --- for optical flow, gradient fields, or orientation data.

```python
# Each vector: [[start_y, start_x], [direction_y, direction_x]]
vectors = np.array([
    [[100, 200], [10, 5]],
    [[150, 300], [-5, 15]],
])
viewer.add_vectors(vectors, name="Flow Field", edge_width=2, edge_color="red")
```

### Surfaces

Surface layers display 3D meshes defined by vertices and faces.

```python
vertices = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]])
faces = np.array([[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]])
values = np.array([0.2, 0.5, 0.8, 1.0])  # scalar values at each vertex

viewer.add_surface((vertices, faces, values), name="Mesh", colormap="viridis")
```

---

## 11. Navigation: Pan, Zoom, Scroll, and 3D

### Mouse controls (2D)

| Action | Mouse gesture |
|---|---|
| **Pan** | Click and drag (or middle-click drag) |
| **Zoom** | Scroll wheel |
| **Zoom to region** | Alt + drag to draw a box (0.6.3+) |
| **Reset view** | Home key or double-click the canvas |

### Dimension sliders

For time-lapse or Z-stack data, the sliders below the canvas control which plane is displayed.

```python
# Scrub through time programmatically
viewer.dims.current_step = (50, 0, 0)  # go to frame 50 (for T, Z, Y, X data)

# Animate through time
import time
for t in range(100):
    viewer.dims.current_step = (t,) + viewer.dims.current_step[1:]
    time.sleep(0.05)
```

### 3D mode

Toggle between 2D and 3D viewing:

- Click the **2D/3D** toggle button in the bottom-left corner of the canvas
- Or set programmatically: `viewer.dims.ndisplay = 3`

In 3D mode:
- **Rotate:** Click and drag
- **Pan:** Shift + click and drag
- **Zoom:** Scroll wheel

### 3D rendering modes

```python
# For Image layers in 3D:
layer.rendering = "mip"              # Maximum Intensity Projection (most common for fluorescence)
layer.rendering = "attenuated_mip"   # Attenuated MIP (more depth perception)
layer.rendering = "minip"            # Minimum Intensity Projection
layer.rendering = "translucent"      # Volume rendering (semi-transparent)
layer.rendering = "iso"              # Isosurface rendering (threshold-based)
```

---

## 12. Contrast, Colourmaps, and Blending

### Adjusting contrast

Right-click on the colourmap swatch in the layer controls to set contrast limits interactively. Or use the sliders.

```python
# Programmatic contrast
layer.contrast_limits = (200, 5000)

# Auto-contrast from current slice
current_slice = layer.data[viewer.dims.current_step[0]]
layer.contrast_limits = (np.percentile(current_slice, 1), np.percentile(current_slice, 99.5))
```

### Colourmaps

```python
layer.colormap = "gray"      # standard greyscale
layer.colormap = "green"     # GFP
layer.colormap = "magenta"   # mCherry / RFP
layer.colormap = "cyan"      # CFP / DAPI
layer.colormap = "magma"     # perceptually uniform (good for heatmaps)
layer.colormap = "viridis"   # colourblind-friendly
layer.colormap = "inferno"   # high-contrast for calcium imaging
```

### Blending modes

When overlaying multiple image layers:

| Mode | Effect | Best for |
|---|---|---|
| `"translucent"` | Alpha-blended (default) | Single-channel images |
| `"additive"` | Colours add together | Multi-channel fluorescence overlays |
| `"opaque"` | Completely covers layers below | Brightfield, reference images |
| `"minimum"` | Keeps the darker value | Specific compositing needs |

```python
# Multi-channel overlay: use additive blending with different colourmaps
viewer.add_image(gfp, name="GFP", colormap="green", blending="additive")
viewer.add_image(mcherry, name="mCherry", colormap="magenta", blending="additive")
viewer.add_image(dapi, name="DAPI", colormap="cyan", blending="additive")
```

---

## 13. Multi-Channel and Multi-Dimensional Data

### Automatic channel splitting

```python
import tifffile

# Load a multi-channel image: shape (T, C, Z, Y, X) or (C, Y, X)
data = tifffile.imread("multichannel.tif")

# channel_axis tells napari which dimension is channels
viewer.add_image(data, channel_axis=1, name=["GFP", "mCherry", "DAPI"])
```

This creates separate Image layers for each channel, each with its own colourmap and contrast settings.

### Manual channel separation

```python
data = tifffile.imread("multichannel.tif")  # shape: (C, Y, X) e.g., (3, 512, 512)

viewer.add_image(data[0], name="GFP", colormap="green", blending="additive")
viewer.add_image(data[1], name="mCherry", colormap="magenta", blending="additive")
viewer.add_image(data[2], name="DAPI", colormap="cyan", blending="additive")
```

### Understanding dimension order

Napari interprets the **last two dimensions** as Y and X (the spatial image). All preceding dimensions become sliders:

| Data shape | Napari interpretation | Sliders |
|---|---|---|
| `(512, 512)` | Y, X | None |
| `(100, 512, 512)` | T (or Z), Y, X | 1 slider |
| `(100, 30, 512, 512)` | T, Z, Y, X | 2 sliders |
| `(100, 3, 30, 512, 512)` | T, C, Z, Y, X | 3 sliders (use `channel_axis` to split C) |

---

## 14. Overlays: Scale Bars, Text, and Colourbars

### Scale bar

```python
viewer.scale_bar.visible = True
viewer.scale_bar.unit = "µm"
viewer.scale_bar.font_size = 14
viewer.scale_bar.colored = True      # match current layer colourmap

# In grid mode, show a scale bar in each grid cell
viewer.scale_bar.gridded = True
```

The scale bar automatically uses the `scale` parameter from your image layer.

### Text overlay

```python
viewer.text_overlay.visible = True
viewer.text_overlay.text = "Experiment: Yoda1 10 µM\nFrame: {current_step[0]}"
viewer.text_overlay.font_size = 14
viewer.text_overlay.color = "white"
viewer.text_overlay.position = "top_left"
```

### Colourbar overlay (0.6.5+)

```python
viewer.layers["Calcium"].colorbar.visible = True
```

---

## 15. Grid Mode

Grid mode displays each layer side by side in a grid --- useful for comparing channels, conditions, or time points.

```python
viewer.grid.enabled = True
viewer.grid.shape = (1, -1)    # one row, auto columns
viewer.grid.stride = 1         # one layer per grid cell

# For paired comparison (e.g., 2×2)
viewer.grid.shape = (2, 2)
viewer.grid.stride = 1
```

In grid mode (0.6.2+), each cell has its own view with linked cameras --- pan and zoom in one cell, and all cells follow.

---

## 16. Launching Napari from Python

### From a script

```python
import napari
import tifffile

stack = tifffile.imread("calcium_timelapse.tif")

viewer = napari.Viewer()
viewer.add_image(stack, name="Calcium", colormap="magma", scale=(0.1, 0.107, 0.107))

napari.run()  # REQUIRED — starts the Qt event loop. Without this, the window closes immediately.
```

### From a Jupyter notebook

```python
import napari

viewer = napari.Viewer()
viewer.add_image(my_data)
# No napari.run() needed — Jupyter manages the event loop
```

**Important:** For napari to work inside Jupyter, you need the `%gui qt` magic or install `napari[all]` with a compatible Qt backend.

### From IPython

```python
%gui qt
import napari
viewer = napari.Viewer()
# The viewer stays open and interactive while you continue typing commands
```

---

## 17. Adding and Manipulating Layers Programmatically

### Adding layers

```python
# Image
img_layer = viewer.add_image(data, name="Raw", colormap="gray")

# Labels
labels_layer = viewer.add_labels(mask, name="Segmentation")

# Points
pts_layer = viewer.add_points(centroids, name="Centroids", size=8, face_color="yellow")

# Shapes
shapes_layer = viewer.add_shapes(rois, shape_type="rectangle", name="ROIs")

# Tracks
tracks_layer = viewer.add_tracks(track_data, name="Particle Tracks")
```

### Accessing and modifying layer data

```python
# Get a layer by name
layer = viewer.layers["Raw"]

# Update the data (the display updates automatically)
layer.data = new_processed_data

# Update properties
layer.contrast_limits = (0, 4095)
layer.colormap = "inferno"
layer.opacity = 0.8
layer.visible = False
```

### Removing layers

```python
viewer.layers.remove("Old Layer")
# or
del viewer.layers["Old Layer"]
# or remove all
viewer.layers.clear()
```

---

## 18. The Built-In Console

The napari console (Window → Console) is a full IPython session with the `viewer` variable pre-defined. This is where the power of napari really shines --- you can combine GUI interaction with code on the fly.

```python
# In the console:

# Access the current image data
img = viewer.layers["Calcium"].data
print(img.shape, img.dtype)

# Run a filter and add the result
from scipy.ndimage import gaussian_filter
smoothed = gaussian_filter(img, sigma=(0, 2, 2))  # smooth spatially, not in time
viewer.add_image(smoothed, name="Smoothed", colormap="magma")

# Get coordinates from a points layer
pts = viewer.layers["My Points"].data
print(f"Number of points: {len(pts)}")

# Get the current slice index
current_frame = viewer.dims.current_step[0]
print(f"Current frame: {current_frame}")
```

---

## 19. Connecting Napari to NumPy, scikit-image, and scipy

### Napari ↔ NumPy

All napari layer data is just NumPy arrays:

```python
# Get data out of napari
raw_data = viewer.layers["Raw"].data          # NumPy array
labels = viewer.layers["Segmentation"].data   # NumPy integer array
points = viewer.layers["Centroids"].data      # (N, D) NumPy array

# Put processed data back into napari
processed = raw_data.astype(float) - np.median(raw_data, axis=0)
viewer.add_image(processed, name="Background Subtracted")
```

### scikit-image

```python
from skimage.filters import threshold_otsu, gaussian
from skimage.morphology import remove_small_objects
from skimage.measure import label, regionprops_table

# Smooth, threshold, clean, label
smoothed = gaussian(raw_data, sigma=2)
thresh = threshold_otsu(smoothed)
binary = smoothed > thresh
cleaned = remove_small_objects(binary, min_size=50)
labelled = label(cleaned)

# Add the segmentation to napari
viewer.add_labels(labelled, name="Segmented Cells")

# Measure properties
props = regionprops_table(labelled, raw_data,
                          properties=["label", "area", "mean_intensity", "centroid"])
import pandas as pd
df = pd.DataFrame(props)
print(df.head())
```

### scipy

```python
from scipy.ndimage import gaussian_filter, median_filter, uniform_filter
from scipy.signal import savgol_filter

# Spatial filtering
smooth = gaussian_filter(raw_data, sigma=(0, 2, 2))  # blur Y,X but not T
viewer.add_image(smooth, name="Gaussian σ=2")

# Temporal filtering (smooth each pixel's time trace)
temporal_smooth = uniform_filter(raw_data.astype(float), size=(5, 1, 1))
viewer.add_image(temporal_smooth, name="Temporal Mean 5")
```

---

## 20. Saving Data and Screenshots

### Saving layer data

```python
import tifffile
import numpy as np

# Save an image layer
tifffile.imwrite("processed.tif", viewer.layers["Processed"].data)

# Save labels
tifffile.imwrite("segmentation.tif", viewer.layers["Segmentation"].data.astype(np.uint16))

# Save points to CSV
pts = viewer.layers["Centroids"].data
np.savetxt("centroids.csv", pts, delimiter=",", header="y,x", comments="")

# Save shapes
shapes_data = viewer.layers["ROIs"].data
# shapes_data is a list of arrays; save as needed
```

### Screenshots

```python
# Save the current canvas view (exactly what you see)
viewer.screenshot(path="figure_panel.png", scale=2)  # scale=2 for higher resolution

# From the menu: File → Save Screenshot
# Or File → Save Screenshot with Viewer (includes the GUI panels)
```

### Copy to clipboard

```python
viewer.screenshot(canvas_only=True, clipboard=True)
# Pastes directly into PowerPoint, Google Slides, etc.
```

---

## 21. Drawing ROIs with Shapes

### Workflow for ROI-based analysis

1. Add your image: `viewer.add_image(stack, name="Calcium")`
2. Add an empty Shapes layer: `viewer.add_shapes(name="ROIs")`
3. Select the Shapes layer in the layer list
4. Choose a drawing tool (Rectangle, Ellipse, Polygon)
5. Draw ROIs on the image
6. In the console, extract the ROI data:

```python
# Get all shapes
rois = viewer.layers["ROIs"].data  # list of arrays, each shape's vertices

# Example: extract mean intensity within each rectangular ROI
import numpy as np

image = viewer.layers["Calcium"].data  # (T, Y, X)
results = []

for i, roi in enumerate(rois):
    y_min, x_min = roi.min(axis=0).astype(int)
    y_max, x_max = roi.max(axis=0).astype(int)
    roi_data = image[:, y_min:y_max, x_min:x_max]
    trace = roi_data.mean(axis=(1, 2))
    results.append(trace)
    print(f"ROI {i}: mean intensity = {trace.mean():.1f}")
```

---

## 22. Painting Labels (Manual Segmentation)

### Step-by-step

1. Open your image in napari
2. Add a Labels layer: **Layers → New Labels Layer** or `viewer.add_labels(np.zeros_like(image, dtype=int))`
3. Select the Labels layer
4. Choose the **Paint brush** tool (shortcut: `2`)
5. Set the brush size in layer controls
6. Paint over cells --- each click-drag paints with the current label value
7. Press `M` to increment to the next label (next cell)
8. Use `Erase` (shortcut: `3`) to fix mistakes
9. Use `Fill` (shortcut: `4`) to flood-fill enclosed regions

### Tips for efficient manual segmentation

- **Zoom in** before painting for precision
- Use a **small brush** for edges, **large brush** for interiors
- Enable **Preserve labels** to avoid overwriting adjacent cells
- Use the `Pick` tool (`5`) to sample an existing label value before editing
- For 3D data, paint slice by slice --- labels propagate in the current plane

---

## 23. Placing Points (Cell Counting, Landmarks)

### Cell counting workflow

1. Open your image
2. Add a Points layer: `viewer.add_points(ndim=2, name="Cell Counts")`
3. Select the Points layer → choose **Add** mode (shortcut: `2`)
4. Click on each cell to place a point
5. Count: `len(viewer.layers["Cell Counts"].data)`

### Per-point annotations

```python
# Add points with categories
import numpy as np

coords = viewer.layers["Cell Counts"].data
n = len(coords)

# Assign categories
cell_types = ["PIEZO1+" if i % 2 == 0 else "PIEZO1-" for i in range(n)]
viewer.layers["Cell Counts"].properties = {"type": cell_types}
viewer.layers["Cell Counts"].face_color = "type"
viewer.layers["Cell Counts"].face_color_cycle = ["green", "red"]
```

---

## 24. Measuring from Annotations

### Measuring from labels (regionprops)

```python
from skimage.measure import regionprops_table
import pandas as pd

labels = viewer.layers["Segmentation"].data
image = viewer.layers["Raw"].data

props = regionprops_table(
    labels, image,
    properties=[
        "label", "area", "centroid", "mean_intensity",
        "eccentricity", "perimeter", "solidity"
    ]
)

df = pd.DataFrame(props)
df.to_csv("cell_measurements.csv", index=False)
print(f"Measured {len(df)} objects")
print(df.describe())
```

### Measuring from shapes (ROI statistics)

```python
from skimage.draw import polygon

shapes = viewer.layers["ROIs"].data
image = viewer.layers["Raw"].data

for i, shape in enumerate(shapes):
    rr, cc = polygon(shape[:, 0], shape[:, 1], image.shape)
    roi_pixels = image[rr, cc]
    print(f"ROI {i}: mean={roi_pixels.mean():.1f}, area={len(roi_pixels)} px")
```

---

## 25. The Plugin Ecosystem

### Finding and installing plugins

Plugins extend napari's functionality. Browse the community plugins at **https://napari-hub.org** or install from within napari:

- **Menu:** Plugins → Install/Uninstall Plugins
- **Search** for a plugin by name
- **Click Install**

Or install from the command line:

```bash
pip install cellpose-napari
pip install stardist-napari
pip install napari-animation
pip install napari-simpleitk-image-processing
```

### Using plugins

Installed plugins appear in the **Plugins** menu. Select a plugin to open its dock widget. Most plugins work on the currently selected layer.

### Key plugins for biology

| Plugin | Purpose |
|---|---|
| **cellpose-napari** | Deep learning cell/nucleus segmentation |
| **stardist-napari** | Star-convex polygon cell/nucleus segmentation |
| **napari-simpleitk-image-processing** | Filters, segmentation, morphology via SimpleITK |
| **napari-animation** | Create animations (rotate, zoom, scrub through time) |
| **napari-skimage-regionprops** | Measure region properties from labels |
| **napari-aicsimageio** | Read CZI, LIF, ND2, and other microscopy formats |
| **napari-pyclesperanto-assistant** | GPU-accelerated image processing |
| **napari-segment-blobs-and-things-with-membranes** | Thresholding, watershed, and more |
| **empanada-napari** | Deep learning segmentation for electron microscopy |
| **napari-brightness-contrast** | ImageJ-style brightness/contrast dialog |
| **napari-crop** | Interactive cropping |
| **napari-3d-counter** | 3D cell counting |

---

## 26. Cell Segmentation: Cellpose and StarDist

### Cellpose in Napari

Cellpose is a deep learning-based cell segmentation tool that works on diverse cell types without retraining.

```bash
pip install cellpose-napari
```

**GUI workflow:**
1. Open your image in napari
2. Plugins → cellpose-napari: cellpose
3. Select the image layer
4. Choose a model (`cyto3` for cells with cytoplasm, `nuclei` for nuclei)
5. Set the estimated cell diameter (or use auto-detect)
6. Click **Run Segmentation**
7. Results appear as a new Labels layer

**From Python:**

```python
from cellpose import models
import numpy as np

model = models.Cellpose(model_type="cyto3", gpu=True)
masks, flows, styles, diams = model.eval(image, diameter=30, channels=[0, 0])

viewer.add_labels(masks, name="Cellpose Segmentation")
```

### StarDist in Napari

StarDist detects star-convex shaped objects (works well for nuclei).

```bash
pip install stardist-napari
```

**GUI workflow:**
1. Open your image
2. Plugins → stardist-napari: StarDist
3. Select the image layer and a pre-trained model (e.g., `Versatile (fluorescent nuclei)`)
4. Set normalisation percentiles (typically 1.0 and 99.8)
5. Click **Run**
6. Results appear as Labels and Shapes layers

---

## 27. Other Essential Plugins

### napari-animation

Create publication-quality animations that rotate 3D volumes, zoom into features, or scrub through time:

```bash
pip install napari-animation
```

After installing, access via Plugins → napari-animation. The Animation Wizard provides a keyframe-based animation editor: set the viewer state at key points, and napari interpolates between them.

### napari-aicsimageio

Read proprietary microscopy formats directly into napari:

```bash
pip install napari-aicsimageio "aicsimageio[all]"
```

Supports: CZI (Zeiss), LIF (Leica), ND2 (Nikon), OIF/OIB (Olympus), and more. After installation, File → Open will automatically handle these formats.

### napari-simpleitk-image-processing

Provides dozens of image processing operations accessible via menu:

```bash
pip install napari-simpleitk-image-processing
```

Includes: Gaussian blur, median filter, Otsu threshold, connected component labelling, distance transforms, morphological operations, and more --- all accessible from Tools → Filtering, Tools → Segmentation, etc.

---

## 28. Writing a Simple Plugin

Napari plugins are Python packages that register **contributions** (widgets, readers, writers, sample data). Here is a minimal example:

### A dock widget plugin

```python
# my_plugin.py
import napari
from magicgui import magicgui
import numpy as np
from scipy.ndimage import gaussian_filter

@magicgui(call_button="Run", sigma={"min": 0.1, "max": 10.0, "step": 0.5})
def gaussian_smooth(image: napari.layers.Image, sigma: float = 2.0) -> napari.types.LayerDataTuple:
    """Apply Gaussian smoothing to an image layer."""
    smoothed = gaussian_filter(image.data.astype(float), sigma=sigma)
    return (smoothed, {"name": f"{image.name}_smooth_σ{sigma}", "colormap": image.colormap}, "image")

# Register as a dock widget
viewer = napari.Viewer()
viewer.window.add_dock_widget(gaussian_smooth, name="Gaussian Smooth")
napari.run()
```

`magicgui` automatically creates a GUI from the function signature: a dropdown for the image layer, a slider for sigma, and a button to run.

For distributing plugins to others, see the napari plugin developer guide at https://napari.org/stable/plugins/index.html.

---

## 29. Workflow 1: Calcium Imaging Trace Inspection

```python
import napari
import tifffile
import numpy as np

# Load the time-lapse
stack = tifffile.imread("calcium_timelapse.tif")  # (T, Y, X)

viewer = napari.Viewer()
viewer.add_image(stack, name="Calcium", colormap="inferno",
                 scale=(0.1, 0.107, 0.107))  # 100 ms/frame, 107 nm/px
viewer.scale_bar.visible = True
viewer.scale_bar.unit = "µm"

# Add empty shapes layer for ROI drawing
viewer.add_shapes(name="ROIs")

# INTERACTIVE STEP: Draw rectangles around cells of interest, then continue:

# Extract traces from drawn ROIs
rois = viewer.layers["ROIs"].data
traces = []
for i, roi in enumerate(rois):
    y_min, x_min = roi.min(axis=0).astype(int)[-2:]
    y_max, x_max = roi.max(axis=0).astype(int)[-2:]
    trace = stack[:, y_min:y_max, x_min:x_max].mean(axis=(1, 2))
    f0 = trace[:50].mean()  # first 50 frames as baseline
    dff = (trace - f0) / f0
    traces.append(dff)

# Plot (outside napari, using matplotlib)
import matplotlib.pyplot as plt
time = np.arange(len(traces[0])) * 0.1  # seconds
fig, ax = plt.subplots(figsize=(10, 4))
for i, tr in enumerate(traces):
    ax.plot(time, tr, label=f"ROI {i}")
ax.set_xlabel("Time (s)")
ax.set_ylabel("ΔF/F₀")
ax.legend()
plt.tight_layout()
plt.savefig("dff_traces.png", dpi=300)
plt.show()
```

---

## 30. Workflow 2: Cell Segmentation and Measurement

```python
import napari
import tifffile
import numpy as np
from skimage.filters import threshold_otsu, gaussian
from skimage.morphology import remove_small_objects, binary_fill_holes
from skimage.measure import label, regionprops_table
import pandas as pd

# Load image
image = tifffile.imread("cells.tif")

viewer = napari.Viewer()
viewer.add_image(image, name="Raw", colormap="gray")

# Segment
smooth = gaussian(image.astype(float), sigma=2)
thresh = threshold_otsu(smooth)
binary = smooth > thresh
binary = binary_fill_holes(binary)
binary = remove_small_objects(binary, min_size=100)
labels = label(binary)

viewer.add_labels(labels, name="Segmentation")

# Measure
props = regionprops_table(labels, image,
    properties=["label", "area", "mean_intensity", "centroid",
                "eccentricity", "solidity", "perimeter"])
df = pd.DataFrame(props)

# Add centroids as points layer
centroids = df[["centroid-0", "centroid-1"]].values
viewer.add_points(centroids, name="Centroids", size=8, face_color="yellow")

# Save
df.to_csv("measurements.csv", index=False)
print(f"Segmented {len(df)} cells")
print(df[["area", "mean_intensity", "eccentricity"]].describe())
```

---

## 31. Workflow 3: Multi-Channel TIRF Overlay

```python
import napari
import tifffile

# Load channels
gfp = tifffile.imread("PIEZO1_GFP.tif")
mcherry = tifffile.imread("membrane_mCherry.tif")
brightfield = tifffile.imread("brightfield.tif")

viewer = napari.Viewer()

# Add with appropriate colours and additive blending
viewer.add_image(brightfield, name="Brightfield", colormap="gray",
                 blending="opaque", opacity=0.3)
viewer.add_image(gfp, name="PIEZO1-GFP", colormap="green",
                 blending="additive")
viewer.add_image(mcherry, name="Membrane-mCherry", colormap="magenta",
                 blending="additive")

# Set scale (TIRF: typically 0.107 µm/px)
for layer in viewer.layers:
    layer.scale = (0.107, 0.107)

viewer.scale_bar.visible = True
viewer.scale_bar.unit = "µm"

# Take a screenshot for the paper
viewer.screenshot(path="tirf_overlay.png", scale=4)
```

---

## 32. Workflow 4: 3D Z-Stack Visualisation

```python
import napari
import tifffile

# Load a Z-stack
zstack = tifffile.imread("confocal_zstack.tif")  # (Z, Y, X)

viewer = napari.Viewer(ndisplay=3)
viewer.add_image(zstack, name="Confocal",
                 scale=(0.5, 0.107, 0.107),  # 0.5 µm Z-step, 0.107 µm XY
                 rendering="mip",
                 colormap="magma")

viewer.scale_bar.visible = True
viewer.scale_bar.unit = "µm"

# Adjust camera angle
viewer.camera.angles = (10, -30, 150)
viewer.camera.zoom = 3.0
```

---

## 33. Workflow 5: Manual Annotation for Training Data

Creating ground-truth labels for training deep learning models (cellpose, StarDist, etc.):

```python
import napari
import tifffile
import numpy as np

# Load training image
image = tifffile.imread("training_image.tif")

viewer = napari.Viewer()
viewer.add_image(image, name="Training Image", colormap="gray")

# Add empty labels for annotation
labels = np.zeros(image.shape, dtype=np.int32)
viewer.add_labels(labels, name="Ground Truth")

# INTERACTIVE STEP:
# 1. Select the "Ground Truth" layer
# 2. Choose Paint brush (shortcut: 2)
# 3. Set brush size
# 4. Paint each cell with a unique label (press M between cells)
# 5. Use Erase (3) to fix mistakes
# 6. Use Fill (4) for enclosed regions

# When done, save the labels
tifffile.imwrite("training_labels.tif",
                 viewer.layers["Ground Truth"].data.astype(np.uint16))
print("Saved ground truth labels")
```

---

## 34. Napari vs. FIJI/ImageJ: When to Use Which

| Consideration | Napari | FIJI/ImageJ |
|---|---|---|
| **Philosophy** | Python viewer + code | Standalone application with menus |
| **N-dimensional data** | Native support for nD | Possible but clunky (hyperstack, virtual stacks) |
| **3D visualisation** | Built-in GPU-accelerated 3D | Requires 3D Viewer plugin or ClearVolume |
| **Scripting** | Python (NumPy, scikit-image, etc.) | ImageJ Macro, Jython, or Java plugins |
| **Built-in operations** | Few (relies on Python ecosystem) | 500+ menu commands |
| **Plugin ecosystem** | Growing (~300 plugins) | Mature (~1,500 plugins, decades of development) |
| **Manual annotation** | Excellent (labels painting, points, shapes) | Good (ROI Manager, manual tracking) |
| **Batch processing** | Natural in Python (loops, glob) | Macro recorder + batch |
| **Bio-Formats** | Via aicsimageio plugin or python-bioformats | Built-in (reads virtually everything) |
| **Deep learning integration** | Seamless (cellpose, StarDist, PyTorch) | Possible but less natural |
| **Publication figures** | Good with `screenshot()`, combine with matplotlib | Excellent (long history, many overlay options) |
| **Learning curve** | Requires Python knowledge | Lower for basic operations |
| **Community** | Zulip chat, image.sc forum | image.sc forum (decades of answers) |
| **Cost** | Free | Free |

### When to use Napari

- Viewing and annotating multi-dimensional data (time-lapse Z-stacks, light-sheet)
- Building Python-based analysis pipelines with interactive visualisation
- Creating ground-truth annotations for deep learning
- Overlaying segmentation results on raw data
- Single-particle tracking visualisation
- Anything where you want to combine GUI interaction with code

### When to use FIJI

- Quick manual measurements on a single image
- Operations with well-established FIJI plugins (thunderSTORM, TrackMate, etc.)
- Bio-Formats file reading for obscure proprietary formats
- Simple batch processing with the Macro recorder
- When you need a specific plugin that only exists for FIJI

### Use both together

Many researchers use both: FIJI for quick operations and established plugins, napari for Python-integrated workflows and annotation. Data flows easily between them via TIFF files, or through the `pyimagej` bridge:

```python
import imagej
ij = imagej.init()  # starts a FIJI instance from Python
result = ij.py.run_plugin("Gaussian Blur...", {"sigma": 2.0}, imp)
```

---

## 35. Performance Tips for Large Data

### Lazy loading with Dask

For datasets too large to fit in RAM, use Dask arrays. Napari loads only the currently visible slice:

```python
import dask.array as da
import tifffile

# Open without loading into memory
store = tifffile.imread("huge_dataset.tif", aszarr=True)
data = da.from_zarr(store)
print(f"Shape: {data.shape}, Size: {data.nbytes / 1e9:.1f} GB")

viewer.add_image(data, name="Lazy Loaded", contrast_limits=(100, 3000))
# Only the current slice is loaded into memory!
```

### Downsampling for display

```python
# View every 4th pixel for speed
viewer.add_image(data[::4, ::4], name="Preview (4x downsampled)")
```

### Multi-scale (pyramidal) images

For very large images (whole-slide, satellite), provide multiple resolution levels:

```python
import numpy as np
from skimage.transform import downscale_local_mean

level0 = large_image                           # full resolution
level1 = downscale_local_mean(level0, (2, 2))  # 2× downsampled
level2 = downscale_local_mean(level0, (4, 4))  # 4× downsampled

viewer.add_image([level0, level1, level2], name="Pyramidal", multiscale=True)
```

### Memory management

```python
# Check GPU memory usage
import vispy
print(vispy.sys_info())

# Reduce memory: close unused layers
viewer.layers.remove("Old Analysis")

# Use 8-bit display for 16-bit data
# Napari handles this automatically — no need to convert
```

---

## 36. Keyboard Shortcuts Quick Reference

### Global

| Shortcut | Action |
|---|---|
| **Ctrl+N** | New viewer |
| **Ctrl+O** | Open file |
| **Ctrl+S** | Save selected layer |
| **Ctrl+Shift+S** | Save screenshot |
| **Ctrl+Z** | Undo (for labels, points, shapes) |
| **Ctrl+Shift+Z** | Redo |
| **Ctrl+C** | Copy screenshot to clipboard |
| **Home** | Reset view |
| **Ctrl+Shift+P** | Command palette (0.6.0+) |

### Navigation

| Shortcut | Action |
|---|---|
| **Left/Right arrows** | Step through dimension slider |
| **Alt + drag** | Zoom to region (0.6.3+) |

### Layer tools

| Shortcut | Action | Layer type |
|---|---|---|
| **1** | Pan/zoom mode | All |
| **2** | Add / Paint mode | Points, Labels |
| **3** | Erase mode | Labels |
| **4** | Fill mode | Labels |
| **5** | Pick / Select mode | Labels, Shapes |
| **M** | Next label (increment) | Labels |
| **D** | Decrease label | Labels |
| **[** / **]** | Decrease / increase brush size | Labels |
| **R** | Rectangle tool | Shapes |
| **E** | Ellipse tool | Shapes |
| **P** | Polygon tool | Shapes |
| **L** | Line tool | Shapes |
| **T** | Path tool | Shapes |

### View

| Shortcut | Action |
|---|---|
| **Ctrl+Shift+T** | Toggle 2D/3D |
| **Ctrl+G** | Toggle grid mode |

---

## 37. Common Problems and Troubleshooting

### "napari" command not found

**Cause:** napari is not installed in the active environment, or the environment is not activated.
**Fix:** `conda activate napari-env` then `pip install "napari[all]"`

### Blank viewer / no image displayed

**Cause:** Contrast limits may be wrong (e.g., data range is 0--65535 but limits are 0--255).
**Fix:** Right-click the colourmap bar → Full Range. Or: `layer.contrast_limits = (data.min(), data.max())`

### "No Qt bindings could be found"

**Cause:** Neither PyQt5 nor PySide6 is installed.
**Fix:** `pip install "napari[all]"` or `pip install PyQt5`

### Napari is slow or freezes

**Causes and fixes:**
- **Large data in RAM:** Use Dask lazy loading (Section 35)
- **Too many layers:** Remove unused layers
- **3D rendering:** Reduce data volume or use a smaller `rendering` mode
- **Old GPU drivers:** Update your graphics drivers

### Plugins not showing in menu

**Cause:** Plugin installed in a different Python environment, or incompatible version.
**Fix:** Check `pip list | grep napari` in the active environment. Reinstall: `pip install plugin-name`

### Labels painting doesn't work

**Cause:** The Labels layer is not selected, or you are in pan/zoom mode.
**Fix:** Click the Labels layer in the layer list. Press `2` for paint mode.

### "ImportError: DLL load failed" (Windows)

**Cause:** Missing Visual C++ Redistributable or conflicting DLLs.
**Fix:** Install the latest Visual C++ Redistributable from Microsoft. Consider using the bundled napari installer.

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using Napari for multi-dimensional image visualisation, annotation, and analysis. Napari excels as the Python-native viewer that connects GUI interaction with the full power of the scientific Python ecosystem.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*Napari is free software released under the BSD-3 licence.*
