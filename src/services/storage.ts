import { roadmap, problemIdFor, type Confidence, type DailyTask, type DsaProblem, type JourneyData, type ProblemStatus, type StudySession } from "@/data/roadmap";

const STORAGE_KEY = "dsa-journey:v1";
const BACKUP_VERSION = 1;

export function normaliseJourney(data: JourneyData): JourneyData {
  return { ...data, problems: data.problems.map((problem) => ({ ...problem, status: problem.status === "Revise" ? "Needs Revision" : problem.status === "Mastered" ? "Solved" : problem.status === "Learning" ? "Not Started" : problem.status })) };
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
  return normaliseJourney({ problems: journey.problems as DsaProblem[], sessions: journey.sessions as StudySession[], dailyTasks: journey.dailyTasks ?? {}, dailyMinutes: journey.dailyMinutes ?? {} });
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
    title: input.title, topic: input.topic, difficulty: input.difficulty, status: input.status ?? "Not Started",
    problemUrl: input.problemUrl ?? "", solutionUrl: input.solutionUrl ?? "", attempts: input.attempts ?? 0,
    solvedWithoutHelp: input.solvedWithoutHelp ?? false, approach: input.approach ?? "",
    timeComplexity: input.timeComplexity ?? "", spaceComplexity: input.spaceComplexity ?? "", notes: input.notes ?? "",
    solvedAt: input.solvedAt ?? "", lastRevisedAt: input.lastRevisedAt ?? "", nextRevisionAt: input.nextRevisionAt ?? "",
    confidence: input.confidence ?? "needed-thinking",
  };
}

const defaultTasks = (): DailyTask[] => [
  { id: "learn-binary-search", title: "Review binary search fundamentals", type: "Learn", completed: false },
  { id: "practice-binary-search", title: "Binary Search", type: "Practice", problemId: "binary-search-binary-search", completed: false },
  { id: "practice-lower-bound", title: "Lower Bound", type: "Practice", problemId: "binary-search-lower-bound", completed: false },
  { id: "revise-two-sum", title: "Two Sum", type: "Revision", problemId: "arrays-two-sum", completed: false },
];

export function createStarterData(now = new Date()): JourneyData {
  const today = localDate(now);
  const seededStatuses: Record<string, ProblemStatus> = {};
  const setStatus = (topicId: string, title: string, status: ProblemStatus) => {
    const topic = roadmap.find((item) => item.id === topicId);
    if (topic) seededStatuses[problemIdFor(topic, title)] = status;
  };
  roadmap[0]?.problems.forEach((item) => setStatus("basics", item.title, "Mastered"));
  roadmap[1]?.problems.forEach((item) => setStatus("sorting", item.title, "Solved"));
  setStatus("arrays", "Two Sum", "Solved");
  setStatus("arrays", "Kadane's Algorithm", "Learning");
  setStatus("arrays", "Sort Colors", "Revise");
  setStatus("binary-search", "Binary Search", "Solved");

  const problems = roadmap.flatMap((topic) => topic.problems.map((entry) => {
    const id = problemIdFor(topic, entry.title);
    const status = seededStatuses[id] ?? "Not Started";
    const solved = status === "Solved" || status === "Mastered" || status === "Revise";
    const solvedAt = solved ? addDays(today, -((topic.step + entry.title.length) % 8 + 1)) : "";
    const confidence: Confidence = entry.title === "Sort Colors" ? "needed-hint" : entry.title === "Two Sum" ? "easy" : "needed-thinking";
    return createProblem({
      id, title: entry.title, topic: topic.title, difficulty: entry.difficulty, status,
      attempts: solved ? entry.difficulty === "Easy" ? 1 : 2 : status === "Learning" ? 1 : 0,
      solvedWithoutHelp: solved && entry.difficulty === "Easy",
      approach: entry.title === "Two Sum" ? "Hash map" : entry.title === "Kadane's Algorithm" ? "Track the best running sum" : "",
      timeComplexity: entry.title === "Two Sum" ? "O(n)" : "", spaceComplexity: entry.title === "Two Sum" ? "O(n)" : "",
      solvedAt, lastRevisedAt: entry.title === "Two Sum" ? addDays(today, -4) : "",
      nextRevisionAt: entry.title === "Two Sum" ? addDays(today, 1) : entry.title === "Sort Colors" ? addDays(today, -1) : solved ? revisionDate(solvedAt, confidence) : "",
      confidence, notes: entry.title === "Two Sum" ? "Compare the complement with values already seen." : "",
    });
  }));

  const sessions: StudySession[] = [1, 2, 3, 5, 7, 9, 12, 14, 16, 20, 24, 27, 32, 37, 42, 47].map((daysAgo, index) => ({
    id: `starter-session-${index}`, date: addDays(today, -daysAgo), learningMinutes: index % 2 === 0 ? 20 : 15,
    practiceMinutes: index % 3 === 0 ? 35 : 30, revisionMinutes: 10, tasks: ["Learned a new concept", "Solved a practice problem"],
    problemsSolved: index < 8 ? [problems[(index + 6) % problems.length]?.id ?? ""] : [],
    problemsRevised: index % 3 === 0 ? [problems.find((problem) => problem.title === "Two Sum")?.id ?? ""] : [], completed: true,
  }));
  for (let daysAgo = 4; daysAgo >= 4; daysAgo -= 1) {
    sessions.push({ id: `recent-session-${daysAgo}`, date: addDays(today, -daysAgo), learningMinutes: 20, practiceMinutes: 30,
      revisionMinutes: 10, tasks: ["Reviewed a concept", "Solved a practice problem"], problemsSolved: [], problemsRevised: [], completed: true });
  }
  return { problems, sessions, dailyTasks: { [today]: defaultTasks() }, dailyMinutes: { [today]: { learning: 20, practice: 30, revision: 10 } } };
}

export function readJourney(): JourneyData | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as JourneyData;
    return Array.isArray(parsed.problems) && Array.isArray(parsed.sessions) ? normaliseJourney(parsed) : null;
  } catch { return null; }
}

export function writeJourney(data: JourneyData): void {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* browser storage can be unavailable */ }
}

export function resetJourney(): void { window.localStorage.removeItem(STORAGE_KEY); }
export function tasksForDay(data: JourneyData, day: string): DailyTask[] { return data.dailyTasks[day] ?? defaultTasks(); }
export function minutesForDay(data: JourneyData, day: string) { return data.dailyMinutes[day] ?? { learning: 20, practice: 30, revision: 10 }; }