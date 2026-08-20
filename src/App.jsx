import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lawfirms" element={<PlaceholderPage title="Law Firms" subtitle="Manage law firm accounts & directory listings" />} />
        <Route path="/websites" element={<PlaceholderPage title="Websites" subtitle="Manage hosted websites & tenant domains" />} />
        
        {/* Products Routes */}
        <Route path="/products" element={<PlaceholderPage title="Products Landing Page" subtitle="Overview of subscriptions, templates, and digital assets" />} />
        <Route path="/products/subscriptions" element={<PlaceholderPage title="Subscriptions" subtitle="Subscription tier management & pricing plans" />} />
        <Route path="/products/templates" element={<PlaceholderPage title="Web Templates" subtitle="Pre-built website templates & law firm layouts" />} />
        <Route path="/products/assets" element={<PlaceholderPage title="Digital Assets" subtitle="Legal document templates & media assets" />} />
        
        <Route path="/orders" element={<PlaceholderPage title="Orders" subtitle="Track product orders & client purchases" />} />
        <Route path="/transactions" element={<PlaceholderPage title="Transactions" subtitle="Financial transaction history & payout records" />} />
        <Route path="/reports" element={<PlaceholderPage title="Reports" subtitle="Platform analytics, performance reports & node health" />} />
        <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" subtitle="The requested page does not exist." />} />
      </Routes>
    </MainLayout>
  )
}
