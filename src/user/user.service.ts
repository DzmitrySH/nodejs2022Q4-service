import {
  HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  public users: User[] = [];

  createUser(createUserDto: CreateUserDto) {
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

  getAllUser() {
    return this.users;
  }

  getOneUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(newUserData: UpdateUserDto, id: string) {
    const indexUser = this.users.find((user) => user.id === id);
    if (newUserData.oldPassword !== indexUser.password) {
      throw new HttpException('Password does not match', HttpStatus.FORBIDDEN);
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

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
