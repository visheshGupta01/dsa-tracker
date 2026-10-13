import { roadmap, type Confidence, type DailyTask, type DsaProblem, type JourneyData, type ProblemStatus, type StudySession } from "@/data/roadmap";

const STORAGE_KEY = "dsa-journey:v1";
const BACKUP_VERSION = 1;
const statusMap: Record<string, ProblemStatus> = {
  Revise: "Needs Revision",
  Mastered: "Solved",
  Learning: "Not Started",
  "Not Started": "Not Started",
  Solved: "Solved",
  "Needs Revision": "Needs Revision",
};

export function normaliseJourney(data: JourneyData): JourneyData {
  return {
    ...data,
    problems: data.problems.map((problem) => ({ ...problem, status: statusMap[problem.status] ?? "Not Started" })),
    sessions: Array.isArray(data.sessions) ? data.sessions : [],
    dailyTasks: data.dailyTasks ?? {},
    dailyMinutes: data.dailyMinutes ?? {},
  };
}

export function exportJourney(data: JourneyData): string {
  return JSON.stringify({ app: "DSA Journey", version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data }, null, 2);
}

export function importJourney(json: string): JourneyData {
  const parsed: unknown = JSON.parse(json);
  if (!parsed || typeof parsed !== "object") throw new Error("This file is not a valid DSA Journey backup.");
  const envelope = parsed as { data?: unknown };
  const candidate = envelope.data && typeof envelope.data === "object" ? envelope.data : parsed;
  const journey = candidate as Partial<JourneyData>;
  if (!Array.isArray(journey.problems) || !Array.isArray(journey.sessions)) throw new Error("Backup must contain problem and study-session arrays.");
  return reconcileJourney(normaliseJourney({
    problems: journey.problems as DsaProblem[],
    sessions: journey.sessions as StudySession[],
    dailyTasks: journey.dailyTasks ?? {},
    dailyMinutes: journey.dailyMinutes ?? {},
  }));
}

const revisionDays: Record<Confidence, number> = { easy: 7, "needed-thinking": 4, "needed-hint": 2, "could-not-solve": 1 };

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function addDays(dateString: string, amount: number): string {
  const [year = 2000, month = 1, day = 1] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + amount);
  return localDate(date);
}

export function revisionDate(date: string, confidence: Confidence): string {
  return addDays(date, revisionDays[confidence]);
}

