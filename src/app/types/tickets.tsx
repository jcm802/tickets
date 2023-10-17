export interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    user_email: string,
}

export interface Params {
    params: {
        id: string;
    }
};