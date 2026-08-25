import neutralPreview from '../template_photos/neutral.png'
import masculinePreview from '../template_photos/masculine.png'
import femininePreview from '../template_photos/feminine.png'

export const INITIAL_TEMPLATES = [
  {
    id: 't-neutral',
    name: 'Neutral',
    price: '1,000',
    numberOfPages: 5,
    description: 'Neutral template with a balanced, professional palette.',
    previewImage: neutralPreview,
  },
  {
    id: 't-masculine',
    name: 'Masculine',
    price: '1,000',
    numberOfPages: 5,
    description: 'Masculine template with navy as the dominant color.',
    previewImage: masculinePreview,
  },
  {
    id: 't-feminine',
    name: 'Feminine',
    price: '1,000',
    numberOfPages: 5,
    description: 'Feminine template with pink as dominant color.',
    previewImage: femininePreview,
  },
]

export const SORT_FIELDS = ['Name', 'Price']
export const SORT_DIRECTIONS = ['Ascending', 'Descending']