# CARE / CSBDeep Manual for Biology Researchers

**A Comprehensive Guide to Content-Aware Image Restoration for Fluorescence Microscopy**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is CARE?](#1-introduction-what-is-care)
2. [Installation](#2-installation)
3. [How CARE Works: The Deep Learning Framework](#3-how-care-works-the-deep-learning-framework)

**Part II: Training Data**

4. [Acquiring Training Data Pairs](#4-acquiring-training-data-pairs)
5. [Generating Training Patches with CSBDeep](#5-generating-training-patches-with-csbdeep)
6. [Data Requirements and Best Practices](#6-data-requirements-and-best-practices)

**Part III: Training and Prediction**

7. [Training a CARE Model](#7-training-a-care-model)
8. [Applying a Trained Model (Prediction)](#8-applying-a-trained-model-prediction)
9. [Model Evaluation and Reliability](#9-model-evaluation-and-reliability)

**Part IV: CARE Applications**

10. [Denoising (Low SNR → High SNR)](#10-denoising-low-snr--high-snr)
11. [Isotropic Restoration (Axial Resolution Recovery)](#11-isotropic-restoration-axial-resolution-recovery)
12. [Surface Projection and Denoising](#12-surface-projection-and-denoising)
13. [Upsampling CARE](#13-upsampling-care)

**Part V: Alternative Frontends**

14. [FIJI Plugin](#14-fiji-plugin)
15. [Noise2Void: Self-Supervised Denoising](#15-noise2void-self-supervised-denoising)
16. [CAREamics: The PyTorch Successor](#16-careamics-the-pytorch-successor)

**Part VI: Application to PIEZO1 Research**

17. [Denoising PIEZO1 Light-Sheet Data](#17-denoising-piezo1-light-sheet-data)
18. [Denoising TIRF Movies for Single-Molecule Detection](#18-denoising-tirf-movies-for-single-molecule-detection)
19. [Complete Workflow: Train and Apply a CARE Model](#19-complete-workflow-train-and-apply-a-care-model)
20. [Common Problems and Solutions](#20-common-problems-and-solutions)

---

## 1. Introduction: What is CARE?

### Overview

**CARE** (Content-Aware image REstoration) is a deep learning framework for restoring fluorescence microscopy images. Developed by Martin Weigert, Florian Jug, Eugene Myers, and colleagues at the Max Planck Institute of Molecular Cell Biology and Genetics (MPI-CBG), CARE uses convolutional neural networks trained on matched pairs of degraded and high-quality images to learn a restoration function specific to your experimental setup.

**CSBDeep** is the open-source Python package that implements CARE, built on Keras and TensorFlow.

### What CARE can do

- **Denoising:** Restore images acquired with 60-fold fewer photons (low laser power / short exposure) to near-ground-truth quality
- **Isotropic resolution recovery:** Recover near-isotropic resolution from anisotropic 3D stacks (up to 10× undersampling in Z)
- **Super-resolution enhancement:** Resolve sub-diffraction structures at higher frame rates
- **Composite tasks:** Joint surface projection and denoising in a single network
- **Reliability estimation:** Pixel-wise confidence intervals and ensemble disagreement measures

### Why CARE for PIEZO1 research?

In Bertaccini et al. (2025), CARE was used for denoising light-sheet microscopy data of PIEZO1-HaloTag-labelled organoids. Light-sheet microscopy of thick samples (organoids, 3D tissue) inherently suffers from scattering and reduced SNR at depth. CARE enables:
- Imaging with lower laser power to reduce phototoxicity and photobleaching of JF646/JF549
- Faster acquisition (shorter exposure) for capturing dynamic PIEZO1 redistribution
- Improved SNR for downstream analysis (ThunderSTORM localization, tracking)

### Citation

Weigert, M., Schmidt, U., Boothe, T., Müller, A., Dibrov, A., Jain, A., Wilhelm, B., Schmidt, D., Broaddus, C., Culley, S., Rocha-Martins, M., Segovia-Miranda, F., Norden, C., Henriques, R., Zerial, M., Solimena, M., Rink, J., Tomancak, P., Royer, L., Jug, F. & Myers, E.W. (2018). Content-aware image restoration: pushing the limits of fluorescence microscopy. *Nature Methods*, 15(12), 1090--1097.

### Repository

- CSBDeep Python package: https://github.com/CSBDeep/CSBDeep
- Documentation: https://csbdeep.bioimagecomputing.com
- FIJI plugin: available through the FIJI update site

---

## 2. Installation

### Python package (recommended)

#### Step 1: Create a conda environment

```bash
conda create -n care python=3.9
conda activate care
```

#### Step 2: Install TensorFlow with GPU support

For Linux/Windows with NVIDIA GPU (strongly recommended --- 30--60× faster than CPU):

```bash
conda install -c conda-forge cudatoolkit=11.8 cudnn=8.6
pip install tensorflow==2.13.*
```

For CPU only (much slower, suitable for prediction only):

```bash
pip install tensorflow
```

#### Step 3: Install CSBDeep

```bash
pip install csbdeep
```

#### Step 4: Install Jupyter for tutorials

```bash
pip install jupyter
```

#### Verify installation

```python
import csbdeep
print(csbdeep.__version__)  # e.g., 0.8.1

from csbdeep.utils.tf import limit_gpu_memory
limit_gpu_memory(fraction=0.8)  # Limit GPU memory to 80%
```

### Docker alternative

CSBDeep provides a Docker container with TensorFlow and all dependencies pre-configured:

```bash
docker pull csbdeep/csbdeep
```

### FIJI plugin

For users who prefer a GUI, the CSBDeep FIJI plugin can apply pre-trained models without Python:
1. In FIJI: **Help → Update → Manage Update Sites**
2. Enable "CSBDeep"
3. Restart FIJI
4. Trained models exported from Python can be loaded via **Plugins → CSBDeep**

---

## 3. How CARE Works: The Deep Learning Framework

### Architecture

CARE uses a **U-Net** convolutional neural network --- a widely used encoder-decoder architecture with skip connections. The network takes a degraded image as input and outputs a restored image.

### Training paradigm

CARE is a **supervised** learning approach:
1. Acquire **matched pairs** of images: a degraded source image (low SNR, undersampled, etc.) and a high-quality target image (ground truth)
2. Extract **training patches** from the image pairs
3. Train the U-Net to predict the target from the source
4. Apply the trained network to **new** degraded images from the same experimental setup

### Key parameters (defaults)

| Parameter | Default | Description |
|---|---|---|
| `unet_n_depth` | 2 | Depth of the U-Net (number of downsampling steps) |
| `unet_kern_size` | 5 (2D) or 3 (3D) | Convolution kernel size |
| `unet_n_first` | 32 | Number of filters in the first layer |
| `train_loss` | `'laplace'` (probabilistic) or `'mae'` | Training loss function |
| `train_epochs` | 100 | Number of training epochs |
| `train_steps_per_epoch` | 400 | Parameter updates per epoch |
| `train_learning_rate` | 0.0004 | Learning rate |
| `train_batch_size` | 16 | Batch size |
| `probabilistic` | False | If True, predict mean + variance (Laplace distribution) |

### Probabilistic CARE

When `probabilistic=True`, the network predicts a **Laplace distribution** for each pixel (mean µ and scale σ). This provides pixel-wise confidence intervals --- wider intervals indicate less certain restorations.

---

## 4. Acquiring Training Data Pairs

### The fundamental requirement

CARE requires **matched pairs** of source (degraded) and target (high-quality) images of the **same** biological structure. The pairs must be well-aligned.

### Strategy 1: Matched acquisition (recommended)

Acquire the same field of view at two different conditions:
- **Low SNR (source):** Short exposure / low laser power (e.g., 2 ms, 0.5% laser)
- **High SNR (target):** Long exposure / high laser power (e.g., 200 ms, 10% laser)

Acquire source first, then target (to avoid photobleaching the target before acquiring the source).

### Strategy 2: Averaging

- Acquire many frames at low SNR
- Average N frames for the target, use individual frames as source
- Works well when the sample is static during averaging

### Strategy 3: Axial undersampling (for isotropic restoration)

- **Source:** Z-stack with large Z step (e.g., 5 µm)
- **Target:** Z-stack with fine Z step (e.g., 0.5 µm) --- then subsample to match source Z positions

### Strategy 4: Synthetic data

If matched pairs are impossible to acquire:
- Take high-quality images
- Add synthetic noise (Poisson + Gaussian) to create degraded versions
- Less ideal than experimentally acquired pairs, but can work

### How many training pairs?

Typically 5--20 image pairs (or z-stacks) are sufficient, yielding thousands of training patches. More diverse training data (different cells, different fields of view) produces more generalisable models.

---

## 5. Generating Training Patches with CSBDeep

### Organising data

Arrange your data into source and target directories:

```
training_data/
├── source/         # Low-SNR images
│   ├── image001.tif
│   ├── image002.tif
│   └── ...
└── GT/             # Ground truth (high-SNR)
    ├── image001.tif
    ├── image002.tif
    └── ...
```

File names must match between source and GT directories.

### Creating a RawData object

```python
from csbdeep.data import RawData

raw_data = RawData.from_folder(
    basepath='training_data',
    source_dirs=['source'],
    target_dir='GT',
    axes='YX'          # 'YX' for 2D, 'ZYX' for 3D, 'CYX' for multi-channel
)
print(f"Found {raw_data.size} image pairs")
```

### Extracting training patches

```python
from csbdeep.data import create_patches

X, Y, XY_axes = create_patches(
    raw_data=raw_data,
    patch_size=(128, 128),   # Power of 2 recommended; (64,64,64) for 3D
    n_patches_per_image=256,
    save_file='training_data/my_training_data.npz'
)
print(f"Training data shape: X={X.shape}, Y={Y.shape}")
```

### Axes conventions

CSBDeep uses string axes labels:
- `'YX'` --- 2D image
- `'ZYX'` --- 3D volume
- `'CYX'` --- 2D with channels
- `'CZYX'` --- 3D with channels
- `'TCZYX'` --- time series with channels and Z

Always set axes correctly to match your data layout.

---

## 6. Data Requirements and Best Practices

### Quality of training data

- Source and target images must be **well-aligned** (registration may be needed)
- Target images should be the highest quality achievable with your setup
- Do NOT pre-process (deconvolve, filter) the raw data before training --- let CARE learn the raw-to-clean mapping
- Training data should be **representative** of all images you will apply the model to

### Patch size

- Use powers of 2 (64, 128, 256) for computational efficiency
- Larger patches capture more context but require more GPU memory
- For 3D: (64, 64, 64) or (32, 128, 128) depending on anisotropy

### Normalisation

CSBDeep normalises patches using percentile-based scaling (default: 1st and 99.8th percentiles). This is handled automatically by `create_patches()`.

---

## 7. Training a CARE Model

### Configuration

```python
from csbdeep.models import Config, CARE

config = Config(
    axes='YX',
    n_channel_in=1,
    n_channel_out=1,
    unet_n_depth=2,
    train_epochs=100,
    train_steps_per_epoch=400,
    train_batch_size=16,
    train_learning_rate=0.0004,
    probabilistic=False       # Set True for confidence intervals
)
print(config)
assert config.is_valid()
```

### Training

```python
import numpy as np

# Load training data
(X, Y), _, axes = np.load('training_data/my_training_data.npz', allow_pickle=True).values()

# Split into training and validation
from csbdeep.utils import axes_dict
n_val = max(1, int(0.1 * len(X)))  # 10% for validation
X_train, Y_train = X[:-n_val], Y[:-n_val]
X_val, Y_val = X[-n_val:], Y[-n_val:]

# Create and train model
model = CARE(config, name='my_denoising_model', basedir='models')
history = model.train(X_train, Y_train, validation_data=(X_val, Y_val))
```

### Monitoring with TensorBoard

Training progress is logged to TensorBoard by default:

```bash
tensorboard --logdir=models
```

Monitor: training/validation loss, learning rate, example predictions.

### Training time

| Data | GPU (NVIDIA) | CPU (40 cores) |
|---|---|---|
| 2D, 100 epochs | 10--30 min | 5--15 hours |
| 3D, 100 epochs | 30--120 min | 15--60 hours |

---

## 8. Applying a Trained Model (Prediction)

### From Python

```python
from csbdeep.models import CARE
from csbdeep.io import load_training_data
from tifffile import imread, imwrite

# Load trained model
model = CARE(config=None, name='my_denoising_model', basedir='models')

# Load a new image to restore
img = imread('new_low_snr_image.tif')

# Predict (restore)
restored = model.predict(img, axes='YX')

# For large images, use tiling to avoid GPU memory issues
restored = model.predict(img, axes='YX', n_tiles=(2, 2))

# Save result
imwrite('restored_image.tif', restored)
```

### Probabilistic prediction

If the model was trained with `probabilistic=True`:

```python
# Returns mean and scale (uncertainty)
restored_mean, restored_scale = model.predict_probabilistic(img, axes='YX')
```

### Batch prediction

```python
import glob
from tifffile import imread, imwrite
from csbdeep.models import CARE

model = CARE(config=None, name='my_denoising_model', basedir='models')

for filepath in sorted(glob.glob('raw_images/*.tif')):
    img = imread(filepath)
    restored = model.predict(img, axes='YX', n_tiles=(2, 2))
    outpath = filepath.replace('raw_images', 'restored_images')
    imwrite(outpath, restored)
    print(f"Restored: {filepath}")
```

---

## 9. Model Evaluation and Reliability

### Quantitative evaluation

If ground truth is available for test images:

```python
from csbdeep.utils import plot_some
import numpy as np

# Compute PSNR, SSIM
from skimage.metrics import peak_signal_noise_ratio, structural_similarity

psnr = peak_signal_noise_ratio(ground_truth, restored)
ssim = structural_similarity(ground_truth, restored)
print(f"PSNR: {psnr:.1f} dB, SSIM: {ssim:.4f}")
```

### Ensemble reliability

Train multiple independent CARE networks (e.g., 4) and combine them:
- **Ensemble mean:** Average of all predictions (usually better than individual)
- **Ensemble disagreement D ∈ [0, 1]:** Where predictions differ most, the restoration is least reliable. Regions of high disagreement should be interpreted with caution.

### What CARE cannot do

- CARE cannot invent structures that are not present in the data --- it enhances existing signal
- If the source SNR is extremely low (essentially pure noise), CARE may produce hallucinated structures
- Models are specific to the imaging setup they were trained on --- a model trained on confocal data will not work on light-sheet data
- Always validate CARE outputs against known biology

---

## 10. Denoising (Low SNR → High SNR)

### The most common CARE application

Acquire matched image pairs at low and high SNR. Train a CARE network to map low-SNR → high-SNR. Apply to all subsequent low-SNR acquisitions.

### Benefits for live imaging

- Reduce laser power by 10--60× while maintaining image quality
- Reduce phototoxicity and photobleaching
- Enable longer time-lapse experiments
- Enable faster frame rates (shorter exposure)

---

## 11. Isotropic Restoration (Axial Resolution Recovery)

### The problem

Most microscopes have worse axial (Z) resolution than lateral (XY). A typical confocal might have 250 nm XY but 700 nm Z resolution.

### The CARE solution (IsotropicCARE)

```python
from csbdeep.models import IsotropicCARE

# Train on matched isotropic/anisotropic pairs
model = IsotropicCARE(config, name='isotropic_model', basedir='models')
model.train(X_train, Y_train, validation_data=(X_val, Y_val))

# Predict
restored = model.predict(anisotropic_stack, axes='ZYX')
```

The restored volume has improved axial resolution, enabling more accurate 3D measurements of PIEZO1 puncta z-positions.

---

## 12. Surface Projection and Denoising

### ProjectionCARE

For samples that are thin layers embedded in 3D (e.g., epithelial sheets, developing wing discs), CARE can jointly project the relevant surface and denoise it:

```python
from csbdeep.models import ProjectionCARE

model = ProjectionCARE(config, name='projection_model', basedir='models')
```

Input: 3D volume. Output: clean 2D projection of the structure of interest.

---

## 13. Upsampling CARE

### UpsamplingCARE

For images acquired with pixel-level undersampling (e.g., binned or subsampled):

```python
from csbdeep.models import UpsamplingCARE

model = UpsamplingCARE(config, name='upsampling_model', basedir='models')
```

---

## 14. FIJI Plugin

### Using pre-trained models in FIJI

1. In Python, export your trained model: `model.export_TF()`
2. This creates a ZIP file compatible with the FIJI plugin
3. In FIJI: **Plugins → CSBDeep → Run your network**
4. Select the exported model ZIP and the input image
5. The plugin tiles the image and runs prediction

### Important note on TensorFlow versions

Models exported from TensorFlow 2.x may not load correctly in the FIJI plugin (which uses TensorFlow 1.x internally). If you encounter issues, export from a Python environment with TensorFlow 1.x.

---

## 15. Noise2Void: Self-Supervised Denoising

### When you cannot acquire matched pairs

**Noise2Void (N2V)** is a self-supervised denoising method built on CSBDeep that requires **no clean target images**. It trains on the noisy data itself.

```bash
pip install n2v
```

```python
from n2v.models import N2VConfig, N2V
from n2v.internals.N2V_DataGenerator import N2V_DataGenerator

datagen = N2V_DataGenerator()
patches = datagen.generate_patches_from_list(imgs, shape=(64, 64))

config = N2VConfig(
    X=patches[:, :, :, np.newaxis],
    unet_kern_size=3,
    train_steps_per_epoch=200,
    train_epochs=100,
    train_loss='mse',
    batch_norm=True,
    train_batch_size=128,
    n2v_perc_pix=0.198,
    n2v_patch_shape=(64, 64),
    n2v_manipulator='uniform_withCP'
)

model = N2V(config, 'n2v_model', basedir='models')
model.train(patches[:, :, :, np.newaxis], patches[:, :, :, np.newaxis])
```

### Trade-off

N2V is more convenient (no paired data needed) but produces lower quality restorations than CARE with matched training pairs. For best results, acquire matched pairs when possible.

### CAREamics (successor)

The N2V team is transitioning to **CAREamics**, a PyTorch-based library supporting N2V, N2V2, structN2V, and other algorithms with a napari plugin: https://github.com/CAREamics/careamics

---

## 16. CAREamics: The PyTorch Successor

The CSBDeep/N2V ecosystem is gradually transitioning from TensorFlow to **CAREamics** (PyTorch). CAREamics provides:
- Modern PyTorch backend
- Multiple algorithms (CARE, N2V, N2V2, structN2V)
- napari plugin for interactive use
- Better maintained with current deep learning frameworks

For new projects, consider whether CAREamics meets your needs. For production use with existing pipelines, CSBDeep remains well-tested and stable.

---

## 17. Denoising PIEZO1 Light-Sheet Data

### Context

Adaptive optics lattice light-sheet microscopy (AO-LLSM) of PIEZO1-HaloTag-labelled organoids produces 3D time series with reduced SNR at depth due to scattering. CARE denoising can significantly improve image quality without additional phototoxicity.

### Training data acquisition

1. Image an organoid at standard laser power/exposure (ground truth)
2. Image the same organoid at reduced laser power (2--10% of standard) → source
3. Repeat for 5--10 different organoids / fields of view
4. Ensure images are well-registered (light-sheet data may need deskewing first)

### Training

```python
from csbdeep.data import RawData, create_patches
from csbdeep.models import Config, CARE

raw_data = RawData.from_folder(
    basepath='lightsheet_training',
    source_dirs=['low_power'],
    target_dir='high_power',
    axes='ZYX'
)

X, Y, XY_axes = create_patches(
    raw_data=raw_data,
    patch_size=(32, 128, 128),
    n_patches_per_image=128,
    save_file='lightsheet_patches.npz'
)

config = Config(axes='ZYX', n_channel_in=1, n_channel_out=1,
                unet_n_depth=2, train_epochs=100)
model = CARE(config, name='piezo1_lightsheet', basedir='models')
model.train(X[:-5], Y[:-5], validation_data=(X[-5:], Y[-5:]))
```

---

## 18. Denoising TIRF Movies for Single-Molecule Detection

### Why denoise TIRF data?

Single-molecule TIRF imaging of PIEZO1-HaloTag-JF646 requires high frame rates (200--500 fps) with short exposure times, resulting in low per-frame SNR. CARE denoising can:
- Improve ThunderSTORM detection of dim puncta
- Reduce false positive detections
- Enable imaging at even faster frame rates

### Caution

For single-molecule localization microscopy, denoising must be applied carefully:
- CARE may alter the PSF shape, affecting localization precision
- Validate that localization accuracy is maintained (or improved) after denoising
- Compare ThunderSTORM results on raw vs. CARE-restored data
- Do not use CARE-restored images for quantitative intensity measurements unless validated

### Training approach

1. Acquire 100-frame averages as ground truth (static sample)
2. Use individual frames as source
3. Train 2D CARE model (frame-by-frame restoration)

---

## 19. Complete Workflow: Train and Apply a CARE Model

### End-to-end example

```python
import numpy as np
from tifffile import imread, imwrite
from csbdeep.data import RawData, create_patches
from csbdeep.models import Config, CARE
from csbdeep.utils.tf import limit_gpu_memory

# 1. Limit GPU memory
limit_gpu_memory(fraction=0.8)

# 2. Prepare training data
raw_data = RawData.from_folder(
    basepath='training_data',
    source_dirs=['low_snr'],
    target_dir='high_snr',
    axes='YX'
)

X, Y, axes = create_patches(
    raw_data=raw_data,
    patch_size=(128, 128),
    n_patches_per_image=256,
    save_file='training_data/patches.npz'
)

# 3. Split train/validation
n_val = max(1, int(0.1 * len(X)))
X_train, Y_train = X[:-n_val], Y[:-n_val]
X_val, Y_val = X[-n_val:], Y[-n_val:]

# 4. Configure and train
config = Config(
    axes='YX',
    n_channel_in=1,
    n_channel_out=1,
    train_epochs=100,
    train_steps_per_epoch=400,
)
model = CARE(config, name='piezo1_denoise', basedir='models')
history = model.train(X_train, Y_train, validation_data=(X_val, Y_val))

# 5. Export for FIJI (optional)
model.export_TF()

# 6. Apply to new data
import glob
for f in sorted(glob.glob('experiment_data/*.tif')):
    img = imread(f)
    restored = model.predict(img, axes='YX', n_tiles=(2, 2))
    imwrite(f.replace('experiment_data', 'restored'), restored)
    print(f"Done: {f}")
```

---

## 20. Common Problems and Solutions

### TensorFlow / GPU not detected

- Verify CUDA and cuDNN versions match your TensorFlow version
- Check: `python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"`
- Use `limit_gpu_memory(fraction=0.8)` to prevent TF from allocating all GPU memory

### Out of GPU memory during training

- Reduce `train_batch_size` (e.g., 8 or 4)
- Reduce patch size (e.g., 64×64 instead of 128×128)
- Reduce `unet_n_first` (e.g., 16 instead of 32)

### Out of GPU memory during prediction

- Use tiling: `model.predict(img, axes='YX', n_tiles=(4, 4))`
- Increase tile count until prediction succeeds

### Model produces artifacts or hallucinated structures

- Training data may be insufficient or not representative
- Acquire more diverse training pairs
- Check alignment between source and target images
- Reduce model capacity (`unet_n_depth=1`) if training data is limited

### FIJI plugin cannot load the model

- Models exported from TensorFlow 2.x may be incompatible
- Export from a TF 1.x environment if needed
- Alternatively, run prediction from Python

### Restored images have checkerboard artifacts

- Common with U-Net decoders using transposed convolutions
- Try increasing training epochs or using `train_loss='mae'`
- Consider Noise2Void (N2V2) which specifically addresses checkerboard artifacts

### Python version incompatibility

- CSBDeep 0.8.x works with Python 3.6+
- TensorFlow 2.13 works with Python 3.8--3.11
- Create a dedicated conda environment for CARE to avoid conflicts

---

*This manual was developed for the PIEZO1 research group to support deep-learning-based image restoration of fluorescence microscopy data, particularly light-sheet imaging of PIEZO1-HaloTag-labelled organoids. CARE/CSBDeep was used for denoising in Bertaccini et al. (2025).*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*CSBDeep is open-source software (BSD licence) available at https://github.com/CSBDeep/CSBDeep*

*Citation: Weigert, M. et al. (2018). Nature Methods, 15(12), 1090--1097.*
