import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import StatusSelect from '../components/StatusSelect'
import { Field, TextArea, TextInput, controlStyles } from '../components/FormField'
import { COPYWRITE_TEXT_TYPES } from '../data/copywrites'

const toFormValues = (request) => ({
  orderedBy: request?.orderedBy || '',
  orderDate: request?.orderDate || '',
  textType: request?.textType || 'Tagline',
  themeOfText: request?.themeOfText || '',
  description: request?.description || '',
  additionalPreferences: request?.additionalPreferences || '',
  meetingDate: request?.meetingDate || '',
  meetingTime: request?.meetingTime || '',
})

export default function CustomRequestDetailsModal({ open, request, onClose, onDelete }) {
  const [values, setValues] = useState(() => toFormValues(request))
  const [status, setStatus] = useState(request?.status || 'Published')

  useEffect(() => {
    if (!open || !request) return
    setValues(toFormValues(request))
    setStatus(request.status || 'Published')
  }, [open, request])

  if (!request) return null

  const set = (key) => (e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))
  const isPaid = request.paymentStatus === 'Paid'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Custom Request Details:"
      headerAccessory={<StatusSelect value={status} onChange={setStatus} />}
      footer={
        <button
          type="button"
          onClick={() => onDelete(request)}
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Delete
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
        {/* Left column — the request as the law firm submitted it */}
        <div className="space-y-4">
          <TextInput
            label="Ordered By:"
            id="custom-ordered-by"
            value={values.orderedBy}
            onChange={set('orderedBy')}
            readOnly
          />
          <TextInput
            label="Order Date:"
            id="custom-order-date"
            value={values.orderDate}
            onChange={set('orderDate')}
            readOnly
          />
          <TextInput
            label="Text Type:"
            id="custom-text-type"
            list="custom-text-types"
            value={values.textType}
            onChange={set('textType')}
          />
          <datalist id="custom-text-types">
            {COPYWRITE_TEXT_TYPES.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
          <TextInput
            label="Theme of Text:"
            id="custom-theme"
            value={values.themeOfText}
            onChange={set('themeOfText')}
          />
          <TextArea
            label="Description:"
            id="custom-description"
            rows={3}
            value={values.description}
            onChange={set('description')}
          />
          <TextInput
            label="Additional Preferences:"
            id="custom-preferences"
            value={values.additionalPreferences}
            onChange={set('additionalPreferences')}
          />

          <Field label="Meeting Conducted:" htmlFor="custom-meeting-date">
            <div className="grid grid-cols-2 gap-3">
              <input
                id="custom-meeting-date"
                type="date"
                aria-label="Meeting date"
                value={values.meetingDate}
                onChange={set('meetingDate')}
                className={controlStyles}
              />
              <input
                id="custom-meeting-time"
                type="time"
                aria-label="Meeting time"
                value={values.meetingTime}
                onChange={set('meetingTime')}
                className={controlStyles}
              />
            </div>
          </Field>
        </div>

        {/* Right column — delivered output and payment record */}
        <div className="space-y-4">
          <Field label="Order Output:">
            <div className="min-h-[280px] rounded-lg border border-slate-300 bg-white p-5">
              <p className="font-heading text-2xl leading-snug text-slate-800">
                {request.orderOutput}
              </p>
            </div>
          </Field>

          <TextInput
            label="Price at Purchase:"
            id="custom-price"
            value={Number(request.priceAtPurchase).toLocaleString()}
            suffix="php"
            readOnly
          />

          <Field label="Status:">
            <div className="rounded-lg border border-[#CAC8C9] bg-[#E6E4E6] px-3.5 py-2.5">
              <span className={`text-sm font-semibold ${isPaid ? 'text-[#4FB94A]' : 'text-brand-orange'}`}>
                {request.paymentStatus}
              </span>
            </div>
          </Field>

          <TextInput
            label="Date Delivered:"
            id="custom-date-delivered"
            value={request.dateDelivered}
            readOnly
          />
        </div>
      </div>
    </Modal>
  )
}
