import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Param,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOkResponse({
    description: 'Tracks returned successfully',
  })
  getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Track returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Track succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Track updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(updateTrackDto, id);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Track deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
