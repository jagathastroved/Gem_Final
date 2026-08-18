import React, { useState, useEffect, useRef } from 'react';
import '../../styles/ui/SearchableDropdown.css';

export function SearchableDropdown({
  value,
  onChange,
  options = [],
  fetchOptions = null,
  placeholder = "Search...",
  disabled = false,
  openUpwards = false,
  renderItem = null,
  emptyMessage = "No results found",
  minSearchLength = 0,
  disableTyping = false
}) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [internalOptions, setInternalOptions] = useState(options);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    if (!fetchOptions) {
      setInternalOptions(options);
    }
  }, [options, fetchOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      setTimeout(() => {
        const activeEl = dropdownRef.current.querySelector('.active');
        if (activeEl) {
          activeEl.scrollIntoView({ block: 'nearest' });
        }
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!fetchOptions || !isOpen) return;

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await fetchOptions(query);
        setInternalOptions(results || []);
      } catch (error) {
        console.error("Failed to fetch options", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, fetchOptions, isOpen]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);

    if (!fetchOptions) {
      const filtered = options.filter(opt => {
        const text = typeof opt === 'string' ? opt : opt.title;
        return text.toLowerCase().includes(val.toLowerCase());
      });
      setInternalOptions(filtered);
    }
  };

  const handleSelect = (option) => {
    const text = typeof option === 'string' ? option : option.title;
    setQuery(text);
    setIsOpen(false);
    onChange(text, option);
  };

  return (
    <div className="searchable-dropdown-container" ref={dropdownRef}>
      <input
        type="text"
        className="searchable-dropdown-input"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        readOnly={disableTyping}
        style={{ cursor: disableTyping ? 'pointer' : 'text' }}
        onFocus={() => {
          setIsOpen(true);
          if (!fetchOptions) setInternalOptions(options);
        }}
        disabled={disabled}
      />

      {isOpen && (
        <ul className={`searchable-dropdown-menu ${openUpwards ? 'searchable-dropdown-up' : ''}`}>
          {loading ? (
            <li className="searchable-dropdown-empty" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
              <style>
                {`
                  @keyframes dropdown-spin {
                    to { transform: rotate(360deg); }
                  }
                `}
              </style>
              <div style={{ animation: 'dropdown-spin 1s linear infinite', width: '16px', height: '16px', border: '2px solid #e5e7eb', borderTopColor: '#8b5cf6', borderRadius: '50%', flexShrink: 0 }}></div>
              Searching for "{query}"...
            </li>
          ) : internalOptions.length > 0 ? (
            internalOptions.map((opt, idx) => (
              <li
                key={idx}
                className={`searchable-dropdown-item ${(typeof opt === 'string' ? opt : opt.title) === value ? 'active' : ''
                  }`}
                onClick={() => handleSelect(opt)}
              >
                {renderItem ? renderItem(opt) : (
                  <span className="searchable-item-title">
                    {typeof opt === 'string' ? opt : opt.title}
                  </span>
                )}
              </li>
            ))
          ) : (fetchOptions && query.trim().length < minSearchLength) ? (
            <li className="searchable-dropdown-empty" style={{ textAlign: 'center', color: '#6b7280' }}>
              {query.trim().length === 0 ? "Type to search..." : "Keep typing..."}
            </li>
          ) : (
            <li className="searchable-dropdown-empty" style={{ textAlign: 'center', color: '#6b7280' }}>
              {emptyMessage}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
