import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Body,
  Param,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  getAll(): User[] {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Not valid user id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User not found.',
  })
  getOne(@Param('id', ParseUUIDPipe) id: string): User {
    return this.userService.getOneUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully updated' })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
