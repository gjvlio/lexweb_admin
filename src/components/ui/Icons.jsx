import React from 'react'

// Header assets
import lexwebLogoAsset from '../../assets/header/lexweb-logo.png'
import notificationIconAsset from '../../assets/header/notification-icon.png'
import profileIconAsset from '../../assets/header/profile-icon.png'

// Navbar assets
import dashboardIconAsset from '../../assets/navbar/dashboard-icon.png'
import lawFirmIconAsset from '../../assets/navbar/law-firm-icon.png'
import ordersIconAsset from '../../assets/navbar/orders-icon.png'
import productsIconAsset from '../../assets/navbar/products-icon.png'
import reportsIconAsset from '../../assets/navbar/reports-icon.png'
import transactionsIconAsset from '../../assets/navbar/transacations-icon.png'
import websitesIconAsset from '../../assets/navbar/websites-icon.png'

// Default size for all icons per spec: 25px x 25px
export function IconDashboard({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={dashboardIconAsset} alt="Dashboard" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconLawfirms({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={lawFirmIconAsset} alt="Lawfirms" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconWebsites({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={websitesIconAsset} alt="Websites" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconProducts({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={productsIconAsset} alt="Products" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconOrders({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={ordersIconAsset} alt="Orders" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconTransactions({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={transactionsIconAsset} alt="Transactions" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconReports({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={reportsIconAsset} alt="Reports" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconLexLogo({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={lexwebLogoAsset} alt="LexWeb Logo" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconNotification({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={notificationIconAsset} alt="Notifications" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconProfile({ className = 'w-[25px] h-[25px]', ...props }) {
  return <img src={profileIconAsset} alt="Profile" className={`object-contain shrink-0 ${className}`} {...props} />
}

export {
  lexwebLogoAsset,
  notificationIconAsset,
  profileIconAsset,
  dashboardIconAsset,
  lawFirmIconAsset,
  ordersIconAsset,
  productsIconAsset,
  reportsIconAsset,
  transactionsIconAsset,
  websitesIconAsset,
}
