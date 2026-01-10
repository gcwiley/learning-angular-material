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
  imageUrl?: string; // optional field
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create an album
// excludes server-generated fields like id, createdAt, updatedAt
export type AlbumInput = Omit<Album, 'id' | 'createdAt' | 'updateAt'>;

// --- HELPER INTERFACES FOR UI LIST ---

// defines the structure for album genre options in a UI dropdown.
export interface AlbumGenre {
  value: string;
  viewValue: string;
}
