import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import LogoFormFields from './LogoFormFields'

const EMPTY_LOGO = {
  productType: 'Logo',
  category: 'Main Banner',
  price: '',
  title: '',
  width: '',
  height: '',
  shortDescription: '',
  imageUrl: '',
}

export default function AddPremadeLogoModal({ open, onClose, onSubmit }) {
  const [values, setValues] = useState(EMPTY_LOGO)

  useEffect(() => {
    if (open) setValues(EMPTY_LOGO)
  }, [open])

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Pre-made Asset"
      footer={
        <button
          type="submit"
          form="add-premade-logo-form"
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Submit
        </button>
      }
    >
      <form id="add-premade-logo-form" onSubmit={handleSubmit}>
        <LogoFormFields values={values} onChange={handleChange} idPrefix="add-premade-logo" />
      </form>
    </Modal>
  )
}
