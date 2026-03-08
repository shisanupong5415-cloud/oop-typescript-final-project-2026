import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';
import { CreateTicketDto } from '../customer/dto/create-ticket.dto';
import { TrackTicketDto } from '../customer/dto/track-ticket.dto';

@Controller()
export class WebController {

    constructor(private readonly ticketsService: TicketsService) {}

    // หน้า manage ticket
    @Get('manage-ticket')
    @Render('manage-ticket')
    manageTicketPage() {

        const tickets = this.ticketsService.findAll();

        const priorityOrder = {
            HIGH: 1,
            MEDIUM: 2,
            LOW: 3,
        };

        tickets.sort(
            (a, b) =>
                priorityOrder[a.priority as keyof typeof priorityOrder] -
                priorityOrder[b.priority as keyof typeof priorityOrder],
        );

        return { tickets };
    }

    // หน้า form สร้าง ticket
    @Get('create-ticket')
    @Render('create-ticket')
    createTicketPage() {
        return {};
    }

    // submit form สร้าง ticket
    @Post('create-ticket')
    @Render('ticket-created')
    createTicket(@Body() dto: CreateTicketDto) {

        const ticket = this.ticketsService.create(dto);

        return {
            ticketId: ticket.id,
            message: 'Ticket created successfully'
        };
    }

    // หน้า form track ticket
    @Get('track-ticket')
    @Render('track-ticket')
    trackTicketPage() {
        return {};
    }

    // submit form track
    @Post('track-ticket')
    @Render('track-result')
    trackTicket(@Body() dto: TrackTicketDto) {

        const ticket = this.ticketsService.track(dto);

        if (!ticket) {
            return { notFound: true };
        }

        return { ticket };
    }
}