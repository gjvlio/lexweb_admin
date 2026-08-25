// LexWeb Admin — Reports data
// The "Year" series is the one drawn in the Figma frame (Jan–Dec 2026).
// Day / Week / Month are placeholder series so the range buttons are live.

export const reportRanges = ['Day', 'Week', 'Month', 'Year']

export const todaysRevenue = {
  total: '₱12.4K',
  caption: 'TODAY',
  segments: [
    { label: 'One-time', value: '₱8.1K', amount: 8.1, color: '#F4512C' },
    { label: 'Subscriptions', value: '₱4.3K', amount: 4.3, color: '#5E1B89' },
  ],
}

export const reportSummary = [
  {
    label: 'TRANSACTIONS TODAY',
    value: '128',
    note: '+14 vs. yesterday',
    accent: 'ink',
  },
  {
    label: 'ACTIVE SUBSCRIPTIONS',
    value: '11,067',
    note: '92% retained this quarter',
    accent: 'purple',
  },
  {
    label: 'EXPECTED RECURRING MONTHLY',
    value: '₱2.14M',
    note: 'from active subscriptions',
    accent: 'orange',
  },
]

export const revenueSeries = {
  Day: {
    subtitle: 'PHP THOUSANDS · TODAY',
    axisMax: 10,
    tickStep: 1,
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    oneTime: [0.6, 0.9, 1.8, 4.2, 5.6, 6.8, 4.4, 2.1],
    subscriptions: [0.4, 0.7, 1.2, 2.9, 3.8, 5.1, 3.3, 1.6],
  },
  Week: {
    subtitle: 'PHP THOUSANDS · THIS WEEK',
    axisMax: 20,
    tickStep: 2,
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    oneTime: [6, 8, 7.5, 11, 9, 5, 4],
    subscriptions: [5, 9, 12, 10, 14, 7, 6],
  },
  Month: {
    subtitle: 'PHP THOUSANDS · THIS MONTH',
    axisMax: 50,
    tickStep: 5,
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    oneTime: [22, 31, 27, 35],
    subscriptions: [18, 29, 38, 33],
  },
  Year: {
    subtitle: 'PHP THOUSANDS · JAN–DEC 2026',
    axisMax: 100,
    tickStep: 10,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    oneTime: [42.5, 50, 54, 68, 60, 65, 61, 54, 72.5, 45, 59.5, 70.5],
    subscriptions: [31, 40.5, 65, 82, 37, 70.5, 93, 67, 91, 82, 91, 52],
  },
}

export const seriesLegend = [
  { key: 'oneTime', label: 'One-time purchases', color: '#F4512C' },
  { key: 'subscriptions', label: 'Subscriptions', color: '#5E1B89' },
]
