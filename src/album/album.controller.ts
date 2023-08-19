import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOkResponse({
    description: 'Albums returned successfully',
  })
  async getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Album returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, albumId is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
    status: HttpStatus.NOT_FOUND,
  })
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumService.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Album succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Album updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, albumId is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
    status: HttpStatus.BAD_REQUEST,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(updateAlbumDto, id);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Album deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, albumId is invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
