// ISO 8601 date/time string
export type ISODateString = string;

// define the album interface
export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: ISODateString | null;
  label: string;
  studio: string;
  genre: string;
  summary: string;
  imageUrl?: string; // optional
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type AlbumInput = Omit<Album, 'id'>;

// define the album genre interface
export interface AlbumGenre {
  value: string;
  viewValue: string;
}
