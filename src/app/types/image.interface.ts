// ISO 8601 date/time string
export type ISODateString = string;

// define the image interface
export interface Image {
  id: string;
  name: string;
  url: string;
  mimetype: string;
  size: string;
  description: string;
  uploadedBy: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type ImageInput = Omit<Image, 'id'>;
