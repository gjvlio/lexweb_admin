// LexWeb Admin — Websites directory data
// The first 10 records are the exact rows shown in the Figma frame.
// The rest are derived from those seeds so pagination / filtering are testable.

export const TOTAL_SITES = 128

export const websiteSummary = [
  { label: 'LIVE SITES', value: '128', note: '+6 this month', accent: 'ink' },
  { label: 'PENDING BUILD', value: '11', note: 'awaiting template', accent: 'ink' },
  { label: 'OVERDUE PAYMENT', value: '07', note: 'action required', accent: 'orange' },
  { label: 'SUSPENDED', value: '02', note: 'past 30 days', accent: 'ink' },
]

// Widths are percentages, not pixels, so the table always fits the viewport.
// (They add up to 100% and match the Figma proportions at a 1440px canvas.)
export const websiteColumns = [
  { key: 'id', label: 'ID', width: '5.5%' },
  { key: 'domain', label: 'DOMAIN', width: '20%' },
  { key: 'lawfirm', label: 'LAWFIRM', width: '20%' },
  { key: 'plan', label: 'PLAN', width: '9%' },
  { key: 'template', label: 'TEMPLATE', width: '11.5%' },
  { key: 'status', label: 'STATUS', width: '12%' },
  { key: 'payment', label: 'PAYMENT', width: '11.5%' },
  { key: 'action', label: 'ACTION', width: '7%' },
]

export const CHECKBOX_COL_WIDTH = '3.5%'

export const statusFilters = ['All', 'Active', 'Pending', 'Suspended']

// NOTE: the Figma frame shows the control reading "Name — ascending" while the
// rows underneath it run 123 → 132, i.e. ID order. The two can't both be true,
// so the default is ID ascending, which is what the picture actually shows.
export const sortOptions = [
  'ID — ascending',
  'ID — descending',
  'Name — ascending',
  'Name — descending',
]

const seedSites = [
  { id: 123, domain: 'bautista.lexmeet.loc', lawfirm: 'Bautista Lawfirm Office', plan: 'Premium', template: 'Neutral', status: 'Active', payment: 'Overdue' },
  { id: 124, domain: 'delacruz.lexmeet.loc', lawfirm: 'Dela Cruz & Partners', plan: 'Standard', template: 'Ledger', status: 'Active', payment: 'Paid' },
  { id: 125, domain: 'ramos-legal.lexmeet.loc', lawfirm: 'Ramos Legal Group', plan: 'Premium', template: 'Broadsheet', status: 'Active', payment: 'Paid' },
  { id: 126, domain: 'sison.lexmeet.loc', lawfirm: 'Sison Notarial Services', plan: 'Basic', template: 'Neutral', status: 'Pending', payment: 'Paid' },
  { id: 127, domain: 'quintana.lexmeet.loc', lawfirm: 'Quintana Advocacy', plan: 'Standard', template: 'Ledger', status: 'Active', payment: 'Overdue' },
  { id: 128, domain: 'ilagan-co.lexmeet.loc', lawfirm: 'Ilagan & Co.', plan: 'Premium', template: 'Broadsheet', status: 'Suspended', payment: 'Unpaid' },
  { id: 129, domain: 'navarro-law.lexmeet.loc', lawfirm: 'Navarro Law Offices', plan: 'Standard', template: 'Neutral', status: 'Active', payment: 'Paid' },
  { id: 130, domain: 'tolentino.lexmeet.loc', lawfirm: 'Tolentino Legal Aid', plan: 'Basic', template: 'Ledger', status: 'Pending', payment: 'Paid' },
  { id: 131, domain: 'esguerra.lexmeet.loc', lawfirm: 'Esguerra & Villamor', plan: 'Premium', template: 'Broadsheet', status: 'Active', payment: 'Paid' },
  { id: 132, domain: 'mangubat.lexmeet.loc', lawfirm: 'Mangubat Notarial', plan: 'Standard', template: 'Neutral', status: 'Active', payment: 'Overdue' },
]

function buildDirectory() {
  const rows = [...seedSites]
  let nextId = 133
  while (rows.length < TOTAL_SITES) {
    const seed = seedSites[(rows.length - seedSites.length) % seedSites.length]
    const branch = Math.floor((rows.length - seedSites.length) / seedSites.length) + 2
    rows.push({
      ...seed,
      id: nextId++,
      domain: seed.domain.replace('.lexmeet.loc', `-${branch}.lexmeet.loc`),
      lawfirm: `${seed.lawfirm} — Branch ${branch}`,
    })
  }
  return rows
}

export const websites = buildDirectory()

export const PAGE_SIZE = 10
