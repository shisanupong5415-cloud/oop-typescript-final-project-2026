import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class TrackTicketDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    ticketId!: number;

    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
