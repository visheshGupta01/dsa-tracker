import { useState } from "react";
import { ArrowRight, BookOpen, Check, CheckCircle2, Circle, Code2, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completedStatuses } from "@/lib/dsa";
import { courseVideos } from "@/data/course-videos";
import { roadmap, type DsaProblem, type JourneyData, type VideoStatus } from "@/data/roadmap";

type Props = {
  data: JourneyData;
  updateProblem: (id: string, patch: Partial<DsaProblem>) => void;
  onVideoStatus: (id: string, status: VideoStatus) => void;
  onTheoryStatus: (topic: string, reviewed: boolean) => void;
  onShowProblems: () => void;
};

function theoryFor(title: string) {
  const key = title.toLowerCase();
  if (key.includes("foundation")) return { goal: "Set up your C++ workflow and build the habits used throughout DSA.", ideas: ["Run small C++ programs confidently", "Understand loops, functions, containers, and the STL", "Estimate time and auxiliary space before optimizing"], checklist: ["Run a C++ program locally", "Explain Big-O for a simple loop", "Know when to use vector, string, map, set, and queue"] };
  if (key.includes("sort")) return { goal: "Choose a sorting strategy and explain its time and space trade-offs.", ideas: ["Selection, bubble, and insertion sort", "Merge sort and quicksort; stable vs. in-place sorting", "Best, average, and worst-case complexity"], checklist: ["Trace a sort by hand", "Compare O(n²) and O(n log n)", "Explain stability and auxiliary space"] };
  if (key.includes("array")) return { goal: "Recognize reusable array patterns instead of memorizing isolated solutions.", ideas: ["Traversal, in-place updates, and two pointers", "Prefix sums, subarrays, and frequency counting", "Greedy choices and running-state patterns"], checklist: ["State the brute-force approach first", "Identify whether sorting or hashing helps", "Test empty, singleton, duplicate, and boundary cases"] };
  if (key.includes("hash")) return { goal: "Use hashing to make lookup and frequency queries efficient.", ideas: ["Frequency arrays, maps, and sets", "Average-case lookup and collision intuition", "Prefix sums combined with hash maps"], checklist: ["Choose the right data structure", "Track counts or first-seen indices correctly", "Account for extra space"] };
  if (key.includes("binary search")) return { goal: "Use sorted structure and monotonic conditions to eliminate half the search space.", ideas: ["Search on sorted arrays", "Lower bound, upper bound, and boundary cases", "Binary search on a monotonic answer"], checklist: ["Define the search invariant", "Avoid off-by-one errors", "Prove the predicate is monotonic"] };
  if (key.includes("string")) return { goal: "Treat strings as sequences and recognize scanning and matching patterns.", ideas: ["Character frequency and two-pointer scans", "Palindromes, substrings, and transformations", "Pattern matching and efficient comparison"], checklist: ["Clarify case sensitivity and character set", "Check empty strings and repeated characters", "Avoid unnecessary substring copies"] };
  if (key.includes("recursion")) return { goal: "Break a problem into smaller calls with a clear base case.", ideas: ["Base case and recursive transition", "Call stack and recursion-tree intuition", "Backtracking: choose, explore, undo"], checklist: ["Write the base case first", "Define what one call accomplishes", "Trace a small input and stack depth"] };
  if (key.includes("bit")) return { goal: "Reason about binary representations and use bit operations when useful.", ideas: ["AND, OR, XOR, NOT, and shifts", "Set, clear, toggle, and test a bit", "Parity, powers of two, and bit masks"], checklist: ["Write a binary example", "Watch integer width and signed shifts", "Explain why XOR cancels equal values"] };
  if (key.includes("math")) return { goal: "Use number theory and arithmetic properties to reduce work.", ideas: ["Divisors, primes, and sieve techniques", "GCD/LCM and Euclidean algorithm", "Modular arithmetic and overflow awareness"], checklist: ["Handle edge inputs", "Use square-root bounds carefully", "Estimate complexity in terms of input magnitude"] };
  if (key.includes("linked")) return { goal: "Manipulate node references safely and preserve pointer invariants.", ideas: ["Traversal and insertion/deletion", "Slow-fast pointers and cycle detection", "Reversal and dummy-head techniques"], checklist: ["Draw nodes and arrows before coding", "Handle head changes and null pointers", "Check one-node and two-node lists"] };
  if (key.includes("stack") || key.includes("queue")) return { goal: "Use LIFO/FIFO structures to preserve exactly the state a problem needs.", ideas: ["Stack and queue operations", "Monotonic stacks and next-greater patterns", "Deque and sliding-window use cases"], checklist: ["Explain what each stored element represents", "Prove when an element can be removed", "Check empty-container operations"] };
  if (key.includes("tree")) return { goal: "Use traversal order, recursion, and subtree properties to reason about trees.", ideas: ["Preorder, inorder, postorder, and level order", "Height, depth, and subtree properties", "BST ordering and ancestor patterns"], checklist: ["Trace recursive calls on a small tree", "State the base case for a null node", "Distinguish depth from height"] };
  if (key.includes("heap")) return { goal: "Maintain the best candidate efficiently when items arrive or priorities change.", ideas: ["Min-heaps and max-heaps", "Top-K and k-way merge patterns", "Heap operations and logarithmic costs"], checklist: ["Choose min-heap or max-heap intentionally", "Explain the heap invariant", "Compare heap and sorting solutions"] };
  if (key.includes("greedy")) return { goal: "Make local choices only when you can justify their global correctness.", ideas: ["Sorting by a useful criterion", "Exchange arguments and invariants", "Intervals, scheduling, and resource allocation"], checklist: ["State the greedy choice explicitly", "Try to construct a counterexample", "Explain why the choice preserves an optimum"] };
  if (key.includes("graph")) return { goal: "Model relationships as vertices and edges, then choose a suitable traversal or path algorithm.", ideas: ["Adjacency lists and directed/undirected graphs", "BFS, DFS, components, and cycle detection", "Topological sort, shortest paths, and disjoint sets"], checklist: ["Confirm direction and edge weights", "Track visited state correctly", "State complexity in V and E"] };
  if (key.includes("dynamic") || key.includes("dp")) return { goal: "Solve overlapping subproblems by defining state, transitions, and base cases.", ideas: ["Identify state and recurrence", "Memoization vs. tabulation", "Space optimization and iteration order"], checklist: ["Define the state in one sentence", "Write base cases and transitions", "Check dependencies between states"] };
  if (key.includes("trie")) return { goal: "Represent shared string prefixes for efficient lookup.", ideas: ["Trie nodes and child links", "Insert, search, and prefix queries", "Space trade-offs and bitwise tries"], checklist: ["Define terminal-word markers", "Trace a shared prefix", "Estimate memory by total characters"] };
  return { goal: "Understand the core pattern, then apply it to progressively harder problems.", ideas: ["Recognize input structure and constraints", "Start with a correct brute-force approach", "Improve time or space using a reusable pattern"], checklist: ["Explain the approach without code", "State time and space complexity", "Test edge cases before marking a problem solved"] };
}

