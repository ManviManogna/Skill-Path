import { DailyCodingChallenge, ScholarshipItem } from '../types';

export const DAILY_CODING_CHALLENGES: DailyCodingChallenge[] = [
  {
    id: 'dcc-1',
    title: 'Two Sum with Target Index Lookup',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    problemStatement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Assume each input has exactly one solution, and you may not use the same element twice.',
    exampleInput: 'nums = [2, 7, 11, 15], target = 9',
    exampleOutput: '[0, 1] (because nums[0] + nums[1] == 9)',
    hints: [
      'A brute force solution takes O(N^2) by checking every pair.',
      'Can you use a Hash Map to store elements you have seen so far?',
      'Check if `target - current_element` exists in your hash map in O(1) time.'
    ],
    practiceUrl: 'https://leetcode.com/problems/two-sum/',
    solutionSnippet: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for idx, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], idx]
        seen[num] = idx
    return []`,
    completed: true
  },
  {
    id: 'dcc-2',
    title: 'Valid Parentheses & Bracket Matching',
    difficulty: 'Easy',
    category: 'Stacks',
    problemStatement: 'Given a string `s` containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.',
    exampleInput: 's = "()[]{}"',
    exampleOutput: 'true',
    hints: [
      'Push opening brackets onto a stack.',
      'When an closing bracket is encountered, verify the top of stack has the matching opening bracket.',
      'Remember to check if stack is empty at the end.'
    ],
    practiceUrl: 'https://leetcode.com/problems/valid-parentheses/',
    solutionSnippet: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    completed: false
  },
  {
    id: 'dcc-3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    problemStatement: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
    exampleInput: 's = "abcabcbb"',
    exampleOutput: '3 (The answer is "abc", with the length of 3)',
    hints: [
      'Use a sliding window with two pointers: `left` and `right`.',
      'Maintain a set or dictionary of characters currently in the window.',
      'If a duplicate is found, shrink the window from the `left` until the duplicate is removed.'
    ],
    practiceUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    solutionSnippet: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    completed: false
  }
];

export const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: 'sch-1',
    title: 'Google Generation Scholarship (APAC)',
    provider: 'Google',
    awardAmount: '$2,500 USD (Approx ₹2,08,000)',
    eligibility: 'Women undergraduate students enrolled in Computer Science or related STEM degree in the Asia-Pacific region with demonstrated academic merit and leadership.',
    deadline: 'Announced Annually in Q1 (Jan - March)',
    officialUrl: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac',
    category: 'Women in Tech'
  },
  {
    id: 'sch-2',
    title: 'Reliance Foundation Undergraduate Scholarships',
    provider: 'Reliance Foundation',
    awardAmount: 'Up to ₹2,00,000 over degree duration',
    eligibility: 'First-year undergraduate students in any stream with minimum 60% in 12th Board, household income below ₹15 Lakhs per annum.',
    deadline: 'October - November each year',
    officialUrl: 'https://www.scholarships.reliancefoundation.org/',
    category: 'Merit'
  },
  {
    id: 'sch-3',
    title: 'Aditya Birla Group Scholarship',
    provider: 'Aditya Birla Centre',
    awardAmount: '₹65,000 per annum + Host institution benefits',
    eligibility: 'Top ranked students enrolled in premier institutes (IITs, BITS Pilani, IIMs, National Law Universities).',
    deadline: 'July - August (Post-admissions)',
    officialUrl: 'https://www.adityabirlascholars.net/',
    category: 'Merit'
  },
  {
    id: 'sch-4',
    title: 'Adobe India Women-in-Technology Scholarship',
    provider: 'Adobe Systems',
    awardAmount: '₹1,00,000 + Summer Internship Interview at Adobe India',
    eligibility: 'Female students currently in 3rd or 4th year of B.Tech/M.Tech Computer Science.',
    deadline: 'August - September each year',
    officialUrl: 'https://www.adobe.com/careers/university/india-scholarship.html',
    category: 'Women in Tech'
  }
];

export const SOFT_SKILLS_EXERCISES = [
  {
    id: 'ss-1',
    title: 'The STAR Method Masterclass',
    description: 'Learn how to answer behavioral interview questions ("Tell me about a time when...") with structured impact.',
    steps: [
      { letter: 'S', title: 'Situation', text: 'Set the context briefly (1-2 sentences). Name the project, company, or college hackathon.' },
      { letter: 'T', title: 'Task', text: 'Define the specific challenge or goal you needed to achieve.' },
      { letter: 'A', title: 'Action', text: 'Detail the exact technical steps YOU took (use "I", not just "We").' },
      { letter: 'R', title: 'Result', text: 'Deliver the quantifiable outcome (e.g., "Decreased build time by 40%", "Won 2nd place among 80 teams").' }
    ]
  },
  {
    id: 'ss-2',
    title: 'The 60-Second Developer Elevator Pitch',
    description: 'Structure an introduction that hooks interviewers and makes you unforgettable.',
    formula: [
      '1. Who you are & your degree (10 seconds)',
      '2. Your core tech focus & primary language (15 seconds)',
      '3. Your most proud project & measurable impact (25 seconds)',
      '4. Why you are excited about this specific opportunity (10 seconds)'
    ]
  }
];

export const PLACEMENT_CHECKLIST = [
  { id: 'pc-1', category: 'Aptitude & Reasoning', task: 'Speed Math & Percentages, Ratio, Work & Time', completed: true },
  { id: 'pc-2', category: 'Aptitude & Reasoning', task: 'Logical Reasoning: Blood Relations, Seating Arrangement, Syllogisms', completed: true },
  { id: 'pc-3', category: 'Core CS Subjects', task: 'DBMS: SQL Normalization, ACID transactions, Indexing', completed: true },
  { id: 'pc-4', category: 'Core CS Subjects', task: 'Operating Systems: Process vs Thread, Deadlocks, Paging', completed: false },
  { id: 'pc-5', category: 'Core CS Subjects', task: 'Computer Networks: TCP/UDP, OSI layers, DNS, HTTP vs HTTPS', completed: false },
  { id: 'pc-6', category: 'DSA Mastery', task: 'Arrays, Strings & Two Pointers (50 problems)', completed: true },
  { id: 'pc-7', category: 'DSA Mastery', task: 'Linked Lists, Stacks & Queues (30 problems)', completed: true },
  { id: 'pc-8', category: 'DSA Mastery', task: 'Trees, Binary Search Trees & Heaps (40 problems)', completed: false },
  { id: 'pc-9', category: 'DSA Mastery', task: 'Graphs: BFS, DFS, Dijkstra (30 problems)', completed: false },
  { id: 'pc-10', category: 'DSA Mastery', task: 'Dynamic Programming: 1D & 2D classic patterns (35 problems)', completed: false },
  { id: 'pc-11', category: 'System Design', task: 'High Level Design: Scalability, Caching, Load Balancing', completed: false },
  { id: 'pc-12', category: 'HR Preparation', task: 'Prepared 5 STAR method stories for behavioral rounds', completed: true }
];
