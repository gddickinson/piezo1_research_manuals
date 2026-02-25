# Command Line Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

1. [Introduction: Why the Command Line?](#1-introduction-why-the-command-line)
2. [Getting Started: Opening the Terminal](#2-getting-started-opening-the-terminal)
3. [Navigation: Moving Around Your File System](#3-navigation-moving-around-your-file-system)
4. [Understanding Paths](#4-understanding-paths)
5. [File and Directory Operations](#5-file-and-directory-operations)
6. [Viewing File Contents](#6-viewing-file-contents)
7. [Tab Completion](#7-tab-completion)
8. [The Echo Command and Safe Testing](#8-the-echo-command-and-safe-testing)
9. [Wildcards and Pattern Matching](#9-wildcards-and-pattern-matching)
10. [Finding Files](#10-finding-files)
11. [Pipes, Redirection, and Command Chaining](#11-pipes-redirection-and-command-chaining)
12. [Creating Scripts](#12-creating-scripts)
13. [Practical Workflows for Microscopy Research](#13-practical-workflows-for-microscopy-research)
14. [Using AI Assistants for Command-Line Help](#14-using-ai-assistants-for-command-line-help)
15. [Quick Reference Tables](#15-quick-reference-tables)

---

## 1. Introduction: Why the Command Line?

As a scientist working with microscopy data --- whether you are running TIRF experiments on PIEZO1-GFP constructs, processing calcium imaging time-lapses, or organising files from weeks of cell culture experiments --- the command line is an essential tool. While graphical interfaces are intuitive for everyday tasks, the command line offers unmatched power for the kind of repetitive, large-scale work that laboratory research demands.

### What the command line gives you

| Advantage | What it means in practice |
|---|---|
| **Speed** | Rename 100 TIFF files from a day of imaging: 1 command instead of 100 clicks |
| **Reproducibility** | A script documents exactly what you did, and can be rerun identically months later |
| **Automation** | Process an entire dataset of calcium imaging stacks while you run your next experiment |
| **Remote access** | Connect to the lab workstation from home to check on an overnight analysis |
| **Integration** | Python, ImageJ, FLIKA, MATLAB, and git all work from the command line |
| **Batch processing** | Analyse hundreds of TIRF images automatically |
| **Version control** | Use git to track changes to your analysis scripts --- essential for reproducible science |

**Example:** Imagine you have collected 500 microscopy images across multiple days of PIEZO1-GFP TIRF experiments. You need to sort them into folders by date and experiment type. With the command line, a single command can do this in under a second. The same task would take hours of clicking through folders in a graphical file browser.

**Real-world scale:** In single-molecule TIRF imaging studies (e.g., Bertaccini et al. 2025, *Nature Communications*), a single experiment comparing PIEZO1-HaloTag dynamics across WT and KO hiPSC-derived cells with multiple drug conditions (Yoda1, DMSO vehicle) can generate hundreds of multi-gigabyte videos. Organising, batch-processing, and tracking these files by hand is not feasible --- the command line becomes a necessity, not a convenience.

---

## 2. Getting Started: Opening the Terminal

The "terminal" (also called the "command line", "shell", or "console") is the application where you type commands.

### macOS

- Press **Cmd + Space** to open Spotlight, type **Terminal**, and press **Enter**
- Or navigate to: **Applications > Utilities > Terminal**
- Recommended: Install [iTerm2](https://iterm2.com/) for a more feature-rich terminal

### Windows

- Search for **"cmd"** (Command Prompt), **"PowerShell"**, or **"Anaconda Prompt"**
- For scientific computing, the **Anaconda Prompt** is often the best choice since it has conda pre-configured
- Recommended: Install [Windows Terminal](https://aka.ms/terminal) from the Microsoft Store for a modern experience

### Linux

- Press **Ctrl + Alt + T** on most distributions
- Or search for **"Terminal"** in your applications menu

> **Note for this manual:** Most examples are given for macOS/Linux (which share the same Bash/Zsh shell). Windows equivalents are provided where they differ. If you are on Windows and using the Windows Subsystem for Linux (WSL), the macOS/Linux commands will work directly.

---

## 3. Navigation: Moving Around Your File System

When you open the terminal, you are "inside" a directory (folder) on your computer. Every command you run happens relative to this location. Navigating means changing which directory you are currently in.

### Where am I?

```bash
# macOS/Linux: Print Working Directory
pwd
# Example output: /Users/george/piezo1_analysis

# Windows: shows current directory
cd
# Example output: C:\Users\george\piezo1_analysis
```

Always check where you are with `pwd` before running commands. This simple habit prevents mistakes.

### What is in this directory?

```bash
# macOS/Linux
ls                  # Basic listing
ls -l               # Detailed listing (file sizes, dates, permissions)
ls -la              # Include hidden files (those starting with .)
ls -lh              # Human-readable file sizes (KB, MB, GB)

# Windows
dir                 # Standard listing
dir /w              # Wide format (names only, multiple columns)
```

### Changing directories

```bash
# All platforms
cd folder_name      # Go into a folder
cd ..               # Go up one level (to the parent directory)
cd ../..            # Go up two levels
cd /                # Go to the root directory (macOS/Linux)

# macOS/Linux only
cd ~                # Go to your home directory
cd -                # Go back to the previous directory

# Windows only
cd %USERPROFILE%    # Go to your home directory
cd C:\              # Go to the root of the C: drive
```

### Practical example: navigating to your experiment data

```bash
# Start from home
cd ~

# Navigate to your project
cd Documents/piezo1_project

# Check where you are
pwd
# /Users/george/Documents/piezo1_project

# See what is here
ls -l
# drwxr-xr-x  2 george  staff  4096 Feb 10 09:00 raw_data
# drwxr-xr-x  2 george  staff  4096 Feb 10 14:30 analysis
# -rw-r--r--  1 george  staff  2048 Feb 10 14:35 notes.txt

# Go into the raw data folder
cd raw_data

# Check contents
ls *.tif
# cell1_piezo1_gfp_001.tif  cell1_piezo1_gfp_002.tif  ...
```

---

## 4. Understanding Paths

A path is the "address" of a file or folder on your computer. There are two types.

### Absolute paths (full address)

An absolute path starts from the root of the file system and gives the complete location. It works no matter where you currently are.

```bash
# macOS/Linux
/Users/george/Documents/piezo1_project/raw_data/cell1.tif

# Windows
C:\Users\george\Documents\piezo1_project\raw_data\cell1.tif
```

### Relative paths (from your current location)

A relative path starts from your current directory. It is shorter but only works from the right starting point.

```bash
# If you are currently in /Users/george/Documents/piezo1_project/
./raw_data/cell1.tif            # File in a subdirectory
../other_project/data/file.tif  # File in a sibling directory
raw_data/cell1.tif              # The ./ is optional
```

### Special path symbols

| Symbol | Meaning | Example |
|---|---|---|
| `.` | Current directory | `./script.py` (run a script in the current directory) |
| `..` | Parent directory (one level up) | `../data/file.tif` (file in a sibling folder) |
| `~` | Home directory (macOS/Linux) | `~/Documents/analysis.py` |
| `%USERPROFILE%` | Home directory (Windows) | `%USERPROFILE%\Documents` |
| `/` | Root directory (macOS/Linux) | `/usr/local/bin` |
| `C:\` | Root drive (Windows) | `C:\Program Files` |

### When to use which

- **Absolute paths** are best in scripts --- they always work regardless of where the script is run from.
- **Relative paths** are convenient for interactive use and for scripts that should work in any project directory.

---

## 5. File and Directory Operations

These are the core commands for creating, copying, moving, and deleting files and directories.

### Creating directories

```bash
# Create a single directory
mkdir calcium_imaging

# Create nested directories (all levels at once)
mkdir -p data/raw/2025/february         # macOS/Linux (-p = create parents)
mkdir /p data\raw\2025\february         # Windows (with /p flag)

# Create a project structure for a new PIEZO1 experiment
mkdir -p piezo1_tirf_feb2025/{raw_data,processed,analysis,figures,scripts}
```

#### Example: directory structure for a multi-condition TIRF experiment

When running PIEZO1-HaloTag single-molecule imaging across multiple conditions (as in Bertaccini et al. 2025), a structured directory hierarchy prevents confusion as data accumulates. MicroManager acquisitions from the Olympus IX83 can be sorted into condition-specific subdirectories.

```bash
# Create a complete experiment structure for multi-condition TIRF imaging
mkdir -p piezo1_halotag_20250210/{
  raw/{WT_DMSO,WT_Yoda1,KO_DMSO,KO_Yoda1},
  localizations/{WT_DMSO,WT_Yoda1,KO_DMSO,KO_Yoda1},
  trajectories/{WT_DMSO,WT_Yoda1,KO_DMSO,KO_Yoda1},
  analysis/{diffusion,confinement,state_classification},
  figures,
  scripts,
  logs
}

# Or as a one-liner with brace expansion
mkdir -p piezo1_halotag_20250210/{raw,localizations,trajectories}/{WT_DMSO,WT_Yoda1,KO_DMSO,KO_Yoda1} \
         piezo1_halotag_20250210/{analysis/{diffusion,confinement,state_classification},figures,scripts,logs}

# Verify the structure
find piezo1_halotag_20250210 -type d | head -20
```

This separates raw acquisitions, ThunderSTORM localizations, FLIKA/TrackMate trajectories, and downstream analysis (DiPer diffusion, AutoDISC state classification) into distinct directories --- making it straightforward to batch-process each stage independently.

### Creating files

```bash
# Create an empty file
touch analysis.py                        # macOS/Linux
type nul > analysis.py                   # Windows

# Create multiple empty files
touch exp_1.txt exp_2.txt exp_3.txt      # macOS/Linux
```

### Copying files and directories

```bash
# Copy a single file
cp source.tif destination.tif                     # macOS/Linux
copy source.tif destination.tif                    # Windows

# Copy a file to a different directory
cp cell1_piezo1.tif ../backup/                     # macOS/Linux
copy cell1_piezo1.tif ..\backup\                   # Windows

# Copy an entire directory and all its contents
cp -r raw_data/ raw_data_backup/                   # macOS/Linux (-r = recursive)
xcopy /E raw_data raw_data_backup                  # Windows (/E = include subdirectories)

# Always make backups before dangerous operations
cp important_analysis.py important_analysis.py.backup
```

### Moving and renaming files

The `mv` command (or `move` on Windows) does both moving and renaming --- they are the same operation.

```bash
# Rename a file (same directory)
mv old_name.py new_name.py                         # macOS/Linux
move old_name.py new_name.py                       # Windows

# Move a file to a different directory
mv cell1.tif ../processed_data/                    # macOS/Linux
move cell1.tif ..\processed_data\                  # Windows

# Move AND rename simultaneously
mv analysis.py ../backup/analysis_v1.py            # macOS/Linux
move analysis.py ..\backup\analysis_v1.py          # Windows
```

### Deleting files and directories

> **WARNING:** There is NO undo for command-line deletion. Files are permanently removed --- they do NOT go to the Trash or Recycle Bin. Always make backups before deleting anything.

```bash
# Delete a single file
rm file.txt                           # macOS/Linux
del file.txt                          # Windows

# Delete with confirmation prompt (RECOMMENDED)
rm -i file.txt                        # macOS/Linux (asks "are you sure?")
del /P file.txt                       # Windows (prompts for confirmation)

# Delete a directory and everything inside it
rm -r old_folder/                     # macOS/Linux (recursive --- DANGEROUS)
rmdir /S old_folder                   # Windows

# NEVER run this --- it will destroy your entire system:
# rm -rf /                            # DO NOT DO THIS
```

**Safety rule:** Always test destructive commands with `echo` first (see [Section 8](#8-the-echo-command-and-safe-testing)).

---

## 6. Viewing File Contents

These commands let you look at the contents of text files without opening an editor.

```bash
# Display the entire file
cat script.py                          # macOS/Linux
type script.py                         # Windows

# Display with line numbers
cat -n script.py                       # macOS/Linux

# View just the first lines (useful for checking file headers)
head script.py                         # First 10 lines (default)
head -n 20 script.py                   # First 20 lines

# View just the last lines (useful for checking log outputs)
tail log.txt                           # Last 10 lines (default)
tail -n 20 log.txt                     # Last 20 lines

# Follow a growing file in real time (great for watching analysis progress)
tail -f analysis.log                   # macOS/Linux (press Ctrl+C to stop)

# Page through a long file interactively
less script.py                         # macOS/Linux (press q to quit)
more script.py                         # Windows
```

### Practical example: checking your analysis log

```bash
# Your Python analysis script writes progress to a log file.
# Watch it in real time while the script runs:
tail -f piezo1_analysis.log

# Output appears as it is written:
# [2025-02-10 14:30:01] Processing cell1_001.tif ... done (0.5s)
# [2025-02-10 14:30:02] Processing cell1_002.tif ... done (0.4s)
# ...

# Press Ctrl+C to stop watching
```

---

## 7. Tab Completion

Tab completion is **the single most important productivity tool** in the command line. It saves time, prevents typos, and helps you discover what files and commands are available.

### How it works

1. Type the first few characters of a filename, directory, or command
2. Press the **Tab** key
3. The shell automatically completes the name

```bash
# Type a few letters, then press Tab
cd ra[TAB]
# Becomes: cd raw_data/

python ana[TAB]
# Becomes: python analyze_calcium.py

# If there are multiple matches, press Tab twice to see all options
ls exp[TAB][TAB]
# Shows: experiment1.tif  experiment2.tif  experiment3.tif

# Tab works on paths too
cd /Users/ge[TAB]/Doc[TAB]/pie[TAB]
# Becomes: cd /Users/george/Documents/piezo1_project/
```

### Why tab completion matters

- **Speed:** Type 3 characters instead of 30
- **Accuracy:** No typos --- the shell only completes names that actually exist
- **Discovery:** Shows you what files and directories are available
- **Confidence:** If Tab completes it, the file exists

> **Master tip:** If you find yourself typing full filenames, you are doing it the slow way. Tab completion should become automatic muscle memory. Use it for *everything*.

---

## 8. The Echo Command and Safe Testing

The `echo` command prints text to the screen. It does not execute any actions, modify any files, or change anything. This makes it the perfect tool for **testing commands before running them on real data**.

### Basic usage

```bash
echo "Hello, World!"
# Output: Hello, World!

echo "Current user: $USER"          # macOS/Linux
echo "Current user: %USERNAME%"     # Windows

echo "I am in: $PWD"               # macOS/Linux
echo "I am in: %CD%"               # Windows
```

### The Golden Rule of Safe Testing

> **Test with echo  >>>  Verify output  >>>  Remove echo  >>>  Execute**

### Testing file renaming

```bash
# WRONG (dangerous) --- immediately renames everything with no preview:
for file in *.tif; do
    mv "$file" "2025_piezo1_$file"
done

# RIGHT (safe) --- first see what WOULD happen:
for file in *.tif; do
    echo "Would rename: $file --> 2025_piezo1_$file"
done
# Output:
# Would rename: cell1.tif --> 2025_piezo1_cell1.tif
# Would rename: cell2.tif --> 2025_piezo1_cell2.tif
# Would rename: cell3.tif --> 2025_piezo1_cell3.tif

# Review the output. If it looks correct, THEN run without echo:
for file in *.tif; do
    mv "$file" "2025_piezo1_$file"
done
```

### Testing copy operations

```bash
# Preview what would be copied
for file in *.tif; do
    echo "Would copy: $file --> backup/$file"
done

# If the output looks right, execute:
for file in *.tif; do
    cp "$file" "backup/$file"
done
```

### Testing delete operations (CRITICAL)

Deletion is permanent. Files do not go to the Trash. **Always** test delete commands with echo first.

```bash
# Step 1: See what would be deleted
for file in old_*.tif; do
    echo "Would DELETE: $file"
done
# Output:
# Would DELETE: old_experiment1.tif
# Would DELETE: old_experiment2.tif

# Step 2: Carefully review the list
# - Are these really the files you want to delete?
# - Should you back them up first?

# Step 3: Only if you are absolutely sure:
for file in old_*.tif; do
    rm "$file"
done
```

### Testing complex operations

```bash
# Example: Sort TIRF images into year-based folders
# Step 1: Preview
for file in *_2024*.tif; do
    echo "Would move: $file --> 2024/$file"
done
for file in *_2025*.tif; do
    echo "Would move: $file --> 2025/$file"
done

# Step 2: Review output

# Step 3: Create directories and execute
mkdir -p 2024 2025
for file in *_2024*.tif; do mv "$file" "2024/$file"; done
for file in *_2025*.tif; do mv "$file" "2025/$file"; done
```

---

## 9. Wildcards and Pattern Matching

Wildcards let you work with multiple files at once using patterns. Instead of typing each filename individually, you use special characters to match groups of files.

### Wildcard symbols

| Pattern | Meaning | Example | Matches |
|---|---|---|---|
| `*` | Matches anything (any number of characters) | `*.tif` | `cell1.tif`, `data.tif`, `experiment_final.tif` |
| `?` | Matches exactly one character | `data?.csv` | `data1.csv`, `data2.csv`, `dataA.csv` |
| `[abc]` | Matches any ONE of the listed characters | `file[12].txt` | `file1.txt`, `file2.txt` (not `file3.txt`) |
| `[0-9]` | Matches any single digit | `exp[0-9].tif` | `exp0.tif` through `exp9.tif` |
| `[a-z]` | Matches any lowercase letter | `test[a-z].py` | `testa.py`, `testb.py`, ..., `testz.py` |
| `[!abc]` | Matches anything EXCEPT the listed characters | `file[!1].txt` | `file2.txt`, `file3.txt` (not `file1.txt`) |

### Practical examples

```bash
# List all TIFF files
ls *.tif                                 # macOS/Linux
dir *.tif                                # Windows

# List all Python scripts
ls *.py

# List experiments numbered 1 through 9
ls experiment?.tif                       # Matches experiment1.tif but NOT experiment10.tif

# Copy all TIFF files to a backup folder
cp *.tif backup/

# Move all CSV results files
mv *.csv processed_data/

# Count how many TIFF files you have
ls *.tif | wc -l                         # macOS/Linux

# Match files with specific numbering
ls cell[1-5].tif                         # cell1.tif through cell5.tif
ls data_202[0-9]_*.csv                   # data_2020_jan.csv, data_2029_dec.csv, etc.
ls experiment_[AB]*.tif                  # experiment_A1.tif, experiment_B2.tif, etc.
```

### Combining wildcards

```bash
# Multiple wildcards in one pattern
ls exp_*_cell?.tif
# Matches: exp_calcium_cell1.tif, exp_piezo_cell2.tif

# Complex patterns
ls 2025_*_[0-9][0-9].tif
# Matches: 2025_calcium_01.tif, 2025_piezo_99.tif (requires two digits at end)

# Files NOT starting with a dot
ls [!.]*.txt

# All PIEZO1 TIRF images
ls piezo1_tirf_*.tif
```

---

## 10. Finding Files

When you need to locate files anywhere on your system, not just in the current directory.

### macOS/Linux

```bash
# Find all TIFF files in the current directory and all subdirectories
find . -name "*.tif"

# Find TIFF files starting with "exp"
find . -name "exp*.tif"

# Find Python scripts in your home directory
find ~/Documents -name "*.py"

# Find files and show their details
find . -name "*.tif" -exec ls -lh {} \;

# Find large TIFF files (over 100 MB)
find . -name "*.tif" -size +100M

# Find files modified today
find . -name "*.tif" -mtime 0

# Find files modified in the last 7 days
find . -name "*.tif" -mtime -7
```

### Windows

```bash
# Find TIFF files recursively
dir /s /b *.tif

# Alternative method
where /r . *.tif
```

### Searching inside files

```bash
# Find all Python scripts that import numpy
grep "import numpy" *.py                  # macOS/Linux
findstr "import numpy" *.py               # Windows

# Search recursively through all files
grep -r "PIEZO1" .                        # macOS/Linux
findstr /s "PIEZO1" *.*                   # Windows

# Find TODO comments in all Python scripts
grep -r "TODO" *.py
```

---

## 11. Pipes, Redirection, and Command Chaining

Pipes and redirection are what make the command line truly powerful. They let you combine simple commands to create complex workflows.

### Output redirection: saving output to files

The `>` operator sends the output of a command to a file instead of displaying it on screen.

```bash
# Save output to a file (overwrites existing file)
ls *.tif > tiff_file_list.txt

# Append output to a file (adds to the end)
ls *.tif >> tiff_file_list.txt

# Redirect error messages to a file
python analysis.py 2> errors.log

# Redirect both normal output AND errors to the same file
python analysis.py > output.log 2>&1

# Discard output entirely (run silently)
command > /dev/null 2>&1                    # macOS/Linux
command > nul 2>&1                          # Windows
```

### Building reports with redirection

```bash
# Create an analysis report
echo "PIEZO1 TIRF Analysis Report" > report.txt
echo "==========================" >> report.txt
date >> report.txt
echo "" >> report.txt
echo "Files processed:" >> report.txt
ls *.tif >> report.txt
echo "" >> report.txt
echo "Total files:" >> report.txt
ls *.tif | wc -l >> report.txt
```

### Pipes: chaining commands together

The pipe operator `|` sends the output of one command as the input to the next command.

```bash
# Basic syntax
command1 | command2 | command3

# Count the number of TIFF files
ls *.tif | wc -l

# Sort files by size (largest last)
ls -l | sort -k5 -n

# Filter CSV data for a specific cell
cat results.csv | grep "cell_1"

# Count how many rows match
cat results.csv | grep "cell_1" | wc -l

# Find unique entries from 2025
cat data.csv | grep "2025" | sort | uniq > unique_2025.txt
```

### Real-world examples for microscopy research

```bash
# Count TIFF files in all subdirectories
find . -name "*.tif" | wc -l

# Find the 10 largest files in your project
ls -lh | sort -k5 -h | tail -10

# List files modified today and save the list
find . -name "*.tif" -mtime 0 | tee today_files.txt
# (tee prints to screen AND saves to file)

# Count files by type
find . -type f | sed 's/.*\.//' | sort | uniq -c

# Extract specific columns from a CSV
cat results.csv | cut -d',' -f1,3 | head -20

# Search all analysis logs for errors
cat *.log | grep -i "error" | sort | uniq > all_errors.txt

# Find the 20 most recently modified TIFF files
ls -lt *.tif | head -20 > recent_files.txt

# Generate a summary of large image files
find . -name "*.tif" -size +100M > large_files.txt
```

---

## 12. Creating Scripts

A script is a text file containing a series of commands. Instead of typing commands one at a time, you save them in a script and run them all at once. Scripts are essential for reproducible science.

### Why use scripts?

- **Reproducibility:** Run the exact same analysis again months later
- **Documentation:** The script IS the record of what you did
- **Sharing:** Colleagues can replicate your workflow by running your script
- **Automation:** Schedule scripts to run overnight or on a timer
- **Batch processing:** Process hundreds of images while you sleep
- **Error prevention:** Test once, then run confidently forever
- **Version control:** Track changes to your analysis with git

### Creating Bash scripts (macOS/Linux)

**Method 1: Using a text editor**

```bash
# Open a text editor to create the script
nano organize_tirf_data.sh

# Or use your preferred editor:
# vim organize_tirf_data.sh
# code organize_tirf_data.sh        # VS Code
```

Write the following in the editor:

```bash
#!/bin/bash
# Script: organize_tirf_data.sh
# Purpose: Organize PIEZO1 TIRF imaging data by date
# Author: [Your Name]
# Date: 2025-02-10

echo "Organizing TIRF data by year..."

# Create year directories
mkdir -p 2024 2025 2026

# Move files by year
mv *_2024*.tif 2024/
mv *_2025*.tif 2025/
mv *_2026*.tif 2026/

echo "Done! Files organized."
ls -l 2024/ 2025/ 2026/
```

Save and exit (`Ctrl+X` in nano, then `Y` to confirm, then `Enter`).

**Method 2: Create directly from the command line**

```bash
cat > organize_tirf_data.sh << 'EOF'
#!/bin/bash
echo "Organizing TIRF data..."
mkdir -p 2024 2025 2026
mv *_2024*.tif 2024/
mv *_2025*.tif 2025/
mv *_2026*.tif 2026/
echo "Done!"
EOF
```

**Making the script executable and running it:**

```bash
# Make the script executable (one-time step)
chmod +x organize_tirf_data.sh

# Run the script
./organize_tirf_data.sh

# Or run with bash directly (no chmod needed)
bash organize_tirf_data.sh
```

### Creating Batch files (Windows)

```bat
@echo off
REM Script: organize_tirf_data.bat
REM Purpose: Organize PIEZO1 TIRF imaging data by date
REM Author: [Your Name]
REM Date: 2025-02-10

echo Organizing TIRF data by year...

REM Create year directories
mkdir 2024 2025 2026

REM Move files by year
move *_2024*.tif 2024\
move *_2025*.tif 2025\
move *_2026*.tif 2026\

echo Done! Files organized.
dir 2024 2025 2026

pause
```

Save this as `organize_tirf_data.bat` and double-click it or type `organize_tirf_data.bat` in the terminal.

### Creating PowerShell scripts (Windows)

```powershell
# Script: Organize-TirfData.ps1
# Purpose: Organize PIEZO1 TIRF imaging data by date
# Author: [Your Name]
# Date: 2025-02-10

Write-Host "Organizing TIRF data by year..."

# Create year directories
New-Item -ItemType Directory -Force -Path 2024, 2025, 2026

# Move files by year
Move-Item -Path "*_2024*.tif" -Destination "2024\"
Move-Item -Path "*_2025*.tif" -Destination "2025\"
Move-Item -Path "*_2026*.tif" -Destination "2026\"

Write-Host "Done! Files organized."
Get-ChildItem 2024, 2025, 2026
```

Run with: `powershell -ExecutionPolicy Bypass -File Organize-TirfData.ps1`

### Script best practices

1. **Add a shebang line:** `#!/bin/bash` as the very first line (macOS/Linux) tells the system how to run the script
2. **Include comments:** Explain what the script does, who wrote it, and when
3. **Print progress messages:** Use `echo` so you know what is happening
4. **Test incrementally:** Get one section working before adding the next
5. **Use meaningful names:** `organize_piezo1_tirf_data.sh`, not `script1.sh`
6. **Handle errors:** Check if files exist before trying to process them
7. **Test with echo first:** Preview destructive operations before executing them
8. **Use variables:** Make it easy to modify dates, paths, and parameters
9. **Keep it focused:** One clear task per script

### Example: A complete, safe backup script

```bash
#!/bin/bash
###############################################################################
# Script: backup_analysis.sh
# Purpose: Create a dated backup of PIEZO1 analysis files
# Author: [Your Name]
# Date: 2025-02-10
# Usage: ./backup_analysis.sh
###############################################################################

# Exit immediately if any command fails
set -e

# Print a banner
echo "====================================="
echo "  Backing up PIEZO1 analysis files"
echo "  Date: $(date)"
echo "====================================="

# Create a backup directory with today's date
BACKUP_DIR="backup_$(date +%Y-%m-%d)"
echo "Creating directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Check if there are files to back up
if ls *.py *.tif 2>/dev/null 1>&2; then
    echo "Found files to back up:"
    ls *.py *.tif 2>/dev/null

    # Copy Python scripts
    if ls *.py 2>/dev/null 1>&2; then
        echo "Copying Python files..."
        cp *.py "$BACKUP_DIR/"
    fi

    # Copy TIFF files
    if ls *.tif 2>/dev/null 1>&2; then
        echo "Copying TIFF files..."
        cp *.tif "$BACKUP_DIR/"
    fi

    echo ""
    echo "Backup complete!"
    echo "Files saved in: $BACKUP_DIR"
    echo "Total files: $(ls "$BACKUP_DIR" | wc -l)"
else
    echo "No .py or .tif files found to back up."
    exit 1
fi

echo "====================================="
echo "  Script finished successfully"
echo "====================================="
```

---

## 13. Practical Workflows for Microscopy Research

This section provides complete, real-world examples tailored to PIEZO1 research workflows.

### Workflow 1: Organising a day of TIRF imaging data

After a day of TIRF microscopy imaging PIEZO1-GFP in HEK293T cells, you might have dozens of files with inconsistent names. This script organises them into a clean structure.

```bash
#!/bin/bash
# organize_tirf_session.sh
# Run this in the directory containing your raw images

echo "=== Organizing TIRF session data ==="

# Create project structure
mkdir -p organized/{raw,processed,analysis,figures}

# Step 1: Test what would be moved (ALWAYS do this first)
echo "Preview of file moves:"
for file in *.tif; do
    echo "  $file --> organized/raw/$file"
done

echo ""
read -p "Proceed? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

# Step 2: Copy raw files (copy, not move, for safety)
cp *.tif organized/raw/

# Step 3: Create an inventory
echo "File Inventory" > organized/inventory.txt
echo "Date: $(date)" >> organized/inventory.txt
echo "" >> organized/inventory.txt
ls -lh organized/raw/*.tif >> organized/inventory.txt

echo "Done! Check organized/inventory.txt"
```

### Workflow 2: Batch renaming files with a consistent naming scheme

```bash
#!/bin/bash
# rename_tirf_images.sh
# Adds experiment info to filenames

EXPERIMENT="piezo1_gfp_tirf"
DATE=$(date +%Y%m%d)
COUNTER=1

echo "=== Renaming TIRF images ==="
echo "Pattern: ${DATE}_${EXPERIMENT}_NNN.tif"
echo ""

# Preview first
for file in *.tif; do
    new_name=$(printf "%s_%s_%03d.tif" "$DATE" "$EXPERIMENT" "$COUNTER")
    echo "  $file --> $new_name"
    COUNTER=$((COUNTER + 1))
done

echo ""
read -p "Proceed with renaming? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

# Execute
COUNTER=1
for file in *.tif; do
    new_name=$(printf "%s_%s_%03d.tif" "$DATE" "$EXPERIMENT" "$COUNTER")
    mv "$file" "$new_name"
    COUNTER=$((COUNTER + 1))
done

echo "Done! Renamed $((COUNTER - 1)) files."
```

### Workflow 3: Daily backup of analysis work

```bash
#!/bin/bash
# daily_backup.sh
# Creates a timestamped backup of your analysis scripts and results

BACKUP_DIR="backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# Copy Python scripts
cp *.py "$BACKUP_DIR/" 2>/dev/null

# Copy analysis results
cp *.csv "$BACKUP_DIR/" 2>/dev/null
cp *.txt "$BACKUP_DIR/" 2>/dev/null

# Create a summary
echo "Backup created: $(date)" > "$BACKUP_DIR/backup_info.txt"
echo "Files:" >> "$BACKUP_DIR/backup_info.txt"
ls -lh "$BACKUP_DIR/" >> "$BACKUP_DIR/backup_info.txt"

echo "Backup saved to: $BACKUP_DIR"
```

### Workflow 4: Setting up a Python environment and running an analysis

```bash
# Step 1: Activate your conda environment
conda activate microscopy

# Step 2: Verify Python and key packages
python -c "import numpy; print('NumPy:', numpy.__version__)"
python -c "import tifffile; print('tifffile:', tifffile.__version__)"

# Step 3: Navigate to your project
cd ~/Documents/piezo1_project

# Step 4: Run your analysis script
python analyze_calcium_traces.py > analysis_log.txt 2>&1

# Step 5: Check if it succeeded
tail -5 analysis_log.txt

# Step 6: View the results
ls figures/
```

### Workflow 5: Generating a data summary report

```bash
#!/bin/bash
# generate_data_report.sh
# Creates a summary of all microscopy data in a project

REPORT="data_report_$(date +%Y%m%d).txt"

echo "============================================" > "$REPORT"
echo "PIEZO1 Microscopy Data Report" >> "$REPORT"
echo "Generated: $(date)" >> "$REPORT"
echo "============================================" >> "$REPORT"

echo "" >> "$REPORT"
echo "--- TIFF Files ---" >> "$REPORT"
echo "Total count: $(find . -name '*.tif' | wc -l)" >> "$REPORT"
echo "Total size: $(du -sh . 2>/dev/null | cut -f1)" >> "$REPORT"

echo "" >> "$REPORT"
echo "--- By Directory ---" >> "$REPORT"
for dir in */; do
    count=$(find "$dir" -name "*.tif" 2>/dev/null | wc -l)
    if [ "$count" -gt 0 ]; then
        echo "  $dir: $count files" >> "$REPORT"
    fi
done

echo "" >> "$REPORT"
echo "--- Python Scripts ---" >> "$REPORT"
find . -name "*.py" >> "$REPORT"

echo "" >> "$REPORT"
echo "--- Large Files (>100MB) ---" >> "$REPORT"
find . -size +100M -exec ls -lh {} \; >> "$REPORT" 2>/dev/null

echo "Report saved to: $REPORT"
cat "$REPORT"
```

---

## 14. Using AI Assistants for Command-Line Help

AI assistants like Claude can generate command-line automations from your plain-language descriptions. This is especially useful when you know *what* you want to do but are unsure of the exact syntax.

### Tips for effective prompts

**Be specific.** Include:
- Your operating system (macOS, Windows, Linux)
- Your current file naming scheme
- Exactly what you want to accomplish
- Any constraints (e.g., "keep the originals", "create specific folder structure")

**Bad prompt:**
> "How do I organize my files?"

**Good prompt:**
> "I am on macOS. I have 200 calcium imaging files named cell1_001.tif through cell1_100.tif and cell2_001.tif through cell2_100.tif. How do I move them into separate cell1/ and cell2/ subdirectories?"

### What you can ask for

- **Scripts:** "Write a bash script that backs up all .py and .tif files into a dated folder"
- **One-liners:** "How do I count all TIFF files in subdirectories?"
- **Explanations:** "What does `find . -name '*.tif' -exec ls -lh {} \;` do?"
- **Debugging:** "I ran `mv *.tif backup/` but got 'No such file or directory'. What went wrong?"
- **Safety checks:** "Is it safe to run `rm -r old_data/`? What should I check first?"

### Always ask for echo testing

When getting commands that modify files, ask the AI to include an echo-based preview step so you can verify the operation before executing it.

---

## 15. Quick Reference Tables

### Navigation commands

| Command | Purpose | Platform |
|---|---|---|
| `pwd` | Show current directory | macOS/Linux |
| `cd` | Show current directory | Windows |
| `ls` | List files | macOS/Linux |
| `ls -l` | Detailed file listing | macOS/Linux |
| `ls -la` | List including hidden files | macOS/Linux |
| `dir` | List files | Windows |
| `cd folder` | Change directory | All |
| `cd ..` | Go up one level | All |
| `cd ~` | Go to home directory | macOS/Linux |
| `cd %USERPROFILE%` | Go to home directory | Windows |

### File operations

| Command | Purpose | Platform |
|---|---|---|
| `mkdir folder` | Create directory | All |
| `mkdir -p a/b/c` | Create nested directories | macOS/Linux |
| `touch file.py` | Create empty file | macOS/Linux |
| `type nul > file.py` | Create empty file | Windows |
| `cp src dst` | Copy file | macOS/Linux |
| `copy src dst` | Copy file | Windows |
| `cp -r dir1/ dir2/` | Copy directory recursively | macOS/Linux |
| `mv old new` | Move or rename | macOS/Linux |
| `move old new` | Move or rename | Windows |
| `rm file` | Delete file | macOS/Linux |
| `del file` | Delete file | Windows |
| `rm -r dir/` | Delete directory recursively | macOS/Linux |

### Viewing files

| Command | Purpose | Platform |
|---|---|---|
| `cat file` | Display entire file | macOS/Linux |
| `type file` | Display entire file | Windows |
| `head file` | First 10 lines | macOS/Linux |
| `head -n 20 file` | First 20 lines | macOS/Linux |
| `tail file` | Last 10 lines | macOS/Linux |
| `tail -f file` | Follow a growing file | macOS/Linux |
| `less file` | Page through a file | macOS/Linux |

### Wildcards

| Pattern | Matches | Example |
|---|---|---|
| `*` | Anything (any length) | `*.tif` = all TIFF files |
| `?` | Exactly one character | `exp?.tif` = exp1.tif, expA.tif |
| `[abc]` | One of: a, b, or c | `file[12].txt` = file1.txt, file2.txt |
| `[0-9]` | Any single digit | `exp[0-9].tif` = exp0.tif ... exp9.tif |
| `[a-z]` | Any lowercase letter | `test[a-z].py` |
| `[!abc]` | Anything EXCEPT a, b, or c | `file[!1].txt` = file2.txt, file3.txt |

### Pipes and redirection

| Syntax | Purpose | Example |
|---|---|---|
| `>` | Redirect output to file (overwrite) | `ls > files.txt` |
| `>>` | Append output to file | `ls >> files.txt` |
| `2>` | Redirect errors to file | `python script.py 2> errors.log` |
| `> file 2>&1` | Redirect output and errors | `python script.py > all.log 2>&1` |
| `\|` | Pipe output to next command | `ls *.tif \| wc -l` |

### Safety checklist

- [ ] Always check your current directory with `pwd` before running commands
- [ ] Use **Tab completion** for every filename to avoid typos
- [ ] Test batch operations with **echo** before executing them
- [ ] **Back up** files before any rename, move, or delete operation
- [ ] Remember: there is **no undo** for command-line deletions
- [ ] Use `rm -i` (interactive mode) when deleting to get confirmation prompts
- [ ] When in doubt, **copy** instead of **move** --- you can always delete the original later

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using command-line tools for their microscopy research workflows. For questions or suggestions, contact george.dickinson@gmail.com.*
