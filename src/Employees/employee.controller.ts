import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { JWTAuthGuard } from 'src/Authentication/jwt.auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('Employees')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async addEmployee(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('group') group: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.EmployeeService.insertEmployee(
      name,
      email,
      group,
      username,
      password
    );
    return { id: generatedId };
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async getEmployees() {
    const employees = await this.EmployeeService.getEmployees();
    return employees;
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    const employees = await this.EmployeeService.getEmployeeById(id);
    return employees;
  }

  @UseGuards(JWTAuthGuard)
  @Get('filter/:group')
  async filterEmployeesByGroup(@Param('group') group: string) {
    const employees = await this.EmployeeService.filterEmployeesByGroup(group);
    return employees;
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('group') group: string,
  ) {
    console.log(name);
    await this.EmployeeService.updateEmployee(id, name, email, group);
    return null;
  }
}
