import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { Ticket, TicketPriority, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from '../customer/dto/create-ticket.dto';
import { TrackTicketDto } from '../customer/dto/track-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    // path ไปยังไฟล์ json ที่เก็บข้อมูล
    private dataPath = path.resolve(process.cwd(), 'data', 'tickets.json');

    constructor() {
        // สร้างไฟล์ถ้ายังไม่มี
        const dir = path.dirname(this.dataPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(this.dataPath)) {
            fs.writeFileSync(this.dataPath, '[]');
        }
    }

    // อ่านข้อมูล ticket จากไฟล์ json
    private readTickets(): Ticket[] {
        try {
            const data = fs.readFileSync(this.dataPath, 'utf-8');
            const tickets: Ticket[] = JSON.parse(data) as Ticket[];
            return tickets;
        } catch {
            throw new InternalServerErrorException('อ่านไฟล์ไม่ได้');
        }
    }

    // เขียนข้อมูลลงไฟล์ json
    private saveTickets(tickets: Ticket[]): void {
        try {
            fs.writeFileSync(this.dataPath, JSON.stringify(tickets, null, 2));
        } catch {
            throw new InternalServerErrorException('เขียนไฟล์ไม่ได้');
        }
    }

    // หา id ถัดไป
    private getNextId(tickets: Ticket[]): number {
        if (tickets.length === 0) return 1;
        return Math.max(...tickets.map((t) => t.id)) + 1;
    }

    // ส่งเมลแจ้งผู้ใช้
    private async sendEmail(email: string, ticketId: number): Promise<void> {
        try {
            // ตั้งค่า transporter สำหรับส่งเมล
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',   // TODO: ใส่เมลจริง
                    pass: 'your-app-password',       // TODO: ใส่ app password
                },
            });

            await transporter.sendMail({
                from: 'your-email@gmail.com',
                to: email,
                subject: `Ticket #${ticketId} - สร้างเรียบร้อยแล้ว`,
                text: `Ticket #${ticketId} ของคุณได้ถูกสร้างแล้ว เราจะติดต่อกลับเร็วๆ นี้`,
            });

            console.log('ส่งเมลสำเร็จ:', email);
        } catch {
            // ถ้าส่งเมลไม่ได้ก็ไม่เป็นไร ไม่ต้อง crash
            console.log('ส่งเมลไม่ได้:', email);
        }
    }

    // สร้าง ticket ใหม่
    create(dto: CreateTicketDto): Ticket {
        const tickets = this.readTickets();
        const now = new Date().toISOString();

        const newTicket: Ticket = {
            id: this.getNextId(tickets),
            email: dto.email,
            subject: dto.subject,
            details: dto.details,
            status: TicketStatus.OPEN,
            priority: dto.priority ?? TicketPriority.MEDIUM,
            createdAt: now,
            updatedAt: now,
            response: null,
            staffName: null,
            resolvedAt: null,
        };

        tickets.push(newTicket);
        this.saveTickets(tickets);

        // ส่งเมลแจ้งผู้ใช้ (ทำ background ไม่ต้องรอ)
        this.sendEmail(newTicket.email, newTicket.id).catch(() => {
            console.log('email error');
        });

        console.log('สร้าง ticket สำเร็จ id:', newTicket.id);
        return newTicket;
    }

    // ค้นหา ticket จาก id กับ email
    track(dto: TrackTicketDto): Ticket | null {
    const tickets = this.readTickets();

    const found = tickets.find(
        (t) => t.id === dto.ticketId && t.email === dto.email,
    );

    if (!found) {
        return null;
    }

    return found;
    }

    // ดึง ticket ทั้งหมด เรียงตาม id
    findAll(): Ticket[] {
        const tickets = this.readTickets();
        tickets.sort((a, b) => a.id - b.id);
        return tickets;
    }

    // ดึง ticket ตาม id
    findOne(id: number): Ticket {
        const tickets = this.readTickets();
        const found = tickets.find((t) => t.id === id);

        if (!found) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        return found;
    }

    // อัพเดท ticket (staff ใช้)
    update(id: number, dto: UpdateTicketDto): Ticket {
        const tickets = this.readTickets();
        const index = tickets.findIndex((t) => t.id === id);

        if (index === -1) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        // อัพเดทแค่ field ที่ส่งมา
        if (dto.staffName !== undefined) {
            tickets[index].staffName = dto.staffName;
        }
        if (dto.response !== undefined) {
            tickets[index].response = dto.response;
        }
        if (dto.status !== undefined) {
            tickets[index].status = dto.status;

            // ถ้า resolve หรือ reject ให้ใส่เวลาด้วย
            if (dto.status === TicketStatus.RESOLVED || dto.status === TicketStatus.REJECTED) {
                tickets[index].resolvedAt = new Date().toISOString();
            }

            // ถ้าเปิด ticket กลับมาใหม่ ให้เคลียร์ resolvedAt
            if (dto.status === TicketStatus.OPEN) {
                tickets[index].resolvedAt = null;
            }
        }

        tickets[index].updatedAt = new Date().toISOString();
        this.saveTickets(tickets);

        console.log('อัพเดท ticket id:', id);
        return tickets[index];
    }

    // แทนที่ ticket ทั้งหมด
    replace(id: number, dto: CreateTicketDto): Ticket {
        const tickets = this.readTickets();
        const index = tickets.findIndex((t) => t.id === id);

        if (index === -1) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        const replaced: Ticket = {
            id: id,
            email: dto.email,
            subject: dto.subject,
            details: dto.details,
            status: TicketStatus.OPEN,
            priority: dto.priority ?? TicketPriority.MEDIUM,
            createdAt: tickets[index].createdAt,
            updatedAt: new Date().toISOString(),
            response: null,
            staffName: null,
            resolvedAt: null,
        };

        tickets[index] = replaced;
        this.saveTickets(tickets);

        return replaced;
    }

    // ลบ ticket
    remove(id: number): Ticket {
        const tickets = this.readTickets();
        const index = tickets.findIndex((t) => t.id === id);

        if (index === -1) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        const deleted = tickets[index];
        tickets.splice(index, 1);
        this.saveTickets(tickets);

        console.log('ลบ ticket id:', id);
        return deleted;
    }

    getAllTickets(): Ticket[] {
        return this.readTickets();
}
}
