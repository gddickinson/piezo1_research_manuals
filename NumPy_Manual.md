# NumPy Manual for Biology Researchers

**A Companion to the Python Manual**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

1. [Introduction: What is NumPy?](#1-introduction-what-is-numpy)
2. [The ndarray: NumPy's Core Object](#2-the-ndarray-numpys-core-object)
3. [Creating Arrays](#3-creating-arrays)
4. [Data Types for Microscopy](#4-data-types-for-microscopy)
5. [Indexing and Slicing](#5-indexing-and-slicing)
6. [Boolean Indexing and Masking](#6-boolean-indexing-and-masking)
7. [Reshaping, Stacking, and Splitting](#7-reshaping-stacking-and-splitting)
8. [Element-wise Operations and Broadcasting](#8-element-wise-operations-and-broadcasting)
9. [Aggregation and Statistics](#9-aggregation-and-statistics)
10. [Linear Algebra](#10-linear-algebra)
11. [Random Number Generation](#11-random-number-generation)
12. [Polynomial Fitting and Interpolation](#12-polynomial-fitting-and-interpolation)
13. [Fourier Transforms](#13-fourier-transforms)
14. [Sorting, Searching, and Counting](#14-sorting-searching-and-counting)
15. [File Input/Output](#15-file-inputoutput)
16. [Memory Layout and Performance](#16-memory-layout-and-performance)
17. [Structured Arrays and Record Arrays](#17-structured-arrays-and-record-arrays)
18. [Common Pitfalls and Debugging](#18-common-pitfalls-and-debugging)
19. [Practical Recipes for Microscopy](#19-practical-recipes-for-microscopy)
20. [Quick Reference](#20-quick-reference)

---

## 1. Introduction: What is NumPy?

NumPy (Numerical Python) is the foundation of virtually all scientific computing in Python. Every package you use for microscopy analysis --- SciPy, matplotlib, scikit-image, tifffile, pandas --- is built on top of NumPy arrays.

**The key insight:** A microscopy image is just a 2D NumPy array of numbers. A time-lapse stack is a 3D array. All your analysis --- background subtraction, dF/F, mean projections, thresholding --- is array maths.

### Why NumPy instead of Python lists?

| Feature | Python list | NumPy array |
|---|---|---|
| Speed | Slow (interpreted loop per element) | Fast (compiled C code, vectorised) |
| Memory | ~28 bytes per integer | ~2 bytes per uint16 pixel |
| Operations | One element at a time | Entire array at once |
| Dimensions | Nested lists (awkward) | True N-dimensional arrays |
| Type safety | Mixed types allowed | Uniform type enforced |

A 512×512 uint16 image stored as a Python list of lists would use ~14 MB. The same image as a NumPy array uses ~0.5 MB.

### Standard import

```python
import numpy as np
```

This convention is universal. Every scientific Python tutorial, textbook, and package assumes `np` as the alias. Always use it.

### Version and configuration

```python
print(np.__version__)      # e.g. '1.26.4'
np.show_config()           # Shows BLAS/LAPACK backend (MKL, OpenBLAS, etc.)
```

---

## 2. The ndarray: NumPy's Core Object

The `ndarray` (N-dimensional array) is a homogeneous, fixed-size, multi-dimensional container of elements of the same type.

### Key properties

```python
import numpy as np
import tifffile

stack = tifffile.imread("calcium_timelapse.tif")
```

| Property | What it returns | Example |
|---|---|---|
| `stack.shape` | Dimensions as a tuple | `(500, 512, 512)` |
| `stack.ndim` | Number of dimensions | `3` |
| `stack.dtype` | Data type of each element | `uint16` |
| `stack.size` | Total number of elements | `131072000` |
| `stack.nbytes` | Memory usage in bytes | `262144000` |
| `stack.itemsize` | Bytes per element | `2` |
| `stack.strides` | Bytes to step in each dimension | `(524288, 1024, 2)` |

### Quick diagnostic function

```python
def inspect(arr, name="array"):
    """Print a comprehensive summary of a numpy array."""
    print(f"{name}:")
    print(f"  shape   : {arr.shape}")
    print(f"  dtype   : {arr.dtype}")
    print(f"  range   : {arr.min():.4g} -- {arr.max():.4g}")
    print(f"  mean    : {arr.mean():.4g}")
    print(f"  memory  : {arr.nbytes / 1e6:.1f} MB")

inspect(stack, "calcium stack")
# calcium stack:
#   shape   : (500, 512, 512)
#   dtype   : uint16
#   range   : 95 -- 4082
#   mean    : 312.4
#   memory  : 262.1 MB
```

---

## 3. Creating Arrays

### From Python sequences

```python
# 1D array from a list
data = np.array([1, 2, 3, 4, 5])

# 2D array from nested lists
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

# Specify the data type explicitly
roi_coords = np.array([200, 230, 200, 230], dtype=np.int32)
```

### Zeros, ones, and empty arrays

```python
# Blank images / stacks
blank_image = np.zeros((512, 512), dtype=np.uint16)
blank_stack = np.zeros((100, 512, 512), dtype=np.uint16)
ones_image  = np.ones((512, 512), dtype=np.float32)
mask        = np.full((512, 512), fill_value=255, dtype=np.uint8)

# Empty (uninitialised --- faster but contains garbage values)
buffer = np.empty((100, 512, 512), dtype=np.float64)

# Like another array (same shape and dtype)
result = np.zeros_like(stack)
normalised = np.empty_like(stack, dtype=np.float32)
```

### Sequences and ranges

```python
# Integer range (like Python's range but returns an array)
frames = np.arange(500)                    # 0, 1, 2, ..., 499
odd_frames = np.arange(1, 500, 2)          # 1, 3, 5, ..., 499

# Evenly spaced floating-point values
time = np.linspace(0, 50, 500)             # 500 points from 0.0 to 50.0
# Includes both endpoints: [0.0, 0.1002, 0.2004, ..., 50.0]

# Logarithmically spaced values
concentrations = np.logspace(-9, -3, 7)    # 1e-9, 1e-8, ..., 1e-3 (7 points)
```

### Special arrays

```python
# Identity matrix
eye = np.eye(5)                            # 5×5 identity

# Diagonal matrix from values
diag = np.diag([1, 2, 3, 4])              # 4×4 with values on diagonal

# Meshgrid (useful for distance maps)
y, x = np.mgrid[0:512, 0:512]             # Coordinate grids
# y has shape (512, 512), every row is [0, 0, 0, ...]
# x has shape (512, 512), every row is [0, 1, 2, ...]

# Distance from centre
cy, cx = 256, 256
distance = np.sqrt((y - cy)**2 + (x - cx)**2)
```

---

## 4. Data Types for Microscopy

Choosing the right data type (`dtype`) is critical in microscopy. It determines the range of values an array can hold, how much memory it uses, and whether calculations preserve precision.

### Common dtypes in microscopy

| dtype | Bits | Range | Typical use |
|---|---|---|---|
| `np.uint8` | 8 | 0 -- 255 | Confocal images, display images, masks |
| `np.uint16` | 16 | 0 -- 65535 | Most scientific cameras (sCMOS, EMCCD) |
| `np.uint32` | 32 | 0 -- 4.29×10⁹ | Photon counting, accumulation buffers |
| `np.int16` | 16 | −32768 -- 32767 | Signed differences, corrections |
| `np.int32` | 32 | −2.15×10⁹ -- 2.15×10⁹ | Signed integer calculations |
| `np.float32` | 32 | ±3.4×10³⁸ (~7 decimal digits) | Normalised images, dF/F, ratios |
| `np.float64` | 64 | ±1.8×10³⁰⁸ (~15 decimal digits) | Statistics, fitting, default for calculations |
| `np.complex128` | 128 | Complex float64 | Fourier transforms |
| `np.bool_` | 1 | True / False | Binary masks |

### Type conversion

```python
# Convert to float for calculations (ALWAYS do this before division)
img_float = stack.astype(np.float32)

# Convert back to uint16 for saving (clip to valid range first)
result_clipped = np.clip(result, 0, 65535)
result_uint16  = result_clipped.astype(np.uint16)
```

### The overflow trap

```python
# DANGEROUS: uint16 overflow wraps around silently
a = np.array([60000, 60000], dtype=np.uint16)
print(a[0] + a[1])   # 54464  (NOT 120000 --- it wrapped!)

# SAFE: convert to float first
a_float = a.astype(np.float64)
print(a_float[0] + a_float[1])   # 120000.0
```

**Rule of thumb:** Always convert to `float32` or `float64` before doing arithmetic on microscopy images, then convert back to the original dtype for saving.

### Checking and comparing dtypes

```python
print(stack.dtype)                      # uint16
print(stack.dtype == np.uint16)         # True
print(np.issubdtype(stack.dtype, np.integer))    # True
print(np.issubdtype(stack.dtype, np.floating))   # False
```

---

## 5. Indexing and Slicing

Indexing is how you access individual elements, rows, columns, frames, and rectangular regions of interest from arrays.

### 1D arrays

```python
trace = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

trace[0]         # 10       (first element)
trace[-1]        # 100      (last element)
trace[2:5]       # [30, 40, 50]  (indices 2, 3, 4 --- stop is excluded)
trace[:3]        # [10, 20, 30]  (first three)
trace[-3:]       # [80, 90, 100] (last three)
trace[::2]       # [10, 30, 50, 70, 90]  (every other element)
trace[::-1]      # [100, 90, ..., 10]    (reversed)
```

### 2D arrays (images)

The convention is `image[row, col]` which corresponds to `image[y, x]`.

```python
# Single pixel
pixel = image[256, 256]

# Entire row or column
row_100 = image[100, :]        # All columns of row 100
col_256 = image[:, 256]        # All rows of column 256

# Rectangular ROI: image[y1:y2, x1:x2]
roi = image[50:150, 80:180]    # 100×100 pixel sub-region
```

### 3D arrays (time-lapse stacks)

For a stack with shape `(frames, rows, cols)`:

```python
# stack[frame, row, col]  or equivalently  stack[t, y, x]

# One frame (returns a 2D image)
frame_0 = stack[0]             # First frame
frame_0 = stack[0, :, :]       # Same thing, more explicit

# Time trace for a single pixel
pixel_trace = stack[:, 256, 256]   # Shape: (n_frames,)

# Time trace for a rectangular ROI (averaged)
roi_trace = stack[:, 200:230, 200:230].mean(axis=(1, 2))
# Shape: (n_frames,)

# Sub-stack (frames 100-200 only)
sub_stack = stack[100:200]
```

### Axis diagram for 3D stacks

```
stack.shape = (frames, rows, cols)
stack.shape = (500,    512,  512)

axis 0 = frames (time):    stack[t, :, :]   → one 2D frame
axis 1 = rows   (y):       stack[:, y, :]   → one row over all frames
axis 2 = cols   (x):       stack[:, :, x]   → one column over all frames
```

### Fancy indexing

```python
# Select specific indices
indices = [0, 10, 50, 100, 499]
selected_frames = stack[indices]     # Shape: (5, 512, 512)

# Select with an array of indices
peak_frames = np.array([42, 87, 153, 210])
peak_images = stack[peak_frames]     # Shape: (4, 512, 512)
```

### Important: views vs copies

Slicing returns a **view** (shared memory), not a copy. Modifying the view modifies the original.

```python
roi = image[50:150, 80:180]
roi[:] = 0                     # This ALSO sets those pixels to 0 in 'image'!

# To get an independent copy:
roi = image[50:150, 80:180].copy()
roi[:] = 0                     # 'image' is unchanged
```

---

## 6. Boolean Indexing and Masking

Boolean indexing is one of NumPy's most powerful features. It lets you select, modify, or analyse pixels that satisfy a condition --- without writing any loops.

### Basic boolean operations

```python
# Create a boolean mask
mask = image > 500             # True wherever intensity > 500
print(mask.dtype)              # bool
print(mask.shape)              # Same as image

# Use the mask to select values
bright_pixels = image[mask]    # 1D array of all values > 500
print(f"Number of bright pixels: {mask.sum()}")
print(f"Mean of bright pixels: {bright_pixels.mean():.1f}")
```

### Combining conditions

```python
# AND: both conditions must be true
mid_range = (image > 200) & (image < 800)

# OR: either condition is true
extreme = (image < 50) | (image > 4000)

# NOT: invert the mask
not_background = ~(image < 100)

# Parentheses are required around each condition!
# WRONG: image > 200 & image < 800   (operator precedence error)
# RIGHT: (image > 200) & (image < 800)
```

### Practical masking examples

```python
# Set background pixels to zero
cleaned = image.copy()
cleaned[cleaned < 100] = 0

# Replace saturated pixels with NaN (for float arrays)
img_float = image.astype(np.float32)
img_float[img_float >= 65535] = np.nan

# Count pixels in a range
n_signal = np.sum((image > 200) & (image < 60000))

# Apply a circular mask
y, x = np.ogrid[0:512, 0:512]
centre_y, centre_x, radius = 256, 256, 100
circle = (y - centre_y)**2 + (x - centre_x)**2 <= radius**2
cell_pixels = image[circle]
print(f"Mean intensity in circle: {cell_pixels.mean():.1f}")
```

### np.where --- conditional selection

```python
# np.where(condition, value_if_true, value_if_false)
clipped = np.where(image > 4000, 4000, image)      # Clip to max 4000
binary  = np.where(image > threshold, 1, 0)         # Binary mask

# np.where(condition) with one argument returns indices
bright_indices = np.where(trace > trace.mean() + 3 * trace.std())
print(f"Frames with bright signal: {bright_indices[0]}")
```

### Working with NaN values

When you introduce NaN (Not a Number) values, standard functions propagate them:

```python
data = np.array([1.0, 2.0, np.nan, 4.0, 5.0])

np.mean(data)        # nan  (NaN propagates)
np.nanmean(data)     # 3.0  (ignores NaN)
np.nanstd(data)      # 1.58 (ignores NaN)
np.nanmax(data)      # 5.0
np.nanmin(data)      # 1.0

# Check for NaN
np.isnan(data)       # [False, False, True, False, False]
np.any(np.isnan(data))   # True
```

---

## 7. Reshaping, Stacking, and Splitting

### Reshaping

```python
# Reshape without changing data
trace = np.arange(12)
grid = trace.reshape(3, 4)        # Shape: (3, 4)
grid = trace.reshape(3, -1)       # -1 means "figure it out": (3, 4)

# Flatten to 1D
flat = grid.ravel()               # View (shares memory)
flat = grid.flatten()             # Copy (independent)

# Add a dimension
trace = np.arange(500)            # Shape: (500,)
trace_2d = trace[:, np.newaxis]   # Shape: (500, 1)
trace_2d = trace[np.newaxis, :]   # Shape: (1, 500)
# Or equivalently:
trace_2d = np.expand_dims(trace, axis=0)   # Shape: (1, 500)

# Remove length-1 dimensions
squeezed = np.squeeze(trace_2d)   # Back to (500,)
```

### Transpose and axis swapping

```python
# 2D transpose
matrix_T = matrix.T               # Rows ↔ Columns

# 3D: reorder axes
# stack is (frames, rows, cols) = (T, Y, X)
# Swap to (rows, cols, frames) = (Y, X, T)
reordered = np.transpose(stack, axes=(1, 2, 0))
# Or equivalently:
reordered = np.moveaxis(stack, 0, -1)
```

### Stacking and concatenating

```python
# Stack along a new axis
frames = [frame_0, frame_1, frame_2]       # List of 2D arrays
new_stack = np.stack(frames, axis=0)        # Shape: (3, 512, 512)

# Concatenate along an existing axis
part1 = stack[:250]
part2 = stack[250:]
full = np.concatenate([part1, part2], axis=0)  # Shape: (500, 512, 512)

# Vertical and horizontal stacking (2D shortcuts)
top_bottom = np.vstack([image_a, image_b])     # Stack rows
side_by_side = np.hstack([image_a, image_b])   # Stack columns
```

### Splitting

```python
# Split into equal parts
halves = np.array_split(stack, 2, axis=0)    # Two half-stacks
thirds = np.array_split(stack, 3, axis=0)    # Three parts

# Split at specific indices
early, mid, late = np.split(stack, [100, 300], axis=0)
# early: frames 0-99, mid: frames 100-299, late: frames 300-end
```

---

## 8. Element-wise Operations and Broadcasting

### Element-wise arithmetic

NumPy operates on **every element simultaneously** --- no loops needed.

```python
# Arithmetic with a scalar
background = 100
corrected = image - background         # Subtract background from every pixel
doubled   = image * 2                 # Scale every pixel
normalised = image / image.max()       # Normalise to 0.0--1.0

# Arithmetic between arrays (must be compatible shapes)
ratio = channel_green / channel_red    # Pixel-by-pixel ratio
delta = post_stimulus - pre_stimulus   # Difference image
```

### Math functions (element-wise)

```python
np.sqrt(image)                # Square root of every pixel
np.log(trace + 1)             # Natural log (+1 to avoid log(0))
np.log10(concentrations)      # Log base 10
np.exp(data)                  # e^x
np.abs(delta)                 # Absolute value
np.clip(image, 0, 4095)       # Clip values to range [0, 4095]
np.sin(angles)                # Trigonometric functions
np.power(data, 2)             # Raise to a power (same as data**2)
np.round(values, 2)           # Round to 2 decimal places
np.floor(values)              # Round down
np.ceil(values)               # Round up
```

### Broadcasting rules

Broadcasting allows NumPy to perform operations on arrays of different shapes, provided they are compatible.

**The rule:** Dimensions are compared from right to left. Two dimensions are compatible when they are equal or one of them is 1.

```python
# Scalar + array: scalar is broadcast to every element
image + 100                           # (512, 512) + scalar → (512, 512)

# 1D + 2D: the 1D array is broadcast along the matching axis
row_correction = np.array([...])      # Shape: (512,)
corrected = image - row_correction    # (512, 512) - (512,) → (512, 512)
# Each row has row_correction subtracted

# Time trace - per-frame background
bg_trace = stack[:, 10:30, 10:30].mean(axis=(1, 2))  # Shape: (500,)
bg_3d = bg_trace[:, np.newaxis, np.newaxis]           # Shape: (500, 1, 1)
corrected = stack - bg_3d                              # (500, 512, 512) - (500, 1, 1)
```

### The dF/F pattern (broadcasting in action)

```python
# stack shape: (500, 512, 512)
baseline = np.mean(stack[:10], axis=0)    # Shape: (512, 512)
# Broadcasting: (500, 512, 512) - (512, 512) works because
# (512, 512) is broadcast along axis 0

dff = (stack.astype(np.float32) - baseline) / baseline
# dff shape: (500, 512, 512), every pixel is (F - F0) / F0
```

---

## 9. Aggregation and Statistics

### Basic statistics

```python
# Global statistics
np.mean(trace)           # Mean (average)
np.std(trace)            # Standard deviation
np.var(trace)            # Variance
np.median(trace)         # Median
np.min(trace)            # Minimum
np.max(trace)            # Maximum
np.sum(trace)            # Sum
np.ptp(trace)            # Peak-to-peak (max - min)
```

### Statistics along an axis

The `axis` parameter controls which dimension is collapsed:

```python
# stack shape: (500, 512, 512) = (frames, rows, cols)

# Mean projection (average across frames → one image)
mean_proj = np.mean(stack, axis=0)           # Shape: (512, 512)

# Max projection (brightest pixel across frames)
max_proj = np.max(stack, axis=0)             # Shape: (512, 512)

# Standard deviation projection (flickering pixels)
std_proj = np.std(stack, axis=0)             # Shape: (512, 512)

# Mean intensity per frame (one value per frame → a trace)
mean_trace = np.mean(stack, axis=(1, 2))     # Shape: (500,)

# Mean across multiple axes at once
frame_means = np.mean(stack, axis=(1, 2))    # Mean of each frame
```

### Index of extremes

```python
idx_max = np.argmax(trace)      # Index of the maximum value
idx_min = np.argmin(trace)      # Index of the minimum value

# For multi-dimensional arrays
idx_flat = np.argmax(image)
row, col = np.unravel_index(idx_flat, image.shape)
print(f"Brightest pixel at row={row}, col={col}")
```

### Percentiles and histograms

```python
# Percentiles
p5, p95 = np.percentile(image, [5, 95])
print(f"5th-95th percentile range: {p5:.0f} -- {p95:.0f}")

# Histogram
counts, bin_edges = np.histogram(image, bins=256, range=(0, 65535))

# Cumulative sum (useful for normalisation)
cumulative = np.cumsum(trace)
```

### Running statistics

```python
# Cumulative mean
cumulative_mean = np.cumsum(trace) / np.arange(1, len(trace) + 1)

# Rolling mean (simple moving average)
def rolling_mean(data, window):
    """Compute a rolling mean using a convolution."""
    kernel = np.ones(window) / window
    return np.convolve(data, kernel, mode='valid')

smoothed = rolling_mean(trace, window=10)
```

---

## 10. Linear Algebra

NumPy provides the `np.linalg` submodule for linear algebra operations, useful for fitting, PCA, and other analyses.

### Basic operations

```python
# Dot product
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
dot = np.dot(a, b)              # 32
dot = a @ b                     # Same thing (Python 3.5+)

# Matrix multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B                       # Matrix multiply (2×2 @ 2×2 → 2×2)

# Inverse and determinant
A_inv = np.linalg.inv(A)
det = np.linalg.det(A)
```

### Eigenvalues and eigenvectors

```python
eigenvalues, eigenvectors = np.linalg.eig(covariance_matrix)

# For symmetric matrices (e.g. covariance), use eigh (faster, guaranteed real)
eigenvalues, eigenvectors = np.linalg.eigh(covariance_matrix)
```

### Solving linear systems

```python
# Solve Ax = b
A = np.array([[2, 1], [1, 3]])
b = np.array([5, 7])
x = np.linalg.solve(A, b)      # x = [1.4, 2.2]
```

### Singular Value Decomposition (SVD)

Useful for noise reduction and dimensionality reduction of image stacks:

```python
# Reshape stack to 2D: (n_frames, n_pixels)
n_frames, n_rows, n_cols = stack.shape
data_2d = stack.reshape(n_frames, -1).astype(np.float64)

# Centre the data
data_centred = data_2d - data_2d.mean(axis=0)

# SVD
U, S, Vt = np.linalg.svd(data_centred, full_matrices=False)

# Keep only the first k components (denoise)
k = 10
denoised_2d = (U[:, :k] * S[:k]) @ Vt[:k, :]
denoised_stack = (denoised_2d + data_2d.mean(axis=0)).reshape(stack.shape)
```

---

## 11. Random Number Generation

NumPy's random module is useful for simulations, Monte Carlo analysis, and generating test data.

### Modern API (NumPy ≥ 1.17)

```python
rng = np.random.default_rng(seed=42)      # Reproducible results

# Uniform random values
uniform = rng.random((512, 512))            # Values in [0.0, 1.0)
integers = rng.integers(0, 256, size=(512, 512))  # Random uint8 image

# Normal (Gaussian) distribution
noise = rng.normal(loc=0, scale=10, size=(512, 512))

# Poisson distribution (photon noise model)
photon_image = rng.poisson(lam=100, size=(512, 512))

# Shuffle and choice
indices = np.arange(100)
rng.shuffle(indices)                        # In-place shuffle
subset = rng.choice(indices, size=20, replace=False)  # Random sample
```

### Simulating microscopy noise

```python
def simulate_noisy_image(signal, read_noise_std=5, gain=1.0, rng=None):
    """Add realistic camera noise to a signal image.

    Parameters
    ----------
    signal       : ndarray --- expected photon counts per pixel
    read_noise_std : float --- read noise standard deviation (electrons)
    gain         : float --- electrons per ADU
    rng          : numpy Generator or None

    Returns
    -------
    noisy_image  : ndarray (uint16)
    """
    if rng is None:
        rng = np.random.default_rng()
    # Poisson shot noise (photon statistics)
    photons = rng.poisson(signal)
    # Gaussian read noise
    read = rng.normal(0, read_noise_std, size=signal.shape)
    # Convert to ADU
    adu = (photons + read) / gain
    return np.clip(adu, 0, 65535).astype(np.uint16)
```

---

## 12. Polynomial Fitting and Interpolation

### Polynomial fitting

```python
# Fit a straight line: y = mx + b
x = np.arange(100)
y = trace[:100]
coeffs = np.polyfit(x, y, deg=1)     # [slope, intercept]
fit_line = np.polyval(coeffs, x)

# Fit a quadratic: y = ax² + bx + c
coeffs2 = np.polyfit(x, y, deg=2)

# Use polyfit for photobleaching correction
frames = np.arange(len(trace))
bleach_coeffs = np.polyfit(frames, trace, deg=2)
bleach_curve = np.polyval(bleach_coeffs, frames)
corrected = trace / bleach_curve * bleach_curve[0]
```

### Interpolation

```python
# Linear interpolation
xp = np.array([0, 1, 2, 3, 4])       # Known x values
fp = np.array([0, 0.8, 1.0, 0.4, 0])  # Known y values
x_new = np.linspace(0, 4, 100)
y_new = np.interp(x_new, xp, fp)      # Interpolated values
```

---

## 13. Fourier Transforms

Fourier transforms decompose signals into frequency components --- useful for filtering and frequency analysis of calcium traces.

### 1D FFT (time traces)

```python
# Compute the power spectrum of a calcium trace
n = len(trace)
dt = 1.0 / fps                                 # Sample interval (seconds)
freq = np.fft.rfftfreq(n, d=dt)               # Frequency axis (Hz)
fft_vals = np.fft.rfft(trace - trace.mean())   # FFT of mean-subtracted trace
power = np.abs(fft_vals)**2                    # Power spectrum

# Plot
import matplotlib.pyplot as plt
plt.plot(freq, power)
plt.xlabel("Frequency (Hz)")
plt.ylabel("Power")
plt.title("Power Spectrum of Calcium Trace")
plt.show()
```

### 2D FFT (images)

```python
# Compute 2D FFT of an image
fft_2d = np.fft.fft2(image)
fft_shifted = np.fft.fftshift(fft_2d)         # Centre the zero-frequency
magnitude = np.log1p(np.abs(fft_shifted))      # Log scale for display
```

---

## 14. Sorting, Searching, and Counting

```python
# Sorting
sorted_vals = np.sort(data)                    # Returns sorted copy
sort_indices = np.argsort(data)                # Indices that would sort

# Searching
idx = np.searchsorted(sorted_vals, target)     # Binary search

# Unique values and counts
unique_vals, counts = np.unique(labels, return_counts=True)
print(dict(zip(unique_vals, counts)))          # {0: 250000, 1: 12045, 2: 350}

# Count non-zero elements
n_signal = np.count_nonzero(mask)
```

---

## 15. File Input/Output

### NumPy's native formats

```python
# Save a single array (.npy --- fast, compact, preserves dtype)
np.save("trace.npy", trace)
loaded = np.load("trace.npy")

# Save multiple arrays (.npz --- like a zip of .npy files)
np.savez("results.npz", time=time, dff=dff, peaks=peak_indices)
data = np.load("results.npz")
print(data["time"])
print(data["dff"])

# Compressed version (smaller files, slower to read)
np.savez_compressed("results.npz", time=time, dff=dff)
```

### Text files (CSV)

```python
# Save to CSV
np.savetxt("trace.csv", trace, delimiter=",", header="intensity", comments="")

# Save 2D data
output = np.column_stack([time, dff])
np.savetxt("trace.csv", output, delimiter=",",
           header="time_s,dff", comments="", fmt="%.6f")

# Load from CSV
data = np.loadtxt("trace.csv", delimiter=",", skiprows=1)
# Or with automatic delimiter detection:
data = np.genfromtxt("trace.csv", delimiter=",", skip_header=1, names=True)
```

---

## 16. Memory Layout and Performance

### C-order vs Fortran-order

NumPy arrays can be stored in row-major (C, default) or column-major (Fortran) order. This affects performance when iterating over axes.

```python
# Check memory layout
print(stack.flags)
# C_CONTIGUOUS : True    ← row-major (default)
# F_CONTIGUOUS : False

# For a (500, 512, 512) C-order stack:
# Iterating over axis 0 (frames) is fastest
# Accessing stack[t, :, :] reads contiguous memory
```

### Avoiding unnecessary copies

```python
# Slicing returns a view (no copy, fast)
roi = stack[:, 200:300, 200:300]    # View into original memory

# These operations create copies (slower, more memory):
filtered = stack[stack > 100]        # Boolean indexing always copies
flipped = stack[:, ::-1, :]          # Reversing creates a copy on some operations
transposed = stack.T.copy()          # Explicit copy of a transposed view
```

### Vectorise instead of looping

```python
# SLOW: Python loop over pixels
result = np.empty_like(image, dtype=float)
for y in range(image.shape[0]):
    for x in range(image.shape[1]):
        result[y, x] = image[y, x] / background[y, x]

# FAST: vectorised (100-1000× faster)
result = image.astype(float) / background
```

---

## 17. Structured Arrays and Record Arrays

Structured arrays let you store heterogeneous data (like a table) in a single array. Useful for localisation data.

```python
# Define a structured dtype for localisations
loc_dtype = np.dtype([
    ('frame', np.int32),
    ('x', np.float64),
    ('y', np.float64),
    ('intensity', np.float64),
    ('sigma', np.float64),
])

# Create a structured array
locs = np.zeros(1000, dtype=loc_dtype)
locs['frame'][0] = 1
locs['x'][0] = 256.3
locs['y'][0] = 128.7

# Access columns by name
all_x = locs['x']
all_y = locs['y']

# Filter
bright = locs[locs['intensity'] > 500]
```

For most tabular data, pandas DataFrames (see the pandas companion manual) are more convenient. Structured arrays are useful when you need NumPy-level performance on very large datasets.

---

## 18. Common Pitfalls and Debugging

### Integer overflow

```python
# Problem: uint16 wraps around silently
a = np.uint16(60000)
b = np.uint16(60000)
print(a + b)    # 54464 (WRONG --- overflow)

# Solution: upcast before arithmetic
print(int(a) + int(b))                    # 120000
print(a.astype(np.int64) + b.astype(np.int64))  # 120000
```

### Division by zero

```python
# Problem: division by zero gives inf or nan
baseline = np.zeros(10)
dff = trace / baseline    # Contains inf and nan

# Solution: use np.where or add a small epsilon
dff = np.where(baseline > 0, trace / baseline, 0.0)
# Or:
dff = trace / (baseline + 1e-10)
```

### Shape mismatches

```python
# Problem: shapes are incompatible for broadcasting
a = np.zeros((500, 512, 512))
b = np.zeros((500, 512))
c = a - b    # ValueError: operands could not be broadcast together

# Solution: add a dimension
c = a - b[:, :, np.newaxis]   # b becomes (500, 512, 1), broadcasts correctly
```

### Modifying a view unintentionally

```python
# Problem: slicing returns a view, not a copy
roi = image[100:200, 100:200]
roi[:] = 0    # This modifies image too!

# Solution: use .copy()
roi = image[100:200, 100:200].copy()
roi[:] = 0    # image is unchanged
```

### Floating-point comparison

```python
# Problem: floating-point numbers are not exact
0.1 + 0.2 == 0.3    # False!

# Solution: use np.isclose or np.allclose
np.isclose(0.1 + 0.2, 0.3)           # True
np.allclose(array_a, array_b, atol=1e-8)  # True if all elements are close
```

---

## 19. Practical Recipes for Microscopy

### Mean, max, and standard deviation projections

```python
mean_proj = np.mean(stack, axis=0)    # Average intensity
max_proj  = np.max(stack, axis=0)     # Brightest pixel across time
std_proj  = np.std(stack, axis=0)     # Temporal variability (active regions)
min_proj  = np.min(stack, axis=0)     # Dimmest pixel (background estimate)
```

### Background subtraction (rolling ball approximation)

```python
from scipy.ndimage import uniform_filter

def subtract_background(image, radius=50):
    """Simple background subtraction using a large uniform filter."""
    background = uniform_filter(image.astype(np.float64), size=radius)
    return np.clip(image.astype(np.float64) - background, 0, None)
```

### Photobleaching correction

```python
def correct_bleaching(trace, method='ratio'):
    """Correct photobleaching by fitting and dividing by an exponential."""
    frames = np.arange(len(trace))
    if method == 'ratio':
        # Fit a line to the log of the trace
        log_trace = np.log(trace + 1)
        coeffs = np.polyfit(frames, log_trace, 1)
        bleach_curve = np.exp(np.polyval(coeffs, frames))
        return trace / bleach_curve * bleach_curve[0]
    elif method == 'polynomial':
        coeffs = np.polyfit(frames, trace, 2)
        bleach_curve = np.polyval(coeffs, frames)
        return trace / bleach_curve * bleach_curve[0]
```

### Compute MSD from trajectories

```python
def compute_msd(xy, dt, max_lag=None):
    """Compute mean squared displacement for a single 2D trajectory.

    Parameters
    ----------
    xy      : ndarray, shape (N, 2) --- x, y positions in micrometres
    dt      : float --- frame interval in seconds
    max_lag : int or None --- maximum lag in frames (default: N//4)

    Returns
    -------
    lags : 1D array of lag times (s)
    msd  : 1D array of MSD values (um²)
    """
    n = len(xy)
    if max_lag is None:
        max_lag = n // 4
    msd = np.zeros(max_lag)
    for lag in range(1, max_lag + 1):
        displacements = xy[lag:] - xy[:-lag]
        sq_disp = np.sum(displacements**2, axis=1)
        msd[lag - 1] = np.mean(sq_disp)
    lags = np.arange(1, max_lag + 1) * dt
    return lags, msd
```

### Colocalization: Pearson correlation coefficient

```python
def pearson_coloc(channel_a, channel_b, mask=None):
    """Compute Pearson correlation between two channels.

    Parameters
    ----------
    channel_a, channel_b : 2D arrays (same shape)
    mask : optional boolean mask (only analyse True pixels)

    Returns
    -------
    r : float, Pearson correlation coefficient (-1 to +1)
    """
    a = channel_a.astype(np.float64).ravel()
    b = channel_b.astype(np.float64).ravel()
    if mask is not None:
        m = mask.ravel()
        a, b = a[m], b[m]
    a_centred = a - a.mean()
    b_centred = b - b.mean()
    numerator = np.sum(a_centred * b_centred)
    denominator = np.sqrt(np.sum(a_centred**2) * np.sum(b_centred**2))
    return numerator / denominator if denominator > 0 else 0.0
```

---

## 20. Quick Reference

### Essential imports

```python
import numpy as np
```

### Array creation

| Function | Result |
|---|---|
| `np.array([1,2,3])` | Array from list |
| `np.zeros((512,512))` | All zeros |
| `np.ones((512,512))` | All ones |
| `np.full((512,512), 100)` | All same value |
| `np.arange(0, 500)` | Integer range |
| `np.linspace(0, 50, 500)` | Evenly spaced floats |
| `np.zeros_like(arr)` | Same shape/dtype, all zeros |
| `np.empty_like(arr)` | Same shape/dtype, uninitialised |
| `np.eye(N)` | N×N identity matrix |

### Array properties

| Property | Returns |
|---|---|
| `arr.shape` | Dimensions tuple |
| `arr.dtype` | Element data type |
| `arr.ndim` | Number of dimensions |
| `arr.size` | Total elements |
| `arr.nbytes` | Memory in bytes |

### Statistics

| Function | What it computes |
|---|---|
| `np.mean(arr, axis=0)` | Mean along axis |
| `np.std(arr)` | Standard deviation |
| `np.median(arr)` | Median |
| `np.min(arr)` / `np.max(arr)` | Min / Max |
| `np.argmin(arr)` / `np.argmax(arr)` | Index of min / max |
| `np.percentile(arr, [5, 95])` | Percentiles |
| `np.sum(arr)` | Sum |
| `np.cumsum(arr)` | Cumulative sum |

### Projection cheatsheet (3D stacks)

| Operation | Code | Output shape |
|---|---|---|
| Mean projection | `np.mean(stack, axis=0)` | (Y, X) |
| Max projection | `np.max(stack, axis=0)` | (Y, X) |
| Std projection | `np.std(stack, axis=0)` | (Y, X) |
| Mean trace | `np.mean(stack, axis=(1,2))` | (T,) |

### File I/O

| Task | Code |
|---|---|
| Save one array | `np.save("file.npy", arr)` |
| Load one array | `np.load("file.npy")` |
| Save multiple | `np.savez("file.npz", a=arr1, b=arr2)` |
| Save to CSV | `np.savetxt("file.csv", arr, delimiter=",")` |
| Load from CSV | `np.loadtxt("file.csv", delimiter=",")` |

---

*This manual was developed for the PIEZO1 research group as a companion to the Python Manual. For questions or suggestions, contact george.dickinson@gmail.com.*
