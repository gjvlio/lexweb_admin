import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import PlaceholderPage from './pages/PlaceholderPage'
import Assets from './pages/Products/Assets/Assets'
import Subscriptions from './pages/Products/Subscriptions'
import OrdersPage from './pages/Orders/OrdersPage'
import LawFirmsPage from './pages/LawFirms/LawFirmsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lawfirms" element={<LawFirmsPage />} />
          <Route path="websites" element={<PlaceholderPage title="Websites" />} />
          {/* Main Products Landing Page */}
          <Route path="products" element={<PlaceholderPage title="Products Landing Page" />} />
          {/* Products Subpages */}
          <Route path="products/subscriptions" element={<Subscriptions />} />
          <Route path="products/templates" element={<PlaceholderPage title="Products — Templates" />} />
          <Route path="products/assets" element={<Assets />} />
          <Route path="products/assets" element={<PlaceholderPage title="Products — Assets" />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="*" element={<PlaceholderPage title="404 — Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
