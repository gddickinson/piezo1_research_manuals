# Micro-Manager Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: What is Micro-Manager?](#1-introduction-what-is-micro-manager)
2. [Installation](#2-installation)
3. [The Micro-Manager Interface](#3-the-micro-manager-interface)
4. [Hardware Configuration](#4-hardware-configuration)

**Part II: Core Acquisition**

5. [Live View and Snapping Images](#5-live-view-and-snapping-images)
6. [Image Display and Histograms](#6-image-display-and-histograms)
7. [Camera Settings: Exposure, Binning, and ROI](#7-camera-settings-exposure-binning-and-roi)
8. [Saving Images and File Formats](#8-saving-images-and-file-formats)

**Part III: Multi-Dimensional Acquisition**

9. [The Multi-Dimensional Acquisition (MDA) Window](#9-the-multi-dimensional-acquisition-mda-window)
10. [Time-Lapse Acquisition](#10-time-lapse-acquisition)
11. [Multi-Channel Acquisition](#11-multi-channel-acquisition)
12. [Z-Stack Acquisition](#12-z-stack-acquisition)
13. [Multi-Position Acquisition](#13-multi-position-acquisition)
14. [Combining Dimensions: Channel + Time + Z + Position](#14-combining-dimensions-channel--time--z--position)

**Part IV: TIRF Microscopy**

15. [TIRF Principles and Micro-Manager Configuration](#15-tirf-principles-and-micro-manager-configuration)
16. [cellTIRF Illumination Control](#16-celltirf-illumination-control)
17. [Optimising TIRF for Single-Molecule Imaging](#17-optimising-tirf-for-single-molecule-imaging)
18. [High-Speed Acquisition: 100–500 fps](#18-high-speed-acquisition-100500-fps)

**Part V: Device Control**

19. [Controlling Illumination: Lasers, LEDs, and Shutters](#19-controlling-illumination-lasers-leds-and-shutters)
20. [Motorised Stages and Autofocus](#20-motorised-stages-and-autofocus)
21. [Filter Wheels and Dichroic Turrets](#21-filter-wheels-and-dichroic-turrets)
22. [Environmental Control: Temperature, CO₂, and Humidity](#22-environmental-control-temperature-co-and-humidity)
23. [Device Property Browser](#23-device-property-browser)

**Part VI: Scripting and Automation**

24. [The Script Panel: BeanShell Scripting](#24-the-script-panel-beanshell-scripting)
25. [The MMCore API: Key Methods](#25-the-mmcore-api-key-methods)
26. [Controlling Micro-Manager from Python (pymmcore-plus)](#26-controlling-micro-manager-from-python-pymmcore-plus)
27. [Custom Acquisition Sequences](#27-custom-acquisition-sequences)
28. [Triggered Acquisition and Hardware Synchronisation](#28-triggered-acquisition-and-hardware-synchronisation)

**Part VII: Practical Workflows**

29. [Workflow 1: TIRF Time-Lapse of PIEZO1-HaloTag Puncta](#29-workflow-1-tirf-time-lapse-of-piezo1-halotag-puncta)
30. [Workflow 2: Multi-Channel Acquisition (PIEZO1 + Actin + Nuclei)](#30-workflow-2-multi-channel-acquisition-piezo1--actin--nuclei)
31. [Workflow 3: High-Speed Acquisition for Channel Activity (200–500 fps)](#31-workflow-3-high-speed-acquisition-for-channel-activity-200500-fps)
32. [Workflow 4: Multi-Position Tiling for Organoids](#32-workflow-4-multi-position-tiling-for-organoids)
33. [Workflow 5: Brightfield + Fluorescence Overlay](#33-workflow-5-brightfield--fluorescence-overlay)

**Part VIII: Tips, Performance, and Troubleshooting**

34. [Performance Tips for Large and Fast Acquisitions](#34-performance-tips-for-large-and-fast-acquisitions)
35. [Common Problems and Solutions](#35-common-problems-and-solutions)
36. [Micro-Manager vs. Proprietary Software](#36-micro-manager-vs-proprietary-software)
37. [Keyboard Shortcuts Quick Reference](#37-keyboard-shortcuts-quick-reference)

---

## 1. Introduction: What is Micro-Manager?

### Overview

Micro-Manager (also written μManager or MM) is a free, open-source software platform for controlling automated microscopes. It was created by **Arthur Edelstein, Nenad Amodaj, Karl Hoover, Ron Vale, and Nico Stuurman** at the University of California, San Francisco, and is one of the most widely used microscopy control programs in biological research.

Micro-Manager is tightly integrated with ImageJ/FIJI, providing a familiar environment for image acquisition and immediate on-the-fly analysis. It supports hundreds of hardware devices --- cameras, stages, filter wheels, lasers, shutters, and environmental controllers --- through a plugin-based device adapter architecture.

### Why Micro-Manager for PIEZO1 research?

Our laboratory uses Micro-Manager 2.0 to control TIRF microscopes for imaging PIEZO1-HaloTag channels at single-molecule sensitivity. Micro-Manager was used for all TIRF image acquisition in Bertaccini et al. (2025) *Nature Communications*, controlling:

- **Olympus IX83** inverted microscopes with 4-line cellTIRF illuminators
- **Hamamatsu ORCA-Flash 4.0 v2+** and **ORCA-Fusion BT** sCMOS cameras
- **ASI** programmable motorised stages
- **560 nm and 640 nm lasers** for exciting JF549, JF646, and JF646-BAPTA HaloTag ligands
- **Tokai Hit** environmental control enclosures for live cell imaging at 37 °C

Micro-Manager enabled precise control of laser power, camera exposure, and frame rate, which was critical for achieving the 100–500 fps acquisition rates required to resolve PIEZO1 channel gating dynamics.

### When to cite Micro-Manager

If you use Micro-Manager in published research, cite:

> Edelstein, A., Amodaj, N., Hoover, K., Vale, R. & Stuurman, N. (2010). Computer control of microscopes using µManager. *Current Protocols in Molecular Biology*, Chapter 14, Unit 14.20.

Micro-Manager 2.0 was used for all TIRF and widefield image acquisition in Bertaccini et al. (2025).

### Key features

| Feature | Description |
|---|---|
| **Open source** | Free under the BSD licence; no licence fees or dongles |
| **Hardware support** | Drivers (device adapters) for 300+ devices from 70+ manufacturers |
| **ImageJ integration** | MM 1.4 runs as an ImageJ plugin; MM 2.0 uses its own viewer but retains ImageJ compatibility |
| **Multi-Dimensional Acquisition** | Built-in support for time, channel, z, and position combinations |
| **Scripting** | BeanShell (Java-like) scripts for custom protocols |
| **Python control** | pymmcore-plus and pycro-manager libraries for Python-based acquisition |
| **Cross-platform** | Runs on Windows, macOS, and Linux (Windows has the broadest driver support) |
| **Community** | Active mailing list, image.sc forum, and regular development |

### Resources

| Resource | URL |
|---|---|
| Main website | https://micro-manager.org |
| Downloads | https://micro-manager.org/Download_Micro-Manager_Latest_Release |
| Documentation wiki | https://micro-manager.org/Micro-Manager_User%27s_Guide |
| Configuration guide | https://micro-manager.org/Micro-Manager_Configuration_Guide |
| Device adapter list | https://micro-manager.org/Device_Support |
| Forum (image.sc) | https://forum.image.sc/tag/micro-manager |
| GitHub (MM2) | https://github.com/micro-manager/micro-manager |
| pymmcore-plus | https://pymmcore-plus.github.io/pymmcore-plus/ |
| pycro-manager | https://pycro-manager.readthedocs.io |

---

## 2. Installation

### System requirements

- **Operating system:** Windows 10 or later (recommended), macOS, or Linux
- **Java:** Bundled with the installer (Java 8 for MM 1.4; Java 11+ for MM 2.0)
- **RAM:** 8 GB minimum; 16+ GB recommended for large image stacks
- **Disk space:** 500 MB for the application; multi-TB fast drives (SSD or NVMe) recommended for high-speed acquisition
- **USB/network:** Connections as required by your hardware devices

### Installing Micro-Manager 2.0

1. Download the latest nightly build from https://micro-manager.org/Download_Micro-Manager_Latest_Release
2. Run the installer. On Windows, choose a short path like `C:\Micro-Manager-2.0`
3. During installation, select which device adapters to include (selecting all is fine; unused adapters are simply dormant)
4. Launch Micro-Manager from the Start menu or by running `Micro-Manager.exe`

### Installing Micro-Manager 1.4 (legacy)

MM 1.4 runs as an ImageJ plugin. Download the combined ImageJ + Micro-Manager bundle. This is the version used in many older publications. However, MM 2.0 is recommended for new projects because of its improved data handling and display.

### Updating device adapters

Device adapters are updated with each nightly build. If you need a newer driver for a specific device, download the latest nightly. You can keep multiple MM installations in different folders.

### Side-by-side installations

It is common to maintain separate installations for stability:

```
C:\Micro-Manager-2.0-stable\    ← tested configuration for daily use
C:\Micro-Manager-2.0-nightly\   ← latest features and driver updates
```

---

## 3. The Micro-Manager Interface

### Main window (MM 2.0)

When Micro-Manager 2.0 launches, the main window displays:

| Element | Description |
|---|---|
| **Snap / Live buttons** | Acquire a single frame or start continuous live view |
| **Exposure field** | Set camera exposure time (ms) |
| **Channel group** | Dropdown to select predefined illumination configurations |
| **Camera ROI** | Region of interest for the camera sensor |
| **Shutter controls** | Open/close the active shutter |
| **XY and Z position** | Current stage coordinates |
| **Multi-D Acq button** | Open the Multi-Dimensional Acquisition window |
| **Script Panel** | Open the BeanShell scripting console |

### The display window

When you snap or acquire images, they appear in the **Image Display** window. In MM 2.0, this uses the **DataViewer** with:

- Histogram and contrast controls
- Channel colour selection
- Slider bars for time, z, and channel dimensions
- Metadata inspector
- Zoom and pan tools

### The Inspector window

Right-click on the image display and select **Inspector** to view pixel values, metadata for individual frames, and comments.

### Configuration presets

Micro-Manager uses **configuration groups** and **presets** to store commonly used settings. For example, you might have a group called "Channel" with presets:

| Preset name | Laser | Power | Filter cube | Exposure (ms) |
|---|---|---|---|---|
| JF646 | 640 nm | 3.5 mW | Cy5 | 10 |
| JF549 | 560 nm | 0.43 mW | TRITC | 10 |
| JF646-BAPTA-200fps | 640 nm | 12 mW | Cy5 | 5 |
| JF646-BAPTA-500fps | 640 nm | 20.5 mW | Cy5 | 2 |
| Brightfield | Trans LED | 30% | DIC | 50 |

Presets are created in the Hardware Configuration Wizard and can be modified in **Tools > Configuration Presets**.

---

## 4. Hardware Configuration

### The Hardware Configuration Wizard

The first time you launch Micro-Manager, or whenever your hardware changes, run the **Hardware Configuration Wizard** (**Tools > Hardware Configuration Wizard**). This wizard walks you through:

1. **Selecting device adapters** --- for each hardware component, choose the appropriate driver
2. **Setting communication ports** --- serial ports (COM ports on Windows) or USB connections
3. **Initialising devices** --- Micro-Manager tests communication with each device
4. **Defining configuration groups and presets** --- organise frequently used device states

### Example configuration for our TIRF microscope

Our Olympus IX83 TIRF microscope (used in Bertaccini et al. 2025) has the following devices:

| Device | Adapter | Connection |
|---|---|---|
| Hamamatsu ORCA-Fusion BT | HamamatsuHam_DCAM | USB3 |
| ASI MS-2000 XY Stage | ASIStage | COM3 |
| ASI Z piezo | ASIStage | COM3 (same controller) |
| Olympus cellTIRF 4-line | OlympusCellTIRF | COM4 |
| Sutter Lambda 10-3 filter wheel | SutterLambda | COM5 |
| Tokai Hit stage-top incubator | — (manual control) | — |
| 560 nm laser | OlympusCellTIRF | Integrated |
| 640 nm laser | OlympusCellTIRF | Integrated |

### Saving and loading configurations

Configurations are saved as `.cfg` files:

```
# Save the current configuration
Tools > Save Configuration Settings As...

# Typical location
C:\Micro-Manager-2.0\MMConfig_TIRF_IX83.cfg
```

You can create multiple configuration files for different experiments and load them at startup.

### Testing a configuration

After creating a configuration:

1. Click **Snap** to test the camera
2. Move the stage with the XY controls
3. Switch presets in each configuration group
4. Verify that shutters open and close
5. Check that the correct filter cubes are in place

If any device fails, check the **CoreLog** (**Tools > Show Log**) for error details.

---

## 5. Live View and Snapping Images

### Snapping a single image

Click the **Snap** button (or press **Ctrl+Shift+S**) to acquire a single image with the current exposure and illumination settings. The image appears in the display window.

### Live view

Click the **Live** button (or press **Ctrl+Shift+L**) to start a continuous live stream from the camera. This is essential for:

- Focusing on your sample
- Checking illumination and alignment
- Finding cells or regions of interest
- Adjusting TIRF angle

Live view runs at whatever frame rate the current exposure allows. The display rate may be lower than the camera rate to keep the GUI responsive.

### Using live view for TIRF alignment

When setting up TIRF illumination:

1. Start Live view
2. Open the cellTIRF control panel (see Section 16)
3. Gradually increase the TIRF penetration angle while watching the image
4. The transition from epifluorescence to TIRF is visible as a dramatic increase in contrast: background fluorescence drops, and membrane-associated puncta become clearly visible
5. Stop live view before starting acquisition to avoid unnecessary photobleaching

---

## 6. Image Display and Histograms

### The histogram panel

The display window includes a histogram showing the distribution of pixel intensities. Use it to:

- **Set display range:** Drag the left and right handles to adjust minimum and maximum display values
- **Auto-stretch:** Click the auto-stretch button to map the histogram to the full display range
- **Bit depth indicator:** The histogram shows the camera's bit depth (e.g. 16-bit for sCMOS cameras)

### Multi-channel display

When viewing multi-channel data, each channel has its own histogram and colour lookup table (LUT). You can:

- Assign colours (green for actin, red for PIEZO1, cyan for nuclei)
- Adjust contrast independently for each channel
- Toggle channels on/off with checkboxes
- Choose composite or single-channel view

### Metadata overlay

The display can show metadata overlays including:

- Frame number and timestamp
- Exposure time
- Stage position
- Scale bar (if pixel size is calibrated)

Access these via **View > Metadata** in the display window.

---

## 7. Camera Settings: Exposure, Binning, and ROI

### Exposure time

Set the camera exposure time in the main window's exposure field (in milliseconds). For PIEZO1-HaloTag imaging, typical exposure times are:

| Acquisition type | Frame rate | Exposure (ms) | Laser power |
|---|---|---|---|
| Localization (JF646) | 10 fps | 100 | 3.5 mW |
| Diffusion tracking | 10 fps | 100 | 3.5 mW |
| Activity (JF646-BAPTA) 100 fps | 100 fps | 10 | 3.5 mW |
| Activity 200 fps | 200 fps | 5 | 12 mW |
| Activity 500 fps | 500 fps | 2 | 20.5 mW |

The exposure time determines the maximum frame rate: frame rate ≤ 1000 / exposure(ms), minus camera readout overhead.

### Pixel binning

Binning combines adjacent pixels on the camera sensor, increasing signal at the cost of spatial resolution:

| Binning | Pixel size (at 60×) | Gain in signal | Readout speed |
|---|---|---|---|
| 1 × 1 | ~108 nm | 1× | Baseline |
| 2 × 2 | ~216 nm | 4× | ~2× faster |
| 4 × 4 | ~432 nm | 16× | ~4× faster |

For single-molecule localisation of PIEZO1-HaloTag puncta, we use **1 × 1 binning** (no binning) to maintain the highest spatial resolution for super-resolution analysis via ThunderSTORM. Binning may be useful for dim samples or when speed is paramount and spatial resolution can be sacrificed.

Set binning in **Device > Device Property Browser > Camera > Binning**.

### Camera region of interest (ROI)

Reducing the camera ROI (reading out only a portion of the sensor) decreases the number of pixels read out per frame, enabling higher frame rates:

```
Full sensor (2048 × 2048):  max ~100 fps at 2 ms exposure
Half sensor (2048 × 1024):  max ~200 fps
Quarter sensor (2048 × 512): max ~400 fps
256 × 256 central region:   max ~800 fps
```

To set the camera ROI:

1. Draw an ROI on the live image
2. Click the **ROI** button in the main window to apply it to the camera
3. Or set it via the Device Property Browser: `Camera > ROI`

For high-speed PIEZO1 activity recordings at 500 fps (Bertaccini et al. 2025), we used a reduced ROI to achieve the target frame rate with the Hamamatsu ORCA-Fusion BT camera.

---

## 8. Saving Images and File Formats

### Default save format

Micro-Manager 2.0 saves acquired data in one of two formats:

| Format | Description | Pros | Cons |
|---|---|---|---|
| **Micro-Manager TIFF** | Multi-page TIFF with MM metadata | Universal, works with FIJI | Large file sizes; ~4 GB limit per file |
| **NDTiff** | Micro-Manager's new format (MM 2.0+) | Handles >4 GB, fast writing, rich metadata | Requires MM or pycromanager to read |

Choose the save format in **Tools > Options > Data Saving**.

### File naming conventions

We recommend a systematic naming convention:

```
YYYYMMDD_CellType_Probe_Condition_FrameRate_VideoNumber
```

Examples:

```
20240315_EC_JF646_Basal_10fps_001
20240315_EC_JF646BAPTA_Yoda1_200fps_003
20240315_NSC_JF646BAPTA_Basal_500fps_012
```

### Saving from a script

```java
// BeanShell script to save the current image
import org.micromanager.data.DataManager;

// Snap and save
mm.acquisitions().runAcquisition("save_name", "C:/Data/");
```

### Converting to standard TIFF for downstream analysis

For analysis in ThunderSTORM and FLIKA, convert Micro-Manager datasets to standard multi-page TIFF stacks. In FIJI:

```
File > Open...   (select the Micro-Manager metadata file)
File > Save As > Tiff...
```

Or use Bio-Formats to open Micro-Manager data directly.

---

## 9. The Multi-Dimensional Acquisition (MDA) Window

The MDA window is the heart of automated acquisition in Micro-Manager. Open it from the main window by clicking **Multi-D Acq.** or via **Acquire > Multi-Dimensional Acquisition**.

### Acquisition dimensions

The MDA supports four independent dimensions:

| Dimension | Purpose | Example |
|---|---|---|
| **Time points** | Repeated acquisition over time | 1200 frames at 100 fps |
| **Channels** | Different illumination wavelengths | JF646, JF549, Brightfield |
| **Z slices** | Optical sections through the sample | 20 planes at 0.5 μm spacing |
| **Positions** | Multiple stage locations | 10 cells per dish |

### Ordering

The order in which dimensions are acquired can be configured. The default is:

```
Position > Time > Channel > Z
```

For live-cell PIEZO1 imaging, we typically use:

```
Position > Time    (single channel, single z-plane per position)
```

### Acquisition settings

| Setting | Description |
|---|---|
| **Save images** | Check to save to disk; uncheck to hold in memory only |
| **Directory** | Folder for saved data |
| **Name prefix** | Prefix for the dataset |
| **Comment** | Free text stored in metadata |

### Running an acquisition

1. Configure the desired dimensions (Time, Channels, Z, Positions)
2. Set the save directory and name
3. Click **Acquire!**
4. Monitor progress in the status bar and display window

---

## 10. Time-Lapse Acquisition

### Setting up a time-lapse

In the MDA window, check **Time Points** and configure:

| Parameter | Description | Example |
|---|---|---|
| **Number of time points** | Total frames to acquire | 1200 |
| **Interval** | Time between frames (ms) | 0 (as fast as possible) |

When the interval is set to 0, frames are acquired as fast as the camera and system allow, limited only by exposure time and readout.

### Fast time-lapse for PIEZO1 imaging

For PIEZO1 channel activity recordings, we need high frame rates (100–500 fps). The settings used in Bertaccini et al. (2025) were:

**100 fps recordings (10 ms per frame):**
```
Time Points: 6000 frames (60 s)
Interval: 0 ms
Exposure: 10 ms
Camera ROI: Full sensor (2048 × 2048)
```

**200 fps recordings (5 ms per frame):**
```
Time Points: 6000 frames (30 s)
Interval: 0 ms
Exposure: 5 ms
Camera ROI: Reduced (e.g. 2048 × 1024)
```

**500 fps recordings (2 ms per frame):**
```
Time Points: 5000 frames (10 s)
Interval: 0 ms
Exposure: 2 ms
Camera ROI: Further reduced (e.g. 2048 × 512)
```

### Streaming mode

For the highest frame rates, use **Sequence Acquisition** (hardware-triggered streaming) instead of the MDA. In this mode, the camera runs continuously, buffering frames in memory and writing them to disk in the background. See Section 28.

---

## 11. Multi-Channel Acquisition

### Setting up channels

In the MDA window, check **Channels** and add channel presets:

1. Click **New** to add a channel row
2. Select the channel group (e.g. "Channel")
3. Select the preset (e.g. "JF646")
4. Set the exposure time for each channel independently
5. Set the colour for display

### Channel ordering

For multi-channel PIEZO1 experiments, a typical configuration is:

| Channel | Preset | Exposure | Colour |
|---|---|---|---|
| PIEZO1 | JF646 | 100 ms | Red |
| Actin | SPY555-actin | 200 ms | Green |
| Nuclei | Hoechst | 50 ms | Blue |

### Sequential vs. simultaneous

Micro-Manager acquires channels **sequentially** by default (one filter/laser at a time). For simultaneous dual-channel imaging (e.g. with a beam splitter), you would configure a single channel with the appropriate camera and optics settings. Our setup uses sequential channel acquisition to avoid spectral bleedthrough.

---

## 12. Z-Stack Acquisition

### Setting up z-stacks

In the MDA window, check **Z Slices** and configure:

| Setting | Description |
|---|---|
| **Slices** | Define start and end positions, or centre and range |
| **Step size** | Distance between z-planes (μm) |
| **Relative / Absolute** | Relative to current position, or absolute coordinates |

### Z-stacks for PIEZO1 organoid imaging

For Micropatterned Neural Rosettes (MNRs) imaged by lattice light-sheet microscopy, volumetric stacks were acquired. For confocal imaging of fixed MNRs, z-stacks through the full organoid thickness were acquired:

```
Step size: 0.5 μm (Nyquist for confocal at NA 1.4)
Range: 20–40 μm (full MNR thickness)
```

For TIRF imaging, z-stacks are not typically used because TIRF is inherently a single-plane technique sampling only the basal membrane.

---

## 13. Multi-Position Acquisition

### Why multi-position?

Multi-position acquisition is valuable for:

- **Increasing sample size:** Image 10–20 cells per dish automatically
- **Tiling:** Mosaic imaging of large samples like organoids
- **Comparison:** Image treated and untreated cells in the same dish sequentially

### Setting up positions

1. In the MDA window, check **Multiple Positions (XY)**
2. Click **Edit Position List...**
3. Navigate to each position of interest and click **Mark**
4. Optionally, set a z offset for each position (to account for sample tilt)

### Position list for TIRF imaging

For PIEZO1-HaloTag experiments, we typically mark 10–20 cell positions per dish:

1. Use brightfield to find cells
2. Switch to TIRF/fluorescence to confirm PIEZO1-HaloTag signal
3. Mark the position
4. Repeat for all cells of interest
5. Run MDA with all marked positions

Position lists can be saved and loaded:

```
Positions > Save As...   → positions.pos
Positions > Load...      → positions.pos
```

---

## 14. Combining Dimensions: Channel + Time + Z + Position

### Complex acquisition examples

**Example 1: Time-lapse at multiple positions (PIEZO1 tracking)**
```
Channels: JF646
Time: 1200 frames, interval 0 ms
Z: Single plane (TIRF)
Positions: 15 cells
Order: Position > Time
```

**Example 2: Multi-channel z-stack (fixed organoid)**
```
Channels: JF646, Phalloidin-555, Hoechst
Time: 1 frame
Z: 40 slices, 0.5 μm step
Positions: 5 MNRs
Order: Position > Channel > Z
```

**Example 3: Multi-channel time-lapse (PIEZO1 activity + actin)**
```
Channels: JF646-BAPTA, SPY555-actin
Time: 600 frames per position
Z: Single plane (TIRF)
Positions: 10 cells
Order: Position > Time > Channel
```

### Acquisition order considerations

- **Position first** minimises stage movement within a time point but means each position is imaged at a slightly different time
- For fast dynamics (PIEZO1 gating), use single-position time-lapses to avoid delays from stage movement
- For slower processes (cell migration), multi-position time-lapses work well

---

## 15. TIRF Principles and Micro-Manager Configuration

### What is TIRF?

Total Internal Reflection Fluorescence (TIRF) microscopy illuminates only a thin layer (typically 100–200 nm) of the sample immediately adjacent to the coverslip. This is achieved by directing the excitation laser at an angle beyond the critical angle at the glass–water interface, generating an evanescent wave that decays exponentially with distance from the coverslip.

### Why TIRF for PIEZO1?

TIRF is ideal for imaging PIEZO1-HaloTag in the plasma membrane because:

- **Low background:** Only fluorophores within ~200 nm of the coverslip are excited, eliminating cytoplasmic and organelle fluorescence
- **Single-molecule sensitivity:** The reduced background enables detection of individual PIEZO1-HaloTag puncta
- **Fast imaging:** No confocal scanning; the entire field of view is illuminated simultaneously
- **Minimal photodamage:** Only a thin layer of the cell is irradiated

### Configuring TIRF in Micro-Manager

For the Olympus IX83 with cellTIRF (used in our lab), Micro-Manager controls the TIRF illumination angle via the cellTIRF device adapter. The key device properties are:

| Property | Description |
|---|---|
| `PenetrationDepth` | Depth of the evanescent field (nm) |
| `TIRFAngle` | Angle of the laser beam |
| `LaserPower` | Power setting (0–100%) |
| `LaserLine` | Wavelength selection (488, 560, 640 nm) |

### Setting the TIRF angle

1. Start Live view with the desired laser
2. Open the Device Property Browser (**Tools > Device Property Browser**)
3. Navigate to the cellTIRF adapter
4. Gradually increase the TIRF angle
5. Observe the transition: epifluorescence → oblique illumination → TIRF
6. In TIRF mode, background drops dramatically and membrane-associated puncta appear with high contrast
7. Fine-tune the angle for optimal signal-to-background

---

## 16. cellTIRF Illumination Control

### The cellTIRF system

The Olympus cellTIRF is a multi-line TIRF illumination module that supports 2 or 4 laser lines. In our configuration:

| Laser line | Wavelength | Primary use |
|---|---|---|
| Line 1 | 488 nm | GFP, SPY505-DNA |
| Line 2 | 560 nm | JF549 HTL, tdTomato, SPY555-actin |
| Line 3 | 640 nm | JF646 HTL, JF646-BAPTA HTL, JF635 HTL |
| Line 4 | 405 nm | Hoechst (UV), photoactivation |

### Micro-Manager cellTIRF configuration

The cellTIRF is configured as a single device in Micro-Manager with properties for each laser line. Key settings:

```
# In the Device Property Browser:
CellTIRF-Line3-Power = 30        # Power as percentage (0-100)
CellTIRF-Line3-Angle = 3200      # TIRF angle (device-specific units)
CellTIRF-Line3-Enabled = 1       # On/Off
```

### Laser power settings from Bertaccini et al. (2025)

The following laser powers were measured at the back pupil of the objective:

| Experiment | Laser | Power at back pupil | Camera |
|---|---|---|---|
| PIEZO1 localisation (JF646) | 640 nm | 3.5 mW | Fusion BT |
| Intensity comparison (JF549 vs tdTomato) | 560 nm | 0.43 mW | Flash 4.0 v2+ |
| JF646-BAPTA 100 fps | 640 nm | 3.5 mW | Fusion BT |
| JF646-BAPTA 200 fps | 640 nm | 12 mW | Fusion BT |
| JF646-BAPTA 500 fps | 640 nm | 20.5 mW | Fusion BT |

### Creating channel presets for TIRF

In the Hardware Configuration Wizard, create presets that set the laser line, power, and TIRF angle simultaneously:

```
Group: "Channel"
Preset: "JF646-TIRF"
  → CellTIRF-Line3-Enabled = 1
  → CellTIRF-Line3-Power = 30
  → CellTIRF-Line3-Angle = 3200
  → Dichroic = "Cy5 cube"
  → Emission filter = "700/75 nm"
```

---

## 17. Optimising TIRF for Single-Molecule Imaging

### Signal-to-background ratio

For single-molecule detection of PIEZO1-HaloTag puncta, the signal-to-background ratio is critical. In Bertaccini et al. (2025), the mean signal-to-background ratio was 5.62 ± 0.19 for JF549 HTL-labeled PIEZO1-HaloTag, compared to 3.14 ± 0.12 for PIEZO1-tdTomato.

Optimising signal-to-background in Micro-Manager:

| Parameter | Recommendation |
|---|---|
| **TIRF angle** | Fine-tune until background is minimised while puncta remain bright |
| **Laser power** | Use the minimum power that gives adequate signal; excess power accelerates photobleaching |
| **Exposure** | Longer exposures increase signal but also increase background; balance with frame rate needs |
| **Camera gain** | Set sensor to low-noise readout mode for quantitative measurements |
| **EM gain** | Not applicable for sCMOS cameras; relevant for EMCCD |

### Minimising photobleaching

For extended time-lapse imaging of PIEZO1-HaloTag:

1. **Use JF dyes:** JF646 HTL is brighter and more photostable than tdTomato (τ = 38.1 ± 0.15 s vs. 21.5 ± 0.13 s)
2. **Minimise live view time:** Use brightfield for focusing when possible; switch to fluorescence only briefly before acquisition
3. **Optimise laser power:** The minimum power that gives acceptable signal-to-background
4. **Reduce frame rate if possible:** Fewer excitation events per unit time

### Camera settings for single-molecule imaging

For the Hamamatsu ORCA-Fusion BT:

| Setting | Value | Reason |
|---|---|---|
| Readout mode | Ultra-quiet | Lowest read noise (0.7 e⁻ rms) for detecting dim puncta |
| Binning | 1 × 1 | Maximum spatial resolution for super-resolution localisation |
| Bit depth | 16-bit | Full dynamic range |
| Defect correction | On | Corrects hot pixels |
| Sensor cooler | On (−20 °C) | Minimises dark current |

---

## 18. High-Speed Acquisition: 100–500 fps

### Why high-speed acquisition?

Resolving PIEZO1 channel gating dynamics requires temporal resolutions of 2–10 ms:

- At 200 fps, the time resolution is 5 ms, sufficient to resolve individual channel opening and closing events
- At 500 fps (2 ms per frame), transitions on both the rising and falling phases of flickers were complete within 2 frames (4 ms), as reported in Bertaccini et al. (2025)

### Achieving high frame rates

The maximum frame rate depends on:

1. **Exposure time:** Must be short enough (e.g. 2 ms for 500 fps)
2. **Camera readout:** Fewer rows = faster readout; reduce the camera ROI
3. **Data transfer:** USB3 or Camera Link bandwidth limits
4. **Disk write speed:** NVMe SSD recommended for sustained writing at high data rates

### Example settings for 500 fps

```
Camera: Hamamatsu ORCA-Fusion BT
Exposure: 2 ms
ROI: 2048 × 512 (central strip)
Readout mode: Standard (faster than Ultra-quiet)
Trigger: Internal
Laser power: 20.5 mW at back pupil (640 nm)
```

### Sequence acquisition for maximum speed

For the highest and most consistent frame rates, use **Sequence Acquisition** instead of the MDA:

```java
// BeanShell script for sequence acquisition
int nrFrames = 5000;
double exposure = 2.0;  // ms

mmc.setExposure(exposure);
mmc.startSequenceAcquisition(nrFrames, 0, true);  // frames, interval, stopOnOverflow

while (mmc.isSequenceRunning()) {
    if (mmc.getRemainingImageCount() > 0) {
        img = mmc.popNextImage();
        // Process or save frame
    }
}

mmc.stopSequenceAcquisition();
```

### Monitoring buffer usage

During high-speed acquisition, the circular buffer stores frames in RAM before writing to disk. Monitor buffer usage to avoid dropped frames:

```java
// Check buffer status
int remaining = mmc.getRemainingImageCount();
int capacity = mmc.getBufferTotalCapacity();
System.out.println("Buffer: " + remaining + " / " + capacity);
```

If frames are being dropped, increase buffer size in **Tools > Options > Sequence Buffer Size (MB)**.

---

## 19. Controlling Illumination: Lasers, LEDs, and Shutters

### Shutter control

Micro-Manager manages shutters to ensure the sample is only illuminated during image acquisition:

| Setting | Description |
|---|---|
| **Auto-shutter** | When enabled, the shutter opens only during exposure and closes between frames |
| **Manual shutter** | Open/close shutter manually from the main window |

Auto-shutter is critical for live-cell PIEZO1 imaging to minimise photobleaching between frames.

### Laser power control

For the cellTIRF system, laser power is controlled via the device adapter:

```java
// BeanShell: Set 640 nm laser to 50% power
mmc.setProperty("CellTIRF", "Line3-Power", "50");

// Query current power
String power = mmc.getProperty("CellTIRF", "Line3-Power");
```

### LED illumination for brightfield

For transmitted light (brightfield, phase contrast, DIC):

```java
// Turn on transmitted light at 30% intensity
mmc.setProperty("TransmittedLight", "Intensity", "30");
mmc.setProperty("TransmittedLight", "State", "1");  // On

// Turn off
mmc.setProperty("TransmittedLight", "State", "0");
```

---

## 20. Motorised Stages and Autofocus

### XY stage control

Move the stage to specific positions:

```java
// Move to absolute position (μm)
mmc.setXYPosition(1000.0, 2000.0);

// Get current position
double x = mmc.getXPosition();
double y = mmc.getYPosition();

// Relative move
mmc.setRelativeXYPosition(10.0, 0.0);  // Move 10 μm in X
```

### Z stage / focus control

```java
// Move Z to absolute position
mmc.setPosition("ZStage", 50.0);

// Get current Z
double z = mmc.getPosition("ZStage");

// Relative Z move
mmc.setRelativePosition("ZStage", 0.5);  // Move 0.5 μm
```

### Software autofocus

Micro-Manager includes software autofocus plugins. For TIRF imaging, we typically use manual focus because the TIRF angle is sensitive to the sample-coverslip distance. However, for long time-lapses, autofocus can compensate for thermal drift:

1. **OughtaFocus:** Image-based autofocus that maximises sharpness
2. **JAF (Java AutoFocus):** Configurable autofocus algorithm

Configure autofocus in **Devices > Autofocus**.

### Hardware autofocus

Many microscope frames include hardware-based focus systems (e.g. Olympus IX3 ZDC, Nikon Perfect Focus). These use an infrared beam reflected from the coverslip to maintain focus independently of the sample. Configure the hardware autofocus as a device in the Hardware Configuration Wizard.

---

## 21. Filter Wheels and Dichroic Turrets

### Filter wheel configuration

Filter wheels (e.g. Sutter Lambda 10-3) are configured in Micro-Manager with labelled positions:

| Position | Filter | Use |
|---|---|---|
| 0 | Empty (open) | Brightfield |
| 1 | 525/50 nm BP | GFP, SPY505-DNA |
| 2 | 600/50 nm BP | JF549, tdTomato |
| 3 | 700/75 nm BP | JF646, JF635 |
| 4 | Quad-band | Multi-channel composite |

### Dichroic turret

The microscope filter turret holds dichroic mirror/emission filter cubes:

```java
// Switch to the Cy5 filter cube
mmc.setProperty("FilterTurret", "Label", "Cy5");

// Or by position number
mmc.setProperty("FilterTurret", "State", "3");
```

### Filter cube specifications for PIEZO1 imaging

The filter cubes used in Bertaccini et al. (2025) are documented in Supplementary Table 4 of the paper. Key specifications:

| Cube | Excitation | Dichroic | Emission | Fluorophore |
|---|---|---|---|---|
| TRITC | 560/40 nm | 585 LP | 630/75 nm | JF549, tdTomato |
| Cy5 | 640/30 nm | 660 LP | 700/75 nm | JF646, JF646-BAPTA |

---

## 22. Environmental Control: Temperature, CO₂, and Humidity

### Why environmental control matters

Live-cell imaging of PIEZO1-HaloTag requires physiological conditions:

- **Temperature:** 37 °C (standard mammalian cell culture)
- **CO₂:** 5% (for bicarbonate-buffered media), or use HEPES-buffered imaging solution
- **Humidity:** Prevents sample evaporation during long acquisitions

### Tokai Hit stage-top incubator

Our lab uses a Tokai Hit stage-top incubator with an environmental control enclosure:

1. **Pre-warm** the entire microscope enclosure to 37 °C at least 1 hour before imaging to minimise thermal drift
2. **Secure the sample** on the stage and close the enclosure
3. **Equilibrate** for 15–30 minutes before starting acquisition

### Imaging solution

For TIRF imaging of PIEZO1-HaloTag cells, we use a HEPES-buffered imaging solution (pH 7.30, 316 mOsm/L) rather than CO₂-dependent media. This eliminates the need for CO₂ control during imaging:

```
Imaging solution composition (Bertaccini et al. 2025):
  148 mM NaCl
  3 mM CaCl₂
  1 mM KCl
  2 mM MgCl₂
  8 mM Glucose
  10 mM HEPES
  pH 7.30
  316 mOsm/L
```

For hypotonic experiments, this solution was diluted with 20% MilliQ water.

---

## 23. Device Property Browser

### Accessing device properties

The Device Property Browser (**Tools > Device Property Browser**) shows every property of every device currently loaded. This is the most powerful tool for low-level hardware control.

### Key camera properties (Hamamatsu ORCA-Fusion BT)

| Property | Type | Description |
|---|---|---|
| Exposure | Float | Exposure time (ms) |
| Binning | Enum | 1×1, 2×2, 4×4 |
| ScanMode | Enum | Standard, Ultra-quiet, Fast |
| TriggerSource | Enum | Internal, External, Software |
| TriggerPolarity | Enum | Positive, Negative |
| SensorCooler | Bool | Enable sensor cooling |

### Filtering the browser

Type a device or property name in the search field to filter. This is useful when you need to find a specific setting among hundreds of properties.

### Read-only vs. read-write properties

Some properties are read-only (grey text), providing status information but not accepting changes. Read-write properties (white background) can be modified by clicking the value field.

---

## 24. The Script Panel: BeanShell Scripting

### What is BeanShell?

BeanShell is a lightweight Java scripting language used in Micro-Manager for automation. BeanShell scripts can access all of Micro-Manager's Java API, including the **MMCore** (low-level hardware control) and the **MMStudio** (GUI operations).

### Opening the Script Panel

**Plugins > Scripting > Script Panel** (or press **Ctrl+Shift+E** in some versions).

### Basic script structure

```java
// Access the core object for hardware control
mmc = mm.core();

// Access the GUI
gui = mm;

// Snap an image
mmc.snapImage();

// Get the image data
img = mmc.getImage();

// Print information
gui.message("Image acquired: " + img.length + " pixels");
```

### Common scripting tasks

**Set exposure and snap:**
```java
mmc.setExposure(50.0);
mmc.snapImage();
```

**Loop through positions:**
```java
import org.micromanager.PositionList;
PositionList pl = mm.positions().getPositionList();

for (int i = 0; i < pl.getNumberOfPositions(); i++) {
    MultiStagePosition pos = pl.getPosition(i);
    mmc.setXYPosition(pos.getX(), pos.getY());
    mmc.waitForDevice(mmc.getXYStageDevice());
    mmc.snapImage();
    // ... save or process image
}
```

**Timed acquisition:**
```java
int nFrames = 600;
double interval = 100;  // ms

for (int i = 0; i < nFrames; i++) {
    long start = System.currentTimeMillis();
    mmc.snapImage();
    img = mmc.getImage();
    // ... process or save
    long elapsed = System.currentTimeMillis() - start;
    if (elapsed < interval) {
        Thread.sleep((long)(interval - elapsed));
    }
}
```

---

## 25. The MMCore API: Key Methods

The **MMCore** is the hardware abstraction layer that provides a unified interface to all devices. Key methods:

### Camera control

| Method | Description |
|---|---|
| `setExposure(double ms)` | Set exposure time |
| `getExposure()` | Get current exposure |
| `snapImage()` | Acquire a single frame |
| `getImage()` | Retrieve the last acquired image as a byte array |
| `startSequenceAcquisition(int numFrames, double interval, boolean stopOnOverflow)` | Start continuous acquisition |
| `stopSequenceAcquisition()` | Stop continuous acquisition |
| `isSequenceRunning()` | Check if sequence is active |
| `getRemainingImageCount()` | Frames waiting in buffer |
| `popNextImage()` | Get next frame from buffer |
| `getImageWidth()` | Image width in pixels |
| `getImageHeight()` | Image height in pixels |
| `getImageBitDepth()` | Bits per pixel |

### Stage control

| Method | Description |
|---|---|
| `setXYPosition(double x, double y)` | Move XY stage |
| `getXPosition()` | Current X position |
| `getYPosition()` | Current Y position |
| `setPosition(String device, double pos)` | Move Z stage |
| `getPosition(String device)` | Current Z position |
| `waitForDevice(String device)` | Block until device finishes moving |

### Property control

| Method | Description |
|---|---|
| `setProperty(String device, String prop, String val)` | Set a device property |
| `getProperty(String device, String prop)` | Get a device property value |
| `getAllowedPropertyValues(String device, String prop)` | List valid values |
| `hasProperty(String device, String prop)` | Check if property exists |

### Shutter control

| Method | Description |
|---|---|
| `setShutterOpen(boolean state)` | Open/close the active shutter |
| `getShutterOpen()` | Check shutter state |
| `setAutoShutter(boolean state)` | Enable/disable auto-shutter |

---

## 26. Controlling Micro-Manager from Python (pymmcore-plus)

### Why Python?

While BeanShell is convenient for quick scripts within Micro-Manager, Python offers the full scientific computing ecosystem (NumPy, SciPy, matplotlib, scikit-image) and is the primary language for our downstream analysis in FLIKA and ThunderSTORM.

### pymmcore-plus

**pymmcore-plus** is a modern Python wrapper around the Micro-Manager core. It provides a Pythonic API with type hints, event handling, and integration with napari.

### Installation

```bash
pip install pymmcore-plus
```

You also need the Micro-Manager device adapters installed on your system.

### Basic usage

```python
from pymmcore_plus import CMMCorePlus

# Create and initialise the core
mmc = CMMCorePlus.instance()
mmc.loadSystemConfiguration("C:/Micro-Manager-2.0/MMConfig_TIRF.cfg")

# Snap an image
mmc.snapImage()
img = mmc.getImage()  # Returns a NumPy array

print(f"Image shape: {img.shape}")
print(f"Mean intensity: {img.mean():.1f}")
```

### Acquisition loop in Python

```python
import numpy as np
import tifffile

n_frames = 1200
exposure_ms = 10.0
mmc.setExposure(exposure_ms)

# Preallocate array
height = mmc.getImageHeight()
width = mmc.getImageWidth()
stack = np.zeros((n_frames, height, width), dtype=np.uint16)

# Acquire
mmc.startContinuousSequenceAcquisition(0)  # 0 ms interval

for i in range(n_frames):
    while mmc.getRemainingImageCount() == 0:
        pass  # Wait for frame
    stack[i] = mmc.popNextImage()

mmc.stopSequenceAcquisition()

# Save
tifffile.imwrite("tirf_movie.tif", stack)
print(f"Saved {n_frames} frames")
```

### pycro-manager

**pycro-manager** is an alternative Python library that interfaces with the full Micro-Manager application (including the GUI), rather than just the core:

```python
from pycromanager import Core, Acquisition

core = Core()
core.snap_image()
img = core.get_image()
```

pycro-manager is particularly useful for complex acquisitions that need GUI features like the data pipeline.

---

## 27. Custom Acquisition Sequences

### When to use custom sequences

Custom acquisition scripts are needed when the standard MDA does not support your protocol. Examples:

- Triggered acquisition synchronised with external stimuli (e.g. osmotic shock, Yoda1 application)
- Adaptive acquisition (e.g. acquire faster when activity is detected)
- Complex illumination patterns (e.g. FRAP, photoactivation)

### Example: Stimulus-triggered PIEZO1 activity recording

```java
// BeanShell: Record baseline, apply Yoda1, then record response
int baselineFrames = 3000;  // 15 s at 200 fps
int responseFrames = 6000;  // 30 s at 200 fps

mmc.setExposure(5.0);  // 200 fps

// Record baseline
gui.message("Recording baseline...");
mmc.startSequenceAcquisition(baselineFrames, 0, true);
while (mmc.isSequenceRunning()) {
    Thread.sleep(10);
}
gui.message("Baseline complete. Apply Yoda1 now!");

// Pause for drug application
Thread.sleep(60000);  // 60 s for drug equilibration

// Record response
gui.message("Recording response...");
mmc.startSequenceAcquisition(responseFrames, 0, true);
while (mmc.isSequenceRunning()) {
    Thread.sleep(10);
}
gui.message("Acquisition complete.");
```

---

## 28. Triggered Acquisition and Hardware Synchronisation

### Internal vs. external triggering

| Trigger mode | Description | Use case |
|---|---|---|
| **Internal** | Camera runs at its own clock | Standard acquisitions |
| **External** | Camera waits for a TTL pulse | Synchronised with stimuli |
| **Software** | Each frame is triggered by software | Precise timing control |

### Hardware-triggered streaming

For the fastest and most reliable high-speed acquisition, use the camera's internal trigger in continuous streaming mode:

```java
// Set camera to internal trigger, continuous mode
mmc.setProperty("Camera", "TriggerSource", "Internal");
mmc.startSequenceAcquisition(10000, 0, true);
```

### External trigger for stimulus synchronisation

To synchronise acquisition with external devices (e.g. a perfusion system for Yoda1 application):

1. Connect the trigger output of the stimulus controller to the camera's external trigger input
2. Set the camera to external trigger mode:
   ```java
   mmc.setProperty("Camera", "TriggerSource", "External");
   ```
3. Start the acquisition; frames will be acquired only when trigger pulses arrive

---

## 29. Workflow 1: TIRF Time-Lapse of PIEZO1-HaloTag Puncta

This workflow reproduces the TIRF acquisition used for PIEZO1-HaloTag diffusion analysis in Bertaccini et al. (2025).

### Step 1: Prepare the sample

1. Label PIEZO1-HaloTag cells with 500 pM JF646 HTL overnight (see paper Methods)
2. Wash 5× with DMEM/F12
3. Add imaging solution (148 mM NaCl, 3 mM CaCl₂, 1 mM KCl, 2 mM MgCl₂, 8 mM Glucose, 10 mM HEPES, pH 7.30)
4. Place MatTek dish on the pre-warmed (37 °C) stage

### Step 2: Configure Micro-Manager

1. Load the TIRF configuration: `MMConfig_TIRF_IX83.cfg`
2. Select the "JF646-TIRF" channel preset
3. Set exposure to 100 ms (10 fps)
4. Verify camera ROI is full sensor (2048 × 2048)

### Step 3: Find and focus on cells

1. Use brightfield Live view to find cells
2. Switch to JF646-TIRF and briefly check fluorescence
3. Adjust TIRF angle for optimal puncta contrast
4. Mark positions of 10–20 cells in the Position List

### Step 4: Set up Multi-Dimensional Acquisition

```
Time Points: 1200 frames
Interval: 0 ms (as fast as possible → 10 fps)
Channels: JF646-TIRF (single channel)
Z: none (TIRF = single plane)
Positions: 10-20 cells
Save: checked
Directory: D:\Data\YYYYMMDD_EC_JF646\
Name: EC_JF646_10fps
```

### Step 5: Acquire

1. Click **Acquire!**
2. Monitor the display for focus drift or stage problems
3. Acquisition time: ~2 min per cell × 15 cells = ~30 min total

### Step 6: Downstream analysis

1. Open the acquired TIFF stacks in FIJI
2. Run ThunderSTORM for super-resolution localization of PIEZO1 puncta
3. Export localization tables
4. Import into FLIKA for trajectory linking and diffusion analysis

---

## 30. Workflow 2: Multi-Channel Acquisition (PIEZO1 + Actin + Nuclei)

### Purpose

Acquire multi-channel images to overlay PIEZO1 localization with actin and nuclear staining, as done for organoid imaging in Bertaccini et al. (2025).

### Channel configuration

| Channel | Laser | Probe | Exposure | Purpose |
|---|---|---|---|---|
| 1 | 640 nm | JF646 HTL | 100 ms | PIEZO1 localization |
| 2 | 560 nm | SPY555-actin | 200 ms | Actin cytoskeleton |
| 3 | 405 nm | Hoechst | 50 ms | Nuclei |

### MDA settings

```
Channels: JF646-TIRF, SPY555-actin, Hoechst
Time: 1 frame (fixed sample) or 60 frames (live)
Z: 1 plane (TIRF) or z-stack (confocal/widefield)
Positions: Multiple cells/MNRs
Order: Position > Channel
```

### Notes

- Acquire the most photosensitive channel first (JF646 for PIEZO1)
- Keep laser exposure to a minimum for live samples
- For fixed samples, order does not matter

---

## 31. Workflow 3: High-Speed Acquisition for Channel Activity (200–500 fps)

This workflow reproduces the high-speed TIRF recordings used to resolve PIEZO1 channel gating in Bertaccini et al. (2025), where transitions were complete within 2 frames at 500 fps (4 ms time resolution).

### Step 1: Configure for speed

```
Camera: Hamamatsu ORCA-Fusion BT
Exposure: 5 ms (200 fps) or 2 ms (500 fps)
ROI: Reduce to 2048 × 1024 (200 fps) or 2048 × 512 (500 fps)
Readout: Standard mode (not Ultra-quiet — speed takes priority)
Laser: 640 nm at 12 mW (200 fps) or 20.5 mW (500 fps)
```

### Step 2: Increase laser power

Higher frame rates mean shorter exposures and fewer photons per frame. Compensate by increasing laser power, but be aware this also increases photobleaching.

### Step 3: Use Sequence Acquisition

For maximum frame rate consistency, use BeanShell sequence acquisition:

```java
int nFrames = 5000;
mmc.setExposure(2.0);  // 500 fps
mmc.startSequenceAcquisition(nFrames, 0, true);

while (mmc.isSequenceRunning()) {
    Thread.sleep(100);
}

gui.message("Acquired " + nFrames + " frames at 500 fps");
```

### Step 4: Verify frame timing

After acquisition, check the frame timestamps in the metadata to confirm the achieved frame rate:

```python
# In Python, after loading the data
import tifffile
with tifffile.TiffFile("movie.tif") as tif:
    for i, page in enumerate(tif.pages[:5]):
        print(f"Frame {i}: {page.tags.get('DateTime', 'N/A')}")
```

---

## 32. Workflow 4: Multi-Position Tiling for Organoids

### Purpose

Acquire a mosaic of overlapping tiles to cover an entire Micropatterned Neural Rosette (MNR) for wide-field or confocal analysis.

### Setting up the tile grid

1. Navigate to the centre of the MNR
2. In the Position List, use **Create Grid** to define a tile pattern:
   - Grid size: 3 × 3 or 4 × 4 tiles
   - Overlap: 10% (for stitching)
   - Pixel size and field of view determine tile spacing

### Stitching

After acquisition, stitch the tiles using FIJI's stitching plugin:

```
Plugins > Stitching > Grid/Collection Stitching
```

Or use BigStitcher for larger datasets.

---

## 33. Workflow 5: Brightfield + Fluorescence Overlay

### Purpose

Acquire a brightfield image of cell morphology alongside TIRF fluorescence images of PIEZO1-HaloTag.

### Procedure

1. Configure two channels:
   - Channel 1: Brightfield (transmitted LED, DIC cube, 50 ms)
   - Channel 2: JF646-TIRF (640 nm laser, Cy5 cube, 100 ms)
2. Acquire both channels at each position
3. In FIJI, overlay the brightfield and fluorescence images to correlate PIEZO1 localization with cell morphology

---

## 34. Performance Tips for Large and Fast Acquisitions

### Disk write speed

High-speed acquisitions generate data faster than many disks can write:

| Frame rate | Image size | Data rate |
|---|---|---|
| 10 fps | 2048 × 2048 × 16-bit | ~80 MB/s |
| 100 fps | 2048 × 2048 × 16-bit | ~800 MB/s |
| 200 fps | 2048 × 1024 × 16-bit | ~800 MB/s |
| 500 fps | 2048 × 512 × 16-bit | ~1 GB/s |

**Recommendations:**

- Use **NVMe SSD** (3+ GB/s write speed) for high-speed acquisition
- Use **RAID 0** arrays of NVMe drives for sustained write speeds >2 GB/s
- Set the Micro-Manager save directory to the fast drive
- Increase the sequence buffer size (RAM) to absorb bursts

### Buffer size

Set the sequence buffer to at least 2× the acquisition duration:

```
Tools > Options > Sequence Buffer Size (MB): 4096
```

For a 10 s acquisition at 500 fps with 2048 × 512 × 16-bit frames:
- Frame size: ~2 MB
- Total: 5000 × 2 MB = 10 GB → set buffer to at least 10 GB if available

### Closing unused devices

Devices that are not in use during high-speed acquisition (e.g. filter wheels, stage controllers) can be set to their positions before acquisition and then ignored. This minimises communication overhead.

---

## 35. Common Problems and Solutions

### "Camera busy" error

**Cause:** A previous acquisition is still running or the camera buffer is full.
**Fix:** Click **Stop** in the main window. If that fails, restart Micro-Manager.

### Dropped frames during high-speed acquisition

**Cause:** Disk write speed cannot keep up with data rate.
**Fix:** Increase buffer size, use a faster SSD, reduce camera ROI, or reduce frame rate.

### TIRF angle drifts during acquisition

**Cause:** Thermal expansion of the microscope body or objective.
**Fix:** Allow the system to thermally equilibrate for ≥1 hour with the environmental enclosure at 37 °C before imaging.

### Images appear dark or overexposed

**Cause:** Incorrect exposure, laser power, or display range.
**Fix:** Check the histogram and adjust display range. Verify laser power settings. Confirm the correct filter cube is in place.

### Hardware not responding

**Cause:** Serial port communication failure.
**Fix:**
1. Check cable connections
2. Verify COM port assignment in Device Manager (Windows)
3. Restart the device
4. Reload the configuration

### Out of memory error

**Cause:** Acquired data exceeds available RAM.
**Fix:** Save images to disk instead of holding in memory. Increase Java heap size in the startup script:
```
-Xmx16G    (set maximum heap to 16 GB)
```

### Stage position is wrong after resuming

**Cause:** Stage position was not updated after a manual move.
**Fix:** Always use Micro-Manager's controls (not the joystick) for position tracking, or home/zero the stage before critical multi-position experiments.

---

## 36. Micro-Manager vs. Proprietary Software

| Feature | Micro-Manager | NIS-Elements | MetaMorph | cellSens |
|---|---|---|---|---|
| **Cost** | Free | $$$$ | $$$$ | $$$ |
| **Hardware support** | 300+ devices | Nikon only | Broad | Olympus only |
| **Scripting** | BeanShell, Python | NIS macros | Journals | Macros |
| **ImageJ integration** | Built-in | Export only | Export only | Export only |
| **Open source** | Yes | No | No | No |
| **Custom protocols** | Fully programmable | Limited | Moderate | Limited |
| **Support** | Community (image.sc) | Vendor | Vendor | Vendor |
| **Best for** | Flexible research setups | Nikon users | Historical workflows | Olympus users |

Micro-Manager's key advantages for our lab are its open-source nature, Python integration for analysis pipelines, and ability to control hardware from multiple vendors on a single microscope.

---

## 37. Keyboard Shortcuts Quick Reference

| Shortcut | Action |
|---|---|
| **Ctrl+Shift+S** | Snap image |
| **Ctrl+Shift+L** | Toggle Live view |
| **Ctrl+Shift+A** | Open MDA window |
| **Ctrl+Shift+E** | Open Script Panel |
| **Ctrl+Shift+P** | Open Device Property Browser |
| **F** | Full frame (reset camera ROI) |
| **+/−** | Zoom in/out on display |
| **Arrow keys** | Pan the display |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in using Micro-Manager for microscopy acquisition. For questions or suggestions, contact george.dickinson@gmail.com.*

*When using Micro-Manager in published research, please cite: Edelstein et al., Current Protocols in Molecular Biology, Chapter 14, Unit 14.20, 2010.*
