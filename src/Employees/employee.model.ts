import * as mongoose from 'mongoose';
import { Attendance } from 'src/Attendance/attendance.model';

export const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  group: { type: String, enum: ['HR', 'Normal Employee'], required: true },
  attendances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  username:{ type: String ,required: true},
  password:{ type: String,required: true},
});


export interface Employee extends mongoose.Document{
  id:number,
  name:string,
  email:string,
  group:'HR' | 'Normal Employee',
  attendances: Attendance[];
  username:string,
  password:string,
}
