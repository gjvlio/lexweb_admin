import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/Home/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<HomePage />} />
          <Route path="lawfirms" element={<PlaceholderPage title="Lawfirms" />} />
          <Route path="websites" element={<PlaceholderPage title="Websites" />} />
          {/* Main Products Landing Page */}
          <Route path="products" element={<PlaceholderPage title="Products Landing Page" />} />
          {/* Products Subpages */}
          <Route path="products/subscriptions" element={<PlaceholderPage title="Products — Subscriptions" />} />
          <Route path="products/templates" element={<PlaceholderPage title="Products — Templates" />} />
          <Route path="products/assets" element={<PlaceholderPage title="Products — Assets" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="*" element={<PlaceholderPage title="404 — Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
