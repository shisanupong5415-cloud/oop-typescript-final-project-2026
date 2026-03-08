import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  controllers: [CustomerController],
})
export class CustomerModule {}