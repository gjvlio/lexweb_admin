export const LOGO_CATEGORIES = [
  'All',
  'Main Banner',
  'Tagline',
  'Our Team',
  'Our Office',
  'Our Mission',
  'Our Vision',
  'Core Values',
  'Our Promise',
  'About Us (Law Firm)',
  'About Me (Lawyer)',
  'Law Blogs',
  'Others',
]

export const LOGO_STATUSES = ['All', 'Published', 'Draft', 'Archived']
export const PAYMENT_STATUSES = ['Paid', 'Unpaid', 'Refunded']

import logoImg from '../assets_photos/logo.png'
const SAMPLE_LOGO_URL = logoImg
const TITLE = 'Consult Calendar'
const SHORT_DESC = 'Copywrite headline set for homepage hero, positions the firm as fast and accessible.'

export const PREMADE_LOGOS = Array.from({ length: 12 }, (_, i) => ({
  id: `logo-pre-${i + 1}`,
  kind: 'premade',
  title: i === 4 ? 'Legal Help In A Click' : TITLE, // Just to match the screenshot variation
  shortDescription: SHORT_DESC,
  productType: 'Logo',
  category: LOGO_CATEGORIES[(i % (LOGO_CATEGORIES.length - 1)) + 1],
  price: 1000,
  width: 154,
  height: 154,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 4 === 3 ? 'Draft' : 'Published',
  imageUrl: SAMPLE_LOGO_URL,
}))

export const CUSTOM_LOGOS = Array.from({ length: 8 }, (_, i) => ({
  id: `logo-cus-${i + 1}`,
  kind: 'custom',
  title: TITLE,
  shortDescription: SHORT_DESC,
  category: LOGO_CATEGORIES[(i % (LOGO_CATEGORIES.length - 1)) + 1],
  price: 1000,
  date: 'Aug 12, 2026',
  availedBy: 14,
  status: i % 3 === 2 ? 'Draft' : 'Published',
  // Custom request specific fields
  orderedBy: 'Bautista Lawfirm Office',
  orderDate: '01-02-2024',
  kindOfIconObject: 'Banner',
  colors: ['#FFFFFF'],
  container: '',
  description: '',
  additionalPreferences: '',
  meetingDate: '',
  meetingTime: '',
  orderOutputUrl: SAMPLE_LOGO_URL,
  priceAtPurchase: 2000,
  paymentStatus: 'Paid',
  dateDelivered: '01-12-2024',
}))
