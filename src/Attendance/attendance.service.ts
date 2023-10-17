import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './attendance.model';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance') private readonly attendanceModel: Model<Attendance>,

  ) {}



 

  async createAttendance(employeeId: string, date: Date): Promise<Attendance> {
    const attendance = new this.attendanceModel({ employee: employeeId, date });
    return await attendance.save();
  }

  async getAttendanceByEmployee(employeeId: string){
    const attendances= await this.attendanceModel.find({ employee: employeeId }).exec();
    return attendances.map(att=>({
      employeeId:att.employee,
      date:att.date
  }))
  }
}