import { striverA2z } from "@/data/striver-a2z";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Unrated";
export type ProblemStatus = "Not Started" | "Learning" | "Solved" | "Revise" | "Mastered" | "Needs Revision";
export type VideoStatus = "Not Watched" | "Watched" | "Revisit";
export type Confidence = "easy" | "needed-thinking" | "needed-hint" | "could-not-solve";

export interface SheetAlternative {
  platform: string;
  url: string;
}

export interface SheetProblem {
  id: string;
  order: number;
  title: string;
  topic: string;
  tier: string;
  difficulty: Difficulty;
  platform: string;
  url: string;
  altUrls: readonly SheetAlternative[];
  articleUrl: string;
  videoUrl: string;
  premium: boolean;
  duration: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  step: number;
  problems: SheetProblem[];
}

export interface DsaProblem {
  id: string;
  title: string;
  topic: string;
  subtopic?: string;
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
  platform?: string;
  tier?: string;
  videoUrl?: string;
  alternateUrls?: readonly SheetAlternative[];
  isPersonal?: boolean;
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
  videoStatuses?: Record<string, VideoStatus>;
  topicTheoryStatuses?: Record<string, boolean>;
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const roadmap: RoadmapTopic[] = striverA2z.steps.map((step) => ({
  id: `step-${step.n}-${slug(step.title)}`,
  title: step.title,
  step: step.n,
  problems: striverA2z.problems.filter((problem) => problem.step === step.n).map((problem) => ({
    id: problem.id,
    order: problem.order,
    title: problem.title,
    topic: problem.topic,
    tier: problem.tier,
    difficulty: (problem.difficulty || "Unrated") as Difficulty,
    platform: problem.platform,
    url: problem.url,
    altUrls: problem.altUrls,
    articleUrl: problem.article ?? "",
    videoUrl: problem.video ?? "",
    premium: problem.premium,
    duration: problem.duration,
  })),
}));

export const problemIdFor = (topic: RoadmapTopic, title: string) =>
  topic.problems.find((problem) => problem.title === title)?.id ??
  `${topic.id}-${slug(title)}`;
