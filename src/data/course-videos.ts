import { roadmap } from "@/data/roadmap";

export interface CourseVideo {
  id: string;
  topic: string;
  title: string;
  url: string;
  duration: string;
  order: number;
}

// Links are sourced from the bundled Striver A2Z sheet snapshot.
// Duplicate links are collapsed within each topic; unavailable links are omitted.
const rawVideos = {
  "Course Foundations": [
    { "title": "A2Z DSA Course Introduction", "url": "https://www.youtube.com/watch?v=0bHoB32fuj0", "duration": "8 min", "order": 1 },
    { "title": "Set Up VS Code for DSA and Competitive Programming", "url": "https://www.youtube.com/watch?v=h3uDCJ5mvgw", "duration": "9 min", "order": 2 },
    { "title": "C++ Basics in One Shot — A2Z DSA L1", "url": "https://www.youtube.com/watch?v=EAR7De6Goz4", "duration": "1 hr 26 min", "order": 3 },
    { "title": "Time and Space Complexity", "url": "https://www.youtube.com/watch?v=FPu9Uld7W-E", "duration": "35 min", "order": 4 },
    { "title": "Solve Any Pattern Question — 22 Patterns", "url": "https://www.youtube.com/watch?v=tNm_NNSB3_w", "duration": "1 hr 22 min", "order": 5 },
    { "title": "Complete C++ STL in One Video", "url": "https://www.youtube.com/watch?v=RRVYpIET_RU", "duration": "1 hr 8 min", "order": 6 },
    { "title": "Basic Maths for DSA — Euclidean Algorithm", "url": "https://www.youtube.com/watch?v=1xNbjMdbjug", "duration": "1 hr 3 min", "order": 7 },
    { "title": "Introduction to Recursion — Recursion Tree and Stack Space", "url": "https://www.youtube.com/watch?v=yVdKa8dnKiE", "duration": "23 min", "order": 8 },
    { "title": "Basic Problems on Recursion", "url": "https://www.youtube.com/watch?v=un6PLygfXrA", "duration": "22 min", "order": 9 },
    { "title": "Hashing — Maps, Collisions and Time Complexity", "url": "https://www.youtube.com/watch?v=KEs5UyBJ39g", "duration": "1 hr", "order": 10 },
    { "title": "Introduction to Trees and Types of Trees", "url": "https://www.youtube.com/watch?v=_ANrF3FJm7I", "duration": "10 min", "order": 11 },
    { "title": "Binary Tree Representation in C++", "url": "https://www.youtube.com/watch?v=ctCpP0RFDFc", "duration": "5 min", "order": 12 },
    { "title": "Tree Traversal Techniques — DFS and BFS", "url": "https://www.youtube.com/watch?v=jmy0LaGET1I", "duration": "10 min", "order": 13 },
    { "title": "Introduction to Graphs", "url": "https://www.youtube.com/watch?v=M3_pLsDdeuU", "duration": "14 min", "order": 14 },
    { "title": "Graph Representation in C++", "url": "https://www.youtube.com/watch?v=3oI-34aPMWM", "duration": "16 min", "order": 15 },
    { "title": "Introduction to Dynamic Programming", "url": "https://www.youtube.com/watch?v=tyB0ztf0DNY", "duration": "34 min", "order": 16 },
    { "title": "Climbing Stairs — Recurrence and DP", "url": "https://www.youtube.com/watch?v=mLfjzJsN8us", "duration": "16 min", "order": 17 },
  ],
  "Beginner Problems": [
    {
      "title": "Pattern 1",
      "url": "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
      "duration": "13 min",
      "order": 1
    },
    {
      "title": "Count all Digits of a Number",
      "url": "https://youtu.be/1xNbjMdbjug",
      "duration": "8 min",
      "order": 23
    },
    {
      "title": "Reverse a number",
      "url": "https://youtu.be/1xNbjMdbjug?t=930",
      "duration": "7 min",
      "order": 25
    },
    {
      "title": "Palindrome Number",
      "url": "https://youtu.be/1xNbjMdbjug?t=1230",
      "duration": "4 min",
      "order": 26
    },
    {
      "title": "Factorial of a given number",
      "url": "https://www.youtube.com/watch?v=69ZCDFy-OUo&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=3",
      "duration": "3 min",
      "order": 28
    },
    {
      "title": "Check if the Number is Armstrong",
      "url": "https://youtu.be/1xNbjMdbjug?t=1418",
      "duration": "7 min",
      "order": 29
    },
    {
      "title": "Check for Prime Number",
      "url": "https://youtu.be/1xNbjMdbjug?t=2381",
      "duration": "6 min",
      "order": 31
    },
    {
      "title": "GCD of Two Numbers",
      "url": "https://youtu.be/1xNbjMdbjug?t=2684",
      "duration": "13 min",
      "order": 33
    },
    {
      "title": "Divisors of a Number",
      "url": "https://youtu.be/1xNbjMdbjug?t=1580",
      "duration": "9 min",
      "order": 35
    },
    {
      "title": "Reverse an array",
      "url": "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
      "duration": "14 min",
      "order": 39
    },
    {
      "title": "Check if the Array is Sorted II",
      "url": "https://youtu.be/37E9ckMDdTk?t=17224",
      "duration": "7 min",
      "order": 48
    },
    {
      "title": "Fibonacci Number",
      "url": "https://www.youtube.com/watch?v=kvRjNm4rVBE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=5",
      "duration": "20 min",
      "order": 50
    }
  ],
  "Sorting": [
    {
      "title": "Selection Sort",
      "url": "https://youtu.be/HGk_ypEuS24?t=167",
      "duration": "15 min",
      "order": 51
    },
    {
      "title": "Bubble Sort",
      "url": "https://youtu.be/HGk_ypEuS24?t=1061",
      "duration": "14 min",
      "order": 52
    },
    {
      "title": "Insertion Sorting",
      "url": "https://youtu.be/HGk_ypEuS24?t=1900",
      "duration": "11 min",
      "order": 53
    },
    {
      "title": "Merge Sorting",
      "url": "https://youtu.be/ogjf7ORKfd8",
      "duration": "47 min",
      "order": 54
    },
    {
      "title": "Quick Sorting",
      "url": "https://youtu.be/WIrA4YexLRQ",
      "duration": "33 min",
      "order": 55
    }
  ],
  "Arrays": [
    {
      "title": "Linear Search",
      "url": "https://youtu.be/wvcQg43_V8U?t=2465",
      "duration": "4 min",
      "order": 56
    },
    {
      "title": "Largest Element",
      "url": "https://youtu.be/37E9ckMDdTk?t=526",
      "duration": "5 min",
      "order": 57
    },
    {
      "title": "Second Largest Element",
      "url": "https://youtu.be/37E9ckMDdTk?t=810",
      "duration": "15 min",
      "order": 58
    },
    {
      "title": "Maximum Consecutive Ones",
      "url": "https://youtu.be/bYWLJb3vCWY?t=1124",
      "duration": "3 min",
      "order": 59
    },
    {
      "title": "Left Rotate Array by One",
      "url": "https://youtu.be/wvcQg43_V8U?t=61",
      "duration": "6 min",
      "order": 60
    },
    {
      "title": "Left Rotate Array by K Places",
      "url": "https://youtu.be/wvcQg43_V8U?t=485",
      "duration": "17 min",
      "order": 61
    },
    {
      "title": "Move Zeros to End",
      "url": "https://youtu.be/wvcQg43_V8U?t=1633",
      "duration": "13 min",
      "order": 62
    },
    {
      "title": "Remove duplicates from sorted array",
      "url": "https://youtu.be/37E9ckMDdTk?t=1887",
      "duration": "11 min",
      "order": 63
    },
    {
      "title": "Union of two sorted arrays",
      "url": "https://youtu.be/wvcQg43_V8U?t=2584",
      "duration": "16 min",
      "order": 65
    },
    {
      "title": "Majority Element-I",
      "url": "https://youtu.be/nP_ns3uSh80",
      "duration": "17 min",
      "order": 67
    },
    {
      "title": "Leaders in an Array",
      "url": "https://youtu.be/cHrH9CQ8pmY",
      "duration": "11 min",
      "order": 68
    },
    {
      "title": "Rearrange array elements by sign",
      "url": "https://youtu.be/h4aBagy4Uok",
      "duration": "9 min",
      "order": 69
    },
    {
      "title": "Print the matrix in spiral manner",
      "url": "https://youtu.be/3Zv-s9UUrFM",
      "duration": "15 min",
      "order": 70
    },
    {
      "title": "Pascal's Triangle I",
      "url": "https://youtu.be/bR7mQgwQ_o8",
      "duration": "10 min",
      "order": 71
    },
    {
      "title": "Rotate matrix by 90 degrees",
      "url": "https://youtu.be/Z0R2u6gd3GU",
      "duration": "17 min",
      "order": 74
    },
    {
      "title": "Set Matrix Zeroes",
      "url": "https://youtu.be/N0MgLvceX7M",
      "duration": "",
      "order": 75
    },
    {
      "title": "Two Sum",
      "url": "https://youtu.be/UXDSeD9mN-k",
      "duration": "17 min",
      "order": 76
    },
    {
      "title": "3 Sum",
      "url": "https://youtu.be/DhFh8Kw7ymk",
      "duration": "37 min",
      "order": 77
    },
    {
      "title": "4 Sum",
      "url": "https://youtu.be/eD95WRfh81c",
      "duration": "27 min",
      "order": 78
    },
    {
      "title": "Sort an array of 0's 1's and 2's",
      "url": "https://youtu.be/tp8JIuCXBaU",
      "duration": "24 min",
      "order": 79
    },
    {
      "title": "Kadane's Algorithm",
      "url": "https://youtu.be/AHZpyENo7k4",
      "duration": "19 min",
      "order": 80
    },
    {
      "title": "Next Permutation",
      "url": "https://youtu.be/JDOXKqF60RQ",
      "duration": "26 min",
      "order": 81
    },
    {
      "title": "Majority Element-II",
      "url": "https://youtu.be/vwZj1K0e9U8",
      "duration": "25 min",
      "order": 82
    },
    {
      "title": "Find the repeating and missing number",
      "url": "https://youtu.be/2D0D8HE6uak",
      "duration": "41 min",
      "order": 83
    },
    {
      "title": "Count Inversions",
      "url": "https://youtu.be/AseUmwVNaoY",
      "duration": "23 min",
      "order": 84
    },
    {
      "title": "Reverse Pairs",
      "url": "https://youtu.be/0e4bZaP3MDI",
      "duration": "31 min",
      "order": 85
    },
    {
      "title": "Merge two sorted arrays without extra space",
      "url": "https://youtu.be/n7uwj04E0I4",
      "duration": "32 min",
      "order": 87
    }
  ],
  "Hashing": [
    {
      "title": "Longest Consecutive Sequence in an Array",
      "url": "https://youtu.be/oO5uLE7EUlM",
      "duration": "22 min",
      "order": 88
    },
    {
      "title": "Longest subarray with sum K",
      "url": "https://youtu.be/frf7qxiN2qU",
      "duration": "40 min",
      "order": 89
    },
    {
      "title": "Largest Subarray with Sum 0",
      "url": "https://www.youtube.com/watch?v=xmguZ6GbatA&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=23",
      "duration": "",
      "order": 90
    },
    {
      "title": "Count subarrays with given sum",
      "url": "https://www.youtube.com/watch?v=xvNwoz-ufXA&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32",
      "duration": "22 min",
      "order": 91
    },
    {
      "title": "Count subarrays with given xor K",
      "url": "https://youtu.be/eZr-6p0B7ME",
      "duration": "23 min",
      "order": 92
    }
  ],
  "Binary Search": [
    {
      "title": "Search X in sorted array",
      "url": "https://youtu.be/MHf6awe89xw",
      "duration": "33 min",
      "order": 93
    },
    {
      "title": "Lower Bound",
      "url": "https://youtu.be/6zhGS79oQ4k",
      "duration": "16 min",
      "order": 94
    },
    {
      "title": "Floor and Ceil in Sorted Array",
      "url": "https://www.youtube.com/watch?v=6zhGS79oQ4k&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=3",
      "duration": "6 min",
      "order": 97
    },
    {
      "title": "First and last occurrence",
      "url": "https://youtu.be/hjR1IYVx9lY",
      "duration": "22 min",
      "order": 98
    },
    {
      "title": "Search in rotated sorted array-I",
      "url": "https://www.youtube.com/watch?v=r3pMQ8-Ad5s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=64",
      "duration": "15 min",
      "order": 99
    },
    {
      "title": "Search in rotated sorted array-II",
      "url": "https://youtu.be/w2G2W8l__pc",
      "duration": "12 min",
      "order": 100
    },
    {
      "title": "Find minimum in Rotated Sorted Array",
      "url": "https://youtu.be/nhEMDKMB44g",
      "duration": "15 min",
      "order": 101
    },
    {
      "title": "Find out how many times the array is rotated",
      "url": "https://youtu.be/jtSiWTPLwd0",
      "duration": "4 min",
      "order": 102
    },
    {
      "title": "Single element in sorted array",
      "url": "https://youtu.be/AZOmHuHadxQ",
      "duration": "22 min",
      "order": 103
    },
    {
      "title": "Find square root of a number",
      "url": "https://youtu.be/Bsv3FPUX_BA",
      "duration": "17 min",
      "order": 104
    },
    {
      "title": "Find Nth root of a number",
      "url": "https://www.youtube.com/watch?v=WjpswYrS2nY&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=62",
      "duration": "20 min",
      "order": 105
    },
    {
      "title": "Find the smallest divisor",
      "url": "https://youtu.be/UvBKTVaG6U8",
      "duration": "15 min",
      "order": 106
    },
    {
      "title": "Koko eating bananas",
      "url": "https://youtu.be/qyfekrNni90",
      "duration": "20 min",
      "order": 107
    },
    {
      "title": "Minimum days to make M bouquets",
      "url": "https://youtu.be/TXAuxeYBTdg",
      "duration": "25 min",
      "order": 108
    },
    {
      "title": "Capacity to Ship Packages Within D Days",
      "url": "https://youtu.be/MG-Ac4TAvTY",
      "duration": "",
      "order": 109
    },
    {
      "title": "Kth Missing Positive Number",
      "url": "https://youtu.be/uZ0N_hZpyps",
      "duration": "",
      "order": 110
    },
    {
      "title": "Painter's Partition",
      "url": "https://www.youtube.com/watch?v=thUd_WJn6wk&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=20",
      "duration": "",
      "order": 111
    },
    {
      "title": "Aggressive Cows",
      "url": "https://youtu.be/R_Mfw4ew-Vo",
      "duration": "26 min",
      "order": 112
    },
    {
      "title": "Book Allocation Problem",
      "url": "https://www.youtube.com/watch?v=gYmWHvRHu-s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=69",
      "duration": "27 min",
      "order": 113
    },
    {
      "title": "Find peak element",
      "url": "https://youtu.be/cXxmbemS6XM",
      "duration": "32 min",
      "order": 114
    },
    {
      "title": "Median of 2 sorted arrays",
      "url": "https://www.youtube.com/watch?v=NTop3VTjmxk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=65",
      "duration": "50 min",
      "order": 115
    },
    {
      "title": "Kth element of 2 sorted arrays",
      "url": "https://www.youtube.com/watch?v=nv7F4PiLUzo&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=66",
      "duration": "10 min",
      "order": 116
    },
    {
      "title": "Minimize Max Distance to Gas Station",
      "url": "https://www.youtube.com/watch?v=kMSBvlZ-_HA&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=21",
      "duration": "58 min",
      "order": 117
    },
    {
      "title": "Find row with maximum 1's",
      "url": "https://youtu.be/SCz-1TtYxDI",
      "duration": "10 min",
      "order": 119
    },
    {
      "title": "Search in a 2D Matrix",
      "url": "https://youtu.be/ZYpYur0znng",
      "duration": "15 min",
      "order": 120
    },
    {
      "title": "Search in 2D matrix - II",
      "url": "https://youtu.be/9ZbB397jU4k",
      "duration": "15 min",
      "order": 121
    },
    {
      "title": "Find Peak Element - II",
      "url": "https://youtu.be/nGGp5XBzC4g?si=WCop5C6Azj5gAELH",
      "duration": "20 min",
      "order": 122
    },
    {
      "title": "Matrix Median",
      "url": "https://youtu.be/Q9wXgdxJq48?si=ScI_0uzJh7yg8nrX",
      "duration": "23 min",
      "order": 123
    }
  ],
  "Strings (Basic and Medium)": [
    {
      "title": "Check if String is Palindrome or Not",
      "url": "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
      "duration": "10 min",
      "order": 133
    }
  ],
  "Recursion": [
    {
      "title": "Pow(x,n)",
      "url": "https://youtu.be/l0YC3876qxg",
      "duration": "23 min",
      "order": 134
    },
    {
      "title": "Power Set",
      "url": "https://www.youtube.com/watch?v=b7AYbpM5YrE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=67",
      "duration": "20 min",
      "order": 136
    },
    {
      "title": "Combination Sum",
      "url": "https://www.youtube.com/watch?v=OyZFFqQtu98&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=49",
      "duration": "16 min",
      "order": 139
    },
    {
      "title": "Combination Sum II",
      "url": "https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=50",
      "duration": "15 min",
      "order": 140
    },
    {
      "title": "Subsets I",
      "url": "https://www.youtube.com/watch?v=rYkfBRtMJr8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=52",
      "duration": "7 min",
      "order": 141
    },
    {
      "title": "Subsets II",
      "url": "https://www.youtube.com/watch?v=RIn3gOkbhQE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=53",
      "duration": "21 min",
      "order": 142
    },
    {
      "title": "Palindrome partitioning",
      "url": "https://youtu.be/_H8V5hJUGd0",
      "duration": "18 min",
      "order": 145
    },
    {
      "title": "N Queen",
      "url": "https://www.youtube.com/watch?v=i05Ju7AftcM&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=57",
      "duration": "24 min",
      "order": 147
    },
    {
      "title": "Rat in a Maze",
      "url": "https://www.youtube.com/watch?v=bLGZhJlt4y0&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=60",
      "duration": "19 min",
      "order": 148
    },
    {
      "title": "M Coloring Problem",
      "url": "https://www.youtube.com/watch?v=wuVwUK25Rfc&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=59",
      "duration": "22 min",
      "order": 149
    },
    {
      "title": "Sudoku Solver",
      "url": "https://www.youtube.com/watch?v=FWAIf_EVUKE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=58",
      "duration": "31 min",
      "order": 150
    }
  ],
  "Linked-List": [
    {
      "title": "Deletion of the head of LL",
      "url": "https://youtu.be/VaECK03Dz-g?si=CRaBHbOo2bHFbOT5",
      "duration": "6 min",
      "order": 152
    },
    {
      "title": "Insertion at the head of Linked List",
      "url": "https://youtu.be/VaECK03Dz-g?si=vHSwdf9jhE05adKM&t=1934",
      "duration": "3 min",
      "order": 156
    },
    {
      "title": "Insert node before head in Doubly Linked List",
      "url": "https://youtu.be/0eKMU10uEDI?si=J5a0pQTosimcO_aA&t=2684",
      "duration": "3 min",
      "order": 164
    },
    {
      "title": "Add two numbers in Linked List",
      "url": "https://www.youtube.com/watch?v=LBVsXSMOIk4&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=32",
      "duration": "14 min",
      "order": 168
    },
    {
      "title": "Segregate odd and even nodes in Linked List",
      "url": "https://youtu.be/qf6qp7GzD5Q?si=JozAyXUdT8EJMSCQ",
      "duration": "24 min",
      "order": 169
    },
    {
      "title": "Sort a Linked List of 0's 1's and 2's",
      "url": "https://youtu.be/gRII7LhdJWc?si=l3qRC7w3NhY7OAqw",
      "duration": "22 min",
      "order": 170
    },
    {
      "title": "Remove Nth node from the back of the LL",
      "url": "https://youtu.be/3kMKYQ2wNIU?si=DtFDnPU7z9HMz_GM",
      "duration": "16 min",
      "order": 171
    },
    {
      "title": "Reverse a LL",
      "url": "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
      "duration": "32 min",
      "order": 172
    },
    {
      "title": "Add one to a number represented by LL",
      "url": "https://youtu.be/aXQWhbvT3w0?si=uRgU9S4r5cVmnUy7",
      "duration": "24 min",
      "order": 173
    },
    {
      "title": "Find Middle of Linked List",
      "url": "https://youtu.be/7LjQ57RqgEc?si=ir_rRDio38rhamU_",
      "duration": "14 min",
      "order": 174
    },
    {
      "title": "Delete the middle node in LL",
      "url": "https://youtu.be/ePpV-_pfOeI?si=Au9GsZkVO57j6SiN",
      "duration": "16 min",
      "order": 175
    },
    {
      "title": "Check if LL is palindrome or not",
      "url": "https://youtu.be/lRY_G-u_8jk?si=BpM8hRYvXSYyjl-G",
      "duration": "20 min",
      "order": 176
    },
    {
      "title": "Find the intersection point of Y LL",
      "url": "https://youtu.be/0DYoPz2Tpt4?si=L-uJs5yXUxj4VJM2",
      "duration": "32 min",
      "order": 177
    },
    {
      "title": "Detect a loop in LL",
      "url": "https://youtu.be/wiOo4DC5GGA?si=zagt6O6tFXc4_3cx",
      "duration": "20 min",
      "order": 178
    },
    {
      "title": "Find the starting point in LL",
      "url": "https://youtu.be/2Kd0KKmmHFc?si=7UreDPRjRvapeVB0",
      "duration": "21 min",
      "order": 179
    },
    {
      "title": "Length of loop in LL",
      "url": "https://youtu.be/I4g1qbkTPus?si=ONktpqewvx57T8pF",
      "duration": "14 min",
      "order": 180
    },
    {
      "title": "Reverse LL in group of given size K",
      "url": "https://youtu.be/lIar1skcQYI?si=_jFghHKX4eaK36a1",
      "duration": "24 min",
      "order": 181
    },
    {
      "title": "Rotate a LL",
      "url": "https://youtu.be/uT7YI7XbTY8?si=ZaChW3a68c_v54Is",
      "duration": "12 min",
      "order": 182
    },
    {
      "title": "Merge two Sorted Lists",
      "url": "https://www.youtube.com/watch?v=Xb4slcp1U38&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=29",
      "duration": "18 min",
      "order": 183
    },
    {
      "title": "Flattening of LL",
      "url": "https://youtu.be/ykelywHJWLg?si=InMg9MmTHzY22NSR",
      "duration": "33 min",
      "order": 184
    },
    {
      "title": "Sort LL",
      "url": "https://youtu.be/8ocB7a_c-Cc?si=Gv-Y8q8-WyARoV35",
      "duration": "22 min",
      "order": 185
    },
    {
      "title": "Clone a LL with random and next pointer",
      "url": "https://youtu.be/q570bKdrnlw?si=epZtpWvtNwuTf23o",
      "duration": "33 min",
      "order": 186
    },
    {
      "title": "Delete all occurrences of a key in DLL",
      "url": "https://youtu.be/Mh0NH_SD92k?si=tCYshBRi1upMqSVz",
      "duration": "11 min",
      "order": 187
    },
    {
      "title": "Remove duplicates from sorted DLL",
      "url": "https://youtu.be/YJKVTnOJXSY?si=AsZoNUoewetsBjr0",
      "duration": "12 min",
      "order": 188
    },
    {
      "title": "Find Pairs with Given Sum in Doubly Linked List",
      "url": "https://youtu.be/YitR4dQsddE?si=iZAC259hdngV_OxC",
      "duration": "",
      "order": 189
    }
  ],
  "Bit Manipulation": [
    {
      "title": "Minimum Bit Flips to Convert Number",
      "url": "https://youtu.be/OOdrmcfZXd8?si=rnkRVz1UiVBKWC69",
      "duration": "7 min",
      "order": 190
    },
    {
      "title": "Single Number - I",
      "url": "https://youtu.be/bYWLJb3vCWY?t=1369",
      "duration": "7 min",
      "order": 191
    },
    {
      "title": "Single Number - III",
      "url": "https://youtu.be/UA5JnV1J2sI?si=VFBRJyb3boZvx_r1",
      "duration": "24 min",
      "order": 193
    },
    {
      "title": "Divide two numbers without multiplication and division",
      "url": "https://youtu.be/pBD4B1tzgVc?si=G9c5pEE-RrzeU6sz",
      "duration": "19 min",
      "order": 194
    },
    {
      "title": "Power Set Bit Manipulation",
      "url": "https://youtu.be/LqKaUv1G3_I?si=UXU_T5OsHiokPRvP",
      "duration": "12 min",
      "order": 195
    },
    {
      "title": "XOR of numbers in a given range",
      "url": "https://youtu.be/WqGb7159h7Q?si=uGUEbNUUaIN_6Vvr",
      "duration": "5 min",
      "order": 196
    }
  ],
  "Greedy Algorithms": [
    {
      "title": "Assign Cookies",
      "url": "https://youtu.be/DIX2p7vb9co?si=GofAIDimue-Av0Fi",
      "duration": "10 min",
      "order": 197
    },
    {
      "title": "Lemonade Change",
      "url": "https://youtu.be/n_tmibEhO6Q?si=q1NW8MfPy0QU6fIl",
      "duration": "9 min",
      "order": 198
    },
    {
      "title": "Fractional Knapsack",
      "url": "https://youtu.be/1ibsQrnuEEg?si=8R2By3wpHo0zZVHE",
      "duration": "",
      "order": 199
    },
    {
      "title": "Jump Game - I",
      "url": "https://youtu.be/tZAa_jJ3SwQ?si=voKd7n9VTLDRRNzJ",
      "duration": "10 min",
      "order": 200
    },
    {
      "title": "Shortest Job First",
      "url": "https://youtu.be/3-QbX1iDbXs?si=IH8QZUblr01F7UoQ",
      "duration": "7 min",
      "order": 201
    },
    {
      "title": "Job sequencing Problem",
      "url": "https://youtu.be/QbwltemZbRg?si=wvcemJ5BLPlTRmkG",
      "duration": "16 min",
      "order": 202
    },
    {
      "title": "N meetings in one room",
      "url": "https://youtu.be/mKfhTotEguk?si=2RELeq18mpmIIN3Q",
      "duration": "13 min",
      "order": 203
    },
    {
      "title": "Non-overlapping Intervals",
      "url": "https://youtu.be/HDHQ8lAWakY?si=JVtLqboGdpUTOVjf",
      "duration": "8 min",
      "order": 204
    },
    {
      "title": "Insert Interval",
      "url": "https://youtu.be/xxRE-46OCC8?si=a7aPuIw16zDx2lAa",
      "duration": "13 min",
      "order": 205
    },
    {
      "title": "Merge Intervals",
      "url": "https://www.youtube.com/watch?v=2JzRBPFYbKE&list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2&index=6",
      "duration": "",
      "order": 206
    },
    {
      "title": "Minimum number of platforms required for a railway",
      "url": "https://youtu.be/AsGzwR_FWok?si=165acXU_dtqOHuo9",
      "duration": "18 min",
      "order": 207
    },
    {
      "title": "Valid Paranthesis Checker",
      "url": "https://youtu.be/cHT6sG_hUZI?si=XRHeyh7jOaLaTy3g",
      "duration": "25 min",
      "order": 208
    },
    {
      "title": "Candy",
      "url": "https://youtu.be/IIqVFvKE6RY?si=EjmuXZJNLQLUkEd7",
      "duration": "30 min",
      "order": 209
    },
    {
      "title": "Jump Game II",
      "url": "https://youtu.be/7SBVnw7GSTk?si=9uUouBELh9K3m2jZ",
      "duration": "",
      "order": 210
    }
  ],
  "Sliding Window / 2 Pointer": [
    {
      "title": "Maximum Points You Can Obtain from Cards",
      "url": "https://youtu.be/pBWCOCS636U?si=-X64rY67noxvOwrG",
      "duration": "11 min",
      "order": 211
    },
    {
      "title": "Longest Substring Without Repeating Characters",
      "url": "https://youtu.be/-zSxTJkcdAo?si=I2zfR-vlDMg0zU9z",
      "duration": "22 min",
      "order": 212
    },
    {
      "title": "Max Consecutive Ones III",
      "url": "https://youtu.be/3E4JBHSLpYk?si=SoOW64pP6otEKxBw",
      "duration": "29 min",
      "order": 213
    },
    {
      "title": "Fruit Into Baskets",
      "url": "https://youtu.be/e3bs0uA1NhQ?si=gR8pO62u-nJeFAXk",
      "duration": "29 min",
      "order": 214
    },
    {
      "title": "Longest Substring With At Most K Distinct Characters",
      "url": "https://youtu.be/teM9ZsVRQyc?si=Kh0_u6aCkkBU3Q33",
      "duration": "21 min",
      "order": 215
    },
    {
      "title": "Longest Repeating Character Replacement",
      "url": "https://youtu.be/_eNhaDCr6P0?si=pBWcEjozF5poom0p",
      "duration": "25 min",
      "order": 216
    },
    {
      "title": "Minimum Window Substring",
      "url": "https://youtu.be/WJaij9ffOIY?si=-xnsWIH84zWU0ICd",
      "duration": "26 min",
      "order": 217
    },
    {
      "title": "Number of Substrings Containing All Three Characters",
      "url": "https://youtu.be/xtqN4qlgr8s?si=kuaLHVOLXhh5Z2tW",
      "duration": "19 min",
      "order": 218
    },
    {
      "title": "Binary Subarrays With Sum",
      "url": "https://youtu.be/XnMdNUkX6VM?si=Nyt8EveeLUg8lmty",
      "duration": "20 min",
      "order": 219
    },
    {
      "title": "Count number of Nice subarrays",
      "url": "https://youtu.be/j_QOv9OT9Og?si=Oq5-5hyFkzVSOZpP",
      "duration": "4 min",
      "order": 220
    },
    {
      "title": "Subarrays with K Different Integers",
      "url": "https://youtu.be/7wYGbV_LsX4?si=KWa48RgLDCvdNqRb",
      "duration": "",
      "order": 221
    }
  ],
  "Stack / Queues": [
    {
      "title": "Implement Stack using Arrays",
      "url": "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
      "duration": "8 min",
      "order": 222
    },
    {
      "title": "Balanced Paranthesis",
      "url": "https://youtu.be/xwjS0iZhw4I?si=UoyKpFn4Q3nf5h2R",
      "duration": "12 min",
      "order": 228
    },
    {
      "title": "Next Greater Element",
      "url": "https://youtu.be/e7XQLtOQM3I?si=QdcHpTtx6gAHsext",
      "duration": "18 min",
      "order": 229
    },
    {
      "title": "Next Greater Element - 2",
      "url": "https://youtu.be/7PrncD7v9YQ?si=UkBc7eVy9HGlBpeW",
      "duration": "15 min",
      "order": 230
    },
    {
      "title": "Asteroid Collision",
      "url": "https://youtu.be/_eYGqw_VDR4?si=YyxibcHq800RqgIQ",
      "duration": "17 min",
      "order": 231
    },
    {
      "title": "Sum of Subarray Minimums",
      "url": "https://youtu.be/v0e8p9JCgRc?si=XAU7ekECgS5nboRw",
      "duration": "23 min",
      "order": 232
    },
    {
      "title": "Sum of Subarray Ranges",
      "url": "https://youtu.be/gIrMptNPf5M?si=Q_GHuBvzZVs27X_U",
      "duration": "10 min",
      "order": 233
    },
    {
      "title": "Remove K Digits",
      "url": "https://youtu.be/jmbuRzYPGrg?si=WN387gwQ7aXWkUao",
      "duration": "15 min",
      "order": 234
    },
    {
      "title": "Implement Min Stack",
      "url": "https://youtu.be/NdDIaH91P0g?si=4_Jbsq5trFvfSdUY",
      "duration": "21 min",
      "order": 235
    },
    {
      "title": "Sliding Window Maximum",
      "url": "https://youtu.be/NwBvene4Imo?si=eU1PY-bcQfk5wdog",
      "duration": "20 min",
      "order": 236
    },
    {
      "title": "Trapping Rainwater",
      "url": "https://youtu.be/1_5VuquLbXg?si=NFG6df318_6OtGvg",
      "duration": "29 min",
      "order": 237
    },
    {
      "title": "Largest rectangle in a histogram",
      "url": "https://youtu.be/Bzat9vgD0fs?si=DiBlLejXcr6EJoyB",
      "duration": "31 min",
      "order": 238
    },
    {
      "title": "Maximum Rectangles",
      "url": "https://youtu.be/tOylVCugy9k",
      "duration": "12 min",
      "order": 239
    },
    {
      "title": "Stock span problem",
      "url": "https://youtu.be/eay-zoSRkVc?si=deNNe5i38BOAntha",
      "duration": "19 min",
      "order": 240
    },
    {
      "title": "Celebrity Problem",
      "url": "https://youtu.be/cEadsbTeze4?si=olXYfOs7l-SEn2zl",
      "duration": "16 min",
      "order": 241
    },
    {
      "title": "LFU Cache",
      "url": "https://www.youtube.com/watch?v=0PSB9y8ehbk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=79",
      "duration": "",
      "order": 243
    }
  ],
  "Binary Trees": [
    {
      "title": "Inorder Traversal",
      "url": "https://youtu.be/lxTGsVXjwvM",
      "duration": "37 min",
      "order": 244
    },
    {
      "title": "Preorder Traversal",
      "url": "https://youtu.be/RlUu72JrOCQ",
      "duration": "18 min",
      "order": 245
    },
    {
      "title": "Postorder Traversal",
      "url": "https://youtu.be/2YBhNLodD8Q",
      "duration": "14 min",
      "order": 246
    },
    {
      "title": "Level Order Traversal",
      "url": "https://youtu.be/EoAsWbO7sqg",
      "duration": "8 min",
      "order": 247
    },
    {
      "title": "Pre, Post, Inorder in one traversal",
      "url": "https://youtu.be/ySp2epYvgTE",
      "duration": "10 min",
      "order": 248
    },
    {
      "title": "Maximum Depth in BT",
      "url": "https://youtu.be/eD3tmO66aBA",
      "duration": "7 min",
      "order": 249
    },
    {
      "title": "Check if two trees are identical or not",
      "url": "https://youtu.be/BhuvF_-PWS0",
      "duration": "4 min",
      "order": 250
    },
    {
      "title": "Check for balanced binary tree",
      "url": "https://youtu.be/Yt50Jfbd8Po",
      "duration": "12 min",
      "order": 251
    },
    {
      "title": "Diameter of Binary Tree",
      "url": "https://youtu.be/Rezetez59Nk",
      "duration": "13 min",
      "order": 252
    },
    {
      "title": "Maximum path sum",
      "url": "https://youtu.be/WszrfSwMz58",
      "duration": "17 min",
      "order": 253
    },
    {
      "title": "Check for symmetrical BTs",
      "url": "https://www.youtube.com/watch?v=nKggNAiEpBE",
      "duration": "8 min",
      "order": 254
    },
    {
      "title": "Children Sum Property in Binary Tree",
      "url": "https://youtu.be/fnmisPM6cVo",
      "duration": "",
      "order": 255
    },
    {
      "title": "Zig Zag or Spiral Traversal",
      "url": "https://youtu.be/3OXWEdlIGl4",
      "duration": "8 min",
      "order": 256
    },
    {
      "title": "Boundary Traversal",
      "url": "https://youtu.be/0ca1nvR0be4",
      "duration": "9 min",
      "order": 257
    },
    {
      "title": "Vertical Order Traversal",
      "url": "https://youtu.be/q_a6lpbKJdw",
      "duration": "18 min",
      "order": 258
    },
    {
      "title": "Top View of BT",
      "url": "https://youtu.be/Et9OCDNvJ78",
      "duration": "9 min",
      "order": 259
    },
    {
      "title": "Bottom view of BT",
      "url": "https://youtu.be/0FtVY6I4pB8",
      "duration": "12 min",
      "order": 260
    },
    {
      "title": "Right/Left View of BT",
      "url": "https://youtu.be/KV4mRzTjlAk",
      "duration": "12 min",
      "order": 261
    },
    {
      "title": "Print root to leaf path in BT",
      "url": "https://youtu.be/fmflMqVOC7k",
      "duration": "10 min",
      "order": 262
    },
    {
      "title": "LCA in BT",
      "url": "https://youtu.be/_-QHfMDde90",
      "duration": "13 min",
      "order": 263
    },
    {
      "title": "Maximum Width of BT",
      "url": "https://youtu.be/ZbybYvcVLks",
      "duration": "21 min",
      "order": 264
    },
    {
      "title": "Print all nodes at a distance of K in BT",
      "url": "https://youtu.be/i9ORlEy6EsI",
      "duration": "16 min",
      "order": 265
    },
    {
      "title": "Minimum time taken to burn the BT from a given Node",
      "url": "https://youtu.be/2r5wLmQfD6g",
      "duration": "17 min",
      "order": 266
    },
    {
      "title": "Count total nodes in a complete BT",
      "url": "https://youtu.be/u-yWemKGWO0",
      "duration": "15 min",
      "order": 267
    },
    {
      "title": "Flatten Binary Tree to Linked List",
      "url": "https://youtu.be/sWf7k1x9XR4",
      "duration": "",
      "order": 268
    },
    {
      "title": "Requirements needed to construct a unique BT",
      "url": "https://youtu.be/9GMECGQgWrQ",
      "duration": "7 min",
      "order": 269
    },
    {
      "title": "Construct a BT from Preorder and Inorder",
      "url": "https://youtu.be/aZNaLrVebKQ",
      "duration": "18 min",
      "order": 270
    },
    {
      "title": "Construct a BT from Postorder and Inorder",
      "url": "https://youtu.be/LgLRTaEMRVc",
      "duration": "19 min",
      "order": 271
    },
    {
      "title": "Serialize and De-serialize BT",
      "url": "https://youtu.be/-YbXySKJsX8",
      "duration": "16 min",
      "order": 272
    },
    {
      "title": "Morris Inorder Traversal",
      "url": "https://youtu.be/80Zug6D1_r4",
      "duration": "19 min",
      "order": 273
    }
  ],
  "Binary Search Trees": [
    {
      "title": "Search in BST",
      "url": "https://youtu.be/KcNt6v_56cc",
      "duration": "5 min",
      "order": 275
    },
    {
      "title": "Floor and Ceil in a BST",
      "url": "https://www.youtube.com/watch?v=xm_W1ub-K-w&list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk&index=43",
      "duration": "8 min",
      "order": 276
    },
    {
      "title": "Insert a given node in BST",
      "url": "https://youtu.be/FiFiNvM29ps",
      "duration": "7 min",
      "order": 277
    },
    {
      "title": "Delete a node in BST",
      "url": "https://youtu.be/kouxiP_H5WE",
      "duration": "15 min",
      "order": 278
    },
    {
      "title": "Kth Smallest and Largest element in BST",
      "url": "https://youtu.be/9TJYWh0adfk",
      "duration": "8 min",
      "order": 279
    },
    {
      "title": "Check if a tree is a BST or not",
      "url": "https://youtu.be/f-sj7I5oXEI",
      "duration": "9 min",
      "order": 280
    },
    {
      "title": "LCA in BST",
      "url": "https://youtu.be/cX_kPV_foZc",
      "duration": "8 min",
      "order": 281
    },
    {
      "title": "Construct a BST from a preorder traversal",
      "url": "https://youtu.be/UmJT3j26t1I",
      "duration": "16 min",
      "order": 282
    },
    {
      "title": "Inorder successor and predecessor in BST",
      "url": "https://youtu.be/SXKAD2svfmI",
      "duration": "10 min",
      "order": 283
    },
    {
      "title": "BST iterator",
      "url": "https://youtu.be/D2jMcmxU4bs",
      "duration": "14 min",
      "order": 284
    },
    {
      "title": "Two sum in BST",
      "url": "https://youtu.be/ssL3sHwPeb4",
      "duration": "14 min",
      "order": 285
    },
    {
      "title": "Correct BST with two nodes swapped",
      "url": "https://youtu.be/ZWGW7FminDM",
      "duration": "16 min",
      "order": 286
    },
    {
      "title": "Largest BST in Binary Tree",
      "url": "https://youtu.be/X0oXMdtUDwo",
      "duration": "17 min",
      "order": 287
    }
  ],
  "Graphs": [
    {
      "title": "Traversal Techniques",
      "url": "https://youtu.be/Qzf1a--rhp8",
      "duration": "39 min",
      "order": 297
    },
    {
      "title": "Number of provinces",
      "url": "https://youtu.be/ACzkVtewUYA",
      "duration": "15 min",
      "order": 299
    },
    {
      "title": "Number of islands",
      "url": "https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=8",
      "duration": "24 min",
      "order": 300
    },
    {
      "title": "Number of enclaves",
      "url": "https://youtu.be/rxKcepXQgU4",
      "duration": "15 min",
      "order": 302
    },
    {
      "title": "Rotten Oranges",
      "url": "https://www.youtube.com/watch?v=yf3oUhkvqA0",
      "duration": "22 min",
      "order": 303
    },
    {
      "title": "Distance of nearest cell having one",
      "url": "https://youtu.be/edXdVwkYHF8",
      "duration": "20 min",
      "order": 304
    },
    {
      "title": "Surrounded Regions",
      "url": "https://youtu.be/BtdgAys4yMk",
      "duration": "23 min",
      "order": 305
    },
    {
      "title": "Detect a cycle in an undirected graph",
      "url": "https://youtu.be/zQ3zgFypzX4",
      "duration": "38 min",
      "order": 307
    },
    {
      "title": "Bipartite graph",
      "url": "https://youtu.be/KG5YFfR0j8A",
      "duration": "32 min",
      "order": 308
    },
    {
      "title": "Topological sort or Kahn's algorithm",
      "url": "https://youtu.be/5lZ0iJMrUMk",
      "duration": "26 min",
      "order": 309
    },
    {
      "title": "Detect a cycle in a directed graph",
      "url": "https://www.youtube.com/watch?v=uzVUw90ZFIg&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=12",
      "duration": "23 min",
      "order": 310
    },
    {
      "title": "Find eventual safe states",
      "url": "https://youtu.be/2gtg3VsDGyc",
      "duration": "39 min",
      "order": 311
    },
    {
      "title": "Course Schedule I",
      "url": "https://youtu.be/WAOfKpxYHR8",
      "duration": "11 min",
      "order": 312
    },
    {
      "title": "Alien Dictionary",
      "url": "https://youtu.be/U3N_je7tWAs",
      "duration": "20 min",
      "order": 314
    },
    {
      "title": "Shortest path in DAG",
      "url": "https://www.youtube.com/watch?v=ZUFQfFaU-8U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=27",
      "duration": "26 min",
      "order": 315
    },
    {
      "title": "Shortest path in undirected graph with unit weights",
      "url": "https://www.youtube.com/watch?v=C4gxoTaI71U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=28",
      "duration": "16 min",
      "order": 316
    },
    {
      "title": "Word ladder I",
      "url": "https://youtu.be/tRPda0rcf8E",
      "duration": "28 min",
      "order": 317
    },
    {
      "title": "Word ladder II",
      "url": "https://youtu.be/AD4SFl7tu7I?si=EpcJQTWm2YeURvEG",
      "duration": "48 min",
      "order": 318
    },
    {
      "title": "Dijkstra's algorithm",
      "url": "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
      "duration": "47 min",
      "order": 319
    },
    {
      "title": "Shortest Distance in a Binary Maze",
      "url": "https://www.youtube.com/watch?v=U5Mw4eyUmw4&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=36",
      "duration": "21 min",
      "order": 321
    },
    {
      "title": "Path with minimum effort",
      "url": "https://youtu.be/0ytpZyiZFhA",
      "duration": "24 min",
      "order": 322
    },
    {
      "title": "Cheapest flight within K stops",
      "url": "https://youtu.be/9XybHVqTHcQ",
      "duration": "23 min",
      "order": 323
    },
    {
      "title": "Minimum multiplications to reach end",
      "url": "https://www.youtube.com/watch?v=_BvEJ3VIDWw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=39",
      "duration": "19 min",
      "order": 324
    },
    {
      "title": "Number of ways to arrive at destination",
      "url": "https://youtu.be/_-0mx0SmYxA",
      "duration": "23 min",
      "order": 325
    },
    {
      "title": "Bellman ford algorithm",
      "url": "https://youtu.be/0vVofAhAYjc",
      "duration": "27 min",
      "order": 326
    },
    {
      "title": "Floyd warshall algorithm",
      "url": "https://www.youtube.com/watch?v=YbY8cVwWAvw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=42",
      "duration": "30 min",
      "order": 327
    },
    {
      "title": "Disjoint Set",
      "url": "https://youtu.be/aBxjDBC4M1U",
      "duration": "41 min",
      "order": 329
    },
    {
      "title": "Find the MST weight",
      "url": "https://youtu.be/mJcZjjKzeqk",
      "duration": "31 min",
      "order": 330
    },
    {
      "title": "Number of operations to make network connected",
      "url": "https://youtu.be/FYrl7iz9_ZU",
      "duration": "14 min",
      "order": 331
    },
    {
      "title": "Accounts merge",
      "url": "https://youtu.be/FMwpt_aQOGw",
      "duration": "21 min",
      "order": 332
    },
    {
      "title": "Number of islands II",
      "url": "https://youtu.be/Rn6B-Q4SNyA",
      "duration": "25 min",
      "order": 333
    },
    {
      "title": "Making a large island",
      "url": "https://youtu.be/lgiz0Oup6gM",
      "duration": "26 min",
      "order": 334
    },
    {
      "title": "Most stones removed with same row or column",
      "url": "https://youtu.be/OwMNX8SPavM",
      "duration": "23 min",
      "order": 335
    },
    {
      "title": "Kosaraju's algorithm",
      "url": "https://www.youtube.com/watch?v=V8qIqJxCioo&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=27",
      "duration": "22 min",
      "order": 336
    },
    {
      "title": "Bridges in graph",
      "url": "https://youtu.be/qrAub5z8FeA",
      "duration": "23 min",
      "order": 337
    },
    {
      "title": "Articulation point in graph",
      "url": "https://youtu.be/j1QDfU21iZk",
      "duration": "21 min",
      "order": 338
    }
  ],
  "Dynamic Programming": [
    {
      "title": "Climbing stairs",
      "url": "https://youtu.be/mLfjzJsN8us",
      "duration": "13 min",
      "order": 339
    },
    {
      "title": "Frog Jump",
      "url": "https://www.youtube.com/watch?v=EgG3jsGoPvQ",
      "duration": "37 min",
      "order": 340
    },
    {
      "title": "Frog jump with K distances",
      "url": "https://www.youtube.com/watch?v=Kmh3rhyEtB8",
      "duration": "16 min",
      "order": 341
    },
    {
      "title": "Maximum sum of non adjacent elements",
      "url": "https://www.youtube.com/watch?v=GrMBfJNk_NY",
      "duration": "31 min",
      "order": 342
    },
    {
      "title": "House robber",
      "url": "https://www.youtube.com/watch?v=3WaxQMELSkw",
      "duration": "9 min",
      "order": 343
    },
    {
      "title": "Ninja's training",
      "url": "https://www.youtube.com/watch?v=AE39gJYuRog",
      "duration": "51 min",
      "order": 344
    },
    {
      "title": "Grid unique paths",
      "url": "https://www.youtube.com/watch?v=sdE0A2Oxofw",
      "duration": "44 min",
      "order": 345
    },
    {
      "title": "Unique paths II",
      "url": "https://www.youtube.com/watch?v=TmhpgXScLyY",
      "duration": "12 min",
      "order": 346
    },
    {
      "title": "Minimum Falling Path Sum",
      "url": "https://youtu.be/_rgTlyky1uQ",
      "duration": "41 min",
      "order": 347
    },
    {
      "title": "Triangle",
      "url": "https://www.youtube.com/watch?v=SrP-PiLSYC0",
      "duration": "33 min",
      "order": 348
    },
    {
      "title": "Best time to buy and sell stock",
      "url": "https://youtu.be/excAOvwF_Wk",
      "duration": "7 min",
      "order": 350
    },
    {
      "title": "Best time to buy and sell stock II",
      "url": "https://youtu.be/nGJmxkUJQGs",
      "duration": "35 min",
      "order": 351
    },
    {
      "title": "Best time to buy and sell stock III",
      "url": "https://youtu.be/-uQGzhYj8BQ",
      "duration": "25 min",
      "order": 352
    },
    {
      "title": "Best time to buy and sell stock IV",
      "url": "https://youtu.be/IV1dHbk5CDc",
      "duration": "12 min",
      "order": 353
    },
    {
      "title": "Best time to buy and sell stock with transaction fees",
      "url": "https://youtu.be/k4eK-vEmnKg",
      "duration": "6 min",
      "order": 354
    },
    {
      "title": "Subset sum equals to target",
      "url": "https://www.youtube.com/watch?v=rYkfBRtMJr8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=52",
      "duration": "35 min",
      "order": 355
    },
    {
      "title": "Partition equal subset sum",
      "url": "https://www.youtube.com/watch?v=7win3dcgo3k",
      "duration": "7 min",
      "order": 356
    },
    {
      "title": "Partition a set into two subsets with minimum absolute sum difference",
      "url": "https://www.youtube.com/watch?v=GS_OqZb2CWc",
      "duration": "29 min",
      "order": 357
    },
    {
      "title": "Count subsets with sum K",
      "url": "https://www.youtube.com/watch?v=ZHyb-A2Mte4",
      "duration": "35 min",
      "order": 358
    },
    {
      "title": "Count partitions with given difference",
      "url": "https://www.youtube.com/watch?v=zoilQD1kYSg",
      "duration": "17 min",
      "order": 359
    },
    {
      "title": "0 and 1 Knapsack",
      "url": "https://youtu.be/GqOmJHQZivw",
      "duration": "40 min",
      "order": 360
    },
    {
      "title": "Minimum coins",
      "url": "https://www.youtube.com/watch?v=myPeWb3Y68A",
      "duration": "34 min",
      "order": 361
    },
    {
      "title": "Target sum",
      "url": "https://www.youtube.com/watch?v=b3GD8263-PQ",
      "duration": "8 min",
      "order": 362
    },
    {
      "title": "Coin change II",
      "url": "https://www.youtube.com/watch?v=HgyouUi11zk",
      "duration": "22 min",
      "order": 363
    },
    {
      "title": "Unbounded knapsack",
      "url": "https://youtu.be/OgvOZ6OrJoY",
      "duration": "22 min",
      "order": 364
    },
    {
      "title": "Rod cutting problem",
      "url": "https://youtu.be/mO8XpGoJwuo",
      "duration": "22 min",
      "order": 365
    },
    {
      "title": "Longest Increasing Subsequence",
      "url": "https://youtu.be/on2hvxBXJH4",
      "duration": "40 min",
      "order": 366
    },
    {
      "title": "Print Longest Increasing Subsequence",
      "url": "https://youtu.be/IFfYfonAFGc",
      "duration": "26 min",
      "order": 367
    },
    {
      "title": "Largest Divisible Subset",
      "url": "https://youtu.be/gDuZwBW9VvM",
      "duration": "14 min",
      "order": 368
    },
    {
      "title": "Longest String Chain",
      "url": "https://youtu.be/YY8iBaYcc4g",
      "duration": "16 min",
      "order": 369
    },
    {
      "title": "Longest Bitonic Subsequence",
      "url": "https://youtu.be/y4vN0WNdrlg",
      "duration": "13 min",
      "order": 370
    },
    {
      "title": "Number of Longest Increasing Subsequences",
      "url": "https://youtu.be/cKVl1TFdNXg",
      "duration": "20 min",
      "order": 371
    },
    {
      "title": "Longest common subsequence",
      "url": "https://youtu.be/-zI4mrF2Pb4",
      "duration": "46 min",
      "order": 372
    },
    {
      "title": "Longest common substring",
      "url": "https://youtu.be/_wP9mWNPL5w",
      "duration": "14 min",
      "order": 373
    },
    {
      "title": "Longest palindromic subsequence",
      "url": "https://youtu.be/6i_T5kkfv4A",
      "duration": "9 min",
      "order": 374
    },
    {
      "title": "Minimum insertions to make string palindrome",
      "url": "https://www.youtube.com/watch?v=xPBLEj41rFU",
      "duration": "12 min",
      "order": 375
    },
    {
      "title": "Minimum insertions or deletions to convert string A to B",
      "url": "https://www.youtube.com/watch?v=yMnH0jrir0Q",
      "duration": "7 min",
      "order": 376
    },
    {
      "title": "Shortest common supersequence",
      "url": "https://youtu.be/xElxAuBcvsU",
      "duration": "26 min",
      "order": 377
    },
    {
      "title": "Distinct subsequences",
      "url": "https://youtu.be/nVG7eTiD2bY",
      "duration": "40 min",
      "order": 378
    },
    {
      "title": "Edit distance",
      "url": "https://youtu.be/fJaKO8FbDdo",
      "duration": "37 min",
      "order": 379
    },
    {
      "title": "Wildcard matching",
      "url": "https://youtu.be/ZmlQ3vgAOMo",
      "duration": "43 min",
      "order": 380
    },
    {
      "title": "Matrix chain multiplication",
      "url": "https://youtu.be/vRVfmbCFW7Y",
      "duration": "61 min",
      "order": 381
    },
    {
      "title": "Burst balloons",
      "url": "https://youtu.be/Yz4LlDSlkns",
      "duration": "33 min",
      "order": 382
    },
    {
      "title": "Palindrome partitioning II",
      "url": "https://youtu.be/_H8V5hJUGd0",
      "duration": "22 min",
      "order": 383
    },
    {
      "title": "Partition Array for Maximum Sum",
      "url": "https://youtu.be/PhWWJmaKfMc",
      "duration": "",
      "order": 384
    },
    {
      "title": "Different Ways to Evaluate a Boolean Expression",
      "url": "https://youtu.be/MM7fXopgyjw",
      "duration": "",
      "order": 385
    }
  ],
  "Tries": [
    {
      "title": "Trie Implementation and Operations",
      "url": "https://www.youtube.com/watch?v=dBGUmUQhjaM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp",
      "duration": "30 min",
      "order": 386
    },
    {
      "title": "Longest Word with All Prefixes",
      "url": "https://www.youtube.com/watch?v=AWnBa91lThI&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=3",
      "duration": "25 min",
      "order": 388
    },
    {
      "title": "Number of distinct substrings in a string",
      "url": "https://www.youtube.com/watch?v=RV0QeTyHZxo&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=4",
      "duration": "17 min",
      "order": 389
    },
    {
      "title": "Maximum XOR of two numbers in an array",
      "url": "https://www.youtube.com/watch?v=EIhAwfHubE8&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=6",
      "duration": "34 min",
      "order": 390
    },
    {
      "title": "Maximum Xor with an element from an array",
      "url": "https://www.youtube.com/watch?v=Q8LhG9Pi5KM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=7",
      "duration": "23 min",
      "order": 391
    }
  ],
  "Maths": [
    {
      "title": "Prime factorisation of a Number",
      "url": "https://youtu.be/LT7XhVdeRyg?si=6HkjQokJRPTFai21",
      "duration": "15 min",
      "order": 401
    },
    {
      "title": "Count primes in range L to R",
      "url": "https://youtu.be/g5Fuxn_AvSk?si=fv6Q-Po7wrMW0a5n",
      "duration": "16 min",
      "order": 402
    }
  ]
} as const;

export const courseVideos: CourseVideo[] = Object.entries(rawVideos).flatMap(([topic, entries]) =>
  entries.map((entry) => ({ ...entry, id: entry.url, topic }))
).sort((a, b) => {
  if (a.topic === "Course Foundations") return b.topic === "Course Foundations" ? a.order - b.order : -1;
  if (b.topic === "Course Foundations") return 1;
  const topicOrder = roadmap.findIndex((item) => item.title === a.topic) - roadmap.findIndex((item) => item.title === b.topic);
  return topicOrder || a.order - b.order;
});

export const videoTopics = [
  { title: "Course Foundations", step: 0, videos: courseVideos.filter((video) => video.topic === "Course Foundations") },
  ...roadmap.map((topic) => ({
    title: topic.title,
    step: topic.step,
    videos: courseVideos.filter((video) => video.topic === topic.title),
  })),
];
