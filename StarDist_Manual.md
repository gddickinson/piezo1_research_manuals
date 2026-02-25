# StarDist Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why StarDist?](#1-introduction-why-stardist)
2. [Installing StarDist](#2-installing-stardist)
3. [How StarDist Works: Star-Convex Polygons](#3-how-stardist-works-star-convex-polygons)

**Part II: Using Pre-Trained Models**

4. [Available Pre-Trained Models](#4-available-pre-trained-models)
5. [Running StarDist from Python (2D)](#5-running-stardist-from-python-2d)
6. [Key Parameters: prob_thresh and nms_thresh](#6-key-parameters-prob_thresh-and-nms_thresh)
7. [Image Normalisation](#7-image-normalisation)
8. [3D Segmentation](#8-3d-segmentation)
9. [Batch Processing](#9-batch-processing)

**Part III: The StarDist GUI Plugins**

10. [StarDist in FIJI/ImageJ](#10-stardist-in-fijiimagej)
11. [StarDist in Napari](#11-stardist-in-napari)
12. [StarDist in QuPath](#12-stardist-in-qupath)

**Part IV: Training Custom Models**

13. [When to Train a Custom Model](#13-when-to-train-a-custom-model)
14. [Preparing Training Data](#14-preparing-training-data)
15. [Training a 2D Model](#15-training-a-2d-model)
16. [Training a 3D Model](#16-training-a-3d-model)
17. [Data Augmentation](#17-data-augmentation)
18. [Evaluating Model Performance](#18-evaluating-model-performance)

**Part V: Output and Post-Processing**

19. [Understanding StarDist Output](#19-understanding-stardist-output)
20. [Measurements with scikit-image](#20-measurements-with-scikit-image)
21. [Visualising Results](#21-visualising-results)

**Part VI: Practical Workflows**

22. [Workflow 1: Fluorescent Nucleus Segmentation](#22-workflow-1-fluorescent-nucleus-segmentation)
23. [Workflow 2: H&E Histopathology Nuclei](#23-workflow-2-he-histopathology-nuclei)
24. [Workflow 3: 3D Nucleus Segmentation in Z-Stacks](#24-workflow-3-3d-nucleus-segmentation-in-z-stacks)
25. [Workflow 4: Training a Custom Model for Unusual Nuclei](#25-workflow-4-training-a-custom-model-for-unusual-nuclei)
26. [Workflow 5: High-Throughput Nuclear Analysis Pipeline](#26-workflow-5-high-throughput-nuclear-analysis-pipeline)

**Part VII: Tips and Troubleshooting**

27. [Performance Tips](#27-performance-tips)
28. [Common Problems and Solutions](#28-common-problems-and-solutions)
29. [StarDist vs. Cellpose: When to Use Which](#29-stardist-vs-cellpose-when-to-use-which)

---

## 1. Introduction: Why StarDist?

### What is StarDist?

StarDist is a deep learning-based method for **detecting and segmenting** star-convex shaped objects (primarily cell nuclei) in 2D and 3D microscopy images. Given an image, it produces an **instance segmentation mask**: every pixel is assigned to background (0) or a specific object (1, 2, 3, ...). The current version is compatible with Python 3.6--3.13.

StarDist was developed by **Uwe Schmidt** and **Martin Weigert** at the **Max Planck Institute of Molecular Cell Biology and Genetics (MPI-CBG)** in Dresden, with contributions from Coleman Broaddus, Ko Sugawara, Robert Haase, and Gene Myers.

### The StarDist papers

| Paper | Reference | Contribution |
|---|---|---|
| **StarDist 2D** | Schmidt, Weigert, Broaddus & Myers (2018). MICCAI, 265--273. | Star-convex polygon representation for 2D cell detection. |
| **StarDist 3D** | Weigert, Schmidt, Haase, Sugawara & Myers (2020). WACV. | Extension to 3D star-convex polyhedra. |
| **StarDist H&E** | Weigert & Schmidt (2022). ISBIC. | Nuclei segmentation and classification in histopathology. |

### Why StarDist for microscopy?

- **Extremely fast:** Inference takes seconds, even on CPU. One of the fastest deep learning segmentation methods.
- **Excellent for round/oval objects:** Nuclei, beads, yeast, bacteria --- anything approximately star-convex.
- **Handles dense packing:** Reliably separates touching and overlapping nuclei.
- **Pre-trained models:** Works immediately on fluorescence and H&E images without training.
- **Trainable:** Custom models can be trained on your own annotated data.
- **Multi-platform:** Python API, FIJI plugin, napari plugin, QuPath extension.
- **Lightweight:** Smaller models and faster inference compared to Cellpose.
- **Well-integrated:** Built on TensorFlow/Keras; works with the CSBDeep ecosystem (including CARE for image restoration).

### Relevance to PIEZO1-HaloTag research

In the PIEZO1-HaloTag hiPSC imaging pipeline (Bertaccini et al., *Nature Communications*, 2025), nucleus segmentation serves a supporting but important role. The study labels nuclei with Hoechst (Cat. No. H1399, Invitrogen) and SPY505-DNA (Cat. No. CY-SC101, Spirochrome) across multiple hiPSC-derived cell types --- endothelial cells (ECs), keratinocytes, and neural stem cells (NSCs) --- as well as in Micropatterned Neural Rosettes (MNRs). While the paper's primary analysis pipeline uses ThunderSTORM for PIEZO1 puncta detection and FLIKA for trajectory building, StarDist is well suited for the upstream step of **identifying individual nuclei** to enable per-cell quantification of PIEZO1 puncta density, which the paper reports as puncta per square micrometre of cell area. StarDist can also help delineate individual cells within the densely packed radial organisation of MNRs, where nuclei surround a central lumen. Because StarDist is part of the same CSBDeep ecosystem as CARE (Content-Aware Image Restoration), which the paper uses for denoising nuclear signals in lattice light-sheet data, the two tools integrate naturally in a shared workflow.

### The star-convex shape assumption

StarDist assumes that objects can be represented as **star-convex polygons** --- shapes where every point on the boundary is visible from the centre (no concavities that would occlude boundary points from the centroid). Nuclei, most bacteria, yeast cells, and many round cell types satisfy this assumption. Cells with long processes (neurons), very irregular shapes, or deep concavities may not be well represented.

### What StarDist does NOT do

- **Arbitrary-shape segmentation:** Objects must be approximately star-convex. For irregular cells, use Cellpose.
- **Whole-cell segmentation:** StarDist is primarily designed for nuclei. For cytoplasm segmentation, use Cellpose or combine StarDist nuclei with a secondary segmentation method.
- **Object classification:** StarDist segments objects but does not classify them into types (though the H&E model supports classification).
- **Tracking:** StarDist segments individual frames. Use a tracker downstream.

---

## 2. Installing StarDist

### pip installation

```bash
# Create a dedicated environment
conda create -n stardist python=3.10
conda activate stardist

# Install StarDist
pip install stardist

# For GPU support (recommended), install TensorFlow with GPU:
pip install "tensorflow[and-cuda]"

# Or for CPU only:
pip install tensorflow
```

### GPU support

StarDist uses TensorFlow as its deep learning backend. GPU acceleration requires:

- NVIDIA GPU with CUDA support
- CUDA toolkit and cuDNN installed
- TensorFlow GPU build

```python
# Verify GPU
import tensorflow as tf
print("GPUs:", tf.config.list_physical_devices("GPU"))
```

**Apple Silicon:** TensorFlow supports Metal (MPS) on macOS. Install `tensorflow-macos` and `tensorflow-metal`.

### For FIJI only (no Python needed)

If you only want to use StarDist in FIJI, no Python installation is required. Install via FIJI's update sites (see Section 10).

### System requirements

- **Minimum:** Python 3.6+, 8 GB RAM
- **Recommended:** Python 3.10, 16 GB RAM, NVIDIA GPU
- **For training:** 32+ GB RAM, GPU strongly recommended

---

## 3. How StarDist Works: Star-Convex Polygons

### The core algorithm

StarDist's approach is fundamentally different from both traditional watershed methods and flow-based methods like Cellpose:

**Step 1: For each pixel, the neural network predicts two things:**

- **Radial distances** --- the distances from that pixel to the object boundary along a fixed set of directions (rays). For a 32-ray model, 32 distances are predicted, evenly spaced around 360°. These distances define a **star-convex polygon** centred at that pixel.
- **Object probability** --- how likely that pixel is to be the centre of an object (highest at the object centroid, decreasing towards edges, zero for background).

**Step 2: Candidate polygon generation.** Every pixel with sufficient object probability produces a candidate star-convex polygon using its predicted radial distances.

**Step 3: Non-maximum suppression (NMS).** The many overlapping candidate polygons are filtered: for each true object, only the best candidate (highest probability) is kept. Overlapping candidates above a threshold are suppressed.

### Why star-convex polygons?

- They are a compact shape representation (just N distances + 1 probability per pixel)
- They naturally encode object boundaries with sub-pixel precision
- NMS on polygons is more shape-aware than NMS on bounding boxes
- The approach is very fast because it avoids iterative post-processing

### Architecture

StarDist uses a **U-Net** backbone (from the CSBDeep framework) that takes a microscopy image as input and outputs N+1 channels: N radial distance maps (one per ray direction) and 1 object probability map. The default configuration uses 32 rays in 2D and 96 rays in 3D.

---

## 4. Available Pre-Trained Models

### 2D models

```python
from stardist.models import StarDist2D
StarDist2D.from_pretrained()  # list all available models
```

| Model name | Alias | Trained on | Best for |
|---|---|---|---|
| `2D_versatile_fluo` | Versatile (fluorescent nuclei) | Diverse fluorescence microscopy (DSB 2018 + more) | **Most fluorescence microscopy** --- DAPI, Hoechst, GFP-histone, etc. |
| `2D_versatile_he` | Versatile (H&E nuclei) | MoNuSeg 2018 + TNBC | **H&E stained histopathology** slides |
| `2D_paper_dsb2018` | DSB 2018 (from StarDist 2D paper) | Data Science Bowl 2018 | Fluorescent nuclei (original paper model) |
| `2D_demo` | — | Small demo dataset | Testing only |

### 3D models

```python
from stardist.models import StarDist3D
StarDist3D.from_pretrained()  # list all available models
```

| Model name | Trained on | Best for |
|---|---|---|
| `3D_demo` | Small demo dataset | Testing 3D functionality |

**Note:** No broadly pre-trained 3D model is available. For 3D data, you typically need to train a custom model on your own annotated data, or use the 2D model slice-by-slice and stitch results.

---

## 5. Running StarDist from Python (2D)

### Basic usage

```python
from stardist.models import StarDist2D
from stardist import random_label_cmap
from csbdeep.utils import normalize
import numpy as np
import tifffile

# Load image
img = tifffile.imread("dapi_nuclei.tif")

# Normalise (CRITICAL for StarDist)
img_norm = normalize(img, 1, 99.8)

# Load pre-trained model
model = StarDist2D.from_pretrained("2D_versatile_fluo")

# Predict
labels, details = model.predict_instances(img_norm)

# labels: integer array (Y, X), 0=background, 1,2,...=individual nuclei
# details: dict with 'coord', 'points', 'prob' for each detected object

print(f"Detected {labels.max()} nuclei")
```

### The predict_instances() return values

| Return | Type | Description |
|---|---|---|
| `labels` | numpy array (Y, X) | Integer mask: 0=background, 1,2,...=objects |
| `details` | dict | `"coord"`: polygon vertex coordinates for each object; `"points"`: centroid of each object; `"prob"`: detection probability for each object |

### Accessing per-object information

```python
# Centroids of all detected nuclei
centroids = details["points"]  # (N, 2) array of (y, x) coordinates

# Detection probability of each nucleus
probs = details["prob"]  # (N,) array

# Polygon coordinates of each nucleus
polygons = details["coord"]  # list of (2, n_rays) arrays

print(f"Nucleus 0: centroid={centroids[0]}, prob={probs[0]:.3f}")
```

---

## 6. Key Parameters: prob_thresh and nms_thresh

### prob_thresh (object probability threshold)

Controls the minimum probability for a pixel to be considered an object centre. Default values are model-specific (stored in the model's `thresholds.json`).

```python
# Use model-optimised defaults
labels, details = model.predict_instances(img_norm)

# Override with custom threshold
labels, details = model.predict_instances(img_norm, prob_thresh=0.5)
```

- **Decrease** (e.g., 0.3): Detects more objects, including dim or small ones. May increase false positives.
- **Increase** (e.g., 0.7): Detects fewer, more confident objects. May miss real nuclei.

### nms_thresh (non-maximum suppression threshold)

Controls how much overlap is allowed between detected objects. Default: **0.3** (typically).

```python
labels, details = model.predict_instances(img_norm, nms_thresh=0.3)
```

- **Decrease** (e.g., 0.1): Suppresses more overlapping detections. Fewer but more separated objects.
- **Increase** (e.g., 0.5): Allows more overlap. More objects detected, but may include duplicates.

### Optimising thresholds

StarDist provides a method to optimise thresholds on validation data:

```python
# During training, thresholds are optimised automatically
# For manual optimisation:
model.optimize_thresholds(X_val, Y_val)
```

### Tuning strategy

1. Run with defaults (model's optimised thresholds)
2. If **nuclei are missed** → decrease `prob_thresh`
3. If **too many false positives** → increase `prob_thresh`
4. If **touching nuclei are merged** → decrease `nms_thresh`
5. If **single nuclei are split** → increase `nms_thresh`

---

## 7. Image Normalisation

### Why normalisation matters

StarDist models are trained on normalised images (typically percentile-based normalisation to the range [0, 1]). **You must normalise your images before prediction**, or results will be poor.

### Standard normalisation

```python
from csbdeep.utils import normalize

# Percentile-based normalisation (recommended)
img_norm = normalize(img, 1, 99.8)
# Maps the 1st percentile to 0 and the 99.8th percentile to 1
# This is the default used in StarDist examples
```

### Per-axis normalisation

For multi-channel or tiled images:

```python
# Normalise over spatial axes only (not channels)
img_norm = normalize(img, 1, 99.8, axis=(0, 1))
```

### Custom normalisation

```python
import numpy as np

# Manual percentile normalisation
lo, hi = np.percentile(img, (1, 99.8))
img_norm = (img.astype(np.float32) - lo) / (hi - lo)
img_norm = np.clip(img_norm, 0, 1)
```

### Common normalisation mistakes

- **Forgetting to normalise:** The most common StarDist error. Results will be terrible.
- **Wrong percentiles:** Very noisy images may need (2, 98) or (5, 95).
- **Normalising per-tile instead of per-image:** Can cause inconsistent predictions across tiles.

---

## 8. 3D Segmentation

### Using the 3D API

```python
from stardist.models import StarDist3D
from csbdeep.utils import normalize
import tifffile

# Load Z-stack
zstack = tifffile.imread("nuclei_zstack.tif")  # shape: (Z, Y, X)

# Normalise
zstack_norm = normalize(zstack, 1, 99.8, axis=(0, 1, 2))

# Load or create a 3D model (no versatile pre-trained 3D model available)
# You need to train your own or use the demo model for testing:
model = StarDist3D.from_pretrained("3D_demo")

labels, details = model.predict_instances(zstack_norm)
print(f"Detected {labels.max()} nuclei in 3D")
```

### Practical approach: 2D slice-by-slice

Since no broadly pre-trained 3D StarDist model exists, a common practical approach is:

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
import numpy as np
import tifffile

zstack = tifffile.imread("nuclei_zstack.tif")  # (Z, Y, X)
model = StarDist2D.from_pretrained("2D_versatile_fluo")

all_labels = []
for z in range(zstack.shape[0]):
    img_norm = normalize(zstack[z], 1, 99.8)
    labels_z, _ = model.predict_instances(img_norm)
    all_labels.append(labels_z)

labels_stack = np.stack(all_labels)

# Note: This gives independent 2D segmentations per slice.
# To link objects across Z, use a stitching algorithm or 3D labelling.
```

### Anisotropy in 3D

When training a 3D model, you can specify the anisotropy (ratio of Z resolution to XY resolution) in the model configuration. This rescales the Z axis during processing.

---

## 9. Batch Processing

### Batch processing in Python

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
import tifffile
import numpy as np
import pandas as pd
import os

model = StarDist2D.from_pretrained("2D_versatile_fluo")

image_dir = "images/"
results = []

for fname in sorted(os.listdir(image_dir)):
    if not fname.endswith((".tif", ".tiff", ".png")):
        continue

    img = tifffile.imread(os.path.join(image_dir, fname))
    img_norm = normalize(img, 1, 99.8)
    labels, details = model.predict_instances(img_norm)

    # Save masks
    tifffile.imwrite(f"results/{fname}_labels.tif", labels.astype(np.uint16))

    results.append({
        "filename": fname,
        "n_nuclei": labels.max(),
    })
    print(f"{fname}: {labels.max()} nuclei")

df = pd.DataFrame(results)
df.to_csv("results/summary.csv", index=False)
```

---

## 10. StarDist in FIJI/ImageJ

### Installation

1. Open FIJI
2. Help → Update → Manage Update Sites
3. Check the boxes for: **CSBDeep**, **StarDist**, and **TensorFlow**
4. Click **Close** → **Apply changes**
5. Restart FIJI

### Running StarDist 2D

1. Open your image in FIJI
2. **Plugins → StarDist → StarDist 2D**
3. Select a pre-trained model (e.g., `Versatile (fluorescent nuclei)`)
4. Set parameters:
   - **Normalize image:** Check this (percentile normalisation)
   - **Percentile low / high:** 1.0 / 99.8 (defaults)
   - **Probability / Score Threshold:** Adjust if needed
   - **Overlap Threshold (NMS):** Default 0.3
5. Click **OK**
6. Results: A **label image** and **ROIs in the ROI Manager**

### Output in FIJI

StarDist returns:

- **Label image:** Each nucleus has a unique integer value (like other segmentation tools)
- **StarDist polygons:** A Shapes overlay with the star-convex polygon outlines
- **ROI Manager entries:** Each nucleus as an ROI, ready for measurement with Analyze → Measure

### Batch processing in FIJI

A Jython script example for processing all images in a folder is provided in the StarDist FIJI documentation. The basic pattern:

```python
# FIJI Jython script
from de.csbdresden.stardist import StarDist2D
from ij import IJ
import os

input_dir = "/path/to/images/"
for fname in os.listdir(input_dir):
    if fname.endswith(".tif"):
        imp = IJ.openImage(os.path.join(input_dir, fname))
        # Run StarDist...
```

### Limitations of the FIJI plugin

- Only 2D and 2D+time are supported (no 3D)
- Cannot train custom models (training requires the Python package)
- Slower than GPU-accelerated Python (FIJI uses CPU by default)

---

## 11. StarDist in Napari

### Installation

```bash
pip install stardist-napari
```

### Usage

1. Launch napari
2. Load your image
3. **Plugins → stardist-napari: StarDist**
4. Select the image layer
5. Choose a pre-trained model (e.g., `Versatile (fluorescent nuclei)`)
6. Check **Normalize Image** and set percentiles (1.0 and 99.8)
7. Click **Run**
8. Results appear as **Labels** and **Shapes** layers

### From napari's console

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize

img = viewer.layers["Raw"].data
img_norm = normalize(img, 1, 99.8)
model = StarDist2D.from_pretrained("2D_versatile_fluo")
labels, details = model.predict_instances(img_norm)
viewer.add_labels(labels, name="StarDist Nuclei")
```

---

## 12. StarDist in QuPath

StarDist is available as a QuPath extension for whole-slide image analysis, particularly useful for histopathology. The QuPath StarDist extension allows you to run pre-trained or custom StarDist models on H&E or fluorescence whole-slide images with support for large images via tiling.

See the QuPath documentation for installation and usage details.

---

## 13. When to Train a Custom Model

### When pre-trained models work

The `2D_versatile_fluo` model works well for most standard fluorescence microscopy nuclear stains (DAPI, Hoechst, DRAQ5, GFP-histone, etc.). Try the pre-trained model first.

### When to train

- Your objects are a different size or shape than typical nuclei
- Your imaging modality produces very different contrast (e.g., phase contrast, electron microscopy)
- You need to segment non-nuclear objects (bacteria, yeast, organelles)
- The pre-trained model consistently under- or over-segments your data
- You need a 3D model (no versatile pre-trained 3D model available)
- You want to combine segmentation with classification (multi-class StarDist)

---

## 14. Preparing Training Data

### Required format

StarDist needs paired images and labels:

- **Images:** Raw microscopy images (2D or 3D), any bit depth
- **Labels:** Integer label images (same dimensions), 0=background, 1,2,...=objects
- Every object in the training images must be labelled (no partial annotations)

### Creating labels

- **In napari:** Use the Labels layer to paint masks manually
- **In Cellpose GUI:** Annotate with right-click drawing, export as masks
- **In FIJI:** Use ROI Manager + ROI-to-label conversion
- **From existing data:** Use corrected output from a first-pass segmentation

### Guidelines

- **Label all objects** --- unlabelled objects will be treated as background (false negatives in training)
- **Include diverse examples:** Different sizes, shapes, densities, brightness levels
- **Minimum ~10--20 training images** for fine-tuning; more for training from scratch
- **Patch size:** StarDist extracts random patches during training (default 256×256 for 2D). Images can be any size.

---

## 15. Training a 2D Model

### Complete training example

```python
from stardist.models import StarDist2D, Config2D
from stardist import fill_label_holes, calculate_extents, gputools_available
from csbdeep.utils import normalize
import numpy as np
from glob import glob
from tifffile import imread

# --- Load data ---
X_train = sorted(glob("train/images/*.tif"))
Y_train = sorted(glob("train/masks/*.tif"))
X_val   = sorted(glob("val/images/*.tif"))
Y_val   = sorted(glob("val/masks/*.tif"))

X_train = list(map(imread, X_train))
Y_train = list(map(imread, Y_train))
X_val   = list(map(imread, X_val))
Y_val   = list(map(imread, Y_val))

# Fill label holes (objects should be solid)
Y_train = [fill_label_holes(y) for y in Y_train]
Y_val   = [fill_label_holes(y) for y in Y_val]

# Normalise images
axis_norm = (0, 1)
X_train = [normalize(x, 1, 99.8, axis=axis_norm) for x in X_train]
X_val   = [normalize(x, 1, 99.8, axis=axis_norm) for x in X_val]

# --- Configure ---
n_rays = 32  # number of radial directions
n_channel = 1 if X_train[0].ndim == 2 else X_train[0].shape[-1]

conf = Config2D(
    n_rays=n_rays,
    n_channel_in=n_channel,
    train_patch_size=(256, 256),
    train_epochs=400,
    train_steps_per_epoch=100,
    train_batch_size=4,
    train_learning_rate=3e-4,
)
print(conf)

# --- Create and train ---
model = StarDist2D(conf, name="my_stardist_model", basedir="models")
model.train(X_train, Y_train, validation_data=(X_val, Y_val),
            augmenter=None)  # or provide augmentation function

# --- Optimise thresholds on validation data ---
model.optimize_thresholds(X_val, Y_val)
```

### Key training configuration parameters

| Parameter | Default | Description |
|---|---|---|
| `n_rays` | 32 | Number of radial directions. More rays = finer shape detail but slower. 32 is good for most nuclei. |
| `n_channel_in` | 1 | Number of input channels |
| `train_patch_size` | (256, 256) | Size of random patches extracted during training |
| `train_epochs` | 400 | Number of training epochs |
| `train_steps_per_epoch` | 100 | Training steps per epoch |
| `train_batch_size` | 4 | Batch size (reduce if GPU memory is limited) |
| `train_learning_rate` | 3e-4 | Initial learning rate |
| `grid` | (2, 2) | Prediction grid spacing (2,2 means predictions every 2 pixels; faster but slightly lower resolution) |
| `unet_n_depth` | 3 | Depth of the U-Net |

---

## 16. Training a 3D Model

```python
from stardist.models import StarDist3D, Config3D
from stardist import fill_label_holes
from csbdeep.utils import normalize

# Load 3D data (Z, Y, X)
# ... (load X_train, Y_train, X_val, Y_val as before)

conf = Config3D(
    n_rays=96,            # more rays for 3D (default 96)
    n_channel_in=1,
    train_patch_size=(48, 96, 96),  # Z, Y, X
    anisotropy=(2.0, 1.0, 1.0),    # if Z-step is 2× XY
    train_epochs=200,
    train_batch_size=2,   # smaller due to 3D memory requirements
)

model = StarDist3D(conf, name="my_3d_model", basedir="models")
model.train(X_train, Y_train, validation_data=(X_val, Y_val))
model.optimize_thresholds(X_val, Y_val)
```

### 3D training tips

- 3D training is much more memory-intensive. Use smaller `train_patch_size` and `train_batch_size`.
- Set `anisotropy` to match your data's voxel dimensions.
- You need 3D annotated volumes, which are labour-intensive to create. Consider using corrected Cellpose 3D output or semi-automatic annotation in napari.

---

## 17. Data Augmentation

### Built-in augmentation

StarDist supports data augmentation during training to increase effective training set size:

```python
from stardist import augmenter_default

model.train(X_train, Y_train,
            validation_data=(X_val, Y_val),
            augmenter=augmenter_default)
```

The default augmenter applies random flips and rotations (90°).

### Custom augmentation

```python
from csbdeep.utils import normalize
import numpy as np

def my_augmenter(x, y):
    """Custom augmentation: flips, rotations, intensity."""
    # Random flip
    if np.random.random() > 0.5:
        x = np.flip(x, axis=0)
        y = np.flip(y, axis=0)
    if np.random.random() > 0.5:
        x = np.flip(x, axis=1)
        y = np.flip(y, axis=1)
    # Random 90° rotation
    k = np.random.randint(0, 4)
    x = np.rot90(x, k)
    y = np.rot90(y, k)
    # Random intensity scaling
    x = x * np.random.uniform(0.8, 1.2)
    return x, y

model.train(X_train, Y_train,
            validation_data=(X_val, Y_val),
            augmenter=my_augmenter)
```

---

## 18. Evaluating Model Performance

### The stardist.matching module

StarDist provides built-in functions for computing standard instance segmentation metrics:

```python
from stardist.matching import matching, matching_dataset

# Single image evaluation
m = matching(Y_true, Y_pred, thresh=0.5)
print(f"Precision: {m.precision:.3f}")
print(f"Recall:    {m.recall:.3f}")
print(f"F1 score:  {m.f1:.3f}")
print(f"Mean IoU:  {m.mean_true_score:.3f}")

# Evaluate across a dataset at multiple IoU thresholds
taus = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
stats = [matching_dataset(Y_val, Y_pred_all, thresh=t) for t in taus]
for t, s in zip(taus, stats):
    print(f"IoU={t:.1f}: F1={s.f1:.3f}, Prec={s.precision:.3f}, Rec={s.recall:.3f}")
```

### Key metrics

| Metric | What it measures |
|---|---|
| **Precision** | Of the detected objects, how many are real? (Low precision = too many false positives) |
| **Recall** | Of the real objects, how many were detected? (Low recall = too many false negatives) |
| **F1 score** | Harmonic mean of precision and recall. Overall quality metric. |
| **Mean IoU** | Average intersection-over-union of matched objects. Measures boundary accuracy. |

---

## 19. Understanding StarDist Output

### The labels array

```python
labels, details = model.predict_instances(img_norm)

# labels: (Y, X) numpy array
#   0 = background
#   1 = first nucleus
#   2 = second nucleus
#   ...
```

### The details dictionary

```python
details["coord"]    # list of polygon coordinate arrays, one per object
details["points"]   # (N, 2) array of centroid (y, x) coordinates
details["prob"]     # (N,) array of detection probabilities
```

### Saving results

```python
import tifffile
import numpy as np

# Save as 16-bit TIFF (supports >255 objects)
tifffile.imwrite("nuclei_labels.tif", labels.astype(np.uint16))

# Save centroids to CSV
import pandas as pd
centroids = details["points"]
probs = details["prob"]
df = pd.DataFrame({
    "label": range(1, len(centroids) + 1),
    "y": centroids[:, 0],
    "x": centroids[:, 1],
    "probability": probs,
})
df.to_csv("nuclei_centroids.csv", index=False)
```

---

## 20. Measurements with scikit-image

```python
from skimage.measure import regionprops_table
import pandas as pd
import tifffile

# Load raw image and StarDist labels
img = tifffile.imread("dapi.tif")
labels = tifffile.imread("nuclei_labels.tif")

# Measure
props = regionprops_table(
    labels, img,
    properties=[
        "label", "area", "centroid", "mean_intensity",
        "eccentricity", "solidity", "perimeter",
        "major_axis_length", "minor_axis_length",
    ]
)

df = pd.DataFrame(props)
df.to_csv("nuclei_measurements.csv", index=False)

print(f"Measured {len(df)} nuclei")
print(df[["area", "mean_intensity", "eccentricity"]].describe())
```

### Multi-channel measurements

```python
multichannel = tifffile.imread("multichannel.tif")  # (C, Y, X)

# Measure each channel separately
for ch_idx, ch_name in enumerate(["DAPI", "GFP", "mCherry"]):
    props = regionprops_table(labels, multichannel[ch_idx],
                              properties=["label", "mean_intensity"])
    df_ch = pd.DataFrame(props).rename(columns={"mean_intensity": f"{ch_name}_mean"})
    df = df.merge(df_ch, on="label") if ch_idx > 0 else df_ch

df.to_csv("multichannel_measurements.csv", index=False)
```

---

## 21. Visualising Results

### In napari

```python
import napari
import tifffile
import numpy as np

img = tifffile.imread("dapi.tif")
labels = tifffile.imread("nuclei_labels.tif")

viewer = napari.Viewer()
viewer.add_image(img, name="DAPI", colormap="cyan")
viewer.add_labels(labels, name="Nuclei Masks")
napari.run()
```

### In matplotlib

```python
import matplotlib.pyplot as plt
from stardist import random_label_cmap
from csbdeep.utils import normalize

img_norm = normalize(img, 1, 99.8)
lbl_cmap = random_label_cmap()

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(img_norm, cmap="gray")
axes[0].set_title("Raw image")
axes[1].imshow(labels, cmap=lbl_cmap)
axes[1].set_title(f"StarDist: {labels.max()} nuclei")
for ax in axes:
    ax.axis("off")
plt.tight_layout()
plt.savefig("stardist_result.png", dpi=300)
plt.show()
```

---

## 22. Workflow 1: Fluorescent Nucleus Segmentation

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
import tifffile

# Load
img = tifffile.imread("dapi_nuclei.tif")

# Normalise
img_norm = normalize(img, 1, 99.8)

# Predict
model = StarDist2D.from_pretrained("2D_versatile_fluo")
labels, details = model.predict_instances(img_norm)

# Save
tifffile.imwrite("nuclei_masks.tif", labels.astype("uint16"))
print(f"Detected {labels.max()} nuclei")
```

---

## 23. Workflow 2: H&E Histopathology Nuclei

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
import tifffile

# Load H&E image (RGB)
img = tifffile.imread("he_tissue.tif")  # (Y, X, 3) RGB

# Normalise per channel
img_norm = normalize(img, 1, 99.8, axis=(0, 1))

# Use the H&E-specific model
model = StarDist2D.from_pretrained("2D_versatile_he")
labels, details = model.predict_instances(img_norm)

print(f"Detected {labels.max()} nuclei in H&E image")
tifffile.imwrite("he_nuclei_masks.tif", labels.astype("uint16"))
```

---

## 24. Workflow 3: 3D Nucleus Segmentation in Z-Stacks

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
import tifffile
import numpy as np

zstack = tifffile.imread("confocal_dapi_zstack.tif")  # (Z, Y, X)
model = StarDist2D.from_pretrained("2D_versatile_fluo")

# Process slice by slice
labels_list = []
for z in range(zstack.shape[0]):
    img_norm = normalize(zstack[z], 1, 99.8)
    lbl, _ = model.predict_instances(img_norm)
    labels_list.append(lbl)

labels_3d = np.stack(labels_list)
tifffile.imwrite("nuclei_3d_slicewise.tif", labels_3d.astype("uint16"))

# For true 3D: train a StarDist3D model or use Cellpose with do_3D=True
```

---

## 25. Workflow 4: Training a Custom Model for Unusual Nuclei

```python
from stardist.models import StarDist2D, Config2D
from stardist import fill_label_holes
from csbdeep.utils import normalize
from glob import glob
from tifffile import imread

# Load data
X = list(map(imread, sorted(glob("data/images/*.tif"))))
Y = list(map(imread, sorted(glob("data/masks/*.tif"))))
Y = [fill_label_holes(y) for y in Y]

# Split 80/20
split = int(0.8 * len(X))
X_train, X_val = X[:split], X[split:]
Y_train, Y_val = Y[:split], Y[split:]

# Normalise
X_train = [normalize(x, 1, 99.8) for x in X_train]
X_val   = [normalize(x, 1, 99.8) for x in X_val]

# Configure
conf = Config2D(n_rays=32, n_channel_in=1,
                train_patch_size=(256, 256),
                train_epochs=400, train_steps_per_epoch=100)

# Train
model = StarDist2D(conf, name="custom_nuclei", basedir="models")
model.train(X_train, Y_train, validation_data=(X_val, Y_val))
model.optimize_thresholds(X_val, Y_val)

# Use the trained model
labels, details = model.predict_instances(normalize(test_img, 1, 99.8))
```

---

## 26. Workflow 5: High-Throughput Nuclear Analysis Pipeline

```python
from stardist.models import StarDist2D
from csbdeep.utils import normalize
from skimage.measure import regionprops_table
import tifffile
import pandas as pd
import numpy as np
import os

model = StarDist2D.from_pretrained("2D_versatile_fluo")

image_dir = "experiment/"
all_measurements = []

for fname in sorted(os.listdir(image_dir)):
    if not fname.endswith(".tif"):
        continue

    # Load multi-channel: (C, Y, X), ch0=DAPI, ch1=GFP
    img = tifffile.imread(os.path.join(image_dir, fname))
    dapi = img[0]
    gfp = img[1]

    # Segment nuclei on DAPI
    dapi_norm = normalize(dapi, 1, 99.8)
    labels, details = model.predict_instances(dapi_norm)

    # Measure on both channels
    props = regionprops_table(labels, dapi,
        properties=["label", "area", "mean_intensity", "eccentricity"])
    df = pd.DataFrame(props).rename(columns={"mean_intensity": "DAPI_mean"})

    props_gfp = regionprops_table(labels, gfp,
        properties=["label", "mean_intensity"])
    df_gfp = pd.DataFrame(props_gfp).rename(columns={"mean_intensity": "GFP_mean"})

    df = df.merge(df_gfp, on="label")
    df["filename"] = fname
    all_measurements.append(df)

    print(f"{fname}: {labels.max()} nuclei")

results = pd.concat(all_measurements, ignore_index=True)
results.to_csv("nuclear_analysis.csv", index=False)
print(f"\nTotal: {len(results)} nuclei across {len(all_measurements)} images")
```

---

## 27. Performance Tips

### Use GPU

StarDist is fast even on CPU, but GPU (via TensorFlow) significantly speeds up large images and batch processing.

### Normalise correctly

Always use `normalize(img, 1, 99.8)`. Wrong normalisation is the #1 cause of poor StarDist results.

### Reduce n_rays for speed

If you don't need fine boundary detail, reducing `n_rays` from 32 to 16 can speed up both training and inference. For round nuclei, 16 rays may be sufficient.

### Tile large images

StarDist can predict on tiles for images that exceed GPU memory. The Python API handles this automatically, but you can control tile size:

```python
labels, details = model.predict_instances(img_norm,
    predict_kwargs={"n_tiles": (2, 2)})  # split into 2×2 tiles
```

### Pre-compute normalisation

If processing many images with similar intensity ranges, compute normalisation percentiles once and reuse.

---

## 28. Common Problems and Solutions

### No nuclei detected

- **Forgot to normalise.** This is the most common issue. Always use `normalize()`.
- **Wrong model.** Use `2D_versatile_fluo` for fluorescence, `2D_versatile_he` for H&E.
- **prob_thresh too high.** Decrease it.

### Too many false detections

- **Increase prob_thresh** (e.g., from 0.5 to 0.7)
- Background debris or artefacts may need pre-processing (Gaussian blur, background subtraction)

### Nuclei merged (touching nuclei not separated)

- **Decrease nms_thresh** (e.g., from 0.3 to 0.1)
- StarDist should handle touching nuclei well; if not, the nuclei may be too irregularly shaped for star-convex representation. Consider Cellpose instead.

### Jagged boundaries

- **Increase n_rays** (e.g., from 32 to 64) when training a custom model
- This gives finer angular resolution at the cost of speed

### "ModuleNotFoundError: No module named 'stardist'"

- Install StarDist: `pip install stardist`
- Ensure you're in the correct conda environment

### TensorFlow/GPU issues

- Ensure TensorFlow is properly installed with GPU support
- Check CUDA and cuDNN compatibility with your TensorFlow version
- Try `CUDA_VISIBLE_DEVICES=""` to force CPU if GPU causes crashes

---

## 29. StarDist vs. Cellpose: When to Use Which

| Consideration | StarDist | Cellpose |
|---|---|---|
| **Object shape** | Star-convex only (round/oval) | Any shape (arbitrary) |
| **Speed** | Very fast (seconds, even CPU) | Moderate (seconds with GPU, slower on CPU) |
| **Best for** | Nuclei, beads, bacteria, yeast | Whole cells, neurons, irregular shapes |
| **Pre-trained models** | Fluorescent nuclei, H&E nuclei | Cells + nuclei, diverse types (cpsam) |
| **3D support** | Yes (requires custom training) | Yes (pre-trained works in 3D) |
| **Training data needed** | 10--20+ annotated images | 5--10 corrected images (HITL) |
| **Training ease** | Python scripting required | GUI-based human-in-the-loop |
| **Deep learning backend** | TensorFlow/Keras | PyTorch |
| **Model size** | Smaller, lighter | Larger (especially Cellpose-SAM) |
| **Touching objects** | Excellent for star-convex | Excellent for any shape |
| **GUI annotation** | Via FIJI or napari | Built-in GUI |
| **Boundary accuracy** | Excellent for round objects | Excellent for all shapes |
| **Multi-platform plugins** | FIJI, napari, QuPath, Icy, KNIME | napari, FIJI (via BIOP) |

### Decision guide

- **Round nuclei (DAPI, Hoechst, H&E)?** → Start with StarDist. It's faster and excellent.
- **Whole cells, cytoplasm, irregular shapes?** → Use Cellpose.
- **Need maximum speed?** → StarDist.
- **Mixed cell types, diverse datasets?** → Cellpose-SAM (better generalisation).
- **3D segmentation with no custom training?** → Cellpose (pre-trained 3D works).
- **3D nuclei, willing to train?** → StarDist 3D may give more precise boundaries.
- **Histopathology (H&E)?** → StarDist `2D_versatile_he` is excellent; also consider Cellpose-SAM.

### Use both together

Many pipelines use StarDist for nuclei and Cellpose for whole cells. The nuclear masks from StarDist serve as seeds for cell-level segmentation in Cellpose or CellProfiler.

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using StarDist for nucleus and cell detection. StarDist excels at fast, accurate segmentation of round/oval objects like nuclei, providing both Python API flexibility and convenient GUI plugins for FIJI, napari, and QuPath.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*StarDist is free software released under a BSD-3 licence.*

*For community support, post on the image.sc forum with the "stardist" tag: https://forum.image.sc/tag/stardist*
