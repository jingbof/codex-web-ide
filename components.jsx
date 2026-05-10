// UI components for the Codex-with-tabs redesign.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Tab bar ----------
function TabBar({ tabs, activeId, onActivate, onClose, onNew, showStatus, showPR }) {
  const stripRef = useRef(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!stripRef.current) return;
    const el = stripRef.current.querySelector(`[data-tab-id="${activeId}"]`);
    if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  return (
    <div className="tabbar">
      <div className="tab-strip" ref={stripRef}>
        {tabs.map(t => (
          <div
            key={t.id}
            data-tab-id={t.id}
            className={`tab ${t.id === activeId ? "active" : ""} ${t.dirty ? "dirty" : ""}`}
            onClick={() => onActivate(t.id)}
            title={t.title}
          >
            {showStatus && <span className={`status-dot ${t.status}`} />}
            {showPR && t.pr && <span className="pr-pill">{t.pr}</span>}
            <span className="tab-title">{t.title}</span>
            <span
              className="tab-close"
              onClick={(e) => { e.stopPropagation(); onClose(t.id); }}
              title="Close tab (⌘W)"
            >
              <IconX size={12} stroke={2} />
            </span>
          </div>
        ))}
        <div className="tab-newbtn" onClick={onNew} title="New chat (⌘T)">
          <IconPlus size={15} />
        </div>
      </div>

      <div className="tab-overflow">
        <div className="icon-btn" title="History"><IconClock size={14} /></div>
        <div className="icon-btn" title="More tabs"><IconHorizontalDots size={16} /></div>
        <div className="icon-btn" title="Window"><IconLaptop size={14} /></div>
      </div>
    </div>
  );
}

// ---------- Toolbar (under tab strip) ----------
function Toolbar({ tab }) {
  if (!tab) return null;
  return (
    <div className="toolbar">
      <div className="icon-btn" title="Back"><IconArrowLeft size={15} /></div>
      <div className="icon-btn" title="Forward"><IconArrowRight size={15} /></div>
      <div className="breadcrumb">
        <span>{tab.project}</span>
        <span className="sep"><IconChevRight size={12} /></span>
        <span className="crumb-active">{tab.title}</span>
      </div>
      {tab.pr && (
        <span className="branch-chip">
          <IconBranchSm /> feat/currency-rate-field
        </span>
      )}
      <div className="spacer" />
      <div className="pill-btn"><IconShare size={13} /> Share</div>
      <div className="pill-btn primary">
        <IconGithub size={13} /> {tab.pr ? `PR ${tab.pr}` : "Open PR"}
      </div>
      <div className="icon-btn" title="More"><IconHorizontalDots size={16} /></div>
    </div>
  );
}

