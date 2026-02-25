# Java Manual for Biology Researchers

**A Comprehensive Guide for Graduate Students and Scientists**

*Developed for the PIEZO1 Research Group*

George Dickinson | george.dickinson@gmail.com

---

## Table of Contents

**Part I: Getting Started**

1. [Introduction: Why Learn Java?](#1-introduction-why-learn-java)
2. [Setting Up Your Java Environment](#2-setting-up-your-java-environment)
3. [Your First Java Program](#3-your-first-java-program)
4. [How Java Works: Compile, Run, Repeat](#4-how-java-works-compile-run-repeat)

**Part II: Java Fundamentals**

5. [Variables and Data Types](#5-variables-and-data-types)
6. [Operators](#6-operators)
7. [Strings](#7-strings)
8. [Type Conversions and Casting](#8-type-conversions-and-casting)
9. [Control Flow: if, else, switch](#9-control-flow-if-else-switch)
10. [Loops: for, while, for-each](#10-loops-for-while-for-each)
11. [Arrays](#11-arrays)
12. [Methods (Functions)](#12-methods-functions)

**Part III: Object-Oriented Programming**

13. [Classes and Objects](#13-classes-and-objects)
14. [Constructors and the `this` Keyword](#14-constructors-and-the-this-keyword)
15. [Encapsulation: Access Modifiers and Getters/Setters](#15-encapsulation-access-modifiers-and-getterssetters)
16. [Inheritance and Polymorphism](#16-inheritance-and-polymorphism)
17. [Abstract Classes and Interfaces](#17-abstract-classes-and-interfaces)
18. [Enums and Records](#18-enums-and-records)

**Part IV: Collections and Data Structures**

19. [The Collections Framework: Lists, Sets, and Maps](#19-the-collections-framework-lists-sets-and-maps)
20. [Iterating Over Collections](#20-iterating-over-collections)
21. [Sorting and Comparing](#21-sorting-and-comparing)

**Part V: Robust Code**

22. [Exception Handling: try, catch, finally](#22-exception-handling-try-catch-finally)
23. [File Input/Output](#23-file-inputoutput)
24. [Common Errors and How to Fix Them](#24-common-errors-and-how-to-fix-them)
25. [Debugging in an IDE](#25-debugging-in-an-ide)

**Part VI: Intermediate Java**

26. [Generics](#26-generics)
27. [Lambda Expressions and Functional Interfaces](#27-lambda-expressions-and-functional-interfaces)
28. [The Stream API](#28-the-stream-api)
29. [Working with Dates and Times](#29-working-with-dates-and-times)
30. [String Formatting and Text Blocks](#30-string-formatting-and-text-blocks)

**Part VII: Building and Managing Projects**

31. [Packages and Imports](#31-packages-and-imports)
32. [Build Tools: Maven and Gradle](#32-build-tools-maven-and-gradle)
33. [JAR Files and Running Programs](#33-jar-files-and-running-programs)
34. [Project Structure and Best Practices](#34-project-structure-and-best-practices)

**Part VIII: Java in Bioinformatics**

35. [Java's Role in Bioinformatics](#35-javas-role-in-bioinformatics)
36. [htsjdk: Reading BAM, SAM, VCF, and BED Files](#36-htsjdk-reading-bam-sam-vcf-and-bed-files)
37. [BioJava: Sequences, Alignments, and Structures](#37-biojava-sequences-alignments-and-structures)
38. [Using GATK and Picard as Libraries](#38-using-gatk-and-picard-as-libraries)
39. [ImageJ/FIJI Plugins in Java](#39-imagejfiji-plugins-in-java)
40. [Calling Java from Python and R](#40-calling-java-from-python-and-r)

**Part IX: Practical Examples**

41. [Practical Examples for Biology Research](#41-practical-examples-for-biology-research)

**Appendices**

42. [Java vs. Python: When to Use Which](#42-java-vs-python-when-to-use-which)
43. [Java Reserved Words](#43-java-reserved-words)
44. [Quick Reference](#44-quick-reference)

---

## 1. Introduction: Why Learn Java?

### What is Java?

Java is a general-purpose, object-oriented programming language created by **James Gosling** at **Sun Microsystems** in 1995. Sun was later acquired by **Oracle Corporation** in 2010. Java's original motto was **"Write Once, Run Anywhere"** --- code compiled on one platform runs unchanged on any other, because it executes on the **Java Virtual Machine (JVM)** rather than directly on the hardware.

Java is currently on version **25** (released September 2025), which is a **Long-Term Support (LTS)** release. The previous LTS versions (8, 11, 17, 21) remain widely deployed. New versions are released every six months, but most organisations track LTS releases for stability.

### Why Java matters for biology researchers

You might never write a Java application from scratch, but understanding Java is important because **many of the most critical bioinformatics tools are written in Java**:

| Tool | What it does | Why you should care |
|---|---|---|
| **GATK** (Genome Analysis Toolkit) | Variant calling, genotyping, somatic mutation analysis | The gold standard for genomic variant discovery |
| **Picard** | BAM/SAM manipulation, quality metrics, duplicate marking | Essential preprocessing for sequencing pipelines |
| **IGV** (Integrative Genomics Viewer) | Genome browser | Visualise alignments, variants, and annotations |
| **ImageJ / FIJI** | Image analysis | The standard in microscopy --- plugins are written in Java |
| **ThunderSTORM** | Single-molecule localisation microscopy | FIJI plugin for SMLM reconstruction (used for PIEZO1-HaloTag imaging; Bertaccini et al. 2025) |
| **MicroManager** | Microscope hardware control | Java-based acquisition software for TIRF and other modalities |
| **Bio-Formats** | Proprietary image file readers | Java library for reading Nikon .nd2, Zeiss .czi, and dozens of other formats |
| **CellProfiler** (parts) | Cell image analysis | Uses Java under the hood via Java-Python bridges |
| **FastQC** | Sequencing quality control | Generates quality reports from FASTQ files |
| **Trimmomatic** | Adapter trimming for sequencing reads | Pre-processing Illumina data |
| **BioJava** | Sequence analysis, alignments, structures | The core bioinformatics library for Java |
| **Nextflow** (JVM-based) | Workflow management | Pipelines run on the JVM |

Even if you primarily use Python or R, knowing Java lets you: read and modify source code for these tools, write ImageJ/FIJI plugins, understand error messages and stack traces, and extend bioinformatics pipelines when needed.

> **Lab context:** In Bertaccini et al. 2025 (*Nature Communications*), the PIEZO1-HaloTag single-molecule imaging pipeline relies on multiple Java-based tools: ImageJ 2.9.0/1.53t for image processing, ThunderSTORM for single-molecule localisation, Bio-Formats for reading proprietary microscopy files, and MicroManager 2.0 for TIRF microscope control during acquisition. Understanding Java helps you customise these tools, troubleshoot errors, and build analysis macros for PIEZO1 imaging workflows.

### Java's strengths and limitations

| Strength | Detail |
|---|---|
| **Performance** | Compiled to bytecode, then JIT-compiled to native code. Much faster than Python for CPU-intensive tasks. |
| **Type safety** | Compile-time type checking catches errors before you run the program. |
| **Cross-platform** | Same `.class` files run on Windows, macOS, and Linux via the JVM. |
| **Massive ecosystem** | Over 500,000 libraries on Maven Central. |
| **Enterprise-grade** | Robust threading, garbage collection, and memory management. |
| **Long-term stability** | Code written 20 years ago still compiles and runs. |

| Limitation | Detail |
|---|---|
| **Verbose syntax** | Java requires more boilerplate than Python (though recent versions have reduced this significantly). |
| **No REPL by default** | No interactive line-by-line execution (though `jshell` was added in Java 9). |
| **Not designed for quick scripts** | Python is better for one-off data analysis and quick scripting. |
| **Steeper learning curve** | OOP concepts (classes, inheritance, interfaces) are not optional in Java. |
| **Weaker data science ecosystem** | Python's NumPy/pandas/matplotlib ecosystem has no direct equivalent. |

### The recipe analogy

| Cooking | Java |
|---|---|
| Your recipe / instructions | Your `.java` source file |
| The language (English) | Java syntax rules |
| Translating the recipe into a universal cookbook format | **Compiling** to bytecode (`.class` files) |
| The chef reading the universal cookbook | The **JVM** (Java Virtual Machine) |
| Kitchen equipment | Libraries (htsjdk, BioJava, etc.) |
| The finished dish | Your results |

The key difference from Python: Java has an **extra translation step** (compilation) before the code can run.

---

## 2. Setting Up Your Java Environment

### Step 1: Install the JDK

The **JDK** (Java Development Kit) includes everything you need: the compiler (`javac`), the runtime (`java`), and standard libraries.

**Recommended:** Install the latest LTS version (JDK 25 as of late 2025). If you need to match a specific tool (e.g., GATK requires JDK 17+), install that version.

> **ImageJ/FIJI note:** FIJI bundles its own Java runtime (Java 1.8.0_322 as of ImageJ 2.9.0/1.53t, the versions used in Bertaccini et al. 2025). You do not need to install a separate JDK to run FIJI, but you will need JDK 8+ on your system PATH if you want to compile custom plugins from the command line. If you also use GATK or other tools requiring JDK 17+, use a version manager like SDKMAN (`sdk install java 8.0.322-tem` / `sdk install java 25.0.2-tem`) to switch between versions as needed.

**Download options:**

| Provider | URL | Notes |
|---|---|---|
| **Oracle JDK** | https://www.oracle.com/java/technologies/downloads/ | Free for development and production since JDK 17 |
| **Eclipse Adoptium (Temurin)** | https://adoptium.net/ | Free, open-source, community-supported. Recommended. |
| **Amazon Corretto** | https://aws.amazon.com/corretto/ | Free, Amazon-supported OpenJDK build |
| **Azul Zulu** | https://www.azul.com/downloads/ | Free community builds |

All of these are builds of **OpenJDK** (the open-source reference implementation) and are functionally equivalent. Adoptium Temurin is the most common choice for researchers.

**macOS (with Homebrew):**
```bash
brew install --cask temurin
```

**Ubuntu/Debian:**
```bash
sudo apt install openjdk-25-jdk
```

**Windows:** Download the installer from Adoptium and follow the wizard.

### Step 2: Verify installation

Open a terminal (or Command Prompt on Windows) and type:

```bash
java --version
# openjdk 25.0.2 2026-01-21
# OpenJDK Runtime Environment Temurin-25.0.2+9 (build 25.0.2+9)
# OpenJDK 64-Bit Server VM Temurin-25.0.2+9 (build 25.0.2+9, mixed mode)

javac --version
# javac 25.0.2
```

If you see version information, Java is installed correctly. If you get "command not found", ensure the JDK's `bin/` directory is in your system's `PATH`.

### Step 3: Choose an IDE

| IDE | Best for | Notes |
|---|---|---|
| **IntelliJ IDEA Community** | General Java development | Free. The gold standard Java IDE. Excellent refactoring, debugging, and code completion. |
| **Eclipse** | Legacy and bioinformatics projects | Free. Long history in Java development. ImageJ plugin development often uses Eclipse. |
| **VS Code** | Lightweight, multi-language | Free. Install the "Extension Pack for Java" by Microsoft. Good if you already use VS Code for Python. |

**For beginners:** IntelliJ IDEA Community Edition is strongly recommended. Its code completion, error highlighting, and debugger are unmatched.

**Download IntelliJ IDEA Community:** https://www.jetbrains.com/idea/download/ (scroll down to the free Community Edition)

---

## 3. Your First Java Program

### The classic Hello World

Create a file called `HelloWorld.java`:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, PIEZO1 research group!");
    }
}
```

**Compile and run:**
```bash
javac HelloWorld.java    # creates HelloWorld.class
java HelloWorld          # runs the program
# Output: Hello, PIEZO1 research group!
```

### Understanding every word

| Code | Meaning |
|---|---|
| `public` | This class/method is visible to everyone |
| `class HelloWorld` | Defines a class named `HelloWorld` (must match the filename) |
| `static` | This method belongs to the class itself, not to an instance |
| `void` | This method returns nothing |
| `main(String[] args)` | The entry point. `args` holds command-line arguments. |
| `System.out.println()` | Print a line to the console |

That is a lot of machinery for a one-line program. This is Java's main tradeoff: **more structure up front, but that structure pays off as programs grow**.

### The modern way: Compact Source Files (Java 25+)

Java 25 introduced **compact source files** that dramatically simplify small programs:

```java
// HelloModern.java — no class declaration needed!
void main() {
    println("Hello, PIEZO1 research group!");
}
```

```bash
java HelloModern.java    # compiles and runs in one step
```

This is much closer to Python's simplicity. The compiler wraps your code in a class automatically. Use this for quick scripts and learning; use the full syntax for real projects.

### jshell: Java's interactive mode

`jshell` lets you type Java expressions one at a time, like Python's interactive mode:

```bash
jshell
|  Welcome to JShell
|  For an introduction type: /help intro

jshell> int x = 42;
x ==> 42

jshell> System.out.println("x squared is " + (x * x));
x squared is 1764

jshell> Math.sqrt(144)
$3 ==> 12.0

jshell> /exit
```

`jshell` is excellent for testing small snippets. It was added in Java 9.

---

## 4. How Java Works: Compile, Run, Repeat

### The two-step process

```
Source code (.java)  →  javac (compiler)  →  Bytecode (.class)  →  java (JVM)  →  Output
```

1. **You write** `MyProgram.java` (human-readable source code)
2. **`javac` compiles** it to `MyProgram.class` (platform-independent bytecode)
3. **`java` runs** the bytecode on the JVM (which translates it to native machine code)

### Why the extra step?

Python interprets source code directly. Java adds a compilation step because:

- The compiler catches many errors **before** you run the program (type mismatches, missing methods, syntax errors). This is a huge benefit for large codebases.
- Compiled bytecode runs **much faster** than interpreted Python.
- The same `.class` file runs on any platform with a JVM installed.

### Python vs. Java workflow

| Step | Python | Java |
|---|---|---|
| Write code | `analysis.py` | `Analysis.java` |
| Run | `python analysis.py` | `javac Analysis.java` then `java Analysis` |
| Error checking | At runtime (crashes when it hits the bug) | At compile time (many bugs caught before running) |
| Speed | Interpreted (slow loops) | JIT-compiled (fast loops) |

---

## 5. Variables and Data Types

### Declaring variables

In Java, you **must declare the type** of every variable. This is the biggest difference from Python.

```java
// Java: you must say what type each variable is
int frameCount = 500;
double pixelSize = 0.107;
String filename = "calcium_imaging.tif";
boolean isControl = true;

// Python equivalent (for comparison):
// frame_count = 500        ← no type declaration needed
// pixel_size = 0.107
// filename = "calcium_imaging.tif"
// is_control = True
```

### var: Type inference (Java 10+)

When the type is obvious from the right-hand side, you can use `var`:

```java
var frameCount = 500;           // compiler infers int
var pixelSize = 0.107;          // compiler infers double
var filename = "calcium.tif";   // compiler infers String
var scores = new ArrayList<Double>();  // compiler infers ArrayList<Double>
```

`var` only works for **local variables** (inside methods), not for class fields or method parameters.

### Primitive types

Java has eight **primitive types** --- these hold raw values directly in memory and are extremely fast:

| Type | Size | Range | Example | Use for |
|---|---|---|---|---|
| `byte` | 8 bits | −128 to 127 | `byte b = 100;` | Raw byte data |
| `short` | 16 bits | −32,768 to 32,767 | `short s = 1000;` | Rarely used |
| `int` | 32 bits | −2.1 billion to 2.1 billion | `int n = 42;` | Most integer values |
| `long` | 64 bits | ±9.2 × 10^18 | `long big = 10_000_000_000L;` | Very large integers (note the `L` suffix) |
| `float` | 32 bits | ~7 decimal digits | `float f = 3.14f;` | Rarely used (note the `f` suffix) |
| `double` | 64 bits | ~15 decimal digits | `double d = 3.14159;` | All decimal numbers |
| `char` | 16 bits | Single Unicode character | `char c = 'A';` | Single characters |
| `boolean` | 1 bit* | `true` or `false` | `boolean ok = true;` | Logical values |

**Key rules:**
- `int` is the default for whole numbers
- `double` is the default for decimal numbers
- Use `L` suffix for `long` literals: `10_000_000_000L`
- Use `f` suffix for `float` literals: `3.14f`
- Underscores can separate digit groups for readability: `1_000_000`

### Wrapper classes and autoboxing

Each primitive has a corresponding **wrapper class** (an object version):

| Primitive | Wrapper | When to use the wrapper |
|---|---|---|
| `int` | `Integer` | When you need to store primitives in collections (`ArrayList<Integer>`) |
| `double` | `Double` | Collections, or when you need `null` as a value |
| `boolean` | `Boolean` | Collections |
| `char` | `Character` | Collections |
| `long` | `Long` | Collections |

Java automatically converts between primitives and wrappers (**autoboxing**):

```java
int x = 42;
Integer boxed = x;       // autoboxing: int → Integer
int unboxed = boxed;     // unboxing: Integer → int

ArrayList<Integer> list = new ArrayList<>();
list.add(42);            // autoboxing happens automatically
int val = list.get(0);   // unboxing happens automatically
```

### Constants

Use `final` to declare a constant (like `const` in other languages):

```java
final double PIXEL_SIZE_UM = 0.107;
final int MAX_FRAMES = 10000;
final String LAB_NAME = "Pathak Lab";

// Convention: UPPER_SNAKE_CASE for constants
```

---

## 6. Operators

### Arithmetic operators

```java
int a = 17, b = 5;

a + b    // 22   addition
a - b    // 12   subtraction
a * b    // 85   multiplication
a / b    // 3    integer division (truncates!)
a % b    // 2    modulus (remainder)

// CAUTION: integer division truncates
System.out.println(17 / 5);     // 3  (not 3.4!)
System.out.println(17.0 / 5);   // 3.4 (one operand is double → result is double)
System.out.println((double) 17 / 5);  // 3.4 (cast to double first)
```

### Comparison operators

```java
a == b    // equal to
a != b    // not equal to
a > b     // greater than
a < b     // less than
a >= b    // greater than or equal to
a <= b    // less than or equal to
```

### Logical operators

```java
true && false   // false  (AND)
true || false   // true   (OR)
!true           // false  (NOT)

// Short-circuit: Java stops evaluating as soon as the result is known
// This is safe even if list is null:
if (list != null && list.size() > 0) { ... }
```

### Increment and decrement

```java
int i = 5;
i++;     // i is now 6 (post-increment)
i--;     // i is now 5 (post-decrement)
++i;     // i is now 6 (pre-increment)

// Compound assignment
i += 10;   // i = i + 10
i *= 2;    // i = i * 2
i /= 3;   // i = i / 3
```

### Math class

```java
Math.abs(-5)              // 5
Math.max(10, 20)          // 20
Math.min(10, 20)          // 10
Math.sqrt(144)            // 12.0
Math.pow(2, 10)           // 1024.0
Math.log(Math.E)          // 1.0 (natural log)
Math.log10(1000)          // 3.0
Math.ceil(3.2)            // 4.0
Math.floor(3.8)           // 3.0
Math.round(3.5)           // 4 (long)
Math.PI                   // 3.141592653589793
Math.E                    // 2.718281828459045
Math.random()             // random double in [0.0, 1.0)
```

---

## 7. Strings

### Creating strings

```java
String gene = "PIEZO1";
String filename = "calcium_trace_001.csv";
String empty = "";
```

### Common string operations

```java
String s = "PIEZO1-GFP";

s.length()                  // 10
s.charAt(0)                 // 'P'
s.substring(0, 6)           // "PIEZO1"
s.indexOf("GFP")            // 7
s.contains("GFP")           // true
s.startsWith("PIEZO")       // true
s.endsWith(".tif")          // false
s.toUpperCase()             // "PIEZO1-GFP"
s.toLowerCase()             // "piezo1-gfp"
s.trim()                    // remove leading/trailing whitespace
s.strip()                   // same but handles Unicode whitespace (Java 11+)
s.replace("GFP", "mCherry") // "PIEZO1-mCherry"
s.isEmpty()                 // false
s.isBlank()                 // false (Java 11+, true for whitespace-only strings)
```

### String concatenation

```java
// The + operator
String result = "Cell " + 42 + " intensity: " + 1524.7;
// "Cell 42 intensity: 1524.7"

// String.format() — like Python's % formatting or C's printf
String msg = String.format("Cell %d: intensity = %.2f", 42, 1524.7);
// "Cell 42: intensity = 1524.70"

// Common format specifiers:
// %d    integer
// %f    floating point (%.2f for 2 decimal places)
// %s    string
// %e    scientific notation
// %n    platform-independent newline
```

### Comparing strings

```java
// CRITICAL: Use .equals(), NEVER ==
String a = "PIEZO1";
String b = "PIEZO1";
String c = new String("PIEZO1");

a == b       // true  (only because Java caches string literals — unreliable!)
a == c       // false (different objects in memory!)
a.equals(c)  // true  (correct — compares the characters)

// Case-insensitive comparison
a.equalsIgnoreCase("piezo1")  // true
```

**Rule: Always use `.equals()` to compare strings.** The `==` operator compares memory addresses, not content. This is one of the most common Java mistakes.

### Splitting and joining

```java
String line = "cell_01,1524,control";
String[] parts = line.split(",");
// parts[0] = "cell_01", parts[1] = "1524", parts[2] = "control"

String joined = String.join(",", "cell_01", "1524", "control");
// "cell_01,1524,control"

String joined2 = String.join("\t", parts);
// "cell_01\t1524\tcontrol"
```

### String immutability

Strings in Java are **immutable** --- every operation creates a new string. For building strings in a loop, use `StringBuilder`:

```java
// Slow (creates many intermediate string objects)
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i + ",";  // creates a new string every iteration!
}

// Fast (modifies a buffer in place)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i).append(",");
}
String result = sb.toString();
```

---

## 8. Type Conversions and Casting

### Widening (safe, automatic)

Going from a smaller type to a larger type is safe and happens automatically:

```java
int i = 42;
double d = i;     // 42.0 — automatic widening
// byte → short → int → long → float → double
```

### Narrowing (potentially lossy, requires explicit cast)

Going from a larger type to a smaller type may lose information and requires a cast:

```java
double d = 3.99;
int i = (int) d;      // 3 — truncates, does NOT round!

int big = 130;
byte b = (byte) big;  // -126 — overflow! (130 exceeds byte range)
```

### Parsing strings to numbers

```java
int n = Integer.parseInt("42");
double d = Double.parseDouble("3.14");
long l = Long.parseLong("10000000000");

// Number to string
String s = String.valueOf(42);           // "42"
String s2 = Integer.toString(42);        // "42"
String s3 = Double.toString(3.14);       // "3.14"
```

---

## 9. Control Flow: if, else, switch

### if / else if / else

```java
double intensity = 1500.0;

if (intensity > 2000) {
    System.out.println("Bright");
} else if (intensity > 1000) {
    System.out.println("Medium");
} else {
    System.out.println("Dim");
}

// Note: braces {} are technically optional for single statements,
// but ALWAYS use them. Omitting them causes subtle bugs.
```

### Ternary operator

```java
// condition ? valueIfTrue : valueIfFalse
String category = (intensity > 1500) ? "bright" : "dim";
```

### switch (traditional)

```java
String condition = "Drug_A";

switch (condition) {
    case "Control":
        System.out.println("Vehicle only");
        break;                             // break is required!
    case "Drug_A":
        System.out.println("10 µM Yoda1");
        break;
    case "Drug_B":
        System.out.println("1 µM Jedi1");
        break;
    default:
        System.out.println("Unknown condition");
}
```

### switch expressions (Java 14+, modern style)

```java
String description = switch (condition) {
    case "Control" -> "Vehicle only";
    case "Drug_A"  -> "10 µM Yoda1";
    case "Drug_B"  -> "1 µM Jedi1";
    default        -> "Unknown condition";
};
// No break needed with arrow syntax!
```

---

## 10. Loops: for, while, for-each

### for loop

```java
// Classic C-style for loop
for (int i = 0; i < 10; i++) {
    System.out.println("Frame " + i);
}

// Note: starts at 0 (not 1 like MATLAB/R)
```

### for-each loop (enhanced for)

```java
String[] conditions = {"Control", "Drug_A", "Drug_B"};

for (String cond : conditions) {
    System.out.println("Processing: " + cond);
}

// Works with any array or Iterable (ArrayList, HashSet, etc.)
```

### while loop

```java
int frame = 0;
while (frame < 500) {
    // process frame
    frame++;
}
```

### do-while loop

```java
// Executes at least once, then checks condition
int attempt = 0;
do {
    // try to load data
    attempt++;
} while (attempt < 3);
```

### break and continue

```java
for (int i = 0; i < 100; i++) {
    if (i == 50) break;       // exit the loop entirely
    if (i % 2 == 0) continue; // skip to the next iteration
    System.out.println(i);    // prints 1, 3, 5, ..., 49
}
```

---

## 11. Arrays

Arrays are fixed-size sequences of a single type.

### Creating arrays

```java
// Declare and initialise
int[] intensities = {1524, 1830, 1650, 1720, 1590};
double[] concentrations = {0.0, 0.1, 1.0, 10.0, 100.0};
String[] conditions = {"Control", "Drug_A", "Drug_B"};

// Declare with a fixed size (filled with zeros/null)
double[] trace = new double[500];   // 500 zeros
String[] names = new String[10];    // 10 nulls

// Access elements (0-indexed)
int first = intensities[0];        // 1524
int last = intensities[intensities.length - 1];  // 1590
intensities[2] = 1700;             // modify an element
```

### Array operations

```java
import java.util.Arrays;

int[] arr = {5, 3, 1, 4, 2};

arr.length                   // 5 (it is a field, not a method — no parentheses)
Arrays.sort(arr);            // sorts in place: {1, 2, 3, 4, 5}
Arrays.toString(arr);        // "[1, 2, 3, 4, 5]" (for printing)
Arrays.fill(arr, 0);         // set all elements to 0
int[] copy = Arrays.copyOf(arr, arr.length);  // copy an array

// 2D arrays (matrices)
double[][] matrix = new double[3][4];    // 3 rows, 4 columns
matrix[0][0] = 1.0;                      // first element
double[][] data = {
    {1.0, 2.0, 3.0},
    {4.0, 5.0, 6.0}
};
```

### Arrays vs. ArrayList

| Feature | `int[]` (array) | `ArrayList<Integer>` |
|---|---|---|
| Size | Fixed at creation | Grows dynamically |
| Primitives | Yes (`int[]`, `double[]`) | No (must use wrappers: `Integer`, `Double`) |
| Syntax | `arr[i]` | `list.get(i)` |
| Performance | Fastest | Slightly slower (boxing overhead) |
| Methods | Very few (use `Arrays` utility class) | Rich API (add, remove, contains, sort, etc.) |

**Rule of thumb:** Use arrays for fixed-size numeric data (image pixels, traces). Use `ArrayList` when you need to add/remove elements or when the size is unknown in advance.

---

## 12. Methods (Functions)

### Defining a method

```java
public class TraceAnalysis {

    // A method that takes a double array and returns a double
    public static double calculateMean(double[] values) {
        double sum = 0;
        for (double v : values) {
            sum += v;
        }
        return sum / values.length;
    }

    // A method that returns nothing (void)
    public static void printResult(String label, double value) {
        System.out.printf("%s: %.4f%n", label, value);
    }

    // A method with a default-like pattern (method overloading)
    public static double calculateDFF(double[] trace, int baselineFrames) {
        double f0 = calculateMean(Arrays.copyOf(trace, baselineFrames));
        double[] dff = new double[trace.length];
        for (int i = 0; i < trace.length; i++) {
            dff[i] = (trace[i] - f0) / f0;
        }
        return calculateMean(dff);
    }

    // Overloaded: same name, different parameters (acts like a default argument)
    public static double calculateDFF(double[] trace) {
        return calculateDFF(trace, 50);  // default: first 50 frames as baseline
    }

    public static void main(String[] args) {
        double[] trace = {1000, 1010, 1005, 1500, 1800, 2000, 1900};
        printResult("Mean", calculateMean(trace));
        printResult("dF/F (50-frame baseline)", calculateDFF(trace));
    }
}
```

### Method signature breakdown

```java
public  static  double  calculateMean  (double[] values)
  │       │       │          │                │
  │       │       │          │                └── parameters (input)
  │       │       │          └── method name
  │       │       └── return type (double, int, void, String, etc.)
  │       └── belongs to the class, not an instance
  └── accessible from anywhere
```

### Varargs (variable number of arguments)

```java
public static double mean(double... values) {
    double sum = 0;
    for (double v : values) sum += v;
    return sum / values.length;
}

// Call with any number of arguments
mean(1.0, 2.0, 3.0);
mean(1.0, 2.0, 3.0, 4.0, 5.0);
```

---

## 13. Classes and Objects

### Why classes?

In Python, you *can* use classes but you do not have to. In Java, **everything is a class**. Even a simple script is a method inside a class.

A class is a **blueprint** for creating objects. An object is an **instance** of a class --- a concrete thing in memory with its own data.

### Defining a class

```java
public class Cell {
    // Fields (instance variables) — the data each cell holds
    String id;
    double area;
    double meanIntensity;
    String condition;

    // Method — behaviour
    double calculateCTCF(double bgMean) {
        return meanIntensity * area - bgMean * area;
    }

    void printSummary() {
        System.out.printf("Cell %s: area=%.1f, intensity=%.1f%n",
                          id, area, meanIntensity);
    }
}
```

### Creating and using objects

```java
public class Main {
    public static void main(String[] args) {
        // Create a Cell object
        Cell c1 = new Cell();
        c1.id = "Cell_01";
        c1.area = 150.2;
        c1.meanIntensity = 1524.0;
        c1.condition = "Control";

        c1.printSummary();
        // Output: Cell Cell_01: area=150.2, intensity=1524.0

        double ctcf = c1.calculateCTCF(200.0);
        System.out.printf("CTCF: %.1f%n", ctcf);
    }
}
```

### The analogy

| Concept | Real-world analogy | Java |
|---|---|---|
| Class | Blueprint for a house | `class Cell { ... }` |
| Object | An actual house built from the blueprint | `Cell c1 = new Cell();` |
| Fields | Attributes of the house (colour, rooms, size) | `c1.area`, `c1.meanIntensity` |
| Methods | Things the house can do (open door, turn on lights) | `c1.calculateCTCF()` |

---

## 14. Constructors and the `this` Keyword

### Constructors

A constructor is a special method that runs when you create an object with `new`. It initialises the fields.

```java
public class Cell {
    String id;
    double area;
    double meanIntensity;
    String condition;

    // Constructor
    public Cell(String id, double area, double meanIntensity, String condition) {
        this.id = id;                     // this.id = the field; id = the parameter
        this.area = area;
        this.meanIntensity = meanIntensity;
        this.condition = condition;
    }

    // No-argument constructor
    public Cell() {
        this.id = "Unknown";
        this.area = 0.0;
        this.meanIntensity = 0.0;
        this.condition = "Unknown";
    }
}

// Usage
Cell c1 = new Cell("Cell_01", 150.2, 1524.0, "Control");
Cell c2 = new Cell();  // uses the no-argument constructor
```

### the `this` keyword

`this` refers to the **current object**. It is used to disambiguate when a parameter name matches a field name:

```java
this.area = area;   // this.area = field; area = parameter
```

---

## 15. Encapsulation: Access Modifiers and Getters/Setters

### Access modifiers

| Modifier | Class | Package | Subclass | World |
|---|---|---|---|---|
| `public` | Yes | Yes | Yes | Yes |
| `protected` | Yes | Yes | Yes | No |
| *(no modifier)* | Yes | Yes | No | No |
| `private` | Yes | No | No | No |

### Encapsulation in practice

Make fields `private` and provide `public` getter/setter methods. This lets you control how data is accessed and validated.

```java
public class Cell {
    private String id;
    private double area;
    private double meanIntensity;

    public Cell(String id, double area, double meanIntensity) {
        this.id = id;
        setArea(area);  // use setter for validation
        this.meanIntensity = meanIntensity;
    }

    // Getter
    public double getArea() {
        return area;
    }

    // Setter with validation
    public void setArea(double area) {
        if (area <= 0) {
            throw new IllegalArgumentException("Area must be positive: " + area);
        }
        this.area = area;
    }

    public String getId() { return id; }
    public double getMeanIntensity() { return meanIntensity; }
}
```

---

## 16. Inheritance and Polymorphism

### Inheritance

A class can **extend** another class, inheriting all of its fields and methods:

```java
// Parent class
public class Measurement {
    private String id;
    private double timestamp;

    public Measurement(String id, double timestamp) {
        this.id = id;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public double getTimestamp() { return timestamp; }

    public String describe() {
        return String.format("Measurement %s at t=%.1f", id, timestamp);
    }
}

// Child class
public class IntensityMeasurement extends Measurement {
    private double intensity;
    private String channel;

    public IntensityMeasurement(String id, double timestamp,
                                 double intensity, String channel) {
        super(id, timestamp);    // call parent constructor
        this.intensity = intensity;
        this.channel = channel;
    }

    // Override parent method
    @Override
    public String describe() {
        return String.format("%s [%s: %.1f]", super.describe(), channel, intensity);
    }

    public double getIntensity() { return intensity; }
}
```

### Polymorphism

A parent reference can hold a child object. The correct method is called based on the actual type at runtime:

```java
Measurement m = new IntensityMeasurement("M1", 0.5, 1524.0, "GFP");
System.out.println(m.describe());
// Output: Measurement M1 at t=0.5 [GFP: 1524.0]
// Calls IntensityMeasurement's describe(), not Measurement's
```

---

## 17. Abstract Classes and Interfaces

### Abstract classes

An abstract class provides a **partial implementation** that subclasses must complete:

```java
public abstract class ImageFilter {
    protected String name;

    public ImageFilter(String name) {
        this.name = name;
    }

    // Concrete method (shared by all filters)
    public void printInfo() {
        System.out.println("Filter: " + name);
    }

    // Abstract method (each filter must implement this)
    public abstract double[][] apply(double[][] image);
}

// Concrete implementation
public class GaussianFilter extends ImageFilter {
    private double sigma;

    public GaussianFilter(double sigma) {
        super("Gaussian (σ=" + sigma + ")");
        this.sigma = sigma;
    }

    @Override
    public double[][] apply(double[][] image) {
        // ... actual Gaussian blur implementation ...
        return image;  // placeholder
    }
}
```

### Interfaces

An interface defines a **contract** --- a set of methods that any implementing class must provide. A class can implement multiple interfaces (unlike inheritance, which is single in Java).

```java
public interface Measurable {
    double getArea();
    double getPerimeter();
}

public interface Exportable {
    String toCSV();
}

// A class can implement multiple interfaces
public class ROI implements Measurable, Exportable {
    private double width, height;

    public ROI(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() { return width * height; }

    @Override
    public double getPerimeter() { return 2 * (width + height); }

    @Override
    public String toCSV() {
        return String.format("%.2f,%.2f,%.2f", width, height, getArea());
    }
}
```

### When to use which?

| Use | When |
|---|---|
| **Abstract class** | You want to share code (fields and methods) among related classes |
| **Interface** | You want to define a contract that unrelated classes can fulfill |

> **Real-world example --- ImageJ plugin architecture:** When you write a FIJI plugin (Section 39), you implement the `PlugInFilter` interface. This interface defines two methods --- `setup()` and `run()` --- that FIJI calls when a user selects your plugin from the menu. Any class that implements `PlugInFilter` is automatically a valid FIJI plugin, regardless of what else it does. This is exactly what interfaces are designed for: defining a contract ("you must provide `setup()` and `run()`") that unrelated classes can fulfill. ThunderSTORM, the single-molecule localisation plugin used for PIEZO1-HaloTag analysis, uses this same architecture.

---

## 18. Enums and Records

### Enums

Enums represent a fixed set of named constants:

```java
public enum Channel {
    GFP(488, "Green"),
    MCHERRY(561, "Red"),
    DAPI(405, "Blue"),
    BRIGHTFIELD(0, "Transmitted");

    private final int excitationNm;
    private final String color;

    Channel(int excitationNm, String color) {
        this.excitationNm = excitationNm;
        this.color = color;
    }

    public int getExcitationNm() { return excitationNm; }
    public String getColor() { return color; }
}

// Usage
Channel ch = Channel.GFP;
System.out.println(ch.getExcitationNm());  // 488

// Switch on enum
switch (ch) {
    case GFP       -> System.out.println("Green channel");
    case MCHERRY   -> System.out.println("Red channel");
    case DAPI      -> System.out.println("Blue channel");
    default        -> System.out.println("Other");
}
```

### Records (Java 16+)

Records are **immutable data carriers** --- classes whose sole purpose is to hold data. They automatically generate a constructor, getters, `equals()`, `hashCode()`, and `toString()`:

```java
// One line replaces ~40 lines of boilerplate!
public record CellMeasurement(
    String id,
    double area,
    double meanIntensity,
    String condition
) {}

// Usage
var m = new CellMeasurement("Cell_01", 150.2, 1524.0, "Control");
System.out.println(m.id());              // "Cell_01" (not getId() — accessor name matches field)
System.out.println(m.area());            // 150.2
System.out.println(m);                   // CellMeasurement[id=Cell_01, area=150.2, ...]
System.out.println(m.equals(another));   // structural equality, not reference
```

Records are perfect for simple data classes like measurement results, ROI coordinates, or configuration settings.

---

## 19. The Collections Framework: Lists, Sets, and Maps

### ArrayList (dynamic list)

```java
import java.util.ArrayList;
import java.util.List;

List<String> genes = new ArrayList<>();
genes.add("PIEZO1");
genes.add("PIEZO2");
genes.add("TRPV4");

genes.size()               // 3
genes.get(0)               // "PIEZO1"
genes.get(genes.size()-1)  // "TRPV4"
genes.contains("PIEZO1")   // true
genes.indexOf("TRPV4")     // 2
genes.remove("PIEZO2");    // removes by value
genes.set(0, "PIEZO1-GFP"); // replace element at index

// Iterate
for (String gene : genes) {
    System.out.println(gene);
}

// Create from known values (unmodifiable)
List<String> fixed = List.of("A", "B", "C");

// Create a modifiable list from known values
List<String> mutable = new ArrayList<>(List.of("A", "B", "C"));
```

### HashMap (key-value mapping)

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Double> ec50Values = new HashMap<>();
ec50Values.put("Yoda1", 17.1);
ec50Values.put("Jedi1", 0.2);
ec50Values.put("Jedi2", 0.8);

ec50Values.get("Yoda1")              // 17.1
ec50Values.getOrDefault("Unknown", 0.0)  // 0.0
ec50Values.containsKey("Jedi1")      // true
ec50Values.size()                     // 3
ec50Values.remove("Jedi2");

// Iterate
for (Map.Entry<String, Double> entry : ec50Values.entrySet()) {
    System.out.printf("%s: EC50 = %.1f µM%n", entry.getKey(), entry.getValue());
}

// Create from known values (unmodifiable)
Map<String, Integer> channels = Map.of("GFP", 488, "mCherry", 561, "DAPI", 405);
```

### HashSet (unique values)

```java
import java.util.HashSet;
import java.util.Set;

Set<String> uniqueGenes = new HashSet<>();
uniqueGenes.add("PIEZO1");
uniqueGenes.add("PIEZO2");
uniqueGenes.add("PIEZO1");   // duplicate — ignored
uniqueGenes.size()            // 2

uniqueGenes.contains("PIEZO1")  // true

// Create from known values
Set<String> controls = Set.of("DMSO", "Vehicle", "Untreated");
```

### Choosing the right collection

| Need | Collection | Example |
|---|---|---|
| Ordered list, access by index | `ArrayList<E>` | List of cell measurements |
| Fast lookup by key | `HashMap<K, V>` | Gene → expression level |
| Unique elements, no duplicates | `HashSet<E>` | Set of unique gene names |
| Ordered by key | `TreeMap<K, V>` | Sorted time points |
| Maintains insertion order | `LinkedHashMap<K, V>` | Processing order matters |
| Thread-safe map | `ConcurrentHashMap<K, V>` | Multi-threaded access |

---

## 20. Iterating Over Collections

### for-each loop (preferred)

```java
List<Double> intensities = List.of(1524.0, 1830.0, 1650.0);

for (double val : intensities) {
    System.out.println(val);
}
```

### Iterator (when you need to remove during iteration)

```java
import java.util.Iterator;

List<String> genes = new ArrayList<>(List.of("PIEZO1", "TP53", "BRCA1"));
Iterator<String> it = genes.iterator();
while (it.hasNext()) {
    String gene = it.next();
    if (gene.startsWith("BR")) {
        it.remove();  // safe removal during iteration
    }
}
```

### forEach with lambda (Java 8+)

```java
genes.forEach(gene -> System.out.println(gene));
genes.forEach(System.out::println);  // method reference (shorthand)
```

---

## 21. Sorting and Comparing

```java
import java.util.Collections;
import java.util.Comparator;

List<Double> values = new ArrayList<>(List.of(3.2, 1.5, 4.8, 2.1));
Collections.sort(values);                    // ascending: [1.5, 2.1, 3.2, 4.8]
Collections.sort(values, Comparator.reverseOrder());  // descending

// Sort objects by a field
List<CellMeasurement> cells = /* ... */;
cells.sort(Comparator.comparingDouble(CellMeasurement::area));            // by area
cells.sort(Comparator.comparingDouble(CellMeasurement::area).reversed()); // descending
cells.sort(Comparator.comparing(CellMeasurement::condition)
                      .thenComparingDouble(CellMeasurement::area));       // multi-field
```

---

## 22. Exception Handling: try, catch, finally

### Basic try-catch

```java
try {
    double[] data = loadData("missing_file.csv");
    double mean = calculateMean(data);
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
} catch (ArithmeticException e) {
    System.err.println("Math error: " + e.getMessage());
} catch (Exception e) {
    // Catch-all for any other exception
    System.err.println("Unexpected error: " + e.getMessage());
    e.printStackTrace();
}
```

### finally

```java
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.csv"));
    String line = reader.readLine();
    // process data
} catch (IOException e) {
    System.err.println("Error reading file: " + e.getMessage());
} finally {
    // This runs no matter what — cleanup code
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { /* ignore */ }
    }
}
```

### try-with-resources (Java 7+, preferred)

Automatically closes resources (files, connections) when done:

```java
try (BufferedReader reader = new BufferedReader(new FileReader("data.csv"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.err.println("Error: " + e.getMessage());
}
// reader is automatically closed — no finally block needed
```

### Throwing exceptions

```java
public double calculateDFF(double[] trace, int baselineFrames) {
    if (trace == null || trace.length == 0) {
        throw new IllegalArgumentException("Trace cannot be null or empty");
    }
    if (baselineFrames > trace.length) {
        throw new IllegalArgumentException(
            "Baseline frames (" + baselineFrames + ") exceeds trace length (" + trace.length + ")");
    }
    // ... calculation ...
}
```

### Checked vs. unchecked exceptions

| Type | Must be caught or declared? | Examples | When to use |
|---|---|---|---|
| **Checked** (extends `Exception`) | Yes | `IOException`, `FileNotFoundException` | External failures (file, network) |
| **Unchecked** (extends `RuntimeException`) | No | `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException` | Programming errors |

If your method throws a checked exception, you must declare it:

```java
public void loadData(String path) throws IOException {
    // If this throws IOException, callers must handle it
    BufferedReader reader = new BufferedReader(new FileReader(path));
}
```

---

## 23. File Input/Output

### Reading a text file (line by line)

```java
import java.nio.file.*;
import java.io.*;
import java.util.*;

// Modern approach (Java 11+): read all lines at once
List<String> lines = Files.readAllLines(Path.of("data.csv"));

// Read entire file as a single string
String content = Files.readString(Path.of("data.txt"));

// Stream approach (memory-efficient for large files)
try (var stream = Files.lines(Path.of("data.csv"))) {
    stream.filter(line -> !line.startsWith("#"))  // skip comments
          .forEach(System.out::println);
}
```

### Writing a text file

```java
// Write a list of lines
List<String> lines = List.of("gene,expression", "PIEZO1,12.5", "PIEZO2,8.3");
Files.write(Path.of("output.csv"), lines);

// Write a single string
Files.writeString(Path.of("report.txt"), "Analysis complete.\n");

// Append to existing file
Files.writeString(Path.of("log.txt"), "Processing batch 3\n",
                  StandardOpenOption.APPEND, StandardOpenOption.CREATE);
```

### Reading a CSV file manually

```java
List<String[]> rows = new ArrayList<>();

try (BufferedReader br = Files.newBufferedReader(Path.of("measurements.csv"))) {
    String header = br.readLine();  // skip header
    String line;
    while ((line = br.readLine()) != null) {
        String[] fields = line.split(",");
        rows.add(fields);
    }
}

// Access parsed data
for (String[] row : rows) {
    String cellId = row[0];
    double area = Double.parseDouble(row[1]);
    double intensity = Double.parseDouble(row[2]);
    System.out.printf("%s: area=%.1f, intensity=%.1f%n", cellId, area, intensity);
}
```

### Listing files in a directory

```java
// List all .csv files
try (var stream = Files.list(Path.of("data/"))) {
    List<Path> csvFiles = stream
        .filter(p -> p.toString().endsWith(".csv"))
        .sorted()
        .toList();

    for (Path file : csvFiles) {
        System.out.println(file.getFileName());
    }
}

// Recursively find files
try (var stream = Files.walk(Path.of("data/"))) {
    stream.filter(p -> p.toString().endsWith(".tif"))
          .forEach(System.out::println);
}
```

### Path operations

```java
import java.nio.file.Path;

Path p = Path.of("/data/experiment/traces/cell_01.csv");
p.getFileName()     // cell_01.csv
p.getParent()       // /data/experiment/traces
p.getRoot()         // /
p.resolve("sub")    // /data/experiment/traces/cell_01.csv/sub
p.getParent().resolve("cell_02.csv")  // /data/experiment/traces/cell_02.csv

Files.exists(p)     // true/false
Files.isDirectory(p)  // true/false
Files.size(p)       // file size in bytes
Files.createDirectories(Path.of("results/figures"));  // mkdir -p
```

---

## 24. Common Errors and How to Fix Them

### NullPointerException

The most common Java error. Occurs when you call a method or access a field on `null`.

```java
String s = null;
s.length();    // NullPointerException!

// Fix: check for null
if (s != null) {
    System.out.println(s.length());
}

// Java 14+ gives helpful messages:
// Cannot invoke "String.length()" because "s" is null
```

### ArrayIndexOutOfBoundsException

```java
int[] arr = {10, 20, 30};
arr[3];    // ArrayIndexOutOfBoundsException! (valid indices: 0, 1, 2)

// Fix: check bounds
if (index >= 0 && index < arr.length) {
    System.out.println(arr[index]);
}
```

### ClassCastException

```java
Object obj = "hello";
Integer n = (Integer) obj;  // ClassCastException!

// Fix: check type with instanceof
if (obj instanceof Integer n) {  // pattern matching (Java 16+)
    System.out.println(n * 2);
}
```

### ConcurrentModificationException

```java
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (String s : list) {
    list.remove(s);    // ConcurrentModificationException!
}

// Fix: use Iterator.remove() or removeIf()
list.removeIf(s -> s.equals("b"));
```

### StackOverflowError

```java
// Infinite recursion
void infiniteRecursion() {
    infiniteRecursion();  // StackOverflowError
}

// Fix: always have a base case
int factorial(int n) {
    if (n <= 1) return 1;       // base case
    return n * factorial(n - 1); // recursive case
}
```

### Compilation errors (not runtime)

| Error message | Cause | Fix |
|---|---|---|
| `cannot find symbol` | Typo, missing import, or undeclared variable | Check spelling, add `import` statement |
| `incompatible types` | Wrong type assignment (e.g., `int x = "hello"`) | Fix the types or add a cast |
| `';' expected` | Missing semicolon | Add `;` at the end of the statement |
| `class X is public, should be declared in a file named X.java` | Filename does not match class name | Rename the file to match |
| `unreported exception ... must be caught or declared` | Unhandled checked exception | Add try-catch or `throws` clause |
| `variable might not have been initialized` | Local variable used before assignment | Assign a value before using it |

---

## 25. Debugging in an IDE

### IntelliJ IDEA debugger

1. **Set a breakpoint:** Click in the gutter (left margin) next to a line number. A red dot appears.
2. **Run in debug mode:** Right-click the `main` method → Debug (or click the bug icon).
3. **Execution pauses** at the breakpoint.
4. **Inspect variables:** The Variables pane shows all local variables and their current values.
5. **Step through code:**

| Button | Shortcut | Action |
|---|---|---|
| **Step Over** | F8 | Execute current line, move to next |
| **Step Into** | F7 | Enter the method being called |
| **Step Out** | Shift+F8 | Finish current method, return to caller |
| **Resume** | F9 | Continue to next breakpoint |

6. **Evaluate expressions:** Alt+F8 opens a dialog where you can type any Java expression and evaluate it on the current state.
7. **Conditional breakpoints:** Right-click a breakpoint → add a condition (e.g., `i > 100`).

### Adding diagnostic output

```java
System.out.println("DEBUG: value = " + value);          // basic
System.out.printf("DEBUG: frame %d, intensity %.2f%n", i, intensity);  // formatted
System.err.println("WARNING: negative value detected");  // stderr (shows in red)
```

For production code, use a logging framework (`java.util.logging` or SLF4J/Log4j) instead of `System.out.println`.

---

## 26. Generics

Generics let you write type-safe code that works with any type:

```java
// Without generics (dangerous — no type checking)
List rawList = new ArrayList();
rawList.add("hello");
rawList.add(42);              // no error, but...
String s = (String) rawList.get(1);  // ClassCastException at runtime!

// With generics (safe — compiler enforces types)
List<String> safeList = new ArrayList<>();
safeList.add("hello");
safeList.add(42);             // COMPILE ERROR — caught before running
```

### Writing generic classes and methods

```java
// A generic Pair class
public class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }
}

// Usage
Pair<String, Double> geneExpr = new Pair<>("PIEZO1", 12.5);
String gene = geneExpr.getFirst();   // "PIEZO1" — no cast needed
Double expr = geneExpr.getSecond();  // 12.5

// Generic method
public static <T> List<T> filterNulls(List<T> input) {
    List<T> result = new ArrayList<>();
    for (T item : input) {
        if (item != null) result.add(item);
    }
    return result;
}
```

---

## 27. Lambda Expressions and Functional Interfaces

### What is a lambda?

A lambda is an anonymous function — a short block of code that you can pass around like a value. Lambdas were added in Java 8 and are essential for modern Java.

```java
// Before Java 8: anonymous inner class
Comparator<String> oldWay = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};

// Java 8+: lambda expression
Comparator<String> newWay = (a, b) -> a.length() - b.length();

// Both do the same thing. The lambda is much more concise.
```

### Lambda syntax

```java
// Full form
(String a, String b) -> { return a.length() - b.length(); }

// Inferred parameter types
(a, b) -> { return a.length() - b.length(); }

// Single expression (return is implicit)
(a, b) -> a.length() - b.length()

// Single parameter (parentheses optional)
x -> x * 2

// No parameters
() -> System.out.println("Hello")
```

### Common functional interfaces

| Interface | Method | Purpose | Example |
|---|---|---|---|
| `Predicate<T>` | `test(T) → boolean` | Filter/test | `x -> x > 0` |
| `Function<T, R>` | `apply(T) → R` | Transform | `s -> s.length()` |
| `Consumer<T>` | `accept(T) → void` | Perform action | `s -> System.out.println(s)` |
| `Supplier<T>` | `get() → T` | Provide a value | `() -> new ArrayList<>()` |
| `Comparator<T>` | `compare(T, T) → int` | Compare two values | `(a, b) -> a.compareTo(b)` |

### Method references

A shorthand when a lambda simply calls an existing method:

```java
// Lambda
list.forEach(s -> System.out.println(s));

// Method reference (equivalent)
list.forEach(System.out::println);

// Other forms:
// ClassName::staticMethod     Math::sqrt
// object::instanceMethod      str::length
// ClassName::new              ArrayList::new
```

---

## 28. The Stream API

Streams provide a functional, pipeline-based approach to processing collections. Think of them as Java's equivalent of Python's list comprehensions or R's dplyr pipes.

### Basic stream operations

```java
import java.util.stream.*;

List<Double> intensities = List.of(1524.0, 1830.0, 1650.0, 1720.0, 1590.0, 890.0);

// Filter, transform, collect
List<Double> bright = intensities.stream()
    .filter(x -> x > 1500)       // keep elements > 1500
    .sorted()                     // sort ascending
    .toList();                    // collect to a list
// [1524.0, 1590.0, 1650.0, 1720.0, 1830.0]

// Map (transform each element)
List<String> labels = intensities.stream()
    .map(x -> x > 1500 ? "Bright" : "Dim")
    .toList();
// ["Bright", "Bright", "Bright", "Bright", "Bright", "Dim"]

// Reduce (aggregate)
double sum = intensities.stream()
    .mapToDouble(Double::doubleValue)
    .sum();

double mean = intensities.stream()
    .mapToDouble(Double::doubleValue)
    .average()
    .orElse(0.0);

// Statistics
DoubleSummaryStatistics stats = intensities.stream()
    .mapToDouble(Double::doubleValue)
    .summaryStatistics();
stats.getCount();    // 6
stats.getMean();     // 1534.0
stats.getMin();      // 890.0
stats.getMax();      // 1830.0
stats.getSum();      // 9204.0
```

### Chaining operations

```java
// Read a CSV, parse, filter, summarise — all in one pipeline
double meanControlIntensity = Files.lines(Path.of("data.csv"))
    .skip(1)                                    // skip header
    .map(line -> line.split(","))               // split each line
    .filter(fields -> fields[3].equals("Control"))  // keep controls
    .mapToDouble(fields -> Double.parseDouble(fields[2]))  // parse intensity
    .average()
    .orElse(0.0);
```

### Collecting results

```java
// To a List
List<String> result = stream.collect(Collectors.toList());
// or simply: stream.toList()   (Java 16+)

// To a Set
Set<String> unique = stream.collect(Collectors.toSet());

// To a Map
Map<String, Double> geneMap = measurements.stream()
    .collect(Collectors.toMap(
        CellMeasurement::id,
        CellMeasurement::meanIntensity
    ));

// Group by
Map<String, List<CellMeasurement>> byCondition = measurements.stream()
    .collect(Collectors.groupingBy(CellMeasurement::condition));

// Join strings
String csv = genes.stream().collect(Collectors.joining(","));
```

---

## 29. Working with Dates and Times

```java
import java.time.*;
import java.time.format.*;

// Current date and time
LocalDate today = LocalDate.now();           // 2025-12-15
LocalTime now = LocalTime.now();             // 14:30:45.123
LocalDateTime timestamp = LocalDateTime.now();

// Create specific dates
LocalDate experimentDate = LocalDate.of(2025, 1, 15);

// Parse from strings
LocalDate parsed = LocalDate.parse("2025-01-15");
LocalDateTime dt = LocalDateTime.parse("2025-01-15T10:30:00");

// Custom formatting
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
String formatted = timestamp.format(formatter);  // "15/12/2025 14:30"

// Date arithmetic
LocalDate nextWeek = today.plusDays(7);
LocalDate lastMonth = today.minusMonths(1);
long daysBetween = ChronoUnit.DAYS.between(experimentDate, today);

// Duration for timing
Instant start = Instant.now();
// ... do work ...
Instant end = Instant.now();
Duration elapsed = Duration.between(start, end);
System.out.printf("Elapsed: %d ms%n", elapsed.toMillis());
```

---

## 30. String Formatting and Text Blocks

### printf-style formatting

```java
// String.format() returns a formatted string
String msg = String.format("Cell %s: area=%.2f µm², intensity=%d",
                           "Cell_01", 150.25, 1524);

// System.out.printf() prints directly
System.out.printf("Mean: %.4f ± %.4f%n", mean, sem);
// %n = platform-independent newline

// Common format specifiers
// %d     integer
// %f     floating point (%.2f = 2 decimal places)
// %e     scientific notation (%.3e = 3 decimal places)
// %s     string
// %b     boolean
// %%     literal percent sign
// %n     newline
// %10d   right-align in 10-char field
// %-10s  left-align in 10-char field
```

### Text blocks (Java 15+)

Multi-line strings without escape characters:

```java
String csv = """
        cell_id,area,intensity,condition
        Cell_01,150.2,1524,Control
        Cell_02,210.5,1830,Treated
        Cell_03,180.3,1650,Control
        """;

String sql = """
        SELECT gene_name, log2fc, padj
        FROM de_results
        WHERE padj < 0.05
        AND ABS(log2fc) > 1.0
        ORDER BY padj
        """;
```

---

## 31. Packages and Imports

### Packages

Packages organise classes into namespaces, like folders in a file system:

```java
// File: src/com/pathaklab/imaging/TraceExtractor.java
package com.pathaklab.imaging;

public class TraceExtractor {
    // ...
}
```

### Imports

```java
import java.util.ArrayList;           // import one class
import java.util.List;
import java.util.*;                    // import everything in java.util (convenient but less clear)
import java.nio.file.Path;
import java.nio.file.Files;

// Static imports (import static methods/constants)
import static java.lang.Math.sqrt;
import static java.lang.Math.PI;

// Now you can write sqrt(x) instead of Math.sqrt(x)
```

### Common packages

| Package | Contains |
|---|---|
| `java.lang` | `String`, `Math`, `System`, `Integer`, `Exception` (auto-imported) |
| `java.util` | `ArrayList`, `HashMap`, `Collections`, `Arrays`, `Optional` |
| `java.util.stream` | `Stream`, `Collectors` |
| `java.io` | `File`, `BufferedReader`, `InputStream`, `IOException` |
| `java.nio.file` | `Path`, `Files` (modern file I/O) |
| `java.time` | `LocalDate`, `LocalDateTime`, `Duration`, `Instant` |
| `java.math` | `BigDecimal`, `BigInteger` |

---

## 32. Build Tools: Maven and Gradle

For anything beyond a single-file program, you need a **build tool** to manage dependencies, compilation, and packaging.

### Maven

Maven is the most widely used Java build tool. It uses an XML configuration file (`pom.xml`).

**Minimal `pom.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.pathaklab</groupId>
    <artifactId>trace-analysis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>25</maven.compiler.source>
        <maven.compiler.target>25</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- htsjdk for reading BAM/VCF files -->
        <dependency>
            <groupId>com.github.samtools</groupId>
            <artifactId>htsjdk</artifactId>
            <version>4.1.3</version>
        </dependency>

        <!-- BioJava for sequence analysis -->
        <dependency>
            <groupId>org.biojava</groupId>
            <artifactId>biojava-core</artifactId>
            <version>7.1.3</version>
        </dependency>
    </dependencies>
</project>
```

**Common Maven commands:**

```bash
mvn compile          # compile the project
mvn test             # run unit tests
mvn package          # compile + test + create JAR
mvn clean            # delete build output
mvn dependency:tree  # show dependency tree
```

### Gradle

Gradle uses a Groovy or Kotlin DSL. It is faster than Maven and increasingly popular.

**`build.gradle`:**

```groovy
plugins {
    id 'java'
    id 'application'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'com.github.samtools:htsjdk:4.1.3'
    implementation 'org.biojava:biojava-core:7.1.3'
}

application {
    mainClass = 'com.pathaklab.Main'
}
```

**Common Gradle commands:**

```bash
gradle build         # compile + test + create JAR
gradle run           # compile and run the application
gradle clean         # delete build output
gradle dependencies  # show dependency tree
```

### Maven vs. Gradle

| Feature | Maven | Gradle |
|---|---|---|
| Config format | XML (`pom.xml`) | Groovy/Kotlin DSL |
| Speed | Slower | Faster (incremental builds, caching) |
| Learning curve | Simpler (rigid structure) | Steeper (flexible) |
| Ecosystem | More tutorials, older projects | Growing fast, Android standard |
| GATK/Picard | Use Maven | Use Gradle |

For bioinformatics, Maven is more common. IntelliJ IDEA provides excellent built-in support for both.

---

## 33. JAR Files and Running Programs

### What is a JAR?

A **JAR** (Java Archive) is a ZIP file containing compiled `.class` files and metadata. It is the standard distribution format for Java libraries and applications.

### Creating and running a JAR

```bash
# Compile
javac -d out/ src/com/pathaklab/*.java

# Create a JAR
jar cfe app.jar com.pathaklab.Main -C out/ .

# Run
java -jar app.jar

# Run with more memory (common for bioinformatics)
java -Xmx8g -jar app.jar         # 8 GB max heap
java -Xmx16g -jar GenomeAnalysisTK.jar   # GATK with 16 GB
```

### Running bioinformatics tools

Most bioinformatics JAR files are run directly:

```bash
# GATK
java -Xmx8g -jar gatk-package-local.jar HaplotypeCaller \
    -R reference.fasta \
    -I input.bam \
    -O output.vcf

# Or with the GATK wrapper script
gatk --java-options "-Xmx8g" HaplotypeCaller \
    -R reference.fasta \
    -I input.bam \
    -O output.vcf

# Picard
java -jar picard.jar MarkDuplicates \
    I=input.bam O=deduped.bam M=metrics.txt

# FastQC
java -jar fastqc.jar *.fastq.gz

# Trimmomatic
java -jar trimmomatic.jar PE \
    input_R1.fastq.gz input_R2.fastq.gz \
    output_R1_paired.fastq.gz output_R1_unpaired.fastq.gz \
    output_R2_paired.fastq.gz output_R2_unpaired.fastq.gz \
    ILLUMINACLIP:adapters.fa:2:30:10 LEADING:3 TRAILING:3 MINLEN:36
```

---

## 34. Project Structure and Best Practices

### Standard Maven/Gradle project layout

```
my-project/
├── pom.xml  (or build.gradle)
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/pathaklab/
│   │   │       ├── Main.java
│   │   │       ├── model/
│   │   │       │   ├── Cell.java
│   │   │       │   └── Measurement.java
│   │   │       ├── analysis/
│   │   │       │   ├── TraceExtractor.java
│   │   │       │   └── Statistics.java
│   │   │       └── io/
│   │   │           ├── CsvReader.java
│   │   │           └── CsvWriter.java
│   │   └── resources/
│   │       └── config.properties
│   └── test/
│       └── java/
│           └── com/pathaklab/
│               └── analysis/
│                   └── StatisticsTest.java
├── data/                   # input data (not tracked in git)
├── results/                # output results
└── README.md
```

### Java naming conventions

| Element | Convention | Example |
|---|---|---|
| **Classes** | PascalCase | `CellMeasurement`, `TraceExtractor` |
| **Methods** | camelCase | `calculateMean()`, `getArea()` |
| **Variables** | camelCase | `meanIntensity`, `frameCount` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_FRAMES`, `PIXEL_SIZE_UM` |
| **Packages** | all lowercase, dot-separated | `com.pathaklab.imaging` |
| **Files** | Match class name exactly | `CellMeasurement.java` |

### Best practices

1. **One public class per file.** The filename must match the class name exactly.
2. **Use meaningful names.** `calculateDFF()` not `calc()`. `meanIntensity` not `mi`.
3. **Document public methods** with Javadoc:
   ```java
   /**
    * Calculate dF/F from a fluorescence trace.
    *
    * @param trace raw fluorescence values
    * @param baselineFrames number of frames for baseline (F0)
    * @return array of dF/F values
    * @throws IllegalArgumentException if trace is empty
    */
   public double[] calculateDFF(double[] trace, int baselineFrames) { ... }
   ```
4. **Handle null explicitly.** Always check parameters that might be null.
5. **Use records for data classes** when you just need to hold data.
6. **Prefer List/Map/Set interfaces** over concrete types in method signatures:
   ```java
   // Good: accepts any List implementation
   public double mean(List<Double> values) { ... }
   // Bad: locks you into ArrayList
   public double mean(ArrayList<Double> values) { ... }
   ```

---

## 35. Java's Role in Bioinformatics

Java's combination of performance, portability, and robustness made it the dominant language for bioinformatics tool development in the 2000s and 2010s. While Python has taken over for scripting and data science, the **core infrastructure** of genomics pipelines remains Java-based:

### The bioinformatics stack

```
Your analysis pipeline
        │
        ▼
┌─────────────────────────────────────────┐
│ Workflow manager (Nextflow / Snakemake)  │
└─────────────────────────────────────────┘
        │ calls
        ▼
┌─────────────────────────────────────────┐
│ GATK, Picard, FastQC, Trimmomatic       │  ← Written in Java
│ BWA, samtools, bcftools                 │  ← Written in C
│ DESeq2, edgeR                           │  ← Written in R
└─────────────────────────────────────────┘
        │ reads/writes
        ▼
┌─────────────────────────────────────────┐
│ BAM, VCF, FASTQ, BED files              │
└─────────────────────────────────────────┘
        │ parsed by
        ▼
┌─────────────────────────────────────────┐
│ htsjdk (Java), pysam (Python)           │
└─────────────────────────────────────────┘
```

### Key Java bioinformatics tools

| Tool | Purpose | Maintained by |
|---|---|---|
| **GATK** | Variant discovery (SNPs, indels, structural variants) | Broad Institute |
| **Picard** | BAM/SAM utilities (sort, merge, mark duplicates, collect metrics) | Broad Institute |
| **htsjdk** | Java library for reading/writing BAM, SAM, VCF, BCF, CRAM, BED | samtools/htsjdk project |
| **IGV** | Interactive genome browser | Broad Institute |
| **BioJava** | Sequence analysis, alignment, protein structure | Open Bioinformatics Foundation |
| **FastQC** | Sequencing quality control reports | Babraham Bioinformatics |
| **Trimmomatic** | Adapter trimming for Illumina reads | Usadel Lab, RWTH Aachen |
| **Cromwell** | Workflow execution engine (WDL) | Broad Institute |
| **Nextflow** | Workflow manager (runs on the JVM via Groovy) | Seqera Labs |
| **HTSJDK** + **Disq** | Distributed/cloud-based genomics processing | Multiple |

---

## 36. htsjdk: Reading BAM, SAM, VCF, and BED Files

**htsjdk** is the foundational Java library for high-throughput sequencing data. GATK and Picard are both built on it.

### Maven dependency

```xml
<dependency>
    <groupId>com.github.samtools</groupId>
    <artifactId>htsjdk</artifactId>
    <version>4.1.3</version>
</dependency>
```

### Reading a BAM file

```java
import htsjdk.samtools.*;
import java.io.File;

try (SamReader reader = SamReaderFactory.makeDefault()
        .open(new File("aligned_reads.bam"))) {

    SAMFileHeader header = reader.getFileHeader();
    System.out.println("Sorted by: " + header.getSortOrder());

    int count = 0;
    for (SAMRecord read : reader) {
        if (read.getReadUnmappedFlag()) continue;  // skip unmapped

        String chrom = read.getReferenceName();
        int start = read.getAlignmentStart();
        int mapQ = read.getMappingQuality();

        if (mapQ >= 30 && chrom.equals("chr16")) {
            count++;
        }
    }
    System.out.printf("High-quality reads on chr16: %d%n", count);
}
```

### Reading a VCF file

```java
import htsjdk.variant.vcf.*;
import htsjdk.variant.variantcontext.*;
import java.io.File;

try (VCFFileReader reader = new VCFFileReader(new File("variants.vcf.gz"), false)) {

    VCFHeader header = reader.getHeader();
    System.out.println("Samples: " + header.getGenotypeSamples());

    for (VariantContext vc : reader) {
        String chrom = vc.getContig();
        int pos = vc.getStart();
        String ref = vc.getReference().getBaseString();
        String alt = vc.getAlternateAlleles().toString();
        double qual = vc.getPhredScaledQual();

        if (vc.isFiltered()) continue;  // skip filtered variants

        System.out.printf("%s:%d %s>%s (QUAL=%.1f)%n", chrom, pos, ref, alt, qual);
    }
}
```

### Querying a specific region

```java
// BAM must be indexed (.bai file)
try (SamReader reader = SamReaderFactory.makeDefault()
        .open(new File("aligned_reads.bam"))) {

    // Query chr16:88,700,000-88,750,000 (PIEZO1 locus)
    SAMRecordIterator iter = reader.queryOverlapping("chr16", 88700000, 88750000);
    while (iter.hasNext()) {
        SAMRecord read = iter.next();
        // process reads overlapping the PIEZO1 locus
    }
    iter.close();
}
```

---

## 37. BioJava: Sequences, Alignments, and Structures

**BioJava** is the standard open-source Java library for bioinformatics.

### Maven dependency

```xml
<dependency>
    <groupId>org.biojava</groupId>
    <artifactId>biojava-core</artifactId>
    <version>7.1.3</version>
</dependency>
```

### Working with DNA sequences

```java
import org.biojava.nbio.core.sequence.*;
import org.biojava.nbio.core.sequence.transcription.*;
import org.biojava.nbio.core.sequence.io.*;

// Create a DNA sequence
DNASequence dna = new DNASequence("ATGGCATCGATCGATCG");
System.out.println("Length: " + dna.getLength());
System.out.println("Complement: " + dna.getComplement().getSequenceAsString());
System.out.println("Reverse complement: " + dna.getReverseComplement().getSequenceAsString());

// Transcribe to RNA
RNASequence rna = dna.getRNASequence();
System.out.println("RNA: " + rna.getSequenceAsString());

// Translate to protein
ProteinSequence protein = rna.getProteinSequence();
System.out.println("Protein: " + protein.getSequenceAsString());
```

### Reading FASTA files

```java
import org.biojava.nbio.core.sequence.io.FastaReaderHelper;
import java.io.File;
import java.util.LinkedHashMap;

LinkedHashMap<String, DNASequence> sequences =
    FastaReaderHelper.readFastaDNASequence(new File("sequences.fasta"));

for (var entry : sequences.entrySet()) {
    String header = entry.getKey();
    DNASequence seq = entry.getValue();
    System.out.printf(">%s (length: %d)%n", header, seq.getLength());
}
```

### Protein structure

```java
import org.biojava.nbio.structure.*;
import org.biojava.nbio.structure.io.*;

// Load a PDB structure
Structure structure = StructureIO.getStructure("5Z10");  // PIEZO1 cryo-EM structure
System.out.println("Title: " + structure.getTitle());
System.out.println("Chains: " + structure.getChains().size());

// Iterate over residues
for (Chain chain : structure.getChains()) {
    for (Group group : chain.getAtomGroups()) {
        if (group instanceof AminoAcid) {
            AminoAcid aa = (AminoAcid) group;
            System.out.printf("%s %s%d%n",
                chain.getId(), aa.getAminoType(), aa.getResidueNumber().getSeqNum());
        }
    }
}
```

---

## 38. Using GATK and Picard as Libraries

GATK and Picard can be used not only as command-line tools but also as Java libraries in your own code.

### GATK as a library

```xml
<dependency>
    <groupId>org.broadinstitute</groupId>
    <artifactId>gatk</artifactId>
    <version>4.6.1.0</version>
</dependency>
```

```java
import org.broadinstitute.hellbender.engine.*;
import org.broadinstitute.hellbender.utils.read.*;

// GATK tools can be invoked programmatically:
// This is advanced usage — most researchers will use the command-line interface.
// The main value is understanding the source code when debugging pipeline failures.
```

### Common GATK/Picard command-line usage

While these are run from the command line, understanding the Java foundation helps with:

1. **Reading error messages**: Java stack traces tell you exactly where the error occurred
2. **Memory tuning**: `-Xmx8g` controls how much RAM the JVM allocates
3. **Modifying tools**: You can fork and modify GATK/Picard source code for custom analyses
4. **Writing WDL/Nextflow pipelines**: Understanding Java's behaviour helps debug pipelines

```bash
# Typical GATK workflow
# 1. Mark duplicates
gatk MarkDuplicates -I input.bam -O marked.bam -M metrics.txt

# 2. Base quality recalibration
gatk BaseRecalibrator -I marked.bam -R ref.fasta --known-sites dbsnp.vcf -O recal.table
gatk ApplyBQSR -I marked.bam -R ref.fasta --bqsr-recal-file recal.table -O recal.bam

# 3. Call variants
gatk HaplotypeCaller -R ref.fasta -I recal.bam -O output.g.vcf -ERC GVCF

# Common JVM flags for bioinformatics
# -Xmx8g          max heap memory (8 GB)
# -Xms4g          initial heap memory (4 GB)
# -XX:ParallelGCThreads=4   garbage collection threads
# -Djava.io.tmpdir=/scratch  temporary file location
```

---

## 39. ImageJ/FIJI Plugins in Java

ImageJ and FIJI are written in Java, and their plugin system uses Java classes.

### Basic ImageJ plugin structure

```java
import ij.*;
import ij.process.*;
import ij.plugin.filter.PlugInFilter;

public class Mean_Intensity implements PlugInFilter {

    ImagePlus imp;

    @Override
    public int setup(String arg, ImagePlus imp) {
        this.imp = imp;
        return DOES_ALL;  // accepts all image types
    }

    @Override
    public void run(ImageProcessor ip) {
        int width = ip.getWidth();
        int height = ip.getHeight();

        double sum = 0;
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                sum += ip.getPixelValue(x, y);
            }
        }
        double mean = sum / (width * height);

        IJ.log(String.format("Mean intensity: %.2f", mean));
    }
}
```

### Compiling and installing an ImageJ plugin

```bash
# Compile against ImageJ's ij.jar
javac -cp /path/to/Fiji.app/jars/ij-*.jar Mean_Intensity.java

# Copy the .class file to FIJI's plugins folder
cp Mean_Intensity.class /path/to/Fiji.app/plugins/

# Restart FIJI — the plugin appears in the Plugins menu
```

### Why write ImageJ plugins in Java?

- **Performance**: Java plugins run 10–100× faster than ImageJ Macro language for pixel-level operations
- **Access to all APIs**: Full access to ImageJ's Java API, including ROI management, results tables, and stack processing
- **Distribution**: Share a single `.jar` file that works on any platform
- **Integration**: Call any Java library (htsjdk, BioJava, Apache Commons Math) from within ImageJ

For quick scripting, use the ImageJ Macro language or Jython (Python scripting in FIJI). For performance-critical analysis or reusable tools, write a Java plugin.

---

## 40. Calling Java from Python and R

### From Python: JPype

```python
import jpype
import jpype.imports

# Start the JVM
jpype.startJVM(classpath=["htsjdk-4.1.3.jar"])

# Import Java classes as if they were Python modules
from htsjdk.samtools import SamReaderFactory
from java.io import File

reader = SamReaderFactory.makeDefault().open(File("reads.bam"))
for read in reader:
    if not read.getReadUnmappedFlag():
        print(read.getReferenceName(), read.getAlignmentStart())
reader.close()

jpype.shutdownJVM()
```

### From Python: subprocess (simpler)

```python
import subprocess

# Run a Java tool as a subprocess
result = subprocess.run(
    ["java", "-Xmx4g", "-jar", "picard.jar", "CollectInsertSizeMetrics",
     "I=input.bam", "O=insert_size.txt", "H=histogram.pdf"],
    capture_output=True, text=True
)
if result.returncode != 0:
    print("Error:", result.stderr)
```

### From R: rJava

```r
library(rJava)

.jinit()  # start JVM
.jaddClassPath("htsjdk-4.1.3.jar")

# Call Java methods
factory <- .jcall("htsjdk/samtools/SamReaderFactory", "Lhtsjdk/samtools/SamReaderFactory;", "makeDefault")
```

### From R: system() (simpler)

```r
system("java -Xmx8g -jar gatk.jar HaplotypeCaller -R ref.fasta -I input.bam -O output.vcf")
```

---

## 41. Practical Examples for Biology Research

### Example 1: Parse a CSV of cell measurements

```java
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

void main() throws Exception {
    // Read CSV: cell_id,area,intensity,condition
    record CellData(String id, double area, double intensity, String condition) {}

    List<CellData> cells = Files.lines(Path.of("measurements.csv"))
        .skip(1)  // header
        .map(line -> {
            String[] f = line.split(",");
            return new CellData(f[0], Double.parseDouble(f[1]),
                                Double.parseDouble(f[2]), f[3].trim());
        })
        .toList();

    // Summary statistics per condition
    Map<String, DoubleSummaryStatistics> stats = cells.stream()
        .collect(Collectors.groupingBy(
            CellData::condition,
            Collectors.summarizingDouble(CellData::intensity)
        ));

    stats.forEach((cond, s) ->
        System.out.printf("%-12s n=%3d  mean=%.1f  sd=%.1f%n",
            cond, s.getCount(), s.getAverage(),
            Math.sqrt(cells.stream()
                .filter(c -> c.condition().equals(cond))
                .mapToDouble(c -> Math.pow(c.intensity() - s.getAverage(), 2))
                .sum() / (s.getCount() - 1))));
}
```

### Example 2: Batch rename files

```java
import java.nio.file.*;

void main() throws Exception {
    Path dir = Path.of("data/raw");
    int counter = 1;

    for (Path file : Files.list(dir)
            .filter(p -> p.toString().endsWith(".tif"))
            .sorted()
            .toList()) {
        String newName = String.format("experiment_A_%03d.tif", counter++);
        Files.move(file, file.resolveSibling(newName));
        System.out.printf("Renamed: %s → %s%n", file.getFileName(), newName);
    }
}
```

### Example 3: Calculate dF/F from a trace file

```java
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

void main() throws Exception {
    // Read a single-column intensity file
    double[] trace = Files.lines(Path.of("trace.csv"))
        .skip(1)
        .mapToDouble(Double::parseDouble)
        .toArray();

    // Calculate dF/F (first 50 frames as baseline)
    int baselineN = 50;
    double f0 = Arrays.stream(trace, 0, baselineN).average().orElse(1.0);

    double[] dff = Arrays.stream(trace)
        .map(v -> (v - f0) / f0)
        .toArray();

    // Write results
    List<String> output = new ArrayList<>();
    output.add("frame,intensity,dff");
    for (int i = 0; i < trace.length; i++) {
        output.add(String.format("%d,%.2f,%.6f", i, trace[i], dff[i]));
    }
    Files.write(Path.of("trace_dff.csv"), output);

    // Summary
    DoubleSummaryStatistics stats = Arrays.stream(dff).summaryStatistics();
    System.out.printf("dF/F range: %.4f to %.4f%n", stats.getMin(), stats.getMax());
    System.out.printf("Peak dF/F: %.4f at frame %d%n", stats.getMax(),
        IntStream.range(0, dff.length)
            .reduce((a, b) -> dff[a] > dff[b] ? a : b).orElse(-1));
}
```

### Example 4: Count reads per chromosome from a BAM file

```java
import htsjdk.samtools.*;
import java.io.File;
import java.util.*;

void main() {
    Map<String, Integer> chromCounts = new TreeMap<>();

    try (SamReader reader = SamReaderFactory.makeDefault()
            .open(new File("aligned.bam"))) {

        for (SAMRecord read : reader) {
            if (read.getReadUnmappedFlag() || read.getMappingQuality() < 30) continue;
            chromCounts.merge(read.getReferenceName(), 1, Integer::sum);
        }
    } catch (Exception e) {
        System.err.println("Error: " + e.getMessage());
        return;
    }

    System.out.println("Chromosome\tReads");
    chromCounts.forEach((chrom, count) ->
        System.out.printf("%s\t%,d%n", chrom, count));
}
```

---

## 42. Java vs. Python: When to Use Which

| Consideration | Java | Python |
|---|---|---|
| **Speed** | Fast (JIT-compiled, close to C for tight loops) | Slow for loops; NumPy vectorised ops are C-speed |
| **Type safety** | Compile-time checking catches errors early | Runtime errors; type hints optional |
| **Quick scripting** | Verbose; not designed for one-liners | Excellent; the REPL and notebooks are ideal |
| **Data science** | Limited ecosystem | NumPy, pandas, matplotlib, scikit-learn |
| **Bioinformatics tools** | GATK, Picard, FastQC, Trimmomatic, IGV | pysam, BioPython, scanpy, DESeq2 (via R) |
| **Image analysis** | ImageJ/FIJI plugins | scikit-image, OpenCV, napari, FLIKA |
| **Machine learning** | DL4J, Tribuo (niche) | PyTorch, TensorFlow, scikit-learn (dominant) |
| **Web applications** | Spring Boot (enterprise-grade) | Flask, Django, FastAPI |
| **Cross-platform** | JVM runs everywhere identically | Mostly, but C extensions can cause platform issues |
| **Concurrency** | Excellent (threads, virtual threads in 21+) | GIL limits true parallelism; use multiprocessing |
| **Learning curve** | Steeper (OOP required, types required) | Gentler (dynamic typing, simple syntax) |
| **IDE support** | IntelliJ IDEA is outstanding | VS Code, PyCharm are excellent |
| **Job market** | Massive (enterprise, Android, backend) | Massive (data science, ML, scripting) |

### When to use Java

- Writing ImageJ/FIJI plugins for high-performance image processing
- Building tools that need to process BAM/VCF files with htsjdk
- Extending or customising GATK/Picard
- Performance-critical applications (millions of reads, real-time processing)
- Anything that needs robust multi-threading
- Contributing to open-source bioinformatics tools

### When to use Python

- Quick data exploration and one-off analyses
- Data visualisation (matplotlib, seaborn, plotly)
- Machine learning and deep learning
- Gluing together command-line tools in a pipeline
- Prototyping algorithms before optimising
- Most day-to-day research scripting

### When to use both

Many bioinformatics workflows use Java tools called from Python/R scripts:

```python
# Python orchestrating Java tools
import subprocess

# Step 1: Run GATK (Java) for variant calling
subprocess.run(["gatk", "HaplotypeCaller", "-R", "ref.fa", "-I", "input.bam", "-O", "raw.vcf"])

# Step 2: Parse VCF and analyse in Python
import pandas as pd
vcf_data = pd.read_csv("raw.vcf", comment="#", sep="\t", header=None)
```

---

## 43. Java Reserved Words

These words have special meaning in Java and **cannot** be used as variable, method, or class names:

```
abstract    assert      boolean     break       byte
case        catch       char        class       const*
continue    default     do          double      else
enum        extends     final       finally     float
for         goto*       if          implements  import
instanceof  int         interface   long        native
new         package     private     protected   public
return      short       static      strictfp    super
switch      synchronized this       throw       throws
transient   try         void        volatile    while

* const and goto are reserved but not used in Java
```

**Literal keywords:** `true`, `false`, `null`

**Contextual keywords (Java 9+):** `var`, `yield`, `record`, `sealed`, `permits`

---

## 44. Quick Reference

### Primitive types

| Type | Size | Default | Range |
|---|---|---|---|
| `byte` | 8 bits | 0 | −128 to 127 |
| `short` | 16 bits | 0 | −32,768 to 32,767 |
| `int` | 32 bits | 0 | ±2.1 billion |
| `long` | 64 bits | 0L | ±9.2 × 10^18 |
| `float` | 32 bits | 0.0f | ~7 decimal digits |
| `double` | 64 bits | 0.0 | ~15 decimal digits |
| `char` | 16 bits | '\u0000' | Unicode character |
| `boolean` | — | false | true / false |

### String methods

| Method | Returns | Description |
|---|---|---|
| `length()` | int | Number of characters |
| `charAt(i)` | char | Character at index i |
| `substring(begin, end)` | String | Substring [begin, end) |
| `indexOf(str)` | int | First occurrence (−1 if not found) |
| `contains(str)` | boolean | Whether str is present |
| `equals(other)` | boolean | Content equality (**use this, not ==**) |
| `equalsIgnoreCase(other)` | boolean | Case-insensitive equality |
| `startsWith(prefix)` | boolean | Starts with prefix |
| `toUpperCase()` | String | All uppercase |
| `trim()` / `strip()` | String | Remove whitespace |
| `replace(old, new)` | String | Replace all occurrences |
| `split(regex)` | String[] | Split by regex |
| `isEmpty()` | boolean | Length == 0 |
| `formatted(args)` | String | Format (Java 15+) |

### Collections

| Operation | ArrayList | HashMap | HashSet |
|---|---|---|---|
| Create | `new ArrayList<>()` | `new HashMap<>()` | `new HashSet<>()` |
| Add | `add(elem)` | `put(key, val)` | `add(elem)` |
| Get | `get(index)` | `get(key)` | — |
| Remove | `remove(index)` | `remove(key)` | `remove(elem)` |
| Size | `size()` | `size()` | `size()` |
| Contains | `contains(elem)` | `containsKey(key)` | `contains(elem)` |
| Iterate | `for (E e : list)` | `for (var entry : map.entrySet())` | `for (E e : set)` |

### File I/O (java.nio.file)

| Operation | Code |
|---|---|
| Read all lines | `Files.readAllLines(Path.of("file.txt"))` |
| Read as string | `Files.readString(Path.of("file.txt"))` |
| Write lines | `Files.write(Path.of("f.txt"), lines)` |
| Write string | `Files.writeString(Path.of("f.txt"), "text")` |
| List directory | `Files.list(Path.of("dir/"))` |
| Walk recursively | `Files.walk(Path.of("dir/"))` |
| Check existence | `Files.exists(path)` |
| Create directories | `Files.createDirectories(path)` |
| Copy | `Files.copy(src, dst)` |
| Move | `Files.move(src, dst)` |
| Delete | `Files.delete(path)` |

### Stream operations

| Operation | Type | Description |
|---|---|---|
| `filter(predicate)` | Intermediate | Keep matching elements |
| `map(function)` | Intermediate | Transform each element |
| `flatMap(function)` | Intermediate | Transform and flatten |
| `sorted()` | Intermediate | Natural order |
| `distinct()` | Intermediate | Remove duplicates |
| `limit(n)` | Intermediate | Keep first n |
| `skip(n)` | Intermediate | Skip first n |
| `forEach(consumer)` | Terminal | Perform action on each |
| `collect(collector)` | Terminal | Gather into collection |
| `toList()` | Terminal | Collect to unmodifiable List |
| `count()` | Terminal | Count elements |
| `reduce(op)` | Terminal | Aggregate to single value |
| `average()` | Terminal | Average (DoubleStream) |
| `sum()` | Terminal | Sum (IntStream, DoubleStream) |
| `min()` / `max()` | Terminal | Minimum / Maximum |

### JVM command-line flags

| Flag | Meaning |
|---|---|
| `-Xmx8g` | Maximum heap size (8 GB) |
| `-Xms4g` | Initial heap size (4 GB) |
| `-XX:ParallelGCThreads=4` | GC thread count |
| `-Djava.io.tmpdir=/scratch` | Temp directory |
| `-jar app.jar` | Run a JAR file |
| `--version` | Print Java version |
| `-cp path` | Set classpath |
| `-ea` | Enable assertions |

---

*This manual was developed for the PIEZO1 research group to support graduate students and scientists in understanding Java — the language underlying many bioinformatics tools and ImageJ/FIJI plugins. For most day-to-day analysis, Python and R remain the better choice. Java becomes important when you need to write high-performance plugins, work directly with sequencing file formats, or contribute to tools like GATK and Picard.*

*For questions or suggestions, contact george.dickinson@gmail.com.*

*Java is a trademark of Oracle Corporation. OpenJDK is free software released under the GNU General Public License version 2.*