export function createProblem(input: Partial<DsaProblem> & Pick<DsaProblem, "title" | "topic" | "difficulty">): DsaProblem {
  return {
    id: input.id ?? `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title: input.title, topic: input.topic, subtopic: input.subtopic, difficulty: input.difficulty, status: input.status ?? "Not Started",
    problemUrl: input.problemUrl ?? "", solutionUrl: input.solutionUrl ?? "", attempts: input.attempts ?? 0,
    solvedWithoutHelp: input.solvedWithoutHelp ?? false, approach: input.approach ?? "",
    timeComplexity: input.timeComplexity ?? "", spaceComplexity: input.spaceComplexity ?? "", notes: input.notes ?? "",
    solvedAt: input.solvedAt ?? "", lastRevisedAt: input.lastRevisedAt ?? "", nextRevisionAt: input.nextRevisionAt ?? "",
    confidence: input.confidence ?? "needed-thinking", platform: input.platform, tier: input.tier,
    videoUrl: input.videoUrl, alternateUrls: input.alternateUrls,
    isPersonal: input.isPersonal ?? (input.id ? input.id.startsWith("custom-") : true),
  };
}

const findSheetProblemId = (moduleTitle: string, title: string) => {
  const module = roadmap.find((topic) => topic.title === moduleTitle);
  return module?.problems.find((problem) => problem.title === title)?.id;
};

const defaultTasks = (): DailyTask[] => [
  { id: "learn-complexity", title: "Review time and space complexity", type: "Learn", completed: false },
  { id: "practice-pattern-1", title: "Pattern 1", type: "Practice", problemId: findSheetProblemId("Beginner Problems", "Pattern 1"), completed: false },
  { id: "practice-pattern-2", title: "Pattern 2", type: "Practice", problemId: findSheetProblemId("Beginner Problems", "Pattern 2"), completed: false },
];

function sheetProblems(): DsaProblem[] {
  return roadmap.flatMap((topic) => topic.problems.map((entry) => createProblem({
    id: entry.id,
    title: entry.title,
    topic: topic.title,
    subtopic: entry.topic,
    difficulty: entry.difficulty,
    status: "Not Started",
    problemUrl: entry.url,
    solutionUrl: entry.articleUrl || entry.videoUrl,
    platform: entry.platform,
    tier: entry.tier,
    videoUrl: entry.videoUrl,
    alternateUrls: entry.altUrls,
  })));
}

export function createStarterData(now = new Date()): JourneyData {
  const today = localDate(now);
  return {
    problems: sheetProblems(),
    sessions: [],
    dailyTasks: { [today]: defaultTasks() },
    dailyMinutes: { [today]: { learning: 0, practice: 0, revision: 0 } },
  };
}

const normaliseTitle = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const normaliseModule = (value: string) => {
  const aliases: Record<string, string> = {
    "learn the basics": "beginner problems",
    "linked lists": "linked list",
    "stack queue": "stack queues",
    "sliding window two pointer": "sliding window 2 pointer",
  };
  const key = normaliseTitle(value);
  return aliases[key] ?? key;
};

const legacySeedStatus: Record<string, ProblemStatus> = {
  "basics-user-input-output": "Solved",
  "basics-data-types-if-else": "Solved",
  "basics-for-loops-functions": "Solved",
  "sorting-selection-sort": "Solved",
  "sorting-bubble-sort": "Solved",
  "sorting-merge-sort": "Solved",
  "arrays-two-sum": "Solved",
  "arrays-kadane-s-algorithm": "Not Started",
  "arrays-sort-colors": "Needs Revision",
  "binary-search-binary-search": "Solved",
};
const legacySeedAttempts: Record<string, number> = {
  "basics-user-input-output": 1, "basics-data-types-if-else": 1, "basics-for-loops-functions": 1,
  "sorting-selection-sort": 1, "sorting-bubble-sort": 1, "sorting-merge-sort": 2,
  "arrays-two-sum": 1, "arrays-kadane-s-algorithm": 1, "arrays-sort-colors": 2,
  "binary-search-binary-search": 1,
};
const legacyTitleAliases: Record<string, string> = {
  "merge sort": "merge sorting",
  "sort colors": "sort an array of 0 s 1 s and 2 s",
  "binary search": "search x in sorted array",
  "search in rotated sorted array": "search in rotated sorted array i",
  "reverse words in a string": "reverse every word in a string",
  "reverse a linked list": "reverse a ll",
  "middle of the linked list": "find middle of linked list",
  "linked list cycle": "detect a loop in ll",
  "single number": "single number i",
  "valid parentheses": "balanced paranthesis",
  "min stack": "implement min stack",
  "implement queue using stacks": "implement queue using stack",
  "kth largest element": "k th largest element in an array",
  "jump game": "jump game i",
  "maximum depth of binary tree": "maximum depth in bt",
  "diameter of a binary tree": "diameter of binary tree",
  "search in a bst": "search in bst",
  "validate binary search tree": "check if a tree is a bst or not",
  "lowest common ancestor in a bst": "lca in bst",
  "rotting oranges": "rotten oranges",
  "course schedule": "course schedule i",
  "implement trie": "trie implementation and operations",
  "maximum xor of two numbers": "maximum xor of two numbers in an array",
};

function isUntouchedStarterSeed(problem: DsaProblem): boolean {
  const baseline = legacySeedStatus[problem.id];
  if (!baseline) {
    return problem.status === "Not Started" && problem.attempts === 0 && !problem.notes && !problem.approach &&
      !problem.timeComplexity && !problem.spaceComplexity && !problem.solutionUrl && !problem.solvedWithoutHelp;
  }
  const status = statusMap[problem.status] ?? "Not Started";
  const attempts = legacySeedAttempts[problem.id] ?? 0;
  const isTwoSumSeed = problem.id === "arrays-two-sum";
  return status === baseline && problem.attempts === attempts &&
    (!problem.notes || (isTwoSumSeed && problem.notes === "Compare the complement with values already seen.")) &&
    (!problem.approach || (isTwoSumSeed && problem.approach === "Hash map")) &&
    (!problem.timeComplexity || (isTwoSumSeed && problem.timeComplexity === "O(n)")) &&
    (!problem.spaceComplexity || (isTwoSumSeed && problem.spaceComplexity === "O(n)")) &&
    (problem.solvedWithoutHelp === (problem.difficulty === "Easy" && ["basics-user-input-output", "basics-data-types-if-else", "basics-for-loops-functions", "sorting-selection-sort", "sorting-bubble-sort", "arrays-two-sum", "binary-search-binary-search"].includes(problem.id)));
}

function hasUserWork(problem: DsaProblem): boolean {
  return problem.id.startsWith("custom-") || !isUntouchedStarterSeed(problem) ||
    Boolean(problem.notes || problem.approach || problem.timeComplexity || problem.spaceComplexity || problem.solutionUrl);
}

export function reconcileJourney(input: JourneyData): JourneyData {
  const data = normaliseJourney(input);
  const base = createStarterData();
  const oldProblems = data.problems;
  const used = new Set<string>();
  const idMap = new Map<string, string>();
  const matchedProblems = base.problems.map((canonical) => {
    const titleKey = normaliseTitle(canonical.title);
    const candidateTitles = [titleKey, ...Object.entries(legacyTitleAliases).filter(([, target]) => target === titleKey).map(([source]) => normaliseTitle(source))];
    const sameTitle = oldProblems.filter((old) => !used.has(old.id) && candidateTitles.includes(normaliseTitle(old.title)));
    const match = oldProblems.find((old) => !used.has(old.id) && old.id === canonical.id) ??
      sameTitle.find((old) => normaliseModule(old.topic) === normaliseModule(canonical.topic)) ??
      (sameTitle.length === 1 ? sameTitle[0] : undefined);
    if (!match) return canonical;
    used.add(match.id);
    idMap.set(match.id, canonical.id);
    if (isUntouchedStarterSeed(match)) return canonical;
    return {
      ...canonical,
      ...match,
      id: canonical.id,
      title: canonical.title,
      topic: canonical.topic,
      subtopic: canonical.subtopic,
      difficulty: canonical.difficulty,
      problemUrl: canonical.problemUrl || match.problemUrl,
      solutionUrl: match.solutionUrl || canonical.solutionUrl,
      platform: canonical.platform,
      tier: canonical.tier,
      videoUrl: canonical.videoUrl,
      alternateUrls: canonical.alternateUrls,
      isPersonal: false,
    };
  });
  const personalProblems = oldProblems.filter((problem) => !used.has(problem.id) && hasUserWork(problem)).map((problem) => ({ ...problem, isPersonal: true }));
  const remapId = (id: string) => idMap.get(id) ?? id;
  const dailyTasks = Object.fromEntries(Object.entries(data.dailyTasks).map(([date, tasks]) => [date, tasks.map((task) => ({ ...task, problemId: task.problemId ? remapId(task.problemId) : undefined }))]));
  const sessions = data.sessions.map((session) => ({
    ...session,
    problemsSolved: session.problemsSolved.map(remapId),
    problemsRevised: session.problemsRevised.map(remapId),
  }));
  return {
    ...base,
    ...data,
    problems: [...matchedProblems, ...personalProblems],
    sessions,
    dailyTasks: Object.keys(dailyTasks).length ? dailyTasks : base.dailyTasks,
    dailyMinutes: data.dailyMinutes ?? base.dailyMinutes,
  };
}

export function readJourney(): JourneyData | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as JourneyData;
    return Array.isArray(parsed.problems) && Array.isArray(parsed.sessions) ? reconcileJourney(parsed) : null;
  } catch { return null; }
}

export function writeJourney(data: JourneyData): void {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* browser storage can be unavailable */ }
}

export function resetJourney(): void { window.localStorage.removeItem(STORAGE_KEY); }
export function tasksForDay(data: JourneyData, day: string): DailyTask[] { return data.dailyTasks[day] ?? defaultTasks(); }
export function minutesForDay(data: JourneyData, day: string) { return data.dailyMinutes[day] ?? { learning: 0, practice: 0, revision: 0 }; }
