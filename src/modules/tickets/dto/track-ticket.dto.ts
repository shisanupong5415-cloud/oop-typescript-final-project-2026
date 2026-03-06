import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class TrackTicketDto {
    @IsNumber()
    @IsNotEmpty()
    ticketId!: number;

    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
