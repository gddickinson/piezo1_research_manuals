# Jupyter Notebook Manual for Biology Researchers

**A Companion to the Python Manual for Biology Researchers**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why Jupyter Notebooks?](#1-introduction-why-jupyter-notebooks)
2. [Installing and Launching Jupyter](#2-installing-and-launching-jupyter)
3. [The Jupyter Interface](#3-the-jupyter-interface)

**Part II: Working with Notebooks**

4. [Cells: The Building Blocks](#4-cells-the-building-blocks)
5. [Running Code](#5-running-code)
6. [Markdown Cells: Documentation and Notes](#6-markdown-cells-documentation-and-notes)
7. [Keyboard Shortcuts](#7-keyboard-shortcuts)

**Part III: Display, Output, and Visualisation**

8. [Rich Output and Display](#8-rich-output-and-display)
9. [Inline Plotting with matplotlib](#9-inline-plotting-with-matplotlib)
10. [Interactive Widgets](#10-interactive-widgets)
11. [Displaying Images and Microscopy Data](#11-displaying-images-and-microscopy-data)

**Part IV: Notebook Management**

12. [Kernel Management](#12-kernel-management)
13. [Saving, Checkpoints, and Autosave](#13-saving-checkpoints-and-autosave)
14. [Exporting and Sharing Notebooks](#14-exporting-and-sharing-notebooks)
15. [Version Control with Git](#15-version-control-with-git)

**Part V: Magic Commands and Shell Integration**

16. [Magic Commands](#16-magic-commands)
17. [Shell Commands and System Integration](#17-shell-commands-and-system-integration)

**Part VI: JupyterLab**

18. [JupyterLab: The Next-Generation Interface](#18-jupyterlab-the-next-generation-interface)
19. [JupyterLab Extensions](#19-jupyterlab-extensions)

**Part VII: Best Practices for Research**

20. [Notebook Organisation for Reproducible Science](#20-notebook-organisation-for-reproducible-science)
21. [Common Pitfalls and How to Avoid Them](#21-common-pitfalls-and-how-to-avoid-them)
22. [When to Use Notebooks vs. Scripts](#22-when-to-use-notebooks-vs-scripts)

**Part VIII: Practical Examples for PIEZO1 Research**

23. [Exploratory Analysis of ThunderSTORM Data](#23-exploratory-analysis-of-thunderstorm-data)
24. [Calcium Imaging Analysis Notebook](#24-calcium-imaging-analysis-notebook)
25. [Creating a Lab Notebook for an Experiment](#25-creating-a-lab-notebook-for-an-experiment)

**Appendices**

26. [Quick Reference](#26-quick-reference)
27. [Resources for Learning Jupyter](#27-resources-for-learning-jupyter)

---

## 1. Introduction: Why Jupyter Notebooks?

### What is a Jupyter Notebook?

A Jupyter Notebook is an interactive document that combines **live code**, **formatted text**, **equations**, **plots**, and **images** in a single file. You write and run code in small chunks called **cells**, and the output --- whether a number, a table, or a figure --- appears directly below each cell.

The name "Jupyter" comes from three core languages: **Ju**lia, **Py**thon, and **R**, though Python is by far the most common. The project grew out of IPython Notebook (see the companion IPython manual) and is now maintained by Project Jupyter, a non-profit open-source organisation.

Jupyter Notebook files have the extension `.ipynb` (short for "IPython Notebook", reflecting its heritage).

### Why notebooks for biology research?

| Benefit | What it means for you |
|---|---|
| **Code + narrative together** | Document your analysis reasoning alongside the code that implements it |
| **Inline figures** | Plots appear directly below the code that generated them --- no switching windows |
| **Exploratory analysis** | Try things interactively, see results immediately, iterate quickly |
| **Reproducible records** | A notebook is a complete record of what you did, in order, with results |
| **Shareable** | Send a `.ipynb` file to a collaborator, or export to PDF/HTML for a supervisor |
| **Presentations** | Turn analysis notebooks into slide decks for lab meetings |

### The lab notebook analogy

| Physical lab notebook | Jupyter Notebook |
|---|---|
| Written protocol steps | Markdown cells explaining the analysis |
| Handwritten calculations | Code cells performing calculations |
| Taped-in printouts of graphs | Inline matplotlib figures |
| Margin notes and observations | Markdown commentary between code cells |
| Date and experiment ID at the top | Title cell with metadata |

### How this manual relates to the Python manual

This manual assumes you are familiar with Python fundamentals (Parts I--III of the Python manual) and the scientific packages introduced there (NumPy, matplotlib, pandas, tifffile). It focuses specifically on the Jupyter Notebook environment --- how to use it effectively for your research analysis.

---

## 2. Installing and Launching Jupyter

### Installation

If you followed the Anaconda setup in the Python manual, Jupyter is already installed. If not:

```bash
# Inside your conda environment
conda activate microscopy

# Install Jupyter Notebook (classic)
pip install notebook

# Install JupyterLab (modern interface --- recommended)
pip install jupyterlab
```

### Launching Jupyter Notebook (classic)

```bash
# Navigate to your project directory first
cd ~/experiments/piezo1_2025

# Launch --- this opens your browser automatically
jupyter notebook
```

This starts a **local server** on your computer and opens the Jupyter file browser in your default web browser. The URL will be something like `http://localhost:8888`. Despite running in a browser, everything is local --- no data is sent to the internet.

### Launching JupyterLab (recommended)

```bash
jupyter lab
```

JupyterLab is the modern successor to the classic Notebook interface. It provides the same notebook functionality plus a file browser, terminal, text editor, and multi-tab layout. See Section 18 for details.

### Creating a new notebook

1. In the Jupyter file browser, click **New** → **Python 3** (classic) or click the **Python 3** tile under "Notebook" (JupyterLab)
2. A new untitled notebook opens
3. Click the title ("Untitled") at the top to rename it immediately --- use a descriptive name like `2025-03-15_PIEZO1_calcium_analysis.ipynb`

### Stopping Jupyter

- **In the browser:** File → Shut Down (JupyterLab) or click Quit (classic)
- **In the terminal:** Press `Ctrl+C` twice

---

## 3. The Jupyter Interface

### Classic Notebook interface

The classic interface has three main areas:

| Area | Purpose |
|---|---|
| **Menu bar** | File, Edit, View, Cell, Kernel, Help menus |
| **Toolbar** | Buttons for run, stop, restart, cell type selector |
| **Cell area** | The main workspace where you write and run cells |

### Two modes of interaction

Jupyter has two modes, similar to the text editor Vim:

| Mode | How to enter | What it does | Visual cue |
|---|---|---|---|
| **Edit mode** | Press `Enter` or click inside a cell | Type and edit code or text | Green cell border, blinking cursor |
| **Command mode** | Press `Esc` or click outside a cell | Navigate between cells, run cells, change cell type | Blue cell border, no cursor |

Understanding these two modes is essential for using keyboard shortcuts effectively (see Section 7).

---

## 4. Cells: The Building Blocks

A notebook is a sequence of **cells**. Each cell is one of three types:

| Cell type | Purpose | Shortcut (command mode) |
|---|---|---|
| **Code** | Python code that gets executed | `Y` |
| **Markdown** | Formatted text, headings, equations, images | `M` |
| **Raw** | Unformatted text (rarely used) | `R` |

### Code cells

Code cells contain Python code. When you run a code cell, the code is sent to the **kernel** (the Python interpreter running in the background), and the output appears below the cell.

```python
# This is a code cell
import numpy as np
data = np.random.rand(100)
print(f"Mean: {data.mean():.4f}")
print(f"Std:  {data.std():.4f}")
```

Output:
```
Mean: 0.4923
Std:  0.2891
```

The number in square brackets to the left of a code cell (e.g., `In [3]:`) shows the **execution order**. This helps you track which cells have been run and in what sequence.

| Symbol | Meaning |
|---|---|
| `In [ ]:` | Cell has not been run |
| `In [5]:` | Cell was the 5th cell executed |
| `In [*]:` | Cell is currently running |

### Markdown cells

Markdown cells contain formatted text. See Section 6 for a full guide.

### Cell operations

All of these are available from the menu or toolbar, but keyboard shortcuts (Section 7) are much faster:

| Operation | Menu path | Shortcut (command mode) |
|---|---|---|
| Add cell above | Insert → Insert Cell Above | `A` |
| Add cell below | Insert → Insert Cell Below | `B` |
| Delete cell | Edit → Delete Cells | `D, D` (press D twice) |
| Copy cell | Edit → Copy Cells | `C` |
| Paste cell below | Edit → Paste Cells Below | `V` |
| Move cell up | Edit → Move Cell Up | `Ctrl+Shift+↑` (JupyterLab) |
| Move cell down | Edit → Move Cell Down | `Ctrl+Shift+↓` (JupyterLab) |
| Merge cells | Edit → Merge Cell Below | `Shift+M` |

---

## 5. Running Code

### Running cells

| Action | Shortcut | Effect |
|---|---|---|
| Run cell, move to next | `Shift+Enter` | Runs the cell and moves the cursor to the next cell (creates one if at the end) |
| Run cell, stay in place | `Ctrl+Enter` | Runs the cell but keeps the cursor in the same cell |
| Run cell, insert below | `Alt+Enter` | Runs the cell and inserts a new empty cell below |

`Shift+Enter` is the shortcut you will use most often. It creates a natural workflow: write code, run it, see the result, move on.

### Running multiple cells

| Action | Menu path |
|---|---|
| Run all cells | Cell → Run All (classic) or Run → Run All Cells (JupyterLab) |
| Run all above | Cell → Run All Above |
| Run all below | Cell → Run All Below |

### The last expression is displayed automatically

In a code cell, the value of the **last expression** is automatically displayed as output, without needing `print()`:

```python
# This cell displays the DataFrame automatically
import pandas as pd
df = pd.read_csv("localisations.csv")
df.head()
```

This is equivalent to wrapping the last line in `print()` or `display()`, but produces richer output --- DataFrames are rendered as formatted HTML tables, for example.

```python
# To display multiple things, use display() explicitly
from IPython.display import display
display(df.head())
display(df.describe())
```

### Execution order matters

Cells can be run in **any order**, not just top to bottom. This is both a strength (you can re-run a single cell to tweak it) and a danger (you can create hidden state that does not match the visible order).

```python
# Cell 1 (run first)
x = 10

# Cell 2 (run second)
y = x * 2
print(y)   # 20

# If you go back and change Cell 1 to x = 5, Cell 2 still shows 20
# until you re-run it!
```

**Best practice:** Periodically use **Kernel → Restart & Run All** to verify that your notebook runs correctly from top to bottom.

---

## 6. Markdown Cells: Documentation and Notes

Markdown cells use the Markdown formatting language to create structured, readable text. Press `M` in command mode to convert a cell to Markdown, then `Enter` to edit it. Press `Shift+Enter` to render it.

### Headings

```markdown
# Heading 1 (Experiment Title)
## Heading 2 (Section)
### Heading 3 (Subsection)
#### Heading 4 (Detail)
```

### Text formatting

```markdown
**bold text**
*italic text*
`inline code`
~~strikethrough~~
```

### Lists

```markdown
- Bullet point 1
- Bullet point 2
  - Sub-bullet (indent with 2 spaces)

1. Numbered item 1
2. Numbered item 2
```

### Links and images

```markdown
[Link text](https://www.example.com)

![Image alt text](path/to/image.png)

<!-- Link to a local image in the same directory as the notebook -->
![TIRF image](images/piezo1_frame0.png)
```

### Tables

```markdown
| Condition | n | Mean dF/F | SEM |
|---|---|---|---|
| Control | 15 | 0.48 | 0.05 |
| Yoda1 5 µM | 12 | 1.72 | 0.12 |
| Yoda1 10 µM | 10 | 2.31 | 0.18 |
```

### LaTeX equations

Jupyter supports LaTeX for mathematical notation, which is essential for documenting analysis methods.

```markdown
Inline equation: The diffusion coefficient is $D = \frac{\text{MSD}}{4t}$ for 2D.

Display equation:
$$\text{MSD}(\tau) = \langle |r(t + \tau) - r(t)|^2 \rangle = 4D\tau$$

Delta-F over F:
$$\frac{\Delta F}{F_0} = \frac{F(t) - F_0}{F_0}$$
```

### Coloured callout boxes (HTML in Markdown)

```markdown
<div style="background-color: #d4edda; padding: 10px; border-radius: 5px;">
<b>Note:</b> The pixel size for the 100x TIRF objective is 0.108 µm/pixel.
</div>

<div style="background-color: #fff3cd; padding: 10px; border-radius: 5px;">
<b>Warning:</b> Frames 200-210 show stage drift. Exclude from analysis.
</div>
```

### A well-structured experiment header

```markdown
# PIEZO1-HaloTag Diffusion Analysis
## Experiment 2025-03-15 --- hiPSC-derived Endothelial Cells

**Researcher:** Jane Smith
**Microscope:** Nikon Ti2 TIRF, 100x 1.49 NA oil objective
**Camera:** Hamamatsu ORCA-Fusion, 108 nm/pixel
**Laser:** 561 nm, 50 mW
**Frame rate:** 100 fps (10 ms exposure)
**Labelling:** JF549-HaloTag ligand, 100 nM, 30 min

### Conditions
| Condition | Coverslips | Fields of View |
|---|---|---|
| Control | 3 | 9 |
| Yoda1 5 µM | 3 | 9 |

### Analysis Pipeline
1. ThunderSTORM localisation (FIJI)
2. Quality filtering (uncertainty < 30 nm)
3. Trajectory linking (FLIKA, max gap = 2 frames, max distance = 500 nm)
4. MSD calculation and diffusion coefficient fitting
5. Mobile/immobile classification (3 µm path-length cutoff at 5 s)
```

---

## 7. Keyboard Shortcuts

Keyboard shortcuts are essential for working efficiently in Jupyter. All shortcuts below work in **command mode** (press `Esc` first) unless marked as edit mode.

### Most important shortcuts

| Shortcut | Mode | Action |
|---|---|---|
| `Shift+Enter` | Either | Run cell, move to next |
| `Ctrl+Enter` | Either | Run cell, stay in place |
| `Esc` | Edit | Switch to command mode |
| `Enter` | Command | Switch to edit mode |
| `A` | Command | Insert cell above |
| `B` | Command | Insert cell below |
| `D, D` | Command | Delete selected cell |
| `Z` | Command | Undo cell deletion |
| `M` | Command | Convert cell to Markdown |
| `Y` | Command | Convert cell to Code |
| `Ctrl+S` | Either | Save notebook |

### Navigation

| Shortcut | Mode | Action |
|---|---|---|
| `↑` / `↓` | Command | Move between cells |
| `Shift+↑` / `Shift+↓` | Command | Extend cell selection |
| `Ctrl+Home` | Command | Go to first cell |
| `Ctrl+End` | Command | Go to last cell |

### Editing

| Shortcut | Mode | Action |
|---|---|---|
| `Ctrl+Z` | Edit | Undo (within cell) |
| `Ctrl+Shift+Z` | Edit | Redo (within cell) |
| `Ctrl+/` | Edit | Toggle comment on selected lines |
| `Tab` | Edit | Code completion / indent |
| `Shift+Tab` | Edit | Show function signature/docstring |

### View the complete shortcut list

Press `H` in command mode to see all keyboard shortcuts. In JupyterLab, go to Settings → Advanced Settings Editor → Keyboard Shortcuts.

---

## 8. Rich Output and Display

Jupyter can display many types of output beyond plain text.

### DataFrames render as HTML tables

```python
import pandas as pd
df = pd.read_csv("localisations.csv")
df.head()   # Renders as a formatted, scrollable table
```

### Controlling display options

```python
# Show more rows and columns in DataFrame display
pd.set_option("display.max_rows", 100)
pd.set_option("display.max_columns", 20)
pd.set_option("display.float_format", "{:.4f}".format)

# Reset to defaults
pd.reset_option("all")
```

### Displaying multiple outputs

By default, only the last expression in a cell is displayed. To show multiple outputs:

```python
from IPython.display import display

display(df.head())
display(df.describe())
display(df.dtypes)
```

### Displaying HTML, LaTeX, and other rich content

```python
from IPython.display import HTML, Latex, Markdown, Image

# Formatted HTML
display(HTML("<h3 style='color: steelblue;'>Analysis Complete</h3>"))

# LaTeX equation
display(Latex(r"$D = \frac{\text{MSD}}{4\tau} = 0.032 \; \mu m^2/s$"))

# Rendered Markdown
display(Markdown("**Result:** 85% of trajectories classified as *mobile*"))

# Display an image file
display(Image("figures/msd_plot.png", width=500))
```

### Suppressing output

```python
# Semicolons suppress output
fig = plt.figure();

# Or assign to a throwaway variable
_ = df.plot.hist()
```

---

## 9. Inline Plotting with matplotlib

One of the most powerful features of Jupyter is inline plotting --- figures appear directly in the notebook.

### Enabling inline plots

```python
# This is usually automatic in modern Jupyter, but you can be explicit:
%matplotlib inline

# Standard imports
import numpy as np
import matplotlib.pyplot as plt
```

### Basic inline plot

```python
trace = np.random.randn(500).cumsum()
time = np.arange(len(trace)) / 10.0   # 10 fps

plt.figure(figsize=(10, 3))
plt.plot(time, trace, color="steelblue", lw=1)
plt.xlabel("Time (s)")
plt.ylabel("Intensity (AU)")
plt.title("Fluorescence Trace")
plt.tight_layout()
plt.show()
```

The figure appears directly below the cell. No separate window opens.

### Retina / high-DPI figures

On high-resolution displays (Retina MacBooks, 4K monitors), figures can look blurry. Fix this with:

```python
%config InlineBackend.figure_format = "retina"

# Or for vector-quality output:
%config InlineBackend.figure_format = "svg"
```

Put this in the first cell of every notebook, after your imports.

### Interactive matplotlib (zoom, pan)

```python
# Enable interactive plots (replaces inline)
%matplotlib widget

# Now plots have zoom, pan, and save controls
plt.figure(figsize=(8, 4))
plt.plot(time, trace)
plt.show()
```

**Note:** `%matplotlib widget` requires the `ipympl` package: `pip install ipympl`. Use `%matplotlib inline` to switch back to static plots.

### Default figure styling for the notebook

```python
# Set defaults for all figures in this notebook
plt.rcParams.update({
    "figure.figsize":    (8, 4),
    "figure.dpi":        100,
    "font.size":         12,
    "axes.titlesize":    14,
    "axes.labelsize":    12,
    "lines.linewidth":   1.5,
    "savefig.dpi":       300,
    "savefig.bbox":      "tight",
})
```

---

## 10. Interactive Widgets

Jupyter widgets (`ipywidgets`) let you create interactive controls --- sliders, dropdowns, buttons --- that dynamically update outputs. These are incredibly useful for exploring microscopy data.

### Installation

```bash
pip install ipywidgets
```

### Interactive parameter exploration

```python
import ipywidgets as widgets
from IPython.display import display
import numpy as np
import matplotlib.pyplot as plt

@widgets.interact(
    threshold=(0, 1000, 50),
    sigma_min=(50, 200, 10),
    sigma_max=(200, 500, 10),
)
def filter_localisations(threshold=500, sigma_min=100, sigma_max=300):
    """Interactively adjust ThunderSTORM filtering parameters."""
    filtered = ts[
        (ts["intensity [photon]"] > threshold) &
        (ts["sigma [nm]"] > sigma_min) &
        (ts["sigma [nm]"] < sigma_max)
    ]
    print(f"Kept {len(filtered)} / {len(ts)} ({100*len(filtered)/len(ts):.1f}%)")

    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    axes[0].hist(filtered["intensity [photon]"], bins=50, color="steelblue")
    axes[0].set_xlabel("Intensity (photon)")
    axes[0].set_title(f"Intensity (n={len(filtered)})")

    axes[1].hist(filtered["sigma [nm]"], bins=50, color="coral")
    axes[1].set_xlabel("Sigma (nm)")
    axes[1].set_title("PSF Width")

    plt.tight_layout()
    plt.show()
```

### Interactive frame viewer for image stacks

```python
import tifffile

stack = tifffile.imread("calcium_timelapse.tif")

@widgets.interact(frame=(0, stack.shape[0]-1, 1))
def show_frame(frame=0):
    plt.figure(figsize=(6, 6))
    plt.imshow(stack[frame], cmap="gray", vmin=stack.min(), vmax=stack.max())
    plt.title(f"Frame {frame} / {stack.shape[0]-1}")
    plt.colorbar(label="Intensity")
    plt.axis("off")
    plt.tight_layout()
    plt.show()
```

### Dropdown for selecting conditions

```python
@widgets.interact(
    cell_type=widgets.Dropdown(options=["EC", "KC", "NSC"], value="EC"),
    metric=widgets.Dropdown(options=["D", "path_length_um", "n_frames"], value="D"),
)
def plot_by_condition(cell_type, metric):
    subset = df[df["cell_type"] == cell_type]
    subset[metric].plot.hist(bins=30, title=f"{metric} for {cell_type}", figsize=(8, 3))
    plt.tight_layout()
    plt.show()
```

---

## 11. Displaying Images and Microscopy Data

### Displaying TIFF frames

```python
import tifffile
import matplotlib.pyplot as plt

stack = tifffile.imread("piezo1_tirf.tif")

# Single frame
fig, ax = plt.subplots(figsize=(6, 6))
im = ax.imshow(stack[0], cmap="gray")
plt.colorbar(im, ax=ax, label="Intensity")
ax.set_title("Frame 0")
ax.axis("off")
plt.tight_layout()
plt.show()
```

### Side-by-side comparison

```python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

titles = ["Frame 0 (baseline)", "Frame 100 (stimulation)", "Mean projection"]
images = [stack[0], stack[100], stack.mean(axis=0)]

for ax, img, title in zip(axes, images, titles):
    im = ax.imshow(img, cmap="gray")
    ax.set_title(title)
    ax.axis("off")
    plt.colorbar(im, ax=ax, shrink=0.8)

plt.tight_layout()
plt.show()
```

### Scatter plot of localisations (SMLM reconstruction)

```python
import pandas as pd

ts = pd.read_csv("localisations.csv")

fig, ax = plt.subplots(figsize=(8, 8))
ax.scatter(ts["x [nm]"], ts["y [nm]"], s=0.1, alpha=0.3, c="white")
ax.set_facecolor("black")
ax.set_aspect("equal")
ax.set_xlabel("x (nm)")
ax.set_ylabel("y (nm)")
ax.set_title("SMLM Reconstruction --- PIEZO1-HaloTag")
plt.tight_layout()
plt.show()
```

---

## 12. Kernel Management

The **kernel** is the Python process that executes your code. Understanding how to manage it is essential.

### Kernel states

| State | Indicator | Meaning |
|---|---|---|
| Idle | `○` (open circle) | Ready to run code |
| Busy | `●` (filled circle) | Executing a cell |
| Dead | `✕` or error | Crashed, needs restart |

### Kernel operations

| Action | Menu path | When to use |
|---|---|---|
| **Interrupt** | Kernel → Interrupt | Stop a long-running or stuck cell |
| **Restart** | Kernel → Restart | Clear all variables, start fresh |
| **Restart & Clear Output** | Kernel → Restart & Clear Output | Reset everything including displayed results |
| **Restart & Run All** | Kernel → Restart & Run All | Verify the notebook runs cleanly from top to bottom |

### When to restart the kernel

- After installing a new package with `pip install`
- When variables are in an inconsistent state from out-of-order execution
- When a cell hangs or the kernel seems unresponsive
- **Before sharing** --- always Restart & Run All to verify reproducibility

### Choosing a kernel

If you have multiple conda environments, each can appear as a separate kernel:

```bash
# Register your microscopy environment as a Jupyter kernel
conda activate microscopy
pip install ipykernel
python -m ipykernel install --user --name microscopy --display-name "Python (microscopy)"
```

Now when creating a new notebook, you can select "Python (microscopy)" as the kernel.

---

## 13. Saving, Checkpoints, and Autosave

### Saving

- `Ctrl+S` saves the notebook
- Jupyter autosaves periodically (every 2 minutes by default)

### Checkpoints

The classic Notebook interface creates **checkpoints** (snapshots) that you can revert to via File → Revert to Checkpoint. This is a simple undo for major mistakes but is not a substitute for proper version control.

### Where notebooks are stored

Notebooks are `.ipynb` files stored on your local filesystem. They are actually JSON files --- you can open one in a text editor and see the raw structure, though there is rarely a reason to do this.

---

## 14. Exporting and Sharing Notebooks

### Export formats

| Format | How to export | Best for |
|---|---|---|
| **HTML** | File → Download as → HTML | Sharing with anyone (opens in any browser) |
| **PDF** | File → Download as → PDF via LaTeX | Printing, formal reports |
| **Python script** | File → Download as → Python (.py) | Extracting just the code |
| **Markdown** | File → Download as → Markdown | Conversion to other formats |
| **Slides** | `jupyter nbconvert --to slides` | Lab meeting presentations |

### Command-line export with `nbconvert`

```bash
# Convert to HTML
jupyter nbconvert --to html analysis.ipynb

# Convert to PDF (requires LaTeX)
jupyter nbconvert --to pdf analysis.ipynb

# Convert to a Python script (strips markdown, keeps code)
jupyter nbconvert --to script analysis.ipynb

# Convert to slides (uses reveal.js)
jupyter nbconvert --to slides analysis.ipynb --post serve
```

### Sharing via GitHub

GitHub renders `.ipynb` files directly in the browser. Push your notebook to a repository and anyone can view it without installing Jupyter. For notebooks that do not render on GitHub (large files, widgets), use **nbviewer** (nbviewer.jupyter.org) --- paste the GitHub URL and it renders the notebook.

### Google Colab

You can open any `.ipynb` file in Google Colab (colab.research.google.com) for free cloud-based execution. This is useful for sharing analysis with collaborators who do not have Python installed.

---

## 15. Version Control with Git

### The problem with notebooks and Git

Notebook `.ipynb` files contain not just code and text but also output cells (including images encoded as base64 strings). This makes diffs noisy and merge conflicts difficult.

### Solutions

```bash
# Strip output before committing (keeps the repository clean)
pip install nbstripout
nbstripout --install    # Automatically strips output on git commit

# Or strip manually before committing
jupyter nbconvert --ClearOutputPreprocessor.enabled=True --inplace notebook.ipynb
```

### Recommended `.gitignore` for notebook projects

```
# Jupyter
.ipynb_checkpoints/
*.pyc
__pycache__/

# Data (too large for git)
data/
*.tif
*.tiff
*.nd2
*.czi

# Results (regenerable from code)
figures/
results/
```

---

## 16. Magic Commands

Magic commands are special Jupyter/IPython commands that start with `%` (line magic) or `%%` (cell magic). They provide functionality beyond standard Python.

### Timing

```python
# Time a single line
%timeit np.mean(data)
# 7.2 µs ± 120 ns per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

# Time an entire cell
%%timeit
result = np.zeros(1000)
for i in range(1000):
    result[i] = np.random.rand()
```

```python
# Time a cell once (wall clock time)
%%time
stack = tifffile.imread("large_stack.tif")
mean_proj = np.mean(stack, axis=0)
# CPU times: user 2.3 s, sys: 450 ms, total: 2.75 s
# Wall time: 2.8 s
```

### System information

```python
# List all available magic commands
%lsmagic

# Current working directory
%pwd

# Change directory
%cd ~/experiments/piezo1_2025

# List files
%ls

# Environment variables
%env HOME
```

### History and recall

```python
# Show input history
%history

# Show last 5 inputs
%history -l 5

# Re-run a previous input by number
%recall 5
```

### Loading external code

```python
# Load a Python file into a cell (replaces cell contents)
%load analysis_functions.py

# Run an external script (executes in the current kernel's namespace)
%run analysis_pipeline.py

# Run and keep variables accessible
%run -i helper_functions.py
```

### Resetting the namespace

```python
# Delete all user-defined variables (like restarting, but faster)
%reset -f
```

### Writing files from cells

```python
%%writefile helper.py
"""Helper functions for PIEZO1 analysis."""
import numpy as np

def compute_msd(xy, dt, max_lag=None):
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

---

## 17. Shell Commands and System Integration

### Running shell commands

Prefix any shell command with `!` to run it from a code cell:

```python
# Install a package
!pip install trackpy

# List files in the current directory
!ls -la data/

# Check disk usage
!du -sh data/*.tif

# Run an external tool
!python thunderstorm_to_flika.py --input locs.csv --output linked.csv
```

### Capturing shell output in Python

```python
# Store the output in a Python variable
files = !ls data/*.csv
print(f"Found {len(files)} CSV files")
for f in files:
    print(f"  {f}")
```

---

## 18. JupyterLab: The Next-Generation Interface

JupyterLab is the modern replacement for the classic Notebook interface. It provides everything the classic interface does, plus:

| Feature | Classic Notebook | JupyterLab |
|---|---|---|
| Multiple tabs | No | Yes --- notebooks, terminals, text files side by side |
| File browser | Basic | Full-featured with drag-and-drop |
| Built-in terminal | No | Yes |
| CSV viewer | No | Yes --- click a CSV to view it as a table |
| Image viewer | No | Yes --- click an image to view it |
| Drag-and-drop layout | No | Yes --- arrange panes however you like |
| Extensions | Limited | Rich extension ecosystem |
| Dark mode | No | Yes |

### Launching JupyterLab

```bash
jupyter lab
```

### Useful JupyterLab layouts for microscopy analysis

- **Side-by-side notebooks:** Drag a notebook tab to the right to split the view. Keep your analysis notebook on the left and a scratch notebook on the right.
- **Notebook + terminal:** Open a terminal tab alongside your notebook to run shell commands, manage files, or run long-running scripts.
- **Notebook + CSV viewer:** Click a CSV file in the file browser to view it as a formatted table next to your notebook.

---

## 19. JupyterLab Extensions

### Essential extensions for scientific work

```bash
# Table of contents (auto-generated from Markdown headings)
pip install jupyterlab-toc

# Interactive matplotlib (zoom, pan)
pip install ipympl

# Variable inspector (like Spyder's variable explorer)
pip install lckr-jupyterlab-variableinspector

# Code formatting
pip install jupyterlab-code-formatter
pip install black isort

# Git integration
pip install jupyterlab-git
```

### napari integration

For interactive microscopy image viewing alongside Jupyter analysis:

```bash
pip install napari[all]
```

```python
import napari
import tifffile

stack = tifffile.imread("piezo1_tirf.tif")
viewer = napari.view_image(stack, name="PIEZO1-HaloTag")
```

---

## 20. Notebook Organisation for Reproducible Science

### Recommended notebook structure

A well-organised analysis notebook follows a consistent pattern:

```markdown
# Title and Metadata (Markdown cell)
Experiment description, date, conditions, microscope settings

# Setup (code cell)
Imports, constants, helper functions, plot settings

# 1. Load Data (code + markdown section)
Read files, inspect shapes, check for issues

# 2. Quality Control (code + markdown section)
Filter, clean, document what was removed and why

# 3. Analysis (code + markdown sections)
The core computation, broken into logical steps

# 4. Visualisation (code + markdown section)
Figures, with captions explaining what each shows

# 5. Results and Summary (Markdown cell)
Key findings, numbers, next steps
```

### Naming conventions for notebooks

Use a consistent naming scheme that makes notebooks easy to find and sort:

```
2025-03-15_PIEZO1_EC_calcium_analysis.ipynb
2025-03-15_PIEZO1_EC_spt_diffusion.ipynb
2025-03-20_PIEZO1_KC_calcium_analysis.ipynb
01_data_preprocessing.ipynb
02_quality_control.ipynb
03_msd_analysis.ipynb
04_figure_generation.ipynb
```

### The setup cell pattern

Every notebook should start with a standardised setup cell:

```python
# === Setup ===
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tifffile
from pathlib import Path

# Plotting defaults
%matplotlib inline
%config InlineBackend.figure_format = "retina"
plt.rcParams.update({
    "figure.figsize": (8, 4),
    "figure.dpi": 100,
    "font.size": 12,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
})

# Paths
DATA_DIR = Path("data")
RESULTS_DIR = Path("results")
FIGURES_DIR = Path("figures")
RESULTS_DIR.mkdir(exist_ok=True)
FIGURES_DIR.mkdir(exist_ok=True)

# Constants
PIXEL_SIZE_UM = 0.108    # 100x TIRF, Hamamatsu ORCA-Fusion
FPS = 100.0
DT = 1.0 / FPS

print("Setup complete.")
```

---

## 21. Common Pitfalls and How to Avoid Them

### Hidden state from out-of-order execution

**Problem:** You run cells out of order, so a variable holds a value that does not match the visible code.

**Fix:** Periodically run Kernel → Restart & Run All. Always do this before sharing a notebook.

### Notebooks that only run on your machine

**Problem:** Hardcoded absolute paths like `/Users/jane/Desktop/data/experiment.tif`.

**Fix:** Use relative paths and `pathlib`:

```python
from pathlib import Path
DATA_DIR = Path("data")
stack = tifffile.imread(DATA_DIR / "experiment.tif")
```

### Notebooks that are too long

**Problem:** A single notebook with 200+ cells that takes 30 minutes to run.

**Fix:** Split into multiple numbered notebooks: `01_preprocessing.ipynb`, `02_analysis.ipynb`, `03_figures.ipynb`. Save intermediate results as CSV or Parquet files between stages.

### Forgetting to save figures

**Problem:** Beautiful figures that only exist inside the notebook and are lost when you close it.

**Fix:** Always `plt.savefig()` before `plt.show()`:

```python
fig.savefig(FIGURES_DIR / "msd_comparison.png", dpi=300)
fig.savefig(FIGURES_DIR / "msd_comparison.pdf")    # Vector for publication
plt.show()
```

### Memory issues with large image stacks

**Problem:** Loading a 10 GB TIFF stack crashes the kernel.

**Fix:** Use memory-mapped reading or process in chunks:

```python
# Memory-mapped access (only loads frames on demand)
import zarr
store = tifffile.imread("huge_stack.tif", aszarr=True)
z = zarr.open(store, mode="r")
frame_100 = z[100]   # Only this frame is loaded into RAM
```

---

## 22. When to Use Notebooks vs. Scripts

| Use a notebook (`.ipynb`) | Use a script (`.py`) |
|---|---|
| Exploratory data analysis | Automated pipelines that run unattended |
| Prototyping and testing ideas | Reusable functions and modules (imported by notebooks) |
| Creating figures with inline display | Command-line tools (argparse) |
| Documenting a specific experiment | Code shared across multiple projects |
| Sharing analysis with collaborators | Production code that runs on a server |
| Lab meeting presentations | Long-running batch processing |

### The recommended workflow

1. **Explore** in a Jupyter notebook --- load data, try things, make plots
2. **Extract** reusable functions into a `.py` file (e.g., `analysis_utils.py`)
3. **Import** those functions back into the notebook: `from analysis_utils import compute_msd`
4. **Automate** by writing a script for batch processing that calls the same functions

---

## 23. Exploratory Analysis of ThunderSTORM Data

A complete example notebook workflow for exploring PIEZO1-HaloTag SMLM data:

```python
# Cell 1: Setup
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

%matplotlib inline
%config InlineBackend.figure_format = "retina"
```

```python
# Cell 2: Load data
ts = pd.read_csv("thunderstorm_localisations.csv")
print(f"Loaded {len(ts)} localisations")
print(f"Columns: {ts.columns.tolist()}")
print(f"Frames: {ts['frame'].min()} to {ts['frame'].max()}")
ts.head()
```

```python
# Cell 3: Distribution of key parameters
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

axes[0].hist(ts["uncertainty [nm]"], bins=50, color="steelblue", edgecolor="white")
axes[0].axvline(30, color="red", ls="--", label="30 nm cutoff")
axes[0].set_xlabel("Uncertainty (nm)")
axes[0].legend()

axes[1].hist(ts["sigma [nm]"], bins=50, color="coral", edgecolor="white")
axes[1].set_xlabel("Sigma (nm)")

axes[2].hist(ts["intensity [photon]"], bins=50, color="seagreen", edgecolor="white")
axes[2].set_xlabel("Intensity (photon)")

plt.suptitle("Localisation Quality Distributions")
plt.tight_layout()
plt.savefig("figures/quality_distributions.png", dpi=300)
plt.show()
```

```python
# Cell 4: Apply quality filter
ts_clean = ts[
    (ts["uncertainty [nm]"] < 30) &
    (ts["sigma [nm]"].between(80, 300)) &
    (ts["intensity [photon]"] > 300)
].copy()
print(f"After filtering: {len(ts_clean)} / {len(ts)} "
      f"({100*len(ts_clean)/len(ts):.1f}%)")
```

```python
# Cell 5: SMLM reconstruction
fig, ax = plt.subplots(figsize=(8, 8))
ax.scatter(ts_clean["x [nm]"] / 1000, ts_clean["y [nm]"] / 1000,
           s=0.05, alpha=0.3, c="white")
ax.set_facecolor("black")
ax.set_aspect("equal")
ax.set_xlabel("x (µm)")
ax.set_ylabel("y (µm)")
ax.set_title(f"SMLM Reconstruction ({len(ts_clean)} localisations)")
plt.tight_layout()
plt.savefig("figures/smlm_reconstruction.png", dpi=300)
plt.show()
```

---

## 24. Calcium Imaging Analysis Notebook

A template for calcium imaging analysis:

```python
# Cell 1: Setup
import numpy as np
import matplotlib.pyplot as plt
import tifffile
from pathlib import Path

%matplotlib inline
%config InlineBackend.figure_format = "retina"

PIXEL_SIZE_UM = 0.108
FPS = 10.0
BASELINE_S = 5.0
```

```python
# Cell 2: Load and inspect
stack = tifffile.imread("calcium_timelapse.tif")
print(f"Stack: {stack.shape} ({stack.dtype})")
print(f"Duration: {stack.shape[0] / FPS:.1f} s at {FPS} fps")
print(f"Intensity range: {stack.min()} to {stack.max()}")
```

```python
# Cell 3: View key frames
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for ax, idx, title in zip(axes,
    [0, stack.shape[0]//2, -1],
    ["Baseline", "Mid-recording", "Final"]):
    ax.imshow(stack[idx], cmap="gray")
    ax.set_title(title)
    ax.axis("off")
plt.tight_layout()
plt.show()
```

```python
# Cell 4: Extract ROI traces and compute dF/F
rois = {
    "cell_1": (200, 230, 200, 230),
    "cell_2": (300, 330, 150, 180),
    "bg":     (10, 40, 10, 40),
}

time = np.arange(stack.shape[0]) / FPS
bg = stack[:, 10:40, 10:40].mean(axis=(1, 2))
baseline_frames = int(BASELINE_S * FPS)

fig, ax = plt.subplots(figsize=(12, 5))
for name, (y1, y2, x1, x2) in rois.items():
    if name == "bg":
        continue
    trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2)) - bg
    f0 = trace[:baseline_frames].mean()
    dff = (trace - f0) / f0
    ax.plot(time, dff, label=name, lw=1.5)

ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.set_title("Calcium Traces")
ax.legend()
plt.tight_layout()
plt.savefig("figures/calcium_traces_dff.png", dpi=300)
plt.show()
```

---

## 25. Creating a Lab Notebook for an Experiment

### Template

Use this Markdown structure at the top of every analysis notebook:

```markdown
# [Experiment Title]

**Date:** 2025-03-15
**Researcher:** [Name]
**Notebook:** `2025-03-15_PIEZO1_EC_calcium_analysis.ipynb`

## Experimental Details

| Parameter | Value |
|---|---|
| Cell type | hiPSC-derived endothelial cells |
| Passage | P5 |
| Labelling | Fluo-4 AM, 2 µM, 30 min RT |
| Microscope | Nikon Ti2 TIRF |
| Objective | 100x 1.49 NA oil |
| Camera | Hamamatsu ORCA-Fusion |
| Pixel size | 0.108 µm/pixel |
| Frame rate | 10 fps |
| Duration | 120 s |
| Treatment | Yoda1 5 µM at t = 30 s |

## Conditions

| Condition | Coverslips | FOVs | Expected cells |
|---|---|---|---|
| Control (DMSO) | 3 | 9 | ~90 |
| Yoda1 5 µM | 3 | 9 | ~90 |

## Files

All raw data in: `//server/piezo1/2025-03-15/`

## Analysis Notes

[Your observations and decisions during analysis go here]
```

---

## 26. Quick Reference

### Keyboard shortcuts (command mode)

| Shortcut | Action |
|---|---|
| `Shift+Enter` | Run cell, move to next |
| `Ctrl+Enter` | Run cell, stay |
| `A` / `B` | Insert cell above / below |
| `D, D` | Delete cell |
| `M` / `Y` | Markdown / Code cell |
| `Z` | Undo cell deletion |
| `Ctrl+S` | Save |
| `H` | Show all shortcuts |

### Essential magic commands

| Command | Purpose |
|---|---|
| `%matplotlib inline` | Enable inline plots |
| `%config InlineBackend.figure_format = "retina"` | High-DPI plots |
| `%%time` | Time a cell (once) |
| `%timeit` | Benchmark a line (averaged) |
| `%pwd` | Print working directory |
| `%run script.py` | Run a Python script |
| `%%writefile file.py` | Write cell contents to a file |
| `%load file.py` | Load a file into a cell |
| `!command` | Run a shell command |

### Standard setup cell

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tifffile
from pathlib import Path

%matplotlib inline
%config InlineBackend.figure_format = "retina"
plt.rcParams.update({"figure.figsize": (8, 4), "savefig.dpi": 300})
```

---

## 27. Resources for Learning Jupyter

| Resource | Description | Cost |
|---|---|---|
| **Official Jupyter docs** (jupyter.org/documentation) | Installation, usage, and configuration guides | Free |
| **JupyterLab docs** (jupyterlab.readthedocs.io) | Complete JupyterLab user guide | Free |
| **Real Python: Jupyter Notebook Tutorial** (realpython.com) | Comprehensive beginner tutorial | Free |
| **Corey Schafer: Jupyter Notebook Tutorial** (YouTube) | Video walkthrough of Jupyter basics | Free |
| **Jupyter Tips and Tricks** (blog.jupyter.org) | Official blog with tips and announcements | Free |
| **nbviewer** (nbviewer.jupyter.org) | View and share notebooks online | Free |
| **Google Colab** (colab.research.google.com) | Free cloud-based Jupyter notebooks with GPU access | Free |
| **Binder** (mybinder.org) | Turn a GitHub repository into a live Jupyter environment | Free |

---

*This manual was developed as a companion to the Python Manual for Biology Researchers, for the PIEZO1 research group. For questions or suggestions, contact george.dickinson@gmail.com.*
