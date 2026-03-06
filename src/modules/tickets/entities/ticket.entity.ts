// สถานะของ ticket
export enum TicketStatus {
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED',
}

// ระดับความสำคัญ
export enum TicketPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

// ข้อมูลของ ticket
export interface Ticket {
    id: number;
    email: string;
    subject: string;
    details: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    updatedAt: string;
    response: string | null;
    staffName: string | null;
    resolvedAt: string | null;
}
