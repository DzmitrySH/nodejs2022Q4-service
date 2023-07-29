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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOkResponse({
    description: 'Artists returned successfully',
  })
  async getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Artist returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artistId is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
    status: HttpStatus.NOT_FOUND,
  })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Artist succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Artist updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artistId is invalid',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(updateArtistDto, id);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Artist deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, artistId is invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
