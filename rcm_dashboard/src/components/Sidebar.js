import React, { useRef, useState, useEffect } from 'react';

/* ── SVG icon set (feather-style, 24×24) ─────────────────────── */
const NAV_ICONS = {
  predict: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  simulation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  heatmap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  analytics: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  proof: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { id: 'predict',    label: 'Quick Predict', desc: 'AI denial forecast',  badge: null      },
  { id: 'simulation', label: 'What-If Sim',   desc: 'Scenario engine',    badge: null      },
  { id: 'heatmap',    label: 'Payer Heatmap', desc: 'Risk visualisation', badge: null      },
  { id: 'analytics',  label: 'Analytics',     desc: 'Denial intelligence', badge: 'LIVE'   },
  { id: 'proof',      label: 'ROI & Value',   desc: 'Business impact',    badge: null      },
  { id: 'chat',       label: 'AI Assistant',  desc: 'Ask anything',       badge: 'AI'      },
];

const STATUS_ITEMS = [
  { label: 'API Server',  status: 'Live',    color: '#22C55E' },
  { label: 'ML Model',    status: 'Active',  color: '#22C55E' },
  { label: 'SHAP Engine', status: 'Ready',   color: '#06B6D4' },
  { label: 'Claims DB',   status: '5K Rows', color: '#F59E0B' },
];

