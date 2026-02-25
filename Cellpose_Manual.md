# Cellpose Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why Cellpose?](#1-introduction-why-cellpose)
2. [Installing Cellpose](#2-installing-cellpose)
3. [How Cellpose Works: Flows and Dynamics](#3-how-cellpose-works-flows-and-dynamics)

**Part II: The Cellpose GUI**

4. [The GUI Interface](#4-the-gui-interface)
5. [Running Segmentation in the GUI](#5-running-segmentation-in-the-gui)
6. [Manual Annotation in the GUI](#6-manual-annotation-in-the-gui)

**Part III: The Python API**

7. [Running Cellpose from Python](#7-running-cellpose-from-python)
8. [Key Parameters and How to Tune Them](#8-key-parameters-and-how-to-tune-them)
9. [Working with Multi-Channel Images](#9-working-with-multi-channel-images)
10. [3D Segmentation](#10-3d-segmentation)
11. [Batch Processing](#11-batch-processing)

**Part IV: The Command Line Interface**

12. [Running Cellpose from the Command Line](#12-running-cellpose-from-the-command-line)

**Part V: Models**

13. [Built-In Models: cpsam and Legacy Models](#13-built-in-models-cpsam-and-legacy-models)
14. [Cellpose-SAM: The Foundation Model (Cellpose 4)](#14-cellpose-sam-the-foundation-model-cellpose-4)

**Part VI: Training Custom Models**

15. [When and Why to Train a Custom Model](#15-when-and-why-to-train-a-custom-model)
16. [Preparing Training Data](#16-preparing-training-data)
17. [Fine-Tuning from the GUI (Human-in-the-Loop)](#17-fine-tuning-from-the-gui-human-in-the-loop)
18. [Training from Python and the Command Line](#18-training-from-python-and-the-command-line)

**Part VII: Output and Post-Processing**

19. [Understanding Cellpose Output](#19-understanding-cellpose-output)
20. [Post-Processing: Measurements with scikit-image](#20-post-processing-measurements-with-scikit-image)
21. [Visualising Results in Napari](#21-visualising-results-in-napari)

**Part VIII: Integration**

22. [Cellpose in Napari](#22-cellpose-in-napari)
23. [Cellpose in FIJI/ImageJ](#23-cellpose-in-fijiimagej)
24. [Cellpose and CellProfiler](#24-cellpose-and-cellprofiler)
25. [Cellpose on the Cloud (HuggingFace)](#25-cellpose-on-the-cloud-huggingface)

**Part IX: Practical Workflows**

26. [Workflow 1: Nucleus Segmentation](#26-workflow-1-nucleus-segmentation)
27. [Workflow 2: Whole-Cell Segmentation with Nuclear Channel](#27-workflow-2-whole-cell-segmentation-with-nuclear-channel)
28. [Workflow 3: PIEZO1-GFP Puncta on Cell Masks](#28-workflow-3-piezo1-gfp-puncta-on-cell-masks)
29. [Workflow 4: 3D Z-Stack Cell Segmentation](#29-workflow-4-3d-z-stack-cell-segmentation)
30. [Workflow 5: Human-in-the-Loop Model Refinement](#30-workflow-5-human-in-the-loop-model-refinement)

**Part X: Tips and Troubleshooting**

31. [Performance and Speed Tips](#31-performance-and-speed-tips)
32. [Common Problems and Solutions](#32-common-problems-and-solutions)
33. [Cellpose vs. Other Segmentation Tools](#33-cellpose-vs-other-segmentation-tools)

---

## 1. Introduction: Why Cellpose?

### What is Cellpose?

Cellpose is a deep learning-based **generalist algorithm for cellular segmentation**. Given a microscopy image, it produces an **instance segmentation mask**: every pixel is assigned to either background (0) or a specific cell (1, 2, 3, ...), with each cell receiving a unique integer label. The current version is **Cellpose 4 (v4.0.8)**, featuring the **Cellpose-SAM** model (2025).

Cellpose was developed by **Carsen Stringer** and **Marius Pachitariu** at the **Howard Hughes Medical Institute (HHMI) Janelia Research Campus**, with contributions from Michael Rariden and others.

### The Cellpose papers

| Version | Paper | Key contribution |
|---|---|---|
| **Cellpose 1** | Stringer, Wang, Michaelos & Pachitariu (2021). *Nature Methods*, 18(1), 100--106. | Gradient flow-based generalist segmentation; cyto and nuclei models. |
| **Cellpose 2** | Pachitariu & Stringer (2022). *Nature Methods*. | Human-in-the-loop training; GUI-based fine-tuning. |
| **Cellpose 3** | Stringer & Pachitariu (2025). *Nature Methods*. | Image restoration (denoising, deblurring); cyto3 model. |
| **Cellpose-SAM** | Pachitariu, Rariden & Stringer (2025). *bioRxiv*. | SAM transformer backbone; superhuman generalisation; foundation model. |

### Why Cellpose for microscopy?

- **Generalist:** Works on diverse cell types (epithelial, neurons, bacteria, yeast, plant cells, etc.) without retraining
- **Instance segmentation:** Separates touching cells, unlike semantic segmentation
- **Works out of the box:** Pre-trained models handle most microscopy data immediately
- **Fine-tunable:** When the pre-trained model isn't perfect, you can fine-tune on a few annotated images
- **Human-in-the-loop:** The GUI supports iterative training: run → correct → retrain → repeat
- **2D and 3D:** Native support for volumetric data
- **Multiple interfaces:** Python API, command line, GUI, napari plugin, web (HuggingFace)
- **Robust:** Cellpose-SAM is invariant to channel order, cell size, noise, blur, and contrast inversions

### Relevance to PIEZO1-HaloTag hiPSC imaging

This manual was developed with the workflows of Bertaccini et al. (2025, *Nature Communications*) in mind, where endogenously tagged PIEZO1-HaloTag human induced pluripotent stem cells (hiPSCs) are differentiated into multiple cell types --- endothelial cells (ECs), keratinocytes, and neural stem cells (NSCs) --- and imaged by TIRF microscopy. Cellpose is the segmentation backbone of that pipeline: accurate cell masks are required to calculate PIEZO1 puncta density (puncta per um^2) for each cell. Because these hiPSC-derived cell types have dramatically different morphologies (spread ECs on fibronectin, compact keratinocyte colonies, elongated NSCs), a generalist model such as Cellpose-SAM is essential for handling them all within a single analysis framework.

### What Cellpose does NOT do

- **Object classification:** Cellpose segments cells but does not classify them into types. Use a separate classifier (scikit-learn, CellProfiler, ilastik) on the segmented objects.
- **Tracking:** Cellpose segments individual frames. For tracking, pipe masks into a tracker (TrackMate, trackpy, btrack).
- **Measurements:** Cellpose outputs masks. Use scikit-image `regionprops`, CellProfiler, or similar for measurements.

---

## 2. Installing Cellpose

### Recommended installation (conda + pip)

```bash
# Create a dedicated environment
conda create --name cellpose python=3.10
conda activate cellpose

# Install cellpose with the GUI
pip install "cellpose[gui]"

# Or without the GUI (for headless servers, pipelines)
pip install cellpose
```

### GPU support (highly recommended)

Cellpose runs on CPU, but a **CUDA-capable NVIDIA GPU** speeds up inference dramatically (~10× faster).

```bash
# After installing cellpose, install GPU-enabled PyTorch
# Check https://pytorch.org/get-started/locally/ for the correct command
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

**Apple Silicon (M1/M2/M3/M4):** Cellpose supports MPS (Metal Performance Shaders) for GPU acceleration on macOS. It should work automatically with `gpu=True`.

### Verifying the installation

```bash
# Check version
python -c "import cellpose; print(cellpose.__version__)"

# Check GPU availability
python -c "import torch; print('CUDA:', torch.cuda.is_available()); print('MPS:', torch.backends.mps.is_available())"

# Launch the GUI
python -m cellpose
```

### System requirements

- **Minimum:** Python 3.8+, 8 GB RAM
- **Recommended:** Python 3.10, 16--32 GB RAM (for large images and 3D), NVIDIA GPU with CUDA
- **Platforms:** Windows, macOS, Linux

---

## 3. How Cellpose Works: Flows and Dynamics

### The core algorithm

Cellpose uses a fundamentally different approach to instance segmentation compared to traditional methods. Instead of detecting edges or thresholding, Cellpose predicts **gradient flow fields** that point towards each cell's centre.

**Step 1: The neural network predicts three outputs for each pixel:**
- **Horizontal flow (X)** --- a vector pointing towards the cell centre in the X direction
- **Vertical flow (Y)** --- a vector pointing towards the cell centre in the Y direction
- **Cell probability** --- how likely this pixel is to be part of any cell (vs. background)

**Step 2: Flow dynamics.** Starting from each pixel with sufficient cell probability, Cellpose simulates the flow field dynamics: pixels "flow" along the predicted gradient vectors towards cell centres. Pixels that converge to the same location belong to the same cell.

**Step 3: Consistency check.** Cellpose recomputes the expected flows for the recovered shapes and checks that they match the network's predictions. Inconsistent shapes are discarded.

### Why this approach works

The gradient flow representation has key advantages: it naturally handles cells of any shape (not just convex or star-convex), it works for touching cells (each cell's flows point to its own centre), and it generalises well because the training objective is to predict smooth vector fields rather than sharp boundaries.

### Cellpose-SAM architecture

Cellpose 4 (Cellpose-SAM) adapts the **SAM (Segment Anything Model) transformer backbone** to the Cellpose framework. The transformer was pre-trained on ~300,000 natural images and then fine-tuned on ~23,000 cellular images. This foundation model approach gives Cellpose-SAM dramatically better generalisation compared to the earlier U-Net-based models.

---

## 4. The GUI Interface

### Launching the GUI

```bash
conda activate cellpose
python -m cellpose

# For 3D Z-stack data:
python -m cellpose --Zstack
```

### Loading images

- **File → Load image** or **drag and drop** a file onto the window
- Supported formats: TIFF, PNG, JPEG, GIF
- For multi-channel, multi-Z TIFFs, the expected dimension order is: **Z × Channels × Y × X**

### GUI layout

**Image display (centre):** Shows the raw image and overlaid masks/flows.

**Controls (left panel):**
- **Model selection:** Choose a pre-trained model (cpsam, cyto3, nuclei, etc.)
- **Channels:** Set which image channel is the cytoplasm and which is the nucleus
- **Diameter:** Estimated cell diameter in pixels (optional for Cellpose-SAM)
- **Flow threshold / Cell probability threshold:** Fine-tune detection sensitivity
- **Run segmentation button**

**Overlays (toggles):**
- Masks (cell outlines and fills)
- Flows (the predicted gradient fields)
- Outlines only

### Keyboard shortcuts in the GUI

| Shortcut | Action |
|---|---|
| **Right-click → hover → right-click** | Draw a manual mask (outline mode) |
| **Left-click on mask** | Select a mask |
| **Ctrl + left-click** | Delete the clicked mask |
| **X** | Toggle masks on/off |
| **Z** | Toggle outlines on/off |
| **Ctrl+Z** | Undo |
| **Ctrl+S** | Save _seg.npy file |
| **A** | Toggle "single stroke" mode |
| **Page Up/Down** | Navigate Z-slices (3D) |

---

## 5. Running Segmentation in the GUI

### Quick start

1. Launch the GUI: `python -m cellpose`
2. Drag and drop your image
3. Select model: **cpsam** (the default Cellpose-SAM model)
4. Set the **channels** (see Section 9)
5. Optionally adjust the **diameter** (or leave at 0 for auto)
6. Click **Run segmentation** (or press Shift+Enter)
7. View the results: masks overlaid on the image
8. Save: File → Save _seg.npy, or File → Save PNG masks

### Interpreting the output

After running, several overlays become available:

- **Masks:** Coloured overlay where each cell has a different colour
- **Outlines:** Cell boundaries only
- **Flows:** The predicted horizontal and vertical gradient fields (useful for diagnosing failures)

If cells are missing or over-segmented, adjust the thresholds (Section 8) and re-run.

---

## 6. Manual Annotation in the GUI

### Creating manual masks (for training data)

Cellpose's GUI doubles as an annotation tool for creating ground-truth segmentation masks:

1. Load your image
2. **Right-click** to start drawing a mask outline
3. **Hover** your mouse around the cell boundary (do not hold the button)
4. **Right-click** again (or return to the starting point) to complete the mask
5. Repeat for each cell
6. Masks are saved automatically as `_seg.npy` files

### Important rules

- **No overlapping masks.** If you draw a mask on top of an existing one, it is automatically cropped.
- **Single stroke per cell** in 2D (when `single_stroke` is checked)
- For **3D annotation:** uncheck `single_stroke`, draw on multiple Z-planes, press **Enter** to complete. ilastik will interpolate between labelled planes.

### Editing masks

- **Select:** Left-click on a mask to select it
- **Delete:** Ctrl + left-click, or Edit → Remove selected cell
- **Undo:** Ctrl+Z

---

## 7. Running Cellpose from Python

### Basic 2D segmentation

```python
from cellpose import models, io
import numpy as np

# Load an image
img = io.imread("cells.tif")

# Create a model
model = models.CellposeModel(gpu=True)  # default model is "cpsam"

# Run segmentation
masks, flows, styles = model.eval(img, diameter=30, channels=[0, 0])

# masks: integer array, 0=background, 1=first cell, 2=second cell, ...
# flows: list of arrays (flow fields and cell probability)
# styles: style vector (zeros for Cellpose-SAM)

print(f"Found {masks.max()} cells")
```

### The `model.eval()` return values

| Return value | Type | Description |
|---|---|---|
| `masks` | numpy array (Y, X) | Integer mask: 0=background, 1,2,3,...=individual cells |
| `flows` | list of arrays | [flows_RGB, flows_XY, cell_probability, (style)] |
| `styles` | numpy array | Style vector (zeros for Cellpose-SAM; used for model matching in legacy models) |

### Saving results

```python
from cellpose import io

# Save masks as PNG (each pixel = cell ID)
io.save_masks(img, masks, flows, file_names=["cells.tif"], savedir="results/",
              png=True, tif=True, save_flows=True, save_outlines=True)
```

This saves:
- `cells_cp_masks.tif` --- masks as a TIFF
- `cells_cp_masks.png` --- masks as a PNG
- `cells_outlines.txt` --- cell outlines as coordinates
- `cells_flows.tif` --- flow fields
- `cells_seg.npy` --- complete segmentation data (masks + flows + metadata)

---

## 8. Key Parameters and How to Tune Them

### diameter

The estimated diameter of cells in **pixels**. Cellpose rescales the image so that cells are approximately 30 pixels in diameter (the scale the model was trained on).

```python
masks, flows, styles = model.eval(img, diameter=30)
```

- **For Cellpose-SAM (cpsam):** Diameter is **optional**. The model is robust to a wide range of cell sizes (7.5 to 120 pixels). Setting a diameter primarily controls downsampling for speed.
- **For legacy models (cyto, cyto2, cyto3, nuclei):** Diameter matters more. Set it to the approximate diameter of your cells.
- **diameter=0 or diameter=None:** Uses default (30 for cpsam) or auto-estimation for legacy models.
- **Tip:** If cells are very large (>100 px diameter), set the diameter to downsample the image, which speeds up processing.

### flow_threshold

Controls how strictly Cellpose checks that predicted shapes are consistent with the flow field. Default: **0.4**.

```python
masks, flows, styles = model.eval(img, diameter=30, flow_threshold=0.4)
```

- **Lower (e.g., 0.2):** Stricter. Removes more cells, including potentially real but poorly predicted ones.
- **Higher (e.g., 0.8):** More permissive. Keeps more cells, but may include artefacts.
- **Not used for 3D segmentation.**

### cellprob_threshold

Controls the minimum "cell probability" for a pixel to be included in the mask creation step. Default: **0.0**.

```python
masks, flows, styles = model.eval(img, diameter=30, cellprob_threshold=0.0)
```

- **Decrease (e.g., -2.0):** Finds more and larger cells, including dim ones. Useful when cells are being missed.
- **Increase (e.g., 2.0):** Finds fewer, more confident cells. Useful when background is being segmented.

### Tuning strategy

1. Run with defaults: `diameter=30, flow_threshold=0.4, cellprob_threshold=0.0`
2. If **cells are missing** (especially dim cells) → decrease `cellprob_threshold` to -1 or -2
3. If **too many false positives** (background segmented as cells) → increase `cellprob_threshold` to 1 or 2
4. If **cells have weird shapes** → decrease `flow_threshold` to 0.2
5. If **cells are over-segmented** (one cell split into pieces) → increase `flow_threshold` or increase `diameter`
6. If **cells are under-segmented** (two cells merged) → decrease `diameter`

---

## 9. Working with Multi-Channel Images

### The channels parameter

Cellpose can use up to two channels: one for the **cytoplasm** (or the object you want to segment) and one for the **nucleus** (to help locate cell centres).

```python
# channels = [cytoplasm_channel, nucleus_channel]
# Channel numbering: 0=grayscale, 1=red, 2=green, 3=blue

# Grayscale image (single channel)
masks, flows, styles = model.eval(img, channels=[0, 0])

# Green cytoplasm, blue nucleus
masks, flows, styles = model.eval(img, channels=[2, 3])

# Red cytoplasm, no nuclear channel
masks, flows, styles = model.eval(img, channels=[1, 0])

# For arbitrary channel images (not RGB), use channel_axis:
# img shape: (C, Y, X)  →  specify channel_axis=0
masks, flows, styles = model.eval(img, channels=[1, 2], channel_axis=0)
```

### Cellpose-SAM and channels

**Important change in Cellpose 4:** Cellpose-SAM has been trained to be **invariant to channel order**. You do not need to specify which channel is cytoplasm vs. nucleus. It uses the first three channels of your image. For two-channel fluorescence (cytoplasm + nuclei), you can provide them in any order. If you have more than three channels, omit the extras or combine them.

### Common channel settings

| Image type | channels | Notes |
|---|---|---|
| Grayscale (brightfield, DIC, single fluorescence) | `[0, 0]` | Single channel, no nuclear help |
| Cytoplasm (green) + Nucleus (blue) | `[2, 3]` | Standard two-channel fluorescence |
| Nucleus only (DAPI/Hoechst, any channel) | `[0, 0]` | Use with `nuclei` model or cpsam |
| Phase contrast / DIC | `[0, 0]` | Grayscale |
| Membrane stain + Nuclear stain | `[1, 2]` | Depends on colour assignments |

---

## 10. 3D Segmentation

### Running 3D segmentation

```python
from cellpose import models
import tifffile

# Load a Z-stack: shape (Z, Y, X) or (Z, C, Y, X)
zstack = tifffile.imread("confocal_zstack.tif")

model = models.CellposeModel(gpu=True)

masks, flows, styles = model.eval(
    zstack,
    diameter=30,
    channels=[0, 0],
    do_3D=True,
    anisotropy=2.0,     # if Z-step is 2× the XY pixel size
)

print(f"Found {masks.max()} cells in 3D")
```

### Key 3D parameters

| Parameter | Description |
|---|---|
| `do_3D=True` | Enable true 3D segmentation (runs network on XY, XZ, YZ planes and combines) |
| `anisotropy` | Ratio of Z-step to XY pixel size (e.g., 2.0 if Z-step = 0.5 µm and XY = 0.25 µm). Rescales Z before processing. |
| `flow3D_smooth` | If >0, smooth 3D flows with Gaussian of this sigma. Helps with noisy data. Default: 0. |

### 3D in the GUI

Launch the 3D GUI:

```bash
python -m cellpose --Zstack
```

Use Page Up / Page Down to scroll through Z-slices. Check the "3D" checkbox before running segmentation.

### Tips for 3D

- 3D segmentation is significantly slower and more memory-intensive than 2D
- For very large Z-stacks, consider segmenting in 2D slice-by-slice and stitching the masks in Z (using `stitch_threshold` parameter)
- Setting `anisotropy` correctly is important for accurate 3D shapes

---

## 11. Batch Processing

### Batch processing in Python

```python
from cellpose import models, io
import os

model = models.CellposeModel(gpu=True)

image_dir = "images/"
files = [os.path.join(image_dir, f) for f in os.listdir(image_dir)
         if f.endswith((".tif", ".tiff", ".png"))]

for f in files:
    img = io.imread(f)
    masks, flows, styles = model.eval(img, diameter=30, channels=[0, 0])
    io.save_masks(img, masks, flows, file_names=[f], savedir="results/",
                  png=True, tif=True, save_outlines=True)
    print(f"Processed {f}: {masks.max()} cells")
```

### Batch processing from the command line

```bash
python -m cellpose \
    --dir /path/to/images/ \
    --pretrained_model cpsam \
    --diameter 30 \
    --chan 0 \
    --chan2 0 \
    --save_tif \
    --save_png \
    --verbose
```

### Batch on HuggingFace (no install)

The Cellpose-SAM website at https://huggingface.co/spaces/mouseland/cellpose allows batch processing with a free HuggingFace account, with no local installation required.

---

## 12. Running Cellpose from the Command Line

### Basic usage

```bash
# Segment all images in a directory
python -m cellpose --dir /path/to/images/ --pretrained_model cpsam --diameter 30

# Specify channels
python -m cellpose --dir /path/to/images/ --chan 2 --chan2 3 --diameter 30

# Save masks as TIFF and PNG
python -m cellpose --dir /path/to/images/ --save_tif --save_png

# Use GPU
python -m cellpose --dir /path/to/images/ --use_gpu

# 3D segmentation
python -m cellpose --dir /path/to/zstacks/ --do_3D --anisotropy 2.0
```

### Key CLI options

| Option | Description |
|---|---|
| `--dir <path>` | Directory containing images to process |
| `--pretrained_model <name>` | Model name: `cpsam` (default), `cyto3`, `nuclei`, or path to custom model |
| `--diameter <N>` | Estimated cell diameter in pixels |
| `--chan <N>` | Cytoplasm channel (0=gray, 1=red, 2=green, 3=blue) |
| `--chan2 <N>` | Nuclear channel (0=none) |
| `--flow_threshold <F>` | Flow error threshold (default: 0.4) |
| `--cellprob_threshold <F>` | Cell probability threshold (default: 0.0) |
| `--use_gpu` | Use GPU if available |
| `--do_3D` | Run 3D segmentation |
| `--anisotropy <F>` | Z anisotropy factor for 3D |
| `--save_tif` | Save masks as TIFF |
| `--save_png` | Save masks as PNG |
| `--save_outlines` | Save outlines as text |
| `--save_flows` | Save flow fields |
| `--verbose` | Print progress to terminal |
| `--train` | Train a model (see Section 18) |
| `--test_dir <path>` | Test directory for training |

---

## 13. Built-In Models: cpsam and Legacy Models

### Available models

| Model | Type | Best for | Notes |
|---|---|---|---|
| **cpsam** | Cellpose-SAM (transformer) | Everything --- the default and recommended model | Foundation model. Channel-invariant, size-robust. Cellpose 4 default. |
| **cyto3** | U-Net (Cellpose 3) | Cytoplasm segmentation | Trained on extended dataset with image restoration. |
| **cyto2** | U-Net (Cellpose 2) | Cytoplasm segmentation | Community-contributed training data. |
| **cyto** | U-Net (Cellpose 1) | Cytoplasm segmentation | Original model. |
| **nuclei** | U-Net (Cellpose 1) | Nuclear segmentation | Trained on nuclear images. diam_mean=17. |

### Using a specific model

```python
# Cellpose-SAM (default in v4)
model = models.CellposeModel(pretrained_model="cpsam", gpu=True)

# Legacy cyto3 model
model = models.CellposeModel(pretrained_model="cyto3", gpu=True)

# Custom trained model
model = models.CellposeModel(pretrained_model="/path/to/my_model", gpu=True)
```

### Which model to use?

**Start with cpsam** (the default). It outperforms all legacy models on virtually all datasets. Only fall back to legacy models if you have a specific reason (e.g., you already have a fine-tuned cyto3 model, or you need the style vector which cpsam does not provide).

---

## 14. Cellpose-SAM: The Foundation Model (Cellpose 4)

### What makes Cellpose-SAM special

Cellpose-SAM adapts Meta's **Segment Anything Model (SAM)** transformer backbone to the Cellpose gradient flow framework. Key properties:

- **Superhuman generalisation:** Outperforms the agreement between individual human annotators; approaches the theoretical human-consensus bound.
- **Channel invariant:** Trained with channels in random order. You don't need to specify which channel is cytoplasm vs. nucleus.
- **Size invariant:** Trained on diameters from 7.5 to 120 pixels. Specifying `diameter` is optional (mainly affects downsampling for speed).
- **Robust to degradations:** Shot noise, anisotropic blur, undersampling, contrast inversions.
- **Fine-tunable:** You can fine-tune Cellpose-SAM on your own data, just like previous Cellpose models.

### Changes from Cellpose 3

- `cellpose.models.Cellpose` class was **removed**. Use only `cellpose.models.CellposeModel`.
- `cellpose.models.SizeModel` was **removed**. Diameter estimation is no longer needed.
- Denoising (`cellpose.denoise`) is **currently not available** in Cellpose 4.
- Style vectors are **not computed** by Cellpose-SAM (returns zeros for compatibility).
- The default model is now `"cpsam"` instead of `"cyto3"`.

---

## 15. When and Why to Train a Custom Model

### When the pre-trained model is not enough

Cellpose-SAM works well on a wide variety of images, but you may need to fine-tune when:

- Your cells have unusual morphology (e.g., long processes, irregular shapes)
- Your imaging modality produces very different contrast from training data
- You want to segment non-cellular objects (organelles, colonies, tissue regions)
- The model consistently makes specific errors on your data

### The Human-in-the-Loop approach

Cellpose 2 introduced a powerful workflow for iterative model refinement:

1. **Run** Cellpose on your images
2. **Correct** the mistakes in the GUI (delete wrong masks, draw missing ones)
3. **Retrain** the model using all corrected images
4. **Evaluate** on the next image
5. **Repeat** until the model is accurate

This process typically converges in 5--10 images. After that, the model rarely needs correction.

### Key principle: always fine-tune from cpsam

Always start fine-tuning from the built-in `cpsam` model. Do NOT fine-tune from a previously fine-tuned model. The Cellpose GUI enforces this by default.

The reason: the pre-trained model represents a broadly capable starting point. Fine-tuning from it with your current set of corrected images gives the best result. If you fine-tune from a previous fine-tuned model, you bias towards the earlier training data.

---

## 16. Preparing Training Data

### Required file structure

Cellpose expects pairs of images and masks in the same directory:

```
train/
├── image001.tif
├── image001_masks.tif       # or _masks.png
├── image002.tif
├── image002_masks.tif
├── ...
test/                        # optional test directory
├── image010.tif
├── image010_masks.tif
```

### Mask format

- **Integer label image:** 0=background, 1=first cell, 2=second cell, ...
- 16-bit TIFF (for >255 cells) or 8-bit PNG (for ≤255 cells)
- Same spatial dimensions as the input image
- Masks created in the Cellpose GUI are saved as `_seg.npy` files (use `--mask_filter _seg.npy` for training)

### Guidelines for good training data

- **Label ALL cells** in each training image (not just a subset). Cellpose cannot learn from unlabelled cells.
- **Outline cell boundaries precisely** --- include membrane, cytoplasm, and nucleus within the outline
- **Cells should be at least 10 pixels in diameter**
- **Include at least several dozen cells per image**, ideally ~100
- **Represent the variation** in your data: different cell sizes, shapes, brightness levels, confluencies
- If images are very large, **crop** them into smaller patches for training
- If images are very small, **combine** multiple images into a montage

---

## 17. Fine-Tuning from the GUI (Human-in-the-Loop)

### Step-by-step

1. **Launch the GUI:** `python -m cellpose`
2. **Load an image:** File → Load image
3. **Run the pre-trained model** (cpsam) to get initial masks
4. **Correct the masks:**
   - Delete incorrect masks: Ctrl + left-click
   - Draw missing masks: right-click → hover → right-click
   - The GUI auto-saves corrections as `_seg.npy`
5. **Open more images** in the same folder and correct them too (at least 3--5 images)
6. **Train:** Models → Train new model
   - Select starting model: `cpsam`
   - Training runs on all `_seg.npy` files in the folder
   - A new model file is saved in `~/.cellpose/models/`
7. **Evaluate:** Load a new image and run the newly trained model
8. **Iterate:** If the model still makes mistakes, correct them and retrain
9. **Convergence:** After 5--10 images, the model typically requires no further correction

### Training parameters in the GUI

- **Number of epochs:** Default 100. Usually sufficient for fine-tuning.
- **Learning rate:** Default 1e-5 (for Cellpose-SAM fine-tuning). Do not change unless you know what you're doing.
- **Weight decay:** Default 0.1.

---

## 18. Training from Python and the Command Line

### Training from Python

```python
from cellpose import models, train, io

# Setup logging
io.logger_setup()

# Load training data
train_dir = "/path/to/train/"
test_dir = "/path/to/test/"

output = io.load_train_test_data(
    train_dir, test_dir,
    image_filter="_img",     # or None for default
    mask_filter="_masks",    # suffix identifying mask files
    look_one_level_down=False,
)
images, labels, image_names, test_images, test_labels, image_names_test = output

# Create model
model = models.CellposeModel(gpu=True)

# Train
model_path, train_losses, test_losses = train.train_seg(
    model.net,
    train_data=images,
    train_labels=labels,
    test_data=test_images,
    test_labels=test_labels,
    learning_rate=1e-5,
    weight_decay=0.1,
    n_epochs=100,
    train_batch_size=1,
    model_name="my_cellpose_model",
)

print(f"Model saved to: {model_path}")
```

### Training from the command line

```bash
python -m cellpose \
    --train \
    --dir ~/images/train/ \
    --test_dir ~/images/test/ \
    --learning_rate 0.00001 \
    --weight_decay 0.1 \
    --n_epochs 100 \
    --train_batch_size 1
```

### Using the trained model

```python
model = models.CellposeModel(pretrained_model="my_cellpose_model", gpu=True)
masks, flows, styles = model.eval(new_image, diameter=30, channels=[0, 0])
```

Or from the command line:

```bash
python -m cellpose --dir /path/to/images/ --pretrained_model my_cellpose_model
```

---

## 19. Understanding Cellpose Output

### The _seg.npy file

The primary output file, saved to the same folder as the input image:

```python
import numpy as np

seg = np.load("image_seg.npy", allow_pickle=True).item()

seg["masks"]    # (Y, X) integer array: 0=background, 1,2,...=cells
seg["flows"]    # list: [RGB_flows, dY, dX, cellprob, ...]
seg["outlines"] # list of coordinate arrays for each cell outline
seg["diams"]    # estimated diameter
seg["chan_choose"]  # channels used
```

### Mask files

- **_cp_masks.tif / _cp_masks.png:** The masks as a standard image file. Pixel values = cell IDs.
- **Important:** Mask PNGs may look like a gradient (dark at top, bright at bottom) because cell IDs increase monotonically. This is normal. View with a LUT in FIJI, or threshold >0 to see all cells.

### Outline files

- **_outlines.txt:** Cell outlines as coordinate lists. Useful for importing into other tools.

### Flow files

- **_flows.tif:** The predicted flow fields. Useful for debugging segmentation failures.

---

## 20. Post-Processing: Measurements with scikit-image

### Measuring cells from Cellpose masks

```python
from cellpose import models, io
from skimage.measure import regionprops_table
import pandas as pd
import tifffile

# Load image and run cellpose
img = tifffile.imread("cells.tif")
model = models.CellposeModel(gpu=True)
masks, flows, styles = model.eval(img, diameter=30, channels=[0, 0])

# Measure properties
props = regionprops_table(
    masks, img,
    properties=[
        "label", "area", "centroid", "mean_intensity",
        "eccentricity", "solidity", "perimeter", "major_axis_length",
        "minor_axis_length",
    ]
)

df = pd.DataFrame(props)
df.to_csv("cell_measurements.csv", index=False)

print(f"Measured {len(df)} cells")
print(df[["area", "mean_intensity", "eccentricity"]].describe())
```

### Filtering cells by size

```python
# Remove cells that are too small or too large
min_area = 100   # pixels
max_area = 5000

good_labels = df[(df["area"] >= min_area) & (df["area"] <= max_area)]["label"].values
filtered_masks = masks.copy()
filtered_masks[~np.isin(masks, good_labels)] = 0
```

### Multi-channel measurements

```python
import tifffile
import numpy as np

# Load multi-channel image: shape (C, Y, X)
multichannel = tifffile.imread("multichannel.tif")
gfp = multichannel[0]      # GFP channel
mcherry = multichannel[1]  # mCherry channel

# Measure each channel within the masks
props_gfp = regionprops_table(masks, gfp,
    properties=["label", "mean_intensity"])
props_mc = regionprops_table(masks, mcherry,
    properties=["label", "mean_intensity"])

df_gfp = pd.DataFrame(props_gfp).rename(columns={"mean_intensity": "GFP_mean"})
df_mc = pd.DataFrame(props_mc).rename(columns={"mean_intensity": "mCherry_mean"})

df = df_gfp.merge(df_mc, on="label")
df.to_csv("multichannel_measurements.csv", index=False)
```

---

## 21. Visualising Results in Napari

```python
import napari
import tifffile
import numpy as np
from cellpose import models

# Load and segment
img = tifffile.imread("cells.tif")
model = models.CellposeModel(gpu=True)
masks, flows, styles = model.eval(img, diameter=30, channels=[0, 0])

# Visualise in napari
viewer = napari.Viewer()
viewer.add_image(img, name="Raw", colormap="gray")
viewer.add_labels(masks, name="Cellpose Masks")

# Add centroids as points
from skimage.measure import regionprops
props = regionprops(masks)
centroids = np.array([p.centroid for p in props])
viewer.add_points(centroids, name="Centroids", size=8, face_color="yellow")

napari.run()
```

---

## 22. Cellpose in Napari

### The cellpose-napari plugin

```bash
pip install cellpose-napari
```

After installation, access via **Plugins → cellpose-napari: cellpose** in napari.

### Using the plugin

1. Load your image in napari
2. Open the cellpose plugin dock widget
3. Select the image layer
4. Choose a model (cpsam, cyto3, nuclei, etc.)
5. Set diameter and channels
6. Click **Run Segmentation**
7. Results appear as a Labels layer in napari

### Using Cellpose directly from napari's console

```python
# In napari's built-in console:
from cellpose import models

img = viewer.layers["Raw"].data
model = models.CellposeModel(gpu=True)
masks, flows, styles = model.eval(img, diameter=30, channels=[0, 0])
viewer.add_labels(masks, name="Cellpose Masks")
```

---

## 23. Cellpose in FIJI/ImageJ

### Via the command line / scripting

Since Cellpose is a Python package, the most common approach is to call it from FIJI via a script:

1. Run Cellpose from Python (or command line) on your images
2. Load the resulting mask TIFFs back into FIJI for further analysis

### PyImageJ bridge

```python
import imagej
import cellpose.models as models

ij = imagej.init()

# Load image through FIJI
img = ij.py.from_java(ij.io().open("image.tif"))

# Segment with cellpose
model = models.CellposeModel(gpu=True)
masks, _, _ = model.eval(img, diameter=30, channels=[0, 0])

# Send masks back to FIJI
ij.ui().show("Cellpose Masks", ij.py.to_java(masks))
```

### FIJI-based alternative: BIOP Cellpose wrapper

The BIOP (BioImaging & Optics Platform) provides a FIJI plugin that wraps Cellpose, allowing you to run it directly from FIJI's interface. Install via the BIOP update site in FIJI.

---

## 24. Cellpose and CellProfiler

Cellpose masks can be imported into CellProfiler for high-throughput measurement pipelines:

1. **Run Cellpose** on all images → save masks as TIFF
2. **In CellProfiler:** Load the original images and the Cellpose mask TIFFs as paired inputs
3. Use the **IdentifyPrimaryObjects** or **IdentifySecondaryObjects** modules with the masks as a "label image"
4. Alternatively, use the **RunCellpose** CellProfiler plugin (if available) to call Cellpose directly from within CellProfiler

CellProfiler can then measure hundreds of features per cell across multiple channels.

---

## 25. Cellpose on the Cloud (HuggingFace)

### No-install web interface

Cellpose-SAM is available on HuggingFace Spaces for processing images without any local installation:

**URL:** https://huggingface.co/spaces/mouseland/cellpose

- Upload one or more PNG/JPG images (<10 MB each)
- Images are resized to a max of 224×224 pixels
- Processing takes ~75 seconds per image (CPU-only on the free tier)
- Download the resulting masks

This is useful for quick tests or for users who cannot install Python.

### The cellpose.org web interface

The cellpose.org website also allows you to upload a single image for quick segmentation with Cellpose-SAM.

---

## 26. Workflow 1: Nucleus Segmentation

```python
from cellpose import models, io
import tifffile

# Load a DAPI/Hoechst stained image
nuclei_img = tifffile.imread("dapi.tif")

# Create model
model = models.CellposeModel(gpu=True)

# Segment nuclei (grayscale, no second channel)
masks, flows, styles = model.eval(
    nuclei_img,
    diameter=17,          # nuclei are typically smaller than whole cells
    channels=[0, 0],      # grayscale
    cellprob_threshold=0.0,
)

print(f"Detected {masks.max()} nuclei")

# Save
io.save_masks(nuclei_img, masks, flows, file_names=["dapi.tif"],
              savedir="results/", tif=True, save_outlines=True)
```

---

## 27. Workflow 2: Whole-Cell Segmentation with Nuclear Channel

```python
from cellpose import models, io
import tifffile
import numpy as np

# Load two-channel image: cytoplasm + nuclei
# Channel 0: cytoplasm (e.g., phalloidin, CellTracker)
# Channel 1: nuclei (e.g., DAPI)
img = tifffile.imread("cells_2ch.tif")  # shape: (2, Y, X)

model = models.CellposeModel(gpu=True)

# For Cellpose-SAM: channel order doesn't matter
# For legacy models: channels=[cytoplasm_channel, nucleus_channel]
masks, flows, styles = model.eval(
    img,
    diameter=30,
    channels=[1, 2],      # channel 1=cyto, channel 2=nuclei (1-indexed for colour)
    channel_axis=0,       # the first axis is channels
)

print(f"Detected {masks.max()} cells")
```

---

## 28. Workflow 3: PIEZO1-GFP Puncta on Cell Masks

Use Cellpose to segment cells, then count PIEZO1-GFP puncta within each cell:

```python
from cellpose import models
import tifffile
import numpy as np
from skimage.measure import regionprops_table, label
from skimage.feature import blob_log
import pandas as pd

# Load multi-channel: ch0=PIEZO1-GFP, ch1=membrane, ch2=DAPI
img = tifffile.imread("piezo1_multichannel.tif")  # (3, Y, X)

# Segment cells using membrane + DAPI channels
model = models.CellposeModel(gpu=True)
cell_masks, _, _ = model.eval(img[[1, 2]], diameter=40, channels=[1, 2], channel_axis=0)

# Detect PIEZO1-GFP puncta using blob detection
piezo1 = img[0].astype(float)
blobs = blob_log(piezo1, min_sigma=1, max_sigma=5, threshold=0.05)
# blobs: (N, 3) array: [y, x, sigma]

# Assign each punctum to a cell
puncta_per_cell = {}
for blob in blobs:
    y, x = int(blob[0]), int(blob[1])
    cell_id = cell_masks[y, x]
    if cell_id > 0:
        puncta_per_cell[cell_id] = puncta_per_cell.get(cell_id, 0) + 1

# Measure cell properties
props = regionprops_table(cell_masks, piezo1,
    properties=["label", "area", "mean_intensity"])
df = pd.DataFrame(props)
df["puncta_count"] = df["label"].map(puncta_per_cell).fillna(0).astype(int)
df["puncta_density"] = df["puncta_count"] / df["area"]

df.to_csv("piezo1_analysis.csv", index=False)
print(df[["label", "area", "mean_intensity", "puncta_count", "puncta_density"]].head(10))
```

---

## 29. Workflow 4: 3D Z-Stack Cell Segmentation

```python
from cellpose import models
import tifffile

# Load Z-stack: shape (Z, Y, X)
zstack = tifffile.imread("confocal_zstack.tif")
print(f"Z-stack shape: {zstack.shape}")

model = models.CellposeModel(gpu=True)

# 3D segmentation
masks_3d, flows_3d, styles_3d = model.eval(
    zstack,
    diameter=30,
    channels=[0, 0],
    do_3D=True,
    anisotropy=2.0,       # Z-step is 2× XY pixel size
    flow3D_smooth=1,      # gentle smoothing of 3D flows
)

print(f"Detected {masks_3d.max()} cells in 3D")

# Save 3D masks
tifffile.imwrite("masks_3d.tif", masks_3d.astype("uint16"))

# Visualise in napari
import napari
viewer = napari.Viewer()
viewer.add_image(zstack, name="Z-Stack", scale=(2.0, 1.0, 1.0))
viewer.add_labels(masks_3d, name="3D Masks", scale=(2.0, 1.0, 1.0))
napari.run()
```

---

## 30. Workflow 5: Human-in-the-Loop Model Refinement

### Scenario

Cellpose works well on most of your images but consistently merges touching cells in dense regions.

### Step-by-step

1. **Run Cellpose** on 10 representative images:
```bash
python -m cellpose --dir train_images/ --save_tif --save_png
```

2. **Open in the GUI** and correct masks:
```bash
python -m cellpose
# Load each image, view masks, delete merged masks, draw correct masks
# GUI auto-saves as _seg.npy
```

3. **Train the model** (from command line):
```bash
python -m cellpose \
    --train \
    --dir train_images/ \
    --mask_filter _seg.npy \
    --learning_rate 0.00001 \
    --weight_decay 0.1 \
    --n_epochs 100
```

4. **Evaluate** on new images:
```bash
python -m cellpose --dir test_images/ --pretrained_model /path/to/trained_model
```

5. **Iterate** if needed: correct more images, retrain (always from cpsam, not from the fine-tuned model).

---

## 31. Performance and Speed Tips

### Use GPU

GPU acceleration provides ~10× speedup over CPU. Ensure CUDA is properly installed:

```python
import torch
print(torch.cuda.is_available())  # Should be True
```

### Resize large images

For cells larger than ~100 pixels in diameter, set `diameter` to enable automatic downsampling:

```python
# If cells are ~120 px diameter, setting diameter=60 downsamples by 2×
masks, flows, styles = model.eval(img, diameter=60)
```

### Tile processing for very large images

Cellpose automatically tiles images that exceed available memory. You can control tiling:

```python
masks, flows, styles = model.eval(img, diameter=30, tile_overlap=0.1)
```

### Batch size

For processing multiple images or 3D stacks, adjust `batch_size`:

```python
masks, flows, styles = model.eval(imgs, batch_size=8)  # process 8 tiles at once
```

### Memory management

- For 3D segmentation, 16--32 GB RAM is recommended
- Close other applications when processing large datasets
- Consider processing large images as crops and stitching results

---

## 32. Common Problems and Solutions

### No cells detected

**Causes and fixes:**
- **Wrong channels:** Verify `channels` setting matches your image
- **Wrong diameter:** Try different diameter values. For Cellpose-SAM, try `diameter=0` (default scaling).
- **cellprob_threshold too high:** Decrease to -1 or -2
- **Image normalisation:** Cellpose normalises images internally, but very unusual intensity distributions can cause issues

### Too many false positives (background segmented as cells)

- **Increase cellprob_threshold** to 1 or 2
- **Decrease flow_threshold** to 0.2
- Check if background has structure that could confuse the model

### Cells merged (under-segmentation)

- **Decrease diameter:** Forces the model to expect smaller cells
- **Add a nuclear channel** (if available): `channels=[cyto, nuc]`
- **Fine-tune the model** on a few corrected images

### Cells split (over-segmentation)

- **Increase diameter**
- **Increase flow_threshold** to 0.6 or 0.8

### "CUDA out of memory"

- Reduce image size or set a smaller `diameter` to downsample
- Reduce `batch_size`
- Process images as tiles (Cellpose does this automatically, but very large images may need more aggressive tiling)

### Slow performance

- Ensure GPU is being used: `model = models.CellposeModel(gpu=True)`
- Set `diameter` to enable downsampling for large cells
- Close other GPU-consuming applications

### Masks look correct in the GUI but wrong after batch processing

- Ensure the same `channels`, `diameter`, and thresholds are used in batch mode
- Check image formats: batch processing may interpret multi-channel images differently

---

## 33. Cellpose vs. Other Segmentation Tools

| Consideration | Cellpose | StarDist | ilastik | FIJI (threshold) |
|---|---|---|---|---|
| **Approach** | Deep learning (flow-based) | Deep learning (star-convex polygons) | Random Forest on pixel features | Classical thresholding + watershed |
| **Cell shapes** | Any shape (arbitrary) | Star-convex only (round/oval) | Any (depends on features) | Any (with manual tuning) |
| **Touching cells** | Excellent separation | Good for convex cells | Moderate | Poor without watershed |
| **Out-of-the-box** | Works on most images immediately | Works well for nuclei | Requires interactive training | Requires manual parameter tuning |
| **Training needed?** | No (pre-trained); optional fine-tuning | Pre-trained for nuclei; fine-tuning for other data | Always requires user annotation | No (parameter-based) |
| **3D support** | Yes (native) | Yes (3D models) | Yes (up to 5D) | Limited |
| **Speed** | Fast with GPU (~seconds for 2D) | Very fast (~seconds) | Moderate (feature computation) | Fast (simple operations) |
| **Programming** | Python, GUI, CLI | Python | GUI (no coding) | GUI / Macro |
| **Instance segmentation** | Yes (output = labelled masks) | Yes | Via object classification | Via watershed + Analyze Particles |
| **Best for** | General cell/nucleus segmentation, diverse cell types | Round nuclei, convex objects | Complex textures, multi-class problems | Simple, high-contrast images |

### When to use Cellpose

- You need to segment cells or nuclei and want something that works immediately
- Your cells have complex, non-convex shapes
- You have diverse cell types across experiments
- You want to fine-tune with minimal effort (5--10 annotated images)
- You need 3D segmentation

### When to use StarDist instead

- Your objects are consistently round/oval (nuclei, beads)
- You need maximum speed
- StarDist may outperform Cellpose on certain nuclear datasets (benchmark both)

### When to use ilastik instead

- You need multi-class pixel classification (not just foreground/background)
- You need object classification (healthy vs. dead cells)
- You prefer a no-code GUI approach
- Your segmentation problem requires texture or edge features more than shape

### Use Cellpose WITH other tools

Cellpose excels at segmentation. Combine it with:
- **scikit-image / pandas** for measurements
- **CellProfiler** for high-throughput phenotyping pipelines
- **napari** for interactive visualisation
- **trackpy / btrack / TrackMate** for tracking
- **FIJI** for any operations Cellpose doesn't cover

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using Cellpose for cell and nucleus segmentation. Cellpose-SAM (Cellpose 4) is currently the most accurate and versatile generalist segmentation tool available, working out of the box on diverse microscopy data and offering seamless fine-tuning when needed.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*Cellpose is free software released under the BSD-3 licence (code) with CC-BY-NC training data.*

*For community support, open an issue at https://github.com/MouseLand/cellpose or post on image.sc with the "cellpose" tag.*
