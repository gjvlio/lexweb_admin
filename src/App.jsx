import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import PlaceholderPage from './pages/PlaceholderPage'
import Assets from './pages/Products/Assets/Assets'
import Subscriptions from './pages/Products/Subscriptions'
import OrdersPage from './pages/Orders/OrdersPage'
import WebsitesPage from './pages/Websites/WebsitesPage'
import ReportsPage from './pages/Reports/ReportsPage'
import LawFirmsPage from './pages/LawFirms/LawFirmsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="websites" element={<WebsitesPage />} />
          <Route path="lawfirms" element={<LawFirmsPage />} />
          <Route path="products/subscriptions" element={<Subscriptions />} />
          <Route path="products/templates" element={<PlaceholderPage title="Products — Templates" />} />
          <Route path="products/assets" element={<Assets />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="*" element={<PlaceholderPage title="404 — Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
