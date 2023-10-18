import { Ticket } from "./types/tickets";


export const getTickets = async (): Promise<Array<Ticket>> => {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const res = await fetch(`${process.env.API_URL}/tickets`, { cache: 'no-store' });
    return res.json();
}

export const getTicketById = async (id: string): Promise<Ticket> => {
    const res = await fetch(`${process.env.API_URL}/tickets/${id}`, { cache: 'no-store' });
    const ticket = await res.json();
    return ticket;
}

export const updateTicket = async (ticket: Ticket, id: string): Promise<Ticket> => {
    const res = await fetch(`${process.env.API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    })
    const updatedTicket = await res.json();
    return updatedTicket;
}

export const deleteTicket = async (id: string): Promise<void> => {
    await fetch(`${process.env.API_URL}/tickets/${id}`, {
        method: 'DELETE',
    })
}