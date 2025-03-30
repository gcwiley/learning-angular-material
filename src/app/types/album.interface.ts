// define the album interface
export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  label: string;
  studio: string;
  genre: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export type AlbumInput = Omit<Album, 'id'>

// define the album genre interface
export interface AlbumGenre {
  value: string;
  viewValue: string;
}
