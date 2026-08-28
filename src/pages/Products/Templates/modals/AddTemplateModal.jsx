import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import TemplateFormFields from './TemplateFormFields'

const EMPTY_TEMPLATE = {
  name: '',
  description: '',
  price: '',
  numberOfPages: '',
  file: null,
}

export default function AddTemplateModal({ open, onClose, onSubmit }) {
  const [values, setValues] = useState(EMPTY_TEMPLATE)

  // Reset the draft every time the modal is reopened
  useEffect(() => {
    if (open) setValues(EMPTY_TEMPLATE)
  }, [open])

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.name.trim() || !values.file || !values.price) return
    onSubmit(values)
  }

  const previewSrc = values.file ? URL.createObjectURL(values.file) : null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Template"
      footer={
        <button
          type="submit"
          form="add-template-form"
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Submit
        </button>
      }
    >
      <form id="add-template-form" onSubmit={handleSubmit}>
        <TemplateFormFields
          values={values}
          onChange={handleChange}
          idPrefix="add-template"
          previewSrc={previewSrc}
          previewFallback={<span className="font-heading text-3xl italic text-black">preview</span>}
        />
      </form>
    </Modal>
  )
}
