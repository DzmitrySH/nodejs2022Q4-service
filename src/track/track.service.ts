import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 } from 'uuid';
import { Track } from './interfaces/track.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
  getAllTracks() {
    return this.tracks;
  }
  getTrackOne(id: string) {
    return this.tracks.find((track) => track.id === id);
  }
  updateTrack(updateTrackDto: UpdateTrackDto, id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track)
      throw new HttpException(
        `Track ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = { ...track, ...updateTrackDto };
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = updatedTrack;
    return updatedTrack;
  }
  deleteTrack(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
