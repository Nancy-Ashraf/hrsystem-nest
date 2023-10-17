import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JWTAuthGuard } from 'src/Authentication/jwt.auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async addAttendance(
    @Body() body: { employeeId: string; date: string },
  ){
    const { employeeId, date } = body;
    const attendanceDate = new Date(date);
    await this.attendanceService.createAttendance(employeeId, attendanceDate);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':employeeId')
  async getAttendanceByEmployeeId(
    @Param('employeeId') employeeId: string,
  ){
    return await this.attendanceService.getAttendanceByEmployee(employeeId);
  }
}
