import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Download, RotateCcw, PanelLeftClose, PanelLeft, Sun, Moon } from 'lucide-react';
import '../../styles/report/ReportSidebar.css';

export function ReportSidebar({
  sections,
  activeSectionIndex,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  // onDownloadReport,
  isDarkMode,
  toggleTheme
}) {
  const navigate = useNavigate();

  const handleEnterDifferentDetails = () => {
    navigate('/');
  };

  if (collapsed) {
    return (
      <button
        className="floating-show-index-btn"
        onClick={onToggleCollapse}
      >
        <BookOpen className="show-index-btn-icon" />
        <span>Show Index</span>
      </button>
    );
  }

  return (
    <>
      {!collapsed && (
        <div
          className="sidebar-backdrop"
          onClick={onToggleCollapse}
          aria-hidden="true"
        />
      )}
      <aside className="report-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <div className="book-icon-badge">
              <BookOpen className="sidebar-book-icon" />
            </div>
            <span className="sidebar-title-text">REPORT INDEX</span>
          </div>

          <div className="sidebar-header-actions">
            <button
              className="theme-toggle-switch-btn"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              <div className={`switch-knob ${isDarkMode ? 'dark' : 'light'}`}>
                {isDarkMode ? <Moon className="theme-icon moon" /> : <Sun className="theme-icon sun" />}
              </div>
            </button>

            <button
              className="collapse-toggle-btn"
              onClick={onToggleCollapse}
              title="Collapse Index"
              aria-label="Toggle Sidebar"
            >
              <PanelLeftClose className="panel-icon" />
            </button>
          </div>
        </div>

        <nav className="sidebar-index-list">
          {sections.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={sec.id}
                className={`sidebar-index-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(idx)}
              >
                <span className="index-number-badge">{idx + 1}</span>
                <div className="index-item-info">
                  <span className="index-item-title">{sec.title}</span>
                  {sec.isPro && <span className="pro-pill-badge">PRO</span>}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-actions-footer">
          {/* <button 
          className="sidebar-btn-download"
          onClick={onDownloadReport}
        >
          <Download className="btn-icon" />
          <span>DOWNLOAD REPORT</span>
        </button> */}

          <button
            className="sidebar-btn-reset"
            onClick={handleEnterDifferentDetails}
          >
            <RotateCcw className="btn-icon" />
            <span>ENTER DIFFERENT DETAILS</span>
          </button>
        </div>
      </aside>
    </>
  );
}
