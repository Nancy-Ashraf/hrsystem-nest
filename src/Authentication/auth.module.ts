import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EmployeeModule } from "../Employees/employee.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";;
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports:[EmployeeModule,PassportModule,JwtModule.register({
        secret:'SECRET',
        signOptions:{expiresIn:'10800s'}
    })],
    providers:[
        LocalStrategy,
        AuthService,
        JwtStrategy
    ],
    exports:[
        AuthService
    ]
})
export class AuthModule{}