import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import {AuthService} from "./auth.service"
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private AuthServise:AuthService){
        super();
    }

    async validate(username:string,password:string)
    {
        const employee= await this.AuthServise.validateUser(username,password);
        if(!employee)
        {
            throw new UnauthorizedException();
        }
        return employee;
    }
}






// if (!employee) {
//     throw new NotFoundException("Username doesn't exist");
//   }

//   if (employee.password !== passWord) {
//     throw new UnauthorizedException('Incorrect password');
//   }

  // if (employee.group !== 'HR') {
  //   throw new UnauthorizedException(
  //     'This system is valid only for HR employees',
  //   );
  // }