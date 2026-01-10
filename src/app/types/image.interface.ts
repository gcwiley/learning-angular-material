// ISO 8601 date/time string
export type ISODateString = string;

// define the image interface
export interface Image {
  id: string;
  title: string;
  url: string;
  mimetype: string;
  size: string;
  description: string;
  uploadedBy: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create an image
// excludes 
export type ImageInput = Omit<Image, 'id'>;
