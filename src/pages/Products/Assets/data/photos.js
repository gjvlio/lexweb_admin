// Mock Photo Assets — replace with API data once the assets endpoint is live.

export const PHOTO_CATEGORIES = [
  'All',
  'Lawyers',
  'Gavel',
  'Scale',
  'Court',
  'Books',
  'Office',
  'Others',
]

export const PHOTO_STATUSES = ['All', 'Published', 'Draft', 'Archived']
export const PAYMENT_STATUSES = ['Paid', 'Unpaid', 'Refunded']

import photoImage from '../assets_photos/photo.png'
const SAMPLE_IMAGE_URL = photoImage

const TITLE = 'Legal Team Portrait'
const SHORT_DESC = 'Professional group shot of legal staff in a classic office backdrop.'

// 12 pre-made photos
export const PREMADE_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: `photo-pre-${i + 1}`,
  kind: 'premade',
  title: TITLE,
  shortDescription: SHORT_DESC,
  productType: 'Photo',
  category: PHOTO_CATEGORIES[(i % (PHOTO_CATEGORIES.length - 1)) + 1],
  price: 1000,
  width: 1440,
  height: 800,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 4 === 3 ? 'Draft' : 'Published',
  imageUrl: SAMPLE_IMAGE_URL,
}))

// 8 custom photo requests ordered by law firms
export const CUSTOM_PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  id: `photo-cus-${i + 1}`,
  kind: 'custom',
  title: TITLE,
  shortDescription: SHORT_DESC,
  category: PHOTO_CATEGORIES[(i % (PHOTO_CATEGORIES.length - 1)) + 1],
  price: 1000,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 3 === 2 ? 'Draft' : 'Published',
  // Custom request specific fields
  orderedBy: 'Bautista Lawfirm Office',
  orderDate: '01-02-2024',
  photoType: 'Banner',
  colors: ['#FFFFFF'],
  photoSubject: 'Group of Lawyers',
  description: 'Group of Lawyers in an office photoshoot',
  additionalPreferences: '',
  meetingDate: '',
  meetingTime: '',
  orderOutputUrl: SAMPLE_IMAGE_URL,
  priceAtPurchase: 2000,
  paymentStatus: 'Paid',
  dateDelivered: '01-12-2024',
}))
