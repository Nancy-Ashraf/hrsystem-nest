import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
    employee: { type: Schema.Types.ObjectId , ref: 'Employee',required: true },
    date: {type:Date,required: true },
});


export interface Attendance extends mongoose.Document{
    employee: mongoose.Types.ObjectId;
    date: Date;
}