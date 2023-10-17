import { Controller, Post, UseGuards,Request, Get, Body } from '@nestjs/common';
import { AuthService } from './Authentication/auth.service';
import { LocalAuthGuard } from './Authentication/local.auth.guard';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {

    return this.authService.login(req);
  }



}
