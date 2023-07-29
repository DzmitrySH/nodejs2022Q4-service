import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Album } from 'src/album/interfaces/album.interface';

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];
  public tracks: Track[] = [];
  public albums: Album[] = [];
  public favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return this.artists;
  }

  getOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    const indexArtist = this.artists.findIndex((artist) => artist.id === id);
    this.artists[indexArtist] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string) {
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
