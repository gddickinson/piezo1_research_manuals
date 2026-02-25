# SciPy Manual for Biology Researchers

**A Companion to the Python Manual**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

1. [Introduction: What is SciPy?](#1-introduction-what-is-scipy)
2. [Signal Processing (scipy.signal)](#2-signal-processing-scipysignal)
3. [Smoothing and Filtering Traces](#3-smoothing-and-filtering-traces)
4. [Peak Detection](#4-peak-detection)
5. [Image Filtering (scipy.ndimage)](#5-image-filtering-scipyndimage)
6. [Morphological Operations](#6-morphological-operations)
7. [Connected Component Labelling](#7-connected-component-labelling)
8. [Statistics (scipy.stats)](#8-statistics-scipystats)
9. [Statistical Tests for Biology](#9-statistical-tests-for-biology)
10. [Curve Fitting and Optimisation](#10-curve-fitting-and-optimisation)
11. [Interpolation (scipy.interpolate)](#11-interpolation-scipyinterpolate)
12. [Spatial Analysis (scipy.spatial)](#12-spatial-analysis-scipyspatial)
13. [Sparse Matrices (scipy.sparse)](#13-sparse-matrices-scipysparse)
14. [Integration (scipy.integrate)](#14-integration-scipyintegrate)
15. [Practical Recipes for Microscopy](#15-practical-recipes-for-microscopy)
16. [Quick Reference](#16-quick-reference)

---

## 1. Introduction: What is SciPy?

SciPy (Scientific Python) is a collection of algorithms and functions built on top of NumPy. While NumPy provides the array data structure and basic operations, SciPy adds the higher-level scientific tools: signal processing, statistics, optimisation, image filtering, interpolation, and more.

### SciPy submodules you will use most

| Submodule | Purpose | Typical use in microscopy |
|---|---|---|
| `scipy.signal` | Signal processing | Filtering calcium traces, detecting peaks |
| `scipy.ndimage` | N-dimensional image processing | Gaussian blur, median filter, labelling objects |
| `scipy.stats` | Statistics | t-tests, ANOVA, distributions, normality tests |
| `scipy.optimize` | Curve fitting, minimisation | Fitting exponentials, Gaussians, dose-response |
| `scipy.interpolate` | Interpolation | Resampling traces, filling gaps in data |
| `scipy.spatial` | Spatial algorithms | Nearest-neighbour distances, Voronoi tessellation |
| `scipy.integrate` | Numerical integration | Area under curve, solving ODEs |

### Standard imports

```python
from scipy import signal
from scipy import ndimage
from scipy import stats
from scipy.optimize import curve_fit
from scipy.interpolate import interp1d
from scipy.spatial import KDTree
```

---

## 2. Signal Processing (scipy.signal)

The `scipy.signal` module provides tools for filtering, spectral analysis, and other signal processing tasks. In calcium imaging, your fluorescence traces are 1D signals that benefit from these techniques.

### Designing filters

```python
from scipy import signal

# Low-pass Butterworth filter (remove high-frequency noise)
fps = 10.0
nyquist = fps / 2.0
cutoff_hz = 1.0                          # Remove frequencies above 1 Hz
b, a = signal.butter(N=3, Wn=cutoff_hz / nyquist, btype='low')
filtered_trace = signal.filtfilt(b, a, trace)

# Band-pass filter (keep 0.1-2 Hz, typical calcium transient range)
low = 0.1 / nyquist
high = 2.0 / nyquist
b, a = signal.butter(N=3, Wn=[low, high], btype='band')
bandpassed = signal.filtfilt(b, a, trace)
```

### filtfilt vs lfilter

| Function | Phase distortion | Causality | Use when |
|---|---|---|---|
| `signal.filtfilt` | None (zero-phase) | Non-causal (uses future data) | Post-processing recorded data |
| `signal.lfilter` | Introduces phase shift | Causal (real-time compatible) | Simulating real-time processing |

**Rule of thumb:** Always use `filtfilt` for offline analysis of microscopy data. It applies the filter forward and backward, cancelling any phase shift.

### Convolution

```python
# Smooth a trace with a moving average kernel
window = 5
kernel = np.ones(window) / window
smoothed = signal.convolve(trace, kernel, mode='same')

# Convolve with a custom kernel (e.g. derivative)
derivative_kernel = np.array([-1, 0, 1]) / 2.0
first_derivative = signal.convolve(trace, derivative_kernel, mode='same')
```

---

## 3. Smoothing and Filtering Traces

### Savitzky-Golay filter

The Savitzky-Golay filter fits a polynomial to a sliding window. It smooths the data while preserving features like peak shape better than a moving average.

```python
# Savitzky-Golay: window_length must be odd, polyorder < window_length
smoothed = signal.savgol_filter(trace, window_length=11, polyorder=3)

# Also get the derivative (useful for detecting calcium transient onset)
derivative = signal.savgol_filter(trace, window_length=11, polyorder=3, deriv=1)
```

### Comparison of smoothing methods

```python
import numpy as np
from scipy import signal

# Raw noisy trace (simulate)
rng = np.random.default_rng(42)
t = np.linspace(0, 10, 1000)
clean = np.sin(2 * np.pi * 0.5 * t)
noisy = clean + rng.normal(0, 0.3, len(t))

# Method 1: Moving average
kernel = np.ones(20) / 20
ma = np.convolve(noisy, kernel, mode='same')

# Method 2: Savitzky-Golay
sg = signal.savgol_filter(noisy, window_length=21, polyorder=3)

# Method 3: Butterworth low-pass
b, a = signal.butter(3, 2.0 / 50.0, btype='low')    # 2 Hz cutoff at 100 Hz
butter = signal.filtfilt(b, a, noisy)

# Method 4: Median filter (good for spike removal)
med = signal.medfilt(noisy, kernel_size=11)
```

| Method | Preserves peaks? | Removes spikes? | Phase shift? |
|---|---|---|---|
| Moving average | Blunts them | No | With `convolve` (yes); with `filtfilt` (no) |
| Savitzky-Golay | Yes (well) | No | No |
| Butterworth (filtfilt) | Yes | No | No |
| Median filter | Yes | Yes (best for this) | No |

### Detrending

```python
# Remove a linear trend (useful for slow baseline drift)
detrended = signal.detrend(trace, type='linear')

# Remove a constant offset (subtract the mean)
zero_mean = signal.detrend(trace, type='constant')
```

---

## 4. Peak Detection

Peak detection is essential for counting and characterising calcium transients in fluorescence traces.

### Basic peak detection with find_peaks

```python
from scipy.signal import find_peaks

# Find all peaks above a height threshold
peaks, properties = find_peaks(dff_trace, height=0.05)

# peaks: array of indices where peaks occur
# properties: dictionary with info about each peak
print(f"Number of peaks: {len(peaks)}")
print(f"Peak heights: {properties['peak_heights']}")
```

### Tuning peak detection parameters

```python
peaks, props = find_peaks(
    dff_trace,
    height=0.05,          # Minimum peak height (dF/F units)
    distance=20,          # Minimum distance between peaks (in samples)
    prominence=0.03,      # How much the peak stands out from baseline
    width=5,              # Minimum peak width (in samples)
)

# Extract peak properties
peak_times = time[peaks]
peak_heights = props['peak_heights']
peak_widths = props['widths']         # Width at half-prominence
peak_prominences = props['prominences']

# Convert width from samples to seconds
peak_widths_sec = peak_widths / fps
```

### Parameter guide for calcium transients

| Parameter | What it controls | Typical value (calcium imaging) |
|---|---|---|
| `height` | Minimum peak amplitude | 0.05--0.2 (for dF/F traces) |
| `distance` | Minimum frames between peaks | `int(fps * 2)` (2 seconds) |
| `prominence` | How much peak rises above surrounding baseline | 0.02--0.1 |
| `width` | Minimum peak width in frames | `int(fps * 0.5)` (0.5 seconds) |

### Measuring peak properties

```python
from scipy.signal import peak_prominences, peak_widths

# Prominences: how much each peak rises above the surrounding baseline
prominences, left_bases, right_bases = peak_prominences(dff_trace, peaks)

# Widths: full width at half-maximum (FWHM)
widths, width_heights, left_ips, right_ips = peak_widths(
    dff_trace, peaks, rel_height=0.5    # 0.5 = half-maximum
)
```

---

## 5. Image Filtering (scipy.ndimage)

The `scipy.ndimage` module provides N-dimensional image filtering. These functions work directly on NumPy arrays (your microscopy images).

### Gaussian blur

```python
from scipy import ndimage

# 2D Gaussian blur
sigma = 2.0      # Standard deviation in pixels
blurred = ndimage.gaussian_filter(image, sigma=sigma)

# Blur a 3D stack (spatial only, not temporal)
blurred_stack = ndimage.gaussian_filter(stack, sigma=[0, 2, 2])
# sigma=[0, 2, 2] means: no blur along time axis, 2-pixel blur in y and x
```

### Other spatial filters

```python
# Uniform (box) filter --- simple averaging
averaged = ndimage.uniform_filter(image, size=5)    # 5×5 box

# Median filter --- good for salt-and-pepper noise
cleaned = ndimage.median_filter(image, size=3)

# Maximum and minimum filters (dilation/erosion)
dilated = ndimage.maximum_filter(image, size=5)
eroded  = ndimage.minimum_filter(image, size=5)

# Laplacian (edge detection / second derivative)
laplacian = ndimage.laplace(image.astype(np.float64))

# Sobel gradient (edge magnitude)
sobel_x = ndimage.sobel(image, axis=1)    # Horizontal edges
sobel_y = ndimage.sobel(image, axis=0)    # Vertical edges
edge_magnitude = np.hypot(sobel_x, sobel_y)
```

### Custom convolution kernels

```python
# Define a custom kernel
sharpen_kernel = np.array([[ 0, -1,  0],
                           [-1,  5, -1],
                           [ 0, -1,  0]])
sharpened = ndimage.convolve(image.astype(np.float64), sharpen_kernel)

# Top-hat filter (subtract smoothed background)
background = ndimage.uniform_filter(image.astype(np.float64), size=50)
tophat = image.astype(np.float64) - background
tophat = np.clip(tophat, 0, None)
```

---

## 6. Morphological Operations

Morphological operations are fundamental for cleaning up binary masks (e.g. after thresholding cell bodies).

```python
from scipy import ndimage

# Create a binary mask by thresholding
threshold = 200
mask = image > threshold

# Structuring element (defines the neighbourhood)
struct = ndimage.generate_binary_structure(2, 1)   # 4-connected
struct8 = ndimage.generate_binary_structure(2, 2)  # 8-connected
disk = np.array([[0,1,1,1,0],
                 [1,1,1,1,1],
                 [1,1,1,1,1],
                 [1,1,1,1,1],
                 [0,1,1,1,0]], dtype=bool)           # Approximate disk

# Erosion: shrink objects (removes small noise)
eroded = ndimage.binary_erosion(mask, structure=struct, iterations=2)

# Dilation: expand objects (fills small holes)
dilated = ndimage.binary_dilation(mask, structure=struct, iterations=2)

# Opening: erosion then dilation (removes small noise, preserves shape)
opened = ndimage.binary_opening(mask, structure=struct, iterations=2)

# Closing: dilation then erosion (fills small holes, preserves shape)
closed = ndimage.binary_closing(mask, structure=struct, iterations=2)

# Fill holes inside objects
filled = ndimage.binary_fill_holes(mask)
```

### When to use each operation

| Operation | Effect | Use for |
|---|---|---|
| Erosion | Shrinks objects | Removing noise dots, separating touching cells |
| Dilation | Grows objects | Connecting nearby fragments |
| Opening | Removes small bright spots | Cleaning a cell mask |
| Closing | Fills small dark holes | Filling holes inside cells |
| Fill holes | Fills enclosed regions | Solid cell masks |

---

## 7. Connected Component Labelling

After thresholding, you often need to identify and measure individual objects (cells, puncta, etc.).

```python
from scipy import ndimage

# Label connected components
labelled, n_objects = ndimage.label(mask)
print(f"Found {n_objects} objects")

# Measure properties of each object
# --- Centre of mass ---
centres = ndimage.center_of_mass(image, labelled, range(1, n_objects + 1))
# Returns list of (row, col) tuples

# --- Sum intensity ---
sums = ndimage.sum(image, labelled, range(1, n_objects + 1))

# --- Mean intensity ---
means = ndimage.mean(image, labelled, range(1, n_objects + 1))

# --- Area (number of pixels) ---
areas = ndimage.sum(np.ones_like(image), labelled, range(1, n_objects + 1))

# --- Bounding box ---
slices = ndimage.find_objects(labelled)
for i, slc in enumerate(slices):
    if slc is not None:
        y_slice, x_slice = slc
        print(f"Object {i+1}: rows {y_slice.start}-{y_slice.stop}, "
              f"cols {x_slice.start}-{x_slice.stop}")
```

### Size filtering

```python
# Remove small objects (fewer than min_size pixels)
min_size = 50
labelled, n = ndimage.label(mask)
areas = ndimage.sum(np.ones_like(mask), labelled, range(1, n + 1))
keep = np.array(range(1, n + 1))[np.array(areas) >= min_size]
cleaned_mask = np.isin(labelled, keep)
```

---

## 8. Statistics (scipy.stats)

The `scipy.stats` module provides probability distributions, statistical tests, and descriptive statistics.

### Descriptive statistics

```python
from scipy import stats

# Comprehensive descriptive stats
result = stats.describe(trace)
print(f"n={result.nobs}, mean={result.mean:.2f}, var={result.variance:.2f}")
print(f"skewness={result.skewness:.2f}, kurtosis={result.kurtosis:.2f}")

# Standard error of the mean
sem = stats.sem(trace)
```

### Probability distributions

SciPy includes over 100 probability distributions. Each has methods for probability density (`pdf`), cumulative distribution (`cdf`), random sampling (`rvs`), and fitting (`fit`).

```python
# Normal distribution
mu, sigma = 100, 15
x = np.linspace(50, 150, 200)
pdf = stats.norm.pdf(x, loc=mu, scale=sigma)

# Fit a normal distribution to data
mu_fit, sigma_fit = stats.norm.fit(data)

# Poisson distribution (photon counts)
photon_pdf = stats.poisson.pmf(np.arange(0, 200), mu=100)
```

### Normality tests

Before using parametric tests (t-test, ANOVA), check whether your data are normally distributed:

```python
# Shapiro-Wilk test (best for n < 5000)
statistic, p_value = stats.shapiro(data)
print(f"Shapiro-Wilk p = {p_value:.4f}")
# p > 0.05 → cannot reject normality

# D'Agostino-Pearson test
statistic, p_value = stats.normaltest(data)

# Kolmogorov-Smirnov test (compare to a specific distribution)
statistic, p_value = stats.kstest(data, 'norm', args=(data.mean(), data.std()))
```

---

## 9. Statistical Tests for Biology

### Comparing two groups

```python
# Independent samples t-test (two groups, normal data, equal variance)
t_stat, p_value = stats.ttest_ind(control_group, treatment_group)

# Welch's t-test (unequal variance --- generally safer)
t_stat, p_value = stats.ttest_ind(control, treatment, equal_var=False)

# Paired t-test (same cells, before/after treatment)
t_stat, p_value = stats.ttest_rel(before, after)

# Mann-Whitney U test (non-parametric alternative to t-test)
u_stat, p_value = stats.mannwhitneyu(control, treatment, alternative='two-sided')

# Wilcoxon signed-rank test (non-parametric paired test)
w_stat, p_value = stats.wilcoxon(before, after)
```

### Comparing multiple groups

```python
# One-way ANOVA (3+ groups, normal data)
f_stat, p_value = stats.f_oneway(group_a, group_b, group_c)

# Kruskal-Wallis test (non-parametric ANOVA)
h_stat, p_value = stats.kruskal(group_a, group_b, group_c)
```

### Correlation

```python
# Pearson correlation (linear relationship, normal data)
r, p_value = stats.pearsonr(x, y)

# Spearman rank correlation (monotonic relationship, non-parametric)
rho, p_value = stats.spearmanr(x, y)

# Kendall's tau (robust rank correlation)
tau, p_value = stats.kendalltau(x, y)
```

### Multiple testing correction

When running multiple statistical tests, you need to correct for multiple comparisons:

```python
from scipy.stats import false_discovery_control

# Benjamini-Hochberg FDR correction
p_values = np.array([0.001, 0.03, 0.04, 0.15, 0.5])
reject = false_discovery_control(p_values, method='bh')
# reject: boolean array, True where the null hypothesis is rejected at alpha=0.05
```

### Which test should I use?

| Scenario | Normal data | Non-normal data |
|---|---|---|
| Two independent groups | `ttest_ind` (Welch's) | `mannwhitneyu` |
| Two paired groups | `ttest_rel` | `wilcoxon` |
| 3+ independent groups | `f_oneway` (ANOVA) | `kruskal` |
| Correlation | `pearsonr` | `spearmanr` |

---

## 10. Curve Fitting and Optimisation

### General curve fitting with curve_fit

`curve_fit` fits any user-defined function to data using non-linear least squares.

```python
from scipy.optimize import curve_fit

# Define the model function
def exponential_decay(t, amplitude, tau, offset):
    """Single exponential decay: A * exp(-t/tau) + offset"""
    return amplitude * np.exp(-t / tau) + offset

# Fit the model to data
popt, pcov = curve_fit(exponential_decay, time, trace,
                       p0=[1000, 5.0, 100])  # Initial guesses

amplitude, tau, offset = popt
perr = np.sqrt(np.diag(pcov))     # Standard errors of parameters
print(f"Amplitude = {amplitude:.1f} ± {perr[0]:.1f}")
print(f"Tau       = {tau:.2f} ± {perr[1]:.2f} s")
print(f"Offset    = {offset:.1f} ± {perr[2]:.1f}")

# Generate the fit curve
fit_curve = exponential_decay(time, *popt)
```

### Common model functions for microscopy

```python
# Gaussian (single-molecule PSF, peak fitting)
def gaussian(x, amplitude, centre, sigma, offset):
    return amplitude * np.exp(-(x - centre)**2 / (2 * sigma**2)) + offset

# Double exponential decay (calcium transient: fast rise, slow decay)
def double_exp(t, a_fast, tau_fast, a_slow, tau_slow, offset):
    return a_fast * np.exp(-t / tau_fast) + a_slow * np.exp(-t / tau_slow) + offset

# Hill equation (dose-response curve)
def hill(concentration, ec50, n, bottom, top):
    return bottom + (top - bottom) / (1 + (ec50 / concentration)**n)

# 2D Gaussian (PSF fitting)
def gaussian_2d(xy, amplitude, x0, y0, sigma_x, sigma_y, offset):
    x, y = xy
    return (amplitude * np.exp(-(x - x0)**2 / (2 * sigma_x**2)
                               -(y - y0)**2 / (2 * sigma_y**2)) + offset)
```

### Fitting with bounds

```python
# Constrain parameters to physically meaningful ranges
popt, pcov = curve_fit(
    exponential_decay, time, trace,
    p0=[1000, 5.0, 100],
    bounds=([0, 0.1, 0],              # Lower bounds
            [np.inf, 100.0, 500])      # Upper bounds
)
```

### Fitting a Gaussian to a fluorescence peak

```python
# Extract a sub-region around a bright spot
spot = image[y0-10:y0+10, x0-10:x0+10].astype(np.float64)
yy, xx = np.mgrid[0:spot.shape[0], 0:spot.shape[1]]

# Fit 2D Gaussian
popt, pcov = curve_fit(
    gaussian_2d,
    (xx.ravel(), yy.ravel()),
    spot.ravel(),
    p0=[spot.max(), spot.shape[1]/2, spot.shape[0]/2, 2, 2, spot.min()]
)
amp, x_centre, y_centre, sx, sy, bg = popt
print(f"Centre: ({x_centre:.2f}, {y_centre:.2f}), sigma: ({sx:.2f}, {sy:.2f})")
```

---

## 11. Interpolation (scipy.interpolate)

### 1D interpolation

```python
from scipy.interpolate import interp1d

# Create an interpolation function
f_linear = interp1d(time, trace, kind='linear')
f_cubic  = interp1d(time, trace, kind='cubic')

# Evaluate at new time points
new_time = np.linspace(time[0], time[-1], 10000)
resampled = f_cubic(new_time)
```

### Interpolation kinds

| Kind | Description | Use for |
|---|---|---|
| `'linear'` | Straight lines between points | Fast, general purpose |
| `'cubic'` | Smooth cubic spline | Resampling traces |
| `'nearest'` | Nearest data point | Categorical/label data |
| `'quadratic'` | Quadratic interpolation | Moderate smoothness |

### 2D interpolation (image resizing)

```python
from scipy.interpolate import RegularGridInterpolator

# Upsample an image by 2×
y_old = np.arange(image.shape[0])
x_old = np.arange(image.shape[1])
interp = RegularGridInterpolator((y_old, x_old), image, method='linear')

y_new = np.linspace(0, image.shape[0] - 1, image.shape[0] * 2)
x_new = np.linspace(0, image.shape[1] - 1, image.shape[1] * 2)
yy, xx = np.meshgrid(y_new, x_new, indexing='ij')
upsampled = interp((yy, xx))
```

---

## 12. Spatial Analysis (scipy.spatial)

### Nearest-neighbour distances

```python
from scipy.spatial import KDTree

# Build a KD-tree from localisation coordinates
coords = np.column_stack([x_coords, y_coords])   # Shape: (N, 2)
tree = KDTree(coords)

# Find nearest-neighbour distance for each point
distances, indices = tree.query(coords, k=2)      # k=2: self + nearest
nn_distances = distances[:, 1]                     # Column 1 = nearest neighbour

print(f"Mean NN distance: {nn_distances.mean():.3f} um")
print(f"Median NN distance: {np.median(nn_distances):.3f} um")
```

### Distance matrices

```python
from scipy.spatial.distance import cdist, pdist, squareform

# Pairwise distances between all points
pairwise = pdist(coords)                           # Condensed form
dist_matrix = squareform(pairwise)                 # Full square matrix

# Distances between two sets of points
dists = cdist(coords_a, coords_b)                  # Shape: (n_a, n_b)
```

### Voronoi tessellation

```python
from scipy.spatial import Voronoi

vor = Voronoi(coords)
# vor.vertices: coordinates of Voronoi vertices
# vor.regions: which vertices define each region
# vor.point_region: which region each input point belongs to
```

### Convex hull

```python
from scipy.spatial import ConvexHull

hull = ConvexHull(coords)
area = hull.volume         # In 2D, .volume gives the area
perimeter = hull.area      # In 2D, .area gives the perimeter
```

---

## 13. Sparse Matrices (scipy.sparse)

Sparse matrices store only non-zero elements. Useful for very large distance matrices or adjacency graphs.

```python
from scipy import sparse

# Create a sparse matrix from a dense one
dense = np.array([[1, 0, 0, 0],
                  [0, 2, 0, 0],
                  [0, 0, 0, 3],
                  [0, 0, 0, 0]])

sp = sparse.csr_matrix(dense)
print(f"Non-zero elements: {sp.nnz}")
print(f"Memory: {sp.data.nbytes} bytes (vs {dense.nbytes} dense)")

# Convert back to dense
back_to_dense = sp.toarray()
```

---

## 14. Integration (scipy.integrate)

### Numerical integration (area under curve)

```python
from scipy import integrate

# Area under a dF/F trace (total calcium response)
area = integrate.trapezoid(dff_trace, x=time)
print(f"Area under curve: {area:.2f} dF/F·s")

# Simpson's rule (more accurate for smooth curves)
area = integrate.simpson(dff_trace, x=time)
```

### Solving ordinary differential equations

```python
from scipy.integrate import solve_ivp

# Example: simple calcium decay model
# dCa/dt = -k * Ca + stimulus(t)
def calcium_model(t, Ca, k, stim_time, stim_amplitude):
    stimulus = stim_amplitude if stim_time < t < stim_time + 0.5 else 0
    return -k * Ca + stimulus

sol = solve_ivp(
    calcium_model,
    t_span=(0, 30),
    y0=[0],                          # Initial [Ca] = 0
    args=(0.5, 5.0, 10.0),          # k, stim_time, stim_amplitude
    t_eval=np.linspace(0, 30, 1000)
)

time = sol.t
calcium = sol.y[0]
```

---

## 15. Practical Recipes for Microscopy

### Complete calcium transient analysis pipeline

```python
import numpy as np
from scipy import signal, stats

def analyse_calcium_trace(trace, fps, baseline_s=5.0):
    """Analyse a calcium imaging trace.

    Returns a dictionary of measured properties.
    """
    time = np.arange(len(trace)) / fps

    # Background-corrected dF/F
    baseline_frames = int(fps * baseline_s)
    f0 = trace[:baseline_frames].mean()
    dff = (trace - f0) / f0

    # Smooth for peak detection
    smoothed = signal.savgol_filter(dff, window_length=int(fps) | 1, polyorder=3)

    # Detect peaks
    peaks, props = signal.find_peaks(
        smoothed,
        height=0.05,
        distance=int(fps * 2),
        prominence=0.03,
    )

    return {
        'time': time,
        'dff': dff,
        'smoothed': smoothed,
        'n_peaks': len(peaks),
        'peak_indices': peaks,
        'peak_times': time[peaks],
        'peak_heights': props.get('peak_heights', []),
        'mean_dff': np.mean(dff),
        'max_dff': np.max(dff),
        'auc': np.trapz(np.clip(dff, 0, None), time),
    }
```

### Fit diffusion coefficient from MSD

```python
from scipy.optimize import curve_fit

def linear(t, D, offset):
    """MSD = 4*D*t + offset for 2D diffusion."""
    return 4 * D * t + offset

# Fit the first few lag points (linear regime)
fit_points = 5
popt, pcov = curve_fit(linear, lags[:fit_points], msd[:fit_points], p0=[0.01, 0])
D = popt[0]
D_err = np.sqrt(pcov[0, 0])
print(f"D = {D:.4f} ± {D_err:.4f} um²/s")
```

### Batch statistical comparison

```python
from scipy import stats

def compare_conditions(data_dict, test='welch'):
    """Compare all pairs of conditions.

    Parameters
    ----------
    data_dict : dict of {name: array}
    test : 'welch', 'mann-whitney', or 'paired-t'

    Returns
    -------
    results : list of dicts
    """
    names = list(data_dict.keys())
    results = []
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            a = data_dict[names[i]]
            b = data_dict[names[j]]
            if test == 'welch':
                stat, p = stats.ttest_ind(a, b, equal_var=False)
            elif test == 'mann-whitney':
                stat, p = stats.mannwhitneyu(a, b, alternative='two-sided')
            elif test == 'paired-t':
                stat, p = stats.ttest_rel(a, b)
            results.append({
                'group_a': names[i],
                'group_b': names[j],
                'statistic': stat,
                'p_value': p,
            })
    return results
```

---

## 16. Quick Reference

### Signal processing

| Task | Code |
|---|---|
| Low-pass filter | `b, a = signal.butter(3, cutoff/nyq); signal.filtfilt(b, a, trace)` |
| Savitzky-Golay smooth | `signal.savgol_filter(trace, window_length=11, polyorder=3)` |
| Find peaks | `peaks, props = signal.find_peaks(trace, height=0.05, distance=20)` |
| Detrend | `signal.detrend(trace, type='linear')` |
| Median filter (1D) | `signal.medfilt(trace, kernel_size=5)` |

### Image filtering (ndimage)

| Task | Code |
|---|---|
| Gaussian blur | `ndimage.gaussian_filter(image, sigma=2)` |
| Median filter | `ndimage.median_filter(image, size=3)` |
| Label objects | `labelled, n = ndimage.label(mask)` |
| Centre of mass | `ndimage.center_of_mass(image, labelled, range(1, n+1))` |
| Fill holes | `ndimage.binary_fill_holes(mask)` |
| Opening | `ndimage.binary_opening(mask, iterations=2)` |

### Statistics

| Task | Code |
|---|---|
| t-test (independent) | `stats.ttest_ind(a, b, equal_var=False)` |
| t-test (paired) | `stats.ttest_rel(before, after)` |
| Mann-Whitney U | `stats.mannwhitneyu(a, b)` |
| ANOVA | `stats.f_oneway(g1, g2, g3)` |
| Pearson correlation | `stats.pearsonr(x, y)` |
| Normality test | `stats.shapiro(data)` |

### Curve fitting

| Task | Code |
|---|---|
| General fit | `popt, pcov = curve_fit(func, x, y, p0=[...])` |
| Fit with bounds | `curve_fit(func, x, y, bounds=([lo], [hi]))` |
| Parameter errors | `perr = np.sqrt(np.diag(pcov))` |

### Integration

| Task | Code |
|---|---|
| Area under curve | `integrate.trapezoid(y, x=x)` |
| Simpson's rule | `integrate.simpson(y, x=x)` |
| Solve ODE | `integrate.solve_ivp(func, t_span, y0)` |

---

*This manual was developed for the PIEZO1 research group as a companion to the Python Manual. For questions or suggestions, contact george.dickinson@gmail.com.*
