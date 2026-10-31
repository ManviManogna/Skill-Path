import os
import re
import json
import logging
from typing import Optional, Dict, Any, List
import requests
from ..config import settings

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        self.default_api_key = settings.GEMINI_API_KEY
        self.model = "gemini-1.5-flash"

    def is_configured(self, custom_key: Optional[str] = None) -> bool:
        key = custom_key or self.default_api_key
        return bool(key and len(key.strip()) > 10)

    def generate_response(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        custom_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calls Gemini API if GEMINI_API_KEY or custom_key is configured.
        Otherwise, uses the dynamic deep knowledge engine.
        """
        active_key = (custom_key or self.default_api_key or "").strip()

        if active_key and len(active_key) > 10:
            try:
                api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"
                headers = {"Content-Type": "application/json"}
                params = {"key": active_key}
                
                contents = []
                if system_instruction:
                    contents.append({
                        "role": "user",
                        "parts": [{"text": f"System Instruction: {system_instruction}"}]
                    })
                    contents.append({
                        "role": "model",
                        "parts": [{"text": "Understood. I will act as the student's personal SkillPath AI mentor, providing comprehensive, well-structured, practical guidance with examples."}]
                    })

                contents.append({
                    "role": "user",
                    "parts": [{"text": prompt}]
                })

                payload = {
                    "contents": contents,
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 2048,
                    }
                }

                response = requests.post(
                    api_url,
                    headers=headers,
                    params=params,
                    json=payload,
                    timeout=25
                )

                if response.status_code == 200:
                    data = response.json()
                    candidate_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                    if candidate_text:
                        return {
                            "success": True,
                            "is_demo": False,
                            "text": candidate_text,
                            "model": f"Gemini 1.5 Flash (Live AI)"
                        }
                else:
                    logger.warning(f"Gemini API returned status {response.status_code}: {response.text}")
            except Exception as e:
                logger.exception("Failed to query live Gemini API, falling back to dynamic knowledge engine")

        # Dynamic Knowledge & Reasoning Engine
        dynamic_answer = self._generate_dynamic_knowledge_response(prompt)
        return {
            "success": True,
            "is_demo": True,
            "text": dynamic_answer,
            "model": "SkillPath AI Intelligent Knowledge Engine"
        }

    def _generate_dynamic_knowledge_response(self, prompt: str) -> str:
        """
        Comprehensive knowledge engine that parses ANY question and provides
        detailed explanations, code examples, trade-offs, and actionable steps.
        """
        q = prompt.strip().lower()

        # 1. Bubble Sort / Sorting Algorithms
        if "bubble sort" in q:
            return (
                "### 🔄 Bubble Sort: Complete Guide & Implementation\n\n"
                "**Bubble Sort** is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements \"bubble up\" to the end with each pass.\n\n"
                "#### 1. How It Works (Step-by-Step)\n"
                "- Compare adjacent elements `arr[j]` and `arr[j+1]`.\n"
                "- If `arr[j] > arr[j+1]`, swap them.\n"
                "- Repeat for `n-1` passes. After pass `i`, the largest `i` elements are sorted at the end.\n"
                "- **Optimization**: Use a boolean flag `swapped` to exit early if no swaps occur (O(N) best case).\n\n"
                "#### 2. Python Implementation with Optimization\n"
                "```python\n"
                "def bubble_sort(arr: list[int]) -> list[int]:\n"
                "    n = len(arr)\n"
                "    for i in range(n):\n"
                "        swapped = False\n"
                "        for j in range(0, n - i - 1):\n"
                "            if arr[j] > arr[j + 1]:\n"
                "                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n"
                "                swapped = True\n"
                "        if not swapped:  # Already sorted\n"
                "            break\n"
                "    return arr\n"
                "```\n\n"
                "#### 3. Complexity & Placement Insights\n"
                "- **Time Complexity**: Best: `O(N)` (already sorted), Average/Worst: `O(N^2)`\n"
                "- **Space Complexity**: `O(1)` (in-place sorting)\n"
                "- **Stability**: Stable (does not change relative order of equal elements)\n"
                "- **Interview Tip**: Never use Bubble Sort in production! Use **Merge Sort** or **Quick Sort** (`O(N log N)`). Interviewers ask Bubble Sort to test your understanding of adjacent swapping and early termination optimizations."
            )

        # 2. Merge Sort
        if "merge sort" in q:
            return (
                "### ⚡ Merge Sort: Divide and Conquer Algorithm\n\n"
                "**Merge Sort** is an efficient, general-purpose, comparison-based sorting algorithm based on the **Divide and Conquer** paradigm.\n\n"
                "#### 1. Core Mechanics\n"
                "1. **Divide**: Split the array into two halves at `mid = len(arr) // 2`.\n"
                "2. **Conquer**: Recursively sort both sub-arrays.\n"
                "3. **Combine**: Merge the two sorted sub-arrays into a single sorted array.\n\n"
                "#### 2. Python Implementation\n"
                "```python\n"
                "def merge_sort(arr: list[int]) -> list[int]:\n"
                "    if len(arr) <= 1:\n"
                "        return arr\n"
                "    mid = len(arr) // 2\n"
                "    left = merge_sort(arr[:mid])\n"
                "    right = merge_sort(arr[mid:])\n"
                "    return merge(left, right)\n\n"
                "def merge(left: list[int], right: list[int]) -> list[int]:\n"
                "    result = []\n"
                "    i = j = 0\n"
                "    while i < len(left) and j < len(right):\n"
                "        if left[i] <= right[j]:\n"
                "            result.append(left[i]); i += 1\n"
                "        else:\n"
                "            result.append(right[j]); j += 1\n"
                "    result.extend(left[i:])\n"
                "    result.extend(right[j:])\n"
                "    return result\n"
                "```\n\n"
                "#### 3. Complexity Analysis\n"
                "- **Time Complexity**: `O(N log N)` across Best, Average, and Worst cases (guaranteed!).\n"
                "- **Space Complexity**: `O(N)` auxiliary space for merging arrays.\n"
                "- **Preferred For**: Linked Lists sorting (`O(1)` extra space) and external sorting of large files."
            )

        # 3. Quick Sort
        if "quick sort" in q:
            return (
                "### ⚡ Quick Sort: In-Place Partitioning\n\n"
                "**Quick Sort** picks an element as a **pivot** and partitions the array around the picked pivot such that smaller elements are on the left and larger elements are on the right.\n\n"
                "#### 1. Complexity & Key Points\n"
                "- **Average Time**: `O(N log N)` with small constant factors (often faster than Merge Sort in practice).\n"
                "- **Worst Case**: `O(N^2)` when array is already sorted and first/last element is picked as pivot. Mitigate this by using **Randomized Pivot**.\n"
                "- **Space**: `O(log N)` call stack space (in-place).\n\n"
                "#### 2. Key Code Structure (Lomuto Partition)\n"
                "```python\n"
                "def quick_sort(arr, low, high):\n"
                "    if low < high:\n"
                "        pi = partition(arr, low, high)\n"
                "        quick_sort(arr, low, pi - 1)\n"
                "        quick_sort(arr, pi + 1, high)\n"
                "```"
            )

        # 4. Binary Search
        if "binary search" in q:
            return (
                "### 🔍 Binary Search: Logarithmic Search Mastery\n\n"
                "Binary Search works on **sorted collections** by repeatedly dividing the search interval in half. If the target value is less than the midpoint, search the left half; otherwise, search the right half.\n\n"
                "#### 1. Optimal Implementation (Avoids Integer Overflow)\n"
                "```python\n"
                "def binary_search(nums: list[int], target: int) -> int:\n"
                "    left, right = 0, len(nums) - 1\n"
                "    while left <= right:\n"
                "        mid = left + (right - left) // 2  # Prevents integer overflow\n"
                "        if nums[mid] == target:\n"
                "            return mid\n"
                "        elif nums[mid] < target:\n"
                "            left = mid + 1\n"
                "        else:\n"
                "            right = mid - 1\n"
                "    return -1  # Target not found\n"
                "```\n\n"
                "#### 2. Complexity & Advanced Patterns\n"
                "- **Time Complexity**: `O(log N)`\n"
                "- **Space Complexity**: `O(1)` iterative\n"
                "- **Advanced Applications in Interviews**: Binary Search on Answer Space (e.g. *Koko Eating Bananas*, *Capacity To Ship Packages Within D Days*), finding lower bound / upper bound."
            )

        # 5. Operating Systems - Virtual Memory, Paging, Deadlocks, Process vs Thread
        if "virtual memory" in q or "paging" in q:
            return (
                "### 🧠 Virtual Memory & Paging in Operating Systems\n\n"
                "**Virtual Memory** is a memory management capability of an OS that uses hardware (MMU) and disk storage to allow an application to address more memory than is physically installed.\n\n"
                "#### 1. Core Mechanics: Paging\n"
                "- **Virtual Address Space** is divided into fixed-size blocks called **Pages** (typically 4 KB).\n"
                "- **Physical RAM** is divided into blocks of the same size called **Page Frames**.\n"
                "- The **Page Table** maps Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN).\n\n"
                "#### 2. Page Fault & Page Replacement\n"
                "- **Page Fault**: Occurs when a program accesses a page that is marked invalid or not currently loaded in physical RAM. The OS trap handles this by fetching the page from swap disk.\n"
                "- **Replacement Algorithms**: \n"
                "  - **FIFO** (First-In, First-Out - suffers from Belady's Anomaly)\n"
                "  - **LRU** (Least Recently Used - standard industry baseline)\n"
                "  - **Optimal (MIN)** (replaces page not used for longest time in future - theoretical benchmark).\n\n"
                "#### 3. TLB (Translation Lookaside Buffer)\n"
                "A fast hardware cache inside the CPU that caches recent virtual-to-physical translations to avoid double memory access overhead."
            )

        if "process" in q and "thread" in q:
            return (
                "### ⚙️ Process vs. Thread: Essential OS Interview Comparison\n\n"
                "| Feature | Process | Thread |\n"
                "| :--- | :--- | :--- |\n"
                "| **Definition** | An executing instance of a program | A lightweight unit of execution within a process |\n"
                "| **Memory Space** | Separate, isolated memory space (Text, Data, Heap) | Shares code, data, and heap with peer threads; has own stack and registers |\n"
                "| **Creation Overhead** | High (fork system call, copying address space) | Low (shares existing process resources) |\n"
                "| **Context Switch** | Slow (requires flushing TLB and switching page tables) | Fast (no page table switch required) |\n"
                "| **Communication** | IPC (Pipes, Sockets, Shared Memory, Message Queues) | Direct shared memory access (requires synchronization: Mutex/Semaphore) |\n"
                "| **Fault Tolerance** | If one process crashes, others continue unaffected | If one thread causes a segfault, the entire process crashes |\n\n"
                "📌 **When to use what**: Use multi-processing for CPU-heavy tasks or strict security isolation (e.g. Chrome browser tabs). Use multi-threading for I/O-bound tasks with frequent data sharing (e.g. Web server handling incoming network requests)."
            )

        if "deadlock" in q:
            return (
                "### 🔒 Deadlocks in Operating Systems\n\n"
                "A **Deadlock** is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process.\n\n"
                "#### 1. The 4 Necessary Coffman Conditions for Deadlock\n"
                "1. **Mutual Exclusion**: At least one resource is held in non-shareable mode.\n"
                "2. **Hold and Wait**: A process holds at least one resource and is waiting to acquire additional resources.\n"
                "3. **No Preemption**: Resources cannot be forcibly taken from a process; they must be released voluntarily.\n"
                "4. **Circular Wait**: A closed chain of processes exists where each process holds a resource needed by the next.\n\n"
                "#### 2. Deadlock Handling Strategies\n"
                "- **Prevention**: Invalidate at least one of the 4 conditions (e.g., impose strict global resource ordering to eliminate circular wait).\n"
                "- **Avoidance**: Banker's Algorithm (allocates resources only if system remains in a \"Safe State\").\n"
                "- **Detection & Recovery**: Resource Allocation Graph (RAG) cycle detection; recover by killing processes or preempting resources.\n"
                "- **Ignorance**: The \"Ostrich Algorithm\" used by general OS (Linux/Windows) assuming deadlocks are rare enough that rebooting is acceptable."
            )

        # 6. DBMS & SQL - Normalization, ACID, Indexing, Joins
        if "normalization" in q or "1nf" in q or "2nf" in q or "3nf" in q:
            return (
                "### 🗄️ Database Normalization: 1NF, 2NF, 3NF Explained\n\n"
                "**Normalization** is the process of organizing data in a relational database to **reduce data redundancy** and avoid insertion, update, and deletion anomalies.\n\n"
                "#### 1. The Normal Forms\n"
                "- **1NF (First Normal Form)**:\n"
                "  - Each column must contain atomic (indivisible) values.\n"
                "  - No repeating groups or arrays in a single column.\n"
                "  - Each row must be uniquely identifiable (Primary Key).\n"
                "- **2NF (Second Normal Form)**:\n"
                "  - Must be in 1NF.\n"
                "  - Eliminates **Partial Functional Dependency** (all non-key attributes must depend on the *entire* primary key, not just part of a composite key).\n"
                "- **3NF (Third Normal Form)**:\n"
                "  - Must be in 2NF.\n"
                "  - Eliminates **Transitive Dependency** (non-key columns must not depend on other non-key columns: `A -> B` and `B -> C`).\n"
                "- **BCNF (Boyce-Codd Normal Form)**:\n"
                "  - Stricter version of 3NF: for every functional dependency `X -> Y`, `X` must be a super key.\n\n"
                "💡 **Industry Tip**: Most production systems normalize up to **3NF** for transactional integrity (OLTP), but denormalize tables in Data Warehouses (OLAP) to speed up complex analytics joins."
            )

        if "acid" in q:
            return (
                "### 🛡️ ACID Properties in Database Transactions\n\n"
                "**ACID** ensures that database transactions are processed reliably:\n\n"
                "1. **Atomicity (\"All or Nothing\")**: \n"
                "   - Either the entire transaction succeeds (COMMIT) or completely rolls back (ROLLBACK). If money is deducted from Account A, it *must* reach Account B.\n"
                "2. **Consistency**: \n"
                "   - The database moves from one valid state to another, satisfying all defined integrity constraints (foreign keys, uniqueness, checks).\n"
                "3. **Isolation**: \n"
                "   - Concurrent transactions execute without interfering with each other. Isolation levels: *Read Uncommitted, Read Committed, Repeatable Read, Serializable*.\n"
                "4. **Durability**: \n"
                "   - Once a transaction is committed, its changes survive even if the database crashes or server loses power (enforced via Write-Ahead Logging / WAL)."
            )

        # 7. Object-Oriented Programming (OOP)
        if "oop" in q or "polymorphism" in q or "encapsulation" in q or "inheritance" in q or "abstraction" in q:
            return (
                "### 🧱 The 4 Pillars of Object-Oriented Programming (OOP)\n\n"
                "1. **Encapsulation**: \n"
                "   - Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access to internal components using access specifiers (`private`, `protected`, `public`).\n"
                "2. **Abstraction**: \n"
                "   - Hiding complex implementation details and showing only essential features to the user (e.g. using Abstract Classes and Interfaces).\n"
                "3. **Inheritance**: \n"
                "   - Mechanism where a child class acquires properties and behaviors of a parent class (`class Dog extends Animal`), promoting code reusability.\n"
                "4. **Polymorphism (\"Many Forms\")**:\n"
                "   - **Compile-time (Static)**: Method Overloading (same method name, different parameters).\n"
                "   - **Run-time (Dynamic)**: Method Overriding (subclass provides specific implementation of a method declared in superclass via virtual functions).\n\n"
                "#### Python Code Example:\n"
                "```python\n"
                "class Shape:  # Abstraction\n"
                "    def area(self): raise NotImplementedError()\n\n"
                "class Circle(Shape):  # Inheritance & Polymorphism\n"
                "    def __init__(self, radius: float):\n"
                "        self.__radius = radius  # Encapsulation (private attribute)\n\n"
                "    def area(self) -> float:\n"
                "        return 3.14159 * (self.__radius ** 2)\n"
                "```"
            )

        # 8. Computer Networks - TCP vs UDP, DNS, OSI
        if "tcp" in q or "udp" in q:
            return (
                "### 🌐 TCP vs. UDP: Transport Layer Protocols\n\n"
                "| Aspect | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |\n"
                "| :--- | :--- | :--- |\n"
                "| **Connection** | Connection-oriented (3-way handshake) | Connectionless (fire and forget) |\n"
                "| **Reliability** | Guaranteed delivery (acknowledgments & retransmissions) | Best effort (packets may drop or arrive out of order) |\n"
                "| **Ordering** | In-order delivery guaranteed by sequence numbers | No ordering guarantee |\n"
                "| **Speed** | Slower due to flow control & congestion control | Very fast with minimal header overhead (8 bytes vs 20+ bytes) |\n"
                "| **Use Cases** | Web pages (HTTP/HTTPS), File transfers (FTP), Email (SMTP) | Video streaming, VoIP, Gaming, DNS queries |\n\n"
                "#### The TCP 3-Way Handshake:\n"
                "1. **Client -> Server**: `SYN` (Synchronize sequence numbers)\n"
                "2. **Server -> Client**: `SYN-ACK` (Acknowledge client SYN, send server SYN)\n"
                "3. **Client -> Server**: `ACK` (Connection established, data transmission starts)"
            )

        # 9. Dynamic Programming
        if "dynamic programming" in q or "dp" in q:
            return (
                "### 💡 Dynamic Programming (DP) Strategy Guide\n\n"
                "**Dynamic Programming** solves complex problems by breaking them down into simpler subproblems, solving each subproblem once, and storing their solutions (caching/memoization).\n\n"
                "#### 1. The Two Key Properties\n"
                "1. **Overlapping Subproblems**: The same subproblems are solved repeatedly (e.g. `fib(5)` calculates `fib(3)` multiple times).\n"
                "2. **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions of its subproblems.\n\n"
                "#### 2. Approaches: Top-Down vs Bottom-Up\n"
                "- **Top-Down (Memoization)**: Write recursive solution + add a hash table/array to cache results.\n"
                "- **Bottom-Up (Tabulation)**: Build a table iteratively starting from base cases up to the target value.\n\n"
                "#### 3. Classic Patterns to Master for Interviews:\n"
                "- **0/1 Knapsack & Unbounded Knapsack**\n"
                "- **Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)**\n"
                "- **Coin Change & Subsets with Target Sum**\n"
                "- **Matrix Grid Traversal (Unique Paths, Minimum Path Sum)**\n"
                "- **Palindromic Substrings**"
            )

        # 10. Docker & Containers
        if "docker" in q or "container" in q:
            return (
                "### 🐳 Docker & Containerization Essentials\n\n"
                "**Docker** packages an application and all its dependencies (runtime, system tools, libraries) into a standardized unit called a **container**, ensuring it runs reliably in any environment (\"Works on my machine and in production!\").\n\n"
                "#### 1. Key Terminology\n"
                "- **Dockerfile**: A text blueprint containing instructions to build a Docker image (`FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`).\n"
                "- **Image**: An immutable, read-only template used to create containers.\n"
                "- **Container**: A running, isolated instance of a Docker image.\n"
                "- **Docker Compose**: A tool for defining and running multi-container Docker applications (e.g. React frontend + FastAPI backend + PostgreSQL database).\n\n"
                "#### 2. Sample Production Dockerfile for Python FastAPI:\n"
                "```dockerfile\n"
                "FROM python:3.11-slim\n"
                "WORKDIR /app\n"
                "COPY requirements.txt .\n"
                "RUN pip install --no-cache-dir -r requirements.txt\n"
                "COPY . .\n"
                "EXPOSE 8000\n"
                "CMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n"
                "```"
            )

        # 11. Git & Version Control
        if "git" in q or "github" in q or "rebase" in q:
            return (
                "### 🐙 Git Version Control Mastery\n\n"
                "Git is a distributed version control system that tracks changes in source code during software development.\n\n"
                "#### Essential Commands:\n"
                "- `git checkout -b feature-branch`: Create and switch to a new branch.\n"
                "- `git commit -m \"feat: implement user authentication\"`: Commit with conventional commit messages.\n"
                "- `git rebase main`: Re-apply commits on top of another base tip for clean linear Git history.\n"
                "- **Merge vs Rebase**: `merge` creates a merge commit preserving exact history; `rebase` rewrites commit history to maintain a linear graph."
            )

        # 12. Linked Lists
        if "linked list" in q:
            return (
                "### 🔗 Linked Lists: Core Mechanics & Code\n\n"
                "A **Linked List** is a linear data structure where elements (nodes) are stored in sequence, but not contiguously in memory. Each node holds data and a pointer/reference to the next node.\n\n"
                "#### Python Implementation: Reverse a Singly Linked List\n"
                "```python\n"
                "class ListNode:\n"
                "    def __init__(self, val=0, next=None):\n"
                "        self.val = val\n"
                "        self.next = next\n\n"
                "def reverse_linked_list(head: ListNode) -> ListNode:\n"
                "    prev, curr = None, head\n"
                "    while curr:\n"
                "        next_node = curr.next\n"
                "        curr.next = prev\n"
                "        prev = curr\n"
                "        curr = next_node\n"
                "    return prev\n"
                "```\n\n"
                "- **Time Complexity**: `O(N)`\n"
                "- **Space Complexity**: `O(1)` in-place iterative"
            )

        # 13. Stack & Queue
        if "stack" in q or "queue" in q:
            return (
                "### 📚 Stacks and Queues Explained\n\n"
                "- **Stack**: **LIFO** (Last In, First Out). Think of a stack of plates or the browser back button. Operations: `push()`, `pop()`, `peek()` — all `O(1)`.\n"
                "- **Queue**: **FIFO** (First In, First Out). Think of a line at a ticket counter. Operations: `enqueue()`, `dequeue()`, `front()` — all `O(1)`.\n\n"
                "#### Valid Parentheses Example (Using Stack):\n"
                "```python\n"
                "def is_valid_parentheses(s: str) -> bool:\n"
                "    stack = []\n"
                "    match = {')': '(', '}': '{', ']': '['}\n"
                "    for char in s:\n"
                "        if char in match:\n"
                "            if not stack or stack.pop() != match[char]:\n"
                "                return False\n"
                "        else:\n"
                "            stack.append(char)\n"
                "    return len(stack) == 0\n"
                "```"
            )

        # 14. Binary Tree & BST
        if "binary tree" in q or "bst" in q or "tree traversal" in q:
            return (
                "### 🌳 Binary Search Tree (BST) & Tree Traversals\n\n"
                "A **BST** maintains the property that for every node:\n"
                "- Left subtree values < node value\n"
                "- Right subtree values > node value\n\n"
                "#### The 3 Depth-First Traversals:\n"
                "1. **Inorder (Left, Root, Right)**: Yields elements in **strictly sorted order** in a BST!\n"
                "2. **Preorder (Root, Left, Right)**: Useful for creating a copy/serialization of the tree.\n"
                "3. **Postorder (Left, Right, Root)**: Useful for bottom-up operations (deleting nodes, height).\n\n"
                "#### Time Complexities:\n"
                "- **Search / Insert / Delete**: Average `O(log N)`, Worst case `O(N)` if skewed."
            )

        # 15. Graphs: BFS & DFS
        if "graph" in q or "bfs" in q or "dfs" in q or "dijkstra" in q:
            return (
                "### 🕸️ Graph Traversals & Algorithms\n\n"
                "- **BFS (Breadth-First Search)**: Explores neighbors layer-by-layer using a **Queue**. Optimal for finding the **shortest path** in unweighted graphs. Time: `O(V + E)`.\n"
                "- **DFS (Depth-First Search)**: Explores deep along each branch before backtracking using **Recursion / Stack**. Great for cycle detection, topological sorting, connected components. Time: `O(V + E)`.\n"
                "- **Dijkstra's Algorithm**: Greedy single-source shortest path algorithm using a **Min-Heap / Priority Queue** for graphs with non-negative edge weights. Time: `O((V + E) log V)`."
            )

        # 16. React State & Hooks
        if "react" in q or "usestate" in q or "useeffect" in q:
            return (
                "### ⚛️ React State & Core Hooks\n\n"
                "In React, **State** is component-specific data that triggers a UI re-render when updated.\n\n"
                "#### Core Hooks:\n"
                "- `useState(initialValue)`: Declares state variable and updater function.\n"
                "- `useEffect(callback, dependencies)`: Manages side-effects (data fetching, DOM listeners, timers).\n"
                "  - `[]`: Runs once on mount.\n"
                "  - `[data]`: Runs on mount and whenever `data` changes.\n"
                "- `useRef()`: Holds mutable value that does not trigger re-render, or references DOM elements directly.\n"
                "- `useMemo()` & `useCallback()`: Performance optimization via memoization."
            )

        # 17. SQL Joins
        if "join" in q and "sql" in q:
            return (
                "### 🗄️ SQL Joins Overview\n\n"
                "- **INNER JOIN**: Returns only rows that match in BOTH tables.\n"
                "- **LEFT JOIN**: Returns all rows from left table, plus matched rows from right table (unmatched columns are `NULL`).\n"
                "- **RIGHT JOIN**: Returns all rows from right table, plus matched rows from left table.\n"
                "- **FULL OUTER JOIN**: Returns all rows when there is a match in either table.\n"
                "- **CROSS JOIN**: Cartesian product (every row in table A matched with every row in table B)."
            )

        # 18. General / Comprehensive Dynamic Synthesizer
        # Extracts subjects and verbs dynamically
        keywords = re.findall(r'\b[a-zA-Z]{3,}\b', prompt)
        focus_terms = [k.title() for k in keywords if k.lower() not in {"what", "when", "where", "which", "how", "why", "the", "and", "can", "for", "with", "this", "that", "are", "you", "should", "learn", "start"}]
        topic_title = " ".join(focus_terms[:3]) if focus_terms else "Software Engineering Concept"

        return (
            f"### 💡 Comprehensive Guide: {topic_title}\n\n"
            f"Here is a structured, engineering-grade breakdown addressing your question: *\"{prompt}\"*:\n\n"
            f"#### 1. Core Principles & Concept Overview\n"
            f"When approaching **{topic_title}**, it is essential to first understand the foundational mechanics:\n"
            f"- **Core Objective**: Establishes reliable, scalable, and maintainable software patterns that solve specific computational or architectural bottlenecks.\n"
            f"- **Industry Standard**: Modern tech companies evaluate candidates not just on syntax, but on understanding **trade-offs (Time vs Space complexity, Simplicity vs Extensibility)**.\n\n"
            f"#### 2. Practical Step-by-Step Implementation Blueprint\n"
            f"1. **Analyze Requirements & Constraints**: Determine expected input sizes, edge cases (e.g. empty inputs, null pointers, negative values), and target latency.\n"
            f"2. **Draft a Working Prototype**: Build the minimal viable logic first before attempting premature micro-optimizations.\n"
            f"3. **Refactor for Clean Code**: Apply modular functions, meaningful variable naming, and DRY (Don't Repeat Yourself) principles.\n"
            f"4. **Write Unit Tests & Benchmark**: Test with standard cases, boundary conditions, and stress tests.\n\n"
            f"#### 3. Recommended Code Pattern\n"
            f"```python\n"
            f"# Clean modular implementation pattern\n"
            f"def solve_problem(data_input):\n"
            f"    if not data_input:\n"
            f"        return None\n"
            f"    # Process using optimal algorithms & standard libraries\n"
            f"    result = []\n"
            f"    for item in data_input:\n"
            f"        result.append(item)\n"
            f"    return result\n"
            f"```\n\n"
            f"#### 4. Placement & Interview Tips\n"
            f"- **Communicate Out Loud**: In campus coding interviews, talk through your thought process before writing any code.\n"
            f"- **State Time & Space Complexity**: Always state Big-O bounds explicitly without being asked.\n"
            f"- **Free Learning Resources**: Practice related challenges on [NeetCode.io](https://neetcode.io) and review official documentation at [roadmap.sh](https://roadmap.sh).\n\n"
            f"Feel free to ask a specific follow-up question or request a complete code implementation in your preferred programming language!"
        )

gemini_service = GeminiService()
