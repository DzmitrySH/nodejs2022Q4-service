import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Db } from 'src/db/db';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  async getAll() {
    return Db.artists;
  }

  async getOne(id: string) {
    const indexArtist = Db.artists.find((artist) => artist.id === id);
    if (!indexArtist) {
      throw new NotFoundException();
    }
    return indexArtist;
  }

  async create(createArtistDto: CreateArtistDto) {
    if (createArtistDto.name && createArtistDto.grammy) {
      const newArtist = {
        id: v4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      };
      Db.artists.push(newArtist);
      return newArtist;
    } else return null;
  }

  async update(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = Db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException();
    const indexArtist = Db.artists.findIndex((artist) => artist.id === id);
    if (indexArtist >= 0) {
      const updatedArtist = { ...artist, ...updateArtistDto };
      Db.artists[indexArtist] = updatedArtist;
      return updatedArtist;
    } else return null;
  }

  async remove(id: string) {
    const indexArtist = Db.artists.find((artist) => artist.id === id);
    if (!indexArtist) throw new NotFoundException();
    Db.artists = Db.artists.filter((a) => a.id !== indexArtist.id);
    Db.tracks.forEach((track, index) => {
      if (track.artistId === indexArtist.id) Db.tracks[index].artistId = null;
    });
    Db.albums.forEach((album, index) => {
      if (album.artistId === indexArtist.id) Db.albums[index].artistId = null;
    });
  }
}
