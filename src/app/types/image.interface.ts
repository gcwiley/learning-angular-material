// define the image interface
export interface Image {
  id: string;
  name: string;
  url: string;
  mimetype: string;
  size: string;
  description: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ImageInput = Omit<Image, 'id'>;
