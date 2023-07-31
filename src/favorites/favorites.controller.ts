import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Favorites returned successfully',
  })
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @ApiCreatedResponse({
    description: 'Track id add to the favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid track id',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createTrack(id, 'tracks');
  }

  @Delete('/track/:id')
  @ApiNoContentResponse({
    description: 'Track delete successfully',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid track id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id, 'tracks');
  }

  @Post('/album/:id')
  @ApiCreatedResponse({
    description: 'Album id add to the favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid album id',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createAlbum(id, 'albums');
  }

  @Delete('/album/:id')
  @ApiNoContentResponse({
    description: 'Album delete successfully',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid album id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id, 'albums');
  }

  @Post('/artist/:id')
  @ApiCreatedResponse({
    description: 'Artist id add to the favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid artist id',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createArtist(id, 'artists');
  }

  @Delete('/artist/:id')
  @ApiNoContentResponse({
    description: 'Artist delete successfully',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid artist id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtist(id, 'artists');
  }
}
