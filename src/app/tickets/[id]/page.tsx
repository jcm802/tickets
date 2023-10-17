import React from 'react'
import { Ticket, Params } from '../../types/tickets';
import { notFound } from 'next/navigation';

/**
 * There is a way we can tell next.js all of the ids ahead of time
 * so it knows all the ids for routes it needs, this way these pages
 * can be statically rendered and served from a CDN. We also need to build
 * an instruction for when page hasnt been built/pre-rendered for a specific id
 * when a request comes in for it, we can make a 404 page for this.
 */

/**
* False would tell next.js to build a 404 page if an id isn't correct
* True is the default, so for any requests that dont already have pages made for them
* next.js is going to try and fetch the data for that ticket and create a new page for us
* in case the id does exist, after it's done that once it can create a static page
* for that ticket
*/
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
    const res = await fetch('http://localhost:4000/tickets')
    const tickets = await res.json()

    return tickets.map((ticket: Ticket) => ({
        id: ticket.id
    }))
};

async function getTicket(id: string): Promise<Ticket> {
    // Imitate delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
        next: {
            revalidate: 60
        }
    });
    // Checking for bad response
    if (!res.ok) {
        notFound();
    }
    return res.json();
};

// You no longer need useParams
export default async function TicketDetails({ params }: Params): Promise<JSX.Element> {
  const ticket = await getTicket(params.id);
  return (
    <main>
        <nav>
            <h2>Ticket details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
        </div>
        </div>
    </main>
  )
}

