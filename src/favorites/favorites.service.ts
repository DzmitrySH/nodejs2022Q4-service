import {
  // HttpException,
  // HttpStatus,
  Injectable,
  // NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Db } from 'src/db/db';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';
import { Album } from '../album/interfaces/album.interface';

type Entity = Artist | Track | Album;

@Injectable()
export class FavoritesService {
  getAll() {
    const favs = {
      artists: Db.artists.filter((artist) =>
        Db.favorites.artists.includes(artist.id),
      ),
      albums: Db.albums.filter((album) =>
        Db.favorites.albums.includes(album.id),
      ),
      tracks: Db.tracks.filter((track) =>
        Db.favorites.tracks.includes(track.id),
      ),
    };
    return favs;
  }

  createTrack(id: string) {
    return this.createEntity(id, 'tracks');
  }

  removeTrack(id: string) {
    return this.removeEntity(id, 'tracks');
  }

  createAlbum(id: string) {
    return this.createEntity(id, 'albums');
  }

  removeAlbum(id: string) {
    return this.removeEntity(id, 'albums');
  }

  createArtist(id: string) {
    return this.createEntity(id, 'artists');
  }

  removeArtist(id: string) {
    return this.removeEntity(id, 'artists');
  }

  private removeEntity(id: string, name: string) {
    const include: boolean = Db.favorites[name].includes(id);
    if (!include) throw new UnprocessableEntityException();
    const index = Db.favorites[name].indexOf(id);
    if (index !== -1) {
      Db.favorites[name].splice(index, 1);
    }
  }

  private createEntity(id: string, name: string) {
    const index = Db[name].findIndex((ent: Entity) => ent.id === id);
    if (index === -1) throw new UnprocessableEntityException();
    if (!Db.favorites[name].includes(id)) {
      Db.favorites[name].push(id);
    }
  }
}
