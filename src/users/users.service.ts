import { Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "./types";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      role: "INTERN",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      role: "INTERN",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
      role: "ENGINEER",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "Julianne.OConner@kory.org",
      role: "ENGINEER",
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      email: "Lucio_Hettinger@annie.ca",
      role: "ADMIN",
    },
  ];

  findAll(role?: Role) {
    if (role) {
      const users = this.users.filter((user) => user.role === role);

      if (!users.length) throw new NotFoundException("User role not found");

      return users;
    }

    return this.users;
  }

  findOne(id: number) {
    const found = this.users.find((user) => user.id === id);

    if (!found) {
      throw new NotFoundException("User not found");
    }

    return found;
  }

  createUser(user: CreateUserDto) {
    const copyDesc = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: copyDesc[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updUser: UpdateUserDto) {
    this.users.forEach((user, idx) => {
      if (user.id !== id) return;
      this.users[idx] = { ...user, ...updUser };
    });

    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removed = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removed;
  }
}
