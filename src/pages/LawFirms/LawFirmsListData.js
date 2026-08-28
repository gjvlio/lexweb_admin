export const tokens = {
  purple: '#5E1B89',
  orange: '#F4512C',
  ink: '#000000',
  muted: '#000000',
  faint: '#000000',
  line: '#E6EAF0',
  rule: '#94A3B8',
  bg: '#F8FFFE',
};

export const lawFirmsSummary = [
  { label: 'Total Law Firms', value: '48', note: 'Registered partner firms', accent: 'none' },
  { label: 'Total Visits', value: '142.8k', note: 'Across all websites', accent: 'none' },
  { label: 'Total Sign-ups', value: '3,842', note: 'Converted clients', accent: 'orange' },
  { label: 'Total Revenue', value: '₱2.48M', note: 'Combined platform gross', accent: 'none' },
];

export const statusFilters = ['All', 'Active', 'Pending', 'Suspended'];

export const sortOptions = [
  'Name — ascending',
  'Name — descending',
  'Visits — highest',
  'Revenue — highest',
];

export const PAGE_SIZE = 8;
export const CHECKBOX_COL_WIDTH = '3.5%';

export const lawFirmsColumns = [
  { key: 'id', label: 'ID', width: '5.5%' },
  { key: 'name', label: 'Law Firm', width: '20%' },
  { key: 'owner', label: 'Representative / Owner', width: '16%' },
  { key: 'visits', label: 'Website Visits', width: '10%' },
  { key: 'signups', label: 'Sign-up Clients', width: '10%' },
  { key: 'revenue', label: 'Revenue', width: '10%' },
  { key: 'transactions', label: 'Transactions', width: '10%' },
  { key: 'status', label: 'Status', width: '9%' },
  { key: 'action', label: 'Action', width: '6%' },
];

export const lawFirms = [
  {
    id: 123,
    name: 'Bautista Law Firm Office',
    acronym: 'BLO',
    owner: 'Eddielyn Joy Bautista',
    visits: 45200,
    signups: 1280,
    revenue: '₱850,000',
    transactions: 342,
    status: 'Active',
  },
  {
    id: 124,
    name: 'Valderama & Partners Legal',
    acronym: 'VPL',
    owner: 'Marlon P. Valderama',
    visits: 38400,
    signups: 940,
    revenue: '₱620,000',
    transactions: 215,
    status: 'Active',
  },
  {
    id: 125,
    name: 'Santos-Cruz Defense Associates',
    acronym: 'SCDA',
    owner: 'Elena Santos',
    visits: 21300,
    signups: 512,
    revenue: '₱340,000',
    transactions: 120,
    status: 'Pending',
  },
  {
    id: 126,
    name: 'Reyes Corporate Attorneys',
    acronym: 'RCA',
    owner: 'Marco Reyes',
    visits: 19800,
    signups: 420,
    revenue: '₱290,000',
    transactions: 98,
    status: 'Active',
  },
  {
    id: 127,
    name: 'Fernandez Family Law Clinic',
    acronym: 'FFLC',
    owner: 'Liza Fernandez',
    visits: 9400,
    signups: 210,
    revenue: '₱145,000',
    transactions: 54,
    status: 'Suspended',
  },
  {
    id: 128,
    name: 'Aquino & De Leon Partners',
    acronym: 'ADL',
    owner: 'Gabriel Aquino',
    visits: 8700,
    signups: 180,
    revenue: '₱125,000',
    transactions: 42,
    status: 'Active',
  },
];