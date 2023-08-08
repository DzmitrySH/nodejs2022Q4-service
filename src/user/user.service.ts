import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { Db } from 'src/db/db';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: v4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    Db.users.push(newUser);
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
    return Db.users;
  }

  async getOne(id: string) {
    const oneUser = Db.users.find((user) => user.id === id);
    if (!oneUser) throw new NotFoundException();
    return oneUser;
  }

  async update(newUserData: UpdateUserDto, id: string) {
    const indexUser = Db.users.find((user) => user.id === id);
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

    const index = Db.users.findIndex((user) => user.id === id);
    Db.users[index] = updatedUser;

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
    const indexUser = Db.users.find((user) => user.id === id);
    if (!indexUser) throw new NotFoundException();
    Db.users = Db.users.filter((el) => el.id !== indexUser.id);
  }
}
