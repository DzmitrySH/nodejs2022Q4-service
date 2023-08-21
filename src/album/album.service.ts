import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Db } from 'src/db/db';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  async getAll() {
    return Db.albums;
  }

  async getOne(id: string) {
    const albumOne = Db.albums.find((album) => album.id === id);
    if (!albumOne) throw new NotFoundException();
    return albumOne;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    Db.albums.push(newAlbum);
    return newAlbum;
  }

  async update(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = Db.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    const indexAlbum = Db.albums.findIndex((album) => album.id === id);
    if (indexAlbum >= 0) {
      const updatedAlbum = { ...album, ...updateAlbumDto };
      Db.albums[indexAlbum] = updatedAlbum;
      return updatedAlbum;
    } else return null;
  }

  async remove(id: string) {
    const album = Db.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    Db.albums = Db.albums.filter((album) => album.id !== id);
    Db.tracks.forEach((track, index) => {
      if (track.albumId === album.id) Db.tracks[index].albumId = null;
    });
  }
}
