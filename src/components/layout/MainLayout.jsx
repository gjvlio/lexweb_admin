import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Header from './Header'

export default function MainLayout() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false)

  return (
    <div className="min-h-screen w-full bg-brand-bg flex font-sans text-black antialiased">
      {/* Side Navigation Bar (230px) */}
      <Navbar
        isCollapsed={isNavbarCollapsed}
        onToggleCollapse={() => setIsNavbarCollapsed((prev) => !prev)}
      />

      {/* Right Content Column: Full Width Header + Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header onToggleSidebar={() => setIsNavbarCollapsed((prev) => !prev)} />
        <main className="flex-1 w-full px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
