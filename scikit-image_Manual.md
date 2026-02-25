# scikit-image Manual for Biology Researchers

**A Companion to the Python Manual**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

1. [Introduction: What is scikit-image?](#1-introduction-what-is-scikit-image)
2. [Image Data Conventions](#2-image-data-conventions)
3. [Reading and Writing Images](#3-reading-and-writing-images)
4. [Filtering and Denoising](#4-filtering-and-denoising)
5. [Thresholding](#5-thresholding)
6. [Morphological Operations](#6-morphological-operations)
7. [Segmentation](#7-segmentation)
8. [Region Properties and Measurements](#8-region-properties-and-measurements)
9. [Edge Detection](#9-edge-detection)
10. [Feature Detection](#10-feature-detection)
11. [Image Transforms](#11-image-transforms)
12. [Colour and Intensity](#12-colour-and-intensity)
13. [Registration and Alignment](#13-registration-and-alignment)
14. [Drawing on Images](#14-drawing-on-images)
15. [Common Pitfalls and Debugging](#15-common-pitfalls-and-debugging)
16. [Practical Recipes for Microscopy](#16-practical-recipes-for-microscopy)
17. [Quick Reference](#17-quick-reference)

---

## 1. Introduction: What is scikit-image?

scikit-image (imported as `skimage`) is a Python library for image processing built entirely on NumPy arrays. It provides a comprehensive collection of algorithms for filtering, segmentation, feature detection, morphology, and measurement --- everything you need for quantitative analysis of microscopy images.

### Key principles

scikit-image images are simply NumPy arrays. Every function takes an array as input and returns an array as output. There are no custom image objects to learn --- if you understand NumPy (see the NumPy companion manual), you already understand scikit-image's data model.

### Standard imports

```python
from skimage import (
    io,              # Image reading/writing
    filters,         # Gaussian, median, threshold, edge detection
    morphology,      # Erosion, dilation, opening, closing, labelling
    measure,         # Region properties, contours, label
    segmentation,    # Watershed, SLIC, random walker
    feature,         # Blob detection, corner detection, ORB
    transform,       # Resize, rotate, warp
    exposure,        # Histogram equalisation, contrast adjustment
    draw,            # Draw circles, lines, polygons
    color,           # Colour space conversions
    restoration,     # Denoising, deconvolution
    util,            # Type conversion utilities
)
import numpy as np
```

---

## 2. Image Data Conventions

### Data types

scikit-image functions expect images in specific value ranges depending on their dtype:

| dtype | Expected range | Notes |
|---|---|---|
| `float32` / `float64` | 0.0 -- 1.0 | Most skimage functions expect this |
| `uint8` | 0 -- 255 | Common for display images |
| `uint16` | 0 -- 65535 | Common for scientific cameras |
| `bool` | True / False | Binary masks |

### Type conversion

```python
from skimage import util, img_as_float, img_as_ubyte, img_as_uint

# Convert to float (0.0 -- 1.0) for skimage processing
img_float = img_as_float(image)          # Scales to [0, 1]
img_float = util.img_as_float(image)     # Same thing

# Convert back to integer types
img_uint8  = img_as_ubyte(img_float)     # Scale to [0, 255]
img_uint16 = img_as_uint(img_float)      # Scale to [0, 65535]

# CRITICAL: img_as_float scales by the dtype maximum
# For uint16: pixel value 1000 → 1000/65535 ≈ 0.01526
# If you want to preserve raw values, just cast:
img_raw_float = image.astype(np.float64)   # No rescaling
```

### Coordinate conventions

scikit-image uses **(row, col)** ordering, which corresponds to **(y, x)**:

```python
# image[row, col] = image[y, x]
# This is consistent with NumPy and matplotlib

# When functions return coordinates, they are (row, col) = (y, x)
# NOT (x, y) as in many other systems
```

### Channel conventions

| Shape | Meaning |
|---|---|
| `(H, W)` | Grayscale |
| `(H, W, 3)` | RGB colour |
| `(H, W, 4)` | RGBA (with alpha/transparency) |
| `(T, H, W)` | Time-lapse grayscale |

---

## 3. Reading and Writing Images

scikit-image's `io` module uses tifffile and other backends to read images. For TIFF files, using `tifffile` directly (see the tifffile companion manual) gives you more control.

```python
from skimage import io

# Read an image (uses tifffile for TIFFs)
image = io.imread("image.tif")
stack = io.imread("stack.tif")

# Read a collection of images
collection = io.ImageCollection("data/*.tif")
first = collection[0]

# Save an image
io.imsave("output.tif", processed_image)
io.imsave("output.png", display_image)
```

---

## 4. Filtering and Denoising

### Gaussian blur

```python
from skimage.filters import gaussian

# 2D Gaussian blur
blurred = gaussian(image, sigma=2)

# Different sigma for each axis
blurred = gaussian(image, sigma=(3, 1))    # More blur in y than x

# For a 3D stack (blur spatially, not temporally)
from scipy.ndimage import gaussian_filter
blurred_stack = gaussian_filter(stack.astype(np.float64), sigma=[0, 2, 2])
```

### Median filter

```python
from skimage.filters import median
from skimage.morphology import disk, square

# Median filter with a circular footprint
cleaned = median(image, footprint=disk(3))

# Square footprint
cleaned = median(image, footprint=square(5))
```

### Bilateral filter (edge-preserving)

```python
from skimage.restoration import denoise_bilateral

# Smooths flat regions while preserving edges
denoised = denoise_bilateral(img_as_float(image), sigma_color=0.05, sigma_spatial=10)
```

### Non-local means denoising

```python
from skimage.restoration import denoise_nl_means, estimate_sigma

# Estimate noise level
sigma_est = estimate_sigma(image)

# Denoise
denoised = denoise_nl_means(image, h=1.15 * sigma_est, fast_mode=True,
                             patch_size=5, patch_distance=6)
```

### Unsharp mask (sharpening)

```python
from skimage.filters import unsharp_mask

sharpened = unsharp_mask(image, radius=3, amount=1.5)
```

### Top-hat filter (background subtraction)

```python
from skimage.morphology import white_tophat, disk

# Remove slowly varying background (highlight small bright objects)
background_removed = white_tophat(image, footprint=disk(50))
```

---

## 5. Thresholding

Thresholding converts a grayscale image to a binary mask. scikit-image provides many automatic threshold methods.

### Global thresholding

```python
from skimage.filters import (
    threshold_otsu,
    threshold_li,
    threshold_yen,
    threshold_triangle,
    threshold_isodata,
    threshold_mean,
    threshold_minimum,
)

# Otsu's method (most widely used)
thresh = threshold_otsu(image)
binary = image > thresh

# Li's method (good for fluorescence images with low signal-to-noise)
thresh = threshold_li(image)
binary = image > thresh

# Try all methods for comparison
from skimage.filters import try_all_threshold
fig, axes = try_all_threshold(image, figsize=(12, 10), verbose=False)
```

### Which threshold method to use?

| Method | Best for | Notes |
|---|---|---|
| Otsu | Bimodal histograms (clear signal + background) | Most common default |
| Li | Fluorescence images | Minimises cross-entropy; works well with dim signals |
| Yen | Foreground much brighter than background | Good for sparse bright spots |
| Triangle | Images with one dominant background peak | Common in biomedical imaging |
| Isodata | Similar to Otsu | Iterative approach |

### Local (adaptive) thresholding

For images with uneven illumination:

```python
from skimage.filters import threshold_local

# Block size must be odd
block_size = 51
local_thresh = threshold_local(image, block_size, method='gaussian', offset=10)
binary = image > local_thresh
```

### Manual thresholding

```python
# Sometimes you just need a fixed value based on your experiment
threshold = 200
binary = image > threshold
```

---

## 6. Morphological Operations

Morphological operations clean up binary masks and modify shapes of objects.

### Structuring elements (footprints)

```python
from skimage.morphology import disk, square, diamond, star, octagon

d = disk(5)          # Circular, radius 5 (11×11)
s = square(5)        # 5×5 square
di = diamond(3)      # Diamond shape
```

### Binary morphology

```python
from skimage.morphology import (
    binary_erosion, binary_dilation,
    binary_opening, binary_closing,
)

footprint = disk(3)

# Erosion: shrinks objects (removes small protrusions)
eroded = binary_erosion(mask, footprint=footprint)

# Dilation: grows objects (fills small gaps)
dilated = binary_dilation(mask, footprint=footprint)

# Opening: erosion then dilation (removes small noise while preserving shape)
opened = binary_opening(mask, footprint=footprint)

# Closing: dilation then erosion (fills small holes while preserving shape)
closed = binary_closing(mask, footprint=footprint)
```

### Grayscale morphology

```python
from skimage.morphology import (
    erosion, dilation, opening, closing, white_tophat, black_tophat
)

# These operate on the raw intensity values, not binary masks
eroded = erosion(image, footprint=disk(3))
dilated = dilation(image, footprint=disk(3))

# White top-hat: highlights bright features smaller than the footprint
bright_spots = white_tophat(image, footprint=disk(10))

# Black top-hat: highlights dark features smaller than the footprint
dark_spots = black_tophat(image, footprint=disk(10))
```

### Removing small objects and holes

```python
from skimage.morphology import remove_small_objects, remove_small_holes

# Remove objects smaller than min_size pixels
cleaned = remove_small_objects(mask, min_size=50)

# Fill holes smaller than area_threshold pixels
filled = remove_small_holes(mask, area_threshold=100)
```

### Area opening / closing

```python
from skimage.morphology import area_opening, area_closing

# Remove bright spots with area < 64 pixels (in grayscale images)
cleaned = area_opening(image, area_threshold=64)

# Fill dark holes with area < 64 pixels
filled = area_closing(image, area_threshold=64)
```

---

## 7. Segmentation

### Labelling connected components

```python
from skimage.measure import label

# Label connected components in a binary mask
labelled = label(mask)                  # 4-connectivity (default)
labelled = label(mask, connectivity=2)  # 8-connectivity

n_objects = labelled.max()
print(f"Found {n_objects} objects")
```

### Watershed segmentation

Watershed is essential for separating touching objects (e.g. confluent cells).

```python
from skimage.segmentation import watershed
from skimage.feature import peak_local_max
from scipy import ndimage

# Step 1: Compute distance transform of the binary mask
distance = ndimage.distance_transform_edt(mask)

# Step 2: Find peaks in the distance map (one per cell)
local_max = peak_local_max(distance, min_distance=20, labels=mask)

# Step 3: Create markers from the peaks
markers = np.zeros_like(mask, dtype=int)
for i, (r, c) in enumerate(local_max, start=1):
    markers[r, c] = i

# Step 4: Watershed segmentation
labels = watershed(-distance, markers, mask=mask)
# Each cell gets a unique integer label
```

### Random walker segmentation

```python
from skimage.segmentation import random_walker

# Create seed markers
markers = np.zeros_like(image, dtype=int)
markers[image < 100] = 1     # Background seeds
markers[image > 500] = 2     # Foreground seeds

# Run random walker
labels = random_walker(image, markers, beta=130)
```

### Clear border objects

```python
from skimage.segmentation import clear_border

# Remove objects touching the image edge
cleaned_labels = clear_border(labelled)
```

---

## 8. Region Properties and Measurements

After segmentation, `regionprops` measures properties of each labelled region.

### Basic usage

```python
from skimage.measure import regionprops, regionprops_table
import pandas as pd

# Measure properties of labelled regions
props = regionprops(labelled, intensity_image=image)

for prop in props:
    print(f"Label {prop.label}:")
    print(f"  Area:       {prop.area} pixels")
    print(f"  Centroid:   ({prop.centroid[0]:.1f}, {prop.centroid[1]:.1f})")
    print(f"  Mean int:   {prop.mean_intensity:.1f}")
    print(f"  Eccentricity: {prop.eccentricity:.3f}")
    print(f"  Bbox:       {prop.bbox}")
```

### Export to pandas DataFrame

```python
# Get measurements as a table (much more convenient for analysis)
table = regionprops_table(labelled, intensity_image=image,
    properties=[
        'label', 'area', 'centroid', 'eccentricity',
        'mean_intensity', 'max_intensity', 'min_intensity',
        'perimeter', 'solidity', 'equivalent_diameter_area',
        'bbox',
    ])

df = pd.DataFrame(table)
print(df.head())
df.to_csv("cell_measurements.csv", index=False)
```

### Available properties

| Property | Description | Units |
|---|---|---|
| `area` | Number of pixels in the region | pixels |
| `centroid` | Centre of mass (row, col) | pixels |
| `bbox` | Bounding box (min_row, min_col, max_row, max_col) | pixels |
| `mean_intensity` | Mean pixel value in the region | intensity |
| `max_intensity` | Maximum pixel value | intensity |
| `min_intensity` | Minimum pixel value | intensity |
| `perimeter` | Perimeter length | pixels |
| `eccentricity` | 0 = circle, 1 = line | dimensionless |
| `solidity` | Area / convex hull area | dimensionless |
| `equivalent_diameter_area` | Diameter of circle with same area | pixels |
| `orientation` | Angle of the major axis | radians |
| `major_axis_length` | Length of major axis of fitted ellipse | pixels |
| `minor_axis_length` | Length of minor axis | pixels |

### Filtering regions by properties

```python
# Keep only objects with area between 100 and 5000 pixels
filtered_mask = np.zeros_like(labelled, dtype=bool)
for prop in regionprops(labelled):
    if 100 <= prop.area <= 5000:
        filtered_mask[labelled == prop.label] = True

# Or using the DataFrame
df_filtered = df[(df['area'] >= 100) & (df['area'] <= 5000)]
```

### Finding contours

```python
from skimage.measure import find_contours

# Find contours at a specific intensity level
contours = find_contours(image, level=threshold)

# Plot contours on the image
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.imshow(image, cmap='gray')
for contour in contours:
    ax.plot(contour[:, 1], contour[:, 0], 'r-', linewidth=1)
plt.show()
```

---

## 9. Edge Detection

### Sobel, Prewitt, and Roberts

```python
from skimage.filters import sobel, prewitt, roberts, scharr

edges_sobel   = sobel(image)      # Gradient magnitude (most common)
edges_prewitt = prewitt(image)    # Similar to Sobel
edges_roberts = roberts(image)    # Diagonal edges
edges_scharr  = scharr(image)     # More accurate than Sobel
```

### Canny edge detector

```python
from skimage.feature import canny

# Canny: the gold standard for edge detection
edges = canny(image, sigma=2, low_threshold=0.05, high_threshold=0.15)
# Returns a boolean array (True at edges)
```

### Laplacian of Gaussian (LoG)

```python
from skimage.filters import laplace, gaussian

# LoG = Laplacian applied to Gaussian-smoothed image
smoothed = gaussian(image, sigma=3)
log = laplace(smoothed)
```

---

## 10. Feature Detection

### Blob detection

Blob detection finds circular bright or dark features --- ideal for detecting fluorescent puncta, cell nuclei, or PIEZO1 clusters.

```python
from skimage.feature import blob_log, blob_dog, blob_doh

# Laplacian of Gaussian (most accurate)
blobs = blob_log(image, min_sigma=2, max_sigma=10, num_sigma=10, threshold=0.1)
# Each blob: (row, col, sigma)
# Radius ≈ sigma * sqrt(2)

# Difference of Gaussian (faster)
blobs = blob_dog(image, min_sigma=2, max_sigma=10, threshold=0.1)

# Determinant of Hessian (fastest)
blobs = blob_doh(image, min_sigma=2, max_sigma=10, threshold=0.01)
```

### Plotting detected blobs

```python
import matplotlib.pyplot as plt
from matplotlib.patches import Circle

fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(image, cmap='gray')

for blob in blobs:
    row, col, sigma = blob
    radius = sigma * np.sqrt(2)
    circle = Circle((col, row), radius, color='cyan',
                     linewidth=1.5, fill=False)
    ax.add_patch(circle)

ax.set_title(f"Detected {len(blobs)} blobs")
ax.axis('off')
plt.show()
```

### Peak local max (local maxima detection)

```python
from skimage.feature import peak_local_max

# Find local intensity maxima
coords = peak_local_max(image, min_distance=10, threshold_abs=200,
                        num_peaks=100)
# coords: array of (row, col) for each peak

# Plot
fig, ax = plt.subplots()
ax.imshow(image, cmap='gray')
ax.plot(coords[:, 1], coords[:, 0], 'r+', markersize=8)
```

### Corner detection

```python
from skimage.feature import corner_harris, corner_peaks

# Harris corner detection
corner_response = corner_harris(image, sigma=3)
corners = corner_peaks(corner_response, min_distance=10, threshold_rel=0.02)
```

---

## 11. Image Transforms

### Resize

```python
from skimage.transform import resize, rescale

# Resize to specific dimensions
resized = resize(image, (256, 256), anti_aliasing=True)

# Rescale by a factor
upsampled = rescale(image, 2, anti_aliasing=True)      # 2× larger
downsampled = rescale(image, 0.5, anti_aliasing=True)   # Half size
```

### Rotate

```python
from skimage.transform import rotate

# Rotate by angle (degrees, counter-clockwise)
rotated = rotate(image, angle=30, resize=True, mode='constant', cval=0)
```

### Affine and projective transforms

```python
from skimage.transform import AffineTransform, warp

# Define an affine transform (translation + rotation + scale)
tform = AffineTransform(translation=(10, 20), rotation=0.1, scale=1.05)
warped = warp(image, tform.inverse, output_shape=image.shape)
```

### Hough transform (line and circle detection)

```python
from skimage.transform import hough_circle, hough_circle_peaks
from skimage.feature import canny

# Detect circles (e.g. well plates, beads)
edges = canny(image, sigma=3)
hough_radii = np.arange(10, 50, 2)
hough_res = hough_circle(edges, hough_radii)
accums, cx, cy, radii = hough_circle_peaks(hough_res, hough_radii, total_num_peaks=10)
```

---

## 12. Colour and Intensity

### Contrast adjustment

```python
from skimage import exposure

# Histogram equalisation (spread intensity values evenly)
equalised = exposure.equalize_hist(image)

# Adaptive (local) histogram equalisation (CLAHE)
clahe = exposure.equalize_adapthist(image, clip_limit=0.03)

# Rescale intensity to a specific range
rescaled = exposure.rescale_intensity(image, in_range=(100, 4000), out_range=(0, 1))

# Gamma correction (< 1 brightens, > 1 darkens)
brightened = exposure.adjust_gamma(image, gamma=0.5)
```

### Colour space conversions

```python
from skimage import color

# RGB to grayscale
gray = color.rgb2gray(rgb_image)

# Grayscale to RGB (for overlays)
rgb = color.gray2rgb(gray_image)

# Label image to colour overlay
from skimage.color import label2rgb
overlay = label2rgb(labelled, image=image, bg_label=0, alpha=0.3)
```

### Creating composite (merged) images

```python
def make_composite(green_channel, red_channel, blue_channel=None):
    """Create an RGB composite from separate fluorescence channels."""
    # Normalise each channel to 0-1
    def norm(ch):
        ch = ch.astype(np.float64)
        mn, mx = ch.min(), ch.max()
        if mx > mn:
            return (ch - mn) / (mx - mn)
        return ch * 0

    h, w = green_channel.shape
    rgb = np.zeros((h, w, 3))
    rgb[:, :, 1] = norm(green_channel)     # Green
    rgb[:, :, 0] = norm(red_channel)        # Red
    if blue_channel is not None:
        rgb[:, :, 2] = norm(blue_channel)   # Blue

    return np.clip(rgb, 0, 1)
```

---

## 13. Registration and Alignment

### Phase cross-correlation (sub-pixel image registration)

```python
from skimage.registration import phase_cross_correlation

# Find the shift between two images
shift, error, diffphase = phase_cross_correlation(reference, moving, upsample_factor=10)
print(f"Shift: dy={shift[0]:.2f}, dx={shift[1]:.2f} pixels")

# Apply the shift
from scipy.ndimage import shift as ndi_shift
aligned = ndi_shift(moving, shift)
```

### Drift correction for time-lapse stacks

```python
def correct_drift(stack, reference_frame=0):
    """Correct XY drift in a time-lapse stack using phase cross-correlation.

    Parameters
    ----------
    stack : 3D array (frames, rows, cols)
    reference_frame : int, frame to use as reference

    Returns
    -------
    corrected : 3D array, drift-corrected stack
    shifts : (n_frames, 2) array of applied (dy, dx) shifts
    """
    from skimage.registration import phase_cross_correlation
    from scipy.ndimage import shift as ndi_shift

    ref = stack[reference_frame].astype(np.float64)
    corrected = np.empty_like(stack, dtype=np.float64)
    shifts = np.zeros((stack.shape[0], 2))

    for i in range(stack.shape[0]):
        frame = stack[i].astype(np.float64)
        shift_vals, _, _ = phase_cross_correlation(ref, frame, upsample_factor=10)
        corrected[i] = ndi_shift(frame, shift_vals)
        shifts[i] = shift_vals

    return corrected.astype(stack.dtype), shifts
```

---

## 14. Drawing on Images

### Drawing shapes on images

```python
from skimage.draw import disk, rectangle, line, circle_perimeter, polygon

# Draw a filled circle
rr, cc = disk((256, 256), radius=30, shape=image.shape)
overlay = image.copy()
overlay[rr, cc] = image.max()

# Draw a circle outline
rr, cc = circle_perimeter(256, 256, 30, shape=image.shape)
overlay[rr, cc] = image.max()

# Draw a line
rr, cc = line(100, 100, 400, 400)
overlay[rr, cc] = image.max()

# Draw a filled rectangle
rr, cc = rectangle(start=(100, 100), end=(200, 300), shape=image.shape)
overlay[rr, cc] = image.max()
```

---

## 15. Common Pitfalls and Debugging

### Float vs integer confusion

```python
# Problem: skimage function returns all zeros or weird values
# Cause: image is uint16 but function expects float [0, 1]

# Solution: convert dtype explicitly
from skimage import img_as_float
result = gaussian(img_as_float(image), sigma=2)
```

### Coordinate order (row, col) vs (x, y)

```python
# Problem: plotted features appear in wrong locations

# skimage uses (row, col) = (y, x)
# matplotlib's scatter uses (x, y)

# If peaks are from skimage:
peaks = peak_local_max(image)    # Returns (row, col) = (y, x)

# Plot correctly:
ax.scatter(peaks[:, 1], peaks[:, 0])    # x=col, y=row
```

### In-place modification

```python
# Problem: original image is modified
mask = image > threshold
image[mask] = 0    # Modifies original!

# Solution: work on a copy
working = image.copy()
working[mask] = 0
```

---

## 16. Practical Recipes for Microscopy

### Cell segmentation pipeline

```python
import numpy as np
from skimage import filters, morphology, measure, segmentation
from skimage.feature import peak_local_max
from scipy import ndimage
import pandas as pd

def segment_cells(image, min_area=200, max_area=10000):
    """Segment cells from a fluorescence image.

    Parameters
    ----------
    image : 2D array
    min_area : minimum cell area in pixels
    max_area : maximum cell area in pixels

    Returns
    -------
    labels : labelled image (integer array)
    df : pandas DataFrame with measurements
    """
    # 1. Smooth
    smoothed = filters.gaussian(image.astype(np.float64), sigma=2)

    # 2. Threshold (Li's method works well for fluorescence)
    thresh = filters.threshold_li(smoothed)
    binary = smoothed > thresh

    # 3. Clean the mask
    binary = morphology.binary_opening(binary, footprint=morphology.disk(3))
    binary = morphology.remove_small_objects(binary, min_size=min_area)
    binary = morphology.remove_small_holes(binary, area_threshold=500)

    # 4. Watershed to separate touching cells
    distance = ndimage.distance_transform_edt(binary)
    local_max = peak_local_max(distance, min_distance=15, labels=binary)
    markers = np.zeros_like(binary, dtype=int)
    for i, (r, c) in enumerate(local_max, start=1):
        markers[r, c] = i
    labels = segmentation.watershed(-distance, markers, mask=binary)

    # 5. Remove edge objects and filter by size
    labels = segmentation.clear_border(labels)
    for prop in measure.regionprops(labels):
        if prop.area < min_area or prop.area > max_area:
            labels[labels == prop.label] = 0

    # 6. Relabel consecutively
    labels = measure.label(labels > 0)

    # 7. Measure properties
    table = measure.regionprops_table(labels, intensity_image=image,
        properties=['label', 'area', 'centroid', 'mean_intensity',
                    'max_intensity', 'eccentricity', 'perimeter',
                    'solidity', 'equivalent_diameter_area'])
    df = pd.DataFrame(table)

    return labels, df
```

### Puncta detection and quantification

```python
from skimage.feature import blob_log
from skimage.filters import gaussian

def detect_puncta(image, min_sigma=1, max_sigma=5, threshold=0.05,
                  pixel_size_um=0.108):
    """Detect fluorescent puncta (e.g. PIEZO1 clusters) in an image.

    Returns a DataFrame with puncta properties.
    """
    # Normalise to 0-1
    img_norm = image.astype(np.float64)
    img_norm = (img_norm - img_norm.min()) / (img_norm.max() - img_norm.min() + 1e-10)

    # Detect blobs
    blobs = blob_log(img_norm, min_sigma=min_sigma, max_sigma=max_sigma,
                     num_sigma=10, threshold=threshold)

    # Measure properties of each punctum
    records = []
    for row, col, sigma in blobs:
        radius_px = sigma * np.sqrt(2)
        radius_um = radius_px * pixel_size_um

        # Measure intensity in a small ROI around the punctum
        r, c = int(round(row)), int(round(col))
        r_min = max(0, r - int(radius_px))
        r_max = min(image.shape[0], r + int(radius_px) + 1)
        c_min = max(0, c - int(radius_px))
        c_max = min(image.shape[1], c + int(radius_px) + 1)
        roi = image[r_min:r_max, c_min:c_max]

        records.append({
            'row': row,
            'col': col,
            'y_um': row * pixel_size_um,
            'x_um': col * pixel_size_um,
            'sigma': sigma,
            'radius_um': radius_um,
            'mean_intensity': roi.mean(),
            'max_intensity': roi.max(),
            'integrated_intensity': roi.sum(),
        })

    return pd.DataFrame(records)
```

---

## 17. Quick Reference

### Filtering

| Task | Code |
|---|---|
| Gaussian blur | `filters.gaussian(image, sigma=2)` |
| Median filter | `filters.median(image, footprint=morphology.disk(3))` |
| Unsharp mask | `filters.unsharp_mask(image, radius=3, amount=1.5)` |
| Top-hat | `morphology.white_tophat(image, footprint=morphology.disk(10))` |

### Thresholding

| Task | Code |
|---|---|
| Otsu | `thresh = filters.threshold_otsu(image); mask = image > thresh` |
| Li | `thresh = filters.threshold_li(image)` |
| Local | `filters.threshold_local(image, block_size=51)` |
| Try all | `filters.try_all_threshold(image)` |

### Morphology (binary masks)

| Task | Code |
|---|---|
| Opening | `morphology.binary_opening(mask, footprint=morphology.disk(3))` |
| Closing | `morphology.binary_closing(mask, footprint=morphology.disk(3))` |
| Remove small | `morphology.remove_small_objects(mask, min_size=50)` |
| Fill holes | `morphology.remove_small_holes(mask, area_threshold=100)` |

### Segmentation and measurement

| Task | Code |
|---|---|
| Label objects | `measure.label(mask)` |
| Watershed | `segmentation.watershed(-distance, markers, mask=mask)` |
| Region props | `measure.regionprops(labels, intensity_image=image)` |
| Props as table | `measure.regionprops_table(labels, properties=[...])` |
| Find contours | `measure.find_contours(image, level=thresh)` |
| Clear border | `segmentation.clear_border(labels)` |

### Feature detection

| Task | Code |
|---|---|
| Blob (LoG) | `feature.blob_log(image, min_sigma=2, max_sigma=10)` |
| Local maxima | `feature.peak_local_max(image, min_distance=10)` |
| Canny edges | `feature.canny(image, sigma=2)` |

### Transforms

| Task | Code |
|---|---|
| Resize | `transform.resize(image, (256, 256))` |
| Rescale | `transform.rescale(image, 0.5)` |
| Rotate | `transform.rotate(image, angle=30)` |

---

*This manual was developed for the PIEZO1 research group as a companion to the Python Manual. For questions or suggestions, contact george.dickinson@gmail.com.*
