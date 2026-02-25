# matplotlib Manual for Biology Researchers

**A Companion to the Python Manual**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

1. [Introduction: What is matplotlib?](#1-introduction-what-is-matplotlib)
2. [The Two Interfaces: pyplot vs Object-Oriented](#2-the-two-interfaces-pyplot-vs-object-oriented)
3. [Line Plots: Fluorescence Traces](#3-line-plots-fluorescence-traces)
4. [Displaying Images](#4-displaying-images)
5. [Subplots and Multi-Panel Figures](#5-subplots-and-multi-panel-figures)
6. [Scatter Plots](#6-scatter-plots)
7. [Bar Charts and Box Plots](#7-bar-charts-and-box-plots)
8. [Histograms and Distributions](#8-histograms-and-distributions)
9. [Heatmaps and Kymographs](#9-heatmaps-and-kymographs)
10. [Colour Maps and Colour Bars](#10-colour-maps-and-colour-bars)
11. [Annotations and Text](#11-annotations-and-text)
12. [Scale Bars and Insets](#12-scale-bars-and-insets)
13. [Legends and Labels](#13-legends-and-labels)
14. [Styling and Customisation](#14-styling-and-customisation)
15. [Saving Publication-Quality Figures](#15-saving-publication-quality-figures)
16. [Animations](#16-animations)
17. [3D Plots](#17-3d-plots)
18. [Interactive Plots](#18-interactive-plots)
19. [Common Pitfalls and Debugging](#19-common-pitfalls-and-debugging)
20. [Practical Recipes for Microscopy](#20-practical-recipes-for-microscopy)
21. [Quick Reference](#21-quick-reference)

---

## 1. Introduction: What is matplotlib?

matplotlib is the standard plotting library in Python. It produces publication-quality figures in a wide range of formats (PNG, PDF, SVG, EPS). Its `pyplot` interface was designed to feel familiar to MATLAB users, and it integrates seamlessly with NumPy arrays.

### Standard import

```python
import matplotlib.pyplot as plt
import numpy as np
```

### The anatomy of a matplotlib figure

```
Figure (the entire canvas)
├── Axes (one panel / subplot)
│   ├── Title
│   ├── X-axis (xlabel, ticks, limits)
│   ├── Y-axis (ylabel, ticks, limits)
│   ├── Plot elements (lines, images, scatter, bars)
│   ├── Legend
│   └── Annotations
├── Axes (another panel)
└── ...
```

A **Figure** is the top-level container. Each **Axes** is a single plot area within the figure. A figure can contain one or many Axes.

---

## 2. The Two Interfaces: pyplot vs Object-Oriented

matplotlib offers two ways to create plots. Both produce the same output.

### pyplot interface (quick and simple)

```python
plt.figure(figsize=(10, 4))
plt.plot(time, trace, color='steelblue')
plt.xlabel("Time (s)")
plt.ylabel("Intensity (AU)")
plt.title("Calcium Trace")
plt.savefig("trace.png", dpi=300)
plt.show()
```

### Object-oriented interface (recommended for complex figures)

```python
fig, ax = plt.subplots(figsize=(10, 4))
ax.plot(time, trace, color='steelblue')
ax.set_xlabel("Time (s)")
ax.set_ylabel("Intensity (AU)")
ax.set_title("Calcium Trace")
fig.savefig("trace.png", dpi=300)
plt.show()
```

**Recommendation:** Use the object-oriented interface (`fig, ax = plt.subplots(...)`) for anything beyond a quick throwaway plot. It is clearer, more explicit, and scales better to multi-panel figures.

---

## 3. Line Plots: Fluorescence Traces

### Basic trace plot

```python
fps = 10.0
time = np.arange(len(trace)) / fps

fig, ax = plt.subplots(figsize=(10, 4))
ax.plot(time, trace, color='steelblue', linewidth=1.5)
ax.set_xlabel("Time (s)")
ax.set_ylabel("Intensity (AU)")
ax.set_title("Cell 1 - Calcium Trace")
plt.tight_layout()
plt.savefig("trace.png", dpi=300)
plt.show()
```

### Multiple traces on one plot

```python
fig, ax = plt.subplots(figsize=(12, 5))

colours = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
for i, (name, dff) in enumerate(traces.items()):
    ax.plot(time, dff, color=colours[i], linewidth=1.2, label=name)

ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.legend(loc='upper right')
plt.tight_layout()
plt.show()
```

### Line styles and markers

```python
ax.plot(time, trace, color='steelblue', linewidth=1.5)              # Solid line
ax.plot(time, trace, color='red', linestyle='--', linewidth=1)      # Dashed
ax.plot(time, trace, color='green', linestyle=':', linewidth=1)     # Dotted
ax.plot(time, trace, 'o-', markersize=3, color='black')             # Line with circles
ax.plot(time, trace, 's', markersize=4, color='orange')             # Squares only (no line)
```

### Common line style codes

| Code | Style |
|---|---|
| `'-'` | Solid line |
| `'--'` | Dashed line |
| `':'` | Dotted line |
| `'-.'` | Dash-dot line |

### Common marker codes

| Code | Marker |
|---|---|
| `'o'` | Circle |
| `'s'` | Square |
| `'^'` | Triangle (up) |
| `'v'` | Triangle (down) |
| `'D'` | Diamond |
| `'+'` | Plus |
| `'x'` | Cross |
| `'.'` | Point (small circle) |

### Formatting the axes

```python
# Set axis limits
ax.set_xlim(0, 50)
ax.set_ylim(-0.1, 1.5)

# Set tick positions and labels
ax.set_xticks([0, 10, 20, 30, 40, 50])
ax.set_yticks([0, 0.5, 1.0, 1.5])

# Font sizes
ax.set_xlabel("Time (s)", fontsize=14)
ax.set_ylabel("dF/F", fontsize=14)
ax.tick_params(labelsize=12)

# Remove top and right spines (cleaner look for publications)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
```

### Shaded regions (e.g. stimulus period, SEM)

```python
# Shaded stimulus period
ax.axvspan(10, 15, alpha=0.2, color='red', label='Stimulus')

# Shaded SEM band
mean_trace = np.mean(all_traces, axis=0)
sem_trace = np.std(all_traces, axis=0) / np.sqrt(all_traces.shape[0])
ax.plot(time, mean_trace, color='steelblue')
ax.fill_between(time, mean_trace - sem_trace, mean_trace + sem_trace,
                alpha=0.3, color='steelblue')
```

---

## 4. Displaying Images

### Basic image display

```python
fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(image, cmap='gray')
ax.axis('off')
plt.tight_layout()
plt.show()
```

### Controlling contrast with vmin/vmax

```python
# Auto contrast (stretch to data range)
ax.imshow(image, cmap='gray')

# Manual contrast
ax.imshow(image, cmap='gray', vmin=100, vmax=4000)

# Percentile-based contrast (robust to outliers)
p2, p98 = np.percentile(image, [2, 98])
ax.imshow(image, cmap='gray', vmin=p2, vmax=p98)
```

### Adding a colour bar

```python
fig, ax = plt.subplots(figsize=(8, 6))
im = ax.imshow(image, cmap='viridis')
cbar = fig.colorbar(im, ax=ax, shrink=0.8)
cbar.set_label("Intensity (AU)", fontsize=12)
ax.axis('off')
```

### Overlaying ROIs on an image

```python
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(image, cmap='gray')

# Draw a rectangular ROI
roi = patches.Rectangle((x1, y1), x2 - x1, y2 - y1,
                         linewidth=2, edgecolor='cyan', facecolor='none')
ax.add_patch(roi)

# Draw a circular ROI
circle = patches.Circle((cx, cy), radius=30,
                         linewidth=2, edgecolor='red', facecolor='none')
ax.add_patch(circle)

# Label the ROI
ax.text(x1, y1 - 5, "Cell 1", color='cyan', fontsize=10,
        fontweight='bold')

ax.axis('off')
```

---

## 5. Subplots and Multi-Panel Figures

### Basic grid of subplots

```python
# 1 row, 3 columns
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].imshow(stack[0], cmap='gray')
axes[0].set_title("Frame 0")
axes[0].axis('off')

axes[1].imshow(stack[250], cmap='gray')
axes[1].set_title("Frame 250")
axes[1].axis('off')

axes[2].imshow(stack[-1], cmap='gray')
axes[2].set_title("Last frame")
axes[2].axis('off')

plt.tight_layout()
plt.savefig("frames.png", dpi=300)
```

### 2D grid of subplots

```python
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# axes is a 2D array: axes[row, col]
axes[0, 0].imshow(mean_proj, cmap='gray')
axes[0, 0].set_title("Mean projection")

axes[0, 1].imshow(max_proj, cmap='hot')
axes[0, 1].set_title("Max projection")

# ... fill in the rest
plt.tight_layout()
```

### Mixing plot types (image + trace)

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 5),
                          gridspec_kw={'width_ratios': [1, 2]})

# Left: image with ROI
axes[0].imshow(mean_proj, cmap='gray')
roi_patch = patches.Rectangle((x1, y1), x2-x1, y2-y1,
                               edgecolor='cyan', facecolor='none', lw=2)
axes[0].add_patch(roi_patch)
axes[0].axis('off')
axes[0].set_title("ROI location")

# Right: trace from that ROI
axes[1].plot(time, dff, color='steelblue', lw=1.2)
axes[1].set_xlabel("Time (s)")
axes[1].set_ylabel("dF/F")
axes[1].set_title("Calcium trace")

plt.tight_layout()
```

### GridSpec for complex layouts

```python
from matplotlib.gridspec import GridSpec

fig = plt.figure(figsize=(14, 8))
gs = GridSpec(2, 3, figure=fig, hspace=0.3, wspace=0.3)

# Large image on the left (spanning 2 rows)
ax_image = fig.add_subplot(gs[:, 0])
ax_image.imshow(image, cmap='gray')
ax_image.axis('off')

# Two traces on the right
ax_trace1 = fig.add_subplot(gs[0, 1:])
ax_trace1.plot(time, dff_cell1, color='steelblue')
ax_trace1.set_ylabel("dF/F")
ax_trace1.set_title("Cell 1")

ax_trace2 = fig.add_subplot(gs[1, 1:])
ax_trace2.plot(time, dff_cell2, color='darkorange')
ax_trace2.set_xlabel("Time (s)")
ax_trace2.set_ylabel("dF/F")
ax_trace2.set_title("Cell 2")

plt.savefig("complex_layout.png", dpi=300)
```

### Panel labels (A, B, C for publications)

```python
for i, ax in enumerate(axes.flat):
    label = chr(65 + i)    # 'A', 'B', 'C', ...
    ax.text(-0.1, 1.1, label, transform=ax.transAxes,
            fontsize=16, fontweight='bold', va='top')
```

---

## 6. Scatter Plots

### Basic scatter plot

```python
fig, ax = plt.subplots(figsize=(6, 6))
ax.scatter(x_coords, y_coords, s=1, alpha=0.3, c='white', edgecolors='none')
ax.set_facecolor('black')
ax.set_xlabel("x (µm)")
ax.set_ylabel("y (µm)")
ax.set_aspect('equal')
ax.set_title("PIEZO1 Localisations")
```

### Colour-coded scatter (e.g. by diffusion coefficient)

```python
fig, ax = plt.subplots(figsize=(8, 6))
sc = ax.scatter(x, y, c=d_values, cmap='plasma', s=10, alpha=0.7,
                vmin=0, vmax=0.5)
fig.colorbar(sc, ax=ax, label="D (µm²/s)")
ax.set_xlabel("x (µm)")
ax.set_ylabel("y (µm)")
ax.set_aspect('equal')
```

### Size-coded scatter (e.g. by intensity)

```python
# Size proportional to intensity
sizes = intensities / intensities.max() * 100    # Scale to reasonable marker size
ax.scatter(x, y, s=sizes, alpha=0.5, c='steelblue')
```

---

## 7. Bar Charts and Box Plots

### Grouped bar chart

```python
conditions = ['Control', 'Yoda1', 'GsMTx4']
means = [0.15, 0.42, 0.08]
sems = [0.02, 0.05, 0.01]

fig, ax = plt.subplots(figsize=(6, 5))
bars = ax.bar(conditions, means, yerr=sems, capsize=5,
              color=['#4C72B0', '#DD8452', '#55A868'],
              edgecolor='black', linewidth=0.8)
ax.set_ylabel("Peak dF/F")
ax.set_title("Calcium Response by Condition")
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
```

### Box plots

```python
data = [control_vals, yoda1_vals, gsmtx4_vals]
labels = ['Control', 'Yoda1', 'GsMTx4']

fig, ax = plt.subplots(figsize=(6, 5))
bp = ax.boxplot(data, labels=labels, patch_artist=True,
                showfliers=True, notch=False)

colours = ['#4C72B0', '#DD8452', '#55A868']
for patch, colour in zip(bp['boxes'], colours):
    patch.set_facecolor(colour)
    patch.set_alpha(0.7)

ax.set_ylabel("Peak dF/F")
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
```

### Box plot + individual data points (swarm/strip plot style)

```python
fig, ax = plt.subplots(figsize=(6, 5))

# Box plot
bp = ax.boxplot(data, labels=labels, patch_artist=True, widths=0.5,
                showfliers=False)
for patch, colour in zip(bp['boxes'], colours):
    patch.set_facecolor(colour)
    patch.set_alpha(0.4)

# Overlay individual points with jitter
for i, d in enumerate(data):
    jitter = np.random.default_rng(42).uniform(-0.15, 0.15, len(d))
    ax.scatter(np.full(len(d), i + 1) + jitter, d,
               color=colours[i], alpha=0.6, s=20, edgecolors='none')

ax.set_ylabel("Peak dF/F")
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
```

### Violin plots

```python
fig, ax = plt.subplots(figsize=(6, 5))
vp = ax.violinplot(data, showmeans=True, showmedians=True)

for i, body in enumerate(vp['bodies']):
    body.set_facecolor(colours[i])
    body.set_alpha(0.7)

ax.set_xticks([1, 2, 3])
ax.set_xticklabels(labels)
ax.set_ylabel("Peak dF/F")
```

---

## 8. Histograms and Distributions

### Basic histogram

```python
fig, ax = plt.subplots(figsize=(8, 5))
ax.hist(intensities, bins=100, color='steelblue', edgecolor='black',
        linewidth=0.5, alpha=0.8)
ax.set_xlabel("Intensity (AU)")
ax.set_ylabel("Count")
ax.set_title("Pixel Intensity Distribution")
```

### Overlapping histograms

```python
fig, ax = plt.subplots(figsize=(8, 5))
ax.hist(control_d, bins=50, alpha=0.6, label='Control', color='#4C72B0')
ax.hist(treatment_d, bins=50, alpha=0.6, label='Treatment', color='#DD8452')
ax.set_xlabel("Diffusion coefficient (µm²/s)")
ax.set_ylabel("Count")
ax.legend()
```

### Log-scale histograms

```python
# Log-scale x-axis (for diffusion coefficients spanning orders of magnitude)
bins_log = np.logspace(-4, 0, 50)
ax.hist(d_values, bins=bins_log, color='steelblue')
ax.set_xscale('log')
ax.set_xlabel("D (µm²/s)")

# Log-scale y-axis
ax.set_yscale('log')
```

### Cumulative distribution function (CDF)

```python
sorted_data = np.sort(d_values)
cdf = np.arange(1, len(sorted_data) + 1) / len(sorted_data)

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(sorted_data, cdf, color='steelblue', linewidth=2)
ax.set_xlabel("Diffusion coefficient (µm²/s)")
ax.set_ylabel("Cumulative probability")
ax.set_title("CDF of PIEZO1 Diffusion Coefficients")
```

---

## 9. Heatmaps and Kymographs

### Basic heatmap

```python
fig, ax = plt.subplots(figsize=(8, 6))
im = ax.imshow(correlation_matrix, cmap='coolwarm', vmin=-1, vmax=1)
fig.colorbar(im, ax=ax, label="Pearson r")
ax.set_xticks(range(len(labels)))
ax.set_yticks(range(len(labels)))
ax.set_xticklabels(labels, rotation=45, ha='right')
ax.set_yticklabels(labels)
ax.set_title("Pairwise Correlation")
```

### Kymograph (space-time plot)

A kymograph shows a spatial dimension on one axis and time on the other, commonly used to visualise cell edge movement, protein transport, or calcium wave propagation.

```python
# Extract a line profile over time
# line_trace.shape = (n_frames, line_length)
line_trace = stack[:, 256, :]    # Row 256 over all frames

fig, ax = plt.subplots(figsize=(12, 6))
ax.imshow(line_trace, aspect='auto', cmap='hot',
          extent=[0, line_trace.shape[1] * pixel_size_um,
                  line_trace.shape[0] / fps, 0])
ax.set_xlabel("Position (µm)")
ax.set_ylabel("Time (s)")
ax.set_title("Kymograph - Row 256")
fig.colorbar(ax.images[0], ax=ax, label="Intensity")
```

---

## 10. Colour Maps and Colour Bars

### Recommended colour maps for microscopy

| Colour map | Type | Best for |
|---|---|---|
| `'gray'` | Sequential | Standard grayscale images |
| `'viridis'` | Sequential, perceptually uniform | Quantitative intensity maps |
| `'inferno'` | Sequential, perceptually uniform | Intensity maps (dark background) |
| `'hot'` | Sequential | Fluorescence images, single-channel |
| `'magma'` | Sequential, perceptually uniform | Dark-background presentations |
| `'coolwarm'` | Diverging | Correlation, dF/F (centred on zero) |
| `'RdBu_r'` | Diverging | Difference images |
| `'plasma'` | Sequential, perceptually uniform | Colour-coded scatter plots |

### Fluorescence channel colours

```python
# Green channel (GFP)
from matplotlib.colors import LinearSegmentedColormap
green_cmap = LinearSegmentedColormap.from_list('green', ['black', 'green'])

# Magenta channel (e.g. mCherry)
magenta_cmap = LinearSegmentedColormap.from_list('magenta', ['black', 'magenta'])

# Cyan channel (e.g. CFP)
cyan_cmap = LinearSegmentedColormap.from_list('cyan', ['black', 'cyan'])

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(green_channel, cmap=green_cmap)
axes[0].set_title("GFP")
axes[1].imshow(red_channel, cmap=magenta_cmap)
axes[1].set_title("mCherry")
```

### Colour bar customisation

```python
import matplotlib.ticker as ticker

fig, ax = plt.subplots(figsize=(8, 6))
im = ax.imshow(dff_image, cmap='coolwarm', vmin=-0.5, vmax=0.5)

cbar = fig.colorbar(im, ax=ax, shrink=0.8, pad=0.02)
cbar.set_label("dF/F", fontsize=12)
cbar.ax.tick_params(labelsize=10)
cbar.ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.1f'))
```

---

## 11. Annotations and Text

```python
# Simple text label
ax.text(10, 0.5, "Stimulus", fontsize=12, color='red')

# Arrow pointing to a feature
ax.annotate("Peak", xy=(peak_time, peak_val),
            xytext=(peak_time + 5, peak_val + 0.1),
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=11, color='red')

# Vertical line marking an event
ax.axvline(stimulus_time, color='red', linestyle='--', alpha=0.7, label='Stimulus')

# Horizontal line marking a threshold
ax.axhline(threshold, color='gray', linestyle=':', alpha=0.5, label='Threshold')
```

---

## 12. Scale Bars and Insets

### Scale bar for microscopy images

```python
from matplotlib_scalebar.scalebar import ScaleBar

fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(image, cmap='gray')
ax.axis('off')

# Add scale bar (pixel_size_um is your pixel size in micrometres)
scalebar = ScaleBar(pixel_size_um, 'um', length_fraction=0.2,
                    location='lower right', color='white',
                    box_alpha=0, font_properties={'size': 12})
ax.add_artist(scalebar)
```

If `matplotlib-scalebar` is not installed, you can draw a manual scale bar:

```python
# Manual scale bar
bar_length_um = 10
bar_length_px = bar_length_um / pixel_size_um
bar_y = image.shape[0] - 30
bar_x = image.shape[1] - bar_length_px - 20

ax.plot([bar_x, bar_x + bar_length_px], [bar_y, bar_y],
        color='white', linewidth=3)
ax.text(bar_x + bar_length_px / 2, bar_y - 10, f"{bar_length_um} µm",
        color='white', fontsize=10, ha='center')
```

### Inset axes (zoom view)

```python
from mpl_toolkits.axes_grid1.inset_locator import inset_axes, mark_inset

fig, ax = plt.subplots(figsize=(8, 8))
ax.imshow(image, cmap='gray')

# Create inset axes
axins = inset_axes(ax, width="30%", height="30%", loc='upper right')
axins.imshow(image[200:300, 200:300], cmap='gray')
axins.set_xticks([])
axins.set_yticks([])

# Draw a rectangle on the main image showing the inset region
mark_inset(ax, axins, loc1=2, loc2=4, fc='none', ec='cyan', lw=1.5)
```

---

## 13. Legends and Labels

```python
# Basic legend
ax.legend()                                     # Use labels from plot()
ax.legend(loc='upper right')                    # Specific location
ax.legend(loc='upper left', fontsize=10)
ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')  # Outside the axes

# Legend placement options
# 'best', 'upper right', 'upper left', 'lower right', 'lower left',
# 'right', 'center left', 'center right', 'lower center', 'upper center', 'center'

# Suppress legend for specific lines
ax.plot(time, bg, color='gray', alpha=0.3, label='_nolegend_')

# Multi-column legend
ax.legend(ncol=3, fontsize=9)
```

---

## 14. Styling and Customisation

### Built-in styles

```python
# List available styles
print(plt.style.available)

# Use a style
plt.style.use('seaborn-v0_8-whitegrid')

# Temporary style (within a block)
with plt.style.context('ggplot'):
    fig, ax = plt.subplots()
    ax.plot(time, trace)
```

### Recommended styles for publications

| Style | Description |
|---|---|
| `'default'` | matplotlib defaults |
| `'seaborn-v0_8-whitegrid'` | Clean with subtle grid |
| `'seaborn-v0_8-ticks'` | Clean with tick marks |
| `'ggplot'` | R-like style with coloured background |
| `'bmh'` | Bayesian Methods for Hackers style |

### Custom rcParams

```python
# Set defaults for the entire script
plt.rcParams.update({
    'font.family': 'Arial',
    'font.size': 12,
    'axes.linewidth': 1.2,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'xtick.major.width': 1.0,
    'ytick.major.width': 1.0,
    'figure.dpi': 150,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
})
```

### Consistent colour palette

```python
# Define a lab colour palette
LAB_COLOURS = {
    'control':   '#4C72B0',
    'yoda1':     '#DD8452',
    'gsmtx4':    '#55A868',
    'highlight': '#C44E52',
    'neutral':   '#8C8C8C',
}

# Use consistently across figures
ax.bar('Control', mean_ctrl, color=LAB_COLOURS['control'])
ax.bar('Yoda1',   mean_yoda, color=LAB_COLOURS['yoda1'])
```

---

## 15. Saving Publication-Quality Figures

### File formats

| Format | Extension | Vector? | Best for |
|---|---|---|---|
| PNG | `.png` | No (raster) | Presentations, web, general use |
| PDF | `.pdf` | Yes | Journal submission, LaTeX |
| SVG | `.svg` | Yes | Editing in Illustrator/Inkscape |
| EPS | `.eps` | Yes | Legacy journal submission |
| TIFF | `.tiff` | No (raster) | Some journal requirements |

### Saving

```python
# High-resolution PNG
fig.savefig("figure.png", dpi=300, bbox_inches='tight', facecolor='white')

# Vector PDF (best for journals)
fig.savefig("figure.pdf", bbox_inches='tight')

# SVG (editable in Illustrator)
fig.savefig("figure.svg", bbox_inches='tight')

# Transparent background (for presentations)
fig.savefig("figure.png", dpi=300, transparent=True)
```

### Common journal requirements

| Requirement | How to set it |
|---|---|
| 300 DPI minimum | `dpi=300` |
| Specific width (e.g. 3.5 in for single column) | `figsize=(3.5, 2.5)` |
| Font size ≥ 6 pt | `plt.rcParams['font.size'] = 8` |
| Arial or Helvetica font | `plt.rcParams['font.family'] = 'Arial'` |
| No title (title goes in figure legend) | Do not call `ax.set_title()` |
| White background | `facecolor='white'` |

---

## 16. Animations

### Frame-by-frame animation of a stack

```python
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots(figsize=(6, 6))
im = ax.imshow(stack[0], cmap='gray', vmin=p2, vmax=p98)
ax.axis('off')
title = ax.set_title("Frame 0")

def update(frame):
    im.set_data(stack[frame])
    title.set_text(f"Frame {frame}")
    return im, title

anim = FuncAnimation(fig, update, frames=stack.shape[0], interval=100, blit=True)

# Save as MP4 (requires ffmpeg)
anim.save("stack.mp4", writer='ffmpeg', fps=10, dpi=150)

# Save as GIF (requires Pillow)
anim.save("stack.gif", writer='pillow', fps=10, dpi=100)
```

---

## 17. 3D Plots

### 3D surface (e.g. PSF or intensity landscape)

```python
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

y_grid, x_grid = np.mgrid[0:image.shape[0], 0:image.shape[1]]
ax.plot_surface(x_grid, y_grid, image.astype(float),
                cmap='viridis', alpha=0.8)
ax.set_xlabel("X (pixels)")
ax.set_ylabel("Y (pixels)")
ax.set_zlabel("Intensity")
```

### 3D scatter (localisation data)

```python
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x_coords, y_coords, z_coords, s=1, alpha=0.3)
ax.set_xlabel("x (µm)")
ax.set_ylabel("y (µm)")
ax.set_zlabel("z (µm)")
```

---

## 18. Interactive Plots

### Jupyter notebook integration

```python
# In a Jupyter notebook, use the interactive backend:
%matplotlib widget

# Or for inline static images:
%matplotlib inline
```

### Interactive zoom and pan (standalone scripts)

When you call `plt.show()` in a script, matplotlib opens an interactive window with zoom, pan, and save buttons built in.

```python
fig, ax = plt.subplots()
ax.imshow(image, cmap='gray')
plt.show()     # Opens interactive window
```

---

## 19. Common Pitfalls and Debugging

### Figure not showing

```python
# Problem: plot code runs but nothing appears
# Solution: make sure you call plt.show()
plt.plot(time, trace)
plt.show()        # Required in scripts (not in Jupyter with %matplotlib inline)
```

### Memory leaks with many plots

```python
# Problem: creating plots in a loop eats memory
# WRONG:
for f in files:
    plt.figure()
    plt.plot(data)
    plt.savefig(f"plot_{f}.png")
    # Figure stays in memory!

# RIGHT:
for f in files:
    fig, ax = plt.subplots()
    ax.plot(data)
    fig.savefig(f"plot_{f}.png")
    plt.close(fig)             # Free memory
```

### Image orientation (row 0 at top vs bottom)

```python
# By default, imshow puts row 0 at the TOP (standard for images)
# To put row 0 at the BOTTOM (standard for plots/graphs):
ax.imshow(image, origin='lower')

# For microscopy images, the default (origin='upper') is usually correct
```

### Text overlapping

```python
# Use tight_layout to prevent overlapping labels
plt.tight_layout()

# Or with more control:
plt.subplots_adjust(hspace=0.4, wspace=0.3)
```

---

## 20. Practical Recipes for Microscopy

### Publication figure: image with trace

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.gridspec import GridSpec

def publication_figure(image, time, dff, roi_coords, pixel_size_um,
                       output_path, stimulus_time=None):
    """Create a two-panel figure: image with ROI + dF/F trace."""
    y1, y2, x1, x2 = roi_coords

    fig = plt.figure(figsize=(7, 3.5))
    gs = GridSpec(1, 2, width_ratios=[1, 1.8], wspace=0.35)

    # Panel A: Image
    ax_img = fig.add_subplot(gs[0])
    p2, p98 = np.percentile(image, [2, 98])
    ax_img.imshow(image, cmap='gray', vmin=p2, vmax=p98)
    rect = patches.Rectangle((x1, y1), x2-x1, y2-y1,
                              edgecolor='cyan', facecolor='none', lw=1.5)
    ax_img.add_patch(rect)
    ax_img.axis('off')

    # Scale bar
    bar_um = 10
    bar_px = bar_um / pixel_size_um
    ax_img.plot([10, 10 + bar_px], [image.shape[0] - 15, image.shape[0] - 15],
                color='white', lw=2)
    ax_img.text(10 + bar_px / 2, image.shape[0] - 25, f"{bar_um} µm",
                color='white', fontsize=8, ha='center')

    # Panel B: Trace
    ax_tr = fig.add_subplot(gs[1])
    ax_tr.plot(time, dff, color='steelblue', lw=1)
    if stimulus_time is not None:
        ax_tr.axvline(stimulus_time, color='red', ls='--', alpha=0.5)
    ax_tr.set_xlabel("Time (s)")
    ax_tr.set_ylabel("dF/F")
    ax_tr.spines['top'].set_visible(False)
    ax_tr.spines['right'].set_visible(False)

    # Panel labels
    ax_img.text(-0.05, 1.05, "A", transform=ax_img.transAxes,
                fontsize=14, fontweight='bold')
    ax_tr.text(-0.15, 1.05, "B", transform=ax_tr.transAxes,
               fontsize=14, fontweight='bold')

    fig.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close(fig)
```

### Montage: display multiple frames as a grid

```python
def make_montage(stack, n_cols=5, frames=None, cmap='gray'):
    """Display selected frames as a montage grid."""
    if frames is None:
        n_frames = min(stack.shape[0], n_cols * 4)
        frames = np.linspace(0, stack.shape[0] - 1, n_frames, dtype=int)

    n = len(frames)
    n_rows = int(np.ceil(n / n_cols))

    fig, axes = plt.subplots(n_rows, n_cols, figsize=(2.5 * n_cols, 2.5 * n_rows))
    axes = np.atleast_2d(axes)

    p2, p98 = np.percentile(stack, [2, 98])
    for i, ax in enumerate(axes.flat):
        if i < n:
            ax.imshow(stack[frames[i]], cmap=cmap, vmin=p2, vmax=p98)
            ax.set_title(f"Frame {frames[i]}", fontsize=9)
        ax.axis('off')

    plt.tight_layout()
    return fig
```

---

## 21. Quick Reference

### Essential pattern

```python
fig, ax = plt.subplots(figsize=(width, height))
ax.plot(x, y)                              # or ax.imshow(), ax.scatter(), etc.
ax.set_xlabel("X Label")
ax.set_ylabel("Y Label")
fig.savefig("figure.png", dpi=300, bbox_inches='tight')
plt.close(fig)
```

### Plot types

| Plot type | Code |
|---|---|
| Line plot | `ax.plot(x, y)` |
| Scatter | `ax.scatter(x, y)` |
| Image | `ax.imshow(image, cmap='gray')` |
| Bar chart | `ax.bar(categories, values)` |
| Histogram | `ax.hist(data, bins=50)` |
| Box plot | `ax.boxplot(data_list)` |
| Violin plot | `ax.violinplot(data_list)` |
| Heatmap | `ax.imshow(matrix, cmap='viridis')` |
| Error bars | `ax.errorbar(x, y, yerr=err)` |
| Filled region | `ax.fill_between(x, y1, y2, alpha=0.3)` |

### Axis formatting

| Task | Code |
|---|---|
| Set limits | `ax.set_xlim(0, 50)` |
| Set label | `ax.set_xlabel("Time (s)")` |
| Remove spines | `ax.spines['top'].set_visible(False)` |
| Log scale | `ax.set_xscale('log')` |
| Equal aspect | `ax.set_aspect('equal')` |
| Turn off axis | `ax.axis('off')` |
| Grid | `ax.grid(True, alpha=0.3)` |

### Saving

| Task | Code |
|---|---|
| High-res PNG | `fig.savefig("fig.png", dpi=300, bbox_inches='tight')` |
| Vector PDF | `fig.savefig("fig.pdf", bbox_inches='tight')` |
| Transparent | `fig.savefig("fig.png", transparent=True, dpi=300)` |

---

*This manual was developed for the PIEZO1 research group as a companion to the Python Manual. For questions or suggestions, contact george.dickinson@gmail.com.*
