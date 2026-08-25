export const subscriptionColumns = [
  { key: 'id', label: 'ID' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'client', label: 'Client' },
  { key: 'transactionDate', label: 'Transaction Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'status', label: 'Status' },
]

export const oneTimeColumns = subscriptionColumns

export const subscriptionTransactions = [
  {
    id: 123,
    orderId: 456,
    client: 'Bautista Lawfirm Office',
    transactionDate: new Date(2026, 4, 5),
    amount: '1,000 php',
    paymentMethod: 'Visa',
    status: 'Paid',
  },
  {
    id: 124,
    orderId: 457,
    client: 'Santos & Reyes Law Group',
    transactionDate: new Date(2026, 4, 12),
    amount: '2,000 php',
    paymentMethod: 'Mastercard',
    status: 'Pending',
  },
  {
    id: 125,
    orderId: 458,
    client: 'Cruz Legal Services',
    transactionDate: new Date(2026, 4, 18),
    amount: '1,000 php',
    paymentMethod: 'GCash',
    status: 'Failed',
  },
  {
    id: 126,
    orderId: 459,
    client: 'Dela Torre Law Firm',
    transactionDate: new Date(2026, 3, 28),
    amount: '2,000 php',
    paymentMethod: 'Visa',
    status: 'Refunded',
  },
]

export const oneTimeTransactions = [
  {
    id: 123,
    orderId: 456,
    client: 'Bautista Lawfirm Office',
    transactionDate: new Date(2026, 4, 5),
    amount: '1,000 php',
    paymentMethod: 'Visa',
    status: 'Paid',
  },
  {
    id: 127,
    orderId: 460,
    client: 'Villanueva & Co.',
    transactionDate: new Date(2026, 4, 9),
    amount: '1,500 php',
    paymentMethod: 'Maya',
    status: 'Pending',
  },
  {
    id: 128,
    orderId: 461,
    client: 'Ramos Legal Consultancy',
    transactionDate: new Date(2026, 4, 15),
    amount: '1,000 php',
    paymentMethod: 'Mastercard',
    status: 'Failed',
  },
  {
    id: 129,
    orderId: 462,
    client: 'Aquino Law Office',
    transactionDate: new Date(2026, 3, 30),
    amount: '1,500 php',
    paymentMethod: 'Visa',
    status: 'Refunded',
  },
]