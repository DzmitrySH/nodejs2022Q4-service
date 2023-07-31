import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from './interfaces/favorites.interface';
import { Album } from 'src/album/interfaces/album.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    const favs = {
      artists: this.artists.filter((artist) =>
        this.favorites.artists.includes(artist.id),
      ),
      albums: this.albums.filter((album) =>
        this.favorites.albums.includes(album.id),
      ),
      tracks: this.tracks.filter((track) =>
        this.favorites.tracks.includes(track.id),
      ),
    };
    return favs;
  }

  createTrack(id: string, name: string) {
    // if (!this.favorites[name].includes(id)) {
    //   this.favorites[name].push(id);
    //   return true;
    // } else {
    //   throw new UnprocessableEntityException('Track not found.');
    // }
    return this.createEntity(id, name);
  }

  removeTrack(id: string, name: string) {
    // const index = this.favorites[name].findIndex(
    //   (item: { id: string }) => item.id === id,
    // );
    // if (index !== -1) {
    //   this.favorites[name].splice(index, 1);
    //   return true;
    // }
    // return false;
    return this.removeEntity(id, name);
  }

  createAlbum(id: string, name: string) {
    // this.favorites[name].push(id);
    return this.createEntity(id, name);
  }

  removeAlbum(id: string, name: string) {
    // const index = this.favorites[name].findIndex(
    //   (item: { id: string }) => item.id === id,
    // );
    // if (index !== -1) {
    //   this.favorites[name].splice(index, 1);
    //   return true;
    // }
    // return false;
    return this.removeEntity(id, name);
  }

  createArtist(id: string, name: string) {
    // this.favorites[name].push(id);
    return this.createEntity(id, name);
  }

  removeArtist(id: string, name: string) {
    // const index = this.favorites[name].findIndex(
    //   (item: { id: string }) => item.id === id,
    // );
    // if (index !== -1) {
    //   this.favorites[name].splice(index, 1);
    //   return true;
    // }
    // return false;
    return this.removeEntity(id, name);
  }

  private removeEntity(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    if (index !== -1) {
      this.favorites[name].splice(index, 1);
      return true;
    }
    return false;
  }

  private createEntity(id: string, name: string) {
    if (!this.favorites[name].includes(id)) {
      this.favorites[name].push(id);
      return true;
    } else {
      throw new UnprocessableEntityException('Not found.');
    }
  }
}
