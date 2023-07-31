import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 } from 'uuid';
import { Track } from './interfaces/track.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';

@Injectable()
export class TrackService {
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async create(createTrackDto: CreateTrackDto) {
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

  async getAll() {
    return this.tracks;
  }

  async getOne(id: string) {
    const oneTrack = this.tracks.find((track) => track.id === id);
    if (!oneTrack) throw new NotFoundException();
    return oneTrack;
  }

  async update(updateTrackDto: UpdateTrackDto, id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    const indexTrack = this.tracks.findIndex((track) => track.id === id);
    if (indexTrack >= 0) {
      const updatedTrack = { ...track, ...updateTrackDto };
      this.tracks[indexTrack] = updatedTrack;
      return updatedTrack;
    } else return null;
  }

  async remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException();
    this.tracks.splice(index, 1);
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
