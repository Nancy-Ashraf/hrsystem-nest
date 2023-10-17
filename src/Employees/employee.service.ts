import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Employee} from './employee.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';




@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly EmployeeModel: Model<Employee>,
  )
   {}

  async insertEmployee(name: string, email: string, group: string,username:string,password:string){
    if(group !== "HR" && group !== "Normal Employee")
    {
      throw new NotFoundException('Employees must be HR OR Normal Employee');
    }
    const saltRounds = 10;
    const hashedPassword=await bcrypt.hash(password, saltRounds);
    
    const newEmployee = new this.EmployeeModel({
      name,
      email,
      group,
      username,
      password:hashedPassword
    });
    console.log(newEmployee);
    const addedEmployee = await newEmployee.save();
    return addedEmployee.id as string;
  }

  async getEmployees() {
    const employees = await this.EmployeeModel.find().exec();
    return employees.map(emp=>({
        id:emp.id,
        name:emp.name,
        group:emp.group,
    }))
  }

  async filterEmployeesByGroup(group:string) {
    const employees = await this.EmployeeModel.find({group:group}).exec();
    return employees.map(emp=>({
        id:emp.id,
        name:emp.name,
        group:emp.group,
    }))
  }

 async findEmployee(id: string):Promise<Employee> {
    let employee;
    try {
      employee =await this.EmployeeModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Couldn't find the Employee");
    }
    if (!employee) {
      throw new NotFoundException("Couldn't find the Employee");
    }
    
    return employee;
  }

  async GetEmployeeByUserName(userName: string):Promise<Employee> {
    let employee=await this.EmployeeModel.findOne({ username: userName });
    return employee
  }


  async getEmployeeById(id:string)
  {
    const employee= await this.findEmployee(id);
    return {
      id:employee.id,
      name:employee.name,
      email:employee.email,
      group:employee.group,
  };
  }

  async updateEmployee(id:string,Empname: string, Empemail: string, Empgroup:string)
  {
    const updatedEmployee=await this.findEmployee(id);
    if(Empname){
      updatedEmployee.name=Empname;
    }
    if(Empemail){
      updatedEmployee.email=Empemail;
    }
    if(Empgroup){
      if (Empgroup === "HR" || Empgroup === "Normal Employee") {
        updatedEmployee.group = Empgroup;
      } else {
        throw new Error("Invalid group specified");
      }
    }
    await updatedEmployee.save();
  }
}
