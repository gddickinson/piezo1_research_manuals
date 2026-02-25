# Spyder Manual for Biology Researchers

**A Companion to the Python Manual for Biology Researchers**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why Spyder?](#1-introduction-why-spyder)
2. [Installing and Launching Spyder](#2-installing-and-launching-spyder)
3. [The Spyder Interface at a Glance](#3-the-spyder-interface-at-a-glance)

**Part II: The Core Panes**

4. [The Editor](#4-the-editor)
5. [The IPython Console](#5-the-ipython-console)
6. [The Variable Explorer](#6-the-variable-explorer)
7. [The Plots Pane](#7-the-plots-pane)
8. [The Files Pane](#8-the-files-pane)
9. [The Help Pane](#9-the-help-pane)
10. [The History Pane](#10-the-history-pane)
11. [The Profiler and Code Analysis Panes](#11-the-profiler-and-code-analysis-panes)

**Part III: Running Code**

12. [Running Scripts](#12-running-scripts)
13. [Running Selections and Lines](#13-running-selections-and-lines)
14. [Code Cells](#14-code-cells)
15. [Run Configuration](#15-run-configuration)

**Part IV: Debugging**

16. [Print Debugging in the Console](#16-print-debugging-in-the-console)
17. [The Visual Debugger](#17-the-visual-debugger)
18. [Breakpoints and Conditional Breakpoints](#18-breakpoints-and-conditional-breakpoints)
19. [Post-Mortem Debugging](#19-post-mortem-debugging)

**Part V: Customisation and Workflow**

20. [Preferences and Appearance](#20-preferences-and-appearance)
21. [Projects](#21-projects)
22. [Keyboard Shortcuts](#22-keyboard-shortcuts)
23. [Working with Conda Environments](#23-working-with-conda-environments)

**Part VI: Scientific Workflows in Spyder**

24. [Interactive Data Exploration](#24-interactive-data-exploration)
25. [Working with Images and TIFF Stacks](#25-working-with-images-and-tiff-stacks)
26. [Working with pandas DataFrames](#26-working-with-pandas-dataframes)
27. [A Complete PIEZO1 Analysis Session](#27-a-complete-piezo1-analysis-session)

**Part VII: Tips, Troubleshooting, and Resources**

28. [Productivity Tips](#28-productivity-tips)
29. [Common Problems and Fixes](#29-common-problems-and-fixes)
30. [Spyder vs. Other Editors](#30-spyder-vs-other-editors)
31. [Quick Reference](#31-quick-reference)
32. [Resources for Learning Spyder](#32-resources-for-learning-spyder)

---

## 1. Introduction: Why Spyder?

### What is Spyder?

Spyder (the **S**cientific **Py**thon **D**evelopment **E**nvi**r**onment) is a free, open-source IDE designed specifically for scientists, engineers, and data analysts who work in Python. It is developed and maintained by a team of scientists and software developers, and is part of the broader Scientific Python ecosystem.

Spyder is written entirely in Python and built on top of PyQt5, meaning it runs everywhere Python runs --- Windows, macOS, and Linux.

### Why Spyder for PIEZO1 researchers?

If you are coming from MATLAB (as many biophysics and neuroscience researchers are), Spyder will feel immediately familiar. The interface is deliberately modelled on the MATLAB desktop:

| MATLAB | Spyder | What it does |
|---|---|---|
| Editor | Editor | Write and edit scripts |
| Command Window | IPython Console | Run commands interactively |
| Workspace | Variable Explorer | See all your variables, arrays, and DataFrames |
| Current Folder | Files pane | Browse files on disk |
| Figure Window | Plots pane | View matplotlib figures inline |
| Help | Help pane | Documentation for any function |
| Profiler | Profiler pane | Time your code to find bottlenecks |

This means that from your first day in Spyder, you can use a workflow you already know: write a script, run it, look at the variables, tweak the script, re-run.

### What makes Spyder different from other Python editors?

| Feature | Spyder | VS Code | Jupyter Notebook | PyCharm |
|---|---|---|---|---|
| Variable Explorer | Built-in, shows arrays and DataFrames visually | Requires extension | Limited (`%whos` magic) | Available in debugger |
| Plot viewer | Built-in Plots pane | Requires extension | Inline by default | Requires plugin |
| Scientific focus | Designed for scientists | General-purpose | Designed for exploration | General-purpose |
| MATLAB-like feel | Yes --- intentional design goal | No | No | No |
| Learning curve | Gentle --- works out of the box | Moderate | Gentle for cells | Steep |
| Cost | Free and open source | Free | Free | Community (free) / Pro (paid) |
| Comes with Anaconda | Yes | No | Yes | No |

Spyder is not the most powerful IDE for large software projects (VS Code and PyCharm excel there), but for interactive scientific data analysis --- the kind of work you do every day in the lab --- it is the most natural and productive choice.

---

## 2. Installing and Launching Spyder

### If you installed Anaconda (recommended)

Spyder is included with Anaconda. You can launch it immediately:

```bash
# From the terminal (after activating your environment)
conda activate microscopy
spyder
```

Or launch it from the **Anaconda Navigator** GUI --- click the "Launch" button under Spyder.

### If you need to install Spyder separately

```bash
# Install into your conda environment
conda activate microscopy
conda install spyder

# Or with pip
pip install spyder
```

### Installing Spyder into a specific environment

If you have created a `microscopy` environment following the Python manual, install Spyder into that environment so it has access to all your scientific packages:

```bash
conda activate microscopy
conda install spyder

# Verify that Spyder can see your packages
spyder
# In the IPython Console:
# >>> import numpy, tifffile, matplotlib, pandas
# (no errors = all packages are available)
```

**Important:** If Spyder cannot find packages you have installed, it is almost always because Spyder is running in a different environment from the one where you installed the packages. See [Section 23](#23-working-with-conda-environments) for how to fix this.

### Updating Spyder

```bash
conda activate microscopy
conda update spyder
```

### Launching from the terminal

```bash
# Basic launch
spyder

# Open a specific file
spyder my_script.py

# Open a specific project directory
spyder --project /path/to/project
```

---

## 3. The Spyder Interface at a Glance

When you launch Spyder for the first time, you will see a window divided into several **panes**. The default layout has three main areas:

```
+----------------------------------------------+----------------------------+
|                                               |                            |
|                                               |    Help / Variable         |
|              Editor                           |    Explorer / Plots        |
|         (write your scripts)                  |    (tabbed panes)          |
|                                               |                            |
|                                               +----------------------------+
|                                               |                            |
|                                               |    IPython Console         |
|                                               |    (run commands)          |
|                                               |                            |
+----------------------------------------------+----------------------------+
```

### The panes

| Pane | Purpose | Default location |
|---|---|---|
| **Editor** | Write, edit, and save Python scripts | Left (large area) |
| **IPython Console** | Interactive Python shell --- run commands, see output | Bottom-right |
| **Variable Explorer** | Inspect all variables in memory (arrays, DataFrames, etc.) | Top-right tab |
| **Plots** | View matplotlib figures | Top-right tab |
| **Files** | Browse the file system | Top-right tab |
| **Help** | View documentation for any function or object | Top-right tab |
| **History** | Log of all commands entered in the console | Top-right tab |

### Rearranging panes

Every pane can be:

- **Moved:** Drag its title bar to a new location
- **Undocked:** Click the undock icon (rectangle with an arrow) in the title bar, or double-click the title bar
- **Closed:** Click the `×` on the tab or use the **View** menu to toggle panes on/off
- **Reset:** `View → Reset Window Layout` restores the default arrangement

**Tip:** If you have a second monitor, undock the Plots pane and place it on the second screen. This gives you a full-screen editor alongside a full-screen figure viewer --- a very productive setup for image analysis.

### Switching between panes

Use the **View** menu or the keyboard shortcuts:

| Pane | Shortcut (default) |
|---|---|
| Editor | `Ctrl+Shift+E` |
| IPython Console | `Ctrl+Shift+I` |
| Variable Explorer | `Ctrl+Shift+V` |
| Files | `Ctrl+Shift+F` |
| Help | `Ctrl+Shift+H` |

On macOS, replace `Ctrl` with `Cmd`.

---

## 4. The Editor

The Editor is where you write and save your Python scripts. It has features comparable to professional code editors.

### Syntax highlighting

Python keywords, strings, comments, and numbers are coloured differently so you can scan code quickly. The colours depend on your chosen theme (see [Section 20](#20-preferences-and-appearance)).

### Code completion (autocomplete)

Start typing a variable or function name and Spyder will suggest completions. Press `Tab` to accept the highlighted suggestion.

```python
import numpy as np
np.ara   # Type this, then press Tab → np.arange appears
```

Code completion works for:

- Standard library and installed package functions
- Your own variables and functions
- Dictionary keys and DataFrame column names (in many cases)

### Calltips (function signatures)

When you type a function name and open a parenthesis, Spyder shows a pop-up tooltip with the function's parameters and docstring.

```python
np.linspace(    # A tooltip appears showing: linspace(start, stop, num=50, ...)
```

### Code folding

Click the small triangles in the gutter (left margin of the editor) to collapse or expand functions, classes, and code blocks. This helps when navigating long scripts.

### Indentation guides

Vertical lines show indentation levels, helping you spot indentation errors at a glance.

### Line numbers

Line numbers are shown in the left margin. These correspond to the line numbers in error messages, so you can jump directly to the line that caused a problem.

### Go to line

Press `Ctrl+L` (or `Cmd+L` on macOS) to jump to a specific line number. Useful when reading error tracebacks.

### Find and replace

| Action | Shortcut |
|---|---|
| Find | `Ctrl+F` |
| Find and replace | `Ctrl+H` |
| Find in files (across all open files or a directory) | `Ctrl+Shift+F` |

### Multiple cursors

Hold `Ctrl` and click at multiple positions to place cursors at each location. Then type --- all cursors will type the same text simultaneously. Useful for renaming a variable in multiple places.

### Code analysis (linting)

Spyder runs **Pylint** and **Pyflakes** in the background, underlining potential issues:

| Indicator | Meaning |
|---|---|
| Red underline | Syntax error or serious issue |
| Yellow underline | Warning (unused variable, unused import, etc.) |
| Blue underline | Convention suggestion (naming, style) |

Hover over an underlined section to see the message. These warnings are advisory --- they do not prevent your code from running, but addressing them improves code quality.

### Multiple editor tabs

You can open many files simultaneously in the editor. Each file gets its own tab. Right-click a tab for options like "Close all other tabs" or "Copy path".

---

## 5. The IPython Console

The IPython Console is the interactive Python shell at the bottom-right of the window. It is where your code runs and where you see printed output, error messages, and can type commands interactively.

### What is IPython?

IPython (Interactive Python) is an enhanced Python shell. It adds features that the standard Python REPL does not have:

| Feature | Standard Python | IPython |
|---|---|---|
| Syntax highlighting | No | Yes |
| Tab completion | Basic | Advanced (methods, files, arguments) |
| History search | Basic | `Ctrl+R` or up-arrow with partial text |
| Magic commands | No | `%timeit`, `%run`, `%matplotlib`, etc. |
| Inline help | `help(func)` | `func?` or `func??` |
| Shell commands | `os.system()` | `!ls`, `!pwd`, `!cd` |

### Using the console interactively

```python
In [1]: import numpy as np

In [2]: x = np.array([1, 2, 3, 4, 5])

In [3]: x.mean()
Out[3]: 3.0

In [4]: x * 2
Out[4]: array([ 2,  4,  6,  8, 10])
```

Each `In [n]:` is a command you type. Each `Out[n]:` is the result. The `In`/`Out` numbering is sequential and can be used to recall previous results (e.g., `Out[3]` gives you `3.0`).

### Useful magic commands

Magic commands start with `%` (line magic) or `%%` (cell magic).

| Magic | Purpose | Example |
|---|---|---|
| `%run` | Run a script (same as clicking the Run button) | `%run my_analysis.py` |
| `%timeit` | Time a single line | `%timeit np.sum(data)` |
| `%%timeit` | Time a whole cell | (put at top of cell) |
| `%who` | List all variables in memory | `%who` |
| `%whos` | List variables with types and sizes | `%whos` |
| `%reset` | Clear all variables from memory | `%reset` (asks for confirmation) |
| `%pwd` | Print working directory | `%pwd` |
| `%cd` | Change working directory | `%cd /path/to/data` |
| `%matplotlib` | Set matplotlib backend | `%matplotlib inline` or `%matplotlib qt` |
| `%load` | Load a script's contents into the console | `%load my_functions.py` |
| `%hist` | Show command history | `%hist` |
| `%paste` | Paste and execute clipboard contents | `%paste` |

### Quick help with `?`

```python
In [1]: np.linspace?      # Show the docstring
In [2]: np.linspace??     # Show the full source code
In [3]: np.lins*?         # Show all matching names (wildcard search)
```

### Restarting the console

If your console gets into a bad state (e.g., a variable has the wrong type, or a package imported incorrectly), restart it:

- **Menu:** `Consoles → Restart kernel`
- **Shortcut:** `Ctrl+.` (period)
- **Toolbar:** Click the circular-arrow icon in the Console toolbar

Restarting clears all variables from memory. You will need to re-run your imports.

### Multiple consoles

You can open multiple IPython consoles (tabs at the bottom of the Console pane). Each console has its own kernel --- its own Python process with its own variables. This is useful when:

- You want to run a long computation in one console while continuing to work in another
- You want to test something without affecting your main workspace
- You are comparing results from two different analyses

Open a new console with `Consoles → Open an IPython console` or the `+` icon in the Console pane.

---

## 6. The Variable Explorer

The Variable Explorer is the single most useful feature of Spyder for scientists. It shows every variable currently in memory, with its name, type, size, and value.

### What you see

| Column | Shows | Example |
|---|---|---|
| **Name** | Variable name | `stack` |
| **Type** | Data type | `ndarray` |
| **Size** | Dimensions or length | `(500, 512, 512)` |
| **Value** | Preview of the contents | `[[[0.12, 0.45, ...]]]` |

### Viewing different data types

| Type | What you see in Variable Explorer | Double-click to... |
|---|---|---|
| `int`, `float`, `str`, `bool` | The value directly | Edit the value |
| `list`, `tuple` | Length and preview | View all elements in a table |
| `dict` | Length and key preview | View all key-value pairs |
| `ndarray` (NumPy) | Shape, dtype, and value preview | Open a 2D array viewer (spreadsheet-like) |
| `DataFrame` (pandas) | Shape and column preview | Open a full table viewer with sorting and filtering |
| `Series` (pandas) | Length and preview | Open in table viewer |

### Double-clicking arrays and DataFrames

When you double-click a NumPy array or pandas DataFrame in the Variable Explorer, Spyder opens a dedicated viewer:

**For a 2D NumPy array (e.g., a single image frame):**

- Spreadsheet-like grid showing all pixel values
- Can change the display format (e.g., `%.2f`, `%d`)
- Colour background option to visualise value magnitude

**For a pandas DataFrame:**

- Full sortable, filterable table (like Excel)
- Click a column header to sort by that column
- Type in the filter box to search within columns
- Supports scrolling through millions of rows

**For a 3D NumPy array (e.g., a TIFF stack):**

- Shows one 2D slice at a time
- Use the slider or the "Axis" dropdown to navigate through the third dimension

### Right-click options

Right-click a variable in the Variable Explorer for options:

| Option | What it does |
|---|---|
| **Copy** | Copy the variable name |
| **Remove** | Delete the variable from memory |
| **Duplicate** | Create a copy with a new name |
| **Edit** | Edit the value (for simple types) |
| **Plot** | Quick-plot the variable (for 1D arrays/Series) |
| **Histogram** | Quick histogram (for 1D numeric data) |
| **Show image** | Display as an image (for 2D arrays) |
| **Save** | Save to a `.spydata`, `.npy`, or `.csv` file |

### The "Show image" option

For 2D NumPy arrays, the "Show image" option in the right-click menu displays the array as a grayscale image. This is a quick way to preview microscopy images without writing any matplotlib code. Combined with the Variable Explorer's ability to show 3D arrays slice-by-slice, this makes Spyder a useful image viewer during analysis development.

### Filtering the Variable Explorer

Use the filter bar at the top of the Variable Explorer to:

- Show only variables of a specific type (e.g., only DataFrames)
- Search by variable name
- Exclude certain types (e.g., hide modules and functions)

### Memory usage

The Variable Explorer shows the size of each variable. This helps you identify memory-hungry arrays. For a TIRF microscopy stack at 16-bit, 500 frames of 512×512 pixels:

```
500 × 512 × 512 × 2 bytes = 262 MB
```

If you see a variable consuming unexpected amounts of memory, you can delete it by right-clicking and selecting "Remove", or from the console:

```python
del large_variable
```

---

## 7. The Plots Pane

The Plots pane collects all matplotlib figures generated during your session.

### How figures appear

When you run code that creates a matplotlib plot, the figure appears in the Plots pane. By default, Spyder uses the **inline** backend, which means plots are rendered as static images in the Plots pane.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title("Sine wave")
plt.show()
# Figure appears in the Plots pane
```

### Inline vs. interactive plots

| Backend | Set with | Plots appear in | Can pan/zoom? | Best for |
|---|---|---|---|---|
| `inline` (default) | `%matplotlib inline` | Plots pane (static images) | No | Quick viewing, saving |
| `qt` | `%matplotlib qt` | Separate pop-up windows | Yes | Zooming into images, interactive exploration |
| `widget` / `ipympl` | `%matplotlib widget` | Inline but interactive | Yes | Jupyter-like interactivity |

To switch backends:

```python
# In the IPython Console:
%matplotlib qt        # Separate interactive windows
%matplotlib inline    # Back to inline in the Plots pane
```

Or set the default in **Preferences → IPython Console → Graphics → Backend**.

**Recommendation:** Use **inline** for general work (figures are saved in the Plots pane and you can scroll back through them). Switch to **qt** when you need to zoom into large microscopy images or interactively explore complex plots.

### Navigating the Plots pane

- **Arrow buttons:** Scroll forward and backward through the history of plots generated this session
- **Save button:** Save the current plot to a file (PNG, PDF, SVG, etc.)
- **Copy button:** Copy the plot image to the clipboard (paste into slides or documents)
- **Close button:** Remove the current plot from the pane
- **Fit-to-pane button:** Resize the plot to fit the pane

### Adjusting inline plot resolution

By default, inline plots may look small or low-resolution. Increase the resolution and size in **Preferences → IPython Console → Graphics:**

| Setting | Recommended value | Effect |
|---|---|---|
| **Width** | 8 inches | Wider figures |
| **Height** | 6 inches | Taller figures |
| **Resolution** | 150 dpi (or higher) | Sharper figures |

Or set per-session from the console:

```python
%config InlineBackend.figure_format = 'retina'   # 2x resolution on Retina displays
%config InlineBackend.figure_format = 'svg'       # Vector format (sharp at any zoom)
```

---

## 8. The Files Pane

The Files pane is a file browser that shows the contents of your working directory.

### Key features

- **Navigate** the file system using the path bar at the top
- **Double-click** a `.py` file to open it in the Editor
- **Double-click** a `.csv`, `.xlsx`, or `.tsv` file to import it (Spyder will offer to load it as a DataFrame)
- **Right-click** for options: copy path, rename, delete, open in system file manager
- **Filter** by file extension using the filter dropdown

### Setting the working directory

The working directory is the folder Python uses as the starting point for relative file paths. There are several ways to set it:

- **Files pane:** Navigate to the folder and click the "Set as working directory" button (folder icon with a green arrow)
- **Console:** Use `%cd /path/to/folder`
- **Editor toolbar:** Use the working directory dropdown at the top of the Spyder window

**Tip:** When you start a new analysis session, always set your working directory to the folder containing your data. This way, you can use relative paths in your code (e.g., `tifffile.imread("data.tif")` instead of `tifffile.imread("/Users/george/Documents/experiments/2025-03-15/data.tif")`).

---

## 9. The Help Pane

The Help pane shows documentation for any Python object --- functions, classes, methods, modules.

### How to use it

1. **Automatic:** As you type in the Editor or Console, the Help pane updates to show documentation for the function you are using (if "Automatic connections" is enabled in Help pane settings)
2. **Manual:** Click on a function name in the Editor, then press `Ctrl+I` (or `Cmd+I` on macOS)
3. **From the console:** Type `help(np.linspace)` or `np.linspace?`
4. **From the Help pane:** Type a function name in the "Object" box at the top of the pane

### What you see

The Help pane shows:

- **Function signature** (parameters and default values)
- **Docstring** (description, parameters, return values, examples)
- **Source file** location (clickable link to view the source code)

This is extremely useful when learning a new function. For example, type `tifffile.imread` in the Help pane's Object box to see all the parameters for loading a TIFF file.

### Rich help rendering

The Help pane renders docstrings with formatting --- bold text, code blocks, parameter lists, and cross-references. This makes it much easier to read than raw `help()` output in the console.

---

## 10. The History Pane

The History pane keeps a log of every command you have entered in the IPython Console, across sessions.

### Why this is useful

- **Recall a command:** Search the history for a command you ran earlier today (or last week)
- **Recover work:** If you typed a useful one-liner in the console but forgot to save it, find it in the History
- **Copy to Editor:** Double-click a history entry to copy it into the console, or right-click and select "Copy" to paste it into your script

### Searching history

Use the search bar at the top of the History pane to find specific commands. You can also search from the console by pressing `Ctrl+R` and typing a partial command.

---

## 11. The Profiler and Code Analysis Panes

### The Profiler

The Profiler pane times every function call in your script and tells you where your code spends the most time. This is essential for optimising slow analysis scripts.

To profile a script:

1. Open the script in the Editor
2. Go to `Run → Profile` (or press `F10`)
3. Results appear in the Profiler pane

The Profiler shows:

| Column | Meaning |
|---|---|
| **Function** | Function name |
| **Total time** | Total time spent in this function (including sub-calls) |
| **Local time** | Time spent in this function only (excluding sub-calls) |
| **Calls** | Number of times the function was called |
| **File:line** | Where the function is defined |

**Practical use:** If your PIEZO1 trajectory analysis takes 10 minutes, profile it. You will often discover that 90% of the time is spent in a single function --- typically an inadvertent Python loop that should be a NumPy vectorised operation.

### Code Analysis (Pylint)

The Code Analysis pane runs Pylint on your script and reports:

- **Errors** (code that will crash)
- **Warnings** (code that is risky or suspicious)
- **Convention issues** (naming, style)
- **Refactoring suggestions** (code that could be simplified)

Run it with `Source → Run code analysis` or `F8` (on some systems).

---

## 12. Running Scripts

### Run the entire file

| Method | How |
|---|---|
| **Toolbar** | Click the green play button ▶ |
| **Menu** | `Run → Run` |
| **Keyboard** | `F5` |

This runs the entire script in the currently active IPython Console.

### What happens when you press F5

1. Spyder saves the file (if unsaved)
2. The file is executed in the IPython Console using `%run filename.py`
3. All variables created by the script become available in the console
4. All `print()` output appears in the console
5. All matplotlib figures appear in the Plots pane (or in separate windows)

After the script runs, you can interact with the variables in the console:

```python
# Script defines: stack, trace, dff
# After running, in the console:
In [1]: stack.shape
Out[1]: (500, 512, 512)

In [2]: dff.max()
Out[2]: 1.823
```

This is one of Spyder's greatest strengths --- the script and the interactive console share the same namespace, so you can inspect, modify, and experiment with your data after the script finishes.

---

## 13. Running Selections and Lines

You do not have to run the entire file every time. Spyder lets you run individual lines, selections, or cells.

### Run the current line

Press `F9` (or `Ctrl+Enter` on some configurations) to run the line where the cursor is currently sitting.

### Run a selection

1. Highlight one or more lines in the Editor
2. Press `F9`

Only the selected lines are executed in the console. This is extremely useful for:

- Testing a single line to see what it does
- Re-running a specific section after making a change
- Stepping through a script manually, line by line

### Run from the current line to the end

`Run → Run from current line` runs everything from the cursor position to the end of the file.

### The interactive workflow

The most productive way to develop analysis code in Spyder is:

1. **Write a few lines** in the Editor
2. **Select them** and press `F9` to run just those lines
3. **Check the results** in the Variable Explorer and Console
4. **Modify and re-run** until correct
5. **Move on** to the next few lines

This line-by-line development cycle is much faster than running the entire file every time. It is the same workflow MATLAB users know well.

---

## 14. Code Cells

Code cells divide a script into independent sections that you can run one at a time. This is the Spyder equivalent of cells in a Jupyter Notebook --- but inside a regular `.py` file.

### Defining cells

A cell is defined by a special comment starting with `# %%`:

```python
# %% Imports
import numpy as np
import matplotlib.pyplot as plt
import tifffile

# %% Load data
stack = tifffile.imread("calcium_timelapse.tif")
print(f"Loaded: {stack.shape}")

# %% Background correction
bg = stack[:, 10:30, 10:30].mean(axis=(1, 2))
corrected = stack - bg[:, np.newaxis, np.newaxis]

# %% Compute dF/F
f0 = corrected[:50].mean(axis=0)
dff = (corrected - f0) / f0

# %% Plot
plt.figure(figsize=(10, 4))
trace = dff[:, 256, 256]
time = np.arange(len(trace)) / 10.0
plt.plot(time, trace)
plt.xlabel("Time (s)")
plt.ylabel("dF/F")
plt.title("Cell 1 --- PIEZO1 calcium response")
plt.show()
```

### Running cells

| Action | Shortcut | What it does |
|---|---|---|
| Run current cell | `Ctrl+Enter` | Runs the cell the cursor is in |
| Run current cell and advance | `Shift+Enter` | Runs the cell, then moves cursor to the next cell |

### Why cells are useful

- **Modularity:** Each cell handles one logical step (load, process, plot)
- **Re-runnability:** Change the plot and re-run only the "Plot" cell, without reloading data
- **Organisation:** Cell headers appear in the **Outline** (see below), making it easy to navigate long scripts
- **Compatibility:** The `# %%` cell markers work in VS Code, PyCharm, and Jupyter too

### The Outline pane

When you use `# %%` cells and function definitions, the **Outline** pane (under the `Source` menu or in the sidebar) shows a navigable table of contents for your script. Click any entry to jump to that section.

### Comparison with Jupyter Notebooks

| Feature | Spyder cells (`# %%`) | Jupyter cells |
|---|---|---|
| File format | Regular `.py` file | `.ipynb` JSON file |
| Version control (git) | Easy --- `.py` files have clean diffs | Difficult --- JSON with embedded output |
| Run order | Top-to-bottom by convention | Any order (can cause hidden state bugs) |
| Variable Explorer | Full support | Limited |
| Code completion | Full support | Partial |
| Sharing with non-Python users | Requires Python | Can export as HTML or PDF with output |

**Recommendation:** Use Spyder cells (`# %%`) as your primary workflow. Use Jupyter Notebooks when you need to share a self-contained analysis with embedded figures (e.g., for lab meetings or supplementary materials).

---

## 15. Run Configuration

The Run Configuration dialog (`Run → Configuration per file` or `Ctrl+F6`) controls how your script is executed.

### Key options

| Option | What it does | When to use |
|---|---|---|
| **Execute in current console** | Runs in the existing IPython Console (variables persist between runs) | Default --- good for interactive development |
| **Execute in a dedicated console** | Creates a new console for each run (clean state) | Testing scripts from scratch |
| **Execute in an external terminal** | Runs in your OS terminal (not inside Spyder) | Scripts with `input()` or GUI applications |
| **Clear all variables before run** | Wipes the namespace before executing | When you want to ensure no leftover variables |
| **Working directory** | Set the directory the script runs in | Match to your data folder |
| **Command line arguments** | Pass arguments to the script (like `sys.argv`) | Scripts that use `argparse` |

### Clearing variables before run

One subtle pitfall in interactive development: a variable from a previous run may still be in memory, masking a bug in your current code. For example, if you delete a line that creates `stack` but `stack` is still in memory from the last run, your code appears to work --- until you restart.

To avoid this, either:

- Enable "Clear all variables before run" in Run Configuration
- Periodically restart the console (`Ctrl+.`)
- Run with a dedicated console to guarantee a clean slate

---

## 16. Print Debugging in the Console

The simplest debugging technique is adding `print()` statements to your code. In Spyder, this is particularly effective because the output appears directly in the Console pane, and you can inspect variables in the Variable Explorer simultaneously.

```python
# Standard print debugging
print(f"stack shape: {stack.shape}")
print(f"stack dtype: {stack.dtype}")
print(f"trace length: {len(trace)}")
print(f"dff range: {dff.min():.3f} to {dff.max():.3f}")
print(f"type of result: {type(result)}")
```

### Using the Variable Explorer as a debugger

After running your script (or even part of it with `F9`), every variable is visible in the Variable Explorer. This means you can:

1. Run the script up to a certain point (select lines, press `F9`)
2. Look at all variables in the Variable Explorer
3. Double-click an array to see its values
4. Right-click an array and "Show image" to visualise it
5. Type diagnostic commands in the console

This is often all you need. For more complex problems, use the visual debugger below.

---

## 17. The Visual Debugger

Spyder includes a graphical debugger that lets you step through your code line by line, watching variables change in real time.

### Starting the debugger

| Method | How |
|---|---|
| **Debug the current file** | `Ctrl+F5` or `Debug → Debug` or the debug icon (blue play button with a bug) |
| **Debug from a breakpoint** | Set a breakpoint first (see [Section 18](#18-breakpoints-and-conditional-breakpoints)), then `Ctrl+F5` |

### Debugger controls

When the debugger is running, a toolbar appears with stepping controls:

| Button | Shortcut | Action | What it does |
|---|---|---|---|
| **Continue** | `Ctrl+F12` | `c` | Run until the next breakpoint |
| **Step Over** | `Ctrl+F10` | `n` | Run the current line, then pause on the next line |
| **Step Into** | `Ctrl+F11` | `s` | If the current line calls a function, enter that function |
| **Step Out** | `Ctrl+Shift+F11` | `r` | Run until the current function returns |
| **Stop** | `Ctrl+Shift+F12` | `q` | Stop debugging |

### What happens during debugging

1. The editor highlights the current line (where execution is paused) in green or yellow
2. The Variable Explorer updates in real time --- you can see each variable change as you step
3. The console shows `ipdb>` (the IPython debugger prompt) where you can type any Python expression
4. You can inspect any variable by typing its name at the `ipdb>` prompt

### Example debugging session

Suppose you have this script with a bug:

```python
import numpy as np

data = np.array([10, 20, 30, 40, 50])
threshold = 25
mask = data > threshold
filtered = data[mask]
mean_val = filtered.mean()
result = mean_val / len(data)    # Bug: should this be len(filtered)?
print(f"Result: {result}")
```

1. Set a breakpoint on the `result = ...` line (click in the gutter)
2. Press `Ctrl+F5` to start debugging
3. The debugger runs until the breakpoint and pauses
4. In the Variable Explorer, you can see: `data`, `threshold`, `mask`, `filtered`, `mean_val`
5. At the `ipdb>` prompt, type `len(filtered)` to check the actual count
6. Realise the bug and fix the code

---

## 18. Breakpoints and Conditional Breakpoints

### Setting a breakpoint

Click in the **gutter** (the grey area to the left of the line numbers) next to any line. A red circle appears, marking a breakpoint. When the debugger runs, it will pause at this line.

Alternatively, press `F12` to toggle a breakpoint on the current line.

### Conditional breakpoints

A conditional breakpoint only triggers when a condition is true. This is invaluable when debugging a loop that runs thousands of times but only fails on a specific iteration.

1. Right-click the red breakpoint circle (or the gutter at that line)
2. Select "Set/Edit condition"
3. Enter a Python expression, e.g., `i == 42` or `intensity > 10000`

The debugger will only pause at this line when the condition evaluates to `True`.

### Example: debugging a loop over trajectories

```python
for track_id, group in tracks.groupby("track_id"):
    xy = group[["x_um", "y_um"]].to_numpy()
    D = fit_D(xy, dt)    # <-- Set conditional breakpoint: track_id == 15
    results.append({"track_id": track_id, "D": D})
```

With a conditional breakpoint `track_id == 15`, the debugger runs through all trajectories at full speed and only pauses when processing trajectory 15 --- the one that might be causing a problem.

---

## 19. Post-Mortem Debugging

If your script crashes with an exception, Spyder can drop you into a debugger at the exact point of the crash, with all variables intact.

### Enabling post-mortem debugging

Go to **Preferences → IPython Console → Debugger** and enable "Automatically enter the debugger on an unhandled exception".

Or, after a crash, type in the console:

```python
%debug
```

This enters the debugger at the point of the last exception. You can inspect all variables that were in scope when the error occurred.

### Why this is useful

Without post-mortem debugging, when your script crashes, you only get a traceback message. With it, you get the traceback **plus** the ability to inspect every variable --- which often immediately reveals the cause.

---

## 20. Preferences and Appearance

Open Preferences with `Tools → Preferences` (or `Spyder → Preferences` on macOS, or `Ctrl+Alt+Shift+P`).

### Appearance (themes)

**Preferences → Appearance**

| Theme | Description | Best for |
|---|---|---|
| **Spyder** | Light theme, Spyder's default | Well-lit rooms, printing code |
| **Spyder Dark** | Dark theme | Long sessions, reduced eye strain |
| **Monokai** | Popular dark colour scheme | Developers who prefer Monokai |
| **Zenburn** | Low-contrast dark theme | Minimal eye strain |

You can also customise colours individually. Dark themes are generally recommended for long analysis sessions.

### Font size

**Preferences → Appearance → Fonts**

Increase the font size if you find the default too small. A size of 11--13 pt is comfortable for most screens. The Editor, Console, and Variable Explorer can have different font sizes.

### Editor settings

**Preferences → Editor**

| Setting | Recommended | Why |
|---|---|---|
| Tab size | 4 spaces | PEP 8 standard |
| Insert spaces instead of tabs | Enabled | Prevents indentation errors |
| Show line numbers | Enabled | Essential for debugging |
| Show blank spaces | Personal preference | Helps spot indentation issues |
| Show code folding | Enabled | Collapse functions and classes |
| Automatic code completion | Enabled | Speeds up typing |
| Underline errors and warnings | Enabled | Catch bugs early |

### IPython Console settings

**Preferences → IPython Console**

| Setting | Recommended | Why |
|---|---|---|
| Startup script | Optional: a file with your common imports | Saves typing `import numpy as np` every time |
| Show elapsed time | Enabled | Know how long your code took |
| Matplotlib backend | Inline (default) | Plots appear in the Plots pane |
| Inline figure size | 8 × 6 inches | Larger, more readable plots |
| Inline resolution | 150 dpi | Sharper figures |

### Startup script example

Create a file called `startup.py` with your standard imports:

```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import tifffile
from pathlib import Path
print("Scientific imports loaded.")
```

Then set it in **Preferences → IPython Console → Startup → Run a file**.

Every time you start a new console, these imports are automatically available.

---

## 21. Projects

Spyder Projects help you organise your work. A project is simply a directory that Spyder remembers, along with settings like which files were open and which working directory was set.

### Creating a project

1. `Projects → New Project...`
2. Choose a directory (e.g., `~/Documents/piezo1_analysis`)
3. Spyder creates a `.spyproject` folder inside the directory

### What a project gives you

| Feature | Without a project | With a project |
|---|---|---|
| Working directory | You set it manually each time | Automatically set to the project root |
| Open files | You re-open them each time | Restored when you reopen the project |
| File browser | Shows wherever you last navigated | Shows the project directory |
| Recent projects | --- | Quick-switch between projects from the Projects menu |

### Recommended project structure

This follows the conventions from Section 28 of the Python manual:

```
piezo1_analysis/
├── data/
│   ├── raw/                  # Original TIFF stacks (never modify)
│   └── processed/            # Processed outputs
├── scripts/
│   ├── analyze_calcium.py
│   ├── track_molecules.py
│   └── generate_figures.py
├── results/
│   ├── figures/
│   └── tables/
├── utils/
│   └── helpers.py            # Shared functions
└── README.md
```

Open this directory as a Spyder Project, and the Files pane will always show this structure.

---

## 22. Keyboard Shortcuts

### Essential shortcuts

| Action | Windows/Linux | macOS |
|---|---|---|
| **Run file** | `F5` | `F5` |
| **Run selection/line** | `F9` | `F9` |
| **Run cell** | `Ctrl+Enter` | `Cmd+Enter` |
| **Run cell and advance** | `Shift+Enter` | `Shift+Enter` |
| **Debug file** | `Ctrl+F5` | `Cmd+F5` |
| **Toggle breakpoint** | `F12` | `F12` |
| **Restart console** | `Ctrl+.` | `Cmd+.` |
| **Save** | `Ctrl+S` | `Cmd+S` |
| **Undo** | `Ctrl+Z` | `Cmd+Z` |
| **Redo** | `Ctrl+Shift+Z` | `Cmd+Shift+Z` |

### Navigation

| Action | Windows/Linux | macOS |
|---|---|---|
| **Go to line** | `Ctrl+L` | `Cmd+L` |
| **Find** | `Ctrl+F` | `Cmd+F` |
| **Find and replace** | `Ctrl+H` | `Cmd+H` |
| **Find in files** | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| **Go to definition** | `Ctrl+G` | `Cmd+G` |
| **Switch to Editor** | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| **Switch to Console** | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| **Switch to Variable Explorer** | `Ctrl+Shift+V` | `Cmd+Shift+V` |

### Editing

| Action | Windows/Linux | macOS |
|---|---|---|
| **Comment/uncomment lines** | `Ctrl+1` | `Cmd+1` |
| **Block comment** | `Ctrl+4` | `Cmd+4` |
| **Block uncomment** | `Ctrl+5` | `Cmd+5` |
| **Indent selection** | `Tab` | `Tab` |
| **Unindent selection** | `Shift+Tab` | `Shift+Tab` |
| **Duplicate line** | `Ctrl+Alt+Up/Down` | `Cmd+Alt+Up/Down` |
| **Move line up/down** | `Alt+Up/Down` | `Alt+Up/Down` |
| **Delete line** | `Ctrl+D` | `Cmd+D` |
| **Toggle code folding** | Click gutter triangle | Click gutter triangle |

### Debugging

| Action | Windows/Linux | macOS |
|---|---|---|
| **Start debugging** | `Ctrl+F5` | `Cmd+F5` |
| **Continue** | `Ctrl+F12` | `Cmd+F12` |
| **Step over** | `Ctrl+F10` | `Cmd+F10` |
| **Step into** | `Ctrl+F11` | `Cmd+F11` |
| **Step out** | `Ctrl+Shift+F11` | `Cmd+Shift+F11` |
| **Stop debugging** | `Ctrl+Shift+F12` | `Cmd+Shift+F12` |

### Customising shortcuts

`Tools → Preferences → Keyboard shortcuts` lets you change any shortcut. If you are coming from MATLAB or another editor, you can remap shortcuts to match what you are used to.

---

## 23. Working with Conda Environments

### The most common Spyder problem

The number one issue new users encounter is: **"I installed a package, but Spyder cannot find it."** This almost always happens because Spyder is running in a different conda environment from the one where you installed the package.

### How to check which environment Spyder is using

In the IPython Console:

```python
import sys
print(sys.executable)
# e.g., /Users/george/anaconda3/envs/microscopy/bin/python
```

If this does not show your `microscopy` environment, Spyder is using a different Python.

### Solution 1: Install Spyder into your environment (recommended)

```bash
conda activate microscopy
conda install spyder
spyder
```

This guarantees Spyder uses the same Python and packages as your `microscopy` environment.

### Solution 2: Register an existing environment as a Spyder kernel

If you prefer to keep Spyder in the base environment but want it to use packages from `microscopy`:

```bash
# Activate your working environment
conda activate microscopy

# Install the IPython kernel package
conda install ipykernel

# Register the kernel
python -m ipykernel install --user --name microscopy --display-name "Python (microscopy)"
```

Then in Spyder: **Preferences → IPython Console → Interpreter → Use the following interpreter** and browse to the Python executable in your `microscopy` environment (e.g., `/Users/george/anaconda3/envs/microscopy/bin/python`).

Restart Spyder after changing this setting.

### Solution 3: Change the interpreter in Preferences

Go to **Preferences → IPython Console → Interpreter** and select "Use the following Python interpreter". Enter the path to the Python in your desired environment:

| OS | Typical path |
|---|---|
| macOS/Linux | `~/anaconda3/envs/microscopy/bin/python` |
| Windows | `C:\Users\george\anaconda3\envs\microscopy\python.exe` |

### Verifying your environment

After configuring, restart the console and verify:

```python
import numpy
import tifffile
import pandas
import matplotlib
print("All scientific packages available!")
```

---

## 24. Interactive Data Exploration

One of Spyder's greatest strengths is the ability to explore data interactively --- running parts of a script, inspecting variables, and experimenting in the console.

### The exploration workflow

```python
# %% Step 1: Load (run this cell once)
import numpy as np
import tifffile
import matplotlib.pyplot as plt

stack = tifffile.imread("calcium_timelapse.tif")
# Check the Variable Explorer: you should see "stack" with shape (500, 512, 512)

# %% Step 2: Explore in the console
# Now switch to the console and experiment:
# >>> stack.shape
# >>> stack.dtype
# >>> stack.min(), stack.max()
# >>> plt.imshow(stack[0], cmap='gray'); plt.show()

# %% Step 3: Process (modify and re-run just this cell)
bg = stack[:, 10:30, 10:30].mean(axis=(1, 2))
corrected = stack - bg[:, np.newaxis, np.newaxis]

# %% Step 4: Visualise (re-run this cell as you tweak the plot)
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(stack[0], cmap='gray')
axes[0].set_title("Raw")
axes[1].imshow(corrected[0], cmap='gray')
axes[1].set_title("Background-corrected")
plt.tight_layout()
plt.show()
```

### Tips for interactive exploration

- **Variable Explorer as your dashboard:** Keep it open at all times. After every cell or line, glance at it to confirm shapes and types.
- **Right-click → Show image:** For any 2D array, instantly visualise it without writing `plt.imshow()`.
- **Console experiments:** After running your script, use the console to test modifications before changing your script. When the console experiment works, copy the command into the Editor.
- **Undo in the Editor, not in memory:** If a console command modifies a variable incorrectly, re-run the cell that created it to restore the original value.

---

## 25. Working with Images and TIFF Stacks

Spyder is particularly well-suited for microscopy image analysis because of the Variable Explorer's array viewer and the Plots pane.

### Loading and inspecting a TIFF stack

```python
# %% Load
import numpy as np
import tifffile
import matplotlib.pyplot as plt

stack = tifffile.imread("piezo1_tirf.tif")
```

After running this cell, look at the Variable Explorer:

```
Name      Type      Size              Value
stack     ndarray   (500, 512, 512)   [[[12, 15, ...]]]
```

Double-click `stack` to open the array viewer. Use the "Axis" dropdown to scroll through frames.

### Quick visualisation from the Variable Explorer

1. Right-click `stack` in the Variable Explorer
2. Select **Show image**
3. A 2D slice is displayed (the first frame by default)

For a more controlled view, use matplotlib in a cell:

```python
# %% View a specific frame
frame_idx = 100
plt.figure(figsize=(8, 8))
plt.imshow(stack[frame_idx], cmap='gray', vmin=0, vmax=stack.max())
plt.colorbar(label="Intensity (AU)")
plt.title(f"Frame {frame_idx}")
plt.axis("off")
plt.show()
```

### Switching to interactive plots for zooming

When you need to zoom into a microscopy image (e.g., to identify cells for ROI selection):

```python
%matplotlib qt    # Switch to interactive backend
plt.imshow(stack[0], cmap='gray')
plt.colorbar()
plt.title("Zoom in to identify cells")
plt.show()
# A separate window opens --- use the zoom tool to magnify regions
```

```python
%matplotlib inline    # Switch back when done
```

### Getting pixel coordinates from interactive plots

In a `qt` backend figure window, hover over the image --- the status bar at the bottom shows the cursor coordinates and the pixel value. This is useful for defining ROIs:

```
x=256.3  y=183.7  [1542]
```

Round these to define your ROI coordinates for extraction.

---

## 26. Working with pandas DataFrames

Spyder's Variable Explorer has first-class support for pandas DataFrames, making it an excellent tool for tabular data analysis.

### Viewing DataFrames

When a DataFrame is in memory, the Variable Explorer shows its shape and column summary. Double-click to open the full DataFrame viewer:

- **Sortable columns:** Click any column header to sort
- **Scrollable:** Navigate through millions of rows
- **Type-aware display:** Numbers, strings, booleans, and datetimes are formatted appropriately
- **Column filtering:** Use the filter area to search within columns

### Example: inspecting ThunderSTORM data

```python
# %% Load localisations
import pandas as pd

ts = pd.read_csv("thunderstorm_localisations.csv")
# Double-click "ts" in the Variable Explorer to see the full table
```

In the DataFrame viewer:

- Click the `intensity [photon]` column header to sort by intensity (descending to find the brightest localisations)
- Click the `frame` column to sort chronologically
- Scroll to spot any obvious anomalies (e.g., coordinates outside the expected range)

### Editing DataFrames in the viewer

You can directly edit individual cells in the DataFrame viewer by double-clicking them. This is useful for quick manual corrections, but for reproducible analysis you should always modify data in code.

---

## 27. A Complete PIEZO1 Analysis Session

This section walks through a typical Spyder session from start to finish, combining the skills from the Python manual with Spyder's interactive features.

### Setting up

1. Launch Spyder (with the `microscopy` environment)
2. Open the project folder: `Projects → Open Project → piezo1_analysis/`
3. The working directory is automatically set to the project root
4. The Files pane shows your project structure

### The analysis script

Create a new file `scripts/analyze_calcium.py`:

```python
#!/usr/bin/env python3
"""Calcium trace analysis for PIEZO1-HaloTag experiments.

Run cells sequentially (Ctrl+Enter) for interactive development.
"""

# %% Imports
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tifffile
from pathlib import Path

# %% Configuration
data_dir = Path("data/raw")
results_dir = Path("results")
results_dir.mkdir(exist_ok=True)

fps = 10.0
baseline_seconds = 5.0
baseline_frames = int(fps * baseline_seconds)

# %% Load the stack
filename = "20250315_PIEZO1_EC_control_FOV1.tif"
stack = tifffile.imread(data_dir / filename)
print(f"Loaded: {stack.shape}, dtype={stack.dtype}")
# >>> Check the Variable Explorer: stack should be (500, 512, 512) uint16

# %% View the first frame (interactive)
# Switch to qt backend for zooming to identify cells
%matplotlib qt
plt.figure(figsize=(8, 8))
plt.imshow(stack[0], cmap="gray")
plt.colorbar(label="Intensity")
plt.title("Frame 0 --- identify cells and background")
plt.show()
# >>> Hover over cells to read their (x, y) coordinates
# >>> Note the coordinates and define ROIs below

# %% Define ROIs (from coordinates identified above)
%matplotlib inline

rois = {
    "cell_1":     (200, 230, 200, 230),
    "cell_2":     (300, 330, 150, 180),
    "cell_3":     (180, 210, 350, 380),
    "background": ( 10,  40,  10,  40),
}

# %% Extract traces and compute dF/F
time = np.arange(stack.shape[0]) / fps
bg = stack[:, 10:40, 10:40].mean(axis=(1, 2))

results = {}
fig, ax = plt.subplots(figsize=(12, 5))

for name, (r1, r2, c1, c2) in rois.items():
    if name == "background":
        continue
    trace = stack[:, r1:r2, c1:c2].mean(axis=(1, 2))
    trace_corrected = trace - bg
    f0 = trace_corrected[:baseline_frames].mean()
    dff = (trace_corrected - f0) / f0
    results[name] = dff
    ax.plot(time, dff, label=name)

ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.set_title("PIEZO1 Calcium Responses")
ax.legend()
ax.axhline(0, color='gray', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()

# %% Save results
df = pd.DataFrame({"time_s": time})
for name, dff in results.items():
    df[name] = dff

output_path = results_dir / "calcium_traces.csv"
df.to_csv(output_path, index=False)
print(f"Saved: {output_path}")

# %% Summary statistics
print("\nSummary:")
for name, dff in results.items():
    peak = dff.max()
    peak_time = time[dff.argmax()]
    print(f"  {name}: peak dF/F = {peak:.3f} at t = {peak_time:.1f} s")
```

### The workflow in action

1. **Run the "Imports" cell** (`Ctrl+Enter`). Check the Console for errors.
2. **Run "Configuration".** Verify paths in the Variable Explorer.
3. **Run "Load the stack".** Check the Variable Explorer: `stack` should appear with the expected shape. Double-click it to browse frames.
4. **Run "View the first frame".** A Qt window opens. Use the zoom tool to identify cells. Note coordinates.
5. **Update the ROI dictionary** with coordinates from step 4. Run that cell.
6. **Run "Extract traces and compute dF/F".** Inspect the plot. Adjust baseline frames or ROI coordinates if needed, then re-run this cell.
7. **Run "Save results".** Check that the CSV was written.
8. **Run "Summary statistics".** Read the peak dF/F values in the Console.

At any point, you can switch to the Console and experiment:

```python
In [1]: results["cell_1"].max()
Out[1]: 1.823

In [2]: plt.hist(results["cell_1"], bins=50); plt.show()

In [3]: stack[250, 215, 215]    # Check a specific pixel value
Out[3]: 1847
```

This interplay between script cells and console experimentation is the core of Spyder's power for scientific work.

---

## 28. Productivity Tips

### 1. Use code cells for everything

Structure every analysis script with `# %%` cells. This makes it easy to re-run individual steps without waiting for the entire pipeline to execute. A typical structure:

```
# %% Imports
# %% Configuration / parameters
# %% Load data
# %% Preprocessing
# %% Analysis
# %% Visualisation
# %% Save results
```

### 2. Keep the Variable Explorer visible at all times

Make it a habit to glance at the Variable Explorer after running each cell. Check shapes, types, and value ranges. Catching a shape mismatch early (e.g., `(512, 512, 500)` instead of `(500, 512, 512)`) saves hours of downstream debugging.

### 3. Use the console for quick experiments

Before adding a line to your script, test it in the console first. If it works, copy it into the Editor. If it fails, you have not changed your script.

### 4. Undock panes for dual-monitor setups

If you have two monitors, undock the Plots pane (or Variable Explorer) and put it on the second screen. This gives you full use of both screens: Editor + Console on one, visual output on the other.

### 5. Set up a startup script

Create a startup file with your common imports (see [Section 20](#20-preferences-and-appearance)). This saves you from typing `import numpy as np` at the start of every session.

### 6. Use `Ctrl+I` obsessively

Whenever you encounter an unfamiliar function, click on it and press `Ctrl+I` (or `Cmd+I` on macOS) to see its documentation in the Help pane. This is faster than searching the web, and the documentation is usually comprehensive.

### 7. Learn the essential shortcuts

You do not need to memorise all shortcuts, but these five will cover 90% of your workflow:

| Shortcut | Action |
|---|---|
| `F5` | Run entire file |
| `F9` | Run selection/current line |
| `Ctrl+Enter` | Run current cell |
| `Shift+Enter` | Run cell and advance |
| `Ctrl+.` | Restart console |

### 8. Use comments as section headers

Even outside of code cells, use clear comments to annotate your code. Future-you will thank present-you:

```python
# --- Background correction ---
bg = stack[:, 10:30, 10:30].mean(axis=(1, 2))
corrected = stack - bg[:, np.newaxis, np.newaxis]
```

### 9. Save your workspace (selectively)

If you have spent a long time computing a result (e.g., tracking all molecules in a 10-minute TIRF movie), save the key variables so you do not have to re-run the computation:

```python
np.save("results/trajectories.npy", trajectories)
df.to_csv("results/track_stats.csv", index=False)
```

Next session, load them directly:

```python
trajectories = np.load("results/trajectories.npy")
df = pd.read_csv("results/track_stats.csv")
```

### 10. Restart the console regularly

Interactive development can leave stale variables in memory that mask bugs. Restart the console (`Ctrl+.`) periodically and re-run your script from the top to ensure everything works from a clean state. Do this especially before sharing your script with others.

---

## 29. Common Problems and Fixes

### "ModuleNotFoundError: No module named 'tifffile'"

**Cause:** Spyder is running in a different conda environment from the one where you installed the package.

**Fix:**
1. Check which Python Spyder is using: `import sys; print(sys.executable)`
2. If it is not your `microscopy` environment, follow the steps in [Section 23](#23-working-with-conda-environments)
3. The most reliable fix: install Spyder directly into your working environment:
   ```bash
   conda activate microscopy
   conda install spyder
   spyder
   ```

### Spyder is slow or freezing

**Common causes and fixes:**

| Cause | Fix |
|---|---|
| Very large variable in memory | Delete it with `del variable_name` or right-click → Remove in Variable Explorer |
| Variable Explorer trying to preview a huge DataFrame | Collapse the preview or filter to specific types |
| Too many inline plots in the Plots pane | Clear the Plots pane (right-click → Remove all plots) |
| Outdated Spyder version | `conda update spyder` |
| Code analysis running on a very large file | Disable real-time code analysis in Preferences → Editor → Code Introspection/Analysis |

### Plots do not appear

**Possible fixes:**

1. Check the matplotlib backend: `%matplotlib inline` (for Plots pane) or `%matplotlib qt` (for separate windows)
2. Ensure you call `plt.show()` at the end of your plotting code
3. Restart the console (`Ctrl+.`) and re-run your script
4. Check **Preferences → IPython Console → Graphics → Backend** --- set it to "Inline"

### "NameError: name 'stack' is not defined"

**Cause:** The variable was created in a previous session or a different console, and the current console does not have it.

**Fix:** Re-run the cell or script that creates the variable. If you recently restarted the console, all variables are cleared.

### Spyder opens but the console shows errors

**Fix:** Try resetting Spyder's configuration:

```bash
spyder --reset
```

This restores all settings to defaults. You will need to reconfigure your preferences, but it resolves most configuration-related crashes.

### Code completion is not working

**Possible fixes:**

1. Ensure the package is installed and importable in the current console
2. Restart the console
3. Check **Preferences → Editor → Code Introspection/Analysis** --- ensure "Enable code completion" is checked
4. For large packages, completion may take a moment to index; wait a few seconds after importing

### "The kernel died, restarting" message

**Common causes:**

| Cause | Fix |
|---|---|
| Out of memory (loading a very large file) | Load data in chunks or reduce the data size |
| Segfault in a C extension | Update the offending package (`conda update package_name`) |
| Infinite recursion | Add a base case to your recursive function |
| Incompatible package versions | Create a fresh conda environment and reinstall |

### Spyder will not start

```bash
# Try resetting configuration
spyder --reset

# If that fails, reinstall
conda activate microscopy
conda remove spyder
conda install spyder
```

### Editor shows wrong encoding or garbled characters

Go to **Preferences → Editor → Advanced settings** and set the default encoding to **UTF-8**. Re-open the file.

---

## 30. Spyder vs. Other Editors

### When to use Spyder

Spyder is the best choice when:

- You are doing **interactive data analysis** --- loading data, exploring variables, plotting, iterating
- You come from a **MATLAB background** and want a familiar interface
- You work primarily with **NumPy arrays, pandas DataFrames, and matplotlib plots**
- You value the **Variable Explorer** for inspecting complex data structures
- You want an IDE that **works out of the box** without extensive configuration
- You are **new to Python** and want a gentle learning curve

### When to consider VS Code

VS Code may be better when:

- You are writing a **large software package** (hundreds of files, complex project structure)
- You need **extensive extension support** (e.g., Docker, Git integration, remote development)
- You work in **multiple programming languages** (Python, JavaScript, C++, etc.)
- You want **remote development** (editing code on a server via SSH)
- You need a more **powerful debugger** for complex multi-process applications

### When to consider Jupyter Notebooks

Jupyter may be better when:

- You need to **share analysis results** with non-programmers (HTML export with embedded figures)
- You are creating **tutorials or documentation** with interleaved code and explanatory text
- You are doing **quick exploratory analysis** where you want to see output next to code
- You need to present at **lab meetings** with a polished, narrative format

### When to consider PyCharm

PyCharm may be better when:

- You are developing a **production application** or library
- You need advanced **refactoring tools** (rename across a whole project, extract methods)
- You want built-in **test runner** integration
- You work in a **professional software development** context

### Using multiple editors

Many scientists use Spyder as their primary tool for daily analysis and switch to VS Code or PyCharm for larger coding projects. There is no reason to use only one editor --- choose the best tool for each task.

---

## 31. Quick Reference

### Spyder panes at a glance

| Pane | Purpose | Key shortcut |
|---|---|---|
| Editor | Write scripts | `Ctrl+Shift+E` |
| IPython Console | Run commands, see output | `Ctrl+Shift+I` |
| Variable Explorer | Inspect variables | `Ctrl+Shift+V` |
| Plots | View matplotlib figures | --- |
| Files | Browse the file system | `Ctrl+Shift+F` |
| Help | View documentation | `Ctrl+Shift+H` |
| History | Command history | --- |
| Profiler | Time your code | `F10` to profile |
| Code Analysis | Lint your code | `F8` |
| Outline | Navigate script structure | --- |

### Running code

| Action | Shortcut |
|---|---|
| Run entire file | `F5` |
| Run selection / current line | `F9` |
| Run current cell | `Ctrl+Enter` |
| Run cell and advance | `Shift+Enter` |
| Run configuration | `Ctrl+F6` |

### Debugging

| Action | Shortcut |
|---|---|
| Start debugger | `Ctrl+F5` |
| Toggle breakpoint | `F12` |
| Continue | `Ctrl+F12` |
| Step over | `Ctrl+F10` |
| Step into | `Ctrl+F11` |
| Step out | `Ctrl+Shift+F11` |
| Stop debugging | `Ctrl+Shift+F12` |
| Post-mortem debug | `%debug` in console |

### IPython magic commands

| Magic | Purpose |
|---|---|
| `%run script.py` | Run a script |
| `%timeit expression` | Time an expression |
| `%who` / `%whos` | List variables in memory |
| `%reset` | Clear all variables |
| `%pwd` / `%cd` | Print / change working directory |
| `%matplotlib inline` | Inline plots (Plots pane) |
| `%matplotlib qt` | Interactive plot windows |
| `%debug` | Enter post-mortem debugger |
| `func?` | Show docstring |
| `func??` | Show source code |

### Console tips

| Action | How |
|---|---|
| Restart console | `Ctrl+.` |
| Clear console output | Right-click → Clear console |
| Interrupt execution | `Ctrl+C` |
| New console tab | `Consoles → Open an IPython console` |
| Search history | `Ctrl+R` in console |

### Code cells

```python
# %% Cell name          ← Defines a cell boundary
# Code in this cell
# Ends at the next # %% marker or end of file
```

---

## 32. Resources for Learning Spyder

### Official documentation

- **Spyder documentation:** [https://docs.spyder-ide.org/](https://docs.spyder-ide.org/) --- comprehensive guide to all features
- **Spyder GitHub repository:** [https://github.com/spyder-ide/spyder](https://github.com/spyder-ide/spyder) --- source code, issue tracker, and discussions
- **Spyder tutorials:** [https://docs.spyder-ide.org/current/videos/first-steps-with-spyder.html](https://docs.spyder-ide.org/current/videos/first-steps-with-spyder.html) --- official video walkthroughs

### Learning Python for science

- **Python Manual for Biology Researchers** (the companion to this manual) --- covers Python fundamentals, NumPy, pandas, matplotlib, tifffile, and scientific workflows
- **Scientific Python Lectures:** [https://lectures.scientific-python.org/](https://lectures.scientific-python.org/) --- free, comprehensive scientific Python course
- **Python Data Science Handbook** by Jake VanderPlas --- excellent coverage of NumPy, pandas, matplotlib, and scikit-learn
- **Real Python:** [https://realpython.com/](https://realpython.com/) --- high-quality Python tutorials at all levels

### Key package documentation

| Package | Documentation URL | What it does |
|---|---|---|
| NumPy | [https://numpy.org/doc/](https://numpy.org/doc/) | Arrays and numerical computation |
| pandas | [https://pandas.pydata.org/docs/](https://pandas.pydata.org/docs/) | Tabular data analysis |
| matplotlib | [https://matplotlib.org/stable/](https://matplotlib.org/stable/) | Plotting and visualisation |
| tifffile | [https://github.com/cgohlke/tifffile](https://github.com/cgohlke/tifffile) | Reading and writing TIFF files |
| scikit-image | [https://scikit-image.org/docs/stable/](https://scikit-image.org/docs/stable/) | Image processing |
| scipy | [https://docs.scipy.org/doc/scipy/](https://docs.scipy.org/doc/scipy/) | Scientific algorithms (fitting, filtering, statistics) |
| trackpy | [http://soft-matter.github.io/trackpy/](http://soft-matter.github.io/trackpy/) | Particle tracking |

### Getting help

1. **Spyder's Help pane** (`Ctrl+I`) --- instant documentation for any function
2. **Stack Overflow** --- search for your error message; most common Python/Spyder questions have been answered
3. **Spyder GitHub Discussions** --- for Spyder-specific questions: [https://github.com/spyder-ide/spyder/discussions](https://github.com/spyder-ide/spyder/discussions)
4. **The Python Manual for Biology Researchers** --- the companion to this document, covering Python fundamentals and scientific workflows

### Cheat sheets

- **Spyder keyboard shortcuts:** `Tools → Preferences → Keyboard shortcuts` (searchable within Spyder)
- **NumPy cheat sheet:** [https://numpy.org/devdocs/user/quickstart.html](https://numpy.org/devdocs/user/quickstart.html)
- **pandas cheat sheet:** [https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf)
- **matplotlib cheat sheet:** [https://matplotlib.org/cheatsheets/](https://matplotlib.org/cheatsheets/)

---

*This manual is a companion to the Python Manual for Biology Researchers. Together, they provide a complete guide to using Python and Spyder for PIEZO1 research and microscopy data analysis.*

*George Dickinson | george.dickinson@gmail.com*
