import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import StatusSelect from '../components/StatusSelect'
import LogoFormFields from './LogoFormFields'

const toFormValues = (logo) => ({
  productType: logo?.productType || 'Logo',
  category: logo?.category || 'Scale',
  price: logo?.price ?? '',
  title: logo?.title || '',
  width: logo?.width ?? '',
  height: logo?.height ?? '',
  shortDescription: logo?.shortDescription || '',
  imageUrl: logo?.imageUrl || '',
})

export default function LogoDetailsModal({ open, logo, onClose, onSubmit, onDelete }) {
  const [values, setValues] = useState(() => toFormValues(logo))
  const [status, setStatus] = useState(logo?.status || 'Published')

  useEffect(() => {
    if (!open || !logo) return
    setValues(toFormValues(logo))
    setStatus(logo.status || 'Published')
  }, [open, logo])

  if (!logo) return null

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...logo, ...values, status })
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
            onClick={() => onDelete(logo)}
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            type="submit"
            form="logo-details-form"
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Submit
          </button>
        </>
      }
    >
      <form id="logo-details-form" onSubmit={handleSubmit}>
        <LogoFormFields values={values} onChange={handleChange} idPrefix="logo-details" />
      </form>
    </Modal>
  )
}
