import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity, ArrowDownUp, ArrowRight, BookOpen, CalendarClock, Check, CheckCircle2, ChevronDown,
  Circle, Clock3, Code2, Flame, Gauge, LayoutDashboard, ListChecks, Plus, RotateCcw,
  Search, Settings2, Sparkles, Target, Trash2, TrendingUp, Trophy, X,
} from "lucide-react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { activityByDay, completedStatuses, solveConfidenceDelay, solvedCount, streakStats, topicLabel, topicStats } from "@/lib/dsa";
import { createStarterData, exportJourney, importJourney, localDate, minutesForDay, normaliseJourney, readJourney, resetJourney, revisionDate, tasksForDay, writeJourney } from "@/services/storage";
import { roadmap, type Confidence, type DailyTask, type Difficulty, type DsaProblem, type JourneyData, type ProblemStatus } from "@/data/roadmap";

type Section = "Dashboard" | "DSA Sheet" | "Progress";
const sectionMeta: Record<Section, { title: string; eyebrow: string; description: string }> = {
  Dashboard: { title: "Your next hour, well spent.", eyebrow: "YOUR STUDY SPACE", description: "One focused session at a time. Pick up where you left off." },
  "DSA Sheet": { title: "Your sheet, one problem at a time.", eyebrow: "STRIVER A2Z", description: "Track solved problems and mark the ones you want to revisit." },
  Progress: { title: "Small steps add up.", eyebrow: "YOUR PROGRESS", description: "A clear picture of your practice and consistency over time." },
};
const navItems: Array<{ name: Section; href: "/" | "/roadmap" | "/analytics"; icon: typeof LayoutDashboard }> = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "DSA Sheet", href: "/roadmap", icon: BookOpen },
  { name: "Progress", href: "/analytics", icon: Activity },
];
const statusOptions: ProblemStatus[] = ["Not Started", "Solved", "Needs Revision"];
const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard", "Unrated"];
const confidenceChoices: Array<{ id: Confidence; emoji: string; title: string; days: number }> = [
  { id: "easy", emoji: "😄", title: "Easy", days: 7 },
  { id: "needed-thinking", emoji: "🤔", title: "Needed some thinking", days: 4 },
  { id: "needed-hint", emoji: "😓", title: "Needed a hint", days: 2 },
  { id: "could-not-solve", emoji: "↻", title: "Couldn't solve", days: 1 },
];
const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");
const titleCaseDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export function DsaJourney({ section }: { section: Section }) {
  const [data, setData] = useState<JourneyData | null>(null);
  const [today, setToday] = useState(() => localDate());
  const [problemDialog, setProblemDialog] = useState(false);
  const [editingProblem, setEditingProblem] = useState<DsaProblem | null>(null);
  const [revisionProblem, setRevisionProblem] = useState<DsaProblem | null>(null);

  useEffect(() => {
    const stored = readJourney();
    setData(stored ?? normaliseJourney(createStarterData()));
    setToday(localDate());
  }, []);

  useEffect(() => {
    if (data) writeJourney(data);
  }, [data]);

  const updateProblem = (id: string, update: Partial<DsaProblem>) => {
    setData((current) => current ? { ...current, problems: current.problems.map((problem) => problem.id === id ? { ...problem, ...update } : problem) } : current);
  };
  const addOrUpdateProblem = (problem: DsaProblem) => {
    setData((current) => current ? {
      ...current,
      problems: current.problems.some((item) => item.id === problem.id)
        ? current.problems.map((item) => item.id === problem.id ? problem : item)
        : [problem, ...current.problems],
    } : current);
    toast.success(editingProblem ? "Problem updated" : "Problem added");
    setProblemDialog(false);
    setEditingProblem(null);
  };
  const openProblem = (problem?: DsaProblem) => {
    setEditingProblem(problem ?? null);
    setProblemDialog(true);
  };
  const handleExport = () => {
    if (!data) return;
    const blob = new Blob([exportJourney(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `dsa-journey-backup-${today}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  };
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const restored = importJourney(await file.text());
      if (!window.confirm("Restore this backup? It will replace the progress currently saved in this browser.")) return;
      setData(restored);
      toast.success("Backup restored");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read this backup file");
    }
  };
  const handleReset = () => {
    if (!window.confirm("Reset your tracker and restore the sample problems? Your saved changes will be removed.")) return;
    resetJourney();
    setData(normaliseJourney(createStarterData()));
    toast.success("Sample journey restored");
  };
  const finishRevision = (confidence: Confidence) => {
    if (!revisionProblem) return;
    const nextRevisionAt = revisionDate(today, confidence);
    updateProblem(revisionProblem.id, { confidence, status: "Needs Revision", lastRevisedAt: today, nextRevisionAt, attempts: revisionProblem.attempts + 1 });
    setData((current) => {
      if (!current) return current;
      const daySession = current.sessions.find((session) => session.date === today);
      const revisedSession = { id: daySession?.id ?? `session-${today}`, date: today, learningMinutes: daySession?.learningMinutes ?? 0,
        practiceMinutes: daySession?.practiceMinutes ?? 0, revisionMinutes: Math.max(daySession?.revisionMinutes ?? 0, 10),
        tasks: [...new Set([...(daySession?.tasks ?? []), "Completed a revision"])], problemsSolved: daySession?.problemsSolved ?? [],
        problemsRevised: [...new Set([...(daySession?.problemsRevised ?? []), revisionProblem.id])], completed: daySession?.completed ?? false };
      return { ...current, sessions: daySession ? current.sessions.map((session) => session.date === today ? revisedSession : session) : [...current.sessions, revisedSession] };
    });
    toast.success(`Next revision ${titleCaseDate(nextRevisionAt)}`);
    setRevisionProblem(null);
  };

  const common = { data, today, updateProblem, openProblem, setRevisionProblem };
  return (
    <div className="journey-shell">
      <aside className="journey-sidebar">
        <Link to="/" className="brand-lockup" aria-label="DSA Journey home">
          <span className="brand-mark"><Code2 size={19} /></span>
          <span><strong>DSA Journey</strong><small>STRIVER A2Z <i /> C++</small></span>
        </Link>
        <div className="sidebar-caption">WORKSPACE</div>
        <nav className="sidebar-links" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = section === item.name;
            return <Link key={item.name} to={item.href} className={cn("sidebar-link", active && "active")} aria-current={active ? "page" : undefined}>
              <item.icon size={17} strokeWidth={1.8} /><span>{item.name}</span>{active && <span className="active-dot" />}
            </Link>;
          })}
        </nav>
        <div className="sidebar-streak">
          <div className="streak-icon"><Flame size={16} /></div>
          <div><strong>{data ? streakStats(data.sessions, today).current : 0} day streak</strong><small>Keep your rhythm going</small></div>
          <ChevronDown size={14} className="streak-chevron" />
        </div>
        <div className="sidebar-bottom">
          <div className="focus-card"><div className="focus-glyph"><Target size={16} /></div><span>One hour a day.<br /><b>That's the whole plan.</b></span></div>
          <div className="backup-actions"><Button variant="ghost" size="sm" onClick={handleExport} disabled={!data}><ArrowDownUp size={14} /> Export JSON</Button><label className="backup-import-button" htmlFor="journey-backup-input">Import JSON</label><input id="journey-backup-input" className="sr-only" type="file" accept="application/json,.json" onChange={handleImport} /></div><Button variant="ghost" size="sm" onClick={handleReset} className="reset-button"><Settings2 size={15} /> Reset sample data</Button>
          <div className="profile-row"><div className="profile-avatar">VG</div><div><b>Your journey</b><small>Personal workspace</small></div><Sparkles size={15} className="profile-sparkle" /></div>
        </div>
      </aside>

      <div className="journey-main">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-divider">/</span><b>{section}</b></div>
          <div className="topbar-right"><span className="today-chip"><span className="live-dot" /> {new Date(`${today}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span><span className="language-chip"><span /> C++</span></div>
        </header>

        <main className="content-area page-enter">
          <div className="page-heading"><div><span className="eyebrow"><i />{sectionMeta[section].eyebrow}</span><h1>{sectionMeta[section].title}</h1><p>{sectionMeta[section].description}</p></div>
            {section === "DSA Sheet" && <Button onClick={() => openProblem()}><Plus size={16} /> Add problem</Button>}
          </div>
          {!data ? <LoadingState /> : <>
            {section === "Dashboard" && <DashboardPage {...common} onFinish={(change) => setData((previous) => previous ? change(previous) : previous)} />}
            {section === "DSA Sheet" && <ProblemsPage {...common} onEdit={openProblem} onAdd={() => openProblem()} />}
            {section === "Progress" && <AnalyticsPage {...common} />}
          </>}
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Main navigation">
        {navItems.map((item) => <Link key={item.name} to={item.href} aria-label={item.name} className={cn("mobile-nav-link", section === item.name && "active")}><item.icon size={18} /><span>{item.name}</span></Link>)}
      </nav>

      <ProblemEditor key={`${problemDialog}-${editingProblem?.id ?? "new"}`} open={problemDialog} problem={editingProblem} onOpenChange={setProblemDialog} onSave={addOrUpdateProblem} />
      <RevisionDialog problem={revisionProblem} onOpenChange={(open) => !open && setRevisionProblem(null)} onRate={finishRevision} />
    </div>
  );
}

function LoadingState() {
  return <div className="loading-state"><span className="loading-pulse" /><span>Preparing your study desk…</span></div>;
}

function StatCard({ label, value, unit, icon: Icon, tone, footnote }: { label: string; value: string | number; unit?: string; icon: typeof Target; tone: string; footnote: string }) {
  return <article className="stat-card"><div className="stat-card-top"><span>{label}</span><span className={cn("stat-icon", tone)}><Icon size={17} /></span></div><div className="stat-value">{value}<small>{unit}</small></div><div className="stat-footnote">{footnote}</div></article>;
}

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return <div className={cn("progress-track", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Completion"><span style={{ width: `${value}%` }} /></div>;
}

function PanelTitle({ title, trailing, href }: { title: string; trailing?: string; href?: "/roadmap" | "/analytics" }) {
  return <div className="panel-title"><h2>{title}</h2>{trailing && (href ? <Link to={href} className="text-link">{trailing}<ArrowRight size={14} /></Link> : <span className="panel-meta">{trailing}</span>)}</div>;
}

function DashboardPage({ data, today, updateProblem, openProblem, setRevisionProblem, onFinish }: {
  data: JourneyData | null; today: string; updateProblem: (id: string, patch: Partial<DsaProblem>) => void; openProblem: (problem?: DsaProblem) => void; setRevisionProblem: (problem: DsaProblem) => void; onFinish: (change: (previous: JourneyData) => JourneyData) => void;
}) {
  if (!data) return null;
  const stats = streakStats(data.sessions, today);
  const topics = topicStats(data.problems);
  const doneTopics = topics.filter((topic) => topic.total > 0 && topic.done === topic.total).length;
  const solved = solvedCount(data);
  const total = data.problems.length;
  const progress = total ? Math.round(solved / total * 100) : 0;
  const minutes = minutesForDay(data, today);
  const allTasks = data.dailyTasks[today] ?? tasksForDay(data, today);
  const todaySession = data.sessions.find((session) => session.date === today);
  const completed = todaySession?.completed === true;
  const currentTopic = topics.find((topic) => topic.problems.some((problem) => problem.status === "Not Started")) ?? topics.find((topic) => topic.problems.some((problem) => problem.status === "Needs Revision")) ?? topics[0];
  const due = data.problems.filter((problem) => problem.status === "Needs Revision" && problem.nextRevisionAt && problem.nextRevisionAt <= today).length;
  const recent = [...data.problems].filter((problem) => problem.solvedAt).sort((a, b) => b.solvedAt.localeCompare(a.solvedAt)).slice(0, 4);
  const setTasks = (tasks: DailyTask[]) => onFinish((previous) => ({ ...previous, dailyTasks: { ...previous.dailyTasks, [today]: tasks } }));
  const setMinutes = (key: "learning" | "practice" | "revision", value: number) => onFinish((previous) => ({ ...previous, dailyMinutes: { ...previous.dailyMinutes, [today]: { ...minutesForDay(previous, today), [key]: Math.max(0, value) } } }));
  const finish = () => {
    if (completed) { toast.info("Today's session is already saved"); return; }
    const solvedIds = allTasks.filter((task) => task.completed && task.type === "Practice" && task.problemId).map((task) => task.problemId as string);
    const revisedIds = allTasks.filter((task) => task.completed && task.type === "Revision" && task.problemId).map((task) => task.problemId as string);
    onFinish((previous) => {
      const existing = previous.sessions.find((session) => session.date === today);
      if (existing?.completed) return previous;
      const session = { id: existing?.id ?? `session-${today}`, date: today, learningMinutes: minutes.learning, practiceMinutes: minutes.practice, revisionMinutes: minutes.revision,
        tasks: [...new Set([...(existing?.tasks ?? []), ...allTasks.filter((task) => task.completed).map((task) => task.title)])],
        problemsSolved: [...new Set([...(existing?.problemsSolved ?? []), ...solvedIds])],
        problemsRevised: [...new Set([...(existing?.problemsRevised ?? []), ...revisedIds])], completed: true };
      return { ...previous, problems: previous.problems.map((problem) => solvedIds.includes(problem.id) ? { ...problem, status: "Solved", attempts: Math.max(1, problem.attempts), solvedAt: today } : revisedIds.includes(problem.id) ? { ...problem, status: "Solved", lastRevisedAt: today } : problem), sessions: existing ? previous.sessions.map((item) => item.date === today ? session : item) : [...previous.sessions, session] };
    });
    toast.success("Study session saved. Nice work.");
  };
  const groupedTasks: DailyTask["type"][] = ["Learn", "Practice", "Revision"];

  return <>
    <section className="welcome-strip"><div className="welcome-decoration"><span /><span /><span /><span /><span /></div><div className="welcome-copy"><span className="welcome-overline">YOUR DAILY PRACTICE <i /> 60 MINUTES, AT YOUR PACE</span><h2>Progress beats perfect.</h2><p>Show up for a little practice today. Tomorrow can take care of itself.</p></div><div className="welcome-stat"><span><Flame size={16} /> CURRENT STREAK</span><strong>{stats.current}<small> days</small></strong><span className="welcome-record"><Trophy size={12} /> Best: {stats.longest} days</span></div></section>
    <section className="stats-grid">
      <StatCard label="Problems solved" value={solved} unit={`/ ${total}`} icon={CheckCircle2} tone="green-tone" footnote={`${data.problems.length - solved} still on your list`} />
      <StatCard label="Topics completed" value={doneTopics} unit={`/ ${topics.length}`} icon={BookOpen} tone="blue-tone" footnote="Across your A2Z roadmap" />
      <StatCard label="Time invested" value={`${Math.floor(data.sessions.reduce((sum, session) => sum + session.learningMinutes + session.practiceMinutes + session.revisionMinutes, 0) / 60)}h`} icon={Clock3} tone="violet-tone" footnote={`${data.sessions.reduce((sum, session) => sum + session.learningMinutes + session.practiceMinutes + session.revisionMinutes, 0) % 60} min beyond whole hours`} />
      <StatCard label="Study days" value={stats.totalDays} icon={Flame} tone="orange-tone" footnote={`${stats.current} day current streak`} />
    </section>

    <div className="dashboard-grid">
      <div className="dashboard-column">
        <section className="surface-panel overall-panel"><PanelTitle title="Overall progress" trailing="Open DSA Sheet" href="/roadmap" /><div className="overall-row"><div><strong>{progress}%</strong><span>of your A2Z problems solved</span></div><span className="overall-count"><b>{solved}</b><i>/</i>{total}</span></div><ProgressBar value={progress} /><div className="overall-footer"><span><i className="legend-dot solved-dot" /> Solved</span><span><i className="legend-dot remaining-dot" /> Remaining</span><span className="overall-streak"><Flame size={13} /> {stats.current} day streak</span></div></section>

        <section className="surface-panel today-panel"><div className="today-header"><div><span className="eyebrow"><i /> TODAY'S PLAN</span><h2>A focused hour</h2><p>{new Date(`${today}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p></div><div className="session-clock"><Clock3 size={13} /><span>{minutes.learning + minutes.practice + minutes.revision} min</span></div></div>
          <div className="minutes-editor" aria-label="Planned minutes"><span>Plan</span>{(["learning", "practice", "revision"] as const).map((key) => <label key={key}>{key === "learning" ? "Learn" : key === "practice" ? "Practice" : "Revision"}<input type="number" min="0" max="240" step="5" aria-label={`${key} minutes`} value={minutes[key]} disabled={completed} onChange={(event) => setMinutes(key, Number(event.target.value))} /></label>)}</div>
          <div className="task-groups">{groupedTasks.map((type) => <div className="task-group" key={type}><div className="task-group-label"><span className={cn("task-type-dot", type.toLowerCase())} />{type}<span>{type === "Learn" ? minutes.learning : type === "Practice" ? minutes.practice : minutes.revision} min</span></div>
              {allTasks.filter((task) => task.type === type).map((task) => <label className={cn("task-row", task.completed && "task-done")} key={task.id}><Checkbox checked={task.completed} disabled={completed} onCheckedChange={(checked) => setTasks(allTasks.map((item) => item.id === task.id ? { ...item, completed: checked === true } : item))} /><span>{task.title}</span>{task.problemId && <button type="button" className="task-edit" aria-label={`Open ${task.title}`} onClick={() => { const problem = data.problems.find((entry) => entry.id === task.problemId); if (problem) openProblem(problem); }}><ArrowRight size={13} /></button>}</label>)}
            </div>)}</div>
          <Button className="finish-button" disabled={completed} onClick={finish}>{completed ? <><Check size={16} /> Session saved for today</> : <><CheckCircle2 size={16} /> Finish day</>}<span>{completed ? "Logged" : "Save session"}</span></Button>
          <p className="session-note"><CheckCircle2 size={13} /> Your session is saved once per calendar day.</p>
        </section>

        <section className="surface-panel recent-panel"><PanelTitle title="Recently solved" trailing="Open DSA Sheet" href="/roadmap" />{recent.length ? <div className="recent-list">{recent.map((problem) => <button key={problem.id} className="recent-row" onClick={() => openProblem(problem)}><span className="recent-status"><Check size={13} /></span><span className="recent-name"><b>{problem.title}</b><small>{topicLabel(problem.topic)}</small></span><DifficultyBadge difficulty={problem.difficulty} /><span className="recent-date">{titleCaseDate(problem.solvedAt)}</span><ArrowRight size={14} className="recent-arrow" /></button>)}</div> : <EmptyState title="Your first solve is waiting" message="Check off a practice problem in today's plan to add it here." />}</section>
      </div>

      <aside className="dashboard-column side-column">
        <section className="surface-panel continue-panel"><div className="continue-heading"><div><span className="eyebrow"><i /> PICK UP WHERE YOU LEFT OFF</span><h2>{currentTopic?.title ?? "Binary Search"}</h2></div><span className="continue-symbol"><ArrowDownUp size={17} /></span></div><p className="continue-subtitle">The next step in your A2Z journey</p><div className="continue-progress-label"><span>{currentTopic?.done ?? 0} of {currentTopic?.total ?? 0} problems</span><b>{currentTopic?.percent ?? 0}%</b></div><ProgressBar value={currentTopic?.percent ?? 0} /><Link to="/roadmap" className="continue-link">Continue learning <ArrowRight size={15} /></Link></section>
        <section className="surface-panel revision-preview"><PanelTitle title="Up next to revise" trailing={`${due} due`} href="/roadmap" />{data.problems.filter((problem) => problem.status === "Needs Revision" && problem.nextRevisionAt && problem.nextRevisionAt <= today).slice(0, 2).map((problem) => <div className="revision-mini" key={problem.id}><span className="revision-mini-icon"><RotateCcw size={14} /></span><div><b>{problem.title}</b><small>{problem.nextRevisionAt < today ? "Overdue" : "Due today"} · {problem.topic}</small></div><button aria-label={`Revise ${problem.title}`} onClick={() => setRevisionProblem(problem)}><ArrowRight size={14} /></button></div>)}{due === 0 && <p className="all-clear"><CheckCircle2 size={15} /> You're all caught up for today.</p>}</section>
        <section className="surface-panel consistency-panel"><PanelTitle title="Your rhythm" trailing="Progress" href="/analytics" /><Heatmap sessions={data.sessions} today={today} compact /><div className="consistency-foot"><span><b>{stats.totalDays}</b> study days</span><span><i className="legend-dot solved-dot" /> Less <HeatScale /> More</span></div></section>
        <div className="side-quote"><Sparkles size={15} /><span>“Every expert was once a beginner.”<small>Keep showing up.</small></span></div>
      </aside>
    </div>
  </>;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return <span className={cn("difficulty-badge", `${difficulty.toLowerCase()}-difficulty`)}>{difficulty}</span>;
}

function StatusBadge({ status }: { status: ProblemStatus }) {
  const normalized: ProblemStatus = status === "Revise" ? "Needs Revision" : status === "Mastered" ? "Solved" : status === "Learning" ? "Not Started" : status;
  const icons: Record<ProblemStatus, typeof Circle> = { "Not Started": Circle, Learning: Activity, Solved: CheckCircle2, Revise: RotateCcw, Mastered: Trophy, "Needs Revision": RotateCcw };
  const Icon = icons[normalized];
  return <span className={cn("status-badge", `status-${normalized.toLowerCase().replace(" ", "-")}`)}><Icon size={12} />{normalized}</span>;
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="empty-state"><span className="empty-icon"><ListChecks size={19} /></span><b>{title}</b><p>{message}</p></div>;
}

function RoadmapPage({ data, today, updateProblem, openProblem }: { data: JourneyData | null; today: string; updateProblem: (id: string, patch: Partial<DsaProblem>) => void; openProblem: (problem?: DsaProblem) => void }) {
  if (!data) return null;
  const officialProblems = data.problems.filter((problem) => !problem.isPersonal);
  const topics = topicStats(officialProblems);
  const solved = solvedCount({ ...data, problems: officialProblems });
  return <>
    <section className="roadmap-summary surface-panel"><div className="roadmap-sum-icon"><BookOpen size={20} /></div><div className="roadmap-sum-copy"><span>STRIVER A2Z SHEET</span><b>{solved} <i>/</i> {officialProblems.length} <small>problems solved</small></b></div><div className="roadmap-sum-progress"><ProgressBar value={officialProblems.length ? solved / officialProblems.length * 100 : 0} /><span>{officialProblems.length ? Math.round(solved / officialProblems.length * 100) : 0}% overall</span></div><div className="roadmap-sum-meta"><span>{roadmap.length} modules</span><span>·</span><span>{officialProblems.length} practice problems</span></div></section>
    <section className="roadmap-list">{topics.map((topic, index) => <details className="roadmap-step surface-panel" key={topic.id} open={index === 2 || index === 3 || undefined}><summary><span className={cn("step-check", topic.percent === 100 && "is-done")}>{topic.percent === 100 ? <Check size={14} /> : String(topic.step).padStart(2, "0")}</span><div className="step-name"><b>{topic.title}</b><small>{topic.done}/{topic.total} problems complete</small></div><div className="step-progress"><ProgressBar value={topic.percent} /><span>{topic.percent}%</span></div><span className="step-chevron"><ChevronDown size={16} /></span></summary><div className="step-problems">{topic.problems.map((problem) => <div className="roadmap-problem-row" key={problem.id}><button className={cn("roadmap-problem-check", completedStatuses.has(problem.status) && "checked", problem.status === "Needs Revision" && "needs-revision")} aria-label={`Mark ${problem.title} ${completedStatuses.has(problem.status) ? "not started" : "solved"}`} onClick={() => updateProblem(problem.id, { status: completedStatuses.has(problem.status) ? "Not Started" : "Solved", solvedAt: completedStatuses.has(problem.status) ? "" : today })}>{completedStatuses.has(problem.status) ? <Check size={13} /> : problem.status === "Needs Revision" ? <RotateCcw size={12} /> : <Circle size={13} />}</button><a className="roadmap-problem-name" href={problem.problemUrl || undefined} target={problem.problemUrl ? "_blank" : undefined} rel={problem.problemUrl ? "noreferrer" : undefined} onClick={!problem.problemUrl ? (event) => { event.preventDefault(); openProblem(problem); } : undefined}>{problem.title}</a><DifficultyBadge difficulty={problem.difficulty} /><StatusBadge status={problem.status} /><button className="roadmap-row-edit" aria-label={`Edit ${problem.title}`} onClick={() => openProblem(problem)}><ArrowRight size={14} /></button></div>)}</div></details>)}</section>
    <p className="data-note"><Sparkles size={14} /> Practice links follow Striver’s A2Z sheet snapshot. Unrated means the source did not publish an Easy / Medium / Hard label.</p>
  </>;
}

function ProblemsPage({ data, updateProblem, onEdit, onAdd }: { data: JourneyData | null; updateProblem: (id: string, patch: Partial<DsaProblem>) => void; onEdit: (problem?: DsaProblem) => void; onAdd: () => void }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [difficulty, setDifficulty] = useState("All difficulties");
  const [status, setStatus] = useState("All statuses");
  const [sort, setSort] = useState<"default" | "title" | "difficulty">("default");
  if (!data) return null;
  const topics = [...new Set(data.problems.map((problem) => problem.topic))];
  const filtered = data.problems.filter((problem) => `${problem.title} ${problem.topic} ${problem.subtopic ?? ""} ${problem.platform ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (topic === "All topics" || problem.topic === topic) && (difficulty === "All difficulties" || problem.difficulty === difficulty) && (status === "All statuses" || problem.status === status)).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : sort === "difficulty" ? difficultyOptions.indexOf(a.difficulty) - difficultyOptions.indexOf(b.difficulty) : roadmap.findIndex((entry) => entry.title === a.topic) - roadmap.findIndex((entry) => entry.title === b.topic));
  const onStatus = (id: string, next: ProblemStatus) => {
    const item = data.problems.find((problem) => problem.id === id);
    const status = next === "Learning" || next === "Mastered" ? (next === "Mastered" ? "Solved" : "Not Started") : next === "Revise" ? "Needs Revision" : next;
    updateProblem(id, { status, solvedAt: status === "Solved" ? item?.solvedAt || localDate() : item?.solvedAt || "" });
  };
  return <>
    <div className="problem-overview"><div><strong>{data.problems.length}</strong><span>Total problems</span></div><div><strong>{solvedCount(data)}</strong><span>Solved</span></div><div><strong>{data.problems.filter((problem) => problem.status === "Not Started").length}</strong><span>Not started</span></div><div><strong>{data.problems.filter((problem) => problem.nextRevisionAt && problem.nextRevisionAt <= localDate()).length}</strong><span>To revise</span></div></div>
    <section className="surface-panel problem-table-panel"><div className="problem-toolbar"><div className="search-field"><Search size={16} /><Input aria-label="Search problems" placeholder="Search by problem or topic…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>/</kbd></div><div className="filter-controls"><select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option>All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter by difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All difficulties</option>{difficultyOptions.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option>{statusOptions.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Sort problems" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="default">Roadmap order</option><option value="title">Name A–Z</option><option value="difficulty">Difficulty</option></select></div></div>
      <div className="problem-table-scroll"><table className="problem-table"><thead><tr><th>PROBLEM</th><th>TOPIC</th><th>DIFFICULTY</th><th>STATUS</th><th>ATTEMPTS</th><th>LAST SOLVED</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((problem) => <tr key={problem.id}><td>{problem.problemUrl ? <a className="table-problem-name" href={problem.problemUrl} target="_blank" rel="noreferrer">{problem.title}</a> : <button className="table-problem-name" onClick={() => onEdit(problem)}>{problem.title}</button>}</td><td><span className="topic-pill">{topicLabel(problem.topic)}</span>{problem.subtopic && <small className="subtopic-label">{problem.subtopic}</small>}</td><td><DifficultyBadge difficulty={problem.difficulty} /></td><td><select aria-label={`Status for ${problem.title}`} className={cn("table-status-select", `status-select-${problem.status.toLowerCase().replace(" ", "-")}`)} value={problem.status} onChange={(event) => onStatus(problem.id, event.target.value as ProblemStatus)}>{statusOptions.map((item) => <option key={item}>{item}</option>)}</select></td><td className="attempt-count">{problem.attempts || "—"}</td><td className="solved-date">{problem.solvedAt ? titleCaseDate(problem.solvedAt) : "—"}</td><td><button className="row-action" aria-label={`Edit ${problem.title}`} onClick={() => onEdit(problem)}><ArrowRight size={15} /></button></td></tr>)}</tbody></table></div>
      {filtered.length === 0 && <EmptyState title="No problems match" message="Try another search or filter, or add a problem to your list." />}
      <div className="table-footer"><span>Showing <b>{filtered.length}</b> of <b>{data.problems.length}</b> problems</span><Button variant="ghost" size="sm" onClick={onAdd}><Plus size={14} /> Add problem</Button></div>
    </section>
  </>;
}

function RevisionPage({ data, today, setRevisionProblem }: { data: JourneyData | null; today: string; setRevisionProblem: (problem: DsaProblem) => void }) {
  if (!data) return null;
  const revisions = data.problems.filter((problem) => problem.status === "Needs Revision" && problem.nextRevisionAt).sort((a, b) => a.nextRevisionAt.localeCompare(b.nextRevisionAt));
  const overdue = revisions.filter((problem) => problem.nextRevisionAt < today);
  const due = revisions.filter((problem) => problem.nextRevisionAt === today);
  const upcoming = revisions.filter((problem) => problem.nextRevisionAt > today);
  const reviewCard = (problem: DsaProblem, kind: "overdue" | "due" | "upcoming") => <article className="revision-card" key={problem.id}><div className={cn("revision-card-mark", `rev-${kind}`)}><RotateCcw size={16} /></div><div className="revision-card-copy"><div><b>{problem.title}</b><DifficultyBadge difficulty={problem.difficulty} /></div><span>{topicLabel(problem.topic)} <i>·</i> {kind === "overdue" ? `${Math.max(1, Math.round((new Date(`${today}T12:00:00`).getTime() - new Date(`${problem.nextRevisionAt}T12:00:00`).getTime()) / 86400000))} days overdue` : kind === "due" ? "Scheduled for today" : `On ${titleCaseDate(problem.nextRevisionAt)}`}</span></div><StatusBadge status={problem.status} />{kind !== "upcoming" && <Button size="sm" variant="outline" onClick={() => setRevisionProblem(problem)}>Start revision <ArrowRight size={14} /></Button>}</article>;
  const revisionSection = (title: string, list: DsaProblem[], kind: "overdue" | "due" | "upcoming", icon: typeof Flame) => { const Icon = icon; return <section className="revision-section"><div className="revision-section-heading"><span className={cn("revision-section-icon", `rev-${kind}`)}><Icon size={15} /></span><h2>{title}</h2><span>{list.length}</span></div>{list.length ? <div className="revision-cards">{list.map((problem) => reviewCard(problem, kind))}</div> : <div className="revision-empty"><CheckCircle2 size={16} /><span>{kind === "overdue" ? "No overdue problems. You're right on track." : kind === "due" ? "Nothing else scheduled for today." : "Your upcoming reviews will appear here."}</span></div>}</section>; };
  return <>
    <section className="revision-overview surface-panel"><div className="revision-overview-icon"><CalendarClock size={20} /></div><div><span>YOUR REVIEW QUEUE</span><b>{overdue.length + due.length} <small>to review today</small></b></div><div className="revision-overview-stats"><span><b>{overdue.length}</b> overdue</span><span><b>{due.length}</b> due today</span><span><b>{upcoming.length}</b> upcoming</span></div><span className="revision-overview-emoji">↻</span></section>
    <div className="revision-columns">{revisionSection("Overdue", overdue, "overdue", Flame)}{revisionSection("Due today", due, "due", Target)}{revisionSection("Coming up", upcoming, "upcoming", CalendarClock)}</div>
    <div className="spaced-repetition-note"><span><Sparkles size={15} /></span><p>Short, well-timed reviews help move a solution into long-term memory. <small>How you felt last time sets the next review date.</small></p></div>
  </>;
}

function AnalyticsPage({ data, today }: { data: JourneyData | null; today: string }) {
  if (!data) return null;
  const streak = streakStats(data.sessions, today);
  const topics = topicStats(data.problems);
  const solved = data.problems.filter((problem) => completedStatuses.has(problem.status));
  const totalMinutes = data.sessions.reduce((sum, session) => sum + session.learningMinutes + session.practiceMinutes + session.revisionMinutes, 0);
  const difficultyData = difficultyOptions.map((difficulty) => ({ name: difficulty, count: solved.filter((problem) => problem.difficulty === difficulty).length }));
  const lastWeeks = Array.from({ length: 8 }, (_, index) => {
    const end = new Date(`${today}T12:00:00`); end.setDate(end.getDate() - (7 - index) * 7);
    const start = new Date(end); start.setDate(start.getDate() - 6);
    const date = localDate(start);
    const days = data.sessions.filter((session) => session.completed && session.date >= localDate(start) && session.date <= localDate(end)).length;
    return { week: `W${index + 1}`, date, days, label: `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })}–${end.toLocaleDateString(undefined, { month: "short", day: "numeric" })}` };
  });
  const activity = activityByDay(data.sessions);
  const lastActivityDays = [...activity.entries()].sort((a, b) => b[0].localeCompare(a[0])).slice(0, 6);
  const solvedPerWeek = Array.from({ length: 8 }, (_, index) => {
    const end = new Date(`${today}T12:00:00`); end.setDate(end.getDate() - (7 - index) * 7);
    const start = new Date(end); start.setDate(start.getDate() - 6);
    const startDay = localDate(start); const endDay = localDate(end);
    return { week: `W${index + 1}`, solved: solved.filter((problem) => problem.solvedAt >= startDay && problem.solvedAt <= endDay).length };
  });
  const donutColors = ["var(--color-success)", "var(--color-info)", "var(--color-warning)"];
  return <>
    <section className="analytics-kpis"><StatCard label="Problems solved" value={solved.length} icon={CheckCircle2} tone="green-tone" footnote="Across all difficulties" /><StatCard label="Study streak" value={streak.current} unit=" days" icon={Flame} tone="orange-tone" footnote={`${streak.longest} days is your personal best`} /><StatCard label="Total study time" value={`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`} icon={Clock3} tone="violet-tone" footnote={`Over ${streak.totalDays} active days`} /><StatCard label="A2Z progress" value={`${data.problems.length ? Math.round(solved.length / data.problems.length * 100) : 0}%`} icon={TrendingUp} tone="blue-tone" footnote={`${topics.filter((topic) => topic.percent === 100).length} of 17 topics complete`} /></section>
    <div className="analytics-grid">
      <section className="surface-panel chart-panel"><PanelTitle title="Problems solved over time" trailing="Last 8 weeks" /><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><BarChart data={solvedPerWeek} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 5" /><XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} /><Tooltip cursor={{ fill: "var(--color-accent)" }} contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6 }} /><Bar dataKey="solved" name="Solved" fill="var(--color-acid)" radius={[4, 4, 0, 0]} maxBarSize={30} /></BarChart></ResponsiveContainer></div><div className="chart-caption"><span><i className="legend-dot solved-dot" /> Problems solved</span><span>Weekly activity</span></div></section>
      <section className="surface-panel difficulty-panel"><PanelTitle title="Solved by difficulty" /><div className="difficulty-chart-wrap"><div className="difficulty-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={difficultyData} dataKey="count" nameKey="name" innerRadius={45} outerRadius={61} stroke="var(--color-card)" strokeWidth={4} paddingAngle={3}>{difficultyData.map((entry, index) => <Cell key={entry.name} fill={donutColors[index]} />)}</Pie><Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6 }} /></PieChart></ResponsiveContainer><div className="donut-center"><b>{solved.length}</b><span>solved</span></div></div><div className="difficulty-legend">{difficultyData.map((entry, index) => <div key={entry.name}><i style={{ background: donutColors[index] }} /><span>{entry.name}</span><b>{entry.count}</b></div>)}</div></div></section>
      <section className="surface-panel chart-panel activity-chart-panel"><PanelTitle title="Weekly study activity" trailing={`${streak.totalDays} active days`} /><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><BarChart data={lastWeeks} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 5" /><XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} /><YAxis allowDecimals={false} domain={[0, 7]} tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} /><Tooltip formatter={(value) => [`${value} study days`, "This week"]} labelFormatter={(label, items) => items[0]?.payload.label ?? label} contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6 }} /><Bar dataKey="days" name="Study days" fill="var(--color-info)" radius={[4, 4, 0, 0]} maxBarSize={30} /></BarChart></ResponsiveContainer></div><div className="chart-caption"><span><i className="legend-dot activity-dot" /> Days studied</span><span>Out of 7 days</span></div></section>
      <section className="surface-panel consistency-chart-panel"><PanelTitle title="Consistency" /><div className="consistency-ring"><div><Flame size={17} /><b>{streak.current}</b><span>day streak</span></div><svg viewBox="0 0 140 140" role="img" aria-label="Current streak progress"><circle cx="70" cy="70" r="57" className="ring-track" /><circle cx="70" cy="70" r="57" className="ring-progress" style={{ strokeDashoffset: `${358 - (streak.current % 7 || (streak.current ? 7 : 0)) / 7 * 358}px` }} /></svg></div><div className="consistency-records"><span><Trophy size={14} /> Longest streak <b>{streak.longest} days</b></span><span><CalendarClock size={14} /> Total study days <b>{streak.totalDays}</b></span></div></section>
    </div>
    <section className="surface-panel analytics-topics"><PanelTitle title="Topic progress" trailing="View DSA Sheet" href="/roadmap" /><div className="analytics-topic-grid">{topics.map((topic) => <div className="analytics-topic" key={topic.id}><div><b>{topic.title}</b><span>{topic.done}/{topic.total} problems</span></div><ProgressBar value={topic.percent} /><small>{topic.percent}%</small></div>)}</div></section>
    <section className="surface-panel heatmap-panel"><PanelTitle title="Activity across the year" trailing={`${activity.size} active days`} /><Heatmap sessions={data.sessions} today={today} /><div className="heatmap-footer"><span>Each mark is a day you practiced</span><span>Less <HeatScale /> More</span></div></section>
    <section className="surface-panel recent-activity-panel"><PanelTitle title="Recent activity" trailing="Your last study days" /><div className="activity-list">{lastActivityDays.map(([date, count]) => <div key={date} className="activity-list-row"><span className="activity-calendar"><CalendarClock size={15} /></span><span><b>{titleCaseDate(date)}</b><small>{count} practice {count === 1 ? "activity" : "activities"}</small></span><div className="activity-level">{Array.from({ length: 4 }, (_, i) => <i key={i} className={i < Math.min(4, count) ? "filled" : ""} />)}</div></div>)}</div></section>
    <div className="export-note"><Sparkles size={14} /><span>Your progress is saved in this browser. Export a JSON backup before switching browsers or devices.</span></div>
  </>;
}

function Heatmap({ sessions, today, compact = false }: { sessions: JourneyData["sessions"]; today: string; compact?: boolean }) {
  const activity = activityByDay(sessions);
  const count = compact ? 56 : 364;
  const start = new Date(`${today}T12:00:00`); start.setDate(start.getDate() - count + 1);
  start.setDate(start.getDate() - start.getDay());
  const days = Array.from({ length: compact ? 56 : Math.ceil(count / 7) * 7 }, (_, index) => {
    const date = new Date(start); date.setDate(start.getDate() + index);
    const day = localDate(date); const value = activity.get(day) ?? 0;
    return { day, value, level: value === 0 ? 0 : value <= 1 ? 1 : value <= 2 ? 2 : value <= 3 ? 3 : 4 };
  });
  const months = days.filter((entry, index) => new Date(`${entry.day}T12:00:00`).getDate() === 1 && (index < 7 || index % 7 === 0)).map((entry) => ({ day: entry.day, month: new Date(`${entry.day}T12:00:00`).toLocaleDateString(undefined, { month: "short" }), index: days.indexOf(entry) }));
  return <div className={cn("heatmap-wrap", compact && "compact-heatmap")}><div className="heatmap-months">{months.map((entry, index) => <span key={`${entry.day}-${index}`} style={{ left: `${entry.index / days.length * 100}%` }}>{entry.month}</span>)}</div><div className="heatmap-grid">{days.map((entry) => <span key={entry.day} className="heat-cell" data-level={entry.level} title={`${titleCaseDate(entry.day)} · ${entry.value} ${entry.value === 1 ? "activity" : "activities"}`} aria-label={`${entry.day}: ${entry.value} activities`} />)}</div>{!compact && <div className="heatmap-week-labels"><span>Sun</span><span>Tue</span><span>Thu</span><span>Sat</span></div>}</div>;
}

function HeatScale() {
  return <span className="heat-scale" aria-hidden="true">{[0, 1, 2, 3, 4].map((level) => <i key={level} className="heat-cell" data-level={level} />)}</span>;
}

function ProblemEditor({ open, problem, onOpenChange, onSave }: { open: boolean; problem: DsaProblem | null; onOpenChange: (open: boolean) => void; onSave: (problem: DsaProblem) => void }) {
  const [form, setForm] = useState<Partial<DsaProblem>>({});
  useEffect(() => { setForm(problem ?? { title: "", topic: "", difficulty: "Easy", status: "Not Started", attempts: 0, solvedWithoutHelp: false, confidence: "needed-thinking" }); }, [problem, open]);
  const setField = <K extends keyof DsaProblem>(key: K, value: DsaProblem[K]) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title?.trim() || !form.topic?.trim()) { toast.error("Add a problem name and topic first"); return; }
    const rawStatus = form.status ?? "Not Started";
    const status = rawStatus === "Learning" || rawStatus === "Mastered" ? (rawStatus === "Mastered" ? "Solved" : "Not Started") : rawStatus === "Revise" ? "Needs Revision" : rawStatus;
    const solvedAt = status === "Solved" ? form.solvedAt || localDate() : form.solvedAt || "";
    const confidence = form.confidence ?? "needed-thinking";
    onSave({ ...createEditorDefaults, ...form, id: form.id || `custom-${Date.now().toString(36)}`, title: form.title.trim(), topic: form.topic.trim(), difficulty: form.difficulty ?? "Easy", status, confidence, solvedAt, nextRevisionAt: form.nextRevisionAt || (solvedAt ? revisionDate(solvedAt, confidence) : "") } as DsaProblem);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="editor-dialog"><DialogHeader><span className="dialog-eyebrow"><Code2 size={14} /> PROBLEM DETAILS</span><DialogTitle>{problem ? "Update problem" : "Add a problem"}</DialogTitle><DialogDescription>Keep it light. You can always fill in more details later.</DialogDescription></DialogHeader><form onSubmit={submit} className="problem-editor-form"><div className="form-grid"><FormField label="Problem name" className="wide-field"><Input required autoFocus placeholder="e.g. Two Sum" value={form.title ?? ""} onChange={(event) => setField("title", event.target.value)} /></FormField><FormField label="Topic"><select className="form-select" value={form.topic ?? ""} onChange={(event) => setField("topic", event.target.value)}><option value="">Choose a topic</option>{roadmap.map((item) => <option key={item.id}>{item.title}</option>)}<option>Other</option></select></FormField><FormField label="Difficulty"><select className="form-select" value={form.difficulty ?? "Easy"} onChange={(event) => setField("difficulty", event.target.value as Difficulty)}>{difficultyOptions.map((item) => <option key={item}>{item}</option>)}</select></FormField><FormField label="Status"><select className="form-select" value={form.status ?? "Not Started"} onChange={(event) => setField("status", event.target.value as ProblemStatus)}>{statusOptions.map((item) => <option key={item}>{item}</option>)}</select></FormField><FormField label="Attempts"><Input type="number" min="0" value={form.attempts ?? 0} onChange={(event) => setField("attempts", Number(event.target.value))} /></FormField><FormField label="Problem URL"><Input type="url" placeholder="https://…" value={form.problemUrl ?? ""} onChange={(event) => setField("problemUrl", event.target.value)} /></FormField><FormField label="Editorial / video URL"><Input type="url" placeholder="https://…" value={form.solutionUrl ?? ""} onChange={(event) => setField("solutionUrl", event.target.value)} /></FormField><FormField label="Approach"><Input placeholder="e.g. Hash map" value={form.approach ?? ""} onChange={(event) => setField("approach", event.target.value)} /></FormField><FormField label="Time complexity"><Input placeholder="O(n)" value={form.timeComplexity ?? ""} onChange={(event) => setField("timeComplexity", event.target.value)} /></FormField><FormField label="Space complexity"><Input placeholder="O(n)" value={form.spaceComplexity ?? ""} onChange={(event) => setField("spaceComplexity", event.target.value)} /></FormField><FormField label="How did it feel?" className="wide-field"><select className="form-select" value={form.confidence ?? "needed-thinking"} onChange={(event) => setField("confidence", event.target.value as Confidence)}>{confidenceChoices.map((choice) => <option key={choice.id} value={choice.id}>{choice.emoji} {choice.title} · {choice.days} day review</option>)}</select></FormField><FormField label="Date solved"><Input type="date" value={form.solvedAt ?? ""} onChange={(event) => setField("solvedAt", event.target.value)} /></FormField><FormField label="Last revised"><Input type="date" value={form.lastRevisedAt ?? ""} onChange={(event) => setField("lastRevisedAt", event.target.value)} /></FormField><FormField label="Next revision"><Input type="date" value={form.nextRevisionAt ?? ""} onChange={(event) => setField("nextRevisionAt", event.target.value)} /></FormField><FormField label="Personal notes" className="wide-field"><Textarea rows={3} placeholder="Key insight, edge cases, or something to remember…" value={form.notes ?? ""} onChange={(event) => setField("notes", event.target.value)} /></FormField></div><label className="checkbox-row"><Checkbox checked={form.solvedWithoutHelp ?? false} onCheckedChange={(checked) => setField("solvedWithoutHelp", checked === true)} /><span>I solved this without help</span></label>{problem && (problem.problemUrl || problem.solutionUrl) && <div className="problem-external-links">{problem.problemUrl && <a href={problem.problemUrl} target="_blank" rel="noreferrer">Open problem <ArrowRight size={13} /></a>}{problem.solutionUrl && <a href={problem.solutionUrl} target="_blank" rel="noreferrer">View editorial / video <ArrowRight size={13} /></a>}{problem.videoUrl && problem.videoUrl !== problem.solutionUrl && <a href={problem.videoUrl} target="_blank" rel="noreferrer">Watch video <ArrowRight size={13} /></a>}{problem.alternateUrls?.map((alternative) => <a key={alternative.url} href={alternative.url} target="_blank" rel="noreferrer">Open on {alternative.platform} <ArrowRight size={13} /></a>)}</div>}<DialogFooter><Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit"><Check size={15} />{problem ? "Save changes" : "Add problem"}</Button></DialogFooter></form></DialogContent></Dialog>;
}

const createEditorDefaults: DsaProblem = { id: "", title: "", topic: "", difficulty: "Easy", status: "Not Started", problemUrl: "", solutionUrl: "", attempts: 0, solvedWithoutHelp: false, approach: "", timeComplexity: "", spaceComplexity: "", notes: "", solvedAt: "", lastRevisedAt: "", nextRevisionAt: "", confidence: "needed-thinking" };

function FormField({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <label className={cn("form-field", className)}><span>{label}</span>{children}</label>;
}

function RevisionDialog({ problem, onOpenChange, onRate }: { problem: DsaProblem | null; onOpenChange: (open: boolean) => void; onRate: (confidence: Confidence) => void }) {
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  useEffect(() => { setConfidence(null); }, [problem?.id]);
  return <Dialog open={Boolean(problem)} onOpenChange={onOpenChange}><DialogContent className="confidence-dialog"><DialogHeader><span className="dialog-eyebrow"><RotateCcw size={14} /> REVISION CHECK-IN</span><DialogTitle>How did this problem feel?</DialogTitle><DialogDescription>{problem?.title} <i>·</i> {problem?.topic}</DialogDescription></DialogHeader><div className="confidence-options">{confidenceChoices.map((choice) => <button key={choice.id} type="button" className={cn("confidence-option", confidence === choice.id && "selected")} onClick={() => setConfidence(choice.id)}><span>{choice.emoji}</span><b>{choice.title}</b><small>Next review in {choice.days} {choice.days === 1 ? "day" : "days"}</small></button>)}</div><DialogFooter><Button variant="ghost" onClick={() => onOpenChange(false)}>Not now</Button><Button disabled={!confidence} onClick={() => confidence && onRate(confidence)}><Check size={15} /> Save & schedule</Button></DialogFooter></DialogContent></Dialog>;
}