import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from './attendance.model';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attendance', schema: AttendanceSchema }]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports:[AttendanceService]

})
export class AttendanceModule {}
