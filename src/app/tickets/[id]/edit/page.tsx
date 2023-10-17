import React from 'react'
import EditForm from './EditForm'
import { Params } from '@/app/types/tickets'
import { getTicketById } from '@/app/api'

export default async function EditTicket({ params }: Params) {
  const ticket = await getTicketById(params.id);
  return (
    <main>
        <h2 className="text-primary text-center">Edit your ticket.</h2>
        {/* Client component here */}
        <EditForm ticket={ticket} />
    </main>
  )
}
