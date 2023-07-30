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
import {
  ApiTags,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'Users has been successfully',
  })
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'User created succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.userService.update(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'User successfully deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, userId is invalid',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }
}
