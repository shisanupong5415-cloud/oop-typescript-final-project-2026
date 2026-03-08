import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TrackTicketDto } from './dto/track-ticket.dto';
import { Ticket } from '../tickets/entities/ticket.entity';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'สร้าง ticket ใหม่' })
    @SwaggerResponse({ status: 201, description: 'สร้างสำเร็จ' })
    @SwaggerResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
    create(@Body() dto: CreateTicketDto): ApiResponse<{ ticketId: number; message: string }> {

        const ticket = this.customerService.createTicket(dto);

        return {
            success: true,
            message: 'Ticket created successfully',
            data: { ticketId: ticket.id, message: 'Ticket created successfully' },
        };
    }

    @Post('track')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'ค้นหา ticket' })
    @SwaggerResponse({ status: 200, description: 'เจอแล้ว' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    track(@Body() dto: TrackTicketDto): ApiResponse<Ticket> {

        const ticket = this.customerService.trackTicket(dto);

        return {
            success: true,
            message: 'Ticket found',
            data: ticket
        };
    }
}