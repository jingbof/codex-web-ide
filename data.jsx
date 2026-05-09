// Mock data for the Codex-with-tabs prototype.

const PROJECTS = [
  {
    id: "platform",
    name: "platform",
    chats: [],
  },
  {
    id: "admin-tools",
    name: "admin-tools",
    chats: [
      { id: "m1", title: "Review PR feedback", time: "1d", status: "done", pr: "#42" },
    ],
  },
  {
    id: "integrations",
    name: "integrations",
    chats: [
      { id: "in1", title: "Debug webhook delivery flow", time: "2d", status: "done" },
      { id: "in2", title: "Retry failed sync jobs", time: "2d", status: "done", branch: true },
      { id: "in3", title: "Refactor auth client", time: "1w", status: "done", branch: true },
      { id: "in4", title: "Verify upstream invariants", time: "1w", status: "done", branch: true },
      { id: "in5", title: "Migrate legacy adapter", time: "1w", status: "done", branch: true },
    ],
  },
  {
    id: "web-app",
    name: "web-app",
    chats: [
      { id: "fx", title: "Add currency rate field", time: "26m", status: "running", branch: true, pr: "#214", active: true },
      { id: "fmc", title: "Multi-currency support", time: "18h", status: "review", branch: true },
      { id: "f06", title: "Address PR comments", time: "18h", status: "done", branch: true },
      { id: "frv", title: "Apply review fixes", time: "18h", status: "done", branch: true },
      { id: "ftx", title: "Update settings sidebar", time: "18h", status: "done", branch: true },
    ],
    showMore: true,
  },
  {
    id: "scratch",
    name: "scratch",
    chats: [],
  },
  {
    id: "api",
    name: "api",
    chats: [
      { id: "bb1", title: "Investigate branch diff", time: "1d", status: "done" },
    ],
  },
  {
    id: "core",
    name: "core",
    chats: [
      { id: "f1", title: "Review PR 318", time: "20h", status: "done", pr: "#318" },
      { id: "f2", title: "Patch failing checks", time: "14h", status: "done" },
      { id: "f3", title: "Fix CI dependency error", time: "16h", status: "error" },
      { id: "f4", title: "Review feature flag rollout", time: "16h", status: "done", branch: true },
      { id: "f5", title: "Audit review screen state", time: "19h", status: "done" },
      { id: "f6", title: "Iterate on dashboard mock", time: "19h", status: "done", branch: true },
      { id: "f7", title: "Polish settings mock", time: "3d", status: "done" },
      { id: "f8", title: "Refine reports mock", time: "19h", status: "done" },
    ],
  },
];

const PINNED = [
  { id: "p1", title: "Optimize summary pipeline", time: "2w", branch: true },
  { id: "p2", title: "Review release lifecycle PR", time: "2w", branch: true },
  { id: "p3", title: "Summarize this week's PRs", time: "2w" },
];

// Initial open tabs — user has multiple chats they're juggling.
const INITIAL_TABS = [
  { id: "fx",  title: "Add currency rate field",    project: "web-app",      status: "running",  pr: "#214", dirty: false },
  { id: "fmc", title: "Multi-currency support",     project: "web-app",      status: "review",   pr: null,   dirty: true  },
  { id: "f3",  title: "Fix CI dependency error",    project: "core",         status: "error",    pr: null,   dirty: false },
  { id: "f1",  title: "Review PR 318",              project: "core",         status: "done",     pr: "#318", dirty: false },
  { id: "in1", title: "Debug webhook delivery",     project: "integrations", status: "idle",     pr: null,   dirty: false },
];

Object.assign(window, { PROJECTS, PINNED, INITIAL_TABS });
