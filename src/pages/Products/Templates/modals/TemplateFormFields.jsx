import React from 'react'
import { TextInput, TextArea, FileInput } from '../../Assets/components/FormField'

const REMINDER_TEXT =
  'You need to upload your screenshot of website design with high definition "jpeg" file or "png" file format with transparent background at a size of at least 500 pixel of width and 500 pixel height.'

export default function TemplateFormFields({ values, onChange, idPrefix, previewSrc, previewFallback }) {
  const set = (key) => (e) => onChange(key, e.target.value)
  const setFile = (key) => (e) => onChange(key, e.target.files?.[0] ?? null)

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <span className="block text-[13px] font-semibold text-slate-800">Template Preview</span>
          <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-lg bg-slate-900">
            {previewSrc ? (
              <img src={previewSrc} alt="Template preview" className="h-full w-full object-cover object-top" />
            ) : (
              previewFallback
            )}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-brand-purple">
          <span className="font-bold">Reminder:</span> {REMINDER_TEXT}
        </p>

        <FileInput
          id={`${idPrefix}-upload`}
          label="Upload Template"
          accept="image/png, image/jpeg"
          onChange={setFile('file')}
        />

        <TextInput
          id={`${idPrefix}-price`}
          label="Price"
          type="number"
          min="0"
          placeholder="0"
          value={values.price}
          onChange={set('price')}
        />
      </div>

      <div className="space-y-4">
        <TextInput
          id={`${idPrefix}-name`}
          label="Template Name:"
          placeholder="Template Name..."
          value={values.name}
          onChange={set('name')}
        />

        <TextArea
          id={`${idPrefix}-description`}
          label="Description"
          rows={7}
          placeholder="Description..."
          value={values.description}
          onChange={set('description')}
        />

        <TextInput
          id={`${idPrefix}-pages`}
          label="Number of Pages"
          type="number"
          min="0"
          placeholder="0"
          value={values.numberOfPages}
          onChange={set('numberOfPages')}
          disabled={idPrefix === 'view-template'}
        />
      </div>
    </div>
  )
}
