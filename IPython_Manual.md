# IPython Manual for Biology Researchers

**A Companion to the Python Manual for Biology Researchers**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is IPython?](#1-introduction-what-is-ipython)
2. [Installing and Launching IPython](#2-installing-and-launching-ipython)
3. [The IPython Prompt](#3-the-ipython-prompt)

**Part II: Core Features**

4. [Tab Completion](#4-tab-completion)
5. [Introspection: Getting Help](#5-introspection-getting-help)
6. [Input and Output History](#6-input-and-output-history)
7. [Magic Commands](#7-magic-commands)

**Part III: Working Efficiently**

8. [Shell Integration](#8-shell-integration)
9. [Timing and Profiling](#9-timing-and-profiling)
10. [Debugging with IPython](#10-debugging-with-ipython)
11. [Auto-Reloading Modules](#11-auto-reloading-modules)

**Part IV: Display and Configuration**

12. [Rich Display and Pretty Printing](#12-rich-display-and-pretty-printing)
13. [Configuring IPython](#13-configuring-ipython)
14. [IPython Profiles](#14-ipython-profiles)

**Part V: IPython in Practice**

15. [Interactive Microscopy Data Exploration](#15-interactive-microscopy-data-exploration)
16. [Quick Data Inspection Recipes](#16-quick-data-inspection-recipes)
17. [IPython vs. Jupyter vs. Standard Python](#17-ipython-vs-jupyter-vs-standard-python)

**Appendices**

18. [Quick Reference](#18-quick-reference)
19. [Resources for Learning IPython](#19-resources-for-learning-ipython)

---

## 1. Introduction: What is IPython?

### What is IPython?

IPython (Interactive Python) is an enhanced interactive Python shell created by Fernando Pérez in 2001. It takes the standard Python REPL (Read-Eval-Print Loop) and adds powerful features: syntax highlighting, tab completion, inline help, magic commands, history, and much more.

IPython is the **engine underneath Jupyter Notebooks**. When you run code in a Jupyter notebook cell, it is executed by an IPython kernel. Everything you learn about IPython --- magic commands, tab completion, introspection --- works identically in Jupyter. Think of IPython as the engine and Jupyter as the dashboard.

### Why IPython for biology research?

| Task | Standard Python REPL | IPython |
|---|---|---|
| See what methods an object has | `dir(obj)` (ugly list) | `obj.` + `Tab` (filtered, readable) |
| Get help on a function | `help(func)` (pages of text) | `func?` (concise, formatted) |
| Time a calculation | Write your own timing code | `%timeit expression` |
| Re-run a previous command | Scroll through history | `Ctrl+R` to search, `_i5` to recall input 5 |
| Run a shell command | `os.system("ls")` | `!ls` |
| Debug an error | Add print statements | `%debug` drops you into the debugger |
| Reload edited code | Restart Python | `%autoreload` reloads automatically |

### How this manual relates to the other manuals

This manual is a companion to the *Python Manual for Biology Researchers* and the *Jupyter Notebook Manual*. Many features described here (magic commands, tab completion, introspection) also work in Jupyter notebooks --- this manual covers them in greater depth and focuses on the terminal-based IPython shell specifically.

---

## 2. Installing and Launching IPython

### Installation

IPython is included with Anaconda. If you need to install it separately:

```bash
conda activate microscopy
pip install ipython
```

### Launching

```bash
# Start IPython
ipython

# Start with a specific profile (see Section 14)
ipython --profile=microscopy

# Start and immediately run a script
ipython -i analysis.py
# The -i flag keeps IPython open after the script finishes,
# so you can inspect variables interactively
```

### What you see

```
Python 3.11.5 (main, Sep 11 2023, 08:19:27)
Type 'copyright', 'credits' or 'license' for more information
IPython 8.20.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]:
```

The `In [1]:` prompt is IPython's signature. The number increments with each command you run.

### Exiting

```python
exit       # or
quit       # or
Ctrl+D     # (on macOS/Linux)
```

---

## 3. The IPython Prompt

### Input and output numbering

Every command you enter gets a numbered `In` prompt, and every result gets a numbered `Out` prompt:

```python
In [1]: 2 + 3
Out[1]: 5

In [2]: import numpy as np

In [3]: np.mean([1, 2, 3, 4, 5])
Out[3]: 3.0
```

These numbers are important --- you can recall any previous input or output by number (see Section 6).

### Multi-line input

IPython automatically handles multi-line constructs. Just start typing and press Enter:

```python
In [4]: for i in range(3):
   ...:     print(f"Frame {i}")
   ...:
Frame 0
Frame 1
Frame 2
```

The `...:` continuation prompt appears until you finish the block (press Enter on an empty line).

### Syntax highlighting

IPython colours your code as you type: keywords in green, strings in red, numbers in cyan, etc. This makes it much easier to spot typos and syntax errors before you run the code.

---

## 4. Tab Completion

Tab completion is one of IPython's most useful features. Press `Tab` to complete names, explore objects, and navigate the filesystem.

### Variable and function names

```python
In [1]: import numpy as np

In [2]: np.me<Tab>
np.mean      np.median    np.memmap    np.meshgrid

In [3]: np.mean<Tab>    # Completes to np.mean
```

### Object attributes and methods

```python
In [4]: data = np.array([1, 2, 3, 4, 5])

In [5]: data.<Tab>
data.all       data.clip      data.dtype     data.max
data.any       data.copy      data.fill      data.mean
data.argmax    data.cumsum    data.flatten   data.min
data.argmin    data.data      data.item      data.ndim
...
# Shows all attributes and methods of the array
```

### Module exploration

```python
In [6]: import pandas as pd

In [7]: pd.read_<Tab>
pd.read_clipboard   pd.read_feather    pd.read_json
pd.read_csv         pd.read_fwf        pd.read_orc
pd.read_excel       pd.read_hdf        pd.read_parquet
pd.read_gbq         pd.read_html       pd.read_pickle
...
```

### File path completion

```python
In [8]: !ls data/<Tab>
data/localisations.csv  data/metadata.xlsx  data/calcium_stack.tif

In [9]: import pandas as pd
In [10]: df = pd.read_csv("data/<Tab>
data/localisations.csv  data/metadata.xlsx
```

### Dictionary key completion

```python
In [11]: params = {"pixel_size": 0.108, "fps": 100, "laser_power": 50}
In [12]: params["<Tab>
params["fps"]           params["laser_power"]   params["pixel_size"]
```

---

## 5. Introspection: Getting Help

IPython provides rapid access to documentation without leaving the shell.

### The `?` operator

```python
# Concise help for a function
In [1]: np.mean?
```

This displays:
```
Signature: np.mean(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True)
Docstring:
Compute the arithmetic mean along the specified axis.
...
```

### The `??` operator (source code)

```python
# Show the actual source code (for Python-implemented functions)
In [2]: np.mean??
```

This shows the full source code of the function, which is invaluable when you need to understand exactly what a function does.

### Searching with wildcards

```python
# Find all NumPy functions containing "sort"
In [3]: np.*sort*?
np.argsort
np.lexsort
np.msort
np.searchsorted
np.sort
np.sort_complex

# Find all pandas read functions
In [4]: pd.read_*?
pd.read_clipboard
pd.read_csv
pd.read_excel
...
```

### Quick help examples for microscopy

```python
# How does tifffile.imread work?
In [5]: import tifffile
In [6]: tifffile.imread?

# What parameters does plt.imshow accept?
In [7]: import matplotlib.pyplot as plt
In [8]: plt.imshow?

# What methods does a pandas DataFrame have for missing data?
In [9]: pd.DataFrame.drop*?
pd.DataFrame.drop
pd.DataFrame.drop_duplicates
pd.DataFrame.dropna
```

---

## 6. Input and Output History

IPython keeps a complete history of everything you type and every result produced.

### Recalling by number

```python
# Access previous outputs by number
In [1]: 2 + 3
Out[1]: 5

In [2]: Out[1]       # Retrieve output 1
Out[2]: 5

In [3]: In[1]        # Retrieve input 1 (as a string)
Out[3]: '2 + 3\n'
```

### Special output shortcuts

| Variable | Meaning |
|---|---|
| `_` | The last output (same as `Out[-1]`) |
| `__` | The second-to-last output |
| `___` | The third-to-last output |
| `_5` | Output number 5 (same as `Out[5]`) |
| `_i5` | Input number 5 (same as `In[5]`) |

```python
In [1]: np.mean([1, 2, 3])
Out[1]: 2.0

In [2]: _ * 10     # Use the last result
Out[2]: 20.0
```

### Searching history

Press `Ctrl+R` to search through your command history (reverse incremental search):

```
(reverse-i-search)`msd': lags, msd = compute_msd(xy_um, dt)
```

Start typing any part of a previous command and IPython finds it. Press `Ctrl+R` again to cycle through matches. Press `Enter` to run the found command, or `Ctrl+C` to cancel.

### Arrow key navigation

- `↑` / `↓` --- cycle through previous commands
- Start typing then press `↑` --- cycle through commands that start with what you have typed

```python
In [10]: np.    # Type "np." then press ↑ to cycle through all previous np.* commands
```

### The `%history` magic

```python
# Show all inputs in this session
%history

# Show inputs 5-10
%history 5-10

# Show the last 5 inputs
%history -l 5

# Save history to a file
%history -f session_log.py
```

---

## 7. Magic Commands

Magic commands are special IPython commands that extend Python with useful utilities. They start with `%` (line magics) or `%%` (cell magics).

### Essential magics

| Magic | Purpose | Example |
|---|---|---|
| `%timeit` | Benchmark a single line | `%timeit np.mean(data)` |
| `%%timeit` | Benchmark a code block | See Section 9 |
| `%time` | Time a single execution | `%time stack = tifffile.imread("big.tif")` |
| `%run` | Run a Python script | `%run analysis.py` |
| `%pwd` | Print working directory | `%pwd` |
| `%cd` | Change directory | `%cd ~/experiments` |
| `%ls` | List directory contents | `%ls data/` |
| `%who` | List defined variables | `%who` |
| `%whos` | List variables with details | `%whos` |
| `%reset` | Clear all variables | `%reset -f` |
| `%debug` | Enter debugger after error | `%debug` |
| `%pdb` | Toggle auto-debugger | `%pdb on` |
| `%load` | Load file into input | `%load utils.py` |
| `%save` | Save input lines to file | `%save script.py 1-10` |
| `%edit` | Open an external editor | `%edit` |
| `%autoreload` | Auto-reload changed modules | See Section 11 |
| `%lsmagic` | List all available magics | `%lsmagic` |

### `%who` and `%whos` --- inspecting your workspace

```python
In [1]: import numpy as np
In [2]: data = np.random.rand(100)
In [3]: name = "PIEZO1"
In [4]: fps = 100.0

In [5]: %who
data    fps     name    np

In [6]: %whos
Variable   Type       Data/Info
-------------------------------
data       ndarray    100: 100 elems, type `float64`, 800 bytes
fps        float      100.0
name       str        PIEZO1
np         module     <module 'numpy' from '/...>
```

`%whos` is particularly useful for tracking what variables are in memory and how much space they use --- important when working with large image stacks.

### `%who_ls` --- list as a Python list

```python
In [7]: var_list = %who_ls
In [8]: print(var_list)
['data', 'fps', 'name', 'np']
```

### `%save` --- save your work

```python
# Save lines 1-10 of this session to a file
%save analysis_session.py 1-10

# Append to an existing file
%save -a analysis_session.py 15-20
```

### `%run` --- run scripts interactively

```python
# Run a script --- all variables defined in it become available
%run analysis_pipeline.py

# Run and enter the debugger if it crashes
%run -d analysis_pipeline.py

# Run with command-line arguments
%run preprocess.py --input data.tif --output corrected.tif
```

---

## 8. Shell Integration

IPython provides seamless integration with your operating system's shell.

### Running shell commands with `!`

```python
In [1]: !ls data/
localisations.csv  metadata.xlsx  calcium_stack.tif

In [2]: !wc -l data/localisations.csv
125431 data/localisations.csv

In [3]: !du -sh data/
2.1G    data/
```

### Capturing shell output

```python
# Store the output in a Python list
In [4]: files = !ls data/*.csv
In [5]: print(f"Found {len(files)} CSV files")
Found 3 CSV files

In [6]: for f in files:
   ...:     print(f)
data/localisations_FOV1.csv
data/localisations_FOV2.csv
data/localisations_FOV3.csv
```

### Passing Python variables to shell commands

```python
In [7]: filename = "localisations.csv"
In [8]: !wc -l data/{filename}
125431 data/localisations.csv

In [9]: threshold = 30
In [10]: !echo "Uncertainty threshold: {threshold} nm"
Uncertainty threshold: 30 nm
```

### Common shell commands for microscopy work

```python
# Check file sizes (are your TIFFs the expected size?)
!ls -lh data/*.tif

# Count CSV files in a directory
!ls data/*.csv | wc -l

# Find all ThunderSTORM output files recursively
!find . -name "*thunderstorm*.csv" -type f

# Check available disk space
!df -h .

# Check memory usage
!free -h    # Linux
```

---

## 9. Timing and Profiling

### `%timeit` --- precise benchmarking

`%timeit` runs a statement many times and reports the average with standard deviation. This is the right way to benchmark code.

```python
In [1]: import numpy as np
In [2]: data = np.random.rand(10000)

In [3]: %timeit np.mean(data)
7.2 µs ± 120 ns per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

In [4]: %timeit data.mean()
6.8 µs ± 95 ns per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

# Compare loop vs. vectorised
In [5]: %timeit sum(data)
1.2 ms ± 15 µs per loop

In [6]: %timeit np.sum(data)
5.8 µs ± 110 ns per loop
# NumPy is ~200x faster!
```

### `%time` --- single execution timing

```python
In [7]: %time stack = tifffile.imread("calcium_timelapse.tif")
CPU times: user 1.2 s, sys: 340 ms, total: 1.54 s
Wall time: 1.6 s
```

### `%%timeit` --- benchmark a code block

```python
In [8]: %%timeit
   ...: result = np.zeros(1000)
   ...: for i in range(1000):
   ...:     result[i] = np.sqrt(data[i])
   ...:
2.1 ms ± 45 µs per loop
```

### `%prun` --- profile function calls

```python
# See which functions take the most time
In [9]: %prun compute_msd(xy_um, dt)
         1000 function calls in 0.052 seconds

   Ordered by: internal time
   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
       25    0.035    0.001    0.035    0.001 analysis.py:12(compute_msd)
       50    0.010    0.000    0.010    0.000 {numpy.core.multiarray.array}
...
```

### Practical timing examples

```python
# Which is faster for reading a large CSV?
In [10]: %time df1 = pd.read_csv("big_file.csv")
Wall time: 3.2 s

In [11]: %time df2 = pd.read_csv("big_file.csv", usecols=["frame", "x", "y"])
Wall time: 1.1 s
# Reading only needed columns is 3x faster!

# Is float32 noticeably faster than float64 for your MSD calculation?
In [12]: xy_64 = np.random.rand(10000, 2).astype(np.float64)
In [13]: xy_32 = xy_64.astype(np.float32)

In [14]: %timeit compute_msd(xy_64, 0.01)
45 ms ± 800 µs

In [15]: %timeit compute_msd(xy_32, 0.01)
38 ms ± 600 µs
```

---

## 10. Debugging with IPython

### Post-mortem debugging with `%debug`

When code throws an error, type `%debug` immediately after to enter the debugger at the point of failure:

```python
In [1]: result = 1 / 0
---------------------------------------------------------------------------
ZeroDivisionError                         Traceback (most recent call last)
...

In [2]: %debug
> <ipython-input-1>(1)<module>()
----> 1 result = 1 / 0

ipdb> # You are now in the debugger. Inspect variables, step through code.
ipdb> quit
```

### Automatic debugging with `%pdb`

```python
# Turn on automatic post-mortem debugging
In [3]: %pdb on
Automatic pdb calling has been turned ON

# Now ANY unhandled exception drops you into the debugger automatically
In [4]: df = pd.read_csv("nonexistent_file.csv")
---------------------------------------------------------------------------
FileNotFoundError ...
> /usr/lib/python3.11/...
ipdb>    # Debugger activates automatically
```

### Debugger commands

Once inside `ipdb>`:

| Command | Action |
|---|---|
| `p variable` | Print a variable's value |
| `pp variable` | Pretty-print a variable |
| `l` | Show code around current line |
| `u` | Go up one frame (to the caller) |
| `d` | Go down one frame |
| `n` | Execute next line (step over) |
| `s` | Step into a function call |
| `c` | Continue execution |
| `q` | Quit the debugger |
| `h` | Show help |

### Practical debugging example

```python
In [1]: def process_trajectory(track_df, dt):
   ...:     xy = track_df[["x_um", "y_um"]].to_numpy()
   ...:     steps = np.diff(xy, axis=0)
   ...:     distances = np.sqrt(np.sum(steps**2, axis=1))
   ...:     total_path = np.sum(distances)
   ...:     duration = (track_df["frame"].max() - track_df["frame"].min()) * dt
   ...:     speed = total_path / duration    # Might divide by zero!
   ...:     return speed

In [2]: %pdb on

In [3]: result = process_trajectory(short_track, 0.01)
---------------------------------------------------------------------------
ZeroDivisionError ...

ipdb> p duration    # Check the offending variable
0.0
ipdb> p track_df["frame"].unique()
array([42])         # Only one frame --- duration is zero!
ipdb> q

# Now you know the bug: need to handle single-frame trajectories
```

---

## 11. Auto-Reloading Modules

When developing analysis code, you often edit a `.py` file and want to test the changes immediately without restarting IPython.

### The `%autoreload` magic

```python
# Enable auto-reloading
In [1]: %load_ext autoreload
In [2]: %autoreload 2    # Reload ALL modules before every command

# Now import your module
In [3]: from analysis_utils import compute_msd, path_length

# Edit analysis_utils.py in your editor, save it...

# The next time you call the function, IPython uses the updated code
In [4]: lags, msd = compute_msd(xy, dt)    # Uses the new version!
```

### Autoreload modes

| Mode | Behaviour |
|---|---|
| `%autoreload 0` | Disable auto-reloading (default) |
| `%autoreload 1` | Reload only modules imported with `%aimport` |
| `%autoreload 2` | Reload all modules (except exclusions) every time |
| `%autoreload 3` | Like 2, but also reloads all module attributes |

### Recommended workflow for code development

```python
# 1. Start IPython with autoreload
%load_ext autoreload
%autoreload 2

# 2. Import your module
from piezo1_analysis import compute_msd, classify_trajectories

# 3. Load data
ts = pd.read_csv("localisations.csv")

# 4. Test your function
result = compute_msd(xy, dt)

# 5. Notice a bug, edit piezo1_analysis.py in VS Code, save

# 6. Re-run --- IPython automatically uses the updated code
result = compute_msd(xy, dt)    # New version, no restart needed
```

This workflow is one of the most powerful features of IPython for scientific software development. It saves you from constantly restarting the interpreter and reloading data.

---

## 12. Rich Display and Pretty Printing

### Pretty printing

IPython automatically pretty-prints complex objects:

```python
# Standard Python REPL: hard to read
>>> {"cell_types": ["EC", "KC", "NSC"], "treatments": ["control", "Yoda1"], "n_replicates": 3}
{'cell_types': ['EC', 'KC', 'NSC'], 'treatments': ['control', 'Yoda1'], 'n_replicates': 3}

# IPython: formatted and readable
In [1]: {"cell_types": ["EC", "KC", "NSC"], "treatments": ["control", "Yoda1"], "n_replicates": 3}
Out[1]:
{'cell_types': ['EC', 'KC', 'NSC'],
 'treatments': ['control', 'Yoda1'],
 'n_replicates': 3}
```

### NumPy array display

```python
In [2]: np.random.rand(3, 4)
Out[2]:
array([[0.5488, 0.7152, 0.6028, 0.5449],
       [0.4237, 0.6459, 0.4376, 0.8918],
       [0.9637, 0.3834, 0.7917, 0.5289]])
```

### Controlling NumPy print options

```python
# Show more decimal places
np.set_printoptions(precision=6)

# Show all elements (no truncation with "...")
np.set_printoptions(threshold=np.inf)

# Compact display
np.set_printoptions(linewidth=120)

# Reset to defaults
np.set_printoptions()
```

---

## 13. Configuring IPython

### The IPython configuration file

Generate a configuration file:

```bash
ipython profile create
# Creates: ~/.ipython/profile_default/ipython_config.py
```

### Useful configuration options

Edit `~/.ipython/profile_default/ipython_config.py`:

```python
c = get_config()

# Auto-load these extensions on startup
c.InteractiveShellApp.extensions = ["autoreload"]

# Run these lines on startup
c.InteractiveShellApp.exec_lines = [
    "%autoreload 2",
    "import numpy as np",
    "import pandas as pd",
    "import matplotlib.pyplot as plt",
]

# Enable auto-magic (run magics without the % prefix)
c.InteractiveShell.automagic = True

# Set the editor for %edit
c.TerminalInteractiveShell.editor = "code"   # VS Code

# Confirm before exiting
c.TerminalInteractiveShell.confirm_exit = False
```

### Startup files

Any `.py` or `.ipy` file placed in `~/.ipython/profile_default/startup/` will be executed automatically when IPython starts. This is perfect for always-needed imports:

```python
# File: ~/.ipython/profile_default/startup/00-imports.py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
print("Scientific imports loaded.")
```

---

## 14. IPython Profiles

Profiles let you maintain separate configurations for different types of work.

### Creating a profile for microscopy

```bash
ipython profile create microscopy
# Creates: ~/.ipython/profile_microscopy/
```

Edit `~/.ipython/profile_microscopy/ipython_config.py`:

```python
c = get_config()

c.InteractiveShellApp.exec_lines = [
    "%autoreload 2",
    "import numpy as np",
    "import pandas as pd",
    "import matplotlib.pyplot as plt",
    "import tifffile",
    "from pathlib import Path",
    "PIXEL_SIZE_UM = 0.108",
    "print('Microscopy profile loaded. Pixel size: 0.108 um')",
]
```

Launch with:

```bash
ipython --profile=microscopy
```

---

## 15. Interactive Microscopy Data Exploration

IPython is ideal for quick, interactive data exploration. Here are common patterns.

### Quick TIFF inspection

```python
In [1]: import tifffile, numpy as np

In [2]: stack = tifffile.imread("calcium_timelapse.tif")

In [3]: stack.shape, stack.dtype
Out[3]: ((500, 512, 512), dtype('uint16'))

In [4]: stack.min(), stack.max(), stack.mean()
Out[4]: (100, 45230, 1542.7)

In [5]: # Check for issues: any saturated pixels?
In [6]: np.sum(stack == 65535)
Out[6]: 0    # Good, no saturation
```

### Quick localisation table check

```python
In [1]: import pandas as pd

In [2]: ts = pd.read_csv("localisations.csv")

In [3]: ts.shape
Out[3]: (125430, 9)

In [4]: ts.head()    # See column names and first rows

In [5]: ts.describe()    # Summary stats for all numeric columns

In [6]: ts["uncertainty [nm]"].quantile([0.5, 0.9, 0.95, 0.99])
Out[6]:
0.50    18.2
0.90    32.1
0.95    41.5
0.99    68.3
Name: uncertainty [nm], dtype: float64

In [7]: # Set a reasonable uncertainty cutoff
In [8]: ts_clean = ts[ts["uncertainty [nm]"] < 30]
In [9]: len(ts_clean) / len(ts)
Out[9]: 0.847    # 84.7% retained
```

### Quick plot from the terminal

```python
In [1]: import matplotlib
In [2]: matplotlib.use("TkAgg")    # or "Qt5Agg" --- enables a plot window
In [3]: import matplotlib.pyplot as plt

In [4]: plt.ion()    # Interactive mode: plots appear immediately

In [5]: ts["uncertainty [nm]"].hist(bins=50)
In [6]: plt.xlabel("Uncertainty (nm)")
In [7]: plt.show()
```

---

## 16. Quick Data Inspection Recipes

### One-liners for common checks

```python
# How many localisations per frame?
ts.groupby("frame")["id"].count().describe()

# What fraction of frames have > 100 localisations?
(ts.groupby("frame")["id"].count() > 100).mean()

# Range of coordinates (is the data in nm or pixels?)
ts[["x [nm]", "y [nm]"]].describe()

# Most common values in a column (detect duplicates or artefacts)
ts["intensity [photon]"].value_counts().head(10)

# Memory usage
ts.memory_usage(deep=True).sum() / 1e6    # MB

# Quick correlation check
ts[["sigma [nm]", "intensity [photon]", "uncertainty [nm]"]].corr()
```

### Combining tab completion and introspection for discovery

```python
In [1]: ts.<Tab>        # See all DataFrame methods
In [2]: ts.groupby?     # Read the groupby docstring
In [3]: ts.groupby??    # See the full source code
In [4]: ts.*sort*?      # Find all sort-related methods
ts.sort_index
ts.sort_values
```

---

## 17. IPython vs. Jupyter vs. Standard Python

| Feature | Python REPL | IPython | Jupyter Notebook |
|---|---|---|---|
| Syntax highlighting | No | Yes | Yes |
| Tab completion | Basic | Advanced | Advanced |
| `?` and `??` help | No | Yes | Yes |
| Magic commands | No | Yes | Yes (same ones) |
| Inline plots | No | Separate window | Inline in notebook |
| Rich output (HTML tables) | No | No | Yes |
| Markdown documentation | No | No | Yes |
| Session as a document | No | No | Yes |
| Easy to share | No | History file | Yes (`.ipynb`) |
| Startup speed | Fast | Fast | Slower (starts server) |
| Best for | Quick test | Interactive exploration | Documented analysis |

### When to use each

| Tool | Use when |
|---|---|
| **IPython in the terminal** | Quick tests, debugging, exploring objects, timing code, developing modules with autoreload |
| **Jupyter Notebook** | Documented analysis, creating figures, sharing work, presentations |
| **Python script (`.py`)** | Reusable code, automated pipelines, command-line tools, code shared across projects |

### A typical day in the lab

1. **Morning:** Open IPython to quickly inspect a new dataset, check file sizes, test a function
2. **Analysis session:** Open a Jupyter notebook for documented, figure-heavy analysis
3. **Code development:** Edit `.py` files in VS Code, test interactively with IPython + `%autoreload`
4. **Batch processing:** Run a Python script to process all files overnight

---

## 18. Quick Reference

### Launch commands

```bash
ipython                          # Start IPython
ipython --profile=microscopy     # With a specific profile
ipython -i script.py             # Run a script, keep IPython open
```

### Introspection

| Command | Purpose |
|---|---|
| `obj?` | Docstring and signature |
| `obj??` | Full source code |
| `obj.<Tab>` | List attributes and methods |
| `*pattern*?` | Wildcard search |

### History

| Command | Purpose |
|---|---|
| `_` | Last output |
| `__` | Second-to-last output |
| `_5` | Output number 5 |
| `_i5` | Input number 5 |
| `Ctrl+R` | Reverse search history |
| `↑` / `↓` | Navigate history |
| `%history` | Show session history |
| `%save file.py 1-10` | Save lines to file |

### Essential magics

| Magic | Purpose |
|---|---|
| `%timeit expr` | Benchmark a line |
| `%time expr` | Time one execution |
| `%run script.py` | Run a script |
| `%who` / `%whos` | List variables |
| `%debug` | Post-mortem debugger |
| `%pdb on` | Auto-debugger on error |
| `%autoreload 2` | Auto-reload all modules |
| `%pwd` / `%cd` / `%ls` | Directory navigation |
| `%reset -f` | Clear all variables |
| `!command` | Run a shell command |

### Configuration

```bash
ipython profile create              # Generate config
ipython profile create microscopy   # Named profile
# Config file: ~/.ipython/profile_default/ipython_config.py
# Startup dir: ~/.ipython/profile_default/startup/
```

---

## 19. Resources for Learning IPython

| Resource | Description | Cost |
|---|---|---|
| **IPython documentation** (ipython.readthedocs.io) | Official docs with tutorials and configuration guide | Free |
| **IPython Cookbook** by Cyrille Rossant | Practical recipes for scientific computing with IPython | Book (print/ebook) |
| **Python Data Science Handbook** by Jake VanderPlas, Chapter 1 | Comprehensive IPython tutorial. Free online at jakevdp.github.io/PythonDataScienceHandbook/ | Free |
| **IPython built-in help** | Type `%quickref` in IPython for a concise reference card | Free |

---

*This manual was developed as a companion to the Python Manual for Biology Researchers, for the PIEZO1 research group. For questions or suggestions, contact george.dickinson@gmail.com.*