/* ── Component ──────────────────────────────────────────────────
   Props:
     activeTab   – current active tab id  (read-only, from App)
     setActiveTab – tab setter             (nav handler, unchanged)
     collapsed   – boolean                (from App state)
     onToggle    – () => void             (from App, flips collapsed)
────────────────────────────────────────────────────────────────── */
export default function Sidebar({ activeTab, setActiveTab, collapsed, onToggle, isMobile }) {
  const W = collapsed ? 72 : 256;

  /* Rail indicator: track each nav button's offsetTop */
  const navRef = useRef(null);
  const btnRefs = useRef({});
  const [railTop, setRailTop] = useState(0);
  const [railH, setRailH]     = useState(46);

  useEffect(() => {
    const el = btnRefs.current[activeTab];
    if (el) {
      setRailTop(el.offsetTop);
      setRailH(el.offsetHeight);
    }
  }, [activeTab, collapsed]);

  return (
    <>
      <style>{`
        /* ── Sidebar container ── */
        .mcg-sidebar {
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        /* ── Animated edge glow (right border) ── */
        .mcg-sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(34,211,238,0.0) 15%,
            rgba(34,211,238,0.55) 40%,
            rgba(34,211,238,0.55) 60%,
            rgba(34,211,238,0.0) 85%,
            transparent 100%
          );
          animation: mcgEdgeScan 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes mcgEdgeScan {
          0%   { background-position: 0 -100%; opacity: 0.4; }
          50%  { opacity: 1; }
          100% { background-position: 0 200%; opacity: 0.4; }
        }

        /* ── Scan-line sweep across sidebar ── */
        .mcg-scanline {
          position: absolute;
          top: -4px;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.18), transparent);
          animation: mcgScanline 6s linear infinite;
          pointer-events: none;
        }
        @keyframes mcgScanline {
          0%   { top: -4px; }
          100% { top: 100%; }
        }

        /* ── Nav button base ── */
        .mcg-nav-btn {
          transition: background 0.22s ease, transform 0.18s ease;
        }
        .mcg-nav-btn:not(.mcg-active):hover {
          background: rgba(34,211,238,0.06) !important;
          transform: translateX(2px);
        }
        .mcg-nav-btn.mcg-active {
          background: rgba(34,211,238,0.08) !important;
        }

        /* ── Icon container ── */
        .mcg-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          flex-shrink: 0;
          transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.2s ease;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          color: #64748B;
        }
        .mcg-nav-btn.mcg-active .mcg-icon-wrap {
          background: rgba(34,211,238,0.14);
          border-color: rgba(34,211,238,0.28);
          color: #22D3EE;
          box-shadow: 0 0 14px rgba(34,211,238,0.35), inset 0 0 8px rgba(34,211,238,0.07);
        }
        .mcg-nav-btn:not(.mcg-active):hover .mcg-icon-wrap {
          background: rgba(34,211,238,0.07);
          border-color: rgba(34,211,238,0.16);
          color: #67E8F9;
          box-shadow: 0 0 10px rgba(34,211,238,0.2);
          transform: scale(1.06);
        }

        /* ── Tooltip (collapsed only) ── */
        .mcg-tip {
          position: absolute;
          left: calc(100% + 14px);
          top: 50%;
          transform: translateY(-50%);
          background: #0A1628;
          border: 1px solid rgba(34,211,238,0.22);
          color: #E2E8F0;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 13px;
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
          transform: translateY(-50%) translateX(-4px);
          z-index: 9999;
          box-shadow: 0 8px 28px rgba(0,0,0,0.6), 0 0 16px rgba(34,211,238,0.06);
        }
        .mcg-tip::before {
          content: '';
          position: absolute;
          left: -5px; top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right: 5px solid rgba(34,211,238,0.22);
          border-left: none;
        }
        .mcg-nav-btn:hover .mcg-tip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* ── Toggle button ── */
        .mcg-toggle {
          transition: all 0.18s ease;
        }
        .mcg-toggle:hover {
          background: rgba(34,211,238,0.1) !important;
          border-color: rgba(34,211,238,0.3) !important;
          box-shadow: 0 0 12px rgba(34,211,238,0.2) !important;
          color: #22D3EE !important;
        }

        /* ── Status dot pulse ── */
        .mcg-pulse { animation: mcgPulse 2.4s ease-in-out infinite; }
        @keyframes mcgPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.45; transform: scale(0.8); }
        }

        /* ── Logo orb glow rotation ── */
        .mcg-orb-ring { animation: mcgOrbRing 6s linear infinite; }
        @keyframes mcgOrbRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Active rail slide ── */
        .mcg-rail {
          position: absolute;
          left: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(180deg, #22D3EE, #3B82F6);
          box-shadow: 0 0 10px #22D3EE, 0 0 4px #22D3EE;
          transition: top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s ease;
          pointer-events: none;
        }
      `}</style>

      <aside
        className="mcg-sidebar"
        style={{
          width: W,
          minHeight: '100vh',
          /* Deep navy base with subtle micro-grid texture */
          background: '#0A1121',
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          zIndex: 100,
          boxShadow: '4px 0 32px rgba(0,0,0,0.7)',
          transform: isMobile && collapsed ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        {/* Animated scan-line */}
        <div className="mcg-scanline" />

        {/* ══ LOGO HEADER ════════════════════════════════════════ */}
        <div style={{
          padding: collapsed ? '20px 0 16px' : '20px 16px 16px',
          borderBottom: '1px solid rgba(34,211,238,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 8,
          flexShrink: 0,
          background: 'rgba(6,182,212,0.02)',
        }}>
          {/* Left: orb + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            {/* Glowing orb */}
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 55%, #6366F1 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 19,
              boxShadow: '0 0 30px rgba(6,182,212,0.55), 0 4px 18px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              🏥
              {/* Spinning outer ring */}
              <div className="mcg-orb-ring" style={{
                position: 'absolute', inset: -3, borderRadius: 15,
                border: '1.5px solid transparent',
                borderTopColor: 'rgba(34,211,238,0.7)',
                borderRightColor: 'rgba(34,211,238,0.2)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Wordmark — hidden when collapsed */}
            {!collapsed && (
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <div style={{ color: '#F1F5F9', fontWeight: 800, fontSize: 14.5, letterSpacing: '-0.5px', lineHeight: 1.15, whiteSpace: 'nowrap' }}>
                  Med-Claim
                </div>
                <div style={{ color: '#22D3EE', fontSize: 9, fontWeight: 700, letterSpacing: '2.8px', textTransform: 'uppercase', marginTop: 3, whiteSpace: 'nowrap', opacity: 0.85 }}>
                  Guardian AI
                </div>
              </div>
            )}
          </div>

          {/* Collapse button (expanded only) */}
          {!collapsed && (
            <button
              className="mcg-toggle"
              onClick={onToggle}
              title="Collapse sidebar"
              style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                color: '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Expand button (collapsed state) */}
        {collapsed && (
          <div style={{ padding: '10px 0 4px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <button
              className="mcg-toggle"
              onClick={onToggle}
              title="Expand sidebar"
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                color: '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}

        {/* ══ NAV SECTION LABEL ══════════════════════════════════ */}
        {!collapsed
          ? <div style={{ padding: '14px 18px 6px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(34,211,238,0.15), transparent)' }} />
              <span style={{ color: '#475569', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Menu</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15))' }} />
            </div>
          : <div style={{ height: 10, flexShrink: 0 }} />
        }

        {/* ══ NAV ITEMS ══════════════════════════════════════════ */}
        <nav ref={navRef} style={{ flex: 1, padding: collapsed ? '0 10px' : '2px 8px', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>

          {/* Sliding active rail */}
          {!collapsed && (
            <div className="mcg-rail" style={{ top: railTop, height: railH }} />
          )}

          {NAV_ITEMS.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                ref={el => { btnRefs.current[item.id] = el; }}
                className={`mcg-nav-btn${isActive ? ' mcg-active' : ''}`}
                onClick={() => { setActiveTab(item.id); if (isMobile && !collapsed) onToggle(); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? 0 : 10,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '11px 0' : '9px 12px 9px 14px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: 3,
                  background: 'transparent',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Icon container */}
                <span className="mcg-icon-wrap">
                  {NAV_ICONS[item.id]}
                </span>

                {/* Label + desc (expanded only) */}
                {!collapsed && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      color: isActive ? '#22D3EE' : '#5E7A96',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                      lineHeight: 1.25,
                      whiteSpace: 'nowrap',
                      letterSpacing: isActive ? '-0.2px' : '0.1px',
                      transition: 'color 0.2s ease',
                    }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#475569', fontSize: 10.5, marginTop: 2, whiteSpace: 'nowrap' }}>
                      {item.desc}
                    </div>
                  </div>
                )}

                {/* Badge (expanded) */}
                {!collapsed && item.badge && (
                  <span style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: item.badge === 'AI'
                      ? 'linear-gradient(90deg,#6366F1,#8B5CF6)'
                      : 'rgba(34,211,238,0.15)',
                    color: item.badge === 'AI' ? '#E0E7FF' : '#22D3EE',
                    border: item.badge === 'AI'
                      ? '1px solid rgba(99,102,241,0.4)'
                      : '1px solid rgba(34,211,238,0.25)',
                    flexShrink: 0,
                  }}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip (collapsed) */}
                {collapsed && <span className="mcg-tip">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* ══ SYSTEM STATUS ══════════════════════════════════════ */}
        {!collapsed ? (
          <div style={{ padding: '12px 16px 10px', borderTop: '1px solid rgba(34,211,238,0.06)', flexShrink: 0, background: 'rgba(6,182,212,0.015)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(34,211,238,0.12), transparent)' }} />
              <span style={{ color: '#1E3A52', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Status</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.12))' }} />
            </div>
            {STATUS_ITEMS.map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#2A4560', fontSize: 11 }}>{s.label}</span>
                <span style={{ color: s.color, fontSize: 10.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span className="mcg-pulse" style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: s.color, display: 'inline-block', boxShadow: `0 0 6px ${s.color}` }} />
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '12px 0 8px', borderTop: '1px solid rgba(34,211,238,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            {STATUS_ITEMS.map(s => (
              <div key={s.label} title={`${s.label}: ${s.status}`} className="mcg-pulse"
                style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }}
              />
            ))}
          </div>
        )}

        {/* ══ VERSION BADGE ══════════════════════════════════════ */}
        <div style={{ padding: collapsed ? '8px 0 18px' : '8px 14px 18px', borderTop: '1px solid rgba(34,211,238,0.05)', textAlign: 'center', flexShrink: 0 }}>
          {collapsed ? (
            <div title="GlitchCon 2.0 · Team HEIST" style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: 17 }}>🏆</span>
            </div>
          ) : (
            <div style={{
              padding: '9px 12px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.05) 100%)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 10,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />
              <div style={{ color: '#6366F1', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.3px' }}>GlitchCon 2.0 · VIT Chennai</div>
              <div style={{ color: '#1C3040', fontSize: 9.5, marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 4px #22C55E' }} />
                Team HEIST · v1.0.0
              </div>
            </div>
          )}
        </div>

      </aside>
    </>
  );
}