export function LearningPage({ data, updateProblem, onVideoStatus, onTheoryStatus, onShowProblems }: Props) {
  const topics = [{ title: "Course Foundations", step: 0, problems: [] as DsaProblem[] }, ...roadmap.map((topic) => ({ title: topic.title, step: topic.step, problems: data.problems.filter((problem) => !problem.isPersonal && problem.topic === topic.title) }))];
  const [selectedTitle, setSelectedTitle] = useState(() => {
    const next = topics.find((topic) => !data.topicTheoryStatuses?.[topic.title] || topic.problems.some((problem) => !completedStatuses.has(problem.status)) || courseVideos.some((video) => video.topic === topic.title && data.videoStatuses?.[video.id] !== "Watched"));
    return next?.title ?? "Course Foundations";
  });
  const topic = topics.find((item) => item.title === selectedTitle) ?? topics[0];
  const theory = theoryFor(topic.title);
  const videos = courseVideos.filter((video) => video.topic === topic.title);
  const problems = topic.problems;
  const theoryDone = data.topicTheoryStatuses?.[topic.title] === true;
  const nextVideo = videos.find((video) => data.videoStatuses?.[video.id] !== "Watched");
  const nextProblem = problems.find((problem) => !completedStatuses.has(problem.status));
  const doneProblems = problems.filter((problem) => completedStatuses.has(problem.status)).length;
  const nextStep = !theoryDone ? "theory" : nextVideo ? "video" : nextProblem ? "problem" : "complete";
  const stepLabel = nextStep === "theory" ? "Read the concept notes" : nextStep === "video" ? "Watch: " + nextVideo?.title : nextStep === "problem" ? "Solve: " + nextProblem?.title : "Topic complete";
  const statusFor = (id: string) => data.videoStatuses?.[id] ?? "Not Watched";
  const complete = theoryDone && videos.every((video) => statusFor(video.id) === "Watched") && doneProblems === problems.length;
  return <div className="space-y-5">
    <section className="surface-panel p-5 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div><span className="eyebrow"><i /> YOUR GUIDED PATH</span><h2 className="mt-2 text-xl font-semibold">One topic. One clear next step.</h2><p className="mt-1 max-w-2xl text-sm text-muted-foreground">Read the key ideas, watch the matching lesson when available, then solve problems in sheet order. Your progress is saved in this browser.</p></div>
        <label className="flex min-w-56 flex-col gap-1.5 text-xs font-medium text-muted-foreground">Choose a module<select className="form-select" value={selectedTitle} onChange={(event) => setSelectedTitle(event.target.value)}>{topics.map((item) => <option key={item.title} value={item.title}>{item.step ? String(item.step).padStart(2, "0") + " · " : ""}{item.title}</option>)}</select></label>
      </div>
      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended next action</span><p className="mt-1 font-semibold">{stepLabel}</p><p className="mt-1 text-sm text-muted-foreground">{nextStep === "theory" ? "Start with the concept notes below. Mark them reviewed when you can explain the ideas in your own words." : nextStep === "video" ? "Watch this lesson, then mark it watched. If you already know the concept, you can mark it watched and continue." : nextStep === "problem" ? "Attempt the problem before opening an editorial. Mark it solved only when you can explain your approach." : "Theory, lessons, and problems in this module are marked complete."}</p></div><span className="status-pill">{complete ? "Complete" : doneProblems + "/" + problems.length + " problems"}</span></div>
        <div className="mt-3 flex flex-wrap gap-2">
          {nextStep === "theory" && <Button onClick={() => onTheoryStatus(topic.title, true)}><CheckCircle2 size={15} /> Mark theory reviewed</Button>}
          {nextStep === "video" && nextVideo && <><Button asChild><a href={nextVideo.url} target="_blank" rel="noreferrer"><PlayCircle size={15} /> Watch lesson <ExternalLink size={13} /></a></Button><Button variant="outline" onClick={() => onVideoStatus(nextVideo.id, "Watched")}>Mark watched</Button></>}
          {nextStep === "problem" && nextProblem && <Button asChild><a href={nextProblem.problemUrl || "https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet"} target="_blank" rel="noreferrer"><Code2 size={15} /> Open next problem <ExternalLink size={13} /></a></Button>}
          {nextStep === "complete" && <Button variant="outline" onClick={() => { const next = topics.find((item) => item.step > topic.step && (!data.topicTheoryStatuses?.[item.title] || item.problems.some((problem) => !completedStatuses.has(problem.status)) || courseVideos.some((video) => video.topic === item.title && data.videoStatuses?.[video.id] !== "Watched"))); if (next) setSelectedTitle(next.title); }}>Next module <ArrowRight size={14} /></Button>}
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-border p-3"><span className="text-xs text-muted-foreground">Theory</span><p className="mt-1 font-medium">{theoryDone ? "Reviewed" : "Not reviewed"}</p></div>
        <div className="rounded-lg border border-border p-3"><span className="text-xs text-muted-foreground">Lessons</span><p className="mt-1 font-medium">{videos.filter((video) => statusFor(video.id) === "Watched").length}/{videos.length} watched</p></div>
        <div className="rounded-lg border border-border p-3"><span className="text-xs text-muted-foreground">Practice</span><p className="mt-1 font-medium">{doneProblems}/{problems.length} complete</p></div>
      </div>
    </section>
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="surface-panel p-5">
        <div className="flex items-center gap-2"><BookOpen size={18} /><h3 className="font-semibold">1. Understand the concept</h3></div><p className="mt-2 text-sm text-muted-foreground">{theory.goal}</p>
        <div className="mt-4"><h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key ideas</h4><ul className="mt-2 space-y-2">{theory.ideas.map((item) => <li className="flex gap-2 text-sm" key={item}><Check size={15} className="mt-0.5 shrink-0 text-primary" />{item}</li>)}</ul></div>
        <div className="mt-4"><h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before moving on</h4><ul className="mt-2 space-y-2">{theory.checklist.map((item) => <li className="flex gap-2 text-sm" key={item}><Circle size={13} className="mt-1 shrink-0 text-muted-foreground" />{item}</li>)}</ul></div>
        <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm"><b>Complexity check:</b> State the expected time and extra space before coding. Prefer the simplest correct solution first.</div>
        <div className="mt-4 flex flex-wrap gap-2"><Button variant={theoryDone ? "outline" : "default"} onClick={() => onTheoryStatus(topic.title, !theoryDone)}>{theoryDone ? <><Check size={15} /> Theory reviewed</> : <><BookOpen size={15} /> Mark theory reviewed</>}</Button>{theoryDone && <Button variant="ghost" size="sm" onClick={() => onTheoryStatus(topic.title, false)}>Review again</Button>}</div>
      </section>
      <section className="surface-panel p-5">
        <div className="flex items-center gap-2"><PlayCircle size={18} /><h3 className="font-semibold">2. Watch the matching lesson</h3></div><p className="mt-2 text-sm text-muted-foreground">Lessons are matched by module. You do not need to search a separate playlist.</p>
        {videos.length ? <div className="mt-4 space-y-3">{videos.slice(0, 8).map((video) => <article key={video.id} className="rounded-lg border border-border p-3"><div className="flex items-start gap-3"><PlayCircle size={16} className="mt-1 shrink-0 text-primary" /><div className="min-w-0 flex-1"><b className="text-sm">{video.title}</b><p className="mt-1 text-xs text-muted-foreground">{video.duration || "Duration unavailable"}</p></div><span className="text-xs text-muted-foreground">{statusFor(video.id)}</span></div><div className="mt-3 flex flex-wrap gap-2"><Button asChild size="sm" variant="outline"><a href={video.url} target="_blank" rel="noreferrer">Watch <ExternalLink size={12} /></a></Button><Button size="sm" variant={statusFor(video.id) === "Watched" ? "secondary" : "default"} onClick={() => onVideoStatus(video.id, statusFor(video.id) === "Watched" ? "Revisit" : "Watched")}>{statusFor(video.id) === "Watched" ? "Mark revisit" : "Mark watched"}</Button></div></article>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">No individual lesson is mapped to this module. Continue with theory and practice; you do not need to search for a video.</div>}
        {videos.length > 8 && <p className="mt-3 text-xs text-muted-foreground">Showing the first 8 lessons here. Open Videos for the complete list.</p>}
      </section>
    </div>
    <section className="surface-panel p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2"><Code2 size={18} /><h3 className="font-semibold">3. Practice in order</h3></div><p className="mt-1 text-sm text-muted-foreground">Problems stay in sheet order. Try first, then use an editorial only when needed.</p></div><Button variant="outline" size="sm" onClick={onShowProblems}>Open full problem list <ArrowRight size={14} /></Button></div>
      {problems.length ? <div className="mt-4 divide-y divide-border rounded-lg border border-border">{problems.slice(0, 12).map((problem, index) => <div key={problem.id} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center"><span className="w-7 shrink-0 text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0 flex-1"><a className="text-sm font-medium hover:underline" href={problem.problemUrl || undefined} target={problem.problemUrl ? "_blank" : undefined} rel="noreferrer">{problem.title}</a><p className="mt-1 text-xs text-muted-foreground">{problem.difficulty} · {problem.status}</p></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => updateProblem(problem.id, { status: completedStatuses.has(problem.status) ? "Not Started" : "Solved", solvedAt: completedStatuses.has(problem.status) ? "" : new Date().toISOString().slice(0, 10) })}>{completedStatuses.has(problem.status) ? "Reopen" : "Mark solved"}</Button>{problem.solutionUrl && <Button asChild size="sm" variant="ghost"><a href={problem.solutionUrl} target="_blank" rel="noreferrer">Editorial <ExternalLink size={12} /></a></Button>}</div></div>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">Course foundations has no A2Z practice problems assigned. Finish the foundation lessons, then move to Beginner Problems.</div>}
      {problems.length > 12 && <p className="mt-3 text-xs text-muted-foreground">Showing the first 12 in order. Use Problems for the complete {problems.length}-problem module.</p>}
    </section>
  </div>;
}
