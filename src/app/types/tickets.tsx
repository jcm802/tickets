export interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    userEmail: string,
}

export interface Params {
    params: {
        id: string;
    }
};