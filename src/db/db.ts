import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { User } from 'src/user/interfaces/user.interface';

export const Db: base = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export interface base {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
