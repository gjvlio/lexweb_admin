import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import StatusSelect from '../components/StatusSelect'
import { ColorInputList, Field, TextArea, TextInput, controlStyles } from '../components/FormField'

const toFormValues = (request) => ({
  orderedBy: request?.orderedBy || '',
  orderDate: request?.orderDate || '',
  kindOfIconObject: request?.kindOfIconObject || 'Banner',
  colors: request?.colors || ['#FFFFFF'],
  container: request?.container || '',
  description: request?.description || '',
  additionalPreferences: request?.additionalPreferences || '',
  meetingDate: request?.meetingDate || '',
  meetingTime: request?.meetingTime || '',
})

export default function CustomLogoRequestDetailsModal({ open, request, onClose, onDelete }) {
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
            id="custom-logo-ordered-by"
            value={values.orderedBy}
            onChange={set('orderedBy')}
            readOnly
          />
          <TextInput
            label="Order Date:"
            id="custom-logo-order-date"
            value={values.orderDate}
            onChange={set('orderDate')}
            readOnly
          />
          <TextInput
            label="Kind of Icon / Object:"
            id="custom-logo-type"
            value={values.kindOfIconObject}
            onChange={set('kindOfIconObject')}
          />
          
          <ColorInputList 
            label="Colors:"
            id="custom-logo-colors"
            colors={values.colors}
            onChange={(newColors) => setValues((prev) => ({ ...prev, colors: newColors }))}
          />

          <TextInput
            label="Container:"
            id="custom-logo-container"
            value={values.container}
            onChange={set('container')}
          />
          <TextArea
            label="Description:"
            id="custom-logo-description"
            rows={2}
            value={values.description}
            onChange={set('description')}
          />
          <TextInput
            label="Additional Preferences:"
            id="custom-logo-preferences"
            value={values.additionalPreferences}
            onChange={set('additionalPreferences')}
          />

          <Field label="Meeting Conducted:" htmlFor="custom-logo-meeting-date">
            <div className="grid grid-cols-2 gap-3">
              <input
                id="custom-logo-meeting-date"
                type="date"
                aria-label="Meeting date"
                value={values.meetingDate}
                onChange={set('meetingDate')}
                className={controlStyles}
              />
              <input
                id="custom-logo-meeting-time"
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
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-300 bg-white p-2">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100 shadow-sm">
                {request.orderOutputUrl ? (
                  <img src={request.orderOutputUrl} alt="Output" className="h-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">
                    Awaiting output
                  </div>
                )}
              </div>
            </div>
          </Field>

          <TextInput
            label="Price at Purchase:"
            id="custom-logo-price"
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
            id="custom-logo-date-delivered"
            value={request.dateDelivered}
            readOnly
          />
        </div>
      </div>
    </Modal>
  )
}
