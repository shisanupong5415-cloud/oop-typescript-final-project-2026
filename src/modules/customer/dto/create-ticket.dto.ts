import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '../../tickets/entities/ticket.entity';

export class CreateTicketDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    subject!: string;

    @IsString()
    @IsNotEmpty()
    details!: string;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: TicketPriority;
}
