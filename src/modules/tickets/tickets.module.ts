import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
    controllers: [TicketsController],
    providers: [TicketsService],
    exports: [TicketsService], // export เพื่อให้ service นี้ถูกใช้ใน module อื่นได้ (เช่น WebModule)
})
export class TicketsModule { }
