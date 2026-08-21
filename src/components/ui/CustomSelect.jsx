import React from 'react';

export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  className = '',
  required = false,
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`w-full bg-white text-gray-800 font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer ${className}`}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
