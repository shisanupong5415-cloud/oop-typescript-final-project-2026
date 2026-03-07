import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AppController } from './app.controller';

@Module({
  imports: [TicketsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
