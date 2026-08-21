import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { ColorInputList, Field, SelectInput, TextArea, TextInput, controlStyles } from '../components/FormField'
import { PAYMENT_STATUSES } from '../data/copywrites'
import logoPng from '../assets_photos/logo.png'

const EMPTY_REQUEST = {
  orderedBy: '',
  orderDate: '',
  photoType: 'Banner',
  colors: ['#FFFFFF'],
  photoSubject: '',
  description: '',
  additionalPreferences: '',
  meetingDate: '',
  meetingTime: '',
  orderOutputUrl: '',
  priceAtPurchase: '',
  paymentStatus: 'Unpaid',
  dateDelivered: '',
}

export default function AddCustomPhotoRequestModal({ open, onClose, onSubmit }) {
  const [values, setValues] = useState(EMPTY_REQUEST)

  useEffect(() => {
    if (open) setValues(EMPTY_REQUEST)
  }, [open])

  const set = (key) => (e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Custom Request"
      footer={
        <button
          type="submit"
          form="add-custom-photo-request-form"
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Submit
        </button>
      }
    >
      <form id="add-custom-photo-request-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          <div className="space-y-4">
            <TextInput
              label="Ordered By:"
              id="add-custom-photo-ordered-by"
              placeholder="Lawfirm name"
              required
              value={values.orderedBy}
              onChange={set('orderedBy')}
            />
            <TextInput
              label="Order Date:"
              id="add-custom-photo-order-date"
              type="date"
              required
              value={values.orderDate}
              onChange={set('orderDate')}
            />
            <TextInput
              label="Photo Type:"
              id="add-custom-photo-type"
              value={values.photoType}
              onChange={set('photoType')}
            />
            <ColorInputList
              label="Colors:"
              id="add-custom-photo-colors"
              colors={values.colors}
              onChange={(newColors) => setValues((prev) => ({ ...prev, colors: newColors }))}
            />
            <TextInput
              label="Photo Subject:"
              id="add-custom-photo-subject"
              value={values.photoSubject}
              onChange={set('photoSubject')}
            />
            <TextArea
              label="Description:"
              id="add-custom-photo-description"
              rows={2}
              value={values.description}
              onChange={set('description')}
            />
            <TextInput
              label="Additional Preferences:"
              id="add-custom-photo-preferences"
              value={values.additionalPreferences}
              onChange={set('additionalPreferences')}
            />
            <Field label="Meeting Conducted:" htmlFor="add-custom-photo-meeting-date">
              <div className="grid grid-cols-2 gap-3">
                <input
                  id="add-custom-photo-meeting-date"
                  type="date"
                  aria-label="Meeting date"
                  value={values.meetingDate}
                  onChange={set('meetingDate')}
                  className={controlStyles}
                />
                <input
                  id="add-custom-photo-meeting-time"
                  type="time"
                  aria-label="Meeting time"
                  value={values.meetingTime}
                  onChange={set('meetingTime')}
                  className={controlStyles}
                />
              </div>
            </Field>
          </div>

          <div className="space-y-4">
            <Field label="Order Output:">
              <div className="flex items-center gap-4">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {values.orderOutputUrl ? (
                    <img src={values.orderOutputUrl} alt="Output" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">logo</span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-xs font-semibold text-brand-purple">
                    Reminder:<br />
                    Upload output with high definition "jpeg" or "png" format.
                  </p>
                  <div className="relative overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
                    <input
                      type="file"
                      className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setValues((prev) => ({ ...prev, orderOutputUrl: logoPng }))
                        }
                      }}
                    />
                    <div className="flex items-center">
                      <div className="rounded-l-lg border-r border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                        Choose File
                      </div>
                      <div className="flex-1 px-3 py-1.5 text-sm text-slate-500">
                        {values.orderOutputUrl ? 'File chosen' : 'No file chosen'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Field>
            
            <TextInput
              label="Price at Purchase:"
              id="add-custom-photo-price"
              type="number"
              min="0"
              placeholder="0"
              suffix="php"
              required
              value={values.priceAtPurchase}
              onChange={set('priceAtPurchase')}
            />
            <SelectInput
              label="Status:"
              id="add-custom-photo-payment-status"
              options={PAYMENT_STATUSES}
              value={values.paymentStatus}
              onChange={set('paymentStatus')}
            />
            <TextInput
              label="Date Delivered:"
              id="add-custom-photo-date-delivered"
              type="date"
              value={values.dateDelivered}
              onChange={set('dateDelivered')}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
