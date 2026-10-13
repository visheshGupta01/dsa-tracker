export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProblemStatus = "Not Started" | "Learning" | "Solved" | "Revise" | "Mastered" | "Needs Revision";
export type Confidence = "easy" | "needed-thinking" | "needed-hint" | "could-not-solve";

export interface RoadmapTopic {
  id: string;
  title: string;
  step: number;
  problems: Array<{ title: string; difficulty: Difficulty }>;
}

export interface DsaProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  status: ProblemStatus;
  problemUrl: string;
  solutionUrl: string;
  attempts: number;
  solvedWithoutHelp: boolean;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  notes: string;
  solvedAt: string;
  lastRevisedAt: string;
  nextRevisionAt: string;
  confidence: Confidence;
}

export interface DailyTask {
  id: string;
  title: string;
  type: "Learn" | "Practice" | "Revision";
  problemId?: string;
  completed: boolean;
}

export interface StudySession {
  id: string;
  date: string;
  learningMinutes: number;
  practiceMinutes: number;
  revisionMinutes: number;
  tasks: string[];
  problemsSolved: string[];
  problemsRevised: string[];
  completed: boolean;
}

export interface JourneyData {
  problems: DsaProblem[];
  sessions: StudySession[];
  dailyTasks: Record<string, DailyTask[]>;
  dailyMinutes: Record<string, { learning: number; practice: number; revision: number }>;
}

export const roadmap: RoadmapTopic[] = [
  { id: "basics", title: "Learn the Basics", step: 1, problems: [{ title: "User Input / Output", difficulty: "Easy" }, { title: "Data Types & If Else", difficulty: "Easy" }, { title: "For Loops & Functions", difficulty: "Easy" }] },
  { id: "sorting", title: "Sorting", step: 2, problems: [{ title: "Selection Sort", difficulty: "Easy" }, { title: "Bubble Sort", difficulty: "Easy" }, { title: "Merge Sort", difficulty: "Medium" }] },
  { id: "arrays", title: "Arrays", step: 3, problems: [{ title: "Two Sum", difficulty: "Easy" }, { title: "Kadane's Algorithm", difficulty: "Medium" }, { title: "Sort Colors", difficulty: "Medium" }] },
  { id: "binary-search", title: "Binary Search", step: 4, problems: [{ title: "Binary Search", difficulty: "Easy" }, { title: "Lower Bound", difficulty: "Easy" }, { title: "Search in Rotated Sorted Array", difficulty: "Medium" }] },
  { id: "strings", title: "Strings", step: 5, problems: [{ title: "Reverse Words in a String", difficulty: "Medium" }, { title: "Longest Palindromic Substring", difficulty: "Medium" }, { title: "Roman to Integer", difficulty: "Easy" }] },
  { id: "linked-lists", title: "Linked Lists", step: 6, problems: [{ title: "Reverse a Linked List", difficulty: "Easy" }, { title: "Middle of the Linked List", difficulty: "Easy" }, { title: "Linked List Cycle", difficulty: "Easy" }] },
  { id: "recursion", title: "Recursion", step: 7, problems: [{ title: "Print All Subsequences", difficulty: "Medium" }, { title: "Combination Sum", difficulty: "Medium" }, { title: "Subset Sums", difficulty: "Medium" }] },
  { id: "bit-manipulation", title: "Bit Manipulation", step: 8, problems: [{ title: "Check if the i-th Bit Is Set", difficulty: "Easy" }, { title: "Single Number", difficulty: "Easy" }, { title: "Power Set", difficulty: "Medium" }] },
  { id: "stack-queue", title: "Stack & Queue", step: 9, problems: [{ title: "Valid Parentheses", difficulty: "Easy" }, { title: "Min Stack", difficulty: "Medium" }, { title: "Implement Queue Using Stacks", difficulty: "Easy" }] },
  { id: "sliding-window", title: "Sliding Window / Two Pointer", step: 10, problems: [{ title: "Longest Substring Without Repeating Characters", difficulty: "Medium" }, { title: "Max Consecutive Ones III", difficulty: "Medium" }, { title: "Two Sum II", difficulty: "Medium" }] },
  { id: "heaps", title: "Heaps", step: 11, problems: [{ title: "Kth Largest Element", difficulty: "Medium" }, { title: "Top K Frequent Elements", difficulty: "Medium" }, { title: "Merge K Sorted Lists", difficulty: "Hard" }] },
  { id: "greedy", title: "Greedy Algorithms", step: 12, problems: [{ title: "Assign Cookies", difficulty: "Easy" }, { title: "Jump Game", difficulty: "Medium" }, { title: "N Meetings in One Room", difficulty: "Medium" }] },
  { id: "binary-trees", title: "Binary Trees", step: 13, problems: [{ title: "Inorder Traversal", difficulty: "Easy" }, { title: "Maximum Depth of Binary Tree", difficulty: "Easy" }, { title: "Diameter of a Binary Tree", difficulty: "Easy" }] },
  { id: "bst", title: "Binary Search Trees", step: 14, problems: [{ title: "Search in a BST", difficulty: "Easy" }, { title: "Validate Binary Search Tree", difficulty: "Medium" }, { title: "Lowest Common Ancestor in a BST", difficulty: "Medium" }] },
  { id: "graphs", title: "Graphs", step: 15, problems: [{ title: "Number of Islands", difficulty: "Medium" }, { title: "Rotting Oranges", difficulty: "Medium" }, { title: "Course Schedule", difficulty: "Medium" }] },
  { id: "dynamic-programming", title: "Dynamic Programming", step: 16, problems: [{ title: "Climbing Stairs", difficulty: "Easy" }, { title: "House Robber", difficulty: "Medium" }, { title: "Longest Common Subsequence", difficulty: "Medium" }] },
  { id: "tries", title: "Tries", step: 17, problems: [{ title: "Implement Trie", difficulty: "Medium" }, { title: "Word Search II", difficulty: "Hard" }, { title: "Maximum XOR of Two Numbers", difficulty: "Hard" }] },
];

export const problemIdFor = (topic: RoadmapTopic, title: string) => `${topic.id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;