import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Db } from 'src/db/db';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
    };
    Db.tracks.push(newTrack);
    return newTrack;
  }

  async getAll() {
    return Db.tracks;
  }

  async getOne(id: string) {
    const oneTrack = Db.tracks.find((track) => track.id === id);
    if (!oneTrack) throw new NotFoundException();
    return oneTrack;
  }

  async update(updateTrackDto: UpdateTrackDto, id: string) {
    const track = Db.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    const indexTrack = Db.tracks.findIndex((track) => track.id === id);
    if (indexTrack >= 0) {
      const updatedTrack = { ...track, ...updateTrackDto };
      Db.tracks[indexTrack] = updatedTrack;
      return updatedTrack;
    } else return null;
  }

  async remove(id: string) {
    const index = Db.tracks.find((track) => track.id === id);
    if (!index) throw new NotFoundException();
    Db.tracks = Db.tracks.filter((trackId) => trackId.id !== id);
    return;
  }
}
