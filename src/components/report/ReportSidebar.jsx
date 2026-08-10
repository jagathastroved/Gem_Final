import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Download, RotateCcw, PanelLeftClose, PanelLeft } from 'lucide-react';
import '../../styles/components/ReportSidebar.css';

export function ReportSidebar({ 
  sections, 
  activeSectionIndex, 
  onSelectSection, 
  collapsed, 
  onToggleCollapse,
  onDownloadReport 
}) {
  const navigate = useNavigate();

  const handleEnterDifferentDetails = () => {
    navigate('/');
  };

  return (
    <aside className={`report-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <div className="book-icon-badge">
            <BookOpen className="sidebar-book-icon" />
          </div>
          {!collapsed && <span className="sidebar-title-text">REPORT INDEX</span>}
        </div>
        <button 
          className="collapse-toggle-btn"
          onClick={onToggleCollapse} 
          title={collapsed ? "Expand Index" : "Collapse Index"}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <PanelLeft className="panel-icon" /> : <PanelLeftClose className="panel-icon" />}
        </button>
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
              {!collapsed && (
                <div className="index-item-info">
                  <span className="index-item-title">{sec.title}</span>
                  {sec.isPro && <span className="pro-pill-badge">PRO</span>}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="sidebar-actions-footer">
          <button 
            className="sidebar-btn-download"
            onClick={onDownloadReport}
          >
            <Download className="btn-icon" />
            <span>DOWNLOAD REPORT</span>
          </button>

          <button 
            className="sidebar-btn-reset"
            onClick={handleEnterDifferentDetails}
          >
            <RotateCcw className="btn-icon" />
            <span>ENTER DIFFERENT DETAILS</span>
          </button>
        </div>
      )}
    </aside>
  );
}
