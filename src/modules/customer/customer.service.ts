import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TrackTicketDto } from './dto/track-ticket.dto';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class CustomerService {

    constructor(private readonly ticketsService: TicketsService) {}

    createTicket(dto: CreateTicketDto): Ticket {
        return this.ticketsService.create(dto);
    }

    trackTicket(dto: TrackTicketDto): Ticket {
        const ticket = this.ticketsService.track(dto);

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        return ticket;
    }
}
