import React from 'react'
import CreateFormRHF from './CreateForm'
// Server component by default, and may include other elements not needed for hydration
export default function CreateTicket() {
  return (
    <main>
        <h2 className="text-primary text-center">Add a new ticket</h2>
        {/* Client component here */}
        <CreateFormRHF />
    </main>
  )
}
