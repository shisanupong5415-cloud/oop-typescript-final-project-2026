import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  controllers: [WebController],
})
export class WebModule {}