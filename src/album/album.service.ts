import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';

@Injectable()
export class AlbumService {
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAll() {
    return this.albums;
  }

  async getOne(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async update(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = this.albums.find((album) => album.id === id);
    const updatedAlbum = { ...album, ...updateAlbumDto };
    const indexAlbum = this.albums.findIndex((album) => album.id === id);
    this.albums[indexAlbum] = updatedAlbum;
    return updatedAlbum;
  }

  async remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    this.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}
