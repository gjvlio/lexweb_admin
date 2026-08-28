import React from 'react'
import { Field, FileInput, SelectInput, TextArea, TextInput } from '../components/FormField'
import { LOGO_CATEGORIES } from '../data/logos'

const PRODUCT_TYPES = ['Copywrite', 'Logo', 'Photo']

export default function LogoFormFields({ values, onChange, idPrefix }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
      {/* Left column */}
      <div className="space-y-4">
        <SelectInput
          label="Product Type"
          id={`${idPrefix}-product-type`}
          options={PRODUCT_TYPES}
          value={values.productType}
          onChange={set('productType')}
        />
        <SelectInput
          label="Category"
          id={`${idPrefix}-category`}
          options={LOGO_CATEGORIES.filter((c) => c !== 'All')}
          value={values.category}
          onChange={set('category')}
        />

        <Field label="Photo Preview">
          <div className="flex gap-4">
            <div className="flex aspect-square w-28 items-center justify-center overflow-hidden rounded-xl bg-slate-100 shadow-sm">
              {values.imageUrl ? (
                <img src={values.imageUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-semibold tracking-widest text-slate-400">logo</span>
              )}
            </div>
            <div className="flex-1 text-[11px] leading-tight text-brand-purple text-justify">
              <strong>Reminder:</strong>
              <br />
              You need to upload your "{values.category || 'Main Banner'}" with high definition
              "jpeg" file or "png" file format with transparent background at a size of at least
              917 pixel of width and 641 pixel height.
            </div>
          </div>
        </Field>

        <FileInput
          label="Upload Logo"
          id={`${idPrefix}-upload`}
          accept="image/jpeg, image/png"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              const url = URL.createObjectURL(file)
              onChange('imageUrl', url)
            }
          }}
        />

        <TextInput
          label="Price"
          id={`${idPrefix}-price`}
          type="number"
          min="0"
          placeholder="0"
          value={values.price}
          onChange={set('price')}
        />

        <Field label="Size" htmlFor={`${idPrefix}-width`}>
          <div className="flex items-center gap-3">
            <TextInput
              id={`${idPrefix}-width`}
              type="number"
              placeholder="Width"
              suffix="px"
              value={values.width}
              onChange={set('width')}
              className="flex-1 space-y-0"
            />
            <span className="text-sm font-semibold text-slate-500">x</span>
            <TextInput
              id={`${idPrefix}-height`}
              type="number"
              placeholder="Height"
              suffix="px"
              value={values.height}
              onChange={set('height')}
              className="flex-1 space-y-0"
            />
          </div>
        </Field>
      </div>

      {/* Right column */}
      <div className="flex flex-col space-y-4">
        <TextInput
          label="Title"
          id={`${idPrefix}-title`}
          placeholder="Enter title"
          value={values.title}
          onChange={set('title')}
        />
        <TextArea
          label="Description"
          id={`${idPrefix}-description`}
          rows={12}
          className="flex-1"
          placeholder="Enter description"
          value={values.shortDescription}
          onChange={set('shortDescription')}
        />
      </div>
    </div>
  )
}
