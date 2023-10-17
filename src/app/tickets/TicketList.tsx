'use client'
import React from 'react'
import Link from 'next/link';
import { Ticket } from '../types/tickets';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { deleteTicket, getTickets } from '../api';
import { useRouter } from 'next/navigation';
// Server component

// Keep fetch logic outside the function for code quality reasons

// Fetch logic runs on the server, so it has already happened by the time the code reaches the browser
/* 
* If we make another fetch request somewhere else in the app, next.js will only fetch the data once.
* It will then reuse the data wherever we call that fetch
* It will also cache the results of any fetches we make (indefinitely, unless we set a time to revalidate the cache)
*/
// async function getTickets(): Promise<Array<Ticket>> {
    // Imitate delay
    // await new Promise(resolve => setTimeout(resolve, 3000));

    // const res = await fetch('http://localhost:4000/tickets', {
        // Here we are saying cache this 30 seconds at a time (in the event the tickets are updated fairly frequently)
        // next: {
        //     revalidate: 30
        // }
        // Here we are opting out of the cache, as the tickets are updated very frequently, but obviously this is more expensive
//         next: {
//             revalidate: 0
//         }
//     });
//     return res.json();
// }
// This would be an example of dynamic rendering, as the page would change often

interface ITicketListProps {
    tickets: Array<Ticket>;
}

export default function TicketList({ tickets }: ITicketListProps) {
  const router = useRouter();

  const handleDeleteTodo = async (id: string) => {
    await deleteTicket(id);
    router.refresh();
  }

  return (
    <>
        {tickets.map((ticket: Ticket) => (
            <div
                key={ticket.id}
                className="card my-5"
            >
                <div className="flex">
                    <h3>{ticket.title}</h3>
                    <Link href={`/tickets/${ticket.id}/edit`}><HiOutlinePencil cursor="pointer" size={20} className="mx-3" /></Link>
                    <HiOutlineTrash onClick={() => handleDeleteTodo(ticket.id)} cursor="pointer" size={20} className="mx-1" />
                </div>
                <Link href={`/tickets/${ticket.id}`}>
                <p>{ticket.body.slice(0, 200)}...</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
                </Link>
            </div>
        ))}
        {tickets.length === 0 ? (
            <p className="text-center">There are no open tickets, yay!</p>
        ) : null}
    </>
  )
}
