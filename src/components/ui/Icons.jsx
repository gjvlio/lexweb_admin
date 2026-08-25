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

// Dashboard assets
import totalLawyersIconAsset from '../../assets/dashboard/total-lawyers-icon.png'
import totalSubscriptionIconAsset from '../../assets/dashboard/total-subscription-icon.png'
import totalSalesIconAsset from '../../assets/dashboard/total-sales-icon.png'
import activeWebsitesIconAsset from '../../assets/dashboard/active-websites-icon.png'
import growingChartIconAsset from '../../assets/dashboard/growing-chart-icon.png'

// Navbar & Header Icon Components (Default: 25px x 25px)
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

// Dashboard KPI Icon Components
export function IconTotalLawyers({ className = 'w-6 h-6', ...props }) {
  return <img src={totalLawyersIconAsset} alt="Total Lawyers" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconTotalSubscription({ className = 'w-6 h-6', ...props }) {
  return <img src={totalSubscriptionIconAsset} alt="Total Subscription Income" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconTotalSales({ className = 'w-6 h-6', ...props }) {
  return <img src={totalSalesIconAsset} alt="Total Sales" className={`object-contain shrink-0 ${className}`} {...props} />
}

export function IconActiveWebsites({ className = 'w-6 h-6', ...props }) {
  return <img src={activeWebsitesIconAsset} alt="Active Websites" className={`object-contain shrink-0 ${className}`} {...props} />
}

// Vector SVG Growing Chart Icon inheriting currentColor (Lawful Purple #5E1B89 / Striking Orange #F4512C)
export function IconGrowingChart({ className = 'w-3 h-3', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export {
  lexwebLogoAsset,
  notificationIconAsset,
  profileIconAsset,
  dashboardIconAsset,
  lawFirmIconAsset,
  ordersIconAsset,
  reportsIconAsset,
  transactionsIconAsset,
  websitesIconAsset,
  totalLawyersIconAsset,
  totalSubscriptionIconAsset,
  totalSalesIconAsset,
  activeWebsitesIconAsset,
  growingChartIconAsset,
}
