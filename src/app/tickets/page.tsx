import React, { Suspense } from 'react';
import TicketList from './TicketList';
import Loading from '../loading';
import Link from 'next/link';
import { getTickets } from '../api';

async function Tickets() {
    const tickets = await getTickets();
    return (
        <main>
            <nav className='m-0 p-0 w-full flex justify-between'>
                <div>
                    <h2>Tickets</h2>
                    <p><small>Currently open tickets.</small></p>
                </div>
                <div className="flex justify-center my-8">
                <Link href="/tickets/create">
                    <button className="btn-primary">Create a new ticket</button>
                </Link>
                </div>
            </nav>
            {/* Pulling in our server component here */}
            {/* Wrapping suspense around it so next knows what not to show */}
            <Suspense fallback={<Loading />}>
                <TicketList tickets={tickets} />
            </Suspense>
        </main>
    );
}

export default Tickets;