import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../entities/ticket.entity';

export class UpdateTicketDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    staffName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    response?: string;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
