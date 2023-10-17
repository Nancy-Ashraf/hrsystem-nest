import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './Employees/employee.module';
import { AuthModule } from './Authentication/auth.module';
import { AttendanceModule } from './Attendance/attendance.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    EmployeeModule,
    AttendanceModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://nancyashraf:Nn2214nosa2011@cluster0.n3oy022.mongodb.net/HRSystem',
    ),
  ],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {}
