import { Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './interfaces/favorites.interface';
import { Album } from 'src/album/interfaces/album.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public favorites: Favorites = {
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
    this.favorites[name].push(id);
  }

  removeTrack(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }

  createAlbum(id: string, name: string) {
    this.favorites[name].push(id);
  }

  removeAlbum(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }

  createArtist(id: string, name: string) {
    this.favorites[name].push(id);
  }

  removeArtist(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }
}
