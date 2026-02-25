# ilastik Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why ilastik?](#1-introduction-why-ilastik)
2. [Installing ilastik](#2-installing-ilastik)
3. [The ilastik Interface](#3-the-ilastik-interface)
4. [Loading Data](#4-loading-data)
5. [Navigating Images in ilastik](#5-navigating-images-in-ilastik)

**Part II: Pixel Classification**

6. [How Pixel Classification Works](#6-how-pixel-classification-works)
7. [Choosing Pixel Features](#7-choosing-pixel-features)
8. [Training the Classifier: Drawing Labels](#8-training-the-classifier-drawing-labels)
9. [Live Prediction and Iterative Refinement](#9-live-prediction-and-iterative-refinement)
10. [Exporting Results: Probability Maps and Segmentations](#10-exporting-results-probability-maps-and-segmentations)

**Part III: Autocontext**

11. [What Autocontext Does and When to Use It](#11-what-autocontext-does-and-when-to-use-it)

**Part IV: Object Classification**

12. [From Pixels to Objects](#12-from-pixels-to-objects)
13. [Thresholding Probability Maps](#13-thresholding-probability-maps)
14. [Object Features](#14-object-features)
15. [Training the Object Classifier](#15-training-the-object-classifier)

**Part V: Density Counting**

16. [Counting Without Segmentation](#16-counting-without-segmentation)

**Part VI: Tracking**

17. [Tracking Workflows Overview](#17-tracking-workflows-overview)
18. [Automatic Tracking](#18-automatic-tracking)
19. [Manual and Semi-Automatic Tracking](#19-manual-and-semi-automatic-tracking)

**Part VII: Boundary-Based Segmentation**

20. [Carving (Semi-Automatic 3D Segmentation)](#20-carving-semi-automatic-3d-segmentation)
21. [Multicut (Boundary-Based Segmentation)](#21-multicut-boundary-based-segmentation)

**Part VIII: Neural Network Workflows**

22. [Neural Network Classification (BioImage Model Zoo)](#22-neural-network-classification-bioimage-model-zoo)
23. [Trainable Domain Adaptation](#23-trainable-domain-adaptation)

**Part IX: Batch Processing and Automation**

24. [Batch Processing Within the GUI](#24-batch-processing-within-the-gui)
25. [Headless Mode (Command-Line Processing)](#25-headless-mode-command-line-processing)
26. [Distributed Processing on HPC Clusters](#26-distributed-processing-on-hpc-clusters)

**Part X: Integration with Other Tools**

27. [ilastik and FIJI/ImageJ](#27-ilastik-and-fijiimagej)
28. [ilastik and Python (Scripting Pipelines)](#28-ilastik-and-python-scripting-pipelines)
29. [ilastik and CellProfiler](#29-ilastik-and-cellprofiler)

**Part XI: Practical Workflows**

30. [Workflow 1: Fluorescent Cell Segmentation](#30-workflow-1-fluorescent-cell-segmentation)
31. [Workflow 2: Classifying Cell Types by Morphology](#31-workflow-2-classifying-cell-types-by-morphology)
32. [Workflow 3: Counting Cells in Crowded Images](#32-workflow-3-counting-cells-in-crowded-images)
33. [Workflow 4: Tracking Dividing Cells](#33-workflow-4-tracking-dividing-cells)

**Part XII: Tips and Troubleshooting**

34. [Performance Tips](#34-performance-tips)
35. [Common Problems and Solutions](#35-common-problems-and-solutions)
36. [ilastik vs. Other Segmentation Tools](#36-ilastik-vs-other-segmentation-tools)

---

## 1. Introduction: Why ilastik?

### What is ilastik?

ilastik (always lowercase) is a free, open-source, interactive tool that brings **machine-learning-based image analysis** to biologists without requiring programming or machine learning expertise. You teach ilastik by drawing a few brush strokes on your image, and it learns to classify the rest. The current stable version is **1.4.1** (May 2025).

ilastik was created at the **Heidelberg Collaboratory for Image Processing (HCI)**, University of Heidelberg, Germany, by a team led by **Fred Hamprecht**, with key contributions from Christoph Sommer, Christoph Straehle, Ullrich Köthe, Anna Kreshuk, Thorben Kröger, Carsten Haubold, Martin Schiegg, Thorsten Beier, and many others. The project is funded in part by the **Chan Zuckerberg Initiative** and **EMBL**.

The original ilastik paper (Sommer et al., 2011) described the pixel classification approach. The comprehensive methods paper (Berg et al., 2019) in *Nature Methods* described all current workflows.

### The core idea

Most image analysis problems in biology can be framed as classification tasks: "Is this pixel part of a cell or background?" or "Is this object a healthy cell or a dead cell?" ilastik lets you provide a few labelled examples of each class, then trains a **Random Forest classifier** on computed image features to predict the class assignment for every pixel (or object) in the image --- interactively and in real time.

### ilastik's workflows at a glance

| Workflow | What it does | Annotation type |
|---|---|---|
| **Pixel Classification** | Semantic segmentation: classifies every pixel | Brush strokes |
| **Autocontext** | Two-stage pixel classification for harder problems | Brush strokes |
| **Object Classification** | Classifies pre-segmented objects into categories | Object clicks |
| **Density Counting** | Counts objects without segmenting them | Dots + background strokes |
| **Tracking** | Tracks objects across time (automatic or manual) | Divisions/mergers + links |
| **Animal Tracking** | Tracks lab animals (flies, mice, larvae) | Similar to tracking |
| **Carving** | Semi-automatic 3D object extraction | Foreground/background seeds |
| **Multicut** | Boundary-based segmentation (e.g., membranes) | Edge labels (true/false) |
| **Neural Network Classification** | Applies pre-trained deep learning models | None (pre-trained) |
| **Trainable Domain Adaptation** | Combines neural networks with pixel classification | Brush strokes |

### Relevance to PIEZO1-HaloTag imaging

The Bertaccini et al. (2025) study in *Nature Communications* used PIEZO1-HaloTag knock-in hiPSCs to visualize endogenous PIEZO1 as diffraction-limited puncta in TIRF microscopy. The study differentiated hiPSCs into endothelial cells (ECs), keratinocytes, and neural stem cells (NSCs), each with distinct morphologies, and also generated Micropatterned Neural Rosettes (MNRs) --- radially organized structures with a central lumen. ilastik plays a central role in the image analysis pipeline described in that work: pixel classification segments cell boundaries from actin stains (phalloidin or SPY555-actin), object classification categorizes PIEZO1 puncta as mobile versus immobile, and batch processing handles the many TIRF fields of view required for statistical power. ilastik's outputs feed downstream into FIJI (ThunderSTORM for puncta detection), Python (FLIKA for single-molecule analysis), and CellProfiler (for per-cell quantification). Throughout this manual, we include practical examples drawn from this PIEZO1-HaloTag workflow alongside general guidance.

### Strengths

- **No programming required** --- entirely GUI-based for training and prediction
- **Interactive** --- draw labels, see results instantly with Live Update
- **Works on large data** --- lazy computation processes only the visible region; full prediction in batch
- **Up to 5 dimensions** --- handles 3D, time, and multiple channels
- **Produces probability maps** --- soft outputs that can be thresholded downstream
- **Batch and headless modes** --- train once, apply to hundreds of images automatically
- **FIJI plugin** --- run trained classifiers directly from FIJI
- **Free and open source** --- GPL v2 licence

### Limitations

- The Random Forest classifier is powerful for many problems but less capable than deep learning for complex segmentation tasks (membranes, touching cells with similar appearance). The Neural Network workflow (1.4.0+) addresses this.
- Feature computation can be slow on very large 3D volumes, especially with many selected scales.
- ilastik's preferred file format is HDF5 (.h5); while it reads TIFF and other formats, performance is best with HDF5.
- ilastik is a standalone application with its own bundled Python environment --- it does not integrate into your existing Python environment the way napari does.

### How to cite ilastik

For the comprehensive reference:

```
Berg, S., Kutra, D., Kroeger, T., Straehle, C.N., Kausler, B.X., Haubold, C.,
Schiegg, M., Ales, J., Beier, T., Rudy, M., Eren, K., Cervantes, J.I., Xu, B.,
Beuttenmueller, F., Wolny, A., Zhang, C., Kreshuk, A. & Hamprecht, F.A. (2019).
ilastik: interactive machine learning for (bio)image analysis.
Nature Methods, 16, 1226–1232. doi:10.1038/s41592-019-0582-9
```

For the original toolkit paper:

```
Sommer, C., Straehle, C., Köthe, U. & Hamprecht, F.A. (2011).
ilastik: Interactive Learning and Segmentation Toolkit.
In Proc. 8th IEEE International Symposium on Biomedical Imaging (ISBI), 230–233.
```

---

## 2. Installing ilastik

### Download

ilastik provides ready-made, self-contained installers for all platforms. No Python installation is needed.

**Download from:** https://www.ilastik.org/download

| Platform | Notes |
|---|---|
| **Windows** | Standard installer (.exe). GPU build available for CUDA-capable GPUs. |
| **macOS (Intel)** | Application bundle (.app). Drag to Applications. |
| **macOS (Apple Silicon)** | Native ARM build available (1.4.1+). 2D neural networks use Metal Performance Shaders for acceleration. |
| **Linux** | Tar archive. Extract and run `./run_ilastik.sh`. |

### GPU-enabled builds

For the Neural Network Classification and Trainable Domain Adaptation workflows, GPU-enabled builds are recommended. These are distributed with NVIDIA's CUDA toolkit (Windows, Linux). On Apple Silicon Macs, Metal Performance Shaders are used for 2D network inference.

### System requirements

- **Minimum:** 64-bit operating system, 8 GB RAM (sufficient for 2D images and time-lapse sequences)
- **Recommended for 3D:** 16--32 GB RAM or more
- **Recommended for Autocontext on large 3D data:** 32+ GB RAM (the most memory-intensive workflow)
- **Optional:** NVIDIA GPU with CUDA support for neural network workflows

### Verifying the installation

Launch ilastik. You should see the startup screen with the list of available workflows. If the window appears, ilastik is installed correctly.

---

## 3. The ilastik Interface

### The startup screen

When you launch ilastik, the startup screen offers three options:

- **New Project** --- select a workflow (Pixel Classification, Object Classification, etc.) and create a new `.ilp` project file
- **Open Project** --- resume work on a previously saved project
- **Recent Projects** --- quick access to recently opened projects

### The workflow interface

Once a workflow is selected, ilastik presents a left-hand panel with **applets** --- sequential processing steps specific to your chosen workflow. For Pixel Classification, the applets are:

1. **Input Data** --- load your images
2. **Feature Selection** --- choose which pixel features to compute
3. **Training** --- draw labels and train the classifier
4. **Prediction Export** --- configure export settings
5. **Batch Processing** --- apply the trained classifier to many images

Click an applet name to navigate to that step. The applets must generally be completed in order.

### The viewer

The central area is the image viewer. For 2D data, it shows a single view. For 3D data, ilastik displays a **split view** with three orthogonal slicing planes (XY, XZ, YZ) and optionally a 3D rendering view.

### Layer controls

In the bottom-left corner, a layer list shows all visible overlays:

- **Raw data** --- the original image
- **Prediction** --- the classifier's live prediction (probability map or segmentation)
- **Labels** --- your training annotations
- **Uncertainty** --- how uncertain the classifier is at each pixel

Each layer has an eye icon (toggle visibility) and an opacity slider. You can toggle between the raw data and the current overlays by pressing **`i`**.

---

## 4. Loading Data

### Supported file formats

| Format | Notes |
|---|---|
| **HDF5 (.h5, .hdf5)** | ilastik's preferred format. Fastest performance due to blockwise access. |
| **TIFF (.tif, .tiff)** | Widely supported. Single images or stacks. |
| **PNG, JPEG, BMP** | Standard image formats (single 2D images). |
| **N5** | Chunked format for very large datasets. |
| **OME-Zarr** | Multiscale format (1.4.1+). Can load selected scales. |
| **Neuroglancer precomputed** | For large-scale connectomics data (1.4.1+). |

### Loading data in the Input Data applet

1. Click the **Input Data** applet
2. Click **Add New → Add separate image(s)** for single files
3. Or click **Add New → Add a single 3D/4D Volume from Sequence** for a folder of slices (one file per Z-slice or time-point)
4. Select your file(s)

### Checking dataset properties

After loading, double-click the filename in the dataset list to inspect and adjust:

- **Axes** --- ilastik needs to know which dimension is which (X, Y, Z, T, C). It usually guesses correctly, but verify for unusual data shapes.
- **Storage** --- options include "Original File" (reads from the file on disk) or "Copied to Project File" (copies data into the `.ilp` file as HDF5). Copying is slower initially but speeds up all subsequent operations.

### Converting TIFF to HDF5

If ilastik is slow with your TIFF files, convert to HDF5:

**In ilastik:** Change the "Storage" option to "Copied to Project File" in the dataset properties dialog.

**In FIJI:** Install the ilastik FIJI plugin (Help → Update → Manage Update Sites → check "ilastik"). Then use Plugins → ilastik → Export HDF5.

**In Python:**

```python
import tifffile
import h5py

stack = tifffile.imread("mydata.tif")
with h5py.File("mydata.h5", "w") as f:
    f.create_dataset("data", data=stack, compression="gzip")
```

### Tip: dimension order matters

ilastik expects dimensions in a specific order. For a time-lapse Z-stack with channels, the typical convention is **T, C, Z, Y, X**. If ilastik misinterprets the dimensions (e.g., treating Z as time), double-click the dataset entry and manually reassign the axis tags.

---

## 5. Navigating Images in ilastik

### Mouse and keyboard controls

| Action | Control |
|---|---|
| **Pan** | Middle-click drag, or hold Shift + left-click drag |
| **Zoom** | Scroll wheel |
| **Scroll through Z/T** | Right-click drag up/down on the image, or use the slider |
| **Toggle raw data view** | Press **`i`** (very useful: quickly compare raw data to prediction) |
| **Brush size** | Ctrl + scroll wheel, or adjust in the left panel |

### 3D navigation

For 3D data, ilastik shows three orthogonal views (XY, XZ, YZ). A crosshair indicates the current position in all three views. Click in any view to navigate the crosshair, and the other views update automatically.

### Layer visibility

Use the eye icon next to each layer to toggle visibility. Use the opacity slider to blend layers. When training, it's often helpful to rapidly toggle between the raw data and the prediction (press **`i`**) to see whether the classifier is performing well.

---

## 6. How Pixel Classification Works

### The Machine Learning approach

Pixel Classification is ilastik's most popular and fundamental workflow. It performs **semantic segmentation**: every pixel in the image is assigned to one of several user-defined classes (e.g., "cell", "background", "membrane").

The process has four steps:

1. **Feature computation** --- for each pixel, ilastik computes a set of image features (smoothed intensity, edges, texture) at multiple spatial scales. These features form a high-dimensional "description" of each pixel's local neighbourhood.

2. **User labelling** --- you paint a few brush strokes on the image, marking example pixels of each class. You do not need to label every pixel --- just a few representative examples of each class.

3. **Classifier training** --- a **Random Forest classifier** (an ensemble of decision trees) is trained on the labelled pixels' feature vectors. This happens in real time.

4. **Prediction** --- the trained classifier predicts the class for every unlabelled pixel, producing a **probability map** (a value between 0 and 1 for each class) for the entire image.

### What makes it powerful for biologists

- You draw a few brush strokes and immediately see the result
- If the result is wrong in some region, draw more labels there and the classifier updates instantly
- The generic feature set works well for a wide variety of biological images
- No parameter tuning beyond selecting which features and scales to use

### Application: Segmenting cell boundaries from actin stains in TIRF images

In the Bertaccini et al. (2025) PIEZO1-HaloTag workflow, Pixel Classification is used to segment cell boundaries and membrane regions from actin-stained TIRF images. The actin channel (phalloidin for fixed cells, or SPY555-actin for live cells) provides the raw data for ilastik. Typical classes include:

- **Cell interior** --- diffuse actin signal within the cell body
- **Cell membrane/cortical actin** --- bright, continuous actin signal marking cell boundaries
- **Background** --- dark regions outside cells in the TIRF field

For Micropatterned Neural Rosettes (MNRs), a fourth class may be needed:

- **Lumen** --- the central actin-rich ring structure where cells converge

The resulting probability maps define cell regions that are later used to assign PIEZO1 puncta to individual cells and to compute per-cell puncta density. Because the three hiPSC-derived cell types (ECs, keratinocytes, NSCs) have very different morphologies --- spread and flat for ECs, compact and polygonal for keratinocytes, elongated with processes for NSCs --- a single classifier trained on one cell type may not transfer well to others. In practice, train a separate ilastik project for each cell type, or train one project that includes representative images of all three.

### The Random Forest classifier

ilastik uses a Random Forest with 100 decision trees by default. Each tree sees a random subset of the training data and a random subset of the features. The ensemble averages the individual tree predictions to produce robust probability estimates. The Random Forest is fast to train (sub-second for typical annotations), handles high-dimensional feature spaces well, and rarely overfits.

---

## 7. Choosing Pixel Features

### The Feature Selection applet

After loading data, the Feature Selection applet presents a matrix of features and scales. Each cell in the matrix can be toggled on or off.

### Feature types

| Feature | Category | What it captures |
|---|---|---|
| **Gaussian Smoothing** | Colour/Intensity | Smoothed pixel intensity. Captures brightness at different scales. |
| **Laplacian of Gaussian** | Edge | Second derivative --- responds to blobs and edges. Good for detecting round bright objects (cells, nuclei). |
| **Gaussian Gradient Magnitude** | Edge | First derivative magnitude --- responds to edges regardless of orientation. |
| **Difference of Gaussians** | Edge | Approximation to Laplacian of Gaussian. Highlights features at a particular scale. |
| **Structure Tensor Eigenvalues** | Edge/Texture | Eigenvalues of the structure tensor. Captures edge orientation and strength. Good for elongated structures (fibres, neurites). |
| **Hessian of Gaussian Eigenvalues** | Texture | Eigenvalues of the Hessian matrix. Captures ridge-like and blob-like structures. Good for membranes, vessels, tube-like features. |

### Scales (sigma values)

Each feature can be computed at multiple spatial scales: **σ = 0.3, 0.7, 1.0, 1.6, 3.5, 5.0, 10.0** pixels by default. The sigma value is the standard deviation of the Gaussian used to smooth the image before applying the filter.

**How to choose scales:**

- **Small σ (0.3--1.0):** Captures fine details and edges. Good for small objects or thin structures.
- **Medium σ (1.6--3.5):** Captures features roughly the size of typical cells.
- **Large σ (5.0--10.0):** Captures large-scale context, background gradients, tissue-level structure.

**Rule of thumb:** Select scales that span the range from "smaller than your objects of interest" to "roughly the size of your objects." You can also add custom sigma values if the defaults don't cover the sizes you need.

### "Suggest Features" function

If you are unsure which features to select, ilastik provides a **Suggest Features** button. After you have drawn some labels, press this button. ilastik evaluates different feature subsets using out-of-bag error estimation from the Random Forest and reports both accuracy and computation time for each subset. You can accept a suggested set or use it as a starting point.

### Practical advice for feature selection

- **Start broad:** Select all features at 2--3 scales, train, and see if the result is good enough. If it is, you can reduce features to speed up processing.
- **For bright objects on dark background** (e.g., fluorescent cells): Gaussian Smoothing and Laplacian of Gaussian are usually sufficient.
- **For membrane/boundary-based segmentation** (e.g., EM, membrane stains): Include Hessian and Structure Tensor eigenvalues.
- **For textured regions:** Include Structure Tensor and Hessian at multiple scales.
- **Fewer features = faster processing.** If your classification works well with only Gaussian Smoothing at σ = 1.0 and 3.5, don't add everything else --- it just slows things down.

---

## 8. Training the Classifier: Drawing Labels

### The Training applet

The Training applet is where you interactively teach ilastik. Two labels (classes) are provided by default --- typically "Foreground" and "Background." You can add more classes by clicking **Add Label**.

### Drawing brush strokes

1. Select a label (click on its colour swatch)
2. Paint on the image with the left mouse button
3. You are painting **examples** --- you do NOT need to paint every cell or every background pixel
4. A few representative brush strokes in different areas are sufficient

### How much labelling is needed?

The beauty of ilastik is that you need very little labelling. Guidelines:

- **Start with 3--5 brush strokes per class** in different parts of the image
- Turn on **Live Update** to see the prediction immediately
- Look at where the classifier makes mistakes, and add labels specifically in those regions
- Continue this iterative cycle until the result is satisfactory

### Labelling strategy for good results

- **Label the easy cases first:** Mark obvious foreground and obvious background.
- **Then label the hard cases:** Add labels specifically in regions where the prediction is wrong --- near cell borders, dim cells, debris, etc.
- **Label in diverse regions:** Don't cluster all labels in one corner. Spread them across the image to capture variation in illumination, cell density, etc.
- **Label both sides of a boundary:** If cells are being confused with background at the edges, draw a thin background stroke right along the cell boundary, and a foreground stroke just inside.
- **Use the Uncertainty layer:** High uncertainty (bright areas) indicates where the classifier needs more training data.

### Erasing labels

Use the eraser tool to remove incorrect labels. Right-click and select "Erase" or use the eraser icon.

---

## 9. Live Prediction and Iterative Refinement

### Live Update mode

Press the **Live Update** button (or toggle it on) to see the classifier's prediction in real time as you add labels. The prediction overlay appears on top of the raw data.

### The prediction overlay

The prediction can be viewed as:

- **Prediction** --- a colour overlay where each pixel is coloured by its most probable class
- **Probabilities** --- a multi-channel probability map (one channel per class), where intensity = probability (0 to 1)
- **Uncertainty** --- how uncertain the classifier is at each pixel (bright = uncertain)

Toggle between these using the layer list in the bottom-left corner.

### Iterative refinement workflow

1. Draw initial labels (3--5 per class)
2. Enable Live Update
3. Examine the prediction
4. Find regions where the prediction is wrong
5. Add corrective labels in those regions
6. The prediction updates instantly
7. Repeat until satisfied

This is the core ilastik workflow. The interactive loop of "label → predict → examine → correct" is what makes ilastik so effective.

### Tips for refinement

- Press **`i`** to toggle between raw data and prediction --- this is the fastest way to check results
- Use the **Uncertainty** layer to find where more labels are needed
- If the classifier confuses two classes globally, you may need different features or scales (go back to Feature Selection)
- If the classifier is correct almost everywhere but fails on specific objects, targeted labelling in those areas usually fixes it

---

## 10. Exporting Results: Probability Maps and Segmentations

### Export types

| Export source | What it is | When to use |
|---|---|---|
| **Probabilities** | Multi-channel image, each channel = probability for one class (0.0--1.0) | Recommended default. Threshold downstream in FIJI, Python, or CellProfiler for maximum flexibility. |
| **Simple Segmentation** | Single-channel label image, each pixel = most probable class (1, 2, 3, ...) | When you need a quick segmentation and the ilastik prediction is satisfactory as-is. |
| **Uncertainty** | How uncertain the classifier is | For quality control: identify regions needing more training. |
| **Features** | The computed pixel features | For debugging or custom downstream analysis. |
| **Labels** | Your hand-drawn annotations | For reproducibility or transferring to another project. |

### The Prediction Export applet

1. Click **Prediction Export**
2. Select the **Source** dropdown (Probabilities, Simple Segmentation, etc.)
3. Click **Choose Export Image Settings** to configure:
   - **File format:** HDF5, TIFF, PNG, multipage TIFF, etc.
   - **Output filename:** use placeholders like `{nickname}` for the original filename
   - **Renormalization:** for probability maps, typically leave as "no renormalization" to preserve 0--1 values
   - **Data type conversion:** e.g., convert float32 probabilities to uint8 (0--255) for smaller files

### Recommended export: probability maps

We recommend **always exporting probability maps** rather than simple segmentations. Probability maps give you maximum downstream flexibility:

- Threshold at any level in FIJI or Python
- Apply different thresholds for different analyses
- Use as input for Object Classification in ilastik
- Use as input for CellProfiler's IdentifyPrimaryObjects

```
Export settings for probability maps:
  Source: Probabilities
  Format: TIFF (or HDF5 for ilastik pipelines)
  Renormalise: (none)
  Data type: float32 (preserves full precision) or uint8 (saves space, 0-255)
```

---

## 11. What Autocontext Does and When to Use It

### The problem Autocontext solves

Sometimes Pixel Classification alone is not enough --- for example, when cells have similar texture to background, or when thin boundaries between cells are hard to detect using only local features. In these cases, the classifier may perform poorly no matter how many labels you add.

### Two-stage classification

Autocontext trains **two sequential rounds** of pixel classification:

1. **Round 1:** Standard Pixel Classification (features → classifier → probability map)
2. **Round 2:** A second classifier is trained on the **original features plus the probability map from Round 1** as additional features

The key insight is that the Round 1 probability map provides spatial context: "Is this pixel surrounded by other foreground pixels?" This contextual information helps the Round 2 classifier resolve ambiguities.

### When to use Autocontext

- When standard Pixel Classification produces probability maps with noisy, fragmented predictions
- When boundary detection is critical (e.g., separating touching nuclei)
- When objects have internal heterogeneity that confuses a single classifier
- For electron microscopy membrane segmentation

### When NOT to use Autocontext

- When standard Pixel Classification already works well (Autocontext is slower and more memory-intensive)
- On very large 3D datasets where the memory cost is prohibitive (Autocontext requires approximately twice the features)

### Practical usage

Autocontext has the same interface as Pixel Classification but with two Training applets. You label in both rounds, and the second round benefits from the first round's predictions. The labelling strategy is the same: start sparse, use Live Update, refine iteratively.

---

## 12. From Pixels to Objects

### The Object Classification workflow

Pixel Classification assigns a class to each pixel. Object Classification goes a step further: it extracts **objects** from a segmentation mask and classifies entire objects into categories based on object-level features (area, shape, intensity statistics, etc.).

### Two-stage pipeline

Object Classification typically follows this pipeline:

1. **Pixel Classification** → export probability maps
2. **Object Classification** → threshold probabilities → extract objects → compute object features → train classifier → classify objects

### Starting Object Classification

When creating an Object Classification project, you choose the input type:

| Variant | Inputs | When to use |
|---|---|---|
| **Raw Data + Pixel Prediction Map** | Raw image + probability map from Pixel Classification | Most common. ilastik thresholds the probability map to get objects. |
| **Raw Data + Segmentation Image** | Raw image + pre-existing binary/label mask | When you already have a segmentation from another tool. |

---

## 13. Thresholding Probability Maps

### The Thresholding applet (Object Classification only)

When using probability maps as input, ilastik provides two thresholding methods to convert the continuous probability values into a binary mask (objects vs. background):

### Simple thresholding

- Set a single threshold value (e.g., 0.5)
- All pixels above the threshold → object; below → background
- Apply a size filter to remove objects smaller (or larger) than expected

### Hysteresis thresholding

- Uses **two thresholds**: a high threshold and a low threshold
- Pixels above the high threshold are definitely object
- Pixels above the low threshold that are **connected to** high-threshold pixels are also included
- This helps separate connected objects that share a lower-probability boundary

### Settings

- **Smooth (sigma):** Gaussian smoothing applied to the probability map before thresholding. Reduces noise in the probability map. For anisotropic data, set different sigmas per axis (e.g., do not smooth along the low-resolution Z axis).
- **Channel:** Which probability channel to threshold (typically channel 0 = foreground).
- **Threshold value(s):** The cut-off(s).
- **Size filter:** Minimum and maximum object size in pixels (2D) or voxels (3D). Removes small debris and very large artefacts.

### Tips

- Start with a threshold of 0.5 and adjust
- Use the "Final output" layer to see the resulting objects
- If objects are merging, try hysteresis thresholding or increase smoothing
- Size filters are very effective at removing false positives

---

## 14. Object Features

### The Object Feature Selection applet

Once objects are defined (via thresholding), ilastik computes features for each object. Available features include:

| Feature category | Examples | Good for |
|---|---|---|
| **Shape/Size** | Area, perimeter, principal axes, bounding box, convexity, elongation | Distinguishing large vs. small cells, round vs. elongated |
| **Intensity** | Mean, variance, min, max, kurtosis, skewness (of raw data within the object) | Distinguishing bright vs. dim cells |
| **Texture** | Intensity histogram features | Distinguishing homogeneous vs. heterogeneous objects |
| **Location** | Centroid coordinates, distance to image border | Spatial filtering |
| **Skeleton** | Branch count, total length, diameter (for filamentous objects) | Neurite or vessel analysis |
| **Spherical Harmonics** | 3D shape descriptors (1.4.1+, contributed by Aafke Gros) | Complex 3D shape classification |

### Selecting features

Click the checkboxes for the features you think will distinguish your object classes. If uncertain, select a broad set --- the Random Forest will determine which features are most informative.

---

## 15. Training the Object Classifier

### Labelling objects

In the Object Classification Training applet:

1. Select a label (e.g., "Class 1: healthy cell" or "Class 2: dead cell")
2. Click on individual objects to assign them to a class
3. Unlike Pixel Classification where you paint brush strokes, here you **click on whole objects**
4. Enable Live Update to see the classifier's predictions
5. Add more labelled objects to improve accuracy

### The uncertainty layer

As with Pixel Classification, the Uncertainty layer shows where the classifier is uncertain. Focus your additional labels on high-uncertainty objects.

### Exporting

Object Classification can export:

- **Object Predictions:** An image where each object's pixels hold the predicted class value
- **Object Probabilities:** Multi-channel image with class probabilities per object
- **CSV Feature Table:** A table of all computed features for each object (via `--table_filename` in headless mode, or via export settings)

---

## 16. Counting Without Segmentation

### The Density Counting workflow

When objects are so densely packed that segmentation fails (e.g., confluent cell monolayers, densely packed bacterial colonies), the Density Counting workflow estimates object counts **without segmenting individual objects**.

### How it works

1. You place **dot annotations** at the centre of each object in a few example regions
2. You paint **background brush strokes** to indicate non-object regions
3. ilastik learns a regression model that maps local image features to a **density function**
4. Integrating the density over any region yields an estimate of the number of objects in that region

### Key parameter: Sigma

The sigma parameter defines the scale of the Gaussian placed at each dot. It should roughly match the object size:

- **Sigma too small:** The density function has sharp peaks that don't generalise well
- **Sigma too large:** The density becomes overly smooth, reducing count accuracy; also significantly slows computation
- **Good sigma:** Approximately matches the radius of your objects

The crosshair cursor in the viewer changes size to match the current sigma, helping you choose.

### Counting in sub-regions

You can draw rectangular **boxes** on the image to monitor the count in specific regions. This is useful for checking count accuracy before running on the full image.

### Limitations

- Density counting provides **approximate** counts (real numbers, not integers)
- Estimates are more accurate when integrated over larger regions
- Debris or contaminants in the image can bias the density estimate
- For objects that are individually distinguishable, Object Classification is usually better

---

## 17. Tracking Workflows Overview

ilastik provides three tracking-related workflows, all based on **tracking by assignment**: objects are first detected (segmented) in each frame, then linked across frames.

| Workflow | Use case | Solver |
|---|---|---|
| **Automatic Tracking** | Multiple objects, potentially dividing, large datasets | Conservation tracking algorithm; optional CPLEX/Gurobi for optimal solutions |
| **Manual Tracking** | Ground-truth creation, small datasets, semi-automatic | User links objects manually; ilastik auto-extracts simple sub-tracks |
| **Animal Tracking** | Lab animals (flies, mice, larvae, zebrafish) in 2D+t or 3D+t | Adapted for whole-body tracking |

### Prerequisites

All tracking workflows require **pre-segmented objects**. You typically:

1. Run Pixel Classification first to segment objects in each frame
2. Export the probability maps
3. Use them as input for the tracking workflow

---

## 18. Automatic Tracking

### Steps

1. **Input Data:** Provide raw data and prediction maps (from Pixel Classification)
2. **Thresholding & Object Count Classification:** Convert predictions to objects; optionally train a classifier to detect merging objects (how many real objects are in each detected blob)
3. **Division Detection:** Optionally train a classifier to detect cell divisions
4. **Tracking:** ilastik solves a global optimisation problem to link objects across frames while handling divisions, mergers, appearance, and disappearance

### The Conservation Tracking algorithm

This algorithm models tracking as a global optimisation problem: minimise a cost function that penalises unlikely associations while respecting biological constraints (cells don't teleport, divisions have specific patterns, etc.).

### CPLEX / Gurobi (optional)

For optimal tracking results, ilastik can use commercial linear programming solvers (IBM CPLEX or Gurobi, both free for academic use). Without these solvers, ilastik uses a built-in approximate solver that works well for most cases.

### Exporting results

Tracking results can be exported in multiple formats:

- **CSV** --- tabular data with coordinates, track IDs, parent/child relationships
- **FIJI MaMuT** --- for visualisation/proofreading in FIJI's MaMuT plugin
- **Cell Tracking Challenge format** --- for benchmarking
- **HDF5** --- for programmatic downstream analysis

---

## 19. Manual and Semi-Automatic Tracking

### When to use manual tracking

- **Ground truth creation** for evaluating automatic tracking algorithms
- **Small datasets** where automatic tracking is overkill
- **High-quality tracking** for a few critical cells (e.g., specific lineages)

### How it works

1. Load time-lapse data and segmentation
2. For each frame, click on an object to start or continue a track
3. ilastik automatically links objects across "easy" frames (where the association is unambiguous)
4. You only need to intervene at ambiguities: divisions, mergers, tracks entering or leaving the field of view

---

## 20. Carving (Semi-Automatic 3D Segmentation)

### What Carving does

Carving is designed for extracting individual objects from 3D volumes where objects are separated by boundaries (e.g., electron microscopy of neural tissue). Unlike Pixel Classification, which classifies every pixel, Carving extracts **one object at a time** using interactive seeded watershed-style segmentation.

### How it works

1. Load a 3D volume
2. Paint **foreground seeds** (blue) inside the object you want to extract
3. Paint **background seeds** (magenta) outside the object
4. ilastik uses a graph-cut algorithm on a pre-computed boundary map to "carve out" the object
5. Refine by adding more seeds and repeating

### Best for

- Extracting individual neurons, organelles, or other structures from EM volumes
- Interactive segmentation of complex 3D objects
- Cases where you need to trace a single object through a volume

### Limitations

- Processes one object at a time (not suitable for segmenting many objects automatically)
- Requires good boundary information (membrane stains, EM contrast)
- Cannot run in headless mode
- Memory-intensive for very large volumes

---

## 21. Multicut (Boundary-Based Segmentation)

### What Multicut does

The Multicut workflow segments images based on **boundary information**. It works by:

1. Computing an **edge map** (from Pixel Classification or other boundary detection)
2. Generating **superpixels** (over-segmentation)
3. Building a **region adjacency graph** where superpixels are nodes and edges represent boundaries between them
4. Asking the user to label some edges as **true boundaries** (should be kept) or **false boundaries** (should be merged)
5. Solving a global optimisation problem (multicut / correlation clustering) to find the best consistent segmentation

### When to use Multicut

- **Electron microscopy** (EM) data with membrane staining
- Any data where objects are defined by their boundaries rather than their interior appearance
- When you need closed, non-overlapping segments

### Annotation

Unlike Pixel Classification (brush strokes on pixels), Multicut uses **edge labels**:

- **Green labels (false edges):** "These two superpixels should be merged into one object"
- **Red labels (true edges):** "These two superpixels should remain separate"

### Requirements

- Works best with CPLEX or Gurobi for optimal solutions
- Without commercial solvers, uses an approximate solver (available on all platforms)

---

## 22. Neural Network Classification (BioImage Model Zoo)

### What it is (1.4.0+)

The Neural Network Classification workflow lets you apply **pre-trained deep learning models** from the **BioImage Model Zoo** (https://bioimage.io) directly within ilastik --- without writing code, installing PyTorch, or training a model.

### How it works

1. Create a new Neural Network Classification project
2. Load your raw data
3. In the **NN Prediction** applet, click **Load Model**
4. Paste the **DOI** or **nickname** of a model from the BioImage Model Zoo, or load a downloaded `.zip` file
5. Click **Live Predict** to see the neural network's prediction
6. Export the results

### Finding models

Visit https://bioimage.io and search for models relevant to your task (e.g., "cell segmentation", "nuclei", "membrane"). Each model card shows example before/after images. Models compatible with ilastik are marked with an ilastik icon.

### Running on GPU or remote server

Unlike other ilastik workflows, Neural Network prediction can optionally run on:

- **Local CPU** (slow but always available)
- **Local GPU** (fast; requires the GPU-enabled ilastik build with CUDA)
- **Remote server** (for labs with a shared GPU server; configure in ilastik settings)
- **Apple Silicon GPU** (Metal Performance Shaders, 2D networks only, on macOS ARM builds)

### Limitations

- No **training** of neural networks within ilastik (only inference)
- Model must be in BioImage Model Zoo format
- 3D networks on Apple Silicon currently fall back to CPU

---

## 23. Trainable Domain Adaptation

### What it is (1.4.1+)

Trainable Domain Adaptation (TDA) combines the strengths of pre-trained **neural networks** and ilastik's interactive **Pixel Classification**:

1. A pre-trained neural network from the BioImage Model Zoo provides initial predictions
2. You draw brush strokes to correct errors, just as in Pixel Classification
3. ilastik trains a Random Forest that uses **both the original image features and the neural network predictions** as input features

### When to use TDA

- When a pre-trained neural network works "almost but not quite" on your data
- When your data differs enough from the network's training data that predictions have systematic errors
- When you want the accuracy of deep learning with the adaptability of interactive machine learning

### Practical advantage

Microscopy data varies enormously between labs (different microscopes, staining protocols, tissue types). A neural network trained on one lab's data may not generalise perfectly to yours. TDA lets you bridge the gap with just a few brush strokes, without retraining the neural network.

---

## 24. Batch Processing Within the GUI

### The Batch Processing applet

Once your classifier is trained and you're happy with the results on your training images, you can apply it to many additional images:

1. Navigate to the **Batch Processing** applet
2. Click **Select Raw Data Files** and add all images to process
3. Configure export settings (these inherit from the Prediction Export applet)
4. Click **Process all data files**

ilastik processes one image at a time, applying the same trained classifier to each.

### Tips

- Ensure batch images are similar to your training images (same microscope, same staining, similar intensities)
- Use the filename placeholders in export settings (e.g., `{nickname}_Probabilities`) to automatically name output files
- For Object Classification, you must also provide the corresponding prediction maps or segmentation images for each raw data file

---

## 25. Headless Mode (Command-Line Processing)

### Why use headless mode?

- **Automation:** Integrate ilastik into scripts and pipelines
- **HPC clusters:** Run on servers without a display
- **Reproducibility:** Script-based processing ensures identical parameters for every image

### Basic headless command

```bash
# Linux
./run_ilastik.sh --headless \
    --project=MyPixelClassification.ilp \
    --output_format="tiff" \
    --output_filename_format="{dataset_dir}/{nickname}_Probabilities.tiff" \
    --export_source="Probabilities" \
    path/to/input_image1.tif \
    path/to/input_image2.tif

# macOS
/Applications/ilastik-1.4.1.app/Contents/ilastik-release/run_ilastik.sh --headless \
    --project=MyPixelClassification.ilp \
    path/to/input_image.tif

# Windows
ilastik.exe --headless ^
    --project=MyPixelClassification.ilp ^
    --output_format="tiff" ^
    path\to\input_image.tif
```

### Key command-line options

| Option | Description |
|---|---|
| `--headless` | Required. Run without the GUI. |
| `--project=<file.ilp>` | The trained ilastik project file. |
| `--output_format=<fmt>` | Output format: `tiff`, `hdf5`, `png`, `tiff sequence`, etc. |
| `--output_filename_format=<pattern>` | Output filename with placeholders: `{nickname}`, `{dataset_dir}`, `{result_type}` |
| `--export_source=<source>` | What to export: `Probabilities`, `Simple Segmentation`, etc. |
| `--raw_data` | Prefix for raw data files (Object Classification). |
| `--prediction_maps` | Prefix for prediction map files (Object Classification). |
| `--readonly` | Open project in read-only mode (safe for concurrent access). |
| `--logfile=<file>` | Write log output to a file. |

### Important notes

- ilastik command-line options use **underscores**, not dashes (e.g., `--output_format`, not `--output-format`)
- The classifier must be fully trained in the GUI before using headless mode
- All workflows except Carving support headless mode

---

## 26. Distributed Processing on HPC Clusters

For very large datasets, ilastik can distribute the workload across multiple nodes using MPI:

```bash
mpiexec -n 16 ./run_ilastik.sh --headless \
    --distributed \
    --project=MyPixelClassification.ilp \
    --output_format=n5 \
    path/to/large_dataset.h5
```

### Requirements

- `mpiexec` or SLURM with MPI
- `mpi4py` (install via pip, NOT conda, on HPC to use the cluster's MPI)
- Only N5 output format is supported in distributed mode
- Only Pixel Classification is supported in distributed mode

---

## 27. ilastik and FIJI/ImageJ

### The ilastik FIJI plugin (v2.0)

Install: FIJI → Help → Update → Manage Update Sites → check **"ilastik"** → Apply changes → Restart.

The plugin provides:

| Function | Description |
|---|---|
| **Import HDF5** | Import ilastik-format HDF5 files into FIJI |
| **Export HDF5** | Convert any FIJI-readable format to HDF5 for ilastik |
| **Run Pixel Classification** | Apply a trained `.ilp` project to the current image from within FIJI |
| **Run Autocontext** | Apply a trained Autocontext project |
| **Run Object Classification** | Apply a trained Object Classification project |
| **Run Multicut** | Apply a trained Multicut project |
| **Run Tracking** | Apply a trained Tracking project |

### Typical FIJI → ilastik → FIJI workflow

1. **In FIJI:** Open your image → Plugins → ilastik → Export HDF5 (creates `.h5` file)
2. **In ilastik:** Load the `.h5`, train your classifier, save the project (`.ilp`)
3. **In FIJI:** Open a new image → Plugins → ilastik → Run Pixel Classification Prediction → select the `.ilp` file → the probability map opens directly in FIJI
4. **In FIJI:** Threshold the probability map → Analyze Particles or further processing

### Setting the ilastik executable path

The first time you use the FIJI plugin, go to Plugins → ilastik → Configure ilastik executable location and point it to your ilastik installation.

---

## 28. ilastik and Python (Scripting Pipelines)

### Calling ilastik from Python via subprocess

The most common way to use ilastik in a Python pipeline:

```python
import subprocess
import os

ilastik_exe = "/path/to/run_ilastik.sh"  # or ilastik.exe on Windows
project = "trained_classifier.ilp"

# Process a batch of images
image_dir = "raw_images/"
images = [os.path.join(image_dir, f) for f in os.listdir(image_dir) if f.endswith(".tif")]

for img in images:
    cmd = [
        ilastik_exe,
        "--headless",
        f"--project={project}",
        "--output_format=tiff",
        f"--output_filename_format={{dataset_dir}}/{{nickname}}_Probabilities.tiff",
        "--export_source=Probabilities",
        img,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error processing {img}: {result.stderr}")
    else:
        print(f"Processed: {img}")
```

### Reading ilastik HDF5 output in Python

```python
import h5py
import numpy as np

with h5py.File("result_Probabilities.h5", "r") as f:
    print(list(f.keys()))  # typically ['exported_data']
    probs = f["exported_data"][:]
    print(f"Shape: {probs.shape}")  # e.g., (Z, Y, X, C) where C = number of classes

# Threshold the foreground channel
foreground = probs[..., 0]  # channel 0 = foreground probability
binary = foreground > 0.5
```

### Using ilastik probability maps with scikit-image

```python
import tifffile
from skimage.measure import label, regionprops_table
import pandas as pd

# Read ilastik probability map
probs = tifffile.imread("image_Probabilities.tiff")

# Threshold
binary = probs[..., 0] > 0.5  # foreground channel

# Label connected components
labels = label(binary)

# Measure
raw = tifffile.imread("image.tif")
props = regionprops_table(labels, raw,
    properties=["label", "area", "mean_intensity", "centroid"])
df = pd.DataFrame(props)
df.to_csv("measurements.csv", index=False)
```

---

## 29. ilastik and CellProfiler

ilastik and CellProfiler work very well together. A common pipeline:

1. **ilastik:** Train a Pixel Classification project → export probability maps
2. **CellProfiler:** Load raw images and probability maps → use `IdentifyPrimaryObjects` on the probability map → measure objects on the raw image

### In CellProfiler

- Use the **ClassifyPixels** module (which calls ilastik internally) or load pre-computed probability maps
- The probability map acts as a "pre-processed" image that is much easier to segment with CellProfiler's thresholding algorithms
- This combination is particularly powerful for complex images where CellProfiler's built-in thresholding alone is insufficient

---

## 30. Workflow 1: Fluorescent Cell Segmentation

### Scenario

You have fluorescence microscopy images of cells (e.g., DAPI-stained nuclei) and want to segment them to measure intensity, area, and shape.

### Step-by-step

1. **Launch ilastik** → New Project → **Pixel Classification**
2. **Input Data:** Load your images (TIFF or HDF5)
3. **Feature Selection:** Select Gaussian Smoothing (σ = 1.0, 3.5) and Laplacian of Gaussian (σ = 1.0, 3.5). For nuclei on dark background, these are usually sufficient.
4. **Training:**
   - Select Label 1 (foreground/cells): paint brush strokes **on cells** — mark a few bright nuclei
   - Select Label 2 (background): paint brush strokes **on background** — mark dark regions between cells
   - Enable **Live Update**
   - Check the prediction: are nuclei correctly identified?
   - Add labels where the prediction is wrong (dim cells, cell edges, bright debris)
5. **Prediction Export:**
   - Source: **Probabilities**
   - Format: TIFF
   - Export
6. **Downstream (in Python or FIJI):** Threshold the probability map → label connected components → measure with regionprops

### Tips for fluorescent cells

- If cells vary in brightness, make sure to label both bright and dim cells as foreground
- Label debris and autofluorescence as background
- A third class ("cell border") can help separate touching cells

---

## 31. Workflow 2: Classifying Cell Types by Morphology

### Scenario

You have a mixed population of cells (e.g., round healthy cells and elongated stressed cells) and want to classify each cell into a type.

### Step-by-step

1. **Step 1: Pixel Classification** → train a foreground/background classifier → export probability maps
2. **Step 2: Object Classification** (new project) → Raw Data + Pixel Prediction Map workflow
3. **Thresholding:** Threshold the probability map to get individual objects
4. **Object Features:** Select shape features (area, elongation, eccentricity) and intensity features (mean, variance)
5. **Training:**
   - Click on a round healthy cell → assign to "Class 1: Healthy"
   - Click on an elongated stressed cell → assign to "Class 2: Stressed"
   - Enable Live Update
   - Label more objects until the classifier performs well
6. **Export:** Object Predictions image or CSV feature table

---

## 32. Workflow 3: Counting Cells in Crowded Images

### Scenario

You have images with densely packed cells (e.g., a confluent monolayer) where segmentation is unreliable due to overlapping cells.

### Step-by-step

1. **Launch ilastik** → New Project → **Density Counting**
2. **Input Data:** Load your images
3. **Feature Selection:** Select features at multiple scales; include Laplacian of Gaussian which responds to blob-like structures. Choose sigma values that approximately match your object size.
4. **Annotations:**
   - Place **dots** at the centre of each cell in a representative region (don't need to mark every cell in the image --- just several dozen in a few regions)
   - Paint **background** brush strokes on empty areas
   - Set the **Sigma** parameter to roughly match the cell radius
5. **Enable Live Update** → check the density map
6. **Draw counting boxes** (rectangles) to verify the count in specific regions
7. **Export** the density map → integrate in Python/MATLAB to get total count

### Integration in Python

```python
import tifffile
import numpy as np

density = tifffile.imread("image_Density.tiff")
total_count = density.sum()
print(f"Estimated cell count: {total_count:.0f}")
```

---

## 33. Workflow 4: Tracking Dividing Cells

### Scenario

You have a time-lapse of dividing cells (e.g., mitotic cells under live imaging) and want to track lineages.

### Step-by-step

1. **Step 1: Pixel Classification** on a representative frame → train foreground/background → export probability maps for **all time points** (batch processing)
2. **Step 2: Automatic Tracking** (new project)
3. **Input Data:** Provide raw data and prediction maps
4. **Thresholding:** Set threshold and size filter to get clean objects per frame
5. **Object Count Classification:** If cells occasionally merge in the segmentation, train a classifier to detect "merged objects" (objects containing 2 or 3 real cells). This helps the tracker resolve mergers.
6. **Division Detection:** Train a classifier to identify dividing cells (label a few dividing and non-dividing objects)
7. **Tracking:** Set parameters:
   - Maximum distance an object can move between frames
   - Whether divisions are expected
   - Cost of appearance/disappearance
8. **Run tracking** → view results as coloured tracks overlaid on the data
9. **Export** as CSV or Cell Tracking Challenge format

---

## 34. Performance Tips

### Data format

- **Convert TIFF to HDF5** for much faster loading and processing. Use "Copied to Project File" storage or the FIJI export plugin.
- HDF5 enables blockwise access, so ilastik only reads the data it needs.

### Feature selection

- **Fewer features = faster.** Start with the minimum set and add only if needed.
- **Fewer scales = faster.** Large sigma values (5.0, 10.0) on 3D data are especially expensive.
- Use **Suggest Features** to identify the minimal effective feature set.

### Memory management

- ilastik manages memory lazily by default, but very large datasets can still exhaust RAM.
- Close other applications when working with large 3D datasets.
- Reduce the number of undo steps in Preferences to free memory.
- For Autocontext on 3D data, ensure 32+ GB RAM.

### Resource control

You can limit ilastik's CPU and RAM usage:

```bash
# Via environment variables
LAZYFLOW_TOTAL_RAM_MB=16000 LAZYFLOW_THREADS=4 ./run_ilastik.sh

# Or in a config file: ~/.ilastikrc
[lazyflow]
total_ram_mb=16000
threads=4
```

### Live Update

- Turn off Live Update when you're just drawing labels. Turn it back on to check predictions. This avoids recomputing the prediction after every brush stroke.
- On large datasets, the initial Live Update computation may take several seconds. Be patient.

### General

- Work on a **representative crop** first: train the classifier on a small region, export the project, then use batch processing on the full data.
- Don't over-label. Start with very sparse annotations and add more only where the classifier fails.

---

## 35. Common Problems and Solutions

### ilastik is very slow

**Cause:** Large dataset loaded as TIFF; too many features selected.
**Fix:** Convert to HDF5 (Section 4). Reduce feature selection to fewer features and scales. Close other applications.

### Prediction is wrong despite many labels

**Causes and fixes:**
- **Wrong features:** Go back to Feature Selection and try different features or scales. Use Suggest Features.
- **Labels are inconsistent:** Check that you haven't accidentally labelled foreground as background somewhere.
- **The problem needs Autocontext:** If single-stage classification can't resolve ambiguities, try the Autocontext workflow.
- **The problem needs deep learning:** If Random Forest features can't distinguish your classes, try the Neural Network workflow.

### "Axis tags" warning when loading data

**Cause:** ilastik can't determine which dimension is which.
**Fix:** Double-click the dataset in the Input Data applet and manually assign axis tags (X, Y, Z, T, C).

### Objects merging in Object Classification

**Cause:** Threshold too low, or probability map is not sharp enough at cell boundaries.
**Fix:** Try hysteresis thresholding. Add a "boundary" class in Pixel Classification. Increase smoothing sigma. Use Autocontext for sharper probability maps.

### ilastik crashes when loading very large data

**Cause:** Insufficient RAM.
**Fix:** Use "Copied to Project File" storage (converts to HDF5). Work on a smaller crop first. Increase RAM allocation via `LAZYFLOW_TOTAL_RAM_MB`. Consider distributed processing for very large volumes.

### "Run_ilastik.sh: Permission denied" (Linux)

**Fix:** `chmod +x run_ilastik.sh`

### Headless mode fails with "Could not find one or more input files"

**Cause:** ilastik is misinterpreting command-line arguments as filenames.
**Fix:** Ensure there are no spaces in file paths. Use quotes around paths with spaces. Use underscores in option names (e.g., `--output_format`, not `--output-format`).

### FIJI plugin can't find ilastik

**Fix:** In FIJI, go to Plugins → ilastik → Configure ilastik executable location and set the path to the ilastik executable (e.g., `/Applications/ilastik-1.4.1.app/Contents/MacOS/ilastik` on macOS, or `C:\Program Files\ilastik-1.4.1\ilastik.exe` on Windows).

---

## 36. ilastik vs. Other Segmentation Tools

| Consideration | ilastik | FIJI/ImageJ | CellProfiler | Napari | Cellpose/StarDist |
|---|---|---|---|---|---|
| **Approach** | Interactive ML (Random Forest) + Neural Networks | Classical filters, thresholds, macros | Pipeline-based batch processing | Viewer + Python API | Deep learning |
| **Programming** | None required | Macro or Java plugins | None (GUI pipelines) | Python required | Python or GUI |
| **Training** | Interactive brush strokes | N/A | N/A | N/A | Pre-trained or custom training |
| **Live preview** | Yes | Limited (preview filters) | No (run pipeline) | Real-time (viewer) | No |
| **Multi-dimensional** | Up to 5D (3D, T, C) | Possible but limited | 2D primarily | Native nD | 2D and 3D |
| **Batch processing** | Yes (GUI + headless) | Yes (macro) | Yes (core strength) | Yes (Python scripts) | Yes (Python) |
| **Object classification** | Built-in workflow | Limited (manual) | Extensive measurements | Via scikit-image | No |
| **Tracking** | Built-in workflows | TrackMate plugin | Separate module | Via tracks layers | No |
| **Counting** | Density counting (no segmentation) | Manual or thresholding | Count objects | Manual (points layer) | Via segmentation |
| **Best for** | Complex segmentation where thresholding fails | Quick operations, established plugins | High-throughput measurement pipelines | Interactive Python-based analysis | Cell/nucleus segmentation |
| **Learning curve** | Low (draw and predict) | Medium | Medium | Higher (Python) | Low (pre-trained models) |
| **Cost** | Free | Free | Free | Free | Free |

### When to use ilastik

- When classical thresholding (FIJI's Otsu, etc.) fails because objects and background have overlapping intensities or textures
- When you need to segment challenging images but don't want to train a deep learning model
- When you have multi-class segmentation needs (e.g., cells + membranes + background + debris)
- When you need object classification beyond just segmentation
- When you need to count objects in very crowded images
- When you need cell tracking with division detection

### When to use something else

- **FIJI:** For quick measurements, established plugins (thunderSTORM, TrackMate), or when classical thresholding works
- **CellProfiler:** For high-throughput measurement pipelines on large image collections
- **Cellpose/StarDist:** When you need the best possible cell segmentation accuracy, especially for touching cells
- **Napari:** When you need interactive Python-based analysis and visualisation
- **Use ilastik WITH other tools:** ilastik's probability maps feed beautifully into FIJI, CellProfiler, or Python downstream analysis

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using ilastik for interactive machine-learning-based image analysis. ilastik excels when classical thresholding fails and deep learning expertise is not available --- it puts powerful classification algorithms at your fingertips through simple brush strokes.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*ilastik is free software released under the GPL v2 licence.*

*For community support, post on the image.sc forum with the "ilastik" tag: https://forum.image.sc/tag/ilastik*
