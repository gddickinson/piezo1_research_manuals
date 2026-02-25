# Python Manual for Biology Researchers

**A Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Python Fundamentals**

1. [Introduction: Why Python?](#1-introduction-why-python)
2. [Setting Up Your Python Environment](#2-setting-up-your-python-environment)
3. [The Scientific Python Ecosystem](#3-the-scientific-python-ecosystem)
4. [Variables and Data Types](#4-variables-and-data-types)
5. [Operators](#5-operators)
6. [Strings](#6-strings)
7. [Collections: Lists, Tuples, Dictionaries, and Sets](#7-collections-lists-tuples-dictionaries-and-sets)
8. [Control Flow: if, elif, else](#8-control-flow-if-elif-else)
9. [Loops: for and while](#9-loops-for-and-while)
10. [Functions](#10-functions)
11. [Importing Modules and Packages](#11-importing-modules-and-packages)

**Part II: Scientific Computing**

12. [NumPy: The Foundation of Scientific Computing](#12-numpy-the-foundation-of-scientific-computing)
13. [Loading and Saving Image Data](#13-loading-and-saving-image-data)
14. [Visualisation with matplotlib](#14-visualisation-with-matplotlib)
15. [Extracting Fluorescence Traces](#15-extracting-fluorescence-traces)
16. [File Input/Output](#16-file-inputoutput)

**Part III: Robust Code**

17. [Error Handling](#17-error-handling)
18. [Common Errors and How to Fix Them](#18-common-errors-and-how-to-fix-them)
19. [Debugging Strategies](#19-debugging-strategies)
20. [Style Guide and Best Practices](#20-style-guide-and-best-practices)
21. [Python Reserved Words](#21-python-reserved-words)

**Part IV: Intermediate Python**

22. [Classes and Object-Oriented Programming](#22-classes-and-object-oriented-programming)
23. [Lambda Functions, Generators, and Other Patterns](#23-lambda-functions-generators-and-other-patterns)
24. [Working with Dates, Times, and Regular Expressions](#24-working-with-dates-times-and-regular-expressions)
25. [The pathlib Module: Modern Path Handling](#25-the-pathlib-module-modern-path-handling)
26. [Command-Line Arguments and Logging](#26-command-line-arguments-and-logging)

**Part V: Libraries, Projects, and the Wider Ecosystem**

27. [A Deeper Dive into the Python Ecosystem](#27-a-deeper-dive-into-the-python-ecosystem)
28. [Project Structure: From Single Script to Full Package](#28-project-structure-from-single-script-to-full-package)

**Part VI: Practical Examples and Integration**

29. [Practical Examples for Biology Research](#29-practical-examples-for-biology-research)
30. [Python Inside Other Software](#30-python-inside-other-software)

**Appendices**

31. [Using AI Assistants for Python Help](#31-using-ai-assistants-for-python-help)
32. [Resources for Learning Python](#32-resources-for-learning-python)
33. [Quick Reference](#33-quick-reference)

---

## 1. Introduction: Why Python?

### What is Python?

Python is a general-purpose programming language created by Guido van Rossum in 1991. It has become the most widely used language in scientific computing, and is now the number one most popular programming language worldwide (TIOBE index).

Python was designed to be **readable** --- its syntax reads like plain English, with far fewer symbols than languages like C or Java. This means you spend less time deciphering syntax and more time thinking about your science.

| Feature | What it means for you |
|---|---|
| **Free and open source** | No licence fees, no subscriptions, no vendor lock-in |
| **Cross-platform** | The same script runs on Windows, macOS, and Linux |
| **Readable syntax** | Code that reads like English --- easier to learn, write, and debug |
| **Batteries included** | Rich standard library for file I/O, maths, JSON, CSV, and more |
| **Interpreted** | Run code line-by-line with no compilation step --- test ideas instantly |
| **Scientific ecosystem** | NumPy, SciPy, matplotlib, pandas, scikit-image, tifffile --- all in Python |

### The recipe analogy

Think of Python like writing a recipe:

| Cooking | Python |
|---|---|
| Your recipe / instructions | Your Python script |
| The language (English) | Python syntax rules |
| The chef reading it | The Python interpreter |
| Kitchen equipment | Libraries (NumPy, matplotlib, etc.) |
| The finished dish | Your results and figures |

### Why Python for PIEZO1 research?

As a researcher studying PIEZO1 mechanosensitive ion channels, you work with:

- **TIRF microscopy images** --- large multi-frame TIFF stacks that need batch processing
- **Calcium imaging time-lapses** --- extracting fluorescence intensity traces over time
- **Fluorescently tagged proteins** --- quantifying expression levels and localisation
- **Single-molecule tracking data** --- localisation coordinates, trajectories, diffusion analysis
- **Cell culture experiments** --- organising and analysing data from many conditions

For example, in Bertaccini et al. 2025 (*Nature Communications*, "Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology"), the entire analysis pipeline --- from ThunderSTORM localisation tables through trajectory linking in FLIKA to diffusion coefficient calculations and statistical plotting --- was carried out with **Python 3.11.5** and standard scientific packages (NumPy, pandas, matplotlib, SciPy). Python handles all of these tasks, and the skills you learn transfer directly to bioinformatics, machine learning, and advanced image analysis.

### Programming languages you may already know

| Tool | Language underneath | You have probably... |
|---|---|---|
| ImageJ/Fiji | ImageJ Macro language | Recorded a macro or run a plugin |
| Excel | VBA | Written a formula or used a pivot table |
| MATLAB | MATLAB | Used it in a university course |
| R | R | Used it for statistics or bioinformatics |
| Microscope software | Proprietary scripting | Set up an acquisition sequence |
| **Python** | **Python** | **What we are learning now** |

Python can do everything the tools above can do, and much more.

### Is Python safe?

Yes. Python is governed by the **Python Software Foundation**, a non-profit organisation. Changes to the language go through a public proposal process (PEPs --- Python Enhancement Proposals), reviewed by an elected Steering Council. The source code is fully open on GitHub --- anyone can read and audit it. There are no fees, no proprietary extensions, and no user tracking.

Packages (add-on libraries) are published to **PyPI** (the Python Package Index) and can be installed with `pip install`. Major scientific packages like NumPy and SciPy are maintained by funded teams and volunteers, with public code review and rigorous testing.

---

## 2. Setting Up Your Python Environment

### Installing Python via Anaconda (recommended)

Anaconda is a Python distribution designed for scientific computing. It comes with Python, conda (a package manager), and many common scientific packages pre-installed.

1. Download Anaconda from [anaconda.com](https://www.anaconda.com/download)
2. Run the installer for your operating system
3. Open your terminal and verify:

```bash
conda --version
python --version
```

### Creating a conda environment for microscopy work

Environments let you keep different projects separate, each with their own packages and versions.

```bash
# Create an environment named "microscopy" with Python 3.11
# (Python 3.11.5 was used in the Bertaccini et al. 2025 PIEZO1-HaloTag study)
conda create -n microscopy python=3.11

# Activate it (do this every time you start working)
conda activate microscopy

# Install packages you will need
pip install numpy scipy matplotlib tifffile scikit-image pandas

# Verify everything is installed
python -c "import numpy; print('NumPy:', numpy.__version__)"
python -c "import tifffile; print('tifffile:', tifffile.__version__)"
python -c "import matplotlib; print('matplotlib:', matplotlib.__version__)"
```

### Running Python

```bash
# Always activate your environment first
conda activate microscopy

# Run a script
python my_analysis.py

# Start an interactive Python session (REPL)
python
>>> import numpy as np
>>> print(np.__version__)
>>> exit()

# Quick one-liner test
python -c "import numpy; print(numpy.__version__)"

# Check which Python you are using
which python          # macOS/Linux
where python          # Windows
```

### Choosing an editor

| Editor | Best for | Notes |
|---|---|---|
| **VS Code** | General-purpose coding | Free, excellent Python support, integrated terminal |
| **Spyder** | MATLAB-style workflow | Included with Anaconda, variable explorer, built-in plots |
| **Jupyter Notebook** | Exploratory analysis | Interactive cells, inline plots, great for sharing |
| **PyCharm** | Large projects | Full IDE with debugging, refactoring tools |

For beginners coming from MATLAB, **Spyder** will feel most familiar. For versatility, **VS Code** is recommended.

---

## 3. The Scientific Python Ecosystem

These are the key packages you will use for microscopy image analysis.

| Package | Purpose | Install |
|---|---|---|
| **NumPy** | N-dimensional arrays --- the foundation of all scientific computing. Images are just 2D or 3D arrays. | `pip install numpy` |
| **SciPy** | Signal processing, statistics, image filters, optimisation --- built on NumPy | `pip install scipy` |
| **matplotlib** | Publication-quality plots and figures. The PyPlot API feels like MATLAB. | `pip install matplotlib` |
| **tifffile** | Read and write TIFF files including multi-frame time-lapse stacks and OME-TIFF metadata. Created by Christoph Gohlke at UCI. | `pip install tifffile` |
| **scikit-image** | Image processing: filters, segmentation, morphology, feature detection. Built entirely on NumPy arrays. | `pip install scikit-image` |
| **pandas** | Tabular data as DataFrames. Great for metadata, measurements, and CSV import/export. | `pip install pandas` |

### Standard imports for microscopy analysis

```python
import numpy as np
import matplotlib.pyplot as plt
import tifffile
from scipy import signal
from skimage import io, filters
import pandas as pd
```

---

## 4. Variables and Data Types

### Variables: storing information

In Python, you create a variable by assigning a value with `=`. Python automatically figures out the type --- no declarations needed.

```python
# Numbers
frame_count = 500          # int   --- whole number
pixel_size  = 0.11         # float --- decimal number
temperature = 37.5         # float

# Strings (text)
filename  = "calcium_imaging.tif"
cell_name = 'cell_1'       # single or double quotes both work

# Booleans (True/False)
is_control = True
data_valid = False

# Print values
print(frame_count)              # 500
print(f"File: {filename}")      # f-string formatting
print(type(pixel_size))         # <class 'float'>
```

### Python data types

| Type | Example | Use for |
|---|---|---|
| `int` | `500`, `-3`, `0` | Whole numbers (frame counts, pixel indices) |
| `float` | `0.11`, `37.5`, `1.5e-3` | Decimal numbers (pixel sizes, temperatures, concentrations) |
| `str` | `"cell_1"`, `'/data/image.tif'` | Text (filenames, labels, notes) |
| `bool` | `True`, `False` | Yes/No flags (is_valid, is_control) |
| `complex` | `3 + 4j` | Complex numbers (rarely needed directly) |

### Type conversion

Python lets you convert between types explicitly:

```python
int(3.14)          # 3      (truncates, does NOT round)
float(42)          # 42.0
str(42)            # "42"
int("42")          # 42
float("3.14")      # 3.14
bool(0)            # False
bool(1)            # True
bool("")           # False  (empty string is False)
bool("hello")      # True   (non-empty string is True)

# Check before converting
"42".isdigit()     # True
"abc".isdigit()    # False
```

### Multiple assignment

```python
# Assign several variables at once
a, b, c = 1, 2, 3

# Swap two variables
a, b = b, a
```

---

## 5. Operators

### Arithmetic operators

| Operator | Operation | Example | Result |
|---|---|---|---|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division (always returns float) | `5 / 2` | `2.5` |
| `//` | Floor division (rounds down to integer) | `5 // 2` | `2` |
| `%` | Modulo (remainder) | `5 % 2` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |

### Comparison operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<` | Less than | `5 < 3` | `False` |
| `>=` | Greater than or equal | `5 >= 5` | `True` |
| `<=` | Less than or equal | `3 <= 5` | `True` |
| `in` | Membership test | `"a" in "cat"` | `True` |

### Logical operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `and` | Both must be True | `True and False` | `False` |
| `or` | At least one must be True | `True or False` | `True` |
| `not` | Reverses True/False | `not True` | `False` |

### Assignment operators

```python
x = 5       # Assign
x += 3      # Add and assign:      x = x + 3  -->  8
x -= 2      # Subtract and assign: x = x - 2  -->  6
x *= 2      # Multiply and assign: x = x * 2  -->  12
x /= 4      # Divide and assign:   x = x / 4  -->  3.0
```

---

## 6. Strings

Strings store text. They are used constantly for filenames, labels, and output messages.

### Creating strings

```python
name = "George"
path = '/data/image.tif'
multiline = """Line 1
Line 2
Line 3"""
```

### f-strings (formatted string literals) --- Python 3.6+

f-strings are the recommended way to embed variables inside strings. Prefix the string with `f` and put variables inside curly braces `{}`.

```python
cell = "cell_1"
intensity = 1542.7
frame = 42

message = f"Processing {cell}, frame {frame}, intensity {intensity:.1f}"
# "Processing cell_1, frame 42, intensity 1542.7"

# Format specifiers
f"{intensity:.2f}"      # "1542.70"   (2 decimal places)
f"{intensity:10.2f}"    # "   1542.70" (width 10, right-aligned)
f"{frame:05d}"          # "00042"      (zero-padded to 5 digits)
```

### Useful string methods

```python
text = "  PIEZO1-GFP Expression  "

text.lower()              # "  piezo1-gfp expression  "
text.upper()              # "  PIEZO1-GFP EXPRESSION  "
text.strip()              # "PIEZO1-GFP Expression"   (removes whitespace)
text.split("-")           # ['  PIEZO1', 'GFP Expression  ']
text.replace("GFP", "mCherry")  # "  PIEZO1-mCherry Expression  "
len(text)                 # 25

# Check contents
"PIEZO1" in text          # True
text.startswith("  PIE")  # True
text.endswith("on  ")     # True

# Join a list of strings
cells = ["cell_1", "cell_2", "cell_3"]
", ".join(cells)          # "cell_1, cell_2, cell_3"
```

---

## 7. Collections: Lists, Tuples, Dictionaries, and Sets

### Lists (mutable, ordered sequences)

Lists are the most commonly used collection. They are **ordered** and **mutable** (you can change them after creation).

```python
# Creating lists
frames = [0, 1, 2, 3, 4]
cells = ["cell_1", "cell_2", "cell_3"]
mixed = [1, "two", 3.0, True]      # Can mix types (but usually don't)
empty = []
```

#### Indexing (0-based)

Python uses **zero-based indexing** --- the first element is at index 0.

```python
frames = [0, 1, 2, 3, 4]

frames[0]       # 0     (first element)
frames[1]       # 1     (second element)
frames[-1]      # 4     (last element)
frames[-2]      # 3     (second to last)
```

Index diagram for `frames = [0, 1, 2, 3, 4]`:

```
Value:           0    1    2    3    4
Positive index: [0]  [1]  [2]  [3]  [4]
Negative index: [-5] [-4] [-3] [-2] [-1]
```

#### Slicing: `list[start:stop:step]`

Slicing extracts a portion of a list. The `stop` index is **not included**.

```python
frames = [0, 1, 2, 3, 4]

frames[0:3]     # [0, 1, 2]        (indices 0, 1, 2 --- stop is excluded)
frames[:3]      # [0, 1, 2]        (same --- start defaults to 0)
frames[2:]      # [2, 3, 4]        (from index 2 to end)
frames[-2:]     # [3, 4]           (last two elements)
frames[::2]     # [0, 2, 4]        (every other element)
frames[::-1]    # [4, 3, 2, 1, 0]  (reversed)
```

#### List methods

```python
numbers = [3, 1, 4, 1, 5]

numbers.append(9)           # Add to end:      [3, 1, 4, 1, 5, 9]
numbers.extend([2, 6])      # Add multiple:    [3, 1, 4, 1, 5, 9, 2, 6]
numbers.insert(0, 0)        # Insert at index: [0, 3, 1, 4, 1, 5, 9, 2, 6]
numbers.remove(1)           # Remove first 1:  [0, 3, 4, 1, 5, 9, 2, 6]
popped = numbers.pop()      # Remove & return last: 6
numbers.sort()              # Sort in place
sorted_copy = sorted(numbers)  # Return sorted copy (original unchanged)
numbers.reverse()           # Reverse in place

len(numbers)                # Number of elements
max(numbers)                # Maximum value
min(numbers)                # Minimum value
sum(numbers)                # Sum of all elements
```

#### List comprehensions

A concise way to create lists from existing sequences:

```python
# [expression for item in sequence]
squares = [x**2 for x in range(5)]            # [0, 1, 4, 9, 16]

# [expression for item in sequence if condition]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Practical: get all TIFF filenames from a directory listing
import os
tiff_files = [f for f in os.listdir('.') if f.endswith('.tif')]
```

### Tuples (immutable, ordered sequences)

Tuples are like lists, but they **cannot be changed** after creation. Use them for fixed collections like coordinates or function return values.

```python
# Creating tuples
coordinates = (256, 256)
roi = (50, 150, 80, 180)      # (y1, y2, x1, x2)
single = (42,)                 # Note the comma for single-element tuple

# Unpacking
x, y = coordinates
y1, y2, x1, x2 = roi

# Useful for returning multiple values from a function
def get_min_max(data):
    return (min(data), max(data))

minimum, maximum = get_min_max([1, 2, 3, 4, 5])
```

### Dictionaries (key-value pairs)

Dictionaries store data as **key:value** pairs. Look up a key to get its value --- like a real dictionary.

```python
# Creating a dictionary
experiment = {
    "name":   "PIEZO1_control",
    "frames": 500,
    "fps":    10.0,
    "cell":   "HEK293T",
}

# Accessing values
name = experiment["name"]                # "PIEZO1_control"
frames = experiment.get("frames")        # 500
zoom = experiment.get("zoom", 1)         # 1 (default if key not found)

# Modifying
experiment["fps"] = 20.0                 # Update existing key
experiment["notes"] = "pilot run"        # Add new key

# Check if a key exists
if "fps" in experiment:
    print(experiment["fps"])

# Iterating
for key, value in experiment.items():
    print(f"{key}: {value}")

# Useful methods
experiment.keys()       # dict_keys(['name', 'frames', 'fps', 'cell', 'notes'])
experiment.values()     # dict_values(['PIEZO1_control', 500, 20.0, 'HEK293T', 'pilot run'])
experiment.items()      # dict_items([(key, value), ...])
```

**When to use lists vs dictionaries:**

| | List | Dictionary |
|---|---|---|
| Access by | Index (`[0]`, `[1]`) | Key (`["name"]`, `["fps"]`) |
| Best for | Ordered sequences of similar items | Named fields with different types |
| Example | List of frame numbers | Experiment metadata |

### Sets (unique, unordered values)

Sets automatically remove duplicates. Useful for finding unique items.

```python
# Creating sets
unique = {1, 2, 3, 3, 3}       # {1, 2, 3} --- duplicates removed
empty_set = set()               # NOT {} --- that creates an empty dict

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
a | b       # Union:        {1, 2, 3, 4, 5}
a & b       # Intersection: {3}
a - b       # Difference:   {1, 2}

# Practical use: find unique cell types in your data
cell_types = ["HEK293T", "CHO", "HEK293T", "CHO", "N2A"]
unique_types = set(cell_types)  # {'HEK293T', 'CHO', 'N2A'}
```

---

## 8. Control Flow: if, elif, else

Control flow lets you make decisions in your code based on conditions.

```python
# Basic if / elif / else
intensity = 150

if intensity > 200:
    print("Very bright - check exposure")
elif intensity > 100:
    print("Good signal")
elif intensity > 50:
    print("Weak signal - increase gain")
else:
    print("No signal detected")
```

### Key syntax rules

- Each condition ends with a **colon** `:`
- The code block underneath is **indented by 4 spaces**
- `elif` is Python's shorthand for "else if"
- You can have as many `elif` blocks as you need
- The `else` block is optional

### Combining conditions

```python
# Using logical operators
if intensity > 50 and not is_saturated:
    analyze_cell()

if cell_type == "HEK293T" or cell_type == "CHO":
    print("Standard cell line")

# Check if a value is in a range
if 0 < intensity < 4095:
    print("Valid 12-bit intensity")

# Membership test
if cell_type in ["HEK293T", "CHO", "N2A"]:
    print("Supported cell line")
```

### Ternary operator (one-line if/else)

```python
label = "Bright" if intensity > 100 else "Dim"
```

### Practical example: validating experiment data

```python
import numpy as np
import tifffile

# Load an image stack
stack = tifffile.imread("calcium_timelapse.tif")

# Validate the data
if stack.ndim != 3:
    print(f"ERROR: Expected 3D stack, got {stack.ndim}D")
elif stack.shape[0] < 10:
    print(f"WARNING: Only {stack.shape[0]} frames - too few for analysis")
elif stack.max() == 0:
    print("ERROR: Image is blank (all zeros)")
else:
    print(f"Data looks good: {stack.shape[0]} frames, "
          f"{stack.shape[1]}x{stack.shape[2]} pixels")
    print(f"Intensity range: {stack.min()} to {stack.max()}")
```

---

## 9. Loops: for and while

Loops repeat a block of code multiple times. They are essential for processing batches of images, iterating over frames, and analysing multiple cells.

### for loops

`for` loops iterate over a sequence (list, range, string, etc.):

```python
# Loop over a list
cells = ["cell_1", "cell_2", "cell_3"]
for cell in cells:
    print(f"Processing {cell}")

# Loop over a range of numbers
for i in range(5):           # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10):      # 2, 3, 4, 5, 6, 7, 8, 9
    print(i)

for i in range(0, 500, 10): # 0, 10, 20, ..., 490 (every 10th frame)
    analyze_frame(stack[i])
```

### `range()` quick reference

```python
range(5)           # 0, 1, 2, 3, 4
range(2, 8)        # 2, 3, 4, 5, 6, 7
range(0, 10, 2)    # 0, 2, 4, 6, 8       (step of 2)
range(10, 0, -1)   # 10, 9, 8, ..., 1    (count down)
```

### enumerate: get the index AND the value

```python
cells = ["cell_1", "cell_2", "cell_3"]
for i, cell in enumerate(cells):
    print(f"Cell {i}: {cell}")
# Cell 0: cell_1
# Cell 1: cell_2
# Cell 2: cell_3
```

### zip: iterate over two sequences together

```python
filenames = ["exp1.tif", "exp2.tif", "exp3.tif"]
conditions = ["control", "10uM_Yoda1", "50uM_Yoda1"]
for filename, condition in zip(filenames, conditions):
    print(f"{filename} is {condition}")
```

### while loops

`while` loops repeat as long as a condition is True:

```python
frame = 0
while frame < stack.shape[0]:
    process(stack[frame])
    frame += 1
```

### Loop control: break and continue

```python
# break --- exit the loop immediately
for frame in range(stack.shape[0]):
    if is_artifact(stack[frame]):
        print(f"Artifact detected at frame {frame}, stopping.")
        break
    analyze(stack[frame])

# continue --- skip to the next iteration
for frame in range(stack.shape[0]):
    if is_saturated(stack[frame]):
        continue    # skip this frame, go to the next one
    analyze(stack[frame])
```

### Practical example: processing multiple TIFF files

```python
import os
import tifffile
import numpy as np

# Get all TIFF files in the current directory
tiff_files = sorted([f for f in os.listdir('.') if f.endswith('.tif')])
print(f"Found {len(tiff_files)} TIFF files")

for i, filename in enumerate(tiff_files):
    print(f"[{i+1}/{len(tiff_files)}] Processing {filename}...")

    stack = tifffile.imread(filename)

    if stack.ndim != 3:
        print(f"  Skipping: not a 3D stack (shape: {stack.shape})")
        continue

    mean_intensity = np.mean(stack)
    print(f"  Shape: {stack.shape}, Mean intensity: {mean_intensity:.1f}")
```

---

## 10. Functions

Functions let you write a block of code once and reuse it many times. They are the key to organised, maintainable scripts.

### Defining and calling a function

```python
def calculate_mean_intensity(image, roi):
    """Return the mean intensity within a region of interest.

    Args:
        image: 2D numpy array (a single frame)
        roi:   tuple of (y1, y2, x1, x2)

    Returns:
        float: mean pixel value in the ROI
    """
    y1, y2, x1, x2 = roi
    region = image[y1:y2, x1:x2]
    return region.mean()


# Call the function
roi = (50, 150, 80, 180)
mean_val = calculate_mean_intensity(frame, roi)
print(f"Mean intensity: {mean_val:.2f}")
```

### Default parameters

```python
def normalize(data, method="minmax"):
    """Normalize data using the specified method."""
    if method == "minmax":
        lo, hi = data.min(), data.max()
        return (data - lo) / (hi - lo)
    elif method == "zscore":
        return (data - data.mean()) / data.std()

# Use the default
result = normalize(trace)

# Override the default
result = normalize(trace, method="zscore")
```

### Returning multiple values

```python
def get_stats(data):
    """Return min, max, and mean of the data."""
    return data.min(), data.max(), data.mean()

lo, hi, avg = get_stats(trace)
print(f"Min: {lo:.1f}, Max: {hi:.1f}, Mean: {avg:.1f}")
```

### Why functions matter

- **Write once, use everywhere:** Define the logic for ROI extraction once, then call it for every cell
- **Clear naming:** `calculate_dff(trace, baseline_frames=50)` is self-documenting
- **Easier testing:** Test with small, simple data before running on real experiments
- **Fix once, fixed everywhere:** A bug fix in the function applies to every place it is called

### Practical example: a reusable analysis function

```python
import numpy as np

def extract_dff_trace(stack, roi, baseline_frames=50, fps=10.0):
    """Extract a background-corrected delta-F/F trace from a stack.

    Args:
        stack:           3D numpy array (frames, rows, cols)
        roi:             tuple of (y1, y2, x1, x2)
        baseline_frames: number of initial frames for baseline (default: 50)
        fps:             frames per second (default: 10.0)

    Returns:
        time:  1D array of time points in seconds
        dff:   1D array of delta-F/F values
    """
    y1, y2, x1, x2 = roi
    trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))
    f0 = trace[:baseline_frames].mean()
    dff = (trace - f0) / f0
    time = np.arange(len(trace)) / fps
    return time, dff


# Use it for multiple cells
rois = {
    "cell_1": (200, 230, 200, 230),
    "cell_2": (300, 330, 150, 180),
}

for name, roi in rois.items():
    time, dff = extract_dff_trace(stack, roi, baseline_frames=50, fps=10.0)
    print(f"{name}: peak dF/F = {dff.max():.3f}")
```

---

## 11. Importing Modules and Packages

Python's power comes from its ecosystem of packages. You use `import` to bring them into your script.

```python
# Import an entire module
import numpy
data = numpy.array([1, 2, 3])

# Import with an alias (standard practice)
import numpy as np
data = np.array([1, 2, 3])

# Import a specific function
from numpy import array, zeros, ones
data = array([1, 2, 3])

# Import a submodule
import matplotlib.pyplot as plt

# Standard imports for microscopy analysis
import numpy as np
import matplotlib.pyplot as plt
import tifffile
from scipy import signal
from skimage import io, filters
import pandas as pd
```

> **Avoid** `from numpy import *` (importing everything). This clutters your namespace and makes it unclear where functions come from.

---

## 12. NumPy: The Foundation of Scientific Computing

NumPy (Numerical Python) is the foundation of virtually all scientific computing in Python. Its core object is the **ndarray** --- an efficient, multi-dimensional array that represents images, time-series, and any numerical data.

**The key insight:** In Python, a microscopy image is just a 2D NumPy array of numbers. A time-lapse stack is a 3D array. All your analysis is array maths --- indexing, slicing, and statistics.

### Creating arrays

```python
import numpy as np

# From a Python list
data = np.array([1, 2, 3, 4, 5])

# Special arrays
zeros = np.zeros((512, 512))             # 512x512 array of zeros (blank image)
ones  = np.ones(10)                      # Array of 1s
ramp  = np.arange(0, 500)               # 0, 1, 2, ..., 499
times = np.linspace(0, 50, 500)          # 500 evenly spaced points from 0 to 50
rand  = np.random.rand(10)              # 10 random values between 0 and 1
gauss = np.random.randn(10)             # 10 values from standard normal distribution

# 2D arrays
image = np.zeros((512, 512))             # Blank 512x512 image
identity = np.eye(5)                     # 5x5 identity matrix

# 3D stack (frames x rows x cols)
stack = np.zeros((100, 512, 512))
print(stack.shape)   # (100, 512, 512)
print(stack.dtype)   # float64
```

### Data types matter for microscopy

```python
# 8-bit: 0-255 (confocal, some cameras)
img_8  = np.zeros((512, 512), dtype=np.uint8)

# 16-bit: 0-65535 (most scientific cameras)
img_16 = np.zeros((512, 512), dtype=np.uint16)

# 32-bit float: decimal values (after normalisation or dF/F)
img_f  = np.zeros((512, 512), dtype=np.float32)
```

### Key array properties

| Property | Meaning | Example |
|---|---|---|
| `.shape` | Dimensions as a tuple | `(100, 512, 512)` |
| `.ndim` | Number of dimensions | `3` |
| `.dtype` | Data type | `uint16` |
| `.size` | Total number of elements | `26214400` |
| `.nbytes` | Memory usage in bytes | `52428800` |

### Quick diagnostic function

```python
def inspect(arr, name="array"):
    """Print a summary of a numpy array."""
    print(f"{name}:")
    print(f"  shape : {arr.shape}")
    print(f"  dtype : {arr.dtype}")
    print(f"  range : {arr.min():.1f} - {arr.max():.1f}")

inspect(stack, "calcium stack")
```

### Element-wise operations

NumPy operates on **every element simultaneously** --- no loops needed. This is called **broadcasting** and it is both faster and cleaner than writing explicit loops.

```python
# Arithmetic on every pixel at once
background = 50
corrected   = image - background        # Subtract background
doubled     = image * 2                 # Scale intensity
normalised  = image / image.max()       # Normalise to 0.0-1.0

# Operations between two arrays (must be same shape)
ratio = channel_1 / channel_2
diff  = post - pre                      # Delta F

# Math functions
np.sqrt(image)
np.log(trace + 1)    # +1 to avoid log(0)
np.abs(delta)
np.exp(data)
np.sin(data)
```

### Statistics

```python
# Basic statistics
mean = np.mean(trace)
std  = np.std(trace)
mx   = np.max(trace)
mn   = np.min(trace)
total = np.sum(trace)

# Index of min/max
idx_max = np.argmax(trace)    # Index of the maximum value
idx_min = np.argmin(trace)    # Index of the minimum value

# Statistics along a specific axis
mean_image = np.mean(stack, axis=0)
# Shape: (512, 512) --- average of all frames, producing one mean image

mean_trace = np.mean(stack, axis=(1, 2))
# Shape: (100,) --- mean intensity of each frame, producing a time trace
```

### Indexing and slicing

```python
# 1D array
trace = np.array([10, 20, 30, 40, 50])
trace[0]        # 10      (first element)
trace[-1]       # 50      (last element)
trace[1:4]      # [20, 30, 40]

# 2D image --- image[row, col]
pixel   = image[256, 256]          # Single pixel value
row_100 = image[100, :]            # Entire row 100
col_256 = image[:, 256]            # Entire column 256
roi     = image[50:150, 80:180]    # Rectangular sub-region (ROI)

# 3D stack --- stack[frame, row, col]
frame_5 = stack[5]                 # Frame 5 (returns a 2D image)
frame_5 = stack[5, :, :]           # Same thing, more explicit

# Time trace for a single pixel
pixel_trace = stack[:, 256, 256]   # All frames, pixel at (256, 256)

# Time trace for an ROI (mean across the ROI for each frame)
roi_trace = stack[:, 50:100, 50:100].mean(axis=(1, 2))
# Shape: (num_frames,)
```

### Understanding 3D stack axes

For a stack with shape `(500, 512, 512)`:

```
stack.shape = (frames, rows, cols)
stack.shape = (500,    512,  512)

axis 0 --- frames (time):    stack[t, :, :]   = one frame
axis 1 --- rows (y):         stack[:, y, :]   = one row over time
axis 2 --- cols (x):         stack[:, :, x]   = one column over time
```

### Boolean indexing

```python
# Select elements that meet a condition
data = np.array([10, 25, 5, 30, 15])
data[data > 20]            # array([25, 30])
data[data % 2 == 0]        # array([10, 30])

# Mask an image (set low-intensity pixels to zero)
masked = image.copy()
masked[masked < 50] = 0
```

### Mean squared displacement (MSD) and diffusion coefficients

Single-molecule tracking experiments --- such as imaging PIEZO1-HaloTag labelled with Janelia Fluor ligands under TIRF --- produce trajectory data that needs quantitative analysis. The core calculation is the **mean squared displacement (MSD)**, which relates to the diffusion coefficient *D*.

In the Bertaccini et al. 2025 study, PIEZO1-HaloTag puncta in hiPSC-derived endothelial cells, keratinocytes, and neural stem cells were imaged at 10--500 fps (pixel size ~0.108 um). ThunderSTORM localisations were linked into trajectories via FLIKA, and MSD analysis was used to distinguish mobile from immobile populations using a 3 um path-length cutoff at 5 s.

```python
# --- MSD from a single 2D trajectory ---
# xy is an (N, 2) array of (x, y) positions in micrometres
# dt is the time interval between frames in seconds (e.g. 1/fps)

def compute_msd(xy, dt, max_lag=None):
    """Compute MSD as a function of lag time for one trajectory.

    Parameters
    ----------
    xy      : ndarray, shape (N, 2) --- x, y positions in um
    dt      : float --- frame interval in seconds
    max_lag : int or None --- maximum lag in frames (default: N//4)

    Returns
    -------
    lags    : 1-D array of lag times (s)
    msd     : 1-D array of MSD values (um^2)
    """
    n = len(xy)
    if max_lag is None:
        max_lag = n // 4
    msd = np.zeros(max_lag)
    for lag in range(1, max_lag + 1):
        displacements = xy[lag:] - xy[:-lag]          # shape (N-lag, 2)
        sq_disp = np.sum(displacements**2, axis=1)    # squared displacement per step
        msd[lag - 1] = np.mean(sq_disp)
    lags = np.arange(1, max_lag + 1) * dt
    return lags, msd


# Example: TIRF at 100 fps, pixel size 0.108 um
fps = 100.0
dt = 1.0 / fps                      # 0.01 s per frame
pixel_size_um = 0.108

# Convert pixel coordinates to micrometres
xy_um = xy_pixels * pixel_size_um

lags, msd = compute_msd(xy_um, dt)

# --- Fit the short-lag MSD to extract diffusion coefficient ---
# For 2D Brownian motion: MSD = 4 * D * t
# Fit the first few lags (linear regime)
fit_points = 4
slope, intercept = np.polyfit(lags[:fit_points], msd[:fit_points], 1)
D = slope / 4.0    # um^2/s
print(f"Diffusion coefficient D = {D:.4f} um^2/s")
```

### Path length for mobile/immobile classification

```python
# Bertaccini et al. separated mobile from immobile PIEZO1 puncta
# using total path length over a 5 s window.
# Cutoff: 3 um path length at 5 s.

def path_length(xy):
    """Total path length (sum of step distances) for a trajectory."""
    steps = np.diff(xy, axis=0)           # (N-1, 2) step vectors
    return np.sum(np.sqrt(np.sum(steps**2, axis=1)))

trajectory_length_um = path_length(xy_um)
is_mobile = trajectory_length_um > 3.0    # 3 um cutoff
print(f"Path length: {trajectory_length_um:.2f} um  ->  {'mobile' if is_mobile else 'immobile'}")
```

### The dF/F calculation pattern

This is one of the most common calculations in calcium imaging:

```python
# Calculate delta-F/F for a whole stack
# Use the first 10 frames as the baseline (F0)
baseline = np.mean(stack[:10], axis=0)
# baseline.shape == (512, 512) --- the average of the first 10 frames

dff = (stack - baseline) / baseline
# dff.shape == (500, 512, 512)
# Every pixel is now (F - F0) / F0

print(f"dF/F range: {dff.min():.3f} to {dff.max():.3f}")
```

---

## 13. Loading and Saving Image Data

### Loading TIFF files with tifffile

The `tifffile` package handles virtually every TIFF variant, including multi-frame time-lapse stacks and OME-TIFF metadata.

```python
import tifffile
import numpy as np

# Load any TIFF file
img   = tifffile.imread("single_frame.tif")
stack = tifffile.imread("calcium_timelapse.tif")

# Always check what you loaded
print(stack.shape)                    # (500, 512, 512)
print(stack.dtype)                    # uint16
print(stack.min(), stack.max())       # 0  65535

# Access individual frames
first_frame = stack[0]
last_frame  = stack[-1]
mid_frame   = stack[len(stack) // 2]
```

### Common TIFF shape patterns

| Shape | Meaning | Dimensions |
|---|---|---|
| `(512, 512)` | Single-frame grayscale | 2D |
| `(512, 512, 3)` | Single-frame RGB | 2D + colour |
| `(500, 512, 512)` | Time-lapse grayscale stack | 3D |
| `(500, 2, 512, 512)` | Time-lapse, 2 channels | 4D |
| `(Z, Y, X)` | Z-stack (volumetric) | 3D |

### Saving TIFF files

```python
# Save a processed stack
tifffile.imwrite("corrected.tif", corrected_stack)

# Save as ImageJ-compatible multi-frame TIFF
tifffile.imwrite("output.tif", data,
    imagej=True,
    metadata={"axes": "TYX"})
```

### tifffile: A deeper look

`tifffile` is one of the most important Python packages for microscopy. It was created and is actively maintained by **Christoph Gohlke**, a scientific software developer who spent nearly two decades at UC Irvine --- first at the **Laboratory for Fluorescence Dynamics** (LFD) in the Department of Biomedical Engineering (2006--2025), and before that at the University of Illinois at Urbana-Champaign. Gohlke is a Python Software Foundation Fellow and received the PSF Community Service Award in 2014 for his contributions to the Python ecosystem.

`tifffile` is not just a simple TIFF reader. It handles a remarkable range of microscopy file formats and TIFF variants, including:

| Format | Description |
|---|---|
| **TIFF / BigTIFF** | Standard and >4 GB TIFF files |
| **OME-TIFF** | Open Microscopy Environment TIFF with rich metadata |
| **ImageJ hyperstack** | Multi-dimensional TIFF files created by ImageJ/FIJI |
| **Zeiss LSM** | Zeiss confocal microscope files |
| **Zeiss CZI** | Carl Zeiss Image format (via `czifile`, see below) |
| **MetaMorph STK** | MetaMorph stack files |
| **Olympus FluoView / SIS** | Olympus confocal and camera formats |
| **Micro-Manager MMStack / NDTiff** | Micro-Manager acquisition files |
| **ScanImage** | Two-photon microscopy files |
| **Leica SCN** | Leica slide scanner files |
| **Hamamatsu NDPI** | Digital pathology slide files |
| **GeoTIFF** | Geospatial TIFF (for remote sensing) |
| **Adobe DNG** | Digital negative raw image files |
| **PerkinElmer QPTIFF** | PerkinElmer high-content imaging |
| **Aperio SVS** | Digital pathology whole-slide images |
| **ThermoFisher EER** | Electron event representation (cryo-EM) |

#### Advanced tifffile usage

```python
import tifffile
import numpy as np

# --- Reading with full metadata ---
with tifffile.TiffFile("experiment.tif") as tif:
    # Access image data
    stack = tif.asarray()

    # Access TIFF metadata
    for page in tif.pages:
        print(f"Shape: {page.shape}, dtype: {page.dtype}")
        print(f"Compression: {page.compression}")

    # Access OME-TIFF metadata (if present)
    if tif.ome_metadata:
        print(tif.ome_metadata)

    # Access ImageJ metadata (if present)
    if tif.imagej_metadata:
        print(tif.imagej_metadata)

    # Access ScanImage metadata (if present)
    if hasattr(tif, 'scanimage_metadata') and tif.scanimage_metadata:
        print(tif.scanimage_metadata)

# --- Writing with metadata ---
tifffile.imwrite("output.ome.tif", data,
    photometric='minisblack',
    metadata={
        'axes': 'TCYX',              # dimension order
        'Channel': {'Name': ['GFP', 'mCherry']},
        'Plane': {'DeltaT': [0.0, 0.1, 0.2]},  # time stamps
    }
)

# --- Memory-mapped access for very large files ---
# Read without loading entire file into RAM
store = tifffile.imread("huge_dataset.tif", aszarr=True)
# Access individual planes on demand
import zarr
z = zarr.open(store, mode='r')
single_plane = z[0, 0, :, :]   # only this plane is loaded into memory

# --- Writing tiled, pyramidal TIFFs (for whole-slide imaging) ---
tifffile.imwrite("pyramidal.tif", data,
    tile=(256, 256),
    compression='zlib',
    subifds=3)    # number of pyramid levels
```

### Christoph Gohlke's microscopy Python packages

Beyond `tifffile`, Gohlke has created a collection of Python packages for reading proprietary microscopy and spectroscopy file formats. These are invaluable when you receive data from collaborators using different microscope systems. All are available on PyPI and GitHub (https://github.com/cgohlke):

| Package | Purpose | Install |
|---|---|---|
| **tifffile** | Read/write TIFF, BigTIFF, OME-TIFF, ImageJ, and dozens of vendor-specific TIFF variants | `pip install tifffile` |
| **imagecodecs** | Compression codecs for microscopy images (JPEG, JPEG2000, JPEG-XL, LZW, Zstd, and 50+ others). Required by `tifffile` for compressed TIFFs. | `pip install imagecodecs` |
| **czifile** | Read Carl Zeiss CZI (ZISRAW) microscopy files | `pip install czifile` |
| **oiffile** | Read Olympus OIB and OIF image files | `pip install oiffile` |
| **liffile** | Read Leica LIF, LOF, XLIF, and related image files | `pip install liffile` |
| **ptufile** | Read PicoQuant PTU and related TCSPC files (for FLIM) | `pip install ptufile` |
| **sdtfile** | Read Becker & Hickl SDT time-correlated single photon counting files (for FLIM) | `pip install sdtfile` |
| **lfdfiles** | Read Laboratory for Fluorescence Dynamics file formats (SimFCS) | `pip install lfdfiles` |
| **roifile** | Read and write ImageJ ROI files --- extract ROI definitions saved in FIJI | `pip install roifile` |
| **psf** | Calculate point spread functions for fluorescence microscopy (Richards-Wolf model) | `pip install psf` |
| **psdtags** | Read/write layered TIFF ImageSourceData tags | `pip install psdtags` |
| **molmass** | Calculate molecular mass and elemental composition from chemical formulas | `pip install molmass` |

#### Example: Reading ImageJ ROIs in Python

```python
import roifile

# Read ROIs saved from FIJI (Edit → Selection → Save As...)
rois = roifile.roiread("RoiSet.zip")

for roi in rois:
    print(f"Name: {roi.name}, Type: {roi.roitype}")
    print(f"  Position: top={roi.top}, left={roi.left}")
    print(f"  Size: {roi.bottom - roi.top} x {roi.right - roi.left}")

    # Get coordinates for polygon/freehand ROIs
    if roi.coordinates() is not None:
        coords = roi.coordinates()
        print(f"  Vertices: {len(coords)}")
```

#### Example: Reading a Zeiss CZI file

```python
import czifile

with czifile.CziFile("experiment.czi") as czi:
    data = czi.asarray()
    print(f"Shape: {data.shape}")
    print(f"Axes: {czi.axes}")
    # Typical output: Shape: (1, 1, 2, 50, 512, 512, 1), Axes: BSCTZYX
```

#### Example: Calculating a PSF

```python
import psf
import matplotlib.pyplot as plt

# Calculate a 3D fluorescence PSF
args = dict(
    shape=(128, 128),       # pixels
    dims=(5.0, 5.0),        # physical size in µm
    ex_wavelen=488e-9,      # excitation wavelength
    em_wavelen=520e-9,      # emission wavelength
    num_aperture=1.4,       # NA
    refr_index=1.515,       # refractive index (oil immersion)
    magnification=100.0,
    pinhole_radius=0.5,     # AU
)

obsvol = psf.PSF(psf.ISOTROPIC | psf.CONFOCAL, **args)
plt.imshow(obsvol.slice(0), cmap='hot')
plt.title("Confocal PSF (lateral)")
plt.colorbar()
plt.show()
```

### Gohlke's Windows binaries and other resources

For many years, Gohlke maintained the **"Unofficial Windows Binaries for Python Extension Packages"** at the Laboratory for Fluorescence Dynamics website. This was an essential resource in the era before `pip` could reliably compile C extensions on Windows --- packages like NumPy, SciPy, scikit-image, and dozens of others were available as pre-built `.whl` files. The original site (lfd.uci.edu/~gohlke/pythonlibs/) was active from 2009 to 2022 and was a lifeline for Windows-based scientific Python users.

Although the original site is no longer updated (improvements in `pip`, the `conda` ecosystem, and better wheel availability on PyPI have largely eliminated the need), Gohlke continues to provide specialised Windows binaries via GitHub repositories at **https://www.cgohlke.com**:

| Repository | Contents |
|---|---|
| **win_arm64-wheels** | Python packages compiled for Windows on ARM64 (Surface Pro, etc.) |
| **numpy-mkl-wheels** | NumPy, SciPy, and numexpr linked against Intel's oneAPI MKL for maximum performance |
| **geospatial-wheels** | GDAL, rasterio, Fiona, and other geospatial libraries for Windows |
| **pyopengl-build** | PyOpenGL and PyOpenGL-accelerate builds |

The MKL-linked NumPy and SciPy wheels are particularly noteworthy for scientists: they use Intel's highly optimised Math Kernel Library for linear algebra operations, which can provide significant speedups for matrix-heavy computations compared to the default OpenBLAS builds on PyPI.

To install MKL-linked NumPy on Windows:

```bash
pip install numpy --find-links https://github.com/cgohlke/numpy-mkl-wheels/releases/
```

Gohlke's website also hosts **tutorials** in Jupyter notebook format on topics including pair correlation function analysis of fluorescence fluctuations (relevant to FCS/RICS analysis) and diffusion simulation.

Additionally, Gohlke is the lead developer of **PhasorPy** (https://www.phasorpy.org/), an open-source Python library for phasor analysis of fluorescence lifetime imaging (FLIM) and hyperspectral imaging data. PhasorPy provides model-free analysis of FLIM data using the phasor approach --- a technique developed at the Laboratory for Fluorescence Dynamics.

---

## 14. Visualisation with matplotlib

matplotlib is the standard plotting library in Python. Its `pyplot` interface is designed to feel familiar to MATLAB users.

### Displaying an image

```python
import matplotlib.pyplot as plt

# Display a single frame
plt.figure(figsize=(8, 6))
plt.imshow(stack[0], cmap="gray")
plt.colorbar(label="Intensity (AU)")
plt.title("Frame 0 - baseline")
plt.axis("off")
plt.tight_layout()
plt.savefig("frame0.png", dpi=300)
plt.show()
```

### Plotting a fluorescence trace

```python
fps = 10.0
time = np.arange(len(trace)) / fps    # Convert frames to seconds

plt.figure(figsize=(10, 4))
plt.plot(time, trace, color="steelblue", lw=1.5)
plt.xlabel("Time (s)")
plt.ylabel("Mean Intensity (AU)")
plt.title("Cell 1 - Calcium Trace")
plt.tight_layout()
plt.savefig("trace.png", dpi=300)
plt.show()
```

### Multi-panel figures with subplots

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].imshow(stack[0], cmap="gray")
axes[0].set_title("First frame")
axes[0].axis("off")

axes[1].imshow(stack[-1], cmap="gray")
axes[1].set_title("Last frame")
axes[1].axis("off")

plt.tight_layout()
plt.savefig("comparison.png", dpi=300)
plt.show()
```

### Plotting MSD curves and diffusion data

Single-molecule tracking experiments produce MSD-vs-time data that is routinely plotted during PIEZO1 diffusion analysis. The example below follows the style used in Bertaccini et al. 2025, where PIEZO1-HaloTag trajectories were classified as mobile or immobile and their MSD curves compared.

```python
# --- Plot MSD curves for mobile vs immobile populations ---
# lags_mobile, msd_mobile, lags_immobile, msd_immobile are from compute_msd()
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(lags_mobile, msd_mobile, 'o-', color="tab:blue", markersize=3,
        label="Mobile (path > 3 um)")
ax.plot(lags_immobile, msd_immobile, 's-', color="tab:red", markersize=3,
        label="Immobile (path <= 3 um)")
ax.set_xlabel("Lag time (s)")
ax.set_ylabel("MSD (um$^2$)")
ax.set_title("PIEZO1-HaloTag Diffusion (TIRF, 100 fps)")
ax.legend()
plt.tight_layout()
plt.savefig("msd_comparison.png", dpi=300)
plt.show()
```

```python
# --- Histogram of diffusion coefficients across many trajectories ---
fig, ax = plt.subplots(figsize=(6, 4))
ax.hist(D_values, bins=30, color="steelblue", edgecolor="white", alpha=0.8)
ax.axvline(np.median(D_values), color="red", ls="--", label=f"Median = {np.median(D_values):.4f}")
ax.set_xlabel("D (um$^2$/s)")
ax.set_ylabel("Count")
ax.set_title("Diffusion Coefficient Distribution --- PIEZO1-HaloTag in ECs")
ax.legend()
plt.tight_layout()
plt.savefig("D_histogram.png", dpi=300)
plt.show()
```

### Useful colourmaps for fluorescence microscopy

| Colourmap | Description | Best for |
|---|---|---|
| `gray` | Standard grayscale | General-purpose default |
| `hot` | Black to red to yellow | Highlighting bright spots |
| `viridis` | Perceptually uniform, colourblind-safe | Publication figures |
| `inferno` | Dark to bright via purple/orange | Intensity maps |
| `jet` | Rainbow | Avoid for quantitative figures (perceptually uneven) |

### Saving publication-quality figures

```python
# Always use dpi=300 or higher for publications
plt.savefig("figure.png", dpi=300, bbox_inches="tight")
plt.savefig("figure.pdf", bbox_inches="tight")    # Vector format for journals
plt.savefig("figure.svg", bbox_inches="tight")    # Vector format for editing
```

---

## 15. Extracting Fluorescence Traces

This is one of the most common tasks in PIEZO1 calcium imaging experiments: extracting the fluorescence intensity over time from regions of interest.

### The basic pattern

```python
import tifffile
import numpy as np
import matplotlib.pyplot as plt

# 1. Load the stack
stack = tifffile.imread("calcium_timelapse.tif")
print(f"Stack: {stack.shape}, dtype={stack.dtype}")

# 2. Extract a single-pixel trace (noisy)
pixel_trace = stack[:, 256, 256]

# 3. Extract an ROI mean trace (much better --- averages out noise)
y1, y2, x1, x2 = 240, 270, 240, 270
roi_trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))
```

### Background correction

```python
# Measure background from an empty area of the image
bg_trace = stack[:, 10:30, 10:30].mean(axis=(1, 2))

# Subtract background
corrected = roi_trace - bg_trace
```

### Delta-F/F normalisation

```python
fps = 10.0
baseline_seconds = 5.0
baseline_frames = int(fps * baseline_seconds)

# Calculate F0 (mean of baseline period)
f0 = corrected[:baseline_frames].mean()

# Calculate delta-F/F
dff = (corrected - f0) / f0
```

### Complete workflow: from raw TIFF to labelled dF/F plot

```python
import tifffile
import numpy as np
import matplotlib.pyplot as plt

# 1. Load stack
stack = tifffile.imread("calcium_timelapse.tif")
print(f"Stack: {stack.shape}, dtype={stack.dtype}")

# 2. Define ROIs: {name: (y1, y2, x1, x2)}
rois = {
    "cell_1":     (200, 230, 200, 230),
    "cell_2":     (300, 330, 150, 180),
    "background": ( 10,  40,  10,  40),
}

# 3. Extract background trace
fps = 10.0
y1, y2, x1, x2 = rois["background"]
bg = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))
time = np.arange(stack.shape[0]) / fps     # Time axis in seconds

# 4. Plot all cell traces as dF/F
fig, ax = plt.subplots(figsize=(12, 5))

for name, (y1, y2, x1, x2) in rois.items():
    if name == "background":
        continue
    trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2)) - bg
    f0 = trace[:int(fps * 5)].mean()     # 5-second baseline
    dff = (trace - f0) / f0
    ax.plot(time, dff, label=name, lw=1.5)

ax.set_xlabel("Time (s)")
ax.set_ylabel("dF/F")
ax.set_title("Calcium Traces - PIEZO1 Experiment")
ax.legend()
plt.tight_layout()
plt.savefig("traces_dff.png", dpi=300)
plt.show()
```

---

## 16. File Input/Output

### Reading and writing text files

```python
# Read an entire file
with open('notes.txt', 'r') as f:
    content = f.read()

# Read line by line
with open('notes.txt', 'r') as f:
    lines = f.readlines()    # List of lines (each ending with \n)

# Write to a file (overwrites existing content)
with open('output.txt', 'w') as f:
    f.write("Analysis Results\n")
    f.write(f"Mean intensity: {mean_val:.2f}\n")

# Append to a file (adds to the end)
with open('log.txt', 'a') as f:
    f.write(f"Processed {filename} at {timestamp}\n")
```

> **Important:** The `with` statement automatically closes the file when the block ends, even if an error occurs. Always use `with` for file operations.

### Working with CSV files using pandas

```python
import pandas as pd

# Read a CSV file
data = pd.read_csv("results.csv")
print(data.head())         # First 5 rows
print(data.columns)        # Column names

# Save results to CSV
results = pd.DataFrame({
    "time_s":    time,
    "cell_1_dff": dff_cell1,
    "cell_2_dff": dff_cell2,
})
results.to_csv("traces.csv", index=False)
```

### Loading ThunderSTORM localisation tables

ThunderSTORM (an ImageJ/FIJI plugin for single-molecule localisation microscopy) exports its results as CSV files. In the Bertaccini et al. 2025 PIEZO1-HaloTag study, ThunderSTORM was used to localise individual PIEZO1-JF646 / JF549 / JF635 puncta from TIRF recordings, producing tables with columns for frame number, x/y coordinates, intensity, sigma, and uncertainty. These tables are the starting point for the trajectory-linking step in FLIKA.

```python
import pandas as pd
import numpy as np

# --- Load a ThunderSTORM CSV ---
# Typical columns: id, frame, x [nm], y [nm], sigma [nm],
#                  intensity [photon], offset [photon], bkgstd [photon],
#                  uncertainty [nm]
locs = pd.read_csv("thunderstorm_results.csv")
print(locs.head())
print(f"Total localisations: {len(locs)}")
print(f"Frames span: {locs['frame'].min()} - {locs['frame'].max()}")

# Convert coordinates from nanometres to micrometres
locs["x_um"] = locs["x [nm]"] / 1000.0
locs["y_um"] = locs["y [nm]"] / 1000.0

# --- Basic quality filtering ---
# Keep only well-localised spots (low uncertainty, reasonable sigma)
filtered = locs[
    (locs["uncertainty [nm]"] < 50) &
    (locs["sigma [nm]"] > 80) &
    (locs["sigma [nm]"] < 300)
].copy()
print(f"After filtering: {len(filtered)} localisations "
      f"({100 * len(filtered) / len(locs):.1f}%)")

# --- Localisations per frame (useful for density checks) ---
locs_per_frame = filtered.groupby("frame").size()
print(f"Mean localisations per frame: {locs_per_frame.mean():.1f}")
```

```python
# --- Scatter plot of all localisations (super-resolution reconstruction) ---
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 6))
ax.scatter(filtered["x_um"], filtered["y_um"], s=0.1, alpha=0.3, c="white")
ax.set_facecolor("black")
ax.set_xlabel("x (um)")
ax.set_ylabel("y (um)")
ax.set_title("PIEZO1-HaloTag Localisations (ThunderSTORM)")
ax.set_aspect("equal")
plt.tight_layout()
plt.savefig("localisation_map.png", dpi=300)
plt.show()
```

### Working with paths using os.path

```python
import os

# Check current directory
print(os.getcwd())

# List files
print(os.listdir('.'))

# Check if a file exists
if os.path.exists('data.tif'):
    print("File found!")

# Build cross-platform paths
path = os.path.join('data', 'raw', 'experiment1.tif')
# On macOS/Linux: 'data/raw/experiment1.tif'
# On Windows:     'data\\raw\\experiment1.tif'

# Get the filename from a path
os.path.basename('/data/raw/exp1.tif')    # 'exp1.tif'

# Get the directory from a path
os.path.dirname('/data/raw/exp1.tif')     # '/data/raw'

# Get the file extension
os.path.splitext('exp1.tif')              # ('exp1', '.tif')
```

---

## 17. Error Handling

### try/except blocks

When something might go wrong (loading a file, dividing by zero, etc.), use `try`/`except` to handle the error gracefully instead of crashing.

```python
# Basic try/except
try:
    img = tifffile.imread(filename)
except FileNotFoundError:
    print(f"File {filename} not found!")
    img = None
except Exception as e:
    print(f"Error loading file: {e}")
    img = None

# Multiple specific exceptions
try:
    file = open('data.txt')
except FileNotFoundError:
    print("File not found")
except PermissionError:
    print("Permission denied")

# Finally block (always runs, even if there is an error)
try:
    file = open('data.txt')
    # process file
finally:
    file.close()    # Always closes the file
```

### Practical: robust file processing loop

```python
import os
import tifffile

tiff_files = [f for f in os.listdir('.') if f.endswith('.tif')]

for filename in tiff_files:
    try:
        stack = tifffile.imread(filename)
        print(f"Loaded {filename}: shape={stack.shape}")
        # ... process the file ...
    except Exception as e:
        print(f"ERROR processing {filename}: {e}")
        continue    # Skip this file, process the next one
```

---

## 18. Common Errors and How to Fix Them

### How to read a Python error message

Python error messages (tracebacks) have a specific structure. **Always read the last line first** --- it tells you the error type and message.

```
Traceback (most recent call last):
  File "script.py", line 10, in <module>
    result = my_function(data)
  File "script.py", line 5, in my_function
    return data[100]
IndexError: list index out of range
```

Reading from bottom to top:
1. **Last line** = Error type and message (most important!)
2. **File and line number** = Where the error occurred
3. **Code excerpt** = The actual line that failed
4. **Traceback** = The path through your code to the error

### Error reference table

| Error | Common Cause | Quick Fix |
|---|---|---|
| `IndentationError` | Inconsistent or missing indentation | Use 4 spaces consistently; don't mix tabs and spaces |
| `SyntaxError` | Missing colon, unmatched brackets, missing quotes | Check the indicated line AND the line before it |
| `NameError` | Variable not defined, typo, forgot to import | Check spelling; make sure variable is defined before use; import modules |
| `TypeError` | Incompatible types in an operation | Convert types with `int()`, `str()`, `float()`; use f-strings for formatting |
| `IndexError` | Accessing an index that does not exist | Check `len()` or `.shape`; remember indexing starts at 0 |
| `KeyError` | Dictionary key does not exist | Use `.get(key, default)` or check `if key in dict` |
| `ValueError` | Array shapes do not match; invalid conversion | Print shapes with `.shape`; check array dimensions |
| `FileNotFoundError` | File does not exist or wrong path | Check spelling (case-sensitive on macOS/Linux); use `os.path.exists()` |
| `AttributeError` | Using a method that does not exist on that type | Check `type(variable)`; make sure you have the right data type |
| `ModuleNotFoundError` | Package not installed | `pip install package_name` (in the right conda environment) |
| `ZeroDivisionError` | Dividing by zero | Check the divisor before dividing |

### IndentationError

```python
# WRONG
if x > 5:
print("Big")        # Not indented!

# CORRECT
if x > 5:
    print("Big")    # Indented by 4 spaces
```

### SyntaxError

```python
# WRONG: missing colon
if x > 5
    print("Big")

# CORRECT
if x > 5:
    print("Big")

# WRONG: unmatched brackets
data = [1, 2, 3
print(data)

# CORRECT
data = [1, 2, 3]
print(data)

# WRONG: Python 2 print syntax
print "Hello"

# CORRECT: Python 3
print("Hello")
```

### NameError

```python
# WRONG: typo
data = [1, 2, 3]
print(dta)          # Typo!

# CORRECT
print(data)

# WRONG: forgot import
arr = np.array([1, 2, 3])    # np not imported!

# CORRECT
import numpy as np
arr = np.array([1, 2, 3])

# WRONG: variable used before definition
print(result)
result = 42

# CORRECT
result = 42
print(result)
```

### TypeError

```python
# WRONG: adding int and str
age = 25
message = "Age: " + age      # Can't add int to str!

# CORRECT: use f-string or convert
message = f"Age: {age}"
message = "Age: " + str(age)

# WRONG: expecting array maths from a list
data = [1, 2, 3]
doubled = data * 2    # This REPEATS the list: [1, 2, 3, 1, 2, 3]

# CORRECT: use NumPy for element-wise maths
import numpy as np
data = np.array([1, 2, 3])
doubled = data * 2    # [2, 4, 6]
```

### IndexError

```python
# WRONG: index out of range
data = [1, 2, 3]
print(data[5])        # Only indices 0, 1, 2 exist!

# CORRECT
print(data[2])        # Last element by index
print(data[-1])       # Last element with negative indexing

# Common with image stacks
stack = tifffile.imread('data.tif')    # Shape: (100, 512, 512)
frame = stack[100]     # WRONG: only indices 0-99 exist!
frame = stack[99]      # CORRECT: last frame
frame = stack[-1]      # CORRECT: also last frame
```

### KeyError

```python
# WRONG: key does not exist
person = {"name": "George", "lab": "Pathak"}
print(person["age"])              # KeyError!

# CORRECT: check first
if "age" in person:
    print(person["age"])

# CORRECT: use .get() with a default
age = person.get("age", 0)       # Returns 0 if "age" not found
```

### ValueError

```python
# WRONG: mismatched array shapes
a = np.array([1, 2, 3])          # Shape: (3,)
b = np.array([1, 2, 3, 4, 5])    # Shape: (5,)
c = a + b                         # ValueError!

# CORRECT: make arrays the same shape
a = np.array([1, 2, 3, 4, 5])
b = np.array([1, 2, 3, 4, 5])
c = a + b
```

### FileNotFoundError

```python
# WRONG: file does not exist or wrong path
img = tifffile.imread('data.tif')    # FileNotFoundError!

# CORRECT: check first
import os
print("Current directory:", os.getcwd())
print("Files here:", os.listdir('.'))

if os.path.exists('data.tif'):
    img = tifffile.imread('data.tif')
else:
    print("File not found! Check the path.")
```

### AttributeError

```python
# WRONG: .shape is a NumPy attribute, not a list attribute
data = [1, 2, 3]
print(data.shape)     # AttributeError!

# CORRECT: convert to NumPy array first
import numpy as np
data = np.array([1, 2, 3])
print(data.shape)     # (3,)
```

### ModuleNotFoundError

```python
# ERROR: ModuleNotFoundError: No module named 'tifffile'

# FIX: Install the package (in your terminal, not in Python)
# conda activate microscopy
# pip install tifffile

# Then verify
import tifffile
print(tifffile.__version__)
```

---

## 19. Debugging Strategies

### 1. Print debugging

Add `print()` statements to see what is happening at each step.

```python
print(f"Variable x = {x}")
print(f"Type of x: {type(x)}")
print(f"Shape of array: {arr.shape}")
print(f"About to process frame {i}")
```

### 2. Check types and shapes

```python
# For any variable
print(type(variable))

# For NumPy arrays
print(arr.shape)
print(arr.dtype)
print(arr.min(), arr.max())
```

### 3. Test with simple data

```python
# Instead of loading a huge file, create small test data
stack = np.random.rand(10, 100, 100)    # Small test stack

# Test your logic on this first
test_arr = np.array([1, 2, 3])
# ... run your code ...
```

### 4. Isolate the problem

```python
# Comment out code sections to find where the error occurs
result = step1(data)        # Works fine
# result = step2(result)    # Comment this out
# result = step3(result)    # And this
print(result)               # If this works, error is in step2 or step3
```

### 5. Use assertions for sanity checks

```python
assert img.ndim == 2, f"Expected 2D image, got {img.ndim}D"
assert len(data) > 0, "Data is empty"
assert os.path.exists(filename), f"{filename} not found"
```

---

## 20. Style Guide and Best Practices

Following consistent style makes your code readable by yourself (in 6 months) and by colleagues.

### Naming conventions (PEP 8)

```python
# Variables and functions: lowercase_with_underscores
frame_count = 100
mean_intensity = 42.5

def calculate_mean(data):
    pass

# Constants: UPPERCASE_WITH_UNDERSCORES
MAX_FRAMES = 1000
PIXEL_SIZE = 0.11

# Classes: CapitalisedWords (CamelCase)
class ImageProcessor:
    pass
```

### Indentation

Always use **4 spaces** per level of indentation. Do not use tabs (or at least do not mix tabs and spaces).

```python
if condition:
    do_something()
    if another_condition:
        do_more()
```

### Line length

Keep lines under 80-100 characters. Break long lines:

```python
result = some_function(argument1, argument2,
                       argument3, argument4)
```

### Other guidelines

```python
# Spaces around operators
x = 1 + 2
y = x * 3

# No spaces inside brackets
my_list[0]
my_dict['key']

# Comments: space after #
# This is a comment
x = 5  # Inline comment
```

### Use meaningful variable names

```python
# BAD: what is x?
x = stack[0]

# GOOD: clear purpose
first_frame = stack[0]
```

---

## 21. Python Reserved Words

These 35 words have special meaning in Python. You **cannot** use them as variable names.

### Control flow
`if`, `elif`, `else`, `for`, `while`, `break`, `continue`, `pass`

### Functions and classes
`def`, `return`, `yield`, `lambda`, `class`, `with`

### Error handling
`try`, `except`, `finally`, `raise`, `assert`

### Logical and comparison
`and`, `or`, `not`, `is`, `in`

### Imports
`import`, `from`, `as`

### Scope and variables
`global`, `nonlocal`, `del`

### Async (advanced)
`async`, `await`

### Boolean and None
`True`, `False`, `None`

### Common mistake

```python
# WRONG --- "class" is a reserved word
class = "Biology"

# CORRECT --- use a different name
class_name = "Biology"
course = "Biology"
```

---

## 22. Classes and Object-Oriented Programming

So far, everything in this manual has used **procedural programming** --- writing functions that operate on data you pass to them. Object-oriented programming (OOP) bundles data and the functions that operate on it into a single unit called a **class**. You do not need OOP for every script, but understanding it will help you read other people's code, use libraries effectively, and organise larger projects.

### The core idea

A **class** is a blueprint. An **object** (also called an **instance**) is a specific thing built from that blueprint.

Think of it like cell culture:
- The **class** is the protocol for growing HEK293T cells --- it describes what properties a culture has (passage number, confluency, medium) and what you can do with it (passage, transfect, image).
- Each **flask on your bench** is an **object** --- a specific culture with its own passage number and confluency.

### Defining a simple class

```python
class Experiment:
    """Represents a single microscopy experiment."""

    def __init__(self, name, cell_line, construct, fps=10.0):
        """Initialise a new Experiment.

        Args:
            name:      Experiment identifier (e.g. "exp_001")
            cell_line: Cell type used (e.g. "HEK293T")
            construct: What was expressed (e.g. "PIEZO1-GFP")
            fps:       Frames per second (default: 10.0)
        """
        self.name = name
        self.cell_line = cell_line
        self.construct = construct
        self.fps = fps
        self.notes = []               # Start with empty notes list

    def add_note(self, note):
        """Add a note to this experiment."""
        self.notes.append(note)

    def summary(self):
        """Print a summary of this experiment."""
        print(f"Experiment: {self.name}")
        print(f"  Cell line:  {self.cell_line}")
        print(f"  Construct:  {self.construct}")
        print(f"  FPS:        {self.fps}")
        if self.notes:
            print(f"  Notes:      {'; '.join(self.notes)}")

    def __repr__(self):
        """How this object looks when printed."""
        return f"Experiment('{self.name}', '{self.cell_line}', '{self.construct}')"
```

### Creating and using objects

```python
# Create two experiment objects
exp1 = Experiment("exp_001", "HEK293T", "PIEZO1-GFP", fps=10.0)
exp2 = Experiment("exp_002", "CHO", "PIEZO1-mCherry", fps=20.0)

# Access attributes
print(exp1.name)           # "exp_001"
print(exp2.fps)            # 20.0

# Call methods
exp1.add_note("Good transfection efficiency")
exp1.add_note("Some drift in later frames")
exp1.summary()
# Experiment: exp_001
#   Cell line:  HEK293T
#   Construct:  PIEZO1-GFP
#   FPS:        10.0
#   Notes:      Good transfection efficiency; Some drift in later frames

print(exp1)                # Experiment('exp_001', 'HEK293T', 'PIEZO1-GFP')
```

### Key concepts explained

| Concept | What it means | Example |
|---|---|---|
| `class` | A blueprint for creating objects | `class Experiment:` |
| `object` / `instance` | A specific thing created from a class | `exp1 = Experiment(...)` |
| `__init__` | The constructor --- runs when you create an object | Sets up initial attributes |
| `self` | Refers to "this specific object" | `self.name = name` |
| `attribute` | Data stored on an object | `exp1.name`, `exp1.fps` |
| `method` | A function that belongs to an object | `exp1.add_note("...")` |

### A practical class: ImageStack

```python
import numpy as np
import tifffile
import matplotlib.pyplot as plt


class ImageStack:
    """A wrapper around a TIFF time-lapse stack with analysis methods."""

    def __init__(self, filepath, fps=10.0):
        """Load a TIFF stack from disk.

        Args:
            filepath: Path to a TIFF file
            fps:      Frames per second
        """
        self.filepath = filepath
        self.fps = fps
        self.data = tifffile.imread(filepath)
        self.n_frames, self.height, self.width = self.data.shape
        self.time = np.arange(self.n_frames) / self.fps

    def inspect(self):
        """Print a summary of the stack."""
        print(f"File:    {self.filepath}")
        print(f"Shape:   {self.data.shape}")
        print(f"Dtype:   {self.data.dtype}")
        print(f"Range:   {self.data.min()} - {self.data.max()}")
        print(f"Frames:  {self.n_frames} ({self.n_frames / self.fps:.1f} s)")

    def get_trace(self, roi):
        """Extract a mean intensity trace for a rectangular ROI.

        Args:
            roi: tuple of (y1, y2, x1, x2)

        Returns:
            1D numpy array of mean intensity per frame
        """
        y1, y2, x1, x2 = roi
        return self.data[:, y1:y2, x1:x2].mean(axis=(1, 2))

    def get_dff(self, roi, baseline_seconds=5.0, bg_roi=None):
        """Extract a delta-F/F trace for an ROI.

        Args:
            roi:              tuple of (y1, y2, x1, x2)
            baseline_seconds: seconds of baseline at the start
            bg_roi:           optional background ROI to subtract

        Returns:
            1D numpy array of dF/F values
        """
        trace = self.get_trace(roi)
        if bg_roi is not None:
            trace = trace - self.get_trace(bg_roi)
        baseline_frames = int(self.fps * baseline_seconds)
        f0 = trace[:baseline_frames].mean()
        return (trace - f0) / f0

    def show_frame(self, frame_index=0, cmap="gray"):
        """Display a single frame."""
        plt.figure(figsize=(8, 6))
        plt.imshow(self.data[frame_index], cmap=cmap)
        plt.colorbar(label="Intensity")
        plt.title(f"Frame {frame_index} ({frame_index / self.fps:.1f} s)")
        plt.axis("off")
        plt.tight_layout()
        plt.show()

    def mean_projection(self):
        """Return the mean projection (average of all frames)."""
        return self.data.mean(axis=0)

    def max_projection(self):
        """Return the max projection (brightest pixel across all frames)."""
        return self.data.max(axis=0)
```

Using this class makes your analysis scripts much cleaner:

```python
# Load and inspect
stack = ImageStack("calcium_timelapse.tif", fps=10.0)
stack.inspect()

# Show the first frame
stack.show_frame(0)

# Extract dF/F traces
bg_roi = (10, 40, 10, 40)
cell1_dff = stack.get_dff((200, 230, 200, 230), bg_roi=bg_roi)
cell2_dff = stack.get_dff((300, 330, 150, 180), bg_roi=bg_roi)

# Plot
plt.plot(stack.time, cell1_dff, label="Cell 1")
plt.plot(stack.time, cell2_dff, label="Cell 2")
plt.xlabel("Time (s)")
plt.ylabel("dF/F")
plt.legend()
plt.show()
```

### Inheritance: building on existing classes

Inheritance lets you create a new class based on an existing one. The new class gets all the methods and attributes of the parent, and can add or override them.

```python
class CalciumImagingStack(ImageStack):
    """An ImageStack with calcium-imaging-specific methods."""

    def __init__(self, filepath, fps=10.0, indicator="GCaMP6f"):
        super().__init__(filepath, fps)    # Call parent __init__
        self.indicator = indicator

    def detect_peaks(self, roi, threshold=0.1, bg_roi=None):
        """Find calcium transient peaks in a dF/F trace.

        Args:
            roi:       tuple of (y1, y2, x1, x2)
            threshold: minimum dF/F to count as a peak
            bg_roi:    optional background ROI

        Returns:
            peak_times:  array of peak times in seconds
            peak_values: array of peak dF/F values
        """
        from scipy.signal import find_peaks
        dff = self.get_dff(roi, bg_roi=bg_roi)
        peaks, properties = find_peaks(dff, height=threshold)
        return self.time[peaks], properties["peak_heights"]

    def summary_report(self, rois, bg_roi=None):
        """Print a summary of calcium activity for multiple ROIs."""
        print(f"=== Calcium Imaging Report ===")
        print(f"Indicator: {self.indicator}")
        self.inspect()
        print()
        for name, roi in rois.items():
            dff = self.get_dff(roi, bg_roi=bg_roi)
            peak_times, peak_vals = self.detect_peaks(roi, bg_roi=bg_roi)
            print(f"{name}:")
            print(f"  Peak dF/F:     {dff.max():.3f}")
            print(f"  Num. peaks:    {len(peak_times)}")
            if len(peak_vals) > 0:
                print(f"  Mean peak:     {peak_vals.mean():.3f}")
```

### When to use classes

| Situation | Use functions | Use a class |
|---|---|---|
| One-off analysis script | Yes | Overkill |
| Repeated analysis on many files | Maybe | Good fit |
| Data + operations naturally belong together | --- | Yes |
| You are building a reusable tool or library | --- | Yes |
| You want to share code with the lab | --- | Often helpful |

**Rule of thumb:** If you find yourself passing the same group of variables to many functions, that group should probably be a class.

### Dataclasses: lightweight classes for storing data

Python 3.7+ provides `dataclasses` --- a shortcut for creating classes that mainly hold data.

```python
from dataclasses import dataclass, field
from typing import List


@dataclass
class ExperimentMetadata:
    """Stores metadata for a single experiment."""
    name: str
    cell_line: str
    construct: str
    fps: float = 10.0
    date: str = ""
    notes: List[str] = field(default_factory=list)


# Create --- no need to write __init__!
meta = ExperimentMetadata(
    name="exp_001",
    cell_line="HEK293T",
    construct="PIEZO1-GFP",
    date="2025-02-10",
)
print(meta)
# ExperimentMetadata(name='exp_001', cell_line='HEK293T', construct='PIEZO1-GFP',
#                    fps=10.0, date='2025-02-10', notes=[])

meta.notes.append("Good FOV with 3 cells")
```

Dataclasses automatically generate `__init__`, `__repr__`, and `__eq__` for you.

---

## 23. Lambda Functions, Generators, and Other Patterns

These are intermediate Python features that you will encounter in other people's code and in library documentation. You do not need to memorise them all now, but understanding them will help you read and adapt existing code.

### Lambda functions (anonymous functions)

A `lambda` is a small, one-line function without a name. It is most useful when you need a simple function as an argument to another function.

```python
# Regular function
def double(x):
    return x * 2

# Equivalent lambda
double = lambda x: x * 2

# Practical uses:

# Sort experiments by frame count
experiments = [
    {"name": "exp_001", "frames": 500},
    {"name": "exp_002", "frames": 200},
    {"name": "exp_003", "frames": 800},
]
sorted_exps = sorted(experiments, key=lambda e: e["frames"])

# Sort filenames by the number embedded in them
files = ["cell_10.tif", "cell_2.tif", "cell_1.tif"]
import re
sorted_files = sorted(files, key=lambda f: int(re.search(r'\d+', f).group()))
# ['cell_1.tif', 'cell_2.tif', 'cell_10.tif']

# Filter a list
intensities = [50, 120, 30, 200, 85]
bright = list(filter(lambda x: x > 100, intensities))   # [120, 200]

# Apply a function to every element
scaled = list(map(lambda x: x / 255.0, intensities))
```

### Generators (lazy sequences)

A generator produces values one at a time instead of creating a whole list in memory. This is critical when working with large datasets.

```python
# Generator EXPRESSION (like a list comprehension, but with parentheses)
total_pixels = sum(frame.sum() for frame in stack)
# Processes one frame at a time --- does not create a list of all sums in memory

# Generator FUNCTION (uses yield instead of return)
def frame_generator(directory):
    """Yield one frame at a time from all TIFFs in a directory."""
    import os
    for filename in sorted(os.listdir(directory)):
        if filename.endswith('.tif'):
            stack = tifffile.imread(os.path.join(directory, filename))
            for frame in stack:
                yield frame

# Use it --- only one frame is in memory at a time
for frame in frame_generator("raw_data/"):
    mean_val = frame.mean()
    if mean_val > 100:
        print(f"Bright frame: mean = {mean_val:.1f}")
```

### Dictionary and set comprehensions

Just like list comprehensions, but for dicts and sets:

```python
# Dictionary comprehension
filenames = ["exp_001.tif", "exp_002.tif", "exp_003.tif"]
file_sizes = {f: os.path.getsize(f) for f in filenames}
# {'exp_001.tif': 52428800, 'exp_002.tif': 26214400, ...}

# Set comprehension
extensions = {os.path.splitext(f)[1] for f in os.listdir('.')}
# {'.tif', '.py', '.csv', '.txt'}
```

### The `map`, `filter`, and `zip` functions

```python
# map: apply a function to every element
raw_values = ["100", "200", "300"]
numbers = list(map(int, raw_values))      # [100, 200, 300]

# filter: keep only elements where the function returns True
values = [10, 150, 30, 200, 5]
bright = list(filter(lambda x: x > 100, values))   # [150, 200]

# zip: pair elements from multiple sequences
cells = ["cell_1", "cell_2", "cell_3"]
peak_dff = [0.45, 0.82, 0.12]
for cell, peak in zip(cells, peak_dff):
    print(f"{cell}: peak dF/F = {peak:.2f}")
```

### Unpacking and the `*` operator

```python
# Unpack a list into function arguments
roi = [100, 200, 150, 250]
y1, y2, x1, x2 = roi

# Star unpacking
first, *rest = [1, 2, 3, 4, 5]
# first = 1, rest = [2, 3, 4, 5]

first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5

# Merge dictionaries (Python 3.9+)
defaults = {"fps": 10.0, "baseline_s": 5.0}
overrides = {"fps": 20.0, "cell_line": "CHO"}
settings = {**defaults, **overrides}
# {'fps': 20.0, 'baseline_s': 5.0, 'cell_line': 'CHO'}
```

### Context managers and the `with` statement

You have already seen `with open(...) as f:`. You can create your own context managers for any setup/teardown pattern:

```python
import time

class Timer:
    """A context manager that times a block of code."""
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.2f} s")

# Usage
with Timer():
    stack = tifffile.imread("big_stack.tif")
    mean_proj = stack.mean(axis=0)
# Prints: Elapsed: 3.45 s
```

### Decorators (brief introduction)

A decorator wraps a function to add behaviour. You will see them in libraries; you rarely need to write your own as a beginner.

```python
import functools
import time

def timed(func):
    """Decorator that prints how long a function takes."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.2f} s")
        return result
    return wrapper

@timed
def process_stack(filepath):
    stack = tifffile.imread(filepath)
    return stack.mean(axis=0)

mean_img = process_stack("calcium_timelapse.tif")
# Prints: process_stack took 2.31 s
```

---

## 24. Working with Dates, Times, and Regular Expressions

### Dates and times with `datetime`

The `datetime` module is part of the Python standard library. It is essential for timestamping experiments, parsing dates from filenames, and calculating time intervals.

```python
from datetime import datetime, timedelta

# Current date and time
now = datetime.now()
print(now)                          # 2025-02-10 14:30:45.123456

# Formatting dates as strings
now.strftime("%Y-%m-%d")            # "2025-02-10"
now.strftime("%Y%m%d_%H%M%S")       # "20250210_143045"
now.strftime("%d %B %Y")            # "10 February 2025"

# Parsing a date from a string
date = datetime.strptime("2025-02-10", "%Y-%m-%d")
date = datetime.strptime("20250210_143045", "%Y%m%d_%H%M%S")

# Useful for creating timestamped output files
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_file = f"results_{timestamp}.csv"
# "results_20250210_143045.csv"

# Time arithmetic
experiment_start = datetime(2025, 2, 10, 9, 0, 0)
experiment_end = datetime(2025, 2, 10, 17, 30, 0)
duration = experiment_end - experiment_start
print(duration)                     # 8:30:00
print(duration.total_seconds())     # 30600.0

# Add time
next_week = now + timedelta(days=7)
two_hours_later = now + timedelta(hours=2)
```

### Common format codes

| Code | Meaning | Example |
|---|---|---|
| `%Y` | 4-digit year | `2025` |
| `%m` | 2-digit month | `02` |
| `%d` | 2-digit day | `10` |
| `%H` | Hour (24-hour) | `14` |
| `%M` | Minute | `30` |
| `%S` | Second | `45` |
| `%B` | Full month name | `February` |
| `%A` | Full weekday name | `Monday` |

### Regular expressions with `re`

Regular expressions (regex) are patterns for matching text. They are especially useful for extracting information from filenames and parsing log files.

```python
import re

# Does this string match a pattern?
filename = "piezo1_gfp_cell3_frame042.tif"

if re.search(r"piezo1", filename):
    print("This is a PIEZO1 file")

# Extract parts of a filename
match = re.search(r"cell(\d+)_frame(\d+)", filename)
if match:
    cell_num = int(match.group(1))     # 3
    frame_num = int(match.group(2))    # 42

# Find ALL matches in a string
text = "Cells: HEK293T, CHO, N2A, HEK293T"
cell_types = re.findall(r"[A-Z][A-Z0-9]+", text)
# ['HEK293T', 'CHO', 'N2A', 'HEK293T']

# Replace text
clean_name = re.sub(r"[_\s]+", "_", "messy   file__name.tif")
# "messy_file_name.tif"
```

### Common regex patterns for biology filenames

```python
import re

# Extract date from filename: "20250210_exp_001.tif"
match = re.search(r"(\d{4})(\d{2})(\d{2})", "20250210_exp_001.tif")
year, month, day = match.groups()    # ('2025', '02', '10')

# Extract experiment number
match = re.search(r"exp_?(\d+)", "experiment_042.tif")
exp_num = int(match.group(1))        # 42

# Parse a structured filename
pattern = r"(?P<date>\d{8})_(?P<construct>[^_]+)_(?P<cell>[^_]+)_(?P<num>\d+)\.tif"
match = re.match(pattern, "20250210_piezo1gfp_hek293t_001.tif")
if match:
    info = match.groupdict()
    # {'date': '20250210', 'construct': 'piezo1gfp', 'cell': 'hek293t', 'num': '001'}

# Sort files numerically (not alphabetically)
files = ["cell_1.tif", "cell_10.tif", "cell_2.tif", "cell_20.tif"]
sorted_files = sorted(files, key=lambda f: int(re.search(r"\d+", f).group()))
# ['cell_1.tif', 'cell_2.tif', 'cell_10.tif', 'cell_20.tif']
```

---

## 25. The pathlib Module: Modern Path Handling

`pathlib` (standard library, Python 3.4+) provides an object-oriented way to work with file paths. It is cleaner and more readable than `os.path` and works identically across Windows, macOS, and Linux.

```python
from pathlib import Path

# Create a path
data_dir = Path("data/raw")
filepath = Path("data/raw/experiment_001.tif")

# Useful properties
filepath.name           # "experiment_001.tif"
filepath.stem           # "experiment_001"
filepath.suffix         # ".tif"
filepath.parent         # Path("data/raw")
filepath.parts          # ('data', 'raw', 'experiment_001.tif')

# Build paths with / operator (works on all platforms)
project = Path.home() / "Documents" / "piezo1_project"
output = project / "figures" / "trace_plot.png"

# Check existence
filepath.exists()       # True or False
filepath.is_file()      # True if it is a file
filepath.is_dir()       # True if it is a directory

# Create directories
output_dir = Path("results/figures")
output_dir.mkdir(parents=True, exist_ok=True)
# parents=True  creates intermediate directories
# exist_ok=True  does not error if already exists
```

### Finding files with glob patterns

```python
data_dir = Path("data/raw")

# All TIFF files in a directory
tiff_files = sorted(data_dir.glob("*.tif"))

# Recursive: all TIFF files in subdirectories too
all_tiffs = sorted(data_dir.rglob("*.tif"))

# All Python scripts
scripts = sorted(Path(".").glob("**/*.py"))

# Practical: process all TIFFs in a project
for tif_path in sorted(Path("data").rglob("*.tif")):
    print(f"Processing: {tif_path}")
    stack = tifffile.imread(tif_path)
    # ... analysis ...
```

### Reading and writing files

```python
from pathlib import Path

# Read text
content = Path("notes.txt").read_text()

# Write text
Path("output.txt").write_text(f"Analysis complete: {result:.2f}\n")

# Read bytes (for binary files)
raw_bytes = Path("data.bin").read_bytes()
```

### Replacing parts of a path

```python
# Change extension
tif_path = Path("data/experiment_001.tif")
csv_path = tif_path.with_suffix(".csv")        # data/experiment_001.csv
png_path = tif_path.with_suffix(".png")        # data/experiment_001.png

# Change filename
new_path = tif_path.with_name("processed.tif") # data/processed.tif

# Change stem (name without extension)
new_path = tif_path.with_stem("experiment_001_corrected")
# data/experiment_001_corrected.tif

# Move processed output to a different directory
output_path = Path("results") / tif_path.name  # results/experiment_001.tif
```

### pathlib vs os.path comparison

| Task | `os.path` | `pathlib` |
|---|---|---|
| Join paths | `os.path.join("a", "b")` | `Path("a") / "b"` |
| Get filename | `os.path.basename(p)` | `p.name` |
| Get extension | `os.path.splitext(p)[1]` | `p.suffix` |
| Check exists | `os.path.exists(p)` | `p.exists()` |
| List directory | `os.listdir(p)` | `p.iterdir()` |
| Find files | `glob.glob("*.tif")` | `Path(".").glob("*.tif")` |
| Read file | `open(p).read()` | `Path(p).read_text()` |

> **Recommendation:** Use `pathlib` for new code. It is more readable and less error-prone.

---

## 26. Command-Line Arguments and Logging

### Command-line arguments with `argparse`

When you write a script that you will run frequently with different inputs, use `argparse` to accept command-line arguments instead of editing the script each time.

```python
#!/usr/bin/env python3
"""analyze_stack.py --- Extract dF/F traces from a calcium imaging stack."""

import argparse
import numpy as np
import tifffile
import matplotlib.pyplot as plt


def main():
    parser = argparse.ArgumentParser(
        description="Extract dF/F traces from a TIFF time-lapse stack."
    )
    parser.add_argument("input_file", help="Path to the input TIFF file")
    parser.add_argument("-f", "--fps", type=float, default=10.0,
                        help="Frames per second (default: 10.0)")
    parser.add_argument("-b", "--baseline", type=float, default=5.0,
                        help="Baseline duration in seconds (default: 5.0)")
    parser.add_argument("-o", "--output", default=None,
                        help="Output CSV path (default: <input>_traces.csv)")
    parser.add_argument("--no-plot", action="store_true",
                        help="Skip the plot, just save data")

    args = parser.parse_args()

    # Load data
    stack = tifffile.imread(args.input_file)
    print(f"Loaded {args.input_file}: {stack.shape}")

    # ... your analysis using args.fps, args.baseline, etc. ...
    print(f"FPS: {args.fps}, Baseline: {args.baseline} s")

    if not args.no_plot:
        plt.show()


if __name__ == "__main__":
    main()
```

Run it from the terminal:

```bash
# Basic usage
python analyze_stack.py calcium_timelapse.tif

# With options
python analyze_stack.py calcium_timelapse.tif --fps 20 --baseline 10

# Save output without showing plot
python analyze_stack.py calcium_timelapse.tif -o results.csv --no-plot

# Show help
python analyze_stack.py --help
```

### The `if __name__ == "__main__"` pattern

This pattern is important for writing scripts that can also be imported as modules:

```python
def process_data(filepath):
    """Process a data file --- can be called from other scripts."""
    # ... your code ...
    return results

def main():
    """Entry point when running this script directly."""
    import sys
    results = process_data(sys.argv[1])
    print(results)

# This block ONLY runs when the script is executed directly
# (python my_script.py), NOT when it is imported
# (from my_script import process_data)
if __name__ == "__main__":
    main()
```

### Logging: better than print

For scripts that run for a long time or process many files, `logging` gives you timestamped, levelled messages that can go to the screen, a file, or both.

```python
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),                          # Print to screen
        logging.FileHandler("analysis.log"),              # Also save to file
    ],
)
logger = logging.getLogger(__name__)

# Use it
logger.info("Starting analysis...")
logger.info(f"Loaded stack: {stack.shape}")
logger.warning(f"Low signal in frame {i}: mean = {mean_val:.1f}")
logger.error(f"Failed to load {filename}: {e}")

# Output looks like:
# 2025-02-10 14:30:01 [INFO] Starting analysis...
# 2025-02-10 14:30:02 [INFO] Loaded stack: (500, 512, 512)
# 2025-02-10 14:30:15 [WARNING] Low signal in frame 42: mean = 12.3
```

### Logging levels

| Level | When to use | Example |
|---|---|---|
| `DEBUG` | Detailed diagnostic info | `logger.debug(f"Pixel value at (256,256): {val}")` |
| `INFO` | Normal progress updates | `logger.info("Processing complete")` |
| `WARNING` | Something unexpected but not fatal | `logger.warning("Low signal detected")` |
| `ERROR` | Something failed | `logger.error(f"Could not load {path}")` |
| `CRITICAL` | The program cannot continue | `logger.critical("Out of memory")` |

---

## 27. A Deeper Dive into the Python Ecosystem

### How to find packages

| Resource | URL | What it is |
|---|---|---|
| **PyPI** | pypi.org | The official Python Package Index --- over 500,000 packages |
| **conda-forge** | conda-forge.org | Community-maintained conda packages, tested across platforms |
| **Awesome Python** | github.com/vinta/awesome-python | Curated list of high-quality Python packages by category |
| **Papers With Code** | paperswithcode.com | Find implementations of published algorithms |

### How to evaluate a package before using it

Before adding a dependency to your project, check:

1. **Maintenance:** When was the last commit? Is there an active maintainer?
2. **Popularity:** Number of GitHub stars, PyPI downloads, citations
3. **Documentation:** Is there clear documentation with examples?
4. **Dependencies:** Does it pull in dozens of other packages?
5. **Licence:** Is it compatible with your intended use? (MIT, BSD, Apache are all fine for academic use)

### Managing environments properly

```bash
# List all your conda environments
conda env list

# Create a new environment for a specific project
conda create -n piezo1_analysis python=3.11

# Activate it
conda activate piezo1_analysis

# Install packages
pip install numpy scipy matplotlib tifffile scikit-image pandas

# Export your environment (for reproducibility)
pip freeze > requirements.txt

# Recreate the environment on another machine
pip install -r requirements.txt

# Or with conda:
conda env export > environment.yml
conda env create -f environment.yml
```

### Key packages for PIEZO1 research

#### Image analysis and processing

| Package | Purpose | Install |
|---|---|---|
| **scikit-image** | General image processing (filters, segmentation, morphology) | `pip install scikit-image` |
| **opencv-python** | Computer vision (tracking, feature detection, video) | `pip install opencv-python` |
| **cellpose** | Deep-learning cell segmentation | `pip install cellpose` |
| **trackpy** | Particle tracking (single-molecule localisation) | `pip install trackpy` |
| **aicsimageio** | Read microscopy formats (CZI, LIF, ND2, OME-TIFF) | `pip install aicsimageio` |
| **napari** | Interactive multi-dimensional image viewer | `pip install napari[all]` |

#### Data analysis and statistics

| Package | Purpose | Install |
|---|---|---|
| **pandas** | Tabular data, CSV import/export | `pip install pandas` |
| **scipy.stats** | Statistical tests (t-test, ANOVA, etc.) | (included with scipy) |
| **statsmodels** | Advanced statistics, regression, time-series | `pip install statsmodels` |
| **pingouin** | Intuitive statistical testing for scientists | `pip install pingouin` |
| **seaborn** | Statistical data visualisation (built on matplotlib) | `pip install seaborn` |

#### Automation and integration

| Package | Purpose | Install |
|---|---|---|
| **pyimagej** | Control ImageJ/Fiji from Python | `pip install pyimagej` |
| **subprocess** | Run command-line tools from Python | (standard library) |
| **watchdog** | Monitor a folder for new files | `pip install watchdog` |
| **schedule** | Simple job scheduling | `pip install schedule` |
| **tqdm** | Progress bars for loops | `pip install tqdm` |

#### Presentation and sharing

| Package | Purpose | Install |
|---|---|---|
| **jupyter** | Interactive notebooks for analysis and sharing | `pip install jupyter` |
| **nbconvert** | Convert notebooks to HTML, PDF | (included with jupyter) |
| **sphinx** | Generate documentation from docstrings | `pip install sphinx` |

### Progress bars with tqdm

When processing many files or frames, a progress bar shows how long is left:

```python
from tqdm import tqdm
import tifffile
import numpy as np

tiff_files = sorted(Path("data").glob("*.tif"))

results = []
for filepath in tqdm(tiff_files, desc="Processing stacks"):
    stack = tifffile.imread(filepath)
    mean_val = np.mean(stack)
    results.append({"file": filepath.name, "mean": mean_val})

# Output:
# Processing stacks:  45%|████████████            | 45/100 [01:23<01:42, 0.55it/s]
```

---

## 28. Project Structure: From Single Script to Full Package

As your analysis grows from a quick exploration to a reusable tool, the way you organise your code should evolve.

### Level 1: Single script (a quick analysis)

Perfect for: one-off exploration, homework, quick plots.

```
calcium_analysis.py
```

This is where everyone starts, and it is perfectly fine for many tasks. Put all your code in one file and run it.

### Level 2: Script with functions (a repeatable analysis)

Perfect for: an analysis you will run on multiple datasets.

```
analyze_piezo1.py
```

```python
#!/usr/bin/env python3
"""Analyze PIEZO1 calcium imaging data.

Usage: python analyze_piezo1.py <input_file> [--fps 10] [--output results/]
"""
import argparse
import numpy as np
import tifffile
import matplotlib.pyplot as plt
from pathlib import Path


# --- Configuration ---
DEFAULT_FPS = 10.0
BASELINE_SECONDS = 5.0
BG_ROI = (10, 40, 10, 40)

# --- Analysis functions ---

def load_and_validate(filepath):
    """Load a TIFF stack and check its dimensions."""
    stack = tifffile.imread(filepath)
    assert stack.ndim == 3, f"Expected 3D stack, got {stack.ndim}D"
    return stack

def extract_dff(stack, roi, bg_roi, fps, baseline_s):
    """Extract background-corrected dF/F for an ROI."""
    y1, y2, x1, x2 = roi
    trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))
    by1, by2, bx1, bx2 = bg_roi
    bg = stack[:, by1:by2, bx1:bx2].mean(axis=(1, 2))
    corrected = trace - bg
    f0 = corrected[:int(fps * baseline_s)].mean()
    return (corrected - f0) / f0

def plot_traces(time, traces, output_path):
    """Plot multiple dF/F traces and save the figure."""
    fig, ax = plt.subplots(figsize=(12, 5))
    for name, dff in traces.items():
        ax.plot(time, dff, label=name, lw=1.5)
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("dF/F")
    ax.legend()
    plt.tight_layout()
    plt.savefig(output_path, dpi=300)
    plt.close()

# --- Main entry point ---

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_file")
    parser.add_argument("--fps", type=float, default=DEFAULT_FPS)
    parser.add_argument("--output", default="results")
    args = parser.parse_args()

    stack = load_and_validate(args.input_file)
    time = np.arange(stack.shape[0]) / args.fps

    rois = {
        "cell_1": (200, 230, 200, 230),
        "cell_2": (300, 330, 150, 180),
    }

    traces = {}
    for name, roi in rois.items():
        traces[name] = extract_dff(stack, roi, BG_ROI, args.fps, BASELINE_SECONDS)

    output_dir = Path(args.output)
    output_dir.mkdir(exist_ok=True)
    plot_traces(time, traces, output_dir / "dff_traces.png")
    print(f"Saved to {output_dir}")

if __name__ == "__main__":
    main()
```

### Level 3: Multi-file project (a full analysis pipeline)

Perfect for: a project with multiple analysis steps, shared utility functions, and configuration.

```
piezo1_project/
├── README.md               # What this project does and how to use it
├── requirements.txt         # Package dependencies (pip freeze > requirements.txt)
├── config.py                # Shared settings (ROIs, fps, paths)
├── run_analysis.py          # Main entry point
├── utils/
│   ├── __init__.py          # Makes utils/ a Python package
│   ├── io.py                # File loading and saving functions
│   ├── traces.py            # Trace extraction and dF/F functions
│   └── plotting.py          # Visualisation functions
├── data/
│   └── raw/                 # Raw TIFF files (not tracked in git)
├── results/
│   ├── traces/              # Extracted traces (CSV)
│   └── figures/             # Generated plots (PNG)
└── notebooks/
    └── explore_data.ipynb   # Jupyter notebook for exploration
```

**`config.py`** --- all settings in one place:
```python
"""Project configuration --- edit this file for each experiment."""
from pathlib import Path

# Paths
DATA_DIR = Path("data/raw")
RESULTS_DIR = Path("results")
FIGURES_DIR = RESULTS_DIR / "figures"
TRACES_DIR = RESULTS_DIR / "traces"

# Acquisition settings
FPS = 10.0
BASELINE_SECONDS = 5.0

# ROI definitions (y1, y2, x1, x2)
ROIS = {
    "cell_1": (200, 230, 200, 230),
    "cell_2": (300, 330, 150, 180),
}
BG_ROI = (10, 40, 10, 40)
```

**`utils/io.py`**:
```python
"""Functions for loading and saving data."""
import tifffile
import numpy as np
import pandas as pd
from pathlib import Path

def load_stack(filepath):
    """Load a TIFF stack and return it as a numpy array."""
    stack = tifffile.imread(filepath)
    if stack.ndim != 3:
        raise ValueError(f"Expected 3D stack, got shape {stack.shape}")
    return stack

def save_traces(traces_dict, time, output_path):
    """Save a dictionary of traces to a CSV file."""
    df = pd.DataFrame({"time_s": time})
    for name, trace in traces_dict.items():
        df[name] = trace
    df.to_csv(output_path, index=False)
```

**`run_analysis.py`**:
```python
#!/usr/bin/env python3
"""Run the full PIEZO1 analysis pipeline."""
import numpy as np
from pathlib import Path
import config
from utils.io import load_stack, save_traces
from utils.traces import extract_dff
from utils.plotting import plot_dff_traces

def main():
    # Create output directories
    config.FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    config.TRACES_DIR.mkdir(parents=True, exist_ok=True)

    # Process each TIFF file
    for tif_path in sorted(config.DATA_DIR.glob("*.tif")):
        print(f"Processing: {tif_path.name}")
        stack = load_stack(tif_path)
        time = np.arange(stack.shape[0]) / config.FPS

        traces = {}
        for name, roi in config.ROIS.items():
            traces[name] = extract_dff(
                stack, roi, config.BG_ROI, config.FPS, config.BASELINE_SECONDS
            )

        # Save results
        stem = tif_path.stem
        save_traces(traces, time, config.TRACES_DIR / f"{stem}_traces.csv")
        plot_dff_traces(time, traces, config.FIGURES_DIR / f"{stem}_traces.png")

    print("Done!")

if __name__ == "__main__":
    main()
```

### Level 4: Installable package (a tool for the whole lab)

Perfect for: code that multiple people will use across different projects.

```
piezo1_tools/
├── README.md
├── pyproject.toml           # Package metadata and dependencies
├── src/
│   └── piezo1_tools/
│       ├── __init__.py
│       ├── stack.py         # ImageStack class
│       ├── traces.py        # Trace extraction
│       ├── plotting.py      # Visualisation
│       └── io.py            # File I/O
├── tests/
│   ├── test_stack.py
│   └── test_traces.py
└── examples/
    └── basic_analysis.py
```

**`pyproject.toml`**:
```toml
[project]
name = "piezo1-tools"
version = "0.1.0"
description = "Analysis tools for PIEZO1 calcium imaging"
requires-python = ">=3.9"
dependencies = [
    "numpy",
    "scipy",
    "matplotlib",
    "tifffile",
    "pandas",
]
```

Install it with:
```bash
pip install -e .    # Editable install: changes to source code take effect immediately
```

Then use it from anywhere:
```python
from piezo1_tools.stack import ImageStack

stack = ImageStack("data.tif", fps=10.0)
dff = stack.get_dff(roi=(200, 230, 200, 230))
```

### The `__init__.py` file

An `__init__.py` file turns a directory into a Python package. It can be empty or it can import key items for convenience:

```python
# utils/__init__.py
"""Utility functions for PIEZO1 analysis."""

from .io import load_stack, save_traces
from .traces import extract_dff
from .plotting import plot_dff_traces
```

This lets users write `from utils import load_stack` instead of `from utils.io import load_stack`.

### Writing tests

Tests catch bugs before they reach your analysis. Use `pytest`:

```python
# tests/test_traces.py
import numpy as np
from utils.traces import extract_dff

def test_dff_baseline_is_zero():
    """dF/F during the baseline period should be approximately zero."""
    # Create fake data: constant intensity of 100 for 100 frames
    stack = np.full((100, 50, 50), 100.0)
    roi = (0, 50, 0, 50)
    bg_roi = None
    dff = extract_dff(stack, roi, bg_roi, fps=10.0, baseline_s=5.0)
    # All values should be zero (no change from baseline)
    assert np.allclose(dff, 0.0), f"Expected all zeros, got {dff}"

def test_dff_detects_increase():
    """dF/F should be positive when intensity increases above baseline."""
    stack = np.full((100, 50, 50), 100.0)
    stack[50:, :, :] = 200.0    # Double intensity in second half
    roi = (0, 50, 0, 50)
    dff = extract_dff(stack, roi, None, fps=10.0, baseline_s=5.0)
    assert dff[75] > 0, "Expected positive dF/F after intensity increase"
```

Run tests from the terminal:
```bash
pip install pytest
pytest tests/
```

### Version control with git

Track your analysis code with git from day one:

```bash
# Initialise a git repository
cd piezo1_project
git init

# Create a .gitignore to exclude large data files
echo "data/raw/*.tif" > .gitignore
echo "results/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore

# Stage and commit
git add .
git commit -m "Initial project structure"
```

### Summary: when to use each level

| Level | When | Files | Time to set up |
|---|---|---|---|
| **1. Single script** | Quick exploration, homework | 1 | 0 minutes |
| **2. Script with functions** | Repeatable analysis | 1 | 5 minutes |
| **3. Multi-file project** | Full pipeline, shared config | 5-10 | 30 minutes |
| **4. Installable package** | Lab-wide tool, multiple projects | 10+ | 1-2 hours |

**Start at Level 1.** Move to Level 2 when you find yourself copying code between scripts. Move to Level 3 when a project has more than ~300 lines. Move to Level 4 only when the code is genuinely reused across multiple projects.

---

## 29. Practical Examples for Biology Research

These are complete, realistic examples of how Python can help in your day-to-day research. Each one is a standalone script you can adapt.

### Example 1: Batch processing a folder of TIRF image stacks

**Scenario:** You have a folder of TIFF stacks from a day of TIRF imaging. You want to extract mean intensity traces, compute dF/F, find peaks, and save a summary CSV.

```python
#!/usr/bin/env python3
"""Batch process all TIRF stacks in a folder.

For each TIFF file:
  1. Extract mean ROI trace
  2. Compute background-corrected dF/F
  3. Find calcium transient peaks
  4. Save results to CSV and plot

Usage: python batch_process_tirf.py data/raw/ --fps 10
"""
import argparse
import numpy as np
import tifffile
import matplotlib.pyplot as plt
import pandas as pd
from pathlib import Path
from scipy.signal import find_peaks
from tqdm import tqdm


def process_one_stack(filepath, roi, bg_roi, fps, baseline_s):
    """Process a single TIFF stack and return results."""
    stack = tifffile.imread(filepath)
    if stack.ndim != 3:
        return None

    y1, y2, x1, x2 = roi
    trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))

    by1, by2, bx1, bx2 = bg_roi
    bg = stack[:, by1:by2, bx1:bx2].mean(axis=(1, 2))

    corrected = trace - bg
    baseline_frames = int(fps * baseline_s)
    f0 = corrected[:baseline_frames].mean()
    if f0 == 0:
        return None
    dff = (corrected - f0) / f0
    time = np.arange(len(dff)) / fps

    # Find peaks
    peaks, properties = find_peaks(dff, height=0.05, distance=int(fps * 2))

    return {
        "time": time,
        "dff": dff,
        "peak_indices": peaks,
        "peak_times": time[peaks],
        "peak_heights": properties["peak_heights"],
        "n_frames": stack.shape[0],
        "mean_intensity": float(trace.mean()),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input_dir", help="Directory containing TIFF files")
    parser.add_argument("--fps", type=float, default=10.0)
    parser.add_argument("--output", default="batch_results")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    roi = (200, 260, 200, 260)
    bg_roi = (10, 40, 10, 40)

    tiff_files = sorted(input_dir.glob("*.tif"))
    print(f"Found {len(tiff_files)} TIFF files in {input_dir}")

    summary_rows = []
    for filepath in tqdm(tiff_files, desc="Processing"):
        result = process_one_stack(filepath, roi, bg_roi, args.fps, baseline_s=5.0)
        if result is None:
            print(f"  Skipped: {filepath.name}")
            continue

        # Save individual trace plot
        fig, ax = plt.subplots(figsize=(10, 3))
        ax.plot(result["time"], result["dff"], lw=1)
        ax.plot(result["peak_times"], result["peak_heights"], "rv", markersize=6)
        ax.set_xlabel("Time (s)")
        ax.set_ylabel("dF/F")
        ax.set_title(filepath.stem)
        plt.tight_layout()
        plt.savefig(output_dir / f"{filepath.stem}_trace.png", dpi=150)
        plt.close()

        # Collect summary
        summary_rows.append({
            "file": filepath.name,
            "n_frames": result["n_frames"],
            "mean_intensity": result["mean_intensity"],
            "peak_dff": float(result["dff"].max()),
            "n_peaks": len(result["peak_indices"]),
            "mean_peak_height": float(result["peak_heights"].mean())
                              if len(result["peak_heights"]) > 0 else 0.0,
        })

    # Save summary CSV
    summary = pd.DataFrame(summary_rows)
    summary.to_csv(output_dir / "batch_summary.csv", index=False)
    print(f"\nDone! Results saved to {output_dir}/")
    print(summary.to_string(index=False))


if __name__ == "__main__":
    main()
```

### Example 2: Automated file organisation

**Scenario:** After imaging, your files have inconsistent names. You want to sort them into a clean directory structure by date and construct.

```python
#!/usr/bin/env python3
"""Organize microscopy files into a structured directory tree.

Reads experiment metadata from filenames and sorts files into:
  organized/<date>/<construct>/<original_filename>

Usage: python organize_files.py raw_data/ --dry-run
"""
import argparse
import re
import shutil
from pathlib import Path
from datetime import datetime


def parse_filename(filename):
    """Try to extract date and construct from a filename.

    Handles patterns like:
      20250210_piezo1gfp_cell1_001.tif
      2025-02-10_PIEZO1-mCherry_exp003.tif
      piezo1_gfp_20250210.tif
    """
    # Try to find a date (YYYYMMDD or YYYY-MM-DD)
    date_match = re.search(r"(\d{4})-?(\d{2})-?(\d{2})", filename)
    date_str = f"{date_match.group(1)}-{date_match.group(2)}-{date_match.group(3)}" \
               if date_match else "unknown_date"

    # Try to find construct name
    construct_patterns = [
        r"(piezo1[_-]?gfp)",
        r"(piezo1[_-]?mcherry)",
        r"(piezo1[_-]?tdtomato)",
        r"(gfp[_-]?piezo1)",
        r"(piezo1[_-]?wt)",
        r"(piezo1)",
    ]
    construct = "unknown_construct"
    for pattern in construct_patterns:
        match = re.search(pattern, filename, re.IGNORECASE)
        if match:
            construct = match.group(1).lower().replace("-", "_")
            break

    return date_str, construct


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input_dir", help="Directory with unorganised files")
    parser.add_argument("--output", default="organized", help="Output directory")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would happen without moving files")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output)

    files = sorted(input_dir.glob("*.tif"))
    print(f"Found {len(files)} TIFF files\n")

    for filepath in files:
        date_str, construct = parse_filename(filepath.name)
        dest_dir = output_dir / date_str / construct
        dest_path = dest_dir / filepath.name

        action = "WOULD COPY" if args.dry_run else "Copying"
        print(f"  {action}: {filepath.name}")
        print(f"       --> {dest_path}")

        if not args.dry_run:
            dest_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(filepath, dest_path)

    print(f"\n{'DRY RUN complete' if args.dry_run else 'Done!'}")


if __name__ == "__main__":
    main()
```

### Example 3: Automated experiment log from file metadata

**Scenario:** You want to generate a summary spreadsheet of all experiments in a directory tree, extracting info from filenames and TIFF metadata.

```python
#!/usr/bin/env python3
"""Generate an experiment log from TIFF file metadata.

Scans a directory tree and creates a CSV with file info, dimensions,
and any metadata embedded in the TIFF headers.

Usage: python generate_experiment_log.py data/ -o experiment_log.csv
"""
import argparse
import tifffile
import pandas as pd
from pathlib import Path
from datetime import datetime
from tqdm import tqdm


def get_file_info(filepath):
    """Extract metadata from a TIFF file."""
    info = {
        "filename": filepath.name,
        "directory": str(filepath.parent),
        "size_mb": filepath.stat().st_size / (1024 * 1024),
        "modified": datetime.fromtimestamp(filepath.stat().st_mtime)
                    .strftime("%Y-%m-%d %H:%M"),
    }

    try:
        with tifffile.TiffFile(filepath) as tif:
            series = tif.series[0]
            info["shape"] = str(series.shape)
            info["dtype"] = str(series.dtype)
            info["n_frames"] = series.shape[0] if len(series.shape) >= 3 else 1
            info["height"] = series.shape[-2]
            info["width"] = series.shape[-1]

            # Try to read ImageJ metadata
            if tif.imagej_metadata:
                ij_meta = tif.imagej_metadata
                info["imagej_info"] = ij_meta.get("Info", "")[:200]

    except Exception as e:
        info["error"] = str(e)

    return info


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input_dir")
    parser.add_argument("-o", "--output", default="experiment_log.csv")
    args = parser.parse_args()

    tiff_files = sorted(Path(args.input_dir).rglob("*.tif"))
    print(f"Found {len(tiff_files)} TIFF files")

    rows = []
    for filepath in tqdm(tiff_files, desc="Scanning"):
        rows.append(get_file_info(filepath))

    df = pd.DataFrame(rows)
    df.to_csv(args.output, index=False)
    print(f"\nSaved experiment log to {args.output}")
    print(f"Total files: {len(df)}")
    print(f"Total size:  {df['size_mb'].sum():.1f} MB")


if __name__ == "__main__":
    main()
```

### Example 4: Monitoring a folder for new data (automation)

**Scenario:** You want a script that watches your microscope output folder and automatically runs analysis on new files as they appear.

```python
#!/usr/bin/env python3
"""Watch a folder for new TIFF files and automatically process them.

Usage: python watch_and_analyze.py /path/to/microscope/output/
"""
import time
import argparse
import numpy as np
import tifffile
import matplotlib.pyplot as plt
from pathlib import Path
from datetime import datetime


def process_new_file(filepath, output_dir):
    """Run a quick analysis on a newly detected TIFF file."""
    print(f"  [{datetime.now().strftime('%H:%M:%S')}] Processing {filepath.name}...")

    try:
        stack = tifffile.imread(filepath)
    except Exception as e:
        print(f"    ERROR: {e}")
        return

    print(f"    Shape: {stack.shape}, dtype: {stack.dtype}")

    if stack.ndim == 3:
        # Create a quick mean projection
        mean_proj = stack.mean(axis=0)
        fig, axes = plt.subplots(1, 2, figsize=(12, 5))
        axes[0].imshow(stack[0], cmap="gray")
        axes[0].set_title("First frame")
        axes[1].imshow(mean_proj, cmap="gray")
        axes[1].set_title("Mean projection")
        for ax in axes:
            ax.axis("off")
        plt.tight_layout()
        out_path = output_dir / f"{filepath.stem}_preview.png"
        plt.savefig(out_path, dpi=150)
        plt.close()
        print(f"    Saved preview: {out_path}")

    elif stack.ndim == 2:
        print(f"    Single frame, intensity range: {stack.min()}-{stack.max()}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("watch_dir", help="Directory to watch for new TIFF files")
    parser.add_argument("--output", default="auto_results")
    parser.add_argument("--interval", type=int, default=5,
                        help="Check interval in seconds (default: 5)")
    args = parser.parse_args()

    watch_dir = Path(args.watch_dir)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Watching {watch_dir} for new TIFF files...")
    print(f"Results will be saved to {output_dir}/")
    print("Press Ctrl+C to stop.\n")

    seen_files = set(watch_dir.glob("*.tif"))

    try:
        while True:
            current_files = set(watch_dir.glob("*.tif"))
            new_files = current_files - seen_files

            for filepath in sorted(new_files):
                # Wait briefly for file to finish writing
                time.sleep(1)
                process_new_file(filepath, output_dir)

            seen_files = current_files
            time.sleep(args.interval)

    except KeyboardInterrupt:
        print("\nStopped watching.")


if __name__ == "__main__":
    main()
```

### Example 5: Comparing conditions with statistical tests

**Scenario:** You have dF/F traces from control and Yoda1-treated cells, and you need to compare peak calcium responses with a statistical test.

```python
#!/usr/bin/env python3
"""Compare calcium responses between control and Yoda1-treated cells.

Loads pre-extracted traces from CSV files, measures peak dF/F for each cell,
and performs a statistical comparison.

Usage: python compare_conditions.py control_traces.csv yoda1_traces.csv
"""
import argparse
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats


def load_traces(csv_path):
    """Load traces from a CSV where column 0 is time and others are cells."""
    df = pd.read_csv(csv_path)
    time = df.iloc[:, 0].values
    traces = {col: df[col].values for col in df.columns[1:]}
    return time, traces


def measure_peaks(traces):
    """Get the peak dF/F value for each trace."""
    return {name: trace.max() for name, trace in traces.items()}


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("control_csv", help="CSV with control traces")
    parser.add_argument("treated_csv", help="CSV with treated traces")
    parser.add_argument("-o", "--output", default="comparison")
    args = parser.parse_args()

    # Load data
    time_ctrl, traces_ctrl = load_traces(args.control_csv)
    time_treat, traces_treat = load_traces(args.treated_csv)

    peaks_ctrl = list(measure_peaks(traces_ctrl).values())
    peaks_treat = list(measure_peaks(traces_treat).values())

    # Statistical test
    t_stat, p_value = stats.ttest_ind(peaks_ctrl, peaks_treat)
    print(f"Control:  n={len(peaks_ctrl)}, mean peak dF/F = {np.mean(peaks_ctrl):.3f} "
          f"+/- {np.std(peaks_ctrl):.3f}")
    print(f"Treated:  n={len(peaks_treat)}, mean peak dF/F = {np.mean(peaks_treat):.3f} "
          f"+/- {np.std(peaks_treat):.3f}")
    print(f"t-test:   t = {t_stat:.3f}, p = {p_value:.4f}")
    print(f"Result:   {'Significant' if p_value < 0.05 else 'Not significant'} "
          f"(alpha = 0.05)")

    # Box plot
    fig, ax = plt.subplots(figsize=(6, 5))
    bp = ax.boxplot([peaks_ctrl, peaks_treat], labels=["Control", "Yoda1"],
                    patch_artist=True, widths=0.5)
    bp["boxes"][0].set_facecolor("lightblue")
    bp["boxes"][1].set_facecolor("salmon")

    # Add individual data points
    for i, data in enumerate([peaks_ctrl, peaks_treat], start=1):
        x = np.random.normal(i, 0.04, size=len(data))
        ax.scatter(x, data, alpha=0.6, color="black", s=20, zorder=3)

    # Add significance annotation
    y_max = max(max(peaks_ctrl), max(peaks_treat))
    if p_value < 0.001:
        sig_text = "***"
    elif p_value < 0.01:
        sig_text = "**"
    elif p_value < 0.05:
        sig_text = "*"
    else:
        sig_text = "n.s."
    ax.plot([1, 2], [y_max * 1.1, y_max * 1.1], "k-", lw=1)
    ax.text(1.5, y_max * 1.15, sig_text, ha="center", fontsize=14)

    ax.set_ylabel("Peak dF/F")
    ax.set_title("PIEZO1 Calcium Response: Control vs Yoda1")
    plt.tight_layout()
    plt.savefig(f"{args.output}_boxplot.png", dpi=300)
    plt.show()


if __name__ == "__main__":
    main()
```

### Example 6: Generating a cell culture passage log

**Scenario:** You want a simple tool to record and query your cell culture passages.

```python
#!/usr/bin/env python3
"""Simple cell culture passage tracker.

Usage:
  python passage_log.py add HEK293T 15 "Split 1:10, good confluency"
  python passage_log.py show HEK293T
  python passage_log.py show --all
"""
import argparse
import csv
from pathlib import Path
from datetime import datetime

LOG_FILE = Path("passage_log.csv")
COLUMNS = ["date", "time", "cell_line", "passage", "notes"]


def ensure_log_exists():
    if not LOG_FILE.exists():
        with open(LOG_FILE, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(COLUMNS)


def add_entry(cell_line, passage, notes):
    ensure_log_exists()
    now = datetime.now()
    with open(LOG_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            now.strftime("%Y-%m-%d"),
            now.strftime("%H:%M"),
            cell_line,
            passage,
            notes,
        ])
    print(f"Added: {cell_line} P{passage} on {now.strftime('%Y-%m-%d')}")


def show_entries(cell_line=None):
    ensure_log_exists()
    with open(LOG_FILE, "r") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    if cell_line:
        rows = [r for r in rows if r["cell_line"].lower() == cell_line.lower()]

    if not rows:
        print("No entries found.")
        return

    print(f"{'Date':<12} {'Time':<6} {'Cell Line':<12} {'P#':<5} {'Notes'}")
    print("-" * 70)
    for r in rows:
        print(f"{r['date']:<12} {r['time']:<6} {r['cell_line']:<12} "
              f"P{r['passage']:<4} {r['notes']}")


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command")

    add_p = sub.add_parser("add", help="Add a passage entry")
    add_p.add_argument("cell_line", help="Cell line name (e.g. HEK293T)")
    add_p.add_argument("passage", type=int, help="Passage number")
    add_p.add_argument("notes", nargs="?", default="", help="Notes")

    show_p = sub.add_parser("show", help="Show passage log")
    show_p.add_argument("cell_line", nargs="?", help="Filter by cell line")
    show_p.add_argument("--all", action="store_true", help="Show all entries")

    args = parser.parse_args()

    if args.command == "add":
        add_entry(args.cell_line, args.passage, args.notes)
    elif args.command == "show":
        show_entries(args.cell_line)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
```

---

## 30. Python Inside Other Software

Many tools you already use in the lab can be controlled or extended with Python. This section covers the most common integrations.

### Python and ImageJ/Fiji

ImageJ is the most widely used open-source tool for biological image analysis. You can use Python to automate it in several ways.

#### Option 1: PyImageJ (control Fiji from Python)

```python
# pip install pyimagej
import imagej

# Start an ImageJ instance
ij = imagej.init('sc.fiji:fiji')

# Open an image
dataset = ij.io().open("cell_image.tif")

# Apply a Gaussian blur using ImageJ
blurred = ij.op().filter().gauss(dataset, 2.0)

# Convert to numpy array for further processing
import numpy as np
arr = np.array(ij.py.from_java(blurred))

# Run an ImageJ macro from Python
macro = """
open("cell_image.tif");
run("Subtract Background...", "rolling=50");
run("Enhance Contrast", "saturated=0.35");
saveAs("Tiff", "processed.tif");
close();
"""
ij.script().run("macro.ijm", macro, True).get()
```

#### Option 2: Use Python to prepare data, ImageJ to visualise

A common workflow is to do the heavy computation in Python, save the result as a TIFF, and open it in ImageJ for interactive inspection:

```python
import numpy as np
import tifffile

# Process in Python
stack = tifffile.imread("raw.tif")
mean_proj = stack.mean(axis=0).astype(np.float32)
dff_stack = ((stack - stack[:10].mean(axis=0)) /
             stack[:10].mean(axis=0)).astype(np.float32)

# Save for ImageJ
tifffile.imwrite("mean_projection.tif", mean_proj, imagej=True)
tifffile.imwrite("dff_movie.tif", dff_stack, imagej=True,
                 metadata={"axes": "TYX"})

# Open in ImageJ from the command line:
# fiji mean_projection.tif
```

#### Option 3: Run ImageJ macros in batch from Python

```python
import subprocess
from pathlib import Path

# Path to your Fiji installation
fiji_path = "/Applications/Fiji.app/Contents/MacOS/ImageJ-macosx"
# Windows: fiji_path = r"C:\Fiji.app\ImageJ-win64.exe"

macro_text = """
open("{input_path}");
run("Subtract Background...", "rolling=50 stack");
run("Gaussian Blur...", "sigma=1 stack");
saveAs("Tiff", "{output_path}");
close();
"""

input_dir = Path("raw_data")
output_dir = Path("processed")
output_dir.mkdir(exist_ok=True)

for tif in sorted(input_dir.glob("*.tif")):
    out = output_dir / tif.name
    macro = macro_text.format(input_path=str(tif), output_path=str(out))

    # Save macro to temp file and run
    macro_file = Path("temp_macro.ijm")
    macro_file.write_text(macro)
    subprocess.run([fiji_path, "--headless", "-macro", str(macro_file)],
                   check=True)
    macro_file.unlink()
    print(f"Processed: {tif.name}")
```

### Python and FLIKA

FLIKA is an open-source, Python-based application for analysing fluorescence imaging data --- calcium signals, single-molecule localisation, and more; developed at UCI.  Because FLIKA is written entirely in Python (using PyQt and pyqtgraph), it integrates with your own Python code seamlessly. A separate manual will cover FLIKA in detail; this section gives you the key concepts for using Python alongside it.

> **Separate manual:** A dedicated FLIKA manual covering the GUI, built-in processes, plugin development, and advanced workflows is planned. The information below is enough to get started writing scripts that interact with FLIKA.

#### How FLIKA stores data

FLIKA represents every image as a **Window** object. The pixel data is a standard NumPy array accessible via `window.image`:

- A 2D grayscale image has shape `(height, width)`
- A 3D time-lapse stack has shape `(frames, height, width)`
- A colour stack has shape `(frames, height, width, channels)`

This means every NumPy technique you have learned in this manual (slicing, statistics, dF/F calculations) works directly on FLIKA data.

#### Key global variables

FLIKA uses a global state module (`flika.global_vars`, imported as `g`) to track open windows and settings:

```python
import flika.global_vars as g

g.m              # The main FLIKA application window
g.win            # The currently selected Window object
g.windows        # List of all open Windows
g.traceWindows   # List of open trace/plot windows
g.settings       # Persistent settings dictionary
```

#### Running scripts inside FLIKA

FLIKA has a built-in **Script Editor** (accessible from the menu) with an IPython console. When you run code there, the following are already available in the namespace:

- `g` --- global variables (as above)
- `np` --- NumPy
- `scipy` --- SciPy
- `pg` --- pyqtgraph
- All built-in process functions (`open_file`, `gaussian_blur`, `threshold`, etc.)

#### Basic FLIKA scripting

```python
# --- Inside FLIKA's script editor or a standalone script ---

from flika import *                        # Sets up g, imports processes
from flika.process.file_ import open_file, save_file
from flika.process import gaussian_blur, threshold
from flika.roi import makeROI

# Open a TIFF stack
win = open_file("calcium_timelapse.tif")

# Access the image data as a numpy array
stack = g.win.image                        # shape: (500, 512, 512)
print(f"Loaded: {stack.shape}, dtype={stack.dtype}")

# Apply a Gaussian blur (creates a new Window)
blurred = gaussian_blur(sigma=2.0)

# Access window properties
print(f"Frames: {g.win.mt}")
print(f"Dimensions: {g.win.mx} x {g.win.my}")
print(f"Frame rate: {g.win.framerate} fps")

# Create an ROI and extract a trace
roi = makeROI('rectangle', [[100, 100], [150, 150]], window=g.win)
trace = roi.getTrace()                     # Returns a numpy array
roi.plot()                                 # Display trace in a plot window

# Save the processed image
save_file("processed.tif")
```

#### Using your own NumPy/SciPy code with FLIKA data

Because FLIKA's image data is just a NumPy array, you can pull it out, process it with any Python code, and push the result back into a new FLIKA window:

```python
import numpy as np
from flika.window import Window
import flika.global_vars as g

# Get the data from the current window
stack = g.win.image.copy()

# --- Do any custom analysis with standard Python ---
from scipy.signal import find_peaks

# Extract a trace from a region
roi_trace = stack[:, 200:230, 200:230].mean(axis=(1, 2))

# Find calcium transient peaks
peaks, properties = find_peaks(roi_trace, height=0.1, distance=20)
print(f"Found {len(peaks)} calcium events")

# Compute dF/F
baseline = stack[:50].mean(axis=0)
dff = (stack - baseline) / baseline

# Push the result back into FLIKA as a new window
dff_window = Window(dff, name="dF/F", filename="", commands=["dF/F computed"])
```

#### Writing FLIKA plugins

Plugins extend FLIKA with new menu items and processing functions. A plugin is a directory containing Python code and an `info.xml` metadata file. Plugins live in `~/.FLIKA/plugins/`.

```
my_plugin/
├── __init__.py          # Can be empty
├── info.xml             # Plugin metadata and menu layout
├── about.html           # Description shown in Plugin Manager
└── my_plugin.py         # Your processing code
```

The core of a plugin is a class that inherits from `BaseProcess`:

```python
# my_plugin/my_plugin.py
from flika.utils.BaseProcess import BaseProcess, SliderLabel
from flika.window import Window
import flika.global_vars as g
import numpy as np


class MyAnalysis(BaseProcess):
    """Custom analysis for PIEZO1 calcium data."""

    def __init__(self):
        BaseProcess.__init__(self)

    def gui(self):
        """Build the GUI dialog with parameter controls."""
        self.gui_reset()
        sigma_slider = SliderLabel(2)       # 2 decimal places
        sigma_slider.setRange(0.1, 10.0)
        sigma_slider.setValue(2.0)
        self.items.append({
            'name': 'sigma',
            'string': 'Smoothing sigma',
            'object': sigma_slider,
        })
        super().gui()

    def __call__(self, sigma=2.0, keepSourceWindow=False):
        """Run the analysis. Called by the GUI or from a script."""
        self.start(keepSourceWindow)

        # self.tif is the input image (numpy array)
        from scipy.ndimage import gaussian_filter1d
        self.newtif = gaussian_filter1d(self.tif, sigma=sigma, axis=0)
        self.newname = self.oldname + f" - smoothed (sigma={sigma})"

        return self.end()       # Creates a new Window with the result


# Create an instance --- FLIKA uses this to wire up the menu item
my_analysis = MyAnalysis()
```

Existing plugins for the lab (beam splitter, puff detection, overlay, line scan, etc.) are available in the lab's plugin repository and can be used as templates for new plugins.

#### Common FLIKA workflows from Python

| Task | Code |
|---|---|
| Open a file | `open_file("image.tif")` |
| Access pixel data | `data = g.win.image` |
| Current frame index | `g.win.currentIndex` |
| Apply a filter | `gaussian_blur(sigma=2.0)` |
| Create an ROI | `makeROI('rectangle', [[y1,x1],[y2,x2]], window=g.win)` |
| Get ROI trace | `trace = roi.getTrace()` |
| Plot an ROI trace | `roi.plot()` |
| Create a new window from an array | `Window(array, name="result")` |
| Save current window | `save_file("output.tif")` |

### Python and CellProfiler

CellProfiler is a free, open-source tool for measuring and analysing cell images at scale. It is widely used for high-content screening, cell counting, morphology measurements, and fluorescence quantification. CellProfiler has its own GUI for building analysis **pipelines** (sequences of processing steps), but these pipelines can be run and automated from Python.

#### Running CellProfiler pipelines from the command line

You can build a pipeline in the CellProfiler GUI, save it as a `.cppipe` file, and then run it in batch from Python:

```python
import subprocess
from pathlib import Path

# Path to CellProfiler (adjust for your installation)
# macOS: typically installed as an app
# Linux/pip install: "cellprofiler" is on your PATH

pipeline = "my_pipeline.cppipe"
image_dir = Path("data/raw")
output_dir = Path("cellprofiler_output")
output_dir.mkdir(exist_ok=True)

# Run the pipeline headless (no GUI)
subprocess.run([
    "cellprofiler",
    "-c",                                   # Run headless
    "-r",                                   # Run the pipeline
    "-p", str(pipeline),                    # Pipeline file
    "-i", str(image_dir),                   # Input image directory
    "-o", str(output_dir),                  # Output directory
], check=True)

print(f"CellProfiler results saved to {output_dir}")
```

#### Using CellProfiler's Python API directly

CellProfiler is written in Python and can be imported as a library for advanced automation:

```python
# pip install cellprofiler  (or install from source)
import cellprofiler_core.pipeline
import cellprofiler_core.preferences
import cellprofiler_core.utilities.java

# Initialise the CellProfiler engine
cellprofiler_core.utilities.java.start_java()
cellprofiler_core.preferences.set_headless()

# Load a pipeline
pipeline = cellprofiler_core.pipeline.Pipeline()
pipeline.load("my_pipeline.cppipe")

# Set input/output directories
cellprofiler_core.preferences.set_default_image_directory("data/raw")
cellprofiler_core.preferences.set_default_output_directory("results")

# Run the pipeline
output = pipeline.run()

print("Pipeline finished!")
```

#### Processing CellProfiler output with pandas

CellProfiler exports measurements as CSV files. These are easy to analyse with pandas:

```python
import pandas as pd
import matplotlib.pyplot as plt

# CellProfiler typically produces files like:
#   Image.csv      --- per-image measurements
#   Nuclei.csv     --- per-object measurements (e.g. per cell)

cells = pd.read_csv("cellprofiler_output/Nuclei.csv")

# See what was measured
print(cells.columns.tolist())

# Example: compare PIEZO1-GFP intensity between conditions
# (assuming you have a "Metadata_Condition" column)
for condition, group in cells.groupby("Metadata_Condition"):
    intensities = group["Intensity_MeanIntensity_GFP"]
    print(f"{condition}: mean = {intensities.mean():.3f}, "
          f"n = {len(intensities)} cells")

# Box plot of GFP intensity by condition
cells.boxplot(column="Intensity_MeanIntensity_GFP",
              by="Metadata_Condition", figsize=(8, 5))
plt.ylabel("Mean GFP Intensity")
plt.title("PIEZO1-GFP Expression by Condition")
plt.suptitle("")    # Remove automatic pandas title
plt.tight_layout()
plt.savefig("gfp_intensity_comparison.png", dpi=300)
plt.show()
```

#### A common CellProfiler + Python workflow

1. **CellProfiler GUI:** Build a pipeline to segment cells and measure PIEZO1-GFP fluorescence
2. **Command line / Python:** Run the pipeline in batch across all your image folders
3. **pandas + matplotlib:** Load the output CSVs and perform statistical comparisons, generate publication figures
4. **Optional:** Use Python to pre-process images (background subtraction, registration) before feeding them to CellProfiler

### Python and MATLAB

If your lab has existing MATLAB code, Python can interoperate.

#### Calling MATLAB from Python

```python
# pip install matlabengine  (requires MATLAB installation)
import matlab.engine

eng = matlab.engine.start_matlab()

# Call a MATLAB function
result = eng.sqrt(16.0)
print(result)    # 4.0

# Run a MATLAB script
eng.run("my_analysis_script", nargout=0)

# Pass data between Python and MATLAB
import numpy as np
data = np.random.rand(100).tolist()    # Convert to list for MATLAB
matlab_result = eng.mean(matlab.double(data))

eng.quit()
```

#### Sharing data between Python and MATLAB via .mat files

```python
from scipy.io import savemat, loadmat
import numpy as np

# Save data that MATLAB can read
traces = np.random.rand(500, 10)
savemat("traces.mat", {
    "traces": traces,
    "fps": 10.0,
    "cell_names": ["cell_1", "cell_2"],
})

# Load data that MATLAB saved
data = loadmat("matlab_output.mat")
print(data.keys())       # See what variables are in the file
result = data["result"]  # Access a specific variable
```

### Python and napari (interactive image viewer)

napari is a modern, Python-native image viewer that replaces many ImageJ use cases and integrates seamlessly with NumPy.

```python
# pip install napari[all]
import napari
import tifffile
import numpy as np

stack = tifffile.imread("calcium_timelapse.tif")

viewer = napari.Viewer()
viewer.add_image(stack, name="Calcium imaging", colormap="gray")

# Add a mean projection as a separate layer
mean_proj = stack.mean(axis=0)
viewer.add_image(mean_proj, name="Mean projection", colormap="viridis")

# Add points marking cell centres
cell_centres = np.array([[256, 256], [300, 150], [200, 350]])
viewer.add_points(cell_centres, name="Cell centres", size=20, face_color="red")

napari.run()    # Opens the interactive viewer
```

### Using subprocess to call any external tool

The `subprocess` module lets you run any command-line program from Python:

```python
import subprocess

# Run a command and capture its output
result = subprocess.run(
    ["ls", "-la", "data/"],
    capture_output=True,
    text=True,
)
print(result.stdout)

# Run a MATLAB script
subprocess.run(["matlab", "-batch", "run('my_script.m')"], check=True)

# Run an R script
subprocess.run(["Rscript", "analysis.R", "input.csv"], check=True)

# Convert a file with an external tool
subprocess.run(["ffmpeg", "-i", "movie.avi", "movie.mp4"], check=True)
```

---

## 31. Using AI Assistants for Python Help

AI assistants like Claude can help you learn Python faster, debug errors, and write analysis code. Think of them as a patient tutor who never gets tired of your questions.

### Asking for help with errors

Provide:
1. The **full error message** (copy and paste the entire traceback)
2. The **relevant code** (the section that is failing)
3. What you **expected** versus what **happened**
4. What you have **already tried**

**Good example:**
> "I am getting this error:
> ```
> IndexError: index 512 is out of bounds for axis 0 with size 500
> ```
> Here is my code:
> ```python
> stack = tifffile.imread('data.tif')
> print(stack.shape)  # Output: (500, 512, 512)
> frame = stack[512]  # This line causes the error
> ```
> I think I'm confusing the frame index with the image dimensions. How do I fix this?"

### Asking for new code

Always describe your data --- shape, dtype, and what it represents:
> "I have a NumPy array called `stack` with shape `(500, 512, 512)` and dtype `uint16`. It is a calcium imaging time-lapse of HEK293T cells expressing PIEZO1-GFP. Write me a function that extracts a circular ROI of radius 20 centred at (256, 256) and returns the mean trace over time."

### Asking for explanations

> "I am learning Python. Can you explain what this line does step by step:
> ```python
> dff = (stack - baseline) / baseline
> ```
> Why divide by baseline? What shape will `dff` be?"

### Asking for debugging help

> "My fluorescence trace goes negative after background subtraction. I expected values between 0 and 1000. Here is my code: [paste]. What could cause negative values?"

---

## 32. Resources for Learning Python

Learning to program is a continuous process. The sections above give you a solid foundation; the resources below will help you go further. They are organised roughly by level --- start at the top and work down as your confidence grows.

### Interactive tutorials (best for absolute beginners)

| Resource | Description | Cost |
|---|---|---|
| **Python.org Official Tutorial** (docs.python.org/3/tutorial/) | The official tutorial from the Python developers themselves. Thorough, authoritative, and always up to date. | Free |
| **Codecademy: Learn Python 3** (codecademy.com) | Browser-based, interactive lessons. Good for building muscle memory with syntax. | Free tier available |
| **Google's Python Class** (developers.google.com/edu/python) | A concise, practical course with exercises. Designed for people with some programming background. | Free |
| **Real Python** (realpython.com) | Huge library of tutorials from beginner to advanced, many with video. Excellent quality. | Free articles; paid membership for full access |
| **Kaggle Learn: Python** (kaggle.com/learn/python) | Short, focused micro-course with built-in coding exercises. Good for data-focused learners. | Free |

### Books

| Book | Author(s) | Best for |
|---|---|---|
| **Automate the Boring Stuff with Python** | Al Sweigart | Complete beginners. Practical projects (file renaming, spreadsheets, web scraping). Free to read online at automatetheboringstuff.com |
| **Python Crash Course** | Eric Matthes | Beginners who want a structured path. Covers fundamentals then projects. |
| **Python for Data Analysis** | Wes McKinney | Learning pandas, NumPy, and matplotlib in depth. Written by the creator of pandas. |
| **Elegant SciPy** | Nunez-Iglesias, van der Walt, Dashnow | Intermediate scientists. Beautiful examples from biology, image processing, and signal analysis. |
| **Python Data Science Handbook** | Jake VanderPlas | Comprehensive NumPy, pandas, matplotlib, and scikit-learn. Free online at jakevdp.github.io/PythonDataScienceHandbook/ |
| **Fluent Python** | Luciano Ramalho | Advanced. Deep understanding of Python's design and idioms. Read after 6-12 months of experience. |

### Video courses

| Resource | Description | Cost |
|---|---|---|
| **MIT 6.0001** (ocw.mit.edu) | "Introduction to Computer Science and Programming Using Python". A real university course, freely available. | Free |
| **Corey Schafer's Python Tutorials** (YouTube) | Clear, well-paced video tutorials covering basics through advanced topics (OOP, decorators, generators, virtual environments). | Free |
| **Sentdex** (YouTube / pythonprogramming.net) | Practical Python tutorials with a focus on data science, machine learning, and visualisation. | Free |
| **3Blue1Brown** (YouTube) | Not Python-specific, but excellent visual explanations of the linear algebra and calculus behind NumPy operations. | Free |

### Scientific Python specifically

| Resource | Description | Cost |
|---|---|---|
| **Software Carpentry** (software-carpentry.org) | Workshops and self-study materials designed for scientists. Covers Python, the shell, and git. Many biology-specific examples. | Free |
| **Data Carpentry** (datacarpentry.org) | Like Software Carpentry but focused on data management and analysis. Has ecology and genomics specific lessons. | Free |
| **scipy-lectures.org** | A comprehensive tutorial on the scientific Python ecosystem (NumPy, SciPy, matplotlib, scikit-image). Written by core developers. | Free |
| **scikit-image tutorials** (scikit-image.org/docs/stable/auto_examples/) | Gallery of image processing examples with code. Many are directly applicable to microscopy. | Free |
| **napari tutorials** (napari.org/stable/tutorials/) | Learn the modern Python image viewer, useful for interactive microscopy analysis. | Free |
| **Bio-image Analysis Notebooks** (haesleinhuepf.github.io/BioImageAnalysisNotebooks/) | Jupyter notebooks by Robert Haase covering Python-based bio-image analysis. Very relevant for microscopy. | Free |

### Practice and challenges

| Resource | Description |
|---|---|
| **Exercism Python Track** (exercism.org/tracks/python) | Mentored coding exercises with feedback. Great for building fluency. |
| **Project Euler** (projecteuler.net) | Mathematical/computational problems that you solve with code. Good for building algorithmic thinking. |
| **Advent of Code** (adventofcode.com) | Annual December coding challenge. Fun, puzzle-like problems at increasing difficulty. |
| **LeetCode** (leetcode.com) | Coding interview problems. More CS-focused, but the "Easy" problems build good Python skills. |

### Getting help

| Resource | When to use it |
|---|---|
| **Stack Overflow** (stackoverflow.com) | Search for error messages or specific "how do I..." questions. Almost every beginner question has been answered. |
| **Python Discord** (discord.gg/python) | Live chat with other Python users. Good for quick questions. |
| **Scientific Python Discourse** (discuss.scientific-python.org) | Forum for NumPy, SciPy, matplotlib questions. The developers themselves answer. |
| **image.sc Forum** (forum.image.sc) | The primary forum for biological image analysis. Covers ImageJ, FLIKA, CellProfiler, napari, and Python-based tools. |
| **AI assistants (Claude, etc.)** | Paste your error message and code for instant, personalised help. See [Section 31](#31-using-ai-assistants-for-python-help). |

### Recommended learning path for PIEZO1 researchers

1. **Week 1-2:** Work through this manual (Parts I-III). Write small scripts to load and plot your own TIFF stacks.
2. **Week 3-4:** Complete a Software Carpentry Python lesson. Start using your own analysis scripts for real experiments.
3. **Month 2:** Read the NumPy and matplotlib sections of the scipy-lectures.org tutorial. Try the scikit-image gallery examples on your own images.
4. **Month 3:** Read Part IV of this manual (classes, pathlib, argparse). Start organising your code into Level 2-3 projects.
5. **Ongoing:** Read *Automate the Boring Stuff* for general productivity. Dip into *Elegant SciPy* for inspiration. Use Stack Overflow and AI assistants daily.
6. **When ready:** Explore the dedicated FLIKA, ImageJ, CellProfiler, and MATLAB manuals for your specific tool workflows.

---

## 33. Quick Reference

### Essential imports

```python
import numpy as np
import matplotlib.pyplot as plt
import tifffile
import os
```

### Loading and inspecting an image

```python
stack = tifffile.imread('data.tif')
print(stack.shape)          # Check dimensions
print(stack.dtype)          # Check data type
print(stack.min(), stack.max())  # Check value range
```

### Extracting a trace

```python
trace = stack[:, y, x]                              # Single pixel
trace = stack[:, y1:y2, x1:x2].mean(axis=(1, 2))    # ROI mean
```

### Computing dF/F

```python
f0  = trace[:baseline_frames].mean()
dff = (trace - f0) / f0
```

### Displaying an image

```python
plt.imshow(stack[0], cmap='gray')
plt.colorbar()
plt.show()
```

### Plotting a trace

```python
plt.plot(time, trace)
plt.xlabel("Time (s)")
plt.ylabel("dF/F")
plt.savefig("plot.png", dpi=300)
```

### Saving results

```python
tifffile.imwrite("processed.tif", data)
plt.savefig("figure.png", dpi=300)
np.savetxt("trace.csv", trace, delimiter=",")
```

### Common array operations

```python
np.mean(data)             # Average
np.std(data)              # Standard deviation
np.max(data)              # Maximum
np.min(data)              # Minimum
np.mean(stack, axis=0)    # Mean projection (across frames)
data.shape                # Dimensions
data.dtype                # Data type
```

### Type checking

```python
type(x)                   # Get the type
isinstance(x, int)        # Check if x is an int
```

### Useful built-in functions

```python
len(seq)         # Length of a sequence
max(seq)         # Maximum value
min(seq)         # Minimum value
sum(seq)         # Sum
sorted(seq)      # Return a sorted copy
enumerate(seq)   # (index, value) pairs
zip(a, b)        # Pair elements from two sequences
range(n)         # 0, 1, 2, ..., n-1
abs(x)           # Absolute value
round(x, n)      # Round to n decimal places
help(function)   # Show documentation
dir(object)      # List all attributes and methods
```

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using Python for microscopy image analysis. For questions or suggestions, contact george.dickinson@gmail.com.*
