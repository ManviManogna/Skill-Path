// Comprehensive AI Student Mentor Knowledge Engine
// Provides technically accurate, structured, step-by-step explanations,
// code implementations, complexity analysis, and best practices.

export interface MentorAnswer {
  response: string;
  category: string;
  model: string;
}

interface KnowledgeTopic {
  keywords: string[];
  category: string;
  answer: (question: string, studentName?: string, userLang?: string) => string;
}

export const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // ==========================================
  // DATA STRUCTURES: ARRAYS & STRINGS
  // ==========================================
  {
    keywords: ['reverse string', 'reverse a string', 'string reverse'],
    category: 'Strings & Algorithms',
    answer: (_q, _name, userLang = 'Python') => `### 🔄 How to Reverse a String (Multiple Approaches)

Reversing a string involves swapping characters from both ends moving inward or creating a new reversed sequence.

#### 1. Two-Pointer Approach (In-Place / Optimal)
We maintain two pointers: \`left\` starting at index 0 and \`right\` at \`len - 1\`, swapping until they meet.

#### 2. Code Implementations

**In Python:**
\`\`\`python
# Approach 1: Slicing (O(N) time, O(N) space)
def reverse_string_slice(s: str) -> str:
    return s[::-1]

# Approach 2: Two-Pointer with list (mutable)
def reverse_string_two_pointer(s: str) -> str:
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)
\`\`\`

**In JavaScript / TypeScript:**
\`\`\`javascript
function reverseString(str) {
    return str.split('').reverse().join('');
}
\`\`\`

**In Java / C++:**
\`\`\`cpp
// C++ in-place reverse
#include <algorithm>
#include <string>

std::string reverseString(std::string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        std::swap(s[left++], s[right--]);
    }
    return s;
}
\`\`\`

#### 3. Complexity Analysis
- **Time Complexity**: \`O(N)\` where N is the length of the string (every character is visited once).
- **Space Complexity**: \`O(1)\` auxiliary in languages with mutable strings (C++ / in-place array), \`O(N)\` in languages with immutable strings (Python, Java, JS).`
  },

  {
    keywords: ['two pointer', 'two-pointer', 'two pointers'],
    category: 'Algorithms',
    answer: () => `### 🎯 Two-Pointer Technique Guide

The **Two-Pointer technique** is an algorithmic pattern where two reference pointers traverse an array or string simultaneously to solve problems with reduced time complexity (often from \`O(N^2)\` down to \`O(N)\`).

#### 1. Common Variations
1. **Opposite Ends (Converging)**: One pointer starts at index \`0\`, the other at \`N-1\`. Used for Palindrome verification, Two Sum in sorted arrays, and Container With Most Water.
2. **Same Direction (Fast & Slow)**: Fast pointer moves 2 steps, slow pointer moves 1 step. Used for Linked List cycle detection (Floyd's algorithm) or removing duplicates in-place.
3. **Sliding Window**: Pointers define an expanding/contracting subarray window.

#### 2. Classic Problem: Two Sum II (Sorted Array)
Given a 1-indexed sorted array \`numbers\`, find two numbers that add up to \`target\`.

\`\`\`python
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1] # 1-based indices
        elif current_sum < target:
            left += 1   # Need a larger sum
        else:
            right -= 1  # Need a smaller sum
            
    return []
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O(N)\` — each element visited at most once.
- **Space Complexity**: \`O(1)\` — no auxiliary memory required.`
  },

  {
    keywords: ['sliding window', 'sliding window technique'],
    category: 'Algorithms',
    answer: () => `### 🪟 Sliding Window Algorithm

The **Sliding Window** pattern transforms nested loops (\`O(N^2)\`) into a single pass (\`O(N)\`) when computing contiguous subarrays or subsegments.

#### 1. Two Variants
- **Fixed Window Size (K)**: Window size remains constant (e.g. *Maximum sum of subarray of size K*).
- **Dynamic Window Size**: Window expands (\`right++\`) until a condition is violated, then contracts (\`left++\`) until valid again (e.g. *Longest Substring Without Repeating Characters*).

#### 2. Code Example: Maximum Sum Subarray of Size K
\`\`\`python
def max_sub_array_of_size_k(k: int, arr: list[int]) -> int:
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end] # Add the next element

        # Slide window if reached size k
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start] # Subtract element going out
            window_start += 1 # Slide ahead

    return max_sum
\`\`\`

#### 3. Complexity
- **Time**: \`O(N)\` single pass.
- **Space**: \`O(1)\` extra memory.`
  },

  {
    keywords: ['kadane', 'maximum subarray', 'max subarray'],
    category: 'Algorithms & Dynamic Programming',
    answer: () => `### ⚡ Kadane's Algorithm: Maximum Subarray Problem

**Kadane's Algorithm** finds the contiguous subarray (containing at least one number) which has the largest sum in \`O(N)\` linear time.

#### 1. Core Intuition
At each index \`i\`, we decide:
- Either add \`arr[i]\` to our current running subarray sum (\`current_sum + arr[i]\`).
- Or discard the previous subarray and start a fresh subarray at \`arr[i]\`.
\`current_sum = max(arr[i], current_sum + arr[i])\`

#### 2. Python Implementation
\`\`\`python
def max_sub_array(nums: list[int]) -> int:
    if not nums:
        return 0
    
    max_so_far = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_so_far = max(max_so_far, current_sum)
        
    return max_so_far

# Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4] -> Subarray [4, -1, 2, 1] has max sum = 6
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O(N)\`
- **Space Complexity**: \`O(1)\``
  },

  // ==========================================
  // DATA STRUCTURES: LINKED LISTS
  // ==========================================
  {
    keywords: ['linked list', 'reverse linked list', 'reverse a linked list', 'singly linked list'],
    category: 'Data Structures',
    answer: () => `### 🔗 Reversing a Singly Linked List

A linked list consists of nodes containing a \`val\` and a pointer \`next\`. Reversing it requires pointing each node's \`next\` pointer to its previous node.

#### 1. Iterative Approach (3 Pointers)
We use three pointers:
- \`prev\`: initially \`None\`
- \`curr\`: initially \`head\`
- \`next_node\`: temporary store for \`curr.next\`

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head: ListNode) -> ListNode:
    prev = None
    curr = head
    
    while curr is not None:
        next_node = curr.next  # 1. Save next node
        curr.next = prev       # 2. Reverse current pointer
        prev = curr            # 3. Move prev forward
        curr = next_node       # 4. Move curr forward
        
    return prev  # New head of reversed list
\`\`\`

#### 2. Recursive Approach
\`\`\`python
def reverse_linked_list_recursive(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
    
    new_head = reverse_linked_list_recursive(head.next)
    head.next.next = head
    head.next = None
    return new_head
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O(N)\` (visits all nodes once)
- **Space Complexity**: Iterative is \`O(1)\`, Recursive is \`O(N)\` call stack.`
  },

  {
    keywords: ['cycle in linked list', 'linked list cycle', 'detect cycle', 'floyd tortoise'],
    category: 'Data Structures',
    answer: () => `### 🐢 Floyd's Tortoise and Hare (Cycle Detection in Linked List)

To detect if a linked list contains a cycle without modifying it or using extra memory, we use **Floyd's Cycle-Finding Algorithm**.

#### 1. Mechanics
- **Slow Pointer**: advances 1 node per step.
- **Fast Pointer**: advances 2 nodes per step.
- If a cycle exists, the fast pointer will eventually \"lap\" and meet the slow pointer inside the cycle (\`slow == fast\`).
- If no cycle exists, \`fast\` or \`fast.next\` reaches \`None\`.

#### 2. Implementation
\`\`\`python
def has_cycle(head: ListNode) -> bool:
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True  # Cycle detected!
            
    return False  # Reached end of list, no cycle
\`\`\`

#### 3. Finding the Start of the Cycle
Once \`slow == fast\`, reset \`slow = head\`. Move both \`slow\` and \`fast\` 1 step at a time. The point where they meet again is the exact start of the cycle!

#### 4. Complexity
- **Time Complexity**: \`O(N)\`
- **Space Complexity**: \`O(1)\` extra space.`
  },

  // ==========================================
  // DATA STRUCTURES: STACKS & QUEUES
  // ==========================================
  {
    keywords: ['stack', 'queue', 'stack and queue', 'stack vs queue'],
    category: 'Data Structures',
    answer: () => `### 📚 Stack vs. Queue: Comprehensive Guide

Both Stacks and Queues are fundamental linear data structures with different access orders.

| Feature | Stack | Queue |
| :--- | :--- | :--- |
| **Principle** | **LIFO** (Last In, First Out) | **FIFO** (First In, First Out) |
| **Primary Ops** | \`push(x)\`, \`pop()\`, \`peek()\` | \`enqueue(x)\`, \`dequeue()\`, \`front()\` |
| **Real-World Analogy** | Stack of plates, browser back button | Line at a ticket counter, print spooler |
| **Time Complexity** | All primary operations are \`O(1)\` | All primary operations are \`O(1)\` |

#### 1. Valid Parentheses Problem (Classic Stack Problem)
Given a string containing \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\`, \`']'\`, determine if valid.

\`\`\`python
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
            
    return len(stack) == 0
\`\`\`

#### 2. Monotonic Stack
A stack where elements are strictly increasing or decreasing. Used for:
- *Next Greater Element*
- *Daily Temperatures*
- *Largest Rectangle in Histogram* (solved in \`O(N)\`).`
  },

  // ==========================================
  // DATA STRUCTURES: TREES & BST
  // ==========================================
  {
    keywords: ['binary search tree', 'bst', 'binary tree', 'tree traversal'],
    category: 'Data Structures',
    answer: () => `### 🌳 Binary Search Tree (BST) & Tree Traversals

A **Binary Search Tree** is a binary tree where for every node:
- All values in the **left subtree** are strictly **less** than the node's value.
- All values in the **right subtree** are strictly **greater** than the node's value.

#### 1. The 4 Tree Traversals
1. **Inorder (Left -> Root -> Right)**: Visits BST nodes in **sorted ascending order**!
2. **Preorder (Root -> Left -> Right)**: Used to clone or serialize trees.
3. **Postorder (Left -> Right -> Root)**: Used to delete trees or evaluate bottom-up (height calculations).
4. **Level-Order (BFS)**: Visits nodes row-by-row using a queue.

#### 2. Python Implementation of BST Node & Inorder Traversal
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Inorder Traversal (Sorted order for BST)
def inorder_traversal(root: TreeNode) -> list[int]:
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result

# Search in BST: O(log N) average, O(N) worst case
def search_bst(root: TreeNode, val: int) -> TreeNode:
    if not root or root.val == val:
        return root
    if val < root.val:
        return search_bst(root.left, val)
    return search_bst(root.right, val)
\`\`\`

#### 3. Time Complexity Bounds
- **Balanced BST (AVL / Red-Black)**: Search, Insert, Delete = \`O(log N)\`.
- **Degenerate BST (Skewed Tree / Linked List)**: \`O(N)\`.`
  },

  // ==========================================
  // DATA STRUCTURES: HEAPS & PRIORITY QUEUES
  // ==========================================
  {
    keywords: ['heap', 'priority queue', 'min heap', 'max heap', 'kth largest'],
    category: 'Data Structures',
    answer: () => `### ⛰️ Heaps & Priority Queues Explained

A **Heap** is a specialized complete binary tree that satisfies the Heap Property:
- **Min-Heap**: The value of each node is \`>=\` the value of its parent (Root is the minimum).
- **Max-Heap**: The value of each node is \`<=\` the value of its parent (Root is the maximum).

#### 1. Key Operations & Complexities
- \`insert(x)\`: \`O(log N)\` (bubble up / sift up)
- \`extract_min()\` / \`extract_max()\`: \`O(log N)\` (bubble down / sift down)
- \`peek()\`: \`O(1)\` (access root)
- \`heapify(array)\`: \`O(N)\` linear build time!

#### 2. Solving Kth Largest Element using Min-Heap
Keep a min-heap of size \`K\`. The root will always hold the K-th largest element!

\`\`\`python
import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
            
    return min_heap[0] # Root is Kth largest
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O(N log K)\` (much faster than sorting \`O(N log N)\` when K << N).
- **Space Complexity**: \`O(K)\` for the heap.`
  },

  // ==========================================
  // DATA STRUCTURES: GRAPHS
  // ==========================================
  {
    keywords: ['graph', 'bfs', 'dfs', 'breadth first search', 'depth first search'],
    category: 'Graphs & Algorithms',
    answer: () => `### 🕸️ Graph Traversals: BFS vs. DFS

A Graph is composed of **Vertices (Nodes)** and **Edges**. Graphs can be directed/undirected, cyclic/acyclic, and weighted/unweighted.

#### 1. BFS (Breadth-First Search)
- **Mechanism**: Explores level-by-level using a **Queue** (FIFO).
- **Best For**: Finding the **Shortest Path** in an unweighted graph.

\`\`\`python
from collections import deque

def bfs(graph: dict, start_node):
    visited = set([start_node])
    queue = deque([start_node])
    
    while queue:
        node = queue.popleft()
        print(f"Visited: {node}")
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
\`\`\`

#### 2. DFS (Depth-First Search)
- **Mechanism**: Explores as deep as possible along each branch before backtracking using **Recursion / Stack** (LIFO).
- **Best For**: Cycle detection, topological sorting, connected components, and pathfinding.

\`\`\`python
def dfs(graph: dict, node, visited=None):
    if visited is None:
        visited = set()
        
    visited.add(node)
    print(f"Visited: {node}")
    
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
            
    return visited
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O(V + E)\` where V = vertices, E = edges.
- **Space Complexity**: \`O(V)\` for the visited set and queue/stack.`
  },

  {
    keywords: ['dijkstra', "dijkstra's", 'shortest path'],
    category: 'Graphs & Algorithms',
    answer: () => `### ⚡ Dijkstra's Shortest Path Algorithm

**Dijkstra's Algorithm** finds the shortest path from a single source node to all other nodes in a weighted graph with **non-negative weights**.

#### 1. How It Works (Greedy with Min-Heap)
1. Initialize distance to start node as \`0\` and all other nodes as \`infinity\`.
2. Push \`(0, start_node)\` into a Min-Heap (Priority Queue).
3. While the heap is not empty:
   - Pop node \`u\` with the smallest known distance.
   - For each neighbor \`v\` with edge weight \`w\`:
     - If \`dist[u] + w < dist[v]\`, update \`dist[v] = dist[u] + w\` and push \`(dist[v], v)\` to heap.

#### 2. Python Implementation
\`\`\`python
import heapq

def dijkstra(graph: dict, start: str) -> dict:
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    pq = [(0, start)] # (distance, node)
    
    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        
        if curr_dist > distances[curr_node]:
            continue # Outdated distance
            
        for neighbor, weight in graph[curr_node].items():
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances
\`\`\`

#### 3. Complexity
- **Time Complexity**: \`O((V + E) log V)\` using a binary min-heap.
- **Space Complexity**: \`O(V)\` for distances and priority queue.
- **Note**: Does NOT work with negative weights! Use **Bellman-Ford** (\`O(V * E)\`) for negative edges.`
  },

  // ==========================================
  // ALGORITHMS: SORTING & SEARCHING
  // ==========================================
  {
    keywords: ['bubble sort', 'explain bubble sort'],
    category: 'Sorting Algorithms',
    answer: () => `### 🔄 Bubble Sort: Complete Mechanics & Code

**Bubble Sort** is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements \"bubble up\" to the end with each pass.

#### 1. How It Works (Step-by-Step)
- Compare adjacent elements \`arr[j]\` and \`arr[j+1]\`.
- If \`arr[j] > arr[j+1]\`, swap them.
- Repeat for \`n-1\` passes. After pass \`i\`, the largest \`i\` elements are sorted at the end.
- **Optimization**: Use a boolean flag \`swapped\` to exit early if no swaps occur (O(N) best case).

#### 2. Python Implementation with Optimization
\`\`\`python
def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Array is already sorted!
            break
    return arr
\`\`\`

#### 3. Complexity & Placement Insights
- **Time Complexity**: Best: \`O(N)\` (already sorted), Average/Worst: \`O(N^2)\`
- **Space Complexity**: \`O(1)\` (in-place sorting)
- **Stability**: Stable (preserves relative order of duplicate elements)`
  },

  {
    keywords: ['merge sort', 'explain merge sort'],
    category: 'Sorting Algorithms',
    answer: () => `### ⚡ Merge Sort: Divide and Conquer Algorithm

**Merge Sort** is an efficient, general-purpose, comparison-based sorting algorithm based on the **Divide and Conquer** paradigm.

#### 1. Core Mechanics
1. **Divide**: Split the array into two halves at \`mid = len(arr) // 2\`.
2. **Conquer**: Recursively sort both sub-arrays.
3. **Combine**: Merge the two sorted sub-arrays into a single sorted array.

#### 2. Python Implementation
\`\`\`python
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

#### 3. Complexity Analysis
- **Time Complexity**: \`O(N log N)\` across Best, Average, and Worst cases (guaranteed!).
- **Space Complexity**: \`O(N)\` auxiliary space for merging arrays.
- **Preferred For**: Linked Lists sorting (\`O(1)\` extra space) and external sorting of large files.`
  },

  {
    keywords: ['quick sort', 'quicksort', 'explain quick sort'],
    category: 'Sorting Algorithms',
    answer: () => `### ⚡ Quick Sort: In-Place Partitioning

**Quick Sort** is a Divide and Conquer algorithm that picks an element as a **pivot** and partitions the array around the pivot such that smaller elements move to the left and larger elements move to the right.

#### 1. Complexity & Key Points
- **Average Time**: \`O(N log N)\` with very small constant factors (often faster than Merge Sort in practice).
- **Worst Case**: \`O(N^2)\` when array is already sorted and first/last element is picked as pivot. Mitigate this by using **Randomized Pivot** or Median-of-Three.
- **Space**: \`O(log N)\` recursive stack space (in-place).

#### 2. Python Implementation (Lomuto Partition)
\`\`\`python
def quick_sort(arr: list[int], low: int, high: int):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]  # Choosing last element as pivot
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\`\`\``
  },

  {
    keywords: ['binary search', 'explain binary search'],
    category: 'Searching Algorithms',
    answer: () => `### 🔍 Binary Search: Logarithmic Search Mastery

Binary Search works on **sorted collections** by repeatedly dividing the search interval in half. If the target value is less than the midpoint, search the left half; otherwise, search the right half.

#### 1. Optimal Implementation (Avoids Integer Overflow)
\`\`\`python
def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Prevents integer overflow
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not found
\`\`\`

#### 2. Complexity & Advanced Patterns
- **Time Complexity**: \`O(log N)\`
- **Space Complexity**: \`O(1)\` iterative
- **Advanced Applications**: Binary Search on Answer Space (e.g. *Koko Eating Bananas*, *Capacity To Ship Packages Within D Days*), finding lower bound / upper bound.`
  },

  // ==========================================
  // ALGORITHMS: DYNAMIC PROGRAMMING
  // ==========================================
  {
    keywords: ['dynamic programming', 'dp', 'memoization', 'tabulation'],
    category: 'Dynamic Programming',
    answer: () => `### 💡 Dynamic Programming (DP) Strategy Guide

**Dynamic Programming** solves complex problems by breaking them down into simpler overlapping subproblems, solving each once, and storing their solutions (caching/memoization).

#### 1. The Two Key Properties
1. **Overlapping Subproblems**: The same subproblems are solved repeatedly (e.g. \`fib(5)\` calculates \`fib(3)\` multiple times).
2. **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions of its subproblems.

#### 2. Classic Problem: 0/1 Knapsack Problem
Given weights and values of \`n\` items, put items in a knapsack of capacity \`W\` to get maximum total value.

\`\`\`python
def knapsack_01(weights: list[int], values: list[int], W: int) -> int:
    n = len(weights)
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if weights[i - 1] <= w:
                # Max of (include item i-1, exclude item i-1)
                dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
                
    return dp[n][W]
\`\`\`

#### 3. Classic Patterns to Master
- **0/1 Knapsack & Unbounded Knapsack**
- **Longest Common Subsequence (LCS) & Longest Increasing Subsequence (LIS)**
- **Coin Change & Subsets with Target Sum**
- **Matrix Grid Traversal (Unique Paths, Minimum Path Sum)**`
  },

  {
    keywords: ['recursion', 'recursion in programming', 'base case'],
    category: 'Programming Fundamentals',
    answer: () => `### 🔁 Recursion Explained Clearly

**Recursion** is a programming technique where a function calls itself directly or indirectly to solve a smaller instance of the same problem.

#### 1. The Two Crucial Parts of Any Recursive Function
1. **Base Case**: The termination condition where the function stops calling itself and returns a value (prevents infinite loops and stack overflow).
2. **Recursive Step**: The logic that reduces the problem towards the base case.

#### 2. Code Example: Factorial & Call Stack
\`\`\`python
def factorial(n: int) -> int:
    # 1. Base case
    if n <= 1:
        return 1
    # 2. Recursive step
    return n * factorial(n - 1)

# Execution trace for factorial(4):
# factorial(4) -> 4 * factorial(3)
#                 -> 3 * factorial(2)
#                    -> 2 * factorial(1)
#                       -> returns 1
#                    -> 2 * 1 = 2
#                 -> 3 * 2 = 6
#              -> 4 * 6 = 24
\`\`\`

#### 3. Recursion vs. Iteration
- **Recursion**: Elegant and natural for hierarchical data (Trees, Graphs, Divide-and-conquer). Has overhead of function call stack frames.
- **Iteration**: Uses loops (\`for\`/\`while\`). Typically uses \`O(1)\` extra memory without risk of Call Stack Overflow.`
  },

  // ==========================================
  // OPERATING SYSTEMS
  // ==========================================
  {
    keywords: ['virtual memory', 'paging', 'page fault', 'tlb'],
    category: 'Operating Systems',
    answer: () => `### 🧠 Virtual Memory & Paging in Operating Systems

**Virtual Memory** is a memory management technique that creates an illusion of a very large contiguous memory space for programs by combining physical RAM with secondary storage (swap/disk).

#### 1. Core Mechanics: Paging
- **Virtual Address Space** is divided into fixed-size blocks called **Pages** (typically 4 KB).
- **Physical RAM** is divided into blocks of the same size called **Page Frames**.
- The **Page Table** maps Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN).

#### 2. Page Fault & Page Replacement
- **Page Fault**: Occurs when a program accesses a page that is marked invalid (not currently loaded in physical RAM). The OS traps to kernel mode, fetches the page from disk swap, updates the page table, and resumes the instruction.
- **Replacement Algorithms**:
  - **FIFO** (First-In, First-Out - suffers from Belady's Anomaly where more frames can lead to more page faults).
  - **LRU** (Least Recently Used - standard industry baseline).
  - **Optimal (MIN)** (replaces page not used for longest time in future - theoretical benchmark).

#### 3. TLB (Translation Lookaside Buffer)
A fast hardware cache inside the CPU MMU that caches recent virtual-to-physical translations to avoid double memory access overhead.`
  },

  {
    keywords: ['process vs thread', 'difference between process and thread', 'process and thread'],
    category: 'Operating Systems',
    answer: () => `### ⚙️ Process vs. Thread: Essential OS Comparison

| Feature | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | An executing instance of a program | A lightweight unit of execution within a process |
| **Memory Space** | Separate, isolated memory space (Text, Data, Heap) | Shares code, data, and heap with peer threads; has own stack and registers |
| **Creation Overhead** | High (\`fork()\` system call, copying page tables) | Low (shares existing process resources) |
| **Context Switch** | Slow (flushes TLB and switches page table pointers) | Fast (no page table switch required) |
| **Communication** | IPC (Pipes, Sockets, Shared Memory, Message Queues) | Direct shared memory access (requires synchronization: Mutex/Semaphore) |
| **Fault Tolerance** | If one process crashes, others continue unaffected | If one thread causes a segfault, the entire process crashes |

📌 **When to use what**:
- Use **Multi-Processing** for CPU-bound tasks or strict security isolation (e.g. Chrome browser tabs).
- Use **Multi-Threading** for I/O-bound tasks with frequent data sharing (e.g. Web server handling incoming network requests).`
  },

  {
    keywords: ['deadlock', 'deadlocks', 'coffman conditions', "banker's algorithm"],
    category: 'Operating Systems',
    answer: () => `### 🔒 Deadlocks in Operating Systems

A **Deadlock** is a state where a set of processes are permanently blocked because each process is holding a resource and waiting for another resource held by another process.

#### 1. The 4 Necessary Coffman Conditions
All 4 conditions MUST hold simultaneously for a deadlock to occur:
1. **Mutual Exclusion**: At least one resource is held in non-shareable mode.
2. **Hold and Wait**: A process holds at least one resource and is waiting to acquire additional resources.
3. **No Preemption**: Resources cannot be forcibly taken; they must be released voluntarily.
4. **Circular Wait**: A closed chain of processes exists where each process holds a resource needed by the next.

#### 2. Deadlock Handling Strategies
- **Prevention**: Invalidate at least one of the 4 conditions (e.g., impose strict global resource ordering to eliminate circular wait).
- **Avoidance**: Banker's Algorithm (allocates resources only if system remains in a \"Safe State\").
- **Detection & Recovery**: Resource Allocation Graph (RAG) cycle detection; recover by killing processes or preempting resources.
- **Ignorance**: The \"Ostrich Algorithm\" used by Linux/Windows (assumes deadlocks are rare enough that rebooting is acceptable).`
  },

  // ==========================================
  // DATABASE MANAGEMENT SYSTEMS (DBMS)
  // ==========================================
  {
    keywords: ['normalization', '1nf', '2nf', '3nf', 'bcnf'],
    category: 'DBMS & SQL',
    answer: () => `### 🗄️ Database Normalization: 1NF, 2NF, 3NF Explained

**Normalization** is the process of organizing data in a relational database to **reduce data redundancy** and avoid insertion, update, and deletion anomalies.

#### 1. The Normal Forms
- **1NF (First Normal Form)**:
  - Each column must contain atomic (indivisible) values.
  - No repeating groups or arrays in a single column.
  - Each row must be uniquely identifiable (Primary Key).
- **2NF (Second Normal Form)**:
  - Must be in 1NF.
  - Eliminates **Partial Functional Dependency** (all non-key attributes must depend on the *entire* primary key, not just part of a composite key).
- **3NF (Third Normal Form)**:
  - Must be in 2NF.
  - Eliminates **Transitive Dependency** (non-key columns must not depend on other non-key columns: \`A -> B\` and \`B -> C\`).
- **BCNF (Boyce-Codd Normal Form)**:
  - Stricter version of 3NF: for every functional dependency \`X -> Y\`, \`X\` must be a super key.

💡 **Industry Rule of Thumb**: Most production systems normalize up to **3NF** for transactional integrity (OLTP), but denormalize tables in Data Warehouses (OLAP) to speed up complex analytical queries.`
  },

  {
    keywords: ['acid', 'acid properties', 'atomicity consistency isolation durability'],
    category: 'DBMS & SQL',
    answer: () => `### 🛡️ ACID Properties in Database Transactions

**ACID** ensures that database transactions are processed reliably:

1. **Atomicity (\"All or Nothing\")**:
   - Either the entire transaction succeeds (COMMIT) or completely rolls back (ROLLBACK). If $100 is deducted from Account A, it *must* reach Account B.
2. **Consistency**:
   - The database moves from one valid state to another, satisfying all defined integrity constraints (foreign keys, uniqueness, check constraints).
3. **Isolation**:
   - Concurrent transactions execute without interfering with each other. Isolation levels: *Read Uncommitted, Read Committed, Repeatable Read, Serializable*.
4. **Durability**:
   - Once a transaction is committed, its changes survive even if the database crashes or server loses power (enforced via Write-Ahead Logging / WAL).`
  },

  {
    keywords: ['sql join', 'joins in sql', 'inner join', 'left join'],
    category: 'DBMS & SQL',
    answer: () => `### 🔗 SQL Joins: Visual & Practical Guide

SQL Joins combine columns from one or more tables based on a related column between them.

#### 1. Join Types
- **INNER JOIN**: Returns only matching rows in BOTH tables.
- **LEFT JOIN (LEFT OUTER JOIN)**: Returns all rows from the left table, plus matched rows from the right table (unmatched right columns are \`NULL\`).
- **RIGHT JOIN**: Returns all rows from the right table, plus matched rows from the left table.
- **FULL OUTER JOIN**: Returns all rows when there is a match in either left or right table.
- **CROSS JOIN**: Cartesian product (every row in table A paired with every row in table B).

#### 2. SQL Syntax Example
\`\`\`sql
-- Retrieve students with their enrolled courses
SELECT 
    students.id,
    students.name,
    courses.course_title
FROM students
INNER JOIN enrollments ON students.id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.id;
\`\`\`

#### 3. Performance Tip
Always ensure the columns used in \`ON\` clauses (e.g. foreign keys) are **Indexed** to avoid full table scans!`
  },

  // ==========================================
  // COMPUTER NETWORKS
  // ==========================================
  {
    keywords: ['tcp vs udp', 'difference between tcp and udp', 'tcp', 'udp'],
    category: 'Computer Networks',
    answer: () => `### 🌐 TCP vs. UDP: Transport Layer Protocols

| Aspect | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (3-way handshake) | Connectionless (fire and forget) |
| **Reliability** | Guaranteed delivery (acknowledgments & retransmissions) | Best effort (packets may drop or arrive out of order) |
| **Ordering** | In-order delivery guaranteed by sequence numbers | No ordering guarantee |
| **Speed** | Slower due to flow control & congestion control | Very fast with minimal header overhead (8 bytes vs 20+ bytes) |
| **Use Cases** | Web pages (HTTP/HTTPS), File transfers (FTP), Email (SMTP) | Video streaming, VoIP, Gaming, DNS queries |

#### The TCP 3-Way Handshake:
1. **Client -> Server**: \`SYN\` (Synchronize sequence numbers)
2. **Server -> Client**: \`SYN-ACK\` (Acknowledge client SYN, send server SYN)
3. **Client -> Server**: \`ACK\` (Connection established, data transmission starts)`
  },

  {
    keywords: ['osi model', 'osi layers', '7 layers'],
    category: 'Computer Networks',
    answer: () => `### 🌐 The 7 Layers of the OSI Model

Mnemonic: **\"Please Do Not Throw Sausage Pizza Away\"**

1. **Layer 1: Physical**: Transmits raw bits over cables, radio frequencies (Ethernet, Fiber, Wi-Fi).
2. **Layer 2: Data Link**: MAC addressing, framing, error detection (Switches, Ethernet frames).
3. **Layer 3: Network**: Logical IP addressing, routing packets across networks (Routers, IPv4, IPv6).
4. **Layer 4: Transport**: End-to-end delivery, reliability, flow control (TCP, UDP, Ports).
5. **Layer 5: Session**: Manages and terminates communication sessions between applications.
6. **Layer 6: Presentation**: Data translation, encryption, compression (SSL/TLS, JPEG, JSON).
7. **Layer 7: Application**: Network services directly used by software (HTTP, HTTPS, DNS, SSH, FTP).`
  },

  // ==========================================
  // OBJECT ORIENTED PROGRAMMING (OOP)
  // ==========================================
  {
    keywords: ['oop', 'four pillars of oop', 'polymorphism', 'inheritance', 'encapsulation', 'abstraction'],
    category: 'Object Oriented Programming',
    answer: () => `### 🧱 The 4 Pillars of Object-Oriented Programming (OOP)

1. **Encapsulation**:
   - Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using access specifiers (\`private\`, \`protected\`, \`public\`).
2. **Abstraction**:
   - Hiding complex implementation details and exposing only essential interfaces (e.g. Abstract Classes and Interfaces).
3. **Inheritance**:
   - Mechanism where a child class acquires properties and behaviors of a parent class (\`class Dog extends Animal\`), promoting code reuse.
4. **Polymorphism (\"Many Forms\")**:
   - **Compile-time (Static)**: Method Overloading (same method name, different parameters).
   - **Run-time (Dynamic)**: Method Overriding (subclass provides specific implementation of a superclass method).

#### Python Code Example
\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float):
        self.owner = owner
        self.__balance = balance  # Private attribute (Encapsulation)

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self) -> float:
        return self.__balance
\`\`\``
  },

  // ==========================================
  // WEB DEVELOPMENT & FRAMEWORKS
  // ==========================================
  {
    keywords: ['react usestate', 'usestate', 'react state', 'props vs state'],
    category: 'Web Development (React)',
    answer: () => `### ⚛️ State & useState in React Explained

In React, **State** is a built-in object that holds data or information about the component. When state changes, React **re-renders** the component to update the UI.

#### 1. Props vs. State
- **Props**: Passed from parent to child component (read-only, immutable by the child).
- **State**: Managed internally within the component (mutable via state updater function).

#### 2. Using \`useState\` Hook
\`\`\`tsx
import React, { useState } from 'react';

export const Counter: React.FC = () => {
    // [stateVariable, setterFunction] = useState(initialValue)
    const [count, setCount] = useState<number>(0);

    return (
        <div className="p-4">
            <p>Current Count: {count}</p>
            {/* Always use functional update if depending on previous state */}
            <button onClick={() => setCount(prev => prev + 1)}>
                Increment
            </button>
        </div>
    );
};
\`\`\`

#### 3. Key Golden Rules
- **Never mutate state directly** (\`count = count + 1\` won't trigger re-render!). Always use \`setCount\`.
- State updates are asynchronous and batched by React for performance.`
  },

  {
    keywords: ['react useeffect', 'useeffect', 'component lifecycle'],
    category: 'Web Development (React)',
    answer: () => `### ⚛️ Master React \`useEffect\` Hook

\`useEffect\` lets you synchronize a component with external systems (fetching data, setting up subscriptions, manipulating the DOM).

#### 1. The 3 Dependency Array Modes
\`\`\`tsx
import { useEffect, useState } from 'react';

// Mode 1: No dependency array -> Runs after EVERY render
useEffect(() => {
    console.log("Runs on every single render!");
});

// Mode 2: Empty dependency array [] -> Runs ONCE on mount (ComponentDidMount)
useEffect(() => {
    console.log("Component mounted! Fetching initial data...");
}, []);

// Mode 3: With dependencies [userId] -> Runs on mount AND whenever userId changes
useEffect(() => {
    fetchUserData(userId);
}, [userId]);
\`\`\`

#### 2. Cleanup Function (Preventing Memory Leaks)
Return a function inside \`useEffect\` to clean up timers, event listeners, or WebSockets:
\`\`\`tsx
useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer); // Cleanup on unmount or re-render!
}, []);
\`\`\``
  },

  {
    keywords: ['docker', 'container', 'dockerfile', 'containers'],
    category: 'DevOps & Tooling',
    answer: () => `### 🐳 Docker & Containerization Essentials

**Docker** packages an application and all its dependencies (runtime, system libraries, configuration) into a standardized unit called a **container**, ensuring it runs reliably anywhere (\"Works on my machine and in production!\").

#### 1. Key Terminology
- **Dockerfile**: A text script containing commands to build an image (\`FROM\`, \`WORKDIR\`, \`COPY\`, \`RUN\`, \`CMD\`).
- **Image**: An immutable, read-only blueprint.
- **Container**: A running, isolated instance of an image.
- **Docker Compose**: A tool to orchestrate multi-container setups (e.g. React frontend + FastAPI backend + Postgres DB).

#### 2. Sample Production Dockerfile for Python FastAPI:
\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\``
  },

  {
    keywords: ['git', 'github', 'git merge vs rebase', 'git rebase'],
    category: 'Version Control',
    answer: () => `### 🐙 Git Version Control Mastery

Git is a distributed version control system that tracks changes in source code.

#### 1. Essential Commands:
- \`git checkout -b feature-branch\`: Create and switch to a new branch.
- \`git commit -m "feat: add user authentication"\`: Commit changes.
- \`git stash\` & \`git stash pop\`: Temporarily shelve uncommitted changes.

#### 2. Git Merge vs. Git Rebase
- **\`git merge\`**: Creates a new \"merge commit\" combining branches. Preserves complete historical context, but can make commit graphs cluttered.
- **\`git rebase\`**: Rewrites commit history by moving your feature commits on top of the latest main branch. Creates a clean, linear project history.
- **Golden Rule**: Never rebase a public shared branch!`
  }
];

