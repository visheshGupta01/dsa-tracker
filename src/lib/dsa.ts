import { roadmap, type Confidence, type DsaProblem, type JourneyData, type StudySession } from "@/data/roadmap";
import { localDate } from "@/services/storage";

export const completedStatuses = new Set(["Solved", "Mastered", "Revise", "Needs Revision"]);

export function topicStats(problems: DsaProblem[]) {
  return roadmap.map((topic) => {
    const topicProblems = problems.filter((problem) => problem.topic === topic.title);
    const done = topicProblems.filter((problem) => completedStatuses.has(problem.status)).length;
    return { ...topic, total: topicProblems.length, done, percent: topicProblems.length ? Math.round(done / topicProblems.length * 100) : 0, problems: topicProblems };
  });
}

export function streakStats(sessions: StudySession[], today = localDate()) {
  const studyDays = new Set(sessions.filter((session) => session.completed).map((session) => session.date));
  let current = 0;
  let pointer = today;
  if (!studyDays.has(pointer)) pointer = shiftDate(pointer, -1);
  while (studyDays.has(pointer)) { current += 1; pointer = shiftDate(pointer, -1); }
  let longest = 0;
  let activeRun = 0;
  let prior = "";
  for (const day of [...studyDays].sort()) {
    activeRun = prior && shiftDate(prior, 1) === day ? activeRun + 1 : 1;
    longest = Math.max(longest, activeRun);
    prior = day;
  }
  return { current, longest, totalDays: studyDays.size };
}

function shiftDate(value: string, shift: number) {
  const [year = 2000, month = 1, day = 1] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + shift);
  return localDate(date);
}

export function activityByDay(sessions: StudySession[]) {
  const activity = new Map<string, number>();
  for (const session of sessions) {
    const level = session.problemsSolved.length + session.problemsRevised.length + (session.completed ? 1 : 0);
    activity.set(session.date, (activity.get(session.date) ?? 0) + level);
  }
  return activity;
}

export function solveConfidenceDelay(confidence: Confidence) {
  return { easy: 7, "needed-thinking": 4, "needed-hint": 2, "could-not-solve": 1 }[confidence];
}

export function solvedCount(data: JourneyData) { return data.problems.filter((problem) => completedStatuses.has(problem.status)).length; }
export function topicLabel(topic: string) { return topic.replace(" / ", " · "); }