// ---------- Sidebar ----------
function Sidebar({ openTabIds, onOpenChat }) {
  const [collapsed, setCollapsed] = React.useState({});
  const toggle = (id) => setCollapsed(c => ({ ...c, [id]: !c[id] }));

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sb-item"><span className="sb-icon"><IconEdit size={15} /></span>New chat</div>
        <div className="sb-item"><span className="sb-icon"><IconSearch size={15} /></span>Search</div>
        <div className="sb-item"><span className="sb-icon"><IconPlug size={15} /></span>Plugins</div>
        <div className="sb-item"><span className="sb-icon"><IconBolt size={15} /></span>Automations<span className="sb-badge">1</span></div>
      </div>

      <div className="sb-scroll">
        <div className="sb-section-title">Pinned</div>
        {PINNED.map(c => {
          const isOpen = openTabIds.includes(c.id);
          return (
            <div
              key={c.id}
              className={`sb-chat sb-chat-pinned ${isOpen ? "open-in-tab" : ""}`}
              onClick={() => onOpenChat(c.id, c.title, "pinned")}
            >
              {isOpen && <span className="open-marker" />}
              <span className="sb-icon" style={{color:"#9aa0a8"}}><IconPin size={13} /></span>
              <span className="chat-title">{c.title}</span>
              <span className="chat-meta">{c.branch && <IconBranchSm />}{c.time}</span>
            </div>
          );
        })}

        <div className="sb-section-title">Projects</div>
        <div className="tree">
          {PROJECTS.map(p => {
            const isCollapsed = !!collapsed[p.id];
            const openCount = p.chats.filter(c => openTabIds.includes(c.id)).length;
            return (
              <div key={p.id} className="tree-node">
                <div className="sb-project" onClick={() => toggle(p.id)}>
                  <span className={`proj-chev ${isCollapsed ? "" : "open"}`}>
                    <IconChevRight size={12} />
                  </span>
                  <span className="proj-icon"><IconFolder size={14} /></span>
                  <span className="proj-name">{p.name}</span>
                  {openCount > 0 && <span className="proj-count">{openCount}</span>}
                  <span className="proj-edit" onClick={(e) => e.stopPropagation()}>
                    <IconEdit size={12} />
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="tree-children">
                    {p.chats.length === 0 && (
                      <div className="sb-chat sb-empty-row"><span className="chat-title">No chats</span></div>
                    )}
                    {p.chats.map(c => {
                      const isOpen = openTabIds.includes(c.id);
                      return (
                        <div
                          key={c.id}
                          className={`sb-chat tree-leaf ${isOpen ? "open-in-tab" : ""}`}
                          onClick={() => onOpenChat(c.id, c.title, p.id, c)}
                          title={isOpen ? "Open in tab — click to focus" : "Open in new tab"}
                        >
                          {isOpen && <span className="open-marker" />}
                          <span className="chat-title">{c.title}</span>
                          <span className="chat-meta">
                            {c.branch && <IconBranchSm />}
                            {c.time}
                          </span>
                        </div>
                      );
                    })}
                    {p.showMore && <div className="sb-show-more tree-leaf">Show more</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sb-item"><span className="sb-icon"><IconSettings size={15} /></span>Settings</div>
      </div>
    </div>
  );
}

// ---------- Chat content ----------
function ChatStream({ tab }) {
  return (
    <div className="chat-stream">
      <div className="chat-stream-inner">
        <div className="file-card-stack">
          <div className="file-card">
            <span className="name">src/utils/__tests__/example.test.ts</span>
            <span className="add">+9</span>
            <span className="del">-0</span>
            <span className="chev"><IconChevDown size={14} /></span>
          </div>
          <div className="file-card">
            <span className="name">src/utils/example.ts</span>
            <span className="add">+1</span>
            <span className="del">-0</span>
            <span className="chev"><IconChevDown size={14} /></span>
          </div>
        </div>

        <div className="bubble">
          looks good — go ahead and ship it{"\n"}
          add a short note about the rollout plan in the PR description{"\n"}
          and ping the reviewers when it's ready
        </div>

        <div className="assistant-block">
          <div className="worked-row"><IconChevRight size={14} /> Worked for 40s</div>
          <p>Pushed <code className="inline">feat/currency-rate-field</code> and opened a draft PR:</p>
          <a className="pr-link" href="#" onClick={e=>e.preventDefault()}>
            <IconGithub size={14} /> https://github.com/acme/web-app/pull/214
          </a>
          <p style={{marginTop: 12}}>The PR body now includes a short rollout plan and the reviewers have been pinged.</p>
        </div>

        <div className="bubble">
          double-check the diff one more time before we mark it ready for review — want to make sure nothing slipped through
        </div>

        <div className="assistant-block">
          <div className="worked-row"><IconChevRight size={14} /> Worked for 4m 3s</div>
          <p>Pulled the conflict-resolved branch and reviewed it against the latest <code className="inline">origin/main</code>.</p>
          <p>Found one merge regression in the review step: the conflict resolution left a duplicate payload and the submit path stopped using the shared builder used by the preview flow. Folded the new field back into the shared payload builder so preview and submit now produce the same shape.</p>
          <p><strong>Committed and pushed:</strong></p>
          <p><code className="inline">a1b2c3d Fix preview payload after merge</code></p>
          <p><strong>Verification:</strong></p>
          <ul>
            <li><code className="inline">yarn check-types</code> passed</li>
            <li><code className="inline">yarn test</code> passed for the touched files</li>
            <li><code className="inline">yarn lint</code> passed (only pre-existing unrelated warnings)</li>
            <li><code className="inline">yarn build</code> passed (only pre-existing chunk-size warnings)</li>
            <li>PR checks are currently running on GitHub</li>
          </ul>
          <p style={{marginTop: 14}}>[SUMMARY] Currency rate field after main merge<br/>
          Seams touched: form state, API payload contract, review/preview flow<br/>
          State ownership checks: Pass<br/>
          Blockers: None after fix<br/>
          Concerns: None beyond pre-existing unrelated warnings<br/>
          Verdict: Approve</p>

          <div className="changeset">
            <div className="changeset-header">
              <span style={{color:"var(--fg)"}}>1 file changed</span>
              <div className="actions">
                <span><IconUndo size={13} /> Undo</span>
                <span>Review <IconArrowRight size={11} /></span>
                <span><IconExpand size={13} /></span>
              </div>
            </div>
            <div className="file-card" style={{border:0, background:"transparent"}}>
              <span className="name">src/components/forms/checkout/steps/review-step/index.tsx</span>
              <span className="add">+6</span>
              <span className="del">-29</span>
              <span className="chev"><IconChevDown size={14} /></span>
            </div>
          </div>

          <div className="reaction-row">
            <div className="icon-btn"><IconCopy size={14} /></div>
            <div className="icon-btn"><IconThumbUp size={14} /></div>
            <div className="icon-btn"><IconThumbDown size={14} /></div>
            <div className="icon-btn"><IconShare size={14} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Composer() {
  const [val, setVal] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div className="composer-wrap">
      <div className="composer">
        <textarea
          rows={1}
          placeholder="Ask for follow-up changes"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <div className="composer-toolbar">
          <div className="left">
            <div className="icon-btn"><IconPlus size={16} /></div>
            <div className="chip"><IconSettings size={13} /> Custom <IconChevDown size={12} /></div>
          </div>
          <div className="right">
            <div className="chip"><IconRefresh size={13} /></div>
            <div className={`model-picker ${modelOpen ? "open" : ""}`}>
              <button
                className="model-trigger"
                type="button"
                onClick={() => setModelOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={modelOpen}
              >
                5.5 High <IconChevDown size={12} />
              </button>
              {modelOpen && (
                <div className="model-menu" role="menu">
                  <div className="model-menu-title">Intelligence</div>
                  {["Low", "Medium", "High", "Extra High"].map((level) => (
                    <div
                      key={level}
                      className={`model-menu-row ${level === "High" ? "selected" : ""}`}
                      role="menuitem"
                      onClick={() => setModelOpen(false)}
                    >
                      <span>{level}</span>
                      <span className="row-spacer" />
                      {level === "High" && <IconCheck size={14} stroke={2.1} />}
                    </div>
                  ))}
                  <div className="model-menu-divider" />
                  <div className="model-menu-row" role="menuitem">
                    <span>GPT-5.5</span>
                    <span className="row-spacer" />
                    <IconChevRight size={14} />
                  </div>
                  <div className="model-menu-row" role="menuitem">
                    <span>Speed</span>
                    <span className="row-spacer" />
                    <IconChevRight size={14} />
                  </div>
                </div>
              )}
            </div>
            <div className="icon-btn"><IconMic size={15} /></div>
            <div className="send-btn"><IconArrowUp size={16} stroke={2.4} /></div>
          </div>
        </div>
        <div className="composer-footer">
          <span>
            <IconLaptop size={13} /> Work locally <IconChevDown size={12} />
          </span>
          <span>
            <IconBranchSm /> feat/currency-rate-field <IconChevDown size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

function BranchPanel({ tab }) {
  return (
    <div className="branch-panel">
      <div className="panel-card">
        <h4>Branch details <span className="pin"><IconPin size={13} /></span></h4>
        <div className="panel-row"><span className="ic"><IconCheck size={14} /></span> No changes</div>
        <div className="panel-row"><span className="ic"><IconBranchSm /></span> Git actions</div>
        <div className="panel-row"><span className="ic"><IconRoute size={14} /></span> PR {tab?.pr || "#1607"}</div>
        <div className="panel-row"><span className="ic check"><IconCheck size={14} /></span> Checks successful <IconChevDown size={12} /></div>
      </div>
    </div>
  );
}

function EmptyState({ onNew }) {
  return (
    <div className="empty-state">
      <div className="es-title">No active chats</div>
      <div className="es-sub">
        Open a chat from the sidebar — it'll show up as a tab at the top so you can keep your active work in view. Press <kbd>⌘T</kbd> to start a new chat.
      </div>
      <div className="pill-btn primary" onClick={onNew} style={{cursor:"pointer", padding:"6px 12px"}}>
        <IconPlus size={14} /> New chat
      </div>
    </div>
  );
}

Object.assign(window, { TabBar, Toolbar, Sidebar, ChatStream, Composer, BranchPanel, EmptyState });
