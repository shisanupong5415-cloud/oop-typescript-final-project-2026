import {
    Controller, Get, Post, Put, Patch, Delete,
    Body, Param, ParseIntPipe, HttpCode, HttpStatus,
    Render,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TrackTicketDto } from './dto/track-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    // สร้าง ticket ใหม่
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'สร้าง ticket ใหม่' })
    @SwaggerResponse({ status: 201, description: 'สร้างสำเร็จ' })
    @SwaggerResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
    create(@Body() dto: CreateTicketDto): ApiResponse<{ ticketId: number; message: string }> {
        const ticket = this.ticketsService.create(dto);
        return {
            success: true,
            message: 'Ticket created successfully',
            data: { ticketId: ticket.id, message: 'Ticket created successfully' },
        };
    }

    // ค้นหา ticket จาก id กับ email
    @Post('track')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'ค้นหา ticket' })
    @SwaggerResponse({ status: 200, description: 'เจอแล้ว' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    track(@Body() dto: TrackTicketDto): ApiResponse<Ticket> {
        const ticket = this.ticketsService.track(dto);
        return { success: true, message: 'Ticket found', data: ticket };
    }

    // ดึง ticket ทั้งหมด
    @Get()
    @ApiOperation({ summary: 'ดึง ticket ทั้งหมด' })
    findAll(): ApiResponse<Ticket[]> {
        const tickets = this.ticketsService.findAll();
        return { success: true, message: 'Tickets retrieved successfully', data: tickets };
    }

    // ดึง ticket ตาม id
    @Get(':id')
    @ApiOperation({ summary: 'ดึง ticket ตาม id' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Ticket> {
        const ticket = this.ticketsService.findOne(id);
        return { success: true, message: 'Ticket found', data: ticket };
    }

    // อัพเดท ticket
    @Patch(':id')
    @ApiOperation({ summary: 'อัพเดท ticket' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketDto): ApiResponse<Ticket> {
        const ticket = this.ticketsService.update(id, dto);
        return { success: true, message: 'Ticket updated successfully', data: ticket };
    }

    // แทนที่ ticket ทั้งหมด
    @Put(':id')
    @ApiOperation({ summary: 'แทนที่ ticket' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTicketDto): ApiResponse<Ticket> {
        const ticket = this.ticketsService.replace(id, dto);
        return { success: true, message: 'Ticket replaced successfully', data: ticket };
    }

    // ลบ ticket
    @Delete(':id')
    @ApiOperation({ summary: 'ลบ ticket' })
    @SwaggerResponse({ status: 404, description: 'ไม่เจอ' })
    remove(@Param('id', ParseIntPipe) id: number): ApiResponse<Ticket> {
        const ticket = this.ticketsService.remove(id);
        return { success: true, message: 'Ticket deleted successfully', data: ticket };
    }

    @Post('track-web')
    @Render('track-result')
    trackTicket(@Body() dto: TrackTicketDto) {

        const ticket = this.ticketsService.track(dto);

        if (!ticket) {
            return { notFound: true };
        }

        return { ticket };
    }
}
