import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { Field, SelectInput, TextArea, TextInput, controlStyles } from '../components/FormField'
import { COPYWRITE_TEXT_TYPES, PAYMENT_STATUSES } from '../data/copywrites'

const EMPTY_REQUEST = {
  orderedBy: '',
  orderDate: '',
  textType: 'Tagline',
  themeOfText: '',
  description: '',
  additionalPreferences: '',
  meetingDate: '',
  meetingTime: '',
  orderOutput: '',
  priceAtPurchase: '',
  paymentStatus: 'Unpaid',
  dateDelivered: '',
}

/**
 * Logs a custom copywrite order on behalf of a law firm. Mirrors the fields of
 * CustomRequestDetailsModal, but every field is editable and starts blank.
 */
export default function AddCustomRequestModal({ open, onClose, onSubmit }) {
  const [values, setValues] = useState(EMPTY_REQUEST)

  // Reset the draft every time the modal is reopened
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
          form="add-custom-request-form"
          className="rounded-lg bg-brand-orange px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-light focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Submit
        </button>
      }
    >
      <form id="add-custom-request-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          {/* Left column — the request as the law firm submitted it */}
          <div className="space-y-4">
            <TextInput
              label="Ordered By:"
              id="add-custom-ordered-by"
              placeholder="Lawfirm name"
              required
              value={values.orderedBy}
              onChange={set('orderedBy')}
            />
            <TextInput
              label="Order Date:"
              id="add-custom-order-date"
              type="date"
              required
              value={values.orderDate}
              onChange={set('orderDate')}
            />
            <TextInput
              label="Text Type:"
              id="add-custom-text-type"
              list="add-custom-text-types"
              value={values.textType}
              onChange={set('textType')}
            />
            <datalist id="add-custom-text-types">
              {COPYWRITE_TEXT_TYPES.map((type) => (
                <option key={type} value={type} />
              ))}
            </datalist>
            <TextInput
              label="Theme of Text:"
              id="add-custom-theme"
              value={values.themeOfText}
              onChange={set('themeOfText')}
            />
            <TextArea
              label="Description:"
              id="add-custom-description"
              rows={3}
              value={values.description}
              onChange={set('description')}
            />
            <TextInput
              label="Additional Preferences:"
              id="add-custom-preferences"
              value={values.additionalPreferences}
              onChange={set('additionalPreferences')}
            />

            <Field label="Meeting Conducted:" htmlFor="add-custom-meeting-date">
              <div className="grid grid-cols-2 gap-3">
                <input
                  id="add-custom-meeting-date"
                  type="date"
                  aria-label="Meeting date"
                  value={values.meetingDate}
                  onChange={set('meetingDate')}
                  className={controlStyles}
                />
                <input
                  id="add-custom-meeting-time"
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
            <TextArea
              label="Order Output:"
              id="add-custom-order-output"
              rows={10}
              placeholder="The copy delivered to the law firm"
              value={values.orderOutput}
              onChange={set('orderOutput')}
            />
            <TextInput
              label="Price at Purchase:"
              id="add-custom-price"
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
              id="add-custom-payment-status"
              options={PAYMENT_STATUSES}
              value={values.paymentStatus}
              onChange={set('paymentStatus')}
            />
            <TextInput
              label="Date Delivered:"
              id="add-custom-date-delivered"
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
