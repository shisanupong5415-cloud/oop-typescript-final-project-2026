import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  @Render('index')
  home() {
    return {};
  }

  @Get('create-ticket')
  @Render('create-ticket')
  createTicketPage() {
    return {};
  }

  @Get('track-ticket')
  @Render('track-ticket')
  trackTicketPage() {
    return {};
  }

}