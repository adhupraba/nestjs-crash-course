import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { Role } from "./types";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users or /users?role=<value>
  @Get()
  findAll(@Query("role") role?: Role) {
    return this.usersService.findAll(role);
  }

  // GET /users/:id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // POST /users
  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  // PATCH /users/:id
  @Patch(":id")
  updateUser(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  // DELETE /users/:id
  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
