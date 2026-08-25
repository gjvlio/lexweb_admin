import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import TemplateFormFields from './TemplateFormFields'

export default function ViewTemplateModal({ open, template, onClose, onSave, onDelete }) {
  const [values, setValues] = useState(null)

  // Load the selected template's values whenever the modal opens
  useEffect(() => {
    if (open && template) {
      setValues({
        name: template.name || '',
        description: template.description || '',
        price: template.price || '',
        numberOfPages: template.numberOfPages ?? '',
        file: null,
      })
    }
  }, [open, template])

  if (!open || !template || !values) return null

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...template,
      name: values.name,
      description: values.description,
      price: values.price,
      previewImage: values.file ? URL.createObjectURL(values.file) : template.previewImage,
    })
  }

  const previewSrc = values.file ? URL.createObjectURL(values.file) : template.previewImage

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="View Template"
      footer={
        <>
          <button
            type="button"
            onClick={() => onDelete(template)}
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            type="submit"
            form="view-template-form"
            className="rounded-lg bg-brand-purple-soft px-7 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
          >
            Save
          </button>
        </>
      }
    >
      <form id="view-template-form" onSubmit={handleSubmit}>
        <TemplateFormFields
          values={values}
          onChange={handleChange}
          idPrefix="view-template"
          previewSrc={previewSrc}
        />
      </form>
    </Modal>
  )
}
