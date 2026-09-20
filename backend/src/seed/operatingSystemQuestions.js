const operatingSystemQuestions = [
    {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which of the following best describes the primary role of an Operating System?",
    "options": [
      { "id": "A", "text": "To compile programs" },
      { "id": "B", "text": "To manage hardware resources and provide services to users" },
      { "id": "C", "text": "To design applications" },
      { "id": "D", "text": "To execute only system programs" }
    ],
    "correctAnswer": "B",
    "explanation": "An Operating System acts as an intermediary between hardware and users, managing hardware resources and providing common services.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "In a time-sharing operating system, what is the main advantage?",
    "options": [
      { "id": "A", "text": "Faster hardware" },
      { "id": "B", "text": "Multiple users can interact with the system simultaneously" },
      { "id": "C", "text": "Only one process executes at a time" },
      { "id": "D", "text": "No CPU idle time" }
    ],
    "correctAnswer": "B",
    "explanation": "Time-sharing allows multiple users to share computer resources simultaneously through rapid switching of the CPU.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which of the following is NOT a function of an operating system?",
    "options": [
      { "id": "A", "text": "Process management" },
      { "id": "B", "text": "Memory management" },
      { "id": "C", "text": "Web page designing" },
      { "id": "D", "text": "File system management" }
    ],
    "correctAnswer": "C",
    "explanation": "Web page designing is an application-level task, whereas process, memory, and file management are core OS functions.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "A real-time operating system is mainly used in:",
    "options": [
      { "id": "A", "text": "Systems requiring immediate response (e.g., embedded systems)" },
      { "id": "B", "text": "Gaming PCs" },
      { "id": "C", "text": "Office applications" },
      { "id": "D", "text": "File storage" }
    ],
    "correctAnswer": "A",
    "explanation": "Real-time operating systems (RTOS) guarantee response times within strict time constraints, ideal for embedded and control systems.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which component of OS directly interacts with hardware?",
    "options": [
      { "id": "A", "text": "Kernel" },
      { "id": "B", "text": "Shell" },
      { "id": "C", "text": "Application" },
      { "id": "D", "text": "User" }
    ],
    "correctAnswer": "A",
    "explanation": "The kernel is the core component of the operating system that has direct access to system hardware.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "What is the main difference between CLI and GUI?",
    "options": [
      { "id": "A", "text": "GUI is faster" },
      { "id": "B", "text": "CLI uses text commands while GUI uses graphical elements" },
      { "id": "C", "text": "CLI uses mouse" },
      { "id": "D", "text": "GUI uses only keyboard" }
    ],
    "correctAnswer": "B",
    "explanation": "Command Line Interface (CLI) relies on text input, while Graphical User Interface (GUI) uses windows, icons, and menus.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which type of OS is best suited for embedded devices like washing machines?",
    "options": [
      { "id": "A", "text": "Embedded OS" },
      { "id": "B", "text": "Distributed OS" },
      { "id": "C", "text": "Batch OS" },
      { "id": "D", "text": "Network OS" }
    ],
    "correctAnswer": "A",
    "explanation": "Embedded operating systems are tailored for dedicated appliances and embedded hardware constraints.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Batch processing systems are characterized by:",
    "options": [
      { "id": "A", "text": "Execution of jobs without user interaction" },
      { "id": "B", "text": "Real-time response" },
      { "id": "C", "text": "Immediate output" },
      { "id": "D", "text": "Multitasking" }
    ],
    "correctAnswer": "A",
    "explanation": "Batch systems group similar jobs together and execute them sequentially without manual user intervention during execution.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "What is meant by multiprogramming?",
    "options": [
      { "id": "A", "text": "Multiple programs loaded in memory to increase CPU utilization" },
      { "id": "B", "text": "One program execution" },
      { "id": "C", "text": "Only multitasking" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Multiprogramming keeps multiple programs in main memory so the CPU always has something to execute when one process waits.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which OS feature allows multiple programs to run apparently at the same time?",
    "options": [
      { "id": "A", "text": "Multitasking" },
      { "id": "B", "text": "Single processing" },
      { "id": "C", "text": "Compilation" },
      { "id": "D", "text": "Linking" }
    ],
    "correctAnswer": "A",
    "explanation": "Multitasking allows rapid switching of the CPU among multiple processes, giving the illusion of simultaneous execution.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "In a monolithic kernel architecture:",
    "options": [
      { "id": "A", "text": "All OS services run in kernel space" },
      { "id": "B", "text": "Services are separated" },
      { "id": "C", "text": "Only drivers run" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A monolithic kernel contains all OS services running together in a single large address space for high performance.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "What is the main advantage of microkernel architecture?",
    "options": [
      { "id": "A", "text": "Better modularity and security" },
      { "id": "B", "text": "Faster execution always" },
      { "id": "C", "text": "Less communication" },
      { "id": "D", "text": "No overhead" }
    ],
    "correctAnswer": "A",
    "explanation": "Microkernels keep only essential services in kernel space, moving others to user space for enhanced modularity and fault isolation.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which of the following is a disadvantage of layered OS structure?",
    "options": [
      { "id": "A", "text": "Performance overhead due to layers" },
      { "id": "B", "text": "Easy debugging" },
      { "id": "C", "text": "High speed" },
      { "id": "D", "text": "Less complexity" }
    ],
    "correctAnswer": "A",
    "explanation": "Traversing multiple layers for simple requests introduces performance overhead.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "A system call is used to:",
    "options": [
      { "id": "A", "text": "Request services from the OS kernel" },
      { "id": "B", "text": "Execute user programs" },
      { "id": "C", "text": "Manage CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "System calls provide the interface for user programs to request privileged services from the kernel.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which mode provides unrestricted access to system resources?",
    "options": [
      { "id": "A", "text": "User mode" },
      { "id": "B", "text": "Kernel mode" },
      { "id": "C", "text": "Safe mode" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Kernel mode (or system mode) has unrestricted access to all hardware and memory resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "What happens during the booting process?",
    "options": [
      { "id": "A", "text": "OS is loaded into memory" },
      { "id": "B", "text": "Files are deleted" },
      { "id": "C", "text": "CPU stops" },
      { "id": "D", "text": "Programs are compiled" }
    ],
    "correctAnswer": "A",
    "explanation": "Booting loads the operating system kernel from secondary storage into main memory upon startup.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which component acts as an interface between user and kernel?",
    "options": [
      { "id": "A", "text": "Shell" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "Disk" }
    ],
    "correctAnswer": "A",
    "explanation": "The shell interprets user commands and invokes system calls to interact with the kernel.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Dual-mode operation in OS ensures:",
    "options": [
      { "id": "A", "text": "Protection and security" },
      { "id": "B", "text": "Faster execution" },
      { "id": "C", "text": "More memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Dual-mode operation (user and kernel mode) protects the OS and other users from malicious or faulty user programs.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Which of the following best describes firmware?",
    "options": [
      { "id": "A", "text": "Software stored in hardware (ROM)" },
      { "id": "B", "text": "Application software" },
      { "id": "C", "text": "RAM data" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Firmware is permanent software programmed into non-volatile memory like ROM or flash memory.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "API helps developers to:",
    "options": [
      { "id": "A", "text": "Use OS functions without knowing internal implementation" },
      { "id": "B", "text": "Write assembly code" },
      { "id": "C", "text": "Access hardware directly" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "An Application Programming Interface (API) abstracts internal complexities and exposes standard functions for developers.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "OS is:",
    "options": [
      { "id": "A", "text": "Hardware" },
      { "id": "B", "text": "Interface between user and hardware" },
      { "id": "C", "text": "Application" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "An operating system serves as the primary system software bridging users/applications and computer hardware.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Kernel is:",
    "options": [
      { "id": "A", "text": "User program" },
      { "id": "B", "text": "Core of OS" },
      { "id": "C", "text": "Device" },
      { "id": "D", "text": "File" }
    ],
    "correctAnswer": "B",
    "explanation": "The kernel is the central core component of an operating system.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "OS manages:",
    "options": [
      { "id": "A", "text": "CPU only" },
      { "id": "B", "text": "Memory only" },
      { "id": "C", "text": "All resources" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "C",
    "explanation": "The OS manages all hardware and software resources including CPU, memory, storage, and I/O devices.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Batch system executes:",
    "options": [
      { "id": "A", "text": "Jobs in batches" },
      { "id": "B", "text": "One by one" },
      { "id": "C", "text": "Random" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Batch systems collect jobs into batches and execute them sequentially.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Time-sharing system allows:",
    "options": [
      { "id": "A", "text": "One user" },
      { "id": "B", "text": "Multiple users" },
      { "id": "C", "text": "No user" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Time-sharing systems enable multiple users to concurrently share system access and CPU time slices.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "OS provides:",
    "options": [
      { "id": "A", "text": "Games" },
      { "id": "B", "text": "Services" },
      { "id": "C", "text": "Data" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "The OS provides essential services to programs and users, such as execution environment and file management.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "CLI means:",
    "options": [
      { "id": "A", "text": "Command Line Interface" },
      { "id": "B", "text": "Control Line Interface" },
      { "id": "C", "text": "Code Line" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "CLI stands for Command Line Interface.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "GUI uses:",
    "options": [
      { "id": "A", "text": "Text" },
      { "id": "B", "text": "Graphics" },
      { "id": "C", "text": "Numbers" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Graphical User Interfaces use graphical elements like icons, buttons, and windows.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Embedded OS is used in:",
    "options": [
      { "id": "A", "text": "Devices" },
      { "id": "B", "text": "PC" },
      { "id": "C", "text": "Laptop" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Embedded operating systems are deployed inside dedicated electronic devices.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Real-time OS is for:",
    "options": [
      { "id": "A", "text": "Delay" },
      { "id": "B", "text": "Immediate response" },
      { "id": "C", "text": "Games" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Real-time OS is designed to provide immediate, predictable responses to inputs.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Monolithic OS means:",
    "options": [
      { "id": "A", "text": "Single large system" },
      { "id": "B", "text": "Modular" },
      { "id": "C", "text": "Layered" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A monolithic OS is structured as a single large system where all components run in kernel space.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Layered OS divides system into:",
    "options": [
      { "id": "A", "text": "Files" },
      { "id": "B", "text": "Layers" },
      { "id": "C", "text": "Threads" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "A layered architecture divides the OS into hierarchical layers, each built on top of the lower ones.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Microkernel contains:",
    "options": [
      { "id": "A", "text": "All services" },
      { "id": "B", "text": "Minimal services" },
      { "id": "C", "text": "Files" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "A microkernel implements only essential core services, delegating other services to user-space servers.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "System call is used for:",
    "options": [
      { "id": "A", "text": "OS access" },
      { "id": "B", "text": "Memory" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "System calls allow user applications to request services and access OS kernel functions.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "API stands for:",
    "options": [
      { "id": "A", "text": "Application Program Input" },
      { "id": "B", "text": "Application Programming Interface" },
      { "id": "C", "text": "App Protocol" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "API stands for Application Programming Interface.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "User mode is:",
    "options": [
      { "id": "A", "text": "Restricted mode" },
      { "id": "B", "text": "Full access" },
      { "id": "C", "text": "Kernel" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "User mode restricts applications from directly accessing hardware or executing privileged instructions.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Kernel mode is:",
    "options": [
      { "id": "A", "text": "Limited" },
      { "id": "B", "text": "Full access" },
      { "id": "C", "text": "User" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Kernel mode grants full and unrestricted access to all hardware and system instructions.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Booting means:",
    "options": [
      { "id": "A", "text": "Starting system" },
      { "id": "B", "text": "Shutdown" },
      { "id": "C", "text": "Restart" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Booting refers to the startup sequence that initializes the computer system and loads the OS.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "BIOS is:",
    "options": [
      { "id": "A", "text": "Firmware" },
      { "id": "B", "text": "Software" },
      { "id": "C", "text": "Hardware" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "BIOS (Basic Input/Output System) is firmware used to perform hardware initialization during the booting process.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Shell is:",
    "options": [
      { "id": "A", "text": "Interface" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "The shell is a command interpreter interface that exposes operating system services to users.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Process is:",
    "options": [
      { "id": "A", "text": "Program in execution" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "Data" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A process is formally defined as a program in execution.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "PCB stands for:",
    "options": [
      { "id": "A", "text": "Process Control Block" },
      { "id": "B", "text": "Program Control" },
      { "id": "C", "text": "Process Code" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "PCB stands for Process Control Block, a data structure containing all information about a process.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Process state includes:",
    "options": [
      { "id": "A", "text": "Ready" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Process states include new, ready, running, waiting, and terminated.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "New process is:",
    "options": [
      { "id": "A", "text": "Created" },
      { "id": "B", "text": "Running" },
      { "id": "C", "text": "Waiting" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A new process state represents a process that has just been created.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Ready state means:",
    "options": [
      { "id": "A", "text": "Waiting for CPU" },
      { "id": "B", "text": "Running" },
      { "id": "C", "text": "Terminated" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A process in the ready state is loaded in memory and waiting to be assigned to the CPU.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Waiting state means:",
    "options": [
      { "id": "A", "text": "Waiting for I/O" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "End" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A waiting (or blocked) state means the process is waiting for some event or I/O completion.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Context switching is:",
    "options": [
      { "id": "A", "text": "Process switch" },
      { "id": "B", "text": "Memory" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Context switching involves saving the state of a currently running process and loading the state of another process.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Scheduler selects:",
    "options": [
      { "id": "A", "text": "Process" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Schedulers select processes from queues to allocate system resources like the CPU.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Long-term scheduler controls:",
    "options": [
      { "id": "A", "text": "Job admission" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "The long-term scheduler (job scheduler) determines which jobs are admitted to the system ready queue.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Short-term scheduler controls:",
    "options": [
      { "id": "A", "text": "CPU allocation" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "The short-term scheduler (CPU scheduler) selects which ready process gets the CPU next.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "CPU scheduling is:",
    "options": [
      { "id": "A", "text": "Memory allocation" },
      { "id": "B", "text": "Process selection for CPU" },
      { "id": "C", "text": "File handling" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "CPU scheduling determines which process in the ready queue is allocated the processor.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "FCFS stands for:",
    "options": [
      { "id": "A", "text": "First Come First Serve" },
      { "id": "B", "text": "Fast CPU First Serve" },
      { "id": "C", "text": "First CPU First Serve" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "FCFS stands for First Come First Serve scheduling algorithm.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "SJF means:",
    "options": [
      { "id": "A", "text": "Short Job First" },
      { "id": "B", "text": "Shortest Job First" },
      { "id": "C", "text": "Small Job First" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "SJF stands for Shortest Job First scheduling algorithm.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Round Robin uses:",
    "options": [
      { "id": "A", "text": "Priority" },
      { "id": "B", "text": "Time quantum" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Round Robin scheduling assigns a fixed time quantum to each process in cyclic order.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Priority scheduling executes:",
    "options": [
      { "id": "A", "text": "Highest priority first" },
      { "id": "B", "text": "Lowest first" },
      { "id": "C", "text": "Random" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Priority scheduling allocates the CPU to the process with the highest priority.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Turnaround time is:",
    "options": [
      { "id": "A", "text": "Start time" },
      { "id": "B", "text": "Completion - arrival" },
      { "id": "C", "text": "Waiting" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Turnaround time is the total time taken from process submission/arrival to its completion.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Waiting time is:",
    "options": [
      { "id": "A", "text": "Time spent in ready queue" },
      { "id": "B", "text": "Execution time" },
      { "id": "C", "text": "Total time" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Waiting time is the total sum of time a process spends waiting in the ready queue.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Preemptive scheduling means:",
    "options": [
      { "id": "A", "text": "Interrupt process" },
      { "id": "B", "text": "No interrupt" },
      { "id": "C", "text": "End process" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Preemptive scheduling allows the operating system to forcibly interrupt and remove a running process from the CPU.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Non-preemptive means:",
    "options": [
      { "id": "A", "text": "Interrupt" },
      { "id": "B", "text": "No interruption" },
      { "id": "C", "text": "Delete" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "In non-preemptive scheduling, once a process gets the CPU, it keeps it until it terminates or switches to a waiting state.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Starvation occurs when:",
    "options": [
      { "id": "A", "text": "Low priority processes are indefinitely blocked" },
      { "id": "B", "text": "Fast execution" },
      { "id": "C", "text": "Memory full" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Starvation (or indefinite blocking) happens when low-priority processes never get CPU time because higher-priority processes keep arriving.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thread is:",
    "options": [
      { "id": "A", "text": "Lightweight process" },
      { "id": "B", "text": "Heavy process" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A thread is a basic unit of CPU utilization, often referred to as a lightweight process.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Multithreading means:",
    "options": [
      { "id": "A", "text": "Multiple threads" },
      { "id": "B", "text": "Single thread" },
      { "id": "C", "text": "No thread" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Multithreading enables a single process to execute multiple threads concurrently.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thread shares:",
    "options": [
      { "id": "A", "text": "Memory and resources" },
      { "id": "B", "text": "CPU only" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Threads within the same process share code, data, and system resources like open files.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "User-level thread managed by:",
    "options": [
      { "id": "A", "text": "User application libraries" },
      { "id": "B", "text": "OS kernel" },
      { "id": "C", "text": "CPU hardware" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "User-level threads are managed by user-space thread libraries without direct kernel support.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Kernel thread managed by:",
    "options": [
      { "id": "A", "text": "User" },
      { "id": "B", "text": "OS" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "B",
    "explanation": "Kernel threads are directly supported, scheduled, and managed by the operating system kernel.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thread creation is:",
    "options": [
      { "id": "A", "text": "Fast" },
      { "id": "B", "text": "Slow" },
      { "id": "C", "text": "Complex" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Thread creation is faster than process creation because threads share process resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thread switching is:",
    "options": [
      { "id": "A", "text": "Fast" },
      { "id": "B", "text": "Slow" },
      { "id": "C", "text": "Heavy" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Switching between threads requires fewer state changes compared to full process context switches.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Multithreading improves:",
    "options": [
      { "id": "A", "text": "Performance and responsiveness" },
      { "id": "B", "text": "Delay" },
      { "id": "C", "text": "Error" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Multithreading increases application responsiveness and throughput.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thread state includes:",
    "options": [
      { "id": "A", "text": "Ready" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Threads share similar execution states like ready, running, and blocked.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Single thread means:",
    "options": [
      { "id": "A", "text": "One execution sequence per process" },
      { "id": "B", "text": "Multiple" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A single-threaded process has only one execution flow at any given time.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Concurrency means:",
    "options": [
      { "id": "A", "text": "Multiple tasks making progress" },
      { "id": "B", "text": "Single" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Concurrency is the ability of multiple tasks to make progress in overlapping time periods.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Critical section is:",
    "options": [
      { "id": "A", "text": "Shared resource code segment" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A critical section is the code segment that accesses shared resources prone to race conditions.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Mutex is:",
    "options": [
      { "id": "A", "text": "Mutual exclusion lock" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A mutex is a synchronization primitive used to provide exclusive access to a critical section.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Semaphore is:",
    "options": [
      { "id": "A", "text": "Synchronization tool" },
      { "id": "B", "text": "Memory" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A semaphore is an integer variable used for signaling and controlling access to shared resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Binary semaphore has:",
    "options": [
      { "id": "A", "text": "Two values (0 and 1)" },
      { "id": "B", "text": "Many" },
      { "id": "C", "text": "Zero only" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A binary semaphore restricts its values strictly to 0 and 1, acting similarly to a mutex.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Race condition is:",
    "options": [
      { "id": "A", "text": "Data conflict due to concurrent access" },
      { "id": "B", "text": "Fast execution" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A race condition occurs when multiple processes access and manipulate shared data concurrently, yielding unpredictable results.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Synchronization prevents:",
    "options": [
      { "id": "A", "text": "Data conflict / inconsistency" },
      { "id": "B", "text": "Speed" },
      { "id": "C", "text": "Delay" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Proper synchronization ensures data consistency when multiple processes share resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Deadlock occurs due to:",
    "options": [
      { "id": "A", "text": "Circular resource waiting among processes" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Deadlock happens when processes are permanently blocked waiting for resources held by each other.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Busy waiting means:",
    "options": [
      { "id": "A", "text": "Continuous checking condition in a loop" },
      { "id": "B", "text": "Sleep" },
      { "id": "C", "text": "Stop" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Busy waiting wastes CPU cycles as a process continuously loops while waiting for a lock.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Monitor is:",
    "options": [
      { "id": "A", "text": "High-level synchronization construct" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A monitor is a synchronization construct providing safe mutual exclusion encapsulation.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Deadlock is:",
    "options": [
      { "id": "A", "text": "State of permanent progress blockage" },
      { "id": "B", "text": "Fast execution" },
      { "id": "C", "text": "Memory" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Deadlock represents a permanent stall where execution cannot proceed.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Deadlock needs:",
    "options": [
      { "id": "A", "text": "Four necessary conditions including circular wait" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Deadlock requires mutual exclusion, hold and wait, no preemption, and circular wait simultaneously.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Mutual exclusion means:",
    "options": [
      { "id": "A", "text": "Only one process can use a resource at a time" },
      { "id": "B", "text": "Many" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Mutual exclusion ensures non-shareable resources are accessed by only one process at a time.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Hold and wait means:",
    "options": [
      { "id": "A", "text": "Holding resources while waiting for others" },
      { "id": "B", "text": "Release" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A process holds currently allocated resources while waiting to acquire additional resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "No preemption means:",
    "options": [
      { "id": "A", "text": "Resources cannot be forcibly taken from a process" },
      { "id": "B", "text": "Take" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Resources can only be released voluntarily by the process holding them.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Circular wait is:",
    "options": [
      { "id": "A", "text": "Closed chain of processes waiting for resources" },
      { "id": "B", "text": "Random" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Circular wait occurs when process P0 waits for P1, P1 for P2, and Pn for P0.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Deadlock prevention:",
    "options": [
      { "id": "A", "text": "Invalidates at least one necessary condition" },
      { "id": "B", "text": "Allow all" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Deadlock prevention techniques ensure that at least one of the four Coffman conditions cannot hold.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Deadlock avoidance uses:",
    "options": [
      { "id": "A", "text": "Banker’s algorithm" },
      { "id": "B", "text": "FCFS" },
      { "id": "C", "text": "SJF" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Banker's algorithm is a classic deadlock avoidance method that tests for safe state allocations.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Safe state means:",
    "options": [
      { "id": "A", "text": "System can allocate resources without deadlock" },
      { "id": "B", "text": "Deadlock" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A safe state ensures there is at least one safe execution sequence that satisfies all processes.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Unsafe state means:",
    "options": [
      { "id": "A", "text": "Possible occurrence of deadlock" },
      { "id": "B", "text": "Safe" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "An unsafe state does not guarantee deadlock, but the OS cannot prevent processes from entering deadlock.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Memory management is:",
    "options": [
      { "id": "A", "text": "Manage RAM allocation and tracking" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Memory management tracks primary memory usage and allocates/deallocates memory space for processes.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Paging divides memory into:",
    "options": [
      { "id": "A", "text": "Fixed-size blocks called pages and frames" },
      { "id": "B", "text": "Files" },
      { "id": "C", "text": "Blocks" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Paging divides logical memory into pages and physical memory into equal-sized frames.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Segmentation divides memory into:",
    "options": [
      { "id": "A", "text": "Variable-size logical segments" },
      { "id": "B", "text": "Pages" },
      { "id": "C", "text": "Files" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Segmentation organizes memory into variable-sized logical units such as code, data, and stack.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Virtual memory is:",
    "options": [
      { "id": "A", "text": "Technique using secondary storage as extended RAM" },
      { "id": "B", "text": "RAM" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Virtual memory allows execution of processes that may not be completely loaded in physical RAM.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Page fault occurs when:",
    "options": [
      { "id": "A", "text": "Required page is not currently in memory" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A page fault trap is generated when a process references a page not currently loaded in physical memory.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Thrashing means:",
    "options": [
      { "id": "A", "text": "Excessive paging activity degrading performance" },
      { "id": "B", "text": "Fast CPU" },
      { "id": "C", "text": "File" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Thrashing occurs when the system spends more time swapping pages in and out than executing actual instructions.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Frame is:",
    "options": [
      { "id": "A", "text": "Physical memory block" },
      { "id": "B", "text": "File" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Physical memory is broken down into fixed-sized blocks known as frames.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "TLB is:",
    "options": [
      { "id": "A", "text": "Translation Lookaside Buffer (hardware cache for page tables)" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "TLB is a fast associative hardware cache used to speed up virtual-to-physical address translation.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Swapping is:",
    "options": [
      { "id": "A", "text": "Moving process between main memory and disk" },
      { "id": "B", "text": "Delete" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Swapping temporarily moves processes between RAM and secondary storage backing store.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Fragmentation is:",
    "options": [
      { "id": "A", "text": "Wasted memory space" },
      { "id": "B", "text": "Full memory" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Fragmentation refers to unused or wasted memory space (internal or external).",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File is:",
    "options": [
      { "id": "A", "text": "Logical collection of related data" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A file is a named collection of related information recorded on secondary storage.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Directory stores:",
    "options": [
      { "id": "A", "text": "File information and metadata" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Directories maintain tables of contents containing file names, attributes, and locations.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File system organizes:",
    "options": [
      { "id": "A", "text": "Files and directories on storage" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "File systems structure how data is stored, retrieved, and managed on storage devices.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File type includes:",
    "options": [
      { "id": "A", "text": "Text, binary, executable files" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Files are categorized by types such as text, source code, executables, and media.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File access method:",
    "options": [
      { "id": "A", "text": "Sequential and direct access" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Files can be accessed sequentially (record by record) or directly (random access).",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Indexing means:",
    "options": [
      { "id": "A", "text": "Fast access using pointers/keys" },
      { "id": "B", "text": "Slow" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Indexing provides fast lookup capabilities similar to an index in a book.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File permission is:",
    "options": [
      { "id": "A", "text": "Access control mechanism" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "File permissions dictate read, write, and execute privileges for users.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "FAT is:",
    "options": [
      { "id": "A", "text": "File Allocation Table" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "FAT stands for File Allocation Table, a classic file system architecture.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "NTFS is:",
    "options": [
      { "id": "A", "text": "New Technology File System" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "NTFS is a modern journaling file system used primarily in Windows operating systems.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "File deletion means:",
    "options": [
      { "id": "A", "text": "Removing file entry and freeing storage blocks" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Deleting a file clears its directory entry and marks its allocated disk space as free.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Secondary storage is:",
    "options": [
      { "id": "A", "text": "Permanent non-volatile storage" },
      { "id": "B", "text": "Temporary" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Secondary storage retains data permanently even when the power is turned off.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "HDD is:",
    "options": [
      { "id": "A", "text": "Hard Disk Drive" },
      { "id": "B", "text": "RAM" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "HDD stands for Hard Disk Drive, a magnetic storage device.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "SSD is:",
    "options": [
      { "id": "A", "text": "Solid State Drive" },
      { "id": "B", "text": "RAM" },
      { "id": "C", "text": "CPU" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "SSD stands for Solid State Drive, using flash memory for fast persistent storage.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Disk scheduling is:",
    "options": [
      { "id": "A", "text": "Determining order of disk I/O requests" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Disk scheduling algorithms optimize disk arm movement to minimize seek time.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "FCFS disk scheduling:",
    "options": [
      { "id": "A", "text": "Services requests in arrival order" },
      { "id": "B", "text": "Last" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "FCFS services disk requests strictly in the order they arrive.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "SSTF selects:",
    "options": [
      { "id": "A", "text": "Request closest to current head position" },
      { "id": "B", "text": "Far" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Shortest Seek Time First (SSTF) services the request closest to the current head position.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "SCAN is:",
    "options": [
      { "id": "A", "text": "Elevator disk scheduling algorithm" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "The SCAN algorithm moves the disk arm across the disk servicing requests in one direction then reversing.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Seek time is:",
    "options": [
      { "id": "A", "text": "Time to position disk arm over desired track" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Seek time is the time taken for the disk arm to move to the correct cylinder/track.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Latency is:",
    "options": [
      { "id": "A", "text": "Rotational delay before desired sector reaches head" },
      { "id": "B", "text": "Speed" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Rotational latency is the time waiting for the target sector to rotate under the read/write head.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Throughput is:",
    "options": [
      { "id": "A", "text": "Amount of work completed in given time" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Throughput measures the number of processes executed per time unit.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "I/O means:",
    "options": [
      { "id": "A", "text": "Input Output operations" },
      { "id": "B", "text": "Internal" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "I/O refers to communication between the information processing system and the outside world.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Device driver is:",
    "options": [
      { "id": "A", "text": "Software interface for specific hardware devices" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A device driver acts as a translator between OS commands and hardware device controllers.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Interrupt is:",
    "options": [
      { "id": "A", "text": "Signal to CPU requiring immediate attention" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "An interrupt signals the CPU to suspend its current activity and service an urgent event.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "DMA is:",
    "options": [
      { "id": "A", "text": "Direct Memory Access" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "Disk" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "DMA allows peripheral hardware to transfer data directly to and from memory without heavy CPU intervention.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Buffer is:",
    "options": [
      { "id": "A", "text": "Temporary storage area for data transfer" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A buffer temporarily holds data while it is being transferred between devices or processes.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Spooling is:",
    "options": [
      { "id": "A", "text": "Holding jobs in a buffer queue for peripheral output" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Spooling (Simultaneous Peripheral Operations On-Line) queues jobs for devices like printers.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Blocking I/O means:",
    "options": [
      { "id": "A", "text": "Process waits until I/O operation completes" },
      { "id": "B", "text": "Continue" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "In blocking I/O, the calling process is suspended until the I/O request finishes.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Non-blocking I/O means:",
    "options": [
      { "id": "A", "text": "Control returns immediately without waiting for I/O" },
      { "id": "B", "text": "Wait" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Non-blocking I/O returns control immediately, letting the process continue execution.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Polling is:",
    "options": [
      { "id": "A", "text": "CPU repeatedly checking device status" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Polling involves the CPU continuously interrogating device status flags to see if action is needed.",
    "difficulty": "Medium"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "I/O improves:",
    "options": [
      { "id": "A", "text": "System efficiency and device coordination" },
      { "id": "B", "text": "Error" },
      { "id": "C", "text": "None" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Efficient I/O management maximizes overall system performance and hardware utilization.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Security means:",
    "options": [
      { "id": "A", "text": "Protection of system and data from threats" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "OS security safeguards resources and data against unauthorized access or breaches.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Authentication is:",
    "options": [
      { "id": "A", "text": "Verifying user identity" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Authentication confirms that users or systems are who they claim to be.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Authorization is:",
    "options": [
      { "id": "A", "text": "Granting specific access rights to users" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Authorization determines whether an authenticated user has permission to access specific resources.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Encryption is:",
    "options": [
      { "id": "A", "text": "Converting data into ciphertext for security" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Encryption secures data by scrambling it into unreadable ciphertext without the proper decryption key.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Firewall is:",
    "options": [
      { "id": "A", "text": "Network security system controlling traffic" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A firewall monitors and filters incoming and outgoing network traffic based on security rules.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Virus is:",
    "options": [
      { "id": "A", "text": "Malicious software code replicating itself" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A computer virus is malicious code that attaches itself to programs and replicates.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Trojan is:",
    "options": [
      { "id": "A", "text": "Hidden malicious program masquerading as useful" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A Trojan horse disguises itself as legitimate software while carrying out unauthorized actions.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Password is:",
    "options": [
      { "id": "A", "text": "Secret security key for authentication" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "A password is a secret string used for user authentication.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Access control is:",
    "options": [
      { "id": "A", "text": "Limiting access to system resources" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Access control regulates who or what can view or use resources in a computing environment.",
    "difficulty": "Easy"
  },
  {
    "competencyId": "os",
    "competencyName": "Operating Systems",
    "question": "Backup is:",
    "options": [
      { "id": "A", "text": "Copy of data for recovery purposes" },
      { "id": "B", "text": "CPU" },
      { "id": "C", "text": "RAM" },
      { "id": "D", "text": "None" }
    ],
    "correctAnswer": "A",
    "explanation": "Backups create redundant copies of data to protect against loss or corruption.",
    "difficulty": "Easy"
  }
]
export default operatingSystemQuestions;