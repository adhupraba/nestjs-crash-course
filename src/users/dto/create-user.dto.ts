import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../types";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["INTERN", "ENGINEER", "ADMIN"], { message: "Valid role required" })
  role: Role;
}
