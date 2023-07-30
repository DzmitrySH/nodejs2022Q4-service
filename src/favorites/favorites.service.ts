import { Injectable } from '@nestjs/common';
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

  async getAll() {
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

  async createTrack(id: string, name: string) {
    this.favorites[name].push(id);
  }

  async removeTrack(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }

  async createAlbum(id: string, name: string) {
    this.favorites[name].push(id);
  }

  async removeAlbum(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }

  async createArtist(id: string, name: string) {
    this.favorites[name].push(id);
  }

  async removeArtist(id: string, name: string) {
    const index = this.favorites[name].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[name].splice(index, 1);
  }
}
