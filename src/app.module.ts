import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CustomerModule } from './modules/customer/customer.module';
import { WebModule } from './modules/web/web.module';
import { WebController } from './modules/web/web.controller';
import { AppController } from './app.controller';

@Module({
  imports: [
    TicketsModule,
    CustomerModule,
    WebModule,
  ],
  controllers: [WebController,AppController],
})
export class AppModule {}