import React from 'react'
import { SelectInput, TextArea, TextInput } from '../components/FormField'
import { COPYWRITE_CATEGORIES } from '../data/copywrites'

const PRODUCT_TYPES = ['Copywrite', 'Logo', 'Photo']

/**
 * Two-column copywrite form body shared by the Add Pre-made Asset and
 * Asset Details modals — identical fields, different pre-fill and footer.
 */
export default function AssetFormFields({ values, onChange, idPrefix }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
      {/* Left column */}
      <div className="space-y-5">
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
          options={COPYWRITE_CATEGORIES.filter((c) => c !== 'All')}
          value={values.category}
          onChange={set('category')}
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
        <TextInput
          label="Title"
          id={`${idPrefix}-title`}
          value={values.title}
          onChange={set('title')}
        />
        <TextInput
          label="Subtitle"
          id={`${idPrefix}-subtitle`}
          value={values.subtitle}
          onChange={set('subtitle')}
        />
        <TextInput
          label="Number of Words"
          id={`${idPrefix}-words`}
          type="number"
          min="0"
          placeholder="0"
          value={values.numberOfWords}
          onChange={set('numberOfWords')}
        />
      </div>

      {/* Right column */}
      <div className="flex flex-col space-y-5">
        <TextArea
          label="Short Description"
          id={`${idPrefix}-short-description`}
          rows={4}
          value={values.shortDescription}
          onChange={set('shortDescription')}
        />
        <TextArea
          label="Website Text"
          id={`${idPrefix}-website-text`}
          rows={12}
          className="flex-1"
          value={values.websiteText}
          onChange={set('websiteText')}
        />
      </div>
    </div>
  )
}

export { PRODUCT_TYPES }
