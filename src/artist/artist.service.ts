import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Album } from 'src/album/interfaces/album.interface';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAll() {
    return this.artists;
  }

  async getOne(id: string) {
    const indexArtist = this.artists.find((artist) => artist.id === id);
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
      this.artists.push(newArtist);
      return newArtist;
    } else return null;
  }

  async update(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException();
    const indexArtist = this.artists.findIndex((artist) => artist.id === id);
    if (indexArtist >= 0) {
      const updatedArtist = { ...artist, ...updateArtistDto };
      this.artists[indexArtist] = updatedArtist;
      return updatedArtist;
    } else return null;
  }

  async remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    this.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    this.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }
}
