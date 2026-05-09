// Main app — Codex with horizontal tabs.
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tabStyle": "browser",
  "density": "comfy",
  "showStatusDots": true,
  "showPRPills": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [tabs, setTabs] = useStateApp(INITIAL_TABS);
  const [activeId, setActiveId] = useStateApp(INITIAL_TABS[0]?.id || null);

  // Apply body classes for tab style + density
  useEffectApp(() => {
    document.body.classList.remove("tabs-browser","tabs-pill","tabs-underline");
    document.body.classList.add(`tabs-${tweaks.tabStyle}`);
    document.body.classList.toggle("density-compact", tweaks.density === "compact");
  }, [tweaks.tabStyle, tweaks.density]);

  // ⌘W to close, ⌘T to new
  useEffectApp(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "w") { e.preventDefault(); closeTab(activeId); }
      if ((e.metaKey || e.ctrlKey) && e.key === "t") { e.preventDefault(); newTab(); }
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        const i = tabs.findIndex(t => t.id === activeId);
        if (i >= 0 && tabs[i+1]) setActiveId(tabs[i+1].id);
      }
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        const i = tabs.findIndex(t => t.id === activeId);
        if (i > 0) setActiveId(tabs[i-1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tabs, activeId]);

  function openChat(id, title, projectId, chatObj) {
    if (tabs.some(t => t.id === id)) {
      setActiveId(id);
      return;
    }
    const newTabObj = {
      id,
      title,
      project: projectId,
      status: chatObj?.status || "idle",
      pr: chatObj?.pr || null,
      dirty: false,
    };
    setTabs(prev => [...prev, newTabObj]);
    setActiveId(id);
  }

  function closeTab(id) {
    setTabs(prev => {
      const i = prev.findIndex(t => t.id === id);
      const next = prev.filter(t => t.id !== id);
      if (id === activeId) {
        const fallback = next[i] || next[i-1] || next[0] || null;
        setActiveId(fallback?.id ?? null);
      }
      return next;
    });
  }

  function newTab() {
    const id = "new-" + Date.now();
    const newTabObj = { id, title: "New chat", project: "—", status: "idle", pr: null, dirty: false };
    setTabs(prev => [...prev, newTabObj]);
    setActiveId(id);
  }

  const activeTab = tabs.find(t => t.id === activeId);

  return (
    <>
      <TabBar
        tabs={tabs}
        activeId={activeId}
        onActivate={setActiveId}
        onClose={closeTab}
        onNew={newTab}
        showStatus={tweaks.showStatusDots}
        showPR={tweaks.showPRPills}
      />

      <div className="app">
        <Sidebar openTabIds={tabs.map(t => t.id)} onOpenChat={openChat} />
        <div className="main">
          <div className="chat-col">
            <Toolbar tab={activeTab} />
            {activeTab ? (
              <>
                <ChatStream tab={activeTab} />
                <Composer />
              </>
            ) : (
              <EmptyState onNew={newTab} />
            )}
          </div>
          {activeTab && <BranchPanel tab={activeTab} />}
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tabs" />
        <TweakRadio
          label="Style"
          value={tweaks.tabStyle}
          options={["browser", "pill", "underline"]}
          onChange={(v) => setTweak("tabStyle", v)}
        />
        <TweakRadio
          label="Density"
          value={tweaks.density}
          options={["comfy", "compact"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakToggle
          label="Status dots"
          value={tweaks.showStatusDots}
          onChange={(v) => setTweak("showStatusDots", v)}
        />
        <TweakToggle
          label="PR pills"
          value={tweaks.showPRPills}
          onChange={(v) => setTweak("showPRPills", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
