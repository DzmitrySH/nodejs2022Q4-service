import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: v4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.users.push(newUser);
    const userNew = {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    return userNew;
  }

  async getAll() {
    return this.users;
  }

  async getOne(id: string) {
    const oneUser = this.users.find((user) => user.id === id);
    if (!oneUser) throw new NotFoundException();
    return oneUser;
  }

  async update(newUserData: UpdateUserDto, id: string) {
    const indexUser = this.users.find((user) => user.id === id);
    if (!indexUser) throw new NotFoundException();
    if (newUserData.oldPassword !== indexUser.password) {
      throw new ForbiddenException();
    }

    const updatedUser: User = {
      ...indexUser,
      password: newUserData.newPassword,
      version: indexUser.version + 1,
      updatedAt: Date.now(),
    };

    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = updatedUser;

    const userNew = {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
    return userNew;
  }

  async remove(id: string) {
    const indexUser = this.users.findIndex((user) => user.id === id);
    if (indexUser === -1) throw new NotFoundException();
    this.users.splice(indexUser, 1);
  }
}
