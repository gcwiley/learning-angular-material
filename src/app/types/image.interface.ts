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

// payload to create a image (client -> server)
// excludes server-generated fields like id, createdAt, updatedAt
export type ImageInput = Omit<Image, 'id' | 'createdAt' | 'updatedAt'>;

// --- HELPER INTERFACES FOR UI LIST ---

// single generic interface
export interface SelectOption<T = string> {
  value: T;
  viewValue: string;
}
