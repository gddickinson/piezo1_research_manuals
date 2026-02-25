# MATLAB Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: MATLAB Fundamentals**

1. [Introduction: What is MATLAB?](#1-introduction-what-is-matlab)
2. [Licensing, Installation, and the MATLAB Desktop](#2-licensing-installation-and-the-matlab-desktop)
3. [Variables and Data Types](#3-variables-and-data-types)
4. [Operators and Expressions](#4-operators-and-expressions)
5. [Strings and Text](#5-strings-and-text)
6. [Arrays and Matrices: The Heart of MATLAB](#6-arrays-and-matrices-the-heart-of-matlab)
7. [Indexing, Slicing, and Logical Indexing](#7-indexing-slicing-and-logical-indexing)
8. [Cell Arrays, Structures, and Tables](#8-cell-arrays-structures-and-tables)
9. [Control Flow: if, switch, for, while](#9-control-flow-if-switch-for-while)
10. [Functions and Scripts](#10-functions-and-scripts)

**Part II: Working with Data**

11. [Plotting and Visualisation](#11-plotting-and-visualisation)
12. [File Input/Output](#12-file-inputoutput)
13. [Reading and Writing Image Stacks](#13-reading-and-writing-image-stacks)
14. [Reading Microscopy Formats with Bio-Formats](#14-reading-microscopy-formats-with-bio-formats)
15. [Tables, Spreadsheets, and CSV Files](#15-tables-spreadsheets-and-csv-files)

**Part III: Scientific Computing**

16. [Matrix Operations and Linear Algebra](#16-matrix-operations-and-linear-algebra)
17. [Statistics and Hypothesis Testing](#17-statistics-and-hypothesis-testing)
18. [Curve Fitting and Regression](#18-curve-fitting-and-regression)
19. [Signal Processing and Filtering](#19-signal-processing-and-filtering)
20. [The Image Processing Toolbox](#20-the-image-processing-toolbox)

**Part IV: Programming Practices**

21. [Debugging and the MATLAB Debugger](#21-debugging-and-the-matlab-debugger)
22. [Writing Robust Code: Error Handling and Validation](#22-writing-robust-code-error-handling-and-validation)
23. [Performance: Vectorisation, Preallocation, and Profiling](#23-performance-vectorisation-preallocation-and-profiling)
24. [Organising Code: Projects, Paths, and Packages](#24-organising-code-projects-paths-and-packages)

**Part V: Practical Workflows**

25. [Workflow: Calcium Imaging Trace Extraction](#25-workflow-calcium-imaging-trace-extraction)
26. [Workflow: Batch Processing TIRF Image Stacks](#26-workflow-batch-processing-tirf-image-stacks)
27. [Workflow: Puncta Detection and Counting](#27-workflow-puncta-detection-and-counting)
28. [Workflow: Fluorescence Intensity Quantification](#28-workflow-fluorescence-intensity-quantification)

**Part VI: MATLAB and the Wider Ecosystem**

29. [Key Toolboxes for Biology Research](#29-key-toolboxes-for-biology-research)
30. [MATLAB vs. Python: When to Use Which](#30-matlab-vs-python-when-to-use-which)
31. [Calling Python from MATLAB (and Vice Versa)](#31-calling-python-from-matlab-and-vice-versa)

**Appendices**

32. [Keyboard Shortcuts Quick Reference](#32-keyboard-shortcuts-quick-reference)
33. [Common Errors and Troubleshooting](#33-common-errors-and-troubleshooting)
34. [Quick Reference: Essential Functions](#34-quick-reference-essential-functions)

---

## 1. Introduction: What is MATLAB?

### Overview

MATLAB (MATrix LABoratory) is a proprietary programming language and numerical computing environment developed by **MathWorks**, founded by Jack Little and Cleve Moler in 1984. The original MATLAB was written by Moler in the late 1970s as a Fortran wrapper around the LINPACK and EISPACK linear algebra libraries, designed to give his students at the University of New Mexico easy access to matrix computation without learning Fortran. When Little saw the software in 1983, he recognised its commercial potential, rewrote it in C, and co-founded MathWorks to sell it.

MATLAB remains the dominant numerical computing platform in engineering and the physical sciences, and is widely used in biology for image analysis, signal processing, curve fitting, and statistical modelling. Its core strength is the **matrix** — every variable in MATLAB is a matrix (or a generalised N-dimensional array), and the language is optimised for operations on matrices and vectors. This makes it exceptionally natural for image processing, where images are 2D or 3D numerical arrays.

### Key features

| Feature | What it means for you |
|---|---|
| **Matrix-centric language** | Images are matrices; every operation on pixels is a matrix operation |
| **Interactive environment** | Command Window, Variable Browser, and integrated plotting for exploratory analysis |
| **Toolboxes** | Add-on packages for image processing, signal processing, statistics, curve fitting, and more |
| **Integrated debugger** | Set breakpoints, step through code, inspect variables — all in the IDE |
| **Publication-quality plots** | Fine-grained control over figures with consistent, professional formatting |
| **Extensive documentation** | Every function has a detailed help page accessible with `doc` or `help` |
| **Cross-platform** | Runs on Windows, macOS, and Linux |

### Limitations to be aware of

| Limitation | Detail |
|---|---|
| **Cost** | MATLAB requires a paid licence. Standard individual: ~$940/year. Each toolbox is an additional purchase. Academic pricing is lower. |
| **Closed source** | Unlike Python, MATLAB source code is proprietary. You cannot inspect or modify the language internals. |
| **1-indexed** | Arrays start at index 1 (not 0 as in Python, C, and Java). This is a frequent source of bugs when translating code. |
| **Toolbox dependency** | Many useful functions require purchased toolboxes. Code that uses toolbox functions will not run for colleagues without those toolboxes. |
| **Community packages** | The MATLAB File Exchange has fewer packages than Python's PyPI ecosystem |

### When to cite MATLAB

When using MATLAB in published research, cite it as:

> MATLAB version [version number]. Natick, Massachusetts: The MathWorks Inc.; [year]. https://www.mathworks.com

For specific toolboxes, cite the toolbox separately (e.g., "Image Processing Toolbox version X.Y").

### Resources

| Resource | URL |
|---|---|
| MathWorks documentation | https://www.mathworks.com/help/matlab/ |
| MATLAB Answers (community Q&A) | https://www.mathworks.com/matlabcentral/answers/ |
| File Exchange (community scripts) | https://www.mathworks.com/matlabcentral/fileexchange/ |
| Image Processing Toolbox docs | https://www.mathworks.com/help/images/ |
| MATLAB tutorials (official) | https://www.mathworks.com/learn/tutorials/matlab-onramp.html |
| MATLAB vs. Python comparison | https://www.mathworks.com/products/matlab/matlab-vs-python.html |

---

## 2. Licensing, Installation, and the MATLAB Desktop

### Licence types and pricing

MATLAB uses a tiered licensing model. As of 2025:

| Licence type | Approximate cost | Notes |
|---|---|---|
| **Standard Individual** | ~$940/year (subscription) or ~$2,150 (perpetual) | Commercial/organisational use. Each toolbox additional (~$500–1,000/year). |
| **Academic** | Varies by institution | Many universities have campus-wide licences — **check with your IT department first**. UC Irvine provides MATLAB access for all students and researchers. |
| **Student** | ~$49 (MATLAB only) or ~$99 (Student Suite with Simulink + 10 toolboxes) | Must be enrolled at a degree-granting institution. Cannot be used for funded research or commercial work. |
| **Home** | ~$149 (perpetual) | Personal, non-commercial use only. Each toolbox ~$45. |

**Recommendation:** Check whether your university has a campus-wide licence before purchasing anything. Most major research universities do. At UC Irvine, MATLAB is available for free through the campus licence — install via https://uci.service-now.com/ or contact OIT.

### Installation

1. Go to https://www.mathworks.com and create a MathWorks account using your institutional email
2. Link your account to your university licence (or enter your licence key)
3. Download the installer for your platform (Windows, macOS, or Linux)
4. During installation, select the toolboxes you need. For biology research, the essential toolboxes are:
   - **Image Processing Toolbox** — essential for microscopy
   - **Statistics and Machine Learning Toolbox** — hypothesis testing, distributions, PCA
   - **Curve Fitting Toolbox** — fitting exponentials, Gaussians, custom models
   - **Signal Processing Toolbox** — filtering, FFT, spectral analysis
   - **Optimization Toolbox** — nonlinear fitting and minimisation
5. Launch MATLAB

### The MATLAB desktop

The MATLAB desktop consists of several panels:

**Command Window** — the primary interaction point. Type commands here and press Enter to execute immediately. This is equivalent to a Python REPL or an IPython terminal. The `>>` prompt indicates MATLAB is ready for input.

**Workspace** — displays all variables currently in memory, along with their type, size, and value. Double-click a variable to open it in the **Variable Editor** (a spreadsheet-like view). This is one of MATLAB's most powerful features for data exploration — you can inspect every element of a 3D image stack visually.

**Current Folder** — a file browser showing the current working directory. MATLAB can only "see" files in the current folder and on the MATLAB path.

**Editor** — open `.m` files (scripts and functions) for editing. Supports syntax highlighting, code folding, smart indenting, and integrated run/debug controls. Press **F5** to run the current script, or select a section and press **Ctrl+Enter** to run just that section (called "Run Section").

**Command History** — a log of previously executed commands. Double-click to re-execute.

**Figures** — plots appear in separate figure windows. In recent MATLAB versions (R2025a+), figures can be managed in a tabbed container.

### Setting the path

MATLAB can only call functions that are in the **current folder** or on the **MATLAB path** (a list of directories MATLAB searches). To add folders:

```matlab
% Add a folder to the path for the current session
addpath('/path/to/my/functions');

% Add a folder and all its subfolders
addpath(genpath('/path/to/my/project'));

% Save the path permanently (persists across restarts)
savepath;

% View the current path
path
```

Or use the GUI: Home tab → Set Path → Add Folder.

---

## 3. Variables and Data Types

### Creating variables

In MATLAB, you create a variable by assigning a value with `=`. No type declarations are needed — MATLAB infers the type automatically.

```matlab
% Numbers (double-precision floating point by default)
frame_count = 500;
pixel_size = 0.107;          % in micrometres
temperature = 37.0;

% Strings
filename = "calcium_imaging.tif";    % string (double quotes)
cell_name = 'cell_1';                % character array (single quotes)

% Logical (true/false)
is_control = true;
data_valid = false;

% Display values
disp(frame_count)
fprintf('Pixel size: %.3f µm\n', pixel_size)
```

**Important:** A semicolon `;` at the end of a line **suppresses output**. Without it, MATLAB prints the result to the Command Window. Use semicolons in scripts to keep the output clean; omit them when debugging to see intermediate values.

### Numeric types

| Type | Bytes | Range | Use case |
|---|---|---|---|
| `double` | 8 | ±1.8 × 10³⁰⁸, ~15 digits precision | **Default.** All calculations, plotting, analysis. |
| `single` | 4 | ±3.4 × 10³⁸, ~7 digits precision | Saving memory for large image stacks |
| `uint8` | 1 | 0–255 | 8-bit images |
| `uint16` | 2 | 0–65535 | 16-bit microscopy images (most TIRF cameras) |
| `int16` | 2 | −32768–32767 | Signed 16-bit data |
| `uint32` | 4 | 0–4.29 × 10⁹ | Large counters |
| `int32` | 4 | ±2.15 × 10⁹ | Signed 32-bit data |
| `logical` | 1 | 0 or 1 | Boolean masks |

```matlab
% Type conversion
x = uint16(1500);          % convert to 16-bit unsigned integer
y = double(x);             % convert back to double
z = single(3.14);          % single precision

% Check the type
class(x)                   % 'uint16'
whos x                     % detailed info: name, size, bytes, class
```

**Critical for image processing:** MATLAB's Image Processing Toolbox functions often require `uint8` or `uint16` input but return `double` output. Arithmetic on integer types saturates (clips) rather than overflowing: `uint8(250) + uint8(10)` gives `255`, not `260`. Always convert to `double` before doing maths on images.

### Special values

| Value | Meaning |
|---|---|
| `pi` | π (3.14159...) |
| `Inf` | Positive infinity |
| `-Inf` | Negative infinity |
| `NaN` | Not-a-Number (result of 0/0, missing data) |
| `eps` | Machine epsilon (~2.2 × 10⁻¹⁶ for double) |
| `i` or `j` | Imaginary unit (√−1) — avoid using as loop variables |
| `true` / `false` | Logical constants |
| `[]` | Empty array |

```matlab
% NaN is contagious — any operation involving NaN returns NaN
x = [1 2 NaN 4 5];
mean(x)              % NaN
nanmean(x)           % 3.0 — ignores NaN values
% In modern MATLAB: mean(x, 'omitnan') also works
```

---

## 4. Operators and Expressions

### Arithmetic operators

| Operator | Operation | Example | Result |
|---|---|---|---|
| `+` | Addition | `3 + 4` | `7` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Matrix multiplication | `A * B` | Matrix product |
| `.*` | Element-wise multiplication | `A .* B` | Element-wise |
| `/` | Matrix right division | `A / B` | A × B⁻¹ |
| `./` | Element-wise division | `A ./ B` | Element-wise |
| `\` | Matrix left division (solve Ax = B) | `A \ B` | x = A⁻¹B |
| `^` | Matrix power | `A^2` | A × A |
| `.^` | Element-wise power | `A.^2` | Square each element |
| `'` | Complex conjugate transpose | `A'` | Transpose |
| `.'` | Transpose (no conjugate) | `A.'` | Transpose |

**The dot (`.`) prefix** is critical in MATLAB. `*`, `/`, `\`, and `^` perform **matrix** operations by default. To operate **element-wise** (pixel-by-pixel for images), add a dot: `.*`, `./`, `.^`. This is one of the most common sources of bugs for beginners.

```matlab
A = [1 2; 3 4];
B = [5 6; 7 8];

A * B       % Matrix multiplication: [19 22; 43 50]
A .* B      % Element-wise: [5 12; 21 32]

% For images: always use element-wise operators
img_ratio = channel1 ./ channel2;    % Ratiometric imaging
img_squared = img .^ 2;              % Square each pixel
```

### Comparison operators

| Operator | Meaning | Example |
|---|---|---|
| `==` | Equal to | `x == 5` |
| `~=` | Not equal to | `x ~= 0` |
| `<` | Less than | `x < 10` |
| `>` | Greater than | `x > 0` |
| `<=` | Less than or equal | `x <= 100` |
| `>=` | Greater than or equal | `x >= threshold` |

These return **logical arrays** when applied to arrays — essential for image masking:

```matlab
img = imread('cells.tif');
mask = img > 1000;          % logical mask: true where intensity > 1000
```

### Logical operators

| Operator | Meaning | Short-circuits? |
|---|---|---|
| `&` | Element-wise AND | No |
| `\|` | Element-wise OR | No |
| `~` | NOT | — |
| `&&` | Scalar AND | Yes |
| `\|\|` | Scalar OR | Yes |

Use `&&` and `||` in `if` statements (they short-circuit for efficiency). Use `&` and `|` for arrays and masks:

```matlab
% Combining masks for image analysis
bright = img > 1000;
small = bwareaopen(~bright, 50);     % remove small objects
mask = bright & ~small;               % bright AND not too small
```

---

## 5. Strings and Text

MATLAB has two string types, which is a common source of confusion:

### Character arrays vs. strings

| Type | Syntax | Example | Concatenation |
|---|---|---|---|
| **Character array** (`char`) | Single quotes `' '` | `'hello'` | `['hello' ' world']` |
| **String** (`string`) | Double quotes `" "` | `"hello"` | `"hello" + " world"` |

Character arrays are the legacy type and are still used throughout MATLAB's codebase. Strings (introduced in R2016b) are more convenient for text manipulation. Many built-in functions accept both.

```matlab
% Character arrays (legacy)
name = 'PIEZO1';
full = ['Channel: ' name];          % concatenation with []
n = length(name);                    % 6

% Strings (modern, recommended)
name = "PIEZO1";
full = "Channel: " + name;          % concatenation with +
n = strlength(name);                 % 6

% Converting between types
s = string('char array');            % char → string
c = char("a string");               % string → char
```

### Formatting text

```matlab
% sprintf returns a formatted string (does not print)
label = sprintf('Cell %d, Mean = %.2f', 3, 1524.67);
% label = 'Cell 3, Mean = 1524.67'

% fprintf prints to Command Window (or to a file)
fprintf('Processing frame %d of %d\n', 42, 500);

% Common format specifiers
% %d    integer
% %f    floating point (%.2f = 2 decimal places)
% %e    scientific notation (%.3e = 3 decimal places)
% %s    string
% %g    compact notation (chooses %f or %e)
% \n    newline
% \t    tab
```

### Useful string functions

```matlab
% Searching and replacing
contains("calcium_imaging.tif", ".tif")      % true
startsWith("cell_01.tif", "cell")            % true
replace("old_name.tif", "old", "new")        % "new_name.tif"
strsplit("a,b,c,d", ",")                     % {"a","b","c","d"}

% Building file paths
fullfile('data', 'raw', 'image_001.tif')     % 'data/raw/image_001.tif'
% fullfile handles the correct separator for your OS

% Extracting parts of a filename
[folder, name, ext] = fileparts('/data/raw/image_001.tif');
% folder = '/data/raw', name = 'image_001', ext = '.tif'

% Number to string
num2str(42)                                  % '42'
num2str(3.14, '%.2f')                        % '3.14'
str2double('42.5')                           % 42.5
```

---

## 6. Arrays and Matrices: The Heart of MATLAB

Everything in MATLAB is an array. A scalar is a 1×1 array. A vector is a 1×N or N×1 array. A matrix is an M×N array. An image is a 2D or 3D array. A time-lapse stack is a 3D or 4D array.

### Creating arrays

```matlab
% Row vector
v = [1, 2, 3, 4, 5];          % or [1 2 3 4 5] (commas optional)

% Column vector
v = [1; 2; 3; 4; 5];

% Matrix (rows separated by semicolons)
A = [1 2 3; 4 5 6; 7 8 9];

% Ranges
x = 1:10;                     % [1 2 3 4 5 6 7 8 9 10]
x = 0:0.1:1;                  % [0 0.1 0.2 ... 1.0]
x = linspace(0, 1, 100);      % 100 evenly spaced points from 0 to 1

% Special arrays
zeros(3, 4)                    % 3×4 matrix of zeros
ones(3, 4)                     % 3×4 matrix of ones
eye(3)                         % 3×3 identity matrix
rand(3, 4)                     % 3×4 matrix of uniform random numbers [0,1)
randn(3, 4)                    % 3×4 matrix of normal random numbers (mean 0, std 1)
NaN(3, 4)                      % 3×4 matrix of NaN
true(3, 4)                     % 3×4 logical array of true
```

### Array properties

```matlab
A = rand(512, 512, 100);      % simulate a 100-frame image stack

size(A)                        % [512 512 100]
size(A, 1)                     % 512 (rows = height)
size(A, 2)                     % 512 (columns = width)
size(A, 3)                     % 100 (frames)
[nRows, nCols, nFrames] = size(A);

numel(A)                       % 26214400 (total number of elements)
ndims(A)                       % 3
length(A)                      % 512 (length of the longest dimension — avoid this, use size instead)
class(A)                       % 'double'
```

### Reshaping and rearranging

```matlab
% Reshape (does not copy data — very fast)
A = 1:12;
B = reshape(A, 3, 4);         % 3×4 matrix filled column-by-column

% Transpose
B'                             % or B.' for non-conjugate transpose

% Squeeze (remove singleton dimensions)
C = rand(1, 512, 512);        % 1×512×512
D = squeeze(C);                % 512×512

% Permute (rearrange dimensions — like numpy.transpose)
stack = rand(100, 512, 512);   % frames × height × width
stack = permute(stack, [2 3 1]);  % height × width × frames

% Concatenation
A = [1 2; 3 4];
B = [5 6; 7 8];
cat(1, A, B)                   % vertical: [A; B] = [1 2; 3 4; 5 6; 7 8]
cat(2, A, B)                   % horizontal: [A, B] = [1 2 5 6; 3 4 7 8]
cat(3, A, B)                   % along 3rd dimension (stack channels)
```

---

## 7. Indexing, Slicing, and Logical Indexing

### Basic indexing (1-based!)

```matlab
v = [10 20 30 40 50];

v(1)            % 10  (first element — MATLAB is 1-indexed)
v(end)          % 50  (last element)
v(end-1)        % 40  (second to last)
v(2:4)          % [20 30 40]  (elements 2 through 4)
v([1 3 5])      % [10 30 50]  (specific indices)
```

### Matrix indexing

```matlab
A = [1 2 3; 4 5 6; 7 8 9];

A(2, 3)         % 6  (row 2, column 3)
A(1, :)         % [1 2 3]  (entire first row)
A(:, 2)         % [2; 5; 8]  (entire second column)
A(1:2, 2:3)     % [2 3; 5 6]  (submatrix)
A(:)            % [1;4;7;2;5;8;3;6;9]  (all elements as column vector — column-major order!)
```

### Image stack indexing

```matlab
% A typical 16-bit TIRF stack: height × width × frames
stack = imread_stack('tirf_movie.tif');   % custom function or tiffreadall
% stack is uint16, size [512 512 500]

% Single frame
frame50 = stack(:, :, 50);

% Region of interest (rows 100:200, columns 150:250, all frames)
roi_stack = stack(100:200, 150:250, :);

% First 100 frames
subset = stack(:, :, 1:100);

% Every 10th frame (temporal downsampling)
downsampled = stack(:, :, 1:10:end);
```

### Logical indexing (masking)

This is one of MATLAB's most powerful features for image analysis:

```matlab
% Create a mask from a condition
img = double(imread('cells.tif'));
mask = img > 1000;            % logical array: true where intensity > 1000

% Apply the mask — extract values
bright_pixels = img(mask);     % 1D vector of all pixels above threshold

% Set masked pixels to a value
img(mask) = 0;                 % zero out bright pixels

% Count pixels in mask
n_bright = sum(mask(:));       % or nnz(mask)

% Combine conditions
mask = (img > 500) & (img < 2000);   % band-pass selection

% Use a mask to compute statistics on a region
roi_mask = false(size(img));
roi_mask(100:200, 100:200) = true;
roi_mean = mean(img(roi_mask));
```

### The colon operator and `end` keyword

```matlab
% The colon creates ranges
1:5             % [1 2 3 4 5]
1:2:10          % [1 3 5 7 9]  (start:step:stop)
10:-1:1         % [10 9 8 7 6 5 4 3 2 1]  (counting down)

% 'end' refers to the last index in that dimension
v = [10 20 30 40 50];
v(end)          % 50
v(end-2:end)    % [30 40 50]

A = rand(512, 512);
A(end, end)     % bottom-right pixel
A(1:end/2, :)   % top half of the image
```

---

## 8. Cell Arrays, Structures, and Tables

### Cell arrays

Cell arrays hold elements of **different types and sizes** — unlike regular arrays where everything must be the same type. Access with curly braces `{}`.

```matlab
% Create a cell array
c = {'PIEZO1', 42, [1 2 3], true};

% Access contents (curly braces)
c{1}              % 'PIEZO1'
c{3}              % [1 2 3]

% Access the cell itself (parentheses)
c(1)              % {1×1 cell} — the cell, not its contents

% Cell arrays are essential for storing lists of strings
filenames = {'image_001.tif', 'image_002.tif', 'image_003.tif'};
for i = 1:length(filenames)
    fprintf('Processing: %s\n', filenames{i});
end

% Or use string arrays (modern MATLAB)
filenames = ["image_001.tif", "image_002.tif", "image_003.tif"];
```

### Structures

Structures group related data with named fields — similar to Python dictionaries.

```matlab
% Create a structure
cell_data.name = 'HEK293-PIEZO1-GFP';
cell_data.passage = 15;
cell_data.confluence = 0.80;
cell_data.traces = rand(500, 5);     % 500 frames, 5 ROIs

% Access fields
disp(cell_data.name)
mean_traces = mean(cell_data.traces);

% Structure arrays (array of records)
experiments(1).date = '2025-01-15';
experiments(1).condition = 'Control';
experiments(1).n_cells = 42;
experiments(2).date = '2025-01-16';
experiments(2).condition = 'Yoda1 10uM';
experiments(2).n_cells = 38;

% Loop through structure array
for i = 1:length(experiments)
    fprintf('%s: %s, n=%d\n', experiments(i).date, ...
            experiments(i).condition, experiments(i).n_cells);
end

% Dynamic field names
field = 'confluence';
value = cell_data.(field);     % equivalent to cell_data.confluence
```

### Tables

Tables are MATLAB's equivalent of a spreadsheet or a pandas DataFrame — columns with names, mixed types, and row labels. They are the best way to organise experimental results.

```matlab
% Create a table
Name = {'Cell_1'; 'Cell_2'; 'Cell_3'; 'Cell_4'};
Area = [150.2; 210.5; 180.3; 195.7];
MeanIntensity = [1524; 1830; 1650; 1720];
IsControl = [true; true; false; false];

T = table(Name, Area, MeanIntensity, IsControl);
disp(T);

% Access columns
T.Area                        % [150.2; 210.5; 180.3; 195.7]
T.MeanIntensity(2)            % 1830

% Filter rows
controls = T(T.IsControl, :);

% Add a column
T.CTCF = T.MeanIntensity .* T.Area;

% Summary statistics
summary(T)

% Sort
T = sortrows(T, 'Area', 'descend');

% Read/write CSV
writetable(T, 'results.csv');
T2 = readtable('results.csv');
```

---

## 9. Control Flow: if, switch, for, while

### if / elseif / else

```matlab
mean_intensity = 1500;

if mean_intensity > 2000
    category = 'bright';
elseif mean_intensity > 1000
    category = 'medium';
else
    category = 'dim';
end

fprintf('Classification: %s\n', category);
```

### switch

```matlab
channel = 'GFP';

switch channel
    case 'GFP'
        wavelength = 488;
        color = 'green';
    case 'RFP'
        wavelength = 561;
        color = 'red';
    case 'DAPI'
        wavelength = 405;
        color = 'blue';
    otherwise
        error('Unknown channel: %s', channel);
end
```

### for loops

```matlab
% Basic loop
for i = 1:10
    fprintf('Frame %d\n', i);
end

% Loop over array elements
wavelengths = [405, 488, 561, 640];
for w = wavelengths
    fprintf('Laser: %d nm\n', w);
end

% Loop with index into a cell array
files = dir('*.tif');
for k = 1:length(files)
    fprintf('File: %s\n', files(k).name);
end
```

### while loops

```matlab
% Converge to a threshold
tolerance = 0.001;
x = 10;
while abs(x - sqrt(x)) > tolerance
    x = sqrt(x);
end

% Read frames until a condition is met
frame = 1;
while frame <= nFrames && ~found_event
    img = stack(:, :, frame);
    if max(img(:)) > threshold
        found_event = true;
        event_frame = frame;
    end
    frame = frame + 1;
end
```

### Loop control

```matlab
% break — exit the loop immediately
for i = 1:1000
    if data(i) > threshold
        break;           % stop at first threshold crossing
    end
end

% continue — skip to the next iteration
for i = 1:length(files)
    if ~endsWith(files(i).name, '.tif')
        continue;        % skip non-TIFF files
    end
    process_image(files(i).name);
end
```

**Performance note:** MATLAB for-loops are slower than vectorised operations. When possible, replace loops with array operations (see Section 23).

---

## 10. Functions and Scripts

### Scripts vs. functions

| | Script (.m) | Function (.m) |
|---|---|---|
| **Variables** | Share the base workspace — variables persist | Have their own workspace — variables are local |
| **Inputs/outputs** | None (operates on workspace variables) | Defined in the function signature |
| **Reusability** | Low — depends on specific variable names | High — call with any inputs |
| **When to use** | Quick analysis, exploration, one-off tasks | Reusable tools, batch processing, analysis pipelines |

### Writing a function

Each function lives in its own `.m` file. The filename must match the function name.

```matlab
% File: calculate_dff.m
function dff = calculate_dff(trace, baseline_frames)
% CALCULATE_DFF  Compute dF/F from a fluorescence trace.
%
%   dff = calculate_dff(trace, baseline_frames)
%
%   Inputs:
%       trace           - 1D array of fluorescence intensity values
%       baseline_frames - indices of frames to use as baseline (e.g. 1:50)
%
%   Output:
%       dff             - dF/F trace (same length as input)
%
%   Example:
%       raw = load_trace('cell1.csv');
%       dff = calculate_dff(raw, 1:50);
%       plot(dff);

    F0 = mean(trace(baseline_frames));
    dff = (trace - F0) / F0;
end
```

### Functions with multiple outputs

```matlab
% File: measure_roi.m
function [mean_val, std_val, area] = measure_roi(img, mask)
% MEASURE_ROI  Measure intensity statistics within a binary mask.

    pixels = img(mask);
    mean_val = mean(pixels);
    std_val = std(pixels);
    area = sum(mask(:));
end

% Calling with multiple outputs
[m, s, a] = measure_roi(my_image, my_mask);

% Ignore unwanted outputs with ~
[m, ~, a] = measure_roi(my_image, my_mask);
```

### Local functions

Multiple functions can live in the same file. The first function is the "main" function (matches the filename); all subsequent functions are **local** and only visible within that file.

```matlab
% File: analyse_traces.m
function results = analyse_traces(traces, baseline)
    nTraces = size(traces, 2);
    results = zeros(nTraces, 3);  % [peak, time_to_peak, area]
    
    for i = 1:nTraces
        dff = compute_dff(traces(:, i), baseline);
        results(i, :) = extract_features(dff);
    end
end

function dff = compute_dff(trace, baseline)
    F0 = mean(trace(baseline));
    dff = (trace - F0) / F0;
end

function features = extract_features(dff)
    [peak, idx] = max(dff);
    features = [peak, idx, trapz(dff)];
end
```

### Anonymous functions (lambdas)

```matlab
% Quick one-liner functions
square = @(x) x.^2;
square(5)                      % 25
square([1 2 3])                % [1 4 9]

% Useful for curve fitting
gaussian = @(p, x) p(1) * exp(-(x - p(2)).^2 / (2 * p(3)^2));

% Useful for arrayfun
filenames = ["a.tif", "b.tif", "c.tif"];
basenames = arrayfun(@(f) extractBefore(f, "."), filenames);
```

### Default arguments and input validation

```matlab
function result = process_image(img, options)
% PROCESS_IMAGE  Process a fluorescence image.
%
%   result = process_image(img)
%   result = process_image(img, Name=Value)

    arguments
        img (:,:) {mustBeNumeric}
        options.Sigma (1,1) double = 1.5
        options.Method string = "gaussian"
        options.Threshold double = NaN
    end
    
    % Now use options.Sigma, options.Method, etc.
    if options.Method == "gaussian"
        result = imgaussfilt(img, options.Sigma);
    elseif options.Method == "median"
        result = medfilt2(img, [3 3]);
    end
end

% Call with name-value pairs
result = process_image(my_img, Sigma=2.0, Method="gaussian");
```

The `arguments` block (introduced in R2019b) provides built-in input validation and default values — it is the recommended modern approach.

---

## 11. Plotting and Visualisation

### Basic 2D plots

```matlab
% Line plot
t = 0:0.01:10;                   % time vector (seconds)
signal = sin(2*pi*0.5*t);        % 0.5 Hz sine wave

figure;
plot(t, signal);
xlabel('Time (s)');
ylabel('Amplitude');
title('Fluorescence Signal');
grid on;

% Multiple lines
figure;
plot(t, signal, 'b-', 'LineWidth', 1.5);      % blue solid line
hold on;
plot(t, signal + 0.2*randn(size(t)), 'r.', 'MarkerSize', 2);  % red dots
hold off;
legend('Clean', 'Noisy');
```

### Plot formatting

```matlab
% Figure size and appearance
fig = figure('Position', [100 100 600 400]);  % [x y width height] in pixels

% Axis control
xlim([0 5]);                       % X-axis range
ylim([-1.5 1.5]);                  % Y-axis range
axis tight;                        % fit axes to data
axis equal;                        % equal scaling (important for images!)

% Font and labels
set(gca, 'FontSize', 12, 'FontName', 'Arial');
xlabel('Time (s)', 'FontSize', 14);
ylabel('dF/F', 'FontSize', 14);

% Saving figures
saveas(fig, 'my_figure.png');                      % PNG
saveas(fig, 'my_figure.svg');                      % SVG (vector)
exportgraphics(fig, 'my_figure.pdf', 'ContentType', 'vector');  % high-quality PDF
print(fig, '-dpng', '-r300', 'my_figure_300dpi');  % 300 DPI PNG
```

### Displaying images

```matlab
% Display an image
img = imread('cells.tif');
figure;
imshow(img, []);               % [] = auto-scale display range
title('TIRF Image');
colorbar;                      % show intensity scale
colormap(gray);                % grayscale LUT

% imagesc for more control (auto-scales, adds axes)
figure;
imagesc(img);
axis image;                    % correct aspect ratio
colormap(hot);                 % pseudocolor
colorbar;

% Overlay a mask on an image
figure;
imshow(img, []);
hold on;
% Create a semi-transparent red overlay for the mask
red_overlay = cat(3, ones(size(mask)), zeros(size(mask)), zeros(size(mask)));
h = imshow(red_overlay);
set(h, 'AlphaData', 0.3 * double(mask));
hold off;
```

### Subplots and tiled layouts

```matlab
% Classic subplots
figure;
subplot(2, 2, 1); imshow(channel1, []); title('GFP');
subplot(2, 2, 2); imshow(channel2, []); title('RFP');
subplot(2, 2, 3); plot(trace1); title('GFP Trace');
subplot(2, 2, 4); plot(trace2); title('RFP Trace');

% Modern tiled layout (R2019b+) — better spacing control
figure;
tiledlayout(2, 2, 'TileSpacing', 'compact', 'Padding', 'compact');
nexttile; imshow(channel1, []); title('GFP');
nexttile; imshow(channel2, []); title('RFP');
nexttile; plot(trace1); title('GFP Trace');
nexttile; plot(trace2); title('RFP Trace');
```

### Other common plot types

```matlab
% Scatter plot
figure;
scatter(areas, intensities, 20, 'filled');
xlabel('Area (µm²)'); ylabel('Mean Intensity');

% Histogram
figure;
histogram(pixel_values, 100);
xlabel('Intensity'); ylabel('Count');

% Bar plot with error bars
means = [100 150 120 180];
sems = [10 15 12 18];
figure;
bar(means);
hold on;
errorbar(1:4, means, sems, 'k.', 'LineWidth', 1.5);
set(gca, 'XTickLabel', {'Ctrl', 'Drug A', 'Drug B', 'Drug C'});
ylabel('Mean Intensity (AU)');

% Box plot (requires Statistics Toolbox)
figure;
boxplot(data, group_labels);

% Heatmap
figure;
heatmap(correlation_matrix);
```

---

## 12. File Input/Output

### MAT files (MATLAB's native format)

```matlab
% Save variables to a .mat file
traces = rand(500, 10);
metadata.pixel_size = 0.107;
metadata.framerate = 50;
save('experiment_results.mat', 'traces', 'metadata');

% Save everything in the workspace
save('workspace_backup.mat');

% Load
load('experiment_results.mat');            % loads all variables
load('experiment_results.mat', 'traces');  % load specific variable

% Check contents without loading
whos('-file', 'experiment_results.mat');
```

### Text and CSV files

```matlab
% Read a CSV into a table (recommended)
T = readtable('measurements.csv');

% Read a CSV into a numeric matrix (if all numeric)
data = readmatrix('data.csv');

% Write a table to CSV
writetable(T, 'output.csv');

% Write a matrix to CSV
writematrix(data, 'output.csv');

% Low-level text file I/O
fid = fopen('log.txt', 'w');
fprintf(fid, 'Frame\tMean\tStd\n');
for i = 1:nFrames
    fprintf(fid, '%d\t%.4f\t%.4f\n', i, means(i), stds(i));
end
fclose(fid);
```

### The `dir` function for file listing

```matlab
% List all TIFF files in a directory
files = dir(fullfile('data', '*.tif'));

% files is a structure array with fields: name, folder, date, bytes, isdir
for k = 1:length(files)
    filepath = fullfile(files(k).folder, files(k).name);
    fprintf('Processing: %s\n', files(k).name);
    img = imread(filepath);
end
```

---

## 13. Reading and Writing Image Stacks

### Reading single images

```matlab
% Read a single image
img = imread('cell_image.tif');
info = imfinfo('cell_image.tif');    % metadata: width, height, bit depth, etc.

disp(info.Width);
disp(info.Height);
disp(info.BitDepth);
```

### Reading multi-frame TIFF stacks

MATLAB's built-in `imread` reads one frame at a time from multi-frame TIFFs. For efficiency with large stacks, use the `Tiff` class or `tiffreadVolume` (Image Processing Toolbox, R2022a+):

```matlab
% Method 1: imread in a loop (works always, slower for large stacks)
info = imfinfo('tirf_movie.tif');
nFrames = length(info);
height = info(1).Height;
width = info(1).Width;

stack = zeros(height, width, nFrames, 'uint16');
for i = 1:nFrames
    stack(:, :, i) = imread('tirf_movie.tif', i);
end

% Method 2: tiffreadVolume (R2022a+, much faster)
stack = tiffreadVolume('tirf_movie.tif');

% Method 3: Tiff class (fine-grained control)
t = Tiff('tirf_movie.tif', 'r');
frame1 = t.read();
t.nextDirectory();
frame2 = t.read();
t.close();
```

### Practical example: loading a PIEZO1-HaloTag TIRF time-lapse

In Bertaccini et al. 2025 (*Nature Communications*, "Visualizing PIEZO1 localization and activity in hiPSC-derived single cells and organoids with HaloTag technology"), PIEZO1-HaloTag puncta were imaged by TIRF microscopy in hiPSC-derived endothelial cells, keratinocytes, and neural stem cells at 37 degrees C. TIRF movies were acquired with a 60x oil objective at a pixel size of 0.108-0.109 um. A typical analysis begins by loading the full time-lapse stack and converting to physical units:

```matlab
% Load a PIEZO1-HaloTag TIRF movie acquired as a multi-frame TIFF
info = imfinfo('PIEZO1_HaloTag_EC_tirf.tif');
nFrames = length(info);
height = info(1).Height;
width = info(1).Width;

% Preallocate (uint16 from sCMOS/EMCCD camera)
stack = zeros(height, width, nFrames, 'uint16');
for i = 1:nFrames
    stack(:, :, i) = imread('PIEZO1_HaloTag_EC_tirf.tif', i);
end

% Or, using tiffreadVolume (R2022a+, as used with MATLAB R2022b/R2023a
% in Bertaccini et al. 2025)
stack = tiffreadVolume('PIEZO1_HaloTag_EC_tirf.tif');

% Convert pixel coordinates to physical distances
pixelSize_um = 0.108;   % 0.108-0.109 um for the 60x TIRF objective
% Example: convert a puncta centroid from pixels to micrometres
centroid_px = [256, 310];   % [row, col] in pixels
centroid_um = centroid_px * pixelSize_um;
fprintf('Puncta position: (%.2f, %.2f) um\n', centroid_um(1), centroid_um(2));
```

### Writing multi-frame TIFF stacks

```matlab
% Write a stack frame by frame
outputFile = 'processed_stack.tif';
for i = 1:size(stack, 3)
    if i == 1
        imwrite(stack(:, :, i), outputFile);
    else
        imwrite(stack(:, :, i), outputFile, 'WriteMode', 'append');
    end
end

% For ImageJ-compatible TIFFs, use the Tiff class with appropriate tags
t = Tiff('output.tif', 'w');
for i = 1:nFrames
    t.setTag('ImageWidth', width);
    t.setTag('ImageLength', height);
    t.setTag('BitsPerSample', 16);
    t.setTag('SamplesPerPixel', 1);
    t.setTag('SampleFormat', Tiff.SampleFormat.UInt);
    t.setTag('Photometric', Tiff.Photometric.MinIsBlack);
    t.setTag('PlanarConfiguration', Tiff.PlanarConfiguration.Chunky);
    t.write(uint16(stack(:, :, i)));
    if i < nFrames
        t.writeDirectory();
    end
end
t.close();
```

---

## 14. Reading Microscopy Formats with Bio-Formats

### The problem

Most microscope manufacturers use proprietary file formats (Nikon .nd2, Zeiss .czi, Leica .lif, MetaMorph .stk). MATLAB's built-in `imread` cannot read these. The solution is the **OME Bio-Formats** Java library, which reads over 160 formats and extracts standardised metadata.

### Installing Bio-Formats for MATLAB

1. Download the MATLAB toolbox from https://www.openmicroscopy.org/bio-formats/downloads/
2. Unzip and add the folder to the MATLAB path: `addpath('/path/to/bfmatlab'); savepath;`
3. Verify: `bfCheckJavaPath()` should return without errors

Alternatively, install the **BioformatsImage** toolbox from the MATLAB File Exchange or GitHub (https://github.com/Biofrontiers-ALMC/bioformats-matlab), which provides a cleaner MATLAB-native interface.

### Reading files with Bio-Formats

```matlab
% Using the official bfmatlab functions
data = bfopen('experiment.nd2');

% data is a cell array: data{series}{plane, 1} = image, data{series}{plane, 2} = label
% For a simple single-series file:
nPlanes = size(data{1}, 1);
firstFrame = data{1}{1, 1};    % first image (uint16 typically)
label = data{1}{1, 2};         % string describing the plane

% Extract all frames into a 3D stack
stack = zeros(size(firstFrame, 1), size(firstFrame, 2), nPlanes, class(firstFrame));
for i = 1:nPlanes
    stack(:, :, i) = data{1}{i, 1};
end

% Access metadata
metadata = data{1, 2};       % hashtable of key-value metadata pairs
omeMeta = data{1, 4};        % OME metadata object (Java)

% Get pixel size from OME metadata
pixelSizeX = double(omeMeta.getPixelsPhysicalSizeX(0).value());  % in µm
```

### Practical example: reading PIEZO1-HaloTag TIRF .nd2 files

Nikon Elements saves TIRF acquisitions as .nd2 files. In Bertaccini et al. 2025, PIEZO1-HaloTag puncta in hiPSC-derived cells were imaged on a Nikon TIRF system, producing .nd2 files that contain multi-frame time-lapse data and embedded metadata (pixel size, exposure time, laser settings). Bio-Formats is the standard way to read these in MATLAB:

```matlab
% Read a Nikon .nd2 TIRF movie of PIEZO1-HaloTag puncta
data = bfopen('PIEZO1_HaloTag_EC_tirf.nd2');

% Extract the time-lapse as a 3D stack
nFrames = size(data{1}, 1);
firstFrame = data{1}{1, 1};
stack = zeros(size(firstFrame, 1), size(firstFrame, 2), nFrames, class(firstFrame));
for i = 1:nFrames
    stack(:, :, i) = data{1}{i, 1};
end

% Retrieve the pixel size from OME metadata
% (Bertaccini et al. report 0.108-0.109 um for the 60x TIRF objective)
omeMeta = data{1, 4};
pixelSizeX = double(omeMeta.getPixelsPhysicalSizeX(0).value());
fprintf('Pixel size: %.4f um\n', pixelSizeX);

% Check frame interval for tracking analysis
deltaT = double(omeMeta.getPixelsTimeIncrement(0).value());
fprintf('Frame interval: %.3f s\n', deltaT);
```

**Tip:** When processing many .nd2 files in batch (common in studies comparing PIEZO1 localisation across cell types), wrap `bfopen` in a loop and store per-file metadata in a table. Bio-Formats also reads plain multi-frame .tif stacks, so the same workflow applies to exported TIFFs.

### Using the BioformatsImage toolbox

```matlab
% More user-friendly interface
reader = BioformatsImage('experiment.nd2');

% Get image dimensions
reader.width
reader.height
reader.sizeZ       % number of Z slices
reader.sizeC       % number of channels
reader.sizeT       % number of time points

% Get a specific plane
img = reader.getPlane(1, 'GFP', 5);    % Z=1, channel='GFP', T=5

% Get pixel size
reader.pxSize       % physical pixel size in µm
```

---

## 15. Tables, Spreadsheets, and CSV Files

### Reading data

```matlab
% Read CSV into a table
T = readtable('measurements.csv');

% Read Excel
T = readtable('data.xlsx', 'Sheet', 'Results');

% Read with options for complex files
opts = detectImportOptions('data.csv');
opts.VariableTypes{3} = 'string';    % force column 3 to string
T = readtable('data.csv', opts);

% Read specific columns
T = readtable('data.csv', 'SelectedVariableNames', {'Area', 'MeanIntensity'});
```

### Working with tables

```matlab
% Column access
areas = T.Area;                    % vector
names = T.CellName;               % string array or cell array

% Row filtering
bright_cells = T(T.MeanIntensity > 1500, :);
controls = T(T.Condition == "Control", :);

% Sorting
T = sortrows(T, 'Area', 'descend');

% Adding columns
T.NormIntensity = T.MeanIntensity / max(T.MeanIntensity);

% Group statistics (like pandas groupby)
G = groupsummary(T, 'Condition', {'mean', 'std'}, 'MeanIntensity');

% Join tables
T_combined = join(T1, T2, 'Keys', 'CellID');
```

### Writing data

```matlab
% Write table to CSV
writetable(T, 'results.csv');

% Write to Excel
writetable(T, 'results.xlsx', 'Sheet', 'Summary');

% Write with specific formatting
writetable(T, 'results.csv', 'Delimiter', '\t');  % tab-delimited
```

---

## 16. Matrix Operations and Linear Algebra

MATLAB's name literally means "matrix laboratory" — matrix operations are its core strength.

```matlab
% Basic linear algebra
A = [1 2; 3 4];
B = [5 6; 7 8];

A * B              % matrix multiplication
A'                 % transpose (conjugate)
inv(A)             % matrix inverse
det(A)             % determinant (-2)
eig(A)             % eigenvalues
[V, D] = eig(A);  % eigenvectors and eigenvalues

% Solving linear systems: Ax = b
A = [2 1; 5 3];
b = [4; 7];
x = A \ b;         % x = inv(A)*b, but numerically more stable

% Singular Value Decomposition (used in PCA)
[U, S, V] = svd(A);

% Principal Component Analysis on a data matrix
% rows = observations, columns = variables
[coeff, score, latent] = pca(data);
```

---

## 17. Statistics and Hypothesis Testing

These functions require the **Statistics and Machine Learning Toolbox** unless noted.

### Descriptive statistics (built-in, no toolbox needed)

```matlab
x = randn(1000, 1);

mean(x)                 % arithmetic mean
median(x)               % median
std(x)                  % standard deviation
var(x)                  % variance
min(x), max(x)          % extremes
prctile(x, [25 50 75])  % percentiles (requires Statistics Toolbox)
quantile(x, [0.25 0.5 0.75])  % same but different function name

% For matrices, these operate along columns by default
data = rand(100, 5);    % 100 observations, 5 variables
col_means = mean(data);          % 1×5 vector of column means
row_means = mean(data, 2);      % 100×1 vector of row means

% Ignore NaN values
mean(x, 'omitnan')
std(x, 0, 'omitnan')
```

### Hypothesis tests (Statistics Toolbox)

```matlab
% Two-sample t-test
control = [150 160 155 170 165 158 162];
treated = [180 175 190 185 178 172 188];
[h, p, ci, stats] = ttest2(control, treated);
fprintf('p = %.4f, t(%d) = %.3f\n', p, stats.df, stats.tstat);

% Paired t-test (before vs. after)
before = [100 110 105 115 108];
after  = [120 125 118 130 122];
[h, p] = ttest(before, after);

% One-way ANOVA
groups = [ones(10,1); 2*ones(10,1); 3*ones(10,1)];
values = [randn(10,1); randn(10,1)+1; randn(10,1)+2];
[p, tbl, stats] = anova1(values, groups);
% Post-hoc: multcompare(stats)

% Non-parametric alternatives
[p, h] = ranksum(control, treated);      % Mann-Whitney U / Wilcoxon rank-sum
[p, h] = signrank(before - after);       % Wilcoxon signed-rank

% Kolmogorov-Smirnov test (compare distributions)
[h, p] = kstest2(sample1, sample2);

% Correlation
[r, p] = corrcoef(x, y);                 % Pearson
[rho, p] = corr(x, y, 'Type', 'Spearman');  % Spearman (requires Stats Toolbox)
```

### Effect size: Cohen's d

Reporting p-values alone is insufficient; journals increasingly require effect size measures. Cohen's d quantifies the standardised difference between two group means. Bertaccini et al. 2025 report Cohen's d alongside Mann-Whitney U tests when comparing PIEZO1-HaloTag puncta properties across cell types and conditions:

```matlab
% Cohen's d for two independent samples
% (MATLAB does not have a built-in function for this)
function d = cohens_d(group1, group2)
    n1 = length(group1);
    n2 = length(group2);
    % Pooled standard deviation
    sp = sqrt(((n1-1)*var(group1) + (n2-1)*var(group2)) / (n1 + n2 - 2));
    d = (mean(group1) - mean(group2)) / sp;
end

% Example: comparing PIEZO1-HaloTag puncta density between ECs and keratinocytes
puncta_per_cell_EC   = [12 15 18 11 14 16 20 13 17 19];
puncta_per_cell_kera = [8 6 10 7 5 9 11 6 8 7];

d = cohens_d(puncta_per_cell_EC, puncta_per_cell_kera);
fprintf('Cohen''s d = %.2f\n', d);
% Interpretation: |d| < 0.2 small, 0.5 medium, 0.8 large
```

### Practical example: Mann-Whitney tests for PIEZO1 puncta comparisons

When comparing PIEZO1-HaloTag puncta intensities or counts across conditions (e.g., control vs. Yoda1-stimulated, or EC vs. NSC), the data are often not normally distributed. Bertaccini et al. 2025 use the Mann-Whitney U test (Wilcoxon rank-sum) as their primary non-parametric comparison, supplemented by two-sample t-tests and Cohen's d effect size:

```matlab
% Puncta mean intensity in two conditions
control_intensity = [1520 1480 1610 1550 1490 1570 1530 1500 1460 1580];
yoda1_intensity   = [1890 1780 1920 1850 1810 1950 1870 1830 1760 1900];

% Mann-Whitney U test (non-parametric, as in Bertaccini et al. 2025)
[p_mw, h_mw] = ranksum(control_intensity, yoda1_intensity);
fprintf('Mann-Whitney: p = %.4e\n', p_mw);

% Two-sample t-test (parametric comparison)
[h_tt, p_tt, ~, stats_tt] = ttest2(control_intensity, yoda1_intensity);
fprintf('Two-sample t-test: p = %.4e, t(%d) = %.3f\n', ...
        p_tt, stats_tt.df, stats_tt.tstat);

% Cohen's d effect size
d = cohens_d(control_intensity, yoda1_intensity);
fprintf('Cohen''s d = %.2f\n', d);

% Note: Bertaccini et al. 2025 also used OriginPro 2020 for statistics and
% final figure generation. Results obtained in MATLAB and OriginPro should
% agree; cross-check when reporting final values.
```

### Kernel density estimation with ksdensity

`ksdensity` estimates a smooth probability density function from sample data. Bertaccini et al. 2025 use `ksdensity` to generate density scatter plots showing the spatial distribution of PIEZO1-HaloTag puncta relative to MNR (midbrain neural rosette) lumen and outer edge distances:

```matlab
% Example: density scatter plot of puncta distances to organoid lumen
% distances_to_lumen and distances_to_edge are vectors of measured distances
% (in um) for each detected PIEZO1-HaloTag punctum

distances_to_lumen = randn(500, 1) * 5 + 15;  % example data (um)
distances_to_edge  = randn(500, 1) * 4 + 10;

% Compute 2D kernel density at each data point
xy = [distances_to_lumen, distances_to_edge];
[~, density_values] = ksdensity(xy, xy);

% Sort by density so dense points are plotted on top
[density_sorted, idx] = sort(density_values);
xy_sorted = xy(idx, :);

figure;
scatter(xy_sorted(:,1), xy_sorted(:,2), 15, density_sorted, 'filled');
colormap(parula);
colorbar;
xlabel('Distance to MNR lumen (\mum)');
ylabel('Distance to MNR outer edge (\mum)');
title('PIEZO1-HaloTag Puncta Density');
```

**Note:** For 2D kernel density estimation, `ksdensity` requires the Statistics and Machine Learning Toolbox. If you need the density evaluated at every (x, y) data point (for colouring a scatter plot), pass the data points as both the first and second arguments.

### Standard error and confidence intervals

```matlab
n = length(data);
sem = std(data) / sqrt(n);                    % standard error of the mean
ci95 = [mean(data) - 1.96*sem, mean(data) + 1.96*sem];  % 95% CI (normal approx.)

% Bootstrap confidence interval (Statistics Toolbox)
ci = bootci(10000, @mean, data);
```

---

## 18. Curve Fitting and Regression

### Using the fit function (Curve Fitting Toolbox)

```matlab
% Fit an exponential decay to a fluorescence trace
t = (1:500)';                      % time points (column vector)
signal = 1000 * exp(-t / 100) + 200 + 20*randn(size(t));

% Fit: y = a*exp(-x/tau) + c
ft = fittype('a*exp(-x/tau) + c');
[fitresult, gof] = fit(t, signal, ft, 'StartPoint', [1000, 100, 200]);

% View results
disp(fitresult);                   % coefficients
fprintf('R-squared: %.4f\n', gof.rsquare);
fprintf('Tau = %.1f frames\n', fitresult.tau);

% Plot
figure;
plot(t, signal, 'k.');
hold on;
plot(fitresult, 'r-');
xlabel('Frame'); ylabel('Intensity');
legend('Data', 'Fit');
```

### Using lsqcurvefit (Optimization Toolbox)

```matlab
% Define the model as a function
model = @(p, x) p(1) * exp(-x / p(2)) + p(3);

% Initial guesses: [amplitude, tau, offset]
p0 = [1000, 100, 200];

% Fit
[p_fit, resnorm] = lsqcurvefit(model, p0, t, signal);
fprintf('Amplitude = %.1f, Tau = %.1f, Offset = %.1f\n', ...
        p_fit(1), p_fit(2), p_fit(3));
```

### Gaussian fitting (for PSF measurement)

```matlab
% Fit a 2D Gaussian to a PSF image
[X, Y] = meshgrid(1:size(psf_img, 2), 1:size(psf_img, 1));
x_data = [X(:), Y(:)];
z_data = double(psf_img(:));

gauss2d = @(p, xy) p(1) * exp(-((xy(:,1)-p(2)).^2 + (xy(:,2)-p(3)).^2) / (2*p(4)^2)) + p(5);
% p = [amplitude, x0, y0, sigma, offset]

p0 = [max(z_data), size(psf_img,2)/2, size(psf_img,1)/2, 2, min(z_data)];
p_fit = lsqcurvefit(gauss2d, p0, x_data, z_data);

fprintf('PSF sigma = %.2f pixels (FWHM = %.2f pixels)\n', ...
        p_fit(4), p_fit(4) * 2.355);
```

### Interactive curve fitting

The **Curve Fitter** app provides a GUI for interactive fitting:

```matlab
cftool(t, signal)    % opens the Curve Fitter app with your data
```

Select a model type, adjust parameters, inspect residuals, and export the fit — all interactively. The app can also generate MATLAB code to reproduce the fit programmatically.

### Linear regression (built-in, no toolbox)

```matlab
% Simple linear fit: y = mx + b using polyfit
[p, S] = polyfit(x, y, 1);    % degree 1 polynomial
slope = p(1);
intercept = p(2);

% Evaluate the fit
y_fit = polyval(p, x);

% Multiple linear regression using \
X = [ones(n,1), predictor1, predictor2];   % design matrix with intercept
b = X \ y;                                  % least-squares solution
```

---

## 19. Signal Processing and Filtering

### Smoothing and filtering fluorescence traces

```matlab
% Moving average (built-in)
smoothed = movmean(trace, 5);           % 5-point moving average

% Savitzky-Golay filter (smooth without distorting peaks)
smoothed = sgolayfilt(trace, 3, 11);    % order 3, frame length 11

% Median filter (good for spike removal)
smoothed = medfilt1(trace, 5);          % 5-point median filter

% Low-pass Butterworth filter (Signal Processing Toolbox)
fs = 50;                                 % sampling rate (Hz)
fc = 5;                                  % cutoff frequency (Hz)
[b, a] = butter(4, fc / (fs/2), 'low');  % 4th order Butterworth
filtered = filtfilt(b, a, trace);        % zero-phase filtering
```

### FFT and spectral analysis

```matlab
% Compute the power spectrum of a fluorescence trace
N = length(trace);
fs = 50;                                  % sampling rate (Hz)
Y = fft(trace);
P2 = abs(Y / N);                         % two-sided spectrum
P1 = P2(1:N/2+1);                        % single-sided spectrum
P1(2:end-1) = 2 * P1(2:end-1);
f = fs * (0:(N/2)) / N;                  % frequency axis

figure;
plot(f, P1);
xlabel('Frequency (Hz)');
ylabel('Amplitude');
title('Power Spectrum');
```

### Filtering 2D images (Image Processing Toolbox)

```matlab
% Gaussian blur
smoothed = imgaussfilt(img, 1.5);        % sigma = 1.5 pixels

% Median filter (removes hot pixels)
cleaned = medfilt2(img, [3 3]);

% Difference of Gaussians (band-pass)
low = imgaussfilt(img, 1);
high = imgaussfilt(img, 5);
dog = low - high;

% Custom filter kernel
h = fspecial('gaussian', [5 5], 1.5);    % 5×5 Gaussian kernel
filtered = imfilter(double(img), h);
```

---

## 20. The Image Processing Toolbox

The Image Processing Toolbox is MATLAB's most important add-on for microscopy research.

### Adjusting contrast and display

```matlab
% Adjust contrast (maps input range to output range)
adjusted = imadjust(img);                        % auto-adjust
adjusted = imadjust(img, [0.1 0.9], [0 1]);      % map [10%-90%] to [0-1]

% Histogram equalisation
equalised = histeq(img);

% Adaptive histogram equalisation (CLAHE)
enhanced = adapthisteq(img, 'ClipLimit', 0.02);
```

### Thresholding and segmentation

```matlab
% Global thresholding
level = graythresh(img);                 % Otsu's method
bw = imbinarize(img, level);

% Adaptive thresholding
bw = imbinarize(img, 'adaptive', 'Sensitivity', 0.5);

% Manual threshold
bw = img > 1000;

% Clean up binary images
bw = imfill(bw, 'holes');               % fill holes
bw = bwareaopen(bw, 50);                % remove objects < 50 pixels
bw = imopen(bw, strel('disk', 3));       % morphological opening
bw = imclose(bw, strel('disk', 3));      % morphological closing
```

### Measuring objects (regionprops)

`regionprops` is MATLAB's equivalent of ImageJ's Analyze Particles — it measures properties of connected components in a binary image:

```matlab
% Label connected components
[L, nObjects] = bwlabel(bw);

% Measure properties
stats = regionprops(L, img, 'Area', 'Centroid', 'MeanIntensity', ...
                    'MaxIntensity', 'BoundingBox', 'Eccentricity', ...
                    'PixelIdxList');

% Access results
for i = 1:nObjects
    fprintf('Object %d: Area=%.1f, Mean=%.1f, Centroid=(%.1f, %.1f)\n', ...
            i, stats(i).Area, stats(i).MeanIntensity, ...
            stats(i).Centroid(1), stats(i).Centroid(2));
end

% Filter objects by property
areas = [stats.Area];
large_objects = stats(areas > 100 & areas < 5000);

% Convert to a table for easy export
T = struct2table(stats);
writetable(T, 'object_measurements.csv');
```

### Background subtraction

```matlab
% Morphological top-hat (removes uneven background)
se = strel('disk', 50);
corrected = imtophat(img, se);

% Gaussian background estimation
bg = imgaussfilt(double(img), 50);
corrected = double(img) - bg;

% Rolling ball equivalent (morphological opening)
se = strel('disk', 50);
bg = imopen(double(img), se);
corrected = double(img) - bg;
```

### Watershed segmentation

```matlab
% Separate touching objects
bw = imbinarize(img, 'adaptive');
bw = imfill(bw, 'holes');
D = -bwdist(~bw);                       % distance transform
D = imhmin(D, 2);                        % suppress shallow minima
L = watershed(D);
bw(L == 0) = false;                      % apply watershed lines
```

---

## 21. Debugging and the MATLAB Debugger

### Setting breakpoints

Click in the grey margin next to a line number in the Editor — a red circle appears. The code will pause at that line during execution. You can then:

- Inspect variables in the Workspace panel or by typing their names in the Command Window
- Step through code line by line with **F10** (Step), **F11** (Step In to functions), or **Shift+F11** (Step Out)
- Continue execution with **F5** (Continue)
- Stop debugging with **Shift+F5** or `dbquit`

### Conditional breakpoints

Right-click a breakpoint → Set/Modify Condition. Enter an expression (e.g., `i == 50`) — the breakpoint will only trigger when the condition is true.

### Keyboard debugging

```matlab
% Insert a breakpoint in your code
function result = my_function(data)
    processed = filter_data(data);
    keyboard;                    % execution pauses here — inspect variables
    result = analyse(processed);
end
% When paused, the prompt changes to K>>. Type 'dbcont' to continue.
```

### Common debugging commands

| Command | Action |
|---|---|
| `dbstop in myfunction` | Set breakpoint at first line of myfunction |
| `dbstop in myfunction at 25` | Set breakpoint at line 25 |
| `dbstop if error` | Break on any error |
| `dbstop if warning` | Break on any warning |
| `dbcont` | Continue execution |
| `dbstep` | Step one line |
| `dbquit` | Exit debug mode |
| `dbstack` | Show call stack |

---

## 22. Writing Robust Code: Error Handling and Validation

### try/catch

```matlab
try
    img = imread(filepath);
    result = process_image(img);
catch ME
    fprintf('Error processing %s: %s\n', filepath, ME.message);
    result = [];
end
```

### Input validation with assert

```matlab
function dff = calculate_dff(trace, baseline_frames)
    assert(isvector(trace), 'trace must be a vector');
    assert(all(baseline_frames > 0 & baseline_frames <= length(trace)), ...
           'baseline_frames out of range');
    
    F0 = mean(trace(baseline_frames));
    assert(F0 > 0, 'Baseline fluorescence must be positive');
    dff = (trace - F0) / F0;
end
```

### Warning and error

```matlab
if isempty(data)
    warning('mypackage:emptyData', 'Data is empty, returning NaN.');
    result = NaN;
    return;
end

if pixel_size <= 0
    error('mypackage:invalidPixelSize', ...
          'Pixel size must be positive. Got %.4f', pixel_size);
end
```

---

## 23. Performance: Vectorisation, Preallocation, and Profiling

### Vectorisation (the #1 rule for fast MATLAB)

Replace loops with array operations wherever possible:

```matlab
% SLOW — explicit loop
result = zeros(1, 1000);
for i = 1:1000
    result(i) = sin(x(i))^2 + cos(x(i))^2;
end

% FAST — vectorised
result = sin(x).^2 + cos(x).^2;

% Image processing example
% SLOW
[h, w, nFrames] = size(stack);
dff = zeros(h, w, nFrames);
baseline = mean(stack(:,:,1:50), 3);
for f = 1:nFrames
    for r = 1:h
        for c = 1:w
            dff(r,c,f) = (stack(r,c,f) - baseline(r,c)) / baseline(r,c);
        end
    end
end

% FAST (entire operation in one line)
baseline = mean(stack(:,:,1:50), 3);
dff = (double(stack) - baseline) ./ baseline;
```

### Preallocation

Always preallocate arrays before filling them in a loop:

```matlab
% SLOW — array grows each iteration (MATLAB copies the entire array each time)
results = [];
for i = 1:10000
    results = [results; compute_something(i)];
end

% FAST — preallocate
results = zeros(10000, 1);
for i = 1:10000
    results(i) = compute_something(i);
end
```

### The MATLAB Profiler

```matlab
profile on;
my_analysis_script;
profile off;
profile viewer;            % opens interactive profiler GUI
```

The profiler shows exactly how much time each line takes — focus optimisation efforts on the slowest lines.

---

## 24. Organising Code: Projects, Paths, and Packages

### Recommended project structure

```
my_experiment/
├── data/
│   ├── raw/               % original microscopy files (read-only)
│   └── processed/         % intermediate results
├── functions/             % reusable MATLAB functions
│   ├── load_tiff_stack.m
│   ├── calculate_dff.m
│   └── detect_puncta.m
├── scripts/               % analysis scripts
│   ├── step1_preprocess.m
│   ├── step2_detect.m
│   └── step3_quantify.m
├── results/               % figures, tables, statistics
│   ├── figures/
│   └── tables/
└── README.md
```

### Adding functions to the path

```matlab
% At the top of each script, add the functions folder
addpath(genpath('functions'));

% Or use a startup.m file in your MATLAB folder
% File: ~/Documents/MATLAB/startup.m
addpath(genpath('~/Projects/piezo1/functions'));
fprintf('PIEZO1 functions loaded.\n');
```

### MATLAB Projects (R2019a+)

MATLAB's Projects feature provides integrated path management, dependency analysis, and version control:

1. Open MATLAB → Home tab → New Project
2. Add your folders
3. The project automatically manages paths and can integrate with Git

---

## 25. Workflow: Calcium Imaging Trace Extraction

```matlab
%% Calcium Imaging Trace Extraction
% Extract dF/F traces from ROIs in a calcium imaging time-lapse.

%% 1. Load the data
stack = tiffreadVolume('calcium_movie.tif');
stack = double(stack);
[height, width, nFrames] = size(stack);
framerate = 50;  % Hz
t = (0:nFrames-1) / framerate;

%% 2. Define ROIs (manually or from a mask)
% Method A: Manual rectangular ROIs
rois = {
    struct('name', 'Cell_1', 'rows', 100:130, 'cols', 150:180);
    struct('name', 'Cell_2', 'rows', 200:240, 'cols', 300:340);
    struct('name', 'Background', 'rows', 10:40, 'cols', 10:40);
};

%% 3. Extract raw traces
nROIs = length(rois);
traces = zeros(nFrames, nROIs);
for i = 1:nROIs
    roi = rois{i};
    for f = 1:nFrames
        region = stack(roi.rows, roi.cols, f);
        traces(f, i) = mean(region(:));
    end
end

%% 4. Background subtraction
bg_trace = traces(:, end);       % last ROI is background
traces_corr = traces(:, 1:end-1) - bg_trace;

%% 5. Calculate dF/F
baseline_frames = 1:round(2 * framerate);  % first 2 seconds
F0 = mean(traces_corr(baseline_frames, :));
dff = (traces_corr - F0) ./ F0;

%% 6. Plot
figure('Position', [100 100 800 400]);
for i = 1:size(dff, 2)
    plot(t, dff(:, i) + (i-1)*0.5, 'LineWidth', 1.2);
    hold on;
end
xlabel('Time (s)');
ylabel('dF/F (offset for clarity)');
legend(cellfun(@(r) r.name, rois(1:end-1), 'UniformOutput', false));
title('Calcium Imaging — dF/F Traces');

%% 7. Save results
T = array2table([t', dff], 'VariableNames', ...
    ['Time_s', cellfun(@(r) r.name, rois(1:end-1), 'UniformOutput', false)]);
writetable(T, 'results/calcium_traces.csv');
saveas(gcf, 'results/figures/calcium_traces.png');
```

---

## 26. Workflow: Batch Processing TIRF Image Stacks

```matlab
%% Batch Process TIRF Stacks
% Apply background subtraction and max projection to all TIFFs in a folder.

inputDir = 'data/raw/';
outputDir = 'data/processed/';
if ~exist(outputDir, 'dir'), mkdir(outputDir); end

files = dir(fullfile(inputDir, '*.tif'));
fprintf('Found %d TIFF files.\n', length(files));

results = table();

for k = 1:length(files)
    fprintf('Processing %d/%d: %s\n', k, length(files), files(k).name);
    
    % Load
    filepath = fullfile(files(k).folder, files(k).name);
    stack = double(tiffreadVolume(filepath));
    
    % Background subtraction (temporal median)
    bg = median(stack, 3);
    corrected = stack - bg;
    
    % Max projection
    maxProj = max(corrected, [], 3);
    
    % Mean projection
    meanProj = mean(corrected, 3);
    
    % Save projections
    [~, name, ~] = fileparts(files(k).name);
    imwrite(uint16(maxProj), fullfile(outputDir, [name '_MAX.tif']));
    imwrite(uint16(meanProj), fullfile(outputDir, [name '_MEAN.tif']));
    
    % Record statistics
    newRow = table(string(files(k).name), mean(maxProj(:)), std(maxProj(:)), ...
                   max(maxProj(:)), size(stack, 3), ...
                   'VariableNames', {'Filename', 'MeanOfMax', 'StdOfMax', ...
                                     'MaxOfMax', 'NumFrames'});
    results = [results; newRow];
end

writetable(results, fullfile(outputDir, 'batch_summary.csv'));
fprintf('Done. Summary saved.\n');
```

---

## 27. Workflow: Puncta Detection and Counting

```matlab
%% Puncta Detection and Counting
% Detect and measure PIEZO1 puncta in a TIRF image.

img = double(imread('piezo1_tirf.tif'));

%% 1. Pre-process
% Background subtraction
bg = imgaussfilt(img, 50);           % smooth background estimate
corrected = img - bg;
corrected(corrected < 0) = 0;

% Noise reduction
smoothed = imgaussfilt(corrected, 1.0);

%% 2. Threshold
% Use an adaptive or global method
level = graythresh(uint16(smoothed));
bw = imbinarize(uint16(smoothed), level);

% Clean up
bw = imfill(bw, 'holes');
bw = bwareaopen(bw, 4);              % remove tiny objects (< 4 pixels)

% Watershed to separate touching puncta
D = -bwdist(~bw);
D = imhmin(D, 1);
L = watershed(D);
bw(L == 0) = false;

%% 3. Measure
stats = regionprops(bw, img, 'Area', 'Centroid', 'MeanIntensity', ...
                    'MaxIntensity', 'Eccentricity', 'EquivDiameter');

% Filter by size and shape
areas = [stats.Area];
ecc = [stats.Eccentricity];
valid = (areas >= 4) & (areas <= 200) & (ecc < 0.9);
puncta = stats(valid);

fprintf('Detected %d puncta (of %d candidates).\n', length(puncta), length(stats));

%% 4. Visualise
figure;
imshow(img, []); hold on;
centroids = vertcat(puncta.Centroid);
plot(centroids(:,1), centroids(:,2), 'ro', 'MarkerSize', 8, 'LineWidth', 1.5);
title(sprintf('PIEZO1 Puncta: n = %d', length(puncta)));

%% 5. Export
T = struct2table(puncta);
writetable(T, 'results/puncta_measurements.csv');
```

---

## 28. Workflow: Fluorescence Intensity Quantification

```matlab
%% Fluorescence Intensity Quantification
% Measure corrected total cell fluorescence (CTCF) for individual cells.

img = double(imread('cells_fluorescence.tif'));

%% 1. Segment cells
% Threshold to find cells
bw = imbinarize(uint16(img), 'adaptive', 'Sensitivity', 0.4);
bw = imfill(bw, 'holes');
bw = bwareaopen(bw, 100);           % remove small objects

%% 2. Measure each cell
stats = regionprops(bw, img, 'Area', 'MeanIntensity', 'PixelIdxList', ...
                    'Centroid', 'PixelValues');

%% 3. Measure background
% Dilate the cell mask and take the ring around cells as background
dilated = imdilate(bw, strel('disk', 20));
bg_mask = dilated & ~bw;
bg_mean = mean(img(bg_mask));

%% 4. Calculate CTCF
nCells = length(stats);
ctcf_values = zeros(nCells, 1);
for i = 1:nCells
    integrated_density = sum(stats(i).PixelValues);
    ctcf_values(i) = integrated_density - stats(i).Area * bg_mean;
end

%% 5. Export results
T = table((1:nCells)', [stats.Area]', [stats.MeanIntensity]', ctcf_values, ...
          'VariableNames', {'CellID', 'Area', 'MeanIntensity', 'CTCF'});
writetable(T, 'results/ctcf_measurements.csv');

fprintf('Measured %d cells. Background mean = %.1f\n', nCells, bg_mean);
fprintf('CTCF: mean = %.1f, std = %.1f\n', mean(ctcf_values), std(ctcf_values));
```

---

## 29. Key Toolboxes for Biology Research

| Toolbox | Key functions | Use case |
|---|---|---|
| **Image Processing** | `imread`, `imshow`, `imgaussfilt`, `imbinarize`, `regionprops`, `bwlabel`, `imtophat`, `watershed` | Microscopy image analysis, segmentation, measurement |
| **Statistics and Machine Learning** | `ttest2`, `anova1`, `fitlm`, `pca`, `kmeans`, `boxplot`, `bootci` | Hypothesis testing, classification, clustering, PCA |
| **Curve Fitting** | `fit`, `fittype`, `cftool` | Fitting exponentials, Gaussians, dose-response curves |
| **Signal Processing** | `butter`, `filtfilt`, `fft`, `spectrogram`, `findpeaks` | Filtering traces, spectral analysis, peak detection |
| **Optimization** | `lsqcurvefit`, `fmincon`, `fminsearch` | Nonlinear fitting, parameter estimation |
| **Parallel Computing** | `parfor`, `parfeval`, `gpuArray` | Speed up batch processing on multi-core CPUs |
| **Deep Learning** | `trainNetwork`, `dlnetwork`, `augmentedImageDatastore` | Cell classification, segmentation with U-Net |
| **Bioinformatics** | `seqread`, `fastaread`, `swalign` | Sequence analysis (less common in imaging labs) |

---

## 30. MATLAB vs. Python: When to Use Which

| Consideration | MATLAB | Python |
|---|---|---|
| **Cost** | Requires paid licence + toolboxes | Free and open source |
| **IDE** | Excellent integrated IDE out of the box | Requires setup (VS Code, Spyder, Jupyter) |
| **Image processing** | Image Processing Toolbox (mature, well-documented) | scikit-image, OpenCV (free, equally capable) |
| **Interactive exploration** | Workspace browser, Variable Editor | Jupyter notebooks, Spyder |
| **Matrix notation** | Native — MATLAB was built for matrices | NumPy provides equivalent functionality |
| **Curve fitting** | Curve Fitter app is excellent for interactive work | scipy.optimize.curve_fit (programmatic only) |
| **Statistics** | Statistics Toolbox (well-integrated) | scipy.stats, statsmodels, pingouin (free) |
| **Deep learning** | Deep Learning Toolbox | PyTorch, TensorFlow (larger community) |
| **Plotting** | Consistent, publication-ready by default | matplotlib (more customisable but requires more setup) |
| **Reproducibility** | Toolbox requirements limit sharing | pip/conda environments ensure reproducibility |
| **Community packages** | File Exchange (~35,000 entries) | PyPI (~500,000+ packages) |
| **Speed** | Fast for matrix operations (MKL-accelerated) | NumPy equally fast (also MKL); Python loops are slower |
| **Integration with FIJI** | Limited (via Java bridge) | PyImageJ, napari, scikit-image |

**Recommendation:** Use MATLAB when your lab already has licences and expertise, when you need the Curve Fitter or interactive tools, or when collaborators share MATLAB code. Use Python when cost is a concern, for deep learning, for integration with open-source tools (FIJI, napari, CellProfiler), or for any project where reproducibility and sharing are priorities. Many labs use both.

---

## 31. Calling Python from MATLAB (and Vice Versa)

### Calling Python from MATLAB

MATLAB can call Python functions directly (since R2014b):

```matlab
% Check Python configuration
pyenv

% Call a Python function
result = py.math.sqrt(144);      % 12.0

% Use NumPy
np = py.importlib.import_module('numpy');
arr = np.array({1, 2, 3, 4, 5});

% Use a custom Python script
% File: my_analysis.py contains function process(data)
py.importlib.import_module('my_analysis');
result = py.my_analysis.process(py.numpy.array(matlab_data));

% Convert between MATLAB and Python types
matlab_array = double(py.numpy.array({1,2,3}));
```

### Calling MATLAB from Python

```python
# pip install matlabengine
import matlab.engine

eng = matlab.engine.start_matlab()

# Call MATLAB functions
result = eng.sqrt(144.0)

# Pass arrays
data = matlab.double([[1, 2, 3], [4, 5, 6]])
result = eng.mean(data)

eng.quit()
```

---

## 32. Keyboard Shortcuts Quick Reference

| Shortcut | Action |
|---|---|
| **F5** | Run current script |
| **Ctrl+Enter** | Run current section |
| **F9** | Run selected lines |
| **F10** | Step (in debugger) |
| **F11** | Step into function |
| **Shift+F5** | Stop execution / exit debug mode |
| **Ctrl+C** | Interrupt running code |
| **Ctrl+N** | New script |
| **Ctrl+S** | Save |
| **Ctrl+Z** | Undo |
| **Ctrl+Shift+Z** | Redo |
| **Ctrl+R** | Comment selected lines |
| **Ctrl+T** | Uncomment selected lines |
| **Ctrl+I** | Smart indent selected lines |
| **Ctrl+D** | Open documentation for selected function |
| **F1** | Help for selected function |
| **Tab** | Auto-complete |
| **Ctrl+F** | Find and replace |
| **Ctrl+G** | Go to line number |
| **Ctrl+Shift+M** | Add section break (`%%`) |
| `clc` | Clear Command Window |
| `clear` | Clear all variables |
| `close all` | Close all figure windows |
| `clear; clc; close all;` | Fresh start (put at the top of scripts) |

---

## 33. Common Errors and Troubleshooting

### "Matrix dimensions must agree"

**Cause:** You tried to perform an operation on two arrays with incompatible sizes.
**Fix:** Check `size(A)` and `size(B)`. Use `.*`, `./`, `.^` for element-wise operations (not `*`, `/`, `^`). Ensure vectors are both row or both column.

### "Index exceeds the number of array elements"

**Cause:** You tried to access an element beyond the array bounds.
**Fix:** Check `length(array)` or `size(array)`. Remember MATLAB is 1-indexed — the first element is `array(1)`, not `array(0)`.

### "Undefined function or variable"

**Cause:** The function is not on the MATLAB path, or you misspelled the name.
**Fix:** Check the spelling. Run `which functionname` to see if MATLAB can find it. Add the correct folder with `addpath`.

### "Out of memory"

**Cause:** The dataset exceeds available RAM.
**Fix:** Use `single` instead of `double` (halves memory). Process in chunks. Clear unneeded variables with `clear varname`. Use `whos` to find large variables. For very large stacks, read frames one at a time instead of loading the entire stack.

### Image appears black after `imshow`

**Cause:** The display range does not match the data range. Common with 16-bit or double images.
**Fix:** Use `imshow(img, [])` to auto-scale the display. Or manually specify: `imshow(img, [min_val max_val])`.

### "Subscript indices must either be real positive integers or logicals"

**Cause:** You used 0 or a non-integer as an array index, or tried to index with a floating-point number.
**Fix:** MATLAB is 1-indexed — use `1` as the first index. Convert to integer with `round()` if needed.

### Functions work in the Command Window but not in a script

**Cause:** The function is not on the MATLAB path when the script runs.
**Fix:** Add `addpath(genpath('functions'))` at the top of your script.

### Code runs correctly but is extremely slow

**Cause:** Usually a loop that should be vectorised, or an array that grows inside a loop.
**Fix:** Preallocate arrays. Replace loops with vectorised operations. Use the Profiler (`profile on; ...; profile viewer`) to identify bottlenecks.

---

## 34. Quick Reference: Essential Functions

### Array creation and manipulation

| Function | Description |
|---|---|
| `zeros(m,n)`, `ones(m,n)`, `rand(m,n)`, `randn(m,n)` | Create special arrays |
| `linspace(a,b,n)` | n evenly spaced points from a to b |
| `size(A)`, `numel(A)`, `ndims(A)` | Array dimensions |
| `reshape(A,m,n)` | Reshape without copying |
| `squeeze(A)` | Remove singleton dimensions |
| `permute(A,order)` | Rearrange dimensions |
| `cat(dim,A,B)` | Concatenate along dimension |
| `repmat(A,m,n)` | Replicate array |
| `sort(A)`, `sortrows(A)` | Sort |
| `unique(A)` | Unique values |
| `find(A)` | Indices of nonzero elements |

### Statistics

| Function | Description |
|---|---|
| `mean`, `median`, `mode` | Central tendency |
| `std`, `var` | Spread |
| `min`, `max` | Extremes |
| `sum`, `prod`, `cumsum` | Aggregation |
| `corrcoef(x,y)` | Correlation |
| `ttest2`, `ranksum` | Hypothesis tests (Stats Toolbox) |

### Image processing (Image Processing Toolbox)

| Function | Description |
|---|---|
| `imread`, `imwrite` | Read/write images |
| `imshow(img,[])` | Display with auto-scaling |
| `imgaussfilt(img,sigma)` | Gaussian blur |
| `medfilt2(img,[m n])` | Median filter |
| `imbinarize(img)` | Threshold to binary |
| `bwlabel(bw)` | Label connected components |
| `regionprops(L,img,...)` | Measure object properties |
| `bwareaopen(bw,n)` | Remove small objects |
| `imfill(bw,'holes')` | Fill holes |
| `imtophat(img,se)` | Top-hat background subtraction |
| `watershed(D)` | Watershed segmentation |
| `strel('disk',r)` | Create a structuring element |
| `imadjust(img)` | Contrast adjustment |
| `imregister(moving,fixed,...)` | Image registration |

### Plotting

| Function | Description |
|---|---|
| `figure` | Create new figure |
| `plot(x,y)` | Line plot |
| `scatter(x,y)` | Scatter plot |
| `bar(x)`, `histogram(x)` | Bar chart, histogram |
| `imagesc(A)` | Scaled image display |
| `imshow(img,[])` | Image display |
| `subplot(m,n,p)` | Subplot grid |
| `tiledlayout(m,n)` | Modern subplot grid |
| `xlabel`, `ylabel`, `title` | Axis labels |
| `legend` | Legend |
| `colorbar`, `colormap` | Colour controls |
| `hold on` / `hold off` | Overlay plots |
| `saveas(fig,filename)` | Save figure |
| `exportgraphics(fig,filename)` | High-quality export |

### File I/O

| Function | Description |
|---|---|
| `save(file, vars)` | Save to .mat |
| `load(file)` | Load from .mat |
| `readtable(file)` | Read CSV/Excel to table |
| `writetable(T,file)` | Write table to CSV/Excel |
| `readmatrix(file)` | Read numeric data |
| `writematrix(M,file)` | Write numeric data |
| `dir(pattern)` | List files |
| `fullfile(parts)` | Build file path |
| `fileparts(path)` | Split path into parts |
| `exist(name,'file')` | Check if file exists |
| `mkdir(dirname)` | Create directory |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using MATLAB for microscopy image analysis and scientific computing. For questions or suggestions, contact george.dickinson@gmail.com.*

*MATLAB is a registered trademark of The MathWorks, Inc.*
