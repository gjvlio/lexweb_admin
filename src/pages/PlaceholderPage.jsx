import React from 'react'
import Card from '../components/ui/Card'

export default function PlaceholderPage({ title = 'Page' }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold text-black">{title}</h1>
      <Card className="py-16 text-center text-black">
        <p className="text-sm font-sans">
          This is a scaffolded route placeholder for <strong>{title}</strong>. Ready for custom feature development.
        </p>
      </Card>
    </div>
  )
}
