import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import StatusSelect from '../components/StatusSelect'
import AssetFormFields from './AssetFormFields'

const toFormValues = (asset) => ({
  productType: asset?.productType || 'Copywrite',
  category: asset?.category || 'Main Banner',
  price: asset?.price ?? '',
  title: asset?.title || '',
  subtitle: asset?.subtitle || '',
  numberOfWords: asset?.numberOfWords ?? '',
  shortDescription: asset?.shortDescription || '',
  websiteText: asset?.websiteText || '',
})

export default function AssetDetailsModal({ open, asset, onClose, onSubmit, onDelete }) {
  const [values, setValues] = useState(() => toFormValues(asset))
  const [status, setStatus] = useState(asset?.status || 'Published')

  // Re-hydrate whenever a different asset is opened
  useEffect(() => {
    if (!open || !asset) return
    setValues(toFormValues(asset))
    setStatus(asset.status || 'Published')
  }, [open, asset])

  if (!asset) return null

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...asset, ...values, status })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Asset Details"
      headerAccessory={<StatusSelect value={status} onChange={setStatus} />}
      footer={
        <>
          <button
            type="button"
            onClick={() => onDelete(asset)}
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            type="submit"
            form="asset-details-form"
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Submit
          </button>
        </>
      }
    >
      <form id="asset-details-form" onSubmit={handleSubmit}>
        <AssetFormFields values={values} onChange={handleChange} idPrefix="asset-details" />
      </form>
    </Modal>
  )
}
