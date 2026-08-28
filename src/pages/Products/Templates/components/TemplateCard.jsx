import React from 'react'

export default function TemplateCard({ template, onView }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-brand-purple">Template Name:</span>
      </div>
      <div className="mb-3 rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] px-3.5 py-2 text-sm text-black">
        {template.name}
      </div>

      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-brand-purple">Price</span>
      </div>
      <div className="mb-4 rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] px-3.5 py-2 text-sm text-black">
        ₱{Number(String(template.price).replace(/,/g, '')).toLocaleString()}
      </div>

      <div className="mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={template.previewImage}
          alt={`${template.name} template preview`}
          className="h-full w-full object-cover object-top"
        />
      </div>

      <button
        type="button"
        onClick={() => onView(template)}
        className="rounded-lg bg-brand-orange px-6 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-1"
      >
        View
      </button>
    </div>
  )
}