// Fallback dynamic concept synthesizer for arbitrary questions
export function generateDynamicAnswer(
  question: string,
  profile?: { fullName?: string; careerInterest?: string; preferredLanguage?: string }
): string {
  const q = question.trim();
  const qLower = q.toLowerCase();

  // 1. Check for question type
  const isCodeRequest = qLower.includes('code') || qLower.includes('implement') || qLower.includes('write') || qLower.includes('program') || qLower.includes('syntax');
  const isComparison = qLower.includes('vs') || qLower.includes('difference between') || qLower.includes('compare');
  const isHowTo = qLower.startsWith('how') || qLower.includes('how to');
  const isWhy = qLower.startsWith('why');

  // Extract key technical nouns
  const words = q.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2);
  const stopWords = new Set(['what', 'when', 'where', 'which', 'how', 'why', 'who', 'the', 'and', 'for', 'with', 'from', 'can', 'you', 'explain', 'tell', 'show', 'please', 'difference', 'between']);
  const techTerms = words.filter(w => !stopWords.has(w.toLowerCase()));
  const topicTitle = techTerms.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' ') || 'Computer Science Topic';

  const userLang = profile?.preferredLanguage || 'Python';

  // Construct tailored answer
  let codeSnippet = '';
  if (userLang.toLowerCase().includes('java')) {
    codeSnippet = `// Clean implementation in Java
public class Solution {
    public static void main(String[] args) {
        System.out.println("Executing demonstration for: ${topicTitle}");
    }
}`;
  } else if (userLang.toLowerCase().includes('c++') || userLang.toLowerCase().includes('cpp')) {
    codeSnippet = `// Clean implementation in C++
#include <iostream>
#include <vector>

int main() {
    std::cout << "Demonstration for: ${topicTitle}" << std::endl;
    return 0;
}`;
  } else if (userLang.toLowerCase().includes('javascript') || userLang.toLowerCase().includes('typescript')) {
    codeSnippet = `// Clean implementation in JavaScript
function solveProblem(input) {
    if (!input) return null;
    console.log("Processing ${topicTitle}:", input);
    return input;
}`;
  } else {
    codeSnippet = `# Clean implementation in Python
def process_${topicTitle.toLowerCase().replace(/\s+/g, '_')}(data):
    """
    Demonstrates core logic for ${topicTitle}
    Time Complexity: O(N) | Space Complexity: O(1)
    """
    if not data:
        return None
    return data`;
  }

  return `### 💡 Mentor Guide: ${topicTitle}

Here is a structured, engineering-grade breakdown for: **"${question}"**

#### 1. Core Concept & Architectural Overview
When working with **${topicTitle}**, understanding the underlying computational mechanics is key:
- **Foundational Purpose**: Solves structural, computational, or architectural challenges by establishing clean, maintainable patterns.
- **Industry Standard**: Modern software systems prioritize understanding **trade-offs** (Time vs Space complexity, Simplicity vs Extensibility) rather than just memorizing syntax.

#### 2. Key Mechanics & Execution Steps
1. **Analyze Constraints**: Check edge cases (empty inputs, null pointers, negative bounds).
2. **Modular Design**: Deconstruct logic into testable helper functions.
3. **Complexity Bounds**: Always evaluate Big-O runtime before writing code.
4. **Validation**: Test with standard inputs, boundary values, and performance limits.

${isCodeRequest || !isComparison ? `#### 3. Recommended Code Example (${userLang})
\`\`\`${userLang.toLowerCase().includes('c++') ? 'cpp' : userLang.toLowerCase().includes('java') ? 'java' : userLang.toLowerCase().includes('script') ? 'javascript' : 'python'}
${codeSnippet}
\`\`\`` : ''}

#### ${isCodeRequest || !isComparison ? '4' : '3'}. Complexity & Placement Insights
- **Time Complexity**: Optimal runtime bounds (typically \`O(N)\` or \`O(log N)\` depending on access patterns).
- **Space Complexity**: Evaluated based on auxiliary memory buffers or recursive stack depth.
- **Engineering Tip**: In technical rounds and production coding, always explain *why* you chose this approach over naive alternatives.`;
}

// Main lookup function
export function getMentorAnswer(
  query: string,
  profile?: { fullName?: string; careerInterest?: string; preferredLanguage?: string }
): MentorAnswer {
  const qClean = query.trim().toLowerCase();

  // Search through knowledge base for matching keywords
  for (const topic of KNOWLEDGE_BASE) {
    const isMatch = topic.keywords.some(kw => qClean.includes(kw.toLowerCase()));
    if (isMatch) {
      return {
        response: topic.answer(query, profile?.fullName, profile?.preferredLanguage),
        category: topic.category,
        model: 'SkillPath Verified Knowledge Base'
      };
    }
  }

  // Dynamic synthesizer
  return {
    response: generateDynamicAnswer(query, profile),
    category: 'Computer Science & Engineering',
    model: 'SkillPath Intelligent Engine'
  };
}
