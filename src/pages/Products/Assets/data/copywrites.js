// Mock Copywrite Assets — replace with API data once the assets endpoint is live.

export const COPYWRITE_CATEGORIES = [
  'All',
  'Court house',
  'Scale',
  'Gavel',
  'Books',
  'Pen',
  'Others',
]

export const COPYWRITE_STATUSES = ['All', 'Published', 'Draft', 'Archived']

// Categories used inside the Add / Details modals (content slot on the website)
export const COPYWRITE_SLOTS = [
  'Main Banner',
  'Hero Subtext',
  'About Us',
  'Practice Areas',
  'Call To Action',
  'Footer Tagline',
]

// Kinds of copy a law firm can request in a custom order
export const COPYWRITE_TEXT_TYPES = [
  'Tagline',
  'Headline',
  'Body Copy',
  'Call To Action',
  'About Us',
]

export const PAYMENT_STATUSES = ['Paid', 'Unpaid', 'Refunded']

const PREVIEW_TEXT = 'Legal Help In A Click'
const SHORT_DESC = 'Copywrite headline set for homepage hero, positions the firm as fast and accessible.'

// 12 pre-made copywrites — 8 per page across 2 grid rows
export const PREMADE_COPYWRITES = Array.from({ length: 12 }, (_, i) => ({
  id: `cw-pre-${i + 1}`,
  kind: 'premade',
  previewText: PREVIEW_TEXT,
  title: PREVIEW_TEXT,
  subtitle: '',
  shortDescription: SHORT_DESC,
  websiteText: PREVIEW_TEXT,
  productType: 'Copywrite',
  slot: COPYWRITE_SLOTS[i % COPYWRITE_SLOTS.length],
  category: COPYWRITE_CATEGORIES[(i % (COPYWRITE_CATEGORIES.length - 1)) + 1],
  price: 1000,
  numberOfWords: 5,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 4 === 3 ? 'Draft' : 'Published',
}))

// 8 custom copywrite requests ordered by law firms
export const CUSTOM_COPYWRITES = Array.from({ length: 8 }, (_, i) => ({
  id: `cw-cus-${i + 1}`,
  kind: 'custom',
  previewText: PREVIEW_TEXT,
  title: PREVIEW_TEXT,
  shortDescription: SHORT_DESC,
  category: COPYWRITE_CATEGORIES[(i % (COPYWRITE_CATEGORIES.length - 1)) + 1],
  price: 1000,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 3 === 2 ? 'Draft' : 'Published',
  // Custom request specific fields
  orderedBy: 'Bautista Lawfirm Office',
  orderDate: '01-02-2024',
  textType: 'Tagline',
  themeOfText: '',
  description: '',
  additionalPreferences: '',
  meetingDate: '',
  meetingTime: '',
  orderOutput: 'We believe in building lasting relationships with our clients',
  priceAtPurchase: 2000,
  paymentStatus: 'Paid',
  dateDelivered: '01-12-2024',
}))
