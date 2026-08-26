import React from 'react';

const STYLES = {
  // Positive states (light purple tint)
  Active: { background: 'rgba(94, 27, 137, 0.10)', color: '#5E1B89' },
  Paid: { background: 'rgba(94, 27, 137, 0.10)', color: '#5E1B89' },

  // Warning / Overdue states (orange)
  Unpaid: { background: 'rgba(244, 81, 44, 0.10)', color: '#F4512C' },
  Overdue: { background: '#F4512C', color: '#FFFFFF' },

  // Blocking / Critical negative states (solid purple)
  Suspended: { background: '#5E1B89', color: '#FFFFFF' },
  Failed: { background: '#5E1B89', color: '#FFFFFF' },

  // Neutral / Pending / Finished states (grey)
  Pending: { background: '#F1F5F9', color: '#64748B' },
  Refunded: { background: '#F1F5F9', color: '#64748B' },
};

export default function StatusPill({ status }) {
  if (!status) return null;

  // Normalize status text (e.g. "active" or "ACTIVE" -> "Active")
  const normalizedKey = status.trim().charAt(0).toUpperCase() + status.trim().slice(1).toLowerCase();
  
  // Default fallback style to grey if style isn't found
  const style = STYLES[normalizedKey] || { background: '#F1F5F9', color: '#64748B' };

  return (
    <span
      className="inline-block font-sans uppercase rounded-[3px] py-[4px] text-[10px] tracking-[1.2px] w-[90px] text-center"
      style={style}
    >
      {status}
    </span>
  );
}
