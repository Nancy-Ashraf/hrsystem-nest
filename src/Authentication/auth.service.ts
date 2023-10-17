import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from 'src/Employees/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeeService, private jwtService: JwtService) {}

  async verifyPassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const employee = await this.employeeService.GetEmployeeByUserName(username);
    const isVerifiedPass=await this.verifyPassword(password, employee.password);

    if (employee && isVerifiedPass && employee.group === 'HR') {
      return {
        name: employee.name,
        email: employee.email,
        group: employee.group,
        username: employee.username,
      };
    }

    return null;
  }

  login(emp: any) {
    const payload = { name: emp.name, sub: emp.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
