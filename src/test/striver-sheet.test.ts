import { describe, expect, it } from "vitest";

import { roadmap } from "@/data/roadmap";
import { createStarterData, exportJourney, importJourney } from "@/services/storage";

describe("Striver A2Z sheet data", () => {
  it("loads all indexed practice problems in 20 modules", () => {
    const data = createStarterData();
    expect(roadmap).toHaveLength(20);
    expect(data.problems).toHaveLength(402);
    expect(roadmap.reduce((sum, module) => sum + module.problems.length, 0)).toBe(402);
    expect(new Set(data.problems.map((problem) => problem.id)).size).toBe(402);
    expect(data.problems.every((problem) => /^https?:\/\//.test(problem.problemUrl))).toBe(true);
  });

  it("does not invent progress for a new tracker", () => {
    const data = createStarterData(new Date("2026-10-14T12:00:00"));
    expect(data.sessions).toHaveLength(0);
    expect(data.problems.every((problem) => problem.status === "Not Started")).toBe(true);
    expect(data.dailyMinutes["2026-10-14"]).toEqual({ learning: 0, practice: 0, revision: 0 });
  });

  it("keeps progress through JSON backup and restore", () => {
    const data = createStarterData();
    data.problems[0]!.status = "Solved";
    data.problems[0]!.notes = "Practised with a dry run.";
    const restored = importJourney(exportJourney(data));
    const problem = restored.problems.find((item) => item.id === data.problems[0]!.id);
    expect(problem?.status).toBe("Solved");
    expect(problem?.notes).toBe("Practised with a dry run.");
    expect(restored.problems).toHaveLength(402);
  });

  it("migrates legacy revision status into the simplified status", () => {
    const restored = importJourney(JSON.stringify({
      data: {
        problems: [{
          id: "arrays-two-sum",
          title: "Two Sum",
          topic: "Arrays",
          difficulty: "Easy",
          status: "Revise",
          problemUrl: "",
          solutionUrl: "",
          attempts: 2,
          solvedWithoutHelp: false,
          approach: "",
          timeComplexity: "",
          spaceComplexity: "",
          notes: "Revisit hash map approach.",
          solvedAt: "",
          lastRevisedAt: "",
          nextRevisionAt: "",
          confidence: "needed-thinking",
        }],
        sessions: [],
        dailyTasks: {},
        dailyMinutes: {},
      },
    }));
    const twoSum = restored.problems.find((problem) => problem.title === "Two Sum");
    expect(twoSum?.status).toBe("Needs Revision");
    expect(twoSum?.notes).toBe("Revisit hash map approach.");
    expect(restored.problems).toHaveLength(402);
  });
});
