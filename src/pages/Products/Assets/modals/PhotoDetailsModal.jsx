import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import StatusSelect from '../components/StatusSelect'
import PhotoFormFields from './PhotoFormFields'

const toFormValues = (photo) => ({
  productType: photo?.productType || 'Photo',
  category: photo?.category || 'Main Banner',
  price: photo?.price ?? '',
  title: photo?.title || '',
  width: photo?.width ?? '',
  height: photo?.height ?? '',
  shortDescription: photo?.shortDescription || '',
  imageUrl: photo?.imageUrl || '',
})

export default function PhotoDetailsModal({ open, photo, onClose, onSubmit, onDelete }) {
  const [values, setValues] = useState(() => toFormValues(photo))
  const [status, setStatus] = useState(photo?.status || 'Published')

  useEffect(() => {
    if (!open || !photo) return
    setValues(toFormValues(photo))
    setStatus(photo.status || 'Published')
  }, [open, photo])

  if (!photo) return null

  const handleChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...photo, ...values, status })
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
            onClick={() => onDelete(photo)}
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            type="submit"
            form="photo-details-form"
            className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Submit
          </button>
        </>
      }
    >
      <form id="photo-details-form" onSubmit={handleSubmit}>
        <PhotoFormFields values={values} onChange={handleChange} idPrefix="photo-details" />
      </form>
    </Modal>
  )
}
