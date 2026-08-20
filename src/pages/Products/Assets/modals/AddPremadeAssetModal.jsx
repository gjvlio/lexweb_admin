import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import AssetFormFields from './AssetFormFields'

const EMPTY_ASSET = {
  productType: 'Copywrite',
  slot: 'Main Banner',
  price: '',
  title: '',
  subtitle: '',
  numberOfWords: '',
  shortDescription: '',
  websiteText: '',
}

export default function AddPremadeAssetModal({ open, onClose, onSubmit }) {
  const [values, setValues] = useState(EMPTY_ASSET)

  // Reset the draft every time the modal is reopened
  useEffect(() => {
    if (open) setValues(EMPTY_ASSET)
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
          form="add-premade-asset-form"
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Submit
        </button>
      }
    >
      <form id="add-premade-asset-form" onSubmit={handleSubmit}>
        <AssetFormFields values={values} onChange={handleChange} idPrefix="add-premade" />
      </form>
    </Modal>
  )
}
