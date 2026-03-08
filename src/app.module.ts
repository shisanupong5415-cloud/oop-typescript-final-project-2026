import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CustomerModule } from './modules/customer/customer.module';
import { WebModule } from './modules/web/web.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TicketsModule,
    CustomerModule,
    WebModule,
  ],
  controllers: [AppController],
})
export class AppModule {